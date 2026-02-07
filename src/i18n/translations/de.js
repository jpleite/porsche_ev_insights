// German translations
export const de = {
  // Language metadata
  _meta: {
    name: 'German',
    nativeName: 'Deutsch',
    code: 'de'
  },

  // Common
  common: {
    settings: 'Einstellungen',
    upload: 'Hochladen',
    cancel: 'Abbrechen',
    confirm: 'Bestätigen',
    save: 'Speichern',
    close: 'Schließen',
    yes: 'Ja',
    no: 'Nein',
    ok: 'OK',
    error: 'Fehler',
    success: 'Erfolg',
    warning: 'Warnung',
    info: 'Info',
    loading: 'Lädt...',
    processing: 'Verarbeite...',
    required: 'Erforderlich',
    optional: 'Optional',
    total: 'Gesamt',
    average: 'Durchschnitt',
    trips: 'Fahrten',
    trip: 'Fahrt',
    distance: 'Entfernung',
    energy: 'Energie',
    consumption: 'Verbrauch',
    duration: 'Dauer',
    speed: 'Geschwindigkeit',
    min: 'min',
    hours: 'Stunden',
    minutes: 'Minuten',
    by: 'von'
  },

  // Header
  header: {
    title: 'Porsche EV Insights',
    subtitle: 'EV-Fahrtanalyse',
    localFirst: 'LOKAL',
    privacyFirst: 'DATENSCHUTZ',
    help: 'HILFE'
  },

  // Navigation tabs
  tabs: {
    overview: 'Übersicht',
    patterns: 'Muster',
    efficiency: 'Effizienz',
    costs: 'Kosten',
    environmental: 'Umwelt',
    battery: 'Batterie',
    insights: 'Erkenntnisse',
    myCar: 'Mein Auto'
  },

  // Sidebar
  sidebar: {
    darkMode: 'Dunkles Thema',
    lightMode: 'Helles Thema'
  },

  // Welcome screen
  welcome: {
    title: 'Willkommen bei Porsche EV Insights',
    description: 'Laden Sie Ihre Porsche Connect CSV-Exporte hoch, um Ihre Fahrmuster zu analysieren.',
    uploadButton: 'Daten hochladen',
    sampleButton: 'Beispieldaten testen',
    privacyTitle: 'Datenschutz geschützt',
    privacyText: 'Alle Daten werden lokal in Ihrem Browser verarbeitet.'
  },

  // Upload modal
  upload: {
    title: 'EV-Daten hochladen',
    mergeTitle: 'Weitere Daten hinzufügen',
    audiZip: 'Audi e-tron GT ZIP',
    audiZipAlt: '(myAudi-Export)',
    audiZipDesc: 'ExportTrips ZIP-Datei aus der myAudi-App hochladen',
    audiNoDataFile: 'Keine Fahrtdaten im ZIP gefunden. Erwartet "Short-term memory.csv" oder "Long-term memory.csv".',
    audiParseError: 'Audi-Fahrtdaten konnten nicht verarbeitet werden. Bitte überprüfen Sie das Dateiformat.',
    orPorsche: 'oder Porsche CSV',
    sinceStart: 'Seit Start',
    sinceStartDesc: 'Einzelne Fahrten',
    sinceCharge: 'Seit Ladung',
    sinceChargeDesc: 'Ladezyklen',
    processButton: 'Daten verarbeiten',
    mergeButton: 'Daten zusammenführen',
    tripsCount: '{count} Fahrten',
    cyclesCount: '{count} Zyklen',
    modeReplace: 'Ersetzen',
    modeMerge: 'Zusammenführen',
    replaceDesc: 'Alle vorhandenen Daten durch neue Dateien ersetzen',
    mergeDesc: 'Neue Fahrten zu vorhandenen Daten hinzufügen (Duplikate werden übersprungen)',
    mergeComplete: 'Daten erfolgreich zusammengeführt',
    mergeStats: '{new} neue Fahrten hinzugefügt ({duplicates} Duplikate übersprungen). Gesamt: {total} Fahrten.',
    mergeUnavailable: 'Zusammenführung nicht verfügbar',
    mergeUnavailableDesc: 'Ihre Daten wurden importiert, bevor die Zusammenführung unterstützt wurde. Bitte verwenden Sie diesmal Ersetzen. Künftige Importe werden Zusammenführen unterstützen.',
    missingFile: 'Datei fehlt',
    missingFileDesc: 'Bitte laden Sie Fahrtdaten hoch, um fortzufahren.'
  },

  // Porsche Connect
  porscheConnect: {
    title: 'Porsche Connect',
    subtitle: 'Live-Daten von Ihrem Fahrzeug',
    checking: 'Verbindung wird überprüft...',
    loginDescription: 'Melden Sie sich mit Ihrer Porsche ID an, um Fahrtdaten direkt von Ihrem Fahrzeug zu synchronisieren.',
    email: 'Porsche ID (E-Mail)',
    password: 'Passwort',
    login: 'Anmelden',
    loggingIn: 'Anmeldung läuft...',
    logout: 'Abmelden',
    privacyNote: 'Ihre Anmeldedaten werden sicher an Porsche gesendet und niemals gespeichert.',
    selectVehicle: 'Fahrzeug zum Synchronisieren auswählen:',
    fetchData: 'Fahrtdaten synchronisieren',
    loadingVehicles: 'Fahrzeuge werden geladen...',
    loading: 'Laden...',
    noVehicles: 'Keine Fahrzeuge in Ihrem Porsche Connect-Konto gefunden.',
    noTrips: 'Keine Fahrtdaten verfügbar. Stellen Sie sicher, dass Sie Fahrten mit aktiviertem Porsche Connect durchgeführt haben.',
    errorTitle: 'Verbindungsfehler',
    serverUnavailable: 'Der Porsche Connect Proxy-Server läuft nicht. Bitte starten Sie ihn, um die Live-Datensynchronisierung zu aktivieren.',
    serverInstructions: 'Führen Sie "cd server && npm install && npm start" in Ihrem Terminal aus und versuchen Sie es erneut.',
    syncComplete: 'Synchronisierung abgeschlossen',
    syncStats: '{new} Fahrten von Ihrem {model} synchronisiert.',
    syncMergeStats: '{new} neue Fahrten hinzugefügt ({duplicates} Duplikate übersprungen). Gesamt: {total} Fahrten.',
    sessionExpired: 'Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an.',
    connected: 'Verbunden',
    lastSync: 'Zuletzt synchronisiert',
    captchaDescription: 'Porsche erfordert eine Verifizierung. Bitte geben Sie den im Bild gezeigten Text ein.',
    captchaLabel: 'Verifizierungscode',
    captchaPlaceholder: 'Geben Sie den oben gezeigten Text ein',
    verifyCaptcha: 'Verifizieren',
    verifying: 'Verifizierung läuft...',
    checkingForUpdates: 'Neue Fahrten werden gesucht...',
    syncing: 'Fahrtdaten werden synchronisiert...',
    newDataSynced: 'Neue Fahrten synchronisiert!'
  },

  // Settings page
  settings: {
    title: 'Einstellungen',

    // Language & Units section
    languageAndUnits: 'Sprache & Einheiten',
    languageLabel: 'Anzeigesprache',
    unitSystem: 'Einheitensystem',
    currency: 'Währung',
    fuelConsumption: 'Kraftstoffverbrauch',
    electricConsumption: 'Stromverbrauch',
    distanceUnit: 'Entfernung',
    speedUnit: 'Geschwindigkeit',
    pressureUnit: 'Reifendruck',

    // Cost settings section
    costSettings: 'Kosteneinstellungen',
    electricityPrice: 'Strom',
    petrolPrice: 'Benzin',
    petrolConsumption: 'Benzinverbrauch',
    perKwh: '/kWh',
    perLiter: '/L',
    perGallon: '/gal',

    // Vehicle settings section
    vehicleSettings: 'Fahrzeugeinstellungen',
    vehicleModel: 'Porsche EV Modell',
    selectVehicle: 'Fahrzeug auswählen...',
    grossBattery: 'Brutto-Batterie',
    usableBatterySpec: 'Nutzbare Batterie',
    wltpRange: 'WLTP-Reichweite',
    wltpConsumption: 'WLTP-Verbrauch',
    epaRange: 'EPA-Reichweite',
    epaMpge: 'EPA-Effizienz',
    batteryCapacity: 'Nutzbare Batteriekapazität (kWh)',
    batteryCapacityHelp: 'Wird bei Fahrzeugauswahl automatisch ausgefüllt. Kann manuell angepasst werden.',

    // Vehicle notes
    vehicleNotesTitle: 'Hinweise zu Fahrzeugspezifikationen',
    noteWltp: 'Reichweitenwerte basieren auf offiziellen WLTP-Kombinationszyklus-Daten',
    noteEpa: 'Reichweite und Effizienz basieren auf offiziellen US-EPA-Testzyklus-Daten',
    noteMpge: 'Meilen pro Gallone Äquivalent (33,7 kWh = 1 Gallone Benzin)',
    notePb: 'PB = Performance Battery (kleiner)',
    notePbPlus: 'PB+ = Performance Battery Plus (größer)',
    noteJ11: 'Modelle 2020-2024 (erste Generation)',
    noteJ12: 'Modelle 2025+ (Facelift mit ~35% mehr Reichweite)',
    noteSportTurismo: 'Sport Turismo wurde 2022 eingeführt',
    noteCrossTurismo: 'Cross Turismo wurde 2021 eingeführt',
    noteTurboGt: 'Turbo GT ist nur als Limousine erhältlich',
    noteSportTurismoRwd: 'Sport Turismo hat eine Base RWD-Version; Cross Turismo nicht (alle sind AWD)',
    noteMacanGts: 'Macan Electric GTS im Oktober 2025 angekündigt',

    // Data management section
    dataManagement: 'Datenverwaltung',
    uploadCsvFiles: 'CSV-Dateien hochladen',
    clearAllData: 'Alle Daten löschen',

    // Porsche Connect section
    porscheConnect: 'Porsche Connect',
    porscheConnected: 'Mit Porsche verbunden',
    porscheConnectDesc: 'Verbinden Sie sich mit den Porsche-Servern, um Ihre Fahrtdaten automatisch zu synchronisieren.',
    connectToPorsche: 'Mit Porsche verbinden',
    syncData: 'Fahrtdaten synchronisieren',
    porscheLogout: 'Trennen',

    // Backup & restore section
    backupRestore: 'Sicherung & Wiederherstellung',
    downloadBackup: 'Sicherung herunterladen',
    restoreBackup: 'Sicherung wiederherstellen',

    // Theme settings
    theme: 'Design',
    themeAuto: 'Auto (System)',
    themeLight: 'Hell',
    themeDark: 'Dunkel',

    // Privacy notice
    privacyNoticeTitle: 'Alle Daten lokal gespeichert',
    privacyNoticeText: 'Ihre Fahrtdaten verlassen niemals Ihr Gerät. Keine Server, kein Tracking, keine Datenerfassung. Alles wird lokal in Ihrem Browser verarbeitet und gespeichert.'
  },

  // Confirm modal
  confirm: {
    clearDataTitle: 'Alle Daten löschen?',
    clearDataMessage: 'Diese Aktion kann nicht rückgängig gemacht werden. Alle Ihre Fahrtdaten und Einstellungen werden dauerhaft von diesem Gerät entfernt.',
    clearDataConfirm: 'Ja, Daten löschen',
    backupRestored: 'Sicherung erfolgreich wiederhergestellt!',
    exportError: 'Exportfehler',
    restoreError: 'Wiederherstellungsfehler',
    parseError: 'Fehler beim Parsen der Datei',
    missingFile: 'Fehlende Datei',
    missingFileMessage: 'Bitte laden Sie die "Seit Start"-Datei hoch, um fortzufahren.'
  },

  // Sample data banner
  sampleData: {
    viewing: 'Beispieldaten anzeigen',
    hide: 'Ausblenden'
  },

  // Overview tab
  overview: {
    title: 'Übersicht',
    totalTrips: 'Gesamtfahrten',
    totalDistance: 'Gesamtstrecke',
    totalEnergy: 'Gesamtenergie',
    avgConsumption: 'Durchschnittlicher Verbrauch',
    avgTripDistance: 'Durchschn. Fahrtstrecke',
    avgTripDuration: 'Durchschn. Fahrtdauer',
    avgSpeed: 'Durchschn. Geschwindigkeit',
    totalChargeCycles: 'Ladezyklen',
    distanceOverTime: 'Strecke im Zeitverlauf',
    tripsByType: 'Fahrten nach Typ',
    tripsPerCharge: 'Fahrten/Ladung',
    shortTrips: 'Kurzstrecken',
    avgPerMonth: 'Durchschn./Monat',
    distanceAndTrips: 'Strecke und Fahrten',
    tripTypeDistribution: 'Verteilung nach Fahrttyp',
    energyOverTime: 'Energie im Zeitverlauf',
    tripsOverTime: 'Fahrten im Zeitverlauf'
  },

  // Patterns tab
  patterns: {
    title: 'Fahrmuster',
    hourlyDistribution: 'Stündliche Fahrtverteilung',
    dailyPatterns: 'Tägliche Muster',
    monthlyTrends: 'Monatliche Trends',
    weekdayVsWeekend: 'Wochentag vs Wochenende',
    peakHours: 'Stoßzeiten',
    avgTripsPerDay: 'Durchschn. Fahrten pro Tag',
    avgDistancePerDay: 'Durchschn. Strecke pro Tag',
    mostActiveDay: 'Aktivster Tag',
    leastActiveDay: 'Ruhigster Tag',
    distanceOverTime: 'Strecke im Zeitverlauf',
    tripsPerHour: 'Fahrten pro Stunde',
    tripsAndDistance: 'Fahrten und Strecke pro Tag',
    avgDistance: 'Durchschn. Strecke'
  },

  // Efficiency tab
  efficiency: {
    title: 'Effizienzanalyse',
    consumptionOverTime: 'Verbrauch im Zeitverlauf',
    tripTypeEfficiency: 'Effizienz nach Fahrttyp',
    speedEfficiency: 'Geschwindigkeit vs Effizienz',
    bestEfficiency: 'Beste Effizienz',
    worstEfficiency: 'Schlechteste Effizienz',
    avgEfficiency: 'Durchschn. Effizienz',
    efficiencyTrend: 'Effizienztrend',
    optimalSpeed: 'Optimale Geschwindigkeit',
    consumptionBySpeed: 'Verbrauch nach Geschwindigkeit',
    consumptionByTripType: 'Verbrauch nach Fahrttyp',
    consumptionTrend: 'Verbrauchstrend'
  },

  // Costs tab
  costs: {
    title: 'Kostenanalyse',
    electricCost: 'Stromkosten',
    petrolCost: 'Benzin-Äquivalent',
    savings: 'Gesamtersparnis',
    savingsRate: 'Sparquote',
    costPerDistance: 'Kosten pro {unit}',
    annualProjection: 'Jahresprognose',
    fiveYearSavings: '5-Jahres-Ersparnis',
    comparedTo: 'im Vergleich zu {consumption} Benziner',
    monthlyCost: 'Monatliche Kosten',
    yearlyProjection: 'Jahresprognose',
    costComparison: 'Kostenvergleich',
    electricVsPetrol: 'Elektrisch vs Benzin',
    savingsOverTime: 'Ersparnis im Zeitverlauf',
    costPerTrip: 'Kosten pro Fahrt',
    costPerKm: 'Kosten pro km',
    costPerMile: 'Kosten pro Meile',
    projectedAnnual: 'Jahresprognose',
    projectedSavings: 'Prognostizierte Ersparnis',
    electricityCost: 'Stromkosten',
    petrolEquivalent: 'Benzin-Äquivalent'
  },

  // Environmental tab
  environmental: {
    title: 'Umweltauswirkungen',
    co2Electric: 'CO₂ Elektrisch',
    co2Petrol: 'CO₂ Benzin',
    co2Saved: 'CO₂ eingespart',
    co2SavedLabel: 'CO₂ Eingespart',
    treesEquivalent: 'Baum-Äquivalent',
    reductionPercentage: 'Reduktion',
    litersAvoided: 'Benzin vermieden',
    emissionsComparison: 'Monatlicher Emissionsvergleich',
    carbonFootprint: 'CO₂-Fußabdruck',
    annualImpact: 'Jährliche Auswirkung',
    equivalentTrees: 'Äquivalent Bäume',
    kgCo2: 'kg CO₂',
    tonsCo2: 't CO₂',
    vsElectric: 'vs Benzin',
    youProduced: 'Ihre Emissionen',
    petrolWouldProduce: 'Benzin würde emittieren',
    treesPerYear: 'Bäume/Jahr',
    gridEmissions: 'Netz-Emissionen',
    petrolBaseline: 'Benzin-Referenz',
    electricGrid: 'Stromnetz',
    ifPetrol: 'wenn Benzin'
  },

  // Battery tab
  battery: {
    title: 'Batterie & Reichweite',
    realWorldRange: 'Reale Reichweite',
    officialRange: 'Offizielle Reichweite',
    rangeEfficiency: 'Reichweiteneffizienz',
    energyPerTrip: 'Energie pro Fahrt',
    tripsPerCharge: 'Fahrten/Volle Batterie',
    distancePerCharge: 'Strecke pro Ladung',
    batteryPerTrip: 'Batterie pro Fahrt',
    consumptionVsOfficial: 'vs Offiziell',
    seasonalVariation: 'Saisonale Schwankung',
    chargesPerWeek: 'Ladungen pro Woche',
    energyPerCharge: 'Energie/Ladung',
    chargingLosses: 'Ladeverluste',
    offPeakSavings: 'Nachtstrom-Ersparnis',
    fullCycles: 'Vollzyklen',
    batteryHealth: 'Batteriegesundheit',
    chargingPattern: 'Lademuster',
    rangeAnalysis: 'Reichweitenanalyse',
    winterRange: 'Winter-Reichweite',
    summerRange: 'Sommer-Reichweite',
    socUsedPerCycle: 'SOC Verwendet/Zyklus',
    potentialSavings: 'Potenzielle Ersparnis',
    vsOfficialRange: 'vs Offiziell',
    rangeComparison: 'Reichweitenvergleich',
    yourRange: 'Ihre Reichweite',
    officialRangeLabel: 'Offiziell',
    chargingOptimization: 'Ladeoptimierung'
  },

  // Insights tab
  insights: {
    title: 'Fahrerkenntnisse',
    commuter: 'Täglicher Pendler',
    commuterDesc: '{pct}% Ihrer Fahrten finden zu typischen Pendelzeiten statt (7-8 Uhr, 17-19 Uhr). Erwägen Sie das Vorklimatisieren während des Ladens.',
    shortTrips: 'Kurzstrecken kombinieren',
    shortTripsDesc: '{pct}% der Fahrten sind unter {dist}. Kurzstrecken verbrauchen {diff}% mehr Energie pro {unit}. Erwägen Sie das Kombinieren von Erledigungen.',
    weekendTripper: 'Wochenend-Ausflügler',
    weekendTripperDesc: 'Samstagsfahrten sind durchschnittlich {satDist} vs {weekdayDist} an Wochentagen. Längere Fahrten sind effizienter!',
    winterDrop: 'Winter-Tipps',
    winterDropDesc: 'Winterverbrauch ist {pct}% höher als im Sommer ({winter} vs {summer}). Nutzen Sie Sitzheizung statt Klimaanlage.',
    sweetSpot: 'Ihr Effizienz-Optimum',
    sweetSpotDesc: 'Beste Effizienz bei {speed} ({cons}). Das ist {pct}% besser als Ihr Durchschnitt.',
    optimalCharging: 'Optimale Ladehäufigkeit',
    optimalChargingDesc: 'Durchschnittlich {trips} Fahrten pro Ladung ist gesund für die Batterielebensdauer. Weiter so!',
    frequentCharging: 'Häufiges Laden',
    frequentChargingDesc: 'Sie laden nach durchschnittlich {trips} Fahrten. Erwägen Sie selteneres Laden für die Batteriegesundheit.',
    drivingProfile: 'Fahrprofil',
    urbanCommuter: 'Stadt-Pendler',
    mixedUse: 'Gemischte Nutzung',
    highwayCruiser: 'Autobahn-Fahrer',
    efficiencyRating: 'Effizienzbewertung',
    vsAvgTaycan: 'vs Durchschn. Taycan',
    shortTripPenalty: 'Kurzstrecken-Aufschlag',
    drivingScore: 'Fahrbewertung',
    recommendations: 'Persönliche Empfehlungen',
    strengths: 'Stärken',
    areasToImprove: 'Verbesserungsbereiche',
    yourInsights: 'Ihre Erkenntnisse',
    predictions: 'Prognosen und Vorhersagen',
    projectedAnnualDistance: 'Jahresstrecke',
    projectedAnnualTrips: 'Jahresfahrten',
    projectedAnnualEnergy: 'Jahresenergie',
    projectedAnnualCost: 'Jahresersparnis',
    competitorComparison: 'EV-Vergleich',
    dailyCommuter: 'Täglicher Pendler',
    dailyCommuterDesc: '{pct}% Ihrer Fahrten finden zu typischen Pendelzeiten statt (7-8 Uhr, 17-19 Uhr). Erwägen Sie das Vorklimatisieren während des Ladens.',
    shortTripsHighUsage: 'Hoher Kurzstreckenanteil',
    weekendTripperTitle: 'Wochenend-Ausflügler',
    projected: 'prognostiziert',
    nextMonthForecast: 'Prognose nächster Monat',
    tripsExpected: 'erwartete Fahrten',
    seasonalPrediction: 'Saisonale Vorhersage',
    summer: 'Sommer',
    winter: 'Winter',
    // Recommendation strings
    vsPetrol: 'vs Benzin',
    chargingRecDaily: '80% täglich, 100% für lange Fahrten',
    chargingRecPrecondition: 'Vorklimatisieren während des Ladens',
    efficiencyRecCombine: 'Kurzstrecken kombinieren',
    efficiencyRecEcoMode: 'Eco in der Stadt, normal auf Autobahn',
    winterRecSeats: 'Sitzheizung/Lenkradheizung nutzen',
    winterRecGarage: 'In der Garage parken wenn möglich',
    winterRecPreheat: 'Vorheizen während des Ladens',
    efficiencyTarget: 'Ziel: {target} (-5%)'
  },

  // Time view selector
  timeView: {
    day: 'Tag',
    week: 'Woche',
    month: 'Monat'
  },

  // Days of week
  days: {
    mon: 'Mo',
    tue: 'Di',
    wed: 'Mi',
    thu: 'Do',
    fri: 'Fr',
    sat: 'Sa',
    sun: 'So',
    monday: 'Montag',
    tuesday: 'Dienstag',
    wednesday: 'Mittwoch',
    thursday: 'Donnerstag',
    friday: 'Freitag',
    saturday: 'Samstag',
    sunday: 'Sonntag'
  },

  // Months
  months: {
    jan: 'Jan',
    feb: 'Feb',
    mar: 'Mär',
    apr: 'Apr',
    may: 'Mai',
    jun: 'Jun',
    jul: 'Jul',
    aug: 'Aug',
    sep: 'Sep',
    oct: 'Okt',
    nov: 'Nov',
    dec: 'Dez'
  },

  // Seasons
  seasons: {
    spring: 'Frühling',
    summer: 'Sommer',
    autumn: 'Herbst',
    winter: 'Winter'
  },

  // Footer
  footer: {
    tagline: 'Porsche EV Trips Insights • Lokal • Datenschutz • Keine Daten verlassen Ihr Gerät',
    developedBy: 'Entwickelt von'
  },

  // Unit systems
  unitSystems: {
    metric: 'Metrisch (km, L)',
    imperial_uk: 'Imperial UK (mi, mpg)',
    imperial_us: 'Imperial US (mi, mpg)'
  },

  // Chart labels
  charts: {
    distance: 'Strecke',
    trips: 'Fahrten',
    consumption: 'Verbrauch',
    energy: 'Energie',
    cost: 'Kosten',
    savings: 'Ersparnis',
    efficiency: 'Effizienz',
    speed: 'Geschwindigkeit',
    time: 'Zeit',
    hour: 'Stunde',
    day: 'Tag',
    week: 'Woche',
    month: 'Monat',
    year: 'Jahr',
    average: 'Durchschnitt',
    total: 'Gesamt',
    best: 'Beste',
    worst: 'Schlechteste',
    range: 'Reichweite'
  },

  // Trip types
  tripTypes: {
    micro: 'Mikro',
    short: 'Kurz',
    medium: 'Mittel',
    long: 'Lang',
    veryLong: 'Sehr Lang'
  },

  // Benchmark / Comparison
  benchmark: {
    yourVehicle: 'Ihr Fahrzeug',
    yourTaycan: 'Ihr Taycan',
    yourTaycanCT: 'Ihr Taycan Cross Turismo',
    yourTaycanST: 'Ihr Taycan Sport Turismo',
    yourMacan: 'Ihr Macan Electric',
    yourCayenne: 'Ihr Cayenne Electric',
    yourEtronGT: 'Ihr e-tron GT',
    yourPorsche: 'Ihr Porsche',
    average: 'Durchschnitt',
    avg: 'Ø',
    comparison: 'Vergleich',
    betterThan: 'besser als',
    worseThan: 'schlechter als',
    similar: 'Ähnlich wie',
    avgTaycan: 'Durchschn. Taycan',
    avgPorsche: 'Durchschn. Porsche',
    avgWltp: 'Durchschn. WLTP'
  },

  // Driving profiles
  drivingProfiles: {
    urbanCommuter: 'Stadt-Pendler',
    mixedUse: 'Gemischte Nutzung',
    highwayCruiser: 'Autobahn-Fahrer',
    weekendDriver: 'Wochenend-Fahrer',
    efficientDriver: 'Effizienter Fahrer'
  },

  // My Car tab
  myCar: {
    noDataTitle: 'Kein Fahrzeug verbunden',
    noDataDesc: 'Verbinden Sie sich mit Porsche Connect, um Ihre Fahrzeuginformationen anzuzeigen.',
    connectButton: 'Mit Porsche verbinden',
    selectVehicle: 'Fahrzeug auswählen',
    vehiclePhotos: 'Fahrzeugfotos',
    lastKnownLocation: 'Letzter bekannter Standort',
    locationUnavailable: 'Standortdaten nicht verfügbar',
    openInMaps: 'In Karten öffnen',
    heading: 'Richtung',
    batteryLevel: 'Batteriestand',
    estimatedRange: 'Geschätzte Reichweite',
    totalMileage: 'Gesamtkilometerstand',
    electricRange: 'Elektrische Reichweite',
    vehicleDetails: 'Fahrzeugdetails',
    model: 'Modell',
    year: 'Jahr',
    generation: 'Generation',
    steering: 'Lenkung',
    leftHandDrive: 'Linkslenker',
    rightHandDrive: 'Rechtslenker',
    locked: 'Verriegelt',
    unlocked: 'Entriegelt',
    lastUpdated: 'Zuletzt aktualisiert',
    frontView: 'Frontansicht',
    sideView: 'Seitenansicht',
    rearView: 'Heckansicht',
    topView: 'Draufsicht',
    tirePressure: 'Reifendruck',
    tireFL: 'VL',
    tireFR: 'VR',
    tireRL: 'HL',
    tireRR: 'HR',
    charging: 'Laden',
    chargingStatus: 'Lädt',
    notCharging: 'Lädt nicht',
    chargeTo: 'Bis',
    doneAt: 'Fertig um {time}'
  }
};
