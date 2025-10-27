# Statewide Plan Functionality Summary

## Overview

The Statewide Plan section is a comprehensive interface for exploring Nebraska's Statewide Plan for Community Well-Being (Bring Up Nebraska initiative). This section provides a hierarchical, interactive view of Goals, Objectives, Strategies, Action Steps, and System Partner Commitments that drive Nebraska's community well-being initiatives through 2025.

**Vision Statement:** "Nebraska will have the most robust Community Well-Being prevention model in the nation by 2025."

---

## 1. Content Structure

### 1.1 Hierarchical Framework

The Statewide Plan follows a strict five-level hierarchy:

```
Statewide Plan
├── Goals (4 total)
│   ├── Objectives (17 total)
│   │   ├── Strategies (40 total)
│   │   │   ├── Action Steps (391 total)
│   │   │   │   ├── NC Staff Actions (6)
│   │   │   │   └── Community Collaborative Actions (385)
│   │   │   └── Commitments (2 total)
```

### 1.2 The Four Goals

**Goal 1: Collaboration**
Improve authentic collaboration between lived experience partners, system partners, local school districts, community collaboratives, and community members.

**Goal 2: Infrastructure**
Increase community collaborative infrastructure that leads to equitable well-being outcomes.

**Goal 3: Services & Supports**
Improve services and supports that build Protective and Promotive Factors in children, youth, families, and communities, including:
- Education, postsecondary education, and career services
- Supports for youth/young adults and young parents/families
- Early childhood services access and capacity
- Physical and behavioral health services
- Economic stability and concrete support

**Goal 4: Workforce**
Strengthen the well-being workforce in Nebraska.

### 1.3 Population-Level Result Areas

Three strategic-level indicators of thriving:

1. **Children, Youth, and Families are safe and healthy**
   - Focus on promotive/protective factors, physical/mental/emotional health, abuse/neglect prevention

2. **Children, Youth, and Families are ready for and successful in educational and career opportunities**
   - Focus on readiness from infancy through early adulthood, education, career pathways, family job opportunities

3. **Children, Youth, and Families experience economic stability**
   - Focus on housing, food, clothing, basic needs, living wage jobs

### 1.4 Priority System

Three types of priorities are tracked across the plan:

**NCFF Priority**
- Flagged by Nebraska Children and Families Foundation teams
- Badge color: Yellow
- Links to specific NCFF teams

**Collaborative Priority**
- Flagged by Community Collaboratives
- Badge color: Indigo
- Links to specific community collaboratives

**Partner Priority**
- Flagged by System Partners
- Badge color: Rose
- Links to specific system partners

---

## 2. User Workflow

### 2.1 Navigation Structure

**Entry Point:** `/statewide-plan` → Redirects to `/statewide-plan/goals`

**Primary Navigation Tabs** (available on all pages):
- Goals
- Objectives
- Strategies
- Action Steps
- Commitments

### 2.2 Top-Down Exploration (Recommended Path)

#### Step 1: Goals Overview
- **URL:** `/statewide-plan/goals`
- View all 4 goals with summary statistics
- Each goal displays counts of Objectives, Strategies, Action Steps, and Commitments
- Click "View Details" to drill into specific goal

#### Step 2: Goal Detail Page
- **URL:** `/statewide-plan/goals/[id]`
- View goal description and full mission context
- See list of Objectives under this goal
- Switch between tabs to view:
  - Strategies associated with this goal
  - Action Steps associated with this goal
  - Commitments associated with this goal

#### Step 3: Objectives View
- **URL:** `/statewide-plan/objectives`
- View all 17 objectives
- Filter by Goal or search by keyword
- Each objective shows parent Goal badge and counts

#### Step 4: Strategies View
- **URL:** `/statewide-plan/strategies`
- View all 40 strategies
- Advanced filtering:
  - Search by keyword
  - Filter by Goal
  - Filter by Objective
  - Filter by Priority Type (NCFF, Collaborative, Partner, or No Priority)
- Click strategy code to view details

#### Step 5: Strategy Detail Page
- **URL:** `/statewide-plan/strategies/[id]`
- View full strategy details
- **Priority Information Section:** Shows which organizations flagged this as priority
- **Hierarchy Timeline:** Visual path from Goal → Objective → Strategy
- **Tabbed Action Steps:**
  - NC Action Steps (with count)
  - Community Action Steps (with count)
  - Partner Commitments (with count)

