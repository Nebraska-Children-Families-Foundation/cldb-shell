# Statewide Plan Portal Documentation

## Overview

The Statewide Plan Portal is a comprehensive interface for exploring Nebraska's Statewide Plan for Community Well-Being. It provides a hierarchical view of Goals, Objectives, Strategies, Action Steps, and Commitments with advanced filtering and navigation capabilities.

## Architecture

### Hierarchical Structure

The portal follows a strict hierarchy:

```
Statewide Plan
├── Goals (4 total)
│   ├── Objectives (17 total)
│   │   ├── Strategies (40 total)
│   │   │   ├── Action Steps (391 total)
│   │   │   │   └── NC Staff (6)
│   │   │   │   └── Community Collaborative (385)
│   │   │   └── Commitments (2 total)
```

### Data Source

All data is sourced from JSON files located in `/src/data/statewide-plan/`:
- `goals.json` - 4 core goals
- `objectives.json` - 17 objectives
- `strategies.json` - 40 strategies
- `action-steps.json` - 391 action steps
- `commitments.json` - 2 system partner commitments

## Page Structure

### 1. Main Landing Page
**Route:** `/statewide-plan`

**File:** `src/pages/statewide-plan/index.astro`

**Features:**
- Overview of the Statewide Plan
- Navigation tabs to all sections
- Goal cards showing:
  - Goal number and description
  - Count of Objectives, Strategies, Action Steps, and Commitments
  - "View Details" link to individual goal page
- Full text description of Nebraska's vision

### 2. Goals Pages

#### Goals Index
**Route:** `/statewide-plan/goals`

**File:** `src/pages/statewide-plan/goals/index.astro`

**Features:**
- Displays all 4 goals
- Each goal card shows hierarchy counts
- Links to individual goal detail pages

#### Individual Goal Detail
**Route:** `/statewide-plan/goals/[id]`

**File:** `src/pages/statewide-plan/goals/[id].astro`

**Features:**
- Breadcrumb navigation
- Goal description
- List of associated Objectives with counts
- Tabs for viewing:
  - Strategies
  - Action Steps
  - Commitments

### 3. Objectives Pages

#### Objectives Index
**Route:** `/statewide-plan/objectives`

**File:** `src/pages/statewide-plan/objectives/index.astro`

**Features:**
- Displays all 17 objectives
- Filtering options:
  - Search by name
  - Filter by Goal
- Each objective shows:
  - Objective number and Goal badge
  - Description
  - Counts for Strategies, Action Steps, and Commitments
  - "View Details" link

#### Individual Objective Detail
**Route:** `/statewide-plan/objectives/[id]`

**File:** `src/pages/statewide-plan/objectives/[id].astro`

**Features:**
- Breadcrumb navigation (Statewide Plan > Goal X > Objective Y)
- Objective description
- Parent Goal information
- Associated Strategies list
- Tabs for Action Steps and Commitments

### 4. Strategies Pages

#### Strategies Index
**Route:** `/statewide-plan/strategies`

**File:** `src/pages/statewide-plan/strategies/index.astro`

**Features:**
- Displays all 40 strategies
- Filtering options:
  - Search by name
  - Filter by Goal
  - Filter by Objective
  - Filter by Priority (NCFF Priority, Collaborative Priority, Partner Priority, No Priority)
- Each strategy shows:
  - Strategy code (STRG-XXXX) and Goal badge
  - Description
  - Associated Objective
  - Priority badge (if applicable)
  - Counts for Action Steps and Commitments
  - "View Details" link

#### Individual Strategy Detail
**Route:** `/statewide-plan/strategies/[id]`

**File:** `src/pages/statewide-plan/strategies/[id].astro`

**Features:**
- Breadcrumb navigation (Statewide Plan > Goal X > Objective Y > Strategy STRG-XXXX)
- Strategy code and full description
- Priority Information section:
  - Priority badge
  - List of associated Community Collaboratives
- Hierarchy section showing full path from Goal to Strategy
- Tabs for viewing:
  - NC Action Steps (with count)
  - Community Action Steps (with count)
  - Partner Commitments (with count)
- "Back to All Strategies" navigation link

### 5. Action Steps Page

