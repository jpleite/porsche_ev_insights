// Portuguese translations
export const pt = {
  // Language metadata
  _meta: {
    name: 'Portuguese',
    nativeName: 'Português',
    code: 'pt'
  },

  // Common
  common: {
    settings: 'Definições',
    upload: 'Carregar',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    save: 'Guardar',
    close: 'Fechar',
    yes: 'Sim',
    no: 'Não',
    ok: 'OK',
    error: 'Erro',
    success: 'Sucesso',
    warning: 'Aviso',
    info: 'Info',
    loading: 'A carregar...',
    processing: 'A processar...',
    required: 'Obrigatório',
    optional: 'Opcional',
    total: 'Total',
    average: 'Média',
    trips: 'viagens',
    trip: 'viagem',
    distance: 'Distância',
    energy: 'Energia',
    consumption: 'Consumo',
    duration: 'Duração',
    speed: 'Velocidade',
    min: 'min',
    hours: 'horas',
    minutes: 'minutos',
    by: 'por'
  },

  // Header
  header: {
    title: 'Porsche EV Insights',
    subtitle: 'Análise de Viagens EV',
    localFirst: 'LOCAL',
    privacyFirst: 'PRIVACIDADE',
    help: 'AJUDA'
  },

  // Navigation tabs
  tabs: {
    overview: 'Visão Geral',
    patterns: 'Padrões',
    efficiency: 'Eficiência',
    costs: 'Custos',
    environmental: 'Ambiental',
    battery: 'Bateria',
    insights: 'Análises'
  },

  // Sidebar
  sidebar: {
    darkMode: 'Tema Escuro',
    lightMode: 'Tema Claro'
  },

  // Welcome screen
  welcome: {
    title: 'Bem-vindo ao Porsche EV Insights',
    description: 'Carregue os seus ficheiros CSV do Porsche Connect para analisar os seus padrões de condução.',
    uploadButton: 'Carregar Dados',
    sampleButton: 'Experimentar Dados de Exemplo',
    privacyTitle: 'Privacidade Protegida',
    privacyText: 'Todos os dados são processados localmente no seu navegador.'
  },

  // Upload modal
  upload: {
    title: 'Carregar Dados EV',
    mergeTitle: 'Adicionar Mais Dados',
    audiZip: 'Audi e-tron GT ZIP',
    audiZipAlt: '(exportação myAudi)',
    audiZipDesc: 'Carregue o ficheiro ZIP ExportTrips da app myAudi',
    audiNoDataFile: 'Nenhum dado de viagem encontrado no ZIP. Esperado "Short-term memory.csv" ou "Long-term memory.csv".',
    audiParseError: 'Não foi possível processar os dados de viagem Audi. Por favor verifique o formato do ficheiro.',
    orPorsche: 'ou CSV Porsche',
    sinceStart: 'Desde o Início',
    sinceStartDesc: 'Viagens individuais',
    sinceCharge: 'Desde o Carregamento',
    sinceChargeDesc: 'Ciclos de carga',
    processButton: 'Processar Dados',
    mergeButton: 'Juntar Dados',
    tripsCount: '{count} viagens',
    cyclesCount: '{count} ciclos',
    modeReplace: 'Substituir',
    modeMerge: 'Juntar',
    replaceDesc: 'Substituir todos os dados existentes pelos novos ficheiros',
    mergeDesc: 'Adicionar novas viagens aos dados existentes (duplicados serão ignorados)',
    mergeComplete: 'Dados Juntados com Sucesso',
    mergeStats: 'Adicionadas {new} novas viagens ({duplicates} duplicados ignorados). Total: {total} viagens.',
    mergeUnavailable: 'Junção Não Disponível',
    mergeUnavailableDesc: 'Os seus dados foram importados antes do suporte de junção ser adicionado. Por favor use Substituir desta vez. Futuras importações suportarão junção.',
    missingFile: 'Ficheiro em Falta',
    missingFileDesc: 'Por favor carregue os dados de viagem para continuar.'
  },

  // Settings page
  settings: {
    title: 'Definições',

    // Language section
    language: 'Idioma',
    languageLabel: 'Idioma de Exibição',

    // Units & Currency section
    unitsAndCurrency: 'Unidades e Moeda',
    unitSystem: 'Sistema de Unidades',
    currency: 'Moeda',
    fuelConsumption: 'Consumo de Combustível',
    electricConsumption: 'Consumo Elétrico',
    distanceUnit: 'Distância',
    speedUnit: 'Velocidade',

    // Cost settings section
    costSettings: 'Definições de Custo',
    electricityPrice: 'Eletricidade',
    petrolPrice: 'Gasolina',
    petrolConsumption: 'Consumo de Gasolina',
    perKwh: '/kWh',
    perLiter: '/L',
    perGallon: '/gal',

    // Vehicle settings section
    vehicleSettings: 'Definições do Veículo',
    vehicleModel: 'Modelo Porsche EV',
    selectVehicle: 'Selecione o seu veículo...',
    grossBattery: 'Bateria Bruta',
    usableBatterySpec: 'Bateria Útil',
    wltpRange: 'Autonomia WLTP',
    wltpConsumption: 'Consumo WLTP',
    batteryCapacity: 'Capacidade Útil da Bateria (kWh)',
    batteryCapacityHelp: 'Preenchido automaticamente ao selecionar um veículo. Pode alterar manualmente se necessário.',

    // Vehicle notes
    vehicleNotesTitle: 'Notas sobre Especificações',
    noteWltp: 'Valores de autonomia baseados em dados oficiais do ciclo combinado WLTP',
    notePb: 'PB = Performance Battery (menor)',
    notePbPlus: 'PB+ = Performance Battery Plus (maior)',
    noteJ11: 'Modelos 2020-2024 (primeira geração)',
    noteJ12: 'Modelos 2025+ (atualização com ~35% mais autonomia)',
    noteSportTurismo: 'Sport Turismo foi introduzido em 2022',
    noteCrossTurismo: 'Cross Turismo foi introduzido em 2021',
    noteTurboGt: 'Turbo GT só está disponível como sedan',
    noteSportTurismoRwd: 'Sport Turismo tem versão Base RWD; Cross Turismo não (todos são AWD)',
    noteMacanGts: 'Macan Electric GTS anunciado em outubro de 2025',

    // Data management section
    dataManagement: 'Gestão de Dados',
    uploadCsvFiles: 'Carregar Ficheiros CSV',
    clearAllData: 'Limpar Todos os Dados',

    // Backup & restore section
    backupRestore: 'Backup e Restauro',
    downloadBackup: 'Descarregar Backup',
    restoreBackup: 'Restaurar Backup',

    // Privacy notice
    privacyNoticeTitle: 'Dados Armazenados Localmente',
    privacyNoticeText: 'Os seus dados de viagem nunca saem do seu dispositivo. Sem servidores, sem rastreamento, sem recolha de dados. Tudo é processado e armazenado localmente no seu navegador.'
  },

  // Confirm modal
  confirm: {
    clearDataTitle: 'Limpar Todos os Dados?',
    clearDataMessage: 'Esta ação não pode ser desfeita. Todos os seus dados de viagem e definições serão permanentemente removidos deste dispositivo.',
    clearDataConfirm: 'Sim, Limpar Dados',
    backupRestored: 'Backup restaurado com sucesso!',
    exportError: 'Erro de Exportação',
    restoreError: 'Erro de Restauro',
    parseError: 'Erro ao analisar ficheiro',
    missingFile: 'Ficheiro em Falta',
    missingFileMessage: 'Por favor carregue o ficheiro "Desde o Início" para continuar.'
  },

  // Sample data banner
  sampleData: {
    viewing: 'A ver dados de exemplo',
    hide: 'Ocultar'
  },

  // Overview tab
  overview: {
    title: 'Visão Geral',
    totalTrips: 'Total de Viagens',
    totalDistance: 'Distância Total',
    totalEnergy: 'Energia Total',
    avgConsumption: 'Consumo Médio',
    avgTripDistance: 'Distância Média',
    avgTripDuration: 'Duração Média',
    avgSpeed: 'Velocidade Média',
    totalChargeCycles: 'Ciclos de Carga',
    distanceOverTime: 'Distância ao Longo do Tempo',
    tripsByType: 'Viagens por Tipo',
    energyOverTime: 'Energia ao Longo do Tempo',
    tripsOverTime: 'Viagens ao Longo do Tempo',
    tripsPerCharge: 'Viagens/Carga',
    shortTrips: 'Viagens Curtas',
    avgPerMonth: 'Média/Mês',
    distanceAndTrips: 'Distância e Viagens',
    tripTypeDistribution: 'Distribuição por Tipo de Viagem'
  },

  // Patterns tab
  patterns: {
    title: 'Padrões de Condução',
    hourlyDistribution: 'Distribuição Horária de Viagens',
    dailyPatterns: 'Padrões Diários',
    monthlyTrends: 'Tendências Mensais',
    weekdayVsWeekend: 'Dia de Semana vs Fim de Semana',
    peakHours: 'Horas de Pico',
    avgTripsPerDay: 'Média de Viagens por Dia',
    avgDistancePerDay: 'Distância Média por Dia',
    mostActiveDay: 'Dia Mais Ativo',
    leastActiveDay: 'Dia Menos Ativo',
    distanceOverTime: 'Distância ao Longo do Tempo',
    tripsPerHour: 'Viagens por Hora',
    tripsAndDistance: 'Viagens e Distância por Dia',
    avgDistance: 'Distância Média'
  },

  // Efficiency tab
  efficiency: {
    title: 'Análise de Eficiência',
    consumptionOverTime: 'Consumo ao Longo do Tempo',
    tripTypeEfficiency: 'Eficiência por Tipo de Viagem',
    speedEfficiency: 'Velocidade vs Eficiência',
    bestEfficiency: 'Melhor Eficiência',
    worstEfficiency: 'Pior Eficiência',
    avgEfficiency: 'Eficiência Média',
    efficiencyTrend: 'Tendência de Eficiência',
    optimalSpeed: 'Velocidade Ótima',
    consumptionBySpeed: 'Consumo por Velocidade',
    consumptionByTripType: 'Consumo por Tipo de Viagem',
    consumptionTrend: 'Tendência de Consumo'
  },

  // Costs tab
  costs: {
    title: 'Análise de Custos',
    electricCost: 'Custo Elétrico',
    petrolCost: 'Equivalente Gasolina',
    savings: 'Poupança Total',
    savingsRate: 'Taxa de Poupança',
    costPerDistance: 'Custo por {unit}',
    annualProjection: 'Projeção Anual',
    fiveYearSavings: 'Poupança em 5 Anos',
    comparedTo: 'comparado com carro a gasolina de {consumption}',
    monthlyCost: 'Custo Mensal',
    yearlyProjection: 'Projeção Anual',
    costComparison: 'Comparação de Custos',
    electricVsPetrol: 'Elétrico vs Gasolina',
    savingsOverTime: 'Poupança ao Longo do Tempo',
    costPerTrip: 'Custo por Viagem',
    costPerKm: 'Custo por km',
    costPerMile: 'Custo por milha',
    projectedAnnual: 'Projeção Anual',
    projectedSavings: 'Poupança Projetada',
    electricityCost: 'Custo de Eletricidade',
    petrolEquivalent: 'Equivalente Gasolina'
  },

  // Environmental tab
  environmental: {
    title: 'Impacto Ambiental',
    co2Electric: 'CO₂ Elétrico',
    co2Petrol: 'CO₂ Gasolina',
    co2Saved: 'CO₂ Poupado',
    co2SavedLabel: 'CO₂ Poupado',
    treesEquivalent: 'Equivalente em Árvores',
    reductionPercentage: 'Redução',
    litersAvoided: 'Gasolina Evitada',
    emissionsComparison: 'Comparação de Emissões Mensais',
    carbonFootprint: 'Pegada de Carbono',
    annualImpact: 'Impacto Anual',
    equivalentTrees: 'Árvores Equivalentes',
    kgCo2: 'kg CO₂',
    tonsCo2: 'ton CO₂',
    vsElectric: 'vs gasolina',
    youProduced: 'Suas Emissões',
    petrolWouldProduce: 'Gasolina Emitiria',
    treesPerYear: 'árvores/ano',
    gridEmissions: 'Emissões da rede',
    petrolBaseline: 'Referência gasolina',
    electricGrid: 'rede elétrica',
    ifPetrol: 'se gasolina'
  },

  // Battery tab
  battery: {
    title: 'Bateria e Autonomia',
    realWorldRange: 'Autonomia Real',
    officialRange: 'Autonomia Oficial',
    rangeEfficiency: 'Eficiência de Autonomia',
    energyPerTrip: 'Energia por Viagem',
    tripsPerCharge: 'Viagens/Bateria Cheia',
    distancePerCharge: 'Distância por Carga',
    batteryPerTrip: 'Bateria por Viagem',
    consumptionVsOfficial: 'vs Oficial',
    seasonalVariation: 'Variação Sazonal',
    chargesPerWeek: 'Cargas por Semana',
    chargingLosses: 'Perdas de Carregamento',
    offPeakSavings: 'Poupança Fora de Pico',
    fullCycles: 'Ciclos Completos',
    batteryHealth: 'Saúde da Bateria',
    chargingPattern: 'Padrão de Carregamento',
    rangeAnalysis: 'Análise de Autonomia',
    winterRange: 'Autonomia no Inverno',
    summerRange: 'Autonomia no Verão',
    socUsedPerCycle: 'SOC Usado/Ciclo',
    potentialSavings: 'Poupança Potencial',
    vsOfficialRange: 'vs Oficial',
    rangeComparison: 'Comparação de Autonomia',
    yourRange: 'Sua Autonomia',
    officialRangeLabel: 'Oficial',
    chargingOptimization: 'Otimização de Carregamento'
  },

  // Insights tab
  insights: {
    title: 'Análises de Condução',
    commuter: 'Pendular Diário',
    commuterDesc: '{pct}% das suas viagens são durante horários típicos de trabalho (7-8h, 17-19h). Considere pré-aquecer enquanto ligado para poupar energia.',
    shortTrips: 'Combinar viagens curtas',
    shortTripsDesc: '{pct}% das viagens são inferiores a {dist}. Viagens curtas usam {diff}% mais energia por {unit}. Considere combinar tarefas.',
    weekendTripper: 'Viajante de Fim de Semana',
    weekendTripperDesc: 'Viagens de sábado têm em média {satDist} vs {weekdayDist} em dias de semana. Viagens mais longas são mais eficientes!',
    winterDrop: 'Dicas de Inverno',
    winterDropDesc: 'O consumo de inverno é {pct}% superior ao verão ({winter} vs {summer}). Use aquecimento de bancos em vez de climatização.',
    sweetSpot: 'O Seu Ponto Ideal de Eficiência',
    sweetSpotDesc: 'Melhor eficiência a {speed} ({cons}). Isto é {pct}% melhor que a sua média.',
    optimalCharging: 'Frequência de Carregamento Ótima',
    optimalChargingDesc: 'Média de {trips} viagens por carga é saudável para longevidade da bateria. Continue assim!',
    frequentCharging: 'Carregamento Frequente',
    frequentChargingDesc: 'Carrega após {trips} viagens em média. Considere carregar menos frequentemente para saúde da bateria.',
    drivingProfile: 'Perfil de Condução',
    urbanCommuter: 'Urbano',
    mixedUse: 'Utilização Mista',
    highwayCruiser: 'Autoestrada',
    efficiencyRating: 'Classificação de Eficiência',
    vsAvgTaycan: 'vs Taycan Méd',
    shortTripPenalty: 'Penalização de Viagem Curta',
    drivingScore: 'Pontuação de Condução',
    recommendations: 'Recomendações Personalizadas',
    strengths: 'Pontos Fortes',
    areasToImprove: 'Áreas a Melhorar',
    yourInsights: 'As Suas Análises',
    predictions: 'Projeções e Previsões',
    projectedAnnualDistance: 'Distância Anual',
    projectedAnnualTrips: 'Viagens Anuais',
    projectedAnnualEnergy: 'Energia Anual',
    projectedAnnualCost: 'Poupança Anual',
    competitorComparison: 'Comparação EV',
    dailyCommuter: 'Viajante Habitual',
    dailyCommuterDesc: '{pct}% das suas viagens são durante horários típicos de trabalho (7-8h, 17-19h). Considere pré-aquecer enquanto ligado para poupar energia.',
    shortTripsHighUsage: 'Uso Elevado de Viagens Curtas',
    weekendTripperTitle: 'Viajante de Fim de Semana',
    projected: 'projetado',
    nextMonthForecast: 'Previsão Próximo Mês',
    tripsExpected: 'viagens esperadas',
    seasonalPrediction: 'Previsão Sazonal',
    summer: 'Verão',
    winter: 'Inverno',
    // Recommendation strings
    vsPetrol: 'vs gasolina',
    chargingRecDaily: '80% diário, 100% para viagens longas',
    chargingRecPrecondition: 'Pré-aquecer enquanto ligado',
    efficiencyRecCombine: 'Combinar viagens curtas',
    efficiencyRecEcoMode: 'Eco na cidade, normal na autoestrada',
    winterRecSeats: 'Usar aquecimento dos bancos/volante',
    winterRecGarage: 'Estacionar na garagem se possível',
    winterRecPreheat: 'Pré-aquecer enquanto carrega',
    efficiencyTarget: 'Objetivo: {target} (-5%)'
  },

  // Time view selector
  timeView: {
    day: 'Dia',
    week: 'Semana',
    month: 'Mês'
  },

  // Days of week
  days: {
    mon: 'Seg',
    tue: 'Ter',
    wed: 'Qua',
    thu: 'Qui',
    fri: 'Sex',
    sat: 'Sáb',
    sun: 'Dom',
    monday: 'Segunda',
    tuesday: 'Terça',
    wednesday: 'Quarta',
    thursday: 'Quinta',
    friday: 'Sexta',
    saturday: 'Sábado',
    sunday: 'Domingo'
  },

  // Months
  months: {
    jan: 'Jan',
    feb: 'Fev',
    mar: 'Mar',
    apr: 'Abr',
    may: 'Mai',
    jun: 'Jun',
    jul: 'Jul',
    aug: 'Ago',
    sep: 'Set',
    oct: 'Out',
    nov: 'Nov',
    dec: 'Dez'
  },

  // Seasons
  seasons: {
    spring: 'Primavera',
    summer: 'Verão',
    autumn: 'Outono',
    winter: 'Inverno'
  },

  // Footer
  footer: {
    tagline: 'Porsche EV Trips Insights • Local-first • Privacy-first • Os dados nunca saem do seu dispositivo',
    developedBy: 'Desenvolvido por'
  },

  // Unit systems
  unitSystems: {
    metric: 'Métrico (km, L)',
    imperial_uk: 'Imperial UK (mi, mpg)',
    imperial_us: 'Imperial US (mi, mpg)'
  },

  // Chart labels
  charts: {
    distance: 'Distância',
    trips: 'Viagens',
    consumption: 'Consumo',
    energy: 'Energia',
    cost: 'Custo',
    savings: 'Poupança',
    efficiency: 'Eficiência',
    speed: 'Velocidade',
    time: 'Tempo',
    hour: 'Hora',
    day: 'Dia',
    week: 'Semana',
    month: 'Mês',
    year: 'Ano',
    average: 'Média',
    total: 'Total',
    best: 'Melhor',
    worst: 'Pior',
    range: 'Autonomia'
  },

  // Trip types
  tripTypes: {
    micro: 'Micro',
    short: 'Curta',
    medium: 'Média',
    long: 'Longa',
    veryLong: 'Muito Longa'
  },

  // Benchmark / Comparison
  benchmark: {
    yourVehicle: 'O Seu Veículo',
    yourTaycan: 'O Seu Taycan',
    yourTaycanCT: 'O Seu Taycan Cross Turismo',
    yourTaycanST: 'O Seu Taycan Sport Turismo',
    yourMacan: 'O Seu Macan Electric',
    yourCayenne: 'O Seu Cayenne Electric',
    yourEtronGT: 'O Seu e-tron GT',
    yourPorsche: 'O Seu Porsche',
    average: 'Média',
    avg: 'Méd',
    comparison: 'Comparação',
    betterThan: 'melhor que',
    worseThan: 'pior que',
    similar: 'Semelhante a',
    avgTaycan: 'Taycan Méd',
    avgPorsche: 'Porsche Méd',
    avgWltp: 'WLTP méd'
  },

  // Driving profiles
  drivingProfiles: {
    urbanCommuter: 'Pendular Urbano',
    mixedUse: 'Utilização Mista',
    highwayCruiser: 'Viajante de Autoestrada',
    weekendDriver: 'Condutor de Fim de Semana',
    efficientDriver: 'Condutor Eficiente'
  }
};
