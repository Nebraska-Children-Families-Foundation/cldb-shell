# Community Lens Database - UI Structure Documentation

This document describes the user interface structure of the CLDB web application to help developers and AI agents navigate and modify the UI components.

## Overall Layout Architecture

The application uses a **fixed navigation** layout with three main areas:

```
┌─────────────────────────────────────────────────────┐
│  MainNavbar (fixed top, z-50)                       │
├──────────┬──────────────────────────────────────────┤
│          │                                          │
│ MapSide  │  Main Content Area                       │
│ bar      │  (pages slot into DashboardLayout)       │
│ (fixed   │                                          │
│ left,    │                                          │
│ z-40)    │                                          │
│          │                                          │
└──────────┴──────────────────────────────────────────┘
```

### Key Layout Files

1. **`src/layouts/DashboardLayout.astro`** - Primary layout for most pages
2. **`src/layouts/Layout.astro`** - Minimal layout (no sidebar/navbar)
3. **`src/layouts/Dashboard.astro`** - Alternate dashboard layout
4. **`src/layouts/Reports.astro`** - Reports-specific layout

---

## 1. Main Navigation Bar (MainNavbar.astro)

**File**: `src/components/MainNavbar.astro`
**Position**: Fixed at top (`top-0`, `z-50`)
**Height**: 60px (4rem)

### Navigation Bar Components (Left to Right)

#### A. Mobile Sidebar Toggle
- **Element**: `<button>` with `data-drawer-toggle="drawer-navigation"`
- **Visibility**: Mobile only (`md:hidden`)
- **Purpose**: Opens/closes MapSidebar on mobile

#### B. Logo & Title
- **Element**: `<a href="/">`
- **Image**: `/images/ncffLogoVertical.svg`
- **Text**: "Community Lens Database"

#### C. Search Form
- **Element**: `<form>` with ID `topbar-search`
- **Input ID**: `topbar-search`
- **Visibility**: Hidden on mobile, visible on desktop (`hidden md:block`)
- **Placeholder**: "Search the Database"

#### D. Dark Mode Toggle
- **Component**: `<DarkModeToggle />`
- **File**: `src/components/DarkModeToggle.astro`
- **Button ID**: `theme-toggle`
- **Functionality**: Toggles between light/dark mode, persists to localStorage

#### E. CLDB Apps Dropdown (View Database Records)
- **Trigger Button**: `data-dropdown-toggle="view-records"`
- **Icon**: Database icon (stacked cylinders)
- **Dropdown ID**: `view-records`
- **Purpose**: Quick access to view different database record types

**Menu Items** (3-column grid):
| Link | Description | Route |
|------|-------------|-------|
| People | View people records | `/people` |
| Initiatives | View initiatives | `#` (not implemented) |
| Program Sites | View program locations | `#` (not implemented) |
| Collabs | View collaboratives | `#` (not implemented) |
| Orgs | View organizations | `#` (not implemented) |
| Reports | View reports | `#` (not implemented) |

#### F. Create Menu Dropdown
- **Trigger Button**: `data-dropdown-toggle="create-records"`
- **Icon**: Plus icon in circle
- **Dropdown ID**: `create-records`
- **Purpose**: Create new database records

**Menu Items** (vertical list):
| Link | Description | Route |
|------|-------------|-------|
| Create a New Person | Person creation form | `/profiles/create-profile` |
| Create a New Organization | Org creation form | `/organizations/create-organization` |
| Create a New Program Site | Site creation form | `/sites/create-program-site` |
| Create a New Report | Report creation form | `/reports/create-report` |

#### G. User Profile Dropdown
- **Trigger Button**: ID `user-menu-button`, `data-dropdown-toggle="dropdown"`
- **Avatar Image**: Round user photo
- **Dropdown ID**: `dropdown`
- **Current User**: "Neil Sims" (placeholder)

**Menu Sections**:
1. User info (name, email)
2. My profile, Account settings
3. My likes, Collections, Pro version
4. Sign out

---

## 2. Left Sidebar (MapSidebar.astro)

**File**: `src/components/MapSidebar.astro`
**Position**: Fixed left side (`fixed left-0`, `z-40`)
**Width**: 256px (w-64)
**Element ID**: `drawer-navigation`

### Sidebar Structure (Top to Bottom)

#### A. Search Bar (Mobile Only)
- **Input ID**: `sidebar-search`
- **Visibility**: Mobile only (`md:hidden`)
- **Placeholder**: "Search the Database"

#### B. Navigation Menu Items

##### 1. All of Our Work
- **Type**: Single link
- **Icon**: ID card icon
- **Route**: `#` (not implemented)

##### 2. Nebraska Children (Collapsible)
- **Button**: `data-collapse-toggle="dropdown-nc"`
- **Dropdown ID**: `dropdown-nc`
- **Icon**: Document icon
- **Sub-items**:
  - Board Members (`#`)

