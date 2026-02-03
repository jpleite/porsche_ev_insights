# Understanding the Dashboard

This guide explains the overall layout and navigation of Porsche EV Insights.

## Layout Overview

The dashboard uses a standard layout with three main areas:

### Header

The top bar contains:

- **App title** - "Porsche EV Insights"
- **Version badge** - Shows the current version (e.g., "v2.0.0-beta")
- **Vehicle badge** - Displays your selected or detected vehicle model
- **Theme toggle** - Sun/moon icon to switch between light and dark modes

### Sidebar

The left sidebar provides navigation to all sections:

- **Overview** - Summary dashboard (grid icon)
- **My Car** - Live vehicle status (car icon) - only visible when connected to Porsche Connect
- **Patterns** - Driving habits (clock icon)
- **Efficiency** - Consumption analysis (lightning bolt icon)
- **Costs** - Financial comparison (money icon)
- **Environmental** - CO2 impact (globe icon)
- **Battery** - Range and charging (battery icon)
- **Insights** - Recommendations (chart icon)
- **Settings** - Configuration (gear icon)

On desktop, the sidebar is always visible. On mobile devices, it collapses into a hamburger menu that slides in from the left.

### Main Content

The central area displays the content for whichever tab you've selected. Each tab contains a mix of:

- **Stat Cards** - Key metrics displayed as numbers with labels
- **Chart Cards** - Visualizations with titles and legends
- **Information Panels** - Explanatory text and recommendations

## Navigation

### Desktop

Click any item in the sidebar to switch tabs. The current tab is highlighted.

### Mobile

1. Tap the hamburger menu icon (three horizontal lines) in the top-left corner
2. The sidebar slides in from the left
3. Tap a menu item to navigate
4. The sidebar closes automatically after selection

You can also tap outside the sidebar or tap the X icon to close it without navigating.

## Tab Overview

Each tab serves a specific purpose:

| Tab | Purpose |
|-----|---------|
| [Overview](Overview-Tab) | Quick summary of trips, distance, and energy |
| [My Car](My-Car-Tab) | Live vehicle status via Porsche Connect (battery, location, tires) |
| [Patterns](Patterns-Tab) | When you drive, day/time distributions |
| [Efficiency](Efficiency-Tab) | Consumption trends, best/worst trips, speed impact |
| [Costs](Costs-Tab) | Money saved vs. a petrol equivalent |
| [Environmental](Environmental-Tab) | CO2 emissions avoided |
| [Battery](Battery-Tab) | Real-world range, charging analysis |
| [Insights](Insights-Tab) | AI-style tips and predictions |
| [Settings](Settings-and-Configuration) | Configuration and data management |

## Common Elements

### Stat Cards

Small cards showing a single metric with:
- A label describing the metric
- The value with appropriate units
- Color coding when relevant (green for good, red for warnings)

### Chart Cards

Larger cards containing charts with:
- A title describing what's shown
- The chart itself (bar, line, pie, or area)
- A legend when multiple data series are shown
- Tooltips when hovering over data points

### Time View Selector

Several tabs include a toggle to switch between time periods:

- **Day** - Daily aggregation
- **Week** - Weekly aggregation
- **Month** - Monthly aggregation

This affects how the X-axis groups your data in charts.

## Themes

### Light Mode

A clean, bright theme with:
- White backgrounds
- Dark gray text
- Colored accents for charts and highlights

### Dark Mode

An easier-on-the-eyes theme with:
- Dark gray/zinc backgrounds
- Light gray text
- Softer colored accents

Toggle between themes using the sun/moon icon in the header. Your preference is saved and persists across sessions.

## Responsive Design

The dashboard adapts to your screen size:

**Desktop (1024px+)**
- Fixed sidebar always visible
- Charts at full width
- Multiple stat cards per row

**Tablet (640-1024px)**
- Fixed sidebar
- Some charts may be narrower
- 2-3 stat cards per row

**Mobile (<640px)**
- Collapsible sidebar via hamburger menu
- Full-width charts
- Stacked stat cards

## Data Requirements

Different parts of the dashboard require different amounts of data:

| Feature | Minimum Data Needed |
|---------|---------------------|
| Basic stats | 1 trip |
| Trip type distribution | Multiple trips of varying distances |
| Daily patterns | Trips across multiple days |
| Weekly patterns | Trips across multiple weeks |
| Monthly patterns | Trips across multiple months |
| Seasonal analysis | Trips across at least 2 seasons |
| Charging analysis | "Since Charge" file uploaded |

If a chart appears empty, you may not have enough data for that particular analysis.

## Refresh and Updates

The dashboard recalculates all statistics whenever:
- You upload new data
- You merge additional data
- You change settings that affect calculations (like battery capacity)

There's no manual refresh needed - changes take effect immediately.

## Offline Usage

After the initial page load, most features work offline:
- View your existing data
- Navigate between tabs
- Change display settings

You only need an internet connection to:
- First load the dashboard
- Load updates to the dashboard itself