#### Step 6: Action Steps & Commitments
- **Action Steps URL:** `/statewide-plan/action-steps`
- **Commitments URL:** `/statewide-plan/commitments`
- Comprehensive filterable tables
- Pagination for action steps (25/50/100 items per page)

### 2.3 Search & Filter Workflow

**Available Filters Vary by Page:**

**Objectives:**
- Search by name
- Filter by Goal

**Strategies:**
- Search by name/code
- Filter by Goal
- Filter by Objective
- Filter by Priority Type

**Action Steps:**
- Search by name/details
- Filter by Goal
- Filter by Objective
- Filter by Strategy
- Filter by Owner Type (NC Staff / Community Collaborative)
- Filter by Status (Ongoing / In Progress / Completed / Not Started)
- Filter by Completion Year
- Filter by Completion Quarter
- Checkbox: "Show only NC Priority action steps"

**Commitments:**
- Search by name/details
- Filter by Goal
- Filter by Objective
- Filter by Strategy
- Filter by Status
- Filter by Completion Year

### 2.4 Breadcrumb Navigation

All detail pages include breadcrumb navigation showing hierarchical path:
- Format: `Statewide Plan > Goal X > Objective Y > Strategy STRG-XXXX`
- Each segment is clickable (except current page)
- Uses ChevronRight icon as separator

---

## 3. Technical Specifications

### 3.1 Technology Stack

**Framework:** Astro (Static Site Generation)
**Styling:** Tailwind CSS
**UI Components:** Flowbite (Tailwind-based component library)
**Icons:** Lucide Icons
**Data Format:** JSON files
**JavaScript:** Vanilla JS for interactivity (filtering, tabs, pagination)

### 3.2 Data Architecture

#### Data Files Location
`/src/data/statewide-plan/`

#### Core Data Files

| File | Description | Count | Size |
|------|-------------|-------|------|
| `goal.json` | 4 core goals | 4 | ~900 bytes |
| `objective.json` | 17 objectives linked to goals | 17 | ~6 KB |
| `strategy.json` | 40 strategies linked to objectives | 40 | ~15 KB |
| `nc_actionstep.json` | NC Staff action steps | 6 | ~6 KB |
| `community_actionstep.json` | Community Collaborative action steps | 385 | ~387 KB |
| `system_partner_commitments.json` | System partner commitments | 2 | ~1.4 KB |

#### Supporting Data Files

| File | Purpose |
|------|---------|
| `ncff_strategy_priority.json` | NCFF priority flags for strategies |
| `collab_strategy_priority.json` | Collaborative priority flags for strategies |
| `partner_strategy_priority.json` | Partner priority flags for strategies |
| `ncff_team.json` | NCFF team information |
| `community_collab.json` | Community collaborative information |
| `system_partners.json` | System partner information |

### 3.3 Data Relationships

#### Primary Keys
- Goals: `goal_id` (UUID)
- Objectives: `objective_id` (UUID)
- Strategies: `strategy_id` (UUID)
- Action Steps: `activity_id` (UUID)
- Commitments: `commitment_id` (UUID)

#### Foreign Key Relationships
```
Objectives.related_goal_id → Goals.goal_id
Strategies.related_objective_id → Objectives.objective_id
Strategies.related_goal_id → Goals.goal_id
ActionSteps.related_strategy_id → Strategies.strategy_id
ActionSteps.related_objective_id → Objectives.objective_id
ActionSteps.related_goal_id → Goals.goal_id
Commitments.related_strategy_id → Strategies.strategy_id
Commitments.related_objective_id → Objectives.objective_id
Commitments.related_goal_id → Goals.goal_id
```

### 3.4 Utility Functions

**File:** `/src/utils/statewide-plan.js`

The utility file provides a comprehensive API for accessing and manipulating Statewide Plan data:

#### Getter Functions
```javascript
getAllGoals()
getAllObjectives()
getAllStrategies()
getAllActionSteps()  // Merges NC + Community action steps
getAllCommitments()

getGoalById(goalId)
getObjectiveById(objectiveId)
getStrategyById(strategyId)
getActionStepById(activityId)
getCommitmentById(commitmentId)
```

