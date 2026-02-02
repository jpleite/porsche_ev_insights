# Exporting Data from My Porsche / myAudi

The My Porsche and myAudi apps collect detailed trip data every time you drive. This guide explains how to export that data for use with Porsche EV Insights.

## Understanding the Data

Your Porsche automatically records information about every trip, including:

- When you arrived at your destination
- Distance traveled
- Average energy consumption (kWh/100km)
- Average speed

The My Porsche app stores this data and allows you to export it as CSV files.

## Two Types of Exports

The app provides two separate exports:

### Since Start

This file contains your individual trip records. Each row represents one trip from when you turned on the car to when you turned it off. This is the **required** file for Porsche EV Insights.

The file includes:
- Arrival date and time
- Trip distance
- Average consumption
- Average speed

### Since Charge

This file contains your charging cycle records. Each row represents a period from one charge to the next. This file is **optional** but recommended as it enables:

- Accurate charge cycle counting
- Better charging efficiency analysis
- More precise trips-per-charge calculations

## How to Export

### iOS (iPhone/iPad)

1. Open the **My Porsche** app
2. Select your vehicle if you have multiple
3. Tap the **Trip** tab at the bottom of the screen
4. Scroll down to find your trip statistics
5. Look for the **Export** or **Share** option
6. Select **Since Start** and choose to export as CSV
7. Save the file or share it (email to yourself, save to Files, etc.)
8. Repeat for **Since Charge** if desired

### Android

1. Open the **My Porsche** app
2. Select your vehicle
3. Navigate to the **Trip** section
4. Find the export or share option for trip data
5. Select **Since Start** and export as CSV
6. Save the file to your device or cloud storage
7. Repeat for **Since Charge** if desired

## File Naming

When you export, the My Porsche app creates files with names like:

```
Taycan 4 Cross Turismo-Since start-2026-01-30_08-45.csv
Macan Electric-Desde o arranque-2026-01-29_14-54.csv
```

The format is: `[Vehicle Model]-[Export Type]-[Date]_[Time].csv`

Porsche EV Insights uses this filename to automatically detect your vehicle model when you upload.

## Supported Languages

The My Porsche app exports data in your device's language. Porsche EV Insights supports CSV files in:

- **English** - Headers like "arrival time", "distance (km)", "avg. consumption (kwh/100 km)"
- **Portuguese** - Headers like "data de chegada", "distancia", "consumo"

The dashboard automatically detects which language your file uses.

## Date Formats

The exported dates may be in different formats depending on your region:

- **ISO format**: `2025-11-09T13:22:52Z`
- **Portuguese format**: `09/11/2025 13:22`

Both formats are automatically recognized.

## Exporting from myAudi (e-tron GT)

If you have an Audi e-tron GT, you can export data from the myAudi app:

1. Open the **myAudi** app
2. Navigate to **Trips** or **Travel Data**
3. Look for **Export** or **Share** option
4. Export as a **ZIP file** (contains Short-term and Long-term memory CSVs)
5. Transfer the ZIP file to your computer
6. Upload the ZIP directly to Porsche EV Insights

### Audi Data Format

The myAudi app exports data as a ZIP containing CSV files with:
- Trip date and time
- Distance traveled (may be in miles)
- Average speed (may be in mph)
- Average consumption (may be in kWh/100mi)

Porsche EV Insights automatically:
- Extracts the CSV from the ZIP
- Detects imperial units and converts to metric
- Extracts the VIN from the file header
- Maps the data to the standard format used by the dashboard

Note: Audi exports don't include separate charging cycle data, so some charging-specific metrics will show as zero.

## What Data is Captured

Each trip record in the "Since Start" file typically includes:

| Field | Description |
|-------|-------------|
| Arrival Time | When you ended the trip (date and time) |
| Distance | How far you traveled (in kilometers) |
| Consumption | Average energy used (in kWh per 100km) |
| Average Speed | Your average speed (in km/h) |

## Tips for Best Results

**Export regularly**

The My Porsche app may have limits on how much historical data it stores. Export your data periodically to ensure you don't lose old trips.

**Use the merge feature**

If you export data multiple times, you can merge new exports with your existing data in Porsche EV Insights. The dashboard automatically detects and removes duplicate trips.

**Include charging data**

While optional, the "Since Charge" export enables much better analysis of your charging patterns and efficiency per charge cycle.

**Check for completeness**

Before uploading, you can open the CSV file in a spreadsheet application to verify it contains your expected trips.

## Troubleshooting

**The app doesn't show an export option**

Make sure your My Porsche app is updated to the latest version. The export feature requires a relatively recent version.

**The file is empty or has no trips**

Your vehicle may not have recorded any trips yet, or the trips may be in a different section of the app. Check that you're looking at the correct vehicle and time period.

**Some trips are missing**

The vehicle only records trips that meet certain criteria (minimum distance, etc.). Very short movements may not appear.

**The file won't upload**

Ensure the file has a `.csv` extension and hasn't been converted to another format. If you opened it in Excel and saved it, make sure to save as CSV format.

## Data Privacy Note

Your trip data exported from My Porsche contains:
- When you traveled (dates and times)
- How far you traveled
- Your driving efficiency

It does **not** contain:
- GPS locations or routes
- Destinations or addresses
- Vehicle identification numbers
- Personal account information

Porsche EV Insights processes this data entirely in your browser and never uploads it to any server.

Note: Audi e-tron GT exports may include the VIN (Vehicle Identification Number) in the file header, which is extracted for reference but not stored or shared.
