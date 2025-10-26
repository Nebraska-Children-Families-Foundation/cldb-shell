# Community Lens Database - UI Style Guide

**Version:** 1.0
**Last Updated:** October 25, 2025

This style guide documents the design patterns, components, and styling conventions used across the Community Lens Database application. Follow these guidelines to maintain consistency throughout the application.

---

## Table of Contents

1. [Design System Overview](#design-system-overview)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Layout & Spacing](#layout--spacing)
5. [Components](#components)
6. [Forms](#forms)
7. [Tables](#tables)
8. [Buttons](#buttons)
9. [Cards](#cards)
10. [Modals](#modals)
11. [Navigation](#navigation)
12. [Dark Mode](#dark-mode)
13. [Best Practices](#best-practices)

---

## Design System Overview

### Technology Stack

- **Framework:** Astro
- **CSS Framework:** Tailwind CSS v4
- **Component Library:** Flowbite v3.1.2
- **Icons:** Heroicons (via SVG)
- **Font:** Inter (Google Fonts)
- **Map Library:** Leaflet

### Design Principles

- **Consistency:** Use the same patterns for similar interactions
- **Accessibility:** Support dark mode, semantic HTML, and proper ARIA labels
- **Responsiveness:** Mobile-first approach with responsive breakpoints
- **Clarity:** Clear visual hierarchy and readable content

---

## Color Palette

### Light Mode

#### Primary Colors (Blue)
```css
--color-primary-50:  #eff6ff
--color-primary-100: #dbeafe
--color-primary-200: #bfdbfe
--color-primary-300: #93c5fd
--color-primary-400: #60a5fa
--color-primary-500: #3b82f6  /* Primary action color */
--color-primary-600: #2563eb  /* Primary hover color */
--color-primary-700: #1d4ed8
--color-primary-800: #1e40af
--color-primary-900: #1e3a8a
```

**Usage:**
- `blue-600` - Primary buttons, links, active states
- `blue-700` - Hover states for primary buttons
- `blue-500` - Focus rings, secondary accents

#### Grayscale
```
gray-50:  Background (light mode)
gray-100: Disabled field backgrounds
gray-200: Borders, dividers
gray-300: Input borders
gray-400: Icons, placeholder text
gray-500: Secondary text
gray-600: Headings
gray-700: Primary text
gray-800: Dark backgrounds
gray-900: Darkest backgrounds, highest contrast text
```

#### Accent Colors

**Success/Green**
- `green-600` - Success states, "Attendance Report" accent
- `green-700` - Hover states

**Status Badges**
- Blue: Monthly reports
- Green: As-needed reports

### Dark Mode

Background progression:
- `dark:bg-gray-900` - Page background
- `dark:bg-gray-800` - Card/panel background
- `dark:bg-gray-700` - Elevated elements (dropdowns, modals)
- `dark:bg-gray-600` - Hover states

Text colors:
- `dark:text-white` - Primary headings and labels
- `dark:text-gray-300` - Body text, table headers
- `dark:text-gray-400` - Secondary text, helper text

Borders:
- `dark:border-gray-700` - Primary borders
- `dark:border-gray-600` - Section borders

---

## Typography

### Font Family

```css
font-family: 'Inter', ui-sans-serif, system-ui, -apple-system,
             'Segoe UI', Roboto, 'Helvetica Neue', Arial,
             'Noto Sans', sans-serif;
```

### Text Hierarchy

#### Headings

**Page Title (H1)**
```html
<h1 class="text-3xl font-bold text-gray-900 dark:text-white">
  Create Child Care Partnership Report
</h1>
```

**Section Title (H2)**
```html
<h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
  General Information
</h2>
```

**Subsection Title (H3)**
```html
<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
  Community Collaboratives
</h3>
```

#### Body Text

**Primary Text**
```html
<p class="text-gray-700 dark:text-gray-300">
  Regular body text content
</p>
```

**Secondary/Helper Text**
```html
<p class="text-sm text-gray-500 dark:text-gray-400">
  Helper text, descriptions, and metadata
</p>
```

#### Labels

**Form Labels**
```html
<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
  Field Name
</label>
```

**Small Labels (Inline)**
```html
<label class="block mb-1 text-xs text-gray-600 dark:text-gray-400">
  First Name
</label>
```

#### Links

**Standard Link**
```html
<a href="#" class="text-blue-600 dark:text-blue-400 hover:underline">
  Link Text
</a>
```

**Navigation Link with Icon**
```html
<a href="#" class="text-sm font-medium text-blue-600 hover:underline
   dark:text-blue-500 flex items-center">
  <svg class="w-5 h-5 mr-1">...</svg>
  Back to Reports
</a>
```

---

## Layout & Spacing

### Page Structure

```
┌─────────────────────────────────────┐
│         Fixed Navbar (h-16)         │
├───────────┬─────────────────────────┤
│           │                         │
│  Sidebar  │     Main Content        │
│  (w-64)   │     (flex-auto)         │
│  Fixed    │     pt-16, p-4          │
│           │                         │
└───────────┴─────────────────────────┘
```

### Container Classes

**Page Container**
```html
<div class="max-w-4xl mx-auto">
  <!-- Most forms and detail pages -->
</div>

<div class="max-w-6xl mx-auto">
  <!-- Wider layouts like report selector -->
</div>
```

**Main Content Padding**
```html
<div class="p-4">
  <!-- Standard page padding -->
</div>
```

### Spacing Scale

Use Tailwind's default spacing scale:
- `mb-2` - 0.5rem (8px) - Tight spacing between label and input
- `mb-4` - 1rem (16px) - Standard spacing between form fields
- `mb-6` - 1.5rem (24px) - Spacing between sections
- `gap-4` - 1rem (16px) - Grid and flex gap spacing
- `gap-6` - 1.5rem (24px) - Larger grid spacing

### Section Dividers

```html
<div class="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
  <!-- Section content -->
</div>
```

---

## Components

### Command/Filter Bar

Used on list pages (e.g., `/people`) for filtering and view controls.

```html
<div class="mb-4 flex items-center justify-between bg-white dark:bg-gray-800
     p-4 rounded-lg border border-gray-200 dark:border-gray-700">

  <!-- Left: Filters -->
  <div class="flex items-center gap-4">
    <!-- Dropdown filters here -->
  </div>

  <!-- Right: View Toggles -->
  <div class="flex items-center gap-2">
    <!-- View toggle buttons here -->
  </div>
</div>
```

### Dropdown Filters

```html
<button id="filterButton" data-dropdown-toggle="filterDropdown"
  class="text-gray-900 bg-white border border-gray-300 focus:outline-none
  hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg
  text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600
  dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700
  inline-flex items-center" type="button">
  <span id="filterButtonText">Filter Name</span>
  <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true"
       xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
    <path stroke="currentColor" stroke-linecap="round"
          stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
  </svg>
</button>
```

### Clear Filters Button

```html
<button type="button"
  class="text-gray-700 bg-gray-100 border border-gray-300 focus:outline-none
  hover:bg-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg
  text-sm px-5 py-2.5 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500
  dark:hover:bg-gray-500 dark:focus:ring-gray-700 inline-flex items-center gap-2">
  <svg class="w-4 h-4">...</svg>
  Clear Filters
</button>
```

### View Toggle Buttons

```html
<!-- Active State -->
<button type="button"
  class="p-2 text-gray-900 bg-gray-100 rounded-lg dark:text-white dark:bg-gray-700">
  <svg class="w-6 h-6">...</svg>
</button>

<!-- Inactive State -->
<button type="button"
  class="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100
  dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700">
  <svg class="w-6 h-6">...</svg>
</button>
```

---

## Forms

### Form Container

```html
<div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
  <!-- Form content -->
</div>
```

### Text Input

```html
<div class="mb-4">
  <label for="input-id"
    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    Field Label
  </label>
  <input type="text" id="input-id"
    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
</div>
```

### Disabled Input with "Change" Button

Pattern for pre-filled fields that can be edited.

```html
<div class="mb-4">
  <label for="field-id"
    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    Field Label
  </label>
  <div class="flex">
    <input type="text" id="field-id" disabled
      class="bg-gray-100 border border-gray-300 text-gray-900 text-sm
      rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
      dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
      dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      value="Pre-filled value">
    <button type="button" id="change-field"
      class="ml-2 px-3 py-2 text-sm font-medium text-blue-600 bg-white
      border border-blue-600 rounded-lg hover:bg-blue-50 focus:ring-4
      focus:outline-none focus:ring-blue-300 dark:bg-gray-800
      dark:text-blue-500 dark:border-blue-500 dark:hover:bg-gray-700
      dark:focus:ring-blue-800">
      Change
    </button>
  </div>
</div>
```

### Select Dropdown

```html
<div class="mb-4">
  <label for="select-id"
    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    Select Label
  </label>
  <select id="select-id"
    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <option selected>Option 1</option>
    <option>Option 2</option>
    <option>Option 3</option>
  </select>
</div>
```

### Number Input

```html
<input type="number" id="number-id"
  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
```

### Month Input

```html
<input type="month" id="report-date" name="report-date"
  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  value="2025-04">
```

### Checkbox

```html
<div class="flex items-center">
  <input id="checkbox-id" type="checkbox"
    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded
    focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800
    focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
  <label for="checkbox-id" class="ml-2 text-sm text-gray-900 dark:text-white">
    Checkbox Label
  </label>
</div>
```

### Helper Text

```html
<p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
  Please select the month and year for this report.
</p>
```

### Inline Form Fields (Multiple Columns)

```html
<div class="flex flex-wrap gap-4 mb-3">
  <div>
    <label for="first-name"
      class="block mb-1 text-xs text-gray-600 dark:text-gray-400">
      First Name
    </label>
    <input type="text" id="first-name" class="...">
  </div>
  <div>
    <label for="last-name"
      class="block mb-1 text-xs text-gray-600 dark:text-gray-400">
      Last Name
    </label>
    <input type="text" id="last-name" class="...">
  </div>
</div>
```

### Form Sections

Use borders to separate logical form sections:

```html
<div class="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
  <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
    Section Title
  </h2>
  <p class="text-gray-600 dark:text-gray-400 mb-4">
    Section description or instructions
  </p>

  <!-- Form fields here -->
</div>
```

### Grouped Inputs with Visual Hierarchy

For nested or related fields:

```html
<div class="space-y-3 pl-3 border-l-2 border-gray-200 dark:border-gray-700">
  <div>
    <label for="risk-1" class="block mb-1 text-sm text-gray-700 dark:text-gray-300">
      Risk Factor Description
    </label>
    <input type="number" id="risk-1" class="...">
  </div>
  <!-- More related fields -->
</div>
```

---

## Tables

### Standard Table

```html
<div class="bg-white dark:bg-gray-800 border border-gray-200
     dark:border-gray-700 rounded-lg overflow-hidden">
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead class="bg-gray-50 dark:bg-gray-700">
        <tr>
          <th scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500
            dark:text-gray-300 uppercase tracking-wider">
            Name
          </th>
          <!-- More headers -->
        </tr>
      </thead>
      <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200
                    dark:divide-gray-700">
        <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium
                     text-gray-900 dark:text-white">
            Cell Content
          </td>
          <!-- More cells -->
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

### Table Cell Variants

**Primary Cell (Name/Title)**
```html
<td class="px-6 py-4 whitespace-nowrap text-sm font-medium
           text-gray-900 dark:text-white">
  John Doe
</td>
```

**Regular Cell**
```html
<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500
           dark:text-gray-300">
  Regular content
</td>
```

**Wrapped Cell (Long Text)**
```html
<td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
  Long content that can wrap to multiple lines
</td>
```

**Link Cell**
```html
<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500
           dark:text-gray-300">
  <a href="mailto:email@example.com"
     class="text-blue-600 dark:text-blue-400 hover:underline">
    email@example.com
  </a>
</td>
```

**Empty Cell**
```html
<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500
           dark:text-gray-300">
  —
</td>
```

### Simplified Table (No Header Background)

```html
<table class="min-w-full divide-y divide-gray-700">
  <thead>
    <tr>
      <th class="px-4 py-2 text-left text-sm font-medium text-gray-300">
        Collaborative
      </th>
      <th class="px-4 py-2 text-left text-sm font-medium text-gray-300">
        City
      </th>
    </tr>
  </thead>
  <tbody class="divide-y divide-gray-700">
    <tr>
      <td class="px-4 py-2 text-sm text-white">Cell content</td>
      <td class="px-4 py-2 text-sm text-white">Cell content</td>
    </tr>
  </tbody>
</table>
```

### Stats Summary

Place below tables to show result counts:

```html
<div class="mt-4 text-sm text-gray-500 dark:text-gray-400">
  Showing <span id="count">45</span> people
</div>
```

---

## Buttons

### Primary Button

```html
<button type="submit"
  class="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg
  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300
  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
  Submit Report
</button>
```

### Secondary Button (Outlined)

```html
<button type="button"
  class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border
  border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4
  focus:outline-none focus:ring-gray-200 dark:bg-gray-800
  dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700
  dark:hover:text-white dark:focus:ring-gray-700">
  Save as Draft
</button>
```

### Blue Outlined Button (Change Button)

```html
<button type="button"
  class="px-3 py-2 text-sm font-medium text-blue-600 bg-white border
  border-blue-600 rounded-lg hover:bg-blue-50 focus:ring-4
  focus:outline-none focus:ring-blue-300 dark:bg-gray-800
  dark:text-blue-500 dark:border-blue-500 dark:hover:bg-gray-700
  dark:focus:ring-blue-800">
  Change
</button>
```

### Text Link Button (Add Actions)

```html
<button type="button"
  class="text-blue-600 hover:text-blue-800 dark:text-blue-500
  dark:hover:text-blue-400 font-medium text-sm inline-flex items-center">
  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
    <!-- Plus icon -->
  </svg>
  Add New Teacher
</button>
```

### Icon Button

```html
<button type="button"
  class="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100
  dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700
  focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
  <svg class="w-6 h-6" fill="currentColor">...</svg>
</button>
```

### Button with Icon

```html
<a href="/reports/create-ccp-report"
  class="inline-flex items-center px-4 py-2 bg-blue-600 border
  border-transparent rounded-md font-semibold text-xs text-white uppercase
  tracking-widest hover:bg-blue-700 active:bg-blue-800 focus:outline-none
  focus:border-blue-800 focus:ring ring-blue-300 disabled:opacity-25
  transition">
  Create Report
  <svg class="ml-2 -mr-1 w-4 h-4" fill="currentColor">...</svg>
</a>
```

### Button Group (Horizontal)

```html
<div class="flex justify-end space-x-4">
  <button type="button" class="...">Save as Draft</button>
  <button type="submit" class="...">Submit Report</button>
</div>
```

---

## Cards

### Report Selection Card

```html
<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden
     border border-gray-200 dark:border-gray-700 transition-all hover:shadow-lg">

  <!-- Colored top border -->
  <div class="h-3 bg-blue-600"></div>

  <div class="p-6">
    <!-- Header with title and badge -->
    <div class="flex justify-between mb-4">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
        Card Title
      </h2>
      <span class="px-3 py-1 text-xs font-medium rounded-full bg-blue-100
             text-blue-800 dark:bg-blue-900 dark:text-blue-300">
        Monthly
      </span>
    </div>

    <!-- Card content -->
    <div class="space-y-4 mb-6">
      <!-- Info rows with icons -->
    </div>

    <!-- Card footer -->
    <div class="flex items-center justify-between">
      <span class="text-sm text-gray-500 dark:text-gray-400">
        Status text
      </span>
      <button class="...">Action</button>
    </div>
  </div>
</div>
```

### Info Row with Icon (Inside Cards)

```html
<div class="flex items-start">
  <svg class="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5 mr-2">
    <!-- Icon -->
  </svg>
  <div>
    <p class="text-sm text-gray-500 dark:text-gray-400">Label</p>
    <p class="text-gray-900 dark:text-white font-medium">Value</p>
  </div>
</div>
```

### Help/Info Card

```html
<div class="mt-10 bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
  <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4
             flex items-center">
    <svg class="w-6 h-6 mr-2 text-blue-600 dark:text-blue-500">...</svg>
    Need Help?
  </h2>
  <p class="text-gray-600 dark:text-gray-400 mb-4">
    Description text
  </p>
  <!-- Action buttons -->
</div>
```

### Content Card (General Purpose)

```html
<div class="bg-white dark:bg-gray-800 border border-gray-200
     dark:border-gray-700 rounded-lg overflow-hidden">
  <!-- Card content -->
</div>
```

---

## Modals

### Standard Modal Structure (Flowbite)

```html
<div id="modal-id" tabindex="-1" aria-hidden="true"
  class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden
  overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">

  <!-- Modal sizing wrapper -->
  <div class="relative w-full max-w-4xl max-h-full">

    <!-- Modal content -->
    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">

      <!-- Modal header -->
      <div class="flex items-start justify-between p-4 border-b rounded-t
                  dark:border-gray-600">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
          Modal Title
        </h3>
        <button type="button" data-modal-hide="modal-id"
          class="text-gray-400 bg-transparent hover:bg-gray-200
          hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex
          justify-center items-center dark:hover:bg-gray-600
          dark:hover:text-white">
          <svg class="w-3 h-3">...</svg>
          <span class="sr-only">Close modal</span>
        </button>
      </div>

      <!-- Modal body -->
      <div class="p-6 space-y-6">
        <!-- Modal content here -->
      </div>

      <!-- Modal footer -->
      <div class="flex items-center p-6 space-x-2 border-t
                  border-gray-200 rounded-b dark:border-gray-600">
        <button data-modal-hide="modal-id" type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
          focus:outline-none focus:ring-blue-300 font-medium rounded-lg
          text-sm px-5 py-2.5 text-center dark:bg-blue-600
          dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Confirm
        </button>
        <button data-modal-hide="modal-id" type="button"
          class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4
          focus:outline-none focus:ring-gray-200 rounded-lg border
          border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900
          focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500
          dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
          Cancel
        </button>
      </div>
    </div>
  </div>
</div>
```

### Modal with Search (People Picker)

```html
<!-- Search input in modal body -->
<div class="mb-4">
  <label for="search-people"
    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    Search by name
  </label>
  <div class="relative">
    <div class="absolute inset-y-0 left-0 flex items-center pl-3
                pointer-events-none">
      <svg class="w-4 h-4 text-gray-500 dark:text-gray-400">...</svg>
    </div>
    <input type="search" id="search-people"
      class="block w-full p-4 pl-10 text-sm text-gray-900 border
      border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500
      focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600
      dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
      dark:focus:border-blue-500"
      placeholder="Search people...">
  </div>
</div>

<!-- Scrollable results list -->
<div class="h-64 overflow-y-auto border border-gray-200 rounded-lg
            dark:border-gray-700">
  <ul class="divide-y divide-gray-200 dark:divide-gray-700">
    <li class="p-3 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">
      <!-- List item content -->
    </li>
  </ul>
</div>
```

### Modal with Grid Layout

Use for form-heavy modals:

```html
<div class="p-6 space-y-6">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label>Field 1</label>
      <input type="text" class="...">
    </div>
    <div>
      <label>Field 2</label>
      <input type="text" class="...">
    </div>
  </div>
</div>
```

---

## Navigation

### Main Navbar

Fixed at top, 60px height:

```html
<nav class="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800
            dark:border-gray-700 fixed left-0 right-0 top-0 z-50 h-[60px]">
  <!-- Navbar content -->
</nav>
```

### Sidebar Navigation

Fixed on left side, 256px wide (w-64):

```html
<aside class="fixed top-16 left-0 w-64 h-full">
  <!-- Sidebar content -->
</aside>
```

### Breadcrumbs / Back Navigation

```html
<a href="/reports"
  class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500
  flex items-center">
  <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor"
       viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
  </svg>
  Back to Reports Dashboard
</a>
```

### Dropdown Menu (Flowbite)

```html
<button type="button" data-dropdown-toggle="dropdown-id"
  class="...">
  <!-- Button content -->
</button>

<div id="dropdown-id"
  class="hidden overflow-hidden z-50 my-4 max-w-sm text-base list-none
  bg-white rounded divide-y divide-gray-100 shadow-lg dark:bg-gray-700
  dark:divide-gray-600 rounded-xl">

  <!-- Optional header -->
  <div class="block py-2 px-4 text-base font-medium text-center text-gray-700
              bg-gray-50 dark:bg-gray-600 dark:text-gray-300">
    Dropdown Header
  </div>

  <!-- Dropdown content -->
  <div class="py-2">
    <a href="#"
      class="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600
      dark:hover:text-white">
      Option 1
    </a>
  </div>
</div>
```

---

## Dark Mode

### Implementation

Dark mode uses Tailwind's `dark:` variant with class-based toggling:

```html
<html lang="en" class="dark">
  <!-- When dark class is present, dark mode is active -->
</html>
```

### Toggle Script (Already Implemented)

```javascript
// Immediately set theme to prevent FOUC
(function() {
  const storedTheme = localStorage.getItem("theme");
  const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (storedTheme === "dark" || (!storedTheme && prefersDarkMode)) {
    document.documentElement.classList.add("dark");
  }
})();
```

### Dark Mode Classes Reference

Always include dark mode variants for:
- Backgrounds: `dark:bg-gray-900`, `dark:bg-gray-800`, `dark:bg-gray-700`
- Text: `dark:text-white`, `dark:text-gray-300`, `dark:text-gray-400`
- Borders: `dark:border-gray-700`, `dark:border-gray-600`
- Hovers: `dark:hover:bg-gray-700`, `dark:hover:text-white`
- Focus rings: `dark:focus:ring-blue-800`

---

## Best Practices

### Accessibility

1. **Always use semantic HTML**
   - `<button>` for actions, `<a>` for navigation
   - Proper heading hierarchy (h1 → h2 → h3)
   - Use `<label>` elements with `for` attributes

2. **ARIA labels**
   - Include `aria-label` or `aria-labelledby` on icon-only buttons
   - Use `sr-only` class for screen-reader-only text
   - Set `aria-hidden="true"` on decorative icons

3. **Focus states**
   - Always include focus ring classes
   - Test keyboard navigation

4. **Color contrast**
   - Ensure text meets WCAG AA standards
   - Don't rely solely on color to convey information

### Responsive Design

1. **Mobile-first approach**
   - Base styles for mobile
   - Use `md:`, `lg:` breakpoints for larger screens

2. **Common patterns:**
   ```html
   <!-- Hide on mobile, show on desktop -->
   class="hidden md:block"

   <!-- Full width on mobile, fixed width on desktop -->
   class="w-full md:w-64"

   <!-- Stack on mobile, grid on desktop -->
   class="grid grid-cols-1 md:grid-cols-2 gap-6"
   ```

3. **Overflow handling:**
   - Use `overflow-x-auto` for tables
   - Test on mobile devices

### Spacing & Alignment

1. **Icon-to-text spacing in navigation elements**
   - Use `gap-2` (flexbox gap) instead of `mr-*` for better spacing between icons and text
   - Icon size should be `w-4 h-4` for breadcrumb icons to match text size
   - Example:
   ```html
   <!-- Good: Uses gap and proper icon size -->
   <a href="..." class="inline-flex items-center gap-2">
     <svg class="w-4 h-4">...</svg>
     Text Label
   </a>

   <!-- Avoid: Uses margin and small icon -->
   <a href="..." class="inline-flex items-center">
     <svg class="w-3 h-3 mr-2.5">...</svg>
     Text Label
   </a>
   ```

2. **Timeline and hierarchical displays**
   - Add left margin to timeline container (`ms-4`) to prevent icons from crowding card edges
   - Use `ms-6` on list items to create proper clearance for timeline icons
   - Increase icon size to `w-8 h-8` for better visibility
   - Remove ring styles (`ring-8`) in dark mode to avoid white circles around icons
   - Example:
   ```html
   <ol class="relative border-s border-gray-200 dark:border-gray-700 ms-4">
     <li class="mb-6 ms-6">
       <span class="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -start-4 dark:bg-blue-900">
         <svg class="w-2.5 h-2.5">...</svg>
       </span>
       <h3 class="flex items-start mb-1 text-base">
         <span class="font-semibold mr-2">Label:</span>
         <span class="flex-1">Content</span>
       </h3>
     </li>
   </ol>
   ```

3. **Typography in hierarchical elements**
   - Use `flex items-start` for proper alignment of multi-line content
   - Only bold the label portion, keep content regular weight
   - Use `text-base` instead of `text-lg` for better readability
   - Wrap content in `flex-1` span for proper text flow

4. **Card content spacing**
   - Maintain consistent padding inside cards (typically `p-6`)
   - Use margin utilities on nested elements rather than increasing card padding
   - Ensure icons and content have breathing room from card edges

### Performance

1. **Icon usage**
   - Use inline SVGs for better control and performance
   - Consistent icon sizing: `w-4 h-4`, `w-5 h-5`, `w-6 h-6`

2. **Loading states**
   - Consider disabled states for form submissions
   - Use loading spinners for async operations

### Code Organization

1. **Consistent class ordering**
   - Layout (display, position)
   - Box model (padding, margin, border)
   - Typography (font, text color)
   - Visual (background, shadows)
   - Interactive (hover, focus)
   - Responsive (md:, lg:)
   - Dark mode (dark:)

2. **Component reusability**
   - Extract repeated patterns into Astro components
   - Use consistent naming conventions

3. **Comments**
   - Comment sections in long forms
   - Document non-obvious interactions

### Interactive Elements

1. **Buttons must have clear states:**
   - Default
   - Hover
   - Focus
   - Active
   - Disabled

2. **Form validation**
   - Use browser native validation where possible
   - Provide clear error messages
   - Show field-level validation feedback

3. **Loading and disabled states**
   - Disable buttons during form submission
   - Show loading indicators for async operations

---

## Component Examples by Page

### Home Page (/)
- Map container with rounded borders
- Simple table with gray background
- Fixed layout structure

### People Page (/people)
- Filter bar with multiple dropdowns
- Data table with hover states
- View toggle buttons
- Clear filters functionality

### Create CCP Report (/reports/create-ccp-report)
- Multi-section form with dividers
- Disabled fields with "Change" buttons
- Dynamic form fields (add teacher)
- Modal dialogs for editing
- Grid layout for program details modal

### Report Selection (/reports/create-report)
- Card grid layout
- Color-coded cards (blue, green)
- Status badges
- Info rows with icons
- Help section card

---

## Resources

### External Documentation

- [Tailwind CSS](https://tailwindcss.com/docs)
- [Flowbite Components](https://flowbite.com/docs/getting-started/introduction/)
- [Heroicons](https://heroicons.com/)
- [Inter Font](https://fonts.google.com/specimen/Inter)

### Tools

- [Tailwind Color Palette](https://tailwindcss.com/docs/customizing-colors)
- [Flowbite Design System](https://flowbite.com/figma/)

---

## Changelog

### Version 1.0 (October 25, 2025)
- Initial style guide created
- Documented all major UI patterns from existing pages
- Included dark mode guidelines
- Added accessibility best practices
