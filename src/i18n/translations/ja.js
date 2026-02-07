// Japanese translations
export const ja = {
  // Language metadata
  _meta: {
    name: 'Japanese',
    nativeName: '日本語',
    code: 'ja'
  },

  // Common
  common: {
    settings: '設定',
    upload: 'アップロード',
    cancel: 'キャンセル',
    confirm: '確認',
    save: '保存',
    close: '閉じる',
    yes: 'はい',
    no: 'いいえ',
    ok: 'OK',
    error: 'エラー',
    success: '成功',
    warning: '警告',
    info: '情報',
    loading: '読み込み中...',
    processing: '処理中...',
    required: '必須',
    optional: 'オプション',
    total: '合計',
    average: '平均',
    trips: 'トリップ',
    trip: 'トリップ',
    distance: '距離',
    energy: 'エネルギー',
    consumption: '消費',
    duration: '時間',
    speed: '速度',
    min: '分',
    hours: '時間',
    minutes: '分',
    by: 'by'
  },

  // Header
  header: {
    title: 'ポルシェEVインサイト',
    subtitle: 'EVトリップ分析',
    localFirst: 'ローカル優先',
    privacyFirst: 'プライバシー優先',
    help: 'ヘルプ'
  },

  // Navigation tabs
  tabs: {
    overview: '概要',
    patterns: 'パターン',
    efficiency: '効率',
    costs: 'コスト',
    environmental: '環境',
    battery: 'バッテリー',
    insights: 'インサイト',
    myCar: 'マイカー'
  },

  // Sidebar
  sidebar: {
    darkMode: 'ダークモード',
    lightMode: 'ライトモード'
  },

  // Welcome screen
  welcome: {
    title: 'ポルシェEVインサイトへようこそ',
    description: 'ポルシェコネクトのCSVエクスポートをアップロードして、運転パターンを分析します。',
    uploadButton: 'データをアップロード',
    sampleButton: 'サンプルデータを試す',
    privacyTitle: 'プライバシー保護',
    privacyText: 'すべてのデータはブラウザ内でローカル処理されます。'
  },

  // Upload modal
  upload: {
    title: 'EVデータをアップロード',
    mergeTitle: 'データを追加',
    audiZip: 'アウディe-tron GT ZIP',
    audiZipAlt: '(myAudiエクスポート)',
    audiZipDesc: 'myAudiアプリからExportTrips ZIPファイルをアップロード',
    audiNoDataFile: 'ZIPにトリップデータが見つかりません。"Short-term memory.csv"または"Long-term memory.csv"が必要です。',
    audiParseError: 'アウディのトリップデータを処理できません。ファイル形式を確認してください。',
    orPorsche: 'またはポルシェCSV',
    sinceStart: '開始から',
    sinceStartDesc: '個別トリップ',
    sinceCharge: '充電から',
    sinceChargeDesc: '充電サイクル',
    processButton: 'データを処理',
    mergeButton: 'データを統合',
    tripsCount: '{count}トリップ',
    cyclesCount: '{count}サイクル',
    modeReplace: '置換',
    modeMerge: '統合',
    replaceDesc: '既存のデータをすべて新しいファイルで置き換える',
    mergeDesc: '既存のデータに新しいトリップを追加（重複はスキップ）',
    mergeComplete: 'データの統合が完了しました',
    mergeStats: '{new}件の新しいトリップを追加（{duplicates}件の重複をスキップ）。合計：{total}トリップ。',
    mergeUnavailable: '統合は利用できません',
    mergeUnavailableDesc: 'データは統合サポートが追加される前にインポートされました。今回は置換を使用してください。今後のインポートは統合をサポートします。',
    missingFile: 'ファイルがありません',
    missingFileDesc: '続行するにはトリップデータをアップロードしてください。'
  },

  // Porsche Connect
  porscheConnect: {
    title: 'Porsche Connect',
    subtitle: '車両からのライブデータ',
    checking: '接続を確認中...',
    loginDescription: 'Porsche IDでサインインして、車両から直接トリップデータを同期します。',
    email: 'Porsche ID（メール）',
    password: 'パスワード',
    login: 'サインイン',
    loggingIn: 'サインイン中...',
    logout: 'サインアウト',
    privacyNote: '認証情報はPorscheに安全に送信され、保存されることはありません。',
    selectVehicle: '同期する車両を選択:',
    fetchData: 'トリップデータを同期',
    loadingVehicles: '車両を読み込み中...',
    loading: '読み込み中...',
    noVehicles: 'Porsche Connectアカウントに車両が見つかりません。',
    noTrips: 'トリップデータがありません。Porsche Connectを有効にして走行したことを確認してください。',
    errorTitle: '接続エラー',
    serverUnavailable: 'Porsche Connectプロキシサーバーが実行されていません。ライブデータ同期を有効にするには起動してください。',
    serverInstructions: 'ターミナルで "cd server && npm install && npm start" を実行してから、再試行してください。',
    syncComplete: '同期完了',
    syncStats: '{model}から{new}件のトリップを同期しました。',
    syncMergeStats: '{new}件の新しいトリップを追加（{duplicates}件の重複をスキップ）。合計: {total}件。',
    sessionExpired: 'セッションの有効期限が切れました。再度サインインしてください。',
    connected: '接続済み',
    lastSync: '最終同期',
    captchaDescription: 'Porscheは認証を必要としています。画像に表示されているテキストを入力してください。',
    captchaLabel: '認証コード',
    captchaPlaceholder: '上に表示されているテキストを入力',
    verifyCaptcha: '認証',
    verifying: '認証中...',
    checkingForUpdates: '新しいトリップを確認中...',
    syncing: 'トリップデータを同期中...',
    newDataSynced: '新しいトリップを同期しました！'
  },

  // Settings page
  settings: {
    title: '設定',

    // Language & Units section
    languageAndUnits: '言語と単位',
    languageLabel: '表示言語',
    unitSystem: '単位系',
    currency: '通貨',
    fuelConsumption: '燃費',
    electricConsumption: '電費',
    distanceUnit: '距離',
    speedUnit: '速度',
    pressureUnit: 'タイヤ空気圧',

    // Cost settings section
    costSettings: 'コスト設定',
    electricityPrice: '電気',
    petrolPrice: 'ガソリン',
    petrolConsumption: 'ガソリン消費',
    perKwh: '/kWh',
    perLiter: '/L',
    perGallon: '/gal',

    // Vehicle settings section
    vehicleSettings: '車両設定',
    vehicleModel: 'ポルシェEVモデル',
    selectVehicle: '車両を選択...',
    grossBattery: '総バッテリー容量',
    usableBatterySpec: '使用可能容量',
    wltpRange: 'WLTP航続距離',
    wltpConsumption: 'WLTP消費',
    epaRange: 'EPA航続距離',
    epaMpge: 'EPA効率',
    batteryCapacity: '使用可能バッテリー容量 (kWh)',
    batteryCapacityHelp: '車両選択時に自動入力。手動で変更可能。',

    // Vehicle notes
    vehicleNotesTitle: '車両仕様に関する注記',
    noteWltp: '航続距離は公式WLTPコンバインドサイクルデータに基づく',
    noteEpa: '航続距離と効率は米国EPA公式テストサイクルデータに基づく',
    noteMpge: 'マイル/ガロン相当（33.7 kWh = ガソリン1ガロン）',
    notePb: 'PB = Performance Battery（小型）',
    notePbPlus: 'PB+ = Performance Battery Plus（大型）',
    noteJ11: '2020-2024年モデル（第1世代）',
    noteJ12: '2025年以降モデル（マイナーチェンジで約35%航続距離向上）',
    noteSportTurismo: 'Sport Turismoは2022年に導入',
    noteCrossTurismo: 'Cross Turismoは2021年に導入',
    noteTurboGt: 'Turbo GTはセダンのみで利用可能',
    noteSportTurismoRwd: 'Sport TurismoにはBase RWD版あり、Cross Turismoにはなし（全車AWD）',
    noteMacanGts: 'Macan Electric GTSは2025年10月発表',

    // Data management section
    dataManagement: 'データ管理',
    uploadCsvFiles: 'CSVファイルをアップロード',
    clearAllData: 'すべてのデータを消去',

    // Porsche Connect section
    porscheConnect: 'Porsche Connect',
    porscheConnected: 'Porscheに接続済み',
    porscheConnectDesc: 'Porscheサーバーに接続して、トリップデータを自動的に同期します。',
    connectToPorsche: 'Porscheに接続',
    syncData: 'トリップデータを同期',
    porscheLogout: '切断',

    // Backup & restore section
    backupRestore: 'バックアップと復元',
    downloadBackup: 'バックアップをダウンロード',
    restoreBackup: 'バックアップを復元',

    // Theme settings
    theme: 'テーマ',
    themeAuto: '自動（システム）',
    themeLight: 'ライト',
    themeDark: 'ダーク',

    // Privacy notice
    privacyNoticeTitle: 'データはローカル保存',
    privacyNoticeText: 'トリップデータはデバイスから離れません。サーバーなし、追跡なし、データ収集なし。すべてブラウザ内でローカル処理・保存されます。'
  },

  // Confirm modal
  confirm: {
    clearDataTitle: 'すべてのデータを消去しますか？',
    clearDataMessage: 'この操作は取り消せません。すべてのトリップデータと設定がこのデバイスから永久に削除されます。',
    clearDataConfirm: 'はい、データを消去',
    backupRestored: 'バックアップが正常に復元されました！',
    exportError: 'エクスポートエラー',
    restoreError: '復元エラー',
    parseError: 'ファイルの解析エラー',
    missingFile: 'ファイルがありません',
    missingFileMessage: '続行するには「開始から」ファイルをアップロードしてください。'
  },

  // Sample data banner
  sampleData: {
    viewing: 'サンプルデータを表示中',
    hide: '非表示'
  },

  // Overview tab
  overview: {
    title: '概要',
    totalTrips: '総トリップ数',
    totalDistance: '総走行距離',
    totalEnergy: '総エネルギー',
    avgConsumption: '平均消費',
    avgTripDistance: '平均トリップ距離',
    avgTripDuration: '平均トリップ時間',
    avgSpeed: '平均速度',
    totalChargeCycles: '充電サイクル',
    distanceOverTime: '時間経過に伴う距離',
    tripsByType: 'タイプ別トリップ',
    tripsPerCharge: 'トリップ/充電',
    shortTrips: '短距離トリップ',
    avgPerMonth: '月平均',
    distanceAndTrips: '距離とトリップ',
    tripTypeDistribution: 'トリップタイプ分布',
    energyOverTime: '時間経過に伴うエネルギー',
    tripsOverTime: '時間経過に伴うトリップ'
  },

  // Patterns tab
  patterns: {
    title: '運転パターン',
    hourlyDistribution: '時間別トリップ分布',
    dailyPatterns: '日別パターン',
    monthlyTrends: '月別傾向',
    weekdayVsWeekend: '平日 vs 週末',
    peakHours: 'ピーク時間',
    avgTripsPerDay: '1日あたり平均トリップ',
    avgDistancePerDay: '1日あたり平均距離',
    mostActiveDay: '最も活発な日',
    leastActiveDay: '最も静かな日',
    distanceOverTime: '時間経過に伴う距離',
    tripsPerHour: '時間あたりトリップ',
    tripsAndDistance: '日別トリップと距離',
    avgDistance: '平均距離'
  },

  // Efficiency tab
  efficiency: {
    title: '効率分析',
    consumptionOverTime: '時間経過に伴う消費',
    tripTypeEfficiency: 'トリップタイプ別効率',
    speedEfficiency: '速度vs効率',
    bestEfficiency: '最高効率',
    worstEfficiency: '最低効率',
    avgEfficiency: '平均効率',
    efficiencyTrend: '効率トレンド',
    optimalSpeed: '最適速度',
    consumptionBySpeed: '速度別消費',
    consumptionByTripType: 'トリップタイプ別消費',
    consumptionTrend: '消費トレンド'
  },

  // Costs tab
  costs: {
    title: 'コスト分析',
    electricCost: '電気代',
    petrolCost: 'ガソリン相当',
    savings: '総節約額',
    savingsRate: '節約率',
    costPerDistance: '{unit}あたりコスト',
    annualProjection: '年間予測',
    fiveYearSavings: '5年間の節約',
    comparedTo: '{consumption}燃費のガソリン車と比較',
    monthlyCost: '月間コスト',
    yearlyProjection: '年間予測',
    costComparison: 'コスト比較',
    electricVsPetrol: '電気 vs ガソリン',
    savingsOverTime: '時間経過に伴う節約',
    costPerTrip: 'トリップあたりコスト',
    costPerKm: 'kmあたりコスト',
    costPerMile: 'マイルあたりコスト',
    projectedAnnual: '年間予測',
    projectedSavings: '予測節約額',
    electricityCost: '電気代',
    petrolEquivalent: 'ガソリン相当'
  },

  // Environmental tab
  environmental: {
    title: '環境への影響',
    co2Electric: 'CO₂（電気）',
    co2Petrol: 'CO₂（ガソリン）',
    co2Saved: 'CO₂削減量',
    co2SavedLabel: 'CO₂削減',
    treesEquivalent: '樹木換算',
    reductionPercentage: '削減率',
    litersAvoided: '節約ガソリン',
    emissionsComparison: '月間CO₂比較',
    carbonFootprint: 'カーボンフットプリント',
    annualImpact: '年間影響',
    equivalentTrees: '換算樹木',
    kgCo2: 'kg CO₂',
    tonsCo2: 't CO₂',
    vsElectric: 'vs ガソリン',
    youProduced: 'あなたの排出量',
    petrolWouldProduce: 'ガソリン排出量',
    treesPerYear: '本/年',
    gridEmissions: '電力網排出',
    petrolBaseline: 'ガソリン基準',
    electricGrid: '電力網',
    ifPetrol: 'ガソリンの場合'
  },

  // Battery tab
  battery: {
    title: 'バッテリーと航続距離',
    realWorldRange: '実際の航続距離',
    officialRange: '公式航続距離',
    rangeEfficiency: '航続距離効率',
    energyPerTrip: 'トリップあたりエネルギー',
    tripsPerCharge: '満充電時トリップ数',
    distancePerCharge: '充電あたり距離',
    batteryPerTrip: 'トリップあたりバッテリー',
    consumptionVsOfficial: '公式値との比較',
    seasonalVariation: '季節変動',
    chargesPerWeek: '週あたり充電回数',
    energyPerCharge: '充電あたりエネルギー',
    chargingLosses: '充電ロス',
    offPeakSavings: '夜間電力節約',
    fullCycles: 'フルサイクル',
    batteryHealth: 'バッテリーの健康状態',
    chargingPattern: '充電パターン',
    rangeAnalysis: '航続距離分析',
    winterRange: '冬季航続距離',
    summerRange: '夏季航続距離',
    socUsedPerCycle: 'サイクルあたりSOC使用',
    potentialSavings: '潜在的節約',
    vsOfficialRange: 'vs 公式',
    rangeComparison: '航続距離比較',
    yourRange: 'あなたの航続距離',
    officialRangeLabel: '公式',
    chargingOptimization: '充電の最適化'
  },

  // Insights tab
  insights: {
    title: '運転インサイト',
    commuter: '日常通勤者',
    commuterDesc: 'トリップの{pct}%が典型的な通勤時間帯（7-8時、17-19時）です。充電中のプレコンディショニングでエネルギーを節約できます。',
    shortTrips: '短距離トリップが多い',
    shortTripsDesc: 'トリップの{pct}%が{dist}未満です。短距離トリップは{unit}あたり{diff}%多くエネルギーを消費します。用事をまとめることを検討してください。',
    weekendTripper: '週末ドライバー',
    weekendTripperDesc: '土曜日のトリップは平均{satDist}、平日は{weekdayDist}です。長距離トリップの方が効率的です！',
    winterDrop: '冬季のヒント',
    winterDropDesc: '冬の消費は夏より{pct}%高くなります（{winter}対{summer}）。エアコンよりシートヒーターを使いましょう。',
    sweetSpot: '効率のスイートスポット',
    sweetSpotDesc: '{speed}で最高効率（{cons}）。平均より{pct}%良好です。',
    optimalCharging: '最適な充電頻度',
    optimalChargingDesc: '充電あたり平均{trips}トリップはバッテリー寿命に良好です。この調子で！',
    frequentCharging: '頻繁な充電',
    frequentChargingDesc: '平均{trips}トリップ後に充電しています。バッテリーの健康のため、充電頻度を減らすことを検討してください。',
    drivingProfile: '運転プロファイル',
    urbanCommuter: '都市通勤',
    mixedUse: '混合利用',
    highwayCruiser: '高速道路',
    efficiencyRating: '効率評価',
    vsAvgTaycan: 'vs Taycan平均',
    shortTripPenalty: '短距離ペナルティ',
    drivingScore: '運転スコア',
    recommendations: 'パーソナライズされた推奨',
    strengths: '強み',
    areasToImprove: '改善点',
    yourInsights: 'あなたのインサイト',
    predictions: '予測と予想',
    projectedAnnualDistance: '年間距離',
    projectedAnnualTrips: '年間トリップ',
    projectedAnnualEnergy: '年間エネルギー',
    projectedAnnualCost: '年間節約',
    competitorComparison: 'EV比較',
    dailyCommuter: '日常通勤者',
    dailyCommuterDesc: 'トリップの{pct}%が典型的な通勤時間帯（7-8時、17-19時）です。充電中のプレコンディショニングでエネルギーを節約できます。',
    shortTripsHighUsage: '短距離トリップ使用率が高い',
    weekendTripperTitle: '週末ドライバー',
    projected: '予測',
    nextMonthForecast: '来月の予測',
    tripsExpected: '予想トリップ',
    seasonalPrediction: '季節予測',
    summer: '夏',
    winter: '冬',
    // Recommendation strings
    vsPetrol: 'vs ガソリン',
    chargingRecDaily: '日常80%、長距離100%',
    chargingRecPrecondition: '充電中にプレコンディショニング',
    efficiencyRecCombine: '短距離トリップをまとめる',
    efficiencyRecEcoMode: '市街地はEco、高速は通常モード',
    winterRecSeats: 'シート/ステアリングヒーター使用',
    winterRecGarage: '可能ならガレージに駐車',
    winterRecPreheat: '充電中に予熱',
    efficiencyTarget: '目標: {target} (-5%)'
  },

  // Time view selector
  timeView: {
    day: '日',
    week: '週',
    month: '月'
  },

  // Days of week
  days: {
    mon: '月',
    tue: '火',
    wed: '水',
    thu: '木',
    fri: '金',
    sat: '土',
    sun: '日',
    monday: '月曜日',
    tuesday: '火曜日',
    wednesday: '水曜日',
    thursday: '木曜日',
    friday: '金曜日',
    saturday: '土曜日',
    sunday: '日曜日'
  },

  // Months
  months: {
    jan: '1月',
    feb: '2月',
    mar: '3月',
    apr: '4月',
    may: '5月',
    jun: '6月',
    jul: '7月',
    aug: '8月',
    sep: '9月',
    oct: '10月',
    nov: '11月',
    dec: '12月'
  },

  // Seasons
  seasons: {
    spring: '春',
    summer: '夏',
    autumn: '秋',
    winter: '冬'
  },

  // Footer
  footer: {
    tagline: 'ポルシェEVトリップインサイト • ローカル優先 • プライバシー優先 • データはデバイスから離れません',
    developedBy: '開発者'
  },

  // Unit systems
  unitSystems: {
    metric: 'メートル法 (km, L)',
    imperial_uk: 'ヤードポンド法UK (mi, mpg)',
    imperial_us: 'ヤードポンド法US (mi, mpg)'
  },

  // Chart labels
  charts: {
    distance: '距離',
    trips: 'トリップ',
    consumption: '消費',
    energy: 'エネルギー',
    cost: 'コスト',
    savings: '節約',
    efficiency: '効率',
    speed: '速度',
    time: '時間',
    hour: '時',
    day: '日',
    week: '週',
    month: '月',
    year: '年',
    average: '平均',
    total: '合計',
    best: '最高',
    worst: '最低',
    range: '航続距離'
  },

  // Trip types
  tripTypes: {
    micro: 'マイクロ',
    short: '短距離',
    medium: '中距離',
    long: '長距離',
    veryLong: '超長距離'
  },

  // Benchmark / Comparison
  benchmark: {
    yourVehicle: 'あなたの車両',
    yourTaycan: 'あなたのTaycan',
    yourTaycanCT: 'あなたのTaycan Cross Turismo',
    yourTaycanST: 'あなたのTaycan Sport Turismo',
    yourMacan: 'あなたのMacan Electric',
    yourCayenne: 'あなたのCayenne Electric',
    yourEtronGT: 'あなたのe-tron GT',
    yourPorsche: 'あなたのポルシェ',
    average: '平均',
    avg: '平均',
    comparison: '比較',
    betterThan: '優れている',
    worseThan: '超えている',
    similar: '同等',
    avgTaycan: 'Taycan平均',
    avgPorsche: 'ポルシェ平均',
    avgWltp: 'WLTP平均'
  },

  // Driving profiles
  drivingProfiles: {
    urbanCommuter: '都市通勤',
    mixedUse: '混合利用',
    highwayCruiser: '高速道路',
    weekendDriver: '週末ドライバー',
    efficientDriver: '効率的ドライバー'
  },

  // My Car tab
  myCar: {
    noDataTitle: '車両が接続されていません',
    noDataDesc: 'Porsche Connectに接続して、車両情報を表示してください。',
    connectButton: 'ポルシェに接続',
    selectVehicle: '車両を選択',
    vehiclePhotos: '車両写真',
    lastKnownLocation: '最後の既知の位置',
    locationUnavailable: '位置データが利用できません',
    openInMaps: 'マップで開く',
    heading: '方位',
    batteryLevel: 'バッテリー残量',
    estimatedRange: '推定航続距離',
    totalMileage: '総走行距離',
    electricRange: '電気航続距離',
    vehicleDetails: '車両詳細',
    model: 'モデル',
    year: '年式',
    generation: '世代',
    steering: 'ステアリング',
    leftHandDrive: '左ハンドル',
    rightHandDrive: '右ハンドル',
    locked: 'ロック済み',
    unlocked: 'アンロック済み',
    lastUpdated: '最終更新',
    frontView: 'フロントビュー',
    sideView: 'サイドビュー',
    rearView: 'リアビュー',
    topView: 'トップビュー',
    tirePressure: 'タイヤ空気圧',
    tireFL: '左前',
    tireFR: '右前',
    tireRL: '左後',
    tireRR: '右後',
    charging: '充電',
    chargingStatus: '充電中',
    notCharging: '充電していません',
    chargeTo: 'まで',
    doneAt: '完了 {time}'
  }
};