##### 3. Collaboratives (Collapsible)
- **Button**: `data-collapse-toggle="dropdown-pages"`
- **Dropdown ID**: `dropdown-pages`
- **Icon**: Document icon
- **Sub-items**:
  - Coverage Area (`#`)
  - Coordinators (`#`)
  - Central Navigators (`#`)

##### 4. Initiatives (Collapsible)
- **Button**: `data-collapse-toggle="dropdown-initiatives"`
- **Dropdown ID**: `dropdown-initiatives`
- **Icon**: Shopping bag icon
- **Sub-items** (all route to `#`):
  - Beyond School Bells
  - Camp Catch-Up
  - Communities for Kids
  - Community Response
  - Connected Youth Initiative
  - Full Service Community Schools
  - Rooted In Relationships
  - Rural Schools
  - Sixpence
  - Together, Better

##### 5. Political Subdivisions (Collapsible)
- **Button**: `data-collapse-toggle="dropdown-political-subdivisions"`
- **Dropdown ID**: `dropdown-political-subdivisions`
- **Icon**: Shopping bag icon
- **Sub-items** (all route to `#`):
  - Legislative Districts
  - School Districts
  - Health Districts
  - Behavioral Health Regions
  - Municipal Boundaries

#### C. Bottom Links (Bordered Top Section)
- **Knowledge Base** - External link to `https://knowledgebase.bringupnebraska.org/`
- **Reports Dashboard** - `#`
- **Collaborative Dashboard** - `#`
- **Help** - `#`

---

## 3. Main Content Area

**Location**: Right side of MapSidebar, below MainNavbar
**Padding Top**: 64px (pt-16) to account for fixed navbar
**Left Margin**: 256px (on desktop) to account for sidebar

### Typical Page Structure

Most pages follow this pattern:

```astro
---
import DashboardLayout from "../../layouts/DashboardLayout.astro";
// ... component logic
---

<DashboardLayout>
  <main>
    <div class="p-4">
      <!-- Command Bar (optional) -->
      <div class="mb-4 flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg border">
        <!-- Filters on left -->
        <div class="flex items-center gap-4">
          <!-- Dropdown filters, buttons, etc. -->
        </div>
        <!-- Actions/Views on right -->
        <div class="flex items-center gap-2">
          <!-- View toggles, action buttons -->
        </div>
      </div>

      <!-- Main Content (Table, Cards, etc.) -->
      <div class="bg-white dark:bg-gray-800 border rounded-lg">
        <!-- Content here -->
      </div>

      <!-- Stats/Pagination -->
      <div class="mt-4 text-sm text-gray-500 dark:text-gray-400">
        <!-- Count, pagination, etc. -->
      </div>
    </div>
  </main>
</DashboardLayout>
```

---

## 4. Common UI Patterns

### Command Bars
Used for page-level filters and actions (e.g., People page)

**Structure**:
- Container: `flex items-center justify-between`
- Left side: Filters (dropdowns, search)
- Right side: View toggles, action buttons

**Example IDs/Classes**:
- Filter dropdowns: `data-dropdown-toggle="[name]Dropdown"`
- Clear filters: ID `clearFiltersBtn`

### Dropdown Filters

**Flowbite Pattern**:
```html
<button data-dropdown-toggle="roleDropdown">
  <span id="roleButtonText">Role</span>
  <!-- Chevron icon -->
</button>

<div id="roleDropdown" class="hidden ...">
  <ul>
    <li>
      <a href="#" class="filter-option"
         data-filter-type="role"
         data-filter-value="Coordinator">
        Coordinator
      </a>
    </li>
  </ul>
</div>
```

### Tables

