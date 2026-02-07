// Italian translations
export const it = {
  // Language metadata
  _meta: {
    name: 'Italian',
    nativeName: 'Italiano',
    code: 'it'
  },

  // Common
  common: {
    settings: 'Impostazioni',
    upload: 'Carica',
    cancel: 'Annulla',
    confirm: 'Conferma',
    save: 'Salva',
    close: 'Chiudi',
    yes: 'Sì',
    no: 'No',
    ok: 'OK',
    error: 'Errore',
    success: 'Successo',
    warning: 'Avviso',
    info: 'Info',
    loading: 'Caricamento...',
    processing: 'Elaborazione...',
    required: 'Obbligatorio',
    optional: 'Opzionale',
    total: 'Totale',
    average: 'Media',
    trips: 'viaggi',
    trip: 'viaggio',
    distance: 'Distanza',
    energy: 'Energia',
    consumption: 'Consumo',
    duration: 'Durata',
    speed: 'Velocità',
    min: 'min',
    hours: 'ore',
    minutes: 'minuti',
    by: 'di'
  },

  // Header
  header: {
    title: 'Porsche EV Insights',
    subtitle: 'Analisi Viaggi EV',
    localFirst: 'LOCALE',
    privacyFirst: 'PRIVACY',
    help: 'AIUTO'
  },

  // Navigation tabs
  tabs: {
    overview: 'Panoramica',
    patterns: 'Tendenze',
    efficiency: 'Efficienza',
    costs: 'Costi',
    environmental: 'Ambiente',
    battery: 'Batteria',
    insights: 'Analisi',
    myCar: 'La Mia Auto'
  },

  // Sidebar
  sidebar: {
    darkMode: 'Tema Scuro',
    lightMode: 'Tema Chiaro'
  },

  // Welcome screen
  welcome: {
    title: 'Benvenuto in Porsche EV Insights',
    description: 'Carica i tuoi export CSV di Porsche Connect per analizzare le tue abitudini di guida.',
    uploadButton: 'Carica i tuoi dati',
    sampleButton: 'Prova dati di esempio',
    privacyTitle: 'Privacy protetta',
    privacyText: 'Tutti i dati vengono elaborati localmente nel tuo browser.'
  },

  // Upload modal
  upload: {
    title: 'Carica dati EV',
    mergeTitle: 'Aggiungi altri dati',
    audiZip: 'Audi e-tron GT ZIP',
    audiZipAlt: '(esportazione myAudi)',
    audiZipDesc: 'Carica il file ZIP ExportTrips dall\'app myAudi',
    audiNoDataFile: 'Nessun dato di viaggio trovato nel ZIP. Atteso "Short-term memory.csv" o "Long-term memory.csv".',
    audiParseError: 'Impossibile elaborare i dati di viaggio Audi. Verifica il formato del file.',
    orPorsche: 'o CSV Porsche',
    sinceStart: 'Dall\'inizio',
    sinceStartDesc: 'Viaggi individuali',
    sinceCharge: 'Dalla ricarica',
    sinceChargeDesc: 'Cicli di ricarica',
    processButton: 'Elabora dati',
    mergeButton: 'Unisci dati',
    tripsCount: '{count} viaggi',
    cyclesCount: '{count} cicli',
    modeReplace: 'Sostituisci',
    modeMerge: 'Unisci',
    replaceDesc: 'Sostituisci tutti i dati esistenti con nuovi file',
    mergeDesc: 'Aggiungi nuovi viaggi ai dati esistenti (i duplicati verranno ignorati)',
    mergeComplete: 'Dati uniti con successo',
    mergeStats: 'Aggiunti {new} nuovi viaggi ({duplicates} duplicati ignorati). Totale: {total} viaggi.',
    mergeUnavailable: 'Unione non disponibile',
    mergeUnavailableDesc: 'I tuoi dati sono stati importati prima dell\'aggiunta del supporto per l\'unione. Per favore usa Sostituisci questa volta. Le importazioni future supporteranno l\'unione.',
    missingFile: 'File mancante',
    missingFileDesc: 'Carica i dati di viaggio per continuare.'
  },

  // Porsche Connect
  porscheConnect: {
    title: 'Porsche Connect',
    subtitle: 'Dati in tempo reale dal tuo veicolo',
    checking: 'Verifica connessione...',
    loginDescription: 'Accedi con il tuo Porsche ID per sincronizzare i dati di viaggio direttamente dal tuo veicolo.',
    email: 'Porsche ID (Email)',
    password: 'Password',
    login: 'Accedi',
    loggingIn: 'Accesso in corso...',
    logout: 'Esci',
    privacyNote: 'Le tue credenziali vengono inviate in modo sicuro a Porsche e non vengono mai memorizzate.',
    selectVehicle: 'Seleziona un veicolo da sincronizzare:',
    fetchData: 'Sincronizza dati di viaggio',
    loadingVehicles: 'Caricamento veicoli...',
    loading: 'Caricamento...',
    noVehicles: 'Nessun veicolo trovato nel tuo account Porsche Connect.',
    noTrips: 'Nessun dato di viaggio disponibile. Assicurati di aver effettuato viaggi con Porsche Connect attivato.',
    errorTitle: 'Errore di connessione',
    serverUnavailable: 'Il server proxy Porsche Connect non è in esecuzione. Avvialo per abilitare la sincronizzazione dei dati in tempo reale.',
    serverInstructions: 'Esegui "cd server && npm install && npm start" nel terminale, poi riprova.',
    syncComplete: 'Sincronizzazione completata',
    syncStats: 'Sincronizzati {new} viaggi dal tuo {model}.',
    syncMergeStats: 'Aggiunti {new} nuovi viaggi ({duplicates} duplicati saltati). Totale: {total} viaggi.',
    sessionExpired: 'La tua sessione è scaduta. Accedi di nuovo.',
    connected: 'Connesso',
    lastSync: 'Ultima sincronizzazione',
    captchaDescription: 'Porsche richiede la verifica. Inserisci il testo mostrato nell\'immagine.',
    captchaLabel: 'Codice di verifica',
    captchaPlaceholder: 'Inserisci il testo mostrato sopra',
    verifyCaptcha: 'Verifica',
    verifying: 'Verifica in corso...',
    checkingForUpdates: 'Ricerca nuovi viaggi...',
    syncing: 'Sincronizzazione dati di viaggio...',
    newDataSynced: 'Nuovi viaggi sincronizzati!'
  },

  // Settings page
  settings: {
    title: 'Impostazioni',

    // Language & Units section
    languageAndUnits: 'Lingua e unità',
    languageLabel: 'Lingua di visualizzazione',
    unitSystem: 'Sistema di unità',
    currency: 'Valuta',
    fuelConsumption: 'Consumo carburante',
    electricConsumption: 'Consumo elettrico',
    distanceUnit: 'Distanza',
    speedUnit: 'Velocità',
    pressureUnit: 'Pressione pneumatici',

    // Cost settings section
    costSettings: 'Impostazioni costi',
    electricityPrice: 'Elettricità',
    petrolPrice: 'Benzina',
    petrolConsumption: 'Consumo benzina',
    perKwh: '/kWh',
    perLiter: '/L',
    perGallon: '/gal',

    // Vehicle settings section
    vehicleSettings: 'Impostazioni veicolo',
    vehicleModel: 'Modello Porsche EV',
    selectVehicle: 'Seleziona il tuo veicolo...',
    grossBattery: 'Batteria Lorda',
    usableBatterySpec: 'Batteria Utile',
    wltpRange: 'Autonomia WLTP',
    wltpConsumption: 'Consumo WLTP',
    epaRange: 'Autonomia EPA',
    epaMpge: 'Efficienza EPA',
    batteryCapacity: 'Capacità batteria utile (kWh)',
    batteryCapacityHelp: 'Compilato automaticamente selezionando un veicolo. Puoi modificarlo manualmente.',

    // Vehicle notes
    vehicleNotesTitle: 'Note sulle specifiche',
    noteWltp: 'I valori di autonomia sono basati sui dati ufficiali del ciclo combinato WLTP',
    noteEpa: 'Autonomia ed efficienza basate sui dati ufficiali del ciclo di test EPA statunitense',
    noteMpge: 'Miglia per gallone equivalente (33,7 kWh = 1 gallone di benzina)',
    notePb: 'PB = Performance Battery (piccola)',
    notePbPlus: 'PB+ = Performance Battery Plus (grande)',
    noteJ11: 'Modelli 2020-2024 (prima generazione)',
    noteJ12: 'Modelli 2025+ (aggiornamento con ~35% di autonomia in più)',
    noteSportTurismo: 'Sport Turismo è stato introdotto nel 2022',
    noteCrossTurismo: 'Cross Turismo è stato introdotto nel 2021',
    noteTurboGt: 'Turbo GT è disponibile solo come berlina',
    noteSportTurismoRwd: 'Sport Turismo ha una versione Base RWD; Cross Turismo no (tutti sono AWD)',
    noteMacanGts: 'Macan Electric GTS annunciato a ottobre 2025',

    // Data management section
    dataManagement: 'Gestione dati',
    uploadCsvFiles: 'Carica file CSV',
    clearAllData: 'Cancella tutti i dati',

    // Porsche Connect section
    porscheConnect: 'Porsche Connect',
    porscheConnected: 'Connesso a Porsche',
    porscheConnectDesc: 'Connettiti ai server Porsche per sincronizzare automaticamente i tuoi dati di viaggio.',
    connectToPorsche: 'Connetti a Porsche',
    syncData: 'Sincronizza dati di viaggio',
    porscheLogout: 'Disconnetti',

    // Backup & restore section
    backupRestore: 'Backup e ripristino',
    downloadBackup: 'Scarica backup',
    restoreBackup: 'Ripristina backup',

    // Theme settings
    theme: 'Tema',
    themeAuto: 'Auto (Sistema)',
    themeLight: 'Chiaro',
    themeDark: 'Scuro',

    // Privacy notice
    privacyNoticeTitle: 'Dati memorizzati localmente',
    privacyNoticeText: 'I tuoi dati di viaggio non lasciano mai il tuo dispositivo. Nessun server, nessun tracciamento, nessuna raccolta dati. Tutto viene elaborato e memorizzato localmente nel tuo browser.'
  },

  // Confirm modal
  confirm: {
    clearDataTitle: 'Cancellare tutti i dati?',
    clearDataMessage: 'Questa azione non può essere annullata. Tutti i tuoi dati di viaggio e impostazioni verranno rimossi permanentemente da questo dispositivo.',
    clearDataConfirm: 'Sì, cancella dati',
    backupRestored: 'Backup ripristinato con successo!',
    exportError: 'Errore di esportazione',
    restoreError: 'Errore di ripristino',
    parseError: 'Errore nell\'analisi del file',
    missingFile: 'File mancante',
    missingFileMessage: 'Carica il file "Dall\'inizio" per continuare.'
  },

  // Sample data banner
  sampleData: {
    viewing: 'Visualizzazione dati di esempio',
    hide: 'Nascondi'
  },

  // Overview tab
  overview: {
    title: 'Panoramica',
    totalTrips: 'Viaggi totali',
    totalDistance: 'Distanza totale',
    totalEnergy: 'Energia totale',
    avgConsumption: 'Consumo medio',
    avgTripDistance: 'Distanza media per viaggio',
    avgTripDuration: 'Durata media per viaggio',
    avgSpeed: 'Velocità media',
    totalChargeCycles: 'Cicli di ricarica',
    distanceOverTime: 'Distanza nel tempo',
    tripsByType: 'Viaggi per tipo',
    tripsPerCharge: 'Viaggi/Ricarica',
    shortTrips: 'Viaggi Brevi',
    avgPerMonth: 'Media/Mese',
    distanceAndTrips: 'Distanza e Viaggi',
    tripTypeDistribution: 'Distribuzione per Tipo di Viaggio',
    energyOverTime: 'Energia nel tempo',
    tripsOverTime: 'Viaggi nel tempo'
  },

  // Patterns tab
  patterns: {
    title: 'Tendenze di guida',
    hourlyDistribution: 'Distribuzione oraria dei viaggi',
    dailyPatterns: 'Tendenze giornaliere',
    monthlyTrends: 'Tendenze mensili',
    weekdayVsWeekend: 'Feriale vs Weekend',
    peakHours: 'Ore di punta',
    avgTripsPerDay: 'Viaggi medi per giorno',
    avgDistancePerDay: 'Distanza media per giorno',
    mostActiveDay: 'Giorno più attivo',
    leastActiveDay: 'Giorno meno attivo',
    distanceOverTime: 'Distanza nel tempo',
    tripsPerHour: 'Viaggi per Ora',
    tripsAndDistance: 'Viaggi e Distanza per Giorno',
    avgDistance: 'Distanza Media'
  },

  // Efficiency tab
  efficiency: {
    title: 'Analisi efficienza',
    consumptionOverTime: 'Consumo nel tempo',
    tripTypeEfficiency: 'Efficienza per tipo di viaggio',
    speedEfficiency: 'Velocità vs efficienza',
    bestEfficiency: 'Migliore Efficienza',
    worstEfficiency: 'Peggiore Efficienza',
    avgEfficiency: 'Efficienza Media',
    efficiencyTrend: 'Tendenza di Efficienza',
    optimalSpeed: 'Velocità Ottimale',
    consumptionBySpeed: 'Consumo per Velocità',
    consumptionByTripType: 'Consumo per Tipo di Viaggio',
    consumptionTrend: 'Tendenza di Consumo'
  },

  // Costs tab
  costs: {
    title: 'Analisi costi',
    electricCost: 'Costo elettrico',
    petrolCost: 'Equivalente benzina',
    savings: 'Risparmio totale',
    savingsRate: 'Tasso di risparmio',
    costPerDistance: 'Costo per {unit}',
    annualProjection: 'Proiezione annuale',
    fiveYearSavings: 'Risparmio in 5 anni',
    comparedTo: 'rispetto a auto benzina da {consumption}',
    monthlyCost: 'Costo Mensile',
    yearlyProjection: 'Proiezione Annuale',
    costComparison: 'Confronto Costi',
    electricVsPetrol: 'Elettrico vs Benzina',
    savingsOverTime: 'Risparmio nel Tempo',
    costPerTrip: 'Costo per Viaggio',
    costPerKm: 'Costo per km',
    costPerMile: 'Costo per miglio',
    projectedAnnual: 'Proiezione Annuale',
    projectedSavings: 'Risparmio Previsto',
    electricityCost: 'Costo Elettricità',
    petrolEquivalent: 'Equivalente Benzina'
  },

  // Environmental tab
  environmental: {
    title: 'Impatto ambientale',
    co2Electric: 'CO₂ Elettrico',
    co2Petrol: 'CO₂ Benzina',
    co2Saved: 'CO₂ risparmiato',
    co2SavedLabel: 'CO₂ Risparmiato',
    treesEquivalent: 'Equivalente alberi',
    reductionPercentage: 'Riduzione',
    litersAvoided: 'Benzina evitata',
    emissionsComparison: 'Confronto Emissioni Mensili',
    carbonFootprint: 'Impronta di Carbonio',
    annualImpact: 'Impatto Annuale',
    equivalentTrees: 'Alberi Equivalenti',
    kgCo2: 'kg CO₂',
    tonsCo2: 'ton CO₂',
    vsElectric: 'vs benzina',
    youProduced: 'Le Tue Emissioni',
    petrolWouldProduce: 'Benzina Emetterebbe',
    treesPerYear: 'alberi/anno',
    gridEmissions: 'Emissioni della rete',
    petrolBaseline: 'Riferimento benzina',
    electricGrid: 'rete elettrica',
    ifPetrol: 'se benzina'
  },

  // Battery tab
  battery: {
    title: 'Batteria e autonomia',
    realWorldRange: 'Autonomia Reale',
    officialRange: 'Autonomia Ufficiale',
    rangeEfficiency: 'Efficienza autonomia',
    energyPerTrip: 'Energia per viaggio',
    tripsPerCharge: 'Viaggi/Batteria Piena',
    distancePerCharge: 'Distanza per ricarica',
    batteryPerTrip: 'Batteria per viaggio',
    consumptionVsOfficial: 'vs Ufficiale',
    seasonalVariation: 'Variazione stagionale',
    chargesPerWeek: 'Ricariche per settimana',
    energyPerCharge: 'Energia/Ricarica',
    chargingLosses: 'Perdite di ricarica',
    offPeakSavings: 'Risparmio ore notturne',
    fullCycles: 'Cicli completi',
    batteryHealth: 'Salute della Batteria',
    chargingPattern: 'Schema di Ricarica',
    rangeAnalysis: 'Analisi di Autonomia',
    winterRange: 'Autonomia Invernale',
    summerRange: 'Autonomia Estiva',
    socUsedPerCycle: 'SOC Usato/Ciclo',
    potentialSavings: 'Risparmio Potenziale',
    vsOfficialRange: 'vs Ufficiale',
    rangeComparison: 'Confronto Autonomia',
    yourRange: 'La Tua Autonomia',
    officialRangeLabel: 'Ufficiale',
    chargingOptimization: 'Ottimizzazione Ricarica'
  },

  // Insights tab
  insights: {
    title: 'Analisi di guida',
    commuter: 'Pendolare quotidiano',
    commuterDesc: '{pct}% dei tuoi viaggi sono negli orari tipici di lavoro (7-8, 17-19). Considera il preriscaldamento mentre sei collegato per risparmiare energia.',
    shortTrips: 'Combina i viaggi brevi',
    shortTripsDesc: '{pct}% dei viaggi sono inferiori a {dist}. I viaggi brevi usano {diff}% più energia per {unit}. Considera di combinare le commissioni.',
    weekendTripper: 'Viaggiatore del weekend',
    weekendTripperDesc: 'I viaggi del sabato fanno in media {satDist} vs {weekdayDist} nei giorni feriali. I viaggi più lunghi sono più efficienti!',
    winterDrop: 'Consigli Invernali',
    winterDropDesc: 'Il consumo invernale è {pct}% più alto dell\'estate ({winter} vs {summer}). Usa il riscaldamento sedili invece della climatizzazione.',
    sweetSpot: 'Il tuo punto ottimale di efficienza',
    sweetSpotDesc: 'Migliore efficienza a {speed} ({cons}). Questo è {pct}% meglio della tua media.',
    optimalCharging: 'Frequenza di ricarica ottimale',
    optimalChargingDesc: 'Media di {trips} viaggi per ricarica è salutare per la longevità della batteria. Continua così!',
    frequentCharging: 'Ricarica frequente',
    frequentChargingDesc: 'Ricarichi dopo {trips} viaggi in media. Considera di ricaricare meno frequentemente per la salute della batteria.',
    drivingProfile: 'Profilo di guida',
    urbanCommuter: 'Urbano',
    mixedUse: 'Uso Misto',
    highwayCruiser: 'Autostrada',
    efficiencyRating: 'Valutazione efficienza',
    vsAvgTaycan: 'vs Taycan Med',
    shortTripPenalty: 'Penalità viaggio breve',
    drivingScore: 'Punteggio di Guida',
    recommendations: 'Raccomandazioni Personalizzate',
    strengths: 'Punti di Forza',
    areasToImprove: 'Aree da Migliorare',
    yourInsights: 'Le Tue Analisi',
    predictions: 'Proiezioni e Previsioni',
    projectedAnnualDistance: 'Distanza Annuale',
    projectedAnnualTrips: 'Viaggi Annuali',
    projectedAnnualEnergy: 'Energia Annuale',
    projectedAnnualCost: 'Risparmio Annuale',
    competitorComparison: 'Confronto VE',
    dailyCommuter: 'Pendolare Quotidiano',
    dailyCommuterDesc: '{pct}% dei tuoi viaggi sono negli orari tipici di lavoro (7-8, 17-19). Considera il preriscaldamento mentre sei collegato per risparmiare energia.',
    shortTripsHighUsage: 'Alto uso di viaggi brevi',
    weekendTripperTitle: 'Viaggiatore del Weekend',
    projected: 'previsto',
    nextMonthForecast: 'Previsione Mese Prossimo',
    tripsExpected: 'viaggi previsti',
    seasonalPrediction: 'Previsione Stagionale',
    summer: 'Estate',
    winter: 'Inverno',
    // Recommendation strings
    vsPetrol: 'vs benzina',
    chargingRecDaily: '80% giornaliero, 100% per viaggi lunghi',
    chargingRecPrecondition: 'Preriscaldare mentre collegato',
    efficiencyRecCombine: 'Combinare i viaggi brevi',
    efficiencyRecEcoMode: 'Eco in città, normale in autostrada',
    winterRecSeats: 'Usare riscaldamento sedili/volante',
    winterRecGarage: 'Parcheggiare in garage se possibile',
    winterRecPreheat: 'Preriscaldare durante la ricarica',
    efficiencyTarget: 'Obiettivo: {target} (-5%)'
  },

  // Time view selector
  timeView: {
    day: 'Giorno',
    week: 'Settimana',
    month: 'Mese'
  },

  // Days of week
  days: {
    mon: 'Lun',
    tue: 'Mar',
    wed: 'Mer',
    thu: 'Gio',
    fri: 'Ven',
    sat: 'Sab',
    sun: 'Dom',
    monday: 'Lunedì',
    tuesday: 'Martedì',
    wednesday: 'Mercoledì',
    thursday: 'Giovedì',
    friday: 'Venerdì',
    saturday: 'Sabato',
    sunday: 'Domenica'
  },

  // Months
  months: {
    jan: 'Gen',
    feb: 'Feb',
    mar: 'Mar',
    apr: 'Apr',
    may: 'Mag',
    jun: 'Giu',
    jul: 'Lug',
    aug: 'Ago',
    sep: 'Set',
    oct: 'Ott',
    nov: 'Nov',
    dec: 'Dic'
  },

  // Seasons
  seasons: {
    spring: 'Primavera',
    summer: 'Estate',
    autumn: 'Autunno',
    winter: 'Inverno'
  },

  // Footer
  footer: {
    tagline: 'Porsche EV Trips Insights • Locale • Privacy • Nessun dato lascia il tuo dispositivo',
    developedBy: 'Sviluppato da'
  },

  // Unit systems
  unitSystems: {
    metric: 'Metrico (km, L)',
    imperial_uk: 'Imperial UK (mi, mpg)',
    imperial_us: 'Imperial US (mi, mpg)'
  },

  // Chart labels
  charts: {
    distance: 'Distanza',
    trips: 'Viaggi',
    consumption: 'Consumo',
    energy: 'Energia',
    cost: 'Costo',
    savings: 'Risparmio',
    efficiency: 'Efficienza',
    speed: 'Velocità',
    time: 'Tempo',
    hour: 'Ora',
    day: 'Giorno',
    week: 'Settimana',
    month: 'Mese',
    year: 'Anno',
    average: 'Media',
    total: 'Totale',
    best: 'Migliore',
    worst: 'Peggiore',
    range: 'Autonomia'
  },

  // Trip types
  tripTypes: {
    micro: 'Micro',
    short: 'Breve',
    medium: 'Medio',
    long: 'Lungo',
    veryLong: 'Molto Lungo'
  },

  // Benchmark / Comparison
  benchmark: {
    yourVehicle: 'Il Tuo Veicolo',
    yourTaycan: 'Il Tuo Taycan',
    yourTaycanCT: 'Il Tuo Taycan Cross Turismo',
    yourTaycanST: 'Il Tuo Taycan Sport Turismo',
    yourMacan: 'Il Tuo Macan Electric',
    yourCayenne: 'Il Tuo Cayenne Electric',
    yourEtronGT: 'Il Tuo e-tron GT',
    yourPorsche: 'Il Tuo Porsche',
    average: 'Media',
    avg: 'Med',
    comparison: 'Confronto',
    betterThan: 'meglio di',
    worseThan: 'peggio di',
    similar: 'Simile a',
    avgTaycan: 'Taycan Med',
    avgPorsche: 'Porsche Med',
    avgWltp: 'WLTP med'
  },

  // Driving profiles
  drivingProfiles: {
    urbanCommuter: 'Pendolare Urbano',
    mixedUse: 'Uso Misto',
    highwayCruiser: 'Viaggiatore Autostradale',
    weekendDriver: 'Guidatore del Weekend',
    efficientDriver: 'Guidatore Efficiente'
  },

  // My Car tab
  myCar: {
    noDataTitle: 'Nessun veicolo connesso',
    noDataDesc: 'Connettiti a Porsche Connect per visualizzare le informazioni del tuo veicolo.',
    connectButton: 'Connetti a Porsche',
    selectVehicle: 'Seleziona veicolo',
    vehiclePhotos: 'Foto del veicolo',
    lastKnownLocation: 'Ultima posizione nota',
    locationUnavailable: 'Dati di posizione non disponibili',
    openInMaps: 'Apri in Mappe',
    heading: 'Direzione',
    batteryLevel: 'Livello batteria',
    estimatedRange: 'Autonomia stimata',
    totalMileage: 'Chilometraggio totale',
    electricRange: 'Autonomia elettrica',
    vehicleDetails: 'Dettagli del veicolo',
    model: 'Modello',
    year: 'Anno',
    generation: 'Generazione',
    steering: 'Sterzo',
    leftHandDrive: 'Guida a sinistra',
    rightHandDrive: 'Guida a destra',
    locked: 'Bloccato',
    unlocked: 'Sbloccato',
    lastUpdated: 'Ultimo aggiornamento',
    frontView: 'Vista frontale',
    sideView: 'Vista laterale',
    rearView: 'Vista posteriore',
    topView: 'Vista dall\'alto',
    tirePressure: 'Pressione Pneumatici',
    tireFL: 'AS',
    tireFR: 'AD',
    tireRL: 'PS',
    tireRR: 'PD',
    charging: 'Ricarica',
    chargingStatus: 'In carica',
    notCharging: 'Non in carica',
    chargeTo: 'A',
    doneAt: 'Completato alle {time}'
  }
};