**Route:** `/statewide-plan/action-steps`

**File:** `src/pages/statewide-plan/action-steps/index.astro`

**Features:**
- Displays all 391 action steps in table format
- Filtering options:
  - Search by name or details
  - Filter by Goal
  - Filter by Objective
  - Filter by Strategy
  - Filter by Owner Type (NC Staff, Community Collaborative)
  - Filter by Status (Ongoing, In Progress, Completed, Not Started)
  - Filter by Completion Year
  - Filter by Completion Quarter
  - Checkbox for "Show only NC Priority action steps"
- Pagination:
  - Items per page selector (25, 50, 100)
  - Page navigation controls
  - Shows "X-Y of Z action steps"
- Table columns:
  - Activity Number (ACT-XXXX or C-ACT-XXXX)
  - Activity Name (with Priority badge if applicable)
  - Strategy
  - Objective
  - Goal
  - Lead
  - Type (NC Staff or Community Collaborative badge)
  - Status (badge with color coding)
  - Due (Quarter Year or N/A)
  - Actions (View link)

#### Individual Action Step Detail
**Route:** `/statewide-plan/action-steps/[id]`

**File:** `src/pages/statewide-plan/action-steps/[id].astro`

**Features:**
- Breadcrumb navigation
- Action step details
- Associated Strategy, Objective, and Goal information

### 6. Commitments Page

**Route:** `/statewide-plan/commitments`

**File:** `src/pages/statewide-plan/commitments/index.astro`

**Features:**
- Displays all 2 system partner commitments in table format
- Filtering options:
  - Search by name or details
  - Filter by Goal
  - Filter by Objective
  - Filter by Strategy
  - Filter by Status
  - Filter by Completion Year
- Table columns:
  - Commitment Number (COMMIT-XXXX)
  - Commitment Name
  - Strategy
  - Objective
  - Goal
  - Partner/Lead
  - Status (badge)
  - Due (Quarter Year)
  - Actions (View link)

#### Individual Commitment Detail
**Route:** `/statewide-plan/commitments/[id]`

**File:** `src/pages/statewide-plan/commitments/[id].astro`

**Features:**
- Breadcrumb navigation
- Commitment details
- Associated Strategy, Objective, and Goal information

## UI Components

### Navigation Tabs
All main pages include consistent navigation tabs:
- Goals
- Objectives
- Strategies
- Action Steps
- Commitments

### Badges

#### Priority Badges
- **Collaborative Priority** - Teal background with flag icon
- **NCFF Priority** - Blue background
- **Partner Priority** - Purple background
- **NC Priority** (on action steps) - Displayed as orange badge

#### Status Badges
- **Ongoing** - Blue background
- **In Progress** - Yellow background
- **Completed** - Green background
- **Not Started** - Gray background

#### Type Badges
- **NC Staff** - Blue background
- **Community Collaborative** - Green background

#### Hierarchy Badges
- **Goal X** - Color-coded by goal number
- **Obj X** - Smaller badges for objectives

### Color Coding

Goals are color-coded consistently throughout:
- **Goal 1** - Blue (`bg-blue-100`, `text-blue-800`)
- **Goal 2** - Green (`bg-green-100`, `text-green-800`)
- **Goal 3** - Purple (`bg-purple-100`, `text-purple-800`)
- **Goal 4** - Orange (`bg-orange-100`, `text-orange-800`)

### Icons

The portal uses Lucide icons throughout:
- `Target` - Goals
- `CheckSquare` - Objectives
- `Layers` - Strategies
- `ListTodo` - Action Steps
- `Handshake` - Commitments
- `Home` - Breadcrumb home
- `ChevronRight` - Breadcrumb separator, navigation arrows
- `Search` - Search functionality
- `X` - Clear filters

## Data Relationships

### Goal → Objective Relationship
- Each Objective has a `goal_id` field linking to its parent Goal
- Goals display counts of associated Objectives

### Objective → Strategy Relationship
- Each Strategy has an `objective_id` field linking to its parent Objective
- Objectives display counts of associated Strategies

### Strategy → Action Step Relationship
- Each Action Step has a `strategy_id` field linking to its parent Strategy
- Strategies display counts of associated Action Steps
- Action Steps are categorized by `owner_type`: "NC Staff" or "Community Collaborative"

