// French translations
export const fr = {
  // Language metadata
  _meta: {
    name: 'French',
    nativeName: 'Français',
    code: 'fr'
  },

  // Common
  common: {
    settings: 'Paramètres',
    upload: 'Télécharger',
    cancel: 'Annuler',
    confirm: 'Confirmer',
    save: 'Enregistrer',
    close: 'Fermer',
    yes: 'Oui',
    no: 'Non',
    ok: 'OK',
    error: 'Erreur',
    success: 'Succès',
    warning: 'Avertissement',
    info: 'Info',
    loading: 'Chargement...',
    processing: 'Traitement...',
    required: 'Requis',
    optional: 'Optionnel',
    total: 'Total',
    average: 'Moyenne',
    trips: 'trajets',
    trip: 'trajet',
    distance: 'Distance',
    energy: 'Énergie',
    consumption: 'Consommation',
    duration: 'Durée',
    speed: 'Vitesse',
    min: 'min',
    hours: 'heures',
    minutes: 'minutes',
    by: 'par'
  },

  // Header
  header: {
    title: 'Porsche EV Insights',
    subtitle: 'Analyse de Trajets EV',
    localFirst: 'LOCAL',
    privacyFirst: 'VIE PRIVÉE',
    help: 'AIDE'
  },

  // Navigation tabs
  tabs: {
    overview: 'Aperçu',
    patterns: 'Tendances',
    efficiency: 'Efficacité',
    costs: 'Coûts',
    environmental: 'Environnement',
    battery: 'Batterie',
    insights: 'Analyses',
    myCar: 'Ma Voiture'
  },

  // Sidebar
  sidebar: {
    darkMode: 'Thème Sombre',
    lightMode: 'Thème Clair'
  },

  // Welcome screen
  welcome: {
    title: 'Bienvenue sur Porsche EV Insights',
    description: 'Téléchargez vos exports CSV Porsche Connect pour analyser vos habitudes de conduite.',
    uploadButton: 'Télécharger vos données',
    sampleButton: 'Essayer les données exemple',
    privacyTitle: 'Vie privée protégée',
    privacyText: 'Toutes les données sont traitées localement dans votre navigateur.'
  },

  // Upload modal
  upload: {
    title: 'Télécharger les données VE',
    mergeTitle: 'Ajouter des données',
    audiZip: 'Audi e-tron GT ZIP',
    audiZipAlt: '(export myAudi)',
    audiZipDesc: 'Téléchargez le fichier ZIP ExportTrips de l\'app myAudi',
    audiNoDataFile: 'Aucune donnée de trajet trouvée dans le ZIP. Attendu "Short-term memory.csv" ou "Long-term memory.csv".',
    audiParseError: 'Impossible de traiter les données de trajet Audi. Veuillez vérifier le format du fichier.',
    orPorsche: 'ou CSV Porsche',
    sinceStart: 'Depuis le début',
    sinceStartDesc: 'Trajets individuels',
    sinceCharge: 'Depuis la charge',
    sinceChargeDesc: 'Cycles de charge',
    processButton: 'Traiter les données',
    mergeButton: 'Fusionner les données',
    tripsCount: '{count} trajets',
    cyclesCount: '{count} cycles',
    modeReplace: 'Remplacer',
    modeMerge: 'Fusionner',
    replaceDesc: 'Remplacer toutes les données existantes par de nouveaux fichiers',
    mergeDesc: 'Ajouter de nouveaux trajets aux données existantes (les doublons seront ignorés)',
    mergeComplete: 'Données fusionnées avec succès',
    mergeStats: '{new} nouveaux trajets ajoutés ({duplicates} doublons ignorés). Total: {total} trajets.',
    mergeUnavailable: 'Fusion non disponible',
    mergeUnavailableDesc: 'Vos données ont été importées avant l\'ajout du support de fusion. Veuillez utiliser Remplacer cette fois. Les importations futures supporteront la fusion.',
    missingFile: 'Fichier manquant',
    missingFileDesc: 'Veuillez télécharger les données de trajet pour continuer.'
  },

  // Porsche Connect
  porscheConnect: {
    title: 'Porsche Connect',
    subtitle: 'Données en direct de votre véhicule',
    checking: 'Vérification de la connexion...',
    loginDescription: 'Connectez-vous avec votre Porsche ID pour synchroniser les données de trajet directement depuis votre véhicule.',
    email: 'Porsche ID (Email)',
    password: 'Mot de passe',
    login: 'Se connecter',
    loggingIn: 'Connexion en cours...',
    logout: 'Se déconnecter',
    privacyNote: 'Vos identifiants sont envoyés de manière sécurisée à Porsche et ne sont jamais stockés.',
    selectVehicle: 'Sélectionnez un véhicule à synchroniser:',
    fetchData: 'Synchroniser les données de trajet',
    loadingVehicles: 'Chargement des véhicules...',
    loading: 'Chargement...',
    noVehicles: 'Aucun véhicule trouvé dans votre compte Porsche Connect.',
    noTrips: 'Aucune donnée de trajet disponible. Assurez-vous d\'avoir effectué des trajets avec Porsche Connect activé.',
    errorTitle: 'Erreur de connexion',
    serverUnavailable: 'Le serveur proxy Porsche Connect n\'est pas en cours d\'exécution. Veuillez le démarrer pour activer la synchronisation des données en direct.',
    serverInstructions: 'Exécutez "cd server && npm install && npm start" dans votre terminal, puis réessayez.',
    syncComplete: 'Synchronisation terminée',
    syncStats: '{new} trajets synchronisés depuis votre {model}.',
    syncMergeStats: '{new} nouveaux trajets ajoutés ({duplicates} doublons ignorés). Total: {total} trajets.',
    sessionExpired: 'Votre session a expiré. Veuillez vous reconnecter.',
    connected: 'Connecté',
    lastSync: 'Dernière synchronisation',
    captchaDescription: 'Porsche nécessite une vérification. Veuillez entrer le texte affiché dans l\'image.',
    captchaLabel: 'Code de vérification',
    captchaPlaceholder: 'Entrez le texte affiché ci-dessus',
    verifyCaptcha: 'Vérifier',
    verifying: 'Vérification en cours...',
    checkingForUpdates: 'Recherche de nouveaux trajets...',
    syncing: 'Synchronisation des données de trajet...',
    newDataSynced: 'Nouveaux trajets synchronisés!'
  },

  // Settings page
  settings: {
    title: 'Paramètres',

    // Language & Units section
    languageAndUnits: 'Langue et unités',
    languageLabel: 'Langue d\'affichage',
    unitSystem: 'Système d\'unités',
    currency: 'Devise',
    fuelConsumption: 'Consommation carburant',
    electricConsumption: 'Consommation électrique',
    distanceUnit: 'Distance',
    speedUnit: 'Vitesse',
    pressureUnit: 'Pression des pneus',

    // Cost settings section
    costSettings: 'Paramètres de coût',
    electricityPrice: 'Électricité',
    petrolPrice: 'Essence',
    petrolConsumption: 'Consommation essence',
    perKwh: '/kWh',
    perLiter: '/L',
    perGallon: '/gal',

    // Vehicle settings section
    vehicleSettings: 'Paramètres du véhicule',
    vehicleModel: 'Modèle Porsche EV',
    selectVehicle: 'Sélectionnez votre véhicule...',
    grossBattery: 'Batterie Brute',
    usableBatterySpec: 'Batterie Utile',
    wltpRange: 'Autonomie WLTP',
    wltpConsumption: 'Consommation WLTP',
    epaRange: 'Autonomie EPA',
    epaMpge: 'Efficacité EPA',
    batteryCapacity: 'Capacité batterie utile (kWh)',
    batteryCapacityHelp: 'Rempli automatiquement lors de la sélection du véhicule. Modifiable manuellement.',

    // Vehicle notes
    vehicleNotesTitle: 'Notes sur les spécifications',
    noteWltp: 'Les valeurs d\'autonomie sont basées sur les données officielles du cycle combiné WLTP',
    noteEpa: 'Autonomie et efficacité basées sur les données officielles du cycle de test EPA américain',
    noteMpge: 'Miles par gallon équivalent (33,7 kWh = 1 gallon d\'essence)',
    notePb: 'PB = Performance Battery (petite)',
    notePbPlus: 'PB+ = Performance Battery Plus (grande)',
    noteJ11: 'Modèles 2020-2024 (première génération)',
    noteJ12: 'Modèles 2025+ (mise à jour avec ~35% d\'autonomie en plus)',
    noteSportTurismo: 'Sport Turismo a été introduit en 2022',
    noteCrossTurismo: 'Cross Turismo a été introduit en 2021',
    noteTurboGt: 'Turbo GT n\'est disponible qu\'en berline',
    noteSportTurismoRwd: 'Sport Turismo a une version Base RWD; Cross Turismo non (tous sont AWD)',
    noteMacanGts: 'Macan Electric GTS annoncé en octobre 2025',

    // Data management section
    dataManagement: 'Gestion des données',
    uploadCsvFiles: 'Télécharger fichiers CSV',
    clearAllData: 'Effacer toutes les données',

    // Porsche Connect section
    porscheConnect: 'Porsche Connect',
    porscheConnected: 'Connecté à Porsche',
    porscheConnectDesc: 'Connectez-vous aux serveurs Porsche pour synchroniser automatiquement vos données de trajet.',
    connectToPorsche: 'Se connecter à Porsche',
    syncData: 'Synchroniser les données de trajet',
    porscheLogout: 'Déconnecter',

    // Backup & restore section
    backupRestore: 'Sauvegarde et restauration',
    downloadBackup: 'Télécharger sauvegarde',
    restoreBackup: 'Restaurer sauvegarde',

    // Theme settings
    theme: 'Thème',
    themeAuto: 'Auto (Système)',
    themeLight: 'Clair',
    themeDark: 'Sombre',

    // Privacy notice
    privacyNoticeTitle: 'Données stockées localement',
    privacyNoticeText: 'Vos données de trajet ne quittent jamais votre appareil. Pas de serveurs, pas de suivi, pas de collecte de données. Tout est traité et stocké localement dans votre navigateur.'
  },

  // Confirm modal
  confirm: {
    clearDataTitle: 'Effacer toutes les données?',
    clearDataMessage: 'Cette action est irréversible. Toutes vos données de trajet et paramètres seront définitivement supprimés de cet appareil.',
    clearDataConfirm: 'Oui, effacer les données',
    backupRestored: 'Sauvegarde restaurée avec succès!',
    exportError: 'Erreur d\'export',
    restoreError: 'Erreur de restauration',
    parseError: 'Erreur d\'analyse du fichier',
    missingFile: 'Fichier manquant',
    missingFileMessage: 'Veuillez télécharger le fichier "Depuis le début" pour continuer.'
  },

  // Sample data banner
  sampleData: {
    viewing: 'Affichage des données exemple',
    hide: 'Masquer'
  },

  // Overview tab
  overview: {
    title: 'Aperçu',
    totalTrips: 'Total trajets',
    totalDistance: 'Distance totale',
    totalEnergy: 'Énergie totale',
    avgConsumption: 'Consommation moyenne',
    avgTripDistance: 'Distance moyenne par trajet',
    avgTripDuration: 'Durée moyenne par trajet',
    avgSpeed: 'Vitesse moyenne',
    totalChargeCycles: 'Cycles de charge',
    distanceOverTime: 'Distance dans le temps',
    tripsByType: 'Trajets par type',
    tripsPerCharge: 'Trajets/Charge',
    shortTrips: 'Trajets Courts',
    avgPerMonth: 'Moy/Mois',
    distanceAndTrips: 'Distance et Trajets',
    tripTypeDistribution: 'Distribution par Type de Trajet',
    energyOverTime: 'Énergie dans le temps',
    tripsOverTime: 'Trajets dans le temps'
  },

  // Patterns tab
  patterns: {
    title: 'Tendances de conduite',
    hourlyDistribution: 'Distribution horaire des trajets',
    dailyPatterns: 'Tendances journalières',
    monthlyTrends: 'Tendances mensuelles',
    weekdayVsWeekend: 'Semaine vs Week-end',
    peakHours: 'Heures de pointe',
    avgTripsPerDay: 'Trajets moyens par jour',
    avgDistancePerDay: 'Distance moyenne par jour',
    mostActiveDay: 'Jour le plus actif',
    leastActiveDay: 'Jour le moins actif',
    distanceOverTime: 'Distance dans le temps',
    tripsPerHour: 'Trajets par Heure',
    tripsAndDistance: 'Trajets et Distance par Jour',
    avgDistance: 'Distance Moyenne'
  },

  // Efficiency tab
  efficiency: {
    title: 'Analyse d\'efficacité',
    consumptionOverTime: 'Consommation dans le temps',
    tripTypeEfficiency: 'Efficacité par type de trajet',
    speedEfficiency: 'Vitesse vs efficacité',
    bestEfficiency: 'Meilleure Efficacité',
    worstEfficiency: 'Pire Efficacité',
    avgEfficiency: 'Efficacité Moyenne',
    efficiencyTrend: 'Tendance d\'Efficacité',
    optimalSpeed: 'Vitesse Optimale',
    consumptionBySpeed: 'Consommation par Vitesse',
    consumptionByTripType: 'Consommation par Type de Trajet',
    consumptionTrend: 'Tendance de Consommation'
  },

  // Costs tab
  costs: {
    title: 'Analyse des coûts',
    electricCost: 'Coût électrique',
    petrolCost: 'Équivalent essence',
    savings: 'Économies totales',
    savingsRate: 'Taux d\'économie',
    costPerDistance: 'Coût par {unit}',
    annualProjection: 'Projection annuelle',
    fiveYearSavings: 'Économies sur 5 ans',
    comparedTo: 'par rapport à une voiture essence de {consumption}',
    monthlyCost: 'Coût Mensuel',
    yearlyProjection: 'Projection Annuelle',
    costComparison: 'Comparaison des Coûts',
    electricVsPetrol: 'Électrique vs Essence',
    savingsOverTime: 'Économies dans le Temps',
    costPerTrip: 'Coût par Trajet',
    costPerKm: 'Coût par km',
    costPerMile: 'Coût par mile',
    projectedAnnual: 'Projection Annuelle',
    projectedSavings: 'Économies Projetées',
    electricityCost: 'Coût Électricité',
    petrolEquivalent: 'Équivalent Essence'
  },

  // Environmental tab
  environmental: {
    title: 'Impact environnemental',
    co2Electric: 'CO₂ Électrique',
    co2Petrol: 'CO₂ Essence',
    co2Saved: 'CO₂ économisé',
    co2SavedLabel: 'CO₂ Économisé',
    treesEquivalent: 'Équivalent arbres',
    reductionPercentage: 'Réduction',
    litersAvoided: 'Essence évitée',
    emissionsComparison: 'Comparaison des Émissions Mensuelles',
    carbonFootprint: 'Empreinte Carbone',
    annualImpact: 'Impact Annuel',
    equivalentTrees: 'Arbres Équivalents',
    kgCo2: 'kg CO₂',
    tonsCo2: 'ton CO₂',
    vsElectric: 'vs essence',
    youProduced: 'Vos Émissions',
    petrolWouldProduce: 'Essence Émettrait',
    treesPerYear: 'arbres/an',
    gridEmissions: 'Émissions du réseau',
    petrolBaseline: 'Référence essence',
    electricGrid: 'réseau électrique',
    ifPetrol: 'si essence'
  },

  // Battery tab
  battery: {
    title: 'Batterie et autonomie',
    realWorldRange: 'Autonomie Réelle',
    officialRange: 'Autonomie Officielle',
    rangeEfficiency: 'Efficacité d\'autonomie',
    energyPerTrip: 'Énergie par trajet',
    tripsPerCharge: 'Trajets/Batterie Pleine',
    distancePerCharge: 'Distance par charge',
    batteryPerTrip: 'Batterie par trajet',
    consumptionVsOfficial: 'vs Officiel',
    seasonalVariation: 'Variation saisonnière',
    chargesPerWeek: 'Charges par semaine',
    energyPerCharge: 'Énergie/Charge',
    chargingLosses: 'Pertes de charge',
    offPeakSavings: 'Économies heures creuses',
    fullCycles: 'Cycles complets',
    batteryHealth: 'Santé de la Batterie',
    chargingPattern: 'Schéma de Charge',
    rangeAnalysis: 'Analyse d\'Autonomie',
    winterRange: 'Autonomie Hiver',
    summerRange: 'Autonomie Été',
    socUsedPerCycle: 'SOC Utilisé/Cycle',
    potentialSavings: 'Économies Potentielles',
    vsOfficialRange: 'vs Officiel',
    rangeComparison: 'Comparaison d\'Autonomie',
    yourRange: 'Votre Autonomie',
    officialRangeLabel: 'Officiel',
    chargingOptimization: 'Optimisation de Charge'
  },

  // Insights tab
  insights: {
    title: 'Analyses de conduite',
    commuter: 'Navetteur quotidien',
    commuterDesc: '{pct}% de vos trajets sont aux heures de pointe (7-8h, 17-19h). Pensez à préchauffer en branché pour économiser de l\'énergie.',
    shortTrips: 'Combiner les trajets courts',
    shortTripsDesc: '{pct}% des trajets font moins de {dist}. Les trajets courts consomment {diff}% d\'énergie en plus par {unit}. Pensez à regrouper les courses.',
    weekendTripper: 'Voyageur du week-end',
    weekendTripperDesc: 'Les trajets du samedi font en moyenne {satDist} vs {weekdayDist} en semaine. Les trajets plus longs sont plus efficaces!',
    winterDrop: 'Conseils d\'Hiver',
    winterDropDesc: 'La consommation hivernale est {pct}% plus élevée qu\'en été ({winter} vs {summer}). Utilisez le chauffage des sièges plutôt que la climatisation.',
    sweetSpot: 'Votre point d\'efficacité optimal',
    sweetSpotDesc: 'Meilleure efficacité à {speed} ({cons}). C\'est {pct}% mieux que votre moyenne.',
    optimalCharging: 'Fréquence de charge optimale',
    optimalChargingDesc: 'En moyenne {trips} trajets par charge est sain pour la longévité de la batterie. Continuez ainsi!',
    frequentCharging: 'Charge fréquente',
    frequentChargingDesc: 'Vous chargez après {trips} trajets en moyenne. Pensez à charger moins souvent pour la santé de la batterie.',
    drivingProfile: 'Profil de conduite',
    urbanCommuter: 'Urbain',
    mixedUse: 'Usage Mixte',
    highwayCruiser: 'Autoroute',
    efficiencyRating: 'Note d\'efficacité',
    vsAvgTaycan: 'vs Taycan Moy',
    shortTripPenalty: 'Pénalité trajet court',
    drivingScore: 'Score de Conduite',
    recommendations: 'Recommandations Personnalisées',
    strengths: 'Points Forts',
    areasToImprove: 'Axes d\'Amélioration',
    yourInsights: 'Vos Analyses',
    predictions: 'Projections et Prévisions',
    projectedAnnualDistance: 'Distance Annuelle',
    projectedAnnualTrips: 'Trajets Annuels',
    projectedAnnualEnergy: 'Énergie Annuelle',
    projectedAnnualCost: 'Économies Annuelles',
    competitorComparison: 'Comparaison VE',
    dailyCommuter: 'Navetteur Quotidien',
    dailyCommuterDesc: '{pct}% de vos trajets sont aux heures de pointe (7-8h, 17-19h). Pensez à préchauffer en branché pour économiser de l\'énergie.',
    shortTripsHighUsage: 'Utilisation élevée de trajets courts',
    weekendTripperTitle: 'Voyageur du Week-end',
    projected: 'projeté',
    nextMonthForecast: 'Prévision Mois Prochain',
    tripsExpected: 'trajets attendus',
    seasonalPrediction: 'Prédiction Saisonnière',
    summer: 'Été',
    winter: 'Hiver',
    // Recommendation strings
    vsPetrol: 'vs essence',
    chargingRecDaily: '80% quotidien, 100% pour longs trajets',
    chargingRecPrecondition: 'Préchauffer en branché',
    efficiencyRecCombine: 'Combiner les trajets courts',
    efficiencyRecEcoMode: 'Eco en ville, normal sur autoroute',
    winterRecSeats: 'Utiliser chauffage sièges/volant',
    winterRecGarage: 'Stationner en garage si possible',
    winterRecPreheat: 'Préchauffer pendant la charge',
    efficiencyTarget: 'Objectif: {target} (-5%)'
  },

  // Time view selector
  timeView: {
    day: 'Jour',
    week: 'Semaine',
    month: 'Mois'
  },

  // Days of week
  days: {
    mon: 'Lun',
    tue: 'Mar',
    wed: 'Mer',
    thu: 'Jeu',
    fri: 'Ven',
    sat: 'Sam',
    sun: 'Dim',
    monday: 'Lundi',
    tuesday: 'Mardi',
    wednesday: 'Mercredi',
    thursday: 'Jeudi',
    friday: 'Vendredi',
    saturday: 'Samedi',
    sunday: 'Dimanche'
  },

  // Months
  months: {
    jan: 'Jan',
    feb: 'Fév',
    mar: 'Mar',
    apr: 'Avr',
    may: 'Mai',
    jun: 'Juin',
    jul: 'Juil',
    aug: 'Août',
    sep: 'Sep',
    oct: 'Oct',
    nov: 'Nov',
    dec: 'Déc'
  },

  // Seasons
  seasons: {
    spring: 'Printemps',
    summer: 'Été',
    autumn: 'Automne',
    winter: 'Hiver'
  },

  // Footer
  footer: {
    tagline: 'Porsche EV Trips Insights • Local • Vie privée • Aucune donnée ne quitte votre appareil',
    developedBy: 'Développé par'
  },

  // Unit systems
  unitSystems: {
    metric: 'Métrique (km, L)',
    imperial_uk: 'Imperial UK (mi, mpg)',
    imperial_us: 'Imperial US (mi, mpg)'
  },

  // Chart labels
  charts: {
    distance: 'Distance',
    trips: 'Trajets',
    consumption: 'Consommation',
    energy: 'Énergie',
    cost: 'Coût',
    savings: 'Économies',
    efficiency: 'Efficacité',
    speed: 'Vitesse',
    time: 'Temps',
    hour: 'Heure',
    day: 'Jour',
    week: 'Semaine',
    month: 'Mois',
    year: 'Année',
    average: 'Moyenne',
    total: 'Total',
    best: 'Meilleur',
    worst: 'Pire',
    range: 'Autonomie'
  },

  // Trip types
  tripTypes: {
    micro: 'Micro',
    short: 'Court',
    medium: 'Moyen',
    long: 'Long',
    veryLong: 'Très Long'
  },

  // Benchmark / Comparison
  benchmark: {
    yourVehicle: 'Votre Véhicule',
    yourTaycan: 'Votre Taycan',
    yourTaycanCT: 'Votre Taycan Cross Turismo',
    yourTaycanST: 'Votre Taycan Sport Turismo',
    yourMacan: 'Votre Macan Electric',
    yourCayenne: 'Votre Cayenne Electric',
    yourEtronGT: 'Votre e-tron GT',
    yourPorsche: 'Votre Porsche',
    average: 'Moyenne',
    avg: 'Moy',
    comparison: 'Comparaison',
    betterThan: 'meilleur que',
    worseThan: 'pire que',
    similar: 'Similaire à',
    avgTaycan: 'Taycan Moy',
    avgPorsche: 'Porsche Moy',
    avgWltp: 'WLTP moy'
  },

  // Driving profiles
  drivingProfiles: {
    urbanCommuter: 'Navetteur Urbain',
    mixedUse: 'Usage Mixte',
    highwayCruiser: 'Voyageur Autoroutier',
    weekendDriver: 'Conducteur du Week-end',
    efficientDriver: 'Conducteur Efficace'
  },

  // My Car tab
  myCar: {
    noDataTitle: 'Aucun véhicule connecté',
    noDataDesc: 'Connectez-vous à Porsche Connect pour afficher les informations de votre véhicule.',
    connectButton: 'Connecter à Porsche',
    selectVehicle: 'Sélectionner un véhicule',
    vehiclePhotos: 'Photos du véhicule',
    lastKnownLocation: 'Dernière position connue',
    locationUnavailable: 'Données de localisation non disponibles',
    openInMaps: 'Ouvrir dans Plans',
    heading: 'Direction',
    batteryLevel: 'Niveau de batterie',
    estimatedRange: 'Autonomie estimée',
    totalMileage: 'Kilométrage total',
    electricRange: 'Autonomie électrique',
    vehicleDetails: 'Détails du véhicule',
    model: 'Modèle',
    year: 'Année',
    generation: 'Génération',
    steering: 'Direction',
    leftHandDrive: 'Conduite à gauche',
    rightHandDrive: 'Conduite à droite',
    locked: 'Verrouillé',
    unlocked: 'Déverrouillé',
    lastUpdated: 'Dernière mise à jour',
    frontView: 'Vue avant',
    sideView: 'Vue latérale',
    rearView: 'Vue arrière',
    topView: 'Vue de dessus',
    tirePressure: 'Pression des Pneus',
    tireFL: 'AVG',
    tireFR: 'AVD',
    tireRL: 'ARG',
    tireRR: 'ARD',
    charging: 'Charge',
    chargingStatus: 'En charge',
    notCharging: 'Pas en charge',
    chargeTo: 'À',
    doneAt: 'Terminé à {time}'
  }
};
