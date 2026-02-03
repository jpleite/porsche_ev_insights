<p align="center">
  <img src="https://img.shields.io/badge/Porsche-Taycan-d5001c?style=for-the-badge&logo=porsche&logoColor=white" alt="Porsche Taycan"/>
  <img src="https://img.shields.io/badge/Audi-e--tron_GT-bb0a30?style=for-the-badge&logo=audi&logoColor=white" alt="Audi e-tron GT"/>
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19"/>
  <img src="https://img.shields.io/badge/Privacy-First-22c55e?style=for-the-badge&logo=shield&logoColor=white" alt="Privacy First"/>
</p>

<h1 align="center">Porsche EV Insights</h1>

<p align="center">
  <strong>Privacy-first analytics dashboard for your Porsche EV and Audi e-tron GT trip data</strong>
</p>

<p align="center">
  <a href="https://jpleite.github.io/porsche_ev_insights/">Live Demo</a> •
  <a href="https://github.com/jpleite/porsche_ev_insights/wiki">Documentation</a> •
  <a href="#features">Features</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#how-to-export-your-data">Export Data</a>
</p>

---

## Why Porsche EV Insights?

I felt the Porsche app lacks the deeper insights that can be extracted from the trip data it collects. Porsche's My Porsche app lets you export trip data as CSV files, but analyzing that data isn't straightforward. **Porsche EV Insights** transforms your raw CSV exports into beautiful, actionable insights - all while keeping your data 100% private.

Now also supporting **Audi e-tron GT** - which shares the same J1 platform as the Taycan!

### Key Highlights

- **Your data stays yours** - Everything runs in your browser. No servers, no uploads, no tracking
- **Instant insights** - Understand your driving patterns, efficiency, and costs at a glance
- **Works offline** - Load once, use anywhere. Data persists in your browser

## Features

| Feature | Description |
|---------|-------------|
| **Overview Dashboard** | Total distance, consumption, trips, and key metrics |
| **My Car (Live)** | Real-time vehicle status via Porsche Connect API (battery, location, tire pressure, photos) |
| **Driving Patterns** | Analyze trips by hour, day of week, and month |
| **Efficiency Analysis** | Consumption breakdown by speed ranges and conditions |
| **Cost Calculator** | Track electricity costs with customizable rates |
| **Environmental Impact** | CO2 savings compared to combustion vehicles |
| **Battery Insights** | Charging patterns and battery usage statistics |
| **Smart Insights** | AI-generated observations about your driving habits |
| **Data Merge** | Import new CSV exports and merge with existing data (no duplicates) |
| **Vehicle Selection** | Choose from 54+ EV models (Porsche + Audi e-tron GT) with accurate WLTP/EPA specs |
| **EV Comparison** | Compare your real-world consumption vs WLTP and other EVs |
| **Flexible Units** | Support for Metric, Imperial (UK), and Imperial (US) units |
| **10 Languages** | EN, PT, ES, FR, DE, IT, NL, PL, ZH, JA |

## Supported Vehicles

All Porsche electric vehicles are supported with accurate battery and WLTP specifications:

- **Taycan** (all variants: 4, 4S, GTS, Turbo, Turbo S, Turbo GT)
- **Taycan Cross Turismo** (all variants)
- **Taycan Sport Turismo** (all variants)
- **Macan Electric** (all variants)
- **Cayenne Electric** (coming soon)

Both J1.1 (2020-2024) and J1.2 (2025+) generation Taycans are supported, with Performance Battery (PB) and Performance Battery Plus (PB+) options.

### Audi e-tron GT Support

The **Audi e-tron GT** shares the J1 platform with the Taycan, and is now fully supported:

- **e-tron GT** (2021-2024, 2025+)
- **S e-tron GT** (2025+)
- **RS e-tron GT** (2021-2024, 2025+)
- **RS e-tron GT performance** (2025+)

Audi data can be imported from the **myAudi app** as a ZIP file export.

## Units & Currency Settings

The app supports multiple unit systems and currencies to match your preferences:

### Unit Systems

| Setting | Metric | Imperial (UK) | Imperial (US) |
|---------|--------|---------------|---------------|
| Distance | km | mi | mi |
| Speed | km/h | mph | mph |
| Volume | L | gal (UK) | gal (US) |
| Default Currency | EUR (€) | GBP (£) | USD ($) |

### Consumption Formats

**Electric Consumption:**
- Metric: `kWh/100km` or `km/kWh`
- Imperial (UK): `mi/kWh`, `kWh/mi`, or `kWh/100mi`
- Imperial (US): `MPGe`, `mi/kWh`, `kWh/mi`, or `kWh/100mi`

**Note:** US users see EPA ratings and can display efficiency as MPGe (Miles Per Gallon equivalent). Other regions see WLTP ratings.

