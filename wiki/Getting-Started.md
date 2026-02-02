# Getting Started

This guide walks you through using Porsche EV Insights for the first time.

## Prerequisites

Before you begin, you'll need:

- A Porsche electric vehicle (Taycan, Macan Electric, or Cayenne Electric) or an **Audi e-tron GT**
- The **My Porsche** app (for Porsche) or **myAudi** app (for Audi) installed on your phone
- Trip data collected by your vehicle (trips are automatically recorded)
- A modern web browser (Chrome, Firefox, Safari, or Edge)

## Step 1: Export Your Data

First, you need to export your trip data from your vehicle's app.

**For Porsche vehicles:** Export from the My Porsche app:
1. **Since Start** (required) - Contains all individual trip records
2. **Since Charge** (optional) - Contains charging cycle information

**For Audi e-tron GT:** Export from the myAudi app as a ZIP file containing trip memory data.

For detailed instructions on exporting, see [Exporting Data from My Porsche](Exporting-Data-from-My-Porsche).

## Step 2: Open the Dashboard

Visit the dashboard at:

**[https://jpleite.github.io/porsche_ev_insights](https://jpleite.github.io/porsche_ev_insights)**

You'll see a welcome screen with two options:

- **Upload CSV Files** - Load your own data
- **Try Sample Data** - Explore the dashboard with demo data

If this is your first time, you might want to try the sample data first to familiarize yourself with the interface.

## Step 3: Upload Your Data

Click the **Upload CSV Files** button. You'll see a dialog with upload areas:

**For Audi e-tron GT:**
- **Audi ZIP File** - Upload your myAudi ZIP export directly

**For Porsche vehicles:**
1. **Since Start** (Required) - Click this area and select your "Since start" CSV file
2. **Since Charge** (Optional) - Click this area and select your "Since charge" CSV file if you have it

Once you've selected your file(s), click **Analyze Data** to process your trips.

## Step 4: Select Your Vehicle

After uploading, go to the **Settings** tab (gear icon in the sidebar) and select your specific vehicle model from the dropdown. This is important because it:

- Sets the correct battery capacity for range calculations
- Provides accurate WLTP consumption benchmarks
- Enables proper efficiency comparisons

The dashboard supports over 50 vehicle configurations across all Porsche EV model lines.

## Step 5: Configure Your Preferences

Still in Settings, you may want to adjust:

- **Unit System** - Metric (km) or Imperial (miles) for UK or US
- **Currency** - Your local currency for cost calculations
- **Electricity Price** - What you pay per kWh
- **Petrol Price** - Local fuel price for comparison
- **Language** - 10 languages supported

## Step 6: Explore Your Data

Navigate through the tabs to discover insights about your driving:

- **Overview** - Quick summary of your trips and distance
- **Patterns** - When and how you drive
- **Efficiency** - How well you're using energy
- **Costs** - Money saved compared to petrol
- **Environmental** - Your CO2 savings
- **Battery** - Range and charging analysis
- **Insights** - Personalized recommendations

## Data Persistence

Your data is automatically saved in your browser's local storage. This means:

- Data persists between sessions
- You can close the browser and return later
- Data is only stored on your device
- Clearing browser data will remove it

## Next Steps

- Learn more about [exporting from My Porsche](Exporting-Data-from-My-Porsche)
- Understand the [CSV data format](CSV-Data-Format-Reference)
- Explore [settings and configuration](Settings-and-Configuration)
- Read about each [dashboard tab](Understanding-the-Dashboard)

## Troubleshooting

**The upload button stays disabled**

Make sure you've selected a valid "Since Start" CSV file. This file is required.

**My data shows 0 trips**

Check that your CSV file contains actual trip data. The file should have rows with arrival dates, distances, and consumption values.

**Consumption values look wrong**

Verify you've selected the correct vehicle model in Settings. The WLTP benchmarks vary significantly between models.

**Charts are empty**

Some charts require minimum data. For example, seasonal efficiency needs trips across multiple seasons.