### Strategy → Commitment Relationship
- Each Commitment has a `strategy_id` field linking to its parent Strategy
- Strategies display counts of associated Commitments

### Priority System

Strategies can have a `priority` field with values:
- `"Collaborative Priority"` - Flagged by collaboratives
- `"NCFF Priority"` - Nebraska Children and Families Foundation priority
- `"Partner Priority"` - System partner priority
- `null` - No specific priority

Action Steps can have an `nc_priority` boolean field indicating NCFF priority items.

### Community Collaboratives

Strategies with Collaborative Priority include a `community_collaboratives` array listing associated collaboratives:
```json
"community_collaboratives": [
  "All Collaboratives - Bring Up NE System",
  "Saunders County Active Community Team",
  "Buffalo County Wellbeing Collaborative",
  "Panhandle Partnership"
]
```

## Filtering Logic

### Client-Side Filtering
All filtering is performed client-side using JavaScript:

1. **Search** - Case-insensitive text matching on name/description fields
2. **Dropdowns** - Exact match on selected values
3. **Multiple filters** - Combined with AND logic
4. **Clear All Filters** - Resets all filters to default state

### Filter State Management
Filters use reactive state to update the displayed count and filtered results in real-time.

## Pagination (Action Steps Only)

The Action Steps page implements pagination:
- Default: 50 items per page
- Options: 25, 50, 100
- Shows current range (e.g., "1-50 of 391")
- Previous/Next navigation
- Page number buttons (shows 5 pages at a time)

## Breadcrumb Navigation

Breadcrumbs show the hierarchical path:
- **Format:** Statewide Plan > Goal X > Objective Y > Strategy/Action Step
- Each segment is clickable (except the current page)
- Uses ChevronRight icon as separator
- Current item shown with darker badge

## Responsive Design

All pages are designed to be responsive:
- Grid layouts adjust for different screen sizes
- Tables scroll horizontally on mobile devices
- Filters stack vertically on smaller screens
- Navigation tabs wrap on mobile

## Key Counts

The portal displays accurate counts throughout:
- **4 Goals**
- **17 Objectives**
- **40 Strategies**
- **391 Action Steps**
  - 6 NC Staff
  - 385 Community Collaborative
- **2 Partner Commitments**

These counts are dynamically calculated from the data and displayed on:
- Main landing page
- Individual goal/objective/strategy cards
- Navigation tabs
- Filter results

## Development Notes

### Adding New Data
To add new items to the portal:

1. Add the record to the appropriate JSON file in `/src/data/statewide-plan/`
2. Ensure proper `id` field (UUID format)
3. Include all required relationship fields (`goal_id`, `objective_id`, `strategy_id`)
4. Follow the existing data structure

### Modifying Filters
Filter components are located within each page file. To add a new filter:

1. Add a new state variable for the filter
2. Add the filter UI element (dropdown, checkbox, etc.)
3. Update the filtering logic in the computed filtered results
4. Add to "Clear All Filters" function

### Styling Consistency
All pages use consistent Tailwind CSS classes:
- Cards: `bg-white rounded-lg shadow-sm border border-gray-200 p-6`
- Buttons: `px-4 py-2 rounded-lg` with appropriate color classes
- Badges: Small rounded pills with background and text colors
- Headers: `text-2xl font-bold text-gray-900 mb-2`

## Testing Checklist

When making changes to the portal, verify:
- [ ] All navigation links work
- [ ] Breadcrumbs display correct hierarchy
- [ ] Filters function correctly
- [ ] Counts are accurate
- [ ] Badges display with correct colors
- [ ] Tables are responsive
- [ ] Pagination works (Action Steps)
- [ ] Tab switching works (detail pages)
- [ ] "Back" links navigate correctly
- [ ] Data relationships are maintained

## Future Enhancements

Potential improvements for future development:
1. Search functionality across all entity types
2. Export to CSV/Excel
3. Print-friendly views
4. Timeline view for action steps by completion date
5. Collaborative-specific dashboards
6. Progress tracking and metrics
7. Mobile app version
8. Real-time updates from database
9. User authentication and role-based access
10. Comments and collaboration features