**Fuel Consumption (for comparison):**
- Metric: `L/100km` or `km/L`
- Imperial: `mpg`

### Supported Currencies

EUR, USD, GBP, CHF, CAD, AUD, JPY, CNY, SEK, NOK

All data is imported from Porsche in metric units and automatically converted based on your selected unit system.

## Screenshots

<p align="center">
  <img src="screenshots/overview.png" alt="Overview Dashboard" width="800"/>
  <br/>
  <em>Overview Dashboard - Your driving summary at a glance</em>
</p>

<p align="center">
  <img src="screenshots/patterns.png" alt="Driving Patterns" width="800"/>
  <br/>
  <em>Driving Patterns - When and how you drive</em>
</p>

<p align="center">
  <img src="screenshots/efficiency.png" alt="Efficiency Analysis" width="800"/>
  <br/>
  <em>Efficiency Analysis - Consumption by speed and conditions</em>
</p>

<p align="center">
  <img src="screenshots/environmental.png" alt="Environmental Impact" width="800"/>
  <br/>
  <em>Environmental Impact - CO2 savings and green metrics</em>
</p>

<p align="center">
  <img src="screenshots/battery.png" alt="Battery Insights" width="800"/>
  <br/>
  <em>Battery Insights - Charging patterns and usage</em>
</p>

<p align="center">
  <img src="screenshots/insights.png" alt="Smart Insights" width="800"/>
  <br/>
  <em>Smart Insights - AI-generated observations</em>
</p>

<p align="center">
  <img src="screenshots/settings.png" alt="Settings" width="800"/>
  <br/>
  <em>Settings - Customize your experience</em>
</p>

<p align="center">
  <img src="screenshots/day_theme.png" alt="Day Theme" width="800"/>
  <br/>
  <em>Day Theme - Light mode for daytime use</em>
</p>

## Getting Started

### Use Online

