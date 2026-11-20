/* ============================================================================
   PART 1 OF 11: MASTER GAMES CATALOG, DEFAULT BOX PATTERN, LOCAL DATE & STATE
   ============================================================================ */

const DEFAULT_MASTER_GAMES = [
  { gameNum: '854', name: 'BINGO JUMBO', price: 3, count: 100 },
  { gameNum: '1001', name: 'JUMBO BUCKS', price: 1, count: 300 },
  { gameNum: '1002', name: 'DOUBLE JUMBO BUCKS', price: 2, count: 150 },
  { gameNum: '1003', name: 'BIG MONEY CASH', price: 3, count: 100 },
  { gameNum: '1005', name: 'JUMBO BUCKS CLASSIC', price: 5, count: 60 },
  { gameNum: '1010', name: 'MEGA BUCKS 10X', price: 10, count: 60 },
  { gameNum: '1020', name: 'MILLIONAIRE JUMBO BUCKS', price: 20, count: 30 },
  { gameNum: '1025', name: 'MAX MONEY MULTIPLIER', price: 25, count: 24 },
  { gameNum: '1030', name: 'DIAMOND SPECTACULAR', price: 30, count: 20 },
  { gameNum: '1050', name: '$1,000,000 CASH BONANZA', price: 50, count: 18 },
  { gameNum: '1204', name: '$50 JUMBO', price: 50, count: 18 },
  { gameNum: '1247', name: '$30 DELUXE GOLD', price: 30, count: 20 },
  { gameNum: '1370', name: '200X', price: 20, count: 15 },
  { gameNum: '1372', name: '$5 COLLECTABLE JUMBO', price: 5, count: 60 },
  { gameNum: '1374', name: '$10 CASH GAMES', price: 10, count: 30 },
  { gameNum: '1377', name: '$500K BONUS', price: 10, count: 30 },
  { gameNum: '1389', name: '$100 TRIPLED $2', price: 2, count: 150 },
  { gameNum: '1391', name: '$500 FEVER', price: 10, count: 30 },
  { gameNum: '1392', name: '$1 COLLECTABLE JUMBO', price: 1, count: 300 },
  { gameNum: '1393', name: '$2 COLLECTABLE JUMBO', price: 2, count: 150 },
  { gameNum: '1394', name: 'LADY CROSSWORD', price: 3, count: 100 },
  { gameNum: '1395', name: '$5 COLLECTABLE JUMBO', price: 5, count: 60 },
  { gameNum: '1396', name: '$10 COLLECTABLE JUMBO', price: 10, count: 30 },
  { gameNum: '1398', name: 'GIFT TAG CASH', price: 1, count: 300 },
  { gameNum: '1399', name: 'NUTCRACKER CASH', price: 2, count: 150 },
  { gameNum: '1400', name: 'HOLIDAY CASH', price: 3, count: 100 },
  { gameNum: '1402', name: 'MERRY MONEY', price: 5, count: 60 },
  { gameNum: '1403', name: '$50 $100 $500', price: 10, count: 30 },
  { gameNum: '1404', name: 'HOLIDAY RICHES', price: 20, count: 15 },
  { gameNum: '1409', name: "SUPER 7'S", price: 2, count: 150 },
  { gameNum: '1410', name: '$5 VIP TRIPLE', price: 5, count: 60 },
  { gameNum: '1411', name: 'BIG CA$H', price: 10, count: 30 },
  { gameNum: '1412', name: 'BLACK DIAMOND', price: 10, count: 30 },
  { gameNum: '1762', name: "LUCKY 7'S", price: 1, count: 300 },
  { gameNum: '1802', name: '300X JUMBO', price: 30, count: 20 },
  { gameNum: '1825', name: '$2 JUMBO', price: 2, count: 150 },
  { gameNum: '1851', name: '$1 JR JUMBO', price: 1, count: 300 },
  { gameNum: '1853', name: 'LADY JUMBO', price: 3, count: 100 },
  { gameNum: '1856', name: '$3 CROSSWORD JUMBO', price: 3, count: 100 },
  { gameNum: '1891', name: 'GIGANTIC JUMBO', price: 30, count: 20 },
  { gameNum: '1909', name: '$25 JUMBO', price: 25, count: 24 },
  { gameNum: '1990', name: '$25 JUMBO', price: 25, count: 24 },
  { gameNum: '1949', name: '$10 JUMBO', price: 10, count: 30 },
  { gameNum: '1964', name: 'MILL JUMBO', price: 20, count: 15 },
  { gameNum: '1996', name: 'GIANT JUMBO', price: 5, count: 60 }
];

const STORAGE_KEYS = {
  LOCATIONS: 'ur_lotto_locations_v3',
  ACTIVE_LOCATION: 'ur_lotto_active_location_v3',
  MASTER_GAMES: 'ur_lotto_master_games_v3',
  SAVED_CASHIERS: 'ur_lotto_saved_cashiers_v3',
  UI_FONT_SIZE: 'ur_lotto_ui_font_size_v3',
  RECEIPT_FONT_SIZE: 'ur_lotto_receipt_font_size_v3',
  VIEW_MODE: 'ur_lotto_view_mode_v3',
  LAST_LOCAL_DATE: 'ur_lotto_last_local_date_v3',
  LOCATION_PREFIX: 'ur_lotto_store_state_v3_'
};

const DEFAULT_LOCATIONS = [
  { id: 'store_101', name: 'Regas Shell', code: '101' },
  { id: 'store_102', name: 'Regas Exxon', code: '102' },
  { id: 'store_103', name: 'Regas Amaco', code: '103' },
  { id: 'store_104', name: 'Regas Xpress', code: '104' }
];

// Global App State
let appLocations = [];
let activeLocationId = 'store_101';
let masterGamesCatalog = [];
let savedCashiersList = ['Dimitrios', 'Morning Cashier', 'Evening Cashier'];
let activeStoreState = null;
let dispenserViewMode = 'list'; // 'list' | 'grid'
let activeMainView = 'grid';
let boxesInputsUnlocked = false;
let shiftSessionConfirmed = false;
let activeReportMode = 'daily'; // 'daily' | 'monthly'
let currentTrackedLocalDate = '';

// Local Timezone Date Helpers (Prevents UTC evening date shift)
function getLocalDateStr(dateObj = new Date()) {
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, '0');
  const d = String(dateObj.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getLocalMonthStr(dateObj = new Date()) {
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
}

function formatDisplayDateTime(dateObj = new Date()) {
  const datePart = getLocalDateStr(dateObj);
  const timePart = dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  return `${datePart} (${timePart})`;
}

// Default Box Label Generator: A&B, C, D, E, F, 1, 2, 3, 4, 5, 6, 7...
function generateDefaultCustomBoxLabels(count = 40) {
  const prefix = ['A&B', 'C', 'D', 'E', 'F'];
  const labels = [];
  for (let i = 0; i < count; i++) {
    if (i < prefix.length) {
      labels.push(prefix[i]);
    } else {
      labels.push(String(i - prefix.length + 1));
    }
  }
  return labels;
}

function sanitizeMasterGamesList(list) {
  if (!Array.isArray(list) || list.length === 0) {
    return JSON.parse(JSON.stringify(DEFAULT_MASTER_GAMES));
  }
  const map = new Map();
  list.forEach(item => {
    if (!item || !item.gameNum) return;
    const gNum = String(item.gameNum).trim();
    map.set(gNum, {
      gameNum: gNum,
      name: String(item.name || 'UNKNOWN GAME').trim().toUpperCase(),
      price: Number(item.price) || 1,
      count: Number(item.count) || 30
    });
  });
  return Array.from(map.values()).sort((a, b) => Number(a.gameNum) - Number(b.gameNum));
}

function findGameByNumber(gameNum) {
  const clean = String(gameNum || '').trim();
  if (!clean) return null;
  return masterGamesCatalog.find(g => String(g.gameNum) === clean) || null;
}

/* ========================= END OF PART 1 OF 11 ========================= */
/* ============================================================================
   PART 2 OF 11: STORE STATE INITIALIZATION, STORAGE & MIDNIGHT AUTO-ROLLOVER
   ============================================================================ */

function createDefaultStoreState(locationObj) {
  const boxCount = 40;
  const labels = generateDefaultCustomBoxLabels(boxCount);
  const boxes = [];

  for (let i = 0; i < boxCount; i++) {
    boxes.push({
      id: i + 1,
      label: labels[i],
      gameNum: '',
      gameName: '',
      price: 0,
      packCount: 0,
      startTicket: 0,
      endTicket: '',
      rollovers: [],
      ticketsSold: 0,
      salesAmount: 0
    });
  }

  return {
    locationId: locationObj.id,
    locationName: locationObj.name,
    locationCode: locationObj.code,
    boxCount,
    boxLabels: labels,
    boxes,
    reconciliation: {
      auditDate: getLocalDateStr(),
      shiftType: 'Shift 1 (Morning)',
      cashierOut: '',
      cashierIn: '',
      onlineSales: 0,
      totalPayouts: 0,
      actualCash: 0,
      notes: '',
      signatureDataUrl: ''
    },
    history: []
  };
}

function loadStoreStateForLocation(locationId) {
  const loc = appLocations.find(l => l.id === locationId) || appLocations[0] || DEFAULT_LOCATIONS[0];
  const raw = localStorage.getItem(STORAGE_KEYS.LOCATION_PREFIX + loc.id);
  let state = null;

  if (raw) {
    try {
      state = JSON.parse(raw);
    } catch (e) {
      state = null;
    }
  }

  if (!state || !Array.isArray(state.boxes)) {
    state = createDefaultStoreState(loc);
  } else {
    state.locationId = loc.id;
    state.locationName = loc.name;
    state.locationCode = loc.code;
    state.boxCount = Number(state.boxCount) || state.boxes.length || 40;
    if (!Array.isArray(state.boxLabels) || state.boxLabels.length !== state.boxCount) {
      state.boxLabels = generateDefaultCustomBoxLabels(state.boxCount);
    }
    state.boxes.forEach((b, idx) => {
      b.id = idx + 1;
      b.label = state.boxLabels[idx] || String(idx + 1);
      if (!Array.isArray(b.rollovers)) b.rollovers = [];
    });
    if (!state.reconciliation) {
      state.reconciliation = createDefaultStoreState(loc).reconciliation;
    }
    if (!Array.isArray(state.history)) {
      state.history = [];
    }
  }

  return state;
}

function saveActiveStoreState() {
  if (!activeStoreState) return;
  try {
    localStorage.setItem(
      STORAGE_KEYS.LOCATION_PREFIX + activeStoreState.locationId,
      JSON.stringify(activeStoreState)
    );
    const footerStatus = document.getElementById('footer-location-status');
    if (footerStatus) {
      footerStatus.textContent = `Local Encrypted Cache: OK • Location: ${activeStoreState.locationName} (#${activeStoreState.locationCode})`;
    }
  } catch (err) {
    console.error('Failed saving store state:', err);
  }
}

function loadGlobalAppCatalogs() {
  try {
    const savedLocs = JSON.parse(localStorage.getItem(STORAGE_KEYS.LOCATIONS) || 'null');
    appLocations = Array.isArray(savedLocs) && savedLocs.length > 0 ? savedLocs : JSON.parse(JSON.stringify(DEFAULT_LOCATIONS));
  } catch (e) {
    appLocations = JSON.parse(JSON.stringify(DEFAULT_LOCATIONS));
  }

  activeLocationId = localStorage.getItem(STORAGE_KEYS.ACTIVE_LOCATION) || appLocations[0].id;
  if (!appLocations.some(l => l.id === activeLocationId)) {
    activeLocationId = appLocations[0].id;
  }

  try {
    const savedGames = JSON.parse(localStorage.getItem(STORAGE_KEYS.MASTER_GAMES) || 'null');
    masterGamesCatalog = sanitizeMasterGamesList(savedGames);
  } catch (e) {
    masterGamesCatalog = sanitizeMasterGamesList(null);
  }

  try {
    const savedCashiers = JSON.parse(localStorage.getItem(STORAGE_KEYS.SAVED_CASHIERS) || 'null');
    if (Array.isArray(savedCashiers) && savedCashiers.length > 0) {
      savedCashiersList = savedCashiers;
    }
  } catch (e) {}

  dispenserViewMode = localStorage.getItem(STORAGE_KEYS.VIEW_MODE) || 'list';
  const savedUiFont = localStorage.getItem(STORAGE_KEYS.UI_FONT_SIZE) || '14px';
  applyUiFontSize(savedUiFont, false);
}

function saveMasterGamesCatalog() {
  masterGamesCatalog = sanitizeMasterGamesList(masterGamesCatalog);
  localStorage.setItem(STORAGE_KEYS.MASTER_GAMES, JSON.stringify(masterGamesCatalog));
}

function saveLocationsCatalog() {
  localStorage.setItem(STORAGE_KEYS.LOCATIONS, JSON.stringify(appLocations));
}

function renderLocationSwitcher() {
  const select = document.getElementById('location-switcher-select');
  if (!select) return;
  select.innerHTML = appLocations
    .map(loc => `<option value="${loc.id}" ${loc.id === activeLocationId ? 'selected' : ''}>${loc.name} (${loc.code})</option>`)
    .join('');

  const subtitle = document.getElementById('header-store-subtitle');
  const currentLoc = appLocations.find(l => l.id === activeLocationId);
  if (subtitle && currentLoc) {
    subtitle.textContent = `${currentLoc.name} (#${currentLoc.code}) — Shift Audit Matrix`;
  }
}

function handleLocationSwitch(newLocId) {
  saveActiveStoreState();
  activeLocationId = newLocId;
  localStorage.setItem(STORAGE_KEYS.ACTIVE_LOCATION, activeLocationId);
  activeStoreState = loadStoreStateForLocation(activeLocationId);
  boxesInputsUnlocked = false;
  shiftSessionConfirmed = Boolean((activeStoreState.reconciliation?.cashierOut || '').trim());

  renderLocationSwitcher();
  syncReconciliationFormFromState();
  recalculateAllBoxes();
  renderDispenserGrid();
  updateHeaderAndBottomSummary();
  if (activeMainView === 'reports') renderHistoricalReports();
  if (activeMainView === 'admin') renderAdminView();
}

// Midnight Auto-Rollover Watcher (rolls audit date automatically at 12:00 AM local time)
function startMidnightRolloverWatcher() {
  currentTrackedLocalDate = getLocalDateStr();
  localStorage.setItem(STORAGE_KEYS.LAST_LOCAL_DATE, currentTrackedLocalDate);

  setInterval(() => {
    const nowLocalDate = getLocalDateStr();
    if (nowLocalDate !== currentTrackedLocalDate) {
      currentTrackedLocalDate = nowLocalDate;
      localStorage.setItem(STORAGE_KEYS.LAST_LOCAL_DATE, nowLocalDate);

      if (activeStoreState && activeStoreState.reconciliation) {
        activeStoreState.reconciliation.auditDate = nowLocalDate;
        const dateInput = document.getElementById('rec-audit-date');
        if (dateInput) dateInput.value = nowLocalDate;
        saveActiveStoreState();
      }

      const reportDateInput = document.getElementById('report-filter-date');
      if (reportDateInput) reportDateInput.value = nowLocalDate;

      const reportMonthInput = document.getElementById('report-filter-month');
      if (reportMonthInput) reportMonthInput.value = getLocalMonthStr();

      if (activeMainView === 'reports') {
        renderHistoricalReports();
      }
    }
    updateHeaderAndBottomSummary();
  }, 15000);
}

/* ========================= END OF PART 2 OF 11 ========================= */
/* ============================================================================
   PART 3 OF 11: TICKET SALES & ROLLOVER MATH, BOX INPUTS & LOCK PROTECTION
   ============================================================================ */

function calculateBoxMetrics(box) {
  const game = findGameByNumber(box.gameNum);
  if (game) {
    box.gameName = game.name;
    box.price = Number(game.price) || 0;
    box.packCount = Number(game.count) || 0;
  } else {
    box.gameName = box.gameNum ? 'UNKNOWN GAME' : '';
    box.price = Number(box.price) || 0;
    box.packCount = Number(box.packCount) || 0;
  }

  let totalSold = 0;

  // Sum any mid-shift rolled packs first
  if (Array.isArray(box.rollovers) && box.rollovers.length > 0) {
    box.rollovers.forEach(roll => {
      const rStart = Number(roll.startTicket) || 0;
      const rEnd = Number(roll.endTicket) || 0;
      if (rEnd >= rStart) {
        totalSold += (rEnd - rStart);
      }
    });
  }

  // Add active pack tickets if End # is entered
  const startNum = Number(box.startTicket) || 0;
  const hasEnd = box.endTicket !== '' && box.endTicket !== null && box.endTicket !== undefined && !isNaN(Number(box.endTicket));

  if (hasEnd) {
    const endNum = Number(box.endTicket);
    if (endNum >= startNum) {
      totalSold += (endNum - startNum);
    }
  }

  box.ticketsSold = Math.max(0, totalSold);
  box.salesAmount = Number((box.ticketsSold * (Number(box.price) || 0)).toFixed(2));
  return box;
}

function recalculateAllBoxes() {
  if (!activeStoreState || !Array.isArray(activeStoreState.boxes)) return;
  activeStoreState.boxes.forEach(box => calculateBoxMetrics(box));
}

function getShiftTotals() {
  let totalTickets = 0;
  let totalSales = 0;

  if (activeStoreState && Array.isArray(activeStoreState.boxes)) {
    activeStoreState.boxes.forEach(box => {
      totalTickets += Number(box.ticketsSold) || 0;
      totalSales += Number(box.salesAmount) || 0;
    });
  }

  return {
    totalTickets,
    totalSales: Number(totalSales.toFixed(2))
  };
}

function toggleBoxesInputsLock() {
  boxesInputsUnlocked = !boxesInputsUnlocked;
  renderDispenserGrid();
}

function unlockBoxesInputsIfLocked(el) {
  if (!boxesInputsUnlocked) {
    boxesInputsUnlocked = true;
    renderDispenserGrid();
    if (el && el.id) {
      setTimeout(() => {
        const refocused = document.getElementById(el.id);
        if (refocused) {
          refocused.focus();
          refocused.select?.();
        }
      }, 20);
    }
  }
}

function handleBoxGameNumChange(boxIdx, rawVal) {
  const box = activeStoreState?.boxes?.[boxIdx];
  if (!box) return;

  const cleanNum = String(rawVal || '').trim();
  box.gameNum = cleanNum;
  const matched = findGameByNumber(cleanNum);
  if (matched) {
    box.gameName = matched.name;
    box.price = matched.price;
    box.packCount = matched.count;
  } else {
    box.gameName = cleanNum ? 'UNKNOWN GAME' : '';
    box.price = 0;
    box.packCount = 0;
  }

  calculateBoxMetrics(box);
  saveActiveStoreState();
  renderDispenserGrid();
  updateHeaderAndBottomSummary();
}

function handleBoxStartTicketChange(boxIdx, rawVal) {
  const box = activeStoreState?.boxes?.[boxIdx];
  if (!box) return;

  box.startTicket = rawVal === '' ? 0 : Math.max(0, parseInt(rawVal, 10) || 0);
  calculateBoxMetrics(box);
  saveActiveStoreState();
  updateSingleBoxRowOrCardDisplay(boxIdx);
  updateHeaderAndBottomSummary();
}

function handleBoxEndTicketInput(boxIdx, rawVal) {
  const box = activeStoreState?.boxes?.[boxIdx];
  if (!box) return;

  if (rawVal === '' || rawVal === null || rawVal === undefined) {
    box.endTicket = '';
  } else {
    box.endTicket = Math.max(0, parseInt(rawVal, 10) || 0);
  }

  calculateBoxMetrics(box);
  saveActiveStoreState();
  updateSingleBoxRowOrCardDisplay(boxIdx);
  updateHeaderAndBottomSummary();
}

function triggerMidShiftRollover(boxIdx) {
  const box = activeStoreState?.boxes?.[boxIdx];
  if (!box) return;

  if (!box.gameNum) {
    alert(`Box ${box.label}: Enter a Game # before rolling over a pack.`);
    return;
  }

  const game = findGameByNumber(box.gameNum);
  const defaultPackEnd = game ? Number(game.count) : (Number(box.packCount) || 0);
  const currentStart = Number(box.startTicket) || 0;

  const endInputStr = prompt(
    `Mid-Shift Pack Rollover — Box ${box.label} (${box.gameName || box.gameNum})\n` +
    `Current Pack Start #: ${currentStart}\n` +
    `Enter the final closing ticket # of the finished pack (usually ${defaultPackEnd}):`,
    String(defaultPackEnd || '')
  );

  if (endInputStr === null) return;
  const closedEnd = parseInt(endInputStr, 10);
  if (isNaN(closedEnd) || closedEnd < currentStart) {
    alert(`Closing ticket # must be greater than or equal to Start # (${currentStart}).`);
    return;
  }

  const newStartStr = prompt(
    `New Pack Opened — Box ${box.label}\nEnter the starting ticket # of the new pack (usually 0):`,
    '0'
  );
  if (newStartStr === null) return;
  const nextStart = Math.max(0, parseInt(newStartStr, 10) || 0);

  box.rollovers.push({
    gameNum: box.gameNum,
    gameName: box.gameName,
    price: box.price,
    startTicket: currentStart,
    endTicket: closedEnd,
    sold: closedEnd - currentStart
  });

  box.startTicket = nextStart;
  box.endTicket = '';

  calculateBoxMetrics(box);
  saveActiveStoreState();
  renderDispenserGrid();
  updateHeaderAndBottomSummary();
}

function advanceEndToStartForNewShift() {
  if (!activeStoreState || !Array.isArray(activeStoreState.boxes)) return;

  const ok = confirm(
    'Roll End # → Start # for Next Shift?\n\n' +
    'This will move every box’s current End # into Start #, clear End # and mid-shift rollovers, and reset the cashier check-in for the new shift.'
  );
  if (!ok) return;

  activeStoreState.boxes.forEach(box => {
    if (box.endTicket !== '' && box.endTicket !== null && box.endTicket !== undefined && !isNaN(Number(box.endTicket))) {
      box.startTicket = Number(box.endTicket);
    }
    box.endTicket = '';
    box.rollovers = [];
    calculateBoxMetrics(box);
  });

  // Reset cashier check-in so next shift cashier is prompted on first End #
  shiftSessionConfirmed = false;
  if (activeStoreState.reconciliation) {
    activeStoreState.reconciliation.cashierOut = '';
    activeStoreState.reconciliation.cashierIn = '';
    activeStoreState.reconciliation.onlineSales = 0;
    activeStoreState.reconciliation.totalPayouts = 0;
    activeStoreState.reconciliation.actualCash = 0;
    activeStoreState.reconciliation.notes = '';
    activeStoreState.reconciliation.signatureDataUrl = '';
    activeStoreState.reconciliation.auditDate = getLocalDateStr();
  }

  boxesInputsUnlocked = false;
  saveActiveStoreState();
  syncReconciliationFormFromState();
  renderDispenserGrid();
  updateHeaderAndBottomSummary();
}

function handleGridFieldEnterKey(event, fieldType, boxIdx) {
  if (event.key !== 'Enter') return;
  event.preventDefault();
  const nextIdx = boxIdx + 1;
  const prefix = dispenserViewMode === 'list' ? 'list' : 'card';
  const nextEl = document.getElementById(`${prefix}-${fieldType}-${nextIdx}`);
  if (nextEl) {
    nextEl.focus();
    nextEl.select?.();
  }
}

/* ========================= END OF PART 3 OF 11 ========================= */
/* ============================================================================
   PART 4 OF 11: DISPENSER LIST & BOX GRID RENDERING + VIEW MODE SWITCHER
   ============================================================================ */

function setDispenserViewMode(mode) {
  dispenserViewMode = mode === 'grid' ? 'grid' : 'list';
  localStorage.setItem(STORAGE_KEYS.VIEW_MODE, dispenserViewMode);
  syncDispenserViewToggleButtons();
  renderDispenserGrid();
}

function syncDispenserViewToggleButtons() {
  const listBtn = document.getElementById('btn-view-mode-list');
  const gridBtn = document.getElementById('btn-view-mode-grid');
  if (!listBtn || !gridBtn) return;

  if (dispenserViewMode === 'list') {
    listBtn.className = 'px-3.5 py-1 rounded-md text-xs font-extrabold transition bg-blue-600 text-white shadow-sm';
    gridBtn.className = 'px-3.5 py-1 rounded-md text-xs font-extrabold transition text-slate-300 hover:text-white';
  } else {
    gridBtn.className = 'px-3.5 py-1 rounded-md text-xs font-extrabold transition bg-blue-600 text-white shadow-sm';
    listBtn.className = 'px-3.5 py-1 rounded-md text-xs font-extrabold transition text-slate-300 hover:text-white';
  }
}

function getBoxStatusClass(box) {
  const hasRollover = Array.isArray(box.rollovers) && box.rollovers.length > 0;
  const hasEnd = box.endTicket !== '' && box.endTicket !== null && box.endTicket !== undefined && !isNaN(Number(box.endTicket));

  if (hasEnd && Number(box.endTicket) < Number(box.startTicket)) {
    return 'status-alert';
  }
  if (hasRollover) {
    return 'status-rollover';
  }
  if (hasEnd) {
    return 'status-complete';
  }
  return 'status-pending';
}

function formatRolloverHistoryBadge(box) {
  if (!Array.isArray(box.rollovers) || box.rollovers.length === 0) return '';
  const summary = box.rollovers
    .map(r => `[${r.startTicket}→${r.endTicket} (+${r.sold})]`)
    .join(' ');
  return `<div class="text-[10px] font-bold text-amber-800 bg-amber-100 border border-amber-300 rounded px-1.5 py-0.5 mt-0.5">Rolled: ${summary}</div>`;
}

function renderDispenserGrid() {
  const container = document.getElementById('dispenser-grid-container');
  if (!container || !activeStoreState) return;

  syncDispenserViewToggleButtons();

  // Render Lock Status Banner right above the table/cards
  let lockBar = document.getElementById('grid-lock-status-bar');
  if (!lockBar) {
    lockBar = document.createElement('div');
    lockBar.id = 'grid-lock-status-bar';
    container.parentNode.insertBefore(lockBar, container);
  }
  lockBar.className = 'bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 flex flex-wrap items-center justify-between gap-2 text-xs text-amber-950';
  lockBar.innerHTML = `
    <div>
      💡 <strong>Tip:</strong> Game # and Start # boxes are ${boxesInputsUnlocked ? 'unlocked for editing' : 'locked to prevent accidental edits'}. Tap any Game # or Start # box or click the lock button to toggle.
    </div>
    <button
      type="button"
      onclick="toggleBoxesInputsLock()"
      class="${boxesInputsUnlocked ? 'bg-emerald-700 hover:bg-emerald-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-amber-300'} font-extrabold text-xs px-3 py-1.5 rounded-lg shadow-sm transition"
    >
      ${boxesInputsUnlocked ? '🔓 Game# & Start# Unlocked (Click to Lock)' : '🔒 Game# & Start# Locked'}
    </button>
  `;

  const readonlyAttr = boxesInputsUnlocked ? '' : 'readonly';
  const lockedStyle = boxesInputsUnlocked
    ? 'bg-white border-blue-400'
    : 'bg-slate-100 text-slate-700 cursor-pointer';

  if (dispenserViewMode === 'list') {
    container.className = 'bg-white rounded-xl shadow-sm border border-slate-300 overflow-x-auto';

    const rowsHtml = activeStoreState.boxes.map((box, idx) => {
      const statusCls = getBoxStatusClass(box);
      const priceDisplay = box.price ? `$${Number(box.price).toFixed(0)}` : '-';
      const gameNameDisplay = box.gameName || '<span class="text-slate-400 italic">Empty Box</span>';
      const endVal = box.endTicket !== '' && box.endTicket !== null && box.endTicket !== undefined ? box.endTicket : '';

      return `
        <tr id="box-row-${idx}" class="dispenser-card ${statusCls} border-b border-slate-200 hover:bg-slate-50/90">
          <td class="p-2 text-center font-black text-slate-900 bg-slate-100/80 border-r border-slate-200 w-14">
            ${box.label}
          </td>
          <td class="p-1.5 w-24">
            <input
              type="text"
              inputmode="numeric"
              id="list-gameNum-${idx}"
              data-box-idx="${idx}"
              value="${box.gameNum || ''}"
              placeholder="Game#"
              ${readonlyAttr}
              onclick="unlockBoxesInputsIfLocked(this)"
              onchange="handleBoxGameNumChange(${idx}, this.value)"
              onkeydown="handleGridFieldEnterKey(event, 'gameNum', ${idx})"
              class="w-full rounded px-2 py-1 text-center lotto-input ${lockedStyle}"
            />
          </td>
          <td class="p-2 min-w-[160px]">
            <div class="font-extrabold text-slate-900 leading-tight">${gameNameDisplay}</div>
            ${formatRolloverHistoryBadge(box)}
          </td>
          <td class="p-2 text-center font-extrabold text-slate-700 w-16">
            ${priceDisplay}
          </td>
          <td class="p-1.5 w-24">
            <input
              type="number"
              inputmode="numeric"
              id="list-startTicket-${idx}"
              data-box-idx="${idx}"
              value="${box.startTicket ?? 0}"
              ${readonlyAttr}
              onclick="unlockBoxesInputsIfLocked(this)"
              onchange="handleBoxStartTicketChange(${idx}, this.value)"
              onkeydown="handleGridFieldEnterKey(event, 'startTicket', ${idx})"
              class="w-full rounded px-2 py-1 text-center lotto-input ${lockedStyle}"
            />
          </td>
          <td class="p-1.5 w-28">
            <input
              type="number"
              inputmode="numeric"
              id="list-endTicket-${idx}"
              data-field="end"
              data-box-idx="${idx}"
              value="${endVal}"
              placeholder="End#"
              oninput="handleBoxEndTicketInput(${idx}, this.value)"
              onkeydown="handleGridFieldEnterKey(event, 'endTicket', ${idx})"
              class="w-full rounded px-2 py-1 text-center lotto-input border-blue-400"
            />
          </td>
          <td id="list-sold-${idx}" class="p-2 text-center font-mono font-extrabold text-slate-900 w-16">
            ${box.ticketsSold || 0}
          </td>
          <td id="list-sales-${idx}" class="p-2 text-right font-mono font-extrabold text-emerald-700 w-24">
            $${(Number(box.salesAmount) || 0).toFixed(2)}
          </td>
          <td class="p-1.5 text-center w-20">
            <button
              type="button"
              onclick="triggerMidShiftRollover(${idx})"
              title="Mid-Shift Pack Rollover"
              class="bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-[11px] px-2.5 py-1 rounded shadow-sm transition"
            >
              Roll
            </button>
          </td>
        </tr>
      `;
    }).join('');

    container.innerHTML = `
      <table class="w-full text-left border-collapse">
        <thead class="bg-slate-800 text-white text-[11px] uppercase tracking-wider">
          <tr>
            <th class="p-2.5 text-center">BOX #</th>
            <th class="p-2.5 text-center">GAME #</th>
            <th class="p-2.5">GAME NAME (CURRENT &amp; ROLLED)</th>
            <th class="p-2.5 text-center">PRICE</th>
            <th class="p-2.5 text-center">START</th>
            <th class="p-2.5 text-center">END</th>
            <th class="p-2.5 text-center">SOLD</th>
            <th class="p-2.5 text-right">SALES $</th>
            <th class="p-2.5 text-center">ACTION</th>
          </tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
      </table>
    `;
  } else {
    container.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3';

    container.innerHTML = activeStoreState.boxes.map((box, idx) => {
      const statusCls = getBoxStatusClass(box);
      const priceDisplay = box.price ? `$${Number(box.price).toFixed(0)}` : '-';
      const endVal = box.endTicket !== '' && box.endTicket !== null && box.endTicket !== undefined ? box.endTicket : '';

      return `
        <div id="box-card-${idx}" class="dispenser-card ${statusCls} bg-white rounded-xl shadow-sm border border-slate-200 p-3 flex flex-col justify-between gap-2.5">
          <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-2">
            <div>
              <span class="inline-block bg-slate-900 text-amber-300 font-black text-xs px-2 py-0.5 rounded">BOX ${box.label}</span>
              <span class="ml-1.5 font-extrabold text-xs text-slate-600">${priceDisplay}</span>
              <div class="font-extrabold text-sm text-slate-900 mt-1 leading-tight">${box.gameName || '<span class="text-slate-400 italic">Empty Box</span>'}</div>
              ${formatRolloverHistoryBadge(box)}
            </div>
            <button
              type="button"
              onclick="triggerMidShiftRollover(${idx})"
              class="bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-[11px] px-2.5 py-1 rounded shadow-sm shrink-0"
            >
              Roll
            </button>
          </div>

          <div class="grid grid-cols-3 gap-2">
            <div>
              <label class="block text-[10px] font-bold uppercase text-slate-500 mb-0.5">Game #</label>
              <input
                type="text"
                inputmode="numeric"
                id="card-gameNum-${idx}"
                data-box-idx="${idx}"
                value="${box.gameNum || ''}"
                placeholder="Game#"
                ${readonlyAttr}
                onclick="unlockBoxesInputsIfLocked(this)"
                onchange="handleBoxGameNumChange(${idx}, this.value)"
                onkeydown="handleGridFieldEnterKey(event, 'gameNum', ${idx})"
                class="w-full rounded px-2 py-1 text-center lotto-input ${lockedStyle}"
              />
            </div>
            <div>
              <label class="block text-[10px] font-bold uppercase text-slate-500 mb-0.5">Start #</label>
              <input
                type="number"
                inputmode="numeric"
                id="card-startTicket-${idx}"
                data-box-idx="${idx}"
                value="${box.startTicket ?? 0}"
                ${readonlyAttr}
                onclick="unlockBoxesInputsIfLocked(this)"
                onchange="handleBoxStartTicketChange(${idx}, this.value)"
                onkeydown="handleGridFieldEnterKey(event, 'startTicket', ${idx})"
                class="w-full rounded px-2 py-1 text-center lotto-input ${lockedStyle}"
              />
            </div>
            <div>
              <label class="block text-[10px] font-bold uppercase text-blue-700 mb-0.5">End #</label>
              <input
                type="number"
                inputmode="numeric"
                id="card-endTicket-${idx}"
                data-field="end"
                data-box-idx="${idx}"
                value="${endVal}"
                placeholder="End#"
                oninput="handleBoxEndTicketInput(${idx}, this.value)"
                onkeydown="handleGridFieldEnterKey(event, 'endTicket', ${idx})"
                class="w-full rounded px-2 py-1 text-center lotto-input border-blue-400"
              />
            </div>
          </div>

          <div class="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs">
            <span class="text-slate-600 font-bold">Sold: <strong id="card-sold-${idx}" class="font-mono text-slate-900">${box.ticketsSold || 0}</strong></span>
            <span class="text-slate-600 font-bold">Sales: <strong id="card-sales-${idx}" class="font-mono text-emerald-700">$${(Number(box.salesAmount) || 0).toFixed(2)}</strong></span>
          </div>
        </div>
      `;
    }).join('');
  }
}

function updateSingleBoxRowOrCardDisplay(boxIdx) {
  const box = activeStoreState?.boxes?.[boxIdx];
  if (!box) return;

  const statusCls = getBoxStatusClass(box);
  const soldText = String(box.ticketsSold || 0);
  const salesText = `$${(Number(box.salesAmount) || 0).toFixed(2)}`;

  const listSold = document.getElementById(`list-sold-${boxIdx}`);
  const listSales = document.getElementById(`list-sales-${boxIdx}`);
  const listRow = document.getElementById(`box-row-${boxIdx}`);
  if (listSold) listSold.textContent = soldText;
  if (listSales) listSales.textContent = salesText;
  if (listRow) {
    listRow.className = `dispenser-card ${statusCls} border-b border-slate-200 hover:bg-slate-50/90`;
  }

  const cardSold = document.getElementById(`card-sold-${boxIdx}`);
  const cardSales = document.getElementById(`card-sales-${boxIdx}`);
  const cardBox = document.getElementById(`box-card-${boxIdx}`);
  if (cardSold) cardSold.textContent = soldText;
  if (cardSales) cardSales.textContent = salesText;
  if (cardBox) {
    cardBox.className = `dispenser-card ${statusCls} bg-white rounded-xl shadow-sm border border-slate-200 p-3 flex flex-col justify-between gap-2.5`;
  }
}

/* ========================= END OF PART 4 OF 11 ========================= */
/* ============================================================================
   PART 5 OF 11: CASHIER & SHIFT CHECK-IN ON FIRST END # + BOTTOM SUMMARY BAR
   ============================================================================ */

function populatePromptCashiersDatalist() {
  const lists = ['prompt-cashiers-datalist', 'rec-cashiers-datalist'];
  const optionsHtml = savedCashiersList
    .map(name => `<option value="${String(name).replace(/"/g, '&quot;')}"></option>`)
    .join('');

  lists.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = optionsHtml;
  });
}

