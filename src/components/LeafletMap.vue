<template>
  <div>
    <div id="map" ref="mapContainer" style="height: 500px; width: 100%;"></div>
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
      markers: []
    };
  },
  mounted() {
    // Import Leaflet dynamically to avoid SSR issues
    import('leaflet').then(L => {
      // Initialize the map
      this.map = L.map(this.$refs.mapContainer).setView([39.8283, -98.5795], 4); // Center on US

      // Add the tile layer (OpenStreetMap)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      // Add markers for each location
      this.addMarkers();
    });
  },
  methods: {
    addMarkers() {
      if (!this.map || !this.locations.length) return;

      // Create icons for different types of locations
      const getIcon = (type) => {
        return L.divIcon({
          className: `location-marker ${type.toLowerCase()}-marker`,
          html: `<div class="marker-inner"></div>`,
          iconSize: [24, 24]
        });
      };

      // Add markers for each location
      this.locations.forEach(location => {
        const marker = L.marker([location.lat, location.lng], {
          icon: getIcon(location.type)
        }).addTo(this.map);

        // Add popup with location information
        marker.bindPopup(`
          <strong>${location.name}</strong><br>
          ${location.type}<br>
          ${location.address || ''}
        `);

        this.markers.push(marker);
      });

      // Fit the map to show all markers if there are any
      if (this.markers.length > 0) {
        const group = L.featureGroup(this.markers);
        this.map.fitBounds(group.getBounds(), { padding: [30, 30] });
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
/* You'll need to include Leaflet CSS in your project */
/* In your Astro page: <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" /> */

.location-marker {
  background: transparent;
  border: none;
}

.marker-inner {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid white;
}

.collaborative-marker .marker-inner {
  background-color: #2c6bcb;
}

.sixpence-marker .marker-inner {
  background-color: #cb2c6b;
}
</style>