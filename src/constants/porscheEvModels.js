// ========== PORSCHE ELECTRIC VEHICLE SPECIFICATIONS ==========
// Complete database of Porsche EV models with battery and range specifications
//
// Notes:
// - PB = Performance Battery (smaller)
// - PB+ = Performance Battery Plus (larger)
// - Sport Turismo was introduced in 2022, hence starts from 2022
// - Cross Turismo was introduced in 2021
// - Turbo GT is only available as a sedan (no Cross Turismo or Sport Turismo version)
// - Sport Turismo has a base RWD version; Cross Turismo does not (all Cross Turismo are AWD)
// - Macan Electric GTS announced October 2025, available 2025+
//
// Total: 54 model variants

export const PORSCHE_EV_MODELS = [
  // ========== TAYCAN SEDAN ==========

  // Taycan Sedan - Base RWD
  { id: 'taycan-base-rwd-pb-2020', name: 'Taycan Base RWD PB (2020-2024)', grossBattery: 79.2, usableBattery: 71.0, wltpRange: 431, wltpConsumption: 21.6, generation: 'J1.1', bodyStyle: 'sedan' },
  { id: 'taycan-base-rwd-pb-2025', name: 'Taycan Base RWD PB (2025+)', grossBattery: 89.0, usableBattery: 82.3, wltpRange: 547, wltpConsumption: 17.9, generation: 'J1.2', bodyStyle: 'sedan' },
  { id: 'taycan-base-rwd-pb+-2020', name: 'Taycan Base RWD PB+ (2020-2024)', grossBattery: 93.4, usableBattery: 83.7, wltpRange: 458, wltpConsumption: 22.2, generation: 'J1.1', bodyStyle: 'sedan' },
  { id: 'taycan-base-rwd-pb+-2025', name: 'Taycan Base RWD PB+ (2025+)', grossBattery: 105.0, usableBattery: 97.0, wltpRange: 638, wltpConsumption: 18.2, generation: 'J1.2', bodyStyle: 'sedan' },

  // Taycan Sedan - 4
  { id: 'taycan-4-pb-2020', name: 'Taycan 4 PB (2020-2024)', grossBattery: 79.2, usableBattery: 71.0, wltpRange: 410, wltpConsumption: 22.4, generation: 'J1.1', bodyStyle: 'sedan' },
  { id: 'taycan-4-pb-2025', name: 'Taycan 4 PB (2025+)', grossBattery: 89.0, usableBattery: 82.3, wltpRange: 517, wltpConsumption: 18.8, generation: 'J1.2', bodyStyle: 'sedan' },
  { id: 'taycan-4-pb+-2020', name: 'Taycan 4 PB+ (2020-2024)', grossBattery: 93.4, usableBattery: 83.7, wltpRange: 436, wltpConsumption: 23.2, generation: 'J1.1', bodyStyle: 'sedan' },
  { id: 'taycan-4-pb+-2025', name: 'Taycan 4 PB+ (2025+)', grossBattery: 105.0, usableBattery: 97.0, wltpRange: 580, wltpConsumption: 19.1, generation: 'J1.2', bodyStyle: 'sedan' },

  // Taycan Sedan - 4S
  { id: 'taycan-4s-pb-2020', name: 'Taycan 4S PB (2020-2024)', grossBattery: 79.2, usableBattery: 71.0, wltpRange: 384, wltpConsumption: 23.5, generation: 'J1.1', bodyStyle: 'sedan' },
  { id: 'taycan-4s-pb-2025', name: 'Taycan 4S PB (2025+)', grossBattery: 89.0, usableBattery: 82.3, wltpRange: 492, wltpConsumption: 18.9, generation: 'J1.2', bodyStyle: 'sedan' },
  { id: 'taycan-4s-pb+-2020', name: 'Taycan 4S PB+ (2020-2024)', grossBattery: 93.4, usableBattery: 83.7, wltpRange: 426, wltpConsumption: 24.0, generation: 'J1.1', bodyStyle: 'sedan' },
  { id: 'taycan-4s-pb+-2025', name: 'Taycan 4S PB+ (2025+)', grossBattery: 105.0, usableBattery: 97.0, wltpRange: 558, wltpConsumption: 18.9, generation: 'J1.2', bodyStyle: 'sedan' },

  // Taycan Sedan - GTS
  { id: 'taycan-gts-2021', name: 'Taycan GTS (2021-2024)', grossBattery: 93.4, usableBattery: 83.7, wltpRange: 405, wltpConsumption: 24.5, generation: 'J1.1', bodyStyle: 'sedan' },
  { id: 'taycan-gts-2025', name: 'Taycan GTS (2025+)', grossBattery: 105.0, usableBattery: 97.0, wltpRange: 529, wltpConsumption: 19.0, generation: 'J1.2', bodyStyle: 'sedan' },

  // Taycan Sedan - Turbo
  { id: 'taycan-turbo-2020', name: 'Taycan Turbo (2020-2024)', grossBattery: 93.4, usableBattery: 83.7, wltpRange: 405, wltpConsumption: 24.5, generation: 'J1.1', bodyStyle: 'sedan' },
  { id: 'taycan-turbo-2025', name: 'Taycan Turbo (2025+)', grossBattery: 105.0, usableBattery: 97.0, wltpRange: 532, wltpConsumption: 18.9, generation: 'J1.2', bodyStyle: 'sedan' },

  // Taycan Sedan - Turbo S
  { id: 'taycan-turbo-s-2020', name: 'Taycan Turbo S (2020-2024)', grossBattery: 93.4, usableBattery: 83.7, wltpRange: 405, wltpConsumption: 24.5, generation: 'J1.1', bodyStyle: 'sedan' },
  { id: 'taycan-turbo-s-2025', name: 'Taycan Turbo S (2025+)', grossBattery: 105.0, usableBattery: 97.0, wltpRange: 549, wltpConsumption: 18.9, generation: 'J1.2', bodyStyle: 'sedan' },

  // Taycan Sedan - Turbo GT
  { id: 'taycan-turbo-gt-2025', name: 'Taycan Turbo GT (2025+)', grossBattery: 105.0, usableBattery: 97.0, wltpRange: 498, wltpConsumption: 20.9, generation: 'J1.2', bodyStyle: 'sedan' },

  // ========== TAYCAN CROSS TURISMO ==========

  // Taycan Cross Turismo - 4
  { id: 'taycan-ct-4-pb-2021', name: 'Taycan Cross Turismo 4 PB (2021-2024)', grossBattery: 79.2, usableBattery: 71.0, wltpRange: 403, wltpConsumption: 22.8, generation: 'J1.1', bodyStyle: 'cross-turismo' },
  { id: 'taycan-ct-4-pb-2025', name: 'Taycan Cross Turismo 4 PB (2025+)', grossBattery: 89.0, usableBattery: 82.3, wltpRange: 509, wltpConsumption: 19.2, generation: 'J1.2', bodyStyle: 'cross-turismo' },
  { id: 'taycan-ct-4-pb+-2021', name: 'Taycan Cross Turismo 4 PB+ (2021-2024)', grossBattery: 93.4, usableBattery: 83.7, wltpRange: 428, wltpConsumption: 23.8, generation: 'J1.1', bodyStyle: 'cross-turismo' },
  { id: 'taycan-ct-4-pb+-2025', name: 'Taycan Cross Turismo 4 PB+ (2025+)', grossBattery: 105.0, usableBattery: 97.0, wltpRange: 570, wltpConsumption: 19.5, generation: 'J1.2', bodyStyle: 'cross-turismo' },

  // Taycan Cross Turismo - 4S
  { id: 'taycan-ct-4s-pb-2021', name: 'Taycan Cross Turismo 4S PB (2021-2024)', grossBattery: 79.2, usableBattery: 71.0, wltpRange: 376, wltpConsumption: 24.2, generation: 'J1.1', bodyStyle: 'cross-turismo' },
  { id: 'taycan-ct-4s-pb-2025', name: 'Taycan Cross Turismo 4S PB (2025+)', grossBattery: 89.0, usableBattery: 82.3, wltpRange: 482, wltpConsumption: 19.3, generation: 'J1.2', bodyStyle: 'cross-turismo' },
  { id: 'taycan-ct-4s-pb+-2021', name: 'Taycan Cross Turismo 4S PB+ (2021-2024)', grossBattery: 93.4, usableBattery: 83.7, wltpRange: 420, wltpConsumption: 24.8, generation: 'J1.1', bodyStyle: 'cross-turismo' },
  { id: 'taycan-ct-4s-pb+-2025', name: 'Taycan Cross Turismo 4S PB+ (2025+)', grossBattery: 105.0, usableBattery: 97.0, wltpRange: 548, wltpConsumption: 19.3, generation: 'J1.2', bodyStyle: 'cross-turismo' },

  // Taycan Cross Turismo - GTS
  { id: 'taycan-ct-gts-2021', name: 'Taycan Cross Turismo GTS (2021-2024)', grossBattery: 93.4, usableBattery: 83.7, wltpRange: 397, wltpConsumption: 25.2, generation: 'J1.1', bodyStyle: 'cross-turismo' },
  { id: 'taycan-ct-gts-2025', name: 'Taycan Cross Turismo GTS (2025+)', grossBattery: 105.0, usableBattery: 97.0, wltpRange: 518, wltpConsumption: 19.5, generation: 'J1.2', bodyStyle: 'cross-turismo' },

  // Taycan Cross Turismo - Turbo
  { id: 'taycan-ct-turbo-2021', name: 'Taycan Cross Turismo Turbo (2021-2024)', grossBattery: 93.4, usableBattery: 83.7, wltpRange: 397, wltpConsumption: 25.2, generation: 'J1.1', bodyStyle: 'cross-turismo' },
  { id: 'taycan-ct-turbo-2025', name: 'Taycan Cross Turismo Turbo (2025+)', grossBattery: 105.0, usableBattery: 97.0, wltpRange: 523, wltpConsumption: 19.4, generation: 'J1.2', bodyStyle: 'cross-turismo' },

  // Taycan Cross Turismo - Turbo S
  { id: 'taycan-ct-turbo-s-2021', name: 'Taycan Cross Turismo Turbo S (2021-2024)', grossBattery: 93.4, usableBattery: 83.7, wltpRange: 393, wltpConsumption: 25.5, generation: 'J1.1', bodyStyle: 'cross-turismo' },
  { id: 'taycan-ct-turbo-s-2025', name: 'Taycan Cross Turismo Turbo S (2025+)', grossBattery: 105.0, usableBattery: 97.0, wltpRange: 540, wltpConsumption: 19.3, generation: 'J1.2', bodyStyle: 'cross-turismo' },

  // ========== TAYCAN SPORT TURISMO ==========

  // Taycan Sport Turismo - Base RWD
  { id: 'taycan-st-base-rwd-pb-2022', name: 'Taycan Sport Turismo Base RWD PB (2022-2024)', grossBattery: 79.2, usableBattery: 71.0, wltpRange: 431, wltpConsumption: 21.6, generation: 'J1.1', bodyStyle: 'sport-turismo' },
  { id: 'taycan-st-base-rwd-pb-2025', name: 'Taycan Sport Turismo Base RWD PB (2025+)', grossBattery: 89.0, usableBattery: 82.3, wltpRange: 547, wltpConsumption: 17.9, generation: 'J1.2', bodyStyle: 'sport-turismo' },
  { id: 'taycan-st-base-rwd-pb+-2022', name: 'Taycan Sport Turismo Base RWD PB+ (2022-2024)', grossBattery: 93.4, usableBattery: 83.7, wltpRange: 458, wltpConsumption: 22.2, generation: 'J1.1', bodyStyle: 'sport-turismo' },
  { id: 'taycan-st-base-rwd-pb+-2025', name: 'Taycan Sport Turismo Base RWD PB+ (2025+)', grossBattery: 105.0, usableBattery: 97.0, wltpRange: 638, wltpConsumption: 18.2, generation: 'J1.2', bodyStyle: 'sport-turismo' },

  // Taycan Sport Turismo - 4S
  { id: 'taycan-st-4s-pb-2022', name: 'Taycan Sport Turismo 4S PB (2022-2024)', grossBattery: 79.2, usableBattery: 71.0, wltpRange: 384, wltpConsumption: 23.5, generation: 'J1.1', bodyStyle: 'sport-turismo' },
  { id: 'taycan-st-4s-pb-2025', name: 'Taycan Sport Turismo 4S PB (2025+)', grossBattery: 89.0, usableBattery: 82.3, wltpRange: 492, wltpConsumption: 18.9, generation: 'J1.2', bodyStyle: 'sport-turismo' },
  { id: 'taycan-st-4s-pb+-2022', name: 'Taycan Sport Turismo 4S PB+ (2022-2024)', grossBattery: 93.4, usableBattery: 83.7, wltpRange: 443, wltpConsumption: 23.2, generation: 'J1.1', bodyStyle: 'sport-turismo' },
  { id: 'taycan-st-4s-pb+-2025', name: 'Taycan Sport Turismo 4S PB+ (2025+)', grossBattery: 105.0, usableBattery: 97.0, wltpRange: 558, wltpConsumption: 18.9, generation: 'J1.2', bodyStyle: 'sport-turismo' },

  // Taycan Sport Turismo - GTS
  { id: 'taycan-st-gts-2022', name: 'Taycan Sport Turismo GTS (2022-2024)', grossBattery: 93.4, usableBattery: 83.7, wltpRange: 405, wltpConsumption: 24.5, generation: 'J1.1', bodyStyle: 'sport-turismo' },
  { id: 'taycan-st-gts-2025', name: 'Taycan Sport Turismo GTS (2025+)', grossBattery: 105.0, usableBattery: 97.0, wltpRange: 529, wltpConsumption: 19.0, generation: 'J1.2', bodyStyle: 'sport-turismo' },

  // Taycan Sport Turismo - Turbo
  { id: 'taycan-st-turbo-2022', name: 'Taycan Sport Turismo Turbo (2022-2024)', grossBattery: 93.4, usableBattery: 83.7, wltpRange: 397, wltpConsumption: 25.2, generation: 'J1.1', bodyStyle: 'sport-turismo' },
  { id: 'taycan-st-turbo-2025', name: 'Taycan Sport Turismo Turbo (2025+)', grossBattery: 105.0, usableBattery: 97.0, wltpRange: 523, wltpConsumption: 19.4, generation: 'J1.2', bodyStyle: 'sport-turismo' },

  // Taycan Sport Turismo - Turbo S
  { id: 'taycan-st-turbo-s-2022', name: 'Taycan Sport Turismo Turbo S (2022-2024)', grossBattery: 93.4, usableBattery: 83.7, wltpRange: 393, wltpConsumption: 25.5, generation: 'J1.1', bodyStyle: 'sport-turismo' },
  { id: 'taycan-st-turbo-s-2025', name: 'Taycan Sport Turismo Turbo S (2025+)', grossBattery: 105.0, usableBattery: 97.0, wltpRange: 577, wltpConsumption: 19.3, generation: 'J1.2', bodyStyle: 'sport-turismo' },

  // ========== MACAN ELECTRIC ==========

  { id: 'macan-base-rwd-2025', name: 'Macan Electric Base RWD (2025+)', grossBattery: 100.0, usableBattery: 95.0, wltpRange: 627, wltpConsumption: 18.0, generation: 'Gen1', bodyStyle: 'suv' },
  { id: 'macan-4-2024', name: 'Macan Electric 4 (2024+)', grossBattery: 100.0, usableBattery: 95.0, wltpRange: 570, wltpConsumption: 19.1, generation: 'Gen1', bodyStyle: 'suv' },
  { id: 'macan-4s-2025', name: 'Macan Electric 4S (2025+)', grossBattery: 100.0, usableBattery: 95.0, wltpRange: 565, wltpConsumption: 19.1, generation: 'Gen1', bodyStyle: 'suv' },
  { id: 'macan-gts-2025', name: 'Macan Electric GTS (2025+)', grossBattery: 100.0, usableBattery: 95.0, wltpRange: 586, wltpConsumption: 19.5, generation: 'Gen1', bodyStyle: 'suv' },
  { id: 'macan-turbo-2024', name: 'Macan Electric Turbo (2024+)', grossBattery: 100.0, usableBattery: 95.0, wltpRange: 559, wltpConsumption: 19.5, generation: 'Gen1', bodyStyle: 'suv' },

  // ========== CAYENNE ELECTRIC ==========

  { id: 'cayenne-base-2026', name: 'Cayenne Electric Base (2026)', grossBattery: 113.0, usableBattery: 108.0, wltpRange: 642, wltpConsumption: 20.8, generation: 'Gen1', bodyStyle: 'suv' },
  { id: 'cayenne-turbo-2026', name: 'Cayenne Electric Turbo (2026)', grossBattery: 113.0, usableBattery: 108.0, wltpRange: 623, wltpConsumption: 21.4, generation: 'Gen1', bodyStyle: 'suv' },

  // ========== AUDI E-TRON GT (J1 PLATFORM) ==========
  // Same platform as Taycan, technically similar specs

  // Audi e-tron GT - First Generation (2021-2024)
  { id: 'etron-gt-2021', name: 'Audi e-tron GT (2021-2024)', grossBattery: 93.4, usableBattery: 83.7, wltpRange: 488, wltpConsumption: 19.6, generation: 'J1.1', bodyStyle: 'sedan', brand: 'audi' },
  { id: 'etron-gt-rs-2021', name: 'Audi RS e-tron GT (2021-2024)', grossBattery: 93.4, usableBattery: 83.7, wltpRange: 472, wltpConsumption: 20.2, generation: 'J1.1', bodyStyle: 'sedan', brand: 'audi' },

  // Audi e-tron GT - Second Generation (2025+)
  { id: 'etron-gt-2025', name: 'Audi e-tron GT (2025+)', grossBattery: 105.0, usableBattery: 97.0, wltpRange: 609, wltpConsumption: 17.8, generation: 'J1.2', bodyStyle: 'sedan', brand: 'audi' },
  { id: 'etron-gt-s-2025', name: 'Audi S e-tron GT (2025+)', grossBattery: 105.0, usableBattery: 97.0, wltpRange: 609, wltpConsumption: 17.8, generation: 'J1.2', bodyStyle: 'sedan', brand: 'audi' },
  { id: 'etron-gt-rs-2025', name: 'Audi RS e-tron GT (2025+)', grossBattery: 105.0, usableBattery: 97.0, wltpRange: 598, wltpConsumption: 18.1, generation: 'J1.2', bodyStyle: 'sedan', brand: 'audi' },
  { id: 'etron-gt-rs-perf-2025', name: 'Audi RS e-tron GT performance (2025+)', grossBattery: 105.0, usableBattery: 97.0, wltpRange: 531, wltpConsumption: 20.6, generation: 'J1.2', bodyStyle: 'sedan', brand: 'audi' }
];

