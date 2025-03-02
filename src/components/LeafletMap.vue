<template>
  <div class="map-container h-full w-full">
    <div id="map" ref="mapContainer" class="h-full w-full"></div>
  </div>
</template>

<script>
export default {
  name: 'LeafletMap',
  props: {
    locations: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      map: null,
      markers: [],
      isDarkMode: true,
      tileLayer: null,
      L: null // Store Leaflet instance
    };
  },
  mounted() {
    // Force dark mode based on your app's UI
    this.isDarkMode = true;

    console.log("Map component mounted");

    // Import Leaflet's CSS first
    this.loadLeafletCSS();

    // Wait a brief moment for the DOM to be fully ready
    setTimeout(() => {
      this.initializeMap();
    }, 100);
  },
  methods: {
    loadLeafletCSS() {
      // Add Leaflet CSS if not already present
      if (!document.querySelector('link[href*="leaflet.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
        link.crossOrigin = '';
        document.head.appendChild(link);
      }
    },

    async initializeMap() {
      // Check if container element is properly sized
      const container = this.$refs.mapContainer;
      if (!container) {
        console.error("Map container element not found");
        return;
      }

      console.log("Container dimensions:", container.offsetWidth, "x", container.offsetHeight);

      // If container has zero dimensions, wait and retry
      if (container.offsetWidth === 0 || container.offsetHeight === 0) {
        console.warn("Container has zero dimensions, waiting...");
        setTimeout(() => this.initializeMap(), 200);
        return;
      }

      try {
        // Import Leaflet dynamically
        const leaflet = await import('leaflet');
        this.L = leaflet.default;

        console.log("Leaflet loaded successfully");

        // Initialize the map centered on Nebraska
        this.map = this.L.map(container).setView([41.5, -99.5], 7);
        console.log("Map initialized successfully");

        // Add the appropriate tile layer
        this.setTileLayer();

        // Set max bounds to roughly Nebraska's boundaries (with some padding)
        const nebraskaBounds = [
          [40.0, -104.05], // Southwest corner
          [43.0, -95.3]    // Northeast corner
        ];
        this.map.setMaxBounds(nebraskaBounds);

        // Set min/max zoom levels
        this.map.setMinZoom(6);
        this.map.setMaxZoom(12);

        // Add markers for each location
        this.addMarkers();

        // Attempt to load Nebraska counties if available
        this.loadCountyBoundaries();

        // Force a resize event after initialization
        setTimeout(() => {
          this.map.invalidateSize();
        }, 250);
      } catch (error) {
        console.error("Error setting up map:", error);
      }
    },

    setTileLayer() {
      if (!this.map || !this.L) return;

      // Use CartoDB dark tiles for better integration with dark UI
      const mapUrl = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png';
      const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

      try {
        this.tileLayer = this.L.tileLayer(mapUrl, {
          attribution: attribution,
          maxZoom: 18,
          subdomains: 'abcd',
          tileSize: 256,
          detectRetina: true
        }).addTo(this.map);

        // Add a fallback tile layer in case the primary one fails
        this.tileLayer.on('tileerror', (error) => {
          console.warn('Tile error detected, switching to fallback provider');
          this.map.removeLayer(this.tileLayer);

          // Try a different provider (Stamen Toner)
          this.tileLayer = this.L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png', {
            attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>',
            subdomains: 'abcd',
            minZoom: 0,
            maxZoom: 20
          }).addTo(this.map);
        });
      } catch (error) {
        console.error("Error setting tile layer:", error);
      }
    },

    addMarkers() {
      if (!this.map || !this.L || !this.locations.length) return;

      console.log("Adding markers for locations:", this.locations);

      // Create icons for different types of locations
      const getIcon = (type) => {
        const color = type.toLowerCase() === 'collaborative' ? '#2563eb' : '#db2777';
        return this.L.divIcon({
          className: `location-marker ${type.toLowerCase()}-marker`,
          html: `<div class="marker-inner" style="background-color: ${color};"></div>`,
          iconSize: [30, 30]
        });
      };

      // Add markers for each location
      this.locations.forEach((location, index) => {
        console.log(`Adding marker ${index}:`, location);

        try {
          const marker = this.L.marker([location.lat, location.lng], {
            icon: getIcon(location.type)
          }).addTo(this.map);

          // Add popup with location information
          marker.bindPopup(`
            <div style="background-color: #374151; color: white; padding: 8px; border-radius: 4px;">
              <strong>${location.name}</strong><br>
              ${location.type}<br>
              ${location.address || ''}
            </div>
          `);

          this.markers.push(marker);
          console.log(`Marker ${index} added successfully`);
        } catch (error) {
          console.error(`Error adding marker ${index}:`, error);
        }
      });

      // Fit the map to show all markers if there are any
      if (this.markers.length > 0) {
        const group = this.L.featureGroup(this.markers);
        this.map.fitBounds(group.getBounds(), { padding: [30, 30] });
      }
    },

    loadCountyBoundaries() {
      if (!this.map || !this.L) return;

      try {
        // Try to fetch Nebraska county boundaries
        fetch('/data/nebraska-counties.geojson')
          .then(response => {
            if (!response.ok) throw new Error('Counties GeoJSON not found');
            return response.json();
          })
          .then(data => {
            this.L.geoJSON(data, {
              style: {
                color: "#6b7280",
                weight: 1,
                fillOpacity: 0
              }
            }).addTo(this.map);
          })
          .catch(err => {
            console.warn('Could not load county boundaries:', err);
          });
      } catch (error) {
        console.warn('Error attempting to load county boundaries:', error);
      }
    }
  },
  beforeUnmount() {
    // Clean up map instance
    if (this.map) {
      this.map.remove();
    }
  }
};
</script>

<style>
.map-container {
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 1;
}

/* Fix for Leaflet rendering issues */
.leaflet-container {
  height: 100%;
  width: 100%;
  background: #1e293b; /* Dark background that matches your UI */
}

/* Ensure markers show up correctly */
.location-marker {
  background: transparent !important;
  border: none !important;
}

.marker-inner {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* Dark mode styles for popups */
.leaflet-popup-content-wrapper {
  background-color: #374151;
  color: white;
}

.leaflet-popup-tip {
  background-color: #374151;
}
</style>