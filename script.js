const VIEW_WIDTH = 28;
const VIEW_HEIGHT = 18;
const PUBLISHED_STORAGE_KEY = "dungeonRecipeMaker.publishedDungeons.v1";
const PUBLISHED_DB_NAME = "mysteryDungeonMakerDb";
const PUBLISHED_DB_VERSION = 1;
const PUBLISHED_DB_STORE = "kv";
const MIN_ITEM_UPGRADE = -99;
const MAX_ITEM_UPGRADE = Number.MAX_SAFE_INTEGER;
const SPECIAL_ATTACK_GRID_SIZE = 7;
const SPECIAL_ATTACK_GRID_CENTER = Math.floor(SPECIAL_ATTACK_GRID_SIZE / 2);
const ENEMY_ATTACK_BEAT_MS = 75;

const controls = {
  dungeonName: document.querySelector("#dungeonName"),
  dungeonDescription: document.querySelector("#dungeonDescription"),
  floors: document.querySelector("#floors"),
  roomCount: document.querySelector("#roomCount"),
  monsterRate: document.querySelector("#monsterRate"),
  monsterRespawnRate: document.querySelector("#monsterRespawnRate"),
  difficulty: document.querySelector("#difficulty"),
  itemRate: document.querySelector("#itemRate"),
  rareRate: document.querySelector("#rareRate"),
  curseRate: document.querySelector("#curseRate"),
  blessedRate: document.querySelector("#blessedRate"),
  trapRate: document.querySelector("#trapRate"),
  sigilRate: document.querySelector("#sigilRate"),
  goldRate: document.querySelector("#goldRate"),
  inventoryLimit: document.querySelector("#inventoryLimit"),
  monsterLimit: document.querySelector("#monsterLimit"),
  hungerDrainRate: document.querySelector("#hungerDrainRate"),
  clearBuffsOnFloorChange: document.querySelector("#clearBuffsOnFloorChange"),
  hungerNoHealItemAction: document.querySelector("#hungerNoHealItemAction"),
  hungerNoHealAttackDamage: document.querySelector("#hungerNoHealAttackDamage"),
  hungerNoHealPickupExchange: document.querySelector("#hungerNoHealPickupExchange"),
  weaponRarityEnabled: document.querySelector("#weaponRarityEnabled"),
  rarityAddButton: document.querySelector("#rarityAddButton"),
  hungerEnabled: document.querySelector("#hungerEnabled"),
  equippedCountsTowardLimit: document.querySelector("#equippedCountsTowardLimit"),
  unidentifiedEnabled: document.querySelector("#unidentifiedEnabled"),
  deductionMode: document.querySelector("#deductionMode"),
  hideGridlines: document.querySelector("#hideGridlines"),
  cameraMode: document.querySelector("#cameraMode"),
  environment: document.querySelector("#environment"),
  customEnvironmentName: document.querySelector("#customEnvironmentName"),
  startHp: document.querySelector("#startHp"),
  startAttack: document.querySelector("#startAttack"),
  startDefense: document.querySelector("#startDefense"),
  startAccuracy: document.querySelector("#startAccuracy"),
  startGold: document.querySelector("#startGold"),
  enemyDropsEnabled: document.querySelector("#enemyDropsEnabled"),
  enemyDropChance: document.querySelector("#enemyDropChance"),
  enemyDropRarityChance: document.querySelector("#enemyDropRarityChance"),
  bossRoomEnabled: document.querySelector("#bossRoomEnabled"),
  bossName: document.querySelector("#bossName"),
  bossSize: document.querySelector("#bossSize"),
  bossAttack: document.querySelector("#bossAttack"),
  bossRoomShape: document.querySelector("#bossRoomShape"),
  bossRoomWidth: document.querySelector("#bossRoomWidth"),
  bossRoomHeight: document.querySelector("#bossRoomHeight"),
  bossBehavior: document.querySelector("#bossBehavior"),
  soundPackMode: document.querySelector("#soundPackMode"),
  runLogShowNumbers: document.querySelector("#runLogShowNumbers"),
  runLogHighlightDamage: document.querySelector("#runLogHighlightDamage"),
  runLogHighlightEnemies: document.querySelector("#runLogHighlightEnemies"),
  runLogShowItemIcons: document.querySelector("#runLogShowItemIcons"),
  runLogShowTurnDividers: document.querySelector("#runLogShowTurnDividers"),
  levelingEnabled: document.querySelector("#levelingEnabled"),
  levelHpEnabled: document.querySelector("#levelHpEnabled"),
  levelHpValue: document.querySelector("#levelHpValue"),
  levelAttackEnabled: document.querySelector("#levelAttackEnabled"),
  levelAttackValue: document.querySelector("#levelAttackValue"),
  levelDefenseEnabled: document.querySelector("#levelDefenseEnabled"),
  levelDefenseValue: document.querySelector("#levelDefenseValue"),
  levelAccuracyEnabled: document.querySelector("#levelAccuracyEnabled"),
  levelAccuracyValue: document.querySelector("#levelAccuracyValue"),
  levelHungerEnabled: document.querySelector("#levelHungerEnabled"),
  levelHungerValue: document.querySelector("#levelHungerValue"),
  levelGoldEnabled: document.querySelector("#levelGoldEnabled"),
  levelGoldValue: document.querySelector("#levelGoldValue"),
  goalType: document.querySelector("#goalType"),
  goalCount: document.querySelector("#goalCount"),
  goalTarget: document.querySelector("#goalTarget"),
  goalNeedExit: document.querySelector("#goalNeedExit"),
  startLeftHand: document.querySelector("#startLeftHand"),
  startLeftHandRarity: document.querySelector("#startLeftHandRarity"),
  startLeftHandCursed: document.querySelector("#startLeftHandCursed"),
  startRightHand: document.querySelector("#startRightHand"),
  startRightHandRarity: document.querySelector("#startRightHandRarity"),
  startRightHandCursed: document.querySelector("#startRightHandCursed"),
  startBracelet1: document.querySelector("#startBracelet1"),
  startBracelet1Cursed: document.querySelector("#startBracelet1Cursed"),
  startBracelet2: document.querySelector("#startBracelet2"),
  startBracelet2Cursed: document.querySelector("#startBracelet2Cursed"),
};

const outputs = {
  floors: document.querySelector("#floorsOut"),
  roomCount: document.querySelector("#roomCountOut"),
  monsterRate: document.querySelector("#monsterRateOut"),
  monsterRespawnRate: document.querySelector("#monsterRespawnRateOut"),
  difficulty: document.querySelector("#difficultyOut"),
  itemRate: document.querySelector("#itemRateOut"),
  rareRate: document.querySelector("#rareRateOut"),
  curseRate: document.querySelector("#curseRateOut"),
  blessedRate: document.querySelector("#blessedRateOut"),
  trapRate: document.querySelector("#trapRateOut"),
  sigilRate: document.querySelector("#sigilRateOut"),
  goldRate: document.querySelector("#goldRateOut"),
  inventoryLimit: document.querySelector("#inventoryLimitOut"),
  monsterLimit: document.querySelector("#monsterLimitOut"),
  hungerDrainRate: document.querySelector("#hungerDrainRateOut"),
  bossBehavior: document.querySelector("#bossBehaviorOut"),
};

const board = document.querySelector("#board");
const boardStage = board.closest(".board-stage");
const endScreen = document.querySelector("#endScreen");
const endScreenTitle = document.querySelector("#endScreenTitle");
const endScreenSubtitle = document.querySelector("#endScreenSubtitle");
const endScreenStats = document.querySelector("#endScreenStats");
const endScreenReplayButton = document.querySelector("#endScreenReplayButton");
const endScreenSurpriseButton = document.querySelector("#endScreenSurpriseButton");
const floorLabel = document.querySelector("#floorLabel");
const floorHudLabel = document.querySelector("#floorHudLabel");
const statusLabel = document.querySelector("#statusLabel");
const hpLabel = document.querySelector("#hpLabel");
const attackLabel = document.querySelector("#attackLabel");
const defenseLabel = document.querySelector("#defenseLabel");
const goldLabel = document.querySelector("#goldLabel");
const levelHud = document.querySelector("#levelHud");
const xpHud = document.querySelector("#xpHud");
const levelLabel = document.querySelector("#levelLabel");
const xpLabel = document.querySelector("#xpLabel");
const hungerHud = document.querySelector("#hungerHud");
const hungerLabel = document.querySelector("#hungerLabel");
const hungerControls = document.querySelector("#hungerControls");
const unidentifiedControls = document.querySelector("#unidentifiedControls");
const customEnvironmentControls = document.querySelector("#customEnvironmentControls");
const environmentStageList = document.querySelector("#environmentStageList");
const addEnvironmentStageButton = document.querySelector("#addEnvironmentStageButton");
const addCustomEnvironmentButton = document.querySelector("#addCustomEnvironmentButton");
const customEnvironmentLibraryList = document.querySelector("#customEnvironmentLibraryList");
const floorEffectLabel = document.querySelector("#floorEffectLabel");
const goalLabel = document.querySelector("#goalLabel");
const levelingControls = document.querySelector("#levelingControls");
const levelingTableBody = document.querySelector("#levelingTableBody");
const bossRoomControls = document.querySelector("#bossRoomControls");
const bossAttackList = document.querySelector("#bossAttackList");
const bossAttackAddButton = document.querySelector("#bossAttackAddButton");
const goalCountLabel = document.querySelector("#goalCountLabel");
const goalTargetLabel = document.querySelector("#goalTargetLabel");
const goalCountWrap = document.querySelector("#goalCountWrap");
const goalTargetWrap = document.querySelector("#goalTargetWrap");
const goalNeedExitWrap = document.querySelector("#goalNeedExitWrap");
const inventoryMenu = document.querySelector("#inventoryMenu");
const equipmentList = document.querySelector("#equipmentList");
const inventorySortButton = document.querySelector("#inventorySortButton");
const inventoryCountLabel = document.querySelector("#inventoryCountLabel");
const floorItemSection = document.querySelector("#floorItemSection");
const floorItemList = document.querySelector("#floorItemList");
const shopSellSection = document.querySelector("#shopSellSection");
const shopSellList = document.querySelector("#shopSellList");
const gamblingSection = document.querySelector("#gamblingSection");
const gamblingList = document.querySelector("#gamblingList");
const upgradeChoiceSection = document.querySelector("#upgradeChoiceSection");
const upgradeChoiceList = document.querySelector("#upgradeChoiceList");
const stringActionSection = document.querySelector("#stringActionSection");
const stringActionList = document.querySelector("#stringActionList");
const inventoryList = document.querySelector("#inventoryList");
const environmentalEffectsList = document.querySelector("#environmentalEffectsList");
const specialRoomList = document.querySelector("#specialRoomList");
const itemPoolList = document.querySelector("#itemPoolList");
const runePoolList = document.querySelector("#runePoolList");
const runeAddButton = document.querySelector("#runeAddButton");
const runeEnableAll = document.querySelector("#runeEnableAll");
const specialAttackList = document.querySelector("#specialAttackList");
const specialAttackAddButton = document.querySelector("#specialAttackAddButton");
const specialAttackEnableAll = document.querySelector("#specialAttackEnableAll");
const trapPoolList = document.querySelector("#trapPoolList");
const trapAddButton = document.querySelector("#trapAddButton");
const trapEnableAll = document.querySelector("#trapEnableAll");
const trapsVisibleEnabled = document.querySelector("#trapsVisibleEnabled");
const sigilPoolList = document.querySelector("#sigilPoolList");
const sigilAddButton = document.querySelector("#sigilAddButton");
const sigilEnableAll = document.querySelector("#sigilEnableAll");
const sigilsVisibleEnabled = document.querySelector("#sigilsVisibleEnabled");
const enemyPoolList = document.querySelector("#enemyPoolList");
const enemyDropCategories = document.querySelector("#enemyDropCategories");
const enemyDropDetails = document.querySelector("#enemyDropDetails");
const enemyAddButton = document.querySelector("#enemyAddButton");
const enemyTypeList = document.querySelector("#enemyTypeList");
const enemyTypeAddButton = document.querySelector("#enemyTypeAddButton");
const soundEffectList = document.querySelector("#soundEffectList");
const soundPackCustomControls = document.querySelector("#soundPackCustomControls");
const soundPackNote = document.querySelector("#soundPackNote");
const publishButton = document.querySelector("#publishButton");
const publishedCount = document.querySelector("#publishedCount");
const publishedList = document.querySelector("#publishedList");
const shareCode = document.querySelector("#shareCode");
const exportPackageButton = document.querySelector("#exportPackageButton");
const importPackageButton = document.querySelector("#importPackageButton");
const importPackageInput = document.querySelector("#importPackageInput");
const logList = document.querySelector("#log");
const startingInventoryList = document.querySelector("#startingInventoryList");
const rarityList = document.querySelector("#rarityList");
const appShell = document.querySelector(".app-shell");
const hideRecipeButton = document.querySelector("#hideRecipeButton");
const extendRecipeButton = document.querySelector("#extendRecipeButton");
const showRecipeButton = document.querySelector("#showRecipeButton");
const showGameButton = document.querySelector("#showGameButton");
let draggedInventoryIndex = null;
const animationEpochMs = Date.now();
let publishedDungeonCache = [];
let publishedDungeonStoragePromise = null;

const soundEffectDefinitions = [
  { id: "themeMusic", label: "Theme Music", defaultFileName: "theme.mp3", defaultPath: "./audio/theme.mp3" },
  { id: "playerAttack", label: "Player Attack", defaultFileName: "player attack.wav", defaultPath: "./audio/player attack.wav" },
  { id: "enemyAttack", label: "Enemy Attack", defaultFileName: "enemy attack.wav", defaultPath: "./audio/enemy attack.wav" },
  { id: "specialAttack", label: "Special Attack", defaultFileName: "special attack.wav", defaultPath: "./audio/special attack.wav" },
  { id: "staffCast", label: "Staff Cast", defaultFileName: "staff cast.wav", defaultPath: "./audio/staff cast.wav" },
  { id: "itemUse", label: "Item Use", defaultFileName: "item use.wav", defaultPath: "./audio/item use.wav" },
  { id: "itemPickup", label: "Item Pickup", defaultFileName: "item pickup.wav", defaultPath: "./audio/item pickup.wav" },
  { id: "itemDrop", label: "Item Drop", defaultFileName: "item drop.wav", defaultPath: "./audio/item drop.wav" },
  { id: "equipItem", label: "Equip Item", defaultFileName: "equip item.wav", defaultPath: "./audio/equip item.wav" },
  { id: "unequipItem", label: "Unequip Item", defaultFileName: "unequip item.wav", defaultPath: "./audio/unequip item.wav" },
  { id: "goldPickup", label: "Gold Pickup", defaultFileName: "gold pickup.wav", defaultPath: "./audio/gold pickup.wav" },
  { id: "trapTrigger", label: "Trap Trigger", defaultFileName: "trap trigger.wav", defaultPath: "./audio/trap trigger.wav" },
  { id: "sigilTrigger", label: "Sigil Trigger", defaultFileName: "sigil trigger.wav", defaultPath: "./audio/sigil trigger.wav" },
  { id: "stairsDescend", label: "Stairs / Floor Change", defaultFileName: "stairs.wav", defaultPath: "./audio/stairs.wav" },
  { id: "monsterDefeat", label: "Monster Defeated", defaultFileName: "monster defeated.wav", defaultPath: "./audio/monster defeated.wav" },
  { id: "shopBuy", label: "Shop Buy", defaultFileName: "shop buy.wav", defaultPath: "./audio/shop buy.wav" },
  { id: "shopSell", label: "Shop Sell", defaultFileName: "shop sell.wav", defaultPath: "./audio/shop sell.wav" },
  { id: "gambleBet", label: "Gambling Totem", defaultFileName: "gambling totem.wav", defaultPath: "./audio/gambling totem.wav" },
  { id: "playerDeath", label: "Player Death", defaultFileName: "player death.wav", defaultPath: "./audio/player death.wav" },
  { id: "dungeonClear", label: "Dungeon Clear", defaultFileName: "dungeon clear.wav", defaultPath: "./audio/dungeon clear.wav" },
];
const liveSoundEffects = new Set();
let activeThemeAudio = null;

const itemDefinitions = {
  dagger: { name: "Short Sword", kind: "hand", handType: "sword", attack: 2, rarity: "common", sellValue: 60 },
  ironSword: { name: "Iron Sword", kind: "hand", handType: "sword", attack: 3, rarity: "uncommon", sellValue: 95 },
  royalSword: { name: "Royal Sword", kind: "hand", handType: "sword", attack: 3, rarity: "rare", sellValue: 130 },
  shield: { name: "Wood Shield", kind: "hand", handType: "shield", defense: 2, rarity: "common", sellValue: 55 },
  buckler: { name: "Buckler", kind: "hand", handType: "shield", defense: 3, rarity: "uncommon", sellValue: 85 },
  towerShield: { name: "Tower Shield", kind: "hand", handType: "shield", defense: 3, rarity: "rare", sellValue: 125 },
  fireStaff: { name: "Fire Staff", kind: "staff", element: "fire", attack: 5, charges: 4, sellValue: 110 },
  waterStaff: { name: "Water Staff", kind: "staff", element: "water", attack: 4, charges: 5, sellValue: 105 },
  lightningStaff: { name: "Lightning Staff", kind: "staff", element: "lightning", attack: 6, charges: 3, sellValue: 120 },
  bitterGrass: { name: "Bitter Grass", kind: "grass", heal: 8, attackBuff: 0, defenseBuff: 0, duration: 12, sellValue: 24 },
  emberGrass: { name: "Ember Grass", kind: "grass", heal: 0, attackBuff: 2, defenseBuff: 0, duration: 18, sellValue: 28 },
  mossGrass: { name: "Moss Grass", kind: "grass", heal: 3, attackBuff: 0, defenseBuff: 1, duration: 12, sellValue: 26 },
  apple: { name: "Apple", kind: "food", hungerFill: 20, sellValue: 18 },
  ration: { name: "Travel Ration", kind: "food", hungerFill: 35, sellValue: 28 },
  feastRice: { name: "Feast Rice Ball", kind: "food", hungerFill: 55, sellValue: 42 },
  uncurseScroll: { name: "Scroll of Release", kind: "scroll", scrollEffect: "uncurse", scrollAmount: 1, sellValue: 70 },
  swordScroll: { name: "Scroll of Edge", kind: "scroll", scrollEffect: "upgradeSword", scrollAmount: 1, sellValue: 85 },
  shieldScroll: { name: "Scroll of Wall", kind: "scroll", scrollEffect: "upgradeShield", scrollAmount: 1, sellValue: 85 },
  trapScroll: { name: "Scroll of Purging", kind: "scroll", scrollEffect: "clearTraps", scrollAmount: 99, sellValue: 78 },
  hopeBox: { name: "Hope Box", kind: "utility", explosionPercent: 20, eligibleCategories: ["weapons", "shields", "staffs", "bracelets", "grass", "food", "scrolls", "utility"], sellValue: 66 },
  preservationString: { name: "Preservation String", kind: "string", stringEffect: "preservation", uses: 5, sellValue: 70, buyValue: 160 },
  synthesisString: { name: "Synthesis String", kind: "string", stringEffect: "synthesis", uses: 2, sellValue: 85, buyValue: 210 },
  cashingString: { name: "Cashing String", kind: "string", stringEffect: "cashing", uses: 3, sellValue: 78, buyValue: 190 },
  trapguardBracelet: { name: "Trapguard Bracelet", kind: "bracelet", negateTraps: true, maxHpBonus: 0, sellValue: 95 },
  vitalityBracelet: { name: "Vitality Bracelet", kind: "bracelet", negateTraps: false, maxHpBonus: 15, sellValue: 120 },
  hagglingBracelet: { name: "Haggling Bracelet", kind: "bracelet", effects: [{ enabled: true, type: "shopDiscount", value: 50, extra: 0 }], sellValue: 92 },
  trapmoreBracelet: { name: "Trapmore Bracelet", kind: "bracelet", effects: [{ enabled: true, type: "trapmore", value: 6, extra: 0 }], sellValue: 90 },
  monstercallBracelet: { name: "Monstercall Bracelet", kind: "bracelet", effects: [{ enabled: true, type: "monstercall", value: 100, extra: 0 }], sellValue: 88 },
  goldLosingBracelet: { name: "Gold-losing Bracelet", kind: "bracelet", effects: [{ enabled: true, type: "goldLosing", value: 7, extra: 20 }], sellValue: 78 },
  itemLosingBracelet: { name: "Item-losing Bracelet", kind: "bracelet", effects: [{ enabled: true, type: "itemLosing", value: 9, extra: 0 }], sellValue: 76 },
  tiptoeBracelet: { name: "Tiptoe Bracelet", kind: "bracelet", effects: [{ enabled: true, type: "tiptoe", value: 1, extra: 0 }], sellValue: 98 },
  wallpassBracelet: { name: "Wallpass Bracelet", kind: "bracelet", effects: [{ enabled: true, type: "wallPass", value: 4, extra: 0 }], sellValue: 110 },
  daredevilBracelet: { name: "Daredevil Bracelet", kind: "bracelet", effects: [{ enabled: true, type: "daredevil", value: 22, extra: 1.5 }], sellValue: 102 },
  cursebreakBracelet: { name: "Cursebreak Bracelet", kind: "bracelet", effects: [{ enabled: true, type: "cursebreak", value: 1, extra: 0 }], sellValue: 108 },
  rustproofBracelet: { name: "Rustproof Bracelet", kind: "bracelet", effects: [{ enabled: true, type: "rustproof", value: 1, extra: 0 }], sellValue: 106 },
  fortuneBracelet: { name: "Fortune Bracelet", kind: "bracelet", effects: [{ enabled: true, type: "fortune", value: 1, extra: 0 }], sellValue: 100 },
  bellyshrinkBracelet: { name: "Bellyshrink Bracelet", kind: "bracelet", effects: [{ enabled: true, type: "maxHungerBonus", value: -25, extra: 0 }], sellValue: 68 },
  bellyexpandBracelet: { name: "Bellyexpand Bracelet", kind: "bracelet", effects: [{ enabled: true, type: "maxHungerBonus", value: 25, extra: 0 }], sellValue: 96 },
  strengthBracelet: { name: "Strength Bracelet", kind: "bracelet", effects: [{ enabled: true, type: "strengthBonus", value: 3, extra: 0 }], sellValue: 104 },
  goldBundle: { name: "Gold Coins", kind: "gold", gold: 10 },
};

const monsterFamilyDefinitions = {
  goblin: {
    name: "Goblin Family",
    glyph: "g",
    levels: [
      { level: 1, name: "Goblin", hp: 6, attack: 3, defense: 0, xp: 4 },
      { level: 2, name: "Goblin Veteran", hp: 10, attack: 5, defense: 1, xp: 8 },
      { level: 3, name: "Goblin Captain", hp: 15, attack: 7, defense: 3, xp: 14 },
      { level: 4, name: "Goblin King", hp: 22, attack: 10, defense: 5, xp: 22 },
    ],
  },
  ooze: {
    name: "Ooze Family",
    glyph: "o",
    levels: [
      { level: 1, name: "Ooze", hp: 8, attack: 2, defense: 1, xp: 4 },
      { level: 2, name: "Great Ooze", hp: 12, attack: 4, defense: 2, xp: 8 },
      { level: 3, name: "Acid Ooze", hp: 18, attack: 6, defense: 4, xp: 14 },
      { level: 4, name: "Abyss Ooze", hp: 25, attack: 9, defense: 6, xp: 22 },
    ],
  },
  bat: {
    name: "Bat Family",
    glyph: "b",
    levels: [
      { level: 1, name: "Bat", hp: 4, attack: 2, defense: 0, xp: 3 },
      { level: 2, name: "Fang Bat", hp: 7, attack: 4, defense: 1, xp: 6 },
      { level: 3, name: "Night Bat", hp: 11, attack: 6, defense: 2, xp: 11 },
      { level: 4, name: "Dread Bat", hp: 16, attack: 9, defense: 4, xp: 18 },
    ],
  },
  emberImp: {
    name: "Ember Imp Family",
    glyph: "i",
    levels: [
      { level: 1, name: "Ember Imp", hp: 7, attack: 4, defense: 0, xp: 5 },
      { level: 2, name: "Cinder Imp", hp: 11, attack: 6, defense: 1, xp: 9 },
      { level: 3, name: "Blaze Imp", hp: 16, attack: 8, defense: 3, xp: 15 },
      { level: 4, name: "Inferno Imp", hp: 22, attack: 11, defense: 5, xp: 24 },
    ],
  },
  frostWisp: {
    name: "Frost Wisp Family",
    glyph: "w",
    levels: [
      { level: 1, name: "Frost Wisp", hp: 6, attack: 3, defense: 2, xp: 5 },
      { level: 2, name: "Chill Wisp", hp: 10, attack: 5, defense: 3, xp: 9 },
      { level: 3, name: "Glacier Wisp", hp: 15, attack: 7, defense: 5, xp: 15 },
      { level: 4, name: "Aurora Wisp", hp: 21, attack: 10, defense: 7, xp: 24 },
    ],
  },
  mushroomBrute: {
    name: "Mushroom Brute Family",
    glyph: "M",
    levels: [
      { level: 1, name: "Mushroom Brute", hp: 10, attack: 4, defense: 1, xp: 6 },
      { level: 2, name: "Spore Brute", hp: 14, attack: 6, defense: 3, xp: 10 },
      { level: 3, name: "Rot Brute", hp: 20, attack: 8, defense: 5, xp: 17 },
      { level: 4, name: "Mycelial Titan", hp: 28, attack: 11, defense: 8, xp: 28 },
    ],
  },
};

const environmentMonsterFamilies = {
  ruins: ["goblin", "bat", "ooze"],
  fungal: ["ooze", "mushroomBrute", "bat"],
  ember: ["emberImp", "goblin", "ooze"],
  frost: ["frostWisp", "bat", "goblin"],
  cosmic: ["frostWisp", "emberImp", "bat"],
  beach: ["bat", "ooze", "goblin"],
  ghastly: ["frostWisp", "ooze", "bat"],
  shadow: ["mushroomBrute", "bat", "goblin"],
  underwater: ["ooze", "bat", "frostWisp"],
  swamp: ["ooze", "mushroomBrute", "goblin"],
  depths: ["bat", "frostWisp", "ooze"],
  blood: ["emberImp", "bat", "goblin"],
};

const defaultRarityRules = [
  { id: "uncommon", name: "Uncommon", enabled: true, multiplier: 1.5, color: "#72b7c9", effect: "none", bonusRunes: 1, locked: true },
  { id: "rare", name: "Rare", enabled: true, multiplier: 2.625, color: "#f4b942", effect: "pulse", bonusRunes: 2, locked: true },
];

const rarityEffectOptions = [
  { id: "none", label: "None" },
  { id: "pulse", label: "Pulse" },
  { id: "phase", label: "Phase" },
  { id: "fog", label: "Fog" },
  { id: "shimmer", label: "Shimmer" },
  { id: "surge", label: "Surge" },
  { id: "flicker", label: "Flicker" },
  { id: "bloom", label: "Bloom" },
];

const itemCategories = [
  { id: "weapons", name: "Weapons", filter: (item) => item.kind === "hand" && item.handType === "sword" },
  { id: "shields", name: "Shields", filter: (item) => item.kind === "hand" && item.handType === "shield" },
  { id: "staffs", name: "Staffs", filter: (item) => item.kind === "staff" },
  { id: "bracelets", name: "Bracelets", filter: (item) => item.kind === "bracelet" },
  { id: "grass", name: "Grass", filter: (item) => item.kind === "grass" },
  { id: "food", name: "Food", filter: (item) => item.kind === "food" },
  { id: "scrolls", name: "Scrolls", filter: (item) => item.kind === "scroll" },
  { id: "strings", name: "Strings", filter: (item) => item.kind === "string" },
  { id: "utility", name: "Utility", filter: (item) => item.kind === "utility" },
];

const defaultRuneRules = [
  { id: "criticalRune", name: "Critical Rune", effectType: "critical", enabled: true, critChance: 30, critMultiplier: 1.5 },
  { id: "healingRune", name: "Healing Rune", effectType: "healing", enabled: true, healPercent: 10 },
  { id: "antiMonsterRune", name: "Anti-Monster Rune", effectType: "antiMonster", enabled: true, targetTypeId: "", bonusMultiplier: 1.5 },
  { id: "rustproofRune", name: "Rustproof Rune", effectType: "rustproof", enabled: true },
  { id: "dullingRune", name: "Dulling Rune", effectType: "dulling", enabled: true, dullAmount: 1 },
  { id: "cursedMightRune", name: "Cursed Might Rune", effectType: "cursedMight", enabled: true, curseBonus: 1 },
  { id: "driedBonitoRune", name: "Dried Bonito Rune", effectType: "driedBonito", enabled: true, nibbleHunger: 20, nibblePenalty: 1 },
  { id: "trapFindingRune", name: "Trap Finding Rune", effectType: "trapFinding", enabled: true },
  { id: "trapBustRune", name: "Trap Bust Rune", effectType: "trapBust", enabled: true },
  { id: "wallDigRune", name: "Wall Dig Rune", effectType: "wallDig", enabled: true },
  { id: "criticalAt7Rune", name: "Critical at X Rune", effectType: "criticalAt7", enabled: true, criticalDigit: 7 },
  { id: "quintessenceRune", name: "Quintessence Rune", effectType: "quintessence", enabled: true },
  { id: "thirdStrikeRune", name: "Third Strike Rune", effectType: "thirdStrike", enabled: true },
  { id: "voraciousHitRune", name: "Voracious Hit Rune", effectType: "voraciousHit", enabled: true, hungerCost: 2, bonusMultiplier: 1.5 },
  { id: "costlyHitRune", name: "Costly Hit Rune", effectType: "costlyHit", enabled: true, goldCost: 100, bonusMultiplier: 1.5 },
  { id: "knockbackRune", name: "Knockback Rune", effectType: "knockback", enabled: true, knockbackChance: 53.7 },
  { id: "frontalAttackRune", name: "Frontal Attack Rune", effectType: "frontalAttack", enabled: true },
  { id: "accurateRune", name: "Accurate Rune", effectType: "accurate", enabled: true },
  { id: "flameShotRune", name: "Flame Shot Rune", effectType: "flameShot", enabled: true, flameDamage: 10 },
  { id: "swiftStrikesRune", name: "Swift Strikes Rune", effectType: "swiftStrikes", enabled: true, swiftChance: 25, swiftPower: 0.5 },
  { id: "swordDullingRune", name: "Sword Dulling Rune", effectType: "swordDulling", enabled: true, dullAmount: 1 },
  { id: "shieldDullingRune", name: "Shield Dulling Rune", effectType: "shieldDulling", enabled: true, dullAmount: 1 },
  { id: "hpPlusRune", name: "HP+ Rune", effectType: "hpPlus", enabled: true, hpBonus: 5 },
  { id: "dangerPowerRune", name: "Danger Power Rune", effectType: "dangerPower", enabled: true, lowHpPercent: 25, bonusMultiplier: 1.5 },
  { id: "hungerPowerRune", name: "Hunger Power Rune", effectType: "hungerPower", enabled: true, bonusMultiplier: 2 },
  { id: "thunderboltRune", name: "Thunderbolt Rune", effectType: "thunderbolt", enabled: true, thunderChance: 22.5, thunderDamage: 20 },
  { id: "sideAttackRune", name: "Side Attack Rune", effectType: "sideAttack", enabled: true },
  { id: "backAttackRune", name: "Back Attack Rune", effectType: "backAttack", enabled: true },
  { id: "toughAtXRune", name: "Tough at X Rune", effectType: "toughAtX", enabled: true, toughDigit: 7, toughReducePercent: 30 },
  { id: "trapProofRune", name: "Trap-proof Rune", effectType: "trapProof", enabled: true, trapNullifyChance: 30 },
  { id: "satingRune", name: "Sating Rune", effectType: "sating", enabled: true },
  { id: "fullArmorRune", name: "Full Armor Rune", effectType: "fullArmor", enabled: true, fullHpBlockPercent: 50 },
  { id: "gutsRune", name: "Guts Rune", effectType: "guts", enabled: true, gutsChance: 30 },
  { id: "voraciousBlockRune", name: "Voracious Block Rune", effectType: "voraciousBlock", enabled: true, hungerCost: 2, blockPercent: 30 },
  { id: "costlyBlockRune", name: "Costly Block Rune", effectType: "costlyBlock", enabled: true, goldCost: 100, blockPercent: 30 },
  { id: "critproofRune", name: "Critproof Rune", effectType: "critproof", enabled: true, critproofPercent: 55 },
  { id: "antiMonsterGuardRune", name: "Anti-Monster Guard Rune", effectType: "antiMonsterGuard", enabled: true, targetTypeId: "", blockPercent: 50 },
  { id: "keenRune", name: "Keen Rune", effectType: "keen", enabled: true, evadeChance: 23 },
  { id: "leapPaybackRune", name: "Leap Payback Rune", effectType: "leapPayback", enabled: true, paybackChance: 10 },
  { id: "shadowPaybackRune", name: "Shadow Payback Rune", effectType: "shadowPayback", enabled: true, paybackChance: 20 },
  { id: "retributionRune", name: "Retribution Rune", effectType: "retribution", enabled: true, reflectPercent: 50 },
];

const defaultSpecialAttackRules = [];

const unknownItemNameSyllables = [
  "ba", "bel", "cor", "dra", "el", "fen", "gor", "hal", "iv", "jor", "kel", "lor",
  "mor", "nel", "or", "pra", "quil", "rin", "sor", "tor", "ul", "vor", "wen", "yor", "zen",
];

const environmentalEffectDefinitions = {
  noPickup: {
    name: "Unable to Pick Up Items",
    description: "Items on this floor cannot be picked up by affected sides.",
  },
  doubleDamage: {
    name: "Damage Is Doubled",
    description: "Incoming damage is doubled for affected sides.",
  },
  halfDamage: {
    name: "Damage Is Halved",
    description: "Incoming damage is halved for affected sides.",
  },
  randomWarp: {
    name: "Random Warp",
    description: "Affected sides are warped at set turn intervals.",
  },
  randomItemDrop: {
    name: "Random Item Drop",
    description: "Affected sides drop a random carried item at set turn intervals.",
  },
  conditionalItemUse: {
    name: "Conditional Item Use",
    description: "A selected item or item category keys off a chosen player or item condition.",
  },
};

const conditionalItemUseConditionDefinitions = [
  { id: "hpBecomes", label: "HP Becomes", kind: "number", min: 0, max: 999, step: 1, defaultValue: 10 },
  { id: "maxHpBecomes", label: "Max HP Becomes", kind: "number", min: 1, max: 999, step: 1, defaultValue: 30 },
  { id: "hungerBecomes", label: "Hunger Becomes", kind: "number", min: 0, max: 999, step: 1, defaultValue: 20 },
  { id: "maxHungerBecomes", label: "Max Hunger Becomes", kind: "number", min: 1, max: 999, step: 1, defaultValue: 100 },
  { id: "goldBecomes", label: "Gold Becomes", kind: "number", min: -99999, max: 99999, step: 1, defaultValue: 0 },
  { id: "inventorySpaceBecomes", label: "Inventory Space Becomes", kind: "number", min: 1, max: 99, step: 1, defaultValue: 12 },
  { id: "itemCursedBecomes", label: "Item Cursed Becomes", kind: "boolean", defaultBool: true },
  { id: "itemBlessedBecomes", label: "Item Blessed Becomes", kind: "boolean", defaultBool: true },
  { id: "itemIdentifiedBecomes", label: "Item Identified Becomes", kind: "boolean", defaultBool: true },
  { id: "itemUpgradeBecomes", label: "Item Upgrade Becomes", kind: "number", min: -99, max: 99, step: 1, defaultValue: 0 },
  { id: "itemChargesBecome", label: "Item Charges Become", kind: "number", min: 0, max: 99, step: 1, defaultValue: 0 },
  { id: "itemAttackBecomes", label: "Item Attack Becomes", kind: "number", min: 0, max: 999, step: 1, defaultValue: 1 },
  { id: "itemDefenseBecomes", label: "Item Defense Becomes", kind: "number", min: 0, max: 999, step: 1, defaultValue: 1 },
];

const specialRoomDefinitions = {
  shopkeeper: {
    id: "shopkeeper",
    name: "Shopkeeper",
    description: "Stocks items for sale. Stand on a shop item and use the Floor action to buy it with gold.",
    glyph: "$",
  },
  monsterHouse: {
    id: "monsterHouse",
    name: "Monster House",
    description: "When entered, floods the room with extra monsters, items, and traps.",
    glyph: "",
  },
  gamblingRoom: {
    id: "gamblingRoom",
    name: "Gambling Room",
    description: "A reusable totem lets you bet gold for a chance to multiply it.",
    glyph: "T",
  },
  darkRoom: {
    id: "darkRoom",
    name: "Dark Room",
    description: "The room never fully lights up on entry. You must explore it tile by tile to reveal its shape.",
    glyph: "D",
  },
};

const goalTemplateDefinitions = {
  escape: {
    countLabel: "",
    targetLabel: "",
  },
  kill: {
    countLabel: "Enemies Required",
    targetLabel: "Target Enemy",
  },
  obtain: {
    countLabel: "Items Required",
    targetLabel: "Target Item",
  },
  gold: {
    countLabel: "Gold Required",
    targetLabel: "",
  },
};

const trapEffectOptions = [
  { id: "damage", label: "Damage" },
  { id: "hunger", label: "Hunger Loss" },
  { id: "attackDebuff", label: "Attack Down" },
  { id: "defenseDebuff", label: "Defense Down" },
  { id: "loseRandomItem", label: "Lose Random Item" },
  { id: "warp", label: "Warp" },
];

const defaultTrapRules = [
  { id: "blastTrap", name: "Blast Trap", enabled: true, effectType: "damage", value1: 3, value2: 0, uses: 1, design: "caret", locked: true },
  { id: "famishTrap", name: "Famish Trap", enabled: true, effectType: "hunger", value1: 18, value2: 0, uses: 1, design: "caret", locked: true },
  { id: "sporeTrap", name: "Spore Trap", enabled: true, effectType: "attackDebuff", value1: 2, value2: 8, uses: 1, design: "caret", locked: true },
  { id: "warpTrap", name: "Warp Trap", enabled: true, effectType: "warp", value1: 0, value2: 0, uses: 1, design: "caret", locked: true },
  { id: "emberFloorTrap", name: "Ember Floor", enabled: true, effectType: "damage", value1: 1, value2: 0, uses: 999, design: "lava", locked: true, environmentOnly: true, environmentId: "ember" },
  { id: "fungalSporeFloorTrap", name: "Spore Floor", enabled: true, effectType: "attackDebuff", value1: 1, value2: 6, uses: 999, design: "fungus", locked: true, environmentOnly: true, environmentId: "fungal" },
  { id: "cosmicHoleTrap", name: "Cosmic Hole", enabled: true, effectType: "loseRandomItem", value1: 1, value2: 0, uses: 999, design: "hole", locked: true, environmentOnly: true, environmentId: "cosmic" },
];

const sigilEffectOptions = [
  { id: "heal", label: "Restore HP" },
  { id: "maxHp", label: "Raise Max HP" },
  { id: "attackBuff", label: "Boost Attack Temp" },
  { id: "attackUp", label: "Increase Attack" },
  { id: "defenseBuff", label: "Boost Defense Temp" },
  { id: "defenseUp", label: "Increase Defense" },
  { id: "hunger", label: "Restore Hunger" },
  { id: "maxHunger", label: "Increase Max Hunger" },
  { id: "inventoryUp", label: "Increase Inventory Slots" },
];

const defaultSigilRules = [
  { id: "healingSigil", name: "Healing Sigil", enabled: true, effectType: "heal", value1: 8, value2: 0, uses: 2, locked: true },
  { id: "vitalSigil", name: "Vital Sigil", enabled: true, effectType: "maxHp", value1: 4, value2: 0, uses: 2, locked: true },
  { id: "furySigil", name: "Fury Sigil", enabled: true, effectType: "attackBuff", value1: 2, value2: 12, uses: 2, locked: true },
  { id: "powerSigil", name: "Power Sigil", enabled: true, effectType: "attackUp", value1: 1, value2: 0, uses: 2, locked: true },
  { id: "guardSigil", name: "Guard Sigil", enabled: true, effectType: "defenseBuff", value1: 2, value2: 12, uses: 2, locked: true },
  { id: "bulwarkSigil", name: "Bulwark Sigil", enabled: true, effectType: "defenseUp", value1: 1, value2: 0, uses: 2, locked: true },
  { id: "mealSigil", name: "Meal Sigil", enabled: true, effectType: "hunger", value1: 20, value2: 0, uses: 2, locked: true },
  { id: "feastSigil", name: "Feast Sigil", enabled: true, effectType: "maxHunger", value1: 10, value2: 0, uses: 2, locked: true },
  { id: "packSigil", name: "Pack Sigil", enabled: true, effectType: "inventoryUp", value1: 1, value2: 0, uses: 2, locked: true },
];

const game = {
  recipe: null,
  floor: 1,
  hp: 20,
  inventory: [],
  equipment: {
    leftHand: null,
    rightHand: null,
    bracelet1: null,
    bracelet2: null,
  },
  buffs: [],
  gold: 0,
  activePublishedId: null,
  currentEnvironmentalEffect: null,
  floorEnvironmentId: "ruins",
  specialRooms: [],
  hunger: 100,
  hungerMax: 100,
  hungerStepCounter: 0,
  tiles: [],
  rooms: [],
  floorWidth: VIEW_WIDTH,
  floorHeight: VIEW_HEIGHT,
  revealed: [],
  visible: [],
  viewport: { x: 0, y: 0 },
  player: { x: 1, y: 1 },
  pendingCast: null,
  pendingSpecialAttack: null,
  projectile: null,
  animatingProjectile: false,
  animatingMelee: false,
  attackFx: null,
  hitFx: null,
  playerHitStreak: 0,
  playerMissStreak: 0,
  playerWalkSteps: 0,
  logSequence: 0,
  logEventCounter: 0,
  processingTurn: false,
  lastRunLogDividerTurn: null,
  runStats: null,
  lastRunSummary: null,
  goalSatisfied: false,
  passiveHealBlockedThisTurn: false,
  reviveCharges: 0,
  identifiedItemIds: new Set(),
  usedUnknownItemNames: new Set(),
  pendingUpgradeChoice: null,
  pendingStringAction: null,
  editingEquipmentNameSlot: null,
  monsterRespawnCharge: 0,
  lastMonsterRespawnRoomId: null,
  level: 1,
  xp: 0,
  levelBonuses: {
    hp: 0,
    attack: 0,
    defense: 0,
    accuracy: 0,
    hunger: 0,
  },
  permanentBonuses: {
    maxHp: 0,
    attack: 0,
    defense: 0,
    maxHunger: 0,
    inventory: 0,
  },
  conditionalOverrides: {
    maxHp: null,
    maxHunger: null,
  },
  bossRoom: null,
  boss: null,
  monsters: [],
  items: [],
  traps: [],
  sigils: [],
  exit: { x: VIEW_WIDTH - 2, y: VIEW_HEIGHT - 2 },
  ended: false,
};

const defaultItemDefinitionCatalog = JSON.parse(JSON.stringify(itemDefinitions));
const defaultMonsterFamilyCatalog = JSON.parse(JSON.stringify(monsterFamilyDefinitions));
const defaultRuneCatalog = JSON.parse(JSON.stringify(defaultRuneRules));
const defaultSpecialAttackCatalog = JSON.parse(JSON.stringify(defaultSpecialAttackRules));
const defaultTrapCatalog = JSON.parse(JSON.stringify(defaultTrapRules));
const defaultSigilCatalog = JSON.parse(JSON.stringify(defaultSigilRules));
const defaultEnemyTypeCatalog = [];

const environmentGlyphs = {
  ruins: { hazard: ".", className: "ruins-floor" },
  fungal: { hazard: ".", className: "fungal-floor" },
  ember: { hazard: ".", className: "ember-floor" },
  frost: { hazard: ".", className: "frost-floor" },
  cosmic: { hazard: ".", className: "cosmic-floor" },
  beach: { hazard: ".", className: "beach-floor" },
  ghastly: { hazard: ".", className: "ghastly-floor" },
  shadow: { hazard: ".", className: "shadow-floor" },
  underwater: { hazard: ".", className: "underwater-floor" },
  swamp: { hazard: ".", className: "swamp-floor" },
  depths: { hazard: ".", className: "depths-floor" },
  blood: { hazard: ".", className: "blood-floor" },
  custom: { hazard: ".", className: "custom-floor" },
};

const featureGlyphs = {
  floor: "",
  fungus: "%",
  lava: "~",
  ice: "*",
  hole: "○",
};

const environmentSettings = {
  ruins: { featureTile: "floor", featureChance: 0.02, roomBonus: 1 },
  fungal: { featureTile: "fungus", featureChance: 0.09, roomBonus: 2 },
  ember: { featureTile: "lava", featureChance: 0.07, roomBonus: 0 },
  frost: { featureTile: "ice", featureChance: 0.08, roomBonus: 1 },
  cosmic: { featureTile: "hole", featureChance: 0.08, roomBonus: 1 },
  beach: { featureTile: "floor", featureChance: 0.02, roomBonus: 1 },
  ghastly: { featureTile: "floor", featureChance: 0.03, roomBonus: 1 },
  shadow: { featureTile: "floor", featureChance: 0.03, roomBonus: 2 },
  underwater: { featureTile: "floor", featureChance: 0.03, roomBonus: 1 },
  swamp: { featureTile: "fungus", featureChance: 0.06, roomBonus: 2 },
  depths: { featureTile: "floor", featureChance: 0.03, roomBonus: 1 },
  blood: { featureTile: "lava", featureChance: 0.05, roomBonus: 1 },
  custom: { featureTile: "floor", featureChance: 0.02, roomBonus: 1 },
};

const trapDesignOptions = [
  { id: "caret", label: "Caret", glyph: "^", className: "trap-design-caret" },
  { id: "fungus", label: "Fungus", glyph: "%", className: "trap-design-fungus" },
  { id: "lava", label: "Lava", glyph: "~", className: "trap-design-lava" },
  { id: "ice", label: "Ice", glyph: "*", className: "trap-design-ice" },
  { id: "hole", label: "Hole", glyph: "○", className: "trap-design-hole" },
];

const enemyMagicEffectOptions = [
  { id: "damage", label: "Damage" },
  { id: "levelDown", label: "Level Down" },
  { id: "hungerDown", label: "Hunger Down" },
  { id: "maxHungerDown", label: "Max Hunger Down" },
  { id: "baseAttackDown", label: "Base Attack Down" },
  { id: "curseEquipped", label: "Curse Equipped Items" },
  { id: "downgradeEquippedWeapon", label: "Downgrade Equipped Weapons" },
  { id: "stealGold", label: "Steal Gold" },
  { id: "transmuteInventoryItem", label: "Transmute Inventory Item" },
];

const enemySkillDefinitions = [
  { id: "multiAttack", label: "Attack x Times", valueLabel: "Hits", min: 2, max: 9, defaultValue: 2 },
  { id: "regen", label: "Recover HP Each Turn", valueLabel: "HP", min: 1, max: 999, defaultValue: 2, passive: true },
  { id: "rageOnHit", label: "Attack Power Increases When Hit", valueLabel: "Atk+", min: 1, max: 99, defaultValue: 1, passive: true },
  { id: "hurtByHealingItems", label: "Damaged by HP Restoration Items", valueLabel: "Damage", min: 1, max: 999, defaultValue: 8, passive: true },
  { id: "phaseWalls", label: "Moves Through Walls", noValue: true, passive: true },
  { id: "deflectStaff", label: "Hits Away Staff Magic", valueLabel: "Deflect %", min: 1, max: 100, defaultValue: 35, passive: true },
  { id: "fireBreath", label: "Breathes Fire", valueLabel: "Damage", extraLabel: "Range", min: 1, max: 999, extraMin: 1, extraMax: 12, defaultValue: 8, defaultExtra: 3 },
  { id: "knockback", label: "Knocks Target Back", valueLabel: "Tiles", min: 1, max: 12, defaultValue: 1 },
  { id: "deathBuffNearby", label: "Death Levels Nearby Enemy", valueLabel: "Levels", min: 1, max: 9, defaultValue: 1, passive: true },
  { id: "attackUpOnNearbyDeath", label: "Attack Power Increases If Nearby Enemy Is Defeated", valueLabel: "Atk+", min: 1, max: 99, defaultValue: 1, passive: true },
  { id: "criticalHits", label: "Occasional Critical Hits", valueLabel: "Crit %", extraLabel: "Multiplier", min: 1, max: 100, extraMin: 1.1, extraMax: 9, step: 1, extraStep: 0.1, defaultValue: 20, defaultExtra: 1.5 },
  { id: "waterWeakens", label: "Water Damage Lowers Attack", valueLabel: "Atk-", min: 1, max: 99, defaultValue: 1, passive: true },
  { id: "rangedAttack", label: "Can Attack From Range", valueLabel: "Tiles", min: 2, max: 12, defaultValue: 2 },
  { id: "throwItem", label: "Throws Item At Player", valueLabel: "Damage", extraLabel: "Range", min: 1, max: 999, extraMin: 1, extraMax: 12, defaultValue: 6, defaultExtra: 4 },
  { id: "waterShot", label: "Shoots Water At Player", valueLabel: "Damage", extraLabel: "Range", min: 1, max: 999, extraMin: 1, extraMax: 12, defaultValue: 6, defaultExtra: 4 },
  { id: "throwLog", label: "Throws Log At Player", valueLabel: "Damage", extraLabel: "Range", min: 1, max: 999, extraMin: 1, extraMax: 12, defaultValue: 10, defaultExtra: 4 },
  { id: "throwGold", label: "Throws Gold At Player", valueLabel: "Gold Thrown", extraLabel: "Range", min: 1, max: 99999, extraMin: 1, extraMax: 12, defaultValue: 100, defaultExtra: 4 },
  { id: "shootMagic", label: "Shoots Magic", valueLabel: "Value", extraLabel: "Range", min: 1, max: 999, extraMin: 1, extraMax: 12, defaultValue: 2, defaultExtra: 4, magicEffect: true },
  { id: "levelDown", label: "Decrease Player Level", valueLabel: "Levels", min: 1, max: 99, defaultValue: 1 },
  { id: "hungerDown", label: "Decrease Player Hunger", valueLabel: "Hunger", min: 1, max: 999, defaultValue: 10 },
  { id: "maxHungerDown", label: "Decrease Player Max Hunger", valueLabel: "Max Hunger", min: 1, max: 999, defaultValue: 5 },
  { id: "baseAttackDown", label: "Decrease Player Base Attack", valueLabel: "Attack", min: 1, max: 99, defaultValue: 1 },
  { id: "transmuteInventoryItem", label: "Turns Inventory Item Into Item", itemTarget: true },
  { id: "stealGold", label: "Steals Gold", valueLabel: "Gold", min: 1, max: 99999, defaultValue: 50 },
  { id: "stealItemWarp", label: "Steals Item And Warps", noValue: true },
  { id: "stealItemThrowAway", label: "Steals Item And Throws It Away", noValue: true },
  { id: "curseEquipped", label: "Curses Equipped Items", noValue: true },
  { id: "downgradeEquippedWeapon", label: "Decrease Equipped Weapon Upgrade", valueLabel: "Upgrade-", min: 1, max: 99, defaultValue: 1 },
  { id: "removeRunes", label: "Might Remove Runes", valueLabel: "Chance %", min: 1, max: 100, defaultValue: 25 },
  { id: "multiplyOnDamage", label: "Chance To Multiply When Hit", valueLabel: "Chance %", min: 1, max: 100, defaultValue: 20, passive: true },
  { id: "dropWeaponBehind", label: "Knocks Equipped Weapon Behind Target", noValue: true },
  { id: "pullPlayer", label: "Pulls Player Toward It", valueLabel: "Range", min: 2, max: 12, defaultValue: 3 },
  { id: "throwPlayer", label: "Grabs And Throws Player", valueLabel: "Tiles", min: 1, max: 12, defaultValue: 2 },
  { id: "setTrap", label: "Sets Trap On Ground", trapTarget: true },
  { id: "summonMonsters", label: "Occasionally Summons Monsters", valueLabel: "Count", extraLabel: "Range", min: 1, max: 6, extraMin: 1, extraMax: 8, defaultValue: 1, defaultExtra: 2 },
  { id: "disguiseAsItem", label: "Disguises As Floor Item", itemTarget: true, noValue: true, passive: true },
  { id: "forceDarkRoom", label: "Forces Room Into Darkness", noValue: true, passive: true },
  { id: "burnNearbyItems", label: "Burns Nearby Ground Items", valueLabel: "Radius", min: 1, max: 5, defaultValue: 1, passive: true },
  { id: "hideInWalls", label: "Hides Until Player Is Near", valueLabel: "Reveal Range", min: 1, max: 8, defaultValue: 2, passive: true },
  { id: "morphMonstersToItems", label: "Morphs Monsters Into Items", valueLabel: "Count", extraLabel: "Range", min: 1, max: 6, extraMin: 1, extraMax: 8, defaultValue: 1, defaultExtra: 3, itemTarget: true },
  { id: "sendMonsters", label: "Sends Monsters Toward You", valueLabel: "Count", extraLabel: "Range", min: 1, max: 8, extraMin: 1, extraMax: 12, defaultValue: 2, defaultExtra: 6 },
  { id: "healMonsters", label: "Heals Monsters", valueLabel: "Count", extraLabel: "HP", min: 1, max: 8, extraMin: 1, extraMax: 999, defaultValue: 2, defaultExtra: 6 },
  { id: "hasteMonsters", label: "Increases Monster Action Speed", valueLabel: "Count", extraLabel: "Extra Actions", min: 1, max: 8, extraMin: 1, extraMax: 3, defaultValue: 2, defaultExtra: 1 },
  { id: "electrifyOnHits", label: "Electrifies Player After Hits", valueLabel: "Hits", extraLabel: "Damage", min: 1, max: 12, extraMin: 1, extraMax: 999, defaultValue: 3, defaultExtra: 6, passive: true },
  { id: "wallDigWander", label: "Digs Through Walls As It Wanders", noValue: true, passive: true },
  { id: "explodeMultiply", label: "Explosion Causes Multiplication", valueLabel: "Copies", min: 1, max: 4, defaultValue: 1, passive: true },
  { id: "explodeLowHp", label: "Explodes At 50% HP Or Less", valueLabel: "Damage", extraLabel: "Threshold %", min: 1, max: 999, extraMin: 1, extraMax: 100, defaultValue: 16, defaultExtra: 50, passive: true },
];

let highlightedEnvironmentStageId = "";
let highlightedCustomEnvironmentId = "";

function hashString(value) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function makeRandom(seed) {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let next = state;
    next = Math.imul(next ^ (next >>> 15), next | 1);
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61);
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
}

function numberValue(key) {
  return Number(controls[key].value);
}

function clampNumber(value, min, max, fallback) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return fallback;
  }
  return Math.min(max, Math.max(min, numeric));
}

function normalizeCustomEnvironment(customEnvironment = {}) {
  return {
    id: String(customEnvironment?.id ?? makeId("customEnvironment")),
    name: String(customEnvironment?.name ?? "Custom Environment").trim().slice(0, 40) || "Custom Environment",
    floorImage: typeof customEnvironment?.floorImage === "string" ? customEnvironment.floorImage : "",
    backgroundImage: typeof customEnvironment?.backgroundImage === "string" ? customEnvironment.backgroundImage : "",
  };
}

function normalizeSoundEffectRule(rule = {}, fallback = {}) {
  return {
    id: typeof rule?.id === "string" && rule.id ? rule.id : fallback.id,
    label: String(rule?.label ?? fallback.label ?? "Sound").trim() || String(fallback.label ?? "Sound"),
    defaultFileName: typeof rule?.defaultFileName === "string" && rule.defaultFileName ? rule.defaultFileName : String(fallback.defaultFileName ?? ""),
    defaultPath: typeof rule?.defaultPath === "string" && rule.defaultPath ? rule.defaultPath : String(fallback.defaultPath ?? ""),
    fileName: typeof rule?.fileName === "string" ? rule.fileName.slice(0, 120) : "",
    audioData: typeof rule?.audioData === "string" ? rule.audioData : "",
  };
}

function normalizeSoundPackMode(value) {
  return value === "custom" ? "custom" : "default";
}

function getCurrentSoundEffectRules() {
  if (game?.recipe?.soundEffectRules) {
    return normalizeSoundEffectRules(game.recipe.soundEffectRules);
  }
  return normalizeSoundEffectRules(readSoundEffectRules());
}

function resolveSoundEffectRule(soundId) {
  return getCurrentSoundEffectRules().find((rule) => rule.id === soundId) ?? null;
}

function getSoundEffectSource(soundId) {
  const rule = resolveSoundEffectRule(soundId);
  if (!rule) {
    return "";
  }
  const mode = normalizeSoundPackMode(game?.recipe?.soundPackMode ?? getSoundPackMode());
  if (mode === "custom") {
    return rule.audioData || "";
  }
  return rule.defaultPath || "";
}

function playSoundEffect(soundId, options = {}) {
  const source = getSoundEffectSource(soundId);
  if (!source) {
    return null;
  }
  try {
    const audio = new Audio(source);
    audio.preload = "auto";
    audio.volume = clampNumber(options.volume ?? 0.9, 0, 1, 0.9);
    if (Number.isFinite(options.playbackRate)) {
      audio.playbackRate = options.playbackRate;
    }
    liveSoundEffects.add(audio);
    const clear = () => liveSoundEffects.delete(audio);
    audio.addEventListener("ended", clear, { once: true });
    audio.addEventListener("error", clear, { once: true });
    const playback = audio.play();
    if (playback && typeof playback.catch === "function") {
      playback.catch(clear);
    }
    return audio;
  } catch {
    return null;
  }
}

function stopThemeMusic() {
  if (!activeThemeAudio) {
    return;
  }
  try {
    activeThemeAudio.pause();
    activeThemeAudio.currentTime = 0;
  } catch {
    // Ignore audio shutdown errors.
  }
  activeThemeAudio = null;
}

function startThemeMusic(options = {}) {
  const source = getSoundEffectSource("themeMusic");
  if (!source) {
    return null;
  }
  const restart = options.restart !== false;
  if (activeThemeAudio) {
    if (!restart) {
      return activeThemeAudio;
    }
    stopThemeMusic();
  }
  try {
    const audio = new Audio(source);
    audio.preload = "auto";
    audio.loop = true;
    audio.volume = clampNumber(options.volume ?? 0.42, 0, 1, 0.42);
    activeThemeAudio = audio;
    const playback = audio.play();
    if (playback && typeof playback.catch === "function") {
      playback.catch(() => {
        if (activeThemeAudio === audio) {
          activeThemeAudio = null;
        }
      });
    }
    return audio;
  } catch {
    activeThemeAudio = null;
    return null;
  }
}

function normalizeSoundEffectRules(rules = undefined) {
  return soundEffectDefinitions.map((definition) => {
    const match = Array.isArray(rules)
      ? rules.find((entry) => entry?.id === definition.id)
      : undefined;
    return normalizeSoundEffectRule(match, definition);
  });
}

function readSoundEffectRules() {
  if (!soundEffectList) {
    return normalizeSoundEffectRules();
  }
  const rows = [...soundEffectList.querySelectorAll(".sound-effect-row")];
  return normalizeSoundEffectRules(rows.map((row) => ({
    id: row.dataset.soundId,
    label: row.dataset.soundLabel,
    defaultFileName: row.dataset.defaultFileName ?? "",
    defaultPath: row.dataset.defaultPath ?? "",
    fileName: row.dataset.fileName ?? "",
    audioData: row.dataset.audioData ?? "",
  })));
}

function getSoundPackMode() {
  return normalizeSoundPackMode(controls.soundPackMode?.value);
}

function updateSoundPackControls() {
  const mode = getSoundPackMode();
  soundPackCustomControls?.classList.toggle("hidden", mode !== "custom");
  if (soundPackNote) {
    soundPackNote.textContent = mode === "custom"
      ? "Custom uploads are saved in full package exports and local saves, but not normal share codes."
      : "Default mode auto-matches local sounds from the audio folder by action name.";
  }
}

function updateSoundEffectRowStatus(row, mode = getSoundPackMode()) {
  const status = row.querySelector(".sound-effect-status");
  if (!status) {
    return;
  }
  if (mode === "default") {
    status.textContent = row.dataset.defaultFileName
      ? `Default: ${row.dataset.defaultFileName}`
      : "No default sound matched.";
    return;
  }
  const hasAudio = Boolean(row.dataset.audioData);
  status.textContent = hasAudio
    ? `Loaded: ${row.dataset.fileName || "custom sound effect"}`
    : "No custom sound uploaded.";
}

function renderSoundEffectControls(rules = undefined) {
  if (!soundEffectList) {
    return;
  }
  const normalizedRules = normalizeSoundEffectRules(rules);
  const mode = getSoundPackMode();
  soundEffectList.innerHTML = "";
  normalizedRules.forEach((rule) => {
    const row = document.createElement("div");
    row.className = "sound-effect-row";
    row.dataset.soundId = rule.id;
    row.dataset.soundLabel = rule.label;
    row.dataset.defaultFileName = rule.defaultFileName ?? "";
    row.dataset.defaultPath = rule.defaultPath ?? "";
    row.dataset.fileName = rule.fileName ?? "";
    row.dataset.audioData = rule.audioData ?? "";
    row.innerHTML = `
      <div class="sound-effect-copy">
        <strong>${rule.label}</strong>
        <p class="sound-effect-status"></p>
      </div>
      <div class="sound-effect-actions">
        <label class="sound-effect-upload-button button-like" for="soundEffectUpload_${rule.id}">Upload Sound</label>
        <input id="soundEffectUpload_${rule.id}" class="sound-effect-input" type="file" accept="audio/*" />
        <button type="button" class="sound-effect-clear">Clear</button>
      </div>
    `;
    updateSoundEffectRowStatus(row, mode);
    soundEffectList.append(row);
  });
  updateSoundPackControls();
}

function applySoundEffectRules(rules = undefined) {
  renderSoundEffectControls(rules);
}

function normalizeCustomEnvironmentLibrary(library = undefined, legacyCustomEnvironment = undefined) {
  const incoming = Array.isArray(library) ? library : [];
  const normalized = incoming
    .map((entry) => normalizeCustomEnvironment(entry))
    .filter((entry, index, array) => array.findIndex((other) => other.id === entry.id) === index);
  if (normalized.length === 0 && legacyCustomEnvironment && (legacyCustomEnvironment.name || legacyCustomEnvironment.floorImage || legacyCustomEnvironment.backgroundImage)) {
    normalized.push(normalizeCustomEnvironment({
      id: "legacy_custom_environment",
      ...legacyCustomEnvironment,
    }));
  }
  return normalized;
}

function isCustomEnvironmentKey(value = "") {
  return String(value).startsWith("custom:");
}

function getCustomEnvironmentIdFromKey(value = "") {
  return isCustomEnvironmentKey(value) ? String(value).slice(7) : "";
}

function makeCustomEnvironmentKey(customEnvironmentId) {
  return customEnvironmentId ? `custom:${customEnvironmentId}` : "ruins";
}

function getEnvironmentLabel(environmentKey = "ruins", recipe = null) {
  if (isCustomEnvironmentKey(environmentKey)) {
    const customId = getCustomEnvironmentIdFromKey(environmentKey);
    const library = normalizeCustomEnvironmentLibrary(recipe?.customEnvironmentLibrary, recipe?.customEnvironment);
    const customEnvironment = library.find((entry) => entry.id === customId);
    return customEnvironment?.name ?? "Custom Environment";
  }
  const builtInNames = {
    ruins: "Ancient Ruins",
    fungal: "Fungal Grotto",
    ember: "Ember Vault",
    frost: "Frost Archive",
    cosmic: "Cosmic Escape",
    beach: "Dashing Beach",
    ghastly: "Ghastly Valley",
    shadow: "Shadow Forest",
    underwater: "Underwater Basin",
    swamp: "Putrid Swamp",
    depths: "Echoing Depths",
    blood: "Blood Cave",
  };
  return builtInNames[environmentKey] ?? titleCase(environmentKey);
}

function getEnvironmentSelectOptions(recipe = null) {
  const builtIns = [
    { value: "ruins", label: getEnvironmentLabel("ruins", recipe) },
    { value: "fungal", label: getEnvironmentLabel("fungal", recipe) },
    { value: "ember", label: getEnvironmentLabel("ember", recipe) },
    { value: "frost", label: getEnvironmentLabel("frost", recipe) },
    { value: "cosmic", label: getEnvironmentLabel("cosmic", recipe) },
    { value: "beach", label: getEnvironmentLabel("beach", recipe) },
    { value: "ghastly", label: getEnvironmentLabel("ghastly", recipe) },
    { value: "shadow", label: getEnvironmentLabel("shadow", recipe) },
    { value: "underwater", label: getEnvironmentLabel("underwater", recipe) },
    { value: "swamp", label: getEnvironmentLabel("swamp", recipe) },
    { value: "depths", label: getEnvironmentLabel("depths", recipe) },
    { value: "blood", label: getEnvironmentLabel("blood", recipe) },
  ];
  const customOptions = normalizeCustomEnvironmentLibrary(recipe?.customEnvironmentLibrary, recipe?.customEnvironment)
    .map((entry) => ({
      value: makeCustomEnvironmentKey(entry.id),
      label: entry.name,
    }));
  return [...builtIns, ...customOptions];
}

function getLegacyBaseEnvironmentKey(recipe = {}, customLibrary = []) {
  if (Array.isArray(recipe?.environmentStages) && recipe.environmentStages.some((rule) => Number(rule?.startFloor) === 1)) {
    const firstRule = recipe.environmentStages
      .slice()
      .sort((left, right) => Number(left?.startFloor ?? 1) - Number(right?.startFloor ?? 1))[0];
    return firstRule?.environmentKey
      ?? (firstRule?.environment === "custom"
        ? makeCustomEnvironmentKey(customLibrary[0]?.id)
        : firstRule?.environment)
      ?? "ruins";
  }
  if (recipe?.environment === "custom") {
    return makeCustomEnvironmentKey(customLibrary[0]?.id);
  }
  return ["ruins", "fungal", "ember", "frost", "cosmic", "beach", "ghastly", "shadow", "underwater", "swamp", "depths", "blood"].includes(recipe?.environment) ? recipe.environment : "ruins";
}

function normalizeEnvironmentStageRule(rule = {}, fallback = {}, options = {}) {
  const floors = clampNumber(options.floors, 1, 99, 99);
  const knownKeys = new Set(options.environmentKeys ?? getEnvironmentSelectOptions(options.recipe).map((option) => option.value));
  const rawKey = rule?.environmentKey
    ?? (rule?.environment === "custom"
      ? makeCustomEnvironmentKey(options.customEnvironmentLibrary?.[0]?.id)
      : rule?.environment)
    ?? fallback.environmentKey
    ?? "ruins";
  return {
    id: String(rule?.id ?? fallback.id ?? makeId("environmentStage")),
    startFloor: clampNumber(rule?.startFloor ?? fallback.startFloor, 1, floors, fallback.startFloor ?? 1),
    environmentKey: knownKeys.has(rawKey) ? rawKey : (knownKeys.has(fallback.environmentKey) ? fallback.environmentKey : "ruins"),
  };
}

function normalizeEnvironmentStageRules(rules = undefined, floors = 99, recipe = {}) {
  const clampedFloors = clampNumber(floors, 1, 99, 99);
  const customEnvironmentLibrary = normalizeCustomEnvironmentLibrary(recipe?.customEnvironmentLibrary, recipe?.customEnvironment);
  const environmentKeys = getEnvironmentSelectOptions({ customEnvironmentLibrary }).map((option) => option.value);
  const incoming = Array.isArray(rules) ? rules : [];
  const fallbackBaseKey = getLegacyBaseEnvironmentKey(recipe, customEnvironmentLibrary);
  const normalized = incoming
    .map((rule) => normalizeEnvironmentStageRule(rule, {}, {
      floors: clampedFloors,
      environmentKeys,
      customEnvironmentLibrary,
      recipe: { customEnvironmentLibrary },
    }))
    .filter((rule) => rule.startFloor <= clampedFloors);
  const dedupedByFloor = new Map();
  normalized.forEach((rule) => {
    dedupedByFloor.set(rule.startFloor, rule);
  });
  let result = [...dedupedByFloor.values()].sort((left, right) => left.startFloor - right.startFloor);
  if (result.length === 0 || result[0].startFloor !== 1) {
    result = [
      {
        id: makeId("environmentStage"),
        startFloor: 1,
        environmentKey: fallbackBaseKey,
      },
      ...result.filter((rule) => rule.startFloor !== 1),
    ];
  }
  result[0].startFloor = 1;
  result[0].environmentKey = environmentKeys.includes(result[0].environmentKey) ? result[0].environmentKey : fallbackBaseKey;
  return result
    .filter((rule) => rule.startFloor >= 1 && rule.startFloor <= clampedFloors)
    .sort((left, right) => left.startFloor - right.startFloor);
}

function readCustomEnvironmentLibrary() {
  if (!customEnvironmentLibraryList) {
    return [];
  }
  return normalizeCustomEnvironmentLibrary(
    Array.from(customEnvironmentLibraryList.querySelectorAll(".custom-environment-entry")).map((row) => ({
      id: row.dataset.customEnvironmentId,
      name: row.querySelector('[data-target="name"]')?.value,
      floorImage: row.querySelector('[data-target="floorImage"]')?.dataset.imageData ?? "",
      backgroundImage: row.querySelector('[data-target="backgroundImage"]')?.dataset.imageData ?? "",
    })),
  );
}

function prioritizeHighlightedRow(rules = [], highlightedId = "") {
  if (!highlightedId) {
    return Array.isArray(rules) ? [...rules] : [];
  }
  const entries = Array.isArray(rules) ? [...rules] : [];
  const highlightedIndex = entries.findIndex((rule) => rule?.id === highlightedId);
  if (highlightedIndex <= 0) {
    return entries;
  }
  return [entries[highlightedIndex], ...entries.slice(0, highlightedIndex), ...entries.slice(highlightedIndex + 1)];
}

function highlightDungeonBuilderRow(container, rowClassName, dataAttributeName, rowId, focusSelector) {
  if (!container || !rowId) {
    return;
  }
  requestAnimationFrame(() => {
    const row = Array.from(container.querySelectorAll(`.${rowClassName}`))
      .find((entry) => entry.dataset[dataAttributeName] === rowId);
    if (!row) {
      return;
    }
    row.classList.add("builder-row-fresh");
    row.scrollIntoView({ block: "center", behavior: "smooth" });
    const focusTarget = row.querySelector(focusSelector);
    if (focusTarget && typeof focusTarget.focus === "function") {
      focusTarget.focus();
      if (typeof focusTarget.select === "function") {
        focusTarget.select();
      }
    }
  });
}

function renderCustomEnvironmentLibrary(library = undefined) {
  if (!customEnvironmentLibraryList) {
    return;
  }
  const normalized = normalizeCustomEnvironmentLibrary(library);
  customEnvironmentLibraryList.innerHTML = "";
  if (normalized.length === 0) {
    const message = document.createElement("p");
    message.className = "empty-list";
    message.textContent = "No custom areas saved yet.";
    customEnvironmentLibraryList.append(message);
    return;
  }
  normalized.forEach((entry) => {
    const row = document.createElement("div");
    row.className = "custom-environment-entry";
    row.dataset.customEnvironmentId = entry.id;
    if (entry.id === highlightedCustomEnvironmentId) {
      row.classList.add("builder-row-fresh");
    }
    row.innerHTML = `
      <label>
        Area Name
        <input type="text" data-target="name" maxlength="40" value="${escapeHtml(entry.name)}" placeholder="My Custom Area" />
      </label>
      <div class="custom-environment-upload-grid">
        <div class="custom-environment-upload">
          <label>
            Dungeon Floor Image
            <input data-target="floorImage" type="file" accept="image/*" />
          </label>
          <p class="custom-environment-status" data-target="floorStatus">${entry.floorImage ? "Floor image loaded locally." : "No floor image loaded."}</p>
          <button type="button" data-action="clear_custom_floor">Clear Floor Image</button>
        </div>
        <div class="custom-environment-upload">
          <label>
            Background Image
            <input data-target="backgroundImage" type="file" accept="image/*" />
          </label>
          <p class="custom-environment-status" data-target="backgroundStatus">${entry.backgroundImage ? "Background image loaded locally." : "No background image loaded."}</p>
          <button type="button" data-action="clear_custom_background">Clear Background Image</button>
        </div>
      </div>
      <div class="item-actions">
        <button type="button" data-action="remove_custom_environment">Remove</button>
      </div>
    `;
    row.querySelector('[data-target="floorImage"]').dataset.imageData = entry.floorImage;
    row.querySelector('[data-target="backgroundImage"]').dataset.imageData = entry.backgroundImage;
    customEnvironmentLibraryList.append(row);
  });
  highlightDungeonBuilderRow(customEnvironmentLibraryList, "custom-environment-entry", "customEnvironmentId", highlightedCustomEnvironmentId, '[data-target="name"]');
}

function applyCustomEnvironmentLibrary(library = undefined) {
  renderCustomEnvironmentLibrary(library);
}

function getCustomEnvironmentById(recipe = game.recipe, customEnvironmentId = "") {
  const library = normalizeCustomEnvironmentLibrary(recipe?.customEnvironmentLibrary, recipe?.customEnvironment);
  return library.find((entry) => entry.id === customEnvironmentId) ?? null;
}

function renderEnvironmentNaturalTrapControls() {}

function getEnvironmentDisplayName(recipe) {
  const environmentKey = normalizeEnvironmentStageRules(recipe?.environmentStages, recipe?.floors ?? 99, recipe)[0]?.environmentKey
    ?? getLegacyBaseEnvironmentKey(recipe, normalizeCustomEnvironmentLibrary(recipe?.customEnvironmentLibrary, recipe?.customEnvironment));
  return getEnvironmentLabel(environmentKey, recipe);
}

function readEnvironmentStageRules() {
  if (!environmentStageList) {
    return [];
  }
  return normalizeEnvironmentStageRules(
    Array.from(environmentStageList.querySelectorAll(".environment-stage-row")).map((row) => ({
      id: row.dataset.stageId,
      startFloor: row.querySelector('[data-target="startFloor"]')?.value,
      environmentKey: row.querySelector('[data-target="environmentKey"]')?.value,
    })),
    numberValue("floors"),
    { customEnvironmentLibrary: readCustomEnvironmentLibrary() },
  );
}

function renderEnvironmentStageControls(rules = undefined, recipe = null) {
  if (!environmentStageList) {
    return;
  }
  const floors = recipe?.floors ?? numberValue("floors");
  const customEnvironmentLibrary = normalizeCustomEnvironmentLibrary(recipe?.customEnvironmentLibrary, recipe?.customEnvironment);
  const normalizedRules = normalizeEnvironmentStageRules(rules, floors, {
    ...recipe,
    customEnvironmentLibrary,
  });
  const options = getEnvironmentSelectOptions({ ...recipe, customEnvironmentLibrary });
  environmentStageList.innerHTML = "";
  prioritizeHighlightedRow(normalizedRules, highlightedEnvironmentStageId).forEach((rule) => {
    const index = normalizedRules.findIndex((entry) => entry.id === rule.id);
    const row = document.createElement("div");
    row.className = "environment-stage-row";
    row.dataset.stageId = rule.id;
    if (rule.id === highlightedEnvironmentStageId) {
      row.classList.add("builder-row-fresh");
    }
    row.innerHTML = `
      <label>
        Start Floor
        <input type="number" min="1" max="${floors}" step="1" data-target="startFloor" value="${rule.startFloor}" ${index === 0 ? "disabled" : ""} />
      </label>
      <label>
        Environment
        <select data-target="environmentKey">
          ${options.map((option) => `<option value="${escapeHtml(option.value)}"${option.value === rule.environmentKey ? " selected" : ""}>${escapeHtml(option.label)}</option>`).join("")}
        </select>
      </label>
      ${index === 0
        ? '<span class="stage-base-label">Begins the dungeon</span>'
        : '<button type="button" data-action="remove_environment_stage">Remove</button>'}
    `;
    environmentStageList.append(row);
  });
  highlightDungeonBuilderRow(environmentStageList, "environment-stage-row", "stageId", highlightedEnvironmentStageId, '[data-target="startFloor"]');
}

function applyEnvironmentStageRules(rules = undefined, recipe = null) {
  renderEnvironmentStageControls(rules, recipe);
  if (controls.environment) {
    const firstKey = normalizeEnvironmentStageRules(rules, recipe?.floors ?? numberValue("floors"), recipe)[0]?.environmentKey ?? "ruins";
    controls.environment.value = isCustomEnvironmentKey(firstKey) ? "custom" : firstKey;
  }
}

function addEnvironmentStageRule() {
  const floors = numberValue("floors");
  if (floors <= 1) {
    return;
  }
  const rules = readEnvironmentStageRules();
  const usedFloors = new Set(rules.map((rule) => rule.startFloor));
  let startFloor = 2;
  while (usedFloors.has(startFloor) && startFloor < floors) {
    startFloor += 1;
  }
  const lastKey = rules[rules.length - 1]?.environmentKey ?? "ruins";
  const newRule = normalizeEnvironmentStageRule({
    id: makeId("environmentStage"),
    startFloor,
    environmentKey: lastKey,
  }, {}, {
    floors,
    customEnvironmentLibrary: readCustomEnvironmentLibrary(),
    recipe: { customEnvironmentLibrary: readCustomEnvironmentLibrary() },
  });
  highlightedEnvironmentStageId = newRule.id;
  rules.unshift(newRule);
  renderEnvironmentStageControls(rules, { customEnvironmentLibrary: readCustomEnvironmentLibrary(), floors });
}

function addCustomEnvironmentEntry() {
  const library = readCustomEnvironmentLibrary();
  const newEntry = normalizeCustomEnvironment({
    id: makeId("customEnvironment"),
    name: `Custom Area ${library.length + 1}`,
  });
  highlightedCustomEnvironmentId = newEntry.id;
  library.unshift(newEntry);
  renderCustomEnvironmentLibrary(library);
}

function getFloorEnvironment(recipe, floor = 1) {
  const normalizedRecipe = normalizeRecipeData(recipe ?? {});
  const rules = normalizeEnvironmentStageRules(normalizedRecipe.environmentStages, normalizedRecipe.floors, normalizedRecipe);
  let activeEnvironmentKey = rules[0]?.environmentKey ?? "ruins";
  rules.forEach((rule) => {
    if (floor >= rule.startFloor) {
      activeEnvironmentKey = rule.environmentKey;
    }
  });
  return activeEnvironmentKey;
}

function getBoardEnvironmentId(environmentKey = "ruins") {
  return isCustomEnvironmentKey(environmentKey) ? "custom" : environmentKey;
}

function normalizeRecipeData(recipe = {}) {
  const normalizedName = String(recipe?.name ?? "Unnamed Dungeon").trim() || "Unnamed Dungeon";
  const customEnvironmentLibrary = normalizeCustomEnvironmentLibrary(recipe?.customEnvironmentLibrary, recipe?.customEnvironment);
  return {
    name: normalizedName,
    description: String(recipe?.description ?? "").trim().slice(0, 240),
    floors: clampNumber(recipe?.floors, 1, 99, 8),
    roomCount: clampNumber(recipe?.roomCount, 1, 20, 7),
    monsterRate: clampNumber(recipe?.monsterRate, 0, 12, 8),
    monsterRespawnRate: clampNumber(recipe?.monsterRespawnRate, 0, 12, 3),
    difficulty: clampNumber(recipe?.difficulty, 0, 10, 3),
    itemRate: clampNumber(recipe?.itemRate, 0, 12, 9),
    rareRate: clampNumber(recipe?.rareRate, 0, 10, 3),
    curseRate: clampNumber(recipe?.curseRate, 0, 100, 15),
    blessedRate: clampNumber(recipe?.blessedRate, 0, 100, 12),
    trapRate: clampNumber(recipe?.trapRate, 0, 12, 4),
    sigilRate: clampNumber(recipe?.sigilRate, 0, 12, 2),
    goldRate: clampNumber(recipe?.goldRate, 0, 100, 20),
    inventoryLimit: clampNumber(recipe?.inventoryLimit, 1, 99, 12),
    monsterLimit: clampNumber(recipe?.monsterLimit, 1, 99, 12),
    hungerEnabled: recipe?.hungerEnabled === true,
    hungerDrainRate: clampNumber(recipe?.hungerDrainRate, 1, 99, 5),
    clearBuffsOnFloorChange: recipe?.clearBuffsOnFloorChange === true,
    passiveHealBlockRules: normalizePassiveHealBlockRules(recipe?.passiveHealBlockRules ?? {
      attackDamage: recipe?.hungerNoHealAfterAttack ?? false,
    }),
    unidentifiedItemsEnabled: recipe?.unidentifiedItemsEnabled === true,
    deductionMode: recipe?.deductionMode === true,
    weaponRarityEnabled: recipe?.weaponRarityEnabled !== false,
    rarityRules: normalizeRarityRules(recipe?.rarityRules),
    equippedCountsTowardLimit: recipe?.equippedCountsTowardLimit === true,
    hideGridlines: recipe?.hideGridlines === true,
    cameraMode: recipe?.cameraMode === "screen" ? "screen" : "center",
    environment: ["ruins", "fungal", "ember", "frost", "cosmic", "beach", "ghastly", "shadow", "underwater", "swamp", "depths", "blood", "custom"].includes(recipe?.environment) ? recipe.environment : "ruins",
    environmentStages: normalizeEnvironmentStageRules(recipe?.environmentStages, recipe?.floors ?? 8, {
      ...recipe,
      customEnvironmentLibrary,
    }),
    customEnvironmentLibrary,
    customEnvironment: customEnvironmentLibrary[0] ?? normalizeCustomEnvironment(recipe?.customEnvironment),
    startingStats: normalizeStartingStats(recipe),
    leveling: normalizeLevelingSettings({ leveling: recipe?.leveling }),
    customGoal: normalizeCustomGoal(recipe?.customGoal),
    runLogSettings: normalizeRunLogSettings(recipe?.runLogSettings),
    environmentalEffects: normalizeEnvironmentalEffects(recipe?.environmentalEffects),
    specialRooms: normalizeSpecialRooms(recipe?.specialRooms),
    itemPoolRules: normalizeItemPoolRules(recipe?.itemPoolRules),
    runePoolRules: normalizeRunePoolRules(recipe?.runePoolRules),
    specialAttackRules: normalizeSpecialAttackRules(recipe?.specialAttackRules),
    trapsVisible: recipe?.trapsVisible === true,
    sigilsVisible: recipe?.sigilsVisible === true,
    trapPoolRules: normalizeTrapPoolRules(recipe?.trapPoolRules),
    sigilPoolRules: normalizeSigilPoolRules(recipe?.sigilPoolRules),
    enemyPoolRules: normalizeEnemyPoolRules(recipe?.enemyPoolRules),
    enemyTypeRules: normalizeEnemyTypeRules(recipe?.enemyTypeRules),
    enemyDrops: normalizeEnemyDropSettings(recipe?.enemyDrops),
    bossRoom: normalizeBossRoomSettings(recipe?.bossRoom),
    soundPackMode: normalizeSoundPackMode(recipe?.soundPackMode),
    soundEffectRules: normalizeSoundEffectRules(recipe?.soundEffectRules),
    startingEquipment: normalizeStartingEquipment(recipe),
    startingInventory: normalizeStartingInventory(recipe),
    seed: Number(recipe?.seed) || hashString(`${normalizedName}-recipe`),
  };
}

function sanitizeRecipeForShare(recipe) {
  const clone = JSON.parse(JSON.stringify(normalizeRecipeData(recipe)));
  if (Array.isArray(clone?.customEnvironmentLibrary)) {
    clone.customEnvironmentLibrary = clone.customEnvironmentLibrary.map((entry) => ({
      ...entry,
      floorImage: "",
      backgroundImage: "",
    }));
  }
  if (clone?.customEnvironment) {
    clone.customEnvironment.floorImage = "";
    clone.customEnvironment.backgroundImage = "";
  }
  if (Array.isArray(clone?.soundEffectRules)) {
    clone.soundEffectRules = clone.soundEffectRules.map((rule) => ({
      ...rule,
      fileName: "",
      audioData: "",
    }));
  }
  return clone;
}

function getRecipePackageMetadata(recipe) {
  const customEnvironmentLibrary = normalizeCustomEnvironmentLibrary(recipe?.customEnvironmentLibrary, recipe?.customEnvironment);
  const soundRules = normalizeSoundEffectRules(recipe?.soundEffectRules);
  const customSoundCount = normalizeSoundPackMode(recipe?.soundPackMode) === "custom"
    ? soundRules.filter((rule) => rule.audioData).length
    : 0;
  const customEnvironmentArtCount = customEnvironmentLibrary.filter((entry) => entry.floorImage || entry.backgroundImage).length;
  return {
    packageType: "full-recipe-package",
    environmentName: getEnvironmentDisplayName(recipe),
    includesCustomEnvironmentArt: customEnvironmentArtCount > 0,
    includesCustomFloorImage: customEnvironmentLibrary.some((entry) => entry.floorImage),
    includesCustomBackgroundImage: customEnvironmentLibrary.some((entry) => entry.backgroundImage),
    customEnvironmentCount: customEnvironmentLibrary.length,
    customEnvironmentArtCount,
    soundMode: normalizeSoundPackMode(recipe?.soundPackMode),
    includesCustomSounds: customSoundCount > 0,
    customSoundCount,
  };
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "");
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function makeId(prefix) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

function normalizeHexColor(value, fallback) {
  return /^#[0-9a-f]{6}$/i.test(value ?? "") ? value : fallback;
}

function makeDefaultRarityRule(index = 0) {
  const templates = [
    { name: "Legendary", multiplier: 3.25, color: "#d04cff", effect: "phase" },
    { name: "Mythic", multiplier: 3.75, color: "#ff7a59", effect: "shimmer" },
    { name: "Ancient", multiplier: 4.25, color: "#7fd069", effect: "fog" },
    { name: "Prismatic", multiplier: 4.75, color: "#7aa7ff", effect: "surge" },
  ];
  const template = templates[index % templates.length];
  return {
    id: `custom_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
    name: template.name,
    enabled: true,
    multiplier: template.multiplier,
    color: template.color,
    effect: template.effect,
    bonusRunes: Math.max(1, index + 2),
    locked: false,
  };
}

function normalizeRarityRule(rule, fallback = {}) {
  const base = {
    id: fallback.id ?? `rarity_${Math.random().toString(36).slice(2, 8)}`,
    name: fallback.name ?? "Custom",
    enabled: fallback.enabled ?? true,
    multiplier: fallback.multiplier ?? 2,
    color: fallback.color ?? "#d04cff",
    effect: fallback.effect ?? "none",
    bonusRunes: fallback.bonusRunes ?? 1,
    locked: fallback.locked ?? false,
  };
  const effectIds = new Set(rarityEffectOptions.map((option) => option.id));
  const normalizedEffect = rule?.effect === "rainbow" ? "surge" : rule?.effect;
  return {
    id: rule?.id ?? base.id,
    name: (rule?.name ?? base.name).trim() || base.name,
    enabled: Boolean(rule?.enabled ?? base.enabled),
    multiplier: clampNumber(rule?.multiplier, 1, 99, base.multiplier),
    color: normalizeHexColor(rule?.color, base.color),
    effect: effectIds.has(normalizedEffect) ? normalizedEffect : base.effect,
    bonusRunes: Math.max(0, Math.floor(clampNumber(rule?.bonusRunes, 0, 12, base.bonusRunes))),
    locked: Boolean(rule?.locked ?? base.locked),
  };
}

function normalizeLegacyRarityRules(rules = {}) {
  const uncommon = normalizeRarityRule(rules.uncommon, defaultRarityRules[0]);
  const rare = normalizeRarityRule(rules.rare, defaultRarityRules[1]);
  const customRules = [];
  if (rules.custom?.enabled) {
    customRules.push(normalizeRarityRule(rules.custom, makeDefaultRarityRule()));
  }
  return [uncommon, rare, ...customRules];
}

function normalizeRarityRules(rules = []) {
  const incoming = Array.isArray(rules) ? rules : normalizeLegacyRarityRules(rules);
  const normalized = [];
  const seen = new Set();

  defaultRarityRules.forEach((defaultRule) => {
    const existing = incoming.find((rule) => rule?.id === defaultRule.id);
    const rule = normalizeRarityRule(existing, defaultRule);
    rule.name = defaultRule.name;
    rule.locked = true;
    normalized.push(rule);
    seen.add(rule.id);
  });

  incoming.forEach((rule, index) => {
    if (!rule || seen.has(rule.id)) {
      return;
    }
    const normalizedRule = normalizeRarityRule(rule, makeDefaultRarityRule(index));
    normalized.push(normalizedRule);
    seen.add(normalizedRule.id);
  });

  return normalized;
}

function renderRarityControls(rules = readRarityRules()) {
  rarityList.innerHTML = "";
  const normalizedRules = normalizeRarityRules(rules);
  const orderedRules = [
    ...normalizedRules.filter((rule) => !rule.locked),
    ...normalizedRules.filter((rule) => rule.locked),
  ];
  orderedRules.forEach((rule) => {
    const card = document.createElement("div");
    card.className = "rarity-card";
    card.dataset.rarityId = rule.id;
    card.dataset.locked = rule.locked ? "true" : "false";
    const effectOptions = rarityEffectOptions.map((option) => (
      `<option value="${option.id}"${option.id === rule.effect ? " selected" : ""}>${option.label}</option>`
    )).join("");
    card.innerHTML = `
      <div class="rarity-card-header">
        <strong>${rule.locked ? rule.name : "Custom Rarity"}</strong>
        ${rule.locked
          ? '<label class="inline-check"><input type="checkbox" data-target="enabled"' + (rule.enabled ? " checked" : "") + ' /> Built-in</label>'
          : '<div class="item-actions"><label class="inline-check"><input type="checkbox" data-target="enabled"' + (rule.enabled ? " checked" : "") + ' /> Enable</label><button type="button" class="rarity-remove" data-action="remove_rarity">Remove</button></div>'}
      </div>
      <div class="rarity-card-fields">
        <label>
          Name
          <input type="text" data-target="name" maxlength="20" value="${escapeHtml(rule.name)}" ${rule.locked ? "disabled" : ""} />
        </label>
        <label>
          Multiplier
          <input type="number" data-target="multiplier" min="1" step="0.05" value="${rule.multiplier}" />
        </label>
        <label>
          Color
          <input type="color" data-target="color" value="${rule.color}" />
        </label>
        <label>
          Effect
          <select data-target="effect">${effectOptions}</select>
        </label>
        <label>
          Bonus Runes
          <input type="number" data-target="bonusRunes" min="0" max="12" step="1" value="${rule.bonusRunes ?? 0}" />
        </label>
      </div>
    `;
    rarityList.append(card);
  });
}

function readRarityRules() {
  return Array.from(rarityList.querySelectorAll(".rarity-card")).map((card, index) => {
    const defaultRule = defaultRarityRules.find((rule) => rule.id === card.dataset.rarityId) ?? makeDefaultRarityRule(index);
    return normalizeRarityRule({
      id: card.dataset.rarityId,
      name: card.querySelector('[data-target="name"]')?.value ?? defaultRule.name,
      enabled: card.querySelector('[data-target="enabled"]')?.checked,
      multiplier: card.querySelector('[data-target="multiplier"]')?.value,
      color: card.querySelector('[data-target="color"]')?.value,
      effect: card.querySelector('[data-target="effect"]')?.value,
      bonusRunes: card.querySelector('[data-target="bonusRunes"]')?.value,
      locked: card.dataset.locked === "true",
    }, defaultRule);
  });
}

function applyRarityRules(rules = []) {
  renderRarityControls(rules);
}

function refreshRarityEditorState() {
  const rarityDisabled = !controls.weaponRarityEnabled.checked;
  rarityList.querySelectorAll(".rarity-card").forEach((card) => {
    const locked = card.dataset.locked === "true";
    const enabledToggle = card.querySelector('[data-target="enabled"]');
    const enabled = enabledToggle?.checked ?? true;
    card.querySelector('[data-target="name"]').disabled = rarityDisabled || locked;
    card.querySelector('[data-target="multiplier"]').disabled = rarityDisabled || !enabled;
    card.querySelector('[data-target="color"]').disabled = rarityDisabled || !enabled;
    card.querySelector('[data-target="effect"]').disabled = rarityDisabled || !enabled;
    card.querySelector('[data-target="bonusRunes"]').disabled = rarityDisabled || !enabled;
    const removeButton = card.querySelector('[data-action="remove_rarity"]');
    if (removeButton) {
      removeButton.disabled = rarityDisabled;
    }
    if (enabledToggle) {
      enabledToggle.disabled = rarityDisabled;
    }
  });
  controls.rarityAddButton.disabled = rarityDisabled;
}

function addRarityRule() {
  const rules = readRarityRules();
  rules.unshift(makeDefaultRarityRule(rules.length));
  renderRarityControls(rules);
  refreshRarityEditorState();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function makeDefaultTrapRule(index = 0) {
  const templates = [
    { name: "Snare Trap", effectType: "defenseDebuff", value1: 2, value2: 8 },
    { name: "Hex Trap", effectType: "attackDebuff", value1: 3, value2: 6 },
    { name: "Starve Trap", effectType: "hunger", value1: 24, value2: 0 },
    { name: "Burst Trap", effectType: "damage", value1: 5, value2: 0 },
  ];
  const template = templates[index % templates.length];
  return {
    id: `custom_trap_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
    name: template.name,
    enabled: true,
    effectType: template.effectType,
    value1: template.value1,
    value2: template.value2,
    uses: 1,
    design: "caret",
    locked: false,
  };
}

function getTrapEffectMeta(effectType) {
  switch (effectType) {
    case "damage":
      return { label1: "Damage", label2: "", default1: 3, default2: 0, min1: 1, max1: 99, min2: 0, max2: 0 };
    case "hunger":
      return { label1: "Hunger", label2: "", default1: 18, default2: 0, min1: 1, max1: 100, min2: 0, max2: 0 };
    case "attackDebuff":
      return { label1: "Atk Down", label2: "Turns", default1: 2, default2: 8, min1: 1, max1: 12, min2: 1, max2: 99 };
    case "defenseDebuff":
      return { label1: "Def Down", label2: "Turns", default1: 2, default2: 8, min1: 1, max1: 12, min2: 1, max2: 99 };
    case "loseRandomItem":
      return { label1: "Items", label2: "", default1: 1, default2: 0, min1: 1, max1: 12, min2: 0, max2: 0 };
    case "warp":
      return { label1: "", label2: "", default1: 0, default2: 0, min1: 0, max1: 0, min2: 0, max2: 0 };
    default:
      return { label1: "Value 1", label2: "Value 2", default1: 0, default2: 0, min1: 0, max1: 99, min2: 0, max2: 99 };
  }
}

function normalizeTrapRule(rule, fallback = {}) {
  const base = {
    id: fallback.id ?? `trap_${Math.random().toString(36).slice(2, 8)}`,
    name: fallback.name ?? "Custom Trap",
    enabled: fallback.enabled ?? true,
    effectType: fallback.effectType ?? "damage",
    value1: fallback.value1 ?? 0,
    value2: fallback.value2 ?? 0,
    uses: fallback.uses ?? 1,
    design: fallback.design ?? "caret",
    locked: fallback.locked ?? false,
    environmentOnly: fallback.environmentOnly ?? false,
    environmentId: fallback.environmentId ?? "",
  };
  const validEffects = new Set(trapEffectOptions.map((option) => option.id));
  const validDesigns = new Set(trapDesignOptions.map((option) => option.id));
  const effectType = validEffects.has(rule?.effectType) ? rule.effectType : base.effectType;
  const meta = getTrapEffectMeta(effectType);
  return {
    id: rule?.id ?? base.id,
    name: (rule?.name ?? base.name).trim() || base.name,
    enabled: Boolean(rule?.enabled ?? base.enabled),
    effectType,
    value1: clampNumber(rule?.value1, meta.min1, meta.max1, meta.default1),
    value2: meta.label2
      ? clampNumber(rule?.value2, meta.min2, meta.max2, meta.default2)
      : 0,
    uses: clampNumber(rule?.uses, 1, 999, base.uses),
    design: validDesigns.has(rule?.design) ? rule.design : base.design,
    locked: Boolean(rule?.locked ?? base.locked),
    environmentOnly: Boolean(rule?.environmentOnly ?? base.environmentOnly),
    environmentId: typeof rule?.environmentId === "string" && rule.environmentId ? rule.environmentId : base.environmentId,
  };
}

function normalizeTrapPoolRules(rules = undefined) {
  const incoming = Array.isArray(rules) ? rules : [];
  if (rules !== undefined) {
    if (incoming.length === 0) {
      return [];
    }
    return incoming.map((rule, index) => normalizeTrapRule(rule, defaultTrapCatalog.find((entry) => entry.id === rule?.id) ?? makeDefaultTrapRule(index)));
  }
  const normalized = [];
  const seen = new Set();

  defaultTrapRules.forEach((defaultRule) => {
    const existing = incoming.find((rule) => rule?.id === defaultRule.id);
    const rule = normalizeTrapRule(existing, defaultRule);
    rule.locked = true;
    normalized.push(rule);
    seen.add(rule.id);
  });

  incoming.forEach((rule, index) => {
    if (!rule || seen.has(rule.id)) {
      return;
    }
    const normalizedRule = normalizeTrapRule(rule, makeDefaultTrapRule(index));
    normalized.push(normalizedRule);
    seen.add(normalizedRule.id);
  });

  return normalized;
}

function trapsStartVisible() {
  return trapsVisibleEnabled?.checked === true;
}

function sigilsStartVisible() {
  return sigilsVisibleEnabled?.checked === true;
}

function describeTrapRule(rule) {
  const usesText = ` Triggers ${rule.uses} time${rule.uses === 1 ? "" : "s"} before disappearing.`;
  const visibilityText = trapsStartVisible() ? " Starts visible." : " Starts hidden.";
  const environmentText = rule.environmentOnly && rule.environmentId
    ? ` Used by ${getEnvironmentDisplayName({ environment: rule.environmentId })}.`
    : "";
  switch (rule.effectType) {
    case "damage":
      return `Deals ${rule.value1} damage when stepped on.${usesText}${visibilityText}${environmentText}`;
    case "hunger":
      return `Drains ${rule.value1} hunger when stepped on.${usesText}${visibilityText}${environmentText}`;
    case "attackDebuff":
      return `Lowers player attack by ${rule.value1} for ${rule.value2} turns.${usesText}${visibilityText}${environmentText}`;
    case "defenseDebuff":
      return `Lowers player defense by ${rule.value1} for ${rule.value2} turns.${usesText}${visibilityText}${environmentText}`;
    case "loseRandomItem":
      return `Swallows ${rule.value1} random inventory item${rule.value1 === 1 ? "" : "s"} when stepped on.${usesText}${visibilityText}${environmentText}`;
    case "warp":
      return `Warps the player to another room on the floor.${usesText}${visibilityText}${environmentText}`;
    default:
      return `Trap effect not set.${usesText}${visibilityText}${environmentText}`;
  }
}

function renderTrapPoolControls(rules = undefined) {
  trapPoolList.innerHTML = "";
  normalizeTrapPoolRules(rules).forEach((rule, index) => {
    const meta = getTrapEffectMeta(rule.effectType);
    const row = document.createElement("div");
    row.className = "trap-row";
    row.dataset.trapId = rule.id;
    row.dataset.locked = rule.locked ? "true" : "false";
    const effectOptions = trapEffectOptions.map((option) => (
      `<option value="${option.id}"${option.id === rule.effectType ? " selected" : ""}>${option.label}</option>`
    )).join("");
    const designOptions = trapDesignOptions.map((option) => (
      `<option value="${option.id}"${option.id === rule.design ? " selected" : ""}>${option.label}</option>`
    )).join("");
    row.innerHTML = `
      <div class="trap-row-header">
        <strong>${escapeHtml(rule.name)}</strong>
        <div class="item-actions">
          <label><input type="checkbox" data-target="enabled"${rule.enabled ? " checked" : ""} /> Enable</label>
          <button type="button" data-action="remove_trap">Remove</button>
        </div>
      </div>
      <div class="trap-fields">
        <label>
          Name
          <input type="text" data-target="name" maxlength="24" value="${escapeHtml(rule.name)}" />
        </label>
        <label>
          Effect
          <select data-target="effectType">${effectOptions}</select>
        </label>
        <label>
          Design
          <select data-target="design">${designOptions}</select>
        </label>
        <label data-value1-wrap${meta.label1 ? "" : ' class="hidden"'}>
          <span data-value1-label>${meta.label1 || "Value 1"}</span>
          <input type="number" data-target="value1" min="${meta.min1}" max="${meta.max1}" value="${rule.value1}" />
        </label>
        <label data-value2-wrap${meta.label2 ? "" : ' class="hidden"'}>
          <span data-value2-label>${meta.label2 || "Value 2"}</span>
          <input type="number" data-target="value2" min="${meta.min2}" max="${meta.max2}" value="${rule.value2}" />
        </label>
        <label>
          Uses
          <input type="number" data-target="uses" min="1" max="999" value="${rule.uses}" />
        </label>
      </div>
      <p class="trap-summary">${describeTrapRule(rule)}</p>
    `;
    trapPoolList.append(row);
  });
  refreshTrapEditorState();
  syncBulkEnableToggle(trapEnableAll, trapPoolList.querySelectorAll(".trap-row"));
}

function readTrapPoolRules() {
  return Array.from(trapPoolList.querySelectorAll(".trap-row")).map((row, index) => {
    const fallback = defaultTrapRules.find((rule) => rule.id === row.dataset.trapId) ?? makeDefaultTrapRule(index);
    return normalizeTrapRule({
      id: row.dataset.trapId,
      name: row.querySelector('[data-target="name"]')?.value,
      enabled: row.querySelector('[data-target="enabled"]')?.checked,
      effectType: row.querySelector('[data-target="effectType"]')?.value,
      value1: row.querySelector('[data-target="value1"]')?.value,
      value2: row.querySelector('[data-target="value2"]')?.value,
      uses: row.querySelector('[data-target="uses"]')?.value,
      design: row.querySelector('[data-target="design"]')?.value,
      locked: row.dataset.locked === "true",
    }, fallback);
  });
}

function applyTrapPoolRules(rules = undefined) {
  renderTrapPoolControls(rules);
}

function refreshTrapEditorState() {
  trapPoolList.querySelectorAll(".trap-row").forEach((row) => {
    const effectType = row.querySelector('[data-target="effectType"]')?.value ?? "damage";
    const meta = getTrapEffectMeta(effectType);
    const value1Wrap = row.querySelector("[data-value1-wrap]");
    const value2Wrap = row.querySelector("[data-value2-wrap]");
    const value1Input = row.querySelector('[data-target="value1"]');
    const value2Input = row.querySelector('[data-target="value2"]');
    const value1Label = row.querySelector("[data-value1-label]");
    const value2Label = row.querySelector("[data-value2-label]");
    const normalized = normalizeTrapRule({
      id: row.dataset.trapId,
      name: row.querySelector('[data-target="name"]')?.value,
      enabled: row.querySelector('[data-target="enabled"]')?.checked,
      effectType,
      value1: value1Input?.value,
      value2: value2Input?.value,
      uses: row.querySelector('[data-target="uses"]')?.value,
      design: row.querySelector('[data-target="design"]')?.value,
      locked: row.dataset.locked === "true",
    }, defaultTrapRules.find((rule) => rule.id === row.dataset.trapId) ?? makeDefaultTrapRule());
    row.classList.toggle("recipe-entry-disabled", !normalized.enabled);

    if (value1Wrap) {
      value1Wrap.classList.toggle("hidden", !meta.label1);
    }
    if (value2Wrap) {
      value2Wrap.classList.toggle("hidden", !meta.label2);
    }
    if (value1Label) {
      value1Label.textContent = meta.label1 || "Value 1";
    }
    if (value2Label) {
      value2Label.textContent = meta.label2 || "Value 2";
    }
    if (value1Input) {
      value1Input.min = String(meta.min1);
      value1Input.max = String(meta.max1);
      value1Input.value = String(normalized.value1);
    }
    if (value2Input) {
      value2Input.min = String(meta.min2);
      value2Input.max = String(meta.max2);
      value2Input.value = String(normalized.value2);
    }
    const summary = row.querySelector(".trap-summary");
    if (summary) {
      summary.textContent = describeTrapRule(normalized);
    }
    const title = row.querySelector(".trap-row-header strong");
    if (title) {
      title.textContent = normalized.name || "Custom Trap";
    }
  });
  syncBulkEnableToggle(trapEnableAll, trapPoolList.querySelectorAll(".trap-row"));
}

function addTrapRule() {
  const rules = readTrapPoolRules();
  rules.unshift(makeDefaultTrapRule(rules.length));
  renderTrapPoolControls(rules);
}

function makeDefaultSigilRule(index = 0) {
  const templates = [
    { name: "Renew Sigil", effectType: "heal", value1: 10, value2: 0 },
    { name: "Valor Sigil", effectType: "attackUp", value1: 1, value2: 0 },
    { name: "Ward Sigil", effectType: "defenseBuff", value1: 2, value2: 10 },
    { name: "Satchel Sigil", effectType: "inventoryUp", value1: 1, value2: 0 },
  ];
  const template = templates[index % templates.length];
  return {
    id: `custom_sigil_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
    name: template.name,
    enabled: true,
    effectType: template.effectType,
    value1: template.value1,
    value2: template.value2,
    uses: 2,
    locked: false,
  };
}

function getSigilEffectMeta(effectType) {
  switch (effectType) {
    case "heal":
      return { label1: "HP", label2: "", default1: 8, default2: 0, min1: 1, max1: 999, min2: 0, max2: 0 };
    case "maxHp":
      return { label1: "Max HP+", label2: "", default1: 4, default2: 0, min1: 1, max1: 99, min2: 0, max2: 0 };
    case "attackBuff":
      return { label1: "Atk+", label2: "Turns", default1: 2, default2: 12, min1: 1, max1: 99, min2: 1, max2: 999 };
    case "attackUp":
      return { label1: "Atk+", label2: "", default1: 1, default2: 0, min1: 1, max1: 99, min2: 0, max2: 0 };
    case "defenseBuff":
      return { label1: "Def+", label2: "Turns", default1: 2, default2: 12, min1: 1, max1: 99, min2: 1, max2: 999 };
    case "defenseUp":
      return { label1: "Def+", label2: "", default1: 1, default2: 0, min1: 1, max1: 99, min2: 0, max2: 0 };
    case "hunger":
      return { label1: "Hunger", label2: "", default1: 20, default2: 0, min1: 1, max1: 999, min2: 0, max2: 0 };
    case "maxHunger":
      return { label1: "Max Hunger+", label2: "", default1: 10, default2: 0, min1: 1, max1: 999, min2: 0, max2: 0 };
    case "inventoryUp":
      return { label1: "Slots+", label2: "", default1: 1, default2: 0, min1: 1, max1: 30, min2: 0, max2: 0 };
    default:
      return { label1: "Value 1", label2: "Value 2", default1: 0, default2: 0, min1: 0, max1: 999, min2: 0, max2: 999 };
  }
}

function normalizeSigilRule(rule, fallback = {}) {
  const base = {
    id: fallback.id ?? `sigil_${Math.random().toString(36).slice(2, 8)}`,
    name: fallback.name ?? "Custom Sigil",
    enabled: fallback.enabled ?? true,
    effectType: fallback.effectType ?? "heal",
    value1: fallback.value1 ?? 0,
    value2: fallback.value2 ?? 0,
    uses: fallback.uses ?? 2,
    locked: fallback.locked ?? false,
  };
  const validEffects = new Set(sigilEffectOptions.map((option) => option.id));
  const effectType = validEffects.has(rule?.effectType) ? rule.effectType : base.effectType;
  const meta = getSigilEffectMeta(effectType);
  return {
    id: rule?.id ?? base.id,
    name: (rule?.name ?? base.name).trim() || base.name,
    enabled: Boolean(rule?.enabled ?? base.enabled),
    effectType,
    value1: clampNumber(rule?.value1, meta.min1, meta.max1, meta.default1),
    value2: meta.label2
      ? clampNumber(rule?.value2, meta.min2, meta.max2, meta.default2)
      : 0,
    uses: clampNumber(rule?.uses, 1, 99, base.uses),
    locked: Boolean(rule?.locked ?? base.locked),
  };
}

function normalizeSigilPoolRules(rules = undefined) {
  const incoming = Array.isArray(rules) ? rules : [];
  if (rules !== undefined) {
    if (incoming.length === 0) {
      return [];
    }
    return incoming.map((rule, index) => normalizeSigilRule(rule, defaultSigilCatalog.find((entry) => entry.id === rule?.id) ?? makeDefaultSigilRule(index)));
  }
  const normalized = [];
  const seen = new Set();

  defaultSigilRules.forEach((defaultRule) => {
    const existing = incoming.find((rule) => rule?.id === defaultRule.id);
    const normalizedRule = normalizeSigilRule(existing, defaultRule);
    normalizedRule.locked = true;
    normalized.push(normalizedRule);
    seen.add(normalizedRule.id);
  });

  incoming.forEach((rule, index) => {
    if (!rule || seen.has(rule.id)) {
      return;
    }
    const normalizedRule = normalizeSigilRule(rule, makeDefaultSigilRule(index));
    normalized.push(normalizedRule);
    seen.add(normalizedRule.id);
  });

  return normalized;
}

function describeSigilRule(rule) {
  const usesText = ` Can be activated ${rule.uses} time${rule.uses === 1 ? "" : "s"} before fading.`;
  switch (rule.effectType) {
    case "heal":
      return `Restores ${rule.value1} HP to the player.${usesText}`;
    case "maxHp":
      return `Raises max HP by ${rule.value1}.${usesText}`;
    case "attackBuff":
      return `Raises attack by ${rule.value1} for ${rule.value2} turns.${usesText}`;
    case "attackUp":
      return `Raises attack by ${rule.value1}.${usesText}`;
    case "defenseBuff":
      return `Raises defense by ${rule.value1} for ${rule.value2} turns.${usesText}`;
    case "defenseUp":
      return `Raises defense by ${rule.value1}.${usesText}`;
    case "hunger":
      return `Restores ${rule.value1} hunger.${usesText}`;
    case "maxHunger":
      return `Raises max hunger by ${rule.value1}.${usesText}`;
    case "inventoryUp":
      return `Raises inventory slots by ${rule.value1}.${usesText}`;
    default:
      return `Sigil effect not set.${usesText}`;
  }
}

function renderSigilPoolControls(rules = undefined) {
  sigilPoolList.innerHTML = "";
  normalizeSigilPoolRules(rules).forEach((rule) => {
    const meta = getSigilEffectMeta(rule.effectType);
    const row = document.createElement("div");
    row.className = "sigil-row";
    row.dataset.sigilId = rule.id;
    row.dataset.locked = rule.locked ? "true" : "false";
    const effectOptions = sigilEffectOptions.map((option) => (
      `<option value="${option.id}"${option.id === rule.effectType ? " selected" : ""}>${option.label}</option>`
    )).join("");
    row.innerHTML = `
      <div class="sigil-row-header">
        <strong>${escapeHtml(rule.name)}</strong>
        <div class="item-actions">
          <label><input type="checkbox" data-target="enabled"${rule.enabled ? " checked" : ""} /> Enable</label>
          <button type="button" data-action="remove_sigil">Remove</button>
        </div>
      </div>
      <div class="sigil-fields">
        <label>
          Name
          <input type="text" data-target="name" maxlength="24" value="${escapeHtml(rule.name)}" />
        </label>
        <label>
          Effect
          <select data-target="effectType">${effectOptions}</select>
        </label>
        <label data-value1-wrap${meta.label1 ? "" : ' class="hidden"'}>
          <span data-value1-label>${meta.label1 || "Value 1"}</span>
          <input type="number" data-target="value1" min="${meta.min1}" max="${meta.max1}" value="${rule.value1}" />
        </label>
        <label data-value2-wrap${meta.label2 ? "" : ' class="hidden"'}>
          <span data-value2-label>${meta.label2 || "Value 2"}</span>
          <input type="number" data-target="value2" min="${meta.min2}" max="${meta.max2}" value="${rule.value2}" />
        </label>
        <label>
          Uses
          <input type="number" data-target="uses" min="1" max="99" value="${rule.uses}" />
        </label>
      </div>
      <p class="sigil-summary">${describeSigilRule(rule)}</p>
    `;
    sigilPoolList.append(row);
  });
  refreshSigilEditorState();
  syncBulkEnableToggle(sigilEnableAll, sigilPoolList.querySelectorAll(".sigil-row"));
}

function readSigilPoolRules() {
  return Array.from(sigilPoolList.querySelectorAll(".sigil-row")).map((row, index) => {
    const fallback = defaultSigilRules.find((rule) => rule.id === row.dataset.sigilId) ?? makeDefaultSigilRule(index);
    return normalizeSigilRule({
      id: row.dataset.sigilId,
      name: row.querySelector('[data-target="name"]')?.value,
      enabled: row.querySelector('[data-target="enabled"]')?.checked,
      effectType: row.querySelector('[data-target="effectType"]')?.value,
      value1: row.querySelector('[data-target="value1"]')?.value,
      value2: row.querySelector('[data-target="value2"]')?.value,
      uses: row.querySelector('[data-target="uses"]')?.value,
      locked: row.dataset.locked === "true",
    }, fallback);
  });
}

function applySigilPoolRules(rules = undefined) {
  renderSigilPoolControls(rules);
}

function refreshSigilEditorState() {
  sigilPoolList.querySelectorAll(".sigil-row").forEach((row) => {
    const effectType = row.querySelector('[data-target="effectType"]')?.value ?? "heal";
    const meta = getSigilEffectMeta(effectType);
    const value1Wrap = row.querySelector("[data-value1-wrap]");
    const value2Wrap = row.querySelector("[data-value2-wrap]");
    const value1Input = row.querySelector('[data-target="value1"]');
    const value2Input = row.querySelector('[data-target="value2"]');
    const value1Label = row.querySelector("[data-value1-label]");
    const value2Label = row.querySelector("[data-value2-label]");
    const normalized = normalizeSigilRule({
      id: row.dataset.sigilId,
      name: row.querySelector('[data-target="name"]')?.value,
      enabled: row.querySelector('[data-target="enabled"]')?.checked,
      effectType,
      value1: value1Input?.value,
      value2: value2Input?.value,
      uses: row.querySelector('[data-target="uses"]')?.value,
      locked: row.dataset.locked === "true",
    }, defaultSigilRules.find((rule) => rule.id === row.dataset.sigilId) ?? makeDefaultSigilRule());
    row.classList.toggle("recipe-entry-disabled", !normalized.enabled);

    if (value1Wrap) {
      value1Wrap.classList.toggle("hidden", !meta.label1);
    }
    if (value2Wrap) {
      value2Wrap.classList.toggle("hidden", !meta.label2);
    }
    if (value1Label) {
      value1Label.textContent = meta.label1 || "Value 1";
    }
    if (value2Label) {
      value2Label.textContent = meta.label2 || "Value 2";
    }
    if (value1Input) {
      value1Input.min = String(meta.min1);
      value1Input.max = String(meta.max1);
      value1Input.value = String(normalized.value1);
    }
    if (value2Input) {
      value2Input.min = String(meta.min2);
      value2Input.max = String(meta.max2);
      value2Input.value = String(normalized.value2);
    }
    const summary = row.querySelector(".sigil-summary");
    if (summary) {
      summary.textContent = describeSigilRule(normalized);
    }
    const title = row.querySelector(".sigil-row-header strong");
    if (title) {
      title.textContent = normalized.name || "Custom Sigil";
    }
  });
  syncBulkEnableToggle(sigilEnableAll, sigilPoolList.querySelectorAll(".sigil-row"));
}

function addSigilRule() {
  const rules = readSigilPoolRules();
  rules.unshift(makeDefaultSigilRule(rules.length));
  renderSigilPoolControls(rules);
}

function getDefaultScrollAmount(scrollEffect = "uncurse") {
  return scrollEffect === "clearTraps" ? 99 : 1;
}

function getScrollAmountLabel(scrollEffect = "uncurse") {
  if (scrollEffect === "upgradeSword" || scrollEffect === "upgradeShield") {
    return "Upgrade";
  }
  if (scrollEffect === "clearTraps") {
    return "Traps";
  }
  return "Cures";
}

const itemEffectDefinitions = [
  { id: "heal", label: "Heal HP", kinds: ["food", "scroll", "string", "utility"], valueLabel: "HP", min: 0, step: 1 },
  { id: "attackBuff", label: "Attack Buff", kinds: ["food", "scroll", "string", "utility"], valueLabel: "Atk+", min: -99, step: 1, extraLabel: "Turns", extraMin: 0, extraStep: 1, defaultExtra: 12 },
  { id: "defenseBuff", label: "Defense Buff", kinds: ["food", "scroll", "string", "utility"], valueLabel: "Def+", min: -99, step: 1, extraLabel: "Turns", extraMin: 0, extraStep: 1, defaultExtra: 12 },
  { id: "hungerFill", label: "Restore Hunger", kinds: ["food", "scroll", "string", "utility"], valueLabel: "Hunger", min: 0, step: 1 },
  { id: "foodMaxHungerUp", label: "Increase Max Hunger", kinds: ["food"], valueLabel: "Max Hunger+", min: 1, step: 1 },
  { id: "foodMaxHungerAtFull", label: "When Full Hunger, Increase Max Hunger", kinds: ["food"], valueLabel: "Max Hunger+", min: 1, step: 1 },
  { id: "foodRestoreAllHunger", label: "Restore All Hunger", kinds: ["food"], valueLabel: "On", min: 1, step: 1, booleanValue: true },
  { id: "foodSelfDamage", label: "Take Damage", kinds: ["food"], valueLabel: "Damage", min: 1, step: 1 },
  { id: "foodFartWarp", label: "Teleport Room Enemies Due To Farts", kinds: ["food"], valueLabel: "On", min: 1, step: 1, booleanValue: true },
  { id: "maxHpBonus", label: "Max HP", kinds: ["bracelet", "food", "scroll", "string", "utility"], valueLabel: "Amount", min: -99, step: 1 },
  { id: "maxHungerBonus", label: "Max Hunger", kinds: ["bracelet", "scroll", "string", "utility"], valueLabel: "Amount", min: -99, step: 1 },
  { id: "goldGain", label: "Gain Gold", kinds: ["food", "scroll", "string", "utility"], valueLabel: "Gold", min: -9999, step: 1 },
  { id: "negateTraps", label: "Negate Traps", kinds: ["bracelet", "food", "scroll", "string", "utility"], valueLabel: "On", min: 1, step: 1, booleanValue: true, extraLabel: "Turns", extraMin: 0, extraStep: 1, defaultExtra: 12 },
  { id: "grassHeal", label: "Heal HP", kinds: ["grass"], valueLabel: "HP", min: 0, step: 1 },
  { id: "grassMaxHpAtFull", label: "When HP Is Full, Increase Max HP", kinds: ["grass"], valueLabel: "Max HP+", min: 1, step: 1 },
  { id: "grassRevive", label: "Revive Player After Death", kinds: ["grass"], valueLabel: "On", min: 1, step: 1, booleanValue: true },
  { id: "grassMaxHungerUp", label: "Increase Max Hunger", kinds: ["grass"], valueLabel: "Max Hunger+", min: 1, step: 1 },
  { id: "grassMaxHungerDown", label: "Decrease Max Hunger", kinds: ["grass"], valueLabel: "Max Hunger-", min: 1, step: 1 },
  { id: "grassFireBreath", label: "Breath Fire", kinds: ["grass"], valueLabel: "Damage", min: 1, step: 1 },
  { id: "grassLeap", label: "Leap Somewhere On The Floor", kinds: ["grass"], valueLabel: "On", min: 1, step: 1, booleanValue: true },
  { id: "grassStrengthUp", label: "Increase Strength", kinds: ["grass"], valueLabel: "Atk+", min: 1, step: 1 },
  { id: "grassStrengthDown", label: "Decrease Strength", kinds: ["grass"], valueLabel: "Atk-", min: 1, step: 1 },
  { id: "grassSelfDamage", label: "Deal Damage To Player", kinds: ["grass"], valueLabel: "Damage", min: 1, step: 1 },
  { id: "grassTrapSight", label: "Allows Player To See Traps", kinds: ["grass"], valueLabel: "On", min: 1, step: 1, booleanValue: true },
  { id: "grassActionSpeed", label: "Increase Action Speed", kinds: ["grass"], valueLabel: "Turns", min: 1, step: 1 },
  { id: "grassAttackBuff", label: "Temporarily Increase Attack Power", kinds: ["grass"], valueLabel: "Turns", min: 1, step: 1 },
  { id: "grassDefenseBuff", label: "Temporarily Increase Defense Power", kinds: ["grass"], valueLabel: "Turns", min: 1, step: 1 },
  { id: "grassInvincible", label: "Grant Invincibility", kinds: ["grass"], valueLabel: "Turns", min: 1, step: 1 },
  { id: "grassLevelUp", label: "Increase Level", kinds: ["grass"], valueLabel: "Levels", min: 1, step: 1 },
  { id: "grassLevelDown", label: "Decrease Level", kinds: ["grass"], valueLabel: "Levels", min: 1, step: 1 },
  { id: "shopDiscount", label: "Haggling", kinds: ["bracelet"], valueLabel: "% Off", min: 1, step: 1 },
  { id: "trapmore", label: "Trapmore", kinds: ["bracelet"], valueLabel: "Turns", min: 1, step: 1 },
  { id: "monstercall", label: "Monstercall", kinds: ["bracelet"], valueLabel: "Respawn %", min: 1, step: 1 },
  { id: "goldLosing", label: "Gold-losing", kinds: ["bracelet"], valueLabel: "Turns", min: 1, step: 1, extraLabel: "Gold", extraMin: 1, extraStep: 1, defaultExtra: 20 },
  { id: "itemLosing", label: "Item-losing", kinds: ["bracelet"], valueLabel: "Turns", min: 1, step: 1 },
  { id: "tiptoe", label: "Tiptoe", kinds: ["bracelet"], valueLabel: "On", min: 1, step: 1, booleanValue: true },
  { id: "wallPass", label: "Wallpass", kinds: ["bracelet"], valueLabel: "Wall %HP", min: 1, step: 1 },
  { id: "daredevil", label: "Daredevil", kinds: ["bracelet"], valueLabel: "Crit %", min: 1, step: 1, extraLabel: "Multiplier", extraMin: 1, extraStep: 0.1, defaultExtra: 1.5 },
  { id: "cursebreak", label: "Cursebreak", kinds: ["bracelet"], valueLabel: "On", min: 1, step: 1, booleanValue: true },
  { id: "rustproof", label: "Rustproof", kinds: ["bracelet"], valueLabel: "On", min: 1, step: 1, booleanValue: true },
  { id: "fortune", label: "Fortune", kinds: ["bracelet"], valueLabel: "XP/Turn", min: 1, step: 1 },
  { id: "strengthBonus", label: "Strength", kinds: ["bracelet"], valueLabel: "Atk+", min: -99, step: 1 },
  { id: "uncurse", label: "Uncurse Items", kinds: ["scroll", "string", "grass", "food", "utility"], valueLabel: "Count", min: 1, step: 1 },
  { id: "upgradeSword", label: "Upgrade Sword", kinds: ["scroll", "string", "grass", "food", "utility"], valueLabel: "Amount", min: 1, step: 1 },
  { id: "downgradeSword", label: "Downgrade Sword", kinds: ["scroll", "string", "grass", "food", "utility"], valueLabel: "Amount", min: 1, step: 1 },
  { id: "upgradeShield", label: "Upgrade Shield", kinds: ["scroll", "string", "grass", "food", "utility"], valueLabel: "Amount", min: 1, step: 1 },
  { id: "downgradeShield", label: "Downgrade Shield", kinds: ["scroll", "string", "grass", "food", "utility"], valueLabel: "Amount", min: 1, step: 1 },
  { id: "clearTraps", label: "Clear Traps", kinds: ["scroll", "string", "grass", "food", "utility"], valueLabel: "Count", min: 1, step: 1 },
];

function getItemEffectDefinition(effectType = "heal") {
  return itemEffectDefinitions.find((definition) => definition.id === effectType) ?? itemEffectDefinitions[0];
}

function getAllowedItemEffectDefinitions(kind = "grass") {
  return itemEffectDefinitions.filter((definition) => definition.kinds.includes(kind));
}

function getItemEffectTooltip(effectType = "heal") {
  switch (effectType) {
    case "heal":
      return "Restores HP when the item is used.";
    case "grassHeal":
      return "Restores the chosen amount of HP when the grass is used.";
    case "grassMaxHpAtFull":
      return "If HP is currently full, raises max HP by the chosen amount.";
    case "grassRevive":
      return "Grants a one-time revive that triggers after a collapse.";
    case "grassMaxHungerUp":
      return "Raises max hunger by the chosen amount.";
    case "grassMaxHungerDown":
      return "Lowers max hunger by the chosen amount.";
    case "grassFireBreath":
      return "Blasts nearby enemies with fire for the chosen damage.";
    case "grassLeap":
      return "Warps the player somewhere else on the floor.";
    case "grassStrengthUp":
      return "Raises the player's current strength by the chosen amount.";
    case "grassStrengthDown":
      return "Lowers the player's current strength by the chosen amount.";
    case "grassSelfDamage":
      return "Deals the chosen amount of damage to the player.";
    case "grassTrapSight":
      return "Reveals traps and lets the player keep seeing them for a while.";
    case "grassActionSpeed":
      return "Grants haste for the chosen number of turns, skipping enemy actions.";
    case "grassAttackBuff":
      return "Raises attack by 3 for the chosen number of turns.";
    case "grassDefenseBuff":
      return "Raises defense by 3 for the chosen number of turns.";
    case "grassInvincible":
      return "Prevents damage for the chosen number of turns.";
    case "grassLevelUp":
      return "Raises the player's level by the chosen amount if leveling is enabled.";
    case "grassLevelDown":
      return "Lowers the player's level by the chosen amount if leveling is enabled.";
    case "attackBuff":
      return "Temporarily raises attack for the chosen number of turns.";
    case "defenseBuff":
      return "Temporarily raises defense for the chosen number of turns.";
    case "hungerFill":
      return "Restores hunger immediately.";
    case "foodMaxHungerUp":
      return "Raises max hunger by the chosen amount when the food is eaten.";
    case "foodMaxHungerAtFull":
      return "If hunger is currently full, raises max hunger by the chosen amount.";
    case "foodRestoreAllHunger":
      return "Restores hunger all the way to the current maximum.";
    case "foodSelfDamage":
      return "Deals the chosen amount of damage to the player when eaten.";
    case "foodFartWarp":
      return "Teleports every enemy in the current room somewhere else on the floor.";
    case "maxHpBonus":
      return "Raises or lowers max HP while the bracelet is equipped, or permanently if used by a consumable effect.";
    case "maxHungerBonus":
      return "Raises or lowers max hunger while the bracelet is equipped, or permanently if used by a consumable effect.";
    case "goldGain":
      return "Immediately gives gold when the item is used.";
    case "negateTraps":
      return "Negates trap activation. On bracelets it is always active; on consumables it lasts for a duration.";
    case "shopDiscount":
      return "Lowers shop purchase prices by the chosen percent while equipped.";
    case "trapmore":
      return "Creates a new trap somewhere in the dungeon every set number of turns while equipped.";
    case "monstercall":
      return "Speeds up monster respawn by the chosen percent while equipped.";
    case "goldLosing":
      return "Every set number of walking steps, you drop the chosen amount of gold nearby.";
    case "itemLosing":
      return "Every set number of walking steps, you drop a random carried item nearby.";
    case "tiptoe":
      return "Unspotted monsters do not wake just because you walk next to them or enter their room.";
    case "wallPass":
      return "Lets you move through walls, but you take the chosen percent of max HP as damage each turn spent inside a wall.";
    case "daredevil":
      return "Gives both player and enemies a chance to land critical hits at the chosen multiplier.";
    case "cursebreak":
      return "Prevents equipped items from becoming cursed while the bracelet is equipped.";
    case "rustproof":
      return "Prevents equipped weapon and shield upgrade values from decreasing while the bracelet is equipped.";
    case "fortune":
      return "Grants the chosen amount of experience each turn while the bracelet is equipped.";
    case "strengthBonus":
      return "Raises the player's current attack power while the bracelet is equipped.";
    case "uncurse":
      return "Removes curses from items.";
    case "upgradeSword":
      return "Raises a sword's upgrade value.";
    case "downgradeSword":
      return "Lowers a sword's upgrade value.";
    case "upgradeShield":
      return "Raises a shield's upgrade value.";
    case "downgradeShield":
      return "Lowers a shield's upgrade value.";
    case "clearTraps":
      return "Removes traps from the floor.";
    default:
      return "No tooltip written yet for this effect.";
  }
}

function makeDefaultItemEffect(kind = "grass") {
  const definition = getAllowedItemEffectDefinitions(kind)[0] ?? itemEffectDefinitions[0];
  return {
    enabled: true,
    type: definition.id,
    value: definition.booleanValue ? 1 : Math.max(0, definition.min ?? 0),
    extra: definition.defaultExtra ?? 0,
  };
}

function normalizeItemEffect(effect = {}, kind = "grass") {
  const allowed = getAllowedItemEffectDefinitions(kind);
  const fallback = allowed[0] ?? itemEffectDefinitions[0];
  const normalizedType = kind === "grass"
    ? ({
      heal: "grassHeal",
      attackBuff: "grassAttackBuff",
      defenseBuff: "grassDefenseBuff",
      maxHungerBonus: Number(effect?.value ?? 0) < 0 ? "grassMaxHungerDown" : "grassMaxHungerUp",
    }[effect?.type] ?? effect?.type)
    : kind === "food"
      ? ({
        maxHungerBonus: Number(effect?.value ?? 0) < 0 ? "maxHungerBonus" : "foodMaxHungerUp",
      }[effect?.type] ?? effect?.type)
    : effect?.type;
  const definition = allowed.find((entry) => entry.id === normalizedType) ?? fallback;
  return {
    enabled: effect?.enabled !== false,
    type: definition.id,
    value: definition.booleanValue
      ? 1
      : Number.isFinite(Number(effect?.value))
        ? Number(effect.value)
        : Math.max(0, definition.min ?? 0),
    extra: Number.isFinite(Number(effect?.extra))
      ? Number(effect.extra)
      : (definition.defaultExtra ?? 0),
  };
}

function legacyItemEffectsFromRule(rule = {}) {
  const effects = [];
  if (rule.kind === "grass") {
    if (rule.heal) {
      effects.push({ enabled: true, type: "grassHeal", value: Number(rule.heal), extra: 0 });
    }
    if (rule.attackBuff) {
      effects.push({ enabled: true, type: "grassAttackBuff", value: Number(rule.duration ?? 12), extra: 0 });
    }
    if (rule.defenseBuff) {
      effects.push({ enabled: true, type: "grassDefenseBuff", value: Number(rule.duration ?? 12), extra: 0 });
    }
    if (rule.maxHungerBonus) {
      effects.push({
        enabled: true,
        type: Number(rule.maxHungerBonus) < 0 ? "grassMaxHungerDown" : "grassMaxHungerUp",
        value: Math.abs(Number(rule.maxHungerBonus)),
        extra: 0,
      });
    }
  } else {
    if (rule.heal) {
      effects.push({ enabled: true, type: "heal", value: Number(rule.heal), extra: 0 });
    }
    if (rule.attackBuff) {
      effects.push({ enabled: true, type: "attackBuff", value: Number(rule.attackBuff), extra: Number(rule.duration ?? 12) });
    }
    if (rule.defenseBuff) {
      effects.push({ enabled: true, type: "defenseBuff", value: Number(rule.defenseBuff), extra: Number(rule.duration ?? 12) });
    }
    if (rule.hungerFill) {
      effects.push({ enabled: true, type: "hungerFill", value: Number(rule.hungerFill), extra: 0 });
    }
    if (rule.maxHpBonus) {
      effects.push({ enabled: true, type: "maxHpBonus", value: Number(rule.maxHpBonus), extra: 0 });
    }
    if (rule.maxHungerBonus) {
      effects.push({ enabled: true, type: "maxHungerBonus", value: Number(rule.maxHungerBonus), extra: 0 });
    }
    if (rule.gold) {
      effects.push({ enabled: true, type: "goldGain", value: Number(rule.gold), extra: 0 });
    }
    if (rule.negateTraps) {
      effects.push({ enabled: true, type: "negateTraps", value: 1, extra: 0 });
    }
  }
  if (rule.scrollEffect) {
    effects.push({ enabled: true, type: rule.scrollEffect, value: Number(rule.scrollAmount ?? getDefaultScrollAmount(rule.scrollEffect)), extra: 0 });
  }
  return effects;
}

function getItemRuleEffects(rule = {}) {
  const kind = rule.kind ?? "grass";
  const source = Array.isArray(rule.effects) && rule.effects.length > 0
    ? rule.effects
    : legacyItemEffectsFromRule(rule);
  return source.map((effect) => normalizeItemEffect(effect, kind));
}

function applyLegacyItemFieldsFromEffects(rule = {}) {
  const effects = getItemRuleEffects(rule);
  const firstScroll = effects.find((effect) => ["uncurse", "upgradeSword", "downgradeSword", "upgradeShield", "downgradeShield", "clearTraps"].includes(effect.type));
  if (rule.kind === "grass") {
    rule.heal = effects.filter((effect) => effect.type === "grassHeal" && effect.enabled).reduce((sum, effect) => sum + Number(effect.value || 0), 0);
    rule.attackBuff = effects.some((effect) => effect.type === "grassAttackBuff" && effect.enabled) ? 3 : 0;
    rule.defenseBuff = effects.some((effect) => effect.type === "grassDefenseBuff" && effect.enabled) ? 3 : 0;
    rule.duration = effects
      .filter((effect) => ["grassAttackBuff", "grassDefenseBuff"].includes(effect.type) && effect.enabled)
      .reduce((max, effect) => Math.max(max, Number(effect.value || 0)), 0);
    rule.hungerFill = 0;
    rule.maxHpBonus = 0;
    rule.maxHungerBonus = effects
      .filter((effect) => effect.enabled)
      .reduce((sum, effect) => {
        if (effect.type === "grassMaxHungerUp") {
          return sum + Number(effect.value || 0);
        }
        if (effect.type === "grassMaxHungerDown") {
          return sum - Number(effect.value || 0);
        }
        return sum;
      }, 0);
    rule.gold = 0;
    rule.negateTraps = false;
  } else {
    rule.heal = effects.filter((effect) => effect.type === "heal" && effect.enabled).reduce((sum, effect) => sum + Number(effect.value || 0), 0);
    rule.attackBuff = effects.filter((effect) => effect.type === "attackBuff" && effect.enabled).reduce((sum, effect) => sum + Number(effect.value || 0), 0);
    rule.defenseBuff = effects.filter((effect) => effect.type === "defenseBuff" && effect.enabled).reduce((sum, effect) => sum + Number(effect.value || 0), 0);
    rule.duration = effects
      .filter((effect) => ["attackBuff", "defenseBuff"].includes(effect.type) && effect.enabled)
      .reduce((max, effect) => Math.max(max, Number(effect.extra || 0)), 0);
    rule.hungerFill = effects.filter((effect) => effect.type === "hungerFill" && effect.enabled).reduce((sum, effect) => sum + Number(effect.value || 0), 0);
    rule.maxHpBonus = effects.filter((effect) => effect.type === "maxHpBonus" && effect.enabled).reduce((sum, effect) => sum + Number(effect.value || 0), 0);
    rule.maxHungerBonus = effects.filter((effect) => effect.type === "maxHungerBonus" && effect.enabled).reduce((sum, effect) => sum + Number(effect.value || 0), 0);
    rule.gold = effects.filter((effect) => effect.type === "goldGain" && effect.enabled).reduce((sum, effect) => sum + Number(effect.value || 0), 0);
    rule.negateTraps = effects.some((effect) => effect.type === "negateTraps" && effect.enabled);
  }
  rule.scrollEffect = firstScroll?.type;
  rule.scrollAmount = firstScroll ? Math.max(1, Number(firstScroll.value || 1)) : undefined;
  rule.effects = effects;
  return rule;
}

function getDefaultItemShape(categoryId) {
  switch (categoryId) {
    case "weapons":
      return { kind: "hand", handType: "sword", attack: 3, sellValue: 60, buyValue: 180 };
    case "shields":
      return { kind: "hand", handType: "shield", defense: 3, sellValue: 60, buyValue: 180 };
    case "staffs":
      return { kind: "staff", element: "arcane", attack: 4, charges: 4, sellValue: 95, buyValue: 220 };
    case "bracelets":
      return { kind: "bracelet", negateTraps: false, maxHpBonus: 0, sellValue: 80, buyValue: 180 };
    case "grass":
      return { kind: "grass", heal: 6, attackBuff: 0, defenseBuff: 0, duration: 12, sellValue: 24, buyValue: 50 };
    case "food":
      return { kind: "food", hungerFill: 20, sellValue: 18, buyValue: 45 };
    case "strings":
      return { kind: "string", stringEffect: "preservation", uses: 3, sellValue: 70, buyValue: 160 };
    case "utility":
      return {
        kind: "utility",
        explosionPercent: 20,
        eligibleCategories: itemCategories.map((category) => category.id),
        sellValue: 66,
        buyValue: 135,
      };
    case "scrolls":
    default:
      return { kind: "scroll", scrollEffect: "uncurse", scrollAmount: 1, sellValue: 70, buyValue: 110, inventoryEffect: false };
  }
}

function getCategoryItemStem(categoryId) {
  const stems = {
    weapons: "weapon",
    shields: "shield",
    staffs: "staff",
    bracelets: "bracelet",
    grass: "grass",
    food: "food",
    scrolls: "scroll",
    utility: "utility",
  };
  return stems[categoryId] ?? "item";
}

function makeDefaultItemRule(categoryId) {
  const shape = getDefaultItemShape(categoryId);
  const stem = getCategoryItemStem(categoryId);
  return {
    itemId: makeId(stem),
    name: `Custom ${titleCase(stem)}`,
    enabled: true,
    deleted: false,
    ...shape,
  };
}

function normalizeItemPoolRule(rule, fallback = {}) {
  const base = { ...fallback, ...rule };
  return applyLegacyItemFieldsFromEffects({
    itemId: base.itemId ?? makeId("item"),
    name: (base.name ?? "Custom Item").trim() || "Custom Item",
    kind: base.kind ?? fallback.kind ?? "grass",
    effects: getItemRuleEffects(base),
    handType: base.handType ?? fallback.handType,
    element: base.element ?? fallback.element,
    scrollEffect: base.scrollEffect ?? fallback.scrollEffect,
    enabled: Boolean(base.enabled ?? true),
    deleted: Boolean(base.deleted),
    attack: ["hand", "staff"].includes(base.kind) && (base.kind === "staff" || base.handType === "sword")
      ? Math.max(0, Number(base.attack ?? fallback.attack ?? 0))
      : undefined,
    defense: base.kind === "hand" && base.handType === "shield"
      ? Math.max(0, Number(base.defense ?? fallback.defense ?? 0))
      : undefined,
    charges: base.kind === "staff"
      ? Math.max(0, Number(base.charges ?? fallback.charges ?? 0))
      : undefined,
    stringEffect: base.kind === "string"
      ? (["preservation", "synthesis", "cashing"].includes(base.stringEffect) ? base.stringEffect : (fallback.stringEffect ?? "preservation"))
      : undefined,
    uses: base.kind === "string"
      ? Math.max(1, Number(base.uses ?? fallback.uses ?? 1))
      : undefined,
    heal: base.kind === "grass" ? Math.max(0, Number(base.heal ?? fallback.heal ?? 0)) : undefined,
    attackBuff: base.kind === "grass" ? Number(base.attackBuff ?? fallback.attackBuff ?? 0) : undefined,
    defenseBuff: base.kind === "grass" ? Number(base.defenseBuff ?? fallback.defenseBuff ?? 0) : undefined,
    duration: base.kind === "grass" ? Math.max(0, Number(base.duration ?? fallback.duration ?? 0)) : undefined,
    hungerFill: base.kind === "food" ? Math.max(0, Number(base.hungerFill ?? fallback.hungerFill ?? 0)) : undefined,
    negateTraps: base.kind === "bracelet" ? Boolean(base.negateTraps) : undefined,
    maxHpBonus: base.kind === "bracelet" ? Math.max(0, Number(base.maxHpBonus ?? fallback.maxHpBonus ?? 0)) : undefined,
    scrollAmount: base.kind === "scroll"
      ? Math.max(1, Number(base.scrollAmount ?? fallback.scrollAmount ?? getDefaultScrollAmount(base.scrollEffect ?? fallback.scrollEffect ?? "uncurse")))
      : undefined,
    explosionPercent: base.kind === "utility" ? clampNumber(base.explosionPercent, 0, 100, fallback.explosionPercent ?? 20) : undefined,
    eligibleCategories: base.kind === "utility"
      ? Array.from(new Set(
        (Array.isArray(base.eligibleCategories) ? base.eligibleCategories : fallback.eligibleCategories ?? itemCategories.map((category) => category.id))
          .filter((categoryId) => itemCategories.some((category) => category.id === categoryId)),
      ))
      : undefined,
    sellValue: Math.max(0, Number(base.sellValue ?? fallback.sellValue ?? 0)),
    buyValue: Math.max(0, Number(base.buyValue ?? fallback.buyValue ?? 0)),
    inventoryEffect: base.kind === "scroll" ? Boolean(base.inventoryEffect) : undefined,
    runeIds: base.kind === "hand"
      ? Array.from(new Set((Array.isArray(base.runeIds) ? base.runeIds : []).filter((runeId) => typeof runeId === "string" && runeId.trim())))
      : undefined,
    specialAttackIds: base.kind === "hand"
      ? Array.from(new Set((Array.isArray(base.specialAttackIds) ? base.specialAttackIds : []).filter((attackId) => typeof attackId === "string" && attackId.trim())))
      : undefined,
  });
}

function normalizeItemPoolRules(rules = undefined) {
  const incoming = Array.isArray(rules) ? rules : [];
  if (rules !== undefined) {
    if (incoming.length === 0) {
      return [];
    }
    return incoming.map((rule) => normalizeItemPoolRule(
      rule,
      defaultItemDefinitionCatalog[rule?.itemId] ?? getDefaultItemShape(getItemCategoryIdFromRule(rule) || "grass"),
    ));
  }
  const normalized = [];
  const seen = new Set();
  Object.entries(defaultItemDefinitionCatalog)
    .filter(([, item]) => item.kind !== "gold")
    .forEach(([itemId, item]) => {
      const existing = incoming.find((rule) => rule.itemId === itemId) ?? {};
      normalized.push(normalizeItemPoolRule({ ...existing, itemId, name: existing.name ?? item.name }, item));
      seen.add(itemId);
    });
  incoming.forEach((rule) => {
    if (!rule?.itemId || seen.has(rule.itemId)) {
      return;
    }
    normalized.push(normalizeItemPoolRule(rule, getDefaultItemShape(getItemCategoryIdFromRule(rule) || "grass")));
    seen.add(rule.itemId);
  });
  return normalized;
}

function syncItemDefinitionsFromRules(rules = []) {
  Object.keys(itemDefinitions).forEach((key) => delete itemDefinitions[key]);
  Object.entries(defaultItemDefinitionCatalog).forEach(([itemId, item]) => {
    itemDefinitions[itemId] = item.kind === "gold"
      ? { ...item }
      : { ...item, deleted: true };
  });
  normalizeItemPoolRules(rules).forEach((rule) => {
    itemDefinitions[rule.itemId] = {
      ...(defaultItemDefinitionCatalog[rule.itemId] ?? {}),
      attack: rule.attack,
      defense: rule.defense,
      charges: rule.charges,
      stringEffect: rule.stringEffect,
      uses: rule.uses,
      heal: rule.heal,
      attackBuff: rule.attackBuff,
      defenseBuff: rule.defenseBuff,
      duration: rule.duration,
      hungerFill: rule.hungerFill,
      negateTraps: rule.negateTraps,
      maxHpBonus: rule.maxHpBonus,
      maxHungerBonus: rule.maxHungerBonus,
      gold: rule.gold,
      scrollAmount: rule.scrollAmount,
      effects: rule.effects,
      name: rule.name,
      kind: rule.kind,
      handType: rule.handType,
      stringEffect: rule.stringEffect,
      element: rule.element,
      scrollEffect: rule.scrollEffect,
      sellValue: rule.sellValue,
      buyValue: rule.buyValue,
      explosionPercent: rule.explosionPercent,
      eligibleCategories: rule.eligibleCategories,
      deleted: Boolean(rule.deleted),
      inventoryEffect: rule.inventoryEffect,
      runeIds: rule.runeIds,
    };
  });
}

function getItemCategoryIdFromRule(rule) {
  const pseudoItem = {
    kind: rule.kind,
    handType: rule.handType,
  };
  return itemCategories.find((category) => category.filter(pseudoItem))?.id ?? "";
}

function renderItemEffectRow(effect, kind, index) {
  const definition = getItemEffectDefinition(effect.type);
  const tooltip = escapeHtml(getItemEffectTooltip(effect.type));
  const options = getAllowedItemEffectDefinitions(kind).map((entry) => (
    `<option value="${escapeHtml(entry.id)}"${entry.id === effect.type ? " selected" : ""}>${escapeHtml(entry.label)}</option>`
  )).join("");
  const valueInput = definition.booleanValue
    ? ""
    : `<label class="item-effect-stat">
         <span>${escapeHtml(definition.valueLabel ?? "Value")}</span>
         <input type="number" data-target="effectValue" min="${definition.min ?? -999}" step="${definition.step ?? 1}" value="${Number(effect.value ?? 0)}" />
       </label>`;
  const extraInput = definition.extraLabel
    ? `<label class="item-effect-stat">
         <span>${escapeHtml(definition.extraLabel)}</span>
         <input type="number" data-target="effectExtra" min="${definition.extraMin ?? 0}" step="${definition.extraStep ?? 1}" value="${Number(effect.extra ?? definition.defaultExtra ?? 0)}" />
       </label>`
    : "";
  return `
    <div class="item-effect-row" data-effect-index="${index}" title="${tooltip}">
      <label class="inline-check">
        <input type="checkbox" data-target="effectEnabled"${effect.enabled ? " checked" : ""} />
        On
      </label>
      <label class="item-pool-select" title="${tooltip}">
        <span>Effect</span>
        <select data-target="effectType" title="${tooltip}">${options}</select>
      </label>
      ${valueInput}
      ${extraInput}
      <button type="button" data-action="remove_item_effect">Remove</button>
    </div>
  `;
}

function renderItemEffectsEditor(rule) {
  if (!["bracelet", "grass", "food", "scroll", "string"].includes(rule.kind)) {
    return "";
  }
  const effects = getItemRuleEffects(rule);
  return `
    <details class="item-pool-effects">
      <summary>Effects</summary>
      <div class="item-effect-list">
        ${effects.map((effect, index) => renderItemEffectRow(effect, rule.kind, index)).join("") || '<p class="item-pool-tip">No effects yet.</p>'}
      </div>
      <div class="item-effect-actions">
        <button type="button" data-action="add_item_effect">+ Add Effect</button>
      </div>
    </details>
  `;
}

function captureItemPoolOpenState() {
  const categoryState = {};
  const sectionState = {};
  itemPoolList.querySelectorAll(".item-pool-category").forEach((category) => {
    if (category.dataset.category) {
      categoryState[category.dataset.category] = category.open;
    }
  });
  itemPoolList.querySelectorAll(".item-pool-row").forEach((row) => {
    const itemId = row.dataset.item;
    if (!itemId) {
      return;
    }
    sectionState[itemId] = {
      effects: row.querySelector(".item-pool-effects")?.open ?? false,
      runes: row.querySelector(".item-pool-runes")?.open ?? false,
      specialAttacks: row.querySelector(".item-pool-special-attacks")?.open ?? false,
      eligible: row.querySelector(".item-pool-eligible")?.open ?? false,
    };
  });
  return { categoryState, sectionState };
}

function renderItemPoolControls(rules = undefined) {
  const openState = captureItemPoolOpenState();
  const normalized = normalizeItemPoolRules(rules);
  const availableRunes = normalizeRunePoolRules(
    runePoolList.querySelector(".rune-row")
      ? readRunePoolRules()
      : game.recipe?.runePoolRules
  ).filter((rune) => rune.enabled);
  const availableSpecialAttacks = normalizeSpecialAttackRules(
    specialAttackList.querySelector(".special-attack-row")
      ? readSpecialAttackRules()
      : game.recipe?.specialAttackRules
  ).filter((attack) => attack.enabled);
  const enabledRuneIds = new Set(availableRunes.map((rune) => rune.id));
  const enabledSpecialAttackIds = new Set(availableSpecialAttacks.map((attack) => attack.id));
  syncItemDefinitionsFromRules(normalized);
  itemPoolList.innerHTML = "";
  itemCategories.forEach((category) => {
    const details = document.createElement("details");
    details.className = "item-pool-category";
    details.dataset.category = category.id;
    details.open = openState.categoryState[category.id] ?? details.open;

    const summary = document.createElement("summary");
    summary.textContent = category.name;
    details.append(summary);

    const entries = document.createElement("div");
    entries.className = "item-pool-entries";

    const categoryRow = document.createElement("div");
    categoryRow.className = "item-pool-category-control";
    categoryRow.innerHTML = `
      <strong>All ${category.name}</strong>
      <div class="item-actions">
        <button type="button" data-action="add_item" data-category="${category.id}">+ Add</button>
        <label><input type="checkbox" data-category-toggle checked /> Enable Category</label>
      </div>
    `;
    entries.append(categoryRow);

    normalized
      .filter((rule) => !rule.deleted && category.filter(rule))
      .forEach((rule) => {
        const rowOpenState = openState.sectionState[rule.itemId] ?? {};
        const row = document.createElement("div");
        row.className = `item-pool-row${rule.kind === "staff" ? " staff-row" : ""}${rule.kind === "grass" ? " grass-row" : ""}${rule.kind === "scroll" ? " scroll-row" : ""}`;
        if (!rule.enabled) {
          row.classList.add("recipe-entry-disabled");
        }
        row.dataset.item = rule.itemId;
        row.dataset.kind = rule.kind;
        row.dataset.handType = rule.handType ?? "";
        row.dataset.element = rule.element ?? "";
        row.dataset.scrollEffect = rule.scrollEffect ?? "";
        const statControl = rule.kind === "hand" || rule.kind === "staff"
          ? `<label class="item-pool-stat">
                <span>${rule.kind === "staff" || rule.handType === "sword" ? "Base Atk" : "Base Def"}</span>
                <input type="number" min="0" step="1" data-target="${rule.kind === "staff" || rule.handType === "sword" ? "attack" : "defense"}" value="${rule.kind === "staff" || rule.handType === "sword" ? rule.attack ?? 0 : rule.defense ?? 0}" />
              </label>`
          : "";
        const chargeControl = rule.kind === "staff"
          ? `<label class="item-pool-stat">
                <span>Charges</span>
                <input type="number" min="0" step="1" data-target="charges" value="${rule.charges ?? 0}" />
              </label>`
          : "";
        const stringControls = rule.kind === "string"
          ? `<label class="item-pool-select">
               <span>Type</span>
               <select data-target="stringEffect">
                 <option value="preservation"${rule.stringEffect === "preservation" ? " selected" : ""}>Preservation</option>
                 <option value="synthesis"${rule.stringEffect === "synthesis" ? " selected" : ""}>Synthesis</option>
                 <option value="cashing"${rule.stringEffect === "cashing" ? " selected" : ""}>Cashing</option>
               </select>
             </label>
             <label class="item-pool-stat">
               <span>Uses</span>
               <input type="number" min="1" step="1" data-target="uses" value="${rule.uses ?? 1}" />
             </label>`
          : "";
        const sellControl = rule.kind !== "gold"
          ? `<label class="item-pool-stat item-pool-price">
                <span>Sell</span>
                <input type="number" min="0" step="1" data-target="sellValue" value="${rule.sellValue ?? 0}" />
              </label>
              <label class="item-pool-stat item-pool-price">
                <span>Buy</span>
                <input type="number" min="0" step="1" data-target="buyValue" value="${rule.buyValue ?? 0}" />
              </label>`
          : "";
        const effectEditor = renderItemEffectsEditor(rule);
        const scrollFlag = rule.kind === "scroll"
          ? `<label class="item-pool-flag">
              <input type="checkbox" data-target="inventoryEffect" />
              Inventory Effect
            </label>`
          : "";
        const utilityStatControl = rule.kind === "utility"
          ? `<label class="item-pool-stat">
              <span>Explosion %</span>
              <input type="number" min="0" max="100" step="1" data-target="explosionPercent" value="${rule.explosionPercent ?? 20}" />
            </label>`
          : "";
        const utilityEligibleControl = rule.kind === "utility"
          ? `<details class="item-pool-eligible">
              <summary>Eligible Items</summary>
              <div class="item-pool-category-list">
                ${itemCategories.map((category) => `
                  <label class="item-pool-category-option">
                    <input type="checkbox" data-target="eligibleCategory" value="${escapeHtml(category.id)}"${(rule.eligibleCategories ?? []).includes(category.id) ? " checked" : ""} />
                    ${escapeHtml(category.name)}
                  </label>
                `).join("")}
              </div>
            </details>`
          : "";
        const compatibleRunes = availableRunes.filter((rune) => runeAppliesToHandType(rune, rule.handType));
        const compatibleRuneIds = new Set(compatibleRunes.map((rune) => rune.id));
        const activeRuneIds = (rule.runeIds ?? []).filter((runeId) => enabledRuneIds.has(runeId) && compatibleRuneIds.has(runeId));
        const activeSpecialAttackIds = (rule.specialAttackIds ?? []).filter((attackId) => enabledSpecialAttackIds.has(attackId));
        const selectedRuneNames = compatibleRunes
          .filter((rune) => activeRuneIds.includes(rune.id))
          .map((rune) => rune.name);
        const selectedSpecialAttackNames = availableSpecialAttacks
          .filter((attack) => activeSpecialAttackIds.includes(attack.id))
          .map((attack) => attack.name);
        const runeControl = rule.kind === "hand"
          ? `<details class="item-pool-runes">
              <summary>+ Runes${selectedRuneNames.length ? ` <span class="item-pool-rune-summary">${escapeHtml(selectedRuneNames.join(", "))}</span>` : ""}</summary>
              <div class="item-pool-rune-list">
                ${compatibleRunes.map((rune) => `
                  <label class="item-pool-rune-option">
                    <input type="checkbox" data-target="rune" value="${escapeHtml(rune.id)}"${activeRuneIds.includes(rune.id) ? " checked" : ""} />
                    ${escapeHtml(rune.name)}
                  </label>
                `).join("") || '<p class="item-pool-tip">No compatible enabled runes created yet.</p>'}
              </div>
            </details>`
          : "";
        const specialAttackControl = rule.kind === "hand"
          ? `<details class="item-pool-special-attacks">
              <summary>+ Special Attacks${selectedSpecialAttackNames.length ? ` <span class="item-pool-rune-summary">${escapeHtml(selectedSpecialAttackNames.join(", "))}</span>` : ""}</summary>
              <div class="item-pool-rune-list">
                ${availableSpecialAttacks.map((attack) => `
                  <label class="item-pool-rune-option">
                    <input type="checkbox" data-target="specialAttack" value="${escapeHtml(attack.id)}"${activeSpecialAttackIds.includes(attack.id) ? " checked" : ""} />
                    ${escapeHtml(attack.name)}
                  </label>
                `).join("") || '<p class="item-pool-tip">No enabled special attacks created yet.</p>'}
              </div>
            </details>`
          : "";
        const itemActionsMarkup = `
          <div class="item-actions">
            <label><input type="checkbox" data-target="enabled"${rule.enabled ? " checked" : ""} /> Enable</label>
            <button type="button" data-action="remove_item">Remove</button>
          </div>
        `;
        row.innerHTML = `
          <label class="item-pool-name">
            <input type="text" data-target="name" maxlength="28" value="${escapeHtml(rule.name)}" />
          </label>
          ${statControl}
          ${chargeControl}
          ${stringControls}
          ${sellControl}
          ${scrollFlag}
          ${utilityStatControl}
          ${itemActionsMarkup}
          ${effectEditor}
          ${utilityEligibleControl}
          ${runeControl}
          ${specialAttackControl}
        `;
        if (row.querySelector('[data-target="inventoryEffect"]')) {
          row.querySelector('[data-target="inventoryEffect"]').checked = Boolean(rule.inventoryEffect);
        }
        const effectsDetails = row.querySelector(".item-pool-effects");
        if (effectsDetails) {
          effectsDetails.open = rowOpenState.effects ?? false;
        }
        const runeDetails = row.querySelector(".item-pool-runes");
        if (runeDetails) {
          runeDetails.open = rowOpenState.runes ?? false;
        }
        const specialAttackDetails = row.querySelector(".item-pool-special-attacks");
        if (specialAttackDetails) {
          specialAttackDetails.open = rowOpenState.specialAttacks ?? false;
        }
        const eligibleDetails = row.querySelector(".item-pool-eligible");
        if (eligibleDetails) {
          eligibleDetails.open = rowOpenState.eligible ?? false;
        }
        entries.append(row);
      });

    if (category.id === "scrolls") {
      const tip = document.createElement("p");
      tip.className = "item-pool-tip";
      tip.textContent = "Inventory Effect means the scroll can sometimes affect every eligible item in your inventory instead of just one.";
      entries.append(tip);
    }

    details.append(entries);
    itemPoolList.append(details);
  });
  updateFoodPoolState();
}

function readItemPoolRules() {
  return Array.from(itemPoolList.querySelectorAll(".item-pool-row")).map((row) => {
    const rule = {
      itemId: row.dataset.item,
      name: row.querySelector('[data-target="name"]')?.value?.trim() || "Custom Item",
      kind: row.dataset.kind,
      handType: row.dataset.handType || undefined,
      element: row.dataset.element || undefined,
      enabled: row.querySelector('[data-target="enabled"]').checked,
      attack: row.querySelector('[data-target="attack"]') ? Math.max(0, Number(row.querySelector('[data-target="attack"]').value)) : undefined,
      defense: row.querySelector('[data-target="defense"]') ? Math.max(0, Number(row.querySelector('[data-target="defense"]').value)) : undefined,
      charges: row.querySelector('[data-target="charges"]') ? Math.max(0, Number(row.querySelector('[data-target="charges"]').value)) : undefined,
      stringEffect: row.querySelector('[data-target="stringEffect"]')?.value ?? undefined,
      uses: row.querySelector('[data-target="uses"]') ? Math.max(1, Number(row.querySelector('[data-target="uses"]').value)) : undefined,
      sellValue: row.querySelector('[data-target="sellValue"]') ? Math.max(0, Number(row.querySelector('[data-target="sellValue"]').value)) : undefined,
      buyValue: row.querySelector('[data-target="buyValue"]') ? Math.max(0, Number(row.querySelector('[data-target="buyValue"]').value)) : undefined,
      inventoryEffect: row.querySelector('[data-target="inventoryEffect"]')?.checked ?? undefined,
      explosionPercent: row.querySelector('[data-target="explosionPercent"]') ? clampNumber(row.querySelector('[data-target="explosionPercent"]').value, 0, 100, 20) : undefined,
      eligibleCategories: Array.from(row.querySelectorAll('[data-target="eligibleCategory"]:checked')).map((checkbox) => checkbox.value),
      runeIds: Array.from(row.querySelectorAll('[data-target="rune"]:checked')).map((checkbox) => checkbox.value),
      specialAttackIds: Array.from(row.querySelectorAll('[data-target="specialAttack"]:checked')).map((checkbox) => checkbox.value),
      effects: Array.from(row.querySelectorAll(".item-effect-row")).map((effectRow) => normalizeItemEffect({
        enabled: effectRow.querySelector('[data-target="effectEnabled"]')?.checked,
        type: effectRow.querySelector('[data-target="effectType"]')?.value,
        value: effectRow.querySelector('[data-target="effectValue"]')?.value,
        extra: effectRow.querySelector('[data-target="effectExtra"]')?.value,
      }, row.dataset.kind)),
    };
    return applyLegacyItemFieldsFromEffects(rule);
  });
}

function applyItemPoolRules(rules = undefined) {
  renderItemPoolControls(rules);
}

function addItemPoolEntry(categoryId) {
  const rules = normalizeItemPoolRules(readItemPoolRules());
  rules.unshift(makeDefaultItemRule(categoryId));
  renderItemPoolControls(rules);
}

function addItemEffectRow(itemId) {
  const rules = normalizeItemPoolRules(readItemPoolRules());
  const rule = rules.find((entry) => entry.itemId === itemId);
  if (!rule) {
    return;
  }
  rule.effects = [makeDefaultItemEffect(rule.kind), ...getItemRuleEffects(rule)];
  renderItemPoolControls(rules);
}

function removeItemEffectRow(itemId, effectIndex) {
  const rules = normalizeItemPoolRules(readItemPoolRules());
  const rule = rules.find((entry) => entry.itemId === itemId);
  if (!rule) {
    return;
  }
  rule.effects = getItemRuleEffects(rule).filter((_, index) => index !== effectIndex);
  renderItemPoolControls(rules);
}

function updateFoodPoolState() {
  const hungerEnabled = controls.hungerEnabled.checked === true;
  const foodCategory = itemPoolList.querySelector('.item-pool-category[data-category="food"]');
  if (!foodCategory) {
    return;
  }
  foodCategory.querySelectorAll("input, select, button").forEach((control) => {
    control.disabled = !hungerEnabled;
  });
  updateItemPoolCategoryToggles();
}

function updateItemPoolRuneSummary(row) {
  const details = row?.querySelector(".item-pool-runes");
  if (!details) {
    return;
  }
  const summary = details.querySelector("summary");
  if (!summary) {
    return;
  }
  const checkedNames = Array.from(details.querySelectorAll('[data-target="rune"]:checked'))
    .map((checkbox) => checkbox.closest(".item-pool-rune-option")?.textContent?.trim())
    .filter(Boolean);
  const summaryText = summary.childNodes[0];
  if (summaryText) {
    summaryText.textContent = "+ Runes";
  } else {
    summary.prepend(document.createTextNode("+ Runes"));
  }
  let summaryElement = summary.querySelector(".item-pool-rune-summary");
  if (checkedNames.length === 0) {
    summaryElement?.remove();
    return;
  }
  if (!summaryElement) {
    summaryElement = document.createElement("span");
    summaryElement.className = "item-pool-rune-summary";
    summary.append(summaryElement);
  }
  summaryElement.textContent = checkedNames.join(", ");
}

function updateItemPoolSpecialAttackSummary(row) {
  const details = row?.querySelector(".item-pool-special-attacks");
  if (!details) {
    return;
  }
  const summary = details.querySelector("summary");
  if (!summary) {
    return;
  }
  const checkedNames = Array.from(details.querySelectorAll('[data-target="specialAttack"]:checked'))
    .map((checkbox) => checkbox.closest(".item-pool-rune-option")?.textContent?.trim())
    .filter(Boolean);
  const summaryText = summary.childNodes[0];
  if (summaryText) {
    summaryText.textContent = "+ Special Attacks";
  } else {
    summary.prepend(document.createTextNode("+ Special Attacks"));
  }
  let summaryElement = summary.querySelector(".item-pool-rune-summary");
  if (checkedNames.length === 0) {
    summaryElement?.remove();
    return;
  }
  if (!summaryElement) {
    summaryElement = document.createElement("span");
    summaryElement.className = "item-pool-rune-summary";
    summary.append(summaryElement);
  }
  summaryElement.textContent = checkedNames.join(", ");
}

function normalizeRuneRule(rule, fallback = {}) {
  const id = rule?.id ?? fallback.id ?? makeId("rune");
  const effectType = rule?.effectType ?? fallback.effectType ?? (
    id === "criticalRune"
      ? "critical"
      : id === "healingRune"
        ? "healing"
        : id === "antiMonsterRune"
          ? "antiMonster"
          : id === "rustproofRune"
            ? "rustproof"
            : id === "dullingRune"
              ? "dulling"
              : id === "cursedMightRune"
                ? "cursedMight"
                  : id === "driedBonitoRune"
                    ? "driedBonito"
                    : id === "trapFindingRune"
                      ? "trapFinding"
                      : id === "trapBustRune"
                        ? "trapBust"
                        : id === "wallDigRune"
                          ? "wallDig"
                          : id === "criticalAt7Rune"
                            ? "criticalAt7"
                            : id === "quintessenceRune"
                              ? "quintessence"
                              : id === "thirdStrikeRune"
                                ? "thirdStrike"
                                : id === "voraciousHitRune"
                                  ? "voraciousHit"
                                  : id === "costlyHitRune"
                                    ? "costlyHit"
                                    : id === "knockbackRune"
                                      ? "knockback"
            : id === "frontalAttackRune"
              ? "frontalAttack"
              : id === "accurateRune"
                ? "accurate"
                : id === "flameShotRune"
                  ? "flameShot"
                  : id === "swiftStrikesRune"
                    ? "swiftStrikes"
                    : id === "hpPlusRune"
                      ? "hpPlus"
                      : id === "dangerPowerRune"
                        ? "dangerPower"
                        : id === "hungerPowerRune"
                          ? "hungerPower"
                          : id === "thunderboltRune"
                            ? "thunderbolt"
                    : id === "sideAttackRune"
                      ? "sideAttack"
                      : id === "backAttackRune"
                        ? "backAttack"
                        : id === "toughAtXRune"
                          ? "toughAtX"
                          : id === "trapProofRune"
                            ? "trapProof"
                            : id === "satingRune"
                              ? "sating"
                              : id === "fullArmorRune"
                                ? "fullArmor"
                                : id === "gutsRune"
                                  ? "guts"
                                  : id === "voraciousBlockRune"
                                    ? "voraciousBlock"
                                    : id === "costlyBlockRune"
                                      ? "costlyBlock"
                                      : id === "critproofRune"
                                        ? "critproof"
                                        : id === "antiMonsterGuardRune"
                                        ? "antiMonsterGuard"
                                          : id === "keenRune"
                                            ? "keen"
                                            : id === "leapPaybackRune"
                                              ? "leapPayback"
                                              : id === "shadowPaybackRune"
                                                ? "shadowPayback"
                                                : id === "retributionRune"
                                                  ? "retribution"
          : id === "shieldDullingRune"
            ? "shieldDulling"
            : "swordDulling"
  );
  const defaultAppliesTo = ["shieldDulling", "toughAtX", "trapProof", "sating", "fullArmor", "guts", "voraciousBlock", "costlyBlock", "critproof", "antiMonsterGuard", "keen"].includes(effectType)
    ? "shield"
    : effectType === "swordDulling"
      ? "weapon"
      : (fallback.appliesTo ?? "both");
  const appliesTo = ["weapon", "shield", "both"].includes(rule?.appliesTo)
    ? rule.appliesTo
    : ["weapon", "shield", "both"].includes(defaultAppliesTo)
      ? defaultAppliesTo
      : "both";
  const enemyTypes = getEnemyTypeOptions();
  const fallbackTargetTypeId = fallback.targetTypeId ?? enemyTypes[0]?.value ?? "";
  const validTypeIds = new Set(enemyTypes.map((option) => option.value));
  const targetTypeId = validTypeIds.has(rule?.targetTypeId) ? rule.targetTypeId : validTypeIds.has(fallbackTargetTypeId) ? fallbackTargetTypeId : enemyTypes[0]?.value ?? "";
  const criticalDigit = effectType === "criticalAt7"
    ? clampNumber(rule?.criticalDigit, 0, 9, fallback.criticalDigit ?? 7)
    : undefined;
  const toughDigit = effectType === "toughAtX"
    ? clampNumber(rule?.toughDigit, 0, 9, fallback.toughDigit ?? 7)
    : undefined;
  const resolvedName = effectType === "criticalAt7"
    ? `Critical at ${criticalDigit} Rune`
    : effectType === "toughAtX"
      ? `Tough at ${toughDigit} Rune`
    : ((rule?.name ?? fallback.name ?? "Custom Rune").trim() || "Custom Rune");
  return {
    id,
    name: resolvedName,
    effectType,
    appliesTo,
    enabled: Boolean(rule?.enabled ?? fallback.enabled ?? true),
    critChance: effectType === "critical" ? clampNumber(rule?.critChance, 0, 100, fallback.critChance ?? 30) : undefined,
    critMultiplier: effectType === "critical" ? clampNumber(rule?.critMultiplier, 1, 9, fallback.critMultiplier ?? 1.5) : undefined,
    healPercent: effectType === "healing" ? clampNumber(rule?.healPercent, 0, 100, fallback.healPercent ?? 10) : undefined,
    targetTypeId: ["antiMonster", "antiMonsterGuard"].includes(effectType) ? targetTypeId : undefined,
    targetScope: effectType === "antiMonster" ? "type" : undefined,
    bonusMultiplier: ["antiMonster", "voraciousHit", "costlyHit"].includes(effectType)
      ? clampNumber(rule?.bonusMultiplier, 1, 9, fallback.bonusMultiplier ?? 1.5)
      : undefined,
    curseBonus: effectType === "cursedMight" ? clampNumber(rule?.curseBonus, 1, 99, fallback.curseBonus ?? 1) : undefined,
    hpBonus: effectType === "hpPlus" ? clampNumber(rule?.hpBonus, 1, 999, fallback.hpBonus ?? 5) : undefined,
    lowHpPercent: effectType === "dangerPower" ? clampNumber(rule?.lowHpPercent, 1, 100, fallback.lowHpPercent ?? 25) : undefined,
    toughDigit,
    toughReducePercent: effectType === "toughAtX" ? clampNumber(rule?.toughReducePercent, 1, 100, fallback.toughReducePercent ?? 30) : undefined,
    trapNullifyChance: effectType === "trapProof" ? clampNumber(rule?.trapNullifyChance, 0, 100, fallback.trapNullifyChance ?? 30) : undefined,
    fullHpBlockPercent: effectType === "fullArmor" ? clampNumber(rule?.fullHpBlockPercent, 1, 100, fallback.fullHpBlockPercent ?? 50) : undefined,
    gutsChance: effectType === "guts" ? clampNumber(rule?.gutsChance, 0, 100, fallback.gutsChance ?? 30) : undefined,
    paybackChance: ["leapPayback", "shadowPayback"].includes(effectType) ? clampNumber(rule?.paybackChance, 0, 100, fallback.paybackChance ?? (effectType === "leapPayback" ? 10 : 20)) : undefined,
    nibbleHunger: effectType === "driedBonito" ? clampNumber(rule?.nibbleHunger, 1, 999, fallback.nibbleHunger ?? 20) : undefined,
    nibblePenalty: effectType === "driedBonito" ? clampNumber(rule?.nibblePenalty, 1, 99, fallback.nibblePenalty ?? 1) : undefined,
    hungerCost: effectType === "voraciousHit" ? clampNumber(rule?.hungerCost, 1, 99, fallback.hungerCost ?? 2) : undefined,
    goldCost: effectType === "costlyHit" ? clampNumber(rule?.goldCost, 1, 99999, fallback.goldCost ?? 100) : undefined,
    blockPercent: ["voraciousBlock", "costlyBlock", "antiMonsterGuard"].includes(effectType) ? clampNumber(rule?.blockPercent, 1, 100, fallback.blockPercent ?? (effectType === "antiMonsterGuard" ? 50 : 30)) : undefined,
    critproofPercent: effectType === "critproof" ? clampNumber(rule?.critproofPercent, 1, 100, fallback.critproofPercent ?? 55) : undefined,
    reflectPercent: effectType === "retribution" ? clampNumber(rule?.reflectPercent, 1, 100, fallback.reflectPercent ?? 50) : undefined,
    evadeChance: effectType === "keen" ? clampNumber(rule?.evadeChance, 0, 100, fallback.evadeChance ?? 23) : undefined,
    flameDamage: effectType === "flameShot" ? clampNumber(rule?.flameDamage, 1, 999, fallback.flameDamage ?? 10) : undefined,
    thunderChance: effectType === "thunderbolt" ? clampNumber(rule?.thunderChance, 0, 100, fallback.thunderChance ?? 22.5) : undefined,
    thunderDamage: effectType === "thunderbolt" ? clampNumber(rule?.thunderDamage, 1, 999, fallback.thunderDamage ?? 20) : undefined,
    swiftChance: effectType === "swiftStrikes" ? clampNumber(rule?.swiftChance, 0, 100, fallback.swiftChance ?? 25) : undefined,
    swiftPower: effectType === "swiftStrikes" ? clampNumber(rule?.swiftPower, 0.1, 5, fallback.swiftPower ?? 0.5) : undefined,
    knockbackChance: effectType === "knockback" ? clampNumber(rule?.knockbackChance, 0, 100, fallback.knockbackChance ?? 53.7) : undefined,
    criticalDigit,
    dullAmount: ["dulling", "swordDulling", "shieldDulling"].includes(effectType) ? clampNumber(rule?.dullAmount, 0, 9, fallback.dullAmount ?? 1) : undefined,
  };
}

function runeAppliesToHandType(rule, handType) {
  if (!rule) {
    return false;
  }
  if (rule.appliesTo === "both") {
    return true;
  }
  if (rule.appliesTo === "weapon") {
    return handType === "sword";
  }
  if (rule.appliesTo === "shield") {
    return handType === "shield";
  }
  return true;
}

function getEnemyFamilyOptions() {
  const rules = normalizeEnemyPoolRules(
    game.recipe?.enemyPoolRules
    ?? (enemyPoolList.querySelector(".enemy-family") ? readEnemyPoolRules() : undefined)
  );
  return rules.map((family) => ({
    value: family.familyId,
    label: family.name,
  }));
}

function getEnemyFamilyName(familyId) {
  return getEnemyFamilyOptions().find((option) => option.value === familyId)?.label ?? familyId ?? "monster";
}

function normalizeEnemyTypeRule(rule = {}, fallback = {}) {
  const familyOptions = getEnemyFamilyOptions();
  const validFamilyIds = new Set(familyOptions.map((option) => option.value));
  return {
    id: String(rule?.id ?? fallback.id ?? makeId("enemyType")),
    name: (rule?.name ?? fallback.name ?? "Custom Type").trim() || "Custom Type",
    familyIds: Array.from(new Set(
      (Array.isArray(rule?.familyIds) ? rule.familyIds : Array.isArray(fallback.familyIds) ? fallback.familyIds : [])
        .filter((familyId) => validFamilyIds.has(familyId)),
    )),
  };
}

function normalizeEnemyTypeRules(rules = undefined) {
  const incoming = Array.isArray(rules) ? rules : [];
  if (rules === undefined) {
    return defaultEnemyTypeCatalog.map((rule) => normalizeEnemyTypeRule(rule, rule));
  }
  return incoming.map((rule) => normalizeEnemyTypeRule(rule, {}));
}

function getEnemyTypeOptions() {
  const rules = normalizeEnemyTypeRules(
    game.recipe?.enemyTypeRules
    ?? (enemyTypeList?.querySelector(".enemy-type-row") ? readEnemyTypeRules() : undefined),
  );
  return rules.map((type) => ({
    value: type.id,
    label: type.name,
  }));
}

function getEnemyTypeName(typeId) {
  return getEnemyTypeOptions().find((option) => option.value === typeId)?.label ?? typeId ?? "enemy type";
}

function normalizeRunePoolRules(rules = undefined) {
  const incoming = Array.isArray(rules) ? rules : [];
  if (rules === undefined) {
    return defaultRuneCatalog.map((rule) => normalizeRuneRule(rule, rule));
  }
  if (incoming.length === 0) {
    return [];
  }
  return incoming.map((rule) => normalizeRuneRule(rule, defaultRuneCatalog.find((base) => base.id === rule?.id) ?? {}));
}

function makeDefaultSpecialAttackPattern() {
  return Array.from({ length: SPECIAL_ATTACK_GRID_SIZE * SPECIAL_ATTACK_GRID_SIZE }, (_, index) => {
    const x = index % SPECIAL_ATTACK_GRID_SIZE;
    const y = Math.floor(index / SPECIAL_ATTACK_GRID_SIZE);
    if (x === SPECIAL_ATTACK_GRID_CENTER && y === SPECIAL_ATTACK_GRID_CENTER) {
      return false;
    }
    return Math.abs(x - SPECIAL_ATTACK_GRID_CENTER) + Math.abs(y - SPECIAL_ATTACK_GRID_CENTER) === 1;
  });
}

function normalizeSpecialAttackPattern(pattern = undefined) {
  const fallback = makeDefaultSpecialAttackPattern();
  const source = Array.isArray(pattern) ? pattern : [];
  return fallback.map((defaultValue, index) => {
    const x = index % SPECIAL_ATTACK_GRID_SIZE;
    const y = Math.floor(index / SPECIAL_ATTACK_GRID_SIZE);
    if (x === SPECIAL_ATTACK_GRID_CENTER && y === SPECIAL_ATTACK_GRID_CENTER) {
      return false;
    }
    return source[index] === true ? true : source[index] === false ? false : defaultValue;
  });
}

function normalizeSpecialAttackRule(rule = {}, fallback = {}) {
  const basePattern = normalizeSpecialAttackPattern(fallback.pattern);
  const costType = String(rule?.costType ?? fallback.costType ?? "hp").toLowerCase() === "hunger" ? "hunger" : "hp";
  return {
    id: String(rule?.id ?? fallback.id ?? makeId("specialAttack")),
    name: String(rule?.name ?? fallback.name ?? "Arc Burst").trim().slice(0, 40) || "Arc Burst",
    enabled: rule?.enabled !== false,
    costType,
    costValue: clampNumber(rule?.costValue ?? fallback.costValue, 0, 999, fallback.costValue ?? 4),
    damage: clampNumber(rule?.damage ?? fallback.damage, 0, 999, fallback.damage ?? 10),
    pattern: normalizeSpecialAttackPattern(rule?.pattern ?? basePattern),
  };
}

function normalizeSpecialAttackRules(rules = undefined) {
  const incoming = Array.isArray(rules) ? rules : [];
  if (rules === undefined) {
    return defaultSpecialAttackCatalog.map((rule) => normalizeSpecialAttackRule(rule, rule));
  }
  if (incoming.length === 0) {
    return [];
  }
  return incoming.map((rule) => normalizeSpecialAttackRule(rule, defaultSpecialAttackCatalog.find((base) => base.id === rule?.id) ?? {}));
}

function describeSpecialAttackRule(rule) {
  const hitCount = rule.pattern.filter(Boolean).length;
  const costLabel = rule.costType === "hunger" ? "hunger" : "HP";
  return `Press Q to preview and fire the top-most enabled special attack. Hits ${hitCount} square${hitCount === 1 ? "" : "s"}, deals ${rule.damage} damage, and costs ${rule.costValue} ${costLabel}.`;
}

function renderSpecialAttackPatternGrid(pattern = []) {
  const normalizedPattern = normalizeSpecialAttackPattern(pattern);
  return `
    <div class="special-attack-grid" data-target="pattern">
      ${normalizedPattern.map((active, index) => {
        const x = index % SPECIAL_ATTACK_GRID_SIZE;
        const y = Math.floor(index / SPECIAL_ATTACK_GRID_SIZE);
        const isCenter = x === SPECIAL_ATTACK_GRID_CENTER && y === SPECIAL_ATTACK_GRID_CENTER;
        if (isCenter) {
          return `<button type="button" class="special-attack-cell center" disabled aria-label="Player position">&#9679;</button>`;
        }
        return `<button type="button" class="special-attack-cell${active ? " active" : ""}" data-action="toggle_special_attack_cell" data-index="${index}" aria-pressed="${active ? "true" : "false"}" aria-label="Toggle attack square"></button>`;
      }).join("")}
    </div>
  `;
}

function createSpecialAttackRow(rule = {}) {
  const normalized = normalizeSpecialAttackRule(rule);
  const row = document.createElement("div");
  row.className = "special-attack-row";
  if (!normalized.enabled) {
    row.classList.add("recipe-entry-disabled");
  }
  row.dataset.specialAttackId = normalized.id;
  row.innerHTML = `
    <div class="special-attack-row-header">
      <label>
        Name
        <input type="text" data-target="name" maxlength="40" value="${escapeHtml(normalized.name)}" />
      </label>
      <div class="item-actions">
        <label><input type="checkbox" data-target="enabled"${normalized.enabled ? " checked" : ""} /> Enable</label>
        <button type="button" data-action="remove_special_attack">Remove</button>
      </div>
    </div>
    <div class="special-attack-fields">
      <label>
        Cost Type
        <select data-target="costType">
          <option value="hp"${normalized.costType === "hp" ? " selected" : ""}>Health</option>
          <option value="hunger"${normalized.costType === "hunger" ? " selected" : ""}>Hunger</option>
        </select>
      </label>
      <label>
        Cost
        <input type="number" min="0" max="999" step="1" data-target="costValue" value="${normalized.costValue}" />
      </label>
      <label>
        Damage
        <input type="number" min="0" max="999" step="1" data-target="damage" value="${normalized.damage}" />
      </label>
    </div>
    <div class="special-attack-design-block">
      <span>Special Design</span>
      ${renderSpecialAttackPatternGrid(normalized.pattern)}
    </div>
    <p class="special-attack-summary">${describeSpecialAttackRule(normalized)}</p>
  `;
  return row;
}

function renderSpecialAttackControls(rules = undefined) {
  specialAttackList.innerHTML = "";
  normalizeSpecialAttackRules(rules).forEach((rule) => {
    specialAttackList.append(createSpecialAttackRow(rule));
  });
  syncBulkEnableToggle(specialAttackEnableAll, specialAttackList.querySelectorAll(".special-attack-row"));
}

function readSpecialAttackRules() {
  return Array.from(specialAttackList.querySelectorAll(".special-attack-row")).map((row) => {
    const rawPattern = Array.from({ length: SPECIAL_ATTACK_GRID_SIZE * SPECIAL_ATTACK_GRID_SIZE }, () => false);
    row.querySelectorAll(".special-attack-cell[data-index]").forEach((cell) => {
      const index = Number(cell.dataset.index);
      if (Number.isFinite(index) && index >= 0 && index < rawPattern.length) {
        rawPattern[index] = cell.classList.contains("active");
      }
    });
    return normalizeSpecialAttackRule({
      id: row.dataset.specialAttackId,
      name: row.querySelector('[data-target="name"]')?.value,
      enabled: row.querySelector('[data-target="enabled"]')?.checked,
      costType: row.querySelector('[data-target="costType"]')?.value,
      costValue: row.querySelector('[data-target="costValue"]')?.value,
      damage: row.querySelector('[data-target="damage"]')?.value,
      pattern: rawPattern,
    });
  });
}

function applySpecialAttackRules(rules = undefined) {
  renderSpecialAttackControls(rules);
}

function addSpecialAttackRule() {
  const rules = normalizeSpecialAttackRules(readSpecialAttackRules());
  rules.unshift(normalizeSpecialAttackRule({
    id: makeId("specialAttack"),
    name: `Special Attack ${rules.length + 1}`,
    enabled: true,
    costType: "hp",
    costValue: 4,
    damage: 10,
    pattern: makeDefaultSpecialAttackPattern(),
  }));
  renderSpecialAttackControls(rules);
}

function getEnabledSpecialAttack(recipe = game.recipe) {
  return normalizeSpecialAttackRules(recipe?.specialAttackRules).find((rule) => rule.enabled) ?? null;
}

function getPendingSpecialAttack() {
  if (!game.pendingSpecialAttack || !game.recipe) {
    return null;
  }
  return normalizeSpecialAttackRules(game.recipe.specialAttackRules).find((rule) => rule.id === game.pendingSpecialAttack && rule.enabled) ?? null;
}

function clearPendingSpecialAttack() {
  game.pendingSpecialAttack = null;
}

function getSpecialAttackTargets(attack, origin = game.player) {
  if (!attack || !origin) {
    return [];
  }
  const positions = [];
  attack.pattern.forEach((active, index) => {
    if (!active) {
      return;
    }
    const patternX = index % SPECIAL_ATTACK_GRID_SIZE;
    const patternY = Math.floor(index / SPECIAL_ATTACK_GRID_SIZE);
    const x = origin.x + (patternX - SPECIAL_ATTACK_GRID_CENTER);
    const y = origin.y + (patternY - SPECIAL_ATTACK_GRID_CENTER);
    if (x < 0 || y < 0 || x >= game.floorWidth || y >= game.floorHeight) {
      return;
    }
    positions.push({ x, y });
  });
  return positions;
}

function getSpecialAttackPreviewKeys() {
  const attack = getPendingSpecialAttack();
  if (!attack) {
    return new Set();
  }
  return new Set(getSpecialAttackTargets(attack).map((position) => `${position.x},${position.y}`));
}

function syncBulkEnableToggle(toggle, rows, selector = '[data-target="enabled"]') {
  if (!toggle) {
    return;
  }
  const enabledBoxes = Array.from(rows).map((row) => row.querySelector(selector)).filter(Boolean);
  if (enabledBoxes.length === 0) {
    toggle.checked = false;
    toggle.indeterminate = false;
    return;
  }
  const enabledCount = enabledBoxes.filter((box) => box.checked).length;
  toggle.checked = enabledCount === enabledBoxes.length;
  toggle.indeterminate = enabledCount > 0 && enabledCount < enabledBoxes.length;
}

function setSectionEntriesEnabled(listElement, enabled) {
  listElement?.querySelectorAll('[data-target="enabled"]').forEach((input) => {
    input.checked = enabled;
  });
}

function renderRunePoolControls(rules = undefined) {
  runePoolList.innerHTML = "";
  const enemyTypeOptions = getEnemyTypeOptions()
    .map((option) => `<option value="${escapeHtml(option.value)}">${escapeHtml(option.label)}</option>`)
    .join("");
  const appliesToOptions = `
    <option value="both">Weapons & Shields</option>
    <option value="weapon">Weapons Only</option>
    <option value="shield">Shields Only</option>
  `;
  normalizeRunePoolRules(rules).forEach((rule) => {
    const row = document.createElement("div");
    row.className = "rune-row";
    if (!rule.enabled) {
      row.classList.add("recipe-entry-disabled");
    }
    row.dataset.runeId = rule.id;
    let fields = "";
    if (rule.effectType === "critical") {
      fields = `
        <label>
          Crit %
          <input type="number" min="0" max="100" step="1" data-target="critChance" value="${rule.critChance}" />
        </label>
        <label>
          Multiplier
          <input type="number" min="1" max="9" step="0.1" data-target="critMultiplier" value="${rule.critMultiplier}" />
        </label>
      `;
    } else if (rule.effectType === "healing") {
      fields = `
        <label>
          Heal %
          <input type="number" min="0" max="100" step="1" data-target="healPercent" value="${rule.healPercent}" />
        </label>
      `;
    } else if (rule.effectType === "antiMonster") {
      fields = `
        <label>
          Enemy Type
          <select data-target="targetTypeId">${enemyTypeOptions || '<option value="">No enemy types created</option>'}</select>
        </label>
        <label>
          Multiplier
          <input type="number" min="1" max="9" step="0.1" data-target="bonusMultiplier" value="${rule.bonusMultiplier}" />
        </label>
      `;
    } else if (rule.effectType === "flameShot") {
      fields = `
        <label>
          Flame Damage
          <input type="number" min="1" max="999" step="1" data-target="flameDamage" value="${rule.flameDamage}" />
        </label>
      `;
    } else if (rule.effectType === "cursedMight") {
      fields = `
        <label>
          Stat Bonus
          <input type="number" min="1" max="99" step="1" data-target="curseBonus" value="${rule.curseBonus}" />
        </label>
      `;
    } else if (rule.effectType === "hpPlus") {
      fields = `
        <label>
          Max HP +
          <input type="number" min="1" max="999" step="1" data-target="hpBonus" value="${rule.hpBonus ?? 5}" />
        </label>
      `;
    } else if (rule.effectType === "dangerPower") {
      fields = `
        <label>
          Low HP %
          <input type="number" min="1" max="100" step="1" data-target="lowHpPercent" value="${rule.lowHpPercent ?? 25}" />
        </label>
        <label>
          Multiplier
          <input type="number" min="1" max="9" step="0.1" data-target="bonusMultiplier" value="${rule.bonusMultiplier}" />
        </label>
      `;
    } else if (rule.effectType === "toughAtX") {
      fields = `
        <label>
          Trigger Digit
          <input type="number" min="0" max="9" step="1" data-target="toughDigit" value="${rule.toughDigit ?? 7}" />
        </label>
        <label>
          Reduce %
          <input type="number" min="1" max="100" step="1" data-target="toughReducePercent" value="${rule.toughReducePercent ?? 30}" />
        </label>
      `;
    } else if (rule.effectType === "trapProof") {
      fields = `
        <label>
          Nullify %
          <input type="number" min="0" max="100" step="1" data-target="trapNullifyChance" value="${rule.trapNullifyChance ?? 30}" />
        </label>
      `;
    } else if (rule.effectType === "fullArmor") {
      fields = `
        <label>
          Reduce %
          <input type="number" min="1" max="100" step="1" data-target="fullHpBlockPercent" value="${rule.fullHpBlockPercent ?? 50}" />
        </label>
      `;
    } else if (rule.effectType === "guts") {
      fields = `
        <label>
          Endure %
          <input type="number" min="0" max="100" step="1" data-target="gutsChance" value="${rule.gutsChance ?? 30}" />
        </label>
      `;
    } else if (rule.effectType === "leapPayback" || rule.effectType === "shadowPayback") {
      fields = `
        <label>
          Proc %
          <input type="number" min="0" max="100" step="1" data-target="paybackChance" value="${rule.paybackChance ?? (rule.effectType === "leapPayback" ? 10 : 20)}" />
        </label>
      `;
    } else if (rule.effectType === "driedBonito") {
      fields = `
        <label>
          Hunger Restored
          <input type="number" min="1" max="999" step="1" data-target="nibbleHunger" value="${rule.nibbleHunger}" />
        </label>
        <label>
          Upgrade Loss
          <input type="number" min="1" max="99" step="1" data-target="nibblePenalty" value="${rule.nibblePenalty}" />
        </label>
      `;
    } else if (rule.effectType === "criticalAt7") {
      fields = `
        <label>
          Trigger Digit
          <input type="number" min="0" max="9" step="1" data-target="criticalDigit" value="${rule.criticalDigit ?? 7}" />
        </label>
      `;
    } else if (rule.effectType === "voraciousHit") {
      fields = `
        <label>
          Hunger Cost
          <input type="number" min="1" max="99" step="1" data-target="hungerCost" value="${rule.hungerCost}" />
        </label>
        <label>
          Multiplier
          <input type="number" min="1" max="9" step="0.1" data-target="bonusMultiplier" value="${rule.bonusMultiplier}" />
        </label>
      `;
    } else if (rule.effectType === "costlyHit") {
      fields = `
        <label>
          Gold Cost
          <input type="number" min="1" max="99999" step="1" data-target="goldCost" value="${rule.goldCost}" />
        </label>
        <label>
          Multiplier
          <input type="number" min="1" max="9" step="0.1" data-target="bonusMultiplier" value="${rule.bonusMultiplier}" />
        </label>
      `;
    } else if (rule.effectType === "hungerPower") {
      fields = `
        <label>
          Multiplier
          <input type="number" min="1" max="9" step="0.1" data-target="bonusMultiplier" value="${rule.bonusMultiplier}" />
        </label>
      `;
    } else if (rule.effectType === "voraciousBlock") {
      fields = `
        <label>
          Hunger Cost
          <input type="number" min="1" max="99" step="1" data-target="hungerCost" value="${rule.hungerCost ?? 2}" />
        </label>
        <label>
          Reduce %
          <input type="number" min="1" max="100" step="1" data-target="blockPercent" value="${rule.blockPercent ?? 30}" />
        </label>
      `;
    } else if (rule.effectType === "costlyBlock") {
      fields = `
        <label>
          Gold Cost
          <input type="number" min="1" max="99999" step="1" data-target="goldCost" value="${rule.goldCost ?? 100}" />
        </label>
        <label>
          Reduce %
          <input type="number" min="1" max="100" step="1" data-target="blockPercent" value="${rule.blockPercent ?? 30}" />
        </label>
      `;
    } else if (rule.effectType === "critproof") {
      fields = `
        <label>
          Reduce %
          <input type="number" min="1" max="100" step="1" data-target="critproofPercent" value="${rule.critproofPercent ?? 55}" />
        </label>
      `;
    } else if (rule.effectType === "antiMonsterGuard") {
      fields = `
        <label>
          Enemy Type
          <select data-target="targetTypeId">${enemyTypeOptions || '<option value="">No enemy types created</option>'}</select>
        </label>
        <label>
          Reduce %
          <input type="number" min="1" max="100" step="1" data-target="blockPercent" value="${rule.blockPercent ?? 50}" />
        </label>
      `;
    } else if (rule.effectType === "keen") {
      fields = `
        <label>
          Evade %
          <input type="number" min="0" max="100" step="1" data-target="evadeChance" value="${rule.evadeChance ?? 23}" />
        </label>
      `;
    } else if (rule.effectType === "retribution") {
      fields = `
        <label>
          Reflect %
          <input type="number" min="1" max="100" step="1" data-target="reflectPercent" value="${rule.reflectPercent ?? 50}" />
        </label>
      `;
    } else if (rule.effectType === "knockback") {
      fields = `
        <label>
          Knockback %
          <input type="number" min="0" max="100" step="0.1" data-target="knockbackChance" value="${rule.knockbackChance}" />
        </label>
      `;
    } else if (rule.effectType === "thunderbolt") {
      fields = `
        <label>
          Proc %
          <input type="number" min="0" max="100" step="0.1" data-target="thunderChance" value="${rule.thunderChance ?? 22.5}" />
        </label>
        <label>
          Thunder Damage
          <input type="number" min="1" max="999" step="1" data-target="thunderDamage" value="${rule.thunderDamage ?? 20}" />
        </label>
      `;
    } else if (rule.effectType === "swiftStrikes") {
      fields = `
        <label>
          Proc %
          <input type="number" min="0" max="100" step="1" data-target="swiftChance" value="${rule.swiftChance}" />
        </label>
        <label>
          Bonus Power
          <input type="number" min="0.1" max="5" step="0.1" data-target="swiftPower" value="${rule.swiftPower}" />
        </label>
      `;
    } else if (["dulling", "swordDulling", "shieldDulling"].includes(rule.effectType)) {
      fields = `
        <label>
          Dull Amount
          <input type="number" min="0" max="3" step="1" data-target="dullAmount" value="${rule.dullAmount}" />
        </label>
      `;
    } else {
      fields = "";
    }
    row.innerHTML = `
      <div class="rune-row-header">
        <label>
          Name
          <input type="text" data-target="name" maxlength="28" value="${escapeHtml(rule.name)}" />
        </label>
        <div class="item-actions">
          <label><input type="checkbox" data-target="enabled"${rule.enabled ? " checked" : ""} /> Enable</label>
          <button type="button" data-action="remove_rune">Remove</button>
        </div>
      </div>
      <div class="rune-fields">
        <label>
          Effect
          <select data-target="effectType">
            <option value="critical"${rule.effectType === "critical" ? " selected" : ""}>Critical</option>
            <option value="healing"${rule.effectType === "healing" ? " selected" : ""}>Healing</option>
            <option value="antiMonster"${rule.effectType === "antiMonster" ? " selected" : ""}>Anti-Monster</option>
            <option value="rustproof"${rule.effectType === "rustproof" ? " selected" : ""}>Rustproof</option>
            <option value="dulling"${rule.effectType === "dulling" ? " selected" : ""}>Dulling</option>
            <option value="cursedMight"${rule.effectType === "cursedMight" ? " selected" : ""}>Cursed Might</option>
            <option value="hpPlus"${rule.effectType === "hpPlus" ? " selected" : ""}>HP+</option>
            <option value="dangerPower"${rule.effectType === "dangerPower" ? " selected" : ""}>Danger Power</option>
            <option value="toughAtX"${rule.effectType === "toughAtX" ? " selected" : ""}>Tough at X</option>
            <option value="trapProof"${rule.effectType === "trapProof" ? " selected" : ""}>Trap-proof</option>
            <option value="sating"${rule.effectType === "sating" ? " selected" : ""}>Sating</option>
            <option value="fullArmor"${rule.effectType === "fullArmor" ? " selected" : ""}>Full Armor</option>
            <option value="guts"${rule.effectType === "guts" ? " selected" : ""}>Guts</option>
            <option value="leapPayback"${rule.effectType === "leapPayback" ? " selected" : ""}>Leap Payback</option>
            <option value="shadowPayback"${rule.effectType === "shadowPayback" ? " selected" : ""}>Shadow Payback</option>
            <option value="driedBonito"${rule.effectType === "driedBonito" ? " selected" : ""}>Dried Bonito</option>
            <option value="trapFinding"${rule.effectType === "trapFinding" ? " selected" : ""}>Trap Finding</option>
            <option value="trapBust"${rule.effectType === "trapBust" ? " selected" : ""}>Trap Bust</option>
            <option value="wallDig"${rule.effectType === "wallDig" ? " selected" : ""}>Wall Dig</option>
            <option value="criticalAt7"${rule.effectType === "criticalAt7" ? " selected" : ""}>Critical at X</option>
            <option value="quintessence"${rule.effectType === "quintessence" ? " selected" : ""}>Quintessence</option>
            <option value="thirdStrike"${rule.effectType === "thirdStrike" ? " selected" : ""}>Third Strike</option>
            <option value="voraciousHit"${rule.effectType === "voraciousHit" ? " selected" : ""}>Voracious Hit</option>
            <option value="hungerPower"${rule.effectType === "hungerPower" ? " selected" : ""}>Hunger Power</option>
            <option value="voraciousBlock"${rule.effectType === "voraciousBlock" ? " selected" : ""}>Voracious Block</option>
            <option value="costlyHit"${rule.effectType === "costlyHit" ? " selected" : ""}>Costly Hit</option>
            <option value="costlyBlock"${rule.effectType === "costlyBlock" ? " selected" : ""}>Costly Block</option>
            <option value="critproof"${rule.effectType === "critproof" ? " selected" : ""}>Critproof</option>
            <option value="antiMonsterGuard"${rule.effectType === "antiMonsterGuard" ? " selected" : ""}>Anti-Monster Guard</option>
            <option value="keen"${rule.effectType === "keen" ? " selected" : ""}>Keen</option>
            <option value="retribution"${rule.effectType === "retribution" ? " selected" : ""}>Retribution</option>
            <option value="knockback"${rule.effectType === "knockback" ? " selected" : ""}>Knockback</option>
            <option value="thunderbolt"${rule.effectType === "thunderbolt" ? " selected" : ""}>Thunderbolt</option>
            <option value="frontalAttack"${rule.effectType === "frontalAttack" ? " selected" : ""}>Frontal Attack</option>
            <option value="sideAttack"${rule.effectType === "sideAttack" ? " selected" : ""}>Side Attack</option>
            <option value="backAttack"${rule.effectType === "backAttack" ? " selected" : ""}>Back Attack</option>
            <option value="accurate"${rule.effectType === "accurate" ? " selected" : ""}>Accurate</option>
            <option value="flameShot"${rule.effectType === "flameShot" ? " selected" : ""}>Flame Shot</option>
            <option value="swiftStrikes"${rule.effectType === "swiftStrikes" ? " selected" : ""}>Swift Strikes</option>
            <option value="swordDulling"${rule.effectType === "swordDulling" ? " selected" : ""}>Sword Dulling</option>
            <option value="shieldDulling"${rule.effectType === "shieldDulling" ? " selected" : ""}>Shield Dulling</option>
          </select>
        </label>
        <label>
          Applies To
          <select data-target="appliesTo">${appliesToOptions}</select>
        </label>
        ${fields}
      </div>
      <p class="rune-summary">${describeRuneRule(rule)}</p>
    `;
    if (rule.effectType === "antiMonster") {
      const typeSelect = row.querySelector('[data-target="targetTypeId"]');
      if (typeSelect) {
        typeSelect.value = rule.targetTypeId ?? "";
      }
    }
    if (rule.effectType === "antiMonsterGuard") {
      const typeSelect = row.querySelector('[data-target="targetTypeId"]');
      if (typeSelect) {
        typeSelect.value = rule.targetTypeId ?? "";
      }
    }
    const appliesToSelect = row.querySelector('[data-target="appliesTo"]');
    if (appliesToSelect) {
      appliesToSelect.value = rule.appliesTo ?? "both";
    }
    runePoolList.append(row);
  });
  syncBulkEnableToggle(runeEnableAll, runePoolList.querySelectorAll(".rune-row"));
}

function readRunePoolRules() {
  return Array.from(runePoolList.querySelectorAll(".rune-row")).map((row) => {
    const fallback = defaultRuneRules.find((rule) => rule.id === row.dataset.runeId) ?? defaultRuneRules[0];
    return normalizeRuneRule({
      id: row.dataset.runeId,
      name: row.querySelector('[data-target="name"]')?.value,
      effectType: row.querySelector('[data-target="effectType"]')?.value,
      appliesTo: row.querySelector('[data-target="appliesTo"]')?.value,
      enabled: row.querySelector('[data-target="enabled"]')?.checked,
      critChance: row.querySelector('[data-target="critChance"]')?.value,
      critMultiplier: row.querySelector('[data-target="critMultiplier"]')?.value,
      healPercent: row.querySelector('[data-target="healPercent"]')?.value,
      targetTypeId: row.querySelector('[data-target="targetTypeId"]')?.value,
      bonusMultiplier: row.querySelector('[data-target="bonusMultiplier"]')?.value,
      curseBonus: row.querySelector('[data-target="curseBonus"]')?.value,
      hpBonus: row.querySelector('[data-target="hpBonus"]')?.value,
      lowHpPercent: row.querySelector('[data-target="lowHpPercent"]')?.value,
      toughDigit: row.querySelector('[data-target="toughDigit"]')?.value,
      toughReducePercent: row.querySelector('[data-target="toughReducePercent"]')?.value,
      trapNullifyChance: row.querySelector('[data-target="trapNullifyChance"]')?.value,
      fullHpBlockPercent: row.querySelector('[data-target="fullHpBlockPercent"]')?.value,
      gutsChance: row.querySelector('[data-target="gutsChance"]')?.value,
      paybackChance: row.querySelector('[data-target="paybackChance"]')?.value,
      nibbleHunger: row.querySelector('[data-target="nibbleHunger"]')?.value,
      nibblePenalty: row.querySelector('[data-target="nibblePenalty"]')?.value,
      hungerCost: row.querySelector('[data-target="hungerCost"]')?.value,
      goldCost: row.querySelector('[data-target="goldCost"]')?.value,
      blockPercent: row.querySelector('[data-target="blockPercent"]')?.value,
      critproofPercent: row.querySelector('[data-target="critproofPercent"]')?.value,
      reflectPercent: row.querySelector('[data-target="reflectPercent"]')?.value,
      evadeChance: row.querySelector('[data-target="evadeChance"]')?.value,
      flameDamage: row.querySelector('[data-target="flameDamage"]')?.value,
      thunderChance: row.querySelector('[data-target="thunderChance"]')?.value,
      thunderDamage: row.querySelector('[data-target="thunderDamage"]')?.value,
      swiftChance: row.querySelector('[data-target="swiftChance"]')?.value,
      swiftPower: row.querySelector('[data-target="swiftPower"]')?.value,
      knockbackChance: row.querySelector('[data-target="knockbackChance"]')?.value,
      criticalDigit: row.querySelector('[data-target="criticalDigit"]')?.value,
      dullAmount: row.querySelector('[data-target="dullAmount"]')?.value,
    }, fallback);
  });
}

function applyRunePoolRules(rules = undefined) {
  renderRunePoolControls(rules);
}

function addRuneRule() {
  const rules = normalizeRunePoolRules(readRunePoolRules());
  rules.unshift(normalizeRuneRule({ id: makeId("rune"), name: "Custom Rune", effectType: "critical", enabled: true, critChance: 25, critMultiplier: 1.5 }));
  renderRunePoolControls(rules);
}

function getRuneRule(runeId, recipe = game.recipe) {
  if (!runeId) {
    return null;
  }
  return normalizeRunePoolRules(recipe?.runePoolRules).find((rule) => rule.id === runeId && rule.enabled) ?? null;
}

function getRuneRulesForItem(entryOrItem, recipe = game.recipe) {
  const runeIds = Array.isArray(entryOrItem?.runeIds)
    ? entryOrItem.runeIds
    : entryOrItem?.runeId
      ? [entryOrItem.runeId]
      : [];
  const handType = entryOrItem?.handType ?? getItemWithInstance(entryOrItem)?.handType ?? null;
  return runeIds
    .map((runeId) => getRuneRule(runeId, recipe))
    .filter((rule) => rule && runeAppliesToHandType(rule, handType));
}

function describeRuneRule(rule) {
  if (rule.effectType === "critical") {
    return `About ${rule.critChance}% chance to deal x${rule.critMultiplier} damage on a hit.`;
  }
  if (rule.effectType === "healing") {
    return `Restores HP equal to ${rule.healPercent}% of player damage dealt.`;
  }
  if (rule.effectType === "antiMonster") {
    return `Deals x${rule.bonusMultiplier} damage against the ${getEnemyTypeName(rule.targetTypeId)} type.`;
  }
  if (rule.effectType === "rustproof") {
    return "Prevents this weapon or shield from losing upgrade value.";
  }
  if (rule.effectType === "dulling") {
    return `When the player hits an enemy, the runed weapon loses ${rule.dullAmount} upgrade.`;
  }
  if (rule.effectType === "cursedMight") {
    return `If the weapon is cursed, its stat increases by ${rule.curseBonus}.`;
  }
  if (rule.effectType === "hpPlus") {
    return `Raises max HP by ${rule.hpBonus} while this weapon or shield is equipped.`;
  }
  if (rule.effectType === "dangerPower") {
    return `Deals x${rule.bonusMultiplier} damage when HP is at or below ${rule.lowHpPercent}%.`;
  }
  if (rule.effectType === "toughAtX") {
    return `Reduces damage by ${rule.toughReducePercent}% when the last digit of HP is ${rule.toughDigit}.`;
  }
  if (rule.effectType === "trapProof") {
    return `${rule.trapNullifyChance}% chance to nullify trap activation.`;
  }
  if (rule.effectType === "sating") {
    return "Halves the current hunger loss rate.";
  }
  if (rule.effectType === "fullArmor") {
    return `At full HP, reduces incoming damage by ${rule.fullHpBlockPercent}%.`;
  }
  if (rule.effectType === "guts") {
    return `${rule.gutsChance}% chance to survive a fatal hit with 1 HP, except at 1 HP.`;
  }
  if (rule.effectType === "driedBonito") {
    return `Nibble the weapon to restore ${rule.nibbleHunger} hunger and lose ${rule.nibblePenalty} upgrade.`;
  }
  if (rule.effectType === "trapFinding") {
    return "Swinging reveals traps in a three-wide band two tiles ahead.";
  }
  if (rule.effectType === "trapBust") {
    return "Swinging breaks traps directly in front of the weapon.";
  }
  if (rule.effectType === "wallDig") {
    return "Swinging into a wall digs one tile open, but it may lower upgrade value.";
  }
  if (rule.effectType === "criticalAt7") {
    return `When the last digit of HP is ${rule.criticalDigit}, normal hits become critical hits.`;
  }
  if (rule.effectType === "quintessence") {
    return "After 4 consecutive hits, the next hit becomes a guaranteed critical.";
  }
  if (rule.effectType === "thirdStrike") {
    return "After missing 2 attacks, the next attack becomes a guaranteed critical hit.";
  }
  if (rule.effectType === "voraciousHit") {
    return `Spends ${rule.hungerCost} hunger to deal x${rule.bonusMultiplier} damage.`;
  }
  if (rule.effectType === "hungerPower") {
    return `Deals x${rule.bonusMultiplier} damage when hunger is 0.`;
  }
  if (rule.effectType === "voraciousBlock") {
    return `Spends ${rule.hungerCost} hunger to reduce incoming damage by ${rule.blockPercent}%.`;
  }
  if (rule.effectType === "costlyHit") {
    return `Spends ${rule.goldCost} gold to deal x${rule.bonusMultiplier} damage.`;
  }
  if (rule.effectType === "costlyBlock") {
    return `Spends ${rule.goldCost} gold to reduce incoming damage by ${rule.blockPercent}%. If you cannot pay, shield defense becomes 0.`;
  }
  if (rule.effectType === "critproof") {
    return `Reduces enemy critical-hit damage by ${rule.critproofPercent}%.`;
  }
  if (rule.effectType === "antiMonsterGuard") {
    return `Reduces damage from the ${getEnemyTypeName(rule.targetTypeId)} type by ${rule.blockPercent}%.`;
  }
  if (rule.effectType === "keen") {
    return `${rule.evadeChance}% chance to evade enemy attacks.`;
  }
  if (rule.effectType === "leapPayback") {
    return `${rule.paybackChance}% chance to warp the attacking enemy elsewhere on the floor.`;
  }
  if (rule.effectType === "shadowPayback") {
    return `${rule.paybackChance}% chance to shadowbind the attacker in place for 10 turns.`;
  }
  if (rule.effectType === "retribution") {
    return `Reflects ${rule.reflectPercent}% of received damage back at the attacker.`;
  }
  if (rule.effectType === "knockback") {
    return `${rule.knockbackChance}% chance to knock the target back 1 tile.`;
  }
  if (rule.effectType === "thunderbolt") {
    return `${rule.thunderChance}% chance to deal ${rule.thunderDamage} extra damage and arc to adjacent enemies.`;
  }
  if (rule.effectType === "frontalAttack") {
    return "Turns normal attacks into a three-wide frontal strike.";
  }
  if (rule.effectType === "sideAttack") {
    return "Attacks the front, left, and right tiles at the same time.";
  }
  if (rule.effectType === "backAttack") {
    return "Attacks the front and back tiles at the same time.";
  }
  if (rule.effectType === "accurate") {
    return "Makes this weapon's attacks always land.";
  }
  if (rule.effectType === "flameShot") {
    return `When HP is full, normal attacks also fire flames for ${rule.flameDamage} damage.`;
  }
  if (rule.effectType === "swiftStrikes") {
    return `${rule.swiftChance}% chance to add a second hit at ${Math.round((rule.swiftPower ?? 0) * 100)}% power.`;
  }
  if (rule.effectType === "shieldDulling") {
    return `When the player is hit, the runed shield loses ${rule.dullAmount} defense and ${rule.dullAmount} upgrade, stopping once defense reaches 0.`;
  }
  return `When the player hits an enemy, the runed sword loses ${rule.dullAmount} attack and ${rule.dullAmount} upgrade, stopping once attack reaches 0.`;
}

function makeDefaultEnemyFamilyRule() {
  const familyId = makeId("enemy");
  return {
    familyId,
    name: "Custom Family",
    glyph: "c",
    pursuit: {
      enabled: false,
      whenEntering: true,
      whenLeaving: false,
      whenNextToEnemy: true,
    },
    levels: Array.from({ length: 4 }, (_, index) => ({
      level: index + 1,
      enabled: index === 0,
      name: `Custom Lv ${index + 1}`,
      hp: 6 + index * 4,
      attack: 3 + index * 2,
      defense: index,
      xp: 4 + index * 5,
    })),
  };
}

function makeDefaultEnemyTypeRule() {
  return {
    id: makeId("enemyType"),
    name: "Custom Type",
    familyIds: [],
  };
}

function getDefaultEnemyPursuitSettings(familyId = null) {
  const builtIn = Boolean(familyId && defaultMonsterFamilyCatalog[familyId]);
  if (builtIn) {
    return {
      enabled: true,
      whenEntering: true,
      whenLeaving: true,
      whenNextToEnemy: true,
    };
  }
  return {
    enabled: false,
    whenEntering: true,
    whenLeaving: false,
    whenNextToEnemy: true,
  };
}

function normalizeEnemyPursuitSettings(settings = {}, fallback = {}, familyId = null) {
  const resolvedFamilyId = familyId ?? fallback.familyId ?? null;
  const defaults = getDefaultEnemyPursuitSettings(resolvedFamilyId);
  const normalized = {
    enabled: Boolean(settings?.enabled ?? fallback?.enabled ?? defaults.enabled),
    whenEntering: Boolean(settings?.whenEntering ?? fallback?.whenEntering ?? defaults.whenEntering),
    whenLeaving: Boolean(settings?.whenLeaving ?? fallback?.whenLeaving ?? defaults.whenLeaving),
    whenNextToEnemy: Boolean(settings?.whenNextToEnemy ?? fallback?.whenNextToEnemy ?? defaults.whenNextToEnemy),
  };
  if (
    normalized.enabled &&
    !normalized.whenEntering &&
    !normalized.whenLeaving &&
    !normalized.whenNextToEnemy
  ) {
    const modes = ["whenEntering", "whenLeaving", "whenNextToEnemy"];
    const seed = String(resolvedFamilyId ?? "enemy");
    const chosenMode = modes[Math.abs(hashString(`pursuit:${seed}`)) % modes.length] ?? "whenNextToEnemy";
    normalized[chosenMode] = true;
  }
  return normalized;
}

function getEnemySkillDefinition(skillType = "multiAttack") {
  return enemySkillDefinitions.find((definition) => definition.id === skillType) ?? enemySkillDefinitions[0];
}

function getEnemySkillItemOptions() {
  return normalizeItemPoolRules(readItemPoolRules())
    .filter((rule) => rule.enabled && rule.kind !== "gold")
    .map((rule) => ({ value: rule.itemId, label: rule.name }));
}

function getEnemySkillTrapOptions() {
  return normalizeTrapPoolRules(readTrapPoolRules())
    .filter((rule) => rule.enabled)
    .map((rule) => ({ value: rule.id, label: rule.name }));
}

function normalizeEnemySkill(skill = {}, fallback = {}) {
  const definition = getEnemySkillDefinition(skill?.type ?? fallback.type ?? "multiAttack");
  const itemOptions = getEnemySkillItemOptions();
  const trapOptions = getEnemySkillTrapOptions();
  const validItemIds = new Set(itemOptions.map((option) => option.value));
  const validTrapIds = new Set(trapOptions.map((option) => option.value));
  const validMagicEffects = new Set(enemyMagicEffectOptions.map((option) => option.id));
  const fallbackItemId = fallback.targetItemId ?? itemOptions[0]?.value ?? "";
  const fallbackTrapId = fallback.targetTrapId ?? trapOptions[0]?.value ?? "";
  return {
    id: String(skill?.id ?? fallback.id ?? makeId("enemySkill")),
    enabled: Boolean(skill?.enabled ?? fallback.enabled ?? true),
    type: definition.id,
    chance: clampNumber(skill?.chance ?? fallback.chance, 0, 100, fallback.chance ?? 100),
    value: definition.noValue
      ? 0
      : clampNumber(skill?.value ?? fallback.value, definition.min ?? -999, definition.max ?? 99999, fallback.value ?? definition.defaultValue ?? 0),
    extra: definition.extraLabel
      ? clampNumber(skill?.extra ?? fallback.extra, definition.extraMin ?? -999, definition.extraMax ?? 99999, fallback.extra ?? definition.defaultExtra ?? 0)
      : 0,
    targetItemId: definition.itemTarget
      ? (validItemIds.has(skill?.targetItemId) ? skill.targetItemId : (validItemIds.has(fallbackItemId) ? fallbackItemId : itemOptions[0]?.value ?? ""))
      : "",
    targetTrapId: definition.trapTarget
      ? (validTrapIds.has(skill?.targetTrapId) ? skill.targetTrapId : (validTrapIds.has(fallbackTrapId) ? fallbackTrapId : trapOptions[0]?.value ?? ""))
      : "",
    magicEffect: definition.magicEffect
      ? (validMagicEffects.has(skill?.magicEffect) ? skill.magicEffect : (validMagicEffects.has(fallback.magicEffect) ? fallback.magicEffect : enemyMagicEffectOptions[0]?.id ?? "damage"))
      : "",
  };
}

function normalizeEnemySkills(skills = undefined) {
  const incoming = Array.isArray(skills) ? skills : [];
  return incoming.map((skill) => normalizeEnemySkill(skill, {}));
}

function describeEnemySkill(skill) {
  const definition = getEnemySkillDefinition(skill.type);
  const parts = [definition.label, definition.passive ? `Trigger ${skill.chance}%` : `Use ${skill.chance}%`];
  if (definition.itemTarget && skill.targetItemId) {
    parts.push(getItemDefinition(skill.targetItemId)?.name ?? skill.targetItemId);
  }
  if (definition.trapTarget && skill.targetTrapId) {
    parts.push(normalizeTrapPoolRules(readTrapPoolRules()).find((rule) => rule.id === skill.targetTrapId)?.name ?? skill.targetTrapId);
  }
  if (definition.magicEffect && skill.magicEffect) {
    parts.push(enemyMagicEffectOptions.find((option) => option.id === skill.magicEffect)?.label ?? skill.magicEffect);
  }
  if (!definition.noValue) {
    parts.push(`${definition.valueLabel ?? "Value"} ${skill.value}`);
  }
  if (definition.extraLabel) {
    parts.push(`${definition.extraLabel} ${skill.extra}`);
  }
  return parts.join(" • ");
}

function renderEnemySkillRow(skill) {
  const definition = getEnemySkillDefinition(skill.type);
  const skillOptions = enemySkillDefinitions.map((option) => `<option value="${escapeHtml(option.id)}"${option.id === skill.type ? " selected" : ""}>${escapeHtml(option.label)}</option>`).join("");
  const itemOptions = getEnemySkillItemOptions().map((option) => `<option value="${escapeHtml(option.value)}"${option.value === skill.targetItemId ? " selected" : ""}>${escapeHtml(option.label)}</option>`).join("");
  const trapOptions = getEnemySkillTrapOptions().map((option) => `<option value="${escapeHtml(option.value)}"${option.value === skill.targetTrapId ? " selected" : ""}>${escapeHtml(option.label)}</option>`).join("");
  const magicOptions = enemyMagicEffectOptions.map((option) => `<option value="${escapeHtml(option.id)}"${option.id === skill.magicEffect ? " selected" : ""}>${escapeHtml(option.label)}</option>`).join("");
  const valueControl = definition.noValue ? "" : `
    <label class="enemy-skill-stat">
      <span>${escapeHtml(definition.valueLabel ?? "Value")}</span>
      <input type="number" data-target="skillValue" min="${definition.min ?? -999}" max="${definition.max ?? 99999}" step="${definition.step ?? 1}" value="${skill.value}" />
    </label>
  `;
  const chanceControl = `
    <label class="enemy-skill-stat">
      <span>Chance %</span>
      <input type="number" data-target="skillChance" min="0" max="100" step="1" value="${skill.chance}" />
    </label>
  `;
  const extraControl = definition.extraLabel ? `
    <label class="enemy-skill-stat">
      <span>${escapeHtml(definition.extraLabel)}</span>
      <input type="number" data-target="skillExtra" min="${definition.extraMin ?? -999}" max="${definition.extraMax ?? 99999}" step="${definition.extraStep ?? 1}" value="${skill.extra}" />
    </label>
  ` : "";
  const itemControl = definition.itemTarget ? `
    <label class="enemy-skill-select">
      <span>Item</span>
      <select data-target="skillTargetItemId">${itemOptions || '<option value="">No items</option>'}</select>
    </label>
  ` : "";
  const trapControl = definition.trapTarget ? `
    <label class="enemy-skill-select">
      <span>Trap</span>
      <select data-target="skillTargetTrapId">${trapOptions || '<option value="">No traps</option>'}</select>
    </label>
  ` : "";
  const magicControl = definition.magicEffect ? `
    <label class="enemy-skill-select">
      <span>Magic Effect</span>
      <select data-target="skillMagicEffect">${magicOptions}</select>
    </label>
  ` : "";
  return `
    <div class="enemy-skill-row" data-skill-id="${escapeHtml(skill.id)}">
      <label class="inline-check">
        <input type="checkbox" data-target="skillEnabled"${skill.enabled ? " checked" : ""} />
        On
      </label>
      <label class="enemy-skill-select">
        <span>Skill</span>
        <select data-target="skillType">${skillOptions}</select>
      </label>
      ${chanceControl}
      ${valueControl}
      ${extraControl}
      ${itemControl}
      ${trapControl}
      ${magicControl}
      <button type="button" data-action="remove_enemy_skill">Remove</button>
      <p class="enemy-skill-summary">${describeEnemySkill(skill)}</p>
    </div>
  `;
}

function readEnemySkillFromRow(skillRow) {
  return normalizeEnemySkill({
    id: skillRow.dataset.skillId,
    enabled: skillRow.querySelector('[data-target="skillEnabled"]')?.checked,
    type: skillRow.querySelector('[data-target="skillType"]')?.value,
    chance: skillRow.querySelector('[data-target="skillChance"]')?.value,
    value: skillRow.querySelector('[data-target="skillValue"]')?.value,
    extra: skillRow.querySelector('[data-target="skillExtra"]')?.value,
    targetItemId: skillRow.querySelector('[data-target="skillTargetItemId"]')?.value,
    targetTrapId: skillRow.querySelector('[data-target="skillTargetTrapId"]')?.value,
    magicEffect: skillRow.querySelector('[data-target="skillMagicEffect"]')?.value,
  }, {});
}

function refreshEnemySkillSummaries() {
  enemyPoolList.querySelectorAll(".enemy-skill-row").forEach((skillRow) => {
    const summary = skillRow.querySelector(".enemy-skill-summary");
    if (!summary) {
      return;
    }
    summary.textContent = describeEnemySkill(readEnemySkillFromRow(skillRow));
  });
}

function normalizeEnemyFamilyRule(rule, fallback = {}) {
  const familyId = rule?.familyId ?? fallback.familyId ?? makeId("enemy");
  return {
    familyId,
    name: (rule?.name ?? fallback.name ?? "Custom Family").trim() || "Custom Family",
    glyph: String(rule?.glyph ?? fallback.glyph ?? "c").slice(0, 1) || "c",
    pursuit: normalizeEnemyPursuitSettings(rule?.pursuit, fallback?.pursuit, familyId),
    levels: Array.from({ length: 4 }, (_, index) => {
      const levelNumber = index + 1;
      const baseLevel = fallback.levels?.find((entry) => entry.level === levelNumber) ?? {};
      const existingLevel = rule?.levels?.find((entry) => Number(entry.level) === levelNumber) ?? {};
      return {
        level: levelNumber,
        enabled: Boolean(existingLevel.enabled ?? baseLevel.enabled ?? (index === 0)),
        name: (existingLevel.name ?? baseLevel.name ?? `Level ${levelNumber}`).trim() || `Level ${levelNumber}`,
        hp: Math.max(1, Number(existingLevel.hp ?? baseLevel.hp ?? (6 + index * 4))),
        attack: Math.max(0, Number(existingLevel.attack ?? baseLevel.attack ?? (3 + index * 2))),
        defense: Math.max(0, Number(existingLevel.defense ?? baseLevel.defense ?? index)),
        xp: Math.max(0, Number(existingLevel.xp ?? baseLevel.xp ?? (4 + index * 5))),
        skills: normalizeEnemySkills(existingLevel.skills ?? baseLevel.skills ?? []),
      };
    }),
  };
}

function normalizeEnemyPoolRules(rules = undefined) {
  const incoming = Array.isArray(rules) ? rules : [];
  if (rules === undefined) {
    return Object.entries(defaultMonsterFamilyCatalog).map(([familyId, family]) => normalizeEnemyFamilyRule({ familyId, ...family }, family));
  }
  if (incoming.length === 0) {
    return [];
  }
  return incoming.map((rule) => normalizeEnemyFamilyRule(rule, defaultMonsterFamilyCatalog[rule?.familyId] ? { familyId: rule.familyId, ...defaultMonsterFamilyCatalog[rule.familyId] } : {}));
}

function renderEnemyTypeControls(rules = undefined) {
  if (!enemyTypeList) {
    return;
  }
  const familyOptions = getEnemyFamilyOptions();
  enemyTypeList.innerHTML = "";
  const normalizedRules = normalizeEnemyTypeRules(rules);
  if (normalizedRules.length === 0) {
    const message = document.createElement("p");
    message.className = "empty-list";
    message.textContent = "No enemy types created yet.";
    enemyTypeList.append(message);
    return;
  }
  normalizedRules.forEach((rule) => {
    const row = document.createElement("div");
    row.className = "enemy-type-row";
    row.dataset.enemyTypeId = rule.id;
    row.innerHTML = `
      <div class="rune-row-header">
        <label>
          Name
          <input type="text" data-target="name" maxlength="28" value="${escapeHtml(rule.name)}" />
        </label>
        <div class="item-actions">
          <button type="button" data-action="remove_enemy_type">Remove</button>
        </div>
      </div>
      <div class="item-pool-rune-list enemy-type-family-list">
        ${familyOptions.map((family) => `
          <label class="item-pool-rune-option">
            <input type="checkbox" data-target="familyId" value="${escapeHtml(family.value)}"${rule.familyIds.includes(family.value) ? " checked" : ""} />
            ${escapeHtml(family.label)}
          </label>
        `).join("") || '<p class="item-pool-tip">No enemy families created yet.</p>'}
      </div>
      <p class="rune-summary">${rule.familyIds.length > 0 ? `${rule.familyIds.length} family${rule.familyIds.length === 1 ? "" : "ies"} assigned.` : "No families assigned yet."}</p>
    `;
    enemyTypeList.append(row);
  });
}

function readEnemyTypeRules() {
  if (!enemyTypeList) {
    return [];
  }
  return Array.from(enemyTypeList.querySelectorAll(".enemy-type-row")).map((row) => normalizeEnemyTypeRule({
    id: row.dataset.enemyTypeId,
    name: row.querySelector('[data-target="name"]')?.value,
    familyIds: Array.from(row.querySelectorAll('[data-target="familyId"]:checked')).map((checkbox) => checkbox.value),
  }, {}));
}

function applyEnemyTypeRules(rules = undefined) {
  renderEnemyTypeControls(rules);
}

function addEnemyTypeRule() {
  const rules = normalizeEnemyTypeRules(readEnemyTypeRules());
  rules.unshift(makeDefaultEnemyTypeRule());
  renderEnemyTypeControls(rules);
}

function normalizeEnemyDropSettings(settings = {}) {
  const source = settings?.enemyDrops ?? settings ?? {};
  const categories = Array.isArray(source.categories)
    ? source.categories.filter((categoryId) => itemCategories.some((category) => category.id === categoryId))
    : itemCategories.map((category) => category.id);
  return {
    enabled: source.enabled === true,
    chance: clampNumber(source.chance ?? 35, 0, 100, 35),
    rarityChance: clampNumber(source.rarityChance ?? 20, 0, 100, 20),
    categories: Array.from(new Set(categories)),
  };
}

function renderEnemyDropControls(settings = {}) {
  const normalized = normalizeEnemyDropSettings(settings);
  if (controls.enemyDropsEnabled) {
    controls.enemyDropsEnabled.checked = normalized.enabled;
  }
  if (controls.enemyDropChance) {
    controls.enemyDropChance.value = normalized.chance;
  }
  if (controls.enemyDropRarityChance) {
    controls.enemyDropRarityChance.value = normalized.rarityChance;
  }
  enemyDropCategories.innerHTML = itemCategories.map((category) => `
    <label class="enemy-drop-option inline-check">
      <input type="checkbox" data-enemy-drop-category value="${escapeHtml(category.id)}"${normalized.categories.includes(category.id) ? " checked" : ""} />
      ${escapeHtml(category.name)}
    </label>
  `).join("");
  updateEnemyDropControls();
}

function updateEnemyDropControls() {
  const enabled = controls.enemyDropsEnabled?.checked === true;
  enemyDropDetails?.classList.toggle("hidden", !enabled);
  if (enemyDropDetails && enabled) {
    enemyDropDetails.open = true;
  }
  enemyDropCategories.classList.toggle("hidden", !enabled);
  [controls.enemyDropChance, controls.enemyDropRarityChance].forEach((control) => {
    if (control) {
      control.disabled = !enabled;
    }
  });
  enemyDropCategories.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.disabled = !enabled;
  });
}

function readEnemyDropSettings() {
  return normalizeEnemyDropSettings({
    enabled: controls.enemyDropsEnabled?.checked === true,
    chance: controls.enemyDropChance?.value,
    rarityChance: controls.enemyDropRarityChance?.value,
    categories: Array.from(enemyDropCategories.querySelectorAll('[data-enemy-drop-category]:checked')).map((checkbox) => checkbox.value),
  });
}

function renderEnemyPoolControls(rules = undefined) {
  const openState = captureEnemyPoolOpenState();
  enemyPoolList.innerHTML = "";
  normalizeEnemyPoolRules(rules).forEach((family) => {
    const details = document.createElement("details");
    details.className = "enemy-family";
    details.dataset.family = family.familyId;
    if (openState.openFamilies.has(family.familyId)) {
      details.open = true;
    }

    const summary = document.createElement("summary");
    summary.textContent = `${family.name} (${family.glyph})`;
    details.append(summary);

    const body = document.createElement("div");
    body.className = "enemy-family-body";

    const familyToggle = document.createElement("div");
    familyToggle.className = "enemy-family-toggle";
    const familyEnabled = family.levels.some((level) => level.enabled);
    familyToggle.innerHTML = `
      <label>Name<input type="text" data-target="familyName" value="${escapeHtml(family.name)}" /></label>
      <label>Glyph<input type="text" data-target="glyph" maxlength="1" value="${escapeHtml(family.glyph)}" /></label>
      <div class="item-actions">
        <label><input type="checkbox" data-family-toggle${familyEnabled ? " checked" : ""} /> Active</label>
        <button type="button" data-action="remove_enemy_family">Remove</button>
      </div>
    `;
    body.append(familyToggle);

    family.levels.forEach((level) => {
      const row = document.createElement("div");
      row.className = "enemy-level-row";
      row.dataset.family = family.familyId;
      row.dataset.level = String(level.level);
      row.innerHTML = `
        <label class="enemy-level-enable"><input type="checkbox" data-target="enabled"${level.enabled ? " checked" : ""} /> Lv ${level.level}</label>
        <label>Name<input type="text" data-target="name" value="${level.name}" /></label>
        <label>HP<input type="number" min="1" data-target="hp" value="${level.hp}" /></label>
        <label>Atk<input type="number" min="0" data-target="attack" value="${level.attack}" /></label>
        <label>Def<input type="number" min="0" data-target="defense" value="${level.defense}" /></label>
        <label>XP<input type="number" min="0" data-target="xp" value="${level.xp}" /></label>
        <details class="enemy-level-skills">
          <summary>Skills</summary>
          <div class="enemy-skill-list">
            ${normalizeEnemySkills(level.skills).map((skill) => renderEnemySkillRow(skill)).join("") || '<p class="item-pool-tip">No skills yet.</p>'}
          </div>
          <div class="item-effect-actions">
            <button type="button" data-action="add_enemy_skill">+ Add Skill</button>
          </div>
        </details>
      `;
      const skillDetails = row.querySelector(".enemy-level-skills");
      if (skillDetails && openState.openSkillPanels.has(`${family.familyId}:${level.level}`)) {
        skillDetails.open = true;
      }
      body.append(row);
    });

    const pursuit = family.pursuit ?? normalizeEnemyPursuitSettings({}, {}, family.familyId);
    const pursuitSection = document.createElement("div");
    pursuitSection.className = "enemy-family-pursuit";
    pursuitSection.innerHTML = `
      <label class="enemy-family-pursuit-toggle inline-check">
        <input type="checkbox" data-target="pursuitEnabled"${pursuit.enabled ? " checked" : ""} />
        Pursue Player
      </label>
      <div class="enemy-family-pursuit-options">
        <label class="inline-check">
          <input type="checkbox" data-target="pursuitWhenEntering"${pursuit.whenEntering ? " checked" : ""} />
          Pursue when entering
        </label>
        <label class="inline-check">
          <input type="checkbox" data-target="pursuitWhenLeaving"${pursuit.whenLeaving ? " checked" : ""} />
          Pursue when leaving
        </label>
        <label class="inline-check">
          <input type="checkbox" data-target="pursuitWhenNextToEnemy"${pursuit.whenNextToEnemy ? " checked" : ""} />
          Pursue when next to enemy
        </label>
      </div>
    `;
    body.append(pursuitSection);

    details.append(body);
    enemyPoolList.append(details);
  });
  updateEnemyFamilyToggles();
  updateEnemyPursuitControls();
}

function updateEnemyFamilySummaries() {
  enemyPoolList.querySelectorAll(".enemy-family").forEach((familyElement) => {
    const summary = familyElement.querySelector("summary");
    if (!summary) {
      return;
    }
    const familyName = familyElement.querySelector('[data-target="familyName"]')?.value?.trim() || "Custom Family";
    const glyph = familyElement.querySelector('[data-target="glyph"]')?.value?.slice(0, 1) || "c";
    summary.textContent = `${familyName} (${glyph})`;
  });
}

function readEnemyPoolRules() {
  return Array.from(enemyPoolList.querySelectorAll(".enemy-family")).map((familyElement) => ({
    familyId: familyElement.dataset.family,
    name: familyElement.querySelector('[data-target="familyName"]')?.value?.trim() || "Custom Family",
    glyph: familyElement.querySelector('[data-target="glyph"]')?.value?.slice(0, 1) || "c",
    pursuit: normalizeEnemyPursuitSettings({
      enabled: familyElement.querySelector('[data-target="pursuitEnabled"]')?.checked,
      whenEntering: familyElement.querySelector('[data-target="pursuitWhenEntering"]')?.checked,
      whenLeaving: familyElement.querySelector('[data-target="pursuitWhenLeaving"]')?.checked,
      whenNextToEnemy: familyElement.querySelector('[data-target="pursuitWhenNextToEnemy"]')?.checked,
    }, {}, familyElement.dataset.family),
    levels: Array.from(familyElement.querySelectorAll(".enemy-level-row")).map((row) => ({
      level: Number(row.dataset.level),
      enabled: row.querySelector('[data-target="enabled"]').checked,
      name: row.querySelector('[data-target="name"]').value.trim() || `Level ${row.dataset.level}`,
      hp: Math.max(1, Number(row.querySelector('[data-target="hp"]').value)),
      attack: Math.max(0, Number(row.querySelector('[data-target="attack"]').value)),
      defense: Math.max(0, Number(row.querySelector('[data-target="defense"]').value)),
      xp: Math.max(0, Number(row.querySelector('[data-target="xp"]').value)),
      skills: Array.from(row.querySelectorAll(".enemy-skill-row")).map((skillRow) => readEnemySkillFromRow(skillRow)),
    })),
  }));
}

function captureEnemyPoolOpenState() {
  const openFamilies = new Set();
  const openSkillPanels = new Set();
  enemyPoolList.querySelectorAll(".enemy-family").forEach((familyElement) => {
    if (familyElement.open) {
      openFamilies.add(familyElement.dataset.family);
    }
    familyElement.querySelectorAll(".enemy-level-row").forEach((row) => {
      const skillDetails = row.querySelector(".enemy-level-skills");
      if (skillDetails?.open) {
        openSkillPanels.add(`${row.dataset.family}:${row.dataset.level}`);
      }
    });
  });
  return { openFamilies, openSkillPanels };
}

function applyEnemyPoolRules(rules = undefined) {
  renderEnemyPoolControls(rules);
}

function applyEnemyDropSettings(settings = {}) {
  renderEnemyDropControls(settings);
}

function addEnemyFamily() {
  const rules = normalizeEnemyPoolRules(readEnemyPoolRules());
  rules.unshift(makeDefaultEnemyFamilyRule());
  renderEnemyPoolControls(rules);
}

function updateEnemyFamilyToggles() {
  enemyPoolList.querySelectorAll(".enemy-family").forEach((familyElement) => {
    const toggle = familyElement.querySelector("[data-family-toggle]");
    const levelToggles = Array.from(familyElement.querySelectorAll('.enemy-level-row [data-target="enabled"]'));
    if (!toggle || levelToggles.length === 0) {
      return;
    }
    const enabledCount = levelToggles.filter((checkbox) => checkbox.checked).length;
    toggle.checked = enabledCount === levelToggles.length;
    toggle.indeterminate = enabledCount > 0 && enabledCount < levelToggles.length;
    familyElement.classList.toggle("recipe-entry-disabled", enabledCount === 0);
    familyElement.querySelectorAll(".enemy-level-row").forEach((row) => {
      const enabled = row.querySelector('[data-target="enabled"]')?.checked === true;
      row.classList.toggle("recipe-entry-disabled", !enabled);
    });
  });
}

function updateEnemyPursuitControls() {
  enemyPoolList.querySelectorAll(".enemy-family").forEach((familyElement) => {
    const enabled = familyElement.querySelector('[data-target="pursuitEnabled"]')?.checked === true;
    familyElement.querySelector(".enemy-family-pursuit-options")?.classList.toggle("disabled", !enabled);
    familyElement.querySelectorAll('.enemy-family-pursuit-options input[type="checkbox"]').forEach((checkbox) => {
      checkbox.disabled = !enabled;
    });
  });
}

function setEnemyFamilyEnabled(familyElement, enabled) {
  familyElement.querySelectorAll('.enemy-level-row [data-target="enabled"]').forEach((checkbox) => {
    checkbox.checked = enabled;
  });
}

function setCategoryItemsEnabled(categoryElement, enabled) {
  categoryElement.querySelectorAll('.item-pool-row [data-target="enabled"]').forEach((checkbox) => {
    checkbox.checked = enabled;
  });
}

function updateItemPoolCategoryToggles() {
  itemPoolList.querySelectorAll(".item-pool-category").forEach((categoryElement) => {
    const toggle = categoryElement.querySelector("[data-category-toggle]");
    const itemToggles = Array.from(categoryElement.querySelectorAll('.item-pool-row [data-target="enabled"]'));
    if (!toggle || itemToggles.length === 0) {
      return;
    }
    const enabledCount = itemToggles.filter((checkbox) => checkbox.checked).length;
    const categoryId = categoryElement.dataset.category;
    const foodLocked = categoryId === "food" && controls.hungerEnabled.checked !== true;
    toggle.checked = enabledCount === itemToggles.length;
    toggle.indeterminate = enabledCount > 0 && enabledCount < itemToggles.length;
    categoryElement.classList.toggle("pool-disabled", enabledCount === 0 || foodLocked);
  });
}

function updateItemPoolRowStates() {
  itemPoolList.querySelectorAll(".item-pool-row").forEach((row) => {
    const enabled = row.querySelector('[data-target="enabled"]')?.checked === true;
    row.classList.toggle("recipe-entry-disabled", !enabled);
  });
}

function updateSpecialRoomRowStates() {
  specialRoomList.querySelectorAll(".special-room-row").forEach((row) => {
    const enabled = row.querySelector('[data-target="enabled"]')?.checked === true;
    row.classList.toggle("recipe-entry-disabled", !enabled);
  });
}

function updateRuneRowStates() {
  runePoolList.querySelectorAll(".rune-row").forEach((row) => {
    const enabled = row.querySelector('[data-target="enabled"]')?.checked === true;
    row.classList.toggle("recipe-entry-disabled", !enabled);
  });
  syncBulkEnableToggle(runeEnableAll, runePoolList.querySelectorAll(".rune-row"));
}

function readStartingEquipment() {
  return {
    leftHand: {
      itemId: controls.startLeftHand.value || null,
      rarity: controls.startLeftHandRarity.value || "common",
      cursed: controls.startLeftHandCursed.checked,
    },
    rightHand: {
      itemId: controls.startRightHand.value || null,
      rarity: controls.startRightHandRarity.value || "common",
      cursed: controls.startRightHandCursed.checked,
    },
    bracelet1: {
      itemId: controls.startBracelet1.value || null,
      cursed: controls.startBracelet1Cursed.checked,
    },
    bracelet2: {
      itemId: controls.startBracelet2.value || null,
      cursed: controls.startBracelet2Cursed.checked,
    },
  };
}

function readStartingInventory() {
  return Array.from(startingInventoryList.querySelectorAll(".starting-inventory-slot"))
    .map((slot) => ({
      itemId: slot.querySelector("[data-starting-inventory-slot]")?.value || null,
      cursed: slot.querySelector("[data-starting-inventory-cursed]")?.checked ?? false,
    }))
    .filter((entry) => entry.itemId && itemDefinitions[entry.itemId] && itemDefinitions[entry.itemId].deleted !== true);
}

function normalizeStartingEntry(entry, fallbackItemId = null) {
  if (typeof entry === "string") {
    return itemDefinitions[entry] && itemDefinitions[entry].deleted !== true ? { itemId: entry, rarity: "common", cursed: false } : { itemId: fallbackItemId, rarity: "common", cursed: false };
  }
  const itemId = entry?.itemId ?? fallbackItemId;
  return itemDefinitions[itemId] && itemDefinitions[itemId].deleted !== true
    ? { itemId, rarity: typeof entry?.rarity === "string" ? entry.rarity : "common", cursed: Boolean(entry?.cursed) }
    : { itemId: null, rarity: "common", cursed: false };
}

function getEnabledStartingItemIds(recipe = {}) {
  return new Set(
    getSpawnableItemPoolRules({
      itemPoolRules: recipe.itemPoolRules ?? readItemPoolRules(),
      hungerEnabled: recipe.hungerEnabled ?? controls.hungerEnabled.checked,
    })
      .filter((rule) => rule.enabled && !rule.deleted)
      .map((rule) => rule.itemId),
  );
}

function normalizeStartingEquipment(recipe = {}) {
  const startingEquipment = recipe.startingEquipment ?? {};
  const enabledItemIds = getEnabledStartingItemIds(recipe);
  const normalizeEnabledEntry = (entry, fallbackItemId = null) => {
    const normalized = normalizeStartingEntry(entry, fallbackItemId);
    return normalized.itemId && enabledItemIds.has(normalized.itemId)
      ? normalized
      : { itemId: null, rarity: "common", cursed: false };
  };
  return {
    leftHand: normalizeEnabledEntry(startingEquipment.leftHand, recipe.startingItem ?? null),
    rightHand: normalizeEnabledEntry(startingEquipment.rightHand),
    bracelet1: normalizeEnabledEntry(startingEquipment.bracelet1),
    bracelet2: normalizeEnabledEntry(startingEquipment.bracelet2),
  };
}

function normalizeStartingInventory(recipe = {}) {
  const enabledItemIds = getEnabledStartingItemIds(recipe);
  if (Array.isArray(recipe.startingInventory)) {
    return recipe.startingInventory
      .map((entry) => normalizeStartingEntry(entry))
      .filter((entry) => entry.itemId && enabledItemIds.has(entry.itemId));
  }
  return [];
}

function getStartingEquipmentCount(startingEquipment = readStartingEquipment()) {
  return Object.values(startingEquipment).filter((entry) => entry?.itemId).length;
}

function getStartingInventorySlotCount(startingEquipment = readStartingEquipment()) {
  const limit = numberValue("inventoryLimit");
  const equippedCount = controls.equippedCountsTowardLimit.checked ? getStartingEquipmentCount(startingEquipment) : 0;
  return Math.max(0, limit - equippedCount);
}

function renderStartingEquipmentControls(selected = readStartingEquipment()) {
  const enabledItemIds = getEnabledStartingItemIds({
    itemPoolRules: readItemPoolRules(),
    hungerEnabled: controls.hungerEnabled.checked,
  });
  const normalized = {
    leftHand: normalizeStartingEntry(selected.leftHand),
    rightHand: normalizeStartingEntry(selected.rightHand),
    bracelet1: normalizeStartingEntry(selected.bracelet1),
    bracelet2: normalizeStartingEntry(selected.bracelet2),
  };
  renderStartingSelect(controls.startLeftHand, normalized.leftHand.itemId, "hand", enabledItemIds);
  renderStartingSelect(controls.startRightHand, normalized.rightHand.itemId, "hand", enabledItemIds);
  renderStartingSelect(controls.startBracelet1, normalized.bracelet1.itemId, "bracelet", enabledItemIds);
  renderStartingSelect(controls.startBracelet2, normalized.bracelet2.itemId, "bracelet", enabledItemIds);
  renderStartingRaritySelect(controls.startLeftHandRarity, normalized.leftHand.rarity, normalized.leftHand.itemId);
  renderStartingRaritySelect(controls.startRightHandRarity, normalized.rightHand.rarity, normalized.rightHand.itemId);
  syncStartingCursedToggle(controls.startLeftHand, controls.startLeftHandCursed, normalized.leftHand.cursed);
  syncStartingCursedToggle(controls.startRightHand, controls.startRightHandCursed, normalized.rightHand.cursed);
  syncStartingCursedToggle(controls.startBracelet1, controls.startBracelet1Cursed, normalized.bracelet1.cursed);
  syncStartingCursedToggle(controls.startBracelet2, controls.startBracelet2Cursed, normalized.bracelet2.cursed);
}

function renderStartingRaritySelect(select, selectedRarity, itemId) {
  const item = itemDefinitions[itemId];
  const rarityOptions = getSelectableStartingRarityOptions();
  select.innerHTML = "";
  select.append(new Option("Common", "common"));
  rarityOptions.forEach((rule) => {
    select.append(new Option(rule.name, rule.id));
  });
  const canUseRarity = item?.kind === "hand" && controls.weaponRarityEnabled.checked;
  select.disabled = !canUseRarity;
  select.value = canUseRarity && [ "common", ...rarityOptions.map((rule) => rule.id) ].includes(selectedRarity)
    ? selectedRarity
    : "common";
}

function getSelectableStartingRarityOptions() {
  if (!controls.weaponRarityEnabled.checked) {
    return [];
  }
  return normalizeRarityRules(readRarityRules()).filter((rule) => rule.enabled);
}

function getValidStartingHandRarity(recipe, itemId, rarityId) {
  const item = itemDefinitions[itemId];
  if (item?.kind !== "hand" || recipe?.weaponRarityEnabled === false) {
    return null;
  }
  if (!rarityId || rarityId === "common") {
    return "common";
  }
  return getRarityRule(rarityId, recipe) ? rarityId : "common";
}

function renderStartingSelect(select, selectedItemId, kind, enabledItemIds) {
  select.innerHTML = "";
  select.append(new Option("None", ""));

  Object.entries(itemDefinitions)
    .filter(([itemId, item]) => item.kind === kind && item.deleted !== true && enabledItemIds.has(itemId))
    .forEach(([itemId, item]) => {
      select.append(new Option(item.name, itemId));
    });

  if (selectedItemId && enabledItemIds.has(selectedItemId)) {
    select.value = selectedItemId;
  }
}

function renderStartingInventoryControls(selected = readStartingInventory()) {
  const enabledItemIds = getEnabledStartingItemIds({
    itemPoolRules: readItemPoolRules(),
    hungerEnabled: controls.hungerEnabled.checked,
  });
  const normalized = selected.map((entry) => normalizeStartingEntry(entry));
  const slots = getStartingInventorySlotCount(readStartingEquipment());
  startingInventoryList.innerHTML = "";

  if (slots === 0) {
    const message = document.createElement("p");
    message.className = "empty-list";
    message.textContent = "No starting inventory slots are available with the current equipment limit.";
    startingInventoryList.append(message);
    return;
  }

  for (let index = 0; index < slots; index += 1) {
    const entry = normalized[index] ?? { itemId: null, cursed: false };
    const card = document.createElement("div");
    card.className = "starting-inventory-slot";
    const label = document.createElement("label");
    const select = document.createElement("select");
    select.dataset.startingInventorySlot = String(index);
    renderStartingAnyItemSelect(select, entry.itemId, enabledItemIds);
    label.append(`Slot ${index + 1}`, select);
    const cursedLabel = document.createElement("label");
    cursedLabel.className = "inline-check";
    const cursed = document.createElement("input");
    cursed.type = "checkbox";
    cursed.dataset.startingInventoryCursed = String(index);
    cursed.disabled = !entry.itemId;
    cursed.checked = entry.itemId ? entry.cursed : false;
    cursedLabel.append(cursed, "Cursed");
    card.append(label, cursedLabel);
    startingInventoryList.append(card);
  }
}

function renderStartingAnyItemSelect(select, selectedItemId, enabledItemIds) {
  select.innerHTML = "";
  select.append(new Option("None", ""));

  Object.entries(itemDefinitions)
    .filter(([itemId, item]) => item.deleted !== true && enabledItemIds.has(itemId))
    .forEach(([itemId, item]) => {
      select.append(new Option(item.name, itemId));
    });

  if (selectedItemId && enabledItemIds.has(selectedItemId)) {
    select.value = selectedItemId;
  }
}

function syncStartingCursedToggle(select, checkbox, cursed) {
  const hasItem = Boolean(select.value);
  checkbox.disabled = !hasItem;
  checkbox.checked = hasItem ? cursed : false;
}

function refreshStartingLoadoutControls() {
  const selectedInventory = readStartingInventory();
  renderStartingEquipmentControls(readStartingEquipment());
  renderStartingInventoryControls(selectedInventory);
}

function readEnvironmentalEffects() {
  return Array.from(environmentalEffectsList.querySelectorAll(".effect-row")).map((row) => ({
    id: row.dataset.effect,
    affectsPlayer: row.querySelector('[data-target="player"]').checked,
    affectsEnemy: row.querySelector('[data-target="enemy"]')?.checked ?? false,
    playerTurns: Number(row.querySelector('[data-target="playerTurns"]')?.value ?? 5),
    enemyTurns: Number(row.querySelector('[data-target="enemyTurns"]')?.value ?? 5),
    itemTrigger: row.querySelector('[data-target="itemTrigger"]')?.value ?? "category:weapons",
    conditionType: row.querySelector('[data-target="conditionType"]')?.value ?? "hpBecomes",
    conditionValue: Number(row.querySelector('[data-target="conditionValue"]')?.value ?? 0),
    conditionBool: row.querySelector('[data-target="conditionBool"]')?.value === "true",
  }));
}

function getConditionalItemUseTriggerOptions() {
  const categoryOptions = itemCategories
    .filter((category) => category.id !== "treasure")
    .map((category) => ({
      value: `category:${category.id}`,
      label: `Any ${category.name.replace(/s$/, "")}`,
      group: "Categories",
    }));
  const itemOptions = normalizeItemPoolRules(readItemPoolRules())
    .filter((rule) => !rule.deleted && rule.kind !== "gold")
    .map((rule) => ({
      value: `item:${rule.itemId}`,
      label: rule.name,
      group: "Specific Items",
    }));
  return [...categoryOptions, ...itemOptions];
}

function getConditionalItemUseConditionDefinition(conditionType = "hpAtMost") {
  const legacyMap = {
    hpAtMost: "hpBecomes",
    hpAtLeast: "hpBecomes",
    maxHpAtMost: "maxHpBecomes",
    maxHpAtLeast: "maxHpBecomes",
    hungerAtMost: "hungerBecomes",
    hungerAtLeast: "hungerBecomes",
    maxHungerAtMost: "maxHungerBecomes",
    maxHungerAtLeast: "maxHungerBecomes",
    goldAtMost: "goldBecomes",
    goldAtLeast: "goldBecomes",
    inventoryUsedAtMost: "inventorySpaceBecomes",
    inventoryUsedAtLeast: "inventorySpaceBecomes",
    inventorySpaceLeftAtMost: "inventorySpaceBecomes",
    inventorySpaceLeftAtLeast: "inventorySpaceBecomes",
    itemIsCursed: "itemCursedBecomes",
    itemIsBlessed: "itemBlessedBecomes",
    itemIsIdentified: "itemIdentifiedBecomes",
    itemUpgradeAtMost: "itemUpgradeBecomes",
    itemUpgradeAtLeast: "itemUpgradeBecomes",
    itemChargesAtMost: "itemChargesBecome",
    itemChargesAtLeast: "itemChargesBecome",
    itemAttackAtMost: "itemAttackBecomes",
    itemAttackAtLeast: "itemAttackBecomes",
    itemDefenseAtMost: "itemDefenseBecomes",
    itemDefenseAtLeast: "itemDefenseBecomes",
  };
  const normalizedId = legacyMap[conditionType] ?? conditionType;
  return conditionalItemUseConditionDefinitions.find((definition) => definition.id === normalizedId)
    ?? conditionalItemUseConditionDefinitions[0];
}

function matchesConditionalItemTrigger(effect, item) {
  if (!effect?.itemTrigger || !item) {
    return false;
  }
  if (effect.itemTrigger.startsWith("item:")) {
    return item.itemId === effect.itemTrigger.slice(5);
  }
  if (effect.itemTrigger.startsWith("category:")) {
    return getItemCategoryId(item.itemId) === effect.itemTrigger.slice(9);
  }
  return false;
}

function describeConditionalItemUseAction(effect) {
  const definition = getConditionalItemUseConditionDefinition(effect.conditionType);
  const trigger = getConditionalItemUseTriggerOptions().find((option) => option.value === effect.itemTrigger);
  const valueText = definition.kind === "boolean"
    ? (effect.conditionBool ? "True" : "False")
    : effect.conditionValue;
  return `${trigger?.label ?? "Item"} -> ${definition.label} ${valueText}`;
}

function applyConditionalItemUseEffect(entry, item, options = {}) {
  const effect = game.currentEnvironmentalEffect;
  if (!effect || effect.id !== "conditionalItemUse" || !effect.affectsPlayer || !matchesConditionalItemTrigger(effect, item)) {
    return false;
  }
  const value = Number(effect.conditionValue ?? 0);
  const boolValue = effect.conditionBool === true;
  switch (effect.conditionType) {
    case "hpBecomes":
      game.hp = Math.max(0, Math.min(getPlayerMaxHp(), value));
      break;
    case "maxHpBecomes":
      game.conditionalOverrides.maxHp = Math.max(1, value);
      game.hp = Math.min(game.hp, getPlayerMaxHp());
      break;
    case "hungerBecomes":
      game.hunger = Math.max(0, Math.min(getPlayerMaxHunger(), value));
      break;
    case "maxHungerBecomes":
      game.conditionalOverrides.maxHunger = Math.max(1, value);
      game.hungerMax = getPlayerMaxHunger();
      game.hunger = Math.min(game.hunger, game.hungerMax);
      break;
    case "goldBecomes":
      game.gold = value;
      break;
    case "inventorySpaceBecomes":
      if (game.recipe) {
        game.recipe.inventoryLimit = Math.max(1, value);
      }
      break;
    case "itemCursedBecomes":
      entry.cursed = boolValue;
      if (!boolValue) {
        entry.curseRevealed = false;
      }
      break;
    case "itemBlessedBecomes":
      entry.blessed = boolValue;
      break;
    case "itemIdentifiedBecomes":
      entry.identified = boolValue;
      if (boolValue) {
        identifyItemType(entry.itemId);
      }
      break;
    case "itemUpgradeBecomes":
      entry.upgradeLevel = Math.max(-99, Math.min(99, value));
      break;
    case "itemChargesBecome":
      entry.charges = Math.max(0, value);
      break;
    case "itemAttackBecomes":
      entry.attack = Math.max(0, value);
      break;
    case "itemDefenseBecomes":
      entry.defense = Math.max(0, value);
      break;
    default:
      return false;
  }
  if (options.silent !== true) {
    log(`Conditional Item Use: ${describeConditionalItemUseAction(effect)}.`);
  }
  return true;
}

function applyConditionalItemUseEffects(entries = []) {
  let triggered = false;
  entries.forEach((entry) => {
    const item = getItemDefinition(entry);
    if (!entry || !item) {
      return;
    }
    if (applyConditionalItemUseEffect(entry, item, { silent: triggered })) {
      triggered = true;
    }
  });
  return triggered;
}

function renderConditionalItemUseControls(effect = {}) {
  const row = environmentalEffectsList.querySelector('[data-effect="conditionalItemUse"]');
  if (!row) {
    return;
  }
  const triggerSelect = row.querySelector('[data-target="itemTrigger"]');
  const conditionSelect = row.querySelector('[data-target="conditionType"]');
  const valueWrap = row.querySelector(".conditional-effect-value");
  if (!triggerSelect || !conditionSelect || !valueWrap) {
    return;
  }

  const triggerOptions = getConditionalItemUseTriggerOptions();
  const selectedTrigger = triggerOptions.some((option) => option.value === effect.itemTrigger)
    ? effect.itemTrigger
    : triggerOptions[0]?.value ?? "category:weapons";
  triggerSelect.innerHTML = ["Categories", "Specific Items"].map((group) => {
    const options = triggerOptions.filter((option) => option.group === group);
    if (options.length === 0) {
      return "";
    }
    return `<optgroup label="${escapeHtml(group)}">${options.map((option) => `<option value="${escapeHtml(option.value)}"${option.value === selectedTrigger ? " selected" : ""}>${escapeHtml(option.label)}</option>`).join("")}</optgroup>`;
  }).join("");

  const conditionDefinition = getConditionalItemUseConditionDefinition(effect.conditionType);
  conditionSelect.innerHTML = conditionalItemUseConditionDefinitions
    .map((definition) => `<option value="${escapeHtml(definition.id)}"${definition.id === conditionDefinition.id ? " selected" : ""}>${escapeHtml(definition.label)}</option>`)
    .join("");

  if (conditionDefinition.kind === "boolean") {
    const boolValue = effect.conditionBool ?? conditionDefinition.defaultBool ?? true;
    valueWrap.innerHTML = `
      <label>
        Value
        <select data-target="conditionBool">
          <option value="true"${boolValue ? " selected" : ""}>True</option>
          <option value="false"${!boolValue ? " selected" : ""}>False</option>
        </select>
      </label>
    `;
  } else {
    const value = Number.isFinite(Number(effect.conditionValue))
      ? Number(effect.conditionValue)
      : Number(conditionDefinition.defaultValue ?? 0);
    valueWrap.innerHTML = `
      <label>
        Value
        <input type="number" data-target="conditionValue" min="${conditionDefinition.min ?? -99999}" max="${conditionDefinition.max ?? 99999}" step="${conditionDefinition.step ?? 1}" value="${value}" />
      </label>
    `;
  }
}

function normalizeEnvironmentalEffects(effects = []) {
  return Object.keys(environmentalEffectDefinitions).map((id) => {
    const existing = effects.find((effect) => effect.id === id) ?? {};
    const affectsPlayer = existing.affectsPlayer ?? true;
    const playerOnly = id === "randomItemDrop";
    const affectsEnemy = playerOnly ? false : (existing.affectsEnemy ?? id !== "noPickup");
    const legacyEnabled = existing.enabled ?? true;
    const disabledForNow = id === "conditionalItemUse";
    return {
      id,
      affectsPlayer: disabledForNow ? false : (legacyEnabled && affectsPlayer),
      affectsEnemy: disabledForNow ? false : (legacyEnabled && affectsEnemy),
      playerTurns: clampNumber(existing.playerTurns ?? 5, 1, 99, 5),
      enemyTurns: clampNumber(existing.enemyTurns ?? 5, 1, 99, 5),
      itemTrigger: existing.itemTrigger ?? "category:weapons",
      conditionType: existing.conditionType ?? "hpBecomes",
      conditionValue: Number(existing.conditionValue ?? 10),
      conditionBool: existing.conditionBool ?? true,
      playerCounter: 0,
      enemyCounter: 0,
    };
  });
}

function applyEnvironmentalEffects(effects = []) {
  const normalized = normalizeEnvironmentalEffects(effects);
  normalized.forEach((effect) => {
    const row = environmentalEffectsList.querySelector(`[data-effect="${effect.id}"]`);
    if (!row) {
      return;
    }

    const disabledForNow = effect.id === "conditionalItemUse";
    row.classList.toggle("effect-disabled", disabledForNow);

    row.querySelector('[data-target="player"]').checked = effect.affectsPlayer;
    const enemyToggle = row.querySelector('[data-target="enemy"]');
    if (enemyToggle) {
      enemyToggle.checked = effect.affectsEnemy;
    }
    const playerTurns = row.querySelector('[data-target="playerTurns"]');
    const enemyTurns = row.querySelector('[data-target="enemyTurns"]');
    if (playerTurns) {
      playerTurns.value = String(effect.playerTurns ?? 5);
      playerTurns.disabled = !effect.affectsPlayer;
    }
    if (enemyTurns) {
      enemyTurns.value = String(effect.enemyTurns ?? 5);
      enemyTurns.disabled = !effect.affectsEnemy;
    }
    if (effect.id === "conditionalItemUse") {
      renderConditionalItemUseControls(effect);
    }
    row.querySelectorAll("input, select, button").forEach((control) => {
      control.disabled = disabledForNow || control.disabled;
    });
  });
}

function normalizeSpecialRooms(rooms = []) {
  return Object.keys(specialRoomDefinitions).map((id) => {
    const existing = rooms.find((room) => room.id === id) ?? {};
    return {
      id,
      name: String(existing.name ?? specialRoomDefinitions[id]?.name ?? id).trim().slice(0, 40) || specialRoomDefinitions[id]?.name || id,
      enabled: Boolean(existing.enabled),
    };
  });
}

function renderSpecialRoomControls(rooms = []) {
  specialRoomList.innerHTML = "";
  normalizeSpecialRooms(rooms).forEach((room) => {
    const definition = specialRoomDefinitions[room.id];
    const row = document.createElement("div");
    row.className = "special-room-row";
    if (!room.enabled) {
      row.classList.add("recipe-entry-disabled");
    }
    row.dataset.roomId = room.id;
    row.innerHTML = `
      <strong class="special-room-title" data-action="edit_special_room_name" tabindex="0">${escapeHtml(room.name)}</strong>
      <input class="special-room-title-input hidden" type="text" maxlength="40" value="${escapeHtml(room.name)}" />
      <p>${escapeHtml(definition.description)}</p>
      <label><input type="checkbox" data-target="enabled"${room.enabled ? " checked" : ""} /> Enable</label>
    `;
    specialRoomList.append(row);
  });
}

function readSpecialRooms() {
  return Array.from(specialRoomList.querySelectorAll(".special-room-row")).map((row) => ({
    id: row.dataset.roomId,
    name: row.querySelector(".special-room-title-input")?.value?.trim().slice(0, 40)
      || row.querySelector(".special-room-title")?.textContent?.trim()
      || specialRoomDefinitions[row.dataset.roomId]?.name
      || row.dataset.roomId,
    enabled: row.querySelector('[data-target="enabled"]')?.checked ?? false,
  }));
}

function applySpecialRooms(rooms = []) {
  renderSpecialRoomControls(rooms);
}

function beginSpecialRoomRename(row) {
  const title = row?.querySelector(".special-room-title");
  const input = row?.querySelector(".special-room-title-input");
  if (!title || !input) {
    return;
  }
  input.value = title.textContent.trim();
  title.classList.add("hidden");
  input.classList.remove("hidden");
  input.focus();
  input.select();
}

function commitSpecialRoomRename(row) {
  const title = row?.querySelector(".special-room-title");
  const input = row?.querySelector(".special-room-title-input");
  if (!title || !input) {
    return;
  }
  const roomId = row.dataset.roomId;
  const fallbackName = specialRoomDefinitions[roomId]?.name ?? roomId;
  const nextName = input.value.trim().slice(0, 40) || fallbackName;
  input.value = nextName;
  title.textContent = nextName;
  input.classList.add("hidden");
  title.classList.remove("hidden");
  if (game.recipe) {
    game.recipe.specialRooms = readSpecialRooms();
  }
}

const bossRoomShapeOptions = ["square", "circle", "triangle", "pentagon", "hexagon", "octagon", "diamond"];

function normalizeBossSpecialAttacks(attacks = []) {
  const source = Array.isArray(attacks) && attacks.length > 0
    ? attacks
    : [
      { id: "shockwave", name: "Shockwave", enabled: true, damage: 8, cooldown: 3, range: 3, notes: "Wide pulse around the boss." },
      { id: "charge", name: "Charge", enabled: true, damage: 10, cooldown: 4, range: 5, notes: "Rushes in a straight line toward the player." },
    ];
  return source.map((attack, index) => ({
    id: String(attack?.id ?? `bossAttack${index + 1}`),
    name: String(attack?.name ?? `Special Attack ${index + 1}`).trim() || `Special Attack ${index + 1}`,
    enabled: attack?.enabled !== false,
    damage: Math.max(0, Number(attack?.damage ?? 6)),
    cooldown: Math.max(0, Number(attack?.cooldown ?? 3)),
    range: Math.max(1, Number(attack?.range ?? 3)),
    notes: String(attack?.notes ?? "").trim().slice(0, 120),
  }));
}

function normalizeBossRoomSettings(settings = {}) {
  const bossRoom = settings?.bossRoom ?? settings ?? {};
  const shape = String(bossRoom.shape ?? "square").toLowerCase();
  const normalizedShape = bossRoomShapeOptions.includes(shape) ? shape : "square";
  const normalizedBossSize = bossRoom.bossSize === "3x3" ? "3x3" : "2x2";
  return {
    enabled: bossRoom.enabled === true,
    name: String(bossRoom.name ?? "Dungeon Boss").trim().slice(0, 40) || "Dungeon Boss",
    bossSize: normalizedBossSize,
    attack: Math.max(0, Math.round(Number(bossRoom.attack ?? 12) || 12)),
    shape: normalizedShape,
    width: Math.max(3, Math.min(31, Number(bossRoom.width ?? 9))),
    height: Math.max(3, Math.min(31, Number(bossRoom.height ?? 9))),
    behavior: clampNumber(bossRoom.behavior ?? 3, 0, 10, 3),
    specialAttacks: normalizeBossSpecialAttacks(bossRoom.specialAttacks),
  };
}

function createBossSpecialAttackRow(attack = {}) {
  const normalized = normalizeBossSpecialAttacks([attack])[0];
  const row = document.createElement("div");
  row.className = "boss-attack-row";
  row.dataset.attackId = normalized.id;
  row.innerHTML = `
    <div class="boss-attack-header">
      <label>
        Attack Name
        <input type="text" data-target="name" maxlength="32" value="${escapeHtml(normalized.name)}" />
      </label>
      <div class="item-actions">
        <label><input type="checkbox" data-target="enabled"${normalized.enabled ? " checked" : ""} /> Enable</label>
        <button type="button" data-action="remove_boss_attack">Remove</button>
      </div>
    </div>
    <div class="boss-attack-fields">
      <label>
        Damage
        <input type="number" min="0" step="1" data-target="damage" value="${normalized.damage}" />
      </label>
      <label>
        Cooldown
        <input type="number" min="0" step="1" data-target="cooldown" value="${normalized.cooldown}" />
      </label>
      <label>
        Range
        <input type="number" min="1" step="1" data-target="range" value="${normalized.range}" />
      </label>
    </div>
    <label class="boss-attack-notes">
      Notes
      <input type="text" data-target="notes" maxlength="120" value="${escapeHtml(normalized.notes)}" />
    </label>
  `;
  return row;
}

function renderBossSpecialAttacks(attacks = []) {
  bossAttackList.innerHTML = "";
  normalizeBossSpecialAttacks(attacks).forEach((attack) => {
    bossAttackList.append(createBossSpecialAttackRow(attack));
  });
}

function readBossSpecialAttacks() {
  return Array.from(bossAttackList.querySelectorAll(".boss-attack-row")).map((row, index) => ({
    id: row.dataset.attackId || `bossAttack${index + 1}`,
    name: row.querySelector('[data-target="name"]')?.value ?? "",
    enabled: row.querySelector('[data-target="enabled"]')?.checked ?? true,
    damage: Number(row.querySelector('[data-target="damage"]')?.value ?? 0),
    cooldown: Number(row.querySelector('[data-target="cooldown"]')?.value ?? 0),
    range: Number(row.querySelector('[data-target="range"]')?.value ?? 1),
    notes: row.querySelector('[data-target="notes"]')?.value ?? "",
  }));
}

function updateBossRoomControls() {
  const enabled = controls.bossRoomEnabled.checked === true;
  bossRoomControls.classList.toggle("hidden", !enabled);
  [
    controls.bossName,
    controls.bossSize,
    controls.bossAttack,
    controls.bossRoomShape,
    controls.bossRoomWidth,
    controls.bossRoomHeight,
    controls.bossBehavior,
    bossAttackAddButton,
  ].forEach((control) => {
    control.disabled = !enabled;
  });
  bossAttackList.querySelectorAll("input, button").forEach((control) => {
    control.disabled = !enabled;
  });
}

function readBossRoomSettings() {
  return normalizeBossRoomSettings({
    bossRoom: {
      enabled: controls.bossRoomEnabled.checked,
      name: controls.bossName.value,
      bossSize: controls.bossSize.value,
      attack: controls.bossAttack.value,
      shape: controls.bossRoomShape.value,
      width: controls.bossRoomWidth.value,
      height: controls.bossRoomHeight.value,
      behavior: controls.bossBehavior.value,
      specialAttacks: readBossSpecialAttacks(),
    },
  });
}

function applyBossRoomSettings(settings = {}) {
  const normalized = normalizeBossRoomSettings(settings);
  controls.bossRoomEnabled.checked = normalized.enabled;
  controls.bossName.value = normalized.name;
  controls.bossSize.value = normalized.bossSize;
  controls.bossAttack.value = normalized.attack;
  controls.bossRoomShape.value = normalized.shape;
  controls.bossRoomWidth.value = normalized.width;
  controls.bossRoomHeight.value = normalized.height;
  controls.bossBehavior.value = normalized.behavior;
  renderBossSpecialAttacks(normalized.specialAttacks);
  updateBossRoomControls();
}

function getEnemyGoalOptions() {
  const options = [{ value: "any_monster", label: "Any Monster" }];
  normalizeEnemyPoolRules(readEnemyPoolRules()).forEach((familyRule) => {
    familyRule.levels.forEach((level) => {
      options.push({
        value: `${familyRule.familyId}:lv${level.level}`,
        label: level.name,
      });
    });
  });
  return options;
}

function getItemGoalOptions(recipe = null) {
  const activeRecipe = recipe ?? game.recipe ?? {
    itemPoolRules: readItemPoolRules(),
    hungerEnabled: controls.hungerEnabled.checked,
  };
  return getSpawnableItemPoolRules(activeRecipe)
    .filter((rule) => rule.enabled && itemDefinitions[rule.itemId]?.kind !== "gold")
    .map((rule) => ({
      value: rule.itemId,
      label: itemDefinitions[rule.itemId]?.name ?? rule.itemId,
    }));
}

function normalizeCustomGoal(goal = {}) {
  const type = goal?.type === "escape"
    ? "escape"
    : goal?.type === "obtain"
      ? "obtain"
      : goal?.type === "gold"
        ? "gold"
        : "kill";
  const enemyOptions = getEnemyGoalOptions();
  const itemOptions = getItemGoalOptions();
  const fallbackTarget = type === "escape"
    ? "exit"
    : type === "kill"
      ? enemyOptions[0]?.value ?? "any_monster"
      : type === "gold"
        ? "gold"
        : itemOptions[0]?.value ?? "bitterGrass";
  const validTargets = new Set((type === "kill"
    ? enemyOptions
    : type === "obtain"
      ? itemOptions
      : [{ value: type === "gold" ? "gold" : "exit" }]).map((option) => option.value));
  return {
    type,
    count: type === "escape" ? 1 : Math.max(1, Number(goal?.count ?? (type === "kill" ? 8 : type === "gold" ? 300 : 3))),
    target: validTargets.has(goal?.target) ? goal.target : fallbackTarget,
    needExit: type === "escape" ? false : goal?.needExit === true,
  };
}

function renderGoalTargetOptions(type, selectedTarget = "") {
  controls.goalTarget.innerHTML = "";
  if (type === "escape") {
    controls.goalTarget.append(new Option("Final Exit", "exit"));
    controls.goalTarget.value = "exit";
    return;
  }
  if (type === "gold") {
    controls.goalTarget.append(new Option("Earned Gold", "gold"));
    controls.goalTarget.value = "gold";
    return;
  }
  const options = type === "kill" ? getEnemyGoalOptions() : getItemGoalOptions();
  options.forEach((option) => {
    controls.goalTarget.append(new Option(option.label, option.value));
  });
  const normalized = normalizeCustomGoal({ type, target: selectedTarget, count: controls.goalCount.value });
  controls.goalTarget.value = normalized.target;
}

function renderCustomGoalControls(goal = {}) {
  const normalized = normalizeCustomGoal(goal);
  const definition = goalTemplateDefinitions[normalized.type];
  controls.goalType.value = normalized.type;
  controls.goalCount.value = normalized.count;
  controls.goalNeedExit.checked = normalized.needExit;
  goalCountWrap.classList.toggle("hidden", normalized.type === "escape");
  goalTargetWrap.classList.toggle("hidden", normalized.type === "escape" || normalized.type === "gold");
  goalNeedExitWrap.classList.toggle("hidden", normalized.type === "escape");
  goalCountLabel.textContent = definition.countLabel;
  goalTargetLabel.textContent = definition.targetLabel;
  renderGoalTargetOptions(normalized.type, normalized.target);
}

function readCustomGoal() {
  return normalizeCustomGoal({
    type: controls.goalType.value,
    count: controls.goalCount.value,
    target: controls.goalTarget.value,
    needExit: controls.goalNeedExit.checked,
  });
}

function normalizeRunLogSettings(settings = {}) {
  return {
    showNumbers: settings.showNumbers !== false,
    highlightDamage: settings.highlightDamage !== false,
    highlightEnemies: settings.highlightEnemies !== false,
    showItemIcons: settings.showItemIcons !== false,
    showTurnDividers: settings.showTurnDividers !== false,
  };
}

function readRunLogSettings() {
  return normalizeRunLogSettings({
    showNumbers: controls.runLogShowNumbers.checked,
    highlightDamage: controls.runLogHighlightDamage.checked,
    highlightEnemies: controls.runLogHighlightEnemies.checked,
    showItemIcons: controls.runLogShowItemIcons.checked,
    showTurnDividers: controls.runLogShowTurnDividers.checked,
  });
}

function applyRunLogSettings(settings = {}) {
  const normalized = normalizeRunLogSettings(settings);
  controls.runLogShowNumbers.checked = normalized.showNumbers;
  controls.runLogHighlightDamage.checked = normalized.highlightDamage;
  controls.runLogHighlightEnemies.checked = normalized.highlightEnemies;
  controls.runLogShowItemIcons.checked = normalized.showItemIcons;
  controls.runLogShowTurnDividers.checked = normalized.showTurnDividers;
}

function normalizeStartingStats(recipe = {}) {
  const startingStats = recipe.startingStats ?? {};
  return {
    hp: Math.max(1, Number(startingStats.hp ?? 20)),
    attack: Number(startingStats.attack ?? 2),
    defense: Number(startingStats.defense ?? 0),
    accuracy: clampNumber(startingStats.accuracy ?? 100, 0, 100, 100),
    gold: Number(startingStats.gold ?? 0),
  };
}

function buildDefaultLevelThresholds() {
  return Array.from({ length: 99 }, (_, index) => {
    const level = index + 1;
    return {
      level,
      xp: level === 1 ? 0 : Math.round((level - 1) * (level - 1) * 6),
    };
  });
}

function normalizeLevelingSettings(recipe = {}) {
  const leveling = recipe.leveling ?? {};
  const fallbackThresholds = buildDefaultLevelThresholds();
  const thresholdByLevel = new Map((Array.isArray(leveling.thresholds) ? leveling.thresholds : []).map((entry) => [
    Number(entry?.level),
    Number(entry?.xp),
  ]));
  const statGrowth = leveling.statGrowth ?? {};
  return {
    enabled: leveling.enabled === true,
    thresholds: fallbackThresholds.map((entry) => ({
      level: entry.level,
      xp: entry.level === 1
        ? 0
        : Math.max(0, Number.isFinite(thresholdByLevel.get(entry.level)) ? thresholdByLevel.get(entry.level) : entry.xp),
    })),
    statGrowth: {
      hp: { enabled: Boolean(statGrowth.hp?.enabled), value: Number(statGrowth.hp?.value ?? 2) },
      attack: { enabled: Boolean(statGrowth.attack?.enabled), value: Number(statGrowth.attack?.value ?? 1) },
      defense: { enabled: Boolean(statGrowth.defense?.enabled), value: Number(statGrowth.defense?.value ?? 1) },
      accuracy: { enabled: Boolean(statGrowth.accuracy?.enabled), value: Number(statGrowth.accuracy?.value ?? 1) },
      hunger: { enabled: Boolean(statGrowth.hunger?.enabled), value: Number(statGrowth.hunger?.value ?? 5) },
      gold: { enabled: Boolean(statGrowth.gold?.enabled), value: Number(statGrowth.gold?.value ?? 0) },
    },
  };
}

function readLevelingSettings() {
  return normalizeLevelingSettings({
    leveling: {
      enabled: controls.levelingEnabled.checked,
      thresholds: Array.from(levelingTableBody.querySelectorAll("tr")).map((row) => ({
        level: Number(row.dataset.level),
        xp: Number(row.querySelector("input")?.value ?? 0),
      })),
      statGrowth: {
        hp: { enabled: controls.levelHpEnabled.checked, value: Number(controls.levelHpValue.value) },
        attack: { enabled: controls.levelAttackEnabled.checked, value: Number(controls.levelAttackValue.value) },
        defense: { enabled: controls.levelDefenseEnabled.checked, value: Number(controls.levelDefenseValue.value) },
        accuracy: { enabled: controls.levelAccuracyEnabled.checked, value: Number(controls.levelAccuracyValue.value) },
        hunger: { enabled: controls.levelHungerEnabled.checked, value: Number(controls.levelHungerValue.value) },
        gold: { enabled: controls.levelGoldEnabled.checked, value: Number(controls.levelGoldValue.value) },
      },
    },
  });
}

function renderLevelingTableRows(thresholds = buildDefaultLevelThresholds()) {
  levelingTableBody.innerHTML = "";
  thresholds.forEach((entry) => {
    const row = document.createElement("tr");
    row.dataset.level = String(entry.level);
    row.innerHTML = `
      <td>${entry.level}</td>
      <td><input type="number" min="0" step="1" value="${entry.xp}" /></td>
    `;
    levelingTableBody.append(row);
  });
}

function updateLevelingControls() {
  const enabled = controls.levelingEnabled.checked === true;
  levelingControls.classList.toggle("hidden", !enabled);
  [
    controls.levelHpEnabled,
    controls.levelAttackEnabled,
    controls.levelDefenseEnabled,
    controls.levelAccuracyEnabled,
    controls.levelHungerEnabled,
    controls.levelGoldEnabled,
  ].forEach((checkbox, index) => {
    const valueInput = [
      controls.levelHpValue,
      controls.levelAttackValue,
      controls.levelDefenseValue,
      controls.levelAccuracyValue,
      controls.levelHungerValue,
      controls.levelGoldValue,
    ][index];
    const isHungerGrowth = checkbox === controls.levelHungerEnabled;
    const hungerAvailable = controls.hungerEnabled.checked === true;
    const interactive = enabled && (!isHungerGrowth || hungerAvailable);
    checkbox.disabled = !interactive;
    valueInput.disabled = !interactive || !checkbox.checked;
    const row = checkbox.closest(".leveling-growth-row");
    row?.classList.toggle("disabled-growth", isHungerGrowth && !hungerAvailable);
  });
  levelingTableBody.querySelectorAll("input").forEach((input) => {
    input.disabled = !enabled;
  });
}

function applyLevelingSettings(settings = {}) {
  const normalized = normalizeLevelingSettings({ leveling: settings });
  controls.levelingEnabled.checked = normalized.enabled;
  renderLevelingTableRows(normalized.thresholds);
  controls.levelHpEnabled.checked = normalized.statGrowth.hp.enabled;
  controls.levelHpValue.value = normalized.statGrowth.hp.value;
  controls.levelAttackEnabled.checked = normalized.statGrowth.attack.enabled;
  controls.levelAttackValue.value = normalized.statGrowth.attack.value;
  controls.levelDefenseEnabled.checked = normalized.statGrowth.defense.enabled;
  controls.levelDefenseValue.value = normalized.statGrowth.defense.value;
  controls.levelAccuracyEnabled.checked = normalized.statGrowth.accuracy.enabled;
  controls.levelAccuracyValue.value = normalized.statGrowth.accuracy.value;
  controls.levelHungerEnabled.checked = normalized.statGrowth.hunger.enabled;
  controls.levelHungerValue.value = normalized.statGrowth.hunger.value;
  controls.levelGoldEnabled.checked = normalized.statGrowth.gold.enabled;
  controls.levelGoldValue.value = normalized.statGrowth.gold.value;
  updateLevelingControls();
}

function levelingEnabled(recipe = game.recipe) {
  return recipe?.leveling?.enabled === true;
}

function getLevelingThresholds(recipe = game.recipe) {
  return normalizeLevelingSettings({ leveling: recipe?.leveling }).thresholds;
}

function getXpNeededForLevel(level, recipe = game.recipe) {
  return getLevelingThresholds(recipe).find((entry) => entry.level === level)?.xp ?? 0;
}

function getNextLevelXp(level = game.level, recipe = game.recipe) {
  if (level >= 99) {
    return null;
  }
  return getXpNeededForLevel(level + 1, recipe);
}

function getLevelingGrowth(recipe = game.recipe) {
  return normalizeLevelingSettings({ leveling: recipe?.leveling }).statGrowth;
}

function applyLevelUpStatChanges(recipe = game.recipe) {
  const growth = getLevelingGrowth(recipe);
  const messages = [];
  if (growth.hp.enabled) {
    const amount = Number(growth.hp.value) || 0;
    game.levelBonuses.hp += amount;
    game.hp = Math.min(getPlayerMaxHp(), game.hp + amount);
    messages.push(`Max HP ${amount >= 0 ? "+" : ""}${amount}`);
  }
  if (growth.attack.enabled) {
    const amount = Number(growth.attack.value) || 0;
    game.levelBonuses.attack += amount;
    messages.push(`Attack ${amount >= 0 ? "+" : ""}${amount}`);
  }
  if (growth.defense.enabled) {
    const amount = Number(growth.defense.value) || 0;
    game.levelBonuses.defense += amount;
    messages.push(`Defense ${amount >= 0 ? "+" : ""}${amount}`);
  }
  if (growth.accuracy.enabled) {
    const amount = Number(growth.accuracy.value) || 0;
    game.levelBonuses.accuracy += amount;
    messages.push(`Accuracy ${amount >= 0 ? "+" : ""}${amount}`);
  }
  if (growth.hunger.enabled && game.recipe?.hungerEnabled === true) {
    const amount = Number(growth.hunger.value) || 0;
    game.levelBonuses.hunger += amount;
    game.hungerMax = Math.max(1, getPlayerMaxHunger());
    game.hunger = Math.min(game.hungerMax, game.hunger + amount);
    messages.push(`Max Hunger ${amount >= 0 ? "+" : ""}${amount}`);
  }
  if (growth.gold.enabled) {
    const amount = Number(growth.gold.value) || 0;
    game.gold += amount;
    if (amount > 0) {
      trackGoalGold(amount);
    }
    messages.push(`Gold ${amount >= 0 ? "+" : ""}${amount}`);
  }
  game.hp = Math.min(game.hp, getPlayerMaxHp());
  return messages;
}

function awardXp(amount, sourceName = "monster") {
  const xpAmount = Math.max(0, Number(amount) || 0);
  if (!levelingEnabled() || xpAmount <= 0 || game.ended) {
    return;
  }
  game.xp += xpAmount;
  trackRunStat("xpEarned", xpAmount);
  log(`You gain ${xpAmount} XP from the ${sourceName}.`);
  while (game.level < 99) {
    const nextLevelXp = getNextLevelXp(game.level);
    if (nextLevelXp === null || game.xp < nextLevelXp) {
      break;
    }
    game.level += 1;
    trackRunStat("levelsGained");
    const changes = applyLevelUpStatChanges();
    log(`Level up! You reached level ${game.level}${changes.length > 0 ? `: ${changes.join(", ")}.` : "."}`);
  }
  checkCustomGoalCompletion();
}

function reverseLevelUpStatChanges(recipe = game.recipe) {
  const growth = getLevelingGrowth(recipe);
  if (growth.hp.enabled) {
    const amount = Number(growth.hp.value) || 0;
    game.levelBonuses.hp -= amount;
  }
  if (growth.attack.enabled) {
    const amount = Number(growth.attack.value) || 0;
    game.levelBonuses.attack -= amount;
  }
  if (growth.defense.enabled) {
    const amount = Number(growth.defense.value) || 0;
    game.levelBonuses.defense -= amount;
  }
  if (growth.accuracy.enabled) {
    const amount = Number(growth.accuracy.value) || 0;
    game.levelBonuses.accuracy -= amount;
  }
  if (growth.hunger.enabled && game.recipe?.hungerEnabled === true) {
    const amount = Number(growth.hunger.value) || 0;
    game.levelBonuses.hunger -= amount;
    game.hungerMax = Math.max(1, getPlayerMaxHunger());
    game.hunger = Math.min(game.hunger, game.hungerMax);
  }
  if (growth.gold.enabled) {
    const amount = Number(growth.gold.value) || 0;
    game.gold -= amount;
  }
  game.hp = Math.min(game.hp, getPlayerMaxHp());
}

function clampXpToCurrentLevel(recipe = game.recipe) {
  const currentLevelFloorXp = getXpNeededForLevel(game.level, recipe);
  const nextLevelXp = getNextLevelXp(game.level, recipe);
  game.xp = Math.max(currentLevelFloorXp, game.xp);
  if (nextLevelXp !== null) {
    game.xp = Math.min(game.xp, Math.max(currentLevelFloorXp, nextLevelXp - 1));
  }
}

function adjustPlayerLevel(delta, sourceName = "effect", recipe = game.recipe) {
  if (!levelingEnabled()) {
    log(`${sourceName} fizzles because leveling is disabled.`);
    return 0;
  }
  let changed = 0;
  if (delta > 0) {
    while (changed < delta && game.level < 99) {
      game.level += 1;
      trackRunStat("levelsGained");
      const changes = applyLevelUpStatChanges(recipe);
      log(`${sourceName} raises you to level ${game.level}${changes.length > 0 ? `: ${changes.join(", ")}.` : "."}`);
      changed += 1;
    }
  } else if (delta < 0) {
    while (changed > delta && game.level > 1) {
      reverseLevelUpStatChanges(recipe);
      game.level -= 1;
      log(`${sourceName} lowers you to level ${game.level}.`);
      changed -= 1;
    }
  }
  clampXpToCurrentLevel(recipe);
  return changed;
}

function readStartingStats() {
  return normalizeStartingStats({
    startingStats: {
      hp: controls.startHp.value,
      attack: controls.startAttack.value,
      defense: controls.startDefense.value,
      accuracy: controls.startAccuracy.value,
      gold: controls.startGold.value,
    },
  });
}

function normalizePassiveHealBlockRules(recipe = {}) {
  const rules = recipe.passiveHealBlockRules ?? {};
  return {
    itemAction: Boolean(rules.itemAction),
    attackDamage: Boolean(rules.attackDamage ?? recipe.hungerNoHealAfterAttack),
    pickupExchange: Boolean(rules.pickupExchange),
  };
}

function readPassiveHealBlockRules() {
  return normalizePassiveHealBlockRules({
    passiveHealBlockRules: {
      itemAction: controls.hungerNoHealItemAction.checked,
      attackDamage: controls.hungerNoHealAttackDamage.checked,
      pickupExchange: controls.hungerNoHealPickupExchange.checked,
    },
  });
}

function applyPassiveHealBlockRules(rules = {}) {
  const normalized = normalizePassiveHealBlockRules({ passiveHealBlockRules: rules });
  controls.hungerNoHealItemAction.checked = normalized.itemAction;
  controls.hungerNoHealAttackDamage.checked = normalized.attackDamage;
  controls.hungerNoHealPickupExchange.checked = normalized.pickupExchange;
}

function blockPassiveHealThisTurn(shouldBlock) {
  if (shouldBlock) {
    game.passiveHealBlockedThisTurn = true;
  }
}

function updateUnidentifiedControls() {
  const enabled = controls.unidentifiedEnabled.checked === true;
  controls.deductionMode.disabled = !enabled;
  unidentifiedControls.classList.toggle("hidden", !enabled);
}

function unidentifiedItemsEnabled(recipe = game.recipe) {
  return recipe?.unidentifiedItemsEnabled === true;
}

function deductionModeEnabled(recipe = game.recipe) {
  return unidentifiedItemsEnabled(recipe) && recipe?.deductionMode === true;
}

function isBlessableItem(entry, recipe = game.recipe) {
  const item = typeof entry === "string"
    ? itemDefinitions[entry] ?? getItemDefinition(entry)
    : (entry?.kind ? entry : getItemDefinition(entry));
  return Boolean(item && ["grass", "food", "scroll", "utility"].includes(item.kind));
}

function isBlessingVisible(entry) {
  return Boolean(entry?.blessed && !entry?.cursed && isBlessableItem(entry));
}

function isEligibleForIdentification(entry, recipe = game.recipe) {
  const item = itemDefinitions[getItemId(entry)];
  return Boolean(item && item.kind !== "gold");
}

function isItemIdentified(entry, recipe = game.recipe) {
  if (!unidentifiedItemsEnabled(recipe) || !isEligibleForIdentification(entry, recipe)) {
    return true;
  }
  if (isBlessingVisible(entry)) {
    return true;
  }
  const itemId = getItemId(entry);
  return game.identifiedItemIds.has(itemId) || entry?.identified === true;
}

function randomUnknownItemName() {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    const length = 2 + Math.floor(Math.random() * 2);
    let word = "";
    for (let index = 0; index < length; index += 1) {
      word += unknownItemNameSyllables[Math.floor(Math.random() * unknownItemNameSyllables.length)] ?? "na";
    }
    const candidate = `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`;
    if (!game.usedUnknownItemNames.has(candidate)) {
      game.usedUnknownItemNames.add(candidate);
      return candidate;
    }
  }
  const fallback = `Unknown${game.usedUnknownItemNames.size + 1}`;
  game.usedUnknownItemNames.add(fallback);
  return fallback;
}

function getItemCategoryId(itemId) {
  const item = itemDefinitions[itemId];
  if (!item) {
    return "";
  }
  return itemCategories.find((category) => category.filter(item))?.id ?? "";
}

function generateDeductionOptions(itemId) {
  const categoryId = getItemCategoryId(itemId);
  const candidates = Object.keys(itemDefinitions).filter((candidateId) => (
    candidateId !== "goldBundle" && getItemCategoryId(candidateId) === categoryId
  ));
  if (candidates.length <= 3) {
    return candidates;
  }
  const pool = candidates.filter((candidateId) => candidateId !== itemId);
  for (let index = pool.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [pool[index], pool[swapIndex]] = [pool[swapIndex], pool[index]];
  }
  return [itemId, ...pool.slice(0, 2)];
}

function initializeItemKnowledge(entry, recipe = game.recipe) {
  if (!entry || typeof entry !== "object" || !isEligibleForIdentification(entry, recipe)) {
    return entry;
  }
  if (!unidentifiedItemsEnabled(recipe) || game.identifiedItemIds.has(entry.itemId) || isBlessingVisible(entry)) {
    entry.identified = true;
    delete entry.unknownName;
    delete entry.deductionOptions;
    return entry;
  }
  entry.identified = Boolean(entry.identified);
  if (!entry.identified) {
    entry.unknownName = entry.unknownName || randomUnknownItemName();
    if (deductionModeEnabled(recipe)) {
      entry.deductionOptions = Array.isArray(entry.deductionOptions) && entry.deductionOptions.length > 0
        ? entry.deductionOptions
        : generateDeductionOptions(entry.itemId);
    } else {
      delete entry.deductionOptions;
    }
  }
  return entry;
}

function getAllLiveItemEntries() {
  return [
    ...game.inventory,
    ...game.inventory.flatMap((entry) => Array.isArray(entry?.storedItems) ? entry.storedItems : []),
    ...Object.values(game.equipment).filter(Boolean),
    ...game.items,
    ...game.items.flatMap((entry) => Array.isArray(entry?.storedItems) ? entry.storedItems : []),
    ...(game.pendingCast ? [game.pendingCast] : []),
  ];
}

function identifyItemType(itemId) {
  if (!itemId) {
    return;
  }
  game.identifiedItemIds.add(itemId);
  getAllLiveItemEntries().forEach((entry) => {
    if (entry?.itemId === itemId) {
      entry.identified = true;
      delete entry.unknownName;
      delete entry.deductionOptions;
    }
  });
}

function refreshLiveItemKnowledge() {
  if (!game.recipe) {
    return;
  }
  if (!unidentifiedItemsEnabled()) {
    getAllLiveItemEntries().forEach((entry) => {
      if (entry && typeof entry === "object") {
        entry.identified = true;
        delete entry.unknownName;
        delete entry.deductionOptions;
      }
    });
    return;
  }
  getAllLiveItemEntries().forEach((entry) => {
    initializeItemKnowledge(entry, game.recipe);
  });
}

function identifyIfPossible(entry) {
  if (!entry || !isEligibleForIdentification(entry) || isItemIdentified(entry) || entry.cursed) {
    return false;
  }
  identifyItemType(entry.itemId);
  return true;
}

function identifyAfterSuccessfulUse(entry) {
  if (!entry || entry.cursed) {
    return false;
  }
  if (!isEligibleForIdentification(entry) || isItemIdentified(entry)) {
    return false;
  }
  identifyItemType(entry.itemId);
  return true;
}

function getBaseVisibleItemName(entry, recipe = game.recipe) {
  if (!entry) {
    return "Unknown item";
  }
  const item = getItemDefinition(entry);
  if (!item) {
    return "Unknown item";
  }
  return isItemIdentified(entry, recipe) ? item.name : entry.unknownName || "Unknown item";
}

function getVisibleItemName(entry, recipe = game.recipe) {
  if (!entry) {
    return "Unknown item";
  }
  if (typeof entry === "object" && entry?.customName?.trim()) {
    return entry.customName.trim();
  }
  return getBaseVisibleItemName(entry, recipe);
}

function appendItemStatusIcons(element, entry) {
  if (entry?.curseRevealed) {
    const skull = document.createElement("span");
    skull.className = "curse-skull";
    skull.textContent = " \u2620";
    element.append(skull);
  }
  if (isBlessingVisible(entry)) {
    const bell = document.createElement("span");
    bell.className = "bless-bell";
    bell.textContent = " \u{1F514}";
    element.append(bell);
  }
}

function getVisibleItemDescription(entry, recipe = game.recipe) {
  if (!entry) {
    return "Unknown info.";
  }
  if (!isItemIdentified(entry, recipe)) {
    return "Unknown info.";
  }
  const item = getItemWithInstance(entry);
  return describeItem(item);
}

function logDeductionHint(entry) {
  if (!deductionModeEnabled() || isItemIdentified(entry) || !Array.isArray(entry?.deductionOptions) || entry.deductionOptions.length === 0) {
    return;
  }
  const names = entry.deductionOptions
    .map((itemId) => itemDefinitions[itemId]?.name)
    .filter(Boolean);
  if (names.length > 0) {
    log(`Deduction mode: ${getVisibleItemName(entry)} could be ${names.join(", ")}.`);
  }
}

function applyStartingStats(stats = {}) {
  const normalized = normalizeStartingStats({ startingStats: stats });
  controls.startHp.value = normalized.hp;
  controls.startAttack.value = normalized.attack;
  controls.startDefense.value = normalized.defense;
  controls.startAccuracy.value = normalized.accuracy;
  controls.startGold.value = normalized.gold;
}

function describeGoalTarget(goal) {
  const normalized = normalizeCustomGoal(goal);
  if (normalized.type === "escape") {
    return "the final exit";
  }
  if (normalized.type === "gold") {
    return "gold";
  }
  if (normalized.type === "kill") {
    if (normalized.target === "any_monster") {
      return "monster";
    }
    return getEnemyGoalOptions().find((option) => option.value === normalized.target)?.label ?? "monster";
  }
  return itemDefinitions[normalized.target]?.name ?? "item";
}

function getGoalProgress(goal = game.recipe?.customGoal) {
  const normalized = normalizeCustomGoal(goal);
  if (!game.runStats) {
    return 0;
  }
  if (normalized.type === "escape") {
    return game.floor >= (game.recipe?.floors ?? 1) ? 1 : 0;
  }
  if (normalized.type === "kill") {
    if (normalized.target === "any_monster") {
      return game.runStats.monstersDefeated ?? 0;
    }
    return game.runStats.killCounts?.[normalized.target] ?? 0;
  }
  if (normalized.type === "gold") {
    return Number(game.recipe?.startingStats?.gold ?? 0) + (game.runStats.goldCollected ?? 0);
  }
  return game.runStats.obtainCounts?.[normalized.target] ?? 0;
}

function getGoalSummary(goal = game.recipe?.customGoal) {
  const normalized = normalizeCustomGoal(goal);
  if (normalized.type === "escape") {
    return "Escape the dungeon through the final exit.";
  }
  const progress = getGoalProgress(normalized);
  const targetLabel = describeGoalTarget(normalized);
  const baseSummary = normalized.type === "kill"
    ? `Kill ${progress} / ${normalized.count} ${targetLabel}${normalized.target === "any_monster" ? "s" : ""}.`
    : normalized.type === "gold"
      ? `Earn ${progress} / ${normalized.count} gold.`
      : `Obtain ${progress} / ${normalized.count} ${targetLabel}${normalized.count === 1 ? "" : "s"}.`;
  if (!normalized.needExit) {
    return baseSummary;
  }
  if (game.goalSatisfied) {
    return `${baseSummary} Goal complete. Reach the final exit.`;
  }
  return `${baseSummary} Then reach the final exit.`;
}

function trackGoalKill(monster) {
  if (!game.runStats || !monster) {
    return;
  }
  game.runStats.killCounts[monster.id] = (game.runStats.killCounts[monster.id] || 0) + 1;
}

function trackGoalObtain(itemId) {
  if (!game.runStats || !itemId) {
    return;
  }
  game.runStats.obtainCounts[itemId] = (game.runStats.obtainCounts[itemId] || 0) + 1;
}

function trackGoalGold(amount) {
  if (!game.runStats) {
    return;
  }
  trackRunStat("goldCollected", Math.max(0, Number(amount) || 0));
}

function checkCustomGoalCompletion() {
  if (!game.recipe || game.ended) {
    return false;
  }
  const goal = normalizeCustomGoal(game.recipe.customGoal);
  if (goal.type === "escape") {
    return false;
  }
  const progress = getGoalProgress(goal);
  if (progress < goal.count) {
    return false;
  }
  if (goal.needExit) {
    if (!game.goalSatisfied) {
      game.goalSatisfied = true;
      log(`Goal complete. Reach the final floor exit to clear "${game.recipe.name}".`);
      render();
    }
    return true;
  }
  endRun("clear");
  log(`Goal complete: ${getGoalSummary(goal)}`);
  return true;
}

function readRecipe() {
  const customEnvironmentLibrary = readCustomEnvironmentLibrary();
  const environmentStages = readEnvironmentStageRules();
  const baseEnvironmentKey = environmentStages[0]?.environmentKey ?? "ruins";
  return {
    name: controls.dungeonName.value.trim() || "Unnamed Dungeon",
    description: controls.dungeonDescription.value.trim().slice(0, 240),
    floors: numberValue("floors"),
    roomCount: numberValue("roomCount"),
    monsterRate: numberValue("monsterRate"),
    monsterRespawnRate: numberValue("monsterRespawnRate"),
    difficulty: numberValue("difficulty"),
    itemRate: numberValue("itemRate"),
    rareRate: numberValue("rareRate"),
    curseRate: numberValue("curseRate"),
    blessedRate: numberValue("blessedRate"),
    trapRate: numberValue("trapRate"),
    sigilRate: numberValue("sigilRate"),
    goldRate: numberValue("goldRate"),
    inventoryLimit: numberValue("inventoryLimit"),
    monsterLimit: numberValue("monsterLimit"),
    hungerEnabled: controls.hungerEnabled.checked,
    hungerDrainRate: numberValue("hungerDrainRate"),
    clearBuffsOnFloorChange: controls.clearBuffsOnFloorChange.checked,
    passiveHealBlockRules: readPassiveHealBlockRules(),
    unidentifiedItemsEnabled: controls.unidentifiedEnabled.checked,
    deductionMode: controls.deductionMode.checked,
    weaponRarityEnabled: controls.weaponRarityEnabled.checked,
    rarityRules: readRarityRules(),
    equippedCountsTowardLimit: controls.equippedCountsTowardLimit.checked,
    hideGridlines: controls.hideGridlines.checked,
    cameraMode: controls.cameraMode.value,
    environment: isCustomEnvironmentKey(baseEnvironmentKey) ? "custom" : baseEnvironmentKey,
    environmentStages,
    customEnvironmentLibrary,
    customEnvironment: customEnvironmentLibrary[0] ?? normalizeCustomEnvironment({}),
    startingStats: readStartingStats(),
    leveling: readLevelingSettings(),
    customGoal: readCustomGoal(),
    runLogSettings: readRunLogSettings(),
    environmentalEffects: readEnvironmentalEffects(),
    specialRooms: readSpecialRooms(),
    itemPoolRules: readItemPoolRules(),
    runePoolRules: readRunePoolRules(),
    specialAttackRules: readSpecialAttackRules(),
    trapsVisible: trapsStartVisible(),
    sigilsVisible: sigilsStartVisible(),
    trapPoolRules: readTrapPoolRules(),
    sigilPoolRules: readSigilPoolRules(),
    enemyPoolRules: readEnemyPoolRules(),
    enemyTypeRules: readEnemyTypeRules(),
    enemyDrops: readEnemyDropSettings(),
    bossRoom: readBossRoomSettings(),
    soundPackMode: getSoundPackMode(),
    soundEffectRules: readSoundEffectRules(),
    startingEquipment: readStartingEquipment(),
    startingInventory: readStartingInventory(),
    seed: hashString(`${controls.dungeonName.value}-${Date.now()}`),
  };
}

function applyRecipe(recipe) {
  recipe = normalizeRecipeData(recipe);
  controls.dungeonName.value = recipe.name;
  controls.dungeonDescription.value = recipe.description ?? "";
  controls.floors.value = recipe.floors;
  controls.roomCount.value = recipe.roomCount ?? 7;
  controls.monsterRate.value = recipe.monsterRate;
  controls.monsterRespawnRate.value = recipe.monsterRespawnRate ?? 3;
  controls.difficulty.value = recipe.difficulty ?? 3;
  controls.itemRate.value = recipe.itemRate;
  controls.rareRate.value = recipe.rareRate;
  controls.curseRate.value = recipe.curseRate ?? 15;
  controls.blessedRate.value = recipe.blessedRate ?? 12;
  controls.trapRate.value = recipe.trapRate;
  controls.sigilRate.value = recipe.sigilRate ?? 2;
  controls.goldRate.value = recipe.goldRate ?? 20;
  controls.inventoryLimit.value = recipe.inventoryLimit ?? 12;
  controls.monsterLimit.value = recipe.monsterLimit ?? 12;
  controls.hungerEnabled.checked = recipe.hungerEnabled ?? false;
  controls.hungerDrainRate.value = recipe.hungerDrainRate ?? 5;
  controls.clearBuffsOnFloorChange.checked = recipe.clearBuffsOnFloorChange === true;
  applyPassiveHealBlockRules(recipe.passiveHealBlockRules ?? {
    attackDamage: recipe.hungerNoHealAfterAttack ?? false,
  });
  controls.unidentifiedEnabled.checked = recipe.unidentifiedItemsEnabled ?? false;
  controls.deductionMode.checked = recipe.deductionMode ?? false;
  controls.weaponRarityEnabled.checked = recipe.weaponRarityEnabled ?? true;
  applyRarityRules(recipe.rarityRules);
  refreshRarityEditorState();
  controls.equippedCountsTowardLimit.checked = recipe.equippedCountsTowardLimit ?? false;
  controls.hideGridlines.checked = recipe.hideGridlines ?? false;
  controls.cameraMode.value = recipe.cameraMode ?? "center";
  controls.environment.value = recipe.environment;
  applyCustomEnvironmentLibrary(recipe.customEnvironmentLibrary);
  applyEnvironmentStageRules(recipe.environmentStages, recipe);
  applyStartingStats(recipe.startingStats);
  applyLevelingSettings(recipe.leveling);
  applyCustomGoal(recipe.customGoal);
  applyRunLogSettings(recipe.runLogSettings);
  applyEnvironmentalEffects(recipe.environmentalEffects);
  applySpecialRooms(recipe.specialRooms);
  if (trapsVisibleEnabled) {
    trapsVisibleEnabled.checked = recipe.trapsVisible === true;
  }
  if (sigilsVisibleEnabled) {
    sigilsVisibleEnabled.checked = recipe.sigilsVisible === true;
  }
  applyRunePoolRules(recipe.runePoolRules);
  applySpecialAttackRules(recipe.specialAttackRules);
  applyItemPoolRules(recipe.itemPoolRules);
  applyTrapPoolRules(recipe.trapPoolRules);
  applySigilPoolRules(recipe.sigilPoolRules);
  applyEnemyPoolRules(recipe.enemyPoolRules);
  applyEnemyTypeRules(recipe.enemyTypeRules);
  applyEnemyDropSettings(recipe.enemyDrops);
  applyBossRoomSettings(recipe.bossRoom);
  if (controls.soundPackMode) {
    controls.soundPackMode.value = normalizeSoundPackMode(recipe.soundPackMode);
  }
  applySoundEffectRules(recipe.soundEffectRules);
  renderStartingEquipmentControls(normalizeStartingEquipment(recipe));
  renderStartingInventoryControls(normalizeStartingInventory(recipe));
  updateHungerControls();
  updateUnidentifiedControls();
  updateOutputs();
}

function applyCustomGoal(goal = {}) {
  renderCustomGoalControls(goal);
}

function encodeRecipe(recipe) {
  return btoa(JSON.stringify(sanitizeRecipeForShare(recipe)));
}

function decodeRecipe(code) {
  return normalizeRecipeData(JSON.parse(atob(code.trim())));
}

function buildRecipePackage(recipe) {
  const normalizedRecipe = normalizeRecipeData(recipe);
  return {
    format: "mystery-dungeon-maker-package",
    version: 1,
    exportedAt: new Date().toISOString(),
    metadata: getRecipePackageMetadata(normalizedRecipe),
    recipe: JSON.parse(JSON.stringify(normalizedRecipe)),
  };
}

function sanitizeFileName(value) {
  return String(value ?? "mystery-dungeon")
    .trim()
    .replace(/[<>:"/\\|?*\u0000-\u001F]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 60)
    || "mystery-dungeon";
}

function downloadTextFile(filename, text, mimeType = "application/json") {
  const blob = new Blob([text], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

async function exportFullRecipePackage() {
  const recipe = normalizeRecipeData(readRecipe());
  const packageData = buildRecipePackage(recipe);
  const payload = JSON.stringify(packageData, null, 2);
  const filename = `${sanitizeFileName(recipe.name)}.mdmpkg`;
  downloadTextFile(filename, payload, "application/json");
  const extras = [
    packageData.metadata.includesCustomEnvironmentArt ? "custom environment art" : "",
    packageData.metadata.includesCustomSounds ? `${packageData.metadata.customSoundCount} custom sound effect${packageData.metadata.customSoundCount === 1 ? "" : "s"}` : "",
  ].filter(Boolean);
  log(`Exported full package for "${recipe.name}"${extras.length ? ` with ${extras.join(" and ")}.` : "."}`);
}

function normalizeImportedPackage(payload) {
  if (payload?.format === "mystery-dungeon-maker-package" && payload?.recipe) {
    return normalizeRecipeData(payload.recipe);
  }
  if (payload?.name && payload?.environment) {
    return normalizeRecipeData(payload);
  }
  throw new Error("Invalid package format");
}

async function importFullRecipePackage(file) {
  if (!file) {
    return;
  }
  const text = await file.text();
  const payload = JSON.parse(text);
  const recipe = normalizeImportedPackage(payload);
  applyRecipe(recipe);
  startRun(readRecipe());
  const metadata = payload?.metadata ?? getRecipePackageMetadata(recipe);
  const extras = [
    metadata.includesCustomEnvironmentArt ? "custom environment art" : "",
    metadata.includesCustomSounds ? `${metadata.customSoundCount || 0} custom sound effect${metadata.customSoundCount === 1 ? "" : "s"}` : "",
  ].filter(Boolean);
  log(`Imported full package for "${recipe.name ?? "custom dungeon"}"${extras.length ? ` with ${extras.join(" and ")}.` : "."}`);
}

function updateOutputs() {
  Object.keys(outputs).forEach((key) => {
    if (key === "goldRate") {
      const label = `${getGoldBundleTarget(controls[key].value)}`;
      outputs[key].value = label;
      outputs[key].textContent = label;
      return;
    }
    outputs[key].value = controls[key].value;
    outputs[key].textContent = controls[key].value;
  });
}

function updateHungerControls() {
  const hungerEnabled = controls.hungerEnabled.checked === true;
  controls.hungerDrainRate.disabled = !hungerEnabled;
  controls.hungerNoHealItemAction.disabled = !hungerEnabled;
  controls.hungerNoHealAttackDamage.disabled = !hungerEnabled;
  controls.hungerNoHealPickupExchange.disabled = !hungerEnabled;
  hungerControls.classList.toggle("hidden", !hungerEnabled);
  updateFoodPoolState();
}

function setRecipeCollapsed(nextValue) {
  if (nextValue) {
    setRecipeExtended(false);
  }
  appShell.classList.toggle("recipe-collapsed", nextValue);
  showRecipeButton.classList.toggle("hidden", !nextValue);
}

function setRecipeExtended(nextValue) {
  if (nextValue) {
    setRecipeCollapsed(false);
  }
  appShell.classList.toggle("recipe-extended", nextValue);
  showGameButton.classList.toggle("hidden", !nextValue);
  extendRecipeButton.textContent = nextValue ? "Normal Size" : "Extend Recipe";
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function splitTextSegments(segments, regex, createSegment) {
  return segments.flatMap((segment) => {
    if (segment.type !== "text" || !segment.text) {
      return [segment];
    }
    const parts = [];
    let lastIndex = 0;
    const flags = regex.flags.includes("g") ? regex.flags : `${regex.flags}g`;
    const matcher = new RegExp(regex.source, flags);
    let match = matcher.exec(segment.text);
    while (match) {
      if (match.index > lastIndex) {
        parts.push({ type: "text", text: segment.text.slice(lastIndex, match.index) });
      }
      parts.push(createSegment(match));
      lastIndex = match.index + match[0].length;
      match = matcher.exec(segment.text);
    }
    if (lastIndex < segment.text.length) {
      parts.push({ type: "text", text: segment.text.slice(lastIndex) });
    }
    return parts;
  });
}

function getRunLogItemMentions() {
  const defaultItemLogColor = "#f4efe1";
  const mentions = new Map();
  Object.values(itemDefinitions).forEach((definition) => {
    if (!definition?.name) {
      return;
    }
    mentions.set(definition.name, {
      icon: getItemIcon(definition),
      color: definition.kind === "hand" && definition.rarity && definition.rarity !== "common"
        ? getRarityRule(definition.rarity)?.color ?? defaultItemLogColor
        : defaultItemLogColor,
    });
  });
  const liveEntries = [
    ...game.inventory,
    ...game.items,
    ...Object.values(game.equipment ?? {}).filter(Boolean),
  ];
  liveEntries.forEach((entry) => {
    const item = getItemWithInstance(entry);
    const visibleName = getVisibleItemName(entry);
    if (item && visibleName) {
      const rarityColor = item.kind === "hand" && item.rarity && item.rarity !== "common"
        ? getRarityRule(item.rarity)?.color ?? defaultItemLogColor
        : defaultItemLogColor;
      mentions.set(visibleName, {
        icon: getItemIcon(item),
        color: rarityColor,
      });
    }
  });
  return Array.from(mentions.entries())
    .map(([name, data]) => ({
      name,
      icon: data.icon,
      color: data.color ?? defaultItemLogColor,
    }))
    .sort((a, b) => b.name.length - a.name.length);
}

function getRunLogEnemyNames() {
  const names = new Set();
  normalizeEnemyPoolRules(game.recipe?.enemyPoolRules).forEach((family) => {
    family.levels.forEach((level) => names.add(level.name));
  });
  game.monsters.forEach((monster) => names.add(monster.name));
  if (game.boss?.name) {
    names.add(game.boss.name);
  }
  return Array.from(names).filter(Boolean).sort((a, b) => b.length - a.length);
}

function formatRunLogSegments(message, settings = normalizeRunLogSettings(game.recipe?.runLogSettings)) {
  let segments = [{ type: "text", text: String(message ?? "") }];
  if (settings.showItemIcons) {
    getRunLogItemMentions().forEach(({ name, icon, color }) => {
      const regex = new RegExp(escapeRegExp(name), "g");
      segments = splitTextSegments(segments, regex, () => ({ type: "item", text: name, icon, color }));
    });
  }
  if (settings.highlightEnemies) {
    getRunLogEnemyNames().forEach((name) => {
      const regex = new RegExp(escapeRegExp(name), "g");
      segments = splitTextSegments(segments, regex, () => ({ type: "enemy", text: name }));
    });
  }
  if (settings.highlightDamage) {
    segments = splitTextSegments(segments, /-?\d+(?= damage\b)/g, (match) => ({ type: "damage", text: match[0] }));
  }
  return segments;
}

function buildRunLogMessageFragment(message, settings = normalizeRunLogSettings(game.recipe?.runLogSettings)) {
  const fragment = document.createDocumentFragment();
  formatRunLogSegments(message, settings).forEach((segment) => {
    if (segment.type === "item") {
      const wrapper = document.createElement("span");
      wrapper.className = "run-log-item";
      const icon = document.createElement("span");
      icon.className = "run-log-item-icon";
      icon.textContent = segment.icon;
      const text = document.createElement("span");
      text.textContent = segment.text;
      if (segment.color) {
        text.style.color = segment.color;
      }
      wrapper.append(icon, text);
      fragment.append(wrapper);
      return;
    }
    const span = document.createElement("span");
    span.textContent = segment.text;
    if (segment.type === "enemy") {
      span.className = "run-log-enemy";
    }
    if (segment.type === "damage") {
      span.className = "run-log-damage";
    }
    fragment.append(span);
  });
  return fragment;
}

function rerenderRunLogList() {
  const settings = normalizeRunLogSettings(game.recipe?.runLogSettings);
  const items = Array.from(logList.children);
  const totalLogs = items.filter((item) => item.dataset.divider !== "true").length;
  let seenLogs = 0;
  items.forEach((item) => {
    const message = item.dataset.message ?? item.textContent ?? "";
    const variant = item.dataset.variant ?? "";
    const isDivider = item.dataset.divider === "true";
    item.innerHTML = "";
    item.classList.toggle("hidden", isDivider && !settings.showTurnDividers);
    if (!isDivider && settings.showNumbers) {
      const number = document.createElement("span");
      number.className = "run-log-number";
      number.textContent = `${totalLogs - seenLogs}.`;
      item.append(number, " ");
    }
    if (isDivider) {
      const divider = document.createElement("span");
      divider.className = "run-log-divider-label";
      divider.textContent = message;
      item.append(divider);
      item.className = "run-log-divider";
    } else {
      item.append(buildRunLogMessageFragment(message, settings));
      item.className = variant ? `log-${variant}` : "";
      seenLogs += 1;
    }
  });
  game.logSequence = totalLogs;
}

function log(message, variant = "") {
  const settings = normalizeRunLogSettings(game.recipe?.runLogSettings);
  const turnMarker = getRunLogTurnMarker();
  if (
    settings.showTurnDividers
    && turnMarker !== null
    && turnMarker !== game.lastRunLogDividerTurn
  ) {
    logTurnDivider(turnMarker);
    game.lastRunLogDividerTurn = turnMarker;
  }
  const item = document.createElement("li");
  item.dataset.message = String(message ?? "");
  item.dataset.variant = variant;
  game.logEventCounter = (game.logEventCounter ?? 0) + 1;
  item.dataset.eventId = String(game.logEventCounter);
  item.append(buildRunLogMessageFragment(message, settings));
  if (settings.showNumbers) {
    const number = document.createElement("span");
    number.className = "run-log-number";
    number.textContent = `${(game.logSequence ?? 0) + 1}.`;
    game.logSequence = (game.logSequence ?? 0) + 1;
    item.prepend(number, " ");
  }
  if (variant) {
    item.className = `log-${variant}`;
  }
  logList.prepend(item);
  while (logList.children.length > 12) {
    logList.lastElementChild.remove();
  }
  rerenderRunLogList();
  logList.parentElement?.scrollTo({ top: 0 });
}

function logTurnDivider(turnNumber) {
  const item = document.createElement("li");
  item.dataset.message = `Turn ${turnNumber}`;
  item.dataset.variant = "";
  item.dataset.divider = "true";
  logList.prepend(item);
  while (logList.children.length > 12) {
    logList.lastElementChild.remove();
  }
}

function makeRunStats() {
  return {
    turns: 0,
    itemsPickedUp: 0,
    itemsUsed: 0,
    itemsDropped: 0,
    monstersDefeated: 0,
    attacksMade: 0,
    damageDealt: 0,
    damageTaken: 0,
    healingRecovered: 0,
    trapsTriggered: 0,
    staffCasts: 0,
    buffsApplied: 0,
    goldCollected: 0,
    xpEarned: 0,
    levelsGained: 0,
    floorsCleared: 0,
    deepestFloor: 1,
    killCounts: {},
    obtainCounts: {},
  };
}

function trackRunStat(key, amount = 1) {
  if (!game.runStats) {
    return;
  }
  game.runStats[key] = (game.runStats[key] || 0) + amount;
}

function updateDeepestFloorStat() {
  if (!game.runStats) {
    return;
  }
  game.runStats.deepestFloor = Math.max(game.runStats.deepestFloor || 1, game.floor);
}

function buildRunSummary(result) {
  const title = result === "clear" ? "You Won" : "You Died";
  const subtitle = result === "clear"
    ? `You cleared ${game.recipe?.name ?? "the dungeon"}.`
    : `Your run in ${game.recipe?.name ?? "the dungeon"} has ended.`;
  const stats = [
    { label: "Dungeon", value: game.recipe?.name ?? "Unknown" },
    { label: "Result", value: result === "clear" ? "Cleared" : "Defeated" },
    { label: "Goal", value: getGoalSummary(game.recipe?.customGoal) },
    { label: "Turns", value: game.runStats?.turns ?? 0 },
    { label: "Deepest Floor", value: `${game.runStats?.deepestFloor ?? game.floor} / ${game.recipe?.floors ?? game.floor}` },
    { label: "Floors Cleared", value: game.runStats?.floorsCleared ?? 0 },
    { label: "Monsters Defeated", value: game.runStats?.monstersDefeated ?? 0 },
    { label: "Attacks Made", value: game.runStats?.attacksMade ?? 0 },
    { label: "Damage Dealt", value: game.runStats?.damageDealt ?? 0 },
    { label: "Damage Taken", value: game.runStats?.damageTaken ?? 0 },
    { label: "Healing Recovered", value: game.runStats?.healingRecovered ?? 0 },
    { label: "Items Picked Up", value: game.runStats?.itemsPickedUp ?? 0 },
    { label: "Items Used", value: game.runStats?.itemsUsed ?? 0 },
    { label: "Items Dropped", value: game.runStats?.itemsDropped ?? 0 },
    { label: "Staff Casts", value: game.runStats?.staffCasts ?? 0 },
    { label: "Buffs Applied", value: game.runStats?.buffsApplied ?? 0 },
    { label: "Traps Triggered", value: game.runStats?.trapsTriggered ?? 0 },
    { label: "Gold Collected", value: game.runStats?.goldCollected ?? 0 },
    { label: "Gold On Hand", value: game.gold ?? 0 },
    { label: "Level Reached", value: game.level ?? 1 },
    { label: "XP Earned", value: game.runStats?.xpEarned ?? 0 },
    { label: "Levels Gained", value: game.runStats?.levelsGained ?? 0 },
  ];
  return { title, subtitle, stats };
}

function renderEndScreen() {
  const summary = game.lastRunSummary;
  endScreen.classList.toggle("hidden", !summary);
  if (!summary) {
    return;
  }
  endScreenTitle.textContent = summary.title;
  endScreenSubtitle.textContent = summary.subtitle;
  endScreenStats.innerHTML = "";
  summary.stats.forEach((stat) => {
    const row = document.createElement("div");
    row.className = "end-screen-stat";
    row.innerHTML = `<span>${escapeHtml(stat.label)}</span><strong>${escapeHtml(String(stat.value))}</strong>`;
    endScreenStats.append(row);
  });
}

function clonePublishedDungeons(dungeons) {
  return JSON.parse(JSON.stringify(Array.isArray(dungeons) ? dungeons : []));
}

function removeLegacyDefaultPublishedDungeons(dungeons) {
  return clonePublishedDungeons(dungeons).filter((dungeon) => !(
    dungeon?.name === "Candlebone Depths"
    && dungeon?.author === "Local Player"
    && Number(dungeon?.plays ?? 0) === 0
    && Number(dungeon?.clears ?? 0) === 0
  ));
}

function openPublishedDungeonDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(PUBLISHED_DB_NAME, PUBLISHED_DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(PUBLISHED_DB_STORE)) {
        db.createObjectStore(PUBLISHED_DB_STORE);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function readPublishedDungeonsFromIndexedDb() {
  const db = await openPublishedDungeonDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(PUBLISHED_DB_STORE, "readonly");
    const store = transaction.objectStore(PUBLISHED_DB_STORE);
    const request = store.get(PUBLISHED_STORAGE_KEY);
    request.onsuccess = () => {
      resolve(Array.isArray(request.result) ? request.result : []);
    };
    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => db.close();
    transaction.onerror = () => reject(transaction.error);
  });
}

async function writePublishedDungeonsToIndexedDb(dungeons) {
  const db = await openPublishedDungeonDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(PUBLISHED_DB_STORE, "readwrite");
    const store = transaction.objectStore(PUBLISHED_DB_STORE);
    store.put(clonePublishedDungeons(dungeons), PUBLISHED_STORAGE_KEY);
    transaction.oncomplete = () => {
      db.close();
      resolve();
    };
    transaction.onerror = () => {
      db.close();
      reject(transaction.error);
    };
  });
}

function readPublishedDungeonsFromLocalStorage() {
  try {
    return JSON.parse(localStorage.getItem(PUBLISHED_STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
}

async function ensurePublishedDungeonsLoaded() {
  if (!publishedDungeonStoragePromise) {
    publishedDungeonStoragePromise = (async () => {
      try {
        const indexed = await readPublishedDungeonsFromIndexedDb();
        if (indexed.length > 0) {
          publishedDungeonCache = removeLegacyDefaultPublishedDungeons(indexed);
          if (publishedDungeonCache.length !== indexed.length) {
            await writePublishedDungeonsToIndexedDb(publishedDungeonCache);
          }
          renderPublishedDungeons();
          return;
        }
      } catch {
      }

      const legacy = readPublishedDungeonsFromLocalStorage();
      publishedDungeonCache = removeLegacyDefaultPublishedDungeons(legacy);
      if (legacy.length > 0) {
        try {
          await writePublishedDungeonsToIndexedDb(publishedDungeonCache);
        } catch {
        }
      }
      renderPublishedDungeons();
    })();
  }
  return publishedDungeonStoragePromise;
}

function loadPublishedDungeons() {
  return clonePublishedDungeons(publishedDungeonCache).map((dungeon) => ({
    ...dungeon,
    recipe: normalizeRecipeData(dungeon?.recipe ?? {}),
  }));
}

function savePublishedDungeons(dungeons) {
  const payload = removeLegacyDefaultPublishedDungeons(dungeons).map((dungeon) => ({
    ...dungeon,
    recipe: normalizeRecipeData(dungeon?.recipe ?? {}),
  }));
  publishedDungeonCache = payload;
  void (async () => {
    try {
      await writePublishedDungeonsToIndexedDb(payload);
    } catch {
      try {
        localStorage.setItem(PUBLISHED_STORAGE_KEY, JSON.stringify(payload));
      } catch {
        log("This local dungeon is too large for browser storage. Export a full package instead.", "error");
      }
    }
  })();
}

function makePublishedId(recipe) {
  return `local-${hashString(`${recipe.name}-${recipe.seed}-${Date.now()}`).toString(36)}`;
}

function getDifficultyLabel(recipe) {
  const normalized = normalizeRecipeData(recipe);
  const startingStats = normalized.startingStats ?? normalizeStartingStats({});
  const startingEquipment = normalized.startingEquipment ?? normalizeStartingEquipment(normalized);
  const startingInventory = normalized.startingInventory ?? normalizeStartingInventory(normalized);
  const startingGearCount = Object.values(startingEquipment).filter((entry) => entry?.itemId).length + startingInventory.filter((entry) => entry?.itemId).length;
  const positiveAttack = Math.max(0, Number(startingStats.attack) || 0);
  const positiveDefense = Math.max(0, Number(startingStats.defense) || 0);
  const positiveGold = Math.max(0, Number(startingStats.gold) || 0);
  const extraHp = Math.max(0, (Number(startingStats.hp) || 0) - 20);
  const extraAccuracy = Math.max(0, (Number(startingStats.accuracy) || 0) - 100);
  const dangerScore =
    normalized.monsterRate * 1.6
    + normalized.monsterRespawnRate * 1.15
    + normalized.trapRate * 1.35
    + normalized.floors * 0.8
    + normalized.roomCount * 0.45;
  const supportScore =
    startingGearCount * 1.5
    + normalized.blessedRate * 0.08
    + extraHp * 0.25
    + positiveAttack * 1.6
    + positiveDefense * 1.5
    + extraAccuracy * 0.04
    + positiveGold * 0.015;
  const ratingScore = dangerScore - supportScore;
  if (ratingScore >= 36) {
    return "Brutal";
  }
  if (ratingScore >= 25) {
    return "Hard";
  }
  if (ratingScore >= 14) {
    return "Normal";
  }
  return "Cozy";
}

function getEnabledEnvironmentalEffects(recipe) {
  return normalizeEnvironmentalEffects(recipe.environmentalEffects).filter((effect) =>
    effect.affectsPlayer || effect.affectsEnemy,
  );
}

function chooseFloorEnvironmentalEffect(recipe, floor) {
  const enabledEffects = getEnabledEnvironmentalEffects(recipe);
  if (enabledEffects.length === 0) {
    return null;
  }

  const random = makeRandom(recipe.seed + floor * 49297);
  return enabledEffects[Math.floor(random() * enabledEffects.length)];
}

function announceFloorEnvironmentalEffect() {
  const effect = game.currentEnvironmentalEffect;
  if (!effect) {
    log("No global environmental effect is active on this floor.");
    return;
  }

  const definition = environmentalEffectDefinitions[effect.id];
  const targets = [
    effect.affectsPlayer ? "player" : "",
    effect.affectsEnemy ? "enemies" : "",
  ].filter(Boolean).join(" and ");
  if (effect.id === "randomWarp") {
    const parts = [];
    if (effect.affectsPlayer) {
      parts.push(`player every ${effect.playerTurns} turn${effect.playerTurns === 1 ? "" : "s"}`);
    }
    if (effect.affectsEnemy) {
      parts.push(`enemies every ${effect.enemyTurns} turn${effect.enemyTurns === 1 ? "" : "s"}`);
    }
    log(`Environmental effect: ${definition.name} warps ${parts.join(" and ")}.`);
    return;
  }
  if (effect.id === "randomItemDrop") {
    log(`Environmental effect: ${definition.name} makes the player drop a random item every ${effect.playerTurns} turn${effect.playerTurns === 1 ? "" : "s"}.`);
    return;
  }
  if (effect.id === "conditionalItemUse") {
    log(`Environmental effect: ${definition.name} is active. ${describeConditionalItemUseAction(effect)}.`);
    return;
  }
  log(`Environmental effect: ${definition.name} affects ${targets}.`);
}

function activeEffectIs(effectId, target) {
  const effect = game.currentEnvironmentalEffect;
  if (!effect || effect.id !== effectId) {
    return false;
  }
  return target === "player" ? effect.affectsPlayer : effect.affectsEnemy;
}

function getAllWarpableFloorTiles(excluded = []) {
  const blocked = new Set(excluded.map((entry) => `${entry.x},${entry.y}`));
  const tiles = [];
  for (let y = 0; y < game.floorHeight; y += 1) {
    for (let x = 0; x < game.floorWidth; x += 1) {
      if (game.tiles[y]?.[x] === "wall") {
        continue;
      }
      if (blocked.has(`${x},${y}`)) {
        continue;
      }
      tiles.push({ x, y });
    }
  }
  return tiles;
}

function getRandomWarpPlayerDestination() {
  const blocked = [
    game.player,
    ...game.monsters,
    ...(isBossAlive() ? getBossTiles() : []),
  ];
  const random = makeRandom(game.recipe.seed + game.floor * 5087 + getCurrentTurnNumber() * 131 + game.player.x * 17 + game.player.y * 23);
  const currentRoom = findRoomAt(game.player);
  const candidates = getAllWarpableFloorTiles(blocked)
    .map((tile) => ({
      ...tile,
      distance: Math.abs(tile.x - game.player.x) + Math.abs(tile.y - game.player.y),
      sameRoom: currentRoom ? pointInRoom(tile, currentRoom) : false,
    }))
    .sort((left, right) => right.distance - left.distance);
  if (candidates.length === 0) {
    return null;
  }
  const farCandidates = candidates.filter((tile) => tile.distance >= 8);
  const differentRoomCandidates = farCandidates.filter((tile) => !tile.sameRoom);
  const candidatePool = differentRoomCandidates.length > 0
    ? differentRoomCandidates
    : farCandidates.length > 0
      ? farCandidates
      : candidates.filter((tile) => !tile.sameRoom).length > 0
        ? candidates.filter((tile) => !tile.sameRoom)
        : candidates;
  const chosen = candidatePool[Math.floor(random() * candidatePool.length)] ?? candidates[0];
  return chosen ? { x: chosen.x, y: chosen.y } : null;
}

function warpPlayerFromEnvironmentalEffect() {
  const origin = { ...game.player };
  const destination = getRandomWarpPlayerDestination();
  if (!destination) {
    log("Random Warp crackles, but the player stays in place.");
    return false;
  }
  game.player = destination;
  revealCurrentView();
  log(`Random Warp teleports the player from (${origin.x}, ${origin.y}) to (${destination.x}, ${destination.y}).`);
  return true;
}

function getNextTurnNumber() {
  return (game.runStats?.turns ?? 0) + 1;
}

function getCurrentTurnNumber() {
  return game.runStats?.turns ?? 0;
}

function getRunLogTurnMarker() {
  if (!game.recipe) {
    return null;
  }
  return game.processingTurn ? getCurrentTurnNumber() : getNextTurnNumber();
}

function getRandomWarpBossAnchor(boss) {
  if (!boss || !game.bossRoom) {
    return null;
  }
  const { width, height } = getBossSizeDimensions(boss);
  const anchors = [];
  for (let y = game.bossRoom.y; y <= game.bossRoom.y + game.bossRoom.height - height; y += 1) {
    for (let x = game.bossRoom.x; x <= game.bossRoom.x + game.bossRoom.width - width; x += 1) {
      if (bossCanOccupy(x, y, boss) && (x !== boss.x || y !== boss.y)) {
        anchors.push({ x, y });
      }
    }
  }
  if (anchors.length === 0) {
    return null;
  }
  const random = makeRandom(game.recipe.seed + game.floor * 9121 + getCurrentTurnNumber() * 37 + boss.x * 19 + boss.y * 29);
  return anchors[Math.floor(random() * anchors.length)] ?? null;
}

function warpEnemiesFromEnvironmentalEffect() {
  let moved = 0;
  const random = makeRandom(game.recipe.seed + game.floor * 8017 + getCurrentTurnNumber() * 79);
  const occupied = [game.player, ...(isBossAlive() ? getBossTiles() : [])];

  game.monsters.forEach((monster) => {
    const occupiedWithoutSelf = [
      ...occupied,
      ...game.monsters.filter((other) => other !== monster),
    ];
    const destination = randomOpenPosition(random, occupiedWithoutSelf);
    if (!destination || (destination.x === monster.x && destination.y === monster.y)) {
      return;
    }
    monster.x = destination.x;
    monster.y = destination.y;
    moved += 1;
  });

  if (isBossAlive()) {
    const anchor = getRandomWarpBossAnchor(game.boss);
    if (anchor) {
      game.boss.x = anchor.x;
      game.boss.y = anchor.y;
      moved += 1;
    }
  }

  if (moved > 0) {
    log(`Random Warp teleports ${moved === 1 ? "an enemy" : `${moved} enemies`}.`);
  } else {
    log("Random Warp crackles, but the enemies stay in place.");
  }
}

function dropRandomInventoryItemFromEnvironmentalEffect() {
  if (!Array.isArray(game.inventory) || game.inventory.length === 0) {
    log("Random Item Drop rattles your bag, but you have nothing to lose.");
    return false;
  }
  const random = makeRandom(game.recipe.seed + game.floor * 12143 + getCurrentTurnNumber() * 61 + game.player.x * 17 + game.player.y * 29);
  const inventoryIndex = Math.floor(random() * game.inventory.length);
  const [entry] = game.inventory.splice(inventoryIndex, 1);
  if (!entry) {
    log("Random Item Drop crackles, but nothing falls out.");
    return false;
  }
  const dropPosition = getDropPositionAroundOrigin(game.player, false);
  if (!dropPosition) {
    game.inventory.splice(Math.min(inventoryIndex, game.inventory.length), 0, entry);
    log("Random Item Drop tugs at your bag, but nowhere is safe to drop an item.");
    return false;
  }
  game.items.push({
    ...entry,
    x: dropPosition.x,
    y: dropPosition.y,
  });
  log(`Random Item Drop makes you drop ${getVisibleItemName(entry)}.`);
  return true;
}

function processEnvironmentalTurn(options = {}) {
  const effect = game.currentEnvironmentalEffect;
  if (!effect || !["randomWarp", "randomItemDrop", "conditionalItemUse"].includes(effect.id)) {
    return false;
  }
  if (effect.id === "conditionalItemUse") {
    return false;
  }
  const skipPlayerWarp = options.skipPlayerWarp === true;
  if (effect.id === "randomWarp" && effect.affectsEnemy) {
    const currentTurn = game.runStats?.turns ?? 0;
    if (currentTurn > 0 && currentTurn % effect.enemyTurns === 0) {
      warpEnemiesFromEnvironmentalEffect();
    }
  }
  if (effect.id === "randomItemDrop" && effect.affectsPlayer) {
    const currentTurn = game.runStats?.turns ?? 0;
    if (currentTurn > 0 && currentTurn % effect.playerTurns === 0) {
      dropRandomInventoryItemFromEnvironmentalEffect();
    }
  }
  return false;
}

async function publishCurrentRecipe() {
  await ensurePublishedDungeonsLoaded();
  const recipe = normalizeRecipeData(readRecipe());
  const loadoutError = validateStartingLoadout(recipe);
  if (loadoutError) {
    log(loadoutError, "error");
    return;
  }

  const dungeons = loadPublishedDungeons();
  const publishedDungeon = {
    id: makePublishedId(recipe),
    name: recipe.name,
    author: "Local Player",
    difficulty: getDifficultyLabel(recipe),
    createdAt: new Date().toISOString(),
    plays: 0,
    clears: 0,
    bestFloor: 0,
    recipe,
  };

  dungeons.unshift(publishedDungeon);
  savePublishedDungeons(dungeons);
  shareCode.value = encodeRecipe(recipe);
  renderPublishedDungeons();
  log(`Published "${recipe.name}" locally.`);
}

function renderPublishedDungeons() {
  const dungeons = loadPublishedDungeons();
  publishedCount.textContent = `${dungeons.length} saved`;
  publishedList.innerHTML = "";

  if (dungeons.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-list";
    empty.textContent = "No local dungeons yet. Tune a recipe, then publish it.";
    publishedList.append(empty);
    return;
  }

  dungeons.forEach((dungeon) => {
    const card = document.createElement("article");
    card.className = "dungeon-card";
    const created = new Date(dungeon.createdAt).toLocaleDateString();
    const clearRate = dungeon.plays > 0 ? `${Math.round((dungeon.clears / dungeon.plays) * 100)}%` : "No attempts";
    const packageMetadata = getRecipePackageMetadata(dungeon.recipe);
    const metadataBadges = packageMetadata.includesCustomEnvironmentArt
      ? `<div class="dungeon-card-badges">
          <span class="dungeon-card-badge">Custom Environment Art</span>
          ${packageMetadata.includesCustomFloorImage ? '<span class="dungeon-card-badge">Floor Image</span>' : ""}
          ${packageMetadata.includesCustomBackgroundImage ? '<span class="dungeon-card-badge">Background Image</span>' : ""}
        </div>`
      : "";
    card.innerHTML = `
      <strong>${dungeon.name}</strong>
      <p>${escapeHtml(getEnvironmentDisplayName(dungeon.recipe))} | ${dungeon.recipe.floors} floors | ${dungeon.difficulty} | Published ${created}</p>
      ${metadataBadges}
      ${dungeon.recipe.description ? `<p>${escapeHtml(dungeon.recipe.description)}</p>` : ""}
      <p>Plays ${dungeon.plays} | Clears ${dungeon.clears} | Clear rate ${clearRate} | Best floor ${dungeon.bestFloor}</p>
      <div class="item-actions">
        <button type="button" data-action="play" data-id="${dungeon.id}">Play</button>
        <button type="button" data-action="copy" data-id="${dungeon.id}">Copy Code</button>
        <button type="button" data-action="delete" data-id="${dungeon.id}">Delete</button>
      </div>
    `;
    publishedList.append(card);
  });
}

function findPublishedDungeon(id) {
  return loadPublishedDungeons().find((dungeon) => dungeon.id === id);
}

function playPublishedDungeon(id) {
  const dungeons = loadPublishedDungeons();
  const dungeon = dungeons.find((entry) => entry.id === id);
  if (!dungeon) {
    return;
  }

  dungeon.plays += 1;
  dungeon.bestFloor = Math.max(dungeon.bestFloor || 0, 1);
  savePublishedDungeons(dungeons);
  applyRecipe(dungeon.recipe);
  startRun(dungeon.recipe, id);
  renderPublishedDungeons();
  log(`Playing local dungeon "${dungeon.name}".`);
}

async function copyPublishedCode(id) {
  const dungeon = findPublishedDungeon(id);
  if (!dungeon) {
    return;
  }

  shareCode.value = encodeRecipe(dungeon.recipe);
  try {
    await navigator.clipboard.writeText(shareCode.value);
    log(`Copied "${dungeon.name}" share code.`);
  } catch {
    shareCode.select();
    document.execCommand("copy");
    log(`Selected "${dungeon.name}" share code. Press Ctrl+C if needed.`);
  }
}

function deletePublishedDungeon(id) {
  const dungeon = findPublishedDungeon(id);
  const dungeons = loadPublishedDungeons().filter((entry) => entry.id !== id);
  savePublishedDungeons(dungeons);
  if (game.activePublishedId === id) {
    game.activePublishedId = null;
  }
  renderPublishedDungeons();
  if (dungeon) {
    log(`Deleted local dungeon "${dungeon.name}".`);
  }
}

function updatePublishedRunStats(result) {
  if (!game.activePublishedId) {
    return;
  }

  const dungeons = loadPublishedDungeons();
  const dungeon = dungeons.find((entry) => entry.id === game.activePublishedId);
  if (!dungeon) {
    return;
  }

  dungeon.bestFloor = Math.max(dungeon.bestFloor || 0, game.floor);
  if (result === "clear") {
    dungeon.clears += 1;
  }
  savePublishedDungeons(dungeons);
  renderPublishedDungeons();
}

function getFloorDimensions(recipe, floor) {
  const floorPressure = floor / Math.max(1, recipe.floors);
  const extraRooms = Math.max(0, (recipe.roomCount ?? 7) - 6);
  const width = Math.max(VIEW_WIDTH + 4, Math.min(96, VIEW_WIDTH + 10 + extraRooms * 6 + Math.round(floorPressure * 6)));
  const height = Math.max(VIEW_HEIGHT + 4, Math.min(72, VIEW_HEIGHT + 6 + extraRooms * 4 + Math.round(floorPressure * 5)));
  return { width, height };
}

function makeFloorLayout(recipe, floor) {
  const random = makeRandom(recipe.seed + floor * 9973);
  const dimensions = getFloorDimensions(recipe, floor);
  const tiles = Array.from({ length: dimensions.height }, () => Array.from({ length: dimensions.width }, () => "wall"));
  const rooms = [];
  const floorEnvironment = getBoardEnvironmentId(getFloorEnvironment(recipe, floor));
  const settings = environmentSettings[floorEnvironment] ?? environmentSettings.ruins;
  const floorPressure = floor / recipe.floors;
  const targetRooms = Math.round((recipe.roomCount ?? 7) + settings.roomBonus + floorPressure * 2);
  const maxAttempts = Math.max(120, targetRooms * 28);

  for (let attempt = 0; attempt < maxAttempts && rooms.length < targetRooms; attempt += 1) {
    const width = 4 + Math.floor(random() * 6);
    const height = 3 + Math.floor(random() * 5);
    const x = 1 + Math.floor(random() * Math.max(1, dimensions.width - width - 2));
    const y = 1 + Math.floor(random() * Math.max(1, dimensions.height - height - 2));
    const room = makeRoom(x, y, width, height);

    if (rooms.some((other) => roomsOverlap(room, other))) {
      continue;
    }

    carveRoom(tiles, room.x, room.y, room.width, room.height);

    if (rooms.length > 0) {
      const previous = rooms[rooms.length - 1];
      const previousDoor = getRoomConnectionPoint(previous, room.center);
      const roomDoor = getRoomConnectionPoint(room, previous.center);
      carveCorridor(tiles, previousDoor.x, previousDoor.y, roomDoor.x, roomDoor.y, random);
    }

    rooms.push(room);
  }

  if (rooms.length < 2) {
    const first = makeRoom(1, 1, 8, 6);
    const second = makeRoom(dimensions.width - 10, dimensions.height - 8, 8, 6);
    carveRoom(tiles, first.x, first.y, first.width, first.height);
    carveRoom(tiles, second.x, second.y, second.width, second.height);
    const firstDoor = getRoomConnectionPoint(first, second.center);
    const secondDoor = getRoomConnectionPoint(second, first.center);
    carveCorridor(tiles, firstDoor.x, firstDoor.y, secondDoor.x, secondDoor.y, random);
    rooms.push(first, second);
  }

  addSideBranches(tiles, rooms, random, Math.round(2 + recipe.trapRate / 4));
  const environmentTrapPositions = addEnvironmentalFeatures(tiles, rooms, settings, random, floorPressure);
  rooms.forEach((room, index) => {
    room.id = `room_${index}`;
  });

  return { tiles, rooms, width: dimensions.width, height: dimensions.height, environmentTrapPositions };
}

function makeRoom(x, y, width, height) {
  return {
    x,
    y,
    width,
    height,
    center: {
      x: x + Math.floor(width / 2),
      y: y + Math.floor(height / 2),
    },
  };
}

function getRoomConnectionPoint(room, target) {
  const dx = target.x - room.center.x;
  const dy = target.y - room.center.y;
  const minX = room.width > 2 ? room.x + 1 : room.x;
  const maxX = room.width > 2 ? room.x + room.width - 2 : room.x + room.width - 1;
  const minY = room.height > 2 ? room.y + 1 : room.y;
  const maxY = room.height > 2 ? room.y + room.height - 2 : room.y + room.height - 1;

  if (Math.abs(dx) >= Math.abs(dy)) {
    return {
      x: dx >= 0 ? room.x + room.width - 1 : room.x,
      y: clamp(target.y, minY, maxY),
    };
  }

  return {
    x: clamp(target.x, minX, maxX),
    y: dy >= 0 ? room.y + room.height - 1 : room.y,
  };
}

function roomsOverlap(a, b) {
  return !(
    a.x + a.width + 1 < b.x ||
    b.x + b.width + 1 < a.x ||
    a.y + a.height + 1 < b.y ||
    b.y + b.height + 1 < a.y
  );
}

function carveRoom(tiles, startX, startY, width, height) {
  for (let y = startY; y < startY + height; y += 1) {
    for (let x = startX; x < startX + width; x += 1) {
      tiles[y][x] = "floor";
    }
  }
}

function carveCorridor(tiles, startX, startY, endX, endY, random) {
  if (random() < 0.5) {
    carveHorizontal(tiles, startX, endX, startY);
    carveVertical(tiles, startY, endY, endX);
  } else {
    carveVertical(tiles, startY, endY, startX);
    carveHorizontal(tiles, startX, endX, endY);
  }
  tiles[endY][endX] = "floor";
}

function carveHorizontal(tiles, startX, endX, y) {
  let x = startX;
  while (x !== endX) {
    tiles[y][x] = "floor";
    x += x < endX ? 1 : -1;
  }
  tiles[y][x] = "floor";
}

function carveVertical(tiles, startY, endY, x) {
  let y = startY;
  while (y !== endY) {
    tiles[y][x] = "floor";
    y += y < endY ? 1 : -1;
  }
  tiles[y][x] = "floor";
}

function addSideBranches(tiles, rooms, random, branchCount) {
  const mapWidth = tiles[0]?.length ?? VIEW_WIDTH;
  const mapHeight = tiles.length;
  for (let index = 0; index < branchCount; index += 1) {
    const room = rooms[Math.floor(random() * rooms.length)];
    const start = randomRoomPoint(room, random);
    const length = 3 + Math.floor(random() * 8);
    const directions = [
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
    ];
    const direction = directions[Math.floor(random() * directions.length)];

    let x = start.x;
    let y = start.y;
    for (let step = 0; step < length; step += 1) {
      if (x <= 1 || y <= 1 || x >= mapWidth - 2 || y >= mapHeight - 2) {
        break;
      }
      tiles[y][x] = "floor";
      x += direction.x;
      y += direction.y;
    }
  }
}

function addEnvironmentalFeatures(tiles, rooms, settings, random, floorPressure) {
  if (settings.featureTile === "floor") {
    return [];
  }

  const featureChance = settings.featureChance + floorPressure * 0.035;
  const positions = [];
  rooms.forEach((room) => {
    for (let y = room.y + 1; y < room.y + room.height - 1; y += 1) {
      for (let x = room.x + 1; x < room.x + room.width - 1; x += 1) {
        const nearCenter = Math.abs(x - room.center.x) + Math.abs(y - room.center.y) <= 1;
        if (!nearCenter && tiles[y][x] === "floor" && random() < featureChance) {
          positions.push({ x, y });
        }
      }
    }
  });
  return positions;
}

function randomRoomPoint(room, random) {
  return {
    x: room.x + Math.floor(random() * room.width),
    y: room.y + Math.floor(random() * room.height),
  };
}

function chooseStartAndExit(rooms) {
  let startRoom = rooms[0];
  let exitRoom = rooms[rooms.length - 1];
  let bestDistance = -1;

  rooms.forEach((a) => {
    rooms.forEach((b) => {
      const distance = Math.abs(a.center.x - b.center.x) + Math.abs(a.center.y - b.center.y);
      if (distance > bestDistance) {
        bestDistance = distance;
        startRoom = a;
        exitRoom = b;
      }
    });
  });

  return {
    start: { ...startRoom.center },
    exit: { ...exitRoom.center },
  };
}

function isBossRoomFloor(recipe = game.recipe, floor = game.floor) {
  return Boolean(recipe?.bossRoom?.enabled && floor >= (recipe?.floors ?? 1));
}

function shapeContainsBossRoomCell(shape, normalizedX, normalizedY) {
  const ax = Math.abs(normalizedX);
  const ay = Math.abs(normalizedY);
  switch (shape) {
    case "circle":
      return (normalizedX * normalizedX) + (normalizedY * normalizedY) <= 1;
    case "triangle":
      return normalizedY >= -1 && normalizedY <= 1 && ax <= (1 - (normalizedY + 1) / 2);
    case "diamond":
      return ax + ay <= 1;
    case "pentagon":
      return ay <= 0.95 && !(ay < -0.35 && ax > 0.45 + (ay + 0.35) * -0.65);
    case "hexagon":
      return ay <= 0.92 && ax <= 0.92 - Math.max(0, ay - 0.2) * 0.55;
    case "octagon":
      return ax <= 1 && ay <= 1 && ax + ay <= 1.55;
    case "square":
    default:
      return true;
  }
}

function carveBossRoomShape(tiles, room, shape) {
  const connections = [];
  for (let y = room.y; y < room.y + room.height; y += 1) {
    for (let x = room.x; x < room.x + room.width; x += 1) {
      const neighbors = [
        { x: x - 1, y },
        { x: x + 1, y },
        { x, y: y - 1 },
        { x, y: y + 1 },
      ];
      if (neighbors.some((neighbor) => (
        neighbor.x < room.x ||
        neighbor.x >= room.x + room.width ||
        neighbor.y < room.y ||
        neighbor.y >= room.y + room.height
      ) && tiles[neighbor.y]?.[neighbor.x] === "floor")) {
        connections.push({ x, y });
      }
    }
  }

  for (let y = room.y; y < room.y + room.height; y += 1) {
    for (let x = room.x; x < room.x + room.width; x += 1) {
      tiles[y][x] = "wall";
    }
  }

  const halfWidth = Math.max(1, (room.width - 1) / 2);
  const halfHeight = Math.max(1, (room.height - 1) / 2);
  for (let y = room.y; y < room.y + room.height; y += 1) {
    for (let x = room.x; x < room.x + room.width; x += 1) {
      const normalizedX = (x - room.center.x) / halfWidth;
      const normalizedY = (y - room.center.y) / halfHeight;
      if (shapeContainsBossRoomCell(shape, normalizedX, normalizedY)) {
        tiles[y][x] = "floor";
      }
    }
  }

  connections.forEach((point) => {
    tiles[point.y][point.x] = "floor";
  });
  tiles[room.center.y][room.center.x] = "floor";
}

function buildBossRoom(layout, exitPosition, settings) {
  const width = Math.max(3, Math.min(layout.width - 2, Number(settings.width) || 9));
  const height = Math.max(3, Math.min(layout.height - 2, Number(settings.height) || 9));
  const x = clamp(exitPosition.x - Math.floor(width / 2), 1, Math.max(1, layout.width - width - 1));
  const y = clamp(exitPosition.y - Math.floor(height / 2), 1, Math.max(1, layout.height - height - 1));
  const room = {
    id: `boss_room_${game.floor}`,
    x,
    y,
    width,
    height,
    shape: settings.shape,
    isBossRoom: true,
    center: {
      x: x + Math.floor(width / 2),
      y: y + Math.floor(height / 2),
    },
  };
  carveBossRoomShape(layout.tiles, room, settings.shape);
  const replaceIndex = layout.rooms.findIndex((entry) => pointInRoom(exitPosition, entry));
  if (replaceIndex >= 0) {
    layout.rooms.splice(replaceIndex, 1, room);
  } else {
    layout.rooms.push(room);
  }
  return room;
}

function makeDedicatedBossFloorLayout(recipe, floor) {
  const settings = normalizeBossRoomSettings(recipe.bossRoom);
  const width = Math.max(15, Number(settings.width) + 8);
  const height = Math.max(15, Number(settings.height) + 8);
  const tiles = Array.from({ length: height }, () => Array.from({ length: width }, () => "wall"));
  const room = {
    id: `boss_room_${floor}`,
    x: Math.floor((width - Number(settings.width)) / 2),
    y: Math.floor((height - Number(settings.height)) / 2),
    width: Number(settings.width),
    height: Number(settings.height),
    shape: settings.shape,
    isBossRoom: true,
    center: {
      x: Math.floor(width / 2),
      y: Math.floor(height / 2),
    },
  };
  carveBossRoomShape(tiles, room, settings.shape);
  return { tiles, rooms: [room], width, height };
}

function chooseBossFloorPlacements(room, bossSize) {
  const bossAnchor = findBossAnchor(room, bossSize);
  const bossWidth = bossSize === "3x3" ? 3 : 2;
  const bossHeight = bossSize === "3x3" ? 3 : 2;
  const candidateStarts = [
    { x: room.center.x, y: room.y + room.height - 2 },
    { x: room.x + 1, y: room.center.y },
    { x: room.x + room.width - 2, y: room.center.y },
    { x: room.center.x, y: room.y + 1 },
  ];
  const start = candidateStarts.find((candidate) => (
    candidate.x >= room.x &&
    candidate.x < room.x + room.width &&
    candidate.y >= room.y &&
    candidate.y < room.y + room.height &&
    gameLikeBossOccupies(candidate.x, candidate.y, bossAnchor, bossWidth, bossHeight) === false
  )) ?? { x: room.center.x, y: room.y + room.height - 2 };
  return {
    start,
    exit: { ...room.center },
  };
}

function gameLikeBossOccupies(x, y, anchor, width, height) {
  return x >= anchor.x && x < anchor.x + width && y >= anchor.y && y < anchor.y + height;
}

function getBossSizeDimensions(boss = game.boss) {
  return boss?.size === "3x3" ? { width: 3, height: 3 } : { width: 2, height: 2 };
}

function getBossTiles(boss = game.boss) {
  if (!boss) {
    return [];
  }
  const { width, height } = getBossSizeDimensions(boss);
  const tiles = [];
  for (let dy = 0; dy < height; dy += 1) {
    for (let dx = 0; dx < width; dx += 1) {
      tiles.push({ x: boss.x + dx, y: boss.y + dy });
    }
  }
  return tiles;
}

function bossOccupies(x, y, boss = game.boss) {
  return getBossTiles(boss).some((tile) => tile.x === x && tile.y === y);
}

function isBossAlive() {
  return Boolean(game.boss && game.boss.hp > 0);
}

function getBossGlyph(boss = game.boss) {
  const source = boss?.name?.trim()?.slice(0, 1) ?? "B";
  return source.toUpperCase();
}

function isBossGlyphTile(x, y, boss = game.boss) {
  if (!boss) {
    return false;
  }
  const center = getBossCenter(boss);
  return x === center.x && y === center.y;
}

function clearBossGlyphOverlay() {
  if (!boardStage) {
    return;
  }
  boardStage.querySelectorAll(".boss-glyph-overlay").forEach((overlay) => overlay.remove());
}

function renderBossGlyphOverlay() {
  clearBossGlyphOverlay();
  if (!boardStage || !isBossAlive()) {
    return;
  }

  const bossTiles = [...board.querySelectorAll('.tile.boss[data-boss="true"]')];
  if (bossTiles.length === 0) {
    return;
  }

  const stageRect = boardStage.getBoundingClientRect();
  let left = Number.POSITIVE_INFINITY;
  let top = Number.POSITIVE_INFINITY;
  let right = Number.NEGATIVE_INFINITY;
  let bottom = Number.NEGATIVE_INFINITY;

  bossTiles.forEach((tile) => {
    const rect = tile.getBoundingClientRect();
    left = Math.min(left, rect.left);
    top = Math.min(top, rect.top);
    right = Math.max(right, rect.right);
    bottom = Math.max(bottom, rect.bottom);
  });

  if (!Number.isFinite(left) || !Number.isFinite(top) || right <= left || bottom <= top) {
    return;
  }

  const overlay = document.createElement("div");
  overlay.className = "boss-glyph-overlay";
  overlay.textContent = getBossGlyph();
  overlay.style.left = `${left - stageRect.left}px`;
  overlay.style.top = `${top - stageRect.top}px`;
  overlay.style.width = `${right - left}px`;
  overlay.style.height = `${bottom - top}px`;
  overlay.style.fontSize = `${Math.max(26, Math.min(right - left, bottom - top) * 0.72)}px`;

  if (endScreen?.parentElement === boardStage) {
    boardStage.insertBefore(overlay, endScreen);
  } else {
    boardStage.append(overlay);
  }
}

function findBossAnchor(room, size) {
  const { width, height } = size === "3x3" ? { width: 3, height: 3 } : { width: 2, height: 2 };
  const x = clamp(room.center.x - Math.floor(width / 2), room.x, room.x + room.width - width);
  const y = clamp(room.center.y - Math.floor(height / 2), room.y, room.y + room.height - height);
  return { x, y };
}

function chooseBossBaseVariant(recipe) {
  const rules = normalizeEnemyPoolRules(recipe.enemyPoolRules);
  const enabledLevels = rules.flatMap((family) => family.levels
    .filter((level) => level.enabled)
    .map((level) => ({
      familyId: family.familyId,
      glyph: family.glyph,
      level: level.level,
      name: level.name,
      hp: level.hp,
      attack: level.attack,
      defense: level.defense,
      xp: level.xp,
    })));
  return enabledLevels.sort((left, right) => (
    right.level - left.level ||
    right.xp - left.xp ||
    right.hp - left.hp
  ))[0] ?? {
    familyId: "boss",
    glyph: "B",
    level: 4,
    name: "Boss",
    hp: 28,
    attack: 11,
    defense: 6,
    xp: 30,
  };
}

function createBossEntity(recipe, room) {
  const settings = normalizeBossRoomSettings(recipe.bossRoom);
  const base = chooseBossBaseVariant(recipe);
  const scale = settings.bossSize === "3x3" ? 1.55 : 1.15;
  const hp = Math.max(20, Math.round(base.hp * 4.5 * scale));
  const attack = Math.max(0, Math.round(settings.attack));
  const defense = Math.max(1, Math.round(base.defense * (1.5 + settings.behavior * 0.04)));
  const xp = Math.max(10, Math.round(base.xp * 8 * scale));
  const anchor = findBossAnchor(room, settings.bossSize);
  return {
    id: `boss_${game.floor}`,
    name: settings.name,
    glyph: getBossGlyph({ name: settings.name }),
    x: anchor.x,
    y: anchor.y,
    size: settings.bossSize,
    hp,
    maxHp: hp,
    attack,
    defense,
    xp,
    behavior: settings.behavior,
    roomId: room.id,
    specialAttacks: normalizeBossSpecialAttacks(settings.specialAttacks).map((attack) => ({
      ...attack,
      currentCooldown: 0,
    })),
  };
}

function makeVisibilityGrid(width, height, value = false) {
  return Array.from({ length: height }, () => Array.from({ length: width }, () => value));
}

function findRoomAt(position) {
  return game.rooms.find((room) =>
    position.x >= room.x &&
    position.x < room.x + room.width &&
    position.y >= room.y &&
    position.y < room.y + room.height,
  );
}

function revealCurrentView() {
  game.visible = makeVisibilityGrid(game.floorWidth, game.floorHeight, false);
  const playerRoom = findRoomAt(game.player);
  if (!isDarkSpecialRoom(playerRoom)) {
    revealRoom(playerRoom);
  }
  revealRadius(game.player, getLanternRadius());
}

function isDarkSpecialRoom(room) {
  if (!room) {
    return false;
  }
  return getSpecialRoomForRoom(room)?.type === "darkRoom" || roomHasMonsterSkill(room, "forceDarkRoom");
}

function revealRoom(room) {
  if (!room) {
    return;
  }

  for (let y = room.y; y < room.y + room.height; y += 1) {
    for (let x = room.x; x < room.x + room.width; x += 1) {
      revealTile(x, y);
    }
  }
}

function revealRadius(center, radius) {
  for (let y = center.y - radius; y <= center.y + radius; y += 1) {
    for (let x = center.x - radius; x <= center.x + radius; x += 1) {
      const distance = Math.max(Math.abs(center.x - x), Math.abs(center.y - y));
      if (distance <= radius) {
        revealTile(x, y);
      }
    }
  }
}

function revealTile(x, y) {
  if (x < 0 || y < 0 || x >= game.floorWidth || y >= game.floorHeight) {
    return;
  }
  game.revealed[y][x] = true;
  game.visible[y][x] = true;
}

function isVisible(x, y) {
  return game.visible[y]?.[x] ?? false;
}

function isRevealed(x, y) {
  return game.revealed[y]?.[x] ?? false;
}

function getLanternRadius() {
  return 1;
}

function randomOpenPosition(random, occupied = []) {
  for (let attempts = 0; attempts < 500; attempts += 1) {
    const x = 1 + Math.floor(random() * Math.max(1, game.floorWidth - 2));
    const y = 1 + Math.floor(random() * Math.max(1, game.floorHeight - 2));
    const isOccupied = occupied.some((entity) => entity.x === x && entity.y === y);
    if (game.tiles[y]?.[x] === "floor" && !isOccupied) {
      return { x, y };
    }
  }
  return { x: 1, y: 1 };
}

function randomRoomPosition(random, occupied = []) {
  const rooms = game.rooms.length > 0 ? game.rooms : [{ x: 1, y: 1, width: game.floorWidth - 2, height: game.floorHeight - 2 }];
  for (let attempts = 0; attempts < 500; attempts += 1) {
    const room = rooms[Math.floor(random() * rooms.length)];
    const minX = room.width > 2 ? room.x + 1 : room.x;
    const maxX = room.width > 2 ? room.x + room.width - 2 : room.x + room.width - 1;
    const minY = room.height > 2 ? room.y + 1 : room.y;
    const maxY = room.height > 2 ? room.y + room.height - 2 : room.y + room.height - 1;
    const x = minX + Math.floor(random() * Math.max(1, maxX - minX + 1));
    const y = minY + Math.floor(random() * Math.max(1, maxY - minY + 1));
    const isOccupied = occupied.some((entity) => entity.x === x && entity.y === y);
    if (game.tiles[y]?.[x] !== "wall" && !isOccupied) {
      return { x, y };
    }
  }
  return randomOpenPosition(random, occupied);
}

function randomRoomPositionFromRooms(random, rooms, occupied = []) {
  const candidateRooms = rooms.filter(Boolean);
  if (candidateRooms.length === 0) {
    return null;
  }

  for (let attempts = 0; attempts < 500; attempts += 1) {
    const room = candidateRooms[Math.floor(random() * candidateRooms.length)];
    const minX = room.width > 2 ? room.x + 1 : room.x;
    const maxX = room.width > 2 ? room.x + room.width - 2 : room.x + room.width - 1;
    const minY = room.height > 2 ? room.y + 1 : room.y;
    const maxY = room.height > 2 ? room.y + room.height - 2 : room.y + room.height - 1;
    const x = minX + Math.floor(random() * Math.max(1, maxX - minX + 1));
    const y = minY + Math.floor(random() * Math.max(1, maxY - minY + 1));
    const isOccupied = occupied.some((entity) => entity.x === x && entity.y === y);
    if (game.tiles[y]?.[x] === "floor" && !isOccupied) {
      return { x, y };
    }
  }

  return null;
}

function chooseRespawnRoom(respawnRooms) {
  if (respawnRooms.length === 0) {
    return null;
  }
  const playerRoom = findRoomAt(game.player);
  const rankedRooms = respawnRooms.map((room) => {
    const centerDx = room.center.x - game.player.x;
    const centerDy = room.center.y - game.player.y;
    const distance = Math.abs(centerDx) + Math.abs(centerDy);
    const monsterCount = game.monsters.filter((monster) => findRoomAt(monster) === room).length;
    return { room, distance, monsterCount };
  });

  rankedRooms.sort((left, right) => (
    left.monsterCount - right.monsterCount
    || right.distance - left.distance
    || (left.room.id === game.lastMonsterRespawnRoomId ? 1 : 0) - (right.room.id === game.lastMonsterRespawnRoomId ? 1 : 0)
  ));

  const variedRooms = rankedRooms.filter(({ room }) => room.id !== game.lastMonsterRespawnRoomId);
  const candidatePool = (variedRooms.length > 0 ? variedRooms : rankedRooms).slice(0, Math.max(1, Math.ceil(rankedRooms.length / 2)));
  return candidatePool[Math.floor(Math.random() * candidatePool.length)]?.room ?? playerRoom ?? rankedRooms[0]?.room ?? null;
}

function chooseMonsterVariant(recipe, floor, random) {
  const enemyRules = normalizeEnemyPoolRules(recipe.enemyPoolRules);
  const familyPool = environmentMonsterFamilies[getBoardEnvironmentId(getFloorEnvironment(recipe, floor))] ?? environmentMonsterFamilies.ruins;
  const familyRuleById = new Map(enemyRules.map((rule) => [rule.familyId, rule]));
  const enabledFamilies = enemyRules.filter((rule) => rule.levels.some((level) => level.enabled));
  const preferredFamilies = [
    ...familyPool.filter((familyId) => enabledFamilies.some((rule) => rule.familyId === familyId)),
    ...enabledFamilies.map((rule) => rule.familyId).filter((familyId) => !familyPool.includes(familyId)),
  ];
  const chosenFamilyId = preferredFamilies[Math.floor(random() * preferredFamilies.length)]
    ?? enabledFamilies[0]?.familyId;
  if (!chosenFamilyId) {
    return null;
  }
  const chosenFamily = familyRuleById.get(chosenFamilyId) ?? enabledFamilies[0];
  const enabledLevels = (chosenFamily?.levels ?? []).filter((level) => level.enabled);
  const usableLevels = enabledLevels.length > 0 ? enabledLevels : [];
  if (usableLevels.length === 0) {
    return null;
  }
  const depthBias = floor / Math.max(1, recipe.floors);
  const difficulty = clampNumber(recipe?.difficulty, 0, 10, 3);
  const scaledDepth = Math.max(0, Math.min(1.35, (depthBias * (0.6 + difficulty * 0.12)) + difficulty * 0.03));
  const targetLevel = Math.min(4, 1 + Math.floor(scaledDepth * 3.4) + (random() < 0.22 ? 1 : 0));
  const nearTarget = usableLevels.filter((level) => level.level <= targetLevel);
  const levelPool = nearTarget.length > 0 ? nearTarget : usableLevels;
  const chosenLevel = levelPool[Math.floor(random() * levelPool.length)] ?? usableLevels[0];
  return {
    familyId: chosenFamilyId,
    glyph: chosenFamily.glyph,
    pursuit: normalizeEnemyPursuitSettings(chosenFamily.pursuit, {}, chosenFamilyId),
    level: chosenLevel.level,
    name: chosenLevel.name,
    hp: chosenLevel.hp,
    maxHp: chosenLevel.hp,
    attack: chosenLevel.attack,
    defense: chosenLevel.defense,
    xp: chosenLevel.xp,
    skills: normalizeEnemySkills(chosenLevel.skills),
  };
}

function createMonster(variant) {
  const hideInWallsSkill = normalizeEnemySkills(variant.skills).find((skill) => skill.enabled && skill.type === "hideInWalls");
  return {
    id: `${variant.familyId}-lv${variant.level}`,
    familyId: variant.familyId,
    level: variant.level,
    name: variant.name,
    glyph: variant.glyph,
    pursuit: normalizeEnemyPursuitSettings(variant.pursuit, {}, variant.familyId),
    hasSpottedPlayer: false,
    hp: variant.hp,
    maxHp: variant.maxHp,
    attack: variant.attack,
    baseAttack: variant.attack,
    defense: variant.defense,
    baseDefense: variant.defense,
    xp: variant.xp,
    skills: normalizeEnemySkills(variant.skills),
    primedExplodeShown: false,
    hitCounter: 0,
    hiddenUntilNear: Boolean(hideInWallsSkill),
    bonusActions: 0,
  };
}

function getMonsterSkills(monster, type = null) {
  const skills = normalizeEnemySkills(monster?.skills ?? []);
  return type ? skills.filter((skill) => skill.enabled && skill.type === type) : skills.filter((skill) => skill.enabled);
}

function getMonsterSkill(monster, type = null) {
  return getMonsterSkills(monster, type)[0] ?? null;
}

function cloneMonsterEntity(monster, overrides = {}) {
  return {
    ...JSON.parse(JSON.stringify(monster)),
    ...overrides,
    skills: normalizeEnemySkills((overrides.skills ?? monster.skills) || []),
    hitCounter: Number(overrides.hitCounter ?? 0),
    bonusActions: Number(overrides.bonusActions ?? 0),
  };
}

function enemySkillTriggers(skill) {
  if (!skill) {
    return false;
  }
  return Math.random() * 100 < Number(skill.chance ?? 100);
}

function getNearbyMonsters(origin, count = 1, range = Infinity, options = {}) {
  const includeSelf = options.includeSelf === true;
  return game.monsters
    .filter((monster) => includeSelf || monster !== origin)
    .map((monster) => ({
      monster,
      distance: Math.max(Math.abs(monster.x - origin.x), Math.abs(monster.y - origin.y)),
    }))
    .filter((entry) => entry.distance <= range)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, Math.max(0, count))
    .map((entry) => entry.monster);
}

function createMonsterDisguiseItem(monster, itemId = "") {
  const random = Math.random;
  const disguiseItemId = itemId || chooseItemId(game.recipe, random);
  const entry = createSpawnedItem(game.recipe, disguiseItemId, random);
  return {
    x: monster.x,
    y: monster.y,
    ...entry,
    monsterDisguise: cloneMonsterEntity(monster, { x: monster.x, y: monster.y, hiddenUntilNear: false }),
  };
}

function applySpawnMonsterDisguises() {
  for (let index = game.monsters.length - 1; index >= 0; index -= 1) {
    const monster = game.monsters[index];
    const disguise = getMonsterSkill(monster, "disguiseAsItem");
    if (!disguise || !enemySkillTriggers(disguise)) {
      continue;
    }
    game.items.push(createMonsterDisguiseItem(monster, disguise.targetItemId));
    game.monsters.splice(index, 1);
  }
}

function spawnMonsterClonesNear(monster, count = 1) {
  const neighbors = getOpenFloorNeighbors(monster);
  let spawned = 0;
  for (const destination of neighbors) {
    if (spawned >= count) {
      break;
    }
    game.monsters.push(cloneMonsterEntity(monster, {
      x: destination.x,
      y: destination.y,
      hp: Math.max(1, Math.ceil(monster.maxHp / 2)),
      primedExplodeShown: false,
      hitCounter: 0,
      bonusActions: 0,
    }));
    spawned += 1;
  }
  return spawned;
}

function triggerElectrifyOnHits(monster) {
  const skill = getMonsterSkill(monster, "electrifyOnHits");
  if (!skill || !enemySkillTriggers(skill)) {
    return;
  }
  monster.hitCounter = Number(monster.hitCounter ?? 0) + 1;
  const neededHits = Math.max(1, Number(skill.value ?? 1));
  if (monster.hitCounter < neededHits) {
    return;
  }
  monster.hitCounter = 0;
  const shockDamage = Math.max(1, Number(skill.extra ?? 1));
  game.hp -= shockDamage;
  trackRunStat("damageTaken", shockDamage);
  log(`${monster.name} discharges ${shockDamage} lightning damage!`);
  if (game.hp <= 0) {
    game.hp = 0;
    endRun("collapse");
    log("You collapsed in the dungeon. Generate or load a recipe to retry.");
  }
}

function roomHasMonsterSkill(room, skillType) {
  if (!room) {
    return false;
  }
  return game.monsters.some((monster) => {
    const monsterRoom = findRoomAt(monster);
    return monsterRoom?.id === room.id && Boolean(getMonsterSkill(monster, skillType));
  });
}

function revealDisguisedMonster(item) {
  if (!item?.monsterDisguise) {
    return false;
  }
  const monster = cloneMonsterEntity(item.monsterDisguise, {});
  const destination = getOpenFloorNeighbors(game.player)[0] ?? { x: item.x, y: item.y };
  monster.x = destination.x;
  monster.y = destination.y;
  game.monsters.push(monster);
  log(`${monster.name} was disguised as ${getVisibleItemName(item)}!`);
  const damage = applyEnvironmentalDamage(rollDamage(monster.attack, getPlayerDefense()), "player");
  game.hp -= damage;
  trackRunStat("damageTaken", damage);
  playSoundEffect("enemyAttack");
  log(`${monster.name} ambushes you for ${damage} damage.`);
  if (game.hp <= 0) {
    game.hp = 0;
    endRun("collapse");
    log("You collapsed in the dungeon. Generate or load a recipe to retry.");
  }
  return true;
}

function monsterHasSkill(monster, type) {
  return Boolean(getMonsterSkill(monster, type));
}

function getMonsterAttackRange(monster) {
  const ranges = [1];
  const ranged = getMonsterSkill(monster, "rangedAttack");
  const fireBreath = getMonsterSkill(monster, "fireBreath");
  const waterShot = getMonsterSkill(monster, "waterShot");
  const throwLog = getMonsterSkill(monster, "throwLog");
  const throwGold = getMonsterSkill(monster, "throwGold");
  const throwItem = getMonsterSkill(monster, "throwItem");
  const magic = getMonsterSkill(monster, "shootMagic");
  if (ranged) {
    ranges.push(Math.max(1, Number(ranged.value ?? 1)));
  }
  if (fireBreath) {
    ranges.push(Math.max(1, Number(fireBreath.extra ?? 3)));
  }
  if (waterShot) {
    ranges.push(Math.max(1, Number(waterShot.extra ?? 4)));
  }
  if (throwLog) {
    ranges.push(Math.max(1, Number(throwLog.extra ?? 4)));
  }
  if (throwGold) {
    ranges.push(Math.max(1, Number(throwGold.extra ?? 4)));
  }
  if (throwItem) {
    ranges.push(Math.max(1, Number(throwItem.extra ?? 4)));
  }
  if (magic) {
    ranges.push(Math.max(1, Number(magic.extra ?? 4)));
  }
  return Math.max(...ranges);
}

function chooseMonsterAttackMode(monster, distance = 1) {
  if (distance <= 1) {
    return "melee";
  }
  const fireBreath = getMonsterSkill(monster, "fireBreath");
  if (fireBreath && distance <= Math.max(1, Number(fireBreath.extra ?? 3)) && enemySkillTriggers(fireBreath)) {
    return "fireBreath";
  }
  const waterShot = getMonsterSkill(monster, "waterShot");
  if (waterShot && distance <= Math.max(1, Number(waterShot.extra ?? 4)) && enemySkillTriggers(waterShot)) {
    return "waterShot";
  }
  const throwLog = getMonsterSkill(monster, "throwLog");
  if (throwLog && distance <= Math.max(1, Number(throwLog.extra ?? 4)) && enemySkillTriggers(throwLog)) {
    return "throwLog";
  }
  const throwGold = getMonsterSkill(monster, "throwGold");
  if (throwGold && distance <= Math.max(1, Number(throwGold.extra ?? 4)) && enemySkillTriggers(throwGold)) {
    return "throwGold";
  }
  const throwItem = getMonsterSkill(monster, "throwItem");
  if (throwItem && distance <= Math.max(1, Number(throwItem.extra ?? 4)) && enemySkillTriggers(throwItem)) {
    return "throwItem";
  }
  const magic = getMonsterSkill(monster, "shootMagic");
  if (magic && distance <= Math.max(1, Number(magic.extra ?? 4)) && enemySkillTriggers(magic)) {
    return "shootMagic";
  }
  const ranged = getMonsterSkill(monster, "rangedAttack");
  if (ranged && distance <= Math.max(1, Number(ranged.value ?? 1)) && enemySkillTriggers(ranged)) {
    return "ranged";
  }
  return null;
}

function getOpenFloorNeighbors(origin) {
  const neighbors = [];
  [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
  ].forEach((direction) => {
    const x = origin.x + direction.x;
    const y = origin.y + direction.y;
    if (game.tiles[y]?.[x] !== "floor") {
      return;
    }
    if (x === game.player.x && y === game.player.y) {
      return;
    }
    if (bossOccupies(x, y)) {
      return;
    }
    if (game.monsters.some((monster) => monster !== origin && monster.x === x && monster.y === y)) {
      return;
    }
    neighbors.push({ x, y });
  });
  return neighbors;
}

function applyAttackReductionToMonster(monster, amount = 0) {
  if (!monster || amount <= 0) {
    return 0;
  }
  const previous = monster.attack;
  monster.attack = Math.max(0, monster.attack - amount);
  monster.baseAttack = Math.max(0, monster.baseAttack - amount);
  return previous - monster.attack;
}

function dropInventoryItemBehindPlayerFromMonster(monster) {
  const equippedSlots = ["leftHand", "rightHand"].filter((slot) => game.equipment[slot]);
  if (equippedSlots.length === 0) {
    return false;
  }
  const slot = equippedSlots[Math.floor(Math.random() * equippedSlots.length)];
  const entry = game.equipment[slot];
  const dx = Math.sign(game.player.x - monster.x);
  const dy = Math.sign(game.player.y - monster.y);
  const destination = { x: game.player.x + dx, y: game.player.y + dy };
  const fallback = getDropPositionAroundOrigin(game.player, true);
  const position = game.tiles[destination.y]?.[destination.x] === "floor"
    && !game.items.some((item) => item.x === destination.x && item.y === destination.y)
    && !game.monsters.some((other) => other.x === destination.x && other.y === destination.y)
    ? destination
    : fallback;
  if (!position) {
    return false;
  }
  const previousMaxHp = getPlayerMaxHp();
  game.equipment[slot] = null;
  syncHpAfterEquipmentChange(previousMaxHp);
  game.items.push({ ...position, ...entry });
  log(`${getVisibleItemName(entry)} is knocked to the floor!`);
  return true;
}

function stealRandomInventoryEntry(removeOnly = true) {
  if (game.inventory.length === 0) {
    return null;
  }
  const index = Math.floor(Math.random() * game.inventory.length);
  const [entry] = game.inventory.splice(index, 1);
  return entry ?? null;
}

function warpMonsterToRandomRoom(monster) {
  if (!monster) {
    return false;
  }
  const random = Math.random;
  const occupied = [game.player, game.exit, ...game.monsters.filter((other) => other !== monster), ...game.items, ...game.traps, ...getBossTiles()];
  const destination = randomRoomPosition(random, occupied);
  if (!destination) {
    return false;
  }
  monster.x = destination.x;
  monster.y = destination.y;
  return true;
}

function applyEnemyMagicEffect(monster, skill) {
  const amount = Math.max(1, Number(skill.value ?? 1));
  switch (skill.magicEffect) {
    case "levelDown":
      game.level = Math.max(1, game.level - amount);
      log(`${monster.name}'s magic lowers your level by ${amount}.`);
      return;
    case "hungerDown":
      if (game.recipe?.hungerEnabled) {
        game.hunger = Math.max(0, game.hunger - amount);
        log(`${monster.name}'s magic drains ${amount} hunger.`);
      }
      return;
    case "maxHungerDown":
      if (game.recipe?.hungerEnabled) {
        game.permanentBonuses.maxHunger -= amount;
        game.hungerMax = Math.max(1, getPlayerMaxHunger());
        game.hunger = Math.min(game.hunger, game.hungerMax);
        log(`${monster.name}'s magic lowers your max hunger by ${amount}.`);
      }
      return;
    case "baseAttackDown":
      game.permanentBonuses.attack -= amount;
      log(`${monster.name}'s magic lowers your base attack by ${amount}.`);
      return;
    case "curseEquipped":
      if (playerHasCursebreakBracelet()) {
        log(`${monster.name}'s magic sputters against your Cursebreak Bracelet.`);
        return;
      }
      ["leftHand", "rightHand", "bracelet1", "bracelet2"].forEach((slot) => {
        if (game.equipment[slot]) {
          game.equipment[slot].cursed = true;
          game.equipment[slot].curseRevealed = true;
        }
      });
      log(`${monster.name}'s magic curses your equipment.`);
      return;
    case "downgradeEquippedWeapon":
      ["leftHand", "rightHand"].forEach((slot) => {
        if (game.equipment[slot]) {
          applyUpgradeToEntry(game.equipment[slot], -amount, MIN_ITEM_UPGRADE, MAX_ITEM_UPGRADE);
        }
      });
      log(`${monster.name}'s magic lowers your weapon upgrades by ${amount}.`);
      return;
    case "stealGold": {
      const stolen = Math.min(game.gold, amount);
      game.gold -= stolen;
      log(`${monster.name}'s magic steals ${stolen} gold.`);
      return;
    }
    case "transmuteInventoryItem": {
      if (game.inventory.length === 0 || !skill.targetItemId) {
        return;
      }
      const index = Math.floor(Math.random() * game.inventory.length);
      game.inventory[index] = createSpawnedItem(game.recipe, skill.targetItemId, Math.random);
      log(`${monster.name}'s magic warps one of your items into ${getItemDefinition(skill.targetItemId)?.name ?? skill.targetItemId}.`);
      return;
    }
    case "damage":
    default:
      return;
  }
}

function applyMonsterAttackSideEffects(monster, hitDamage = 0, distance = 1) {
  const hungerDown = getMonsterSkill(monster, "hungerDown");
  if (hungerDown && game.recipe?.hungerEnabled && enemySkillTriggers(hungerDown)) {
    const loss = Math.min(game.hunger, Math.max(1, Number(hungerDown.value ?? 0)));
    game.hunger = Math.max(0, game.hunger - loss);
    log(`${monster.name} drains ${loss} hunger.`);
  }
  const maxHungerDown = getMonsterSkill(monster, "maxHungerDown");
  if (maxHungerDown && game.recipe?.hungerEnabled && enemySkillTriggers(maxHungerDown)) {
    const amount = Math.max(1, Number(maxHungerDown.value ?? 0));
    game.permanentBonuses.maxHunger -= amount;
    game.hungerMax = Math.max(1, getPlayerMaxHunger());
    game.hunger = Math.min(game.hunger, game.hungerMax);
    log(`${monster.name} lowers your max hunger by ${amount}.`);
  }
  const baseAttackDown = getMonsterSkill(monster, "baseAttackDown");
  if (baseAttackDown && enemySkillTriggers(baseAttackDown)) {
    const amount = Math.max(1, Number(baseAttackDown.value ?? 0));
    game.permanentBonuses.attack -= amount;
    log(`${monster.name} lowers your base attack by ${amount}.`);
  }
  const transmuteInventoryItem = getMonsterSkill(monster, "transmuteInventoryItem");
  if (transmuteInventoryItem && game.inventory.length > 0 && transmuteInventoryItem.targetItemId && enemySkillTriggers(transmuteInventoryItem)) {
    const index = Math.floor(Math.random() * game.inventory.length);
    game.inventory[index] = createSpawnedItem(game.recipe, transmuteInventoryItem.targetItemId, Math.random);
    log(`${monster.name} transforms one of your items into ${getItemDefinition(transmuteInventoryItem.targetItemId)?.name ?? transmuteInventoryItem.targetItemId}.`);
  }
  const levelDown = getMonsterSkill(monster, "levelDown");
  if (levelDown && enemySkillTriggers(levelDown)) {
    const amount = Math.max(1, Number(levelDown.value ?? 0));
    game.level = Math.max(1, game.level - amount);
    log(`${monster.name} lowers your level by ${amount}.`);
  }
  const stealGold = getMonsterSkill(monster, "stealGold");
  if (stealGold && enemySkillTriggers(stealGold)) {
    const stolen = Math.min(game.gold, Math.max(1, Number(stealGold.value ?? 0)));
    if (stolen > 0) {
      game.gold -= stolen;
      log(`${monster.name} steals ${stolen} gold.`);
    }
  }
  const stealItemWarp = getMonsterSkill(monster, "stealItemWarp");
  if (stealItemWarp && enemySkillTriggers(stealItemWarp)) {
    const stolenEntry = stealRandomInventoryEntry();
    if (stolenEntry) {
      log(`${monster.name} steals ${getVisibleItemName(stolenEntry)} and warps away.`);
      warpMonsterToRandomRoom(monster);
    }
  }
  const stealItemThrowAway = getMonsterSkill(monster, "stealItemThrowAway");
  if (stealItemThrowAway && enemySkillTriggers(stealItemThrowAway)) {
    const stolenEntry = stealRandomInventoryEntry();
    if (stolenEntry) {
      log(`${monster.name} steals and hurls away ${getVisibleItemName(stolenEntry)}.`);
    }
  }
  const curseEquipped = getMonsterSkill(monster, "curseEquipped");
  if (curseEquipped && enemySkillTriggers(curseEquipped)) {
    if (playerHasCursebreakBracelet()) {
      log(`${monster.name}'s curse fails to take hold.`);
    } else {
    ["leftHand", "rightHand", "bracelet1", "bracelet2"].forEach((slot) => {
      if (game.equipment[slot]) {
        game.equipment[slot].cursed = true;
        game.equipment[slot].curseRevealed = true;
      }
    });
    log(`${monster.name} curses your equipped items.`);
    }
  }
  const downgradeWeapons = getMonsterSkill(monster, "downgradeEquippedWeapon");
  if (downgradeWeapons && enemySkillTriggers(downgradeWeapons)) {
    ["leftHand", "rightHand"].forEach((slot) => {
      if (game.equipment[slot]) {
        applyUpgradeToEntry(game.equipment[slot], -Math.max(1, Number(downgradeWeapons.value ?? 1)), MIN_ITEM_UPGRADE, MAX_ITEM_UPGRADE);
      }
    });
    log(`${monster.name} reduces your equipped weapon upgrades.`);
  }
  const removeRunes = getMonsterSkill(monster, "removeRunes");
  if (removeRunes && enemySkillTriggers(removeRunes) && Math.random() * 100 < Number(removeRunes.value ?? 0)) {
    const candidates = ["leftHand", "rightHand"].map((slot) => game.equipment[slot]).filter((entry) => Array.isArray(entry?.runeIds) && entry.runeIds.length > 0);
    if (candidates.length > 0) {
      const target = candidates[Math.floor(Math.random() * candidates.length)];
      target.runeIds = [];
      log(`${monster.name} strips the runes from ${getVisibleItemName(target)}.`);
    }
  }
  const knockback = getMonsterSkill(monster, "knockback");
  if (knockback && enemySkillTriggers(knockback)) {
    const tiles = Math.max(1, Number(knockback.value ?? 1));
    const dx = Math.sign(game.player.x - monster.x);
    const dy = Math.sign(game.player.y - monster.y);
    for (let step = 0; step < tiles; step += 1) {
      const next = { x: game.player.x + dx, y: game.player.y + dy };
      if (game.tiles[next.y]?.[next.x] !== "floor" || game.monsters.some((other) => other.x === next.x && other.y === next.y) || bossOccupies(next.x, next.y)) {
        break;
      }
      game.player = next;
    }
    log(`${monster.name} knocks you back.`);
  }
  const dropWeaponBehind = getMonsterSkill(monster, "dropWeaponBehind");
  if (dropWeaponBehind && enemySkillTriggers(dropWeaponBehind)) {
    dropInventoryItemBehindPlayerFromMonster(monster);
  }
  const throwPlayer = getMonsterSkill(monster, "throwPlayer");
  if (throwPlayer && enemySkillTriggers(throwPlayer)) {
    const tiles = Math.max(1, Number(throwPlayer.value ?? 1));
    const dx = Math.sign(game.player.x - monster.x);
    const dy = Math.sign(game.player.y - monster.y);
    for (let step = 0; step < tiles; step += 1) {
      const next = { x: game.player.x + dx, y: game.player.y + dy };
      if (game.tiles[next.y]?.[next.x] !== "floor" || game.monsters.some((other) => other.x === next.x && other.y === next.y) || bossOccupies(next.x, next.y)) {
        break;
      }
      game.player = next;
    }
    log(`${monster.name} throws you ${tiles} tile${tiles === 1 ? "" : "s"} away.`);
  }
  const magic = getMonsterSkill(monster, "shootMagic");
  if (magic && distance > 1 && enemySkillTriggers(magic)) {
    applyEnemyMagicEffect(monster, magic);
  }
}

function applyEnemyDeathSkillEffects(monster) {
  game.monsters.forEach((other) => {
    if (other === monster) {
      return;
    }
    const distance = Math.max(Math.abs(other.x - monster.x), Math.abs(other.y - monster.y));
    if (distance > 2) {
      return;
    }
    const deathBuff = getMonsterSkill(monster, "deathBuffNearby");
    if (deathBuff && enemySkillTriggers(deathBuff)) {
      const amount = Math.max(1, Number(deathBuff.value ?? 1));
      other.level += amount;
      other.maxHp += amount * 2;
      other.hp = Math.min(other.maxHp, other.hp + amount * 2);
      other.attack += amount;
      other.baseAttack += amount;
      other.defense += amount;
      other.baseDefense += amount;
      other.xp += amount * 2;
      log(`${other.name} levels up from the fallen ${monster.name}.`);
    }
    const attackUpOnNearbyDeath = getMonsterSkill(other, "attackUpOnNearbyDeath");
    if (attackUpOnNearbyDeath && enemySkillTriggers(attackUpOnNearbyDeath)) {
      const gain = Math.max(1, Number(attackUpOnNearbyDeath.value ?? 1));
      other.attack += gain;
      other.baseAttack += gain;
      log(`${other.name}'s attack rises by ${gain} after ${monster.name} falls.`);
    }
  });
}

function maybeMultiplyMonsterOnHit(monster) {
  const skill = getMonsterSkill(monster, "multiplyOnDamage");
  if (!skill || monster.hp <= 0 || !enemySkillTriggers(skill)) {
    return;
  }
  if (Math.random() * 100 >= Number(skill.value ?? 0)) {
    return;
  }
  const destination = getOpenFloorNeighbors(monster)[0];
  if (!destination) {
    return;
  }
  const clone = {
    ...JSON.parse(JSON.stringify(monster)),
    x: destination.x,
    y: destination.y,
    hp: Math.max(1, Math.ceil(monster.hp / 2)),
  };
  game.monsters.push(clone);
  log(`${monster.name} multiplies!`);
}

function handleHealingItemEnemySkill(healAmount) {
  if (healAmount <= 0) {
    return;
  }
  game.monsters.slice().forEach((monster) => {
    const skill = getMonsterSkill(monster, "hurtByHealingItems");
    if (!skill || !enemySkillTriggers(skill)) {
      return;
    }
    const damage = Math.max(1, Number(skill.value ?? healAmount));
    monster.hp -= damage;
    log(`${monster.name} is scorched by healing for ${damage} damage.`);
    if (monster.hp <= 0) {
      applyEnemyDeathSkillEffects(monster);
      const index = game.monsters.indexOf(monster);
      if (index >= 0) {
        game.monsters.splice(index, 1);
      }
      trackGoalKill(monster);
      awardXp(monster.xp, monster.name);
      trackRunStat("monstersDefeated");
      log(`The ${monster.name} is defeated.`);
      dropEnemyLoot(monster);
      checkCustomGoalCompletion();
    }
  });
}

function chooseItemId(recipe, random) {
  const itemId = chooseItemIdFromPools(recipe, random);
  const fallbackRule = getSpawnableItemPoolRules(recipe).find((rule) => rule.enabled);
  return itemId ?? fallbackRule?.itemId ?? "goldBundle";
}

function chooseItemIdFromAllowedCategories(recipe, random, allowedCategories = []) {
  const categorySet = new Set(allowedCategories);
  const eligibleRules = getSpawnableItemPoolRules(recipe).filter((rule) => (
    rule.enabled &&
    categorySet.has(getItemCategoryId(rule.itemId))
  ));
  if (eligibleRules.length === 0) {
    return null;
  }
  return eligibleRules[Math.floor(random() * eligibleRules.length)]?.itemId ?? null;
}

function chooseItemIdFromPools(recipe, random) {
  const enabledRules = getSpawnableItemPoolRules(recipe).filter((rule) => rule.enabled);
  const enabledIds = new Set(enabledRules.map((rule) => rule.itemId));
  const fromPool = (pool) => {
    const filtered = pool.filter((itemId) => enabledIds.has(itemId));
    return filtered.length > 0 ? filtered[Math.floor(random() * filtered.length)] : null;
  };
  const rareChance = recipe.rareRate * 4;
  const roll = random() * 100;

  if (roll < 16) {
    return "goldBundle";
  }

  if (roll < rareChance) {
    const rarePool = ["royalSword", "towerShield", "vitalityBracelet", "feastRice", "shieldScroll", "lightningStaff"];
    return fromPool(rarePool) ?? fromPool([...enabledIds]);
  }
  if (roll < rareChance + 18) {
    const uncommonPool = ["ironSword", "buckler", "trapguardBracelet", "uncurseScroll", "swordScroll", "fireStaff", "waterStaff"];
    return fromPool(uncommonPool) ?? fromPool([...enabledIds]);
  }
  if (roll < rareChance + 30) {
    return "goldBundle";
  }
  if (random() < 0.22) {
    return fromPool(["dagger", "shield"]) ?? fromPool([...enabledIds]);
  }
  const commonPool = random() < 0.55
    ? ["bitterGrass", "mossGrass", "emberGrass"]
    : random() < 0.65 ? ["apple", "ration"] : ["trapScroll"];
  return fromPool(commonPool) ?? fromPool([...enabledIds]);
}

function getSpawnableItemPoolRules(recipe) {
  return normalizeItemPoolRules(recipe.itemPoolRules).filter((rule) => (
    !rule.deleted && (recipe?.hungerEnabled === true || itemDefinitions[rule.itemId]?.kind !== "food")
  ));
}

function createItemInstance(itemId, cursed = false, rarity = null, overrides = null) {
  const instance = {
    itemId,
    cursed,
    blessed: Boolean(overrides?.blessed),
    curseRevealed: false,
    identified: Boolean(overrides?.identified),
    pinned: Boolean(overrides?.pinned),
    upgradeLevel: Math.max(MIN_ITEM_UPGRADE, Math.min(MAX_ITEM_UPGRADE, Number(overrides?.upgradeLevel ?? 0))),
  };
  if (rarity) {
    instance.rarity = rarity;
  }
  const runeIds = Array.isArray(overrides?.runeIds)
    ? overrides.runeIds
    : overrides?.runeId
      ? [overrides.runeId]
      : [];
  if (runeIds.length > 0) {
    instance.runeIds = [...new Set(runeIds)];
  }
  const specialAttackIds = Array.isArray(overrides?.specialAttackIds)
    ? overrides.specialAttackIds
    : overrides?.specialAttackId
      ? [overrides.specialAttackId]
      : [];
  if (specialAttackIds.length > 0) {
    instance.specialAttackIds = [...new Set(specialAttackIds)];
  }
  if (overrides?.unknownName) {
    instance.unknownName = overrides.unknownName;
  }
  if (Array.isArray(overrides?.deductionOptions)) {
    instance.deductionOptions = [...overrides.deductionOptions];
  }
  if (Array.isArray(overrides?.effects)) {
    instance.effects = overrides.effects.map((effect) => ({ ...effect }));
  }
  if (overrides?.attack !== undefined) {
    instance.attack = Math.max(0, Number(overrides.attack));
  }
  if (overrides?.defense !== undefined) {
    instance.defense = Math.max(0, Number(overrides.defense));
  }
  if (overrides?.scrollEffect !== undefined) {
    instance.scrollEffect = String(overrides.scrollEffect);
  }
  if (overrides?.charges !== undefined) {
    instance.charges = Math.max(0, Number(overrides.charges));
  }
  if (overrides?.stringEffect !== undefined) {
    instance.stringEffect = String(overrides.stringEffect);
  }
  if (overrides?.uses !== undefined) {
    instance.uses = Math.max(1, Number(overrides.uses));
    instance.stringUsesRemaining = Math.max(0, Number(overrides.stringUsesRemaining ?? overrides.uses));
  }
  if (Array.isArray(overrides?.storedItems)) {
    instance.storedItems = overrides.storedItems.map((stored) => ({ ...stored }));
  }
  if (overrides?.heal !== undefined) {
    instance.heal = Math.max(0, Number(overrides.heal));
  }
  if (overrides?.attackBuff !== undefined) {
    instance.attackBuff = Number(overrides.attackBuff);
  }
  if (overrides?.defenseBuff !== undefined) {
    instance.defenseBuff = Number(overrides.defenseBuff);
  }
  if (overrides?.duration !== undefined) {
    instance.duration = Math.max(0, Number(overrides.duration));
  }
  if (overrides?.hungerFill !== undefined) {
    instance.hungerFill = Math.max(0, Number(overrides.hungerFill));
  }
  if (overrides?.negateTraps !== undefined) {
    instance.negateTraps = Boolean(overrides.negateTraps);
  }
  if (overrides?.maxHpBonus !== undefined) {
    instance.maxHpBonus = Math.max(0, Number(overrides.maxHpBonus));
  }
  if (overrides?.maxHungerBonus !== undefined) {
    instance.maxHungerBonus = Math.max(0, Number(overrides.maxHungerBonus));
  }
  if (overrides?.scrollAmount !== undefined) {
    instance.scrollAmount = Math.max(1, Number(overrides.scrollAmount));
  }
  if (overrides?.sellValue !== undefined) {
    instance.sellValue = Math.max(0, Number(overrides.sellValue));
  }
  if (overrides?.buyValue !== undefined) {
    instance.buyValue = Math.max(0, Number(overrides.buyValue));
  }
  if (overrides?.explosionPercent !== undefined) {
    instance.explosionPercent = clampNumber(overrides.explosionPercent, 0, 100, 20);
  }
  if (Array.isArray(overrides?.eligibleCategories)) {
    instance.eligibleCategories = [...new Set(overrides.eligibleCategories.filter((categoryId) => typeof categoryId === "string" && categoryId.trim()))];
  }
  if (overrides?.gold !== undefined) {
    instance.gold = Math.max(0, Math.round(Number(overrides.gold)));
  }
  return instance;
}

function sleep(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

async function playMeleeAttackAnimation(target, victimType = "monster") {
  if (!target) {
    return;
  }
  game.animatingMelee = true;
  game.attackFx = { x: target.x, y: target.y, victimType };
  game.hitFx = null;
  render();
  await sleep(65);

  for (let step = 0; step < 3; step += 1) {
    game.hitFx = { x: target.x, y: target.y, victimType, hidden: true };
    render();
    await sleep(42);
    game.hitFx = { x: target.x, y: target.y, victimType, hidden: false };
    if (step === 0) {
      game.attackFx = null;
    }
    render();
    await sleep(34);
  }

  game.attackFx = null;
  game.hitFx = null;
  game.animatingMelee = false;
  render();
}

function createSpawnedItem(recipe, itemId, random) {
  let overrides = {};
  if (arguments.length > 3 && typeof arguments[3] === "object" && arguments[3] !== null) {
    overrides = arguments[3];
  }
  if (itemId === "goldBundle") {
    return createItemInstance(itemId, false, null, { gold: rollGoldBundleAmount(recipe, random) });
  }
  const curseRate = Math.max(0, Math.min(100, recipe.curseRate ?? 0));
  const rule = normalizeItemPoolRules(recipe.itemPoolRules).find((entry) => entry.itemId === itemId);
  const blessedRate = Math.max(0, Math.min(100, recipe.blessedRate ?? 0));
  const blessed = isBlessableItem(itemDefinitions[itemId]) && random() * 100 < blessedRate;
  const forcedRarity = typeof overrides.rarity === "string" ? overrides.rarity : null;
  const rolledRarity = forcedRarity ?? rollSpawnedItemRarity(recipe, itemId, random);
  const rolledUpgradeLevel = overrides?.upgradeLevel !== undefined
    ? Math.max(MIN_ITEM_UPGRADE, Math.min(MAX_ITEM_UPGRADE, Number(overrides.upgradeLevel)))
    : rollSpawnedItemUpgradeLevel(recipe, itemId, random, rolledRarity ?? "common");
  const baseRolledRuneIds = Array.isArray(overrides?.runeIds)
    ? overrides.runeIds
    : rollSpawnedItemRuneIds(recipe, itemId, random, rule?.runeIds ?? []);
  const rarityBonusRuneIds = Array.isArray(overrides?.runeIds)
    ? []
    : rollExtraRarityRuneIds(recipe, rolledRarity ?? "common", random, baseRolledRuneIds);
  const rolledRuneIds = [...new Set([...(baseRolledRuneIds ?? []), ...rarityBonusRuneIds])];
  const rolledSpecialAttackIds = Array.isArray(overrides?.specialAttackIds)
    ? overrides.specialAttackIds
    : rollSpawnedItemSpecialAttackIds(recipe, itemId, random, rule?.specialAttackIds ?? []);
  return initializeItemKnowledge(createItemInstance(
    itemId,
    random() * 100 < curseRate,
    rolledRarity,
    {
      blessed,
      upgradeLevel: rolledUpgradeLevel,
      effects: rule?.effects,
      scrollEffect: rule?.scrollEffect,
      attack: rule?.attack,
      defense: rule?.defense,
      charges: rule?.charges,
      stringEffect: rule?.stringEffect,
      uses: rule?.uses,
      heal: rule?.heal,
      attackBuff: rule?.attackBuff,
      defenseBuff: rule?.defenseBuff,
      duration: rule?.duration,
      hungerFill: rule?.hungerFill,
      negateTraps: rule?.negateTraps,
      maxHpBonus: rule?.maxHpBonus,
      maxHungerBonus: rule?.maxHungerBonus,
      gold: rule?.gold,
      scrollAmount: rule?.scrollAmount,
      sellValue: rule?.sellValue,
      buyValue: rule?.buyValue,
      explosionPercent: rule?.explosionPercent,
      eligibleCategories: rule?.eligibleCategories,
      runeIds: rolledRuneIds,
      specialAttackIds: rolledSpecialAttackIds,
    },
  ), recipe);
}

function rollEnemyDropHandRarity(recipe, random) {
  const activeRarities = normalizeRarityRules(recipe?.rarityRules)
    .filter((rule) => rule.enabled)
    .map((rule) => rule.id);
  if (recipe?.weaponRarityEnabled === false || activeRarities.length === 0) {
    return null;
  }
  return activeRarities[Math.floor(random() * activeRarities.length)] ?? null;
}

function rollGoldBundleAmount(recipe, random) {
  const target = getGoldBundleTarget(recipe?.goldRate);
  const spread = Math.max(2, Math.round(target * 0.22));
  const low = Math.max(1, target - spread);
  const high = target + spread;
  return low + Math.floor(random() * Math.max(1, high - low + 1));
}

function getGoldBundleTarget(value) {
  const slider = clampNumber(value, 0, 100, 20);
  return Math.round(5 + (slider / 100) * 1495);
}

function rollSpawnedItemRarity(recipe, itemId, random) {
  const item = itemDefinitions[itemId];
  if (!item || item.kind !== "hand" || recipe.weaponRarityEnabled === false) {
    return null;
  }

  const tiers = normalizeRarityRules(recipe.rarityRules)
    .filter((rule) => rule.enabled)
    .sort((a, b) => b.multiplier - a.multiplier);

  if (tiers.length === 0) {
    return "common";
  }

  const rarityChance = Math.min(82, 20 + recipe.rareRate * 5.2);
  if (random() * 100 >= rarityChance) {
    return "common";
  }

  const ascendingTiers = [...tiers].sort((a, b) => a.multiplier - b.multiplier);
  const weightedTiers = ascendingTiers.map((tier, index) => ({
    ...tier,
    weight: Math.max(0.18, (ascendingTiers.length - index) * 1.2 / Math.max(1, tier.multiplier - 0.35)),
  }));
  const totalWeight = weightedTiers.reduce((sum, tier) => sum + tier.weight, 0);
  let roll = random() * totalWeight;
  for (const tier of weightedTiers) {
    roll -= tier.weight;
    if (roll <= 0) {
      return tier.id;
    }
  }
  return weightedTiers[weightedTiers.length - 1]?.id ?? "common";
}

function rollSpawnedItemRune(recipe, itemId, random) {
  const item = itemDefinitions[itemId];
  if (!item || item.kind !== "hand") {
    return null;
  }
  const enabledRunes = normalizeRunePoolRules(recipe.runePoolRules).filter((rule) => rule.enabled);
  if (enabledRunes.length === 0) {
    return null;
  }
  const runeChance = Math.min(0.7, 0.12 + (recipe.rareRate ?? 0) * 0.05);
  if (random() >= runeChance) {
    return null;
  }
  return enabledRunes[Math.floor(random() * enabledRunes.length)]?.id ?? null;
}

function rollSpawnedItemUpgradeLevel(recipe, itemId, random, rarityId = "common") {
  const item = itemDefinitions[itemId];
  if (!item || item.kind !== "hand") {
    return 0;
  }
  const rarityBonus = rarityId && rarityId !== "common" ? 1 : 0;
  const chance = Math.min(0.72, 0.16 + (recipe.rareRate ?? 0) * 0.045 + rarityBonus * 0.08);
  if (random() >= chance) {
    return 0;
  }
  const maxUpgrade = Math.max(1, Math.min(12, 1 + Math.floor((recipe.rareRate ?? 0) / 3) + rarityBonus));
  return 1 + Math.floor(random() * maxUpgrade);
}

function rollSpawnedAttachmentIds(eligibleIds = [], random, chance = 0.3) {
  const pool = Array.from(new Set((Array.isArray(eligibleIds) ? eligibleIds : []).filter(Boolean)));
  if (pool.length === 0) {
    return [];
  }
  const perEntryChance = Math.min(0.82, Math.max(0.18, chance));
  const selected = pool.filter(() => random() < perEntryChance);
  if (selected.length > 0) {
    return selected;
  }
  if (random() < Math.min(0.74, perEntryChance + 0.18)) {
    return [pool[Math.floor(random() * pool.length)]];
  }
  return [];
}

function rollExtraRarityRuneIds(recipe, rarityId, random, existingRuneIds = []) {
  if (!rarityId || rarityId === "common") {
    return [];
  }
  const rarityRule = getRarityRule(rarityId, recipe);
  const bonusCount = Math.max(0, Number(rarityRule?.bonusRunes ?? 0));
  if (bonusCount <= 0) {
    return [];
  }
  const blocked = new Set((Array.isArray(existingRuneIds) ? existingRuneIds : []).filter(Boolean));
  const pool = normalizeRunePoolRules(recipe.runePoolRules)
    .filter((rule) => rule.enabled && !blocked.has(rule.id))
    .map((rule) => rule.id);
  const chosen = [];
  while (pool.length > 0 && chosen.length < bonusCount) {
    const index = Math.floor(random() * pool.length);
    const [picked] = pool.splice(index, 1);
    if (picked) {
      chosen.push(picked);
    }
  }
  return chosen;
}

function rollSpawnedItemSpecialAttackIds(recipe, itemId, random, eligibleIds = []) {
  const item = itemDefinitions[itemId];
  if (!item || item.kind !== "hand") {
    return [];
  }
  const chance = 0.12 + (recipe.rareRate ?? 0) * 0.03;
  return rollSpawnedAttachmentIds(eligibleIds, random, chance);
}

function rollSpawnedItemRuneIds(recipe, itemId, random, eligibleIds = []) {
  const item = itemDefinitions[itemId];
  if (!item || item.kind !== "hand") {
    return [];
  }
  const chance = 0.18 + (recipe.rareRate ?? 0) * 0.035;
  return rollSpawnedAttachmentIds(eligibleIds, random, chance);
}

function createStartingItem(recipe, entry) {
  const normalized = normalizeStartingEntry(entry);
  if (!normalized.itemId || !itemDefinitions[normalized.itemId]) {
    return null;
  }
  const rule = normalizeItemPoolRules(recipe.itemPoolRules).find((poolRule) => poolRule.itemId === normalized.itemId);
  const startRuneRandom = makeRandom(hashString(`${recipe.seed}-${normalized.itemId}-${normalized.rarity}-${normalized.cursed}`));
  return initializeItemKnowledge(createItemInstance(
    normalized.itemId,
    normalized.cursed,
    getValidStartingHandRarity(recipe, normalized.itemId, normalized.rarity),
    {
      effects: rule?.effects,
      scrollEffect: rule?.scrollEffect,
      attack: rule?.attack,
      defense: rule?.defense,
      charges: rule?.charges,
      stringEffect: rule?.stringEffect,
      uses: rule?.uses,
      heal: rule?.heal,
      attackBuff: rule?.attackBuff,
      defenseBuff: rule?.defenseBuff,
      duration: rule?.duration,
      hungerFill: rule?.hungerFill,
      negateTraps: rule?.negateTraps,
      maxHpBonus: rule?.maxHpBonus,
      maxHungerBonus: rule?.maxHungerBonus,
      gold: rule?.gold,
      scrollAmount: rule?.scrollAmount,
      sellValue: rule?.sellValue,
      buyValue: rule?.buyValue,
      explosionPercent: rule?.explosionPercent,
      eligibleCategories: rule?.eligibleCategories,
      runeIds: rule?.runeIds ?? [],
      specialAttackIds: rule?.specialAttackIds ?? [],
    },
  ), recipe);
}

function validateStartingLoadout(recipe) {
  const startingEquipment = normalizeStartingEquipment(recipe);
  const equippedCount = recipe.equippedCountsTowardLimit ? getStartingEquipmentCount(startingEquipment) : 0;
  const inventoryCount = normalizeStartingInventory(recipe).length;
  const usedSlots = equippedCount + inventoryCount;
  const limit = recipe.inventoryLimit ?? 12;

  if (usedSlots > limit) {
    return `Run cannot start: starting equipment and inventory use ${usedSlots} / ${limit} inventory spaces. Remove starting items or raise Inventory Spaces.`;
  }

  return "";
}

function getItemId(entry) {
  return typeof entry === "string" ? entry : entry?.itemId;
}

function getItemEffects(entry) {
  const item = typeof entry === "object" && entry ? entry : getItemDefinition(entry);
  if (!item) {
    return [];
  }
  return getItemRuleEffects(item);
}

function getItemDefinition(entry) {
  const itemId = getItemId(entry);
  if (!itemId) {
    return null;
  }
  const base = itemDefinitions[itemId] ?? itemDefinitions.bitterGrass;
  if (typeof entry !== "object" || !entry) {
    return base;
  }
  const upgradeLevel = Math.max(MIN_ITEM_UPGRADE, Math.min(MAX_ITEM_UPGRADE, Number(entry.upgradeLevel ?? 0)));
  const attack = entry.attack ?? base.attack;
  const defense = entry.defense ?? base.defense;
  const nameSuffix = upgradeLevel === 0
    ? ""
    : upgradeLevel > 0
      ? `+${upgradeLevel}`
      : `${upgradeLevel}`;
  return {
    ...base,
    name: `${base.name}${nameSuffix ? ` ${nameSuffix}` : ""}`,
    upgradeLevel,
    attack,
    defense,
    effects: Array.isArray(entry.effects) ? entry.effects.map((effect) => ({ ...effect })) : base.effects,
    scrollEffect: entry.scrollEffect ?? base.scrollEffect,
    charges: entry.charges ?? base.charges,
    stringEffect: entry.stringEffect ?? base.stringEffect,
    uses: entry.uses ?? base.uses,
    stringUsesRemaining: entry.stringUsesRemaining ?? entry.uses ?? base.uses,
    storedItems: Array.isArray(entry.storedItems) ? entry.storedItems.map((stored) => ({ ...stored })) : [],
    heal: entry.heal ?? base.heal,
    attackBuff: entry.attackBuff ?? base.attackBuff,
    defenseBuff: entry.defenseBuff ?? base.defenseBuff,
    duration: entry.duration ?? base.duration,
    hungerFill: entry.hungerFill ?? base.hungerFill,
    negateTraps: entry.negateTraps ?? base.negateTraps,
    maxHpBonus: entry.maxHpBonus ?? base.maxHpBonus,
    maxHungerBonus: entry.maxHungerBonus ?? base.maxHungerBonus,
    scrollAmount: entry.scrollAmount ?? base.scrollAmount,
    sellValue: entry.sellValue ?? base.sellValue,
    buyValue: entry.buyValue ?? base.buyValue,
    explosionPercent: entry.explosionPercent ?? base.explosionPercent,
    eligibleCategories: entry.eligibleCategories ?? base.eligibleCategories,
    gold: entry.gold ?? base.gold,
  };
}

function getEntryBuyValue(entry) {
  const item = getItemDefinition(entry);
  if (!item) {
    return 40;
  }
  let baseValue;
  if (Number.isFinite(Number(item.buyValue)) && Number(item.buyValue) > 0) {
    baseValue = Math.max(0, Math.round(Number(item.buyValue)));
  } else if (item.kind === "hand") {
    baseValue = 120 + (getEffectiveStat(item, "attack") + getEffectiveStat(item, "defense")) * 55;
  } else if (item.kind === "staff") {
    baseValue = 90 + (item.attack || 0) * 35 + (item.charges || 0) * 20;
  } else if (item.kind === "bracelet") {
    baseValue = 180;
  } else if (item.kind === "scroll") {
    baseValue = 110;
  } else if (item.kind === "string") {
    baseValue = 130;
  } else if (item.kind === "food" || item.kind === "grass") {
    baseValue = 45;
  } else {
    baseValue = 60;
  }
  return entry?.blessed ? baseValue * 2 : baseValue;
}

function getEntrySellValue(entry) {
  const item = getItemDefinition(entry);
  const baseValue = Math.max(0, Math.round(Number(item?.sellValue ?? 0)));
  return entry?.blessed ? baseValue * 2 : baseValue;
}

function getItemWithInstance(entry) {
  const definition = getItemDefinition(entry);
  if (!definition) {
    return null;
  }
  return {
    ...definition,
    rarity: getItemRarity(entry),
    runeIds: typeof entry === "object" ? [...(entry?.runeIds ?? (entry?.runeId ? [entry.runeId] : []))] : [],
    specialAttackIds: typeof entry === "object" ? [...(entry?.specialAttackIds ?? (entry?.specialAttackId ? [entry.specialAttackId] : []))] : [],
  };
}

function getItemRarity(entry) {
  const definition = getItemDefinition(entry);
  if (!definition || definition.kind !== "hand") {
    return null;
  }
  return typeof entry === "object" && entry?.rarity ? entry.rarity : "common";
}

function getActiveRarityRules(recipe = game.recipe) {
  return normalizeRarityRules(recipe?.rarityRules);
}

function getRarityRule(rarityId, recipe = game.recipe) {
  if (!rarityId || rarityId === "common" || recipe?.weaponRarityEnabled === false) {
    return null;
  }
  return getActiveRarityRules(recipe).find((rule) => rule.id === rarityId) ?? null;
}

function hexToRgb(hex) {
  const normalized = normalizeHexColor(hex, "#ffffff").slice(1);
  return {
    r: Number.parseInt(normalized.slice(0, 2), 16),
    g: Number.parseInt(normalized.slice(2, 4), 16),
    b: Number.parseInt(normalized.slice(4, 6), 16),
  };
}

function buildRarityCardStyle(entry) {
  if (!isItemIdentified(entry)) {
    return "";
  }
  const rarityRule = getRarityRule(getItemRarity(entry));
  if (!rarityRule?.color) {
    return "";
  }
  const { r, g, b } = hexToRgb(rarityRule.color);
  const rarityDelay = getLoopAnimationDelay(getRarityEffectDurationMs(rarityRule.effect ?? "none"));
  return [
    `--rarity-border: rgba(${r}, ${g}, ${b}, 0.68)`,
    `--rarity-fill: rgba(${r}, ${g}, ${b}, 0.22)`,
    `--rarity-glow: rgba(${r}, ${g}, ${b}, 0.18)`,
    `--rarity-delay: ${rarityDelay}`,
  ].join("; ");
}

function getRarityEffectClass(entry) {
  if (!isItemIdentified(entry)) {
    return "rarity-effect-none";
  }
  const effect = getRarityRule(getItemRarity(entry))?.effect ?? "none";
  return `rarity-effect-${effect}`;
}

function getLoopAnimationDelay(durationMs) {
  if (!durationMs || durationMs <= 0) {
    return "0s";
  }
  const elapsed = (Date.now() - animationEpochMs) % durationMs;
  return `${-(elapsed / 1000)}s`;
}

function getRarityEffectDurationMs(effect) {
  switch (effect) {
    case "pulse":
      return 1900;
    case "phase":
      return 2500;
    case "fog":
      return 5200;
    case "shimmer":
      return 1700;
    case "surge":
      return 2300;
    case "flicker":
      return 1250;
    case "bloom":
      return 2150;
    default:
      return 0;
  }
}

function chooseTrapRule(recipe, random) {
  const enabledRules = normalizeTrapPoolRules(recipe.trapPoolRules).filter((rule) => rule.enabled && !rule.environmentOnly);
  if (enabledRules.length === 0) {
    return null;
  }
  return enabledRules[Math.floor(random() * enabledRules.length)] ?? enabledRules[0];
}

function getEnvironmentTrapRule(recipe, environmentId = recipe?.environment) {
  if (!recipe || !environmentId) {
    return null;
  }
  return normalizeTrapPoolRules(recipe.trapPoolRules).find((rule) => (
    rule.enabled && rule.environmentOnly && rule.environmentId === environmentId
  )) ?? null;
}

function pointInRoom(position, room) {
  return Boolean(
    position &&
    room &&
    position.x >= room.x &&
    position.x < room.x + room.width &&
    position.y >= room.y &&
    position.y < room.y + room.height
  );
}

function getSpecialRoomById(id) {
  return game.specialRooms.find((room) => room.id === id) ?? null;
}

function getSpecialRoomForRoom(room) {
  return room ? game.specialRooms.find((entry) => entry.roomId === room.id) ?? null : null;
}

function getSpecialRoomAtPosition(position) {
  return getSpecialRoomForRoom(findRoomAt(position));
}

function getShopkeeperRooms() {
  return game.rooms.filter((room) => getSpecialRoomForRoom(room)?.type === "shopkeeper");
}

function chooseNonGoldItemId(recipe, random) {
  for (let attempts = 0; attempts < 12; attempts += 1) {
    const itemId = chooseItemId(recipe, random);
    if (itemDefinitions[itemId]?.kind !== "gold") {
      return itemId;
    }
  }
  return getSpawnableItemPoolRules(recipe).find((rule) => itemDefinitions[rule.itemId]?.kind !== "gold")?.itemId ?? "bitterGrass";
}

function assignSpecialRooms(recipe, rooms, placements) {
  const enabled = normalizeSpecialRooms(recipe.specialRooms).filter((room) => room.enabled);
  if (enabled.length === 0) {
    return [];
  }
  const random = makeRandom(recipe.seed + game.floor * 31271);
  const candidates = rooms
    .filter((room) => !pointInRoom(placements.start, room) && !pointInRoom(placements.exit, room));
  for (let index = candidates.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [candidates[index], candidates[swapIndex]] = [candidates[swapIndex], candidates[index]];
  }

  return enabled.slice(0, candidates.length).map((entry, index) => ({
    id: `${entry.id}_${game.floor}_${index}`,
    roomId: candidates[index].id,
    type: entry.id,
    triggered: false,
    stocked: false,
    introShown: false,
    offer: null,
  }));
}

function prepareBossRoom() {
  if (!game.bossRoom) {
    game.boss = null;
    return;
  }
  clearRoomToPlainFloor(game.bossRoom);
  game.monsters = removeEntitiesInRoom(game.monsters, game.bossRoom);
  game.traps = removeEntitiesInRoom(game.traps, game.bossRoom);
  game.sigils = removeEntitiesInRoom(game.sigils, game.bossRoom);
  game.items = removeEntitiesInRoom(game.items, game.bossRoom, (item) => !item.shopPrice);
  game.boss = createBossEntity(game.recipe, game.bossRoom);
  game.bossRoom.introShown = false;
  game.exit = { ...game.bossRoom.center };
  game.tiles[game.exit.y][game.exit.x] = "floor";
  log(`A boss presence fills the ${game.bossRoom.shape} chamber.`);
}

function removeEntitiesInRoom(collection, room, predicate = () => true) {
  return collection.filter((entity) => !(pointInRoom(entity, room) && predicate(entity)));
}

function getShopPrice(entry) {
  const basePrice = getEntryBuyValue(entry);
  const discountPercent = Math.max(0, Math.min(95, getBraceletEffectMaxValue("shopDiscount", 0)));
  if (discountPercent <= 0) {
    return basePrice;
  }
  return Math.max(1, Math.ceil(basePrice * (1 - (discountPercent / 100))));
}

function getRoomInteriorTiles(room) {
  const tiles = [];
  if (!room) {
    return tiles;
  }
  const minX = room.width > 2 ? room.x + 1 : room.x;
  const maxX = room.width > 2 ? room.x + room.width - 2 : room.x + room.width - 1;
  const minY = room.height > 2 ? room.y + 1 : room.y;
  const maxY = room.height > 2 ? room.y + room.height - 2 : room.y + room.height - 1;
  for (let y = minY; y <= maxY; y += 1) {
    for (let x = minX; x <= maxX; x += 1) {
      tiles.push({ x, y });
    }
  }
  return tiles;
}

function chooseShopkeeperPosition(room) {
  const interiorTiles = getRoomInteriorTiles(room);
  if (interiorTiles.length === 0) {
    return { x: room.center.x, y: room.center.y };
  }
  const doorwayAdjacent = interiorTiles
    .filter((tile) => (
      game.tiles[tile.y - 1]?.[tile.x] === "wall" ||
      game.tiles[tile.y + 1]?.[tile.x] === "wall" ||
      game.tiles[tile.y]?.[tile.x - 1] === "wall" ||
      game.tiles[tile.y]?.[tile.x + 1] === "wall"
    ))
    .sort((a, b) => (
      Math.abs(a.x - room.center.x) + Math.abs(a.y - room.center.y)
      - (Math.abs(b.x - room.center.x) + Math.abs(b.y - room.center.y))
    ));
  return doorwayAdjacent[0] ?? { x: room.center.x, y: room.center.y };
}

function getShopMerchandisePositions(room, shopkeeperPos, count) {
  return getRoomInteriorTiles(room)
    .filter((tile) => !(tile.x === shopkeeperPos.x && tile.y === shopkeeperPos.y))
    .sort((a, b) => (
      Math.abs(a.x - room.center.x) + Math.abs(a.y - room.center.y)
      - (Math.abs(b.x - room.center.x) + Math.abs(b.y - room.center.y))
    ))
    .slice(0, count);
}

function clearRoomToPlainFloor(room) {
  if (!room) {
    return;
  }
  for (let y = room.y; y < room.y + room.height; y += 1) {
    for (let x = room.x; x < room.x + room.width; x += 1) {
      if (game.tiles[y]?.[x] && game.tiles[y][x] !== "wall") {
        game.tiles[y][x] = "floor";
      }
    }
  }
}

function stockShopRoom(specialRoom, random) {
  if (!specialRoom || specialRoom.stocked) {
    return;
  }
  const room = game.rooms.find((entry) => entry.id === specialRoom.roomId);
  if (!room) {
    return;
  }
  clearRoomToPlainFloor(room);
  game.monsters = removeEntitiesInRoom(game.monsters, room);
  game.traps = removeEntitiesInRoom(game.traps, room);
  game.sigils = removeEntitiesInRoom(game.sigils, room);
  game.items = removeEntitiesInRoom(game.items, room, (item) => !item.shopPrice);
  specialRoom.shopkeeperPos = chooseShopkeeperPosition(room);
  const occupied = [game.player, game.exit, ...game.monsters, ...game.items, ...game.traps];
  occupied.push(specialRoom.shopkeeperPos);
  const stockCount = 3;
  const merchandisePositions = getShopMerchandisePositions(room, specialRoom.shopkeeperPos, stockCount);
  for (let index = 0; index < stockCount; index += 1) {
    const position = merchandisePositions[index];
    if (!position) {
      continue;
    }
    occupied.push(position);
    const itemId = chooseNonGoldItemId(game.recipe, random);
    const item = createSpawnedItem({ ...game.recipe, curseRate: 0 }, itemId, random);
    game.items.push({
      ...position,
      ...item,
      shopPrice: getShopPrice(item),
      shopRoomId: specialRoom.id,
    });
  }
  specialRoom.stocked = true;
}

function prepareGamblingRoom(specialRoom) {
  if (!specialRoom || specialRoom.totemPos) {
    return;
  }
  const room = game.rooms.find((entry) => entry.id === specialRoom.roomId);
  if (!room) {
    return;
  }
  specialRoom.totemPos = { x: room.center.x, y: room.center.y };
  const random = makeRandom(game.recipe.seed + game.floor * 27191 + room.x * 19 + room.y * 23);
  specialRoom.totemUses = 2 + Math.floor(random() * 2);
  specialRoom.totemUsesRemaining = specialRoom.totemUses;
  game.monsters = removeEntitiesInRoom(game.monsters, room);
  game.traps = removeEntitiesInRoom(game.traps, room);
  game.sigils = removeEntitiesInRoom(game.sigils, room);
}

function rollGamblingOffer(specialRoom) {
  const seed = game.recipe.seed + game.floor * 51031 + (game.runStats?.turns ?? 0) * 37 + game.player.x * 7 + game.player.y * 11;
  const random = makeRandom(seed);
  specialRoom.offer = {
    winChance: 20 + Math.floor(random() * 56),
    multiplier: 2,
  };
  return specialRoom.offer;
}

function prepareSpecialRooms() {
  const random = makeRandom(game.recipe.seed + game.floor * 31271 + 91);
  game.specialRooms.forEach((room) => {
    if (room.type === "shopkeeper") {
      stockShopRoom(room, random);
    }
    if (room.type === "gamblingRoom") {
      prepareGamblingRoom(room);
    }
  });
  if (game.bossRoom) {
    prepareBossRoom();
  }
}

function createTrapInstance(rule, position) {
  if (!rule || !position) {
    return null;
  }
  return {
    x: position.x,
    y: position.y,
    trapId: rule.id,
    name: rule.name,
    effectType: rule.effectType,
    value1: rule.value1,
    value2: rule.value2,
    uses: rule.uses,
    remainingUses: rule.uses,
    design: rule.design ?? "caret",
    visible: trapsStartVisible(),
  };
}

function getTrapDesignOption(designId = "caret") {
  return trapDesignOptions.find((option) => option.id === designId) ?? trapDesignOptions[0];
}

function createSigilInstance(rule, position) {
  if (!rule || !position) {
    return null;
  }
  return {
    x: position.x,
    y: position.y,
    sigilId: rule.id,
    name: rule.name,
    effectType: rule.effectType,
    value1: rule.value1,
    value2: rule.value2,
    uses: rule.uses,
    remainingUses: rule.uses,
    visible: sigilsStartVisible(),
  };
}

function populateFloor() {
  const recipe = game.recipe;
  const random = makeRandom(recipe.seed + game.floor * 17737);
  const occupied = [game.player, game.exit, ...(game.environmentTrapPositions ?? [])];
  const floorPressure = 1 + game.floor / recipe.floors;
  const enemyPool = normalizeEnemyPoolRules(recipe.enemyPoolRules);
  const hasEnabledEnemies = enemyPool.some((family) => family.levels.some((level) => level.enabled));
  const monsterCap = Math.max(1, recipe.monsterLimit ?? 12);
  const monsterCount = hasEnabledEnemies ? Math.min(monsterCap, Math.max(1, Math.round(recipe.monsterRate * floorPressure))) : 0;
  const itemCount = Math.max(1, Math.round(recipe.itemRate * 0.75));
  const enabledTraps = normalizeTrapPoolRules(recipe.trapPoolRules).filter((rule) => rule.enabled && !rule.environmentOnly);
  const trapCount = enabledTraps.length > 0 ? Math.round(recipe.trapRate * floorPressure) : 0;
  const enabledSigils = normalizeSigilPoolRules(recipe.sigilPoolRules).filter((rule) => rule.enabled);
  const sigilCount = enabledSigils.length > 0 ? Math.round(recipe.sigilRate ?? 0) : 0;

  const shopkeeperRooms = getShopkeeperRooms();
  const spawnableMonsterRooms = game.rooms.filter((room) => !shopkeeperRooms.includes(room) && room.id !== game.bossRoom?.id);

  game.monsters = Array.from({ length: monsterCount }, () => {
    const monsterVariant = chooseMonsterVariant(recipe, game.floor, random);
    if (!monsterVariant) {
      return null;
    }
    const monster = spawnableMonsterRooms.length > 0
      ? randomRoomPositionFromRooms(random, spawnableMonsterRooms, occupied)
      : randomOpenPosition(random, occupied);
    if (!monster) {
      return null;
    }
    occupied.push(monster);
    return { ...monster, ...createMonster(monsterVariant) };
  }).filter(Boolean);

  game.items = Array.from({ length: itemCount }, () => {
    const item = randomRoomPosition(random, occupied);
    if (!item) {
      return null;
    }
    occupied.push(item);
    const itemId = chooseItemId(recipe, random);
    return { ...item, ...createSpawnedItem(recipe, itemId, random) };
  }).filter(Boolean);

  applySpawnMonsterDisguises();

  game.traps = Array.from({ length: trapCount }, () => {
    const position = randomRoomPosition(random, occupied);
    const trapRule = chooseTrapRule(recipe, random);
    if (!position || !trapRule) {
      return null;
    }
    occupied.push(position);
    return createTrapInstance(trapRule, position);
  }).filter(Boolean);

  const environmentTrapRule = getEnvironmentTrapRule(recipe, getBoardEnvironmentId(game.floorEnvironmentId ?? getFloorEnvironment(recipe, game.floor)));
  if (environmentTrapRule && Array.isArray(game.environmentTrapPositions)) {
    const environmentTraps = game.environmentTrapPositions
      .filter((position) => position && !game.items.some((item) => item.x === position.x && item.y === position.y))
      .map((position) => createTrapInstance(environmentTrapRule, position))
      .filter(Boolean);
    game.traps.push(...environmentTraps);
  }

  game.sigils = Array.from({ length: sigilCount }, () => {
    const position = randomRoomPosition(random, occupied);
    const sigilRule = chooseSigilRule(recipe, random);
    if (!position || !sigilRule) {
      return null;
    }
    occupied.push(position);
    return createSigilInstance(sigilRule, position);
  }).filter(Boolean);
}

function startRun(recipe = readRecipe(), publishedId = null) {
  recipe = normalizeRecipeData(recipe);
  stopThemeMusic();
  setRecipeExtended(false);
  const loadoutError = validateStartingLoadout(recipe);
  if (loadoutError) {
    log(loadoutError, "error");
    return false;
  }

  game.recipe = recipe;
  game.floor = 1;
  game.ended = false;
  game.lastRunSummary = null;
  game.goalSatisfied = false;
  game.runStats = makeRunStats();
  game.identifiedItemIds = new Set();
  game.usedUnknownItemNames = new Set();
  game.logSequence = 0;
  game.logEventCounter = 0;
  game.playerHitStreak = 0;
  game.playerMissStreak = 0;
  game.playerWalkSteps = 0;
  game.processingTurn = false;
  game.lastRunLogDividerTurn = null;
  game.reviveCharges = 0;
  game.inventory = normalizeStartingInventory(recipe)
    .map((entry) => createStartingItem(recipe, entry))
    .filter(Boolean);
  game.equipment = {
    leftHand: null,
    rightHand: null,
    bracelet1: null,
    bracelet2: null,
  };
  game.buffs = [];
  const startingStats = normalizeStartingStats(recipe);
  game.gold = startingStats.gold;
  game.activePublishedId = publishedId;
  game.currentEnvironmentalEffect = null;
  game.hungerMax = getPlayerMaxHunger();
  game.hunger = game.hungerMax;
  game.hungerStepCounter = 0;
  game.passiveHealBlockedThisTurn = false;
  game.pendingUpgradeChoice = null;
  game.pendingStringAction = null;
  game.pendingCast = null;
  clearPendingSpecialAttack();
  game.level = 1;
  game.xp = 0;
  game.levelBonuses = { hp: 0, attack: 0, defense: 0, accuracy: 0, hunger: 0 };
  game.permanentBonuses = { maxHp: 0, attack: 0, defense: 0, maxHunger: 0, inventory: 0 };
  game.conditionalOverrides = { maxHp: null, maxHunger: null };
  const startingEquipment = normalizeStartingEquipment(recipe);
  Object.entries(startingEquipment).forEach(([slot, equipmentEntry]) => {
    const entry = createStartingItem(recipe, equipmentEntry);
    if (entry) {
      equipItem(entry, false, true, slot, { playSound: false });
    }
  });
  game.hp = getPlayerMaxHp();
  game.hp = Math.min(game.hp, startingStats.hp);
  shareCode.value = encodeRecipe(recipe);
  logList.innerHTML = "";
  log(`Started "${recipe.name}" with ${recipe.floors} floors.`);
  startThemeMusic();
  generateFloor();
  checkCustomGoalCompletion();
  return true;
}

function generateFloor() {
  const bossSettings = normalizeBossRoomSettings(game.recipe.bossRoom);
  const bossFloor = isBossRoomFloor(game.recipe, game.floor);
  const layout = bossFloor
    ? makeDedicatedBossFloorLayout(game.recipe, game.floor)
    : makeFloorLayout(game.recipe, game.floor);
  const placements = bossFloor
    ? chooseBossFloorPlacements(layout.rooms[0], bossSettings.bossSize)
    : chooseStartAndExit(layout.rooms);
  const bossRoom = bossFloor ? layout.rooms[0] : null;
  game.floorEnvironmentId = getFloorEnvironment(game.recipe, game.floor);
  game.currentEnvironmentalEffect = chooseFloorEnvironmentalEffect(game.recipe, game.floor);
  game.monsterRespawnCharge = 0;
  game.lastMonsterRespawnRoomId = null;
  game.tiles = layout.tiles;
  game.rooms = layout.rooms;
  game.environmentTrapPositions = layout.environmentTrapPositions ?? [];
  game.bossRoom = bossRoom;
  game.boss = null;
  game.specialRooms = bossFloor ? [] : assignSpecialRooms(game.recipe, layout.rooms, placements);
  game.floorWidth = layout.width;
  game.floorHeight = layout.height;
  game.player = placements.start;
  game.exit = bossRoom ? { ...bossRoom.center } : placements.exit;
  game.tiles[game.exit.y][game.exit.x] = "floor";
  game.tiles[game.player.y][game.player.x] = "floor";
  game.revealed = makeVisibilityGrid(game.floorWidth, game.floorHeight, false);
  game.visible = makeVisibilityGrid(game.floorWidth, game.floorHeight, false);
  updateViewport(true);
  revealCurrentView();
  if (!bossFloor) {
    populateFloor();
  } else {
    game.monsters = [];
    game.items = [];
    game.traps = [];
    game.sigils = [];
  }
  prepareSpecialRooms();
  updateDeepestFloorStat();
  announceFloorEnvironmentalEffect();
  render();
}

function endRun(result) {
  if (game.ended && result !== "clear") {
    return;
  }
  if (result === "collapse" && tryConsumeReviveCharge()) {
    return;
  }

  game.ended = true;
  stopThemeMusic();
  if (result === "clear") {
    playSoundEffect("dungeonClear");
  } else if (result === "collapse") {
    playSoundEffect("playerDeath");
  }
  game.lastRunSummary = buildRunSummary(result);
  updatePublishedRunStats(result);
}

function render() {
  clearBossGlyphOverlay();
  board.innerHTML = "";
  board.classList.toggle("no-grid", game.recipe?.hideGridlines ?? false);
  const floorEnvironmentKey = game.floorEnvironmentId ?? getFloorEnvironment(game.recipe, game.floor);
  const floorEnvironmentId = getBoardEnvironmentId(floorEnvironmentKey);
  board.dataset.environment = floorEnvironmentId;
  const customEnvironment = isCustomEnvironmentKey(floorEnvironmentKey)
    ? (getCustomEnvironmentById(game.recipe, getCustomEnvironmentIdFromKey(floorEnvironmentKey)) ?? normalizeCustomEnvironment({}))
    : normalizeCustomEnvironment({});
  board.style.setProperty("--custom-floor-image", customEnvironment.floorImage ? `url("${customEnvironment.floorImage}")` : "none");
  board.style.setProperty("--custom-background-image", customEnvironment.backgroundImage ? `url("${customEnvironment.backgroundImage}")` : "none");
  updateViewport();
  floorLabel.textContent = `Floor ${game.floor} / ${game.recipe?.floors ?? controls.floors.value}`;
  floorHudLabel.textContent = `${game.floor} / ${game.recipe?.floors ?? controls.floors.value}`;
  const pendingSpecialAttack = getPendingSpecialAttack();
  const specialAttackPreviewKeys = getSpecialAttackPreviewKeys();
  statusLabel.textContent = game.pendingCast
    ? "Choose a cast direction with WASD or arrow keys."
    : pendingSpecialAttack
      ? `Previewing ${pendingSpecialAttack.name}. Press Q again to strike, or Esc to cancel.`
    : game.ended
      ? "Run finished"
      : game.recipe
        ? game.recipe.name
        : "Tune a recipe, then generate.";
  hpLabel.textContent = `${game.hp} / ${getPlayerMaxHp()}`;
  attackLabel.textContent = getPlayerAttack();
  defenseLabel.textContent = getPlayerDefense();
  goldLabel.textContent = `${game.gold}`;
  levelHud.classList.toggle("hidden", !levelingEnabled());
  xpHud.classList.toggle("hidden", !levelingEnabled());
  levelLabel.textContent = `${game.level}`;
  const nextLevelXp = getNextLevelXp();
  xpLabel.textContent = nextLevelXp === null ? `${game.xp} / MAX` : `${game.xp} / ${nextLevelXp}`;
  hungerHud.classList.toggle("hidden", game.recipe?.hungerEnabled !== true);
  hungerLabel.textContent = `${Math.max(0, game.hunger)} / ${game.hungerMax}`;
  floorEffectLabel.textContent = summarizeCurrentEnvironmentalEffect();
  goalLabel.textContent = getGoalSummary();
  renderInventoryMenu();
  renderEndScreen();

  for (let viewY = 0; viewY < VIEW_HEIGHT; viewY += 1) {
    for (let viewX = 0; viewX < VIEW_WIDTH; viewX += 1) {
      const x = game.viewport.x + viewX;
      const y = game.viewport.y + viewY;
      const tile = document.createElement("div");
      const revealed = isRevealed(x, y);
      const visible = isVisible(x, y);
      tile.className = "tile unknown";
      tile.textContent = "";

      if (!revealed) {
        if (specialAttackPreviewKeys.has(`${x},${y}`)) {
          tile.classList.add("special-attack-preview");
        }
        board.append(tile);
        continue;
      }

      const borderClasses = getDungeonBorderClasses(x, y).join(" ");
      tile.className = `tile ${visible ? "visible" : "explored"} ${game.tiles[y]?.[x] === "wall" ? "wall" : ""} ${borderClasses}`;
      const trap = game.traps.find((entity) => entity.x === x && entity.y === y);
      const sigil = game.sigils.find((entity) => entity.x === x && entity.y === y);
        const item = game.items.find((entity) => entity.x === x && entity.y === y);
        const monster = game.monsters.find((entity) => entity.x === x && entity.y === y);
        const boss = bossOccupies(x, y) ? game.boss : null;
        const specialRoom = getSpecialRoomAtPosition({ x, y });
        const isShopkeeper = Boolean(
          specialRoom?.type === "shopkeeper" &&
          specialRoom.shopkeeperPos?.x === x &&
          specialRoom.shopkeeperPos?.y === y
        );
        const isGamblingTotem = Boolean(
          specialRoom?.type === "gamblingRoom" &&
          specialRoom.totemPos?.x === x &&
          specialRoom.totemPos?.y === y
        );
        const projectile = game.projectile && game.projectile.x === x && game.projectile.y === y;
        const isPlayer = game.player.x === x && game.player.y === y;
        const isExit = game.exit.x === x && game.exit.y === y;

      if (game.tiles[y][x] !== "wall" && game.recipe) {
        const environment = environmentGlyphs[floorEnvironmentId] ?? environmentGlyphs.ruins;
        const tileType = game.tiles[y][x];
        const tileClass = tileType === "floor" ? environment.className : tileType;
        if (tileClass) {
          tile.classList.add(tileClass);
        }
        if (specialRoom?.type === "shopkeeper") {
          tile.classList.add("shop-floor");
        }
        tile.textContent = featureGlyphs[tileType] ?? environment.hazard;
      }
      if (isExit && !isBossAlive()) {
        tile.className = `tile ${visible ? "visible" : "explored"} exit ${borderClasses}`;
        tile.textContent = ">";
      }
      if (visible && trap && (trap.visible || hasEquippedEffect("seeTraps"))) {
        const trapDesign = getTrapDesignOption(trap.design);
        tile.className = `tile visible trap ${trapDesign.className} ${borderClasses}`;
        tile.textContent = trapDesign.glyph;
      }
      if (visible && sigil?.visible && !trap) {
        tile.className = `tile visible sigil ${borderClasses}`;
        tile.textContent = "+";
      }
        if (visible && specialRoom) {
          const room = game.rooms.find((entry) => entry.id === specialRoom.roomId);
          if (
            room &&
            specialRoom.type !== "monsterHouse" &&
            ((room.center.x === x && room.center.y === y) || isGamblingTotem) &&
            !trap &&
            !item &&
            !monster &&
            !isExit
          ) {
            tile.className = `tile visible special-room ${borderClasses}`;
            tile.textContent = specialRoomDefinitions[specialRoom.type]?.glyph ?? "!";
          }
        }
        if (visible && item) {
          const itemDefinition = itemDefinitions[item.itemId] ?? itemDefinitions.bitterGrass;
          tile.className = `tile visible item ${item.shopPrice ? "shop-item" : ""} ${borderClasses}`.trim();
          tile.textContent = getItemIcon(itemDefinition);
        }
        if (visible && monster && !monster.hiddenUntilNear) {
          tile.className = `tile visible monster ${borderClasses}`;
          tile.textContent = monster.glyph;
        }
        if (visible && boss) {
          tile.className = `tile visible monster boss ${borderClasses}`;
          tile.dataset.boss = "true";
          tile.textContent = "";
        }
        if (visible && projectile) {
          tile.className = `tile visible projectile ${borderClasses}`;
          tile.textContent = "●";
        }
        if (isPlayer) {
          tile.className = `tile visible player ${borderClasses}`;
          tile.textContent = "@";
        } else if (visible && isShopkeeper && !item && !monster && !trap && !isExit && !projectile) {
          tile.className = `tile visible shopkeeper ${borderClasses}`;
          tile.textContent = "$";
        } else if (visible && isGamblingTotem && !item && !monster && !trap && !isExit && !projectile) {
          tile.className = `tile visible special-room ${borderClasses}`;
          tile.textContent = "T";
      }
      if (!isPlayer && specialAttackPreviewKeys.has(`${x},${y}`)) {
        tile.classList.add("special-attack-preview");
      }
      if (game.attackFx?.x === x && game.attackFx?.y === y) {
        tile.classList.add("melee-slash");
      }
      if (game.hitFx?.x === x && game.hitFx?.y === y) {
        tile.classList.add("hit-flicker");
        if (game.hitFx.hidden) {
          tile.classList.add("hit-flicker-hidden");
        }
      }

      board.append(tile);
    }
  }

  renderBossGlyphOverlay();
}

function updateViewport(force = false) {
  if (!game.recipe) {
    game.viewport = { x: 0, y: 0 };
    return;
  }

  const maxX = Math.max(0, game.floorWidth - VIEW_WIDTH);
  const maxY = Math.max(0, game.floorHeight - VIEW_HEIGHT);
  const mode = game.recipe.cameraMode ?? "center";

  if (mode === "screen") {
    const nextX = clamp(Math.floor(game.player.x / VIEW_WIDTH) * VIEW_WIDTH, 0, maxX);
    const nextY = clamp(Math.floor(game.player.y / VIEW_HEIGHT) * VIEW_HEIGHT, 0, maxY);
    if (force || nextX !== game.viewport.x || nextY !== game.viewport.y) {
      game.viewport = { x: nextX, y: nextY };
    }
    return;
  }

  game.viewport = {
    x: clamp(game.player.x - Math.floor(VIEW_WIDTH / 2), 0, maxX),
    y: clamp(game.player.y - Math.floor(VIEW_HEIGHT / 2), 0, maxY),
  };
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function getDungeonBorderClasses(x, y) {
  if (!isPlayableTile(x, y)) {
    return [];
  }

  return [
    !isPlayableTile(x, y - 1) ? "edge-top" : "",
    !isPlayableTile(x + 1, y) ? "edge-right" : "",
    !isPlayableTile(x, y + 1) ? "edge-bottom" : "",
    !isPlayableTile(x - 1, y) ? "edge-left" : "",
  ].filter(Boolean);
}

function isPlayableTile(x, y) {
  return Boolean(game.tiles[y]?.[x] && game.tiles[y][x] !== "wall");
}

function titleCase(value) {
  return value.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function summarizeCurrentEnvironmentalEffect() {
  if (!game.currentEnvironmentalEffect) {
    return "None";
  }
  const definition = environmentalEffectDefinitions[game.currentEnvironmentalEffect.id];
  if (game.currentEnvironmentalEffect.id === "randomWarp") {
    const parts = [];
    if (game.currentEnvironmentalEffect.affectsPlayer) {
      parts.push(`P:${game.currentEnvironmentalEffect.playerTurns}`);
    }
    if (game.currentEnvironmentalEffect.affectsEnemy) {
      parts.push(`E:${game.currentEnvironmentalEffect.enemyTurns}`);
    }
    return `${definition.name} (${parts.join("/")})`;
  }
  if (game.currentEnvironmentalEffect.id === "randomItemDrop") {
    return `${definition.name} (P:${game.currentEnvironmentalEffect.playerTurns})`;
  }
  if (game.currentEnvironmentalEffect.id === "conditionalItemUse") {
    return `${definition.name} (${describeConditionalItemUseAction(game.currentEnvironmentalEffect)})`;
  }
  const targets = [
    game.currentEnvironmentalEffect.affectsPlayer ? "P" : "",
    game.currentEnvironmentalEffect.affectsEnemy ? "E" : "",
  ].filter(Boolean).join("/");
  return `${definition.name} (${targets})`;
}

function getPlayerAttack() {
  const hands = getEquippedItems(["leftHand", "rightHand"]);
  const buffAttack = game.buffs.reduce((total, buff) => total + (buff.attack || 0), 0);
  return (game.recipe?.startingStats?.attack ?? 2) + (game.levelBonuses?.attack ?? 0) + (game.permanentBonuses?.attack ?? 0) + getBraceletStrengthBonus() + hands.reduce((total, item) => total + getEffectiveStat(item, "attack"), 0) + buffAttack;
}

function getPlayerAccuracy() {
  return clampNumber((game.recipe?.startingStats?.accuracy ?? 100) + (game.levelBonuses?.accuracy ?? 0), 0, 100, 100);
}

function rollPlayerHit() {
  if (playerHasAlwaysHitRune()) {
    return true;
  }
  return Math.random() * 100 < getPlayerAccuracy();
}

function getPlayerDefense() {
  const equipment = getEquippedItems(["leftHand", "rightHand", "bracelet1", "bracelet2"]);
  const buffDefense = game.buffs.reduce((total, buff) => total + (buff.defense || 0), 0);
  return (game.recipe?.startingStats?.defense ?? 0) + (game.levelBonuses?.defense ?? 0) + (game.permanentBonuses?.defense ?? 0) + equipment.reduce((total, item) => {
    if (item?.kind === "hand" && item.handType === "shield") {
      const costlyRunes = getRuneRulesForItem(item).filter((rule) => rule.effectType === "costlyBlock");
      if (costlyRunes.length > 0) {
        const minimumCost = Math.min(...costlyRunes.map((rule) => Number(rule.goldCost ?? 0)).filter((value) => Number.isFinite(value)));
        if (Number.isFinite(minimumCost) && game.gold < minimumCost) {
          return total;
        }
      }
    }
    return total + getEffectiveStat(item, "defense");
  }, 0) + buffDefense;
}

function getPlayerMaxHp() {
  if (game.conditionalOverrides?.maxHp !== null && game.conditionalOverrides?.maxHp !== undefined && Number.isFinite(Number(game.conditionalOverrides.maxHp))) {
    return Math.max(1, Number(game.conditionalOverrides.maxHp));
  }
  const bracelets = getEquippedItems(["bracelet1", "bracelet2"]);
  const runeHpBonus = getEquippedHandEntries()
    .flatMap(({ item }) => getRuneRulesForItem(item))
    .filter((rule) => rule.effectType === "hpPlus")
    .reduce((sum, rule) => sum + Math.max(0, Number(rule.hpBonus ?? 0)), 0);
  return Math.max(1, (game.recipe?.startingStats?.hp ?? 20) + (game.levelBonuses?.hp ?? 0) + (game.permanentBonuses?.maxHp ?? 0) + runeHpBonus + bracelets.reduce((total, item) => (
    total + getItemEffects(item)
      .filter((effect) => effect.enabled && effect.type === "maxHpBonus")
      .reduce((sum, effect) => sum + Number(effect.value || 0), 0)
  ), 0));
}

function getPlayerMaxHunger() {
  if (game.conditionalOverrides?.maxHunger !== null && game.conditionalOverrides?.maxHunger !== undefined && Number.isFinite(Number(game.conditionalOverrides.maxHunger))) {
    return Math.max(1, Number(game.conditionalOverrides.maxHunger));
  }
  const bracelets = getEquippedItems(["bracelet1", "bracelet2"]);
  return Math.max(1, 100 + (game.levelBonuses?.hunger ?? 0) + (game.permanentBonuses?.maxHunger ?? 0) + bracelets.reduce((total, item) => (
    total + getItemEffects(item)
      .filter((effect) => effect.enabled && effect.type === "maxHungerBonus")
      .reduce((sum, effect) => sum + Number(effect.value || 0), 0)
  ), 0));
}

function getInventoryLimit() {
  return Math.max(1, (game.recipe?.inventoryLimit ?? 12) + (game.permanentBonuses?.inventory ?? 0));
}

function getUsedInventorySpaces() {
  const equippedCount = game.recipe?.equippedCountsTowardLimit
    ? ["leftHand", "rightHand", "bracelet1", "bracelet2"].filter((slot) => game.equipment[slot]).length
    : 0;
  return game.inventory.length + equippedCount;
}

function hasInventorySpace() {
  return getUsedInventorySpaces() < getInventoryLimit();
}

function wouldEquipIncreaseUsedSpaces(slot) {
  return Boolean(
    game.recipe?.equippedCountsTowardLimit
    && slot
    && !game.equipment[slot]
  );
}

function canEquipIntoSlot(slot) {
  return !wouldEquipIncreaseUsedSpaces(slot) || hasInventorySpace();
}

function wouldUnequipOverflowInventory() {
  return !Boolean(game.recipe?.equippedCountsTowardLimit) && !hasInventorySpace();
}

function getEquippedItems(slots) {
  return slots
    .map((slot) => getItemWithInstance(game.equipment[slot]))
    .filter(Boolean);
}

function getEquippedHandEntries() {
  return ["leftHand", "rightHand"]
    .map((slot) => ({ slot, entry: game.equipment[slot], item: getItemWithInstance(game.equipment[slot]) }))
    .filter(({ item }) => item?.kind === "hand");
}

function hasEquippedEffect(effectKey) {
  return getEquippedItems(["leftHand", "rightHand", "bracelet1", "bracelet2"])
    .some((item) => item[effectKey] || getItemEffects(item).some((effect) => effect.enabled && effect.type === effectKey))
    || game.buffs.some((buff) => Boolean(buff?.[effectKey]));
}

function getEquippedBraceletEntries() {
  return ["bracelet1", "bracelet2"]
    .map((slot) => ({ slot, entry: game.equipment[slot], item: getItemWithInstance(game.equipment[slot]) }))
    .filter(({ item }) => item?.kind === "bracelet");
}

function getEquippedBraceletEffectEntries(effectType = null) {
  return getEquippedBraceletEntries()
    .flatMap(({ slot, entry, item }) => (
      getItemEffects(item)
        .filter((effect) => effect.enabled)
        .map((effect) => ({ slot, entry, item, effect }))
    ))
    .filter(({ effect }) => !effectType || effect.type === effectType);
}

function getBraceletEffectMaxValue(effectType, fallback = 0) {
  const values = getEquippedBraceletEffectEntries(effectType)
    .map(({ effect }) => Number(effect.value ?? fallback))
    .filter((value) => Number.isFinite(value));
  return values.length > 0 ? Math.max(...values) : fallback;
}

function getBraceletEffectMinValue(effectType, fallback = 0) {
  const values = getEquippedBraceletEffectEntries(effectType)
    .map(({ effect }) => Number(effect.value ?? fallback))
    .filter((value) => Number.isFinite(value));
  return values.length > 0 ? Math.min(...values) : fallback;
}

function getBraceletEffectMaxExtra(effectType, fallback = 0) {
  const values = getEquippedBraceletEffectEntries(effectType)
    .map(({ effect }) => Number(effect.extra ?? fallback))
    .filter((value) => Number.isFinite(value));
  return values.length > 0 ? Math.max(...values) : fallback;
}

function playerHasTiptoeBracelet() {
  return getEquippedBraceletEffectEntries("tiptoe").length > 0;
}

function playerCanWallPass() {
  return getEquippedBraceletEffectEntries("wallPass").length > 0;
}

function getWallPassPercent() {
  return Math.max(1, getBraceletEffectMinValue("wallPass", 4));
}

function getMonstercallRespawnMultiplier() {
  const boostPercent = getBraceletEffectMaxValue("monstercall", 0);
  return 1 + Math.max(0, boostPercent) / 100;
}

function getDaredevilCritProfile() {
  const chance = getBraceletEffectMaxValue("daredevil", 0);
  const multiplier = Math.max(1, getBraceletEffectMaxExtra("daredevil", 1.5));
  return { chance, multiplier };
}

function playerHasCursebreakBracelet() {
  return getEquippedBraceletEffectEntries("cursebreak").length > 0;
}

function playerHasBraceletRustproof() {
  return getEquippedBraceletEffectEntries("rustproof").length > 0;
}

function getBraceletStrengthBonus() {
  return getEquippedBraceletEffectEntries("strengthBonus")
    .reduce((sum, { effect }) => sum + Number(effect.value || 0), 0);
}

function getRarityMultiplier(item) {
  if (item.kind !== "hand") {
    return 1;
  }
  return getRarityRule(item.rarity)?.multiplier ?? 1;
}

function getEffectiveStat(item, stat) {
  const baseValue = item[stat] || 0;
  if (item.kind === "hand" && ((stat === "attack" && item.handType === "sword") || (stat === "defense" && item.handType === "shield"))) {
    const upgradeLevel = Math.max(MIN_ITEM_UPGRADE, Math.min(MAX_ITEM_UPGRADE, Number(item.upgradeLevel ?? 0)));
    const cursedBonus = getRuneRulesForItem(item)
      .filter((rule) => rule.effectType === "cursedMight" && item.cursed)
      .reduce((sum, rule) => sum + Math.max(0, Number(rule.curseBonus ?? 0)), 0);
    return Math.max(0, Math.ceil(baseValue * getRarityMultiplier(item)) + upgradeLevel + cursedBonus);
  }
  return Math.ceil(baseValue * getRarityMultiplier(item));
}

function getEquippedRuneEntries(runeId = null) {
  return getEquippedHandEntries().flatMap(({ slot, entry, item }) => (
    getRuneRulesForItem(item).map((rule) => ({ slot, entry, item, rule }))
  )).filter(({ rule }) => !runeId || rule.effectType === runeId || rule.id === runeId);
}

function playerHasAlwaysHitRune() {
  return getEquippedRuneEntries("accurateRune").length > 0 || getEquippedRuneEntries("accurate").length > 0;
}

function playerHasFrontalAttackRune() {
  return getEquippedRuneEntries("frontalAttackRune").length > 0 || getEquippedRuneEntries("frontalAttack").length > 0;
}

function playerHasSideAttackRune() {
  return getEquippedRuneEntries("sideAttackRune").length > 0 || getEquippedRuneEntries("sideAttack").length > 0;
}

function playerHasBackAttackRune() {
  return getEquippedRuneEntries("backAttackRune").length > 0 || getEquippedRuneEntries("backAttack").length > 0;
}

function getEquippedDullingRunes() {
  return [
    ...getEquippedRuneEntries("dullingRune"),
    ...getEquippedRuneEntries("dulling"),
  ];
}

function getEquippedShieldRuneEntries(runeId = null) {
  return getEquippedHandEntries()
    .filter(({ item }) => item?.handType === "shield")
    .flatMap(({ slot, entry, item }) => (
      getRuneRulesForItem(item).map((rule) => ({ slot, entry, item, rule }))
    ))
    .filter(({ rule }) => !runeId || rule.effectType === runeId || rule.id === runeId);
}

function playerHasSatingRune() {
  return getEquippedShieldRuneEntries("sating").length > 0;
}

function tryTrapProofNegation() {
  const chance = Math.max(0, ...getEquippedShieldRuneEntries("trapProof").map(({ rule }) => Number(rule.trapNullifyChance ?? 0)));
  return chance > 0 && Math.random() * 100 < chance;
}

function getDefensiveAntiMonsterPercent(monster = null) {
  if (!monster) {
    return 0;
  }
  const enemyTypeRules = normalizeEnemyTypeRules(game.recipe?.enemyTypeRules);
  return getEquippedShieldRuneEntries("antiMonsterGuard")
    .filter(({ rule }) => enemyTypeRules.some((typeRule) => typeRule.id === rule.targetTypeId && typeRule.familyIds.includes(monster.familyId)))
    .reduce((best, { rule }) => Math.max(best, Number(rule.blockPercent ?? 0)), 0);
}

function getShieldDamageMitigation(monster = null, wasCritical = false) {
  const parts = [];
  if (getEquippedShieldRuneEntries("toughAtX").some(({ rule }) => Math.abs(game.hp) % 10 === Number(rule.toughDigit ?? 7))) {
    parts.push(Math.max(...getEquippedShieldRuneEntries("toughAtX")
      .filter(({ rule }) => Math.abs(game.hp) % 10 === Number(rule.toughDigit ?? 7))
      .map(({ rule }) => Number(rule.toughReducePercent ?? 30))));
  }
  if (game.hp >= getPlayerMaxHp() && getEquippedShieldRuneEntries("fullArmor").length > 0) {
    parts.push(Math.max(...getEquippedShieldRuneEntries("fullArmor").map(({ rule }) => Number(rule.fullHpBlockPercent ?? 50))));
  }
  if (wasCritical && getEquippedShieldRuneEntries("critproof").length > 0) {
    parts.push(Math.max(...getEquippedShieldRuneEntries("critproof").map(({ rule }) => Number(rule.critproofPercent ?? 55))));
  }
  const antiMonsterPercent = getDefensiveAntiMonsterPercent(monster);
  if (antiMonsterPercent > 0) {
    parts.push(antiMonsterPercent);
  }
  const voraciousBlock = getEquippedShieldRuneEntries("voraciousBlock")
    .filter(({ rule }) => game.recipe?.hungerEnabled && game.hunger >= Number(rule.hungerCost ?? 0))
    .sort((a, b) => Number(b.rule.blockPercent ?? 0) - Number(a.rule.blockPercent ?? 0))[0] ?? null;
  if (voraciousBlock) {
    game.hunger = Math.max(0, game.hunger - Number(voraciousBlock.rule.hungerCost ?? 0));
    parts.push(Number(voraciousBlock.rule.blockPercent ?? 30));
  }
  const costlyBlock = getEquippedShieldRuneEntries("costlyBlock")
    .filter(({ rule }) => game.gold >= Number(rule.goldCost ?? 0))
    .sort((a, b) => Number(b.rule.blockPercent ?? 0) - Number(a.rule.blockPercent ?? 0))[0] ?? null;
  if (costlyBlock) {
    game.gold = Math.max(0, game.gold - Number(costlyBlock.rule.goldCost ?? 0));
    parts.push(Number(costlyBlock.rule.blockPercent ?? 30));
  }
  return Math.max(0, ...parts);
}

function tryKeenEvade() {
  const chance = Math.max(0, ...getEquippedShieldRuneEntries("keen").map(({ rule }) => Number(rule.evadeChance ?? 23)));
  return chance > 0 && Math.random() * 100 < chance;
}

function tryGutsSurvive() {
  if (game.hp <= 1) {
    return false;
  }
  const chance = Math.max(0, ...getEquippedShieldRuneEntries("guts").map(({ rule }) => Number(rule.gutsChance ?? 30)));
  return chance > 0 && Math.random() * 100 < chance;
}

async function applyShieldPaybackEffects(monster, damageTaken = 0) {
  if (!monster || damageTaken <= 0) {
    return;
  }
  const retributionPercent = Math.max(0, ...getEquippedShieldRuneEntries("retribution").map(({ rule }) => Number(rule.reflectPercent ?? 50)));
  if (retributionPercent > 0) {
    const reflected = Math.max(1, Math.ceil(damageTaken * (retributionPercent / 100)));
    monster.hp -= reflected;
    trackRunStat("damageDealt", reflected);
    log(`Retribution reflects ${reflected} damage back to the ${monster.name}.`);
    if (monster.hp <= 0) {
      applyEnemyDeathSkillEffects(monster);
      trackGoalKill(monster);
      awardXp(monster.xp, monster.name);
      const index = game.monsters.indexOf(monster);
      if (index >= 0) {
        game.monsters.splice(index, 1);
      }
      trackRunStat("monstersDefeated");
      playSoundEffect("monsterDefeat");
      log(`The ${monster.name} is defeated.`);
      dropEnemyLoot(monster);
      checkCustomGoalCompletion();
      return;
    }
  }
  const leapChance = Math.max(0, ...getEquippedShieldRuneEntries("leapPayback").map(({ rule }) => Number(rule.paybackChance ?? 10)));
  if (leapChance > 0 && Math.random() * 100 < leapChance) {
    if (warpMonsterToRandomRoom(monster)) {
      log(`Leap Payback warps the ${monster.name} away.`);
      return;
    }
  }
  const shadowChance = Math.max(0, ...getEquippedShieldRuneEntries("shadowPayback").map(({ rule }) => Number(rule.paybackChance ?? 20)));
  if (shadowChance > 0 && Math.random() * 100 < shadowChance) {
    monster.shadowboundTurns = Math.max(Number(monster.shadowboundTurns ?? 0), 10);
    log(`Shadow Payback binds the ${monster.name} in place.`);
  }
}

function revealTrapsFromWeaponSwing(dx = 0, dy = 0) {
  if (
    getEquippedRuneEntries("trapFindingRune").length === 0
    && getEquippedRuneEntries("trapFinding").length === 0
  ) {
    return 0;
  }
  const positions = [];
  if (dx !== 0) {
    const targetX = game.player.x + (dx * 2);
    positions.push(
      { x: targetX, y: game.player.y - 1 },
      { x: targetX, y: game.player.y },
      { x: targetX, y: game.player.y + 1 },
    );
  } else if (dy !== 0) {
    const targetY = game.player.y + (dy * 2);
    positions.push(
      { x: game.player.x - 1, y: targetY },
      { x: game.player.x, y: targetY },
      { x: game.player.x + 1, y: targetY },
    );
  }
  let revealed = 0;
  positions.forEach((position) => {
    const trap = game.traps.find((entry) => entry.x === position.x && entry.y === position.y);
    if (trap && !trap.visible) {
      trap.visible = true;
      revealed += 1;
    }
  });
  return revealed;
}

function breakTrapFromWeaponSwing(dx = 0, dy = 0) {
  if (
    getEquippedRuneEntries("trapBustRune").length === 0
    && getEquippedRuneEntries("trapBust").length === 0
  ) {
    return false;
  }
  const targetX = game.player.x + dx;
  const targetY = game.player.y + dy;
  const trapIndex = game.traps.findIndex((entry) => entry.x === targetX && entry.y === targetY);
  if (trapIndex < 0) {
    return false;
  }
  const trap = game.traps[trapIndex];
  game.traps.splice(trapIndex, 1);
  log(`${getVisibleItemName(trap)} is busted by your swing.`);
  return true;
}

function resolvePlayerRuneHitEffects(baseDamage, target = null) {
  const criticalRunes = getEquippedRuneEntries("criticalRune");
  const enemyTypeRules = normalizeEnemyTypeRules(game.recipe?.enemyTypeRules);
  const antiMonsterRunes = getEquippedRuneEntries("antiMonster").filter(({ rule }) => {
    return enemyTypeRules.some((typeRule) => typeRule.id === rule.targetTypeId && typeRule.familyIds.includes(target?.familyId));
  });
  const matchedType = enemyTypeRules.find((typeRule) => antiMonsterRunes.some(({ rule }) => rule.targetTypeId === typeRule.id)) ?? null;
  const criticalAt7Active = getEquippedRuneEntries("criticalAt7").some(({ rule }) => Math.abs(game.hp) % 10 === Number(rule.criticalDigit ?? 7));
  const quintessenceActive = getEquippedRuneEntries("quintessence").length > 0 && (game.playerHitStreak ?? 0) >= 4;
  const thirdStrikeActive = getEquippedRuneEntries("thirdStrike").length > 0 && (game.playerMissStreak ?? 0) >= 2;
  const voraciousRune = getEquippedRuneEntries("voraciousHit")
    .filter(({ rule }) => game.recipe?.hungerEnabled && game.hunger >= Number(rule.hungerCost ?? 0))
    .sort((left, right) => Number(right.rule.bonusMultiplier ?? 1) - Number(left.rule.bonusMultiplier ?? 1))[0] ?? null;
  const dangerRune = getEquippedRuneEntries("dangerPower")
    .filter(({ rule }) => game.hp <= Math.floor(getPlayerMaxHp() * (Number(rule.lowHpPercent ?? 25) / 100)))
    .sort((left, right) => Number(right.rule.bonusMultiplier ?? 1) - Number(left.rule.bonusMultiplier ?? 1))[0] ?? null;
  const hungerPowerRune = getEquippedRuneEntries("hungerPower")
    .filter(({ rule }) => game.recipe?.hungerEnabled && game.hunger <= 0)
    .sort((left, right) => Number(right.rule.bonusMultiplier ?? 1) - Number(left.rule.bonusMultiplier ?? 1))[0] ?? null;
  const costlyRune = getEquippedRuneEntries("costlyHit")
    .filter(({ rule }) => game.gold >= Number(rule.goldCost ?? 0))
    .sort((left, right) => Number(right.rule.bonusMultiplier ?? 1) - Number(left.rule.bonusMultiplier ?? 1))[0] ?? null;
  let criticalMultiplier = 1;
  let antiMonsterMultiplier = 1;
  let voraciousMultiplier = 1;
  let dangerMultiplier = 1;
  let hungerPowerMultiplier = 1;
  let costlyMultiplier = 1;
  criticalRunes.forEach(({ rule }) => {
    if (Math.random() * 100 < rule.critChance) {
      criticalMultiplier = Math.max(criticalMultiplier, rule.critMultiplier);
    }
  });
  const daredevil = getDaredevilCritProfile();
  if (daredevil.chance > 0 && Math.random() * 100 < daredevil.chance) {
    criticalMultiplier = Math.max(criticalMultiplier, daredevil.multiplier);
  }
  antiMonsterRunes.forEach(({ rule }) => {
    antiMonsterMultiplier = Math.max(antiMonsterMultiplier, Number(rule.bonusMultiplier ?? 1));
  });
  if (criticalAt7Active || quintessenceActive || thirdStrikeActive) {
    criticalMultiplier = Math.max(criticalMultiplier, 1.5);
  }
  if (voraciousRune) {
    voraciousMultiplier = Math.max(voraciousMultiplier, Number(voraciousRune.rule.bonusMultiplier ?? 1));
    game.hunger = Math.max(0, game.hunger - Number(voraciousRune.rule.hungerCost ?? 0));
  }
  if (dangerRune) {
    dangerMultiplier = Math.max(dangerMultiplier, Number(dangerRune.rule.bonusMultiplier ?? 1));
  }
  if (hungerPowerRune) {
    hungerPowerMultiplier = Math.max(hungerPowerMultiplier, Number(hungerPowerRune.rule.bonusMultiplier ?? 1));
  }
  if (costlyRune) {
    costlyMultiplier = Math.max(costlyMultiplier, Number(costlyRune.rule.bonusMultiplier ?? 1));
    game.gold = Math.max(0, game.gold - Number(costlyRune.rule.goldCost ?? 0));
  }
  const critical = criticalMultiplier > 1;
  const antiMonster = antiMonsterMultiplier > 1;
  const voraciousHit = voraciousMultiplier > 1;
  const dangerPower = dangerMultiplier > 1;
  const hungerPower = hungerPowerMultiplier > 1;
  const costlyHit = costlyMultiplier > 1;
  let modifiedDamage = antiMonster ? Math.max(1, Math.ceil(baseDamage * antiMonsterMultiplier)) : baseDamage;
  if (voraciousHit) {
    modifiedDamage = Math.max(1, Math.ceil(modifiedDamage * voraciousMultiplier));
  }
  if (dangerPower) {
    modifiedDamage = Math.max(1, Math.ceil(modifiedDamage * dangerMultiplier));
  }
  if (hungerPower) {
    modifiedDamage = Math.max(1, Math.ceil(modifiedDamage * hungerPowerMultiplier));
  }
  if (costlyHit) {
    modifiedDamage = Math.max(1, Math.ceil(modifiedDamage * costlyMultiplier));
  }
  const damage = critical ? Math.max(1, Math.ceil(modifiedDamage * criticalMultiplier)) : modifiedDamage;
  return {
    damage,
    critical,
    criticalMultiplier,
    criticalAt7Active,
    quintessenceActive,
    thirdStrikeActive,
    antiMonster,
    antiMonsterMultiplier,
    antiMonsterTypeName: matchedType ? matchedType.name : "",
    voraciousHit,
    voraciousCost: voraciousRune ? Number(voraciousRune.rule.hungerCost ?? 0) : 0,
    dangerPower,
    dangerThreshold: dangerRune ? Number(dangerRune.rule.lowHpPercent ?? 25) : 0,
    dangerMultiplier,
    hungerPower,
    hungerPowerMultiplier,
    costlyHit,
    costlyCost: costlyRune ? Number(costlyRune.rule.goldCost ?? 0) : 0,
  };
}

function resolveThunderboltBonus(target = null) {
  const thunderRunes = getEquippedRuneEntries("thunderbolt");
  let triggered = false;
  let thunderDamage = 0;
  thunderRunes.forEach(({ rule }) => {
    if (Math.random() * 100 < Number(rule.thunderChance ?? 0)) {
      triggered = true;
      thunderDamage = Math.max(thunderDamage, Number(rule.thunderDamage ?? 20));
    }
  });
  if (!triggered || thunderDamage <= 0 || !target) {
    return { triggered: false, thunderDamage: 0, target, hits: 0 };
  }
  return { triggered: true, thunderDamage, target, hits: 0 };
}

function resolveFlameShotBonus(hpWasFull) {
  if (!hpWasFull) {
    return 0;
  }
  return getEquippedRuneEntries("flameShot")
    .reduce((sum, { rule }) => sum + Math.max(0, Number(rule.flameDamage ?? 0)), 0);
}

function resolveSwiftStrikeBonus(baseDamage) {
  let bonusDamage = 0;
  let procs = 0;
  getEquippedRuneEntries("swiftStrikes").forEach(({ rule }) => {
    if (Math.random() * 100 < Number(rule.swiftChance ?? 0)) {
      procs += 1;
      bonusDamage += Math.max(1, Math.ceil(baseDamage * Number(rule.swiftPower ?? 0.5)));
    }
  });
  return { bonusDamage, procs };
}

function shouldForcePlayerCriticalHit() {
  return (
    getEquippedRuneEntries("criticalAt7").some(({ rule }) => Math.abs(game.hp) % 10 === Number(rule.criticalDigit ?? 7))
    || (getEquippedRuneEntries("quintessence").length > 0 && (game.playerHitStreak ?? 0) >= 4)
    || (getEquippedRuneEntries("thirdStrike").length > 0 && (game.playerMissStreak ?? 0) >= 2)
  );
}

function shouldForcePlayerHit() {
  return playerHasAlwaysHitRune() || (getEquippedRuneEntries("thirdStrike").length > 0 && (game.playerMissStreak ?? 0) >= 2);
}

async function applyThunderboltStrike(monster, excludedMonsterNames = new Set(), sourceLabel = "Thunderbolt") {
  if (!monster || excludedMonsterNames.has(monster)) {
    return { damage: 0, defeated: false };
  }
  return { damage: 0, defeated: false };
}

async function applyThunderboltSplash(origin, thunderDamage, excludedTargets = new Set()) {
  if (!origin || thunderDamage <= 0) {
    return { totalDamage: 0, hits: 0 };
  }
  let totalDamage = 0;
  let hits = 0;
  const targets = game.monsters.filter((monster) => (
    !excludedTargets.has(monster)
    && Math.abs(monster.x - origin.x) <= 1
    && Math.abs(monster.y - origin.y) <= 1
  ));
  for (const monster of targets) {
    await playMeleeAttackAnimation(monster, "monster");
    monster.hp -= thunderDamage;
    totalDamage += thunderDamage;
    hits += 1;
    log(`Thunderbolt arcs into the ${monster.name} for ${thunderDamage} damage.`);
    if (monster.hp > 0) {
      triggerElectrifyOnHits(monster);
      maybeMultiplyMonsterOnHit(monster);
      continue;
    }
    applyEnemyDeathSkillEffects(monster);
    trackGoalKill(monster);
    awardXp(monster.xp, monster.name);
    const index = game.monsters.indexOf(monster);
    if (index >= 0) {
      game.monsters.splice(index, 1);
    }
    trackRunStat("monstersDefeated");
    playSoundEffect("monsterDefeat");
    log(`The ${monster.name} is defeated.`);
    dropEnemyLoot(monster);
    checkCustomGoalCompletion();
  }
  return { totalDamage, hits };
}

function updatePlayerAttackStreaksOnMiss() {
  game.playerMissStreak = (game.playerMissStreak ?? 0) + 1;
  game.playerHitStreak = 0;
}

function updatePlayerAttackStreaksOnHit(runeHit) {
  const consumedHitStreak = Boolean(runeHit?.quintessenceActive);
  const consumedMissStreak = Boolean(runeHit?.thirdStrikeActive);
  game.playerHitStreak = consumedHitStreak ? 0 : (game.playerHitStreak ?? 0) + 1;
  game.playerMissStreak = consumedMissStreak ? 0 : 0;
}

function tryKnockbackMonster(monster, directionDx = 0, directionDy = 0) {
  const knockbackRunes = getEquippedRuneEntries("knockback");
  if (!monster || knockbackRunes.length === 0) {
    return false;
  }
  const chance = Math.max(...knockbackRunes.map(({ rule }) => Number(rule.knockbackChance ?? 0)));
  if (Math.random() * 100 >= chance) {
    return false;
  }
  const pushDx = Math.sign(directionDx || (monster.x - game.player.x));
  const pushDy = Math.sign(directionDy || (monster.y - game.player.y));
  const destination = { x: monster.x + pushDx, y: monster.y + pushDy };
  if (destination.x === game.player.x && destination.y === game.player.y) {
    return false;
  }
  if (game.tiles[destination.y]?.[destination.x] !== "floor") {
    return false;
  }
  if (bossOccupies(destination.x, destination.y)) {
    return false;
  }
  if (game.monsters.some((other) => other !== monster && other.x === destination.x && other.y === destination.y)) {
    return false;
  }
  monster.x = destination.x;
  monster.y = destination.y;
  return true;
}

function tryWallDig(dx = 0, dy = 0) {
  if (!itemHasRuneEffect(game.equipment?.leftHand, "wallDig") && !itemHasRuneEffect(game.equipment?.rightHand, "wallDig")) {
    return false;
  }
  const target = { x: game.player.x + dx, y: game.player.y + dy };
  if (game.tiles[target.y]?.[target.x] !== "wall") {
    return false;
  }
  game.tiles[target.y][target.x] = "floor";
  revealTile(target.x, target.y);
  playSoundEffect("playerAttack");
  log("Your wall dig opens the stone.");
  const degradeChance = 50;
  const dulled = [];
  ["leftHand", "rightHand"].forEach((slot) => {
    const entry = game.equipment?.[slot];
    if (!entry || !itemHasRuneEffect(entry, "wallDig")) {
      return;
    }
    if (Math.random() * 100 < degradeChance) {
      const lost = Math.abs(applyUpgradeToEntry(entry, -1, MIN_ITEM_UPGRADE, MAX_ITEM_UPGRADE));
      if (lost > 0) {
        dulled.push(getVisibleItemName(entry));
      }
    }
  });
  if (dulled.length > 0) {
    log(`${dulled.join(" and ")} lose 1 upgrade while digging.`);
  }
  return true;
}

function applyUpgradeOnlyDullingRunes() {
  const messages = [];
  getEquippedDullingRunes().forEach(({ entry, rule }) => {
    const amount = Math.max(0, Number(rule.dullAmount ?? 0));
    if (amount <= 0) {
      return;
    }
    const lost = Math.abs(applyUpgradeToEntry(entry, -amount, MIN_ITEM_UPGRADE, MAX_ITEM_UPGRADE));
    if (lost > 0) {
      const nextUpgrade = clampUpgradeValue(entry.upgradeLevel, MIN_ITEM_UPGRADE, MAX_ITEM_UPGRADE);
      messages.push(`${getVisibleItemName(entry)} dulls: upgrade ${nextUpgrade >= 0 ? `+${nextUpgrade}` : nextUpgrade}`);
    }
  });
  return messages;
}

function applyHealingRunes(damage) {
  const totalPercent = getEquippedRuneEntries("healingRune")
    .reduce((sum, { rule }) => sum + (rule.healPercent ?? 0), 0);
  if (damage <= 0 || totalPercent <= 0) {
    return 0;
  }
  const healAmount = Math.max(1, Math.round(damage * totalPercent / 100));
  const previousHp = game.hp;
  game.hp = Math.min(getPlayerMaxHp(), game.hp + healAmount);
  const restored = game.hp - previousHp;
  if (restored > 0) {
    trackRunStat("healingRecovered", restored);
  }
  return restored;
}

function applyDullingRunes(effectType, handType) {
  const messages = [];
  getEquippedRuneEntries(effectType).forEach(({ entry, item, rule }) => {
    const amount = Math.max(0, Number(rule.dullAmount ?? 0));
    if (amount <= 0 || item?.kind !== "hand" || item.handType !== handType) {
      return;
    }
    const previousUpgrade = Math.max(MIN_ITEM_UPGRADE, Math.min(MAX_ITEM_UPGRADE, Number(entry.upgradeLevel ?? 0)));
    const statKey = handType === "shield" ? "defense" : "attack";
    const previousStat = getEffectiveStat(item, statKey);
    if (previousStat <= 0) {
      return;
    }
    const appliedAmount = Math.min(amount, previousStat);
    const nextUpgrade = itemHasRuneEffect(entry, "rustproof")
      ? previousUpgrade
      : Math.max(MIN_ITEM_UPGRADE, previousUpgrade - appliedAmount);
    entry.upgradeLevel = nextUpgrade;
    const refreshedItem = getItemWithInstance(entry);
    const nextStat = getEffectiveStat(refreshedItem, statKey);
    const lostUpgrade = previousUpgrade - nextUpgrade;
    const lostStat = Math.max(0, previousStat - nextStat);
    const statLabel = statKey;
    messages.push(`${getVisibleItemName(entry)} dulls: ${statLabel} -${lostStat}, upgrade ${nextUpgrade >= 0 ? `+${nextUpgrade}` : nextUpgrade}`);
  });
  return messages;
}

function renderInventoryMenu() {
  inventoryCountLabel.textContent = `${getUsedInventorySpaces()} / ${getInventoryLimit()}`;
  equipmentList.innerHTML = "";
  ["leftHand", "rightHand", "bracelet1", "bracelet2"].forEach((slot) => {
    const entry = game.equipment[slot];
    const card = document.createElement("article");
    card.className = getItemCardClass(entry);
    card.style.cssText = buildRarityCardStyle(entry);
    if (!entry) {
      card.innerHTML = `<strong>Empty</strong><p>${getEmptySlotHint(slot)}</p>`;
    } else {
      card.append(makeEquippedItemSummary(entry, slot));
      if (!isLockedCursedEquipment(entry)) {
        const actions = document.createElement("div");
        actions.className = "item-actions equipped-item-actions";
        actions.append(makeInventoryAction("Remove", "unequip", -1, slot));
        card.append(actions);
      }
    }
    equipmentList.append(card);
  });

  renderFloorItemPanel();
  renderShopSellPanel();
  renderGamblingPanel();
  renderUpgradeChoicePanel();
  renderStringActionPanel();

  inventoryList.innerHTML = "";
  if (game.inventory.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-list";
    empty.textContent = "Inventory is empty.";
    inventoryList.append(empty);
    return;
  }

  game.inventory.forEach((entry, index) => {
    inventoryList.append(makeCarriedItemRow(entry, index));
  });
  if (game.editingEquipmentNameSlot) {
    window.requestAnimationFrame(() => {
      const input = equipmentList.querySelector(`.equipment-name-input[data-slot="${game.editingEquipmentNameSlot}"]`);
      if (input) {
        input.focus();
        input.select();
      }
    });
  }
}

function renderUpgradeChoicePanel() {
  const pending = game.pendingUpgradeChoice;
  upgradeChoiceSection.classList.toggle("hidden", !pending);
  upgradeChoiceList.innerHTML = "";

  if (!pending) {
    return;
  }

  const intro = document.createElement("article");
  intro.className = "item-card";
  intro.innerHTML = `<strong>${pending.sourceName}</strong><p>Choose which ${pending.handType} to ${pending.amount < 0 ? "downgrade" : "upgrade"}.</p>`;
  const introActions = document.createElement("div");
  introActions.className = "item-actions";
  introActions.append(makeInventoryAction("Cancel", "cancel_upgrade_choice", -1));
  intro.append(introActions);
  upgradeChoiceList.append(intro);

  pending.targets.forEach((target, index) => {
    const card = document.createElement("article");
    card.className = getItemCardClass(target.entry);
    card.style.cssText = buildRarityCardStyle(target.entry);
    card.append(makeItemSummary(target.entry));
    const actions = document.createElement("div");
    actions.className = "item-actions";
    actions.append(makeInventoryAction("Apply", "apply_upgrade_choice", index));
    card.append(actions);
    upgradeChoiceList.append(card);
  });
}

function clearPendingStringAction() {
  game.pendingStringAction = null;
}

function getStringUsesRemaining(entry) {
  const item = getItemDefinition(entry);
  return Math.max(0, Number(entry?.stringUsesRemaining ?? item?.stringUsesRemaining ?? item?.uses ?? 0));
}

function getPreservationStoredItems(entry) {
  return Array.isArray(entry?.storedItems) ? entry.storedItems : [];
}

function renderStringActionPanel() {
  const pending = game.pendingStringAction;
  stringActionSection.classList.toggle("hidden", !pending);
  stringActionList.innerHTML = "";
  if (!pending?.entry) {
    return;
  }

  const item = getItemDefinition(pending.entry);
  const header = document.createElement("article");
  header.className = "item-card";
  header.innerHTML = `<strong>${item?.name ?? "String"}</strong><p>${getVisibleItemDescription(pending.entry)}</p>`;
  const headerActions = document.createElement("div");
  headerActions.className = "item-actions";
  headerActions.append(makeInventoryAction("Close", "close_string_action", -1));
  header.append(headerActions);
  stringActionList.append(header);

  if (item?.stringEffect === "preservation") {
    const storedItems = getPreservationStoredItems(pending.entry);
    const capacity = Math.max(1, Number(item.uses ?? 1));
    const storeCandidates = game.inventory
      .map((candidate, index) => ({ candidate, index, item: getItemDefinition(candidate) }))
      .filter(({ candidate, item: candidateItem }) => candidate !== pending.entry && candidateItem?.kind !== "string");
    const summary = document.createElement("article");
    summary.className = "item-card";
    summary.innerHTML = `<strong>Stored Items</strong><p>${storedItems.length} / ${capacity} stored.</p>`;
    stringActionList.append(summary);
    storedItems.forEach((stored, index) => {
      const card = document.createElement("article");
      card.className = `${getItemCardClass(stored)} compact-item-card`;
      card.style.cssText = buildRarityCardStyle(stored);
      card.append(makeItemSummary(stored));
      const actions = document.createElement("div");
      actions.className = "item-actions";
      actions.append(makeInventoryAction("Take Out", "string_take_out", index));
      card.append(actions);
      stringActionList.append(card);
    });
    storeCandidates.forEach(({ candidate, index }) => {
      const card = document.createElement("article");
      card.className = `${getItemCardClass(candidate)} compact-item-card`;
      card.style.cssText = buildRarityCardStyle(candidate);
      card.append(makeItemSummary(candidate));
      const actions = document.createElement("div");
      actions.className = "item-actions";
      actions.append(makeInventoryAction("Store", "string_store", index));
      card.append(actions);
      stringActionList.append(card);
    });
    return;
  }

  if (item?.stringEffect === "synthesis") {
    const selectedRef = pending.primaryRef ?? null;
    const synthCandidates = getOwnedEntries(true)
      .filter(({ entry }) => entry !== pending.entry)
      .filter(({ entry }) => {
        const candidateItem = getItemDefinition(entry);
        if (candidateItem?.kind !== "hand") {
          return false;
        }
        if (!selectedRef) {
          return true;
        }
        const primaryItem = getItemDefinition(selectedRef.entry);
        return candidateItem.handType === primaryItem?.handType && entry !== selectedRef.entry;
      });
    const intro = document.createElement("article");
    intro.className = "item-card";
    intro.innerHTML = `<strong>Synthesis</strong><p>${selectedRef ? `Choose another ${getItemDefinition(selectedRef.entry)?.handType ?? "item"} to fuse into ${getVisibleItemName(selectedRef.entry)}.` : "Choose the first sword or shield."}</p>`;
    stringActionList.append(intro);
    synthCandidates.forEach((target, index) => {
      const card = document.createElement("article");
      card.className = `${getItemCardClass(target.entry)} compact-item-card`;
      card.style.cssText = buildRarityCardStyle(target.entry);
      card.append(makeItemSummary(target.entry));
      const actions = document.createElement("div");
      actions.className = "item-actions";
      actions.append(makeInventoryAction(selectedRef ? "Fuse" : "First", selectedRef ? "string_fuse" : "string_select_primary", index));
      card.append(actions);
      stringActionList.append(card);
    });
    return;
  }

  if (item?.stringEffect === "cashing") {
    const candidates = getOwnedEntries(true)
      .filter(({ entry }) => entry !== pending.entry);
    const intro = document.createElement("article");
    intro.className = "item-card";
    intro.innerHTML = `<strong>Cashing</strong><p>Convert an item into its sell value in gold.</p>`;
    stringActionList.append(intro);
    candidates.forEach((target, index) => {
      const card = document.createElement("article");
      card.className = `${getItemCardClass(target.entry)} compact-item-card`;
      card.style.cssText = buildRarityCardStyle(target.entry);
      card.append(makeItemSummary(target.entry));
      const actions = document.createElement("div");
      actions.className = "item-actions";
      actions.append(makeInventoryAction(`Cash ${getEntrySellValue(target.entry)}g`, "string_cash", index));
      card.append(actions);
      stringActionList.append(card);
    });
  }
}

function renderFloorItemPanel() {
  const floorItem = getFloorItemAtPlayer();
  floorItemSection.classList.toggle("hidden", !floorItem);
  floorItemList.innerHTML = "";

  if (!floorItem) {
    return;
  }

  const card = document.createElement("article");
  card.className = getItemCardClass(floorItem);
  card.style.cssText = buildRarityCardStyle(floorItem);
  card.append(makeItemSummary(floorItem));

  const actions = document.createElement("div");
  actions.className = "item-actions";
  const floorItemDef = getItemDefinition(floorItem);
  const floorActionLabel = floorItem.pendingSale
    ? "Take Back"
    : floorItem.shopPrice
    ? `Buy ${getShopPrice(floorItem)}g`
    : floorItemDef?.kind === "scroll"
      ? "Read"
      : "Use";
  actions.append(makeInventoryAction(floorActionLabel, "use_floor", -1));
  card.append(actions);
  floorItemList.append(card);
}

function getFloorItemAtPlayer() {
  return game.items.find((entity) => entity.x === game.player.x && entity.y === game.player.y);
}

function getPendingSaleItems(roomId) {
  return game.items.filter((item) => item.pendingSale && item.shopRoomId === roomId);
}

function getActiveShopRoom() {
  const specialRoom = getSpecialRoomAtPosition(game.player);
  if (!specialRoom || specialRoom.type !== "shopkeeper") {
    return null;
  }
  return specialRoom;
}

function getPendingSaleTotal(roomId) {
  return getPendingSaleItems(roomId).reduce((total, item) => total + getEntrySellValue(item), 0);
}

function renderShopSellPanel() {
  const shopRoom = getActiveShopRoom();
  const onShopkeeper = Boolean(
    shopRoom &&
    shopRoom.shopkeeperPos?.x === game.player.x &&
    shopRoom.shopkeeperPos?.y === game.player.y
  );
  const pendingItems = shopRoom ? getPendingSaleItems(shopRoom.id) : [];
  shopSellSection.classList.toggle("hidden", !(onShopkeeper && pendingItems.length > 0));
  shopSellList.innerHTML = "";

  if (!onShopkeeper || pendingItems.length === 0) {
    return;
  }

  const actionCard = document.createElement("article");
  actionCard.className = "item-card";
  const total = getPendingSaleTotal(shopRoom.id);
  actionCard.innerHTML = `<strong>Shopkeeper Offer</strong><p>Sell items?</p>`;
  const actions = document.createElement("div");
  actions.className = "item-actions";
  actions.append(makeInventoryAction(`Sell For ${total}g`, "sell_pending", -1));
  actionCard.append(actions);
  shopSellList.append(actionCard);
}

function getActiveGamblingRoom() {
  const specialRoom = getSpecialRoomAtPosition(game.player);
  if (!specialRoom || specialRoom.type !== "gamblingRoom") {
    return null;
  }
  if (specialRoom.totemPos?.x !== game.player.x || specialRoom.totemPos?.y !== game.player.y) {
    return null;
  }
  return specialRoom;
}

function renderGamblingPanel() {
  const gamblingRoom = getActiveGamblingRoom();
  gamblingSection.classList.toggle("hidden", !gamblingRoom);
  gamblingList.innerHTML = "";

  if (!gamblingRoom) {
    return;
  }

  const offer = gamblingRoom.offer ?? rollGamblingOffer(gamblingRoom);
  const card = document.createElement("article");
  card.className = "item-card";
  card.innerHTML = `
    <strong>Gambling Totem</strong>
    <p>There is a ${offer.winChance}% chance to multiply your bet by ${offer.multiplier}x. ${gamblingRoom.totemUsesRemaining ?? 0} use${(gamblingRoom.totemUsesRemaining ?? 0) === 1 ? "" : "s"} remain.</p>
  `;

  const wagerLabel = document.createElement("label");
  wagerLabel.textContent = "Bet Amount";
  const wagerInput = document.createElement("input");
  wagerInput.type = "number";
  wagerInput.min = "1";
  wagerInput.step = "1";
  wagerInput.value = String(Math.min(Math.max(1, Math.floor(game.gold / 4) || 1), Math.max(1, game.gold)));
  wagerInput.id = "gamblingBetInput";
  wagerLabel.append(wagerInput);

  const actions = document.createElement("div");
  actions.className = "item-actions";
  actions.append(makeInventoryAction("Bet", "gamble_confirm", -1));
  card.append(wagerLabel, actions);
  gamblingList.append(card);
}

function confirmGamblingBet() {
  const gamblingRoom = getActiveGamblingRoom();
  if (!gamblingRoom) {
    render();
    return false;
  }
  if ((gamblingRoom.totemUsesRemaining ?? 0) <= 0) {
    log("The gambling totem has gone silent.");
    render();
    return false;
  }

  const input = gamblingList.querySelector("#gamblingBetInput");
  const wager = Math.max(0, Math.floor(Number(input?.value ?? 0)));
  const offer = gamblingRoom.offer ?? rollGamblingOffer(gamblingRoom);
  if (wager <= 0) {
    log("Enter a gold amount to bet.");
    render();
    return false;
  }
  if (game.gold < wager) {
    log(`You only have ${game.gold} gold to wager.`);
    render();
    return false;
  }

  game.gold -= wager;
  playSoundEffect("gambleBet");
  const won = Math.random() * 100 < offer.winChance;
  if (won) {
    const payout = wager * offer.multiplier;
    game.gold += payout;
    trackGoalGold(payout);
    log(`The gambling totem pays out! Bet ${wager} gold and won ${payout} gold.`);
  } else {
    log(`The gambling totem swallows ${wager} gold.`);
  }
  gamblingRoom.totemUsesRemaining = Math.max(0, (gamblingRoom.totemUsesRemaining ?? 1) - 1);
  checkCustomGoalCompletion();
  if (gamblingRoom.totemUsesRemaining > 0) {
    rollGamblingOffer(gamblingRoom);
  } else {
    log("The gambling totem crumbles after its last use.");
  }
  spendMenuTurn();
  return true;
}

function confirmPendingShopSale() {
  const shopRoom = getActiveShopRoom();
  if (!shopRoom || shopRoom.shopkeeperPos?.x !== game.player.x || shopRoom.shopkeeperPos?.y !== game.player.y) {
    render();
    return false;
  }
  const pendingItems = getPendingSaleItems(shopRoom.id);
  if (pendingItems.length === 0) {
    render();
    return false;
  }
  const total = getPendingSaleTotal(shopRoom.id);
  pendingItems.forEach((item) => {
    item.pendingSale = false;
    item.shopOwned = true;
    item.shopPrice = getShopPrice(item);
  });
  playSoundEffect("shopSell");
  game.gold += total;
  trackGoalGold(total);
  log(`Sold ${pendingItems.length} item${pendingItems.length === 1 ? "" : "s"} for ${total} gold.`);
  checkCustomGoalCompletion();
  spendMenuTurn();
  return true;
}

function giveRewardItem(entry) {
  if (hasInventorySpace()) {
    game.inventory.push(entry);
    playSoundEffect(getItemDefinition(entry)?.kind === "gold" ? "goldPickup" : "itemPickup");
    trackRunStat("itemsPickedUp");
    trackGoalObtain(entry.itemId);
    log(`Received ${getVisibleItemName(entry)}.`);
    logDeductionHint(entry);
    checkCustomGoalCompletion();
    return true;
  }
  const dropPosition = getDropPositionAroundPlayer();
  if (dropPosition) {
    game.items.push({ ...entry, x: dropPosition.x, y: dropPosition.y });
    log(`${getVisibleItemName(entry)} lands on the floor nearby.`);
    return true;
  }
  log("There is nowhere to place the reward.");
  return false;
}

function getUpgradeableOwnedEntry() {
  return getOwnedEntries(true)
    .map(({ entry }) => entry)
    .find((entry) => {
      const item = getItemDefinition(entry);
      return item?.kind === "hand" && Number(entry.upgradeLevel ?? 0) < 3;
    }) ?? null;
}

function triggerGamblingRoom(specialRoom) {
  if (!specialRoom.introShown) {
    specialRoom.introShown = true;
    specialRoom.offer = rollGamblingOffer(specialRoom);
    log(`A gambling totem hums here. Step onto it to place a gold bet. It has ${specialRoom.totemUsesRemaining ?? 0} use${(specialRoom.totemUsesRemaining ?? 0) === 1 ? "" : "s"}.`);
  }
}

function triggerMonsterHouse(specialRoom) {
  const room = game.rooms.find((entry) => entry.id === specialRoom.roomId);
  if (!room) {
    specialRoom.triggered = true;
    return;
  }
  const random = makeRandom(game.recipe.seed + game.floor * 38711 + room.x * 13 + room.y * 17);
  const occupied = [game.player, game.exit, ...game.monsters, ...game.items, ...game.traps];
  const extraMonsters = 4 + Math.floor(random() * 4);
  const extraItems = 2 + Math.floor(random() * 3);
  const extraTraps = 2 + Math.floor(random() * 2);
  for (let index = 0; index < extraMonsters; index += 1) {
    const position = randomRoomPositionFromRooms(random, [room], occupied);
    const variant = chooseMonsterVariant(game.recipe, game.floor, random);
    if (!position || !variant) {
      continue;
    }
    occupied.push(position);
    game.monsters.push({ ...position, ...createMonster(variant) });
  }
  for (let index = 0; index < extraItems; index += 1) {
    const position = randomRoomPositionFromRooms(random, [room], occupied);
    if (!position) {
      continue;
    }
    occupied.push(position);
    const itemId = chooseItemId(game.recipe, random);
    game.items.push({ ...position, ...createSpawnedItem(game.recipe, itemId, random) });
  }
  for (let index = 0; index < extraTraps; index += 1) {
    const position = randomRoomPositionFromRooms(random, [room], occupied);
    const trapRule = chooseTrapRule(game.recipe, random);
    if (!position || !trapRule) {
      continue;
    }
    occupied.push(position);
    game.traps.push(createTrapInstance(trapRule, position));
  }
  specialRoom.triggered = true;
  log("Monster House! The room erupts with monsters, items, and traps.");
}

function visitSpecialRoom(specialRoom) {
  if (!specialRoom) {
    return;
  }
  const definition = specialRoomDefinitions[specialRoom.type];
  if (specialRoom.type === "shopkeeper" && !specialRoom.triggered) {
    specialRoom.triggered = true;
    log(`You enter a ${definition.name}. Step on stock and use the Floor action to buy it.`);
    return;
  }
  if (specialRoom.type === "monsterHouse" && !specialRoom.triggered) {
    triggerMonsterHouse(specialRoom);
    return;
  }
  if (specialRoom.type === "darkRoom" && !specialRoom.triggered) {
    specialRoom.triggered = true;
    log("This room is unnaturally dark. You will have to feel out its shape as you move.");
    return;
  }
  if (specialRoom.type === "gamblingRoom" && specialRoom.totemPos?.x === game.player.x && specialRoom.totemPos?.y === game.player.y) {
    triggerGamblingRoom(specialRoom);
  }
}

function buyShopFloorItem(entry) {
  const item = getItemDefinition(entry);
  const passiveHealRules = normalizePassiveHealBlockRules(game.recipe);
  if (!entry?.shopPrice) {
    return false;
  }
  const price = getShopPrice(entry);
  if (activeEffectIs("noPickup", "player")) {
    log("The environmental effect prevents you from buying items.");
    render();
    return false;
  }
  if (game.gold < price) {
    log(`${getVisibleItemName(entry)} costs ${price} gold, but you only have ${game.gold}.`);
    render();
    return false;
  }
  if (!hasInventorySpace()) {
    log(`Inventory is full (${getUsedInventorySpaces()} / ${getInventoryLimit()}). Make space before buying ${getVisibleItemName(entry)}.`);
    render();
    return false;
  }
  game.gold -= price;
  playSoundEffect("shopBuy");
  const itemIndex = game.items.indexOf(entry);
  if (itemIndex >= 0) {
    game.items.splice(itemIndex, 1);
  }
  const purchased = { ...entry };
  delete purchased.shopOwned;
  delete purchased.shopPrice;
  delete purchased.shopRoomId;
  game.inventory.push(purchased);
  trackRunStat("itemsPickedUp");
  trackGoalObtain(purchased.itemId);
  log(`Bought ${getVisibleItemName(purchased)} for ${price} gold.`);
  logDeductionHint(purchased);
  blockPassiveHealThisTurn(passiveHealRules.pickupExchange);
  checkCustomGoalCompletion();
  spendMenuTurn();
  return true;
}

function takeBackPendingSale(entry) {
  if (!entry?.pendingSale) {
    return false;
  }
  const item = getItemDefinition(entry);
  if (!hasInventorySpace()) {
    log(`Inventory is full (${getUsedInventorySpaces()} / ${getInventoryLimit()}). Make space before taking back ${getVisibleItemName(entry)}.`);
    render();
    return false;
  }
  const itemIndex = game.items.indexOf(entry);
  if (itemIndex >= 0) {
    game.items.splice(itemIndex, 1);
  }
  delete entry.pendingSale;
  delete entry.shopRoomId;
  game.inventory.push(entry);
  trackRunStat("itemsPickedUp");
  log(`Took back ${getVisibleItemName(entry)} from the shop floor.`);
  logDeductionHint(entry);
  render();
  return true;
}

function getEmptySlotHint(slot) {
  return slot === "leftHand" || slot === "rightHand" ? "Sword or shield" : "Bracelet";
}

function getInventorySortCategoryRank(entry) {
  const item = getItemDefinition(entry);
  if (!item) {
    return 999;
  }
  if (item.kind === "hand" && item.handType === "sword") {
    return 0;
  }
  if (item.kind === "hand" && item.handType === "shield") {
    return 1;
  }
  const categoryOrder = ["staff", "bracelet", "grass", "food", "scroll", "string", "utility"];
  const directRank = categoryOrder.indexOf(item.kind);
  return directRank >= 0 ? directRank + 2 : 999;
}

function compareInventoryEntries(left, right) {
  const leftRank = getInventorySortCategoryRank(left);
  const rightRank = getInventorySortCategoryRank(right);
  if (leftRank !== rightRank) {
    return leftRank - rightRank;
  }

  const leftItem = getItemWithInstance(left);
  const rightItem = getItemWithInstance(right);
  if (leftItem?.kind === "hand" && leftItem.handType === "sword" && rightItem?.kind === "hand" && rightItem.handType === "sword") {
    const attackDiff = getEffectiveStat(rightItem, "attack") - getEffectiveStat(leftItem, "attack");
    if (attackDiff !== 0) {
      return attackDiff;
    }
  }
  if (leftItem?.kind === "hand" && leftItem.handType === "shield" && rightItem?.kind === "hand" && rightItem.handType === "shield") {
    const defenseDiff = getEffectiveStat(rightItem, "defense") - getEffectiveStat(leftItem, "defense");
    if (defenseDiff !== 0) {
      return defenseDiff;
    }
  }

  return (getItemDefinition(left)?.name ?? "").localeCompare(getItemDefinition(right)?.name ?? "");
}

function sortInventoryByCategory() {
  const pinnedEntries = [];
  const sortableEntries = [];

  game.inventory.forEach((entry) => {
    if (entry?.pinned) {
      pinnedEntries.push(entry);
    } else {
      sortableEntries.push(entry);
    }
  });

  sortableEntries.sort(compareInventoryEntries);
  game.inventory = [...pinnedEntries, ...sortableEntries];
  log("Sorted inventory by category.");
  render();
}

function moveInventoryItem(fromIndex, toIndex) {
  if (
    !Number.isInteger(fromIndex) ||
    !Number.isInteger(toIndex) ||
    fromIndex < 0 ||
    toIndex < 0 ||
    fromIndex >= game.inventory.length ||
    toIndex >= game.inventory.length ||
    fromIndex === toIndex
  ) {
    return false;
  }
  const [entry] = game.inventory.splice(fromIndex, 1);
  game.inventory.splice(toIndex, 0, entry);
  return true;
}

function getItemCardClass(entry) {
  return [
    "item-card",
    isItemIdentified(entry) && getRarityRule(getItemRarity(entry)) ? "rarity-highlight" : "",
    isItemIdentified(entry) && getRarityRule(getItemRarity(entry)) ? getRarityEffectClass(entry) : "",
    entry?.curseRevealed ? "cursed" : "",
  ]
      .filter(Boolean)
      .join(" ");
}

function makeCarriedItemRow(entry, index) {
  const item = getItemWithInstance(entry);
  const card = document.createElement("article");
  card.className = `${getItemCardClass(entry)} compact-item-card`;
  card.style.cssText = buildRarityCardStyle(entry);
  card.draggable = true;
  card.dataset.index = String(index);

  const pin = document.createElement("button");
  pin.type = "button";
  pin.className = `inventory-pin${entry?.pinned ? " pinned" : ""}`;
  pin.dataset.action = "pin";
  pin.dataset.index = index;
  pin.textContent = entry?.pinned ? "📌" : "·";

  const icon = document.createElement("span");
  icon.className = "item-icon";
  icon.textContent = getItemIcon(item);

  const name = document.createElement("strong");
  name.textContent = getVisibleItemName(entry);
  appendItemStatusIcons(name, entry);

  const description = document.createElement("span");
  description.className = "item-description";
  description.textContent = `(${getVisibleItemDescription(entry)})`;

  const details = document.createElement("div");
  details.className = "compact-item-details";
  details.append(name, description);

  card.append(pin, icon, details, makeCarriedItemActions(item, index));
  return card;
}

function makeCarriedItemActions(item, index) {
  const actions = document.createElement("div");
  actions.className = "item-actions compact-item-actions";
  if (item.kind === "hand") {
    actions.append(makeInventoryAction("Add L", "equip", index, "leftHand"));
    actions.append(makeInventoryAction("Add R", "equip", index, "rightHand"));
    if (getRuneRulesForItem(item).some((rule) => rule.effectType === "driedBonito")) {
      actions.append(makeInventoryAction("Nibble", "nibble", index));
    }
  }
  if (item.kind === "bracelet") {
    actions.append(makeInventoryAction("Bracelet 1", "equip", index, "bracelet1"));
    actions.append(makeInventoryAction("Bracelet 2", "equip", index, "bracelet2"));
  }
  if (item.kind === "staff") {
    actions.append(makeInventoryAction("Cast", "cast", index));
  }
  if (item.kind === "grass" || item.kind === "food") {
    actions.append(makeInventoryAction("Use", "use", index));
  }
  if (item.kind === "scroll") {
    actions.append(makeInventoryAction("Read", "use", index));
  }
  if (item.kind === "string") {
    actions.append(makeInventoryAction("Use", "use", index));
  }
  if (item.kind === "utility") {
    actions.append(makeInventoryAction("Use", "use", index));
  }
  actions.append(makeInventoryAction("Drop", "drop", index));
  return actions;
}

function getItemIcon(item) {
  if (item.kind === "hand" && item.handType === "sword") {
    return "\u2694\uFE0F";
  }
  if (item.kind === "hand" && item.handType === "shield") {
    return "\u{1F6E1}\uFE0F";
  }
  if (item.kind === "bracelet") {
    return "\u{1F48D}";
  }
  if (item.kind === "staff") {
    return "\u{1FA84}";
  }
  if (item.kind === "grass") {
    return "\u{1F33F}";
  }
  if (item.kind === "food") {
    return "\u{1F35E}";
  }
  if (item.kind === "scroll") {
    return "\u{1F4DC}";
  }
  if (item.kind === "string") {
    return "\u{1F9F5}";
  }
  if (item.kind === "utility") {
    return "\u{1F4E6}";
  }
  if (item.kind === "gold") {
    return "\u{1FA99}";
  }
  return "\u25A1";
}

function makeItemSummary(entry, label = "") {
  const item = getItemWithInstance(entry);
  const wrapper = document.createElement("div");
  const stats = [getVisibleItemDescription(entry), entry?.shopPrice ? `Price ${getShopPrice(entry)} gold` : ""].filter(Boolean).join(", ");
  const title = document.createElement("strong");
  title.textContent = getVisibleItemName(entry);
  appendItemStatusIcons(title, entry);
  const description = document.createElement("p");
  description.textContent = stats;
  wrapper.append(title, description);
  return wrapper;
}

function getAttachedSpecialAttackNames(entry, recipe = game.recipe) {
  const attackIds = Array.isArray(entry?.specialAttackIds)
    ? entry.specialAttackIds
    : entry?.specialAttackId
      ? [entry.specialAttackId]
      : [];
  return normalizeSpecialAttackRules(recipe?.specialAttackRules)
    .filter((attack) => attack.enabled && attackIds.includes(attack.id))
    .map((attack) => attack.name);
}

function makeEquippedItemSummary(entry, slot) {
  const item = getItemWithInstance(entry);
  const wrapper = document.createElement("div");
  wrapper.className = "equipped-item-details";
  const isEditableHand = item?.kind === "hand" && (slot === "leftHand" || slot === "rightHand");
  const isEditing = isEditableHand && game.editingEquipmentNameSlot === slot;
  if (isEditing) {
    const input = document.createElement("input");
    input.type = "text";
    input.maxLength = 40;
    input.className = "equipment-name-input";
    input.dataset.slot = slot;
    input.value = typeof entry?.customName === "string" && entry.customName.trim()
      ? entry.customName.trim()
      : getBaseVisibleItemName(entry);
    wrapper.append(input);
  } else {
    const title = document.createElement(isEditableHand ? "button" : "strong");
    if (isEditableHand) {
      title.type = "button";
      title.className = "equipment-name-button";
      title.dataset.action = "rename_equipped";
      title.dataset.slot = slot;
    }
    title.textContent = getVisibleItemName(entry);
    appendItemStatusIcons(title, entry);
    wrapper.append(title);
  }
  if (!isItemIdentified(entry)) {
    const description = document.createElement("p");
    description.textContent = "Unknown info.";
    wrapper.append(description);
    return wrapper;
  }
  if (item?.kind === "hand") {
    const statLine = document.createElement("p");
    statLine.textContent = item.handType === "shield"
      ? `${getEffectiveStat(item, "defense")} Defense`
      : `${getEffectiveStat(item, "attack")} Attack`;
    wrapper.append(statLine);

    const specialAttackNames = getAttachedSpecialAttackNames(entry);
    if (specialAttackNames.length > 0) {
      const attackLine = document.createElement("p");
      attackLine.textContent = `Special Attack: ${specialAttackNames.join(", ")}`;
      wrapper.append(attackLine);
    }

    const runeNames = getRuneRulesForItem(entry).map((rune) => rune.name);
    if (runeNames.length > 0) {
      const runeLine = document.createElement("p");
      runeLine.textContent = `Rune: ${runeNames.join(", ")}`;
      wrapper.append(runeLine);
    }
    if (getRuneRulesForItem(item).some((rune) => rune.effectType === "driedBonito")) {
      const nibbleActions = document.createElement("div");
      nibbleActions.className = "item-actions";
      nibbleActions.append(makeInventoryAction("Nibble", "nibble_equipped", -1, slot));
      wrapper.append(nibbleActions);
    }
    return wrapper;
  }

  const description = document.createElement("p");
  description.textContent = [getVisibleItemDescription(entry), entry?.shopPrice ? `Price ${getShopPrice(entry)} gold` : ""].filter(Boolean).join(", ");
  wrapper.append(description);
  return wrapper;
}

function describeItem(item) {
  const parts = [];
  const attachedSpecialAttackNames = getAttachedSpecialAttackNames(item);
  if (attachedSpecialAttackNames.length > 0) {
    parts.push(`Special Attack: ${attachedSpecialAttackNames.join(", ")}`);
  }
  getRuneRulesForItem(item).forEach((runeRule) => {
    if (runeRule.effectType === "critical") {
      parts.push(`${runeRule.name}: ${runeRule.critChance}% for x${runeRule.critMultiplier} damage`);
    }
    if (runeRule.effectType === "healing") {
      parts.push(`${runeRule.name}: heal ${runeRule.healPercent}% of damage dealt`);
    }
    if (runeRule.effectType === "antiMonster") {
      parts.push(`${runeRule.name}: x${runeRule.bonusMultiplier} against ${getEnemyTypeName(runeRule.targetTypeId)}`);
    }
    if (runeRule.effectType === "rustproof") {
      parts.push(`${runeRule.name}: upgrade value cannot decrease`);
    }
    if (runeRule.effectType === "dulling") {
      parts.push(`${runeRule.name}: lose ${runeRule.dullAmount} upgrade on hit`);
    }
    if (runeRule.effectType === "cursedMight") {
      parts.push(`${runeRule.name}: cursed weapon gains +${runeRule.curseBonus} stat`);
    }
    if (runeRule.effectType === "hpPlus") {
      parts.push(`${runeRule.name}: +${runeRule.hpBonus} max HP while equipped`);
    }
    if (runeRule.effectType === "dangerPower") {
      parts.push(`${runeRule.name}: x${runeRule.bonusMultiplier} damage at or below ${runeRule.lowHpPercent}% HP`);
    }
    if (runeRule.effectType === "toughAtX") {
      parts.push(`${runeRule.name}: ${runeRule.toughReducePercent}% less damage when HP ends in ${runeRule.toughDigit}`);
    }
    if (runeRule.effectType === "trapProof") {
      parts.push(`${runeRule.name}: ${runeRule.trapNullifyChance}% chance to nullify traps`);
    }
    if (runeRule.effectType === "sating") {
      parts.push(`${runeRule.name}: hunger drains at half speed`);
    }
    if (runeRule.effectType === "fullArmor") {
      parts.push(`${runeRule.name}: ${runeRule.fullHpBlockPercent}% less damage at full HP`);
    }
    if (runeRule.effectType === "guts") {
      parts.push(`${runeRule.name}: ${runeRule.gutsChance}% chance to endure a fatal hit at 1 HP`);
    }
    if (runeRule.effectType === "driedBonito") {
      parts.push(`${runeRule.name}: nibble for ${runeRule.nibbleHunger} hunger, lose ${runeRule.nibblePenalty} upgrade`);
    }
    if (runeRule.effectType === "trapFinding") {
      parts.push(`${runeRule.name}: swings reveal traps two tiles ahead`);
    }
    if (runeRule.effectType === "trapBust") {
      parts.push(`${runeRule.name}: swings break traps directly ahead`);
    }
    if (runeRule.effectType === "wallDig") {
      parts.push(`${runeRule.name}: swinging into walls digs 1 tile open`);
    }
    if (runeRule.effectType === "criticalAt7") {
      parts.push(`${runeRule.name}: when HP ends in ${runeRule.criticalDigit}, hits become critical`);
    }
    if (runeRule.effectType === "quintessence") {
      parts.push(`${runeRule.name}: after 4 consecutive hits, the next hit is critical`);
    }
    if (runeRule.effectType === "thirdStrike") {
      parts.push(`${runeRule.name}: after 2 misses, the next attack is critical`);
    }
    if (runeRule.effectType === "voraciousHit") {
      parts.push(`${runeRule.name}: spend ${runeRule.hungerCost} hunger for x${runeRule.bonusMultiplier} damage`);
    }
    if (runeRule.effectType === "hungerPower") {
      parts.push(`${runeRule.name}: x${runeRule.bonusMultiplier} damage at 0 hunger`);
    }
    if (runeRule.effectType === "voraciousBlock") {
      parts.push(`${runeRule.name}: spend ${runeRule.hungerCost} hunger to reduce damage by ${runeRule.blockPercent}%`);
    }
    if (runeRule.effectType === "costlyHit") {
      parts.push(`${runeRule.name}: spend ${runeRule.goldCost} gold for x${runeRule.bonusMultiplier} damage`);
    }
    if (runeRule.effectType === "costlyBlock") {
      parts.push(`${runeRule.name}: spend ${runeRule.goldCost} gold to reduce damage by ${runeRule.blockPercent}%`);
    }
    if (runeRule.effectType === "critproof") {
      parts.push(`${runeRule.name}: ${runeRule.critproofPercent}% less damage from critical hits`);
    }
    if (runeRule.effectType === "antiMonsterGuard") {
      parts.push(`${runeRule.name}: ${runeRule.blockPercent}% less damage from ${getEnemyTypeName(runeRule.targetTypeId)}`);
    }
    if (runeRule.effectType === "keen") {
      parts.push(`${runeRule.name}: ${runeRule.evadeChance}% chance to evade enemy attacks`);
    }
    if (runeRule.effectType === "leapPayback") {
      parts.push(`${runeRule.name}: ${runeRule.paybackChance}% chance to warp attackers away`);
    }
    if (runeRule.effectType === "shadowPayback") {
      parts.push(`${runeRule.name}: ${runeRule.paybackChance}% chance to shadowbind attackers for 10 turns`);
    }
    if (runeRule.effectType === "retribution") {
      parts.push(`${runeRule.name}: reflect ${runeRule.reflectPercent}% of received damage`);
    }
    if (runeRule.effectType === "knockback") {
      parts.push(`${runeRule.name}: ${runeRule.knockbackChance}% chance to knock back 1 tile`);
    }
    if (runeRule.effectType === "thunderbolt") {
      parts.push(`${runeRule.name}: ${runeRule.thunderChance}% chance for ${runeRule.thunderDamage} extra damage and adjacent chain damage`);
    }
    if (runeRule.effectType === "frontalAttack") {
      parts.push(`${runeRule.name}: strike the front, left, and right tiles together`);
    }
    if (runeRule.effectType === "sideAttack") {
      parts.push(`${runeRule.name}: strike the front, left, and right tiles together`);
    }
    if (runeRule.effectType === "backAttack") {
      parts.push(`${runeRule.name}: strike the front and back tiles together`);
    }
    if (runeRule.effectType === "accurate") {
      parts.push(`${runeRule.name}: attacks always land`);
    }
    if (runeRule.effectType === "flameShot") {
      parts.push(`${runeRule.name}: at full HP, fire adds ${runeRule.flameDamage} damage`);
    }
    if (runeRule.effectType === "swiftStrikes") {
      parts.push(`${runeRule.name}: ${runeRule.swiftChance}% chance for a ${Math.round((runeRule.swiftPower ?? 0) * 100)}% follow-up hit`);
    }
    if (runeRule.effectType === "swordDulling") {
      parts.push(`${runeRule.name}: lose ${runeRule.dullAmount} attack and ${runeRule.dullAmount} upgrade on hit, stopping at 0 attack`);
    }
    if (runeRule.effectType === "shieldDulling") {
      parts.push(`${runeRule.name}: lose ${runeRule.dullAmount} defense and ${runeRule.dullAmount} upgrade when hit, stopping at 0 defense`);
    }
  });
  if (item.kind === "staff" && item.attack) {
    parts.push(`Cast ${item.attack} power spark`);
  }
  if (item.kind === "staff") {
    parts.push(`${item.charges ?? 0} charges`);
  }
  if (item.attack) {
    if (item.kind !== "staff") {
      parts.push(`Attack +${getEffectiveStat(item, "attack")}`);
    }
  }
  if (item.defense) {
    parts.push(`Defense +${getEffectiveStat(item, "defense")}`);
  }
  if (item.heal && item.kind !== "grass") {
    parts.push(`Heals ${item.heal} HP`);
  }
  if (item.hungerFill && item.kind !== "grass") {
    parts.push(`Fills ${item.hungerFill} hunger`);
  }
  if (item.attackBuff && item.kind !== "grass") {
    parts.push(`Temporary attack +${item.attackBuff}`);
  }
  if (item.defenseBuff && item.kind !== "grass") {
    parts.push(`Temporary defense +${item.defenseBuff}`);
  }
  if (item.duration && item.kind !== "grass") {
    parts.push(`${item.duration} turns`);
  }
  if (item.gold && item.kind !== "grass") {
    parts.push(`${item.gold} gold`);
  }
  const negateTrapEffect = getItemEffects(item).find((effect) => effect.enabled && effect.type === "negateTraps");
  if (item.negateTraps || negateTrapEffect) {
    if (item.kind === "bracelet") {
      parts.push("Negates trap effects");
    } else {
      parts.push(`Negates trap effects for ${Math.max(1, Number(negateTrapEffect?.extra || 12))} turns`);
    }
  }
  if (item.maxHpBonus) {
    parts.push(`Max HP +${item.maxHpBonus}`);
  }
  if (item.maxHungerBonus) {
    parts.push(`Max Hunger +${item.maxHungerBonus}`);
  }
  getItemEffects(item).forEach((effect) => {
    if (!effect.enabled) {
      return;
    }
    if (effect.type === "grassHeal") {
      parts.push(`Heals ${effect.value} HP`);
    } else if (effect.type === "grassMaxHpAtFull") {
      parts.push(`At full HP, max HP +${effect.value}`);
    } else if (effect.type === "grassRevive") {
      parts.push("Revives you after defeat");
    } else if (effect.type === "grassMaxHungerUp") {
      parts.push(`Max Hunger +${effect.value}`);
    } else if (effect.type === "grassMaxHungerDown") {
      parts.push(`Max Hunger -${effect.value}`);
    } else if (effect.type === "grassFireBreath") {
      parts.push(`Fire breath ${effect.value} damage`);
    } else if (effect.type === "grassLeap") {
      parts.push("Leaps you elsewhere on the floor");
    } else if (effect.type === "grassStrengthUp") {
      parts.push(`Strength +${effect.value}`);
    } else if (effect.type === "grassStrengthDown") {
      parts.push(`Strength -${effect.value}`);
    } else if (effect.type === "grassSelfDamage") {
      parts.push(`Deals ${effect.value} damage to you`);
    } else if (effect.type === "grassTrapSight") {
      parts.push("Lets you see traps");
    } else if (effect.type === "grassActionSpeed") {
      parts.push(`Haste for ${effect.value} turns`);
    } else if (effect.type === "grassAttackBuff") {
      parts.push(`Attack +3 for ${effect.value} turns`);
    } else if (effect.type === "grassDefenseBuff") {
      parts.push(`Defense +3 for ${effect.value} turns`);
    } else if (effect.type === "grassInvincible") {
      parts.push(`Invincible for ${effect.value} turns`);
    } else if (effect.type === "grassLevelUp") {
      parts.push(`Level +${effect.value}`);
    } else if (effect.type === "grassLevelDown") {
      parts.push(`Level -${effect.value}`);
    } else if (effect.type === "foodMaxHungerUp") {
      parts.push(`Max hunger +${effect.value}`);
    } else if (effect.type === "foodMaxHungerAtFull") {
      parts.push(`At full hunger, max hunger +${effect.value}`);
    } else if (effect.type === "foodRestoreAllHunger") {
      parts.push("Restores all hunger");
    } else if (effect.type === "foodSelfDamage") {
      parts.push(`Deals ${effect.value} damage to you`);
    } else if (effect.type === "foodFartWarp") {
      parts.push("Teleports all room enemies elsewhere");
    } else if (effect.type === "shopDiscount") {
      parts.push(`Shop prices -${effect.value}%`);
    } else if (effect.type === "trapmore") {
      parts.push(`Spawns new traps every ${effect.value} turns`);
    } else if (effect.type === "monstercall") {
      parts.push(`Monster respawn +${effect.value}%`);
    } else if (effect.type === "goldLosing") {
      parts.push(`Drops ${effect.extra || 20} gold every ${effect.value} steps`);
    } else if (effect.type === "itemLosing") {
      parts.push(`Drops an item every ${effect.value} steps`);
    } else if (effect.type === "tiptoe") {
      parts.push("Sleeping monsters do not wake from movement");
    } else if (effect.type === "wallPass") {
      parts.push(`Move through walls, take ${effect.value}% max HP inside`);
    } else if (effect.type === "daredevil") {
      parts.push(`${effect.value}% crit chance for everyone at x${effect.extra || 1.5}`);
    } else if (effect.type === "cursebreak") {
      parts.push("Prevents items from becoming cursed");
    } else if (effect.type === "rustproof") {
      parts.push("Stops equipped gear from losing upgrade value");
    } else if (effect.type === "fortune") {
      parts.push(`Gain ${effect.value} XP each turn`);
    } else if (effect.type === "strengthBonus") {
      parts.push(`Attack +${effect.value}`);
    }
  });
  if (item.scrollEffect === "uncurse") {
    parts.push(`Dispels ${item.scrollAmount ?? 1} curse${(item.scrollAmount ?? 1) === 1 ? "" : "s"}`);
  }
  if (item.scrollEffect === "upgradeSword") {
    parts.push(`Upgrades a sword by +${item.scrollAmount ?? 1}`);
  }
  if (item.scrollEffect === "downgradeSword") {
    parts.push(`Downgrades a sword by ${item.scrollAmount ?? 1}`);
  }
  if (item.scrollEffect === "upgradeShield") {
    parts.push(`Upgrades a shield by +${item.scrollAmount ?? 1}`);
  }
  if (item.scrollEffect === "downgradeShield") {
    parts.push(`Downgrades a shield by ${item.scrollAmount ?? 1}`);
  }
  if (item.scrollEffect === "clearTraps") {
    parts.push(`Erases ${item.scrollAmount ?? 1} floor trap${(item.scrollAmount ?? 1) === 1 ? "" : "s"}`);
  }
  if (item.kind === "string") {
    if (item.stringEffect === "preservation") {
      parts.push(`Holds ${item.storedItems?.length ?? 0}/${item.uses ?? 1} items`);
    }
    if (item.stringEffect === "synthesis") {
      parts.push(`Fuses swords or shields, ${item.stringUsesRemaining ?? item.uses ?? 1} uses left`);
    }
    if (item.stringEffect === "cashing") {
      parts.push(`Converts items into gold, ${item.stringUsesRemaining ?? item.uses ?? 1} uses left`);
    }
  }
  if (item.kind === "utility" && item.itemId === "hopeBox") {
    const categories = (item.eligibleCategories ?? [])
      .map((categoryId) => itemCategories.find((category) => category.id === categoryId)?.name)
      .filter(Boolean);
    parts.push(`${item.explosionPercent ?? 20}% explosion chance`);
    parts.push(`Can become ${categories.join(", ") || "nothing enabled"}`);
  }
  return parts.join(", ") || "No special effect yet.";
}

function processHungerTurn() {
  if (game.recipe?.hungerEnabled !== true || game.ended) {
    return;
  }

  game.hungerStepCounter += 1;
  const drainRate = Math.max(1, game.recipe.hungerDrainRate ?? 5) * (playerHasSatingRune() ? 2 : 1);
  if (game.hungerStepCounter >= drainRate) {
    game.hunger = Math.max(0, game.hunger - 1);
    game.hungerStepCounter = 0;
  }

  if (game.hunger > 0) {
    if (game.passiveHealBlockedThisTurn) {
      return;
    }
    const previousHp = game.hp;
    game.hp = Math.min(getPlayerMaxHp(), game.hp + 1);
    trackRunStat("healingRecovered", game.hp - previousHp);
    return;
  }

  trackRunStat("damageTaken", 1);
  game.hp = Math.max(0, game.hp - 1);
  if (game.hp <= 0) {
    endRun("defeat");
    statusLabel.textContent = "Collapsed from hunger.";
    log("You collapsed from hunger.", "error");
  }
}

function getItemPoolRule(recipe, itemId) {
  return normalizeItemPoolRules(recipe?.itemPoolRules).find((rule) => rule.itemId === itemId);
}

function getScrollInventoryEffectChance() {
  return 0.45;
}

function getOwnedEntries(includeEquipment = true) {
  const entries = [];
  if (includeEquipment) {
    ["leftHand", "rightHand", "bracelet1", "bracelet2"].forEach((slot) => {
      if (game.equipment[slot]) {
        entries.push({ entry: game.equipment[slot], slot, source: "equipment" });
      }
    });
  }
  game.inventory.forEach((entry, index) => {
    entries.push({ entry, index, source: "inventory" });
  });
  return entries;
}

function itemHasRuneEffect(entry, effectType) {
  const item = getItemWithInstance(entry);
  return getRuneRulesForItem(item).some((rule) => rule.effectType === effectType || rule.id === effectType);
}

function clampUpgradeValue(value, minimum = MIN_ITEM_UPGRADE, maximum = MAX_ITEM_UPGRADE) {
  return Math.max(minimum, Math.min(maximum, Number(value ?? 0)));
}

function getInventoryOnlyEntries() {
  return game.inventory.map((entry, index) => ({ entry, index, source: "inventory" }));
}

function applyUpgradeToEntry(entry, amount = 1, minimum = 0, maximum = MAX_ITEM_UPGRADE) {
  const current = clampUpgradeValue(entry.upgradeLevel, minimum, maximum);
  if (amount < 0 && (itemHasRuneEffect(entry, "rustproof") || playerHasBraceletRustproof())) {
    return 0;
  }
  const next = clampUpgradeValue(current + amount, minimum, maximum);
  const gained = next - current;
  entry.upgradeLevel = next;
  return gained;
}

function getMultiUpgradeAmount() {
  const roll = Math.random();
  if (roll < 0.18) {
    return 3;
  }
  if (roll < 0.52) {
    return 2;
  }
  return 1;
}

function clearPendingUpgradeChoice() {
  game.pendingUpgradeChoice = null;
}

function removeSpecificEntry(entry) {
  const inventoryIndex = game.inventory.indexOf(entry);
  if (inventoryIndex >= 0) {
    game.inventory.splice(inventoryIndex, 1);
    return true;
  }
  const floorIndex = game.items.indexOf(entry);
  if (floorIndex >= 0) {
    game.items.splice(floorIndex, 1);
    return true;
  }
  return false;
}

function applyUpgradeChoiceTarget(targetIndex) {
  const pending = game.pendingUpgradeChoice;
  if (!pending) {
    render();
    return false;
  }
  const target = pending.targets[targetIndex];
  if (!target?.entry) {
    render();
    return false;
  }

  const gained = applyUpgradeToEntry(target.entry, pending.amount, pending.minimum ?? 0, pending.maximum ?? MAX_ITEM_UPGRADE);
  if ((pending.amount >= 0 && gained <= 0) || (pending.amount < 0 && gained >= 0)) {
    log(pending.amount < 0
      ? `${getVisibleItemName(target.entry)} cannot be downgraded any further.`
      : `${getVisibleItemName(target.entry)} cannot be upgraded any further.`);
    clearPendingUpgradeChoice();
    render();
    return false;
  }

  if (pending.removeSourceOnApply !== false) {
    removeSpecificEntry(pending.sourceEntry);
    trackRunStat("itemsUsed");
  }
  const change = Math.abs(gained);
  log(pending.amount < 0
    ? `${pending.sourceName} downgrades ${getVisibleItemName(target.entry)}${change > 1 ? ` by ${change}` : ""}.`
    : `${pending.sourceName} upgrades ${getVisibleItemName(target.entry)}${change > 1 ? ` by +${change}` : ""}.`);
  applyConditionalItemUseEffect(pending.sourceEntry, getItemDefinition(pending.sourceEntry));
  clearPendingUpgradeChoice();
  spendMenuTurn();
  return true;
}

function beginEquipmentNameEdit(slot) {
  const entry = game.equipment?.[slot];
  const item = getItemDefinition(entry);
  if (!entry || item?.kind !== "hand" || !["leftHand", "rightHand"].includes(slot)) {
    return false;
  }
  game.editingEquipmentNameSlot = slot;
  render();
  return true;
}

function commitEquipmentNameEdit(slot, nextName) {
  const entry = game.equipment?.[slot];
  const item = getItemDefinition(entry);
  if (!entry || item?.kind !== "hand" || !["leftHand", "rightHand"].includes(slot)) {
    game.editingEquipmentNameSlot = null;
    render();
    return false;
  }
  const trimmed = String(nextName ?? "").trim();
  const baseName = getBaseVisibleItemName(entry);
  if (!trimmed || trimmed === baseName) {
    delete entry.customName;
  } else {
    entry.customName = trimmed;
  }
  game.editingEquipmentNameSlot = null;
  render();
  return true;
}

function cancelEquipmentNameEdit() {
  if (!game.editingEquipmentNameSlot) {
    return false;
  }
  game.editingEquipmentNameSlot = null;
  render();
  return true;
}

function readScroll(entry, item, removeEntry) {
  const rule = getItemPoolRule(game.recipe, item.itemId);
  const inventoryEffectRoll = Boolean(rule?.inventoryEffect) && Math.random() < getScrollInventoryEffectChance();

  if (item.scrollEffect === "uncurse") {
    const amount = Math.max(1, item.scrollAmount ?? 1);
    const targets = inventoryEffectRoll
      ? getInventoryOnlyEntries().filter(({ entry: candidate }) => candidate.cursed)
      : getOwnedEntries(true).filter(({ entry: candidate }) => candidate.cursed).slice(0, amount);
    if (targets.length === 0) {
      log(`${item.name} has no cursed item to affect.`);
      render();
      return false;
    }
    targets.forEach(({ entry: target }) => {
      target.cursed = false;
      target.curseRevealed = false;
      identifyItemType(target.itemId);
    });
    removeEntry();
    trackRunStat("itemsUsed");
    log(inventoryEffectRoll
      ? `${item.name} releases curses across your inventory.`
      : `${item.name} dispels a curse.`);
    applyConditionalItemUseEffect(entry, item);
    spendMenuTurn();
    return true;
  }

  if (["upgradeSword", "downgradeSword", "upgradeShield", "downgradeShield"].includes(item.scrollEffect)) {
    const handType = item.scrollEffect.includes("Sword") ? "sword" : "shield";
    const downgrade = item.scrollEffect.startsWith("downgrade");
    const targets = getOwnedEntries(true).filter(({ entry: candidate }) => {
      const definition = getItemDefinition(candidate);
      return definition?.kind === "hand" && definition?.handType === handType;
    });
    if (targets.length === 0) {
      log(`${item.name} has no ${handType} to affect.`);
      render();
      return false;
    }
    const amount = Math.max(1, item.scrollAmount ?? 1) * (rule?.inventoryEffect ? getMultiUpgradeAmount() : 1) * (downgrade ? -1 : 1);
    if (targets.length === 1) {
      const target = targets[0].entry;
      const gained = applyUpgradeToEntry(target, amount, downgrade ? -99 : 0, 3);
      if ((amount >= 0 && gained <= 0) || (amount < 0 && gained >= 0)) {
        log(downgrade
          ? `${getVisibleItemName(target)} cannot be downgraded any further.`
          : `${getVisibleItemName(target)} cannot be upgraded any further.`);
        render();
        return false;
      }
      removeEntry();
      trackRunStat("itemsUsed");
      const change = Math.abs(gained);
      log(downgrade
        ? `${item.name} downgrades ${getVisibleItemName(target)}${change > 1 ? ` by ${change}` : ""}.`
        : `${item.name} upgrades ${getVisibleItemName(target)}${change > 1 ? ` by +${change}` : ""}.`);
      applyConditionalItemUseEffect(entry, item);
      spendMenuTurn();
      return true;
    }

    game.pendingUpgradeChoice = {
      sourceEntry: entry,
      sourceName: item.name,
      handType,
      amount,
      minimum: downgrade ? -99 : 0,
      maximum: MAX_ITEM_UPGRADE,
      targets,
      removeSourceOnApply: true,
    };
    log(`${item.name} is ready. Choose which ${handType} to ${downgrade ? "downgrade" : "upgrade"}.`);
    render();
    return false;
  }

  if (item.scrollEffect === "clearTraps") {
    if (game.traps.length === 0) {
      log(`${item.name} finds no traps on this floor.`);
      render();
      return false;
    }
    removeEntry();
    trackRunStat("itemsUsed");
    const clearCount = Math.max(1, item.scrollAmount ?? 1);
    const removed = Math.min(clearCount, game.traps.length);
    game.traps.splice(0, removed);
    log(`${item.name} erases ${removed} trap${removed === 1 ? "" : "s"} from the floor.`);
    applyConditionalItemUseEffect(entry, item);
    spendMenuTurn();
    return true;
  }

  log("Nothing happens.");
  render();
  return false;
}

function startStaffCast(entry) {
  if (!game.recipe || game.ended || game.animatingProjectile || game.animatingMelee || game.processingTurn) {
    return false;
  }
  const item = getItemDefinition(entry);
  if ((entry?.charges ?? item?.charges ?? 0) <= 0) {
    log(`${getVisibleItemName(entry)} is empty.`);
    render();
    return false;
  }
  identifyIfPossible(entry);
  identifyAfterSuccessfulUse(entry);
  const identifiedItem = getItemDefinition(entry);
  game.pendingCast = entry;
  render();
  log(`Primed ${identifiedItem.name}. Choose a direction to cast.`);
  return true;
}

function getStaffProjectilePath(dx, dy) {
  const path = [];
  let x = game.player.x + dx;
  let y = game.player.y + dy;

  while (x >= 0 && y >= 0 && x < game.floorWidth && y < game.floorHeight) {
    path.push({ x, y });
    if (game.tiles[y]?.[x] === "wall") {
      return { path, impact: { type: "wall", x, y } };
    }
    const monsterIndex = game.monsters.findIndex((monster) => monster.x === x && monster.y === y);
    if (monsterIndex >= 0) {
      return { path, impact: { type: "monster", x, y, monsterIndex } };
    }
    if (bossOccupies(x, y)) {
      return { path, impact: { type: "boss", x, y } };
    }
    x += dx;
    y += dy;
  }

  return { path, impact: null };
}

async function castPendingStaff(dx, dy) {
  if (!game.pendingCast || game.animatingProjectile || !game.recipe || game.ended) {
    return;
  }

  const entry = game.pendingCast;
  const item = getItemDefinition(entry);
  const passiveHealRules = normalizePassiveHealBlockRules(game.recipe);
  if ((entry?.charges ?? item?.charges ?? 0) <= 0) {
    game.pendingCast = null;
    log(`${item?.name ?? "That staff"} is empty.`);
    render();
    return;
  }
  entry.charges = Math.max(0, (entry.charges ?? item.charges ?? 0) - 1);
  playSoundEffect("staffCast");
  trackRunStat("staffCasts");
  blockPassiveHealThisTurn(passiveHealRules.itemAction);
  game.pendingCast = null;
  game.animatingProjectile = true;

  const { path, impact } = getStaffProjectilePath(dx, dy);
  for (const step of path) {
    game.projectile = { x: step.x, y: step.y };
    render();
    await sleep(55);
  }

  game.projectile = null;

  if (impact?.type === "monster") {
    const monster = game.monsters[impact.monsterIndex];
    if (monster) {
      const deflect = getMonsterSkill(monster, "deflectStaff");
      if (deflect && enemySkillTriggers(deflect) && Math.random() * 100 < Number(deflect.value ?? 0)) {
        log(`${monster.name} bats away the staff magic. ${entry.charges} charge${entry.charges === 1 ? "" : "s"} left.`);
      } else if (!rollPlayerHit()) {
        log(`${item.name} misses the ${monster.name}. ${entry.charges} charge${entry.charges === 1 ? "" : "s"} left.`);
      } else {
      const damage = applyEnvironmentalDamage(rollDamage(getEffectiveStat(item, "attack"), monster.defense), "enemy");
      if (damage > 0) {
        blockPassiveHealThisTurn(passiveHealRules.attackDamage);
      }
      monster.hp -= damage;
      if (item.element === "water") {
        const weakened = getMonsterSkill(monster, "waterWeakens");
        if (weakened && enemySkillTriggers(weakened)) {
          const lost = applyAttackReductionToMonster(monster, Math.max(1, Number(weakened.value ?? 1)));
          if (lost > 0) {
            log(`${monster.name}'s attack drops by ${lost} from the water hit.`);
          }
        }
      }
      if (!game.ended && monster.hp > 0) {
        triggerElectrifyOnHits(monster);
      }
      log(`${item.name} hits the ${monster.name} for ${damage} damage. ${entry.charges} charge${entry.charges === 1 ? "" : "s"} left.`);
      if (monster.hp <= 0) {
        const defeatedMonster = monster;
        applyEnemyDeathSkillEffects(defeatedMonster);
        trackGoalKill(monster);
        awardXp(monster.xp, monster.name);
        game.monsters.splice(impact.monsterIndex, 1);
        trackRunStat("monstersDefeated");
        playSoundEffect("monsterDefeat");
        log(`The ${monster.name} is defeated.`);
        dropEnemyLoot(defeatedMonster);
        checkCustomGoalCompletion();
      }
      }
    }
  } else if (impact?.type === "boss") {
    const boss = game.boss;
    if (boss) {
      if (!rollPlayerHit()) {
        log(`${item.name} misses ${boss.name}. ${entry.charges} charge${entry.charges === 1 ? "" : "s"} left.`);
      } else {
        const damage = applyEnvironmentalDamage(rollDamage(getEffectiveStat(item, "attack"), boss.defense), "enemy");
        if (damage > 0) {
          blockPassiveHealThisTurn(passiveHealRules.attackDamage);
        }
        boss.hp -= damage;
        log(`${item.name} hits ${boss.name} for ${damage} damage. ${entry.charges} charge${entry.charges === 1 ? "" : "s"} left.`);
        if (boss.hp <= 0) {
          defeatBoss();
        }
      }
    }
  } else if (impact?.type === "wall") {
    log(`${item.name} dissipates against the wall. ${entry.charges} charge${entry.charges === 1 ? "" : "s"} left.`);
  } else {
    log(`${item.name} fades out in the distance. ${entry.charges} charge${entry.charges === 1 ? "" : "s"} left.`);
  }

  applyConditionalItemUseEffect(entry, item);
  game.animatingProjectile = false;
  advanceTurn();
  render();
}

function respawnMonsters() {
  if (!game.recipe || game.ended) {
    return;
  }

  const respawnRate = Math.max(0, game.recipe.monsterRespawnRate ?? 0) * getMonstercallRespawnMultiplier();
  const monsterCap = Math.max(1, game.recipe.monsterLimit ?? 12);
  if (respawnRate <= 0 || game.monsters.length >= monsterCap) {
    game.monsterRespawnCharge = Math.min(game.monsterRespawnCharge ?? 0, 0.99);
    return;
  }

  const playerRoom = findRoomAt(game.player);
  const respawnRooms = game.rooms.filter((room) => room !== playerRoom && getSpecialRoomForRoom(room)?.type !== "shopkeeper" && room.id !== game.bossRoom?.id);
  if (respawnRooms.length === 0) {
    return;
  }

  game.monsterRespawnCharge = (game.monsterRespawnCharge ?? 0) + (respawnRate / 20);
  if (game.monsterRespawnCharge < 1) {
    return;
  }

  const random = Math.random;
  const chosenRoom = chooseRespawnRoom(respawnRooms);
  if (!chosenRoom) {
    return;
  }
  const occupied = [game.player, game.exit, ...game.monsters, ...game.items, ...game.traps, ...getBossTiles()];
  const spawnPosition = randomRoomPositionFromRooms(random, [chosenRoom], occupied);
  if (!spawnPosition) {
    return;
  }

  const monsterVariant = chooseMonsterVariant(game.recipe, game.floor, random);
  if (!monsterVariant) {
    return;
  }

  game.monsters.push({ ...spawnPosition, ...createMonster(monsterVariant) });
  game.lastMonsterRespawnRoomId = chosenRoom.id;
  game.monsterRespawnCharge = Math.max(0, game.monsterRespawnCharge - 1);
}

function trySpawnTrapFromBracelet() {
  const rawInterval = getBraceletEffectMinValue("trapmore", 0);
  if (rawInterval <= 0) {
    return false;
  }
  const interval = Math.max(1, Math.round(rawInterval));
  const currentTurn = game.runStats?.turns ?? 0;
  if (currentTurn <= 0 || currentTurn % interval !== 0) {
    return false;
  }
  const trapRule = chooseTrapRule(game.recipe, Math.random);
  if (!trapRule) {
    return false;
  }
  const occupied = [game.player, game.exit, ...game.monsters, ...game.items, ...game.traps, ...game.sigils, ...getBossTiles()];
  const position = randomRoomPosition(Math.random, occupied);
  if (!position) {
    return false;
  }
  game.traps.push(createTrapInstance(trapRule, position));
  log(`${trapRule.name} forms elsewhere in the dungeon.`);
  return true;
}

function getNearbyDropPosition(origin = game.player) {
  const maxRadius = Math.max(game.floorWidth, game.floorHeight);
  for (let radius = 1; radius <= maxRadius; radius += 1) {
    const candidates = getDropRingAroundOrigin(origin, radius);
    const openSpot = candidates.find((position) => (
      game.tiles[position.y]?.[position.x] &&
      game.tiles[position.y][position.x] !== "wall" &&
      !game.items.some((item) => item.x === position.x && item.y === position.y)
    ));
    if (openSpot) {
      return openSpot;
    }
  }
  return null;
}

function dropGoldFromBraceletStep() {
  const rawInterval = getBraceletEffectMinValue("goldLosing", 0);
  if (rawInterval <= 0) {
    return false;
  }
  const interval = Math.max(1, Math.round(rawInterval));
  if ((game.playerWalkSteps ?? 0) <= 0 || game.playerWalkSteps % interval !== 0) {
    return false;
  }
  const amount = Math.min(game.gold, Math.max(1, Math.round(getBraceletEffectMaxExtra("goldLosing", 20))));
  if (amount <= 0) {
    return false;
  }
  const dropPosition = getNearbyDropPosition(game.player);
  if (!dropPosition) {
    return false;
  }
  game.gold = Math.max(0, game.gold - amount);
  game.items.push({
    ...createItemInstance("goldBundle", false, null, { gold: amount }),
    x: dropPosition.x,
    y: dropPosition.y,
  });
  log(`Gold-losing drops ${amount} gold as you walk.`);
  return true;
}

function dropItemFromBraceletStep() {
  const rawInterval = getBraceletEffectMinValue("itemLosing", 0);
  if (rawInterval <= 0) {
    return false;
  }
  const interval = Math.max(1, Math.round(rawInterval));
  if ((game.playerWalkSteps ?? 0) <= 0 || game.playerWalkSteps % interval !== 0) {
    return false;
  }
  if (!Array.isArray(game.inventory) || game.inventory.length === 0) {
    return false;
  }
  const dropPosition = getNearbyDropPosition(game.player);
  if (!dropPosition) {
    return false;
  }
  const inventoryIndex = Math.floor(Math.random() * game.inventory.length);
  const [entry] = game.inventory.splice(inventoryIndex, 1);
  if (!entry) {
    return false;
  }
  game.items.push({
    ...entry,
    x: dropPosition.x,
    y: dropPosition.y,
  });
  log(`Item-losing makes you drop ${getVisibleItemName(entry)}.`);
  return true;
}

function processBraceletStepEffects() {
  dropGoldFromBraceletStep();
  dropItemFromBraceletStep();
}

function applyWallPassTurnDamage() {
  if (!playerCanWallPass() || game.tiles[game.player.y]?.[game.player.x] !== "wall") {
    return;
  }
  const damage = Math.max(1, Math.ceil(getPlayerMaxHp() * (getWallPassPercent() / 100)));
  game.hp = Math.max(0, game.hp - damage);
  trackRunStat("damageTaken", damage);
  log(`Wallpass grinds you for ${damage} damage inside the wall.`);
  if (game.hp <= 0) {
    endRun("collapse");
    log("You collapsed in the dungeon. Generate or load a recipe to retry.");
  }
}

function applyFortuneBraceletTurnXp() {
  const xpAmount = Math.max(0, getBraceletEffectMaxValue("fortune", 0));
  if (!levelingEnabled() || xpAmount <= 0 || game.ended) {
    return;
  }
  game.xp += xpAmount;
  trackRunStat("xpEarned", xpAmount);
  while (game.level < 99) {
    const nextLevelXp = getNextLevelXp(game.level);
    if (nextLevelXp === null || game.xp < nextLevelXp) {
      break;
    }
    game.level += 1;
    trackRunStat("levelsGained");
    const changes = applyLevelUpStatChanges();
    log(`Level up! You reached level ${game.level}${changes.length > 0 ? `: ${changes.join(", ")}.` : "."}`);
  }
  checkCustomGoalCompletion();
}

async function advanceTurn(options = {}) {
  game.processingTurn = true;
  trackRunStat("turns");
  const hasteActive = hasEquippedEffect("haste");
  if (!hasteActive) {
    await moveMonsters();
    respawnMonsters();
  }
  trySpawnTrapFromBracelet();
  tickBuffs();
  if (processEnvironmentalTurn(options)) {
    resolveTile();
  }
  applyFortuneBraceletTurnXp();
  processHungerTurn();
  if (!game.ended) {
    applyWallPassTurnDamage();
  }
  game.passiveHealBlockedThisTurn = false;
  game.processingTurn = false;
  render();
}

function makeInventoryAction(label, action, index, slot = "") {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  button.dataset.action = action;
  button.dataset.index = index;
  button.dataset.slot = slot;
  return button;
}

function pickUpItem(entry) {
  const passiveHealRules = normalizePassiveHealBlockRules(game.recipe);
  const item = getItemDefinition(entry);
  if (item?.kind === "gold") {
    playSoundEffect("goldPickup");
    game.gold += item.gold || 0;
    trackGoalGold(item.gold || 0);
    trackGoalObtain(entry.itemId);
    log(`Picked up ${item.gold || 0} gold.`);
    blockPassiveHealThisTurn(passiveHealRules.pickupExchange);
    checkCustomGoalCompletion();
    return true;
  }
  if (!hasInventorySpace()) {
    log(`Inventory is full (${getUsedInventorySpaces()} / ${getInventoryLimit()}). Drop something before picking up ${getVisibleItemName(entry)}.`);
    return false;
  }

  game.inventory.push(entry);
  playSoundEffect("itemPickup");
  trackRunStat("itemsPickedUp");
  trackGoalObtain(entry.itemId);
  log(`Picked up ${getVisibleItemName(entry)}.`);
  logDeductionHint(entry);
  blockPassiveHealThisTurn(passiveHealRules.pickupExchange);
  checkCustomGoalCompletion();
  return true;
}

function equipItem(entry, announce = true, force = false, forcedSlot = null, options = {}) {
  const playSound = options.playSound !== false;
  const item = getItemWithInstance(entry);
  if (!item || !["hand", "bracelet"].includes(item.kind)) {
    return false;
  }

  const previousMaxHp = getPlayerMaxHp();
  const slot = forcedSlot ?? chooseEquipmentSlot(item, force);
  if (!slot) {
    game.inventory.push(entry);
    if (announce) {
      log(`Packed ${getVisibleItemName(entry)}; equipped items are stronger.`);
    }
    return false;
  }
  if (!canEquipIntoSlot(slot)) {
    game.inventory.push(entry);
    log(`Inventory is full (${getUsedInventorySpaces()} / ${getInventoryLimit()}). Make space before equipping ${getVisibleItemName(entry)}.`);
    return false;
  }
  if (isLockedCursedEquipment(game.equipment[slot])) {
    game.inventory.push(entry);
    log(`${getVisibleItemName(game.equipment[slot])} is cursed and cannot be removed.`);
    return false;
  }

  const current = game.equipment[slot];
  if (current) {
    game.inventory.push(current);
  }
  if (entry.cursed) {
    entry.curseRevealed = true;
    log(`${getVisibleItemName(entry)} is cursed!`);
  } else {
    identifyIfPossible(entry);
  }
  game.equipment[slot] = entry;
  if (playSound) {
    playSoundEffect("equipItem");
  }
  syncHpAfterEquipmentChange(previousMaxHp);
  if (announce) {
    log(`Equipped ${getVisibleItemName(entry)}.`);
  }
  applyConditionalItemUseEffect(entry, item);
  if (game.revealed.length > 0) {
    revealCurrentView();
  }
  return true;
}

function isLockedCursedEquipment(entry) {
  const item = entry ? getItemDefinition(entry) : null;
  return Boolean(entry?.cursed && entry?.curseRevealed && ["hand", "bracelet"].includes(item?.kind));
}

function chooseEquipmentSlot(item, force) {
  const slots = item.kind === "hand" ? ["leftHand", "rightHand"] : ["bracelet1", "bracelet2"];
  const emptySlot = slots.find((slot) => !game.equipment[slot]);
  if (emptySlot) {
    return emptySlot;
  }
  if (force) {
    return slots[0];
  }

  const nextPower = getItemEquipPower(item);
  const weakestSlot = slots.reduce((weakest, slot) => {
    const weakestItem = getItemWithInstance(game.equipment[weakest]) ?? {};
    const slotItem = getItemWithInstance(game.equipment[slot]) ?? {};
    return getItemEquipPower(slotItem) < getItemEquipPower(weakestItem) ? slot : weakest;
  }, slots[0]);
  const weakestItem = getItemWithInstance(game.equipment[weakestSlot]) ?? {};
  return nextPower > getItemEquipPower(weakestItem) ? weakestSlot : null;
}

function getItemEquipPower(item) {
  return getEffectiveStat(item, "attack") + getEffectiveStat(item, "defense") + (item.maxHpBonus || 0) + (item.negateTraps ? 10 : 0);
}

function syncHpAfterEquipmentChange(previousMaxHp) {
  const nextMaxHp = getPlayerMaxHp();
  if (nextMaxHp > previousMaxHp) {
    game.hp += nextMaxHp - previousMaxHp;
  }
  game.hp = Math.min(game.hp, nextMaxHp);
}

function unequipItem(slot) {
  const entry = game.equipment[slot];
  if (!entry) {
    return false;
  }
  if (isLockedCursedEquipment(entry)) {
    log(`${getVisibleItemName(entry)} is cursed and cannot be removed.`);
    render();
    return false;
  }
  if (wouldUnequipOverflowInventory()) {
    log(`Inventory is full (${getUsedInventorySpaces()} / ${getInventoryLimit()}). Make space before removing ${getVisibleItemName(entry)}.`);
    render();
    return false;
  }

  const previousMaxHp = getPlayerMaxHp();
  game.equipment[slot] = null;
  game.inventory.push(entry);
  playSoundEffect("unequipItem");
  syncHpAfterEquipmentChange(previousMaxHp);
  log(`Removed ${getVisibleItemName(entry)}.`);
  spendMenuTurn();
  return true;
}

function equipCarriedItem(index, forcedSlot = null) {
  const entry = game.inventory[index];
  if (!entry) {
    return false;
  }

  const [removedEntry] = game.inventory.splice(index, 1);
  const equipped = equipItem(removedEntry, true, true, forcedSlot);
  if (!equipped) {
    const duplicateIndex = game.inventory.indexOf(removedEntry);
    if (duplicateIndex >= 0) {
      game.inventory.splice(duplicateIndex, 1);
    }
    game.inventory.splice(index, 0, removedEntry);
    return false;
  }

  spendMenuTurn();
  return true;
}

function useConsumable(itemId = "bitterGrass") {
  if (!game.recipe || game.ended) {
    return false;
  }

  const itemIndex = game.inventory.findIndex((entry) => getItemId(entry) === itemId);
  if (itemIndex < 0) {
    const item = itemDefinitions[itemId];
    log(`No ${item?.name ?? titleCase(itemId)} to use.`);
    render();
    return false;
  }
  return useInventoryEntry(itemIndex);
}

function useInventoryEntry(itemIndex) {
  if (!game.recipe || game.ended) {
    return false;
  }

  const entry = game.inventory[itemIndex];
  return useItemEntry(
    entry,
    () => game.inventory.splice(itemIndex, 1),
    (nextEntry) => game.inventory.splice(itemIndex, 1, nextEntry),
  );
}

function getHopeBoxEligiblePoolRules(entry, recipe = game.recipe) {
  const item = getItemDefinition(entry);
  const selectedCategories = Array.isArray(item?.eligibleCategories) && item.eligibleCategories.length > 0
    ? item.eligibleCategories
    : itemCategories.map((category) => category.id);
  return getSpawnableItemPoolRules(recipe).filter((rule) => (
    rule.enabled
    && selectedCategories.includes(getItemCategoryId(rule.itemId))
    && itemDefinitions[rule.itemId]?.kind !== "gold"
  ));
}

function getHopeBoxExplosionDamage() {
  return Math.max(6, Math.ceil(getPlayerMaxHp() * 0.2));
}

function resolveHopeBox(entry, removeEntry, replaceEntry) {
  const item = getItemDefinition(entry);
  identifyIfPossible(entry);
  identifyAfterSuccessfulUse(entry);
  blockPassiveHealThisTurn(normalizePassiveHealBlockRules(game.recipe).itemAction);
  trackRunStat("itemsUsed");

  if (Math.random() * 100 < (item?.explosionPercent ?? 20)) {
    removeEntry();
    const damage = applyEnvironmentalDamage(getHopeBoxExplosionDamage(), "player");
    game.hp = Math.max(0, game.hp - damage);
    trackRunStat("damageTaken", damage);
    log(`${item?.name ?? "Hope Box"} explodes and hits you for ${damage} damage!`, "error");
    if (game.hp <= 0) {
      endRun("collapse");
      log("You collapsed in the dungeon. Generate or load a recipe to retry.");
      render();
      return true;
    }
    advanceTurn();
    render();
    return true;
  }

  const eligibleRules = getHopeBoxEligiblePoolRules(entry, game.recipe);
  if (eligibleRules.length === 0) {
    log(`${item?.name ?? "Hope Box"} rattles, but no eligible item categories are enabled.`);
    render();
    return false;
  }

  const chosenRule = eligibleRules[Math.floor(Math.random() * eligibleRules.length)];
  const newEntry = createSpawnedItem(game.recipe, chosenRule.itemId, Math.random);
  replaceEntry(newEntry);
  log(`${item?.name ?? "Hope Box"} turns into ${getVisibleItemName(newEntry)}.`);
  applyConditionalItemUseEffect(entry, item);
  advanceTurn();
  render();
  return true;
}

function consumeBlessing(entry, item) {
  if (entry?.blessed && !entry?.cursed && isBlessableItem(item ?? entry)) {
    identifyItemType(entry.itemId);
    entry.blessed = false;
    return true;
  }
  return false;
}

function nibbleWeaponEntry(entry) {
  const item = getItemWithInstance(entry);
  if (!item || item.kind !== "hand") {
    return false;
  }
  const driedBonitoRunes = getRuneRulesForItem(item).filter((rule) => rule.effectType === "driedBonito");
  if (driedBonitoRunes.length === 0) {
    return false;
  }
  if (game.recipe?.hungerEnabled !== true) {
    log(`${getVisibleItemName(entry)} cannot be nibbled while hunger is disabled.`);
    render();
    return false;
  }
  const totalHunger = driedBonitoRunes.reduce((sum, rule) => sum + Math.max(0, Number(rule.nibbleHunger ?? 0)), 0);
  const totalPenalty = driedBonitoRunes.reduce((sum, rule) => sum + Math.max(0, Number(rule.nibblePenalty ?? 0)), 0);
  if (totalHunger <= 0) {
    render();
    return false;
  }
  const previousHunger = game.hunger;
  game.hunger = Math.min(getPlayerMaxHunger(), game.hunger + totalHunger);
  const restored = game.hunger - previousHunger;
  if (totalPenalty > 0) {
    applyUpgradeToEntry(entry, -totalPenalty, MIN_ITEM_UPGRADE, MAX_ITEM_UPGRADE);
  }
  log(`You nibble ${getVisibleItemName(entry)} and restore ${restored} hunger.`);
  if (totalPenalty > 0) {
    const nextUpgrade = clampUpgradeValue(entry.upgradeLevel, MIN_ITEM_UPGRADE, MAX_ITEM_UPGRADE);
    log(`${getVisibleItemName(entry)} drops to upgrade ${nextUpgrade >= 0 ? `+${nextUpgrade}` : nextUpgrade}.`);
  }
  spendMenuTurn();
  return true;
}

function beginStringAction(entry) {
  const item = getItemDefinition(entry);
  if (!entry || item?.kind !== "string") {
    return false;
  }
  if (item.stringEffect !== "preservation" && getStringUsesRemaining(entry) <= 0) {
    log(`${getVisibleItemName(entry)} is spent.`);
    render();
    return false;
  }
  identifyAfterSuccessfulUse(entry);
  game.pendingStringAction = {
    entry,
    mode: item.stringEffect,
    primaryRef: null,
  };
  render();
  return false;
}

function consumeStringUse(entry) {
  const current = getStringUsesRemaining(entry);
  entry.stringUsesRemaining = Math.max(0, current - 1);
  return entry.stringUsesRemaining;
}

function removeOwnedEntry(target) {
  if (!target?.entry) {
    return false;
  }
  if (target.source === "inventory" && Number.isInteger(target.index)) {
    game.inventory.splice(target.index, 1);
    return true;
  }
  if (target.source === "equipment" && target.slot && game.equipment[target.slot] === target.entry) {
    const previousMaxHp = getPlayerMaxHp();
    game.equipment[target.slot] = null;
    syncHpAfterEquipmentChange(previousMaxHp);
    return true;
  }
  return removeSpecificEntry(target.entry);
}

function storeItemInPreservationString(inventoryIndex) {
  const pending = game.pendingStringAction;
  const stringEntry = pending?.entry;
  const item = getItemDefinition(stringEntry);
  if (!stringEntry || item?.stringEffect !== "preservation") {
    return false;
  }
  const capacity = Math.max(1, Number(item.uses ?? 1));
  stringEntry.storedItems = getPreservationStoredItems(stringEntry);
  if (stringEntry.storedItems.length >= capacity) {
    log(`${getVisibleItemName(stringEntry)} cannot hold any more items.`);
    render();
    return false;
  }
  const entry = game.inventory[inventoryIndex];
  if (!entry || entry === stringEntry || getItemDefinition(entry)?.kind === "string") {
    render();
    return false;
  }
  game.inventory.splice(inventoryIndex, 1);
  stringEntry.storedItems.push(entry);
  log(`${getVisibleItemName(stringEntry)} stores ${getVisibleItemName(entry)}.`);
  render();
  return false;
}

function takeItemOutOfPreservationString(storedIndex) {
  const pending = game.pendingStringAction;
  const stringEntry = pending?.entry;
  const item = getItemDefinition(stringEntry);
  if (!stringEntry || item?.stringEffect !== "preservation") {
    return false;
  }
  stringEntry.storedItems = getPreservationStoredItems(stringEntry);
  const entry = stringEntry.storedItems[storedIndex];
  if (!entry) {
    render();
    return false;
  }
  if (!hasInventorySpace()) {
    log(`Inventory is full (${getUsedInventorySpaces()} / ${getInventoryLimit()}).`);
    render();
    return false;
  }
  stringEntry.storedItems.splice(storedIndex, 1);
  game.inventory.push(entry);
  log(`${getVisibleItemName(stringEntry)} returns ${getVisibleItemName(entry)} to your inventory.`);
  render();
  return false;
}

function chooseSynthesisPrimary(targetIndex) {
  const pending = game.pendingStringAction;
  if (!pending?.entry) {
    return false;
  }
  const candidates = getOwnedEntries(true)
    .filter(({ entry }) => entry !== pending.entry)
    .filter(({ entry }) => getItemDefinition(entry)?.kind === "hand");
  const target = candidates[targetIndex];
  if (!target) {
    render();
    return false;
  }
  pending.primaryRef = target;
  render();
  return false;
}

function fuseWithSynthesisString(targetIndex) {
  const pending = game.pendingStringAction;
  const stringEntry = pending?.entry;
  const stringItem = getItemDefinition(stringEntry);
  const primary = pending?.primaryRef;
  if (!stringEntry || stringItem?.stringEffect !== "synthesis" || !primary?.entry) {
    return false;
  }
  const candidates = getOwnedEntries(true)
    .filter(({ entry }) => entry !== stringEntry)
    .filter(({ entry }) => {
      const candidateItem = getItemDefinition(entry);
      const primaryItem = getItemDefinition(primary.entry);
      return candidateItem?.kind === "hand" && candidateItem.handType === primaryItem?.handType && entry !== primary.entry;
    });
  const secondary = candidates[targetIndex];
  if (!secondary) {
    render();
    return false;
  }
  const primaryEntry = primary.entry;
  applyUpgradeToEntry(primaryEntry, Number(secondary.entry.upgradeLevel ?? 0), MIN_ITEM_UPGRADE, MAX_ITEM_UPGRADE);
  primaryEntry.runeIds = [...new Set([...(primaryEntry.runeIds ?? []), ...(secondary.entry.runeIds ?? [])])];
  removeOwnedEntry(secondary);
  if (primary.source === "equipment" && primary.slot && game.equipment[primary.slot] === primaryEntry) {
    const previousMaxHp = getPlayerMaxHp();
    game.equipment[primary.slot] = null;
    syncHpAfterEquipmentChange(previousMaxHp);
  } else if (primary.source === "inventory" && Number.isInteger(primary.index)) {
    const liveIndex = game.inventory.indexOf(primaryEntry);
    if (liveIndex >= 0) {
      game.inventory.splice(liveIndex, 1);
    }
  }
  game.inventory.push(primaryEntry);
  const remaining = consumeStringUse(stringEntry);
  trackRunStat("itemsUsed");
  log(`${getVisibleItemName(stringEntry)} fuses ${getVisibleItemName(secondary.entry)} into ${getVisibleItemName(primaryEntry)}.`);
  applyConsumableEffects(stringEntry, stringItem, {
    sourceName: stringItem?.name,
    sourceEntry: stringEntry,
    removeSourceOnApply: false,
  });
  if (remaining <= 0) {
    if (!removeSpecificEntry(stringEntry)) {
      const stringIndex = game.inventory.indexOf(stringEntry);
      if (stringIndex >= 0) {
        game.inventory.splice(stringIndex, 1);
      }
    }
    log(`${getVisibleItemName(stringEntry)} unravels after its last use.`);
  }
  clearPendingStringAction();
  spendMenuTurn();
  return true;
}

function cashItemWithString(targetIndex) {
  const pending = game.pendingStringAction;
  const stringEntry = pending?.entry;
  const stringItem = getItemDefinition(stringEntry);
  if (!stringEntry || stringItem?.stringEffect !== "cashing") {
    return false;
  }
  const candidates = getOwnedEntries(true).filter(({ entry }) => entry !== stringEntry);
  const target = candidates[targetIndex];
  if (!target?.entry) {
    render();
    return false;
  }
  const gold = getEntrySellValue(target.entry);
  const name = getVisibleItemName(target.entry);
  removeOwnedEntry(target);
  game.gold += gold;
  trackGoalGold(gold);
  const remaining = consumeStringUse(stringEntry);
  trackRunStat("itemsUsed");
  log(`${getVisibleItemName(stringEntry)} cashes ${name} for ${gold} gold.`);
  applyConsumableEffects(stringEntry, stringItem, {
    sourceName: stringItem?.name,
    sourceEntry: stringEntry,
    removeSourceOnApply: false,
  });
  if (remaining <= 0) {
    if (!removeSpecificEntry(stringEntry)) {
      const stringIndex = game.inventory.indexOf(stringEntry);
      if (stringIndex >= 0) {
        game.inventory.splice(stringIndex, 1);
      }
    }
    log(`${getVisibleItemName(stringEntry)} unravels after its last use.`);
  }
  clearPendingStringAction();
  spendMenuTurn();
  return true;
}

function applyConsumableEffects(entry, item, options = {}) {
  const {
    sourceName = item?.name ?? getVisibleItemName(entry),
    sourceEntry = entry,
    removeSourceOnApply = false,
  } = options;
  const effects = getItemEffects(entry).filter((effect) => effect?.enabled);
  let appliedAny = false;
  let pendingChoice = false;
  const applyGrassBurstDamage = (damageAmount) => {
    const targets = [];
    game.monsters.forEach((monster, monsterIndex) => {
      if (Math.max(Math.abs(monster.x - game.player.x), Math.abs(monster.y - game.player.y)) <= 1) {
        targets.push({ kind: "monster", monster, monsterIndex });
      }
    });
    if (game.boss && getDistanceToBoss(game.player.x, game.player.y, game.boss) <= 1) {
      targets.push({ kind: "boss", boss: game.boss });
    }
    if (targets.length === 0) {
      log(`${sourceName} breathes fire, but nothing is close enough to burn.`);
      return false;
    }
    targets.forEach((target) => {
      if (target.kind === "monster") {
        const damage = applyEnvironmentalDamage(Math.max(1, damageAmount), "enemy");
        target.monster.hp -= damage;
        log(`${sourceName} scorches the ${target.monster.name} for ${damage} damage.`);
      } else if (target.kind === "boss") {
        const damage = applyEnvironmentalDamage(Math.max(1, damageAmount), "enemy");
        target.boss.hp -= damage;
        log(`${sourceName} scorches ${target.boss.name} for ${damage} damage.`);
      }
    });
    for (let index = game.monsters.length - 1; index >= 0; index -= 1) {
      const monster = game.monsters[index];
      if (monster.hp <= 0) {
        const defeatedMonster = monster;
        applyEnemyDeathSkillEffects(defeatedMonster);
        trackGoalKill(monster);
        awardXp(monster.xp, monster.name);
        game.monsters.splice(index, 1);
        trackRunStat("monstersDefeated");
        playSoundEffect("monsterDefeat");
        log(`The ${monster.name} is defeated.`);
        dropEnemyLoot(defeatedMonster);
        checkCustomGoalCompletion();
      }
    }
    if (game.boss && game.boss.hp <= 0) {
      defeatBoss();
    }
    return true;
  };
  const warpRoomEnemiesAway = () => {
    const room = findRoomAt(game.player);
    if (!room) {
      log(`${sourceName} rumbles, but there is no roomful of enemies to scatter.`);
      return false;
    }
    let moved = 0;
    game.monsters.forEach((monster) => {
      if (!pointInRoom(monster, room)) {
        return;
      }
      const occupied = [game.player, game.exit, ...game.monsters.filter((other) => other !== monster), ...game.items, ...game.traps, ...getBossTiles()];
      const destination = randomRoomPosition(Math.random, occupied);
      if (!destination || (destination.x === monster.x && destination.y === monster.y)) {
        return;
      }
      monster.x = destination.x;
      monster.y = destination.y;
      moved += 1;
    });
    if (moved > 0) {
      log(`${sourceName} sends ${moved} ${moved === 1 ? "enemy" : "enemies"} flying away with a terrible fart.`);
      return true;
    }
    log(`${sourceName} rumbles, but no enemies in the room are moved.`);
    return false;
  };

  effects.forEach((effect) => {
    const amount = Number(effect.value || 0);
    const extra = Number(effect.extra || 0);

    if (effect.type === "grassHeal" && amount !== 0) {
      const previousHp = game.hp;
      game.hp = Math.min(getPlayerMaxHp(), Math.max(0, game.hp + amount));
      const healed = game.hp - previousHp;
      trackRunStat("healingRecovered", Math.max(0, healed));
      log(`${sourceName} heals HP by ${Math.abs(healed || amount)}.`);
      handleHealingItemEnemySkill(Math.max(0, healed || amount));
      appliedAny = true;
      return;
    }

    if (effect.type === "grassMaxHpAtFull" && amount !== 0) {
      if (game.hp >= getPlayerMaxHp()) {
        const previousMax = getPlayerMaxHp();
        game.permanentBonuses.maxHp += amount;
        const nextMax = getPlayerMaxHp();
        game.hp = Math.min(nextMax, game.hp + Math.max(0, nextMax - previousMax));
        log(`${sourceName} raises max HP by ${amount} because your HP was full.`);
        appliedAny = true;
      } else {
        log(`${sourceName} fizzles because your HP is not full.`);
      }
      return;
    }

    if (effect.type === "grassRevive") {
      game.reviveCharges = Math.max(0, game.reviveCharges ?? 0) + 1;
      log(`${sourceName} grants a revival ward.`);
      appliedAny = true;
      return;
    }

    if (effect.type === "grassMaxHungerUp" && amount > 0) {
      if (game.recipe?.hungerEnabled === true) {
        const previousMax = getPlayerMaxHunger();
        game.permanentBonuses.maxHunger += amount;
        const nextMax = getPlayerMaxHunger();
        game.hungerMax = nextMax;
        game.hunger = Math.min(nextMax, game.hunger + Math.max(0, nextMax - previousMax));
        log(`${sourceName} raises max hunger by ${amount}.`);
        appliedAny = true;
      } else {
        log(`${sourceName} fizzles because hunger is disabled in this recipe.`);
      }
      return;
    }

    if (effect.type === "grassMaxHungerDown" && amount > 0) {
      if (game.recipe?.hungerEnabled === true) {
        game.permanentBonuses.maxHunger -= amount;
        game.hungerMax = getPlayerMaxHunger();
        game.hunger = Math.min(game.hunger, game.hungerMax);
        log(`${sourceName} lowers max hunger by ${amount}.`);
        appliedAny = true;
      } else {
        log(`${sourceName} fizzles because hunger is disabled in this recipe.`);
      }
      return;
    }

    if (effect.type === "grassFireBreath" && amount > 0) {
      appliedAny = applyGrassBurstDamage(amount) || appliedAny;
      return;
    }

    if (effect.type === "grassLeap") {
      const destination = getRandomWarpPlayerDestination();
      if (!destination) {
        log(`${sourceName} crackles, but nowhere safe opens up.`);
      } else {
        game.player = destination;
        revealCurrentView();
        log(`${sourceName} leaps you elsewhere on the floor.`);
        appliedAny = true;
      }
      return;
    }

    if (effect.type === "grassStrengthUp" && amount > 0) {
      game.permanentBonuses.attack += amount;
      log(`${sourceName} raises strength by ${amount}.`);
      appliedAny = true;
      return;
    }

    if (effect.type === "grassStrengthDown" && amount > 0) {
      game.permanentBonuses.attack -= amount;
      log(`${sourceName} lowers strength by ${amount}.`);
      appliedAny = true;
      return;
    }

    if (effect.type === "grassSelfDamage" && amount > 0) {
      const damage = applyEnvironmentalDamage(amount, "player");
      trackRunStat("damageTaken", damage);
      game.hp = Math.max(0, game.hp - damage);
      log(`${sourceName} hits you for ${damage} damage.`);
      if (game.hp <= 0) {
        game.hp = 0;
        endRun("collapse");
        if (!game.ended) {
          appliedAny = true;
          return;
        }
        log("You collapsed in the dungeon. Generate or load a recipe to retry.");
      }
      appliedAny = true;
      return;
    }

    if (effect.type === "grassTrapSight") {
      revealAllTraps();
      trackRunStat("buffsApplied");
      addOrRefreshBuff({
        name: `${sourceName} Trap Sight`,
        attack: 0,
        defense: 0,
        seeTraps: true,
        turns: 20,
      });
      log(`${sourceName} reveals nearby traps to you.`);
      appliedAny = true;
      return;
    }

    if (effect.type === "grassActionSpeed" && amount > 0) {
      trackRunStat("buffsApplied");
      addOrRefreshBuff({
        name: `${sourceName} Haste`,
        attack: 0,
        defense: 0,
        haste: true,
        turns: Math.max(1, amount),
      });
      log(`${sourceName} speeds you up for ${Math.max(1, amount)} turns.`);
      appliedAny = true;
      return;
    }

    if (effect.type === "grassAttackBuff" && amount > 0) {
      trackRunStat("buffsApplied");
      addOrRefreshBuff({
        name: sourceName,
        attack: 3,
        defense: 0,
        turns: Math.max(1, amount),
      });
      log(`${sourceName} raises attack for ${Math.max(1, amount)} turns.`);
      appliedAny = true;
      return;
    }

    if (effect.type === "grassDefenseBuff" && amount > 0) {
      trackRunStat("buffsApplied");
      addOrRefreshBuff({
        name: `${sourceName} Guard`,
        attack: 0,
        defense: 3,
        turns: Math.max(1, amount),
      });
      log(`${sourceName} raises defense for ${Math.max(1, amount)} turns.`);
      appliedAny = true;
      return;
    }

    if (effect.type === "grassInvincible" && amount > 0) {
      trackRunStat("buffsApplied");
      addOrRefreshBuff({
        name: `${sourceName} Invincibility`,
        attack: 0,
        defense: 0,
        invincible: true,
        turns: Math.max(1, amount),
      });
      log(`${sourceName} makes you invincible for ${Math.max(1, amount)} turns.`);
      appliedAny = true;
      return;
    }

    if (effect.type === "grassLevelUp" && amount > 0) {
      appliedAny = adjustPlayerLevel(amount, sourceName) !== 0 || appliedAny;
      return;
    }

    if (effect.type === "grassLevelDown" && amount > 0) {
      appliedAny = adjustPlayerLevel(-amount, sourceName) !== 0 || appliedAny;
      return;
    }

    if (effect.type === "heal" && amount !== 0) {
      const previousHp = game.hp;
      game.hp = Math.min(getPlayerMaxHp(), Math.max(0, game.hp + amount));
      const healed = game.hp - previousHp;
      trackRunStat("healingRecovered", Math.max(0, healed));
      log(`${sourceName} ${amount >= 0 ? "heals" : "changes"} HP by ${Math.abs(healed || amount)}.`);
      handleHealingItemEnemySkill(Math.max(0, healed || amount));
      appliedAny = true;
      return;
    }

    if (effect.type === "attackBuff" && amount !== 0) {
      trackRunStat("buffsApplied");
      addOrRefreshBuff({
        name: sourceName,
        attack: amount,
        defense: 0,
        turns: Math.max(1, extra || 12),
      });
      log(`${sourceName} changes attack by ${amount} for ${Math.max(1, extra || 12)} turns.`);
      appliedAny = true;
      return;
    }

    if (effect.type === "defenseBuff" && amount !== 0) {
      trackRunStat("buffsApplied");
      addOrRefreshBuff({
        name: sourceName,
        attack: 0,
        defense: amount,
        turns: Math.max(1, extra || 12),
      });
      log(`${sourceName} changes defense by ${amount} for ${Math.max(1, extra || 12)} turns.`);
      appliedAny = true;
      return;
    }

    if (effect.type === "hungerFill" && amount !== 0) {
      if (game.recipe?.hungerEnabled === true) {
        const previousHunger = game.hunger;
        game.hunger = Math.min(getPlayerMaxHunger(), Math.max(0, game.hunger + amount));
        log(`${sourceName} changes hunger by ${game.hunger - previousHunger}.`);
        appliedAny = true;
      } else {
        log(`${sourceName} fizzles because hunger is disabled in this recipe.`);
      }
      return;
    }

    if (effect.type === "foodMaxHungerAtFull" && amount > 0) {
      if (game.recipe?.hungerEnabled === true) {
        if (game.hunger >= getPlayerMaxHunger()) {
          const previousMax = getPlayerMaxHunger();
          game.permanentBonuses.maxHunger += amount;
          const nextMax = getPlayerMaxHunger();
          game.hungerMax = nextMax;
          game.hunger = Math.min(nextMax, game.hunger + Math.max(0, nextMax - previousMax));
          log(`${sourceName} raises max hunger by ${amount} because your belly was full.`);
          appliedAny = true;
        } else {
          log(`${sourceName} fizzles because hunger is not full.`);
        }
      } else {
        log(`${sourceName} fizzles because hunger is disabled in this recipe.`);
      }
      return;
    }

    if (effect.type === "foodMaxHungerUp" && amount > 0) {
      if (game.recipe?.hungerEnabled === true) {
        const previousMax = getPlayerMaxHunger();
        game.permanentBonuses.maxHunger += amount;
        const nextMax = getPlayerMaxHunger();
        game.hungerMax = nextMax;
        game.hunger = Math.min(nextMax, game.hunger + Math.max(0, nextMax - previousMax));
        log(`${sourceName} raises max hunger by ${amount}.`);
        appliedAny = true;
      } else {
        log(`${sourceName} fizzles because hunger is disabled in this recipe.`);
      }
      return;
    }

    if (effect.type === "foodRestoreAllHunger") {
      if (game.recipe?.hungerEnabled === true) {
        const previousHunger = game.hunger;
        game.hunger = getPlayerMaxHunger();
        log(`${sourceName} restores ${game.hunger - previousHunger} hunger.`);
        appliedAny = true;
      } else {
        log(`${sourceName} fizzles because hunger is disabled in this recipe.`);
      }
      return;
    }

    if (effect.type === "foodSelfDamage" && amount > 0) {
      const damage = applyEnvironmentalDamage(amount, "player");
      trackRunStat("damageTaken", damage);
      game.hp = Math.max(0, game.hp - damage);
      log(`${sourceName} hurts you for ${damage} damage.`);
      if (game.hp <= 0) {
        game.hp = 0;
        endRun("collapse");
        if (!game.ended) {
          appliedAny = true;
          return;
        }
        log("You collapsed in the dungeon. Generate or load a recipe to retry.");
      }
      appliedAny = true;
      return;
    }

    if (effect.type === "foodFartWarp") {
      appliedAny = warpRoomEnemiesAway() || appliedAny;
      return;
    }

    if (effect.type === "maxHpBonus" && amount !== 0) {
      const previousMax = getPlayerMaxHp();
      game.permanentBonuses.maxHp += amount;
      const nextMax = getPlayerMaxHp();
      game.hp = Math.min(nextMax, game.hp + Math.max(0, nextMax - previousMax));
      log(`${sourceName} changes max HP by ${amount}.`);
      appliedAny = true;
      return;
    }

    if (effect.type === "maxHungerBonus" && amount !== 0) {
      if (game.recipe?.hungerEnabled === true) {
        const previousMax = getPlayerMaxHunger();
        game.permanentBonuses.maxHunger += amount;
        const nextMax = getPlayerMaxHunger();
        game.hungerMax = nextMax;
        game.hunger = Math.min(nextMax, game.hunger + Math.max(0, nextMax - previousMax));
        log(`${sourceName} changes max hunger by ${amount}.`);
        appliedAny = true;
      } else {
        log(`${sourceName} fizzles because hunger is disabled in this recipe.`);
      }
      return;
    }

    if (effect.type === "goldGain" && amount !== 0) {
      game.gold += amount;
      trackGoalGold(amount);
      log(`${sourceName} changes your gold by ${amount}.`);
      appliedAny = true;
      return;
    }

    if (effect.type === "negateTraps") {
      const turns = Math.max(1, extra || 12);
      trackRunStat("buffsApplied");
      addOrRefreshBuff({
        name: `${sourceName} Trap Ward`,
        attack: 0,
        defense: 0,
        negateTraps: true,
        turns,
      });
      log(`${sourceName} negates traps for ${turns} turns.`);
      appliedAny = true;
      return;
    }

    if (effect.type === "uncurse" && amount > 0) {
      const targets = getOwnedEntries(true).filter(({ entry: candidate }) => candidate.cursed).slice(0, Math.max(1, amount));
      if (targets.length === 0) {
        log(`${sourceName} has no cursed item to affect.`);
      } else {
        targets.forEach(({ entry: target }) => {
          target.cursed = false;
          target.curseRevealed = false;
          identifyItemType(target.itemId);
        });
        log(`${sourceName} dispels ${targets.length} curse${targets.length === 1 ? "" : "s"}.`);
        appliedAny = true;
      }
      return;
    }

    if (["upgradeSword", "downgradeSword", "upgradeShield", "downgradeShield"].includes(effect.type) && amount > 0) {
      const handType = effect.type.includes("Sword") ? "sword" : "shield";
      const downgrade = effect.type.startsWith("downgrade");
      const targets = getOwnedEntries(true).filter(({ entry: candidate }) => {
        const definition = getItemDefinition(candidate);
        return definition?.kind === "hand" && definition?.handType === handType;
      });
      if (targets.length === 0) {
        log(`${sourceName} has no ${handType} to affect.`);
        return;
      }
      const signedAmount = Math.max(1, amount) * (downgrade ? -1 : 1);
      if (targets.length === 1) {
        const target = targets[0].entry;
        const gained = applyUpgradeToEntry(target, signedAmount, downgrade ? -99 : 0, 3);
        if ((signedAmount >= 0 && gained <= 0) || (signedAmount < 0 && gained >= 0)) {
          log(downgrade
            ? `${getVisibleItemName(target)} cannot be downgraded any further.`
            : `${getVisibleItemName(target)} cannot be upgraded any further.`);
          return;
        }
        const change = Math.abs(gained);
        log(downgrade
          ? `${sourceName} downgrades ${getVisibleItemName(target)}${change > 1 ? ` by ${change}` : ""}.`
          : `${sourceName} upgrades ${getVisibleItemName(target)}${change > 1 ? ` by +${change}` : ""}.`);
        appliedAny = true;
        return;
      }

      game.pendingUpgradeChoice = {
        sourceEntry,
        sourceName,
        handType,
        amount: signedAmount,
        minimum: downgrade ? -99 : 0,
        maximum: MAX_ITEM_UPGRADE,
        targets,
        removeSourceOnApply,
      };
      log(`${sourceName} is ready. Choose which ${handType} to ${downgrade ? "downgrade" : "upgrade"}.`);
      pendingChoice = true;
      return;
    }

    if (effect.type === "clearTraps" && amount > 0) {
      if (game.traps.length === 0) {
        log(`${sourceName} finds no traps on this floor.`);
      } else {
        const removed = Math.min(Math.max(1, amount), game.traps.length);
        game.traps.splice(0, removed);
        log(`${sourceName} erases ${removed} trap${removed === 1 ? "" : "s"} from the floor.`);
        appliedAny = true;
      }
      return;
    }
  });

  return { appliedAny, pendingChoice };
}

function useItemEntry(entry, removeEntry, replaceEntry = null) {
  if (!game.recipe || game.ended) {
    return false;
  }

  const item = getItemDefinition(entry);
  const passiveHealRules = normalizePassiveHealBlockRules(game.recipe);
  if (!entry || !item) {
    render();
    return false;
  }
  if (entry.cursed) {
    entry.curseRevealed = true;
    log(`${getVisibleItemName(entry)} is cursed! It refuses to be used.`);
    render();
    return false;
  }
  if (["hand", "bracelet"].includes(item.kind)) {
    identifyAfterSuccessfulUse(entry);
    removeEntry();
    const inventoryBeforeEquip = game.inventory.length;
    const equipped = equipItem(entry, true, true);
    if (!equipped) {
      const duplicateIndex = game.inventory.indexOf(entry);
      if (duplicateIndex >= 0) {
        game.inventory.splice(duplicateIndex, 1);
      }
      if (replaceEntry) {
        replaceEntry(entry);
      } else {
        game.inventory.splice(Math.min(inventoryBeforeEquip, game.inventory.length), 0, entry);
      }
      render();
      return false;
    }
    spendMenuTurn();
    return true;
  }
  if (item.kind === "scroll") {
    playSoundEffect("itemUse");
    identifyAfterSuccessfulUse(entry);
    const blessedRetained = consumeBlessing(entry, item);
    blockPassiveHealThisTurn(passiveHealRules.itemAction);
    identifyIfPossible(entry);
    return readScroll(entry, getItemDefinition(entry), blessedRetained ? () => {} : removeEntry);
  }
  if (item.kind === "string") {
    playSoundEffect("itemUse");
    identifyAfterSuccessfulUse(entry);
    return beginStringAction(entry);
  }
  if (item.kind === "utility") {
    playSoundEffect("itemUse");
    identifyAfterSuccessfulUse(entry);
    return resolveHopeBox(entry, removeEntry, replaceEntry ?? (() => {}));
  }
  if (!["grass", "food"].includes(item.kind)) {
    log("That item cannot be used.");
    render();
    return false;
  }
  if (item.kind === "food" && game.recipe?.hungerEnabled === true && game.hunger >= game.hungerMax) {
    log(`${getVisibleItemName(entry)} is saved for later because hunger is already full.`);
    render();
    return false;
  }
  const activeEffects = getItemEffects(entry).filter((effect) => effect?.enabled);
  const onlyHealingEffect = activeEffects.length > 0 && activeEffects.every((effect) => ["heal", "grassHeal"].includes(effect.type) && Number(effect.value || 0) >= 0);
  if (onlyHealingEffect && game.hp >= getPlayerMaxHp()) {
    log(`${getVisibleItemName(entry)} is saved for later because HP is already full.`);
    render();
    return false;
  }

  identifyAfterSuccessfulUse(entry);
  playSoundEffect("itemUse");
  const identifiedItem = getItemDefinition(entry);
  const blessedRetained = consumeBlessing(entry, identifiedItem);
  if (!blessedRetained) {
    removeEntry();
  }
  blockPassiveHealThisTurn(passiveHealRules.itemAction);
  trackRunStat("itemsUsed");
  const effectResult = applyConsumableEffects(entry, identifiedItem, {
    sourceName: identifiedItem.name,
    sourceEntry: entry,
    removeSourceOnApply: false,
  });
  applyConditionalItemUseEffect(entry, identifiedItem);
  checkCustomGoalCompletion();
  if (effectResult.pendingChoice) {
    render();
    return false;
  }
  if (game.ended) {
    render();
    return true;
  }
  advanceTurn();
  render();
  return true;
}

function useInventoryItem(index) {
  const entry = game.inventory[index];
  const item = getItemDefinition(entry);
    if (!item || !["hand", "bracelet", "staff", "grass", "food", "scroll", "string", "utility"].includes(item.kind)) {
    log("That item cannot be used.");
    render();
    return false;
  }
  if (item.kind === "staff") {
    if (entry.cursed) {
      entry.curseRevealed = true;
      log(`${getVisibleItemName(entry)} is cursed! It refuses to be cast.`);
      render();
      return false;
    }
    return startStaffCast(entry);
  }
  return useInventoryEntry(index);
}

function useFloorItem() {
  const floorItem = getFloorItemAtPlayer();
  if (!floorItem) {
    render();
    return false;
  }

  const item = getItemDefinition(floorItem);
  const passiveHealRules = normalizePassiveHealBlockRules(game.recipe);
  if (floorItem.pendingSale) {
    return takeBackPendingSale(floorItem);
  }
  if (floorItem.shopPrice) {
    return buyShopFloorItem(floorItem);
  }
  if (activeEffectIs("noPickup", "player") && ["hand", "bracelet"].includes(item?.kind)) {
    log("The environmental effect prevents you from equipping floor gear.");
    render();
    return false;
  }

  blockPassiveHealThisTurn(passiveHealRules.pickupExchange);
  const floorIndex = game.items.indexOf(floorItem);
  return useItemEntry(
    floorItem,
    () => {
      const itemIndex = game.items.indexOf(floorItem);
      if (itemIndex >= 0) {
        game.items.splice(itemIndex, 1);
      }
    },
    (nextEntry) => {
      if (floorIndex >= 0) {
        game.items.splice(floorIndex, 1, { x: floorItem.x, y: floorItem.y, ...nextEntry });
      }
    },
  );
}

function getDropPositionAroundPlayer() {
  return getDropPositionAroundOrigin(game.player);
}

function getDropPositionAroundOrigin(origin, roomOnly = false) {
  const maxRadius = Math.max(game.floorWidth, game.floorHeight);
  for (let radius = 0; radius <= maxRadius; radius += 1) {
    const candidates = getDropRingAroundOrigin(origin, radius);
    const openSpot = candidates.find((position) => (
      game.tiles[position.y]?.[position.x] &&
      game.tiles[position.y][position.x] !== "wall" &&
      (!roomOnly || Boolean(findRoomAt(position))) &&
      !game.items.some((item) => item.x === position.x && item.y === position.y)
    ));
    if (openSpot) {
      return openSpot;
    }
  }
  return null;
}

function getDropRing(radius) {
  return getDropRingAroundOrigin(game.player, radius);
}

function getDropRingAroundOrigin(origin, radius) {
  if (radius === 0) {
    return [{ x: origin.x, y: origin.y }];
  }

  const ring = [];
  const left = origin.x - radius;
  const right = origin.x + radius;
  const top = origin.y - radius;
  const bottom = origin.y + radius;

  for (let x = right; x >= left; x -= 1) {
    ring.push({ x, y: top });
  }
  for (let y = top + 1; y <= bottom; y += 1) {
    ring.push({ x: left, y });
  }
  for (let x = left + 1; x <= right; x += 1) {
    ring.push({ x, y: bottom });
  }
  for (let y = bottom - 1; y > top; y -= 1) {
    ring.push({ x: right, y });
  }

  return ring;
}

function dropInventoryItem(index) {
  const entry = game.inventory[index];
  if (!entry) {
    return false;
  }
  const passiveHealRules = normalizePassiveHealBlockRules(game.recipe);

  const dropPosition = getDropPositionAroundPlayer();
  if (!dropPosition) {
    log("There is no open floor space nearby to drop that item.");
    render();
    return false;
  }

  const itemName = getVisibleItemName(entry);
  const shopRoom = getActiveShopRoom();
  game.inventory.splice(index, 1);
  trackRunStat("itemsDropped");
  const droppedEntry = {
    ...entry,
    x: dropPosition.x,
    y: dropPosition.y,
  };
  if (shopRoom) {
    droppedEntry.pendingSale = true;
    droppedEntry.shopRoomId = shopRoom.id;
    delete droppedEntry.shopPrice;
    log(`Placed ${itemName} in a sell position.`);
  } else {
    delete droppedEntry.pendingSale;
    delete droppedEntry.shopRoomId;
    log(`Dropped ${itemName}.`);
  }
  game.items.push(droppedEntry);
  playSoundEffect("itemDrop");
  blockPassiveHealThisTurn(passiveHealRules.itemAction);
  spendMenuTurn();
  return true;
}

function spendMenuTurn() {
  if (game.recipe && !game.ended) {
    advanceTurn();
  }
  render();
}

function addOrRefreshBuff(nextBuff) {
  const existing = game.buffs.find((buff) => buff.name === nextBuff.name);
  if (existing) {
    Object.keys(nextBuff).forEach((key) => {
      if (key === "turns") {
        return;
      }
      existing[key] = nextBuff[key];
    });
    existing.attack = nextBuff.attack || 0;
    existing.defense = nextBuff.defense || 0;
    existing.turns = Math.max(existing.turns, nextBuff.turns || 1);
    return;
  }
  game.buffs.push(nextBuff);
}

function tickBuffs() {
  game.buffs.forEach((buff) => {
    buff.turns -= 1;
  });
  const expired = game.buffs.filter((buff) => buff.turns <= 0);
  game.buffs = game.buffs.filter((buff) => buff.turns > 0);
  expired.forEach((buff) => log(`${buff.name} wears off.`));
}

function clearTemporaryBuffsForNewFloor() {
  if (game.recipe?.clearBuffsOnFloorChange !== true) {
    return;
  }
  if (!Array.isArray(game.buffs) || game.buffs.length === 0) {
    return;
  }
  const clearedBuffs = game.buffs
    .map((buff) => buff?.name)
    .filter(Boolean);
  game.buffs = [];
  if (clearedBuffs.length === 1) {
    log(`${clearedBuffs[0]} fades as you enter a new floor.`);
    return;
  }
  log(`Temporary buffs fade as you enter a new floor: ${clearedBuffs.join(", ")}.`);
}

async function previewOrUseSpecialAttack() {
  if (!game.recipe || game.ended || game.animatingProjectile || game.animatingMelee || game.processingTurn || game.pendingCast) {
    return false;
  }
  const attack = getEnabledSpecialAttack();
  if (!attack) {
    log("No enabled special attack is ready.");
    render();
    return false;
  }
  if (game.pendingSpecialAttack === attack.id) {
    await executePendingSpecialAttack();
    return true;
  }
  game.pendingSpecialAttack = attack.id;
  render();
  log(`Previewing ${attack.name}. Press Q again to strike.`);
  return true;
}

async function executePendingSpecialAttack() {
  const attack = getPendingSpecialAttack();
  if (!attack || !game.recipe || game.ended) {
    clearPendingSpecialAttack();
    render();
    return false;
  }
  if (attack.costType === "hp") {
    if (game.hp <= attack.costValue) {
      log(`${attack.name} needs more HP to use safely.`);
      clearPendingSpecialAttack();
      render();
      return false;
    }
    game.hp -= attack.costValue;
  } else {
    if (game.recipe.hungerEnabled !== true) {
      log(`${attack.name} cannot use hunger while hunger is disabled.`);
      clearPendingSpecialAttack();
      render();
      return false;
    }
    if (game.hunger < attack.costValue) {
      log(`${attack.name} needs more hunger to use.`);
      clearPendingSpecialAttack();
      render();
      return false;
    }
    game.hunger = Math.max(0, game.hunger - attack.costValue);
  }

  clearPendingSpecialAttack();
  playSoundEffect("specialAttack");
  const targets = getSpecialAttackTargets(attack);
  const passiveHealRules = normalizePassiveHealBlockRules(game.recipe);
  trackRunStat("attacksMade");
  let totalDamage = 0;
  let hits = 0;
  const hitBoss = new Set();

  log(`You unleash ${attack.name}.`);

  for (const position of targets) {
    const monsterIndex = game.monsters.findIndex((monster) => monster.x === position.x && monster.y === position.y);
    if (monsterIndex >= 0) {
      const monster = game.monsters[monsterIndex];
      await playMeleeAttackAnimation(monster, "monster");
      const damage = attack.damage <= 0 ? 0 : applyEnvironmentalDamage(rollDamage(attack.damage, monster.defense), "enemy");
      monster.hp -= damage;
      hits += 1;
      totalDamage += damage;
      log(`${attack.name} hits the ${monster.name} for ${damage} damage.`);
      if (monster.hp > 0) {
        triggerElectrifyOnHits(monster);
      }
      if (monster.hp <= 0) {
        applyEnemyDeathSkillEffects(monster);
        trackGoalKill(monster);
        awardXp(monster.xp, monster.name);
        game.monsters.splice(monsterIndex, 1);
        trackRunStat("monstersDefeated");
        playSoundEffect("monsterDefeat");
        log(`The ${monster.name} is defeated.`);
        dropEnemyLoot(monster);
        checkCustomGoalCompletion();
      }
      if (!game.ended) {
        await sleep(55);
      }
      continue;
    }

    if (bossOccupies(position.x, position.y) && game.boss && !hitBoss.has(game.boss.name)) {
      const boss = game.boss;
      await playMeleeAttackAnimation(getBossCenter(boss), "monster");
      const damage = attack.damage <= 0 ? 0 : applyEnvironmentalDamage(rollDamage(attack.damage, boss.defense), "enemy");
      boss.hp -= damage;
      hits += 1;
      totalDamage += damage;
      hitBoss.add(boss.name);
      log(`${attack.name} hits ${boss.name} for ${damage} damage.`);
      if (boss.hp <= 0) {
        defeatBoss();
        checkCustomGoalCompletion();
      }
      if (!game.ended) {
        await sleep(55);
      }
    }
  }

  if (totalDamage > 0) {
    trackRunStat("damageDealt", totalDamage);
    blockPassiveHealThisTurn(passiveHealRules.attackDamage);
  }
  if (hits === 0) {
    log(`${attack.name} strikes empty space.`);
  }
  await advanceTurn();
  render();
  return true;
}

async function tryMove(dx, dy) {
  if (!game.recipe || game.hp <= 0 || game.ended || game.processingTurn || game.animatingMelee) {
    return;
  }
  const currentEffect = game.currentEnvironmentalEffect;
  if (
    currentEffect?.id === "randomWarp" &&
    currentEffect.affectsPlayer &&
    getNextTurnNumber() % currentEffect.playerTurns === 0
  ) {
    if (warpPlayerFromEnvironmentalEffect()) {
      resolveTile();
    }
    await advanceTurn({ skipPlayerWarp: true });
    render();
    return;
  }

  const target = { x: game.player.x + dx, y: game.player.y + dy };
  if (game.tiles[target.y]?.[target.x] === "wall") {
    if (playerCanWallPass()) {
      game.player = target;
      game.playerWalkSteps = (game.playerWalkSteps ?? 0) + 1;
      processBraceletStepEffects();
      revealCurrentView();
      const turnContinues = resolveTile();
      if (turnContinues) {
        await advanceTurn({ playerMoved: true });
      }
      render();
      return;
    }
    if (tryWallDig(dx, dy)) {
      revealCurrentView();
      await advanceTurn();
      render();
    }
    return;
  }

  if (bossOccupies(target.x, target.y)) {
    await attackBoss({ dx, dy });
  } else {
    const monsterIndex = game.monsters.findIndex((entity) => entity.x === target.x && entity.y === target.y);
    if (monsterIndex >= 0) {
      await attackMonster(monsterIndex, { dx, dy });
    } else {
      game.player = target;
      game.playerWalkSteps = (game.playerWalkSteps ?? 0) + 1;
      processBraceletStepEffects();
    }
  }

  revealCurrentView();
  const turnContinues = resolveTile();
  if (turnContinues) {
    await advanceTurn();
  }
  render();
}

function getFrontalAttackPositions(dx = 0, dy = 0) {
  const front = { x: game.player.x + dx, y: game.player.y + dy };
  if (dx === 0 && dy === 0) {
    return [front];
  }
  if (dx !== 0) {
    return [
      { x: front.x, y: front.y - 1 },
      front,
      { x: front.x, y: front.y + 1 },
    ];
  }
  return [
    { x: front.x - 1, y: front.y },
    front,
    { x: front.x + 1, y: front.y },
  ];
}

function getSideAttackPositions(dx = 0, dy = 0) {
  const front = { x: game.player.x + dx, y: game.player.y + dy };
  if (dx === 0 && dy === 0) {
    return [front];
  }
  if (dx !== 0) {
    return [
      front,
      { x: game.player.x, y: game.player.y - 1 },
      { x: game.player.x, y: game.player.y + 1 },
    ];
  }
  return [
    front,
    { x: game.player.x - 1, y: game.player.y },
    { x: game.player.x + 1, y: game.player.y },
  ];
}

function getBackAttackPositions(dx = 0, dy = 0) {
  return [
    { x: game.player.x + dx, y: game.player.y + dy },
    { x: game.player.x - dx, y: game.player.y - dy },
  ];
}

function getPlayerAttackPositions(dx = 0, dy = 0) {
  const positions = [{ x: game.player.x + dx, y: game.player.y + dy }];
  if (playerHasFrontalAttackRune()) {
    positions.push(...getFrontalAttackPositions(dx, dy));
  }
  if (playerHasSideAttackRune()) {
    positions.push(...getSideAttackPositions(dx, dy));
  }
  if (playerHasBackAttackRune()) {
    positions.push(...getBackAttackPositions(dx, dy));
  }
  const seen = new Set();
  return positions.filter((position) => {
    const key = `${position.x},${position.y}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function getAttackTargetDescriptors(dx = 0, dy = 0) {
  const positions = getPlayerAttackPositions(dx, dy);
  const seen = new Set();
  const descriptors = [];
  positions.forEach((position) => {
    const monsterIndex = game.monsters.findIndex((monster) => monster.x === position.x && monster.y === position.y);
    if (monsterIndex >= 0) {
      const key = `monster:${monsterIndex}`;
      if (!seen.has(key)) {
        seen.add(key);
        descriptors.push({ kind: "monster", monsterIndex });
      }
      return;
    }
    if (bossOccupies(position.x, position.y) && game.boss) {
      const key = "boss";
      if (!seen.has(key)) {
        seen.add(key);
        descriptors.push({ kind: "boss" });
      }
    }
  });
  return descriptors;
}

async function resolvePlayerAttackAgainstTarget(targetDescriptor, hpWasFull = false) {
  if (targetDescriptor.kind === "monster") {
    const monster = game.monsters[targetDescriptor.monsterIndex];
    if (!monster) {
      return { hit: false, damage: 0 };
    }
    await playMeleeAttackAnimation(monster, "monster");
    if (!shouldForcePlayerHit() && !rollPlayerHit()) {
      monster.hasSpottedPlayer = true;
      trackRunStat("attacksMade");
      updatePlayerAttackStreaksOnMiss();
      log(`You miss the ${monster.name}.`);
      return { hit: false, damage: 0 };
    }
    monster.hasSpottedPlayer = true;
    const runeHit = resolvePlayerRuneHitEffects(applyEnvironmentalDamage(rollDamage(getPlayerAttack(), monster.defense), "enemy"), monster);
    const flameDamage = resolveFlameShotBonus(hpWasFull);
    const swift = resolveSwiftStrikeBonus(runeHit.damage);
    const damage = runeHit.damage + flameDamage + swift.bonusDamage;
    const thunder = resolveThunderboltBonus(monster);
    const passiveHealRules = normalizePassiveHealBlockRules(game.recipe);
    trackRunStat("attacksMade");
    trackRunStat("damageDealt", damage);
    if (damage > 0) {
      blockPassiveHealThisTurn(passiveHealRules.attackDamage);
    }
    monster.hp -= damage;
    const rageOnHit = getMonsterSkill(monster, "rageOnHit");
    if (rageOnHit && enemySkillTriggers(rageOnHit)) {
      const gain = Math.max(1, Number(rageOnHit.value ?? 1));
      monster.attack += gain;
      monster.baseAttack += gain;
    }
    if (monster.hp > 0) {
      triggerElectrifyOnHits(monster);
    }
    const hitNotes = [
      runeHit.antiMonster ? `${runeHit.antiMonsterTypeName || "anti-type"} x${runeHit.antiMonsterMultiplier}` : "",
      runeHit.critical ? `critical x${runeHit.criticalMultiplier}` : "",
      runeHit.voraciousHit ? `voracious -${runeHit.voraciousCost} hunger` : "",
      runeHit.dangerPower ? `danger power x${runeHit.dangerMultiplier}` : "",
      runeHit.hungerPower ? `hunger power x${runeHit.hungerPowerMultiplier}` : "",
      runeHit.costlyHit ? `costly -${runeHit.costlyCost} gold` : "",
      flameDamage > 0 ? `flame shot +${flameDamage}` : "",
      swift.procs > 0 ? `swift strike +${swift.bonusDamage}` : "",
      thunder.triggered ? `thunderbolt +${thunder.thunderDamage}` : "",
    ].filter(Boolean).join(", ");
    log(`You hit the ${monster.name} for ${damage} damage${hitNotes ? ` with ${hitNotes}` : ""}.`);
    updatePlayerAttackStreaksOnHit(runeHit);
    const healed = applyHealingRunes(damage);
    if (healed > 0) {
      log(`Healing Rune restores ${healed} HP.`);
    }
    applyUpgradeOnlyDullingRunes().forEach((message) => {
      log(`${message}.`);
    });
    applyDullingRunes("swordDulling", "sword").forEach((message) => {
      log(`${message}.`);
    });
    if (monster.hp > 0 && tryKnockbackMonster(monster, monster.x - game.player.x, monster.y - game.player.y)) {
      log(`The ${monster.name} is knocked back.`);
    }
    const explodeSkill = getMonsterSkill(monster, "explodeLowHp");
    if (explodeSkill && !monster.primedExplodeShown && monster.hp > 0 && monster.hp <= Math.ceil(monster.maxHp * (Number(explodeSkill.extra ?? 50) / 100))) {
      monster.primedExplodeShown = true;
      log(`${monster.name} is primed to explode!`);
    }
    maybeMultiplyMonsterOnHit(monster);
    if (thunder.triggered) {
      const splash = await applyThunderboltSplash(monster, thunder.thunderDamage, new Set([monster]));
      if (splash.totalDamage > 0) {
        trackRunStat("damageDealt", splash.totalDamage);
      }
    }
    if (monster.hp <= 0) {
      applyEnemyDeathSkillEffects(monster);
      trackGoalKill(monster);
      awardXp(monster.xp, monster.name);
      game.monsters.splice(targetDescriptor.monsterIndex, 1);
      trackRunStat("monstersDefeated");
      playSoundEffect("monsterDefeat");
      log(`The ${monster.name} is defeated.`);
      dropEnemyLoot(monster);
      checkCustomGoalCompletion();
    }
    return { hit: true, damage };
  }

  const boss = game.boss;
  if (!boss) {
    return { hit: false, damage: 0 };
  }
  await playMeleeAttackAnimation(getBossCenter(boss), "monster");
  if (!shouldForcePlayerHit() && !rollPlayerHit()) {
    trackRunStat("attacksMade");
    updatePlayerAttackStreaksOnMiss();
    log(`You miss ${boss.name}.`);
    return { hit: false, damage: 0 };
  }
  const runeHit = resolvePlayerRuneHitEffects(applyEnvironmentalDamage(rollDamage(getPlayerAttack(), boss.defense), "enemy"), boss);
  const flameDamage = resolveFlameShotBonus(hpWasFull);
  const swift = resolveSwiftStrikeBonus(runeHit.damage);
  const damage = runeHit.damage + flameDamage + swift.bonusDamage;
  const passiveHealRules = normalizePassiveHealBlockRules(game.recipe);
  trackRunStat("attacksMade");
  trackRunStat("damageDealt", damage);
  if (damage > 0) {
    blockPassiveHealThisTurn(passiveHealRules.attackDamage);
  }
  boss.hp -= damage;
  const hitNotes = [
    runeHit.antiMonster ? `${runeHit.antiMonsterTypeName || "anti-type"} x${runeHit.antiMonsterMultiplier}` : "",
    runeHit.critical ? `critical x${runeHit.criticalMultiplier}` : "",
    runeHit.voraciousHit ? `voracious -${runeHit.voraciousCost} hunger` : "",
    runeHit.dangerPower ? `danger power x${runeHit.dangerMultiplier}` : "",
    runeHit.hungerPower ? `hunger power x${runeHit.hungerPowerMultiplier}` : "",
    runeHit.costlyHit ? `costly -${runeHit.costlyCost} gold` : "",
    flameDamage > 0 ? `flame shot +${flameDamage}` : "",
    swift.procs > 0 ? `swift strike +${swift.bonusDamage}` : "",
  ].filter(Boolean).join(", ");
  log(`You hit ${boss.name} for ${damage} damage${hitNotes ? ` with ${hitNotes}` : ""}.`);
  updatePlayerAttackStreaksOnHit(runeHit);
  const healed = applyHealingRunes(damage);
  if (healed > 0) {
    log(`Healing Rune restores ${healed} HP.`);
  }
  applyUpgradeOnlyDullingRunes().forEach((message) => {
    log(`${message}.`);
  });
  applyDullingRunes("swordDulling", "sword").forEach((message) => {
    log(`${message}.`);
  });
  if (boss.hp <= 0) {
    defeatBoss();
    checkCustomGoalCompletion();
  }
  return { hit: true, damage };
}

async function performPlayerAttackSweep(dx = 0, dy = 0) {
  const targets = getAttackTargetDescriptors(dx, dy);
  const hpWasFull = game.hp >= getPlayerMaxHp();
  let hitAny = false;
  for (const target of targets) {
    const result = await resolvePlayerAttackAgainstTarget(target, hpWasFull);
    if (result.hit) {
      hitAny = true;
    }
    if (!game.ended) {
      await sleep(45);
    }
  }
  if (!hitAny && targets.length > 1) {
    log("Your swing strikes only empty space.");
  }
  return hitAny;
}

async function attackMonster(monsterIndex, direction = { dx: 0, dy: 0 }) {
  const monster = game.monsters[monsterIndex];
  if (!monster) {
    return false;
  }
  playSoundEffect("playerAttack");
  const revealedTraps = revealTrapsFromWeaponSwing(direction.dx, direction.dy);
  if (revealedTraps > 0) {
    log(`Your swing reveals ${revealedTraps} trap${revealedTraps === 1 ? "" : "s"}.`);
  }
  breakTrapFromWeaponSwing(direction.dx, direction.dy);
  applyConditionalItemUseEffects(["leftHand", "rightHand"].map((slot) => game.equipment?.[slot]).filter(Boolean));
  return performPlayerAttackSweep(direction.dx, direction.dy);
}

function dropEnemyLoot(monster) {
  if (!monster || !game.recipe) {
    return;
  }
  const dropSettings = normalizeEnemyDropSettings(game.recipe.enemyDrops);
  if (!dropSettings.enabled || dropSettings.categories.length === 0) {
    return;
  }
  const random = makeRandom(game.recipe.seed + game.floor * 9151 + monster.x * 131 + monster.y * 197 + getCurrentTurnNumber() * 17);
  if (random() * 100 >= dropSettings.chance) {
    return;
  }
  const itemId = chooseItemIdFromAllowedCategories(game.recipe, random, dropSettings.categories);
  if (!itemId) {
    return;
  }
  const position = getDropPositionAroundOrigin({ x: monster.x, y: monster.y }, true);
  if (!position) {
    return;
  }
  const itemDefinition = itemDefinitions[itemId];
  const rarityOverride = itemDefinition?.kind === "hand" && random() * 100 < dropSettings.rarityChance
    ? rollEnemyDropHandRarity(game.recipe, random)
    : null;
  const droppedItem = createSpawnedItem(game.recipe, itemId, random, rarityOverride ? { rarity: rarityOverride } : undefined);
  game.items.push({ ...position, ...droppedItem });
  log(`The ${monster.name} drops ${getVisibleItemName(droppedItem)}.`);
}

function defeatBoss() {
  const boss = game.boss;
  if (!boss) {
    return;
  }
  playSoundEffect("monsterDefeat");
  trackRunStat("monstersDefeated");
  awardXp(boss.xp, boss.name);
  log(`${boss.name} is defeated! The final exit opens.`);
  game.boss = null;
  render();
}

async function attackBoss(direction = { dx: 0, dy: 0 }) {
  const boss = game.boss;
  if (!boss) {
    return false;
  }
  playSoundEffect("playerAttack");
  const revealedTraps = revealTrapsFromWeaponSwing(direction.dx, direction.dy);
  if (revealedTraps > 0) {
    log(`Your swing reveals ${revealedTraps} trap${revealedTraps === 1 ? "" : "s"}.`);
  }
  breakTrapFromWeaponSwing(direction.dx, direction.dy);
  applyConditionalItemUseEffects(["leftHand", "rightHand"].map((slot) => game.equipment?.[slot]).filter(Boolean));
  return performPlayerAttackSweep(direction.dx, direction.dy);
}

async function monsterAttack(monster, distance = 1, attackMode = distance > 1 ? "ranged" : "melee") {
  const explodeSkill = getMonsterSkill(monster, "explodeLowHp");
  if (explodeSkill && enemySkillTriggers(explodeSkill) && monster.hp <= Math.ceil(monster.maxHp * (Number(explodeSkill.extra ?? 50) / 100))) {
    playSoundEffect("enemyAttack");
    await playMeleeAttackAnimation(game.player, "player");
    const explosionDamage = Math.max(1, Number(explodeSkill.value ?? 1));
    trackRunStat("damageTaken", explosionDamage);
    game.hp -= explosionDamage;
    log(`${monster.name} explodes for ${explosionDamage} damage!`);
    const index = game.monsters.indexOf(monster);
    if (index >= 0) {
      game.monsters.splice(index, 1);
    }
    const explodeMultiply = getMonsterSkill(monster, "explodeMultiply");
    if (explodeMultiply && enemySkillTriggers(explodeMultiply)) {
      const spawned = spawnMonsterClonesNear(monster, Math.max(1, Number(explodeMultiply.value ?? 1)));
      if (spawned > 0) {
        log(`${monster.name}'s explosion spawns ${spawned} copy${spawned === 1 ? "" : "ies"}!`);
      }
    }
    if (game.hp <= 0) {
      game.hp = 0;
      endRun("collapse");
      log("You collapsed in the dungeon. Generate or load a recipe to retry.");
    }
    return;
  }

  const multiAttackSkill = getMonsterSkill(monster, "multiAttack");
  const hitCount = multiAttackSkill && enemySkillTriggers(multiAttackSkill)
    ? Math.max(1, Number(multiAttackSkill.value ?? 1))
    : 1;
  const criticalSkill = getMonsterSkill(monster, "criticalHits");
  const fireBreath = getMonsterSkill(monster, "fireBreath");
  const waterShotSkill = getMonsterSkill(monster, "waterShot");
  const throwLogSkill = getMonsterSkill(monster, "throwLog");
  const throwGoldSkill = getMonsterSkill(monster, "throwGold");
  const throwItemSkill = getMonsterSkill(monster, "throwItem");
  const magicSkill = getMonsterSkill(monster, "shootMagic");
  const daredevil = getDaredevilCritProfile();

  for (let hitIndex = 0; hitIndex < hitCount; hitIndex += 1) {
    playSoundEffect("enemyAttack");
    await playMeleeAttackAnimation(game.player, "player");
    let attackPower = monster.attack;
    let attackLabel = `The ${monster.name} hits you`;
    let wasCritical = false;
    if (criticalSkill && enemySkillTriggers(criticalSkill) && Math.random() * 100 < Number(criticalSkill.value ?? 0)) {
      attackPower = Math.max(1, Math.ceil(attackPower * Number(criticalSkill.extra ?? 1.5)));
      attackLabel = `The ${monster.name} lands a critical hit`;
      wasCritical = true;
    }
    if (!wasCritical && daredevil.chance > 0 && Math.random() * 100 < daredevil.chance) {
      attackPower = Math.max(1, Math.ceil(attackPower * daredevil.multiplier));
      attackLabel = `The ${monster.name} lands a daredevil critical hit`;
      wasCritical = true;
    }
    if (distance > 1 && attackMode === "fireBreath" && fireBreath) {
      attackPower = Math.max(attackPower, Number(fireBreath.value ?? attackPower));
      attackLabel = `${monster.name} breathes fire at you`;
    } else if (distance > 1 && attackMode === "waterShot" && waterShotSkill) {
      attackPower = Math.max(attackPower, Number(waterShotSkill.value ?? attackPower));
      attackLabel = `${monster.name} shoots water at you`;
    } else if (distance > 1 && attackMode === "throwLog" && throwLogSkill) {
      attackPower = Math.max(attackPower, Number(throwLogSkill.value ?? attackPower));
      attackLabel = `${monster.name} hurls a log at you`;
    } else if (distance > 1 && attackMode === "throwGold" && throwGoldSkill) {
      attackPower = Math.max(attackPower, Math.max(1, Math.ceil(Number(throwGoldSkill.value ?? 100) / 25)));
      attackLabel = `${monster.name} pelts you with gold`;
    } else if (distance > 1 && attackMode === "throwItem" && throwItemSkill) {
      attackPower = Math.max(attackPower, Number(throwItemSkill.value ?? attackPower));
      attackLabel = `${monster.name} throws something at you`;
    } else if (distance > 1 && attackMode === "shootMagic" && magicSkill) {
      attackPower = Math.max(attackPower, Number(magicSkill.value ?? attackPower));
      attackLabel = `${monster.name} blasts you with magic`;
    } else if (distance > 1 && attackMode === "ranged") {
      attackLabel = `${monster.name} strikes from afar`;
    }
    if (tryKeenEvade()) {
      log(`You evade the ${monster.name}'s attack.`);
      continue;
    }
    const mitigationPercent = getShieldDamageMitigation(monster, wasCritical);
    let damage = applyEnvironmentalDamage(rollDamage(attackPower, getPlayerDefense()), "player");
    if (mitigationPercent > 0) {
      damage = Math.max(0, Math.ceil(damage * (1 - (mitigationPercent / 100))));
    }
    if (damage >= game.hp && tryGutsSurvive()) {
      damage = Math.max(0, game.hp - 1);
    }
    trackRunStat("damageTaken", damage);
    game.hp -= damage;
    log(`${attackLabel} for ${damage} damage.`);
    if (!game.ended) {
      await applyShieldPaybackEffects(monster, damage);
    }
    applyMonsterAttackSideEffects(monster, damage, distance);
    if (distance > 1 && attackMode === "throwLog") {
      const dx = Math.sign(game.player.x - monster.x);
      const dy = Math.sign(game.player.y - monster.y);
      const next = { x: game.player.x + dx, y: game.player.y + dy };
      if (game.tiles[next.y]?.[next.x] === "floor" && !game.monsters.some((other) => other.x === next.x && other.y === next.y) && !bossOccupies(next.x, next.y)) {
        game.player = next;
        log("The log knocks you back.");
      }
    }
    applyConditionalItemUseEffects(["leftHand", "rightHand"].map((slot) => game.equipment?.[slot]).filter((entry) => {
      const item = getItemDefinition(entry);
      return item?.kind === "hand" && item?.handType === "shield";
    }));
    applyDullingRunes("shieldDulling", "shield").forEach((message) => {
      log(`${message}.`);
    });
    if (game.hp <= 0) {
      game.hp = 0;
      endRun("collapse");
      log("You collapsed in the dungeon. Generate or load a recipe to retry.");
      return;
    }
    if (hitIndex < hitCount - 1 && !game.ended) {
      await sleep(ENEMY_ATTACK_BEAT_MS);
    }
  }
}

function rollDamage(attack, defense) {
  return Math.max(1, attack - defense + Math.floor(Math.random() * 3) - 1);
}

function applyEnvironmentalDamage(damage, target) {
  if (target === "player" && hasEquippedEffect("invincible")) {
    return 0;
  }
  if (activeEffectIs("doubleDamage", target)) {
    return damage * 2;
  }
  if (activeEffectIs("halfDamage", target)) {
    return Math.max(1, Math.ceil(damage / 2));
  }
  return damage;
}

function revealAllTraps() {
  game.traps.forEach((trap) => {
    trap.visible = true;
  });
}

function tryConsumeReviveCharge() {
  if ((game.reviveCharges ?? 0) <= 0) {
    return false;
  }
  game.reviveCharges = Math.max(0, (game.reviveCharges ?? 0) - 1);
  game.hp = Math.max(1, Math.ceil(getPlayerMaxHp() * 0.5));
  log(`A revival ward restores you with ${game.hp} HP.`);
  render();
  return true;
}

function getBossCenter(boss = game.boss) {
  if (!boss) {
    return { x: 0, y: 0 };
  }
  const { width, height } = getBossSizeDimensions(boss);
  return {
    x: boss.x + Math.floor(width / 2),
    y: boss.y + Math.floor(height / 2),
  };
}

function getDistanceToBoss(x = game.player.x, y = game.player.y, boss = game.boss) {
  const tiles = getBossTiles(boss);
  if (tiles.length === 0) {
    return Infinity;
  }
  return Math.min(...tiles.map((tile) => Math.abs(tile.x - x) + Math.abs(tile.y - y)));
}

function bossCanOccupy(anchorX, anchorY, boss = game.boss) {
  const { width, height } = getBossSizeDimensions(boss);
  for (let dy = 0; dy < height; dy += 1) {
    for (let dx = 0; dx < width; dx += 1) {
      const x = anchorX + dx;
      const y = anchorY + dy;
      if (game.bossRoom && !pointInRoom({ x, y }, game.bossRoom)) {
        return false;
      }
      if (game.tiles[y]?.[x] !== "floor") {
        return false;
      }
      if (x === game.player.x && y === game.player.y) {
        return false;
      }
      if (game.monsters.some((monster) => monster.x === x && monster.y === y)) {
        return false;
      }
    }
  }
  return true;
}

async function bossAttackPlayer(sourceName, damage, wasCritical = false) {
  playSoundEffect("enemyAttack");
  await playMeleeAttackAnimation(game.player, "player");
  if (tryKeenEvade()) {
    log(`You evade ${sourceName}.`);
    return;
  }
  let applied = applyEnvironmentalDamage(Math.max(1, damage), "player");
  const mitigationPercent = getShieldDamageMitigation(null, wasCritical);
  if (mitigationPercent > 0) {
    applied = Math.max(0, Math.ceil(applied * (1 - (mitigationPercent / 100))));
  }
  if (applied >= game.hp && tryGutsSurvive()) {
    applied = Math.max(0, game.hp - 1);
  }
  trackRunStat("damageTaken", applied);
  game.hp -= applied;
  log(`${sourceName} hits you for ${applied} damage.`);
  applyDullingRunes("shieldDulling", "shield").forEach((message) => {
    log(`${message}.`);
  });
  if (game.hp <= 0) {
    game.hp = 0;
    endRun("collapse");
    log("You collapsed in the dungeon. Generate or load a recipe to retry.");
  }
}

function chooseBossSpecialAttack(boss = game.boss) {
  if (!boss) {
    return null;
  }
  const enabledAttacks = boss.specialAttacks.filter((attack) => attack.enabled && (attack.currentCooldown ?? 0) <= 0 && getDistanceToBoss(game.player.x, game.player.y, boss) <= attack.range);
  if (enabledAttacks.length === 0) {
    return null;
  }
  return enabledAttacks.sort((left, right) => right.damage - left.damage)[0] ?? null;
}

async function takeBossTurn() {
  const boss = game.boss;
  if (!boss || game.ended) {
    return;
  }
  boss.specialAttacks.forEach((attack) => {
    attack.currentCooldown = Math.max(0, (attack.currentCooldown ?? 0) - 1);
  });
  const behavior = clampNumber(boss.behavior, 0, 10, 3);
  const distance = getDistanceToBoss();
  if (distance <= 1) {
    await bossAttackPlayer(boss.name, boss.attack);
    return;
  }
  const specialAttack = chooseBossSpecialAttack(boss);
  if (specialAttack && Math.random() < (0.18 + behavior * 0.07)) {
    specialAttack.currentCooldown = specialAttack.cooldown;
    await bossAttackPlayer(`${boss.name}'s ${specialAttack.name}`, boss.attack + specialAttack.damage);
    return;
  }
  const shouldPursue = behavior >= 6 || distance <= 4 || Math.random() < (0.18 + behavior * 0.05);
  if (!shouldPursue) {
    return;
  }
  const center = getBossCenter(boss);
  const dx = Math.sign(game.player.x - center.x);
  const dy = Math.sign(game.player.y - center.y);
  const movementOptions = Math.abs(game.player.x - center.x) > Math.abs(game.player.y - center.y)
    ? [{ x: boss.x + dx, y: boss.y }, { x: boss.x, y: boss.y + dy }]
    : [{ x: boss.x, y: boss.y + dy }, { x: boss.x + dx, y: boss.y }];
  const destination = movementOptions.find((option) => bossCanOccupy(option.x, option.y, boss));
  if (destination) {
    boss.x = destination.x;
    boss.y = destination.y;
  }
}

function applySporeSick(amount = 1) {
  const penalty = Math.max(0, Number(amount) || 0);
  if (penalty <= 0) {
    return;
  }
  const alreadySick = game.buffs.some((buff) => buff.name === "Spore Sick");
  addOrRefreshBuff({
    name: "Spore Sick",
    attack: -penalty,
    defense: 0,
    turns: 6,
  });
  if (!alreadySick) {
    trackRunStat("buffsApplied");
  }
  log(alreadySick
    ? `The spores refresh Spore Sick. Attack -${penalty}.`
    : `The spores make you Spore Sick. Attack -${penalty}.`);
}

function warpPlayerFromTrap(trap) {
  const occupied = [game.exit, ...game.monsters, ...game.items, ...game.traps, ...game.sigils, ...getBossTiles()];
  const random = makeRandom(game.recipe.seed + game.floor * 17737 + game.player.x * 193 + game.player.y * 389);
  const destination = randomRoomPosition(random, occupied);
  if (!destination || (destination.x === game.player.x && destination.y === game.player.y)) {
    log(`${trap.name} crackles, but nowhere safe opens up.`);
    return;
  }
  game.player = destination;
  revealCurrentView();
  log(`${trap.name} warps you to another room.`);
}

function applyTrapEffect(trap) {
  if (!trap) {
    return;
  }

  if (trap.effectType === "damage") {
    const damage = applyEnvironmentalDamage(trap.value1 || 1, "player");
    trackRunStat("damageTaken", damage);
    game.hp -= damage;
    log(`${trap.name} snaps shut for ${damage} damage.`);
    return;
  }

  if (trap.effectType === "hunger") {
    if (game.recipe?.hungerEnabled === true) {
      const loss = Math.min(Math.max(0, trap.value1 || 0), game.hunger);
      game.hunger = Math.max(0, game.hunger - loss);
      log(`${trap.name} drains ${loss} hunger.`);
      return;
    }
    log(`${trap.name} fizzles because hunger is disabled in this recipe.`);
    return;
  }

  if (trap.effectType === "attackDebuff") {
    trackRunStat("buffsApplied");
    addOrRefreshBuff({
      name: trap.name,
      attack: -(trap.value1 || 0),
      defense: 0,
      turns: trap.value2 || 1,
    });
    log(`${trap.name} lowers your attack by ${trap.value1} for ${trap.value2} turns.`);
    return;
  }

  if (trap.effectType === "defenseDebuff") {
    trackRunStat("buffsApplied");
    addOrRefreshBuff({
      name: trap.name,
      attack: 0,
      defense: -(trap.value1 || 0),
      turns: trap.value2 || 1,
    });
    log(`${trap.name} lowers your defense by ${trap.value1} for ${trap.value2} turns.`);
    return;
  }

  if (trap.effectType === "loseRandomItem") {
    const lossCount = Math.max(1, trap.value1 || 1);
    const lostNames = [];
    for (let index = 0; index < lossCount; index += 1) {
      const candidates = game.inventory
        .map((entry, inventoryIndex) => ({ entry, inventoryIndex }))
        .filter(({ entry }) => entry && getItemDefinition(entry)?.kind !== "gold");
      if (candidates.length === 0) {
        break;
      }
      const chosen = candidates[Math.floor(Math.random() * candidates.length)];
      const [lostEntry] = game.inventory.splice(chosen.inventoryIndex, 1);
      if (lostEntry) {
        lostNames.push(getVisibleItemName(lostEntry));
      }
    }
    if (lostNames.length > 0) {
      log(`${trap.name} swallows ${lostNames.join(", ")}.`);
    } else {
      log(`${trap.name} howls, but you have nothing to lose.`);
    }
    return;
  }

  if (trap.effectType === "warp") {
    warpPlayerFromTrap(trap);
  }
}

function chooseSigilRule(recipe, random = Math.random) {
  const rules = normalizeSigilPoolRules(recipe?.sigilPoolRules).filter((rule) => rule.enabled);
  if (rules.length === 0) {
    return null;
  }
  return rules[Math.floor(random() * rules.length)] ?? rules[0];
}

function applySigilEffect(sigil) {
  if (!sigil) {
    return;
  }

  if (sigil.effectType === "heal") {
    const healed = Math.max(0, sigil.value1 || 0);
    game.hp = Math.min(getPlayerMaxHp(), game.hp + healed);
    log(`${sigil.name} restores ${healed} HP.`);
    return;
  }

  if (sigil.effectType === "maxHp") {
    const gain = Math.max(0, sigil.value1 || 0);
    const previousMaxHp = getPlayerMaxHp();
    game.permanentBonuses.maxHp += gain;
    const nextMaxHp = getPlayerMaxHp();
    game.hp = Math.min(nextMaxHp, game.hp + Math.max(0, nextMaxHp - previousMaxHp));
    log(`${sigil.name} raises max HP by ${gain}.`);
    return;
  }

  if (sigil.effectType === "attackBuff") {
    trackRunStat("buffsApplied");
    addOrRefreshBuff({
      name: sigil.name,
      attack: Math.max(0, sigil.value1 || 0),
      defense: 0,
      turns: Math.max(1, sigil.value2 || 1),
    });
    log(`${sigil.name} raises attack by ${sigil.value1} for ${sigil.value2} turns.`);
    return;
  }

  if (sigil.effectType === "attackUp") {
    const gain = Math.max(0, sigil.value1 || 0);
    game.permanentBonuses.attack += gain;
    log(`${sigil.name} raises attack by ${gain}.`);
    return;
  }

  if (sigil.effectType === "defenseBuff") {
    trackRunStat("buffsApplied");
    addOrRefreshBuff({
      name: sigil.name,
      attack: 0,
      defense: Math.max(0, sigil.value1 || 0),
      turns: Math.max(1, sigil.value2 || 1),
    });
    log(`${sigil.name} raises defense by ${sigil.value1} for ${sigil.value2} turns.`);
    return;
  }

  if (sigil.effectType === "defenseUp") {
    const gain = Math.max(0, sigil.value1 || 0);
    game.permanentBonuses.defense += gain;
    log(`${sigil.name} raises defense by ${gain}.`);
    return;
  }

  if (sigil.effectType === "hunger") {
    if (game.recipe?.hungerEnabled !== true) {
      log(`${sigil.name} waits quietly because hunger is disabled in this recipe.`);
      return;
    }
    const restored = Math.max(0, sigil.value1 || 0);
    game.hunger = Math.min(getPlayerMaxHunger(), game.hunger + restored);
    log(`${sigil.name} restores ${restored} hunger.`);
    return;
  }

  if (sigil.effectType === "maxHunger") {
    if (game.recipe?.hungerEnabled !== true) {
      log(`${sigil.name} waits quietly because hunger is disabled in this recipe.`);
      return;
    }
    const gain = Math.max(0, sigil.value1 || 0);
    const previousMaxHunger = getPlayerMaxHunger();
    game.permanentBonuses.maxHunger += gain;
    const nextMaxHunger = getPlayerMaxHunger();
    game.hungerMax = nextMaxHunger;
    game.hunger = Math.min(nextMaxHunger, game.hunger + Math.max(0, nextMaxHunger - previousMaxHunger));
    log(`${sigil.name} raises max hunger by ${gain}.`);
    return;
  }

  if (sigil.effectType === "inventoryUp") {
    const gain = Math.max(0, sigil.value1 || 0);
    game.permanentBonuses.inventory += gain;
    log(`${sigil.name} raises inventory slots by ${gain}.`);
  }
}

function consumeSigilUse(sigil) {
  if (!sigil) {
    return true;
  }
  const remaining = Math.max(0, (sigil.remainingUses ?? sigil.uses ?? 1) - 1);
  sigil.remainingUses = remaining;
  return remaining <= 0;
}

function consumeTrapUse(trap) {
  if (!trap) {
    return true;
  }
  const remaining = Math.max(0, (trap.remainingUses ?? trap.uses ?? 1) - 1);
  trap.remainingUses = remaining;
  return remaining <= 0;
}

function resolveTile() {
  const tileType = game.tiles[game.player.y][game.player.x];
  visitSpecialRoom(getSpecialRoomAtPosition(game.player));
  if (game.bossRoom && pointInRoom(game.player, game.bossRoom) && !game.bossRoom.introShown && isBossAlive()) {
    game.bossRoom.introShown = true;
    log(`${game.boss.name} towers over the chamber!`);
  }
  const itemIndex = game.items.findIndex((entity) => entity.x === game.player.x && entity.y === game.player.y);
  if (itemIndex >= 0) {
    if (activeEffectIs("noPickup", "player")) {
      log("The environmental effect prevents you from picking up items.");
    } else if (game.items[itemIndex].shopPrice) {
      log(`${getVisibleItemName(game.items[itemIndex])} is for sale at ${getShopPrice(game.items[itemIndex])} gold.`);
    } else if (game.items[itemIndex].pendingSale) {
      log(`${getVisibleItemName(game.items[itemIndex])} is waiting in the shop sell position.`);
    } else {
      const item = game.items[itemIndex];
      if (item.monsterDisguise) {
        game.items.splice(itemIndex, 1);
        revealDisguisedMonster(item);
        return;
      }
      if (pickUpItem(item)) {
        game.items.splice(itemIndex, 1);
      }
    }
  }
  const specialRoom = getSpecialRoomAtPosition(game.player);
  if (specialRoom?.type === "gamblingRoom" && specialRoom.totemPos?.x === game.player.x && specialRoom.totemPos?.y === game.player.y) {
    const offer = specialRoom.offer ?? rollGamblingOffer(specialRoom);
    log(`Gambling totem offer: ${offer.winChance}% chance for ${offer.multiplier}x.`);
  }

  const trapIndex = game.traps.findIndex((entity) => entity.x === game.player.x && entity.y === game.player.y);
  if (trapIndex >= 0) {
    const trap = game.traps[trapIndex];
    playSoundEffect("trapTrigger");
    trap.visible = true;
    trackRunStat("trapsTriggered");
    const spent = consumeTrapUse(trap);
    if (tryTrapProofNegation()) {
      if (spent) {
        game.traps.splice(trapIndex, 1);
        log("Your Trap-proof Rune nullifies the trap, and it breaks apart.");
      } else {
        log(`Your Trap-proof Rune nullifies the trap. ${trap.remainingUses} use${trap.remainingUses === 1 ? "" : "s"} remain.`);
      }
      return true;
    }
    if (hasEquippedEffect("negateTraps")) {
      if (spent) {
        game.traps.splice(trapIndex, 1);
        log("Your Trapguard Bracelet negates the trap, and it breaks apart.");
      } else {
        log(`Your Trapguard Bracelet negates the trap. ${trap.remainingUses} use${trap.remainingUses === 1 ? "" : "s"} remain.`);
      }
      return true;
    }
    applyTrapEffect(trap);
    if (spent) {
      game.traps.splice(trapIndex, 1);
    } else {
      log(`${trap.name} remains armed with ${trap.remainingUses} use${trap.remainingUses === 1 ? "" : "s"} left.`);
    }
  }

  const sigilIndex = game.sigils.findIndex((entity) => entity.x === game.player.x && entity.y === game.player.y);
  if (sigilIndex >= 0) {
    const sigil = game.sigils[sigilIndex];
    playSoundEffect("sigilTrigger");
    const spent = consumeSigilUse(sigil);
    applySigilEffect(sigil);
    if (spent) {
      game.sigils.splice(sigilIndex, 1);
      log(`${sigil.name} fades away.`);
    } else {
      log(`${sigil.name} still hums with ${sigil.remainingUses} use${sigil.remainingUses === 1 ? "" : "s"} left.`);
    }
  }

  if (game.player.x === game.exit.x && game.player.y === game.exit.y) {
    const currentGoal = normalizeCustomGoal(game.recipe?.customGoal);
    if (game.floor >= game.recipe.floors) {
      if (isBossAlive()) {
        log(`${game.boss.name} still bars the final exit.`);
        return false;
      }
      if (currentGoal.type !== "escape" && currentGoal.needExit && !game.goalSatisfied) {
        log("The exit will only open after your custom goal is complete.");
        return false;
      }
      endRun("clear");
      log(`Cleared "${game.recipe.name}"!`);
      return false;
    } else {
      trackRunStat("floorsCleared");
      clearTemporaryBuffsForNewFloor();
      clearPendingSpecialAttack();
      game.pendingCast = null;
      game.floor += 1;
      updatePublishedRunStats("progress");
      playSoundEffect("stairsDescend");
      log(`Descended to floor ${game.floor}.`);
      generateFloor();
      return false;
    }
  }

  if (game.hp <= 0) {
    game.hp = 0;
    endRun("collapse");
    log("You collapsed in the dungeon. Generate or load a recipe to retry.");
    return false;
  }

  return true;
}

async function performMonsterAction(monster) {
  if (Number(monster.shadowboundTurns ?? 0) > 0) {
    monster.shadowboundTurns = Math.max(0, Number(monster.shadowboundTurns ?? 0) - 1);
    return;
  }
  const dxToPlayer = game.player.x - monster.x;
  const dyToPlayer = game.player.y - monster.y;
  const manhattanDistance = Math.abs(dxToPlayer) + Math.abs(dyToPlayer);
  const chebyshevDistance = Math.max(Math.abs(dxToPlayer), Math.abs(dyToPlayer));
  const attackRange = getMonsterAttackRange(monster);
  const monsterRoom = findRoomAt(monster);
  const playerRoom = findRoomAt(game.player);
  const sameRoom = Boolean(monsterRoom && playerRoom && monsterRoom.id === playerRoom.id);
  const isNextToEnemy = chebyshevDistance <= 1;

  const hideInWalls = getMonsterSkill(monster, "hideInWalls");
  if (monster.hiddenUntilNear && hideInWalls) {
    if (chebyshevDistance > Math.max(1, Number(hideInWalls.value ?? 1))) {
      return;
    }
    monster.hiddenUntilNear = false;
    log(`${monster.name} springs from hiding!`);
  }

  if (playerHasTiptoeBracelet() && !monster.hasSpottedPlayer && (sameRoom || isNextToEnemy)) {
    return;
  }

  const pullSkill = getMonsterSkill(monster, "pullPlayer");
  if (pullSkill && enemySkillTriggers(pullSkill) && manhattanDistance > 1 && manhattanDistance <= Number(pullSkill.value ?? 0)) {
    const pullDx = Math.sign(monster.x - game.player.x);
    const pullDy = Math.sign(monster.y - game.player.y);
    const next = { x: game.player.x + pullDx, y: game.player.y + pullDy };
    if (game.tiles[next.y]?.[next.x] === "floor" && !game.monsters.some((other) => other.x === next.x && other.y === next.y) && !bossOccupies(next.x, next.y)) {
      game.player = next;
      log(`${monster.name} pulls you closer.`);
    }
  }

  const attackMode = chooseMonsterAttackMode(monster, manhattanDistance);
  if (attackMode && manhattanDistance <= attackRange && manhattanDistance > 0) {
    await monsterAttack(monster, manhattanDistance, attackMode);
    if (!game.ended) {
      await sleep(ENEMY_ATTACK_BEAT_MS);
    }
    return;
  }

  const pursuit = normalizeEnemyPursuitSettings(monster.pursuit, {}, monster.familyId);
  if (!pursuit.enabled) {
    return;
  }

  const canNoticeByRoom = pursuit.whenEntering || pursuit.whenLeaving;

  if (sameRoom && canNoticeByRoom) {
    monster.hasSpottedPlayer = true;
  }
  if (pursuit.whenNextToEnemy && isNextToEnemy) {
    monster.hasSpottedPlayer = true;
  }

  const shouldPursue = (
    (pursuit.whenEntering && sameRoom)
    || (pursuit.whenLeaving && monster.hasSpottedPlayer === true && !sameRoom)
    || (pursuit.whenNextToEnemy && isNextToEnemy)
  );

  if (!shouldPursue) {
    return;
  }

  const next = findMonsterChaseStep(monster, game.player);
  if (next) {
    const wallDig = getMonsterSkill(monster, "wallDigWander");
    if (wallDig && game.tiles[next.y]?.[next.x] === "wall") {
      game.tiles[next.y][next.x] = "floor";
      log(`${monster.name} digs through the wall.`);
    }
    monster.x = next.x;
    monster.y = next.y;
  }
}

async function moveMonsters() {
  for (const monster of game.monsters) {
    if (game.ended) {
      break;
    }

    const regen = getMonsterSkill(monster, "regen");
    if (regen && enemySkillTriggers(regen)) {
      monster.hp = Math.min(monster.maxHp, monster.hp + Math.max(1, Number(regen.value ?? 1)));
    }
    const setTrapSkill = getMonsterSkill(monster, "setTrap");
    if (setTrapSkill && enemySkillTriggers(setTrapSkill) && !game.traps.some((trap) => trap.x === monster.x && trap.y === monster.y)) {
      const trapRule = normalizeTrapPoolRules(game.recipe?.trapPoolRules).find((rule) => rule.id === setTrapSkill.targetTrapId) ?? chooseTrapRule(game.recipe, Math.random);
      if (trapRule && Math.random() < 0.25) {
        game.traps.push(createTrapInstance(trapRule, { x: monster.x, y: monster.y }));
        log(`${monster.name} sets a trap.`);
      }
    }
    const burnNearbyItems = getMonsterSkill(monster, "burnNearbyItems");
    if (burnNearbyItems && enemySkillTriggers(burnNearbyItems)) {
      const radius = Math.max(1, Number(burnNearbyItems.value ?? 1));
      const burned = game.items.filter((item) => !item.shopPrice && Math.max(Math.abs(item.x - monster.x), Math.abs(item.y - monster.y)) <= radius);
      if (burned.length > 0) {
        game.items = game.items.filter((item) => !burned.includes(item));
        log(`${monster.name} burns ${burned.length} ground item${burned.length === 1 ? "" : "s"}.`);
      }
    }
    const summonSkill = getMonsterSkill(monster, "summonMonsters");
    if (summonSkill && enemySkillTriggers(summonSkill)) {
      const count = Math.max(1, Number(summonSkill.value ?? 1));
      const spawned = spawnMonsterClonesNear(monster, count);
      if (spawned > 0) {
        log(`${monster.name} summons ${spawned} monster${spawned === 1 ? "" : "s"}.`);
      }
    }
    const healMonsters = getMonsterSkill(monster, "healMonsters");
    if (healMonsters && enemySkillTriggers(healMonsters)) {
      const count = Math.max(1, Number(healMonsters.value ?? 1));
      const amount = Math.max(1, Number(healMonsters.extra ?? 1));
      getNearbyMonsters(monster, count, Infinity, { includeSelf: false }).forEach((other) => {
        other.hp = Math.min(other.maxHp, other.hp + amount);
      });
      log(`${monster.name} restores ${amount} HP to ${count} nearby monster${count === 1 ? "" : "s"}.`);
    }
    const sendMonsters = getMonsterSkill(monster, "sendMonsters");
    if (sendMonsters && enemySkillTriggers(sendMonsters)) {
      const count = Math.max(1, Number(sendMonsters.value ?? 1));
      const range = Math.max(1, Number(sendMonsters.extra ?? 6));
      getNearbyMonsters(monster, count, range, { includeSelf: false }).forEach((other) => {
        other.hasSpottedPlayer = true;
      });
      log(`${monster.name} sends ${count} monster${count === 1 ? "" : "s"} after you.`);
    }
    const hasteMonsters = getMonsterSkill(monster, "hasteMonsters");
    if (hasteMonsters && enemySkillTriggers(hasteMonsters)) {
      const count = Math.max(1, Number(hasteMonsters.value ?? 1));
      const extra = Math.max(1, Number(hasteMonsters.extra ?? 1));
      getNearbyMonsters(monster, count, Infinity, { includeSelf: false }).forEach((other) => {
        other.bonusActions = Math.max(Number(other.bonusActions ?? 0), extra);
      });
      log(`${monster.name} speeds up ${count} monster${count === 1 ? "" : "s"}.`);
    }
    const morphMonsters = getMonsterSkill(monster, "morphMonstersToItems");
    if (morphMonsters && enemySkillTriggers(morphMonsters)) {
      const count = Math.max(1, Number(morphMonsters.value ?? 1));
      const range = Math.max(1, Number(morphMonsters.extra ?? 3));
      const targets = getNearbyMonsters(monster, count, range, { includeSelf: false });
      targets.forEach((other) => {
        const item = createMonsterDisguiseItem(other, morphMonsters.targetItemId);
        const index = game.monsters.indexOf(other);
        if (index >= 0) {
          game.monsters.splice(index, 1);
          game.items.push(item);
        }
      });
      if (targets.length > 0) {
        log(`${monster.name} morphs ${targets.length} monster${targets.length === 1 ? "" : "s"} into items.`);
      }
    }
    const explodeSkill = getMonsterSkill(monster, "explodeLowHp");
    if (explodeSkill && !monster.primedExplodeShown && monster.hp <= Math.ceil(monster.maxHp * (Number(explodeSkill.extra ?? 50) / 100))) {
      monster.primedExplodeShown = true;
      log(`${monster.name} is primed to explode!`);
    }

    await performMonsterAction(monster);
    while (!game.ended && Number(monster.bonusActions ?? 0) > 0) {
      monster.bonusActions = Math.max(0, Number(monster.bonusActions ?? 0) - 1);
      await performMonsterAction(monster);
    }
  }
  await takeBossTurn();
}

function findMonsterChaseStep(monster, target) {
  if (!monster || !target) {
    return null;
  }
  const startKey = `${monster.x},${monster.y}`;
  const targetKey = `${target.x},${target.y}`;
  const blocked = new Set(
    game.monsters
      .filter((other) => other !== monster)
      .map((other) => `${other.x},${other.y}`)
  );
  const queue = [{ x: monster.x, y: monster.y }];
  const visited = new Set([startKey]);
  const cameFrom = new Map();
  const phaseWalls = getMonsterSkill(monster, "phaseWalls");
  const wallDig = getMonsterSkill(monster, "wallDigWander");
  const allowWallPhase = (phaseWalls && enemySkillTriggers(phaseWalls)) || (wallDig && enemySkillTriggers(wallDig));
  const directions = [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
  ];

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) {
      break;
    }
    if (`${current.x},${current.y}` === targetKey) {
      break;
    }
    directions.forEach((direction) => {
      const next = {
        x: current.x + direction.x,
        y: current.y + direction.y,
      };
      const key = `${next.x},${next.y}`;
      if (visited.has(key)) {
        return;
      }
      if (next.x === target.x && next.y === target.y) {
        visited.add(key);
        cameFrom.set(key, current);
        queue.push(next);
        return;
      }
      if (!allowWallPhase && game.tiles[next.y]?.[next.x] !== "floor") {
        return;
      }
      if (blocked.has(key) || bossOccupies(next.x, next.y)) {
        return;
      }
      visited.add(key);
      cameFrom.set(key, current);
      queue.push(next);
    });
  }

  if (!visited.has(targetKey)) {
    return null;
  }

  let stepKey = targetKey;
  let previous = cameFrom.get(stepKey);
  while (previous && `${previous.x},${previous.y}` !== startKey) {
    stepKey = `${previous.x},${previous.y}`;
    previous = cameFrom.get(stepKey);
  }
  const [x, y] = stepKey.split(",").map(Number);
  if (!Number.isFinite(x) || !Number.isFinite(y) || (x === monster.x && y === monster.y)) {
    return null;
  }
  return { x, y };
}

function randomizeRecipe() {
  const names = ["Mushroom Gauntlet", "Candlebone Depths", "Frostbite Orchard", "Goblin Pantry"];
  controls.dungeonName.value = names[Math.floor(Math.random() * names.length)];
  controls.floors.value = 1 + Math.floor(Math.random() * 99);
  controls.roomCount.value = 3 + Math.floor(Math.random() * 10);
  controls.monsterRate.value = 2 + Math.floor(Math.random() * 17);
  controls.monsterRespawnRate.value = Math.floor(Math.random() * 11);
  controls.difficulty.value = Math.floor(Math.random() * 11);
  controls.itemRate.value = 1 + Math.floor(Math.random() * 18);
  controls.rareRate.value = Math.floor(Math.random() * 11);
  controls.curseRate.value = Math.floor(Math.random() * 51);
  controls.blessedRate.value = Math.floor(Math.random() * 41);
  controls.trapRate.value = Math.floor(Math.random() * 13);
  controls.sigilRate.value = Math.floor(Math.random() * 13);
  controls.goldRate.value = Math.floor(Math.random() * 101);
  controls.inventoryLimit.value = 3 + Math.floor(Math.random() * 28);
  controls.monsterLimit.value = 4 + Math.floor(Math.random() * 20);
  controls.hungerEnabled.checked = Math.random() < 0.55;
  controls.hungerDrainRate.value = 2 + Math.floor(Math.random() * 10);
  controls.unidentifiedEnabled.checked = Math.random() < 0.45;
  controls.deductionMode.checked = controls.unidentifiedEnabled.checked && Math.random() < 0.5;
  controls.weaponRarityEnabled.checked = Math.random() < 0.85;
  randomizeRarityRules();
  controls.equippedCountsTowardLimit.checked = Math.random() < 0.45;
  controls.hideGridlines.checked = Math.random() < 0.5;
  controls.cameraMode.value = Math.random() < 0.55 ? "center" : "screen";
  controls.environment.value = ["ruins", "fungal", "ember", "frost", "cosmic", "beach", "ghastly", "shadow", "underwater", "swamp", "depths", "blood"][Math.floor(Math.random() * 12)];
  applyCustomEnvironmentLibrary([]);
  applyEnvironmentStageRules([{
    id: makeId("environmentStage"),
    startFloor: 1,
    environmentKey: controls.environment.value,
  }], {
    floors: numberValue("floors"),
    customEnvironmentLibrary: [],
  });
  applyStartingStats({
    hp: 12 + Math.floor(Math.random() * 25),
    attack: Math.floor(Math.random() * 7),
    defense: Math.floor(Math.random() * 6),
    accuracy: 55 + Math.floor(Math.random() * 46),
    gold: Math.floor(Math.random() * 301),
  });
  applyLevelingSettings({
    enabled: Math.random() < 0.45,
    thresholds: buildDefaultLevelThresholds(),
    statGrowth: {
      hp: { enabled: Math.random() < 0.75, value: 1 + Math.floor(Math.random() * 4) },
      attack: { enabled: Math.random() < 0.6, value: Math.floor(Math.random() * 3) },
      defense: { enabled: Math.random() < 0.6, value: Math.floor(Math.random() * 3) },
      accuracy: { enabled: Math.random() < 0.35, value: Math.floor(Math.random() * 3) },
      gold: { enabled: Math.random() < 0.2, value: Math.floor(Math.random() * 41) - 10 },
    },
  });
  const goalRoll = Math.random();
  const goalType = goalRoll < 0.25 ? "escape" : goalRoll < 0.5 ? "kill" : goalRoll < 0.75 ? "obtain" : "gold";
  applyEnvironmentalEffects(normalizeEnvironmentalEffects().map((effect) => ({
    ...effect,
    affectsPlayer: Math.random() < 0.68,
    affectsEnemy: Math.random() < 0.68,
    playerTurns: 2 + Math.floor(Math.random() * 8),
    enemyTurns: 2 + Math.floor(Math.random() * 8),
  })));
  applySpecialRooms(normalizeSpecialRooms().map((room) => ({
    ...room,
    enabled: Math.random() < 0.55,
  })));
  randomizeItemPoolRules();
  randomizeRunePoolRules();
  renderItemPoolControls(readItemPoolRules());
  randomizeTrapPoolRules();
  randomizeSigilPoolRules();
  randomizeEnemyPoolRules();
  randomizeEnemyDropSettings();
  applyBossRoomSettings({
    enabled: Math.random() < 0.28,
    name: ["Warden", "Overlord", "Archivist", "Brute", "Mycelial Core"][Math.floor(Math.random() * 5)],
    bossSize: Math.random() < 0.55 ? "2x2" : "3x3",
    attack: 8 + Math.floor(Math.random() * 17),
    shape: bossRoomShapeOptions[Math.floor(Math.random() * bossRoomShapeOptions.length)] ?? "square",
    width: 7 + Math.floor(Math.random() * 7),
    height: 7 + Math.floor(Math.random() * 7),
    behavior: Math.floor(Math.random() * 11),
    specialAttacks: normalizeBossSpecialAttacks().map((attack, index) => ({
      ...attack,
      id: `${attack.id}-${index}`,
      enabled: Math.random() < 0.85,
      damage: attack.damage + Math.floor(Math.random() * 5),
      cooldown: Math.max(0, attack.cooldown + Math.floor(Math.random() * 3) - 1),
      range: Math.max(1, attack.range + Math.floor(Math.random() * 3) - 1),
    })),
  });
  renderCustomGoalControls({
    type: goalType,
    count: goalType === "escape"
      ? 1
      : goalType === "kill"
        ? 4 + Math.floor(Math.random() * 8)
        : goalType === "gold"
          ? 100 + Math.floor(Math.random() * 1401)
          : 2 + Math.floor(Math.random() * 4),
    target: goalType === "escape"
      ? "exit"
      : goalType === "kill"
        ? getEnemyGoalOptions()[Math.floor(Math.random() * getEnemyGoalOptions().length)]?.value ?? "any_monster"
        : goalType === "gold"
          ? "gold"
          : getItemGoalOptions()[Math.floor(Math.random() * getItemGoalOptions().length)]?.value ?? "bitterGrass",
    needExit: goalType === "escape" ? false : Math.random() < 0.5,
  });
  randomizeStartingEquipment();
  updateHungerControls();
  updateUnidentifiedControls();
  refreshRarityEditorState();
  updateOutputs();
}

function randomizeRarityRules() {
  const rules = normalizeRarityRules([]);
  rules[0].multiplier = Number((1.25 + Math.random() * 0.7).toFixed(2));
  rules[0].color = randomRarityColor("#72b7c9");
  rules[0].effect = randomRarityEffect();
  rules[1].multiplier = Number((2 + Math.random() * 1.15).toFixed(2));
  rules[1].color = randomRarityColor("#f4b942");
  rules[1].effect = randomRarityEffect();
  const extraCount = Math.floor(Math.random() * 4);
  for (let index = 0; index < extraCount; index += 1) {
    const rule = makeDefaultRarityRule(index);
    rule.name = ["Legendary", "Mythic", "Ancient", "Prismatic", "Astral", "Voidborn"][Math.floor(Math.random() * 6)];
    rule.multiplier = Number((2.8 + Math.random() * 2.4 + index * 0.2).toFixed(2));
    rule.color = randomRarityColor(rule.color);
    rule.effect = randomRarityEffect();
    rules.push(rule);
  }
  renderRarityControls(rules);
}

function randomRarityColor(fallback) {
  const preset = ["#72b7c9", "#f4b942", "#d04cff", "#7fd069", "#ff7a59", "#7aa7ff"];
  return preset[Math.floor(Math.random() * preset.length)] ?? fallback;
}

function randomRarityEffect() {
  const effects = rarityEffectOptions.filter((option) => option.id !== "none");
  return effects[Math.floor(Math.random() * effects.length)]?.id ?? "none";
}

function randomizeStartingEquipment() {
  renderStartingEquipmentControls({
    leftHand: { itemId: randomEnabledItem("hand"), rarity: randomStartingHandRarity(), cursed: Math.random() < 0.2 },
    rightHand: { itemId: Math.random() < 0.7 ? randomEnabledItem("hand") : null, rarity: randomStartingHandRarity(), cursed: Math.random() < 0.2 },
    bracelet1: { itemId: Math.random() < 0.65 ? randomEnabledItem("bracelet") : null, cursed: Math.random() < 0.2 },
    bracelet2: { itemId: Math.random() < 0.45 ? randomEnabledItem("bracelet") : null, cursed: Math.random() < 0.2 },
  });
  randomizeStartingInventory();
}

function randomStartingHandRarity() {
  const options = ["common", ...getSelectableStartingRarityOptions().map((rule) => rule.id)];
  return options[Math.floor(Math.random() * options.length)] ?? "common";
}

function randomizeStartingInventory() {
  const slots = getStartingInventorySlotCount();
  renderStartingInventoryControls(Array.from({ length: slots }, () => ({
    itemId: Math.random() < 0.42 ? randomEnabledItem() : null,
    cursed: Math.random() < 0.2,
  })));
}

function randomEnabledItem(kind = null) {
  const rules = normalizeItemPoolRules(readItemPoolRules());
  const candidates = rules
    .filter((rule) => rule.enabled && !rule.deleted && (!kind || itemDefinitions[rule.itemId]?.kind === kind))
    .map((rule) => rule.itemId);
  return candidates.length > 0 ? candidates[Math.floor(Math.random() * candidates.length)] : null;
}

function randomizeItemPoolRules() {
  itemPoolList.querySelectorAll(".item-pool-row").forEach((row) => {
  const item = itemDefinitions[row.dataset.item];
  const enabledChance = 0.78;
    row.querySelector('[data-target="enabled"]').checked = Math.random() < enabledChance;
    if (row.querySelector('[data-target="inventoryEffect"]')) {
      row.querySelector('[data-target="inventoryEffect"]').checked = Math.random() < 0.35;
    }
  });

  ensureAtLeastOneItemPoolEntry("hand");
  ensureAtLeastOneItemPoolEntry("grass");
  ensureAtLeastOneItemPoolEntry("scroll");
  updateItemPoolCategoryToggles();
}

function randomizeRunePoolRules() {
  const rules = normalizeRunePoolRules(readRunePoolRules()).map((rule) => {
    if (rule.effectType === "critical") {
      return {
        ...rule,
        enabled: Math.random() < 0.72,
        critChance: 15 + Math.floor(Math.random() * 51),
        critMultiplier: Number((1.2 + Math.random() * 1.2).toFixed(1)),
      };
    }
    if (rule.effectType === "healing") {
      return {
        ...rule,
        enabled: Math.random() < 0.68,
        healPercent: 5 + Math.floor(Math.random() * 31),
      };
    }
    if (rule.effectType === "antiMonster") {
      const types = getEnemyTypeOptions();
      return {
        ...rule,
        enabled: Math.random() < 0.7,
        targetTypeId: types[Math.floor(Math.random() * types.length)]?.value ?? rule.targetTypeId,
        bonusMultiplier: Number((1.2 + Math.random() * 1.8).toFixed(1)),
      };
    }
    if (rule.effectType === "cursedMight") {
      return {
        ...rule,
        enabled: Math.random() < 0.58,
        curseBonus: 1 + Math.floor(Math.random() * 3),
      };
    }
    if (rule.effectType === "hpPlus") {
      return {
        ...rule,
        enabled: Math.random() < 0.58,
        hpBonus: 2 + Math.floor(Math.random() * 12),
      };
    }
    if (rule.effectType === "dangerPower") {
      return {
        ...rule,
        enabled: Math.random() < 0.58,
        lowHpPercent: 10 + Math.floor(Math.random() * 41),
        bonusMultiplier: Number((1.2 + Math.random() * 1.3).toFixed(1)),
      };
    }
    if (rule.effectType === "toughAtX") {
      return {
        ...rule,
        enabled: Math.random() < 0.56,
        toughDigit: Math.floor(Math.random() * 10),
        toughReducePercent: 15 + Math.floor(Math.random() * 41),
      };
    }
    if (rule.effectType === "trapProof") {
      return {
        ...rule,
        enabled: Math.random() < 0.56,
        trapNullifyChance: 10 + Math.floor(Math.random() * 51),
      };
    }
    if (rule.effectType === "fullArmor") {
      return {
        ...rule,
        enabled: Math.random() < 0.56,
        fullHpBlockPercent: 20 + Math.floor(Math.random() * 51),
      };
    }
    if (rule.effectType === "guts") {
      return {
        ...rule,
        enabled: Math.random() < 0.5,
        gutsChance: 10 + Math.floor(Math.random() * 41),
      };
    }
    if (rule.effectType === "driedBonito") {
      return {
        ...rule,
        enabled: Math.random() < 0.52,
        nibbleHunger: 10 + Math.floor(Math.random() * 26),
        nibblePenalty: 1 + Math.floor(Math.random() * 2),
      };
    }
    if (rule.effectType === "voraciousHit") {
      return {
        ...rule,
        enabled: Math.random() < 0.56,
        hungerCost: 1 + Math.floor(Math.random() * 4),
        bonusMultiplier: Number((1.2 + Math.random() * 0.8).toFixed(1)),
      };
    }
    if (rule.effectType === "hungerPower") {
      return {
        ...rule,
        enabled: Math.random() < 0.54,
        bonusMultiplier: Number((1.5 + Math.random() * 1.5).toFixed(1)),
      };
    }
    if (rule.effectType === "voraciousBlock") {
      return {
        ...rule,
        enabled: Math.random() < 0.54,
        hungerCost: 1 + Math.floor(Math.random() * 4),
        blockPercent: 15 + Math.floor(Math.random() * 36),
      };
    }
    if (rule.effectType === "costlyHit") {
      return {
        ...rule,
        enabled: Math.random() < 0.56,
        goldCost: 50 + Math.floor(Math.random() * 251),
        bonusMultiplier: Number((1.2 + Math.random() * 0.8).toFixed(1)),
      };
    }
    if (rule.effectType === "costlyBlock") {
      return {
        ...rule,
        enabled: Math.random() < 0.54,
        goldCost: 50 + Math.floor(Math.random() * 251),
        blockPercent: 15 + Math.floor(Math.random() * 36),
      };
    }
    if (rule.effectType === "critproof") {
      return {
        ...rule,
        enabled: Math.random() < 0.55,
        critproofPercent: 25 + Math.floor(Math.random() * 51),
      };
    }
    if (rule.effectType === "antiMonsterGuard") {
      const types = getEnemyTypeOptions();
      return {
        ...rule,
        enabled: Math.random() < 0.55,
        targetTypeId: types[Math.floor(Math.random() * types.length)]?.value ?? rule.targetTypeId,
        blockPercent: 20 + Math.floor(Math.random() * 41),
      };
    }
    if (rule.effectType === "keen") {
      return {
        ...rule,
        enabled: Math.random() < 0.54,
        evadeChance: 10 + Math.floor(Math.random() * 31),
      };
    }
    if (rule.effectType === "leapPayback") {
      return {
        ...rule,
        enabled: Math.random() < 0.48,
        paybackChance: 5 + Math.floor(Math.random() * 21),
      };
    }
    if (rule.effectType === "shadowPayback") {
      return {
        ...rule,
        enabled: Math.random() < 0.48,
        paybackChance: 10 + Math.floor(Math.random() * 31),
      };
    }
    if (rule.effectType === "retribution") {
      return {
        ...rule,
        enabled: Math.random() < 0.5,
        reflectPercent: 20 + Math.floor(Math.random() * 41),
      };
    }
    if (rule.effectType === "thunderbolt") {
      return {
        ...rule,
        enabled: Math.random() < 0.56,
        thunderChance: Number((20 + Math.random() * 5).toFixed(1)),
        thunderDamage: 10 + Math.floor(Math.random() * 21),
      };
    }
    if (rule.effectType === "knockback") {
      return {
        ...rule,
        enabled: Math.random() < 0.58,
        knockbackChance: Number((20 + Math.random() * 60).toFixed(1)),
      };
    }
    if (rule.effectType === "flameShot") {
      return {
        ...rule,
        enabled: Math.random() < 0.58,
        flameDamage: 6 + Math.floor(Math.random() * 11),
      };
    }
    if (rule.effectType === "swiftStrikes") {
      return {
        ...rule,
        enabled: Math.random() < 0.6,
        swiftChance: 10 + Math.floor(Math.random() * 31),
        swiftPower: Number((0.3 + Math.random() * 0.7).toFixed(1)),
      };
    }
    if (rule.effectType === "criticalAt7") {
      return {
        ...rule,
        enabled: Math.random() < 0.55,
        criticalDigit: Math.floor(Math.random() * 10),
      };
    }
    if (["rustproof", "sating", "frontalAttack", "sideAttack", "backAttack", "accurate", "trapFinding", "trapBust", "wallDig", "quintessence", "thirdStrike"].includes(rule.effectType)) {
      return {
        ...rule,
        enabled: Math.random() < 0.55,
      };
    }
    return {
      ...rule,
      enabled: Math.random() < 0.6,
      dullAmount: 1 + Math.floor(Math.random() * 3),
    };
  });
  if (rules.length === 0) {
    renderRunePoolControls([]);
    return;
  }
  if (!rules.some((rule) => rule.enabled)) {
    rules[0].enabled = true;
  }
  renderRunePoolControls(rules);
}

function randomizeTrapPoolRules() {
  if (trapsVisibleEnabled) {
    trapsVisibleEnabled.checked = Math.random() < 0.35;
  }
  trapPoolList.querySelectorAll(".trap-row").forEach((row, index) => {
    const enabled = row.querySelector('[data-target="enabled"]');
    const effectType = row.querySelector('[data-target="effectType"]');
    if (enabled) {
      enabled.checked = index < defaultTrapRules.length ? Math.random() < 0.85 : Math.random() < 0.55;
    }
    if (effectType && row.dataset.locked !== "true" && Math.random() < 0.75) {
      effectType.value = trapEffectOptions[Math.floor(Math.random() * trapEffectOptions.length)]?.id ?? "damage";
    }
  });
  refreshTrapEditorState();
  trapPoolList.querySelectorAll(".trap-row").forEach((row) => {
    const value1 = row.querySelector('[data-target="value1"]');
    const value2 = row.querySelector('[data-target="value2"]');
    const uses = row.querySelector('[data-target="uses"]');
    if (value1 && !value1.closest(".hidden")) {
      const min = Number(value1.min || 0);
      const max = Number(value1.max || min);
      value1.value = String(min + Math.floor(Math.random() * Math.max(1, max - min + 1)));
    }
    if (value2 && !value2.closest(".hidden")) {
      const min = Number(value2.min || 0);
      const max = Number(value2.max || min);
      value2.value = String(min + Math.floor(Math.random() * Math.max(1, max - min + 1)));
    }
    if (uses) {
      uses.value = String(1 + Math.floor(Math.random() * 4));
    }
  });
  refreshTrapEditorState();
}

function randomizeSigilPoolRules() {
  if (sigilsVisibleEnabled) {
    sigilsVisibleEnabled.checked = Math.random() < 0.35;
  }
  sigilPoolList.querySelectorAll(".sigil-row").forEach((row, index) => {
    const enabled = row.querySelector('[data-target="enabled"]');
    const effectType = row.querySelector('[data-target="effectType"]');
    if (enabled) {
      enabled.checked = index < defaultSigilRules.length ? Math.random() < 0.85 : Math.random() < 0.55;
    }
    if (effectType && row.dataset.locked !== "true" && Math.random() < 0.75) {
      effectType.value = sigilEffectOptions[Math.floor(Math.random() * sigilEffectOptions.length)]?.id ?? "heal";
    }
  });
  refreshSigilEditorState();
  sigilPoolList.querySelectorAll(".sigil-row").forEach((row) => {
    const value1 = row.querySelector('[data-target="value1"]');
    const value2 = row.querySelector('[data-target="value2"]');
    const uses = row.querySelector('[data-target="uses"]');
    if (value1 && !value1.closest(".hidden")) {
      const min = Number(value1.min || 0);
      const max = Number(value1.max || min);
      value1.value = String(min + Math.floor(Math.random() * Math.max(1, max - min + 1)));
    }
    if (value2 && !value2.closest(".hidden")) {
      const min = Number(value2.min || 0);
      const max = Number(value2.max || min);
      value2.value = String(min + Math.floor(Math.random() * Math.max(1, max - min + 1)));
    }
    if (uses) {
      uses.value = String(1 + Math.floor(Math.random() * 4));
    }
  });
  refreshSigilEditorState();
}

function randomizeEnemyPoolRules() {
  enemyPoolList.querySelectorAll(".enemy-family").forEach((familyElement) => {
    const pursuitEnabled = Math.random() < 0.8;
    const pursueToggle = familyElement.querySelector('[data-target="pursuitEnabled"]');
    const whenEntering = familyElement.querySelector('[data-target="pursuitWhenEntering"]');
    const whenLeaving = familyElement.querySelector('[data-target="pursuitWhenLeaving"]');
    const whenNextToEnemy = familyElement.querySelector('[data-target="pursuitWhenNextToEnemy"]');
    if (pursueToggle) {
      pursueToggle.checked = pursuitEnabled;
    }
    if (whenEntering) {
      whenEntering.checked = pursuitEnabled && Math.random() < 0.8;
    }
    if (whenLeaving) {
      whenLeaving.checked = pursuitEnabled && Math.random() < 0.65;
    }
    if (whenNextToEnemy) {
      whenNextToEnemy.checked = pursuitEnabled && Math.random() < 0.85;
    }
    const levelRows = Array.from(familyElement.querySelectorAll(".enemy-level-row"));
    levelRows.forEach((row, index) => {
      row.querySelector('[data-target="enabled"]').checked = index === 0 ? true : Math.random() < 0.72;
    });
  });
  updateEnemyFamilyToggles();
  updateEnemyPursuitControls();
}

function randomizeEnemyDropSettings() {
  const enabled = Math.random() < 0.55;
  if (controls.enemyDropsEnabled) {
    controls.enemyDropsEnabled.checked = enabled;
  }
  if (controls.enemyDropChance) {
    controls.enemyDropChance.value = String(15 + Math.floor(Math.random() * 61));
  }
  if (controls.enemyDropRarityChance) {
    controls.enemyDropRarityChance.value = String(10 + Math.floor(Math.random() * 41));
  }
  updateEnemyDropControls();
  enemyDropCategories.querySelectorAll('[data-enemy-drop-category]').forEach((checkbox) => {
    checkbox.checked = enabled ? Math.random() < 0.5 : false;
  });
  if (enabled && !enemyDropCategories.querySelector('[data-enemy-drop-category]:checked')) {
    const first = enemyDropCategories.querySelector('[data-enemy-drop-category]');
    if (first) {
      first.checked = true;
    }
  }
}

function interactionsLocked() {
  return game.ended === true || game.processingTurn === true || game.animatingProjectile === true || game.animatingMelee === true;
}

function ensureAtLeastOneItemPoolEntry(kind) {
  const rows = Array.from(itemPoolList.querySelectorAll(".item-pool-row"))
    .filter((row) => itemDefinitions[row.dataset.item]?.kind === kind);
  if (rows.length === 0 || rows.some((row) => row.querySelector('[data-target="enabled"]').checked)) {
    return;
  }
  rows[Math.floor(Math.random() * rows.length)].querySelector('[data-target="enabled"]').checked = true;
}

Object.values(controls).forEach((control) => {
  if (control && typeof control.addEventListener === "function") {
    control.addEventListener("input", updateOutputs);
  }
});

controls.floors.addEventListener("input", () => {
  renderEnvironmentStageControls(readEnvironmentStageRules(), {
    floors: numberValue("floors"),
    customEnvironmentLibrary: readCustomEnvironmentLibrary(),
  });
  if (game.recipe) {
    game.recipe.floors = numberValue("floors");
    game.recipe.customEnvironmentLibrary = readCustomEnvironmentLibrary();
    game.recipe.environmentStages = readEnvironmentStageRules();
    game.recipe.environment = isCustomEnvironmentKey(game.recipe.environmentStages[0]?.environmentKey)
      ? "custom"
      : (game.recipe.environmentStages[0]?.environmentKey ?? "ruins");
    game.floorEnvironmentId = getFloorEnvironment(game.recipe, game.floor);
    render();
  }
});

function syncLevelingRecipeFromControls() {
  updateLevelingControls();
  if (game.recipe) {
    game.recipe.leveling = readLevelingSettings();
    render();
  }
}

function syncBossRoomRecipeFromControls() {
  updateBossRoomControls();
  if (game.recipe) {
    game.recipe.bossRoom = readBossRoomSettings();
  }
}

function syncSpecialAttackRecipeFromControls() {
  const itemRules = readItemPoolRules();
  if (game.recipe) {
    game.recipe.specialAttackRules = readSpecialAttackRules();
    if (game.pendingSpecialAttack && !getPendingSpecialAttack()) {
      clearPendingSpecialAttack();
    }
    render();
  }
  renderItemPoolControls(itemRules);
}

[controls.levelingEnabled, controls.levelHpEnabled, controls.levelAttackEnabled, controls.levelDefenseEnabled, controls.levelAccuracyEnabled, controls.levelHungerEnabled, controls.levelGoldEnabled].forEach((control) => {
  control.addEventListener("change", syncLevelingRecipeFromControls);
});

[controls.levelHpValue, controls.levelAttackValue, controls.levelDefenseValue, controls.levelAccuracyValue, controls.levelHungerValue, controls.levelGoldValue].forEach((control) => {
  control.addEventListener("input", syncLevelingRecipeFromControls);
});

levelingTableBody.addEventListener("input", () => {
  if (game.recipe) {
    game.recipe.leveling = readLevelingSettings();
  }
});

[controls.bossRoomEnabled, controls.bossName, controls.bossSize, controls.bossAttack, controls.bossRoomShape, controls.bossRoomWidth, controls.bossRoomHeight, controls.bossBehavior].forEach((control) => {
  const eventName = control.tagName === "INPUT" && control.type !== "checkbox" ? "input" : "change";
  control.addEventListener(eventName, syncBossRoomRecipeFromControls);
});

bossAttackAddButton.addEventListener("click", () => {
  const newRow = createBossSpecialAttackRow({
    id: `bossAttack${bossAttackList.children.length + 1}`,
    name: `Special Attack ${bossAttackList.children.length + 1}`,
    enabled: true,
    damage: 8,
    cooldown: 3,
    range: 3,
    notes: "",
  });
  bossAttackList.prepend(newRow);
  const nameInput = newRow.querySelector('[data-target="name"]');
  if (nameInput && typeof nameInput.focus === "function") {
    nameInput.focus();
    if (typeof nameInput.select === "function") {
      nameInput.select();
    }
  }
  syncBossRoomRecipeFromControls();
});

bossAttackList.addEventListener("click", (event) => {
  const button = event.target.closest('[data-action="remove_boss_attack"]');
  if (!button) {
    return;
  }
  button.closest(".boss-attack-row")?.remove();
  syncBossRoomRecipeFromControls();
});

bossAttackList.addEventListener("input", syncBossRoomRecipeFromControls);
bossAttackList.addEventListener("change", syncBossRoomRecipeFromControls);

specialAttackAddButton.addEventListener("click", () => {
  addSpecialAttackRule();
  syncSpecialAttackRecipeFromControls();
});

specialAttackEnableAll?.addEventListener("change", () => {
  setSectionEntriesEnabled(specialAttackList, specialAttackEnableAll.checked);
  renderSpecialAttackControls(readSpecialAttackRules());
  syncSpecialAttackRecipeFromControls();
});

specialAttackList.addEventListener("click", (event) => {
  const removeButton = event.target.closest('[data-action="remove_special_attack"]');
  if (removeButton) {
    removeButton.closest(".special-attack-row")?.remove();
    syncSpecialAttackRecipeFromControls();
    return;
  }
  const cellButton = event.target.closest('[data-action="toggle_special_attack_cell"]');
  if (!cellButton) {
    return;
  }
  cellButton.classList.toggle("active");
  cellButton.setAttribute("aria-pressed", cellButton.classList.contains("active") ? "true" : "false");
  const row = cellButton.closest(".special-attack-row");
  if (row) {
    const summary = row.querySelector(".special-attack-summary");
    if (summary) {
      const rule = readSpecialAttackRules().find((entry) => entry.id === row.dataset.specialAttackId);
      if (rule) {
        summary.textContent = describeSpecialAttackRule(rule);
      }
    }
  }
  syncSpecialAttackRecipeFromControls();
});

specialAttackList.addEventListener("input", syncSpecialAttackRecipeFromControls);
specialAttackList.addEventListener("change", (event) => {
  const row = event.target.closest(".special-attack-row");
  if (row) {
    row.classList.toggle("recipe-entry-disabled", !(row.querySelector('[data-target="enabled"]')?.checked ?? true));
    const summary = row.querySelector(".special-attack-summary");
    if (summary) {
      const rule = readSpecialAttackRules().find((entry) => entry.id === row.dataset.specialAttackId);
      if (rule) {
        summary.textContent = describeSpecialAttackRule(rule);
      }
    }
  }
  syncBulkEnableToggle(specialAttackEnableAll, specialAttackList.querySelectorAll(".special-attack-row"));
  syncSpecialAttackRecipeFromControls();
});

itemPoolList.addEventListener("change", (event) => {
  const categoryToggle = event.target.closest("[data-category-toggle]");
  if (categoryToggle) {
    setCategoryItemsEnabled(categoryToggle.closest(".item-pool-category"), categoryToggle.checked);
  }
  const effectTypeSelect = event.target.closest('[data-target="effectType"]');
  if (effectTypeSelect) {
    renderItemPoolControls(readItemPoolRules());
  }
  const runeToggle = event.target.closest('[data-target="rune"]');
  if (runeToggle) {
    updateItemPoolRuneSummary(runeToggle.closest(".item-pool-row"));
  }
  const specialAttackToggle = event.target.closest('[data-target="specialAttack"]');
  if (specialAttackToggle) {
    updateItemPoolSpecialAttackSummary(specialAttackToggle.closest(".item-pool-row"));
  }
  syncItemDefinitionsFromRules(readItemPoolRules());
  renderConditionalItemUseControls(readEnvironmentalEffects().find((effect) => effect.id === "conditionalItemUse") ?? {});
  updateItemPoolRowStates();
  updateItemPoolCategoryToggles();
  refreshStartingLoadoutControls();
  renderCustomGoalControls(readCustomGoal());
  if (game.recipe) {
    game.recipe.itemPoolRules = readItemPoolRules();
    game.recipe.customGoal = readCustomGoal();
    render();
  }
});

itemPoolList.addEventListener("input", () => {
  syncItemDefinitionsFromRules(readItemPoolRules());
  renderConditionalItemUseControls(readEnvironmentalEffects().find((effect) => effect.id === "conditionalItemUse") ?? {});
  updateItemPoolRowStates();
  refreshStartingLoadoutControls();
  renderCustomGoalControls(readCustomGoal());
  if (game.recipe) {
    game.recipe.itemPoolRules = readItemPoolRules();
    game.recipe.customGoal = readCustomGoal();
    render();
  }
});

itemPoolList.addEventListener("click", (event) => {
  const addEffectButton = event.target.closest('[data-action="add_item_effect"]');
  if (addEffectButton) {
    addItemEffectRow(addEffectButton.closest(".item-pool-row")?.dataset.item);
    refreshStartingLoadoutControls();
    if (game.recipe) {
      game.recipe.itemPoolRules = readItemPoolRules();
      render();
    }
    return;
  }
  const removeEffectButton = event.target.closest('[data-action="remove_item_effect"]');
  if (removeEffectButton) {
    const row = removeEffectButton.closest(".item-pool-row");
    const effectRow = removeEffectButton.closest(".item-effect-row");
    removeItemEffectRow(row?.dataset.item, Number(effectRow?.dataset.effectIndex ?? -1));
    refreshStartingLoadoutControls();
    if (game.recipe) {
      game.recipe.itemPoolRules = readItemPoolRules();
      render();
    }
    return;
  }
  const addButton = event.target.closest('[data-action="add_item"]');
  if (addButton) {
    addItemPoolEntry(addButton.dataset.category);
    refreshStartingLoadoutControls();
    if (game.recipe) {
      game.recipe.itemPoolRules = readItemPoolRules();
    }
    return;
  }
  const removeButton = event.target.closest('[data-action="remove_item"]');
  if (!removeButton) {
    return;
  }
  removeButton.closest(".item-pool-row")?.remove();
  syncItemDefinitionsFromRules(readItemPoolRules());
  updateItemPoolCategoryToggles();
  refreshStartingLoadoutControls();
  renderCustomGoalControls(readCustomGoal());
  if (game.recipe) {
    game.recipe.itemPoolRules = readItemPoolRules();
    game.recipe.customGoal = readCustomGoal();
    render();
  }
});

specialRoomList.addEventListener("change", () => {
  updateSpecialRoomRowStates();
  if (game.recipe) {
    game.recipe.specialRooms = readSpecialRooms();
  }
});

specialRoomList.addEventListener("click", (event) => {
  const title = event.target.closest('[data-action="edit_special_room_name"]');
  if (!title) {
    return;
  }
  beginSpecialRoomRename(title.closest(".special-room-row"));
});

specialRoomList.addEventListener("keydown", (event) => {
  const title = event.target.closest('[data-action="edit_special_room_name"]');
  if (title && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    beginSpecialRoomRename(title.closest(".special-room-row"));
    return;
  }
  const input = event.target.closest(".special-room-title-input");
  if (!input) {
    return;
  }
  if (event.key === "Enter") {
    event.preventDefault();
    commitSpecialRoomRename(input.closest(".special-room-row"));
  }
  if (event.key === "Escape") {
    event.preventDefault();
    const row = input.closest(".special-room-row");
    const titleEl = row?.querySelector(".special-room-title");
    input.value = titleEl?.textContent?.trim() ?? input.value;
    input.classList.add("hidden");
    titleEl?.classList.remove("hidden");
  }
});

specialRoomList.addEventListener("blur", (event) => {
  const input = event.target.closest(".special-room-title-input");
  if (!input) {
    return;
  }
  commitSpecialRoomRename(input.closest(".special-room-row"));
}, true);

trapPoolList.addEventListener("click", (event) => {
  const button = event.target.closest('[data-action="remove_trap"]');
  if (!button) {
    return;
  }
  button.closest(".trap-row")?.remove();
  refreshTrapEditorState();
  if (game.recipe) {
    game.recipe.trapPoolRules = readTrapPoolRules();
  }
});

sigilPoolList.addEventListener("click", (event) => {
  const button = event.target.closest('[data-action="remove_sigil"]');
  if (!button) {
    return;
  }
  button.closest(".sigil-row")?.remove();
  refreshSigilEditorState();
  if (game.recipe) {
    game.recipe.sigilPoolRules = readSigilPoolRules();
  }
});

trapPoolList.addEventListener("input", () => {
  refreshTrapEditorState();
  if (game.recipe) {
    game.recipe.trapPoolRules = readTrapPoolRules();
    game.recipe.trapsVisible = trapsStartVisible();
  }
});

sigilPoolList.addEventListener("input", () => {
  refreshSigilEditorState();
  if (game.recipe) {
    game.recipe.sigilPoolRules = readSigilPoolRules();
  }
});

trapPoolList.addEventListener("change", () => {
  refreshTrapEditorState();
  if (game.recipe) {
    game.recipe.trapPoolRules = readTrapPoolRules();
    game.recipe.trapsVisible = trapsStartVisible();
  }
});

trapEnableAll?.addEventListener("change", () => {
  setSectionEntriesEnabled(trapPoolList, trapEnableAll.checked);
  refreshTrapEditorState();
  if (game.recipe) {
    game.recipe.trapPoolRules = readTrapPoolRules();
    game.recipe.trapsVisible = trapsStartVisible();
    render();
  }
});

sigilPoolList.addEventListener("change", () => {
  refreshSigilEditorState();
  if (game.recipe) {
    game.recipe.sigilPoolRules = readSigilPoolRules();
  }
});

sigilEnableAll?.addEventListener("change", () => {
  setSectionEntriesEnabled(sigilPoolList, sigilEnableAll.checked);
  refreshSigilEditorState();
  if (game.recipe) {
    game.recipe.sigilPoolRules = readSigilPoolRules();
    render();
  }
});

sigilsVisibleEnabled?.addEventListener("change", () => {
  if (game.recipe) {
    game.recipe.sigilsVisible = sigilsStartVisible();
    game.sigils.forEach((sigil) => {
      sigil.visible = sigilsStartVisible();
    });
    render();
  }
});

trapsVisibleEnabled?.addEventListener("change", () => {
  refreshTrapEditorState();
  if (game.recipe) {
    game.recipe.trapsVisible = trapsStartVisible();
    render();
  }
});

enemyPoolList.addEventListener("change", (event) => {
  const familyToggle = event.target.closest("[data-family-toggle]");
  if (familyToggle) {
    setEnemyFamilyEnabled(familyToggle.closest(".enemy-family"), familyToggle.checked);
  }
  if (event.target.closest('[data-target="skillType"]')) {
    renderEnemyPoolControls(readEnemyPoolRules());
  }
  refreshEnemySkillSummaries();
  updateEnemyFamilySummaries();
  updateEnemyFamilyToggles();
  updateEnemyPursuitControls();
  renderEnemyTypeControls(readEnemyTypeRules());
  renderRunePoolControls(readRunePoolRules());
  renderCustomGoalControls(readCustomGoal());
  if (game.recipe) {
    game.recipe.enemyPoolRules = readEnemyPoolRules();
    game.recipe.enemyTypeRules = readEnemyTypeRules();
    game.recipe.runePoolRules = readRunePoolRules();
    game.recipe.customGoal = readCustomGoal();
    render();
  }
});

enemyPoolList.addEventListener("input", () => {
  refreshEnemySkillSummaries();
  updateEnemyFamilySummaries();
  renderEnemyTypeControls(readEnemyTypeRules());
  renderRunePoolControls(readRunePoolRules());
  renderCustomGoalControls(readCustomGoal());
  if (game.recipe) {
    game.recipe.enemyPoolRules = readEnemyPoolRules();
    game.recipe.enemyTypeRules = readEnemyTypeRules();
    game.recipe.runePoolRules = readRunePoolRules();
    game.recipe.customGoal = readCustomGoal();
    render();
  }
});

controls.enemyDropsEnabled?.addEventListener("change", () => {
  updateEnemyDropControls();
  if (game.recipe) {
    game.recipe.enemyDrops = readEnemyDropSettings();
    render();
  }
});

[
  controls.enemyDropChance,
  controls.enemyDropRarityChance,
].forEach((control) => {
  control?.addEventListener("input", () => {
    if (game.recipe) {
      game.recipe.enemyDrops = readEnemyDropSettings();
      render();
    }
  });
});

enemyDropCategories.addEventListener("change", () => {
  if (game.recipe) {
    game.recipe.enemyDrops = readEnemyDropSettings();
    render();
  }
});

environmentalEffectsList.addEventListener("change", () => {
  const effects = readEnvironmentalEffects();
  applyEnvironmentalEffects(effects);
  if (game.recipe) {
    game.recipe.environmentalEffects = effects;
    render();
  }
});

enemyPoolList.addEventListener("click", (event) => {
  const addSkillButton = event.target.closest('[data-action="add_enemy_skill"]');
  if (addSkillButton) {
    const rules = readEnemyPoolRules();
    const familyId = addSkillButton.closest(".enemy-level-row")?.dataset.family;
    const levelNumber = Number(addSkillButton.closest(".enemy-level-row")?.dataset.level);
    const family = rules.find((entry) => entry.familyId === familyId);
    const level = family?.levels?.find((entry) => entry.level === levelNumber);
    if (level) {
      level.skills = [normalizeEnemySkill({ type: enemySkillDefinitions[0].id }, {}), ...normalizeEnemySkills(level.skills)];
      renderEnemyPoolControls(rules);
    }
    updateEnemyFamilySummaries();
    updateEnemyFamilyToggles();
    updateEnemyPursuitControls();
    renderEnemyTypeControls(readEnemyTypeRules());
    renderRunePoolControls(readRunePoolRules());
    renderCustomGoalControls(readCustomGoal());
    if (game.recipe) {
      game.recipe.enemyPoolRules = readEnemyPoolRules();
      game.recipe.enemyTypeRules = readEnemyTypeRules();
      game.recipe.runePoolRules = readRunePoolRules();
      game.recipe.customGoal = readCustomGoal();
      render();
    }
    return;
  }
  const removeSkillButton = event.target.closest('[data-action="remove_enemy_skill"]');
  if (removeSkillButton) {
    removeSkillButton.closest(".enemy-skill-row")?.remove();
    updateEnemyFamilySummaries();
    updateEnemyFamilyToggles();
    updateEnemyPursuitControls();
    renderEnemyTypeControls(readEnemyTypeRules());
    renderRunePoolControls(readRunePoolRules());
    renderCustomGoalControls(readCustomGoal());
    if (game.recipe) {
      game.recipe.enemyPoolRules = readEnemyPoolRules();
      game.recipe.enemyTypeRules = readEnemyTypeRules();
      game.recipe.runePoolRules = readRunePoolRules();
      game.recipe.customGoal = readCustomGoal();
      render();
    }
    return;
  }
  const button = event.target.closest('[data-action="remove_enemy_family"]');
  if (!button) {
    return;
  }
  button.closest(".enemy-family")?.remove();
  updateEnemyFamilyToggles();
  renderEnemyTypeControls(readEnemyTypeRules());
  renderRunePoolControls(readRunePoolRules());
  renderCustomGoalControls(readCustomGoal());
  if (game.recipe) {
    game.recipe.enemyPoolRules = readEnemyPoolRules();
    game.recipe.enemyTypeRules = readEnemyTypeRules();
    game.recipe.runePoolRules = readRunePoolRules();
    game.recipe.customGoal = readCustomGoal();
    render();
  }
});

enemyAddButton.addEventListener("click", () => {
  addEnemyFamily();
  updateEnemyFamilyToggles();
  updateEnemyPursuitControls();
  renderEnemyTypeControls(readEnemyTypeRules());
  renderRunePoolControls(readRunePoolRules());
  renderCustomGoalControls(readCustomGoal());
  if (game.recipe) {
    game.recipe.enemyPoolRules = readEnemyPoolRules();
    game.recipe.enemyTypeRules = readEnemyTypeRules();
    game.recipe.runePoolRules = readRunePoolRules();
    game.recipe.customGoal = readCustomGoal();
    render();
  }
});

enemyTypeList?.addEventListener("input", () => {
  renderRunePoolControls(readRunePoolRules());
  if (game.recipe) {
    game.recipe.enemyTypeRules = readEnemyTypeRules();
    game.recipe.runePoolRules = readRunePoolRules();
    render();
  }
});

enemyTypeList?.addEventListener("change", () => {
  renderEnemyTypeControls(readEnemyTypeRules());
  renderRunePoolControls(readRunePoolRules());
  if (game.recipe) {
    game.recipe.enemyTypeRules = readEnemyTypeRules();
    game.recipe.runePoolRules = readRunePoolRules();
    render();
  }
});

enemyTypeList?.addEventListener("click", (event) => {
  const removeButton = event.target.closest('[data-action="remove_enemy_type"]');
  if (!removeButton) {
    return;
  }
  removeButton.closest(".enemy-type-row")?.remove();
  renderEnemyTypeControls(readEnemyTypeRules());
  renderRunePoolControls(readRunePoolRules());
  if (game.recipe) {
    game.recipe.enemyTypeRules = readEnemyTypeRules();
    game.recipe.runePoolRules = readRunePoolRules();
    render();
  }
});

enemyTypeAddButton?.addEventListener("click", () => {
  addEnemyTypeRule();
  renderRunePoolControls(readRunePoolRules());
  if (game.recipe) {
    game.recipe.enemyTypeRules = readEnemyTypeRules();
    game.recipe.runePoolRules = readRunePoolRules();
    render();
  }
});

controls.hideGridlines.addEventListener("change", () => {
  if (game.recipe) {
    game.recipe.hideGridlines = controls.hideGridlines.checked;
    render();
  }
});

controls.cameraMode.addEventListener("change", () => {
  if (game.recipe) {
    game.recipe.cameraMode = controls.cameraMode.value;
    render();
  }
});

function syncDungeonBuilderRecipeFromControls() {
  renderEnvironmentStageControls(readEnvironmentStageRules(), {
    floors: numberValue("floors"),
    customEnvironmentLibrary: readCustomEnvironmentLibrary(),
  });
  if (game.recipe) {
    const customEnvironmentLibrary = readCustomEnvironmentLibrary();
    game.recipe.customEnvironmentLibrary = customEnvironmentLibrary;
    game.recipe.customEnvironment = customEnvironmentLibrary[0] ?? normalizeCustomEnvironment({});
    game.recipe.environmentStages = readEnvironmentStageRules();
    game.recipe.environment = isCustomEnvironmentKey(game.recipe.environmentStages[0]?.environmentKey)
      ? "custom"
      : (game.recipe.environmentStages[0]?.environmentKey ?? "ruins");
    game.floorEnvironmentId = getFloorEnvironment(game.recipe, game.floor);
    renderPublishedDungeons();
    render();
  }
}

addCustomEnvironmentButton?.addEventListener("click", () => {
  addCustomEnvironmentEntry();
  syncDungeonBuilderRecipeFromControls();
});

customEnvironmentLibraryList?.addEventListener("input", () => {
  syncDungeonBuilderRecipeFromControls();
});

customEnvironmentLibraryList?.addEventListener("change", async (event) => {
  const input = event.target.closest('input[type="file"]');
  if (!input) {
    syncDungeonBuilderRecipeFromControls();
    return;
  }
  const file = input.files?.[0];
  if (!file) {
    return;
  }
  try {
    input.dataset.imageData = await readFileAsDataUrl(file);
    const status = input.closest(".custom-environment-upload")?.querySelector(".custom-environment-status");
    if (status) {
      status.textContent = input.dataset.target === "floorImage"
        ? "Floor image loaded locally."
        : "Background image loaded locally.";
    }
    syncDungeonBuilderRecipeFromControls();
  } catch {
    log("That custom environment image could not be loaded.");
  } finally {
    input.value = "";
  }
});

customEnvironmentLibraryList?.addEventListener("click", (event) => {
  const clearFloor = event.target.closest('[data-action="clear_custom_floor"]');
  const clearBackground = event.target.closest('[data-action="clear_custom_background"]');
  const remove = event.target.closest('[data-action="remove_custom_environment"]');
  if (clearFloor) {
    const row = clearFloor.closest(".custom-environment-entry");
    const input = row?.querySelector('[data-target="floorImage"]');
    const status = row?.querySelector('[data-target="floorStatus"]');
    if (input) {
      input.dataset.imageData = "";
    }
    if (status) {
      status.textContent = "No floor image loaded.";
    }
    syncDungeonBuilderRecipeFromControls();
    return;
  }
  if (clearBackground) {
    const row = clearBackground.closest(".custom-environment-entry");
    const input = row?.querySelector('[data-target="backgroundImage"]');
    const status = row?.querySelector('[data-target="backgroundStatus"]');
    if (input) {
      input.dataset.imageData = "";
    }
    if (status) {
      status.textContent = "No background image loaded.";
    }
    syncDungeonBuilderRecipeFromControls();
    return;
  }
  if (remove) {
    remove.closest(".custom-environment-entry")?.remove();
    syncDungeonBuilderRecipeFromControls();
  }
});

addEnvironmentStageButton?.addEventListener("click", () => {
  addEnvironmentStageRule();
  syncDungeonBuilderRecipeFromControls();
});

environmentStageList?.addEventListener("click", (event) => {
  const button = event.target.closest('[data-action="remove_environment_stage"]');
  if (!button) {
    return;
  }
  button.closest(".environment-stage-row")?.remove();
  syncDungeonBuilderRecipeFromControls();
});

environmentStageList?.addEventListener("change", () => {
  syncDungeonBuilderRecipeFromControls();
});

soundEffectList?.addEventListener("change", async (event) => {
  const input = event.target.closest(".sound-effect-input");
  if (!input) {
    return;
  }
  const row = input.closest(".sound-effect-row");
  const file = input.files?.[0];
  if (!row || !file) {
    return;
  }
  try {
    row.dataset.fileName = file.name;
    row.dataset.audioData = await readFileAsDataUrl(file);
    updateSoundEffectRowStatus(row);
    if (game.recipe) {
      game.recipe.soundEffectRules = readSoundEffectRules();
      renderPublishedDungeons();
    }
  } catch {
    log("That sound effect could not be loaded.");
  } finally {
    input.value = "";
  }
});

soundEffectList?.addEventListener("click", (event) => {
  const clearButton = event.target.closest(".sound-effect-clear");
  if (!clearButton) {
    return;
  }
  const row = clearButton.closest(".sound-effect-row");
  if (!row) {
    return;
  }
  row.dataset.fileName = "";
  row.dataset.audioData = "";
  updateSoundEffectRowStatus(row);
  if (game.recipe) {
    game.recipe.soundEffectRules = readSoundEffectRules();
    renderPublishedDungeons();
  }
});

controls.soundPackMode?.addEventListener("change", () => {
  updateSoundPackControls();
  renderSoundEffectControls(readSoundEffectRules());
  if (game.recipe) {
    game.recipe.soundPackMode = getSoundPackMode();
    game.recipe.soundEffectRules = readSoundEffectRules();
    renderPublishedDungeons();
  }
});

hideRecipeButton.addEventListener("click", () => {
  setRecipeCollapsed(true);
});

extendRecipeButton.addEventListener("click", () => {
  setRecipeExtended(!appShell.classList.contains("recipe-extended"));
});

showRecipeButton.addEventListener("click", () => {
  setRecipeCollapsed(false);
});

showGameButton.addEventListener("click", () => {
  setRecipeExtended(false);
});

[controls.inventoryLimit, controls.equippedCountsTowardLimit].forEach((control) => {
  control.addEventListener("input", () => {
    updateOutputs();
    renderStartingInventoryControls(readStartingInventory());
  });
});

controls.hungerEnabled.addEventListener("change", () => {
  updateHungerControls();
  updateLevelingControls();
  if (game.recipe) {
    game.recipe.hungerEnabled = controls.hungerEnabled.checked;
    game.recipe.hungerDrainRate = numberValue("hungerDrainRate");
    game.recipe.passiveHealBlockRules = readPassiveHealBlockRules();
    game.recipe.leveling = readLevelingSettings();
    render();
  }
});

controls.hungerDrainRate.addEventListener("input", () => {
  updateOutputs();
  if (game.recipe) {
    game.recipe.hungerDrainRate = numberValue("hungerDrainRate");
  }
});

controls.clearBuffsOnFloorChange.addEventListener("change", () => {
  if (game.recipe) {
    game.recipe.clearBuffsOnFloorChange = controls.clearBuffsOnFloorChange.checked;
    render();
  }
});

controls.unidentifiedEnabled.addEventListener("change", () => {
  updateUnidentifiedControls();
  if (game.recipe) {
    game.recipe.unidentifiedItemsEnabled = controls.unidentifiedEnabled.checked;
    game.recipe.deductionMode = controls.deductionMode.checked;
    refreshLiveItemKnowledge();
    render();
  }
});

controls.deductionMode.addEventListener("change", () => {
  if (game.recipe) {
    game.recipe.deductionMode = controls.deductionMode.checked;
    refreshLiveItemKnowledge();
    render();
  }
});

[controls.hungerNoHealItemAction, controls.hungerNoHealAttackDamage, controls.hungerNoHealPickupExchange].forEach((control) => {
  control.addEventListener("change", () => {
    if (game.recipe) {
      game.recipe.passiveHealBlockRules = readPassiveHealBlockRules();
      render();
    }
  });
});

controls.weaponRarityEnabled.addEventListener("change", () => {
  refreshRarityEditorState();
  refreshStartingLoadoutControls();
  if (game.recipe) {
    game.recipe.weaponRarityEnabled = controls.weaponRarityEnabled.checked;
    game.recipe.rarityRules = readRarityRules();
    render();
  }
});

[controls.goalType, controls.goalCount, controls.goalNeedExit].forEach((control) => {
  control.addEventListener("change", () => {
    renderCustomGoalControls(readCustomGoal());
    if (game.recipe) {
      game.recipe.customGoal = readCustomGoal();
      game.goalSatisfied = false;
      render();
    }
  });
});

[
  controls.runLogShowNumbers,
  controls.runLogHighlightDamage,
  controls.runLogHighlightEnemies,
  controls.runLogShowItemIcons,
  controls.runLogShowTurnDividers,
].forEach((control) => {
  control.addEventListener("change", () => {
    if (game.recipe) {
      game.recipe.runLogSettings = readRunLogSettings();
      rerenderRunLogList();
      render();
    }
  });
});

controls.goalTarget.addEventListener("change", () => {
  if (game.recipe) {
    game.recipe.customGoal = readCustomGoal();
    game.goalSatisfied = false;
    render();
  }
});

trapAddButton.addEventListener("click", () => {
  addTrapRule();
  if (game.recipe) {
    game.recipe.trapPoolRules = readTrapPoolRules();
  }
});

sigilAddButton.addEventListener("click", () => {
  addSigilRule();
  if (game.recipe) {
    game.recipe.sigilPoolRules = readSigilPoolRules();
  }
});

controls.rarityAddButton.addEventListener("click", () => {
  addRarityRule();
  refreshStartingLoadoutControls();
  if (game.recipe) {
    game.recipe.rarityRules = readRarityRules();
    render();
  }
});

rarityList.addEventListener("click", (event) => {
  const button = event.target.closest('[data-action="remove_rarity"]');
  if (!button) {
    return;
  }
  button.closest(".rarity-card")?.remove();
  refreshRarityEditorState();
  refreshStartingLoadoutControls();
  if (game.recipe) {
    game.recipe.rarityRules = readRarityRules();
    render();
  }
});

rarityList.addEventListener("input", () => {
  refreshRarityEditorState();
  refreshStartingLoadoutControls();
  if (game.recipe) {
    game.recipe.rarityRules = readRarityRules();
    render();
  }
});

rarityList.addEventListener("change", () => {
  refreshRarityEditorState();
  refreshStartingLoadoutControls();
  if (game.recipe) {
    game.recipe.rarityRules = readRarityRules();
    render();
  }
});

runePoolList.addEventListener("input", () => {
  const itemRules = readItemPoolRules();
  updateRuneRowStates();
  if (game.recipe) {
    game.recipe.runePoolRules = readRunePoolRules();
    render();
  }
  renderItemPoolControls(itemRules);
});

runePoolList.addEventListener("change", () => {
  const itemRules = readItemPoolRules();
  renderRunePoolControls(readRunePoolRules());
  updateRuneRowStates();
  if (game.recipe) {
    game.recipe.runePoolRules = readRunePoolRules();
    render();
  }
  renderItemPoolControls(itemRules);
});

runeEnableAll?.addEventListener("change", () => {
  const itemRules = readItemPoolRules();
  setSectionEntriesEnabled(runePoolList, runeEnableAll.checked);
  renderRunePoolControls(readRunePoolRules());
  updateRuneRowStates();
  if (game.recipe) {
    game.recipe.runePoolRules = readRunePoolRules();
    render();
  }
  renderItemPoolControls(itemRules);
});

runePoolList.addEventListener("click", (event) => {
  const button = event.target.closest('[data-action="remove_rune"]');
  if (!button) {
    return;
  }
  const itemRules = readItemPoolRules();
  button.closest(".rune-row")?.remove();
  if (game.recipe) {
    game.recipe.runePoolRules = readRunePoolRules();
    render();
  }
  renderItemPoolControls(itemRules);
});

runeAddButton.addEventListener("click", () => {
  const itemRules = readItemPoolRules();
  addRuneRule();
  if (game.recipe) {
    game.recipe.runePoolRules = readRunePoolRules();
    render();
  }
  renderItemPoolControls(itemRules);
});

[
  controls.startLeftHand,
  controls.startLeftHandRarity,
  controls.startLeftHandCursed,
  controls.startRightHand,
  controls.startRightHandRarity,
  controls.startRightHandCursed,
  controls.startBracelet1,
  controls.startBracelet1Cursed,
  controls.startBracelet2,
  controls.startBracelet2Cursed,
].forEach((control) => {
  control.addEventListener("change", () => {
    refreshStartingLoadoutControls();
  });
});

startingInventoryList.addEventListener("change", (event) => {
  const select = event.target.closest("[data-starting-inventory-slot]");
  if (!select) {
    return;
  }
  const slot = select.closest(".starting-inventory-slot");
  const cursed = slot?.querySelector("[data-starting-inventory-cursed]");
  if (!cursed) {
    return;
  }
  const hasItem = Boolean(select.value);
  cursed.disabled = !hasItem;
  cursed.checked = hasItem ? cursed.checked : false;
});

document.querySelector("#generateButton").addEventListener("click", () => startRun());
endScreenReplayButton.addEventListener("click", () => {
  if (game.recipe) {
    startRun(game.recipe, game.activePublishedId ?? null);
  } else {
    startRun();
  }
});
endScreenSurpriseButton.addEventListener("click", () => {
  randomizeRecipe();
  startRun();
});
window.addEventListener("resize", () => {
  renderBossGlyphOverlay();
});
document.querySelector("#randomizeButton").addEventListener("click", randomizeRecipe);
publishButton.addEventListener("click", publishCurrentRecipe);
document.querySelector("#copyButton").addEventListener("click", async () => {
  if (!shareCode.value) {
    shareCode.value = encodeRecipe(readRecipe());
  }
  try {
    await navigator.clipboard.writeText(shareCode.value);
    log("Copied the dungeon share code.");
  } catch {
    shareCode.select();
    document.execCommand("copy");
    log("Selected the share code. Press Ctrl+C if your browser blocked auto-copy.");
  }
});

document.querySelector("#loadButton").addEventListener("click", () => {
  try {
    const recipe = decodeRecipe(shareCode.value);
    applyRecipe(recipe);
    startRun(recipe);
  } catch {
    log("That share code could not be loaded.");
  }
});

exportPackageButton?.addEventListener("click", () => {
  exportFullRecipePackage().catch(() => {
    log("That full package could not be exported.");
  });
});

importPackageButton?.addEventListener("click", () => {
  importPackageInput?.click();
});

importPackageInput?.addEventListener("change", async () => {
  const file = importPackageInput.files?.[0];
  if (!file) {
    return;
  }
  try {
    await importFullRecipePackage(file);
  } catch {
    log("That full package could not be imported.");
  } finally {
    importPackageInput.value = "";
  }
});

inventorySortButton.addEventListener("click", () => {
  if (!game.recipe || interactionsLocked()) {
    return;
  }
  sortInventoryByCategory();
});

publishedList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) {
    return;
  }

  const { action, id } = button.dataset;
  if (action === "play") {
    playPublishedDungeon(id);
  }
  if (action === "copy") {
    copyPublishedCode(id);
  }
  if (action === "delete") {
    deletePublishedDungeon(id);
  }
});

inventoryList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button || interactionsLocked()) {
    return;
  }

  const index = Number(button.dataset.index);
  if (button.dataset.action === "pin") {
    const entry = game.inventory[index];
    if (entry) {
      entry.pinned = !entry.pinned;
      render();
    }
    return;
  }
  if (button.dataset.action === "equip") {
    equipCarriedItem(index, button.dataset.slot || null);
  }
  if (button.dataset.action === "cast") {
    const entry = game.inventory[index];
    if (entry) {
      startStaffCast(entry);
    }
  }
  if (button.dataset.action === "use") {
    useInventoryItem(index);
  }
  if (button.dataset.action === "nibble") {
    const entry = game.inventory[index];
    if (entry) {
      nibbleWeaponEntry(entry);
    }
  }
  if (button.dataset.action === "drop") {
    dropInventoryItem(index);
  }
});

inventoryList.addEventListener("dragstart", (event) => {
  if (interactionsLocked()) {
    event.preventDefault();
    return;
  }
  if (event.target.closest("button")) {
    event.preventDefault();
    return;
  }
  const card = event.target.closest(".compact-item-card");
  if (!card) {
    event.preventDefault();
    return;
  }
  draggedInventoryIndex = Number(card.dataset.index);
  card.classList.add("dragging");
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", String(draggedInventoryIndex));
  }
});

inventoryList.addEventListener("dragover", (event) => {
  if (interactionsLocked()) {
    return;
  }
  const card = event.target.closest(".compact-item-card");
  if (!card) {
    return;
  }
  event.preventDefault();
  card.classList.add("drag-target");
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = "move";
  }
});

inventoryList.addEventListener("dragleave", (event) => {
  const card = event.target.closest(".compact-item-card");
  if (!card || card.contains(event.relatedTarget)) {
    return;
  }
  card.classList.remove("drag-target");
});

inventoryList.addEventListener("drop", (event) => {
  const card = event.target.closest(".compact-item-card");
  if (!card || interactionsLocked()) {
    return;
  }
  event.preventDefault();
  card.classList.remove("drag-target");
  const toIndex = Number(card.dataset.index);
  if (moveInventoryItem(draggedInventoryIndex, toIndex)) {
    render();
  }
});

inventoryList.addEventListener("dragend", () => {
  draggedInventoryIndex = null;
  inventoryList.querySelectorAll(".compact-item-card").forEach((card) => {
    card.classList.remove("dragging", "drag-target");
  });
});

floorItemList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button || interactionsLocked()) {
    return;
  }

  if (button.dataset.action === "use_floor") {
    useFloorItem();
  }
});

shopSellList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button || interactionsLocked()) {
    return;
  }
  if (button.dataset.action === "sell_pending") {
    confirmPendingShopSale();
  }
});

gamblingList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button || interactionsLocked()) {
    return;
  }
  if (button.dataset.action === "gamble_confirm") {
    confirmGamblingBet();
  }
});

upgradeChoiceList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button || interactionsLocked()) {
    return;
  }
  if (button.dataset.action === "cancel_upgrade_choice") {
    clearPendingUpgradeChoice();
    render();
    return;
  }
  if (button.dataset.action === "apply_upgrade_choice") {
    applyUpgradeChoiceTarget(Number(button.dataset.index));
  }
});

stringActionList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button || interactionsLocked()) {
    return;
  }
  const index = Number(button.dataset.index);
  if (button.dataset.action === "close_string_action") {
    clearPendingStringAction();
    render();
    return;
  }
  if (button.dataset.action === "string_store") {
    storeItemInPreservationString(index);
    return;
  }
  if (button.dataset.action === "string_take_out") {
    takeItemOutOfPreservationString(index);
    return;
  }
  if (button.dataset.action === "string_select_primary") {
    chooseSynthesisPrimary(index);
    return;
  }
  if (button.dataset.action === "string_fuse") {
    fuseWithSynthesisString(index);
    return;
  }
  if (button.dataset.action === "string_cash") {
    cashItemWithString(index);
  }
});

equipmentList.addEventListener("click", (event) => {
  const renameButton = event.target.closest('button[data-action="rename_equipped"]');
  if (renameButton && !interactionsLocked()) {
    beginEquipmentNameEdit(renameButton.dataset.slot);
    return;
  }
  const button = event.target.closest("button[data-action]");
  if (!button || interactionsLocked()) {
    return;
  }

  if (button.dataset.action === "unequip") {
    unequipItem(button.dataset.slot);
  }
  if (button.dataset.action === "nibble_equipped") {
    const entry = game.equipment[button.dataset.slot];
    if (entry) {
      nibbleWeaponEntry(entry);
    }
  }
});

equipmentList.addEventListener("keydown", (event) => {
  const input = event.target.closest(".equipment-name-input");
  if (!input) {
    return;
  }
  if (event.key === "Enter") {
    event.preventDefault();
    commitEquipmentNameEdit(input.dataset.slot, input.value);
    return;
  }
  if (event.key === "Escape") {
    event.preventDefault();
    cancelEquipmentNameEdit();
  }
});

equipmentList.addEventListener("focusout", (event) => {
  const input = event.target.closest(".equipment-name-input");
  if (!input) {
    return;
  }
  window.setTimeout(() => {
    if (document.activeElement !== input) {
      commitEquipmentNameEdit(input.dataset.slot, input.value);
    }
  }, 0);
});

window.addEventListener("keydown", (event) => {
  const typingTarget = ["INPUT", "SELECT", "TEXTAREA"].includes(event.target.tagName);
  if (typingTarget) {
    return;
  }
  if (interactionsLocked()) {
    return;
  }

  if (game.pendingCast) {
    const castMoves = {
      ArrowUp: [0, -1],
      ArrowDown: [0, 1],
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
      w: [0, -1],
      s: [0, 1],
      a: [-1, 0],
      d: [1, 0],
    };
    if (event.key === "Escape") {
      event.preventDefault();
      game.pendingCast = null;
      render();
      return;
    }
    const castMove = castMoves[event.key];
    if (castMove) {
      event.preventDefault();
      castPendingStaff(castMove[0], castMove[1]);
    }
    return;
  }

  if (game.pendingSpecialAttack) {
    if (event.key === "Escape") {
      event.preventDefault();
      clearPendingSpecialAttack();
      render();
      return;
    }
    if (event.key === "q" || event.key === "Q") {
      event.preventDefault();
      void executePendingSpecialAttack();
      return;
    }
    event.preventDefault();
    return;
  }

  if (game.animatingProjectile || game.animatingMelee || game.processingTurn) {
    event.preventDefault();
    return;
  }

  if (event.key === "q" || event.key === "Q") {
    event.preventDefault();
    void previewOrUseSpecialAttack();
    return;
  }

  const consumables = {
    1: "bitterGrass",
    h: "bitterGrass",
    H: "bitterGrass",
    2: "mossGrass",
    3: "emberGrass",
  };
  if (consumables[event.key]) {
    event.preventDefault();
    useConsumable(consumables[event.key]);
    return;
  }

  const moves = {
    ArrowUp: [0, -1],
    ArrowDown: [0, 1],
    ArrowLeft: [-1, 0],
    ArrowRight: [1, 0],
    w: [0, -1],
    s: [0, 1],
    a: [-1, 0],
    d: [1, 0],
  };
  const move = moves[event.key];
  if (move) {
    event.preventDefault();
    void tryMove(move[0], move[1]);
  }
});

renderSpecialRoomControls();
renderRunePoolControls();
renderSpecialAttackControls();
renderItemPoolControls();
renderTrapPoolControls();
renderSigilPoolControls();
renderEnemyPoolControls();
renderEnemyTypeControls();
renderEnemyDropControls();
applyLevelingSettings({});
applyBossRoomSettings({});
if (controls.soundPackMode) {
  controls.soundPackMode.value = "default";
}
renderSoundEffectControls();
applyCustomEnvironmentLibrary([]);
renderEnvironmentStageControls([]);
updateHungerControls();
updateUnidentifiedControls();
refreshRarityEditorState();
setRecipeCollapsed(false);
randomizeRecipe();
renderPublishedDungeons();
void ensurePublishedDungeonsLoaded();
startRun();