// Default vehicle (Taycan 4 Cross Turismo with Performance Battery Plus, most common configuration)
export const DEFAULT_VEHICLE_ID = 'taycan-ct-4-pb+-2021';

// Get vehicle by ID
export const getVehicleById = (id) => {
  return PORSCHE_EV_MODELS.find(v => v.id === id) || PORSCHE_EV_MODELS.find(v => v.id === DEFAULT_VEHICLE_ID);
};

// Get vehicles grouped by model line
export const getVehiclesGrouped = () => {
  const groups = {
    'Taycan Sedan': [],
    'Taycan Cross Turismo': [],
    'Taycan Sport Turismo': [],
    'Macan Electric': [],
    'Cayenne Electric': [],
    'Audi e-tron GT': []
  };

  PORSCHE_EV_MODELS.forEach(v => {
    if (v.brand === 'audi') {
      groups['Audi e-tron GT'].push(v);
    } else if (v.name.includes('Cross Turismo')) {
      groups['Taycan Cross Turismo'].push(v);
    } else if (v.name.includes('Sport Turismo')) {
      groups['Taycan Sport Turismo'].push(v);
    } else if (v.name.includes('Macan')) {
      groups['Macan Electric'].push(v);
    } else if (v.name.includes('Cayenne')) {
      groups['Cayenne Electric'].push(v);
    } else if (v.name.includes('Taycan')) {
      groups['Taycan Sedan'].push(v);
    }
  });

  return groups;
};

