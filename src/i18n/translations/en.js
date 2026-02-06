// English translations
export const en = {
  // Language metadata
  _meta: {
    name: 'English',
    nativeName: 'English',
    code: 'en'
  },

  // Common
  common: {
    settings: 'Settings',
    upload: 'Upload',
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    close: 'Close',
    back: 'Back',
    yes: 'Yes',
    no: 'No',
    ok: 'OK',
    error: 'Error',
    success: 'Success',
    warning: 'Warning',
    info: 'Info',
    loading: 'Loading...',
    processing: 'Processing...',
    required: 'Required',
    optional: 'Optional',
    total: 'Total',
    average: 'Average',
    trips: 'trips',
    trip: 'trip',
    distance: 'Distance',
    energy: 'Energy',
    consumption: 'Consumption',
    duration: 'Duration',
    speed: 'Speed',
    min: 'min',
    hours: 'hours',
    minutes: 'minutes',
    by: 'by',
    retry: 'Retry'
  },

  // Header
  header: {
    title: 'Porsche EV Insights',
    subtitle: 'EV Trip Analytics',
    localFirst: 'LOCAL-FIRST',
    privacyFirst: 'PRIVACY-FIRST',
    help: 'HELP'
  },

  // Navigation tabs
  tabs: {
    overview: 'Overview',
    patterns: 'Patterns',
    efficiency: 'Efficiency',
    costs: 'Costs',
    environmental: 'Environmental',
    battery: 'Battery',
    insights: 'Insights',
    myCar: 'My Car'
  },

  // Sidebar
  sidebar: {
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode'
  },

  // Welcome screen
  welcome: {
    title: 'Welcome to Porsche EV Insights',
    description: 'Connect to Porsche Connect or upload your CSV exports to analyze your driving patterns.',
    connectButton: 'Connect to Porsche',
    connectDesc: 'Live data from Porsche Connect',
    uploadButton: 'Upload CSV Files',
    sampleButton: 'Try Sample Data',
    privacyTitle: 'Privacy Protected',
    privacyText: 'All data processed locally in your browser. Credentials never stored.'
  },

  // Porsche Connect integration
  porscheConnect: {
    title: 'Porsche Connect',
    subtitle: 'Live data from your vehicle',
    checking: 'Checking connection...',
    loginDescription: 'Sign in with your Porsche ID to sync trip data directly from your vehicle.',
    email: 'Porsche ID (Email)',
    password: 'Password',
    login: 'Sign In',
    loggingIn: 'Signing in...',
    logout: 'Sign Out',
    privacyNote: 'Your credentials are sent securely to Porsche and never stored.',
    selectVehicle: 'Select a vehicle to sync:',
    fetchData: 'Sync Trip Data',
    loadingVehicles: 'Loading vehicles...',
    loading: 'Loading...',
    noVehicles: 'No vehicles found in your Porsche Connect account.',
    noTrips: 'No trip data available. Make sure you have taken trips with Porsche Connect enabled.',
    errorTitle: 'Connection Error',
    serverUnavailable: 'The Porsche Connect proxy server is not running. Please start it to enable live data sync.',
    serverInstructions: 'Run "cd server && npm install && npm start" in your terminal, then try again.',
    syncComplete: 'Sync Complete',
    syncStats: 'Synced {new} trips from your {model}.',
    syncMergeStats: 'Added {new} new trips ({duplicates} duplicates skipped). Total: {total} trips.',
    sessionExpired: 'Your session has expired. Please sign in again.',
    connected: 'Connected',
    lastSync: 'Last synced',
    captchaDescription: 'Porsche requires verification. Please enter the text shown in the image below.',
    captchaLabel: 'Verification Code',
    captchaPlaceholder: 'Enter the text shown above',
    verifyCaptcha: 'Verify',
    verifying: 'Verifying...',
    // Auto-sync
    checkingForUpdates: 'Checking for new trips...',
    syncing: 'Syncing trip data...',
    newDataSynced: 'New trips synced!'
  },

  // Upload modal
  upload: {
    title: 'Upload EV Data',
    mergeTitle: 'Add More Data',
    audiZip: 'Audi e-tron GT ZIP',
    audiZipAlt: '(myAudi export)',
    audiZipDesc: 'Upload ExportTrips ZIP file from myAudi app',
    audiNoDataFile: 'No trip data found in ZIP file. Expected "Short-term memory.csv" or "Long-term memory.csv".',
    audiParseError: 'Could not parse Audi trip data. Please check the file format.',
    orPorsche: 'or Porsche CSV',
    sinceStart: 'Since Start',
    sinceStartDesc: 'Individual trips',
    sinceCharge: 'Since Charge',
    sinceChargeDesc: 'Charge cycles',
    processButton: 'Process Data',
    mergeButton: 'Merge Data',
    tripsCount: '{count} trips',
    cyclesCount: '{count} cycles',
    modeReplace: 'Replace',
    modeMerge: 'Merge',
    replaceDesc: 'Replace all existing data with new files',
    mergeDesc: 'Add new trips to existing data (duplicates will be skipped)',
    mergeComplete: 'Data Merged Successfully',
    mergeStats: 'Added {new} new trips ({duplicates} duplicates skipped). Total: {total} trips.',
    mergeUnavailable: 'Merge Not Available',
    mergeUnavailableDesc: 'Your existing data was imported before merge support was added. Please use Replace mode this time. Future imports will support merging.',
    missingFile: 'Missing File',
    missingFileDesc: 'Please upload trip data to proceed.'
  },

  // Settings page
  settings: {
    title: 'Settings',

    // Language & Units section
    languageAndUnits: 'Language & Units',
    languageLabel: 'Display Language',
    unitSystem: 'Unit System',
    currency: 'Currency',
    fuelConsumption: 'Fuel Consumption',
    electricConsumption: 'Electric Consumption',
    distanceUnit: 'Distance',
    speedUnit: 'Speed',
    pressureUnit: 'Tire Pressure',

    // Cost settings section
    costSettings: 'Cost Settings',
    electricityPrice: 'Electricity',
    petrolPrice: 'Petrol',
    petrolConsumption: 'Petrol Consumption',
    perKwh: '/kWh',
    perLiter: '/L',
    perGallon: '/gal',

    // Vehicle settings section
    vehicleSettings: 'Vehicle Settings',
    vehicleModel: 'Porsche EV Model',
    selectVehicle: 'Select your vehicle...',
    grossBattery: 'Gross Battery',
    usableBatterySpec: 'Usable Battery',
    wltpRange: 'WLTP Range',
    wltpConsumption: 'WLTP Consumption',
    epaRange: 'EPA Range',
    epaMpge: 'EPA Efficiency',
    batteryCapacity: 'Usable Battery Capacity (kWh)',
    batteryCapacityHelp: 'Auto-filled when selecting a vehicle. You can manually override if needed.',

    // Vehicle notes
    vehicleNotesTitle: 'Vehicle Specifications Notes',
    noteWltp: 'Range values are based on official WLTP combined cycle data',
    noteEpa: 'Range and efficiency based on official US EPA test cycle data',
    noteMpge: 'Miles Per Gallon equivalent (33.7 kWh = 1 gallon of gasoline)',
    notePb: 'PB = Performance Battery (smaller)',
    notePbPlus: 'PB+ = Performance Battery Plus (larger)',
    noteJ11: '2020-2024 models (first generation)',
    noteJ12: '2025+ models (mid-cycle refresh with ~35% range improvement)',
    noteSportTurismo: 'Sport Turismo was introduced in 2022',
    noteCrossTurismo: 'Cross Turismo was introduced in 2021',
    noteTurboGt: 'Turbo GT is only available as a sedan',
    noteSportTurismoRwd: 'Sport Turismo has a base RWD version; Cross Turismo does not (all Cross Turismo are AWD)',
    noteMacanGts: 'Macan Electric GTS announced October 2025',

    // Data management section
    dataManagement: 'Data Management',
    uploadCsvFiles: 'Upload CSV Files',
    clearAllData: 'Clear All Data',

    // Porsche Connect section
    porscheConnect: 'Porsche Connect',
    porscheConnected: 'Connected to Porsche',
    porscheConnectDesc: 'Connect to Porsche servers to automatically sync your trip data.',
    connectToPorsche: 'Connect to Porsche',
    syncData: 'Sync Trip Data',
    porscheLogout: 'Disconnect',

    // Backup & restore section
    backupRestore: 'Backup & Restore',
    downloadBackup: 'Download Backup',
    restoreBackup: 'Restore Backup',

    // Theme settings
    theme: 'Theme',
    themeAuto: 'Auto (System)',
    themeLight: 'Light',
    themeDark: 'Dark',

    // Privacy notice
    privacyNoticeTitle: 'All Data Stored Locally',
    privacyNoticeText: 'Your trip data never leaves your device. No servers, no tracking, no data collection. Everything is processed and stored locally in your browser.'
  },

  // Confirm modal
  confirm: {
    clearDataTitle: 'Clear All Data?',
    clearDataMessage: 'This action cannot be undone. All your trip data and settings will be permanently removed from this device.',
    clearDataConfirm: 'Yes, Clear Data',
    backupRestored: 'Backup restored successfully!',
    exportError: 'Export Error',
    restoreError: 'Restore Error',
    parseError: 'Error parsing file',
    missingFile: 'Missing File',
    missingFileMessage: 'Please upload the "Since Start" file to proceed.'
  },

  // Sample data banner
  sampleData: {
    viewing: 'Viewing sample data',
    hide: 'Hide'
  },

  // Overview tab
  overview: {
    title: 'Overview',
    totalTrips: 'Total Trips',
    totalDistance: 'Total Distance',
    totalEnergy: 'Energy Used',
    avgConsumption: 'Avg Consumption',
    avgTripDistance: 'Avg Trip Distance',
    avgTripDuration: 'Avg Trip Duration',
    avgSpeed: 'Avg Speed',
    totalChargeCycles: 'Charge Cycles',
    tripsPerCharge: 'Trips/Charge',
    shortTrips: 'Short Trips',
    avgPerMonth: 'Avg/Month',
    distanceOverTime: 'Distance Over Time',
    distanceAndTrips: 'Distance & Trips',
    tripsByType: 'Trips by Type',
    tripTypeDistribution: 'Trip Type Distribution',
    energyOverTime: 'Energy Over Time',
    tripsOverTime: 'Trips Over Time'
  },

  // Patterns tab
  patterns: {
    title: 'Driving Patterns',
    hourlyDistribution: 'Hourly Trip Distribution',
    tripsPerHour: 'Trips per Hour',
    dailyPatterns: 'Daily Patterns',
    tripsAndDistance: 'Trips & Distance by Day',
    monthlyTrends: 'Monthly Trends',
    weekdayVsWeekend: 'Weekday vs Weekend',
    peakHours: 'Peak Hours',
    avgTripsPerDay: 'Avg Trips per Day',
    avgDistancePerDay: 'Avg Distance per Day',
    mostActiveDay: 'Most Active Day',
    leastActiveDay: 'Least Active Day',
    distanceOverTime: 'Distance Over Time',
    avgDistance: 'Avg Distance'
  },

  // Efficiency tab
  efficiency: {
    title: 'Efficiency Analysis',
    consumptionOverTime: 'Consumption Over Time',
    consumptionTrend: 'Consumption Trend',
    tripTypeEfficiency: 'Trip Type Efficiency',
    consumptionByTripType: 'Consumption by Trip Type',
    speedEfficiency: 'Speed vs Efficiency',
    consumptionBySpeed: 'Consumption by Speed Range',
    bestEfficiency: 'Best Efficiency',
    worstEfficiency: 'Worst Efficiency',
    avgEfficiency: 'Avg Efficiency',
    efficiencyTrend: 'Efficiency Trend',
    optimalSpeed: 'Optimal Speed'
  },

  // Costs tab
  costs: {
    title: 'Cost Analysis',
    electricCost: 'Electric Cost',
    petrolCost: 'Petrol Equivalent',
    savings: 'Total Savings',
    savingsRate: 'Savings Rate',
    costPerDistance: 'Cost/{unit}',
    annualProjection: 'Annual Projection',
    fiveYearSavings: '5-Year Savings',
    comparedTo: 'compared to {consumption} petrol car',
    monthlyCost: 'Monthly Cost',
    yearlyProjection: 'Yearly Projection',
    costComparison: 'Cost Comparison',
    electricVsPetrol: 'Electric vs Petrol',
    savingsOverTime: 'Savings Over Time',
    costPerTrip: 'Cost per Trip',
    costPerKm: 'Cost/km',
    costPerMile: 'Cost/mi',
    projectedAnnual: 'Projected Annual',
    projectedSavings: 'Projected Savings',
    electricityCost: 'Electricity Cost',
    petrolEquivalent: 'Petrol Equivalent'
  },

  // Environmental tab
  environmental: {
    title: 'Environmental Impact',
    co2Electric: 'Your CO₂',
    co2Petrol: 'Petrol CO₂',
    co2Saved: 'CO₂ Saved',
    co2SavedLabel: 'CO₂ Saved',
    treesEquivalent: 'Trees Equivalent',
    reductionPercentage: 'Reduction',
    litersAvoided: 'Petrol Avoided',
    emissionsComparison: 'Monthly CO₂ Comparison',
    carbonFootprint: 'Understanding Your Impact',
    annualImpact: 'Annual Impact',
    equivalentTrees: 'Equivalent Trees',
    kgCo2: 'kg CO₂',
    tonsCo2: 'tons CO₂',
    vsElectric: 'vs petrol',
    youProduced: 'Your Emissions',
    petrolWouldProduce: 'Petrol Would Be',
    treesPerYear: 'trees/year',
    gridEmissions: 'Grid emissions',
    petrolBaseline: 'Petrol baseline',
    electricGrid: 'electric grid',
    ifPetrol: 'if petrol'
  },

  // Battery tab
  battery: {
    title: 'Battery & Range',
    realWorldRange: 'Real-World Range',
    officialRange: 'Official Range',
    rangeEfficiency: 'Range Efficiency',
    energyPerTrip: 'Energy/Trip',
    tripsPerCharge: 'Trips/Full Battery',
    distancePerCharge: 'Distance/Charge',
    batteryPerTrip: 'Battery/Trip',
    consumptionVsOfficial: 'vs Official',
    seasonalVariation: 'Seasonal Variation',
    chargesPerWeek: 'Charges/Week',
    energyPerCharge: 'Energy/Charge',
    chargingLosses: 'Charging Losses',
    offPeakSavings: 'Off-Peak Savings',
    fullCycles: 'Full Cycles',
    batteryHealth: 'Battery Health',
    chargingPattern: 'Charging Pattern',
    chargingStats: 'Charging Stats',
    rangeAnalysis: 'Range Analysis',
    winterRange: 'Winter Range',
    summerRange: 'Summer Range',
    socUsedPerCycle: 'SOC Used/Cycle',
    potentialSavings: 'Potential Savings',
    vsOfficialRange: 'vs Official',
    rangeComparison: 'Range Comparison',
    yourRange: 'Your Range',
    officialRangeLabel: 'Official',
    chargingOptimization: 'Charging Optimization'
  },

  // Insights tab
  insights: {
    title: 'Driving Insights',
    commuter: 'Daily Commuter',
    commuterDesc: '{pct}% of your trips are during typical commute hours (7-8am, 5-7pm). Consider pre-conditioning while plugged in to save energy.',
    shortTrips: 'Combine short trips',
    shortTripsDesc: '{pct}% of trips are under {dist}. Short trips use {diff}% more energy per {unit}. Consider combining errands.',
    weekendTripper: 'Weekend Road-Tripper',
    weekendTripperDesc: 'Saturday trips average {satDist} vs {weekdayDist} on weekdays. Longer trips are more efficient!',
    winterDrop: 'Winter Tips',
    winterDropDesc: 'Winter consumption is {pct}% higher than summer ({winter} vs {summer}). Use seat heating over cabin heating.',
    sweetSpot: 'Your Efficiency Sweet Spot',
    sweetSpotDesc: 'Best efficiency at {speed} ({cons}). This is {pct}% better than your average.',
    optimalCharging: 'Optimal Charging Frequency',
    optimalChargingDesc: 'Averaging {trips} trips per charge is healthy for battery longevity. Keep it up!',
    frequentCharging: 'Frequent Charging',
    frequentChargingDesc: 'You charge after {trips} trips on average. Consider charging less frequently for battery health.',
    drivingProfile: 'Driving Profile',
    urbanCommuter: 'Urban Commuter',
    mixedUse: 'Mixed Use',
    highwayCruiser: 'Highway Cruiser',
    efficiencyRating: 'Efficiency Rating',
    vsAvgTaycan: 'vs Taycan Avg',
    shortTripPenalty: 'Short-Trip Penalty',
    drivingScore: 'Driving Score',
    recommendations: 'Personalized Recommendations',
    strengths: 'Strengths',
    areasToImprove: 'Areas to Improve',
    yourInsights: 'Your Insights',
    predictions: 'Projections & Forecasts',
    projectedAnnualDistance: 'Annual Distance',
    projectedAnnualTrips: 'Annual Trips',
    projectedAnnualEnergy: 'Annual Energy',
    projectedAnnualCost: 'Annual Savings',
    competitorComparison: 'EV Comparison',
    dailyCommuter: 'Daily Commuter',
    dailyCommuterDesc: '{pct}% of your trips are during typical commute hours (7-8am, 5-7pm). Consider pre-conditioning while plugged in to save energy.',
    shortTripsHighUsage: 'High Short-Trip Usage',
    weekendTripperTitle: 'Weekend Road-Tripper',
    projected: 'projected',
    nextMonthForecast: 'Next Month Forecast',
    tripsExpected: 'trips expected',
    seasonalPrediction: 'Seasonal Prediction',
    summer: 'Summer',
    winter: 'Winter',
    // Recommendation strings
    vsPetrol: 'vs petrol',
    chargingRecDaily: '80% daily, 100% for long trips',
    chargingRecPrecondition: 'Pre-condition while plugged in',
    efficiencyRecCombine: 'Combine short trips',
    efficiencyRecEcoMode: 'Eco mode in city, normal on highway',
    winterRecSeats: 'Use seat/steering heating',
    winterRecGarage: 'Park in garage when possible',
    winterRecPreheat: 'Pre-heat while charging',
    efficiencyTarget: 'Target: {target} (-5%)'
  },

  // Time view selector
  timeView: {
    day: 'Day',
    week: 'Week',
    month: 'Month'
  },

  // Days of week
  days: {
    mon: 'Mon',
    tue: 'Tue',
    wed: 'Wed',
    thu: 'Thu',
    fri: 'Fri',
    sat: 'Sat',
    sun: 'Sun',
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday'
  },

  // Months
  months: {
    jan: 'Jan',
    feb: 'Feb',
    mar: 'Mar',
    apr: 'Apr',
    may: 'May',
    jun: 'Jun',
    jul: 'Jul',
    aug: 'Aug',
    sep: 'Sep',
    oct: 'Oct',
    nov: 'Nov',
    dec: 'Dec'
  },

  // Seasons
  seasons: {
    spring: 'Spring',
    summer: 'Summer',
    autumn: 'Autumn',
    winter: 'Winter'
  },

  // Footer
  footer: {
    tagline: 'Porsche EV Trips Insights • Local-first • Privacy-first • No data leaves your device',
    developedBy: 'Developed by'
  },

  // Unit systems
  unitSystems: {
    metric: 'Metric (km, L)',
    imperial_uk: 'Imperial UK (mi, mpg)',
    imperial_us: 'Imperial US (mi, mpg)'
  },

  // Chart labels
  charts: {
    distance: 'Distance',
    trips: 'Trips',
    consumption: 'Consumption',
    energy: 'Energy',
    cost: 'Cost',
    savings: 'Savings',
    efficiency: 'Efficiency',
    speed: 'Speed',
    time: 'Time',
    hour: 'Hour',
    day: 'Day',
    week: 'Week',
    month: 'Month',
    year: 'Year',
    average: 'Average',
    total: 'Total',
    best: 'Best',
    worst: 'Worst',
    range: 'Range'
  },

  // Trip types
  tripTypes: {
    micro: 'Micro',
    short: 'Short',
    medium: 'Medium',
    long: 'Long',
    veryLong: 'Very Long'
  },

  // Benchmark / Comparison
  benchmark: {
    yourVehicle: 'Your Vehicle',
    yourTaycan: 'Your Taycan',
    yourTaycanCT: 'Your Taycan Cross Turismo',
    yourTaycanST: 'Your Taycan Sport Turismo',
    yourMacan: 'Your Macan Electric',
    yourCayenne: 'Your Cayenne Electric',
    yourEtronGT: 'Your e-tron GT',
    yourPorsche: 'Your Porsche',
    average: 'Average',
    avg: 'Avg',
    comparison: 'Comparison',
    betterThan: 'better than',
    worseThan: 'worse than',
    similar: 'Similar to',
    avgTaycan: 'Taycan Avg',
    avgPorsche: 'avg Porsche',
    avgWltp: 'avg WLTP'
  },

  // Driving profiles
  drivingProfiles: {
    urbanCommuter: 'Urban Commuter',
    mixedUse: 'Mixed Use',
    highwayCruiser: 'Highway Cruiser',
    weekendDriver: 'Weekend Driver',
    efficientDriver: 'Efficient Driver'
  },

  // My Car tab
  myCar: {
    noDataTitle: 'No Vehicle Connected',
    noDataDesc: 'Connect to Porsche Connect to view your vehicle information.',
    connectButton: 'Connect to Porsche',
    selectVehicle: 'Select Vehicle',
    vehiclePhotos: 'Vehicle Photos',
    lastKnownLocation: 'Last Known Location',
    locationUnavailable: 'Location data unavailable',
    openInMaps: 'Open in Maps',
    heading: 'Heading',
    batteryLevel: 'Battery Level',
    estimatedRange: 'Estimated Range',
    totalMileage: 'Total Mileage',
    electricRange: 'Electric Range',
    vehicleDetails: 'Vehicle Details',
    model: 'Model',
    year: 'Year',
    generation: 'Generation',
    steering: 'Steering',
    leftHandDrive: 'Left-Hand Drive',
    rightHandDrive: 'Right-Hand Drive',
    locked: 'Locked',
    unlocked: 'Unlocked',
    lastUpdated: 'Last updated',
    frontView: 'Front View',
    sideView: 'Side View',
    rearView: 'Rear View',
    topView: 'Top View',
    tirePressure: 'Tire Pressure',
    tireFL: 'FL',
    tireFR: 'FR',
    tireRL: 'RL',
    tireRR: 'RR'
  }
};