#### Relationship Functions
```javascript
getObjectivesByGoalId(goalId)
getStrategiesByObjectiveId(objectiveId)
getStrategiesByGoalId(goalId)
getActionStepsByStrategyId(strategyId)
getActionStepsByObjectiveId(objectiveId)
getActionStepsByGoalId(goalId)
getCommitmentsByStrategyId(strategyId)
getCommitmentsByObjectiveId(objectiveId)
getCommitmentsByGoalId(goalId)
```

#### Hierarchy Functions
```javascript
getHierarchyForStrategy(strategyId)
// Returns: { goal, objective, strategy }

getHierarchyForActionStep(activityId)
// Returns: { goal, objective, strategy, actionStep }

getHierarchyForCommitment(commitmentId)
// Returns: { goal, objective, strategy, commitment }
```

#### Priority Functions
```javascript
getStrategyPriorities(strategyId)
// Returns: { isNcffPriority, isCollabPriority, isPartnerPriority,
//           ncffTeams[], collaboratives[], partners[] }

isStrategyPriority(strategyId, type)
// type: 'ncff' | 'collaborative' | 'partner' | 'any' | 'none'
```

#### Statistics Functions
```javascript
getGoalStatistics(goalId)
// Returns: { objectives, strategies, actionSteps, commitments }

getObjectiveStatistics(objectiveId)
// Returns: { strategies, actionSteps, commitments }

getStrategyStatistics(strategyId)
// Returns: { actionSteps, commitments }
```

#### Filtering Functions
```javascript
filterStrategies(filters)
// Filters: goalId, objectiveId, priorityType, searchTerm

filterActionSteps(filters)
// Filters: goalId, objectiveId, strategyId, ownerType, status,
//          priorityOnly, year, quarter, searchTerm

filterCommitments(filters)
// Filters: goalId, objectiveId, strategyId, status, year, quarter, searchTerm
```

### 3.5 Page Structure

#### File Organization
```
src/pages/statewide-plan/
├── index.astro (redirects to goals)
├── goals/
│   ├── index.astro (all goals)
│   └── [id].astro (single goal detail)
├── objectives/
│   └── index.astro (all objectives with filtering)
├── strategies/
│   ├── index.astro (all strategies with filtering)
│   └── [id].astro (single strategy detail)
├── action-steps/
│   ├── index.astro (all action steps with pagination)
│   └── [id].astro (single action step detail)
└── commitments/
    ├── index.astro (all commitments)
    └── [id].astro (single commitment detail)
```

#### Component Structure
```
src/components/statewide-plan/
├── GoalCard.astro
├── ActionStepTable.astro
└── CommitmentTable.astro
```

### 3.6 Styling System

#### Goal Color Coding
```javascript
Goal 1: Blue (bg-blue-100, text-blue-800, border-blue-500)
Goal 2: Green (bg-green-100, text-green-800, border-green-500)
Goal 3: Purple (bg-purple-100, text-purple-800, border-purple-500)
Goal 4: Pink (bg-pink-100, text-pink-800, border-pink-500)
```

#### Badge Styles

**Priority Badges:**
- NCFF Priority: Yellow (`bg-yellow-100 text-yellow-800`)
- Collaborative Priority: Indigo (`bg-indigo-100 text-indigo-800`)
- Partner Priority: Rose (`bg-rose-100 text-rose-800`)
- NC Priority (action steps): Orange

**Status Badges:**
- Ongoing: Blue (`bg-blue-100 text-blue-800`)
- In Progress: Yellow (`bg-yellow-100 text-yellow-800`)
- Completed: Green (`bg-green-100 text-green-800`)
- Not Started: Gray (`bg-gray-100 text-gray-800`)

**Type Badges:**
- NC Staff: Blue (`bg-blue-100 text-blue-800`)
- Community Collaborative: Green (`bg-green-100 text-green-800`)

### 3.7 Interactive Features

#### Client-Side Filtering
- All filtering performed in browser (no server requests)
- Reactive updates to counts and result displays
- Combined filters use AND logic
- "Clear All Filters" button resets to default state

#### Tab System (Strategy Detail Pages)
- Custom JavaScript implementation
- Switches between NC Actions, Community Actions, and Commitments
- Maintains counts in tab headers
- Shows/hides panels based on selection