Visit **[jpleite.github.io/porsche_ev_insights](https://jpleite.github.io/porsche_ev_insights/)** - no installation required.

### Run Locally

```bash
# Clone the repository
git clone https://github.com/jpleite/porsche_ev_insights.git
cd porsche_ev_insights

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## How to Export Your Data

1. Open **My Porsche** app on your phone
2. Go to **Vehicle details**
3. Scroll down to **All trip data**
4. Tap the **download trip icon** (top right corner)
5. Select **"Since start"** and toggle **Download complete trip history**
6. Save or send by email
7. Select **"Since charging"** and make sure **Download complete trip history** toggle is on
8. Save or send by email
9. Transfer both CSV files to your computer
10. Upload them to Porsche EV Insights

The app supports both **"Since Start"** and **"Since Charge"** CSV exports (maximum 12 months limited by Porsche Connect). Uploading both files provides richer stats and information.

### How to Export Audi e-tron GT Data

1. Open **myAudi** app on your phone
2. Go to **Trips** or **Travel Data**
3. Tap **Export** or **Share**
4. Export as **ZIP file** (contains Short-term and Long-term memory CSVs)
5. Transfer the ZIP file to your computer
6. Upload the ZIP directly to Porsche EV Insights

Note: Audi exports are typically in imperial units (miles/mph) and are automatically converted to metric during import.

### Merging New Data

Since Porsche Connect only allows exporting the last 12 months of data, you may need to merge newer exports with your existing data:

1. Export fresh CSV files from My Porsche app
2. Open Porsche EV Insights with your existing data loaded (or restore a backup first)
3. Click **Import Data** and select **Merge** mode (instead of Replace)
4. Upload the new CSV files
5. The app will automatically detect and skip duplicate trips, adding only new ones

This way you can build up a complete history beyond the 12-month limit. Merging also works after restoring a backup, so you can keep a backup file and periodically merge new data into it.

## Tech Stack

| Technology | Purpose |
|------------|---------|
| [React 19](https://react.dev/) | UI framework |
| [Vite 7](https://vite.dev/) | Build tool & dev server |
| [Tailwind CSS 4](https://tailwindcss.com/) | Styling |
| [Recharts](https://recharts.org/) | Charts & visualizations |

## Privacy

**Your data never leaves your device.**

- No backend servers
- No analytics or tracking
- No cookies (except your own browser storage)
- Data stored locally in your browser's localStorage
- Works completely offline after first load

## Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests

## Release History

### v2.0.0-beta (February 2026)
- **Porsche silhouette branding**: New Porsche car icon throughout the app
- **My Car tab always visible**: Connect prompt shown when not logged in
- **Charge cycle deduplication fix**: Fixed trips/charge calculation after sync
- **One-time data migration**: Automatically fixes corrupted charge data

### v1.5.0-beta (February 2026)
- **My Car Tab**: New live vehicle status page via Porsche Connect API
- **Real-time battery**: See current battery level and estimated range
- **Live location**: View your car's last known GPS location on an interactive map
- **Tire pressure**: Monitor all four tire pressures at a glance
- **Vehicle photos**: Browse official Porsche renders of your car in a carousel
- **Lock status**: See if your vehicle is locked or unlocked
- **Porsche Connect integration**: Secure OAuth login (requires local proxy server for development)
- **Mobile optimized**: Charts now have narrower Y-axis padding for better mobile display

### v1.4.0-beta (February 2026)
- **EPA/MPGe support**: US users now see EPA ratings instead of WLTP values
- **MPGe display**: New electric consumption format (Miles Per Gallon equivalent)
- **Official EPA values**: All 54+ vehicle models updated with EPA range and MPGe ratings
- **Smart standard switching**: Automatically uses EPA for Imperial (US), WLTP for others
- **Updated comparisons**: Competitor EVs (Model S, EQS, i7) include both EPA and WLTP specs

### v1.3.3-beta (February 2026)
- **Audi e-tron GT support**: Import trip data from myAudi app ZIP exports
- **6 new vehicle models**: e-tron GT, S e-tron GT, RS e-tron GT (both generations)
- **Auto unit conversion**: Audi's imperial data (miles/mph) automatically converted to metric
- **Smart format detection**: Automatically detects Audi CSV format even in wrong upload slot

### v1.3.2-beta (February 2026)
- **Bug fix**: Trips per Hour chart now shows all 24 hours (00-23) even when some hours have no trips

### v1.3.0-beta (January 2026)
- **Data Merge**: Import new CSV files on top of existing data without duplicates
- **Smart Deduplication**: Trips are fingerprinted by date, distance, and consumption to detect duplicates
- **Replace/Merge Toggle**: Choose between replacing all data or merging with existing
- **Merge Statistics**: See how many new trips were added vs duplicates skipped
- **Backup Compatibility**: Merge works with restored backups (raw data is reconstructed automatically)
- **Timestamped Backups**: Backup filenames now include date and time

### v1.2.0 (January 2026)
- **Vehicle Selection**: Choose from 50 Porsche EV models with accurate WLTP specs
- **Auto-detection**: Automatically guesses your vehicle from CSV filename
- **EV Comparison Chart**: Compare your real-world data vs WLTP official values
- **WLTP Consumption**: Shows vehicle-specific WLTP consumption in settings and charts
- **Translated vehicle names**: "Your Taycan" properly translated in all 10 languages

### v1.1.0 (January 2026)
- **Internationalization**: Full i18n support with 10 languages
- **Driving Profiles**: Translated driving profile names (Urban Commuter, Mixed Use, etc.)
- **Improved translations**: Better context-aware translations across all UI elements

### v1.0.2 (January 2026)
- **Unit system improvements**: Better handling of metric/imperial conversions
- **Currency support**: 10 currencies with proper formatting
- **Consumption formats**: Multiple electric and fuel consumption display options

### v1.0.1 (December 2025)
- **Bug fixes**: CSV parsing improvements for edge cases
- **Performance**: Optimized chart rendering
- **UI polish**: Better dark mode contrast and accessibility

### v1.0.0 (December 2025)
- **Initial release**: Core dashboard with 7 analysis tabs
- **Privacy-first**: All data processed locally in browser
- **CSV import**: Support for Porsche Connect exports
- **Charts**: Distance, consumption, patterns, costs, environmental impact
- **Settings**: Customizable electricity prices, unit systems, currencies

## Documentation

For detailed guides and reference material, visit the **[Wiki](https://github.com/jpleite/porsche_ev_insights/wiki)**:

- [Getting Started](https://github.com/jpleite/porsche_ev_insights/wiki/Getting-Started) - First steps with the dashboard
- [Exporting Data from My Porsche](https://github.com/jpleite/porsche_ev_insights/wiki/Exporting-Data-from-My-Porsche) - How to get your data
- [Understanding the Dashboard](https://github.com/jpleite/porsche_ev_insights/wiki/Understanding-the-Dashboard) - Navigation and features
- [Settings and Configuration](https://github.com/jpleite/porsche_ev_insights/wiki/Settings-and-Configuration) - Customization options
- [Building and Self-Hosting](https://github.com/jpleite/porsche_ev_insights/wiki/Building-and-Self-Hosting) - Run your own instance
- [Glossary](https://github.com/jpleite/porsche_ev_insights/wiki/Glossary) - EV terminology explained

## License

MIT License - for personal use only.

---

<p align="center">
  Made with care for Porsche EV and Audi e-tron GT owners by <a href="https://github.com/jpleite">jpleite</a>
</p>
