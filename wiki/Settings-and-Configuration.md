# Settings and Configuration

The Settings tab allows you to customize the dashboard to match your vehicle, location, and preferences.

## Accessing Settings

Click the **Settings** icon (gear) in the sidebar to access the configuration page.

## Vehicle Settings

### Vehicle Model

Select your specific Porsche EV model from the dropdown. Vehicles are grouped by model line:

**Taycan Sedan**
- Taycan (Base RWD)
- Taycan 4
- Taycan 4S
- Taycan GTS
- Taycan Turbo
- Taycan Turbo S
- Taycan Turbo GT

**Taycan Cross Turismo**
- Taycan 4 Cross Turismo
- Taycan 4S Cross Turismo
- Taycan GTS Cross Turismo
- Taycan Turbo Cross Turismo
- Taycan Turbo S Cross Turismo

**Taycan Sport Turismo**
- Taycan 4S Sport Turismo
- Taycan GTS Sport Turismo

**Macan Electric**
- Macan Electric (Base)
- Macan 4 Electric
- Macan 4S Electric
- Macan Turbo Electric

**Cayenne Electric**
- Cayenne Electric (Base)
- Cayenne Turbo Electric

**Audi e-tron GT** (J1 platform)
- e-tron GT (2021-2024, 2025+)
- S e-tron GT (2025+)
- RS e-tron GT (2021-2024, 2025+)
- RS e-tron GT performance (2025+)

When you select a vehicle, its specifications are displayed:
- Gross battery capacity
- Usable battery capacity
- WLTP range
- WLTP consumption

### Battery Capacity

The usable battery capacity in kWh. This value:
- Auto-fills when you select a vehicle model
- Can be manually adjusted if needed
- Affects range calculations and battery analysis

You might adjust this if:
- Your vehicle has a different battery than standard
- You want to account for some battery degradation
- You're testing with different assumptions

**Default:** 83.7 kWh (Taycan Performance Battery Plus)

### Vehicle Generation Notes

The settings panel includes information about Porsche EV generations:

- **PB** - Performance Battery (smaller capacity)
- **PB+** - Performance Battery Plus (larger capacity)
- **J1.1** - First generation Taycan platform
- **J1.2** - Updated Taycan platform with improved efficiency

## Units and Currency

### Unit System

Choose your preferred measurement system:

| System | Distance | Speed | Volume |
|--------|----------|-------|--------|
| Metric | km | km/h | Liters |
| Imperial (UK) | miles | mph | Gallons (UK) |
| Imperial (US) | miles | mph | Gallons (US) |

Note: UK and US gallons differ in size. The dashboard handles this correctly for fuel calculations.

### Currency

Select your local currency for cost displays. Available options include:

- **European:** EUR, GBP, CHF, SEK, NOK, DKK, PLN
- **Americas:** USD, CAD, BRL, MXN
- **Asia-Pacific:** JPY, CNY, KRW, SGD, AUD, NZD, INR

The currency selection affects:
- Cost card displays
- Chart axis labels
- Backup file exports

### Fuel Consumption Format

For metric systems, choose how petrol consumption is displayed:
- **L/100km** - Liters per 100 kilometers (lower is better)
- **km/L** - Kilometers per liter (higher is better)

For imperial systems, this is fixed to MPG.

### Electric Consumption Format

Choose how EV efficiency is displayed:

**Metric options:**
- **kWh/100km** - Kilowatt-hours per 100 kilometers (lower is better)
- **km/kWh** - Kilometers per kilowatt-hour (higher is better)

**Imperial options:**
- **mi/kWh** - Miles per kilowatt-hour (higher is better)
- **kWh/mi** - Kilowatt-hours per mile (lower is better)
- **kWh/100mi** - Kilowatt-hours per 100 miles (lower is better)

## Cost Settings

### Electricity Price

Enter your electricity cost per kWh in your selected currency.

**Tips for accuracy:**
- Use your average rate if you have time-of-use pricing
- Include delivery charges and taxes
- If you charge at different rates, use a weighted average

**Typical ranges:**
- Europe: 0.15-0.40 EUR/kWh
- UK: 0.15-0.35 GBP/kWh
- US: 0.08-0.20 USD/kWh

### Petrol Price

Enter the current fuel price in your area:
- Per liter for metric systems
- Per gallon for imperial systems

This is used only for comparison calculations (what petrol would have cost).

### Petrol Consumption

Enter what a comparable petrol car would consume:
- L/100km or km/L for metric
- MPG for imperial

For a fair comparison with your Porsche EV, consider using:
- Porsche Panamera: ~10-12 L/100km
- Porsche Cayenne: ~12-15 L/100km
- Luxury sport sedan: ~10-12 L/100km

**Default:** 8.0 L/100km

## Language

### Supported Languages

Select your preferred language from 10 options:

| Code | Language | Native Name |
|------|----------|-------------|
| en | English | English |
| pt | Portuguese | Portugues |
| es | Spanish | Espanol |
| fr | French | Francais |
| de | German | Deutsch |
| it | Italian | Italiano |
| nl | Dutch | Nederlands |
| pl | Polish | Polski |
| zh | Chinese | Chinese |
| ja | Japanese | Japanese |

The language selection affects:
- All interface text
- Chart labels
- Day and month names
- Tab names and descriptions

Your language preference is saved and persists across sessions.

## Data Management

### Upload CSV Files

Opens the upload dialog to import new trip data. See [Uploading and Managing Data](Uploading-and-Managing-Data) for details.

### Clear All Data

Permanently removes all data from the dashboard:
- All trip data
- All settings
- Vehicle selection

A confirmation dialog prevents accidental deletion. This action cannot be undone except by restoring from a backup.

## Backup and Restore

### Download Backup

Creates a JSON file containing:
- All your processed trip data
- Raw CSV data (for future merging)
- Your vehicle model selection
- All your settings

The file is downloaded with a name like:
```
taycan-4-cross-turismo-backup-2026-01-30T14-30-00.json
```

**When to backup:**
- Before clearing browser data
- Before switching browsers or computers
- Periodically for safekeeping
- Before major app updates

### Restore Backup

Load a previously saved backup file:
1. Click the restore button
2. Select your backup JSON file
3. Data and settings are restored

**Note:** Restoring replaces any current data.

## Information Panels

### Vehicle Specifications Notes

Explains abbreviations used in vehicle specs:
- **WLTP** - Worldwide Harmonised Light Vehicle Test Procedure
- **PB** - Performance Battery
- **PB+** - Performance Battery Plus
- **J1.1** - First generation platform
- **J1.2** - Updated platform

### Privacy Notice

Reminds you that:
- All data is processed locally in your browser
- No data is sent to any server
- Data is stored only on your device
- You control your data completely

## Persistence

All settings are automatically saved to your browser's local storage. Changes take effect immediately and persist across sessions.

Settings are included in backup files, so restoring a backup also restores your settings at the time of the backup.

## Theme Toggle

The dark/light mode toggle is in the header (sun/moon icon), not in Settings. Your theme preference is also saved and persists.

## Related Information

- For data upload details, see [Uploading and Managing Data](Uploading-and-Managing-Data)
- For building your own instance, see [Building and Self-Hosting](Building-and-Self-Hosting)
- For terminology, see [Glossary](Glossary)