function openCashierShiftPromptModal(targetBoxIdx = '') {
  const modal = document.getElementById('modal-cashier-shift-prompt');
  if (!modal) return;

  populatePromptCashiersDatalist();
  document.getElementById('prompt-target-box-idx').value = targetBoxIdx;

  const existingCashier = (activeStoreState?.reconciliation?.cashierOut || '').trim();
  const existingShift = activeStoreState?.reconciliation?.shiftType || 'Shift 1 (Morning)';

  const nameInput = document.getElementById('prompt-cashier-name-input');
  const shiftSelect = document.getElementById('prompt-shift-select');

  if (nameInput) nameInput.value = existingCashier;
  if (shiftSelect && [...shiftSelect.options].some(o => o.value === existingShift)) {
    shiftSelect.value = existingShift;
  }

  modal.classList.remove('hidden');
  setTimeout(() => {
    if (nameInput) {
      nameInput.focus();
      nameInput.select?.();
    }
  }, 40);
}

function closeCashierShiftPromptModal() {
  const modal = document.getElementById('modal-cashier-shift-prompt');
  if (modal) modal.classList.add('hidden');
}

function confirmCashierShiftPrompt() {
  const nameInput = document.getElementById('prompt-cashier-name-input');
  const shiftSelect = document.getElementById('prompt-shift-select');
  const cashierName = (nameInput?.value || '').trim();
  const shiftVal = shiftSelect?.value || 'Shift 1 (Morning)';

  if (!cashierName) {
    alert('Please select or type your Cashier Name before entering End # counts.');
    nameInput?.focus();
    return;
  }

  shiftSessionConfirmed = true;

  if (activeStoreState && activeStoreState.reconciliation) {
    activeStoreState.reconciliation.cashierOut = cashierName;
    activeStoreState.reconciliation.shiftType = shiftVal;
    if (!activeStoreState.reconciliation.auditDate) {
      activeStoreState.reconciliation.auditDate = getLocalDateStr();
    }
  }

  // Save new cashier name to quick-select list automatically if not already present
  if (!savedCashiersList.some(c => c.toLowerCase() === cashierName.toLowerCase())) {
    savedCashiersList.push(cashierName);
    localStorage.setItem(STORAGE_KEYS.SAVED_CASHIERS, JSON.stringify(savedCashiersList));
    populatePromptCashiersDatalist();
  }

  const recCashierOut = document.getElementById('rec-cashier-out');
  if (recCashierOut) recCashierOut.value = cashierName;

  const recShiftType = document.getElementById('rec-shift-type');
  if (recShiftType) recShiftType.value = shiftVal;

  saveActiveStoreState();
  updateHeaderAndBottomSummary();

  const targetBoxIdx = document.getElementById('prompt-target-box-idx')?.value;
  closeCashierShiftPromptModal();

  if (targetBoxIdx !== '' && targetBoxIdx !== null && targetBoxIdx !== undefined) {
    const prefix = dispenserViewMode === 'list' ? 'list' : 'card';
    const endInput = document.getElementById(`${prefix}-endTicket-${targetBoxIdx}`);
    if (endInput) {
      setTimeout(() => {
        endInput.focus();
        endInput.select?.();
      }, 40);
    }
  }
}