#### Pagination (Action Steps Only)
- Items per page: 25, 50, or 100 (default: 50)
- Shows current range: "X-Y of Z action steps"
- Previous/Next navigation
- Page number buttons (shows 5 pages at a time)
- Updates dynamically as filters are applied

### 3.8 Responsive Design

**Breakpoints:**
- Mobile: Full-width cards, stacked filters, horizontal table scroll
- Tablet (md:): 2-column grid for goal cards
- Desktop: Multi-column layouts, inline filters

**Mobile Optimizations:**
- Navigation tabs wrap on small screens
- Tables scroll horizontally
- Filters stack vertically
- Touch-friendly button sizes

### 3.9 Dark Mode Support

All pages include full dark mode support:
- Dark background variants (`dark:bg-gray-800`, `dark:bg-gray-900`)
- Dark text variants (`dark:text-white`, `dark:text-gray-400`)
- Dark border variants (`dark:border-gray-700`)
- Badge colors adjusted for dark mode

---

## 4. Key Features & Benefits

### 4.1 For Executives
- **Visual Hierarchy:** Clear view of how goals cascade into actionable items
- **Progress Tracking:** Status badges show real-time progress
- **Priority Visibility:** See which items are flagged by different stakeholders
- **Statistics:** Counts at every level show scope and scale

### 4.2 For Project Managers
- **Comprehensive Filtering:** Find relevant items quickly across 391+ action steps
- **Ownership Clarity:** Distinguish between NC Staff and Community Collaborative actions
- **Timeline Tracking:** Filter by completion year and quarter
- **Cross-References:** Navigate easily between related items in hierarchy

### 4.3 For Stakeholders
- **Transparency:** Full visibility into Nebraska's community well-being plan
- **Engagement:** See which community collaboratives are involved
- **Alignment:** Understand how individual actions support broader goals
- **Accountability:** Track commitments and action steps tied to organizations

---

## 5. Data Volume Summary

| Entity Type | Count |
|-------------|-------|
| Goals | 4 |
| Objectives | 17 |
| Strategies | 40 |
| Action Steps (Total) | 391 |
| - NC Staff Actions | 6 |
| - Community Collaborative Actions | 385 |
| System Partner Commitments | 2 |
| NCFF Teams | Multiple |
| Community Collaboratives | Multiple |
| System Partners | Multiple |

---

## 6. Future Enhancement Opportunities

Based on the current implementation, potential improvements include:

1. **Export Functionality**
   - CSV/Excel export for filtered results
   - PDF generation for reports
   - Print-friendly views

2. **Advanced Search**
   - Global search across all entity types
   - Full-text search in descriptions
   - Saved search filters

3. **Progress Dashboard**
   - Timeline view for action steps by completion date
   - Progress metrics and visualizations
   - Status change history

4. **Collaboration Features**
   - Comments and notes on items
   - File attachments for evidence
   - User authentication and role-based access

5. **Mobile App**
   - Native iOS/Android applications
   - Offline access to plan data

6. **Real-Time Updates**
   - Database integration (currently static JSON)
   - Live status updates
   - Notification system

7. **Analytics**
   - Completion rate tracking
   - Collaborative engagement metrics
   - Goal progress indicators

---

## 7. Testing & Quality Assurance

### Pre-Deployment Checklist
- [ ] All navigation links function correctly
- [ ] Breadcrumbs display proper hierarchy
- [ ] Filters operate as expected
- [ ] Counts are accurate across all pages
- [ ] Badges display with correct colors
- [ ] Tables are responsive on mobile
- [ ] Pagination works (Action Steps)
- [ ] Tab switching functions (detail pages)
- [ ] "Back" links navigate correctly
- [ ] Data relationships are maintained
- [ ] Dark mode displays properly
- [ ] Search functionality returns relevant results

---

## 8. Conclusion

The Statewide Plan section provides a robust, user-friendly interface for exploring Nebraska's comprehensive Community Well-Being prevention model. With 391 action steps organized across a five-level hierarchy, advanced filtering capabilities, and clear priority flagging, this system enables stakeholders at all levels to understand, track, and engage with Nebraska's vision to create the most robust Community Well-Being prevention model in the nation by 2025.

The static mockup successfully demonstrates the structure, workflow, and visual design needed for the full CLDB implementation, providing executives with a clear picture of the interface's capabilities and user experience.
