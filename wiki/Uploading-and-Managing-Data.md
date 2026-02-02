# Uploading and Managing Data

This guide covers how to upload your trip data, merge new exports, create backups, and manage your data in Porsche EV Insights.

## Uploading Data

### First Time Upload

When you first visit the dashboard, you'll see a welcome screen with two options:

1. **Upload CSV Files** - Opens the upload dialog for your data
2. **Try Sample Data** - Loads demonstration data to explore the interface

Click **Upload CSV Files** to proceed with your own data.

### The Upload Dialog

The upload dialog has multiple upload areas:

**Audi e-tron GT (ZIP file)**

If you have an Audi e-tron GT, click this area to upload your myAudi ZIP export directly. The ZIP file contains trip memory CSVs that are automatically extracted and processed. Audi data in imperial units (miles/mph) is automatically converted to metric.

**Porsche - Since Start (Required)**

Click this area to select your "Since Start" CSV file from the My Porsche app. This file contains your individual trip records and is required for Porsche vehicles. When a valid file is selected, you'll see:
- A checkmark indicating success
- The filename
- The number of trips found

**Porsche - Since Charge (Optional)**

Click this area to select your "Since Charge" CSV file. This file contains charging cycle data. While not required, it enables:
- Accurate charge cycle counting
- Charging pattern analysis
- Better trips-per-charge calculations

Note: Audi exports don't include separate charging data, so only the trip data is available.

### Processing Your Data

Once you've selected at least the Since Start file, click **Analyze Data** (or **Merge Data** if merging). The dashboard will:

1. Parse your CSV files
2. Extract and validate trip records
3. Calculate aggregated statistics
4. Generate charts and insights
5. Save everything to your browser's local storage

## Merging New Data

If you've already uploaded data and want to add newer trips from a fresh export, use the merge feature.

### How to Merge

1. Go to **Settings** and click **Upload CSV Files**
2. Notice the mode toggle at the top of the dialog
3. Select **Merge** mode (highlighted in green)
4. Upload your new CSV files
5. Click **Merge Data**

### How Merge Works

The merge process intelligently combines your data:

1. Each trip is fingerprinted using: date, distance, and consumption
2. New trips are compared against existing trips
3. Duplicates are automatically detected and skipped
4. Only genuinely new trips are added

After merging, you'll see statistics showing:
- New trips added
- Duplicates skipped
- Total trips now in the dashboard

### Replace vs Merge

| Replace Mode | Merge Mode |
|--------------|------------|
| Deletes all existing data | Keeps existing data |
| Uploads fresh start | Adds only new trips |
| Good for starting over | Good for incremental updates |
| Blue button styling | Green button styling |

## Backups

### Creating a Backup

To save your data for safekeeping or to transfer to another device:

1. Go to **Settings**
2. Find the **Backup & Restore** section
3. Click **Download Backup**

A JSON file will download with a name like:
```
taycan-4-cross-turismo-backup-2026-01-30T14-30-00.json
```

### What's in a Backup

The backup file contains:
- All your processed trip data
- Raw CSV data (for future merging)
- Your vehicle model selection
- All your settings (prices, units, currency, language)

### Restoring from Backup

To restore a previously saved backup:

1. Go to **Settings**
2. Find the **Backup & Restore** section
3. Click **Restore Backup**
4. Select your backup JSON file

Your data and settings will be restored. This will replace any current data in the dashboard.

### Backup Versions

Backup files have a version number. The current version (v4) includes raw CSV data which enables the merge feature to work properly after restoring. Older backups (v2-v3) can still be restored, but the raw data will be reconstructed from processed trips with slightly less precision for future merges.

## Clearing Data

To delete all data from the dashboard:

1. Go to **Settings**
2. Find the **Data Management** section
3. Click **Clear All Data**
4. Confirm the action in the dialog

This permanently removes:
- All trip data
- All settings
- Vehicle model selection

The only way to recover is from a backup you previously created.

## Local Storage

Your data is stored in your browser's local storage under these keys:

| Key | Contents |
|-----|----------|
| `taycan_data` | Processed trip analytics |
| `taycan_raw_data` | Raw CSV rows for merging |
| `taycan_vehicle_model` | Selected vehicle name |
| `taycan_settings` | User preferences |
| `taycan_theme` | Dark/light mode preference |

### Storage Limits

Browser local storage typically allows 5-10 MB per domain. This is enough for thousands of trips. If you somehow exceed this limit, you'll see an error when the dashboard tries to save.

### Privacy Implications

Because data is in local storage:
- It stays on your device only
- It persists until you clear it or clear browser data
- Other websites cannot access it
- Incognito/private browsing does not persist data

## Automatic Vehicle Detection

When you upload a CSV file, the dashboard attempts to detect your vehicle model from the filename or content. For example:

**Porsche:**
- `Taycan 4 Cross Turismo-Since start-2026-01-30.csv` detects "Taycan 4 Cross Turismo"
- `Macan Electric-Desde o arranque-2026-01-29.csv` detects "Macan Electric"

**Audi:**
- ZIP files containing Audi trip data are automatically detected as "Audi e-tron GT"
- The VIN from the CSV header is extracted for reference

If detected, the vehicle model is shown in the header badge. You can always override this by selecting a different vehicle in Settings.

## Troubleshooting

**Upload button stays disabled**

A "Since Start" file is required. Make sure you've selected a valid CSV file in the first drop zone.

**Merge shows 0 new trips**

All trips in your new export already exist in the dashboard. This happens when you re-upload the same file or an older export.

**File parsing failed**

Check that your file:
- Has a `.csv` extension
- Contains the expected column headers
- Uses UTF-8 encoding
- Wasn't corrupted during transfer

**Backup file won't restore**

Ensure the file:
- Has a `.json` extension
- Was created by Porsche EV Insights
- Hasn't been edited or corrupted

**Data disappeared after clearing browser data**

Local storage is cleared when you clear browser data. This is why creating regular backups is recommended.
