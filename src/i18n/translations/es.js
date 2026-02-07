// Spanish translations
export const es = {
  // Language metadata
  _meta: {
    name: 'Spanish',
    nativeName: 'Español',
    code: 'es'
  },

  // Common
  common: {
    settings: 'Configuración',
    upload: 'Subir',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    save: 'Guardar',
    close: 'Cerrar',
    yes: 'Sí',
    no: 'No',
    ok: 'OK',
    error: 'Error',
    success: 'Éxito',
    warning: 'Advertencia',
    info: 'Info',
    loading: 'Cargando...',
    processing: 'Procesando...',
    required: 'Requerido',
    optional: 'Opcional',
    total: 'Total',
    average: 'Promedio',
    trips: 'viajes',
    trip: 'viaje',
    distance: 'Distancia',
    energy: 'Energía',
    consumption: 'Consumo',
    duration: 'Duración',
    speed: 'Velocidad',
    min: 'min',
    hours: 'horas',
    minutes: 'minutos',
    by: 'por'
  },

  // Header
  header: {
    title: 'Porsche EV Insights',
    subtitle: 'Análisis de Viajes EV',
    localFirst: 'LOCAL',
    privacyFirst: 'PRIVACIDAD',
    help: 'AYUDA'
  },

  // Navigation tabs
  tabs: {
    overview: 'Resumen',
    patterns: 'Patrones',
    efficiency: 'Eficiencia',
    costs: 'Costos',
    environmental: 'Ambiental',
    battery: 'Batería',
    insights: 'Análisis',
    myCar: 'Mi Coche'
  },

  // Sidebar
  sidebar: {
    darkMode: 'Tema Oscuro',
    lightMode: 'Tema Claro'
  },

  // Welcome screen
  welcome: {
    title: 'Bienvenido a Porsche EV Insights',
    description: 'Sube tus exportaciones CSV de Porsche Connect para analizar tus patrones de conducción.',
    uploadButton: 'Subir tus datos',
    sampleButton: 'Probar datos de ejemplo',
    privacyTitle: 'Privacidad protegida',
    privacyText: 'Todos los datos se procesan localmente en tu navegador.'
  },

  // Upload modal
  upload: {
    title: 'Subir datos EV',
    mergeTitle: 'Añadir más datos',
    audiZip: 'Audi e-tron GT ZIP',
    audiZipAlt: '(exportación myAudi)',
    audiZipDesc: 'Sube el archivo ZIP ExportTrips de la app myAudi',
    audiNoDataFile: 'No se encontraron datos de viaje en el ZIP. Se esperaba "Short-term memory.csv" o "Long-term memory.csv".',
    audiParseError: 'No se pudieron procesar los datos de viaje de Audi. Por favor verifica el formato del archivo.',
    orPorsche: 'o CSV Porsche',
    sinceStart: 'Desde el inicio',
    sinceStartDesc: 'Viajes individuales',
    sinceCharge: 'Desde la carga',
    sinceChargeDesc: 'Ciclos de carga',
    processButton: 'Procesar datos',
    mergeButton: 'Fusionar datos',
    tripsCount: '{count} viajes',
    cyclesCount: '{count} ciclos',
    modeReplace: 'Reemplazar',
    modeMerge: 'Fusionar',
    replaceDesc: 'Reemplazar todos los datos existentes con nuevos archivos',
    mergeDesc: 'Añadir nuevos viajes a los datos existentes (se omitirán duplicados)',
    mergeComplete: 'Datos fusionados correctamente',
    mergeStats: 'Se añadieron {new} viajes nuevos ({duplicates} duplicados omitidos). Total: {total} viajes.',
    mergeUnavailable: 'Fusión no disponible',
    mergeUnavailableDesc: 'Sus datos fueron importados antes de que se añadiera el soporte de fusión. Por favor use Reemplazar esta vez. Futuras importaciones soportarán fusión.',
    missingFile: 'Archivo faltante',
    missingFileDesc: 'Por favor sube los datos de viaje para continuar.'
  },

  // Porsche Connect
  porscheConnect: {
    title: 'Porsche Connect',
    subtitle: 'Datos en vivo de tu vehículo',
    checking: 'Comprobando conexión...',
    loginDescription: 'Inicia sesión con tu Porsche ID para sincronizar datos de viaje directamente desde tu vehículo.',
    email: 'Porsche ID (Email)',
    password: 'Contraseña',
    login: 'Iniciar sesión',
    loggingIn: 'Iniciando sesión...',
    logout: 'Cerrar sesión',
    privacyNote: 'Tus credenciales se envían de forma segura a Porsche y nunca se almacenan.',
    selectVehicle: 'Selecciona un vehículo para sincronizar:',
    fetchData: 'Sincronizar datos de viaje',
    loadingVehicles: 'Cargando vehículos...',
    loading: 'Cargando...',
    noVehicles: 'No se encontraron vehículos en tu cuenta de Porsche Connect.',
    noTrips: 'No hay datos de viaje disponibles. Asegúrate de haber realizado viajes con Porsche Connect activado.',
    errorTitle: 'Error de conexión',
    serverUnavailable: 'El servidor proxy de Porsche Connect no está ejecutándose. Por favor inícialo para habilitar la sincronización de datos en vivo.',
    serverInstructions: 'Ejecuta "cd server && npm install && npm start" en tu terminal, luego intenta de nuevo.',
    syncComplete: 'Sincronización completada',
    syncStats: 'Sincronizados {new} viajes desde tu {model}.',
    syncMergeStats: 'Añadidos {new} nuevos viajes ({duplicates} duplicados omitidos). Total: {total} viajes.',
    sessionExpired: 'Tu sesión ha expirado. Por favor inicia sesión de nuevo.',
    connected: 'Conectado',
    lastSync: 'Última sincronización',
    captchaDescription: 'Porsche requiere verificación. Por favor introduce el texto mostrado en la imagen.',
    captchaLabel: 'Código de verificación',
    captchaPlaceholder: 'Introduce el texto mostrado arriba',
    verifyCaptcha: 'Verificar',
    verifying: 'Verificando...',
    checkingForUpdates: 'Buscando nuevos viajes...',
    syncing: 'Sincronizando datos de viaje...',
    newDataSynced: '¡Nuevos viajes sincronizados!'
  },

  // Settings page
  settings: {
    title: 'Configuración',

    // Language & Units section
    languageAndUnits: 'Idioma y unidades',
    languageLabel: 'Idioma de visualización',
    unitSystem: 'Sistema de unidades',
    currency: 'Moneda',
    fuelConsumption: 'Consumo de combustible',
    electricConsumption: 'Consumo eléctrico',
    distanceUnit: 'Distancia',
    speedUnit: 'Velocidad',
    pressureUnit: 'Presión de neumáticos',

    // Cost settings section
    costSettings: 'Configuración de costos',
    electricityPrice: 'Electricidad',
    petrolPrice: 'Gasolina',
    petrolConsumption: 'Consumo de gasolina',
    perKwh: '/kWh',
    perLiter: '/L',
    perGallon: '/gal',

    // Vehicle settings section
    vehicleSettings: 'Configuración del vehículo',
    vehicleModel: 'Modelo Porsche EV',
    selectVehicle: 'Selecciona tu vehículo...',
    grossBattery: 'Batería Bruta',
    usableBatterySpec: 'Batería Útil',
    wltpRange: 'Autonomía WLTP',
    wltpConsumption: 'Consumo WLTP',
    epaRange: 'Autonomía EPA',
    epaMpge: 'Eficiencia EPA',
    batteryCapacity: 'Capacidad de batería útil (kWh)',
    batteryCapacityHelp: 'Se rellena automáticamente al seleccionar un vehículo. Puedes modificarlo manualmente.',

    // Vehicle notes
    vehicleNotesTitle: 'Notas sobre especificaciones',
    noteWltp: 'Los valores de autonomía se basan en datos oficiales del ciclo combinado WLTP',
    noteEpa: 'Autonomía y eficiencia basadas en datos oficiales del ciclo de prueba EPA de EE.UU.',
    noteMpge: 'Millas por galón equivalente (33,7 kWh = 1 galón de gasolina)',
    notePb: 'PB = Performance Battery (menor)',
    notePbPlus: 'PB+ = Performance Battery Plus (mayor)',
    noteJ11: 'Modelos 2020-2024 (primera generación)',
    noteJ12: 'Modelos 2025+ (actualización con ~35% más autonomía)',
    noteSportTurismo: 'Sport Turismo fue introducido en 2022',
    noteCrossTurismo: 'Cross Turismo fue introducido en 2021',
    noteTurboGt: 'Turbo GT solo está disponible como sedán',
    noteSportTurismoRwd: 'Sport Turismo tiene versión Base RWD; Cross Turismo no (todos son AWD)',
    noteMacanGts: 'Macan Electric GTS anunciado en octubre de 2025',

    // Data management section
    dataManagement: 'Gestión de datos',
    uploadCsvFiles: 'Subir archivos CSV',
    clearAllData: 'Borrar todos los datos',

    // Porsche Connect section
    porscheConnect: 'Porsche Connect',
    porscheConnected: 'Conectado a Porsche',
    porscheConnectDesc: 'Conéctate a los servidores de Porsche para sincronizar automáticamente tus datos de viaje.',
    connectToPorsche: 'Conectar con Porsche',
    syncData: 'Sincronizar datos de viaje',
    porscheLogout: 'Desconectar',

    // Backup & restore section
    backupRestore: 'Copia de seguridad y restauración',
    downloadBackup: 'Descargar copia',
    restoreBackup: 'Restaurar copia',

    // Theme settings
    theme: 'Tema',
    themeAuto: 'Auto (Sistema)',
    themeLight: 'Claro',
    themeDark: 'Oscuro',

    // Privacy notice
    privacyNoticeTitle: 'Datos almacenados localmente',
    privacyNoticeText: 'Tus datos de viaje nunca salen de tu dispositivo. Sin servidores, sin rastreo, sin recolección de datos. Todo se procesa y almacena localmente en tu navegador.'
  },

  // Confirm modal
  confirm: {
    clearDataTitle: '¿Borrar todos los datos?',
    clearDataMessage: 'Esta acción no se puede deshacer. Todos tus datos de viaje y configuración serán eliminados permanentemente de este dispositivo.',
    clearDataConfirm: 'Sí, borrar datos',
    backupRestored: '¡Copia restaurada exitosamente!',
    exportError: 'Error de exportación',
    restoreError: 'Error de restauración',
    parseError: 'Error al analizar archivo',
    missingFile: 'Archivo faltante',
    missingFileMessage: 'Por favor sube el archivo "Desde el inicio" para continuar.'
  },

  // Sample data banner
  sampleData: {
    viewing: 'Viendo datos de ejemplo',
    hide: 'Ocultar'
  },

  // Overview tab
  overview: {
    title: 'Resumen',
    totalTrips: 'Total de viajes',
    totalDistance: 'Distancia total',
    totalEnergy: 'Energía total',
    avgConsumption: 'Consumo promedio',
    avgTripDistance: 'Distancia promedio por viaje',
    avgTripDuration: 'Duración promedio por viaje',
    avgSpeed: 'Velocidad promedio',
    totalChargeCycles: 'Ciclos de carga',
    distanceOverTime: 'Distancia en el tiempo',
    tripsByType: 'Viajes por tipo',
    tripsPerCharge: 'Viajes/Carga',
    shortTrips: 'Viajes Cortos',
    avgPerMonth: 'Prom/Mes',
    distanceAndTrips: 'Distancia y Viajes',
    tripTypeDistribution: 'Distribución por Tipo de Viaje',
    energyOverTime: 'Energía en el tiempo',
    tripsOverTime: 'Viajes en el tiempo'
  },

  // Patterns tab
  patterns: {
    title: 'Patrones de conducción',
    hourlyDistribution: 'Distribución horaria de viajes',
    dailyPatterns: 'Patrones diarios',
    monthlyTrends: 'Tendencias mensuales',
    weekdayVsWeekend: 'Semana vs Fin de semana',
    peakHours: 'Horas pico',
    avgTripsPerDay: 'Viajes promedio por día',
    avgDistancePerDay: 'Distancia promedio por día',
    mostActiveDay: 'Día más activo',
    leastActiveDay: 'Día menos activo',
    distanceOverTime: 'Distancia en el tiempo',
    tripsPerHour: 'Viajes por Hora',
    tripsAndDistance: 'Viajes y Distancia por Día',
    avgDistance: 'Distancia Promedio'
  },

  // Efficiency tab
  efficiency: {
    title: 'Análisis de eficiencia',
    consumptionOverTime: 'Consumo en el tiempo',
    tripTypeEfficiency: 'Eficiencia por tipo de viaje',
    speedEfficiency: 'Velocidad vs eficiencia',
    bestEfficiency: 'Mejor Eficiencia',
    worstEfficiency: 'Peor Eficiencia',
    avgEfficiency: 'Eficiencia Promedio',
    efficiencyTrend: 'Tendencia de Eficiencia',
    optimalSpeed: 'Velocidad Óptima',
    consumptionBySpeed: 'Consumo por Velocidad',
    consumptionByTripType: 'Consumo por Tipo de Viaje',
    consumptionTrend: 'Tendencia de Consumo'
  },

  // Costs tab
  costs: {
    title: 'Análisis de costos',
    electricCost: 'Costo eléctrico',
    petrolCost: 'Equivalente gasolina',
    savings: 'Ahorro total',
    savingsRate: 'Tasa de ahorro',
    costPerDistance: 'Costo por {unit}',
    annualProjection: 'Proyección anual',
    fiveYearSavings: 'Ahorro en 5 años',
    comparedTo: 'comparado con auto de gasolina de {consumption}',
    monthlyCost: 'Costo Mensual',
    yearlyProjection: 'Proyección Anual',
    costComparison: 'Comparación de Costos',
    electricVsPetrol: 'Eléctrico vs Gasolina',
    savingsOverTime: 'Ahorro en el Tiempo',
    costPerTrip: 'Costo por Viaje',
    costPerKm: 'Costo por km',
    costPerMile: 'Costo por milla',
    projectedAnnual: 'Proyección Anual',
    projectedSavings: 'Ahorro Proyectado',
    electricityCost: 'Costo de Electricidad',
    petrolEquivalent: 'Equivalente Gasolina'
  },

  // Environmental tab
  environmental: {
    title: 'Impacto ambiental',
    co2Electric: 'CO₂ Eléctrico',
    co2Petrol: 'CO₂ Gasolina',
    co2Saved: 'CO₂ ahorrado',
    co2SavedLabel: 'CO₂ Ahorrado',
    treesEquivalent: 'Equivalente en árboles',
    reductionPercentage: 'Reducción',
    litersAvoided: 'Gasolina evitada',
    emissionsComparison: 'Comparación de Emisiones Mensuales',
    carbonFootprint: 'Huella de Carbono',
    annualImpact: 'Impacto Anual',
    equivalentTrees: 'Árboles Equivalentes',
    kgCo2: 'kg CO₂',
    tonsCo2: 'ton CO₂',
    vsElectric: 'vs gasolina',
    youProduced: 'Tus Emisiones',
    petrolWouldProduce: 'Gasolina Emitiría',
    treesPerYear: 'árboles/año',
    gridEmissions: 'Emisiones de la red',
    petrolBaseline: 'Referencia gasolina',
    electricGrid: 'red eléctrica',
    ifPetrol: 'si gasolina'
  },

  // Battery tab
  battery: {
    title: 'Batería y autonomía',
    realWorldRange: 'Autonomía Real',
    officialRange: 'Autonomía Oficial',
    rangeEfficiency: 'Eficiencia de autonomía',
    energyPerTrip: 'Energía por viaje',
    tripsPerCharge: 'Viajes/Batería Llena',
    distancePerCharge: 'Distancia por carga',
    batteryPerTrip: 'Batería por viaje',
    consumptionVsOfficial: 'vs Oficial',
    seasonalVariation: 'Variación estacional',
    chargesPerWeek: 'Cargas por semana',
    energyPerCharge: 'Energía/Carga',
    chargingLosses: 'Pérdidas de carga',
    offPeakSavings: 'Ahorro horas valle',
    fullCycles: 'Ciclos completos',
    batteryHealth: 'Salud de la Batería',
    chargingPattern: 'Patrón de Carga',
    rangeAnalysis: 'Análisis de Autonomía',
    winterRange: 'Autonomía Invierno',
    summerRange: 'Autonomía Verano',
    socUsedPerCycle: 'SOC Usado/Ciclo',
    potentialSavings: 'Ahorro Potencial',
    vsOfficialRange: 'vs Oficial',
    rangeComparison: 'Comparación de Autonomía',
    yourRange: 'Tu Autonomía',
    officialRangeLabel: 'Oficial',
    chargingOptimization: 'Optimización de Carga'
  },

  // Insights tab
  insights: {
    title: 'Análisis de conducción',
    commuter: 'Viajero diario',
    commuterDesc: '{pct}% de tus viajes son en horarios típicos de trabajo (7-8am, 5-7pm). Considera precalentar mientras está enchufado para ahorrar energía.',
    shortTrips: 'Combinar viajes cortos',
    shortTripsDesc: '{pct}% de los viajes son menores a {dist}. Los viajes cortos usan {diff}% más energía por {unit}. Considera combinar tareas.',
    weekendTripper: 'Viajero de fin de semana',
    weekendTripperDesc: 'Los viajes del sábado promedian {satDist} vs {weekdayDist} en días laborales. ¡Los viajes más largos son más eficientes!',
    winterDrop: 'Consejos de Invierno',
    winterDropDesc: 'El consumo de invierno es {pct}% mayor que en verano ({winter} vs {summer}). Usa la calefacción de asientos en lugar de climatización.',
    sweetSpot: 'Tu punto óptimo de eficiencia',
    sweetSpotDesc: 'Mejor eficiencia a {speed} ({cons}). Esto es {pct}% mejor que tu promedio.',
    optimalCharging: 'Frecuencia de carga óptima',
    optimalChargingDesc: 'Promedio de {trips} viajes por carga es saludable para la longevidad de la batería. ¡Sigue así!',
    frequentCharging: 'Carga frecuente',
    frequentChargingDesc: 'Cargas después de {trips} viajes en promedio. Considera cargar menos frecuentemente para la salud de la batería.',
    drivingProfile: 'Perfil de conducción',
    urbanCommuter: 'Urbano',
    mixedUse: 'Uso Mixto',
    highwayCruiser: 'Autopista',
    efficiencyRating: 'Calificación de eficiencia',
    vsAvgTaycan: 'vs Taycan Prom',
    shortTripPenalty: 'Penalización viaje corto',
    drivingScore: 'Puntuación de Conducción',
    recommendations: 'Recomendaciones Personalizadas',
    strengths: 'Fortalezas',
    areasToImprove: 'Áreas a Mejorar',
    yourInsights: 'Tus Análisis',
    predictions: 'Proyecciones y Pronósticos',
    projectedAnnualDistance: 'Distancia Anual',
    projectedAnnualTrips: 'Viajes Anuales',
    projectedAnnualEnergy: 'Energía Anual',
    projectedAnnualCost: 'Ahorro Anual',
    competitorComparison: 'Comparación EV',
    dailyCommuter: 'Viajero Diario',
    dailyCommuterDesc: '{pct}% de tus viajes son en horarios típicos de trabajo (7-8am, 5-7pm). Considera precalentar mientras está enchufado para ahorrar energía.',
    shortTripsHighUsage: 'Alto uso de viajes cortos',
    weekendTripperTitle: 'Viajero de Fin de Semana',
    projected: 'proyectado',
    nextMonthForecast: 'Pronóstico Próximo Mes',
    tripsExpected: 'viajes esperados',
    seasonalPrediction: 'Predicción Estacional',
    summer: 'Verano',
    winter: 'Invierno',
    // Recommendation strings
    vsPetrol: 'vs gasolina',
    chargingRecDaily: '80% diario, 100% para viajes largos',
    chargingRecPrecondition: 'Precalentar mientras está enchufado',
    efficiencyRecCombine: 'Combinar viajes cortos',
    efficiencyRecEcoMode: 'Eco en ciudad, normal en autopista',
    winterRecSeats: 'Usar calefacción de asientos/volante',
    winterRecGarage: 'Estacionar en garaje si es posible',
    winterRecPreheat: 'Precalentar mientras carga',
    efficiencyTarget: 'Objetivo: {target} (-5%)'
  },

  // Time view selector
  timeView: {
    day: 'Día',
    week: 'Semana',
    month: 'Mes'
  },

  // Days of week
  days: {
    mon: 'Lun',
    tue: 'Mar',
    wed: 'Mié',
    thu: 'Jue',
    fri: 'Vie',
    sat: 'Sáb',
    sun: 'Dom',
    monday: 'Lunes',
    tuesday: 'Martes',
    wednesday: 'Miércoles',
    thursday: 'Jueves',
    friday: 'Viernes',
    saturday: 'Sábado',
    sunday: 'Domingo'
  },

  // Months
  months: {
    jan: 'Ene',
    feb: 'Feb',
    mar: 'Mar',
    apr: 'Abr',
    may: 'May',
    jun: 'Jun',
    jul: 'Jul',
    aug: 'Ago',
    sep: 'Sep',
    oct: 'Oct',
    nov: 'Nov',
    dec: 'Dic'
  },

  // Seasons
  seasons: {
    spring: 'Primavera',
    summer: 'Verano',
    autumn: 'Otoño',
    winter: 'Invierno'
  },

  // Footer
  footer: {
    tagline: 'Porsche EV Trips Insights • Local • Privacidad • Ningún dato sale de tu dispositivo',
    developedBy: 'Desarrollado por'
  },

  // Unit systems
  unitSystems: {
    metric: 'Métrico (km, L)',
    imperial_uk: 'Imperial UK (mi, mpg)',
    imperial_us: 'Imperial US (mi, mpg)'
  },

  // Chart labels
  charts: {
    distance: 'Distancia',
    trips: 'Viajes',
    consumption: 'Consumo',
    energy: 'Energía',
    cost: 'Costo',
    savings: 'Ahorro',
    efficiency: 'Eficiencia',
    speed: 'Velocidad',
    time: 'Tiempo',
    hour: 'Hora',
    day: 'Día',
    week: 'Semana',
    month: 'Mes',
    year: 'Año',
    average: 'Promedio',
    total: 'Total',
    best: 'Mejor',
    worst: 'Peor',
    range: 'Autonomía'
  },

  // Trip types
  tripTypes: {
    micro: 'Micro',
    short: 'Corto',
    medium: 'Medio',
    long: 'Largo',
    veryLong: 'Muy Largo'
  },

  // Benchmark / Comparison
  benchmark: {
    yourVehicle: 'Tu Vehículo',
    yourTaycan: 'Tu Taycan',
    yourTaycanCT: 'Tu Taycan Cross Turismo',
    yourTaycanST: 'Tu Taycan Sport Turismo',
    yourMacan: 'Tu Macan Electric',
    yourCayenne: 'Tu Cayenne Electric',
    yourEtronGT: 'Tu e-tron GT',
    yourPorsche: 'Tu Porsche',
    average: 'Promedio',
    avg: 'Prom',
    comparison: 'Comparación',
    betterThan: 'mejor que',
    worseThan: 'peor que',
    similar: 'Similar a',
    avgTaycan: 'Taycan Prom',
    avgPorsche: 'Porsche Prom',
    avgWltp: 'WLTP prom'
  },

  // Driving profiles
  drivingProfiles: {
    urbanCommuter: 'Viajero Urbano',
    mixedUse: 'Uso Mixto',
    highwayCruiser: 'Viajero de Autopista',
    weekendDriver: 'Conductor de Fin de Semana',
    efficientDriver: 'Conductor Eficiente'
  },

  // My Car tab
  myCar: {
    noDataTitle: 'Ningún vehículo conectado',
    noDataDesc: 'Conéctate a Porsche Connect para ver la información de tu vehículo.',
    connectButton: 'Conectar a Porsche',
    selectVehicle: 'Seleccionar vehículo',
    vehiclePhotos: 'Fotos del vehículo',
    lastKnownLocation: 'Última ubicación conocida',
    locationUnavailable: 'Datos de ubicación no disponibles',
    openInMaps: 'Abrir en Mapas',
    heading: 'Dirección',
    batteryLevel: 'Nivel de batería',
    estimatedRange: 'Autonomía estimada',
    totalMileage: 'Kilometraje total',
    electricRange: 'Autonomía eléctrica',
    vehicleDetails: 'Detalles del vehículo',
    model: 'Modelo',
    year: 'Año',
    generation: 'Generación',
    steering: 'Dirección',
    leftHandDrive: 'Volante a la izquierda',
    rightHandDrive: 'Volante a la derecha',
    locked: 'Bloqueado',
    unlocked: 'Desbloqueado',
    lastUpdated: 'Última actualización',
    frontView: 'Vista frontal',
    sideView: 'Vista lateral',
    rearView: 'Vista trasera',
    topView: 'Vista superior',
    tirePressure: 'Presión de Neumáticos',
    tireFL: 'DI',
    tireFR: 'DD',
    tireRL: 'TI',
    tireRR: 'TD',
    charging: 'Carga',
    chargingStatus: 'Cargando',
    notCharging: 'No cargando',
    chargeTo: 'A',
    doneAt: 'Listo a las {time}'
  }
};