**Standard Structure**:
```html
<div class="overflow-x-auto">
  <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
    <thead class="bg-gray-50 dark:bg-gray-700">
      <tr>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase">
          Column Name
        </th>
      </tr>
    </thead>
    <tbody class="bg-white dark:bg-gray-800 divide-y" id="[table]Body">
      <tr class="[row-class] hover:bg-gray-50 dark:hover:bg-gray-700"
          data-*="...">
        <td class="px-6 py-4 whitespace-nowrap text-sm">
          Content
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

**Common Table IDs**:
- `peopleTableBody` - People page table body
- Row classes often include data attributes for filtering

---

## 5. Page Routes & Files

### Existing Pages

| Route | File | Description |
|-------|------|-------------|
| `/` | `src/pages/index.astro` | Map dashboard with collaboratives |
| `/people` | `src/pages/people/index.astro` | People directory with filters |
| `/profiles/create-profile` | `src/pages/profiles/create-profile.astro` | Create person form |
| `/organizations` | `src/pages/organizations/index.astro` | Organizations list |
| `/organizations/create-organization` | `src/pages/organizations/create-organization.astro` | Create org form |
| `/programs` | `src/pages/programs/index.astro` | Programs list |
| `/programs/create-program` | `src/pages/programs/create-program.astro` | Create program form |
| `/sites` | `src/pages/sites/index.astro` | Program sites list |
| `/sites/create-program-site` | `src/pages/sites/create-program-site.astro` | Create site form |
| `/reports` | `src/pages/reports/index.astro` | Reports list |
| `/reports/create-report` | `src/pages/reports/create-report.astro` | Create report form |
| `/reports/create-ccp-report` | `src/pages/reports/create-ccp-report.astro` | Create CCP report |
| `/reports-index` | `src/pages/reports-index.astro` | Reports index |

---

## 6. Styling & Theming

### Framework
- **Tailwind CSS** - Utility-first CSS
- **Flowbite** - Component library built on Tailwind
- **Dark Mode** - Class-based (`dark:` prefix)

### Dark Mode Implementation
- Storage key: `localStorage.getItem("theme")`
- Values: `"light"` or `"dark"`
- HTML class: `document.documentElement.classList.add("dark")`
- FOUC Prevention: Inline script in `<head>` (all layouts)

### Color Scheme
- **Light Mode**:
  - Background: `bg-gray-50`
  - Cards: `bg-white`
  - Text: `text-gray-900`
  - Borders: `border-gray-200`

- **Dark Mode**:
  - Background: `bg-gray-900`
  - Cards: `bg-gray-800`
  - Text: `text-white`
  - Borders: `border-gray-700`

### Common Classes
- **Buttons**: `rounded-lg text-sm px-5 py-2.5`
- **Dropdowns**: `rounded-lg shadow dark:bg-gray-700`
- **Tables**: `rounded-lg border dark:border-gray-700`
- **Hover**: `hover:bg-gray-100 dark:hover:bg-gray-700`

---

## 7. JavaScript Patterns

### Flowbite Initialization
```html
<script src="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.js"></script>
```
Auto-initializes components with `data-*` attributes

### Client-Side Scripts
Use Astro's `<script>` tag (runs once on page load):
```astro
<script>
  // Runs on page load
  const button = document.getElementById('myButton');
  button.addEventListener('click', () => {
    // Handle click
  });
</script>
```

For reactive behavior, use `is:inline` attribute:
```astro
<script is:inline>
  // Runs immediately, not bundled
</script>
```

---

## 8. Data Patterns

### Static Data
Currently, data is defined directly in Astro component frontmatter:
```astro
---
const peopleData = [
  { name: "...", role: "...", ... }
];
---
```

### Future: API Integration
Data fetching will likely move to:
- External API calls
- Database queries
- Content collections

---

## 9. Development Notes

### Adding New Pages

1. **Create page file**: `src/pages/[route]/index.astro`
2. **Use layout**: Import and wrap content in `<DashboardLayout>`
3. **Update navigation**: Add link to MainNavbar dropdown or MapSidebar
4. **Follow patterns**: Use command bars, tables, filters as needed

### Adding Dropdown Filters

1. **Button**: Use `data-dropdown-toggle="[id]"`
2. **Menu**: Div with matching ID, class `hidden`
3. **Options**: Links with `filter-option` class and data attributes
4. **Script**: Add event listeners and filter logic

### Adding to Navbar

**CLDB Apps Menu**: Edit `src/components/MainNavbar.astro` around line 100
**Create Menu**: Edit around line 215
**Sidebar**: Edit `src/components/MapSidebar.astro`

---

## 10. Key Element IDs Reference

Quick reference for commonly accessed elements:

| Element | ID/Selector | Location |
|---------|-------------|----------|
| Main navbar | `<nav>` at top | MainNavbar.astro |
| Sidebar | `#drawer-navigation` | MapSidebar.astro |
| Dark mode toggle | `#theme-toggle` | DarkModeToggle.astro |
| CLDB Apps dropdown | `#view-records` | MainNavbar.astro |
| Create menu dropdown | `#create-records` | MainNavbar.astro |
| User profile dropdown | `#dropdown` | MainNavbar.astro |
| People table body | `#peopleTableBody` | pages/people/index.astro |
| People count | `#peopleCount` | pages/people/index.astro |
| Clear filters button | `#clearFiltersBtn` | pages/people/index.astro |

### Filter Button Text IDs (People Page)
- Role: `#roleButtonText`
- County: `#countyButtonText`
- Collaborative: `#collaborativeButtonText`

---

## 11. External Resources

- **Flowbite Docs**: https://flowbite.com/docs/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Astro Docs**: https://docs.astro.build/
- **Knowledge Base**: https://knowledgebase.bringupnebraska.org/

---

**Last Updated**: 2025-10-25
**Version**: 1.0