// Try to guess the best matching vehicle from filename or model string
export const guessVehicleFromString = (str) => {
  if (!str) return null;
  const lower = str.toLowerCase();

  // Check for Audi first (before other checks)
  const isAudi = lower.includes('audi') || lower.includes('e-tron gt') || lower.includes('etron gt');

  // Check for model line
  const isCrossTurismo = lower.includes('cross') || lower.includes('ct');
  const isSportTurismo = lower.includes('sport turismo') || lower.includes('st');
  const isMacan = lower.includes('macan');
  const isCayenne = lower.includes('cayenne');
  const isTaycan = !isAudi && (lower.includes('taycan') || (!isMacan && !isCayenne));

  // Check for variant
  const isTurboGT = lower.includes('turbo gt');
  const isTurboS = !isTurboGT && lower.includes('turbo s');
  const isTurbo = !isTurboGT && !isTurboS && lower.includes('turbo');
  const isGTS = lower.includes('gts');
  const is4S = lower.includes('4s');
  const is4 = !is4S && (lower.includes(' 4 ') || lower.includes(' 4') || lower.includes('4 '));
  const isBase = lower.includes('base') || lower.includes('rwd');

  // Check for battery type (only for Taycan)
  const isPBPlus = lower.includes('pb+') || lower.includes('plus') || lower.includes('93') || lower.includes('97') || lower.includes('105');
  const isPB = !isPBPlus && (lower.includes('pb') || lower.includes('71') || lower.includes('79') || lower.includes('82') || lower.includes('89'));

  // Check for generation
  const is2025Plus = lower.includes('2025') || lower.includes('2026') || lower.includes('j1.2');
  const is2024OrEarlier = lower.includes('2020') || lower.includes('2021') || lower.includes('2022') || lower.includes('2023') || lower.includes('2024') || lower.includes('j1.1');

  // Build search criteria
  let candidates = [...PORSCHE_EV_MODELS];

  // Filter by model line
  if (isAudi) {
    candidates = candidates.filter(v => v.brand === 'audi');
  } else if (isMacan) {
    candidates = candidates.filter(v => v.name.includes('Macan'));
  } else if (isCayenne) {
    candidates = candidates.filter(v => v.name.includes('Cayenne'));
  } else if (isCrossTurismo) {
    candidates = candidates.filter(v => v.name.includes('Cross Turismo'));
  } else if (isSportTurismo) {
    candidates = candidates.filter(v => v.name.includes('Sport Turismo'));
  } else if (isTaycan) {
    candidates = candidates.filter(v => v.name.includes('Taycan') && !v.name.includes('Cross') && !v.name.includes('Sport'));
  }

  // Filter by variant
  if (isAudi) {
    // Audi-specific variants: RS performance, RS, S, base
    const isRSPerf = lower.includes('performance') || lower.includes('perf');
    const isRS = !isRSPerf && lower.includes('rs');
    const isS = !isRS && !isRSPerf && lower.includes(' s ');

    if (isRSPerf) {
      candidates = candidates.filter(v => v.name.includes('performance'));
    } else if (isRS) {
      candidates = candidates.filter(v => v.name.includes('RS') && !v.name.includes('performance'));
    } else if (isS) {
      candidates = candidates.filter(v => v.name.includes('S e-tron'));
    }
  } else if (isTurboGT) {
    candidates = candidates.filter(v => v.name.includes('Turbo GT'));
  } else if (isTurboS) {
    candidates = candidates.filter(v => v.name.includes('Turbo S'));
  } else if (isTurbo) {
    candidates = candidates.filter(v => v.name.includes('Turbo') && !v.name.includes('Turbo S') && !v.name.includes('Turbo GT'));
  } else if (isGTS) {
    candidates = candidates.filter(v => v.name.includes('GTS'));
  } else if (is4S) {
    candidates = candidates.filter(v => v.name.includes('4S'));
  } else if (is4) {
    candidates = candidates.filter(v => v.name.includes(' 4 ') || v.name.endsWith(' 4'));
  } else if (isBase) {
    candidates = candidates.filter(v => v.name.includes('Base'));
  }

  // Filter by battery (Taycan only)
  if (isTaycan && !isMacan && !isCayenne) {
    if (isPBPlus) {
      candidates = candidates.filter(v => v.name.includes('PB+'));
    } else if (isPB) {
      candidates = candidates.filter(v => v.name.includes('PB') && !v.name.includes('PB+'));
    }
  }

  // Filter by generation
  if (is2025Plus) {
    candidates = candidates.filter(v => v.name.includes('2025') || v.name.includes('2026'));
  } else if (is2024OrEarlier) {
    candidates = candidates.filter(v => !v.name.includes('2025') && !v.name.includes('2026'));
  }

  // Return best match or null if no specific match
  return candidates.length > 0 && candidates.length < PORSCHE_EV_MODELS.length ? candidates[0] : null;
};
