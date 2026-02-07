// Chinese (Simplified) translations
export const zh = {
  // Language metadata
  _meta: {
    name: 'Chinese (Simplified)',
    nativeName: '简体中文',
    code: 'zh'
  },

  // Common
  common: {
    settings: '设置',
    upload: '上传',
    cancel: '取消',
    confirm: '确认',
    save: '保存',
    close: '关闭',
    yes: '是',
    no: '否',
    ok: '确定',
    error: '错误',
    success: '成功',
    warning: '警告',
    info: '信息',
    loading: '加载中...',
    processing: '处理中...',
    required: '必填',
    optional: '可选',
    total: '总计',
    average: '平均',
    trips: '行程',
    trip: '行程',
    distance: '距离',
    energy: '能量',
    consumption: '能耗',
    duration: '时长',
    speed: '速度',
    min: '分钟',
    hours: '小时',
    minutes: '分钟',
    by: '由'
  },

  // Header
  header: {
    title: '保时捷EV洞察',
    subtitle: '电动车行程分析',
    localFirst: '本地优先',
    privacyFirst: '隐私优先',
    help: '帮助'
  },

  // Navigation tabs
  tabs: {
    overview: '概览',
    patterns: '模式',
    efficiency: '效率',
    costs: '成本',
    environmental: '环境',
    battery: '电池',
    insights: '洞察',
    myCar: '我的车'
  },

  // Sidebar
  sidebar: {
    darkMode: '深色模式',
    lightMode: '浅色模式'
  },

  // Welcome screen
  welcome: {
    title: '欢迎使用保时捷EV洞察',
    description: '上传您的保时捷互联CSV导出文件以分析您的驾驶模式。',
    uploadButton: '上传您的数据',
    sampleButton: '试用示例数据',
    privacyTitle: '隐私保护',
    privacyText: '所有数据均在您的浏览器中本地处理。'
  },

  // Upload modal
  upload: {
    title: '上传电动车数据',
    mergeTitle: '添加更多数据',
    audiZip: '奥迪e-tron GT ZIP',
    audiZipAlt: '(myAudi导出)',
    audiZipDesc: '上传myAudi应用的ExportTrips ZIP文件',
    audiNoDataFile: 'ZIP中未找到行程数据。期望"Short-term memory.csv"或"Long-term memory.csv"。',
    audiParseError: '无法处理奥迪行程数据。请检查文件格式。',
    orPorsche: '或保时捷CSV',
    sinceStart: '自启动以来',
    sinceStartDesc: '单次行程',
    sinceCharge: '自充电以来',
    sinceChargeDesc: '充电周期',
    processButton: '处理数据',
    mergeButton: '合并数据',
    tripsCount: '{count}次行程',
    cyclesCount: '{count}个周期',
    modeReplace: '替换',
    modeMerge: '合并',
    replaceDesc: '用新文件替换所有现有数据',
    mergeDesc: '将新行程添加到现有数据（重复项将被跳过）',
    mergeComplete: '数据合并成功',
    mergeStats: '已添加{new}次新行程（跳过{duplicates}个重复项）。总计：{total}次行程。',
    mergeUnavailable: '合并不可用',
    mergeUnavailableDesc: '您的数据是在添加合并支持之前导入的。这次请使用替换。以后的导入将支持合并。',
    missingFile: '缺少文件',
    missingFileDesc: '请上传行程数据以继续。'
  },

  // Porsche Connect
  porscheConnect: {
    title: 'Porsche Connect',
    subtitle: '来自您车辆的实时数据',
    checking: '正在检查连接...',
    loginDescription: '使用您的 Porsche ID 登录，直接从您的车辆同步行程数据。',
    email: 'Porsche ID（电子邮件）',
    password: '密码',
    login: '登录',
    loggingIn: '正在登录...',
    logout: '登出',
    privacyNote: '您的凭据会安全地发送到保时捷，绝不会被存储。',
    selectVehicle: '选择要同步的车辆：',
    fetchData: '同步行程数据',
    loadingVehicles: '正在加载车辆...',
    loading: '加载中...',
    noVehicles: '在您的 Porsche Connect 账户中未找到车辆。',
    noTrips: '没有可用的行程数据。请确保您已启用 Porsche Connect 进行过行程。',
    errorTitle: '连接错误',
    serverUnavailable: 'Porsche Connect 代理服务器未运行。请启动它以启用实时数据同步。',
    serverInstructions: '在终端中运行 "cd server && npm install && npm start"，然后重试。',
    syncComplete: '同步完成',
    syncStats: '已从您的 {model} 同步 {new} 次行程。',
    syncMergeStats: '已添加 {new} 次新行程（跳过 {duplicates} 个重复项）。总计：{total} 次行程。',
    sessionExpired: '您的会话已过期。请重新登录。',
    connected: '已连接',
    lastSync: '上次同步',
    captchaDescription: '保时捷需要验证。请输入图片中显示的文字。',
    captchaLabel: '验证码',
    captchaPlaceholder: '输入上方显示的文字',
    verifyCaptcha: '验证',
    verifying: '验证中...',
    checkingForUpdates: '正在检查新行程...',
    syncing: '正在同步行程数据...',
    newDataSynced: '新行程已同步！'
  },

  // Settings page
  settings: {
    title: '设置',

    // Language & Units section
    languageAndUnits: '语言和单位',
    languageLabel: '显示语言',
    unitSystem: '单位制',
    currency: '货币',
    fuelConsumption: '燃油消耗',
    electricConsumption: '电能消耗',
    distanceUnit: '距离',
    speedUnit: '速度',
    pressureUnit: '轮胎压力',

    // Cost settings section
    costSettings: '成本设置',
    electricityPrice: '电费',
    petrolPrice: '汽油',
    petrolConsumption: '汽油消耗',
    perKwh: '/千瓦时',
    perLiter: '/升',
    perGallon: '/加仑',

    // Vehicle settings section
    vehicleSettings: '车辆设置',
    vehicleModel: '保时捷电动车型号',
    selectVehicle: '选择您的车辆...',
    grossBattery: '电池总容量',
    usableBatterySpec: '可用电池容量',
    wltpRange: 'WLTP续航',
    wltpConsumption: 'WLTP能耗',
    epaRange: 'EPA续航',
    epaMpge: 'EPA能效',
    batteryCapacity: '可用电池容量 (kWh)',
    batteryCapacityHelp: '选择车辆时自动填充。如需要可手动修改。',

    // Vehicle notes
    vehicleNotesTitle: '车辆规格说明',
    noteWltp: '续航数据基于官方WLTP综合工况数据',
    noteEpa: '续航和能效基于美国EPA官方测试循环数据',
    noteMpge: '每加仑英里当量（33.7 kWh = 1加仑汽油）',
    notePb: 'PB = Performance Battery（小容量）',
    notePbPlus: 'PB+ = Performance Battery Plus（大容量）',
    noteJ11: '2020-2024款车型（第一代）',
    noteJ12: '2025+款车型（中期改款，续航提升约35%）',
    noteSportTurismo: 'Sport Turismo于2022年推出',
    noteCrossTurismo: 'Cross Turismo于2021年推出',
    noteTurboGt: 'Turbo GT仅提供轿车版本',
    noteSportTurismoRwd: 'Sport Turismo有Base RWD版本；Cross Turismo没有（全系AWD）',
    noteMacanGts: 'Macan Electric GTS于2025年10月发布',

    // Data management section
    dataManagement: '数据管理',
    uploadCsvFiles: '上传CSV文件',
    clearAllData: '清除所有数据',

    // Porsche Connect section
    porscheConnect: 'Porsche Connect',
    porscheConnected: '已连接到保时捷',
    porscheConnectDesc: '连接到保时捷服务器以自动同步您的行程数据。',
    connectToPorsche: '连接到保时捷',
    syncData: '同步行程数据',
    porscheLogout: '断开连接',

    // Backup & restore section
    backupRestore: '备份与恢复',
    downloadBackup: '下载备份',
    restoreBackup: '恢复备份',

    // Theme settings
    theme: '主题',
    themeAuto: '自动（系统）',
    themeLight: '浅色',
    themeDark: '深色',

    // Privacy notice
    privacyNoticeTitle: '数据本地存储',
    privacyNoticeText: '您的行程数据永不离开您的设备。无服务器、无追踪、无数据收集。一切都在您的浏览器中本地处理和存储。'
  },

  // Confirm modal
  confirm: {
    clearDataTitle: '清除所有数据？',
    clearDataMessage: '此操作无法撤销。您的所有行程数据和设置将从此设备永久删除。',
    clearDataConfirm: '是的，清除数据',
    backupRestored: '备份恢复成功！',
    exportError: '导出错误',
    restoreError: '恢复错误',
    parseError: '文件解析错误',
    missingFile: '文件缺失',
    missingFileMessage: '请上传"自启动以来"文件以继续。'
  },

  // Sample data banner
  sampleData: {
    viewing: '正在查看示例数据',
    hide: '隐藏'
  },

  // Overview tab
  overview: {
    title: '概览',
    totalTrips: '总行程',
    totalDistance: '总距离',
    totalEnergy: '总能耗',
    avgConsumption: '平均能耗',
    avgTripDistance: '平均行程距离',
    avgTripDuration: '平均行程时长',
    avgSpeed: '平均速度',
    totalChargeCycles: '充电周期',
    distanceOverTime: '距离随时间变化',
    tripsByType: '按类型的行程',
    tripsPerCharge: '每次充电行程',
    shortTrips: '短途行程',
    avgPerMonth: '月均',
    distanceAndTrips: '距离和行程',
    tripTypeDistribution: '行程类型分布',
    energyOverTime: '能耗随时间变化',
    tripsOverTime: '行程随时间变化'
  },

  // Patterns tab
  patterns: {
    title: '驾驶模式',
    hourlyDistribution: '每小时行程分布',
    dailyPatterns: '每日模式',
    monthlyTrends: '每月趋势',
    weekdayVsWeekend: '工作日 vs 周末',
    peakHours: '高峰时段',
    avgTripsPerDay: '每日平均行程',
    avgDistancePerDay: '每日平均距离',
    mostActiveDay: '最活跃的一天',
    leastActiveDay: '最不活跃的一天',
    distanceOverTime: '距离随时间变化',
    tripsPerHour: '每小时行程',
    tripsAndDistance: '每日行程和距离',
    avgDistance: '平均距离'
  },

  // Efficiency tab
  efficiency: {
    title: '效率分析',
    consumptionOverTime: '能耗随时间变化',
    tripTypeEfficiency: '按行程类型的效率',
    speedEfficiency: '速度与效率',
    bestEfficiency: '最佳效率',
    worstEfficiency: '最差效率',
    avgEfficiency: '平均效率',
    efficiencyTrend: '效率趋势',
    optimalSpeed: '最佳速度',
    consumptionBySpeed: '按速度能耗',
    consumptionByTripType: '按行程类型能耗',
    consumptionTrend: '能耗趋势'
  },

  // Costs tab
  costs: {
    title: '成本分析',
    electricCost: '电费',
    petrolCost: '汽油等价',
    savings: '总节省',
    savingsRate: '节省率',
    costPerDistance: '每{unit}成本',
    annualProjection: '年度预测',
    fiveYearSavings: '5年节省',
    comparedTo: '与{consumption}油耗汽油车相比',
    monthlyCost: '月度成本',
    yearlyProjection: '年度预测',
    costComparison: '成本对比',
    electricVsPetrol: '电动 vs 汽油',
    savingsOverTime: '节省随时间变化',
    costPerTrip: '每次行程成本',
    costPerKm: '每公里成本',
    costPerMile: '每英里成本',
    projectedAnnual: '年度预测',
    projectedSavings: '预计节省',
    electricityCost: '电费',
    petrolEquivalent: '汽油等价'
  },

  // Environmental tab
  environmental: {
    title: '环境影响',
    co2Electric: 'CO₂（电动）',
    co2Petrol: 'CO₂（汽油）',
    co2Saved: '节省CO₂',
    co2SavedLabel: 'CO₂节省',
    treesEquivalent: '等效树木',
    reductionPercentage: '减少',
    litersAvoided: '避免汽油',
    emissionsComparison: '月度CO₂对比',
    carbonFootprint: '碳足迹',
    annualImpact: '年度影响',
    equivalentTrees: '等效树木',
    kgCo2: '千克CO₂',
    tonsCo2: '吨CO₂',
    vsElectric: 'vs 汽油',
    youProduced: '您的排放',
    petrolWouldProduce: '汽油排放',
    treesPerYear: '树/年',
    gridEmissions: '电网排放',
    petrolBaseline: '汽油基准',
    electricGrid: '电网',
    ifPetrol: '如果汽油'
  },

  // Battery tab
  battery: {
    title: '电池与续航',
    realWorldRange: '实际续航',
    officialRange: '官方续航',
    rangeEfficiency: '续航效率',
    energyPerTrip: '每次行程能耗',
    tripsPerCharge: '满电行程数',
    distancePerCharge: '每次充电距离',
    batteryPerTrip: '每次行程电量',
    consumptionVsOfficial: '与官方对比',
    seasonalVariation: '季节变化',
    chargesPerWeek: '每周充电次数',
    energyPerCharge: '每次充电能量',
    chargingLosses: '充电损耗',
    offPeakSavings: '峰谷节省',
    fullCycles: '完整周期',
    batteryHealth: '电池健康',
    chargingPattern: '充电模式',
    rangeAnalysis: '续航分析',
    winterRange: '冬季续航',
    summerRange: '夏季续航',
    socUsedPerCycle: '每周期SOC使用',
    potentialSavings: '潜在节省',
    vsOfficialRange: 'vs 官方',
    rangeComparison: '续航对比',
    yourRange: '您的续航',
    officialRangeLabel: '官方',
    chargingOptimization: '充电优化'
  },

  // Insights tab
  insights: {
    title: '驾驶洞察',
    commuter: '日常通勤者',
    commuterDesc: '您{pct}%的行程在典型通勤时间（7-8点，17-19点）。考虑在充电时预热以节省能源。',
    shortTrips: '短途行程使用率高',
    shortTripsDesc: '{pct}%的行程短于{dist}。短途行程每{unit}多消耗{diff}%能源。考虑合并出行。',
    weekendTripper: '周末旅行者',
    weekendTripperDesc: '周六行程平均{satDist}，工作日{weekdayDist}。长途行程更高效！',
    winterDrop: '冬季提示',
    winterDropDesc: '冬季能耗比夏季高{pct}%（{winter}对比{summer}）。使用座椅加热而非空调加热。',
    sweetSpot: '您的效率甜蜜点',
    sweetSpotDesc: '在{speed}时效率最佳（{cons}）。比您的平均值好{pct}%。',
    optimalCharging: '最佳充电频率',
    optimalChargingDesc: '平均{trips}次行程充一次电对电池寿命有益。继续保持！',
    frequentCharging: '频繁充电',
    frequentChargingDesc: '您平均{trips}次行程后充电。考虑减少充电频率以保护电池健康。',
    drivingProfile: '驾驶档案',
    urbanCommuter: '城市通勤',
    mixedUse: '混合使用',
    highwayCruiser: '高速巡航',
    efficiencyRating: '效率评级',
    vsAvgTaycan: 'vs Taycan均值',
    shortTripPenalty: '短途惩罚',
    drivingScore: '驾驶评分',
    recommendations: '个性化建议',
    strengths: '优势',
    areasToImprove: '改进领域',
    yourInsights: '您的洞察',
    predictions: '预测与展望',
    projectedAnnualDistance: '年度距离',
    projectedAnnualTrips: '年度行程',
    projectedAnnualEnergy: '年度能耗',
    projectedAnnualCost: '年度节省',
    competitorComparison: 'EV对比',
    dailyCommuter: '日常通勤者',
    dailyCommuterDesc: '您{pct}%的行程在典型通勤时间（7-8点，17-19点）。考虑在充电时预热以节省能源。',
    shortTripsHighUsage: '短途行程使用率高',
    weekendTripperTitle: '周末旅行者',
    projected: '预计',
    nextMonthForecast: '下月预测',
    tripsExpected: '预计行程',
    seasonalPrediction: '季节预测',
    summer: '夏季',
    winter: '冬季',
    // Recommendation strings
    vsPetrol: 'vs 汽油',
    chargingRecDaily: '日常80%，长途100%',
    chargingRecPrecondition: '充电时预热',
    efficiencyRecCombine: '合并短途行程',
    efficiencyRecEcoMode: '城市Eco模式，高速正常模式',
    winterRecSeats: '使用座椅/方向盘加热',
    winterRecGarage: '尽量停在车库',
    winterRecPreheat: '充电时预热',
    efficiencyTarget: '目标: {target} (-5%)'
  },

  // Time view selector
  timeView: {
    day: '日',
    week: '周',
    month: '月'
  },

  // Days of week
  days: {
    mon: '周一',
    tue: '周二',
    wed: '周三',
    thu: '周四',
    fri: '周五',
    sat: '周六',
    sun: '周日',
    monday: '星期一',
    tuesday: '星期二',
    wednesday: '星期三',
    thursday: '星期四',
    friday: '星期五',
    saturday: '星期六',
    sunday: '星期日'
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
    spring: '春季',
    summer: '夏季',
    autumn: '秋季',
    winter: '冬季'
  },

  // Footer
  footer: {
    tagline: '保时捷EV行程洞察 • 本地优先 • 隐私优先 • 数据不离开您的设备',
    developedBy: '开发者'
  },

  // Unit systems
  unitSystems: {
    metric: '公制 (km, L)',
    imperial_uk: '英制UK (mi, mpg)',
    imperial_us: '英制US (mi, mpg)'
  },

  // Chart labels
  charts: {
    distance: '距离',
    trips: '行程',
    consumption: '能耗',
    energy: '能量',
    cost: '成本',
    savings: '节省',
    efficiency: '效率',
    speed: '速度',
    time: '时间',
    hour: '小时',
    day: '日',
    week: '周',
    month: '月',
    year: '年',
    average: '平均',
    total: '总计',
    best: '最佳',
    worst: '最差',
    range: '续航'
  },

  // Trip types
  tripTypes: {
    micro: '微型',
    short: '短途',
    medium: '中途',
    long: '长途',
    veryLong: '超长途'
  },

  // Benchmark / Comparison
  benchmark: {
    yourVehicle: '您的车辆',
    yourTaycan: '您的Taycan',
    yourTaycanCT: '您的Taycan Cross Turismo',
    yourTaycanST: '您的Taycan Sport Turismo',
    yourMacan: '您的Macan Electric',
    yourCayenne: '您的Cayenne Electric',
    yourEtronGT: '您的e-tron GT',
    yourPorsche: '您的保时捷',
    average: '平均',
    avg: '均',
    comparison: '对比',
    betterThan: '优于',
    worseThan: '高于',
    similar: '相似于',
    avgTaycan: 'Taycan均值',
    avgPorsche: '保时捷均值',
    avgWltp: 'WLTP均值'
  },

  // Driving profiles
  drivingProfiles: {
    urbanCommuter: '城市通勤',
    mixedUse: '混合使用',
    highwayCruiser: '高速巡航',
    weekendDriver: '周末驾驶',
    efficientDriver: '高效驾驶'
  },

  // My Car tab
  myCar: {
    noDataTitle: '未连接车辆',
    noDataDesc: '连接到Porsche Connect以查看您的车辆信息。',
    connectButton: '连接到保时捷',
    selectVehicle: '选择车辆',
    vehiclePhotos: '车辆照片',
    lastKnownLocation: '最后已知位置',
    locationUnavailable: '位置数据不可用',
    openInMaps: '在地图中打开',
    heading: '朝向',
    batteryLevel: '电池电量',
    estimatedRange: '预计续航',
    totalMileage: '总里程',
    electricRange: '电动续航',
    vehicleDetails: '车辆详情',
    model: '型号',
    year: '年份',
    generation: '代系',
    steering: '方向盘',
    leftHandDrive: '左舵',
    rightHandDrive: '右舵',
    locked: '已锁定',
    unlocked: '已解锁',
    lastUpdated: '最后更新',
    frontView: '前视图',
    sideView: '侧视图',
    rearView: '后视图',
    topView: '俯视图',
    tirePressure: '轮胎气压',
    tireFL: '左前',
    tireFR: '右前',
    tireRL: '左后',
    tireRR: '右后',
    charging: '充电',
    chargingStatus: '充电中',
    notCharging: '未充电',
    chargeTo: '至',
    doneAt: '完成时间 {time}'
  }
};
