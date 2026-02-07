// Dutch translations
export const nl = {
  // Language metadata
  _meta: {
    name: 'Dutch',
    nativeName: 'Nederlands',
    code: 'nl'
  },

  // Common
  common: {
    settings: 'Instellingen',
    upload: 'Uploaden',
    cancel: 'Annuleren',
    confirm: 'Bevestigen',
    save: 'Opslaan',
    close: 'Sluiten',
    yes: 'Ja',
    no: 'Nee',
    ok: 'OK',
    error: 'Fout',
    success: 'Succes',
    warning: 'Waarschuwing',
    info: 'Info',
    loading: 'Laden...',
    processing: 'Verwerken...',
    required: 'Vereist',
    optional: 'Optioneel',
    total: 'Totaal',
    average: 'Gemiddelde',
    trips: 'ritten',
    trip: 'rit',
    distance: 'Afstand',
    energy: 'Energie',
    consumption: 'Verbruik',
    duration: 'Duur',
    speed: 'Snelheid',
    min: 'min',
    hours: 'uren',
    minutes: 'minuten',
    by: 'door'
  },

  // Header
  header: {
    title: 'Porsche EV Insights',
    subtitle: 'EV-ritanalyse',
    localFirst: 'LOKAAL',
    privacyFirst: 'PRIVACY',
    help: 'HULP'
  },

  // Navigation tabs
  tabs: {
    overview: 'Overzicht',
    patterns: 'Patronen',
    efficiency: 'Efficiëntie',
    costs: 'Kosten',
    environmental: 'Milieu',
    battery: 'Batterij',
    insights: 'Inzichten',
    myCar: 'Mijn Auto'
  },

  // Sidebar
  sidebar: {
    darkMode: 'Donker Thema',
    lightMode: 'Licht Thema'
  },

  // Welcome screen
  welcome: {
    title: 'Welkom bij Porsche EV Insights',
    description: 'Upload je Porsche Connect CSV-exports om je rijpatronen te analyseren.',
    uploadButton: 'Upload je gegevens',
    sampleButton: 'Probeer voorbeeldgegevens',
    privacyTitle: 'Privacy beschermd',
    privacyText: 'Alle gegevens worden lokaal in je browser verwerkt.'
  },

  // Upload modal
  upload: {
    title: 'EV-gegevens uploaden',
    mergeTitle: 'Meer gegevens toevoegen',
    audiZip: 'Audi e-tron GT ZIP',
    audiZipAlt: '(myAudi-export)',
    audiZipDesc: 'Upload ExportTrips ZIP-bestand uit de myAudi-app',
    audiNoDataFile: 'Geen ritgegevens gevonden in ZIP. Verwacht "Short-term memory.csv" of "Long-term memory.csv".',
    audiParseError: 'Kon Audi-ritgegevens niet verwerken. Controleer het bestandsformaat.',
    orPorsche: 'of Porsche CSV',
    sinceStart: 'Sinds start',
    sinceStartDesc: 'Individuele ritten',
    sinceCharge: 'Sinds opladen',
    sinceChargeDesc: 'Laadcycli',
    processButton: 'Gegevens verwerken',
    mergeButton: 'Gegevens samenvoegen',
    tripsCount: '{count} ritten',
    cyclesCount: '{count} cycli',
    modeReplace: 'Vervangen',
    modeMerge: 'Samenvoegen',
    replaceDesc: 'Alle bestaande gegevens vervangen door nieuwe bestanden',
    mergeDesc: 'Nieuwe ritten toevoegen aan bestaande gegevens (duplicaten worden overgeslagen)',
    mergeComplete: 'Gegevens succesvol samengevoegd',
    mergeStats: '{new} nieuwe ritten toegevoegd ({duplicates} duplicaten overgeslagen). Totaal: {total} ritten.',
    mergeUnavailable: 'Samenvoegen niet beschikbaar',
    mergeUnavailableDesc: 'Uw gegevens werden geïmporteerd voordat samenvoegen werd ondersteund. Gebruik deze keer Vervangen. Toekomstige imports ondersteunen samenvoegen.',
    missingFile: 'Bestand ontbreekt',
    missingFileDesc: 'Upload ritgegevens om door te gaan.'
  },

  // Porsche Connect
  porscheConnect: {
    title: 'Porsche Connect',
    subtitle: 'Live gegevens van uw voertuig',
    checking: 'Verbinding controleren...',
    loginDescription: 'Log in met uw Porsche ID om ritgegevens rechtstreeks van uw voertuig te synchroniseren.',
    email: 'Porsche ID (E-mail)',
    password: 'Wachtwoord',
    login: 'Inloggen',
    loggingIn: 'Inloggen...',
    logout: 'Uitloggen',
    privacyNote: 'Uw inloggegevens worden veilig naar Porsche verzonden en worden nooit opgeslagen.',
    selectVehicle: 'Selecteer een voertuig om te synchroniseren:',
    fetchData: 'Ritgegevens synchroniseren',
    loadingVehicles: 'Voertuigen laden...',
    loading: 'Laden...',
    noVehicles: 'Geen voertuigen gevonden in uw Porsche Connect-account.',
    noTrips: 'Geen ritgegevens beschikbaar. Zorg ervoor dat u ritten heeft gemaakt met Porsche Connect ingeschakeld.',
    errorTitle: 'Verbindingsfout',
    serverUnavailable: 'De Porsche Connect proxy-server draait niet. Start deze om live datasynchronisatie in te schakelen.',
    serverInstructions: 'Voer "cd server && npm install && npm start" uit in uw terminal en probeer opnieuw.',
    syncComplete: 'Synchronisatie voltooid',
    syncStats: '{new} ritten gesynchroniseerd van uw {model}.',
    syncMergeStats: '{new} nieuwe ritten toegevoegd ({duplicates} duplicaten overgeslagen). Totaal: {total} ritten.',
    sessionExpired: 'Uw sessie is verlopen. Log opnieuw in.',
    connected: 'Verbonden',
    lastSync: 'Laatst gesynchroniseerd',
    captchaDescription: 'Porsche vereist verificatie. Voer de tekst in die in de afbeelding wordt getoond.',
    captchaLabel: 'Verificatiecode',
    captchaPlaceholder: 'Voer de hierboven getoonde tekst in',
    verifyCaptcha: 'Verifiëren',
    verifying: 'Verifiëren...',
    checkingForUpdates: 'Nieuwe ritten zoeken...',
    syncing: 'Ritgegevens synchroniseren...',
    newDataSynced: 'Nieuwe ritten gesynchroniseerd!'
  },

  // Settings page
  settings: {
    title: 'Instellingen',

    // Language & Units section
    languageAndUnits: 'Taal & eenheden',
    languageLabel: 'Weergavetaal',
    unitSystem: 'Eenhedensysteem',
    currency: 'Valuta',
    fuelConsumption: 'Brandstofverbruik',
    electricConsumption: 'Elektrisch verbruik',
    distanceUnit: 'Afstand',
    speedUnit: 'Snelheid',
    pressureUnit: 'Bandenspanning',

    // Cost settings section
    costSettings: 'Kosteninstellingen',
    electricityPrice: 'Elektriciteit',
    petrolPrice: 'Benzine',
    petrolConsumption: 'Benzineverbruik',
    perKwh: '/kWh',
    perLiter: '/L',
    perGallon: '/gal',

    // Vehicle settings section
    vehicleSettings: 'Voertuiginstellingen',
    vehicleModel: 'Porsche EV Model',
    selectVehicle: 'Selecteer uw voertuig...',
    grossBattery: 'Bruto Batterij',
    usableBatterySpec: 'Bruikbare Batterij',
    wltpRange: 'WLTP-bereik',
    wltpConsumption: 'WLTP-verbruik',
    epaRange: 'EPA-bereik',
    epaMpge: 'EPA-efficiëntie',
    batteryCapacity: 'Bruikbare batterijcapaciteit (kWh)',
    batteryCapacityHelp: 'Automatisch ingevuld bij selectie voertuig. Handmatig aanpassen indien nodig.',

    // Vehicle notes
    vehicleNotesTitle: 'Opmerkingen over specificaties',
    noteWltp: 'Bereikwaarden zijn gebaseerd op officiële WLTP gecombineerde cyclusgegevens',
    noteEpa: 'Bereik en efficiëntie gebaseerd op officiële US EPA-testcyclusgegevens',
    noteMpge: 'Mijl per gallon equivalent (33,7 kWh = 1 gallon benzine)',
    notePb: 'PB = Performance Battery (kleiner)',
    notePbPlus: 'PB+ = Performance Battery Plus (groter)',
    noteJ11: 'Modellen 2020-2024 (eerste generatie)',
    noteJ12: 'Modellen 2025+ (facelift met ~35% meer bereik)',
    noteSportTurismo: 'Sport Turismo werd geïntroduceerd in 2022',
    noteCrossTurismo: 'Cross Turismo werd geïntroduceerd in 2021',
    noteTurboGt: 'Turbo GT is alleen beschikbaar als sedan',
    noteSportTurismoRwd: 'Sport Turismo heeft een Base RWD-versie; Cross Turismo niet (alle zijn AWD)',
    noteMacanGts: 'Macan Electric GTS aangekondigd in oktober 2025',

    // Data management section
    dataManagement: 'Gegevensbeheer',
    uploadCsvFiles: 'CSV-bestanden uploaden',
    clearAllData: 'Alle gegevens wissen',

    // Porsche Connect section
    porscheConnect: 'Porsche Connect',
    porscheConnected: 'Verbonden met Porsche',
    porscheConnectDesc: 'Maak verbinding met Porsche-servers om uw ritgegevens automatisch te synchroniseren.',
    connectToPorsche: 'Verbinden met Porsche',
    syncData: 'Ritgegevens synchroniseren',
    porscheLogout: 'Verbinding verbreken',

    // Backup & restore section
    backupRestore: 'Back-up & herstel',
    downloadBackup: 'Back-up downloaden',
    restoreBackup: 'Back-up herstellen',

    // Theme settings
    theme: 'Thema',
    themeAuto: 'Auto (Systeem)',
    themeLight: 'Licht',
    themeDark: 'Donker',

    // Privacy notice
    privacyNoticeTitle: 'Gegevens lokaal opgeslagen',
    privacyNoticeText: 'Je ritgegevens verlaten nooit je apparaat. Geen servers, geen tracking, geen gegevensverzameling. Alles wordt lokaal in je browser verwerkt en opgeslagen.'
  },

  // Confirm modal
  confirm: {
    clearDataTitle: 'Alle gegevens wissen?',
    clearDataMessage: 'Deze actie kan niet ongedaan worden gemaakt. Al je ritgegevens en instellingen worden permanent van dit apparaat verwijderd.',
    clearDataConfirm: 'Ja, gegevens wissen',
    backupRestored: 'Back-up succesvol hersteld!',
    exportError: 'Exportfout',
    restoreError: 'Herstelfout',
    parseError: 'Fout bij het verwerken van bestand',
    missingFile: 'Ontbrekend bestand',
    missingFileMessage: 'Upload het "Sinds start"-bestand om door te gaan.'
  },

  // Sample data banner
  sampleData: {
    viewing: 'Voorbeeldgegevens bekijken',
    hide: 'Verbergen'
  },

  // Overview tab
  overview: {
    title: 'Overzicht',
    totalTrips: 'Totaal ritten',
    totalDistance: 'Totale afstand',
    totalEnergy: 'Totale energie',
    avgConsumption: 'Gem. verbruik',
    avgTripDistance: 'Gem. ritafstand',
    avgTripDuration: 'Gem. ritduur',
    avgSpeed: 'Gem. snelheid',
    totalChargeCycles: 'Laadcycli',
    distanceOverTime: 'Afstand in de tijd',
    tripsByType: 'Ritten per type',
    tripsPerCharge: 'Ritten/Lading',
    shortTrips: 'Korte Ritten',
    avgPerMonth: 'Gem./Maand',
    distanceAndTrips: 'Afstand en Ritten',
    tripTypeDistribution: 'Verdeling per Rittype',
    energyOverTime: 'Energie in de tijd',
    tripsOverTime: 'Ritten in de tijd'
  },

  // Patterns tab
  patterns: {
    title: 'Rijpatronen',
    hourlyDistribution: 'Uurverdeling ritten',
    dailyPatterns: 'Dagelijkse patronen',
    monthlyTrends: 'Maandelijkse trends',
    weekdayVsWeekend: 'Weekdag vs Weekend',
    peakHours: 'Spitsuren',
    avgTripsPerDay: 'Gem. ritten per dag',
    avgDistancePerDay: 'Gem. afstand per dag',
    mostActiveDay: 'Meest actieve dag',
    leastActiveDay: 'Minst actieve dag',
    distanceOverTime: 'Afstand in de tijd',
    tripsPerHour: 'Ritten per Uur',
    tripsAndDistance: 'Ritten en Afstand per Dag',
    avgDistance: 'Gem. Afstand'
  },

  // Efficiency tab
  efficiency: {
    title: 'Efficiëntie-analyse',
    consumptionOverTime: 'Verbruik in de tijd',
    tripTypeEfficiency: 'Efficiëntie per rittype',
    speedEfficiency: 'Snelheid vs efficiëntie',
    bestEfficiency: 'Beste Efficiëntie',
    worstEfficiency: 'Slechtste Efficiëntie',
    avgEfficiency: 'Gem. Efficiëntie',
    efficiencyTrend: 'Efficiëntietrend',
    optimalSpeed: 'Optimale Snelheid',
    consumptionBySpeed: 'Verbruik per Snelheid',
    consumptionByTripType: 'Verbruik per Rittype',
    consumptionTrend: 'Verbruikstrend'
  },

  // Costs tab
  costs: {
    title: 'Kostenanalyse',
    electricCost: 'Elektrische kosten',
    petrolCost: 'Benzine-equivalent',
    savings: 'Totale besparing',
    savingsRate: 'Besparingspercentage',
    costPerDistance: 'Kosten per {unit}',
    annualProjection: 'Jaarlijkse prognose',
    fiveYearSavings: '5-jaars besparing',
    comparedTo: 'vergeleken met {consumption} benzineauto',
    monthlyCost: 'Maandelijkse Kosten',
    yearlyProjection: 'Jaarprognose',
    costComparison: 'Kostenvergelijking',
    electricVsPetrol: 'Elektrisch vs Benzine',
    savingsOverTime: 'Besparing in de Tijd',
    costPerTrip: 'Kosten per Rit',
    costPerKm: 'Kosten per km',
    costPerMile: 'Kosten per mijl',
    projectedAnnual: 'Jaarprognose',
    projectedSavings: 'Verwachte Besparing',
    electricityCost: 'Elektriciteitskosten',
    petrolEquivalent: 'Benzine-equivalent'
  },

  // Environmental tab
  environmental: {
    title: 'Milieu-impact',
    co2Electric: 'CO₂ Elektrisch',
    co2Petrol: 'CO₂ Benzine',
    co2Saved: 'CO₂ bespaard',
    co2SavedLabel: 'CO₂ Bespaard',
    treesEquivalent: 'Bomen-equivalent',
    reductionPercentage: 'Reductie',
    litersAvoided: 'Benzine vermeden',
    emissionsComparison: 'Maandelijkse Emissievergelijking',
    carbonFootprint: 'CO₂-voetafdruk',
    annualImpact: 'Jaarlijkse Impact',
    equivalentTrees: 'Equivalent Bomen',
    kgCo2: 'kg CO₂',
    tonsCo2: 'ton CO₂',
    vsElectric: 'vs benzine',
    youProduced: 'Jouw Emissies',
    petrolWouldProduce: 'Benzine Zou Uitstoten',
    treesPerYear: 'bomen/jaar',
    gridEmissions: 'Netwerk-emissies',
    petrolBaseline: 'Benzine-referentie',
    electricGrid: 'elektriciteitsnet',
    ifPetrol: 'indien benzine'
  },

  // Battery tab
  battery: {
    title: 'Batterij & bereik',
    realWorldRange: 'Werkelijk Bereik',
    officialRange: 'Officieel Bereik',
    rangeEfficiency: 'Bereik-efficiëntie',
    energyPerTrip: 'Energie per rit',
    tripsPerCharge: 'Ritten/Volle Batterij',
    distancePerCharge: 'Afstand per lading',
    batteryPerTrip: 'Batterij per rit',
    consumptionVsOfficial: 'vs Officieel',
    seasonalVariation: 'Seizoensvariatie',
    chargesPerWeek: 'Laadsessies per week',
    energyPerCharge: 'Energie/Laadsessie',
    chargingLosses: 'Laadverliezen',
    offPeakSavings: 'Nachtstroomkorting',
    fullCycles: 'Volledige cycli',
    batteryHealth: 'Batterijgezondheid',
    chargingPattern: 'Laadpatroon',
    rangeAnalysis: 'Bereikanalyse',
    winterRange: 'Winterbereik',
    summerRange: 'Zomerbereik',
    socUsedPerCycle: 'SOC Gebruikt/Cyclus',
    potentialSavings: 'Potentiële Besparing',
    vsOfficialRange: 'vs Officieel',
    rangeComparison: 'Bereikvergelijking',
    yourRange: 'Jouw Bereik',
    officialRangeLabel: 'Officieel',
    chargingOptimization: 'Laadoptimalisatie'
  },

  // Insights tab
  insights: {
    title: 'Rijinzichten',
    commuter: 'Dagelijkse forens',
    commuterDesc: '{pct}% van je ritten zijn tijdens typische woon-werkuren (7-8u, 17-19u). Overweeg voorverwarmen tijdens het laden om energie te besparen.',
    shortTrips: 'Korte ritten combineren',
    shortTripsDesc: '{pct}% van de ritten is korter dan {dist}. Korte ritten gebruiken {diff}% meer energie per {unit}. Overweeg boodschappen te combineren.',
    weekendTripper: 'Weekendreiziger',
    weekendTripperDesc: 'Zaterdagritten zijn gemiddeld {satDist} vs {weekdayDist} op weekdagen. Langere ritten zijn efficiënter!',
    winterDrop: 'Wintertips',
    winterDropDesc: 'Winterverbruik is {pct}% hoger dan zomer ({winter} vs {summer}). Gebruik stoelverwarming in plaats van cabineverwarming.',
    sweetSpot: 'Jouw efficiëntie-optimum',
    sweetSpotDesc: 'Beste efficiëntie bij {speed} ({cons}). Dit is {pct}% beter dan je gemiddelde.',
    optimalCharging: 'Optimale laadfrequentie',
    optimalChargingDesc: 'Gemiddeld {trips} ritten per lading is gezond voor de batterijlevensduur. Ga zo door!',
    frequentCharging: 'Frequent laden',
    frequentChargingDesc: 'Je laadt na gemiddeld {trips} ritten. Overweeg minder vaak te laden voor de batterijgezondheid.',
    drivingProfile: 'Rijprofiel',
    urbanCommuter: 'Stedelijk',
    mixedUse: 'Gemengd Gebruik',
    highwayCruiser: 'Snelweg',
    efficiencyRating: 'Efficiëntie-rating',
    vsAvgTaycan: 'vs Gem. Taycan',
    shortTripPenalty: 'Korte-ritboete',
    drivingScore: 'Rijscore',
    recommendations: 'Persoonlijke Aanbevelingen',
    strengths: 'Sterke Punten',
    areasToImprove: 'Verbeterpunten',
    yourInsights: 'Jouw Inzichten',
    predictions: 'Prognoses en Voorspellingen',
    projectedAnnualDistance: 'Jaarlijkse Afstand',
    projectedAnnualTrips: 'Jaarlijkse Ritten',
    projectedAnnualEnergy: 'Jaarlijkse Energie',
    projectedAnnualCost: 'Jaarlijkse Besparing',
    competitorComparison: 'EV-vergelijking',
    dailyCommuter: 'Dagelijkse Forens',
    dailyCommuterDesc: '{pct}% van je ritten zijn tijdens typische woon-werkuren (7-8u, 17-19u). Overweeg voorverwarmen tijdens het laden om energie te besparen.',
    shortTripsHighUsage: 'Hoog korte-rittengebruik',
    weekendTripperTitle: 'Weekendreiziger',
    projected: 'verwacht',
    nextMonthForecast: 'Prognose Volgende Maand',
    tripsExpected: 'verwachte ritten',
    seasonalPrediction: 'Seizoensverwachting',
    summer: 'Zomer',
    winter: 'Winter',
    // Recommendation strings
    vsPetrol: 'vs benzine',
    chargingRecDaily: '80% dagelijks, 100% voor lange ritten',
    chargingRecPrecondition: 'Voorverwarmen tijdens laden',
    efficiencyRecCombine: 'Korte ritten combineren',
    efficiencyRecEcoMode: 'Eco in de stad, normaal op snelweg',
    winterRecSeats: 'Stoelverwarming/stuurverwarming gebruiken',
    winterRecGarage: 'In garage parkeren indien mogelijk',
    winterRecPreheat: 'Voorverwarmen tijdens het laden',
    efficiencyTarget: 'Doel: {target} (-5%)'
  },

  // Time view selector
  timeView: {
    day: 'Dag',
    week: 'Week',
    month: 'Maand'
  },

  // Days of week
  days: {
    mon: 'Ma',
    tue: 'Di',
    wed: 'Wo',
    thu: 'Do',
    fri: 'Vr',
    sat: 'Za',
    sun: 'Zo',
    monday: 'Maandag',
    tuesday: 'Dinsdag',
    wednesday: 'Woensdag',
    thursday: 'Donderdag',
    friday: 'Vrijdag',
    saturday: 'Zaterdag',
    sunday: 'Zondag'
  },

  // Months
  months: {
    jan: 'Jan',
    feb: 'Feb',
    mar: 'Mrt',
    apr: 'Apr',
    may: 'Mei',
    jun: 'Jun',
    jul: 'Jul',
    aug: 'Aug',
    sep: 'Sep',
    oct: 'Okt',
    nov: 'Nov',
    dec: 'Dec'
  },

  // Seasons
  seasons: {
    spring: 'Lente',
    summer: 'Zomer',
    autumn: 'Herfst',
    winter: 'Winter'
  },

  // Footer
  footer: {
    tagline: 'Porsche EV Trips Insights • Lokaal • Privacy • Geen gegevens verlaten je apparaat',
    developedBy: 'Ontwikkeld door'
  },

  // Unit systems
  unitSystems: {
    metric: 'Metrisch (km, L)',
    imperial_uk: 'Imperial UK (mi, mpg)',
    imperial_us: 'Imperial US (mi, mpg)'
  },

  // Chart labels
  charts: {
    distance: 'Afstand',
    trips: 'Ritten',
    consumption: 'Verbruik',
    energy: 'Energie',
    cost: 'Kosten',
    savings: 'Besparing',
    efficiency: 'Efficiëntie',
    speed: 'Snelheid',
    time: 'Tijd',
    hour: 'Uur',
    day: 'Dag',
    week: 'Week',
    month: 'Maand',
    year: 'Jaar',
    average: 'Gemiddelde',
    total: 'Totaal',
    best: 'Beste',
    worst: 'Slechtste',
    range: 'Bereik'
  },

  // Trip types
  tripTypes: {
    micro: 'Micro',
    short: 'Kort',
    medium: 'Gemiddeld',
    long: 'Lang',
    veryLong: 'Zeer Lang'
  },

  // Benchmark / Comparison
  benchmark: {
    yourVehicle: 'Jouw Voertuig',
    yourTaycan: 'Jouw Taycan',
    yourTaycanCT: 'Jouw Taycan Cross Turismo',
    yourTaycanST: 'Jouw Taycan Sport Turismo',
    yourMacan: 'Jouw Macan Electric',
    yourCayenne: 'Jouw Cayenne Electric',
    yourEtronGT: 'Jouw e-tron GT',
    yourPorsche: 'Jouw Porsche',
    average: 'Gemiddelde',
    avg: 'Gem',
    comparison: 'Vergelijking',
    betterThan: 'beter dan',
    worseThan: 'slechter dan',
    similar: 'Vergelijkbaar met',
    avgTaycan: 'Gem. Taycan',
    avgPorsche: 'Gem. Porsche',
    avgWltp: 'Gem. WLTP'
  },

  // Driving profiles
  drivingProfiles: {
    urbanCommuter: 'Stedelijke Forens',
    mixedUse: 'Gemengd Gebruik',
    highwayCruiser: 'Snelwegrijder',
    weekendDriver: 'Weekendrijder',
    efficientDriver: 'Efficiënte Rijder'
  },

  // My Car tab
  myCar: {
    noDataTitle: 'Geen voertuig verbonden',
    noDataDesc: 'Maak verbinding met Porsche Connect om uw voertuiginformatie te bekijken.',
    connectButton: 'Verbinden met Porsche',
    selectVehicle: 'Selecteer voertuig',
    vehiclePhotos: 'Voertuigfoto\'s',
    lastKnownLocation: 'Laatst bekende locatie',
    locationUnavailable: 'Locatiegegevens niet beschikbaar',
    openInMaps: 'Openen in Kaarten',
    heading: 'Richting',
    batteryLevel: 'Batterijniveau',
    estimatedRange: 'Geschat bereik',
    totalMileage: 'Totale kilometerstand',
    electricRange: 'Elektrisch bereik',
    vehicleDetails: 'Voertuigdetails',
    model: 'Model',
    year: 'Jaar',
    generation: 'Generatie',
    steering: 'Stuur',
    leftHandDrive: 'Linksgestuurd',
    rightHandDrive: 'Rechtsgestuurd',
    locked: 'Vergrendeld',
    unlocked: 'Ontgrendeld',
    lastUpdated: 'Laatst bijgewerkt',
    frontView: 'Vooraanzicht',
    sideView: 'Zijaanzicht',
    rearView: 'Achteraanzicht',
    topView: 'Bovenaanzicht',
    tirePressure: 'Bandenspanning',
    tireFL: 'VL',
    tireFR: 'VR',
    tireRL: 'AL',
    tireRR: 'AR',
    charging: 'Laden',
    chargingStatus: 'Aan het laden',
    notCharging: 'Niet aan het laden',
    chargeTo: 'Tot',
    doneAt: 'Klaar om {time}'
  }
};