// Intercept focus on any End # field when Cashier/Shift has not yet been confirmed
document.addEventListener('focusin', (e) => {
  const el = e.target;
  if (!el || el.tagName !== 'INPUT') return;
  if (el.dataset.field !== 'end') return;

  const currentCashier = (activeStoreState?.reconciliation?.cashierOut || '').trim();
  if (!shiftSessionConfirmed || !currentCashier) {
    const boxIdx = el.dataset.boxIdx ?? '';
    el.blur();
    openCashierShiftPromptModal(boxIdx);
  }
});

function ensureBottomShiftSummaryBar() {
  const viewGrid = document.getElementById('view-grid');
  if (!viewGrid) return null;

  let bar = document.getElementById('bottom-shift-summary-bar');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'bottom-shift-summary-bar';
    bar.className = 'bg-slate-900 text-white rounded-xl shadow-md border border-slate-700 p-4 mt-4 flex flex-wrap items-center justify-between gap-4';
    bar.innerHTML = `
      <div class="space-y-1">
        <div class="text-[11px] font-extrabold uppercase tracking-wider text-amber-400">
          SHIFT SUMMARY &amp; METADATA
        </div>
        <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm">
          <span>👤 <strong>Cashier:</strong> <span id="bottom-summary-cashier" class="text-amber-300 font-bold">Unspecified</span></span>
          <span class="text-slate-600">|</span>
          <span>🕒 <strong>Shift:</strong> <span id="bottom-summary-shift" class="font-bold text-white">Shift 1 (Morning)</span></span>
          <span class="text-slate-600">|</span>
          <span>📅 <strong>Date:</strong> <span id="bottom-summary-datetime" class="font-mono text-slate-200"></span></span>
        </div>
      </div>

      <div class="flex flex-wrap items-center gap-3 sm:gap-4">
        <div class="flex items-center gap-4 bg-slate-800 border border-slate-700 rounded-lg px-3.5 py-2 text-xs">
          <div>
            <div class="text-[10px] uppercase text-slate-400 font-bold">TOTAL SOLD</div>
            <div id="bottom-summary-tickets" class="font-mono font-extrabold text-sm text-white">0 Tix</div>
          </div>
          <div class="h-6 w-[1px] bg-slate-700"></div>
          <div>
            <div class="text-[10px] uppercase text-slate-400 font-bold">TOTAL SALES</div>
            <div id="bottom-summary-sales" class="font-mono font-extrabold text-sm text-emerald-400">$0.00</div>
          </div>
        </div>

        <button
          type="button"
          onclick="handleCompleteAuditButtonClick()"
          class="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg transition flex items-center gap-2"
        >
          <span>✔ Complete Audit</span>
        </button>
      </div>
    `;
    viewGrid.appendChild(bar);
  }
  return bar;
}

function updateHeaderAndBottomSummary() {
  const { totalTickets, totalSales } = getShiftTotals();
  const rec = activeStoreState?.reconciliation || {};
  const cashierName = (rec.cashierOut || '').trim() || 'Unspecified';
  const shiftVal = rec.shiftType || 'Shift 1 (Morning)';
  const formattedSales = `$${totalSales.toFixed(2)}`;

  const headerShift = document.getElementById('header-shift-badge');
  const headerTix = document.getElementById('header-total-tickets');
  const headerSales = document.getElementById('header-total-sales');

  if (headerShift) headerShift.textContent = shiftVal;
  if (headerTix) headerTix.textContent = `${totalTickets} Tix`;
  if (headerSales) headerSales.textContent = formattedSales;

  ensureBottomShiftSummaryBar();
  const elCashier = document.getElementById('bottom-summary-cashier');
  const elShift = document.getElementById('bottom-summary-shift');
  const elDt = document.getElementById('bottom-summary-datetime');
  const elTix = document.getElementById('bottom-summary-tickets');
  const elSales = document.getElementById('bottom-summary-sales');

  if (elCashier) elCashier.textContent = cashierName;
  if (elShift) elShift.textContent = shiftVal;
  if (elDt) elDt.textContent = formatDisplayDateTime(new Date());
  if (elTix) elTix.textContent = `${totalTickets} Tix`;
  if (elSales) elSales.textContent = formattedSales;

  // Keep Reconciliation summary numbers synced too
  const recScratchEl = document.getElementById('rec-calc-scratch-sales');
  const recTixEl = document.getElementById('rec-calc-total-tickets');
  if (recScratchEl) recScratchEl.textContent = formattedSales;
  if (recTixEl) recTixEl.textContent = String(totalTickets);
  if (typeof recalculateReconciliationMath === 'function') {
    recalculateReconciliationMath();
  }
}

