// Polish translations
export const pl = {
  // Language metadata
  _meta: {
    name: 'Polish',
    nativeName: 'Polski',
    code: 'pl'
  },

  // Common
  common: {
    settings: 'Ustawienia',
    upload: 'Prześlij',
    cancel: 'Anuluj',
    confirm: 'Potwierdź',
    save: 'Zapisz',
    close: 'Zamknij',
    yes: 'Tak',
    no: 'Nie',
    ok: 'OK',
    error: 'Błąd',
    success: 'Sukces',
    warning: 'Ostrzeżenie',
    info: 'Info',
    loading: 'Ładowanie...',
    processing: 'Przetwarzanie...',
    required: 'Wymagane',
    optional: 'Opcjonalne',
    total: 'Łącznie',
    average: 'Średnia',
    trips: 'podróży',
    trip: 'podróż',
    distance: 'Dystans',
    energy: 'Energia',
    consumption: 'Zużycie',
    duration: 'Czas trwania',
    speed: 'Prędkość',
    min: 'min',
    hours: 'godzin',
    minutes: 'minut',
    by: 'przez'
  },

  // Header
  header: {
    title: 'Porsche EV Insights',
    subtitle: 'Analiza podróży EV',
    localFirst: 'LOKALNE',
    privacyFirst: 'PRYWATNOŚĆ',
    help: 'POMOC'
  },

  // Navigation tabs
  tabs: {
    overview: 'Przegląd',
    patterns: 'Wzorce',
    efficiency: 'Wydajność',
    costs: 'Koszty',
    environmental: 'Środowisko',
    battery: 'Bateria',
    insights: 'Analizy',
    myCar: 'Mój Samochód'
  },

  // Sidebar
  sidebar: {
    darkMode: 'Ciemny Motyw',
    lightMode: 'Jasny Motyw'
  },

  // Welcome screen
  welcome: {
    title: 'Witaj w Porsche EV Insights',
    description: 'Prześlij eksporty CSV z Porsche Connect, aby przeanalizować swoje wzorce jazdy.',
    uploadButton: 'Prześlij swoje dane',
    sampleButton: 'Wypróbuj dane przykładowe',
    privacyTitle: 'Prywatność chroniona',
    privacyText: 'Wszystkie dane są przetwarzane lokalnie w przeglądarce.'
  },

  // Upload modal
  upload: {
    title: 'Prześlij dane EV',
    mergeTitle: 'Dodaj więcej danych',
    audiZip: 'Audi e-tron GT ZIP',
    audiZipAlt: '(eksport myAudi)',
    audiZipDesc: 'Prześlij plik ZIP ExportTrips z aplikacji myAudi',
    audiNoDataFile: 'Nie znaleziono danych o podróżach w ZIP. Oczekiwano "Short-term memory.csv" lub "Long-term memory.csv".',
    audiParseError: 'Nie można przetworzyć danych podróży Audi. Sprawdź format pliku.',
    orPorsche: 'lub CSV Porsche',
    sinceStart: 'Od startu',
    sinceStartDesc: 'Pojedyncze podróże',
    sinceCharge: 'Od ładowania',
    sinceChargeDesc: 'Cykle ładowania',
    processButton: 'Przetwarzaj dane',
    mergeButton: 'Połącz dane',
    tripsCount: '{count} podróży',
    cyclesCount: '{count} cykli',
    modeReplace: 'Zastąp',
    modeMerge: 'Połącz',
    replaceDesc: 'Zastąp wszystkie istniejące dane nowymi plikami',
    mergeDesc: 'Dodaj nowe podróże do istniejących danych (duplikaty zostaną pominięte)',
    mergeComplete: 'Dane połączone pomyślnie',
    mergeStats: 'Dodano {new} nowych podróży ({duplicates} duplikatów pominięto). Łącznie: {total} podróży.',
    mergeUnavailable: 'Łączenie niedostępne',
    mergeUnavailableDesc: 'Twoje dane zostały zaimportowane przed dodaniem obsługi łączenia. Użyj tym razem Zastąp. Przyszłe importy będą obsługiwać łączenie.',
    missingFile: 'Brak pliku',
    missingFileDesc: 'Prześlij dane o podróżach aby kontynuować.'
  },

  // Porsche Connect
  porscheConnect: {
    title: 'Porsche Connect',
    subtitle: 'Dane na żywo z Twojego pojazdu',
    checking: 'Sprawdzanie połączenia...',
    loginDescription: 'Zaloguj się za pomocą Porsche ID, aby synchronizować dane o podróżach bezpośrednio z pojazdu.',
    email: 'Porsche ID (Email)',
    password: 'Hasło',
    login: 'Zaloguj się',
    loggingIn: 'Logowanie...',
    logout: 'Wyloguj się',
    privacyNote: 'Twoje dane logowania są bezpiecznie wysyłane do Porsche i nigdy nie są przechowywane.',
    selectVehicle: 'Wybierz pojazd do synchronizacji:',
    fetchData: 'Synchronizuj dane o podróżach',
    loadingVehicles: 'Ładowanie pojazdów...',
    loading: 'Ładowanie...',
    noVehicles: 'Nie znaleziono pojazdów na Twoim koncie Porsche Connect.',
    noTrips: 'Brak danych o podróżach. Upewnij się, że odbywałeś podróże z włączonym Porsche Connect.',
    errorTitle: 'Błąd połączenia',
    serverUnavailable: 'Serwer proxy Porsche Connect nie jest uruchomiony. Uruchom go, aby włączyć synchronizację danych na żywo.',
    serverInstructions: 'Uruchom "cd server && npm install && npm start" w terminalu, a następnie spróbuj ponownie.',
    syncComplete: 'Synchronizacja zakończona',
    syncStats: 'Zsynchronizowano {new} podróży z Twojego {model}.',
    syncMergeStats: 'Dodano {new} nowych podróży ({duplicates} duplikatów pominięto). Łącznie: {total} podróży.',
    sessionExpired: 'Twoja sesja wygasła. Zaloguj się ponownie.',
    connected: 'Połączono',
    lastSync: 'Ostatnia synchronizacja',
    captchaDescription: 'Porsche wymaga weryfikacji. Wprowadź tekst pokazany na obrazku.',
    captchaLabel: 'Kod weryfikacyjny',
    captchaPlaceholder: 'Wprowadź tekst pokazany powyżej',
    verifyCaptcha: 'Zweryfikuj',
    verifying: 'Weryfikowanie...',
    checkingForUpdates: 'Szukanie nowych podróży...',
    syncing: 'Synchronizowanie danych o podróżach...',
    newDataSynced: 'Nowe podróże zsynchronizowane!'
  },

  // Settings page
  settings: {
    title: 'Ustawienia',

    // Language & Units section
    languageAndUnits: 'Język i jednostki',
    languageLabel: 'Język wyświetlania',
    unitSystem: 'System jednostek',
    currency: 'Waluta',
    fuelConsumption: 'Zużycie paliwa',
    electricConsumption: 'Zużycie energii',
    distanceUnit: 'Odległość',
    speedUnit: 'Prędkość',
    pressureUnit: 'Ciśnienie opon',

    // Cost settings section
    costSettings: 'Ustawienia kosztów',
    electricityPrice: 'Energia elektryczna',
    petrolPrice: 'Benzyna',
    petrolConsumption: 'Zużycie benzyny',
    perKwh: '/kWh',
    perLiter: '/L',
    perGallon: '/gal',

    // Vehicle settings section
    vehicleSettings: 'Ustawienia pojazdu',
    vehicleModel: 'Model Porsche EV',
    selectVehicle: 'Wybierz swój pojazd...',
    grossBattery: 'Bateria Brutto',
    usableBatterySpec: 'Bateria Użyteczna',
    wltpRange: 'Zasięg WLTP',
    wltpConsumption: 'Zużycie WLTP',
    epaRange: 'Zasięg EPA',
    epaMpge: 'Efektywność EPA',
    batteryCapacity: 'Użyteczna pojemność baterii (kWh)',
    batteryCapacityHelp: 'Wypełniane automatycznie przy wyborze pojazdu. Możesz zmienić ręcznie.',

    // Vehicle notes
    vehicleNotesTitle: 'Uwagi do specyfikacji',
    noteWltp: 'Wartości zasięgu oparte na oficjalnych danych cyklu kombinowanego WLTP',
    noteEpa: 'Zasięg i wydajność oparte na oficjalnych danych cyklu testowego EPA USA',
    noteMpge: 'Mile na galon ekwiwalent (33,7 kWh = 1 galon benzyny)',
    notePb: 'PB = Performance Battery (mniejsza)',
    notePbPlus: 'PB+ = Performance Battery Plus (większa)',
    noteJ11: 'Modele 2020-2024 (pierwsza generacja)',
    noteJ12: 'Modele 2025+ (odświeżenie z ~35% większym zasięgiem)',
    noteSportTurismo: 'Sport Turismo został wprowadzony w 2022 roku',
    noteCrossTurismo: 'Cross Turismo został wprowadzony w 2021 roku',
    noteTurboGt: 'Turbo GT jest dostępny tylko jako sedan',
    noteSportTurismoRwd: 'Sport Turismo ma wersję Base RWD; Cross Turismo nie (wszystkie są AWD)',
    noteMacanGts: 'Macan Electric GTS ogłoszony w październiku 2025',

    // Data management section
    dataManagement: 'Zarządzanie danymi',
    uploadCsvFiles: 'Prześlij pliki CSV',
    clearAllData: 'Usuń wszystkie dane',

    // Porsche Connect section
    porscheConnect: 'Porsche Connect',
    porscheConnected: 'Połączono z Porsche',
    porscheConnectDesc: 'Połącz się z serwerami Porsche, aby automatycznie synchronizować dane o podróżach.',
    connectToPorsche: 'Połącz z Porsche',
    syncData: 'Synchronizuj dane o podróżach',
    porscheLogout: 'Rozłącz',

    // Backup & restore section
    backupRestore: 'Kopia zapasowa i przywracanie',
    downloadBackup: 'Pobierz kopię zapasową',
    restoreBackup: 'Przywróć kopię zapasową',

    // Theme settings
    theme: 'Motyw',
    themeAuto: 'Auto (System)',
    themeLight: 'Jasny',
    themeDark: 'Ciemny',

    // Privacy notice
    privacyNoticeTitle: 'Dane przechowywane lokalnie',
    privacyNoticeText: 'Twoje dane o podróżach nigdy nie opuszczają urządzenia. Brak serwerów, śledzenia, zbierania danych. Wszystko jest przetwarzane i przechowywane lokalnie w przeglądarce.'
  },

  // Confirm modal
  confirm: {
    clearDataTitle: 'Usunąć wszystkie dane?',
    clearDataMessage: 'Tej akcji nie można cofnąć. Wszystkie dane o podróżach i ustawienia zostaną trwale usunięte z tego urządzenia.',
    clearDataConfirm: 'Tak, usuń dane',
    backupRestored: 'Kopia zapasowa przywrócona pomyślnie!',
    exportError: 'Błąd eksportu',
    restoreError: 'Błąd przywracania',
    parseError: 'Błąd parsowania pliku',
    missingFile: 'Brakujący plik',
    missingFileMessage: 'Prześlij plik "Od startu" aby kontynuować.'
  },

  // Sample data banner
  sampleData: {
    viewing: 'Wyświetlanie danych przykładowych',
    hide: 'Ukryj'
  },

  // Overview tab
  overview: {
    title: 'Przegląd',
    totalTrips: 'Łącznie podróży',
    totalDistance: 'Łączna odległość',
    totalEnergy: 'Łączna energia',
    avgConsumption: 'Średnie zużycie',
    avgTripDistance: 'Średnia odległość podróży',
    avgTripDuration: 'Średni czas podróży',
    avgSpeed: 'Średnia prędkość',
    totalChargeCycles: 'Cykle ładowania',
    distanceOverTime: 'Odległość w czasie',
    tripsByType: 'Podróże wg typu',
    tripsPerCharge: 'Podróże/Ładowanie',
    shortTrips: 'Krótkie Podróże',
    avgPerMonth: 'Śr./Miesiąc',
    distanceAndTrips: 'Odległość i Podróże',
    tripTypeDistribution: 'Rozkład wg Typu Podróży',
    energyOverTime: 'Energia w czasie',
    tripsOverTime: 'Podróże w czasie'
  },

  // Patterns tab
  patterns: {
    title: 'Wzorce jazdy',
    hourlyDistribution: 'Rozkład godzinowy podróży',
    dailyPatterns: 'Wzorce dzienne',
    monthlyTrends: 'Trendy miesięczne',
    weekdayVsWeekend: 'Dni robocze vs Weekend',
    peakHours: 'Godziny szczytu',
    avgTripsPerDay: 'Śr. podróży na dzień',
    avgDistancePerDay: 'Śr. dystans na dzień',
    mostActiveDay: 'Najbardziej aktywny dzień',
    leastActiveDay: 'Najmniej aktywny dzień',
    distanceOverTime: 'Odległość w czasie',
    tripsPerHour: 'Podróże na Godzinę',
    tripsAndDistance: 'Podróże i Dystans na Dzień',
    avgDistance: 'Śr. Dystans'
  },

  // Efficiency tab
  efficiency: {
    title: 'Analiza wydajności',
    consumptionOverTime: 'Zużycie w czasie',
    tripTypeEfficiency: 'Wydajność wg typu podróży',
    speedEfficiency: 'Prędkość vs wydajność',
    bestEfficiency: 'Najlepsza Wydajność',
    worstEfficiency: 'Najgorsza Wydajność',
    avgEfficiency: 'Średnia Wydajność',
    efficiencyTrend: 'Trend Wydajności',
    optimalSpeed: 'Optymalna Prędkość',
    consumptionBySpeed: 'Zużycie wg Prędkości',
    consumptionByTripType: 'Zużycie wg Typu Podróży',
    consumptionTrend: 'Trend Zużycia'
  },

  // Costs tab
  costs: {
    title: 'Analiza kosztów',
    electricCost: 'Koszt energii',
    petrolCost: 'Ekwiwalent benzyny',
    savings: 'Łączne oszczędności',
    savingsRate: 'Wskaźnik oszczędności',
    costPerDistance: 'Koszt na {unit}',
    annualProjection: 'Projekcja roczna',
    fiveYearSavings: 'Oszczędności 5-letnie',
    comparedTo: 'w porównaniu z autem benzynowym {consumption}',
    monthlyCost: 'Koszt Miesięczny',
    yearlyProjection: 'Projekcja Roczna',
    costComparison: 'Porównanie Kosztów',
    electricVsPetrol: 'Elektryczny vs Benzyna',
    savingsOverTime: 'Oszczędności w Czasie',
    costPerTrip: 'Koszt na Podróż',
    costPerKm: 'Koszt na km',
    costPerMile: 'Koszt na milę',
    projectedAnnual: 'Projekcja Roczna',
    projectedSavings: 'Przewidywane Oszczędności',
    electricityCost: 'Koszt Energii',
    petrolEquivalent: 'Ekwiwalent Benzyny'
  },

  // Environmental tab
  environmental: {
    title: 'Wpływ na środowisko',
    co2Electric: 'CO₂ Elektryczny',
    co2Petrol: 'CO₂ Benzyna',
    co2Saved: 'CO₂ zaoszczędzone',
    co2SavedLabel: 'CO₂ Zaoszczędzone',
    treesEquivalent: 'Ekwiwalent drzew',
    reductionPercentage: 'Redukcja',
    litersAvoided: 'Benzyna uniknięta',
    emissionsComparison: 'Porównanie Emisji Miesięcznych',
    carbonFootprint: 'Ślad Węglowy',
    annualImpact: 'Wpływ Roczny',
    equivalentTrees: 'Ekwiwalent Drzew',
    kgCo2: 'kg CO₂',
    tonsCo2: 'ton CO₂',
    vsElectric: 'vs benzyna',
    youProduced: 'Twoje Emisje',
    petrolWouldProduce: 'Benzyna Wyemitowałaby',
    treesPerYear: 'drzew/rok',
    gridEmissions: 'Emisje z sieci',
    petrolBaseline: 'Odniesienie benzyny',
    electricGrid: 'sieć elektryczna',
    ifPetrol: 'jeśli benzyna'
  },

  // Battery tab
  battery: {
    title: 'Bateria i zasięg',
    realWorldRange: 'Rzeczywisty Zasięg',
    officialRange: 'Oficjalny Zasięg',
    rangeEfficiency: 'Wydajność zasięgu',
    energyPerTrip: 'Energia na podróż',
    tripsPerCharge: 'Podróże/Pełna Bateria',
    distancePerCharge: 'Odległość na ładowanie',
    batteryPerTrip: 'Bateria na podróż',
    consumptionVsOfficial: 'vs Oficjalne',
    seasonalVariation: 'Zmienność sezonowa',
    chargesPerWeek: 'Ładowań na tydzień',
    energyPerCharge: 'Energia/Ładowanie',
    chargingLosses: 'Straty ładowania',
    offPeakSavings: 'Oszcz. taryfa nocna',
    fullCycles: 'Pełne cykle',
    batteryHealth: 'Zdrowie Baterii',
    chargingPattern: 'Wzorzec Ładowania',
    rangeAnalysis: 'Analiza Zasięgu',
    winterRange: 'Zasięg Zimowy',
    summerRange: 'Zasięg Letni',
    socUsedPerCycle: 'SOC Użyte/Cykl',
    potentialSavings: 'Potencjalne Oszczędności',
    vsOfficialRange: 'vs Oficjalny',
    rangeComparison: 'Porównanie Zasięgu',
    yourRange: 'Twój Zasięg',
    officialRangeLabel: 'Oficjalny',
    chargingOptimization: 'Optymalizacja Ładowania'
  },

  // Insights tab
  insights: {
    title: 'Analizy jazdy',
    commuter: 'Codzienny dojazdowiec',
    commuterDesc: '{pct}% twoich podróży jest w typowych godzinach dojazdu (7-8, 17-19). Rozważ nagrzewanie kabiny podczas ładowania, aby oszczędzać energię.',
    shortTrips: 'Połącz krótkie trasy',
    shortTripsDesc: '{pct}% podróży jest krótszych niż {dist}. Krótkie trasy zużywają {diff}% więcej energii na {unit}. Rozważ łączenie sprawunków.',
    weekendTripper: 'Weekendowy podróżnik',
    weekendTripperDesc: 'Sobotnie podróże średnio {satDist} vs {weekdayDist} w dni robocze. Dłuższe podróże są bardziej wydajne!',
    winterDrop: 'Wskazówki Zimowe',
    winterDropDesc: 'Zimowe zużycie jest {pct}% wyższe niż letnie ({winter} vs {summer}). Używaj ogrzewania foteli zamiast klimatyzacji.',
    sweetSpot: 'Twój optymalny punkt wydajności',
    sweetSpotDesc: 'Najlepsza wydajność przy {speed} ({cons}). To {pct}% lepiej niż twoja średnia.',
    optimalCharging: 'Optymalna częstotliwość ładowania',
    optimalChargingDesc: 'Średnio {trips} podróży na ładowanie jest zdrowe dla długowieczności baterii. Tak trzymaj!',
    frequentCharging: 'Częste ładowanie',
    frequentChargingDesc: 'Ładujesz po średnio {trips} podróżach. Rozważ rzadsze ładowanie dla zdrowia baterii.',
    drivingProfile: 'Profil jazdy',
    urbanCommuter: 'Miejski',
    mixedUse: 'Użycie Mieszane',
    highwayCruiser: 'Autostradowy',
    efficiencyRating: 'Ocena wydajności',
    vsAvgTaycan: 'vs Średni Taycan',
    shortTripPenalty: 'Kara za krótkie trasy',
    drivingScore: 'Wynik Jazdy',
    recommendations: 'Spersonalizowane Zalecenia',
    strengths: 'Mocne Strony',
    areasToImprove: 'Obszary do Poprawy',
    yourInsights: 'Twoje Analizy',
    predictions: 'Prognozy i Przewidywania',
    projectedAnnualDistance: 'Dystans Roczny',
    projectedAnnualTrips: 'Podróże Roczne',
    projectedAnnualEnergy: 'Energia Roczna',
    projectedAnnualCost: 'Oszczędności Roczne',
    competitorComparison: 'Porównanie EV',
    dailyCommuter: 'Codzienny Dojazdowiec',
    dailyCommuterDesc: '{pct}% twoich podróży jest w typowych godzinach dojazdu (7-8, 17-19). Rozważ nagrzewanie kabiny podczas ładowania, aby oszczędzać energię.',
    shortTripsHighUsage: 'Duże użycie krótkich tras',
    weekendTripperTitle: 'Weekendowy Podróżnik',
    projected: 'przewidywane',
    nextMonthForecast: 'Prognoza Następny Miesiąc',
    tripsExpected: 'oczekiwane podróże',
    seasonalPrediction: 'Przewidywanie Sezonowe',
    summer: 'Lato',
    winter: 'Zima',
    // Recommendation strings
    vsPetrol: 'vs benzyna',
    chargingRecDaily: '80% codziennie, 100% na długie trasy',
    chargingRecPrecondition: 'Nagrzewać podczas ładowania',
    efficiencyRecCombine: 'Łączyć krótkie trasy',
    efficiencyRecEcoMode: 'Eco w mieście, normalny na autostradzie',
    winterRecSeats: 'Używać ogrzewania foteli/kierownicy',
    winterRecGarage: 'Parkować w garażu jeśli możliwe',
    winterRecPreheat: 'Nagrzewać podczas ładowania',
    efficiencyTarget: 'Cel: {target} (-5%)'
  },

  // Time view selector
  timeView: {
    day: 'Dzień',
    week: 'Tydzień',
    month: 'Miesiąc'
  },

  // Days of week
  days: {
    mon: 'Pon',
    tue: 'Wt',
    wed: 'Śr',
    thu: 'Czw',
    fri: 'Pt',
    sat: 'Sob',
    sun: 'Nie',
    monday: 'Poniedziałek',
    tuesday: 'Wtorek',
    wednesday: 'Środa',
    thursday: 'Czwartek',
    friday: 'Piątek',
    saturday: 'Sobota',
    sunday: 'Niedziela'
  },

  // Months
  months: {
    jan: 'Sty',
    feb: 'Lut',
    mar: 'Mar',
    apr: 'Kwi',
    may: 'Maj',
    jun: 'Cze',
    jul: 'Lip',
    aug: 'Sie',
    sep: 'Wrz',
    oct: 'Paź',
    nov: 'Lis',
    dec: 'Gru'
  },

  // Seasons
  seasons: {
    spring: 'Wiosna',
    summer: 'Lato',
    autumn: 'Jesień',
    winter: 'Zima'
  },

  // Footer
  footer: {
    tagline: 'Porsche EV Trips Insights • Lokalne • Prywatność • Żadne dane nie opuszczają urządzenia',
    developedBy: 'Stworzony przez'
  },

  // Unit systems
  unitSystems: {
    metric: 'Metryczny (km, L)',
    imperial_uk: 'Imperial UK (mi, mpg)',
    imperial_us: 'Imperial US (mi, mpg)'
  },

  // Chart labels
  charts: {
    distance: 'Dystans',
    trips: 'Podróże',
    consumption: 'Zużycie',
    energy: 'Energia',
    cost: 'Koszt',
    savings: 'Oszczędności',
    efficiency: 'Wydajność',
    speed: 'Prędkość',
    time: 'Czas',
    hour: 'Godzina',
    day: 'Dzień',
    week: 'Tydzień',
    month: 'Miesiąc',
    year: 'Rok',
    average: 'Średnia',
    total: 'Łącznie',
    best: 'Najlepsza',
    worst: 'Najgorsza',
    range: 'Zasięg'
  },

  // Trip types
  tripTypes: {
    micro: 'Mikro',
    short: 'Krótka',
    medium: 'Średnia',
    long: 'Długa',
    veryLong: 'Bardzo Długa'
  },

  // Benchmark / Comparison
  benchmark: {
    yourVehicle: 'Twój Pojazd',
    yourTaycan: 'Twój Taycan',
    yourTaycanCT: 'Twój Taycan Cross Turismo',
    yourTaycanST: 'Twój Taycan Sport Turismo',
    yourMacan: 'Twój Macan Electric',
    yourCayenne: 'Twój Cayenne Electric',
    yourEtronGT: 'Twój e-tron GT',
    yourPorsche: 'Twój Porsche',
    average: 'Średnia',
    avg: 'Śr',
    comparison: 'Porównanie',
    betterThan: 'lepiej niż',
    worseThan: 'gorzej niż',
    similar: 'Podobny do',
    avgTaycan: 'Śr. Taycan',
    avgPorsche: 'Śr. Porsche',
    avgWltp: 'Śr. WLTP'
  },

  // Driving profiles
  drivingProfiles: {
    urbanCommuter: 'Miejski Dojazdowiec',
    mixedUse: 'Użycie Mieszane',
    highwayCruiser: 'Autostradowiec',
    weekendDriver: 'Kierowca Weekendowy',
    efficientDriver: 'Wydajny Kierowca'
  },

  // My Car tab
  myCar: {
    noDataTitle: 'Brak połączonego pojazdu',
    noDataDesc: 'Połącz się z Porsche Connect, aby wyświetlić informacje o pojeździe.',
    connectButton: 'Połącz z Porsche',
    selectVehicle: 'Wybierz pojazd',
    vehiclePhotos: 'Zdjęcia pojazdu',
    lastKnownLocation: 'Ostatnia znana lokalizacja',
    locationUnavailable: 'Dane lokalizacji niedostępne',
    openInMaps: 'Otwórz w Mapach',
    heading: 'Kierunek',
    batteryLevel: 'Poziom baterii',
    estimatedRange: 'Szacowany zasięg',
    totalMileage: 'Całkowity przebieg',
    electricRange: 'Zasięg elektryczny',
    vehicleDetails: 'Szczegóły pojazdu',
    model: 'Model',
    year: 'Rok',
    generation: 'Generacja',
    steering: 'Kierownica',
    leftHandDrive: 'Kierownica po lewej',
    rightHandDrive: 'Kierownica po prawej',
    locked: 'Zablokowany',
    unlocked: 'Odblokowany',
    lastUpdated: 'Ostatnia aktualizacja',
    frontView: 'Widok z przodu',
    sideView: 'Widok z boku',
    rearView: 'Widok z tyłu',
    topView: 'Widok z góry',
    tirePressure: 'Ciśnienie w Oponach',
    tireFL: 'PL',
    tireFR: 'PP',
    tireRL: 'TL',
    tireRR: 'TP',
    charging: 'Ładowanie',
    chargingStatus: 'Ładowanie',
    notCharging: 'Nie ładuje',
    chargeTo: 'Do',
    doneAt: 'Zakończenie o {time}'
  }
};