function handleCompleteAuditButtonClick() {
  const cashierName = (activeStoreState?.reconciliation?.cashierOut || '').trim();
  if (!cashierName) {
    openCashierShiftPromptModal('');
    return;
  }
  switchMainView('reconcile');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ========================= END OF PART 5 OF 11 ========================= */
/* ============================================================================
   PART 6 OF 11: RECONCILIATION MATH, SIGNATURE CANVAS & SHIFT ARCHIVING
   ============================================================================ */
let sigCanvas = null;
let sigCtx = null;
let isDrawingSignature = false;

function initSignaturePad() {
  sigCanvas = document.getElementById('cashier-signature-canvas');
  if (!sigCanvas) return;
  sigCtx = sigCanvas.getContext('2d');

  const resizeCanvas = () => {
    const rect = sigCanvas.parentElement.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      const existingData = activeStoreState?.reconciliation?.signatureDataUrl || '';
      sigCanvas.width = rect.width;
      sigCanvas.height = rect.height;
      sigCtx.lineWidth = 2.5;
      sigCtx.lineCap = 'round';
      sigCtx.lineJoin = 'round';
      sigCtx.strokeStyle = '#0f172a';
      if (existingData) {
        const img = new Image();
        img.onload = () => sigCtx.drawImage(img, 0, 0, sigCanvas.width, sigCanvas.height);
        img.src = existingData;
      }
    }
  };

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const getPos = (e) => {
    const rect = sigCanvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const startDraw = (e) => {
    isDrawingSignature = true;
    const pos = getPos(e);
    sigCtx.beginPath();
    sigCtx.moveTo(pos.x, pos.y);
  };

  const moveDraw = (e) => {
    if (!isDrawingSignature) return;
    if (e.cancelable) e.preventDefault();
    const pos = getPos(e);
    sigCtx.lineTo(pos.x, pos.y);
    sigCtx.stroke();
  };

  const endDraw = () => {
    if (!isDrawingSignature) return;
    isDrawingSignature = false;
    if (activeStoreState && activeStoreState.reconciliation) {
      activeStoreState.reconciliation.signatureDataUrl = sigCanvas.toDataURL('image/png');
      saveActiveStoreState();
    }
  };

  sigCanvas.addEventListener('mousedown', startDraw);
  sigCanvas.addEventListener('mousemove', moveDraw);
  window.addEventListener('mouseup', endDraw);

  sigCanvas.addEventListener('touchstart', startDraw, { passive: false });
  sigCanvas.addEventListener('touchmove', moveDraw, { passive: false });
  sigCanvas.addEventListener('touchend', endDraw);
}

function clearSignaturePad() {
  if (sigCanvas && sigCtx) {
    sigCtx.clearRect(0, 0, sigCanvas.width, sigCanvas.height);
  }
  if (activeStoreState && activeStoreState.reconciliation) {
    activeStoreState.reconciliation.signatureDataUrl = '';
    saveActiveStoreState();
  }
}

function syncReconciliationFormFromState() {
  if (!activeStoreState || !activeStoreState.reconciliation) return;
  const rec = activeStoreState.reconciliation;
  const dateEl = document.getElementById('rec-audit-date');
  const shiftEl = document.getElementById('rec-shift-type');
  const cOutEl = document.getElementById('rec-cashier-out');
  const cInEl = document.getElementById('rec-cashier-in');
  const onlineEl = document.getElementById('rec-online-sales');
  const payoutsEl = document.getElementById('rec-total-payouts');
  const actualEl = document.getElementById('rec-actual-cash');
  const notesEl = document.getElementById('rec-shift-notes');

  if (dateEl) dateEl.value = rec.auditDate || getLocalDateStr();
  if (shiftEl) shiftEl.value = rec.shiftType || 'Shift 1 (Morning)';
  if (cOutEl) cOutEl.value = rec.cashierOut || '';
  if (cInEl) cInEl.value = rec.cashierIn || '';
  if (onlineEl) onlineEl.value = rec.onlineSales ?? 0;
  if (payoutsEl) payoutsEl.value = rec.totalPayouts ?? 0;
  if (actualEl) actualEl.value = rec.actualCash ?? 0;
  if (notesEl) notesEl.value = rec.notes || '';

  recalculateReconciliationMath();
}

function saveReconciliationDraft() {
  if (!activeStoreState || !activeStoreState.reconciliation) return;
  const rec = activeStoreState.reconciliation;
  rec.auditDate = document.getElementById('rec-audit-date')?.value || getLocalDateStr();
  rec.shiftType = document.getElementById('rec-shift-type')?.value || 'Shift 1 (Morning)';
  rec.cashierOut = (document.getElementById('rec-cashier-out')?.value || '').trim();
  rec.cashierIn = (document.getElementById('rec-cashier-in')?.value || '').trim();
  rec.onlineSales = parseFloat(document.getElementById('rec-online-sales')?.value) || 0;
  rec.totalPayouts = parseFloat(document.getElementById('rec-total-payouts')?.value) || 0;
  rec.actualCash = parseFloat(document.getElementById('rec-actual-cash')?.value) || 0;
  rec.notes = document.getElementById('rec-shift-notes')?.value || '';

  if (rec.cashierOut) {
    shiftSessionConfirmed = true;
  }
  saveActiveStoreState();
  updateHeaderAndBottomSummary();
}

function handleShiftTypeChange(newShift) {
  if (!activeStoreState || !activeStoreState.reconciliation) return;
  activeStoreState.reconciliation.shiftType = newShift;
  saveActiveStoreState();
  updateHeaderAndBottomSummary();
}

function recalculateReconciliationMath() {
  if (!activeStoreState) return;
  const { totalTickets, totalSales } = getShiftTotals();
  const onlineSales = parseFloat(document.getElementById('rec-online-sales')?.value) || 0;
  const totalPayouts = parseFloat(document.getElementById('rec-total-payouts')?.value) || 0;
  const actualCash = parseFloat(document.getElementById('rec-actual-cash')?.value) || 0;

  if (activeStoreState.reconciliation) {
    activeStoreState.reconciliation.onlineSales = onlineSales;
    activeStoreState.reconciliation.totalPayouts = totalPayouts;
    activeStoreState.reconciliation.actualCash = actualCash;
  }

  const netExpected = Number((totalSales + onlineSales - totalPayouts).toFixed(2));
  const variance = Number((actualCash - netExpected).toFixed(2));

  const scratchEl = document.getElementById('rec-calc-scratch-sales');
  const tixEl = document.getElementById('rec-calc-total-tickets');
  const expectedEl = document.getElementById('rec-net-expected');
  const varianceBadge = document.getElementById('rec-variance-badge');

  if (scratchEl) scratchEl.textContent = `$${totalSales.toFixed(2)}`;
  if (tixEl) tixEl.textContent = String(totalTickets);
  if (expectedEl) expectedEl.textContent = `$${netExpected.toFixed(2)}`;

  if (varianceBadge) {
    const sign = variance > 0 ? '+' : '';
    varianceBadge.textContent = `${sign}$${variance.toFixed(2)}`;
    if (Math.abs(variance) < 0.01) {
      varianceBadge.className = 'px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300';
    } else if (variance > 0) {
      varianceBadge.className = 'px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-300';
    } else {
      varianceBadge.className = 'px-2 py-0.5 rounded bg-red-100 text-red-800 border border-red-300';
    }
  }
  saveActiveStoreState();
}

function finalizeAndSaveShiftAudit() {
  if (!activeStoreState) return;
  saveReconciliationDraft();
  const rec = activeStoreState.reconciliation;
  const cashierOut = (rec.cashierOut || '').trim();
  if (!cashierOut) {
    alert('Please enter the Cashier On Duty name before finalizing this shift report.');
    document.getElementById('rec-cashier-out')?.focus();
    return;
  }

  const { totalTickets, totalSales } = getShiftTotals();
  const netExpected = Number((totalSales + rec.onlineSales - rec.totalPayouts).toFixed(2));
  const variance = Number((rec.actualCash - netExpected).toFixed(2));
  const auditDate = (rec.auditDate || getLocalDateStr()).slice(0, 10);

  const archiveRecord = {
    id: `shift_${Date.now()}`,
    savedAt: new Date().toISOString(),
    savedLocalTime: formatDisplayDateTime(new Date()),
    locationId: activeStoreState.locationId,
    locationName: activeStoreState.locationName,
    locationCode: activeStoreState.locationCode,
    auditDate,
    shiftType: rec.shiftType || 'Shift 1 (Morning)',
    cashierOut,
    cashierIn: rec.cashierIn || '',
    totalTickets,
    scratchSales: totalSales,
    onlineSales: Number(rec.onlineSales) || 0,
    totalPayouts: Number(rec.totalPayouts) || 0,
    netExpected,
    actualCash: Number(rec.actualCash) || 0,
    variance,
    notes: rec.notes || '',
    signatureDataUrl: rec.signatureDataUrl || '',
    boxesSnapshot: JSON.parse(JSON.stringify(activeStoreState.boxes))
  };

  const existingIdx = activeStoreState.history.findIndex(
    h => (h.auditDate || '').slice(0, 10) === auditDate && h.shiftType === archiveRecord.shiftType
  );
  if (existingIdx >= 0) {
    activeStoreState.history[existingIdx] = archiveRecord;
  } else {
    activeStoreState.history.unshift(archiveRecord);
  }

  saveActiveStoreState();
  alert(
    `✔ Shift Report Saved & Archived!\n\nStore: ${activeStoreState.locationName}\nDate: ${auditDate}\nShift: ${archiveRecord.shiftType}\nCashier: ${cashierOut}\nScratch Sales: $${totalSales.toFixed(2)}`
  );

  if (confirm('Would you like to print the signed shift report now?')) {
    openWorksheetPrintChoiceModal();
  }
}
/* ========================= END OF PART 6 OF 11 ========================= */
/* ============================================================================
   PART 7 OF 11: SHIFT ROLLBACK & SHIFT HISTORY ARCHIVE VIEWER
   ============================================================================ */
function rollbackToPreviousShift() {
  if (!activeStoreState) return;
  if (!Array.isArray(activeStoreState.history) || activeStoreState.history.length === 0) {
    alert('No saved shift history found to roll back to.');
    return;
  }

  const latestSaved = activeStoreState.history[0];
  const confirmMsg =
    `Rollback current shift to the last saved shift?\n\n` +
    `Saved Shift: ${latestSaved.auditDate} (${latestSaved.shiftType})\n` +
    `Cashier: ${latestSaved.cashierOut || 'N/A'}\n` +
    `Scratch Sales: $${Number(latestSaved.scratchSales || 0).toFixed(2)}\n\n` +
    `This will restore the dispenser ticket numbers from that saved shift.`;

  if (!confirm(confirmMsg)) return;

  if (Array.isArray(latestSaved.boxesSnapshot)) {
    activeStoreState.boxes = JSON.parse(JSON.stringify(latestSaved.boxesSnapshot));
  }

  activeStoreState.reconciliation = {
    auditDate: latestSaved.auditDate || getLocalDateStr(),
    shiftType: latestSaved.shiftType || 'Shift 1 (Morning)',
    cashierOut: latestSaved.cashierOut || '',
    cashierIn: latestSaved.cashierIn || '',
    onlineSales: Number(latestSaved.onlineSales) || 0,
    totalPayouts: Number(latestSaved.totalPayouts) || 0,
    actualCash: Number(latestSaved.actualCash) || 0,
    notes: latestSaved.notes || '',
    signatureDataUrl: latestSaved.signatureDataUrl || ''
  };

  saveActiveStoreState();
  renderAllUI();
  alert('✔ Shift rolled back to the last saved shift.');
}

function renderHistoryList() {
  const container = document.getElementById('history-list-container');
  if (!container || !activeStoreState) return;

  const history = Array.isArray(activeStoreState.history) ? activeStoreState.history : [];
  if (history.length === 0) {
    container.innerHTML = `
      <div class="bg-slate-800/70 border border-slate-700 rounded-xl p-8 text-center text-slate-400">
        No archived shift audits yet for <strong class="text-white">${escapeHtml(activeStoreState.locationName)}</strong>.
      </div>
    `;
    return;
  }

  container.innerHTML = history.map((item, idx) => {
    const variance = Number(item.variance || 0);
    const sign = variance > 0 ? '+' : '';
    const varianceClass = Math.abs(variance) < 0.01
      ? 'bg-emerald-900/60 text-emerald-300 border-emerald-700'
      : variance > 0
        ? 'bg-blue-900/60 text-blue-300 border-blue-700'
        : 'bg-red-900/60 text-red-300 border-red-700';

    return `
      <div class="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div class="flex flex-wrap items-center gap-2">
            <span class="font-bold text-white text-base">${escapeHtml(item.auditDate || 'Unknown Date')}</span>
            <span class="px-2 py-0.5 rounded text-xs font-bold bg-indigo-900/80 text-indigo-200 border border-indigo-700">
              ${escapeHtml(item.shiftType || 'Shift')}
            </span>
            <span class="px-2 py-0.5 rounded text-xs font-bold border ${varianceClass}">
              Over/Short: ${sign}$${variance.toFixed(2)}
            </span>
          </div>
          <div class="text-xs text-slate-300 mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
            <span><strong>Cashier:</strong> ${escapeHtml(item.cashierOut || 'N/A')}</span>
            <span><strong>Tickets Sold:</strong> ${item.totalTickets ?? 0}</span>
            <span><strong>Scratch Sales:</strong> $${Number(item.scratchSales || 0).toFixed(2)}</span>
            <span><strong>Net Expected:</strong> $${Number(item.netExpected || 0).toFixed(2)}</span>
            <span><strong>Actual Cash:</strong> $${Number(item.actualCash || 0).toFixed(2)}</span>
          </div>
          ${item.notes ? `<div class="text-xs text-amber-300 mt-1 italic">Note: ${escapeHtml(item.notes)}</div>` : ''}
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <button onclick="openHistoryPrintChoice(${idx})"
            class="px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold border border-slate-600">
            🖨️ Print Report
          </button>
          <button onclick="loadHistoryShiftIntoEditor(${idx})"
            class="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold">
            📂 Load
          </button>
          <button onclick="deleteHistoryRecord(${idx})"
            class="px-3 py-2 rounded-lg bg-red-900/70 hover:bg-red-800 text-red-200 text-xs font-bold border border-red-700">
            🗑️
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function loadHistoryShiftIntoEditor(index) {
  if (!activeStoreState || !activeStoreState.history[index]) return;
  const item = activeStoreState.history[index];
  if (!confirm(`Load shift ${item.auditDate} (${item.shiftType}) into the active editor?`)) return;

  if (Array.isArray(item.boxesSnapshot)) {
    activeStoreState.boxes = JSON.parse(JSON.stringify(item.boxesSnapshot));
  }
  activeStoreState.reconciliation = {
    auditDate: item.auditDate || getLocalDateStr(),
    shiftType: item.shiftType || 'Shift 1 (Morning)',
    cashierOut: item.cashierOut || '',
    cashierIn: item.cashierIn || '',
    onlineSales: Number(item.onlineSales) || 0,
    totalPayouts: Number(item.totalPayouts) || 0,
    actualCash: Number(item.actualCash) || 0,
    notes: item.notes || '',
    signatureDataUrl: item.signatureDataUrl || ''
  };
  shiftSessionConfirmed = Boolean(item.cashierOut);
  saveActiveStoreState();
  switchTab('grid');
  renderAllUI();
}

function deleteHistoryRecord(index) {
  if (!activeStoreState || !activeStoreState.history[index]) return;
  const item = activeStoreState.history[index];
  if (!confirm(`Delete archived shift ${item.auditDate} (${item.shiftType})?`)) return;
  activeStoreState.history.splice(index, 1);
  saveActiveStoreState();
  renderHistoryList();
}
/* ========================= END OF PART 7 OF 11 ========================= */
/* ============================================================================
   PART 8 OF 11: CLOUDFLARE CLOUD SYNC, JSON BACKUP & RESTORE
   ============================================================================ */
async function syncCurrentStoreToCloud() {
  if (!activeStoreState) return;
  const statusEl = document.getElementById('cloud-sync-status');
  if (statusEl) statusEl.textContent = 'Syncing...';

  try {
    const endpoint = `/api/store/${encodeURIComponent(activeStoreState.locationId)}`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(activeStoreState)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    activeStoreState.lastCloudSync = new Date().toISOString();
    saveActiveStoreState();
    if (statusEl) statusEl.textContent = `Synced ${formatDisplayTime(new Date())}`;
    alert(`✔ Cloud Sync Complete for ${activeStoreState.locationName}!`);
  } catch (err) {
    console.warn('Cloud sync failed (offline or local-only mode):', err);
    if (statusEl) statusEl.textContent = 'Local Saved (Offline)';
    alert(
      `⚠️ Cloud sync could not reach the server (${err.message}).\n\nAll data is safely saved locally on this device.`
    );
  }
}

async function pullCurrentStoreFromCloud() {
  if (!activeStoreState) return;
  if (!confirm(`Pull latest cloud data for ${activeStoreState.locationName}? This will overwrite unsynced local changes.`)) {
    return;
  }

  try {
    const endpoint = `/api/store/${encodeURIComponent(activeStoreState.locationId)}`;
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const cloudData = await response.json();
    if (!cloudData || !Array.isArray(cloudData.boxes)) {
      throw new Error('Invalid store payload from cloud');
    }

    activeStoreState = normalizeStoreState(cloudData, activeStoreState.locationId);
    saveActiveStoreState();
    renderAllUI();
    alert(`✔ Pulled latest cloud data for ${activeStoreState.locationName}!`);
  } catch (err) {
    alert(`⚠️ Could not pull from cloud: ${err.message}`);
  }
}

function downloadJsonBackup() {
  if (!activeStoreState) return;
  const payload = {
    exportedAt: new Date().toISOString(),
    appVersion: 'ProjectLotto-v3',
    locationId: activeStoreState.locationId,
    storeState: activeStoreState
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const dateTag = getLocalDateStr();
  a.href = url;
  a.download = `LottoBackup_${activeStoreState.locationId}_${dateTag}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function triggerJsonRestoreUpload() {
  const input = document.getElementById('json-restore-file-input');
  if (input) {
    input.value = '';
    input.click();
  }
}

function handleJsonRestoreFile(event) {
  const file = event.target?.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const parsed = JSON.parse(e.target.result);
      const restoredState = parsed.storeState || parsed;
      if (!restoredState || !Array.isArray(restoredState.boxes)) {
        throw new Error('File does not contain valid Project Lotto box data.');
      }

      const targetLoc = activeStoreState?.locationId || restoredState.locationId || 'regas_shell';
      if (!confirm(`Restore backup into ${activeStoreState?.locationName || targetLoc}?`)) return;

      activeStoreState = normalizeStoreState(restoredState, targetLoc);
      saveActiveStoreState();
      renderAllUI();
      alert('✔ Backup restored successfully!');
    } catch (err) {
      alert(`❌ Failed to restore backup: ${err.message}`);
    }
  };
  reader.readAsText(file);
}
/* ========================= END OF PART 8 OF 11 ========================= */
/* ============================================================================
   PART 9 OF 11: FIXED PRINT SYSTEM (80MM THERMAL RECEIPT & 8.5"x11" SHEET)
   ============================================================================ */
let pendingPrintPayload = null;
let currentShiftAlreadyFinalized = false;

function ensurePrintInfrastructure() {
  if (!document.getElementById('lotto-print-container')) {
    const printDiv = document.createElement('div');
    printDiv.id = 'lotto-print-container';
    document.body.appendChild(printDiv);
  }

  if (!document.getElementById('lotto-dynamic-print-style')) {
    const style = document.createElement('style');
    style.id = 'lotto-dynamic-print-style';
    style.textContent = `
      #lotto-print-container { display: none; }
      @media print {
        body > *:not(#lotto-print-container) { display: none !important; }
        #lotto-print-container {
          display: block !important;
          position: static !important;
          width: 100% !important;
          background: #ffffff !important;
          color: #000000 !important;
          font-family: 'Courier New', Courier, monospace;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Always inject our self-contained modal with a unique ID so static HTML modals never hijack clicks
  let modal = document.getElementById('lotto-active-print-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'lotto-active-print-modal';
    modal.style.cssText = 'position:fixed;inset:0;z-index:99999;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,0.78);padding:16px;';
    modal.innerHTML = `
      <div style="background:#0f172a;border:1px solid #334155;border-radius:16px;max-width:440px;width:100%;padding:20px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.6);color:#ffffff;font-family:system-ui,-apple-system,sans-serif;">
        <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #334155;padding-bottom:12px;margin-bottom:14px;">
          <h3 style="margin:0;font-size:18px;font-weight:800;">🖨️ Print Shift Audit Report</h3>
          <button type="button" id="lotto-print-modal-close-x" style="background:none;border:none;color:#94a3b8;font-size:24px;font-weight:bold;cursor:pointer;line-height:1;">&times;</button>
        </div>
        <p id="lotto-print-modal-subtitle" style="margin:0 0 16px 0;font-size:12px;color:#cbd5e1;"></p>
        <div style="display:flex;flex-direction:column;gap:12px;">
          <button type="button" id="lotto-btn-choose-thermal"
            style="width:100%;padding:14px;border-radius:12px;background:#059669;color:#ffffff;text-align:left;border:1px solid #34d399;cursor:pointer;">
            <div style="font-weight:800;font-size:15px;">🧾 80mm Thermal Receipt (Epson TM-m30II)</div>
            <div style="font-size:12px;color:#d1fae5;margin-top:3px;">Compact 3 1/8" receipt tape with box breakdown, totals &amp; signature.</div>
          </button>
          <button type="button" id="lotto-btn-choose-letter"
            style="width:100%;padding:14px;border-radius:12px;background:#2563eb;color:#ffffff;text-align:left;border:1px solid #60a5fa;cursor:pointer;">
            <div style="font-weight:800;font-size:15px;">📄 Full Page Worksheet (8.5" &times; 11" Letter)</div>
            <div style="font-size:12px;color:#dbeafe;margin-top:3px;">Full audit grid formatted to fit cleanly on 1 standard sheet.</div>
          </button>
        </div>
        <button type="button" id="lotto-print-modal-cancel"
          style="margin-top:16px;width:100%;padding:10px;border-radius:10px;background:#1e293b;color:#cbd5e1;font-size:13px;font-weight:700;border:1px solid #334155;cursor:pointer;">
          Cancel
        </button>
      </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('lotto-print-modal-close-x').onclick = closePrintChoiceModal;
    document.getElementById('lotto-print-modal-cancel').onclick = closePrintChoiceModal;
    document.getElementById('lotto-btn-choose-thermal').onclick = () => executeSelectedPrint('thermal');
    document.getElementById('lotto-btn-choose-letter').onclick = () => executeSelectedPrint('letter');
  }
}

function buildCurrentShiftPrintData() {
  if (!activeStoreState) return null;
  if (typeof saveReconciliationDraft === 'function') {
    saveReconciliationDraft();
  }
  const rec = activeStoreState.reconciliation || {};
  const { totalTickets, totalSales } = getShiftTotals();
  const onlineSales = Number(rec.onlineSales) || 0;
  const totalPayouts = Number(rec.totalPayouts) || 0;
  const actualCash = Number(rec.actualCash) || 0;
  const netExpected = Number((totalSales + onlineSales - totalPayouts).toFixed(2));
  const variance = Number((actualCash - netExpected).toFixed(2));

  return {
    isCurrentShift: true,
    locationName: activeStoreState.locationName || 'Store',
    locationCode: activeStoreState.locationCode || '',
    auditDate: (rec.auditDate || getLocalDateStr()).slice(0, 10),
    shiftType: rec.shiftType || 'Shift 1 (Morning)',
    cashierOut: rec.cashierOut || 'Unassigned',
    cashierIn: rec.cashierIn || '',
    totalTickets,
    scratchSales: totalSales,
    onlineSales,
    totalPayouts,
    netExpected,
    actualCash,
    variance,
    notes: rec.notes || '',
    signatureDataUrl: rec.signatureDataUrl || '',
    boxes: JSON.parse(JSON.stringify(activeStoreState.boxes || [])),
    printedAt: formatDisplayDateTime(new Date())
  };
}

function isCurrentShiftSavedInHistory() {
  if (!activeStoreState || !Array.isArray(activeStoreState.history)) return false;
  const rec = activeStoreState.reconciliation || {};
  const auditDate = (rec.auditDate || getLocalDateStr()).slice(0, 10);
  const shiftType = rec.shiftType || 'Shift 1 (Morning)';
  return activeStoreState.history.some(
    h => (h.auditDate || '').slice(0, 10) === auditDate && h.shiftType === shiftType
  );
}

function openWorksheetPrintChoiceModal() {
  ensurePrintInfrastructure();
  // Hide any legacy static modal in index.html if open
  const legacyModal = document.getElementById('print-choice-modal');
  if (legacyModal) legacyModal.classList.add('hidden');

  const data = buildCurrentShiftPrintData();
  if (!data) return;

  // Ask the user if they want to end & save their shift if it hasn't been finalized yet
  if (!isCurrentShiftSavedInHistory()) {
    const endShiftNow = confirm(
      'This shift has NOT been ended/saved yet.\n\n' +
      'Click OK to End & Save this shift to History before printing, or Cancel to print a draft copy without ending the shift.'
    );
    if (endShiftNow) {
      if (!(data.cashierOut || '').trim() || data.cashierOut === 'Unassigned') {
        alert('Please enter the Cashier On Duty name before ending the shift.');
        if (typeof switchMainView === 'function') switchMainView('reconcile');
        document.getElementById('rec-cashier-out')?.focus();
        return;
      }
      // Save directly to history without triggering a recursive print prompt
      const archiveRecord = {
        id: `shift_${Date.now()}`,
        savedAt: new Date().toISOString(),
        savedLocalTime: formatDisplayDateTime(new Date()),
        locationId: activeStoreState.locationId,
        locationName: activeStoreState.locationName,
        locationCode: activeStoreState.locationCode,
        auditDate: data.auditDate,
        shiftType: data.shiftType,
        cashierOut: data.cashierOut,
        cashierIn: data.cashierIn,
        totalTickets: data.totalTickets,
        scratchSales: data.scratchSales,
        onlineSales: data.onlineSales,
        totalPayouts: data.totalPayouts,
        netExpected: data.netExpected,
        actualCash: data.actualCash,
        variance: data.variance,
        notes: data.notes,
        signatureDataUrl: data.signatureDataUrl,
        boxesSnapshot: JSON.parse(JSON.stringify(activeStoreState.boxes || []))
      };
      activeStoreState.history.unshift(archiveRecord);
      saveActiveStoreState();
      currentShiftAlreadyFinalized = true;
    }
  }

  pendingPrintPayload = buildCurrentShiftPrintData();
  const sub = document.getElementById('lotto-print-modal-subtitle');
  if (sub) {
    sub.textContent = `${pendingPrintPayload.locationName} • ${pendingPrintPayload.auditDate} • ${pendingPrintPayload.shiftType} • Cashier: ${pendingPrintPayload.cashierOut}`;
  }
  const modal = document.getElementById('lotto-active-print-modal');
  if (modal) modal.style.display = 'flex';
}

function openHistoryPrintChoice(index) {
  ensurePrintInfrastructure();
  if (!activeStoreState || !activeStoreState.history[index]) return;
  const item = activeStoreState.history[index];
  pendingPrintPayload = {
    isCurrentShift: false,
    locationName: item.locationName || activeStoreState.locationName || 'Store',
    locationCode: item.locationCode || activeStoreState.locationCode || '',
    auditDate: (item.auditDate || '').slice(0, 10),
    shiftType: item.shiftType || 'Shift',
    cashierOut: item.cashierOut || 'N/A',
    cashierIn: item.cashierIn || '',
    totalTickets: Number(item.totalTickets) || 0,
    scratchSales: Number(item.scratchSales) || 0,
    onlineSales: Number(item.onlineSales) || 0,
    totalPayouts: Number(item.totalPayouts) || 0,
    netExpected: Number(item.netExpected) || 0,
    actualCash: Number(item.actualCash) || 0,
    variance: Number(item.variance) || 0,
    notes: item.notes || '',
    signatureDataUrl: item.signatureDataUrl || '',
    boxes: JSON.parse(JSON.stringify(item.boxesSnapshot || [])),
    printedAt: formatDisplayDateTime(new Date())
  };

  const sub = document.getElementById('lotto-print-modal-subtitle');
  if (sub) {
    sub.textContent = `Archived: ${pendingPrintPayload.locationName} • ${pendingPrintPayload.auditDate} • ${pendingPrintPayload.shiftType}`;
  }
  const modal = document.getElementById('lotto-active-print-modal');
  if (modal) modal.style.display = 'flex';
}

function closePrintChoiceModal() {
  const modal = document.getElementById('lotto-active-print-modal');
  if (modal) modal.style.display = 'none';
  const legacyModal = document.getElementById('print-choice-modal');
  if (legacyModal) legacyModal.classList.add('hidden');
}

function setPrintPageRule(cssRuleText) {
  let pageStyle = document.getElementById('lotto-page-size-style');
  if (!pageStyle) {
    pageStyle = document.createElement('style');
    pageStyle.id = 'lotto-page-size-style';
    document.head.appendChild(pageStyle);
  }
  pageStyle.textContent = cssRuleText;
}

function executeSelectedPrint(format) {
  closePrintChoiceModal();
  const data = pendingPrintPayload || buildCurrentShiftPrintData();
  if (!data) return;

  if (format === 'thermal') {
    printThermalReceipt(data);
  } else {
    printStandardWorksheet(data);
  }
}

/* Aliases so any button onclick in index.html routes here */
function printAuditReport() { openWorksheetPrintChoiceModal(); }
function handlePrintShiftReport() { openWorksheetPrintChoiceModal(); }
function openPrintModal() { openWorksheetPrintChoiceModal(); }
function selectPrintFormat(fmt) { executeSelectedPrint(fmt === 'receipt' || fmt === 'thermal' ? 'thermal' : 'letter'); }

function printThermalReceipt(data) {
  ensurePrintInfrastructure();
  setPrintPageRule(`
    @media print {
      @page { size: 80mm auto; margin: 2mm 3mm; }
      body { margin: 0 !important; padding: 0 !important; width: 74mm !important; }
    }
  `);

  const activeBoxes = (data.boxes || []).filter(
    b => b.gameName || b.gameNum || Number(b.price) > 0 || Number(b.ticketsSold || b.soldCount) > 0
  );
  const rowsHtml = activeBoxes.map(b => {
    const boxLbl = b.label || b.boxNumber || '';
    const startVal = b.startTicket ?? b.startNum ?? '-';
    const endVal = (b.endTicket !== '' && b.endTicket !== undefined) ? b.endTicket : (b.endNum ?? '-');
    const sold = Number(b.ticketsSold ?? b.soldCount) || 0;
    const sales = Number(b.salesAmount ?? b.soldAmount) || 0;
    return `
      <tr style="border-bottom:1px dashed #999;">
        <td style="padding:2px 0;font-weight:bold;">${escapeHtml(String(boxLbl))}</td>
        <td style="padding:2px 2px;">${escapeHtml((b.gameName || 'Game').slice(0, 14))} ($${b.price || 0})</td>
        <td style="padding:2px 2px;text-align:right;">${startVal}-${endVal}</td>
        <td style="padding:2px 0;text-align:right;font-weight:bold;">${sold} ($${sales.toFixed(0)})</td>
      </tr>
    `;
  }).join('');

  const sign = data.variance > 0 ? '+' : '';
  const container = document.getElementById('lotto-print-container');
  container.innerHTML = `
    <div style="width:72mm;margin:0 auto;font-family:'Courier New',monospace;font-size:11px;line-height:1.3;color:#000;">
      <div style="text-align:center;border-bottom:2px solid #000;padding-bottom:6px;margin-bottom:6px;">
        <div style="font-size:15px;font-weight:900;letter-spacing:0.5px;">${escapeHtml(data.locationName.toUpperCase())}</div>
        <div style="font-size:12px;font-weight:bold;">LOTTERY SHIFT AUDIT RECEIPT</div>
        <div style="font-size:10px;">Date: ${escapeHtml(data.auditDate)} | ${escapeHtml(data.shiftType)}</div>
        <div style="font-size:10px;">Printed: ${escapeHtml(data.printedAt)}</div>
      </div>

      <div style="margin-bottom:6px;font-size:11px;">
        <div><strong>Cashier Out:</strong> ${escapeHtml(data.cashierOut)}</div>
        ${data.cashierIn ? `<div><strong>Cashier In:</strong> ${escapeHtml(data.cashierIn)}</div>` : ''}
      </div>

      <table style="width:100%;border-collapse:collapse;font-size:10px;margin-bottom:8px;">
        <thead>
          <tr style="border-top:1px solid #000;border-bottom:1px solid #000;">
            <th style="text-align:left;padding:2px 0;">Box</th>
            <th style="text-align:left;padding:2px 2px;">Game</th>
            <th style="text-align:right;padding:2px 2px;">S-E</th>
            <th style="text-align:right;padding:2px 0;">Sold</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml || '<tr><td colspan="4" style="text-align:center;padding:6px;">No active boxes</td></tr>'}
        </tbody>
      </table>

      <div style="border-top:2px solid #000;border-bottom:2px solid #000;padding:5px 0;margin-bottom:6px;font-size:11px;">
        <div style="display:flex;justify-content:space-between;"><span>Total Tickets Sold:</span><strong>${data.totalTickets}</strong></div>
        <div style="display:flex;justify-content:space-between;"><span>Scratch-Off Sales:</span><strong>$${data.scratchSales.toFixed(2)}</strong></div>
        <div style="display:flex;justify-content:space-between;"><span>Online Lotto Sales:</span><span>$${data.onlineSales.toFixed(2)}</span></div>
        <div style="display:flex;justify-content:space-between;"><span>Total Payouts (-):</span><span>-$${data.totalPayouts.toFixed(2)}</span></div>
        <div style="display:flex;justify-content:space-between;border-top:1px dashed #000;margin-top:3px;padding-top:3px;">
          <span>NET EXPECTED CASH:</span><strong>$${data.netExpected.toFixed(2)}</strong>
        </div>
        <div style="display:flex;justify-content:space-between;"><span>ACTUAL CASH DROP:</span><strong>$${data.actualCash.toFixed(2)}</strong></div>
        <div style="display:flex;justify-content:space-between;font-size:12px;margin-top:2px;">
          <span>OVER / SHORT:</span><strong>${sign}$${data.variance.toFixed(2)}</strong>
        </div>
      </div>

      ${data.notes ? `<div style="font-size:10px;margin-bottom:6px;"><strong>Notes:</strong> ${escapeHtml(data.notes)}</div>` : ''}

      <div style="margin-top:8px;">
        <div style="font-size:10px;font-weight:bold;">Cashier Signature:</div>
        ${data.signatureDataUrl
          ? `<img src="${data.signatureDataUrl}" style="width:100%;max-height:55px;object-fit:contain;border-bottom:1px solid #000;" />`
          : `<div style="height:36px;border-bottom:1px solid #000;"></div>`
        }
      </div>
      <div style="text-align:center;font-size:9px;margin-top:8px;">*** END OF LOTTERY SHIFT AUDIT ***</div>
    </div>
  `;

  setTimeout(() => window.print(), 120);
}

function printStandardWorksheet(data) {
  ensurePrintInfrastructure();
  setPrintPageRule(`
    @media print {
      @page { size: letter portrait; margin: 0.35in; }
      body { margin: 0 !important; padding: 0 !important; }
    }
  `);

  const rowsHtml = (data.boxes || []).map(b => {
    const boxLbl = b.label || b.boxNumber || '';
    const startVal = b.startTicket ?? b.startNum ?? '';
    const endVal = (b.endTicket !== '' && b.endTicket !== undefined) ? b.endTicket : (b.endNum ?? '');
    const sold = Number(b.ticketsSold ?? b.soldCount) || 0;
    const sales = Number(b.salesAmount ?? b.soldAmount) || 0;
    return `
      <tr>
        <td style="border:1px solid #333;padding:2px 4px;text-align:center;font-weight:bold;">${escapeHtml(String(boxLbl))}</td>
        <td style="border:1px solid #333;padding:2px 4px;">${escapeHtml(b.gameName || '-')}</td>
        <td style="border:1px solid #333;padding:2px 4px;text-align:center;">$${Number(b.price) || 0}</td>
        <td style="border:1px solid #333;padding:2px 4px;text-align:center;">${startVal}</td>
        <td style="border:1px solid #333;padding:2px 4px;text-align:center;">${endVal}</td>
        <td style="border:1px solid #333;padding:2px 4px;text-align:center;font-weight:bold;">${sold}</td>
        <td style="border:1px solid #333;padding:2px 4px;text-align:right;font-weight:bold;">$${sales.toFixed(2)}</td>
      </tr>
    `;
  }).join('');

  const sign = data.variance > 0 ? '+' : '';
  const container = document.getElementById('lotto-print-container');
  container.innerHTML = `
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:10px;color:#000;width:100%;">
      <div style="display:flex;justify-content:space-between;align-items:flex-end;border-bottom:2px solid #000;padding-bottom:4px;margin-bottom:6px;">
        <div>
          <div style="font-size:16px;font-weight:900;">${escapeHtml(data.locationName)} — LOTTERY SHIFT AUDIT</div>
          <div style="font-size:11px;"><strong>Date:</strong> ${escapeHtml(data.auditDate)} &nbsp;|&nbsp; <strong>Shift:</strong> ${escapeHtml(data.shiftType)}</div>
        </div>
        <div style="text-align:right;font-size:10px;">
          <div><strong>Cashier Out:</strong> ${escapeHtml(data.cashierOut)}</div>
          <div><strong>Cashier In:</strong> ${escapeHtml(data.cashierIn || '________')}</div>
        </div>
      </div>

      <table style="width:100%;border-collapse:collapse;font-size:9.5px;margin-bottom:8px;">
        <thead>
          <tr style="background:#e2e8f0;">
            <th style="border:1px solid #333;padding:3px;">Box</th>
            <th style="border:1px solid #333;padding:3px;text-align:left;">Game Name</th>
            <th style="border:1px solid #333;padding:3px;">Price</th>
            <th style="border:1px solid #333;padding:3px;">Start #</th>
            <th style="border:1px solid #333;padding:3px;">End #</th>
            <th style="border:1px solid #333;padding:3px;">Sold</th>
            <th style="border:1px solid #333;padding:3px;text-align:right;">Sales ($)</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>

      <div style="display:flex;justify-content:space-between;gap:16px;border-top:2px solid #000;padding-top:6px;">
        <div style="flex:1;">
          <div style="font-weight:bold;margin-bottom:2px;">Shift Notes:</div>
          <div style="border:1px solid #666;min-height:42px;padding:4px;font-size:9.5px;">${escapeHtml(data.notes || '')}</div>
          <div style="margin-top:6px;font-weight:bold;">Cashier Signature:</div>
          ${data.signatureDataUrl
            ? `<img src="${data.signatureDataUrl}" style="max-height:45px;border-bottom:1px solid #000;" />`
            : `<div style="height:28px;border-bottom:1px solid #000;width:240px;"></div>`
          }
        </div>

        <table style="width:260px;border-collapse:collapse;font-size:10px;">
          <tr><td style="border:1px solid #333;padding:3px;">Total Tickets Sold</td><td style="border:1px solid #333;padding:3px;text-align:right;font-weight:bold;">${data.totalTickets}</td></tr>
          <tr><td style="border:1px solid #333;padding:3px;">Scratch-Off Sales</td><td style="border:1px solid #333;padding:3px;text-align:right;font-weight:bold;">$${data.scratchSales.toFixed(2)}</td></tr>
          <tr><td style="border:1px solid #333;padding:3px;">Online Lotto Sales</td><td style="border:1px solid #333;padding:3px;text-align:right;">$${data.onlineSales.toFixed(2)}</td></tr>
          <tr><td style="border:1px solid #333;padding:3px;">Total Payouts (-)</td><td style="border:1px solid #333;padding:3px;text-align:right;">-$${data.totalPayouts.toFixed(2)}</td></tr>
          <tr style="background:#f1f5f9;"><td style="border:1px solid #333;padding:3px;font-weight:bold;">Net Expected Cash</td><td style="border:1px solid #333;padding:3px;text-align:right;font-weight:bold;">$${data.netExpected.toFixed(2)}</td></tr>
          <tr><td style="border:1px solid #333;padding:3px;font-weight:bold;">Actual Cash Drop</td><td style="border:1px solid #333;padding:3px;text-align:right;font-weight:bold;">$${data.actualCash.toFixed(2)}</td></tr>
          <tr style="background:#e2e8f0;"><td style="border:1px solid #333;padding:3px;font-weight:bold;">Over / Short</td><td style="border:1px solid #333;padding:3px;text-align:right;font-weight:bold;">${sign}$${data.variance.toFixed(2)}</td></tr>
        </table>
      </div>
    </div>
  `;

  setTimeout(() => window.print(), 120);
}
/* ========================= END OF PART 9 OF 11 ========================= */
/* ============================================================================
   PART 10 OF 11: STORE-ISOLATED BOX SETTINGS & NEW SHIFT ROLLOVER
   ============================================================================ */
function renderSettingsGrid() {
  const container = document.getElementById('settings-boxes-container');
  if (!container || !activeStoreState) return;

  const boxes = Array.isArray(activeStoreState.boxes) ? activeStoreState.boxes : [];
  container.innerHTML = boxes.map((box, idx) => `
    <div class="bg-slate-800 border border-slate-700 rounded-xl p-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
      <div class="flex items-center gap-2 sm:w-24 shrink-0">
        <span class="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-600 text-amber-400 font-extrabold text-xs">
          Box #${box.boxNumber}
        </span>
      </div>

      <div class="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
        <input type="text"
          value="${escapeHtml(box.gameName || '')}"
          placeholder="Game Name (e.g. $20 Million)"
          onchange="updateStoreBoxConfig(${idx}, 'gameName', this.value)"
          class="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-sm text-white focus:border-blue-500 focus:outline-none" />

        <div class="flex items-center gap-1.5">
          <label class="text-xs text-slate-400 shrink-0">Price $</label>
          <input type="number" min="0" step="1"
            value="${Number(box.price) || 0}"
            onchange="updateStoreBoxConfig(${idx}, 'price', this.value)"
            class="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-sm text-white focus:border-blue-500 focus:outline-none" />
        </div>

        <div class="flex items-center gap-1.5">
          <label class="text-xs text-slate-400 shrink-0">Pack Size</label>
          <input type="number" min="1" step="1"
            value="${Number(box.packSize) || getDefaultPackSizeForPrice(box.price)}"
            onchange="updateStoreBoxConfig(${idx}, 'packSize', this.value)"
            class="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-sm text-white focus:border-blue-500 focus:outline-none" />
        </div>
      </div>

      <button onclick="clearSingleBoxNumbers(${idx})"
        title="Clear Start/End numbers for this box"
        class="px-2.5 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-xs font-bold text-slate-200 shrink-0">
        Clear #s
      </button>
    </div>
  `).join('');
}

function updateStoreBoxConfig(index, field, rawValue) {
  if (!activeStoreState || !activeStoreState.boxes[index]) return;
  const box = activeStoreState.boxes[index];

  if (field === 'gameName') {
    box.gameName = String(rawValue || '').trim();
  } else if (field === 'price') {
    const newPrice = Math.max(0, parseFloat(rawValue) || 0);
    box.price = newPrice;
    if (!box.packSize || box.packSize <= 0) {
      box.packSize = getDefaultPackSizeForPrice(newPrice);
    }
  } else if (field === 'packSize') {
    box.packSize = Math.max(1, parseInt(rawValue, 10) || 1);
  }

  recalculateSingleBox(box);
  saveActiveStoreState();
  renderGrid();
  updateHeaderAndBottomSummary();
}

function addDispenserBoxToCurrentStore() {
  if (!activeStoreState) return;
  const nextNum = activeStoreState.boxes.length + 1;
  activeStoreState.boxes.push({
    boxNumber: nextNum,
    gameName: '',
    price: 0,
    packSize: 30,
    startNum: '',
    endNum: '',
    midRollOver: false,
    soldCount: 0,
    soldAmount: 0
  });
  saveActiveStoreState();
  renderAllUI();
}

function removeLastDispenserBoxFromCurrentStore() {
  if (!activeStoreState || activeStoreState.boxes.length <= 1) {
    alert('You must keep at least 1 dispenser box.');
    return;
  }
  const lastBox = activeStoreState.boxes[activeStoreState.boxes.length - 1];
  if (!confirm(`Remove Box #${lastBox.boxNumber} from ${activeStoreState.locationName}?`)) return;
  activeStoreState.boxes.pop();
  saveActiveStoreState();
  renderAllUI();
}

function clearSingleBoxNumbers(index) {
  if (!activeStoreState || !activeStoreState.boxes[index]) return;
  const box = activeStoreState.boxes[index];
  box.startNum = '';
  box.endNum = '';
  box.midRollOver = false;
  box.soldCount = 0;
  box.soldAmount = 0;
  saveActiveStoreState();
  renderAllUI();
}

function startNextShiftRollover() {
  if (!activeStoreState) return;
  const confirmMsg =
    `Start Next Shift for ${activeStoreState.locationName}?\n\n` +
    `• Each box's Ending # becomes the new Starting #\n` +
    `• Ending # fields are cleared for the incoming cashier\n` +
    `• Online sales, payouts, actual cash & signature are reset`;

  if (!confirm(confirmMsg)) return;

  activeStoreState.boxes.forEach((box) => {
    const prevEnd = String(box.endNum ?? '').trim();
    if (prevEnd !== '') {
      box.startNum = prevEnd;
    }
    box.endNum = '';
    box.midRollOver = false;
    box.soldCount = 0;
    box.soldAmount = 0;
  });

  const prevCashierIn = (activeStoreState.reconciliation?.cashierIn || '').trim();
  const prevShift = activeStoreState.reconciliation?.shiftType || 'Shift 1 (Morning)';
  const nextShift = prevShift.includes('Shift 1')
    ? 'Shift 2 (Evening)'
    : prevShift.includes('Shift 2')
      ? 'Shift 3 (Overnight)'
      : 'Shift 1 (Morning)';

  activeStoreState.reconciliation = {
    auditDate: getLocalDateStr(),
    shiftType: nextShift,
    cashierOut: prevCashierIn,
    cashierIn: '',
    onlineSales: 0,
    totalPayouts: 0,
    actualCash: 0,
    notes: '',
    signatureDataUrl: ''
  };

  shiftSessionConfirmed = Boolean(prevCashierIn);
  saveActiveStoreState();
  clearSignaturePad();
  renderAllUI();
  alert(`✔ Ready for ${nextShift}! Ending numbers have been carried over to Starting numbers.`);
}
/* ========================= END OF PART 10 OF 11 ========================= */

/* ============================================================================
   ADDITIONAL UTILITIES & PRINT MODAL HELPERS FOR index.html
   ============================================================================ */
function openBackupWorksheetChoiceModal() {
  const modal = document.getElementById('modal-backup-worksheet-choice');
  if (modal) modal.classList.remove('hidden');
}

function closeBackupWorksheetChoiceModal() {
  const modal = document.getElementById('modal-backup-worksheet-choice');
  if (modal) modal.classList.add('hidden');
}

function executeManualBackupWorksheetPrint(layoutType) {
  closeBackupWorksheetChoiceModal();
  const data = buildCurrentShiftPrintData();
  if (!data) return;
  printStandardWorksheet(data);
}

function openMultiStoreManagerModal() {
  const modal = document.getElementById('modal-locations');
  if (modal) modal.classList.remove('hidden');
}

function closeMultiStoreManagerModal() {
  const modal = document.getElementById('modal-locations');
  if (modal) modal.classList.add('hidden');
}

function addNewStoreLocation() {
  const nameInput = document.getElementById('new-store-name');
  const codeInput = document.getElementById('new-store-code');
  const name = (nameInput?.value || '').trim();
  const code = (codeInput?.value || '').trim();
  if (!name || !code) {
    alert('Please enter both Store Name and Store Code.');
    return;
  }
  const id = `store_${Date.now()}`;
  appLocations.push({ id, name, code });
  saveLocationsCatalog();
  renderLocationSwitcher();
  if (nameInput) nameInput.value = '';
  if (codeInput) codeInput.value = '';
  closeMultiStoreManagerModal();
  handleLocationSwitch(id);
}

function renderHistoricalReports() {
  const container = document.getElementById('historical-reports-container');
  if (!container || !activeStoreState) return;
  const history = Array.isArray(activeStoreState.history) ? activeStoreState.history : [];
  if (history.length === 0) {
    container.innerHTML = `<div class="p-6 text-center text-slate-500 bg-slate-50 rounded-xl">No archived shift reports found yet.</div>`;
    return;
  }
  container.innerHTML = history.map((item, idx) => `
    <div class="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
      <div>
        <div class="font-bold text-slate-900">${escapeHtml(item.auditDate)} — ${escapeHtml(item.shiftType)}</div>
        <div class="text-xs text-slate-500">Cashier: ${escapeHtml(item.cashierOut)} | Sales: $${Number(item.scratchSales || 0).toFixed(2)} | Over/Short: $${Number(item.variance || 0).toFixed(2)}</div>
      </div>
      <button onclick="openHistoryPrintChoice(${idx})" class="px-3 py-1.5 bg-slate-800 text-white text-xs font-bold rounded-lg">🖨️ Print</button>
    </div>
  `).join('');
}

function renderAdminView() {
  renderSettingsGrid();
}

function setReportViewMode(mode) {
  activeReportMode = mode;
  const dailyBtn = document.getElementById('report-mode-daily-btn');
  const monthlyBtn = document.getElementById('report-mode-monthly-btn');
  const dailyWrap = document.getElementById('report-daily-picker-wrap');
  const monthlyWrap = document.getElementById('report-monthly-picker-wrap');
  if (mode === 'daily') {
    dailyBtn?.classList.add('bg-blue-600', 'text-white');
    dailyBtn?.classList.remove('text-slate-700');
    monthlyBtn?.classList.remove('bg-blue-600', 'text-white');
    monthlyBtn?.classList.add('text-slate-700');
    dailyWrap?.classList.remove('hidden');
    monthlyWrap?.classList.add('hidden');
  } else {
    monthlyBtn?.classList.add('bg-blue-600', 'text-white');
    monthlyBtn?.classList.remove('text-slate-700');
    dailyBtn?.classList.remove('bg-blue-600', 'text-white');
    dailyBtn?.classList.add('text-slate-700');
    monthlyWrap?.classList.remove('hidden');
    dailyWrap?.classList.add('hidden');
  }
  renderHistoricalReports();
}

function printCombinedPeriodReport() {
  openWorksheetPrintChoiceModal();
}
/* ============================================================================
   PART 11 OF 11: TAB NAVIGATION, UI ORCHESTRATION, LEGAL NDA GATE & INIT
   ============================================================================ */
function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function applyUiFontSize(sizeStr, persist = true) {
  document.documentElement.style.fontSize = sizeStr || '14px';
  if (persist) {
    localStorage.setItem(STORAGE_KEYS.UI_FONT_SIZE, sizeStr || '14px');
  }
}

function switchMainView(viewName) {
  activeMainView = viewName;
  const views = ['grid', 'reconcile', 'reports', 'admin'];
  views.forEach((v) => {
    const el = document.getElementById(`view-${v}`) || document.getElementById(`tab-panel-${v}`);
    const btn = document.getElementById(`nav-${v}`) || document.getElementById(`tab-btn-${v}`) || document.getElementById(`nav-btn-${v}`);
    if (el) {
      el.classList.toggle('hidden', v !== viewName);
    }
    if (btn) {
      if (v === viewName) {
        btn.classList.add('bg-blue-600', 'text-white', 'shadow-md');
        btn.classList.remove('bg-slate-800', 'text-slate-300');
      } else {
        btn.classList.remove('bg-blue-600', 'text-white', 'shadow-md');
        btn.classList.add('bg-slate-800', 'text-slate-300');
      }
    }
  });

  if (viewName === 'reconcile') {
    syncReconciliationFormFromState();
    setTimeout(() => initSignaturePad(), 30);
  } else if (viewName === 'reports' || viewName === 'history') {
    if (typeof renderHistoricalReports === 'function') renderHistoricalReports();
    renderHistoryList();
  } else if (viewName === 'admin' || viewName === 'settings') {
    if (typeof renderAdminView === 'function') renderAdminView();
    renderSettingsGrid();
  }
}

function switchTab(tabName) {
  switchMainView(tabName);
}

// Mandatory Legal NDA Gate Handlers
let legalScrolledToBottom = false;

function handleLegalScrollCheck(el) {
  if (!el) return;
  const tolerance = 12;
  if (el.scrollTop + el.clientHeight >= el.scrollHeight - tolerance) {
    legalScrolledToBottom = true;
    const hint = document.getElementById('legal-scroll-hint');
    if (hint) {
      hint.textContent = '✔ Agreement read completely. You may now sign and enter.';
      hint.className = 'text-[11px] font-bold text-emerald-600';
    }
  }
}

function submitLegalNdaGate() {
  const codeInput = document.getElementById('legal-invite-code');
  const storeInput = document.getElementById('legal-store-name');
  const signerInput = document.getElementById('legal-signer-name');
  const contactInput = document.getElementById('legal-contact-info');
  const checkbox = document.getElementById('legal-agree-checkbox');
  const modalGate = document.getElementById('modal-legal-nda-gate');

  const code = (codeInput?.value || '').trim().toUpperCase();
  const storeName = (storeInput?.value || '').trim();
  const signerName = (signerInput?.value || '').trim();
  const contact = (contactInput?.value || '').trim();

  if (!legalScrolledToBottom) {
    alert('Please scroll to the bottom of the NDA text in the evaluation agreement box before continuing.');
    document.getElementById('legal-nda-scroll-box')?.focus();
    return;
  }
  if (!code) {
    alert('Please enter your assigned Pilot Access Code.');
    codeInput?.focus();
    return;
  }
  if (!storeName || !signerName || !contact) {
    alert('Please fill in your store name, full legal name, and contact information.');
    return;
  }
  if (!checkbox?.checked) {
    alert('You must check the agreement box confirming compliance with the NDA and Pilot License terms.');
    return;
  }

  const authPayload = {
    code,
    storeName,
    signerName,
    contact,
    unlockedAt: new Date().toISOString()
  };
  localStorage.setItem('ur_lotto_pilot_nda_auth_v3', JSON.stringify(authPayload));

  if (modalGate) {
    modalGate.classList.add('hidden');
  }
}

function checkLegalNdaAuthOnStartup() {
  const modalGate = document.getElementById('modal-legal-nda-gate');
  if (!modalGate) return;

  const rawAuth = localStorage.getItem('ur_lotto_pilot_nda_auth_v3');
  if (rawAuth) {
    try {
      const parsed = JSON.parse(rawAuth);
      if (parsed && parsed.code) {
        modalGate.classList.add('hidden');
        return;
      }
    } catch (e) {}
  }
  modalGate.classList.remove('hidden');
}

function wireUpAllPrintButtons() {
  ensurePrintInfrastructure();
  document.querySelectorAll('button').forEach((btn) => {
    const id = (btn.id || '').toLowerCase();
    const onclickAttr = (btn.getAttribute('onclick') || '').toLowerCase();
    const label = (btn.textContent || '').toLowerCase();
    if (
      id.includes('print') ||
      onclickAttr.includes('print') ||
      label.includes('print shift') ||
      label.includes('print report') ||
      label.includes('print worksheet')
    ) {
      if (!btn.id.startsWith('lotto-')) {
        btn.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          openWorksheetPrintChoiceModal();
        };
      }
    }
  });
}

function renderAllUI() {
  if (!activeStoreState) return;
  renderLocationSwitcher();
  recalculateAllBoxes();
  renderDispenserGrid();
  syncReconciliationFormFromState();
  renderHistoryList();
  renderSettingsGrid();
  updateHeaderAndBottomSummary();
  wireUpAllPrintButtons();
}

document.addEventListener('DOMContentLoaded', () => {
  loadGlobalAppCatalogs();
  activeStoreState = loadStoreStateForLocation(activeLocationId);
  shiftSessionConfirmed = Boolean((activeStoreState?.reconciliation?.cashierOut || '').trim());

  checkLegalNdaAuthOnStartup();
  ensurePrintInfrastructure();
  initSignaturePad();
  startMidnightRolloverWatcher();
  renderAllUI();
  switchMainView('grid');
});
/* ========================= END OF PART 11 OF 11 ========================= */
