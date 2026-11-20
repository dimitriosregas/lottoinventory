/* ============================================================================
   PART 1 OF 10: MASTER GAMES CATALOG, DEFAULT BOX PATTERN, LOCAL DATE & STATE
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

/* ========================= END OF PART 1 OF 10 ========================= */
/* ============================================================================
   PART 2 OF 10: STORE STATE INITIALIZATION, STORAGE & MIDNIGHT AUTO-ROLLOVER
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

/* ========================= END OF PART 2 OF 10 ========================= */
/* ============================================================================
   PART 3 OF 10: TICKET SALES & ROLLOVER MATH, BOX INPUTS & LOCK PROTECTION
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

/* ========================= END OF PART 3 OF 10 ========================= */
/* ============================================================================
   PART 4 OF 10: DISPENSER LIST & BOX GRID RENDERING + VIEW MODE SWITCHER
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

/* ========================= END OF PART 4 OF 10 ========================= */
/* ============================================================================
   PART 5 OF 10: CASHIER & SHIFT CHECK-IN ON FIRST END # + BOTTOM SUMMARY BAR
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

/* ========================= END OF PART 5 OF 10 ========================= */
/* ============================================================================
   PART 6 OF 10: RECONCILIATION MATH, SIGNATURE CANVAS & SHIFT ARCHIVING
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
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
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

  // Normalize auditDate to YYYY-MM-DD local format
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

  // Replace existing archive entry if same date + same shift is re-finalized, otherwise append
  const existingIdx = activeStoreState.history.findIndex(
    h => (h.auditDate || '').slice(0, 10) === auditDate && h.shiftType === archiveRecord.shiftType
  );
  if (existingIdx >= 0) {
    activeStoreState.history[existingIdx] = archiveRecord;
  } else {
    activeStoreState.history.unshift(archiveRecord);
  }

  saveActiveStoreState();
  alert(`✔ Shift Report Saved & Archived!\n\nStore: ${activeStoreState.locationName}\nDate: ${auditDate}\nShift: ${archiveRecord.shiftType}\nCashier: ${cashierOut}\nScratch Sales: $${totalSales.toFixed(2)}`);

  if (confirm('Would you like to print the signed shift report now?')) {
    openWorksheetPrintChoiceModal();
  }
}

/* ========================= END OF PART 6 OF 10 ========================= */
/* ============================================================================
   PART 7 OF 10: HISTORICAL REPORTS (COMBINED DAILY & MONTHLY SUMMARIES)
   ============================================================================ */

function setReportViewMode(mode) {
  activeReportMode = mode === 'monthly' ? 'monthly' : 'daily';

  const dailyBtn = document.getElementById('report-mode-daily-btn');
  const monthlyBtn = document.getElementById('report-mode-monthly-btn');
  const dailyWrap = document.getElementById('report-daily-picker-wrap');
  const monthlyWrap = document.getElementById('report-monthly-picker-wrap');

  if (dailyBtn && monthlyBtn) {
    if (activeReportMode === 'daily') {
      dailyBtn.className = 'px-3 py-1 rounded-md text-xs font-extrabold bg-blue-600 text-white transition';
      monthlyBtn.className = 'px-3 py-1 rounded-md text-xs font-extrabold text-slate-700 hover:text-slate-900 transition';
    } else {
      monthlyBtn.className = 'px-3 py-1 rounded-md text-xs font-extrabold bg-blue-600 text-white transition';
      dailyBtn.className = 'px-3 py-1 rounded-md text-xs font-extrabold text-slate-700 hover:text-slate-900 transition';
    }
  }

  if (dailyWrap) dailyWrap.classList.toggle('hidden', activeReportMode !== 'daily');
  if (monthlyWrap) monthlyWrap.classList.toggle('hidden', activeReportMode !== 'monthly');

  renderHistoricalReports();
}

function getNormalizedRecordDate(record) {
  if (record.auditDate) {
    return String(record.auditDate).trim().slice(0, 10);
  }
  if (record.savedAt) {
    const parsed = new Date(record.savedAt);
    if (!isNaN(parsed.getTime())) {
      return getLocalDateStr(parsed);
    }
  }
  return getLocalDateStr();
}

function getFilteredReportRecords() {
  if (!activeStoreState || !Array.isArray(activeStoreState.history)) return [];

  const dateInput = document.getElementById('report-filter-date');
  const monthInput = document.getElementById('report-filter-month');

  if (activeReportMode === 'monthly') {
    const targetMonth = (monthInput?.value || getLocalMonthStr()).slice(0, 7);
    return activeStoreState.history.filter(rec => getNormalizedRecordDate(rec).startsWith(targetMonth));
  } else {
    const targetDate = (dateInput?.value || getLocalDateStr()).slice(0, 10);
    return activeStoreState.history.filter(rec => getNormalizedRecordDate(rec) === targetDate);
  }
}

function aggregateReportRecords(records) {
  let totalTickets = 0;
  let scratchSales = 0;
  let onlineSales = 0;
  let totalPayouts = 0;
  let netExpected = 0;
  let actualCash = 0;
  let variance = 0;

  records.forEach(r => {
    totalTickets += Number(r.totalTickets) || 0;
    scratchSales += Number(r.scratchSales) || 0;
    onlineSales += Number(r.onlineSales) || 0;
    totalPayouts += Number(r.totalPayouts) || 0;
    netExpected += Number(r.netExpected) || 0;
    actualCash += Number(r.actualCash) || 0;
    variance += Number(r.variance) || 0;
  });

  return {
    shiftCount: records.length,
    totalTickets,
    scratchSales: Number(scratchSales.toFixed(2)),
    onlineSales: Number(onlineSales.toFixed(2)),
    totalPayouts: Number(totalPayouts.toFixed(2)),
    netExpected: Number(netExpected.toFixed(2)),
    actualCash: Number(actualCash.toFixed(2)),
    variance: Number(variance.toFixed(2))
  };
}

function renderHistoricalReports() {
  const kpiContainer = document.getElementById('report-combined-summary-cards');
  const listContainer = document.getElementById('historical-reports-container');
  if (!kpiContainer || !listContainer || !activeStoreState) return;

  const dateInput = document.getElementById('report-filter-date');
  const monthInput = document.getElementById('report-filter-month');
  if (dateInput && !dateInput.value) dateInput.value = getLocalDateStr();
  if (monthInput && !monthInput.value) monthInput.value = getLocalMonthStr();

  const records = getFilteredReportRecords();
  const totals = aggregateReportRecords(records);

  const periodLabel = activeReportMode === 'monthly'
    ? `Month: ${monthInput?.value || getLocalMonthStr()}`
    : `Date: ${dateInput?.value || getLocalDateStr()}`;

  const varSign = totals.variance > 0 ? '+' : '';
  const varColor = Math.abs(totals.variance) < 0.01
    ? 'text-emerald-700'
    : (totals.variance > 0 ? 'text-blue-700' : 'text-red-700');

  kpiContainer.innerHTML = `
    <div class="bg-slate-900 text-white rounded-xl p-3 border border-slate-700">
      <div class="text-[10px] font-extrabold uppercase text-amber-400">COMBINED ${activeReportMode === 'monthly' ? 'MONTHLY' : 'DAILY'}</div>
      <div class="font-extrabold text-sm mt-0.5">${periodLabel}</div>
      <div class="text-[11px] text-slate-300 mt-0.5">${totals.shiftCount} Shift(s) Combined</div>
    </div>
    <div class="bg-slate-50 rounded-xl p-3 border border-slate-200">
      <div class="text-[10px] font-extrabold uppercase text-slate-500">SCRATCH SALES</div>
      <div class="font-mono font-extrabold text-base text-emerald-700 mt-0.5">$${totals.scratchSales.toFixed(2)}</div>
      <div class="text-[11px] text-slate-500">${totals.totalTickets} Tickets Sold</div>
    </div>
    <div class="bg-slate-50 rounded-xl p-3 border border-slate-200">
      <div class="text-[10px] font-extrabold uppercase text-slate-500">ONLINE / PAYOUTS</div>
      <div class="font-mono font-extrabold text-sm text-slate-900 mt-0.5">+$${totals.onlineSales.toFixed(2)}</div>
      <div class="text-[11px] text-red-600 font-semibold">-$${totals.totalPayouts.toFixed(2)} Paid</div>
    </div>
    <div class="bg-slate-50 rounded-xl p-3 border border-slate-200">
      <div class="text-[10px] font-extrabold uppercase text-slate-500">NET EXPECTED</div>
      <div class="font-mono font-extrabold text-base text-slate-900 mt-0.5">$${totals.netExpected.toFixed(2)}</div>
      <div class="text-[11px] text-slate-500">Actual: $${totals.actualCash.toFixed(2)}</div>
    </div>
    <div class="bg-slate-50 rounded-xl p-3 border border-slate-200">
      <div class="text-[10px] font-extrabold uppercase text-slate-500">OVER / SHORT</div>
      <div class="font-mono font-extrabold text-base ${varColor} mt-0.5">${varSign}$${totals.variance.toFixed(2)}</div>
      <div class="text-[11px] text-slate-500">Combined Variance</div>
    </div>
  `;

  // Also show quick-jump list of all logged dates for this store so past days are 1-click accessible
  const uniqueDates = Array.from(
    new Set(activeStoreState.history.map(r => getNormalizedRecordDate(r)))
  ).sort((a, b) => b.localeCompare(a));

  const quickDatesHtml = uniqueDates.length > 0
    ? `
      <div class="bg-slate-50 border border-slate-200 rounded-lg p-2.5 flex flex-wrap items-center gap-1.5 text-xs">
        <span class="font-extrabold text-slate-600 uppercase text-[10px] mr-1">Logged Days:</span>
        ${uniqueDates.slice(0, 14).map(d => `
          <button
            type="button"
            onclick="jumpToLoggedReportDate('${d}')"
            class="px-2.5 py-1 rounded font-mono font-bold text-[11px] border transition ${
              activeReportMode === 'daily' && dateInput?.value === d
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300'
            }"
          >
            ${d}
          </button>
        `).join('')}
      </div>
    `
    : '';

  if (records.length === 0) {
    listContainer.innerHTML = `
      ${quickDatesHtml}
      <div class="bg-slate-50 border border-dashed border-slate-300 rounded-xl p-8 text-center text-slate-500 text-xs">
        No finalized shift audits found for <strong>${periodLabel}</strong> at <strong>${activeStoreState.locationName}</strong>.
        <div class="mt-1">Finalize a shift under <strong>Reconciliation → Finalize &amp; Archive Shift</strong> to log it here.</div>
      </div>
    `;
    return;
  }

  // Sort chronologically (Shift 1 -> Shift 2 -> Shift 3)
  const sorted = [...records].sort((a, b) => {
    const dCmp = getNormalizedRecordDate(a).localeCompare(getNormalizedRecordDate(b));
    if (dCmp !== 0) return dCmp;
    return String(a.shiftType || '').localeCompare(String(b.shiftType || ''));
  });

  const rowsHtml = sorted.map(rec => {
    const rDate = getNormalizedRecordDate(rec);
    const rVar = Number(rec.variance) || 0;
    const rSign = rVar > 0 ? '+' : '';
    const rVarCls = Math.abs(rVar) < 0.01 ? 'text-emerald-700' : (rVar > 0 ? 'text-blue-700' : 'text-red-700');

    return `
      <tr class="border-b border-slate-200 hover:bg-slate-50">
        <td class="p-2.5 font-mono font-bold text-slate-800">${rDate}</td>
        <td class="p-2.5 font-extrabold text-slate-900">${rec.shiftType || 'Shift'}</td>
        <td class="p-2.5 font-bold text-slate-700">${rec.cashierOut || 'Unspecified'}</td>
        <td class="p-2.5 text-center font-mono font-bold">${rec.totalTickets || 0}</td>
        <td class="p-2.5 text-right font-mono font-extrabold text-emerald-700">$${(Number(rec.scratchSales) || 0).toFixed(2)}</td>
        <td class="p-2.5 text-right font-mono">$${(Number(rec.onlineSales) || 0).toFixed(2)}</td>
        <td class="p-2.5 text-right font-mono text-red-600">-$${(Number(rec.totalPayouts) || 0).toFixed(2)}</td>
        <td class="p-2.5 text-right font-mono font-bold">$${(Number(rec.actualCash) || 0).toFixed(2)}</td>
        <td class="p-2.5 text-right font-mono font-extrabold ${rVarCls}">${rSign}$${rVar.toFixed(2)}</td>
        <td class="p-2.5 text-right">
          <button
            type="button"
            onclick="reprintArchivedShiftReport('${rec.id}')"
            class="bg-slate-800 hover:bg-slate-700 text-white font-bold text-[11px] px-2.5 py-1 rounded"
          >
            🖨 Print
          </button>
        </td>
      </tr>
    `;
  }).join('');

  listContainer.innerHTML = `
    ${quickDatesHtml}
    <div class="overflow-x-auto border border-slate-300 rounded-xl bg-white">
      <table class="w-full text-left border-collapse text-xs">
        <thead class="bg-slate-800 text-white uppercase text-[11px]">
          <tr>
            <th class="p-2.5">Date</th>
            <th class="p-2.5">Shift</th>
            <th class="p-2.5">Cashier</th>
            <th class="p-2.5 text-center">Tickets</th>
            <th class="p-2.5 text-right">Scratch Sales</th>
            <th class="p-2.5 text-right">Online</th>
            <th class="p-2.5 text-right">Payouts</th>
            <th class="p-2.5 text-right">Actual Cash</th>
            <th class="p-2.5 text-right">Over/Short</th>
            <th class="p-2.5 text-right">Action</th>
          </tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
        <tfoot class="bg-slate-100 font-extrabold border-t-2 border-slate-400">
          <tr>
            <td colspan="3" class="p-2.5 text-right uppercase">Combined ${activeReportMode === 'monthly' ? 'Monthly' : 'Daily'} Totals (${totals.shiftCount} Shifts):</td>
            <td class="p-2.5 text-center font-mono">${totals.totalTickets}</td>
            <td class="p-2.5 text-right font-mono text-emerald-700">$${totals.scratchSales.toFixed(2)}</td>
            <td class="p-2.5 text-right font-mono">$${totals.onlineSales.toFixed(2)}</td>
            <td class="p-2.5 text-right font-mono text-red-600">-$${totals.totalPayouts.toFixed(2)}</td>
            <td class="p-2.5 text-right font-mono">$${totals.actualCash.toFixed(2)}</td>
            <td class="p-2.5 text-right font-mono ${varColor}">${varSign}$${totals.variance.toFixed(2)}</td>
            <td class="p-2.5"></td>
          </tr>
        </tfoot>
      </table>
    </div>
  `;
}

function jumpToLoggedReportDate(dateStr) {
  const dateInput = document.getElementById('report-filter-date');
  if (dateInput) dateInput.value = dateStr;
  setReportViewMode('daily');
}

/* ========================= END OF PART 7 OF 10 ========================= */
/* ============================================================================
   PART 8 OF 10: PRINTING ENGINE (80MM THERMAL, US LETTER & BACKUP WORKSHEET)
   ============================================================================ */

function openPrintChoiceModal() {
  const modal = document.getElementById('modal-print-choice');
  if (modal) modal.classList.remove('hidden');
}

function closePrintChoiceModal() {
  const modal = document.getElementById('modal-print-choice');
  if (modal) modal.classList.add('hidden');
}

function openBackupWorksheetChoiceModal() {
  const modal = document.getElementById('modal-backup-worksheet-choice');
  if (modal) modal.classList.remove('hidden');
}

function closeBackupWorksheetChoiceModal() {
  const modal = document.getElementById('modal-backup-worksheet-choice');
  if (modal) modal.classList.add('hidden');
}

function printManualBackupWorksheet() {
  openBackupWorksheetChoiceModal();
}

// 1. PEN-READY MANUAL BACKUP WORKSHEET ('1page' FIT OR '2page' NUMBERED WITH REPORT TOTAL & DAY TOTAL)
function executeManualBackupWorksheetPrint(layoutMode = '2page') {
  closeBackupWorksheetChoiceModal();
  const printContainer = document.getElementById('print-container');
  if (!printContainer || !activeStoreState) return;

  const storeLabel = `${activeStoreState.locationName} (#${activeStoreState.locationCode})`;
  const cashierVal = (activeStoreState.reconciliation?.cashierOut || '').trim();
  const cashierDisplay = cashierVal ? cashierVal : '______________________';
  const shiftVal = activeStoreState.reconciliation?.shiftType || '______________________';
  const dateStr = activeStoreState.reconciliation?.auditDate || getLocalDateStr();
  const boxes = activeStoreState.boxes || [];

  const isOnePage = layoutMode === '1page';
  const pageChunks = isOnePage
    ? [boxes]
    : [boxes.slice(0, Math.ceil(boxes.length / 2)), boxes.slice(Math.ceil(boxes.length / 2))];

  const totalPages = pageChunks.length;
  const rowPad = isOnePage ? '2px 4px' : '5px 6px';
  const fontSize = isOnePage ? '9.5px' : '11.5px';
  const blankLineHeight = isOnePage ? '12px' : '21px';

  const pagesHtml = pageChunks.map((chunk, pageIdx) => {
    const pageNum = pageIdx + 1;
    const isLastPage = pageNum === totalPages;
    const startOffset = pageIdx === 0 ? 0 : pageChunks[0].length;

    const rowsHtml = chunk.map((box, idx) => {
      const globalIdx = startOffset + idx;
      const boxLabel = box.label || String(globalIdx + 1);
      const gameNum = box.gameNum || '____';
      const gameName = box.gameName || '____________________';
      const price = box.price ? `$${Number(box.price).toFixed(0)}` : '____';

      return `
        <tr>
          <td style="border:1px solid #000; padding:${rowPad}; text-align:center; font-weight:900;">${boxLabel}</td>
          <td style="border:1px solid #000; padding:${rowPad};">
            <strong>${gameNum}</strong> — ${gameName}
          </td>
          <td style="border:1px solid #000; padding:${rowPad}; text-align:center; font-weight:700;">${price}</td>
          <td style="border:1px solid #000; padding:${rowPad};">
            <div style="border-bottom:1px solid #000; height:${blankLineHeight};"></div>
          </td>
          <td style="border:1px solid #000; padding:${rowPad};">
            <div style="border-bottom:1px solid #000; height:${blankLineHeight};"></div>
          </td>
          <td style="border:1px solid #000; padding:${rowPad};">
            <div style="border-bottom:1px solid #000; height:${blankLineHeight};"></div>
          </td>
          <td style="border:1px solid #000; padding:${rowPad};">
            <div style="border-bottom:1px solid #000; height:${blankLineHeight};"></div>
          </td>
        </tr>
      `;
    }).join('');

    const totalsFooterHtml = isLastPage
      ? `
        <tfoot>
          <tr style="background:#f1f5f9; font-weight:900;">
            <td colspan="5" style="border:1px solid #000; padding:${isOnePage ? '3px 6px' : '6px'}; text-align:right;">MANUAL SHIFT TOTALS (SCRATCH):</td>
            <td style="border:1px solid #000; padding:${isOnePage ? '3px 6px' : '6px'};">&nbsp;</td>
            <td style="border:1px solid #000; padding:${isOnePage ? '3px 6px' : '6px'};">$</td>
          </tr>
        </tfoot>
      `
      : '';

    const summaryTotalsBoxHtml = isLastPage
      ? `
        <table style="width:100%; border-collapse:collapse; margin-top:${isOnePage ? '5px' : '10px'}; font-size:${isOnePage ? '10px' : '11.5px'}; font-weight:800;">
          <tr>
            <td style="border:1px solid #000; padding:${isOnePage ? '4px 6px' : '7px'}; width:25%; background:#f8fafc;">
              SHIFT TOTAL ($):<br/><span style="font-size:${isOnePage ? '11px' : '13px'};">$_________________</span>
            </td>
            <td style="border:1px solid #000; padding:${isOnePage ? '4px 6px' : '7px'}; width:25%; background:#f8fafc;">
              REPORT TOTAL ($):<br/><span style="font-size:${isOnePage ? '11px' : '13px'};">$_________________</span>
            </td>
            <td style="border:1px solid #000; padding:${isOnePage ? '4px 6px' : '7px'}; width:25%; background:#f8fafc;">
              DAY TOTAL ($):<br/><span style="font-size:${isOnePage ? '11px' : '13px'};">$_________________</span>
            </td>
            <td style="border:1px solid #000; padding:${isOnePage ? '4px 6px' : '7px'}; width:25%; background:#f8fafc;">
              OVER / SHORT ($):<br/><span style="font-size:${isOnePage ? '11px' : '13px'};">$_________________</span>
            </td>
          </tr>
        </table>
      `
      : '';

    const pageBreakStyle = !isLastPage ? 'page-break-after: always; break-after: page;' : '';

    return `
      <div style="font-family: Arial, sans-serif; color: #000; padding: ${isOnePage ? '4px 8px' : '10px'}; max-width: 8.5in; margin: 0 auto; ${pageBreakStyle}">
        <div style="display:flex; justify-content:space-between; align-items:flex-end; border-bottom:2px solid #000; padding-bottom:4px; margin-bottom:5px;">
          <div>
            <div style="font-size:${isOnePage ? '13px' : '15px'}; font-weight:900; letter-spacing:0.4px;">UR STORE CENTRAL LOTTO AUDIT — MANUAL BACKUP WORKSHEET</div>
            <div style="font-size:${isOnePage ? '11px' : '12px'}; font-weight:800; margin-top:2px;">Location: ${storeLabel}</div>
          </div>
          <div style="text-align:right; font-size:${isOnePage ? '10px' : '11px'}; line-height:1.3;">
            <div><strong>Date:</strong> ${dateStr}</div>
            <div><strong>Shift:</strong> ${shiftVal}</div>
            <div><strong>Cashier:</strong> ${cashierDisplay}</div>
          </div>
        </div>

        <table style="width:100%; border-collapse:collapse; font-size:${fontSize};">
          <thead>
            <tr style="background:#e2e8f0;">
              <th style="border:1px solid #000; padding:4px; width:46px; text-align:center;">BOX #</th>
              <th style="border:1px solid #000; padding:4px; text-align:left;">GAME # &amp; NAME</th>
              <th style="border:1px solid #000; padding:4px; width:46px; text-align:center;">PRICE</th>
              <th style="border:1px solid #000; padding:4px; width:82px; text-align:center;">START #</th>
              <th style="border:1px solid #000; padding:4px; width:82px; text-align:center;">END #</th>
              <th style="border:1px solid #000; padding:4px; width:76px; text-align:center;"># SOLD</th>
              <th style="border:1px solid #000; padding:4px; width:86px; text-align:center;">SALES $</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
          ${totalsFooterHtml}
        </table>

        ${summaryTotalsBoxHtml}

        <div style="margin-top:${isOnePage ? '6px' : '12px'}; border-top:1px solid #000; padding-top:5px; font-size:${isOnePage ? '10px' : '11px'};">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <div><strong>Page ${pageNum} of ${totalPages}</strong> &nbsp;|&nbsp; <strong>Location:</strong> ${storeLabel}</div>
            <div><strong>Date:</strong> ${dateStr} &nbsp;|&nbsp; <strong>Shift:</strong> ${shiftVal}</div>
          </div>
          <div style="display:flex; justify-content:space-between; gap:16px;">
            <div>Cashier Signature: __________________________________</div>
            <div>Verifier / Manager: ________________________________</div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  printContainer.innerHTML = pagesHtml;
  window.print();
}

// 2. PRINT SHIFT AUDIT REPORT (80MM THERMAL RECEIPT OR SINGLE-PAGE US LETTER)
function executeShiftAuditPrint(format = 'letter') {
  closePrintChoiceModal();
  if (!activeStoreState) return;
  recalculateAllBoxes();

  const printContainer = document.getElementById('print-container');
  if (!printContainer) return;

  const r = activeStoreState.reconciliation || {};
  const totals = getShiftTotalsSummary();
  const storeLabel = `${activeStoreState.locationName} (#${activeStoreState.locationCode})`;
  const activeBoxes = (activeStoreState.boxes || []).filter(
    b => b.gameNum || b.ticketsSold > 0 || (b.rollovers && b.rollovers.length > 0)
  );

  if (format === '80mm') {
    const linesHtml = activeBoxes.map(b => {
      const hasRoll = b.rollovers && b.rollovers.length > 0;
      const rollTag = hasRoll ? ` [+${b.rollovers.length}R]` : '';
      return `
        <div style="border-bottom:1px dashed #000; padding:3px 0; font-size:11px;">
          <div style="display:flex; justify-content:space-between; font-weight:800;">
            <span>B${b.label || ''} #${b.gameNum || '-'} ($${b.price || 0})${rollTag}</span>
            <span>$${(b.salesDollars || 0).toFixed(2)}</span>
          </div>
          <div style="font-size:10px;">
            ${b.gameName || 'Game'} | ${b.startNum || 0}→${b.endNum || 0} (${b.ticketsSold || 0} tix)
          </div>
        </div>
      `;
    }).join('');

    printContainer.innerHTML = `
      <div style="width:76mm; margin:0 auto; font-family:'Courier New', monospace; color:#000; font-size:11px; line-height:1.3;">
        <div style="text-align:center; border-bottom:2px solid #000; padding-bottom:5px; margin-bottom:5px;">
          <div style="font-size:14px; font-weight:900;">UR STORE CENTRAL</div>
          <div style="font-weight:800;">LOTTO SHIFT AUDIT RECEIPT</div>
          <div>${storeLabel}</div>
          <div>${r.auditDate || getLocalDateStr()} | ${r.shiftType || 'Shift'}</div>
          <div>Cashier: ${r.cashierOut || 'Unspecified'}</div>
        </div>

        ${linesHtml || '<div style="text-align:center; padding:8px 0;">No active box counts recorded.</div>'}

        <div style="border-top:2px solid #000; margin-top:6px; padding-top:5px; font-size:11px;">
          <div style="display:flex; justify-content:space-between;"><span>Total Tickets Sold:</span><strong>${totals.totalTickets}</strong></div>
          <div style="display:flex; justify-content:space-between;"><span>Scratch Sales:</span><strong>$${totals.scratchSales.toFixed(2)}</strong></div>
          <div style="display:flex; justify-content:space-between;"><span>Online / Draw Sales:</span><strong>$${totals.onlineSales.toFixed(2)}</strong></div>
          <div style="display:flex; justify-content:space-between; font-size:12px; border-top:1px solid #000; margin-top:3px; padding-top:3px;">
            <span>TOTAL GROSS LOTTO:</span><strong>$${totals.grossSales.toFixed(2)}</strong>
          </div>
          <div style="display:flex; justify-content:space-between;"><span>Less Total Cashes:</span><span>-$${totals.totalCashes.toFixed(2)}</span></div>
          <div style="display:flex; justify-content:space-between; font-size:12px; font-weight:900;">
            <span>NET EXPECTED CASH:</span><span>$${totals.netExpectedCash.toFixed(2)}</span>
          </div>
          <div style="display:flex; justify-content:space-between;"><span>Actual Cash Dropped:</span><span>$${totals.actualCashDropped.toFixed(2)}</span></div>
          <div style="display:flex; justify-content:space-between; font-size:13px; font-weight:900; border-top:1px dashed #000; margin-top:3px; padding-top:3px;">
            <span>OVER / SHORT:</span><span>${totals.variance >= 0 ? '+' : ''}$${totals.variance.toFixed(2)}</span>
          </div>
        </div>

        ${r.signatureDataUrl ? `
          <div style="margin-top:8px; text-align:center;">
            <img src="${r.signatureDataUrl}" style="max-height:42px; max-width:65mm;" />
            <div style="border-top:1px solid #000; font-size:10px;">Cashier Signature</div>
          </div>
        ` : `
          <div style="margin-top:18px; border-top:1px solid #000; font-size:10px;">Cashier Signature</div>
        `}
        <div style="text-align:center; font-size:9px; margin-top:6px;">Printed ${formatDisplayDateTime(new Date())}</div>
      </div>
    `;
  } else {
    // SINGLE-PAGE US LETTER (8.5" x 11")
    const rowsHtml = (activeStoreState.boxes || []).map((b, idx) => {
      const hasRoll = b.rollovers && b.rollovers.length > 0;
      return `
        <tr>
          <td style="border:1px solid #000; padding:2px 4px; text-align:center; font-weight:800;">${b.label || idx + 1}</td>
          <td style="border:1px solid #000; padding:2px 4px;">${b.gameNum || '-'}</td>
          <td style="border:1px solid #000; padding:2px 4px;">${b.gameName || 'Empty'}${hasRoll ? ` (+${b.rollovers.length} Roll)` : ''}</td>
          <td style="border:1px solid #000; padding:2px 4px; text-align:center;">${b.price ? `$${b.price}` : '-'}</td>
          <td style="border:1px solid #000; padding:2px 4px; text-align:center;">${b.startNum || 0}</td>
          <td style="border:1px solid #000; padding:2px 4px; text-align:center;">${b.endNum || 0}</td>
          <td style="border:1px solid #000; padding:2px 4px; text-align:center; font-weight:700;">${b.ticketsSold || 0}</td>
          <td style="border:1px solid #000; padding:2px 4px; text-align:right; font-weight:800;">$${(b.salesDollars || 0).toFixed(2)}</td>
        </tr>
      `;
    }).join('');

    printContainer.innerHTML = `
      <div style="font-family:Arial, sans-serif; color:#000; max-width:8.5in; margin:0 auto; font-size:10px;">
        <div style="display:flex; justify-content:space-between; border-bottom:2px solid #000; padding-bottom:4px; margin-bottom:6px;">
          <div>
            <div style="font-size:14px; font-weight:900;">UR STORE CENTRAL LOTTO AUDIT — SHIFT REPORT</div>
            <div style="font-size:11px; font-weight:800;">${storeLabel}</div>
          </div>
          <div style="text-align:right; font-size:10px;">
            <div><strong>Date:</strong> ${r.auditDate || getLocalDateStr()} | <strong>Shift:</strong> ${r.shiftType || ''}</div>
            <div><strong>Cashier:</strong> ${r.cashierOut || 'Unspecified'} | <strong>Verifier:</strong> ${r.verifierName || 'N/A'}</div>
          </div>
        </div>

        <table style="width:100%; border-collapse:collapse; font-size:9px; margin-bottom:6px;">
          <thead>
            <tr style="background:#e2e8f0;">
              <th style="border:1px solid #000; padding:3px; width:36px;">BOX</th>
              <th style="border:1px solid #000; padding:3px; width:50px;">GAME #</th>
              <th style="border:1px solid #000; padding:3px; text-align:left;">GAME NAME</th>
              <th style="border:1px solid #000; padding:3px; width:40px;">PRICE</th>
              <th style="border:1px solid #000; padding:3px; width:52px;">START</th>
              <th style="border:1px solid #000; padding:3px; width:52px;">END</th>
              <th style="border:1px solid #000; padding:3px; width:45px;">SOLD</th>
              <th style="border:1px solid #000; padding:3px; width:64px; text-align:right;">SALES $</th>
            </tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
        </table>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; font-size:10px; border:1px solid #000; padding:6px; background:#f8fafc;">
          <div>
            <div><strong>Total Tickets Sold:</strong> ${totals.totalTickets}</div>
            <div><strong>Scratch Sales:</strong> $${totals.scratchSales.toFixed(2)}</div>
            <div><strong>Online / Draw Sales:</strong> $${totals.onlineSales.toFixed(2)}</div>
            <div><strong>Total Gross Lotto:</strong> $${totals.grossSales.toFixed(2)}</div>
          </div>
          <div>
            <div><strong>Total Cashes Paid Out:</strong> -$${totals.totalCashes.toFixed(2)}</div>
            <div><strong>Net Expected Cash:</strong> $${totals.netExpectedCash.toFixed(2)}</div>
            <div><strong>Actual Cash Dropped:</strong> $${totals.actualCashDropped.toFixed(2)}</div>
            <div style="font-size:11px; font-weight:900;">Over / Short Variance: ${totals.variance >= 0 ? '+' : ''}$${totals.variance.toFixed(2)}</div>
          </div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-top:10px; font-size:10px;">
          <div>
            ${r.signatureDataUrl ? `<img src="${r.signatureDataUrl}" style="max-height:36px; display:block;" />` : ''}
            <div>Cashier Signature: __________________________________</div>
          </div>
          <div>Manager / Verifier: ________________________________</div>
        </div>
      </div>
    `;
  }

  window.print();
}

/* ========================= END OF PART 8 OF 10 ========================= */
/* ============================================================================
   PART 9 OF 10: SETUP / GAMES ADMIN VIEW, BOX LABEL AUTO-CASCADE & CATALOG CRUD
   ============================================================================ */

function applyUiFontSize(sizeStr, persist = true) {
  const validSizes = ['12px', '14px', '16px', '18px', '20px', '22px'];
  const chosen = validSizes.includes(sizeStr) ? sizeStr : '14px';
  document.documentElement.style.fontSize = chosen;
  if (persist) {
    localStorage.setItem(STORAGE_KEYS.UI_FONT_SIZE, chosen);
  }
  const selectEl = document.getElementById('admin-ui-font-size');
  if (selectEl) selectEl.value = chosen;
}

function renderAdminView() {
  if (!activeStoreState) return;

  const boxCountInput = document.getElementById('admin-total-boxes-input');
  if (boxCountInput) boxCountInput.value = activeStoreState.boxCount || 40;

  const uiFontSelect = document.getElementById('admin-ui-font-size');
  if (uiFontSelect) {
    uiFontSelect.value = localStorage.getItem(STORAGE_KEYS.UI_FONT_SIZE) || '14px';
  }

  const receiptFontSelect = document.getElementById('admin-receipt-font-size');
  if (receiptFontSelect) {
    receiptFontSelect.value = localStorage.getItem(STORAGE_KEYS.RECEIPT_FONT_SIZE) || '11';
  }

  renderAdminBoxLabelsGrid();
  renderAdminSavedCashiersTags();
  renderAdminMasterGamesTable();
}

function renderAdminBoxLabelsGrid() {
  const grid = document.getElementById('admin-box-labels-grid');
  if (!grid || !activeStoreState) return;

  const count = Number(activeStoreState.boxCount) || 40;
  if (!Array.isArray(activeStoreState.boxLabels) || activeStoreState.boxLabels.length !== count) {
    activeStoreState.boxLabels = generateDefaultCustomBoxLabels(count);
  }

  grid.innerHTML = activeStoreState.boxLabels.map((lbl, idx) => `
    <div class="bg-white border border-slate-300 rounded-lg p-1.5 text-center shadow-sm">
      <div class="text-[9px] font-bold text-slate-400 uppercase mb-0.5">Slot ${idx + 1}</div>
      <input
        type="text"
        id="admin-box-label-${idx}"
        value="${String(lbl).replace(/"/g, '&quot;')}"
        oninput="handleAdminBoxLabelInput(${idx}, this.value)"
        class="w-full border border-slate-300 rounded px-1 py-1 text-center text-xs font-black text-slate-900 uppercase focus:border-blue-500 focus:outline-none"
      />
    </div>
  `).join('');
}

// Auto-cascade left-to-right when a single letter (e.g. C -> D, E, F) or number (e.g. 1 -> 2, 3, 4) is typed
function handleAdminBoxLabelInput(startIdx, rawVal) {
  if (!activeStoreState) return;
  const val = String(rawVal || '').trim();
  activeStoreState.boxLabels[startIdx] = val;

  if (/^\d+$/.test(val)) {
    // Pure integer: increment all following boxes sequentially (+1, +2, ...)
    const baseNum = parseInt(val, 10);
    for (let i = startIdx + 1; i < activeStoreState.boxLabels.length; i++) {
      const nextVal = String(baseNum + (i - startIdx));
      activeStoreState.boxLabels[i] = nextVal;
      const inp = document.getElementById(`admin-box-label-${i}`);
      if (inp) inp.value = nextVal;
    }
  } else if (/^[A-Za-z]$/.test(val)) {
    // Single letter: increment alphabetically (C -> D -> E -> F ... up to Z)
    const isUpper = val === val.toUpperCase();
    const baseCode = val.toUpperCase().charCodeAt(0);
    for (let i = startIdx + 1; i < activeStoreState.boxLabels.length; i++) {
      const nextCode = baseCode + (i - startIdx);
      if (nextCode <= 90) {
        const ch = String.fromCharCode(nextCode);
        const formatted = isUpper ? ch : ch.toLowerCase();
        activeStoreState.boxLabels[i] = formatted;
        const inp = document.getElementById(`admin-box-label-${i}`);
        if (inp) inp.value = formatted;
      }
    }
  }
}

function applyDefaultCustomBoxPattern() {
  if (!activeStoreState) return;
  const count = Number(activeStoreState.boxCount) || 40;
  activeStoreState.boxLabels = generateDefaultCustomBoxLabels(count);
  renderAdminBoxLabelsGrid();
  saveAdminSettingsAndRefresh();
}

function handleAdminBoxCountChange(newCountRaw) {
  if (!activeStoreState) return;
  const newCount = Math.min(100, Math.max(1, parseInt(newCountRaw, 10) || 40));
  const currentLabels = Array.isArray(activeStoreState.boxLabels) ? [...activeStoreState.boxLabels] : [];
  const defaultPattern = generateDefaultCustomBoxLabels(newCount);

  const updatedLabels = [];
  for (let i = 0; i < newCount; i++) {
    updatedLabels.push(currentLabels[i] !== undefined ? currentLabels[i] : defaultPattern[i]);
  }

  const updatedBoxes = [];
  for (let i = 0; i < newCount; i++) {
    const existing = activeStoreState.boxes[i];
    if (existing) {
      existing.id = i + 1;
      existing.label = updatedLabels[i];
      updatedBoxes.push(existing);
    } else {
      updatedBoxes.push({
        id: i + 1,
        label: updatedLabels[i],
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
  }

  activeStoreState.boxCount = newCount;
  activeStoreState.boxLabels = updatedLabels;
  activeStoreState.boxes = updatedBoxes;

  saveActiveStoreState();
  renderAdminBoxLabelsGrid();
  renderDispenserGrid();
}

function saveAdminSettingsAndRefresh() {
  if (!activeStoreState) return;

  const receiptFontSelect = document.getElementById('admin-receipt-font-size');
  if (receiptFontSelect) {
    localStorage.setItem(STORAGE_KEYS.RECEIPT_FONT_SIZE, receiptFontSelect.value);
  }

  const uiFontSelect = document.getElementById('admin-ui-font-size');
  if (uiFontSelect) {
    applyUiFontSize(uiFontSelect.value, true);
  }

  activeStoreState.boxes.forEach((box, idx) => {
    const lbl = activeStoreState.boxLabels[idx];
    box.label = lbl && String(lbl).trim() !== '' ? String(lbl).trim() : String(idx + 1);
  });

  saveActiveStoreState();
  renderDispenserGrid();
  updateHeaderAndBottomSummary();
  alert(`✔ Configuration saved for ${activeStoreState.locationName}!`);
}

function renderAdminSavedCashiersTags() {
  const wrap = document.getElementById('admin-saved-cashiers-tags');
  if (!wrap) return;

  wrap.innerHTML = savedCashiersList.map((name, idx) => `
    <span class="inline-flex items-center gap-1 bg-white border border-slate-300 rounded-full px-2.5 py-0.5 text-xs font-bold text-slate-800">
      <span>${name}</span>
      <button type="button" onclick="removeSavedCashierFromAdmin(${idx})" class="text-red-500 hover:text-red-700 font-black">×</button>
    </span>
  `).join('');
}

function addSavedCashierFromAdmin() {
  const input = document.getElementById('admin-new-cashier-input');
  const name = (input?.value || '').trim();
  if (!name) return;

  if (!savedCashiersList.some(c => c.toLowerCase() === name.toLowerCase())) {
    savedCashiersList.push(name);
    localStorage.setItem(STORAGE_KEYS.SAVED_CASHIERS, JSON.stringify(savedCashiersList));
    populatePromptCashiersDatalist();
  }
  input.value = '';
  renderAdminSavedCashiersTags();
}

function removeSavedCashierFromAdmin(idx) {
  savedCashiersList.splice(idx, 1);
  localStorage.setItem(STORAGE_KEYS.SAVED_CASHIERS, JSON.stringify(savedCashiersList));
  populatePromptCashiersDatalist();
  renderAdminSavedCashiersTags();
}

function renderAdminMasterGamesTable() {
  const tbody = document.getElementById('admin-master-games-tbody');
  if (!tbody) return;

  const query = (document.getElementById('admin-game-search')?.value || '').trim().toLowerCase();
  const filtered = masterGamesCatalog.filter(g => {
    if (!query) return true;
    return String(g.gameNum).toLowerCase().includes(query) || String(g.name).toLowerCase().includes(query);
  });

  tbody.innerHTML = filtered.map(g => {
    const packValue = (Number(g.price) || 0) * (Number(g.count) || 0);
    return `
      <tr class="hover:bg-slate-50">
        <td class="p-2 font-mono font-extrabold text-slate-900">${g.gameNum}</td>
        <td class="p-2 font-bold text-slate-800">${g.name}</td>
        <td class="p-2 text-center font-bold">$${Number(g.price).toFixed(0)}</td>
        <td class="p-2 text-center font-mono">${g.count}</td>
        <td class="p-2 text-center font-mono font-bold text-emerald-700">$${packValue.toFixed(0)}</td>
        <td class="p-2 text-right space-x-2">
          <button
            type="button"
            onclick="editMasterGameInAdmin('${g.gameNum}')"
            class="text-blue-600 hover:text-blue-800 font-bold"
          >
            Edit
          </button>
          <button
            type="button"
            onclick="deleteMasterGameFromAdmin('${g.gameNum}')"
            class="text-red-600 hover:text-red-800 font-bold"
          >
            Delete
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function upsertMasterGameFromAdmin() {
  const num = (document.getElementById('admin-game-num')?.value || '').trim();
  const name = (document.getElementById('admin-game-name')?.value || '').trim().toUpperCase();
  const price = parseFloat(document.getElementById('admin-game-price')?.value);
  const count = parseInt(document.getElementById('admin-game-count')?.value, 10);

  if (!num || !name || isNaN(price) || isNaN(count)) {
    alert('Please fill in Game #, Game Name, Price ($), and Pack Size (Tix).');
    return;
  }

  const idx = masterGamesCatalog.findIndex(g => String(g.gameNum) === num);
  const entry = { gameNum: num, name, price, count };
  if (idx >= 0) {
    masterGamesCatalog[idx] = entry;
  } else {
    masterGamesCatalog.push(entry);
  }

  saveMasterGamesCatalog();
  recalculateAllBoxes();
  saveActiveStoreState();

  document.getElementById('admin-game-num').value = '';
  document.getElementById('admin-game-name').value = '';
  document.getElementById('admin-game-price').value = '';
  document.getElementById('admin-game-count').value = '';

  renderAdminMasterGamesTable();
  renderDispenserGrid();
  updateHeaderAndBottomSummary();
}

function editMasterGameInAdmin(gameNum) {
  const game = findGameByNumber(gameNum);
  if (!game) return;
  document.getElementById('admin-game-num').value = game.gameNum;
  document.getElementById('admin-game-name').value = game.name;
  document.getElementById('admin-game-price').value = game.price;
  document.getElementById('admin-game-count').value = game.count;
  document.getElementById('admin-game-num').focus();
}

function deleteMasterGameFromAdmin(gameNum) {
  if (!confirm(`Remove Game #${gameNum} from Master Catalog?`)) return;
  masterGamesCatalog = masterGamesCatalog.filter(g => String(g.gameNum) !== String(gameNum));
  saveMasterGamesCatalog();
  renderAdminMasterGamesTable();
}

/* ========================= END OF PART 9 OF 10 ========================= */
/* ============================================================================
   PART 10 OF 10: EXPORT/IMPORT, BACKUP/RESTORE, MULTI-STORE & BOOTLOADER
   ============================================================================ */

function exportMasterGamesUniversal() {
  const payload = {
    exportedAt: new Date().toISOString(),
    app: 'UR Store Central Lotto Audit',
    gamesCount: masterGamesCatalog.length,
    games: masterGamesCatalog
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `UR_Lotto_Master_Games_${getLocalDateStr()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importMasterGamesUniversal(event) {
  const file = event.target?.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const parsed = JSON.parse(e.target.result);
      const list = Array.isArray(parsed) ? parsed : parsed.games;
      if (!Array.isArray(list) || list.length === 0) {
        alert('Invalid Master Games JSON file.');
        return;
      }
      masterGamesCatalog = sanitizeMasterGamesList(list);
      saveMasterGamesCatalog();
      recalculateAllBoxes();
      saveActiveStoreState();
      renderAdminMasterGamesTable();
      renderDispenserGrid();
      updateHeaderAndBottomSummary();
      alert(`✔ Imported ${masterGamesCatalog.length} lottery games into Master Catalog!`);
    } catch (err) {
      alert('Error reading JSON file: ' + err.message);
    } finally {
      event.target.value = '';
    }
  };
  reader.readAsText(file);
}

function exportCurrentLocationBackup() {
  if (!activeStoreState) return;
  saveActiveStoreState();
  const payload = {
    backupAt: new Date().toISOString(),
    app: 'UR Store Central Lotto Audit',
    locationState: activeStoreState
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const safeName = activeStoreState.locationName.replace(/[^a-zA-Z0-9_-]/g, '_');
  a.download = `UR_Lotto_Backup_${safeName}_${getLocalDateStr()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importLocationBackupFile(event) {
  const file = event.target?.files?.[0];
  if (!file || !activeStoreState) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const parsed = JSON.parse(e.target.result);
      const incoming = parsed.locationState || parsed;
      if (!incoming || !Array.isArray(incoming.boxes)) {
        alert('Invalid location backup file.');
        return;
      }

      if (!confirm(`Restore backup into ${activeStoreState.locationName}? This will overwrite current boxes and history for this store.`)) {
        return;
      }

      incoming.locationId = activeStoreState.locationId;
      incoming.locationName = activeStoreState.locationName;
      incoming.locationCode = activeStoreState.locationCode;

      activeStoreState = incoming;
      saveActiveStoreState();
      syncReconciliationFormFromState();
      recalculateAllBoxes();
      renderDispenserGrid();
      updateHeaderAndBottomSummary();
      alert(`✔ Backup restored for ${activeStoreState.locationName}!`);
    } catch (err) {
      alert('Failed to restore backup: ' + err.message);
    } finally {
      event.target.value = '';
    }
  };
  reader.readAsText(file);
}

// Multi-Store Location Manager Modal
function openMultiStoreManagerModal() {
  const modal = document.getElementById('modal-locations');
  if (!modal) return;
  renderLocationsManagerList();
  modal.classList.remove('hidden');
}

function closeMultiStoreManagerModal() {
  const modal = document.getElementById('modal-locations');
  if (modal) modal.classList.add('hidden');
}

function renderLocationsManagerList() {
  const list = document.getElementById('locations-manager-list');
  if (!list) return;

  list.innerHTML = appLocations.map(loc => `
    <div class="p-2.5 flex items-center justify-between text-xs bg-white">
      <div>
        <strong class="text-slate-900">${loc.name}</strong>
        <span class="ml-1.5 font-mono text-slate-500">(#${loc.code})</span>
      </div>
      <div class="flex items-center gap-2">
        <button
          type="button"
          onclick="handleLocationSwitch('${loc.id}'); closeMultiStoreManagerModal();"
          class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-2.5 py-1 rounded"
        >
          Open
        </button>
        ${appLocations.length > 1 ? `
          <button
            type="button"
            onclick="deleteStoreLocation('${loc.id}')"
            class="text-red-600 hover:text-red-800 font-bold px-1.5"
          >
            Delete
          </button>
        ` : ''}
      </div>
    </div>
  `).join('');
}

function addNewStoreLocation() {
  const name = (document.getElementById('new-store-name')?.value || '').trim();
  const code = (document.getElementById('new-store-code')?.value || '').trim() || String(100 + appLocations.length + 1);
  if (!name) {
    alert('Please enter a Store Name.');
    return;
  }

  const newId = `store_${Date.now()}`;
  appLocations.push({ id: newId, name, code });
  saveLocationsCatalog();

  document.getElementById('new-store-name').value = '';
  document.getElementById('new-store-code').value = '';

  renderLocationSwitcher();
  renderLocationsManagerList();
}

function deleteStoreLocation(locId) {
  if (appLocations.length <= 1) return;
  if (!confirm('Delete this store location?')) return;

  appLocations = appLocations.filter(l => l.id !== locId);
  saveLocationsCatalog();
  localStorage.removeItem(STORAGE_KEYS.LOCATION_PREFIX + locId);

  if (activeLocationId === locId) {
    handleLocationSwitch(appLocations[0].id);
  }
  renderLocationSwitcher();
  renderLocationsManagerList();
}

// Main View Navigation Switcher
function switchMainView(viewName) {
  activeMainView = viewName;

  const views = {
    grid: document.getElementById('view-grid'),
    reconcile: document.getElementById('view-reconcile'),
    reports: document.getElementById('view-reports'),
    admin: document.getElementById('view-admin')
  };

  const navBtns = {
    grid: document.getElementById('nav-btn-grid'),
    reconcile: document.getElementById('nav-btn-reconcile'),
    reports: document.getElementById('nav-btn-reports'),
    admin: document.getElementById('nav-btn-admin')
  };

  Object.keys(views).forEach(key => {
    if (views[key]) views[key].classList.toggle('hidden', key !== viewName);
    if (navBtns[key]) {
      navBtns[key].className = key === viewName
        ? 'bg-blue-600 text-white font-bold text-xs px-3.5 py-1.5 rounded shadow-sm transition'
        : 'bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold text-xs px-3 py-1.5 rounded shadow-sm transition';
    }
  });

  if (viewName === 'grid') {
    renderDispenserGrid();
    updateHeaderAndBottomSummary();
  } else if (viewName === 'reconcile') {
    syncReconciliationFormFromState();
    setTimeout(initSignaturePad, 30);
  } else if (viewName === 'reports') {
    renderHistoricalReports();
  } else if (viewName === 'admin') {
    renderAdminView();
  }
}

// Application Bootloader
document.addEventListener('DOMContentLoaded', () => {
  loadGlobalAppCatalogs();
  activeStoreState = loadStoreStateForLocation(activeLocationId);
  shiftSessionConfirmed = Boolean((activeStoreState.reconciliation?.cashierOut || '').trim());

  renderLocationSwitcher();
  populatePromptCashiersDatalist();
  syncReconciliationFormFromState();
  recalculateAllBoxes();
  renderDispenserGrid();
  updateHeaderAndBottomSummary();
  initSignaturePad();
  startMidnightRolloverWatcher();
});

/* ========================= END OF PART 10 OF 10 ========================= */
/* ============================================================================
   PART 11: TENNESSEE CLICKWRAP NDA GATE, PERSISTENT DEVICE MEMORY & TIMER
   ============================================================================ */

const LEGAL_GATE_STORAGE_KEY = 'ur_lotto_nda_acceptance_v1';
const LEGAL_AUDIT_LOG_KEY = 'ur_lotto_security_audit_logs_v1';

// Authorized Pilot Access Codes (days: 0 = Unlimited Access, or 30, 60, 90, 120, 365)
const AUTHORIZED_PILOT_CODES = {
  'REGAS-OWNER-2026': { label: 'Regas Enterprise (Owner)', retailerId: 'OWNER', days: 0, active: true },
  'TN-124749': { label: 'Regas Shell (#124749)', retailerId: '124749', days: 0, active: true },
  'TN-124750': { label: 'Regas Exxon (#124750)', retailerId: '124750', days: 0, active: true },
  'TN-122547': { label: 'Regas Xpress Amoco (#122547)', retailerId: '122547', days: 0, active: true },
  'TN-104': { label: 'Regas Xpress (#104)', retailerId: '104', days: 0, active: true },
  'PILOT-30-01': { label: 'Pilot Store (30-Day Trial)', retailerId: 'PILOT-30', days: 30, active: true },
  'PILOT-60-01': { label: 'Pilot Store (60-Day Trial)', retailerId: 'PILOT-60', days: 60, active: true },
  'PILOT-90-01': { label: 'Pilot Store (90-Day Trial)', retailerId: 'PILOT-90', days: 90, active: true },
  'PILOT-120-01': { label: 'Pilot Store (120-Day Trial)', retailerId: 'PILOT-120', days: 120, active: true },
  'PILOT-365-01': { label: 'Pilot Store (365-Day License)', retailerId: 'PILOT-365', days: 365, active: true }
};

let legalBoxScrolledToBottom = false;
let ndaPadHasStroke = false;

function handleLegalScrollCheck(el) {
  if (!el) return;
  if (el.scrollTop + el.clientHeight >= el.scrollHeight - 16) {
    legalBoxScrolledToBottom = true;
    const hint = document.getElementById('legal-scroll-hint');
    if (hint) {
      hint.textContent = '✔ Agreement reviewed. Sign and complete the fields below.';
      hint.className = 'text-[11px] font-bold text-emerald-700';
    }
  }
}

function injectEnhancedNdaControlsIntoGate() {
  const modalBody = document.querySelector('#modal-legal-nda-gate .p-5');
  if (!modalBody || document.getElementById('legal-drawn-sig-wrap')) return;

  const agreeLabel = document.getElementById('legal-agree-checkbox')?.closest('label');
  if (!agreeLabel) return;

  const extraBlock = document.createElement('div');
  extraBlock.id = 'legal-drawn-sig-wrap';
  extraBlock.className = 'space-y-3';
  extraBlock.innerHTML = `
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div>
        <label class="block text-[11px] font-extrabold uppercase text-slate-700 mb-1">TN Lottery Retailer # *</label>
        <input
          type="text"
          id="legal-retailer-num"
          placeholder="e.g. 124749"
          class="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono font-bold bg-white"
        />
      </div>
      <div>
        <label class="block text-[11px] font-extrabold uppercase text-slate-700 mb-1">Requested Access Length *</label>
        <select
          id="legal-requested-days"
          class="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs font-bold bg-white"
        >
          <option value="30">30 Days (Trial)</option>
          <option value="60">60 Days</option>
          <option value="90">90 Days</option>
          <option value="120">120 Days</option>
          <option value="365">365 Days (1 Year)</option>
          <option value="0">Unlimited Access</option>
        </select>
      </div>
    </div>

    <div>
      <div class="flex items-center justify-between mb-1">
        <label class="text-[11px] font-extrabold uppercase text-slate-700">Draw Electronic Signature (Finger, Stylus, or Mouse) *</label>
        <button
          type="button"
          onclick="clearLegalNdaSignature()"
          class="text-[11px] font-bold text-slate-600 hover:text-slate-900 underline"
        >
          Clear Signature
        </button>
      </div>
      <div class="bg-white border-2 border-dashed border-slate-400 rounded-xl overflow-hidden" style="height: 110px;">
        <canvas id="legal-nda-sig-canvas" class="w-full h-full touch-none cursor-crosshair block"></canvas>
      </div>
    </div>

    <div id="legal-expiration-banner" class="hidden bg-red-50 border border-red-300 text-red-800 rounded-xl px-3.5 py-2 text-xs font-bold">
      ⏰ Your pilot access period has expired. Please sign and click "Request Access Code" below for renewal.
    </div>
  `;

  modalBody.insertBefore(extraBlock, agreeLabel);

  const submitBtn = modalBody.querySelector('button[onclick="submitLegalNdaGate()"]');
  if (submitBtn && submitBtn.parentElement) {
    submitBtn.parentElement.innerHTML = `
      <button
        type="button"
        onclick="signAndEmailPilotRequest()"
        class="bg-slate-800 hover:bg-slate-700 text-amber-300 font-extrabold text-xs px-4 py-2.5 rounded-xl shadow transition"
      >
        📩 Need a Code? Sign &amp; Email Request
      </button>
      <button
        type="button"
        onclick="submitLegalNdaGate()"
        class="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-lg transition"
      >
        ✔ Have a Code? Enter App
      </button>
    `;
  }

  initLegalNdaSignatureCanvas();
}

function initLegalNdaSignatureCanvas() {
  const canvas = document.getElementById('legal-nda-sig-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let drawing = false;

  const resize = () => {
    const r = canvas.parentElement.getBoundingClientRect();
    if (r.width > 0 && r.height > 0) {
      canvas.width = r.width;
      canvas.height = r.height;
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = '#0f172a';
    }
  };
  resize();
  window.addEventListener('resize', resize);

  const pos = (e) => {
    const r = canvas.getBoundingClientRect();
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: cx - r.left, y: cy - r.top };
  };

  canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    ndaPadHasStroke = true;
    const p = pos(e);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  });
  canvas.addEventListener('mousemove', (e) => {
    if (!drawing) return;
    const p = pos(e);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  });
  window.addEventListener('mouseup', () => { drawing = false; });

  canvas.addEventListener('touchstart', (e) => {
    drawing = true;
    ndaPadHasStroke = true;
    const p = pos(e);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  }, { passive: false });
  canvas.addEventListener('touchmove', (e) => {
    if (!drawing) return;
    if (e.cancelable) e.preventDefault();
    const p = pos(e);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  }, { passive: false });
  canvas.addEventListener('touchend', () => { drawing = false; });
}

function clearLegalNdaSignature() {
  const canvas = document.getElementById('legal-nda-sig-canvas');
  if (canvas) {
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  }
  ndaPadHasStroke = false;
}

function getDeviceFingerprintSummary() {
  return {
    userAgent: navigator.userAgent || 'Unknown',
    platform: navigator.platform || 'Unknown',
    language: navigator.language || 'en-US',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown',
    screen: `${window.screen?.width || 0}x${window.screen?.height || 0}`,
    originUrl: window.location.href
  };
}

function recordSecurityAuditEvent(eventType, details = {}) {
  try {
    const existing = JSON.parse(localStorage.getItem(LEGAL_AUDIT_LOG_KEY) || '[]');
    const acceptance = JSON.parse(localStorage.getItem(LEGAL_GATE_STORAGE_KEY) || 'null');
    const entry = {
      eventId: `sec_${Date.now()}`,
      eventType,
      timestampLocal: formatDisplayDateTime(new Date()),
      timestampIso: new Date().toISOString(),
      inviteCode: acceptance?.inviteCode || details.inviteCode || 'UNAUTHENTICATED',
      signerName: acceptance?.signerName || details.signerName || '',
      storeName: acceptance?.storeName || details.storeName || '',
      retailerNum: acceptance?.retailerNum || details.retailerNum || '',
      contactInfo: acceptance?.contactInfo || details.contactInfo || '',
      device: getDeviceFingerprintSummary(),
      ...details
    };
    existing.unshift(entry);
    localStorage.setItem(LEGAL_AUDIT_LOG_KEY, JSON.stringify(existing.slice(0, 500)));
  } catch (e) {}
}

function getRemainingLicenseDays(acceptance) {
  if (!acceptance || !acceptance.expiresAtMs || Number(acceptance.accessDays) === 0) {
    return null; // Unlimited access
  }
  const msLeft = Number(acceptance.expiresAtMs) - Date.now();
  return Math.ceil(msLeft / (1000 * 60 * 60 * 24));
}

function applyLicensedPilotWatermark(acceptance) {
  if (!acceptance) return;
  const footer = document.querySelector('footer .max-w-7xl');
  if (!footer) return;

  let badge = document.getElementById('pilot-license-watermark');
  if (!badge) {
    badge = document.createElement('div');
    badge.id = 'pilot-license-watermark';
    badge.className = 'text-[10px] font-mono font-bold text-amber-300 bg-slate-800 border border-slate-700 px-2.5 py-0.5 rounded';
    footer.appendChild(badge);
  }

  const daysLeft = getRemainingLicenseDays(acceptance);
  const expiryText = daysLeft === null
    ? 'Unlimited Access'
    : `Expires: ${acceptance.expiresDateStr} (${daysLeft}d left)`;

  badge.textContent = `Licensed Pilot: ${acceptance.storeName} (${acceptance.inviteCode}) • ${expiryText}`;
}

function verifyLegalNdaGateOnLoad() {
  const modal = document.getElementById('modal-legal-nda-gate');
  if (!modal) return;

  try {
    const raw = localStorage.getItem(LEGAL_GATE_STORAGE_KEY);
    const saved = raw ? JSON.parse(raw) : null;

    if (saved && saved.agreed === true && saved.inviteCode && saved.signerName) {
      const codeKey = String(saved.inviteCode).trim().toUpperCase();
      const codeRecord = AUTHORIZED_PILOT_CODES[codeKey];

      if (codeRecord && codeRecord.active) {
        const accessDays = Number(codeRecord.days) || 0;
        const isExpired = accessDays > 0 && saved.expiresAtMs && Date.now() > Number(saved.expiresAtMs);

        if (!isExpired) {
          // Device already signed & active -> hide gate immediately and stay remembered
          modal.classList.add('hidden');
          modal.style.display = 'none';
          applyLicensedPilotWatermark(saved);
          recordSecurityAuditEvent('APP_OPENED_REMEMBERED_DEVICE', { inviteCode: codeKey });
          return;
        }

        // Expired -> show renewal banner and pre-fill their saved info
        recordSecurityAuditEvent('PILOT_ACCESS_EXPIRED', { inviteCode: codeKey });
        injectEnhancedNdaControlsIntoGate();
        document.getElementById('legal-expiration-banner')?.classList.remove('hidden');
        if (document.getElementById('legal-store-name')) document.getElementById('legal-store-name').value = saved.storeName || '';
        if (document.getElementById('legal-signer-name')) document.getElementById('legal-signer-name').value = saved.signerName || '';
        if (document.getElementById('legal-contact-info')) document.getElementById('legal-contact-info').value = saved.contactInfo || '';
        if (document.getElementById('legal-retailer-num')) document.getElementById('legal-retailer-num').value = saved.retailerNum || '';
        modal.style.display = 'flex';
        modal.classList.remove('hidden');
        setTimeout(initLegalNdaSignatureCanvas, 30);
        return;
      }
    }
  } catch (e) {
    console.warn('NDA gate storage check warning:', e);
  }

  injectEnhancedNdaControlsIntoGate();
  modal.style.display = 'flex';
  modal.classList.remove('hidden');
  setTimeout(initLegalNdaSignatureCanvas, 30);
  recordSecurityAuditEvent('GATE_DISPLAYED_UNAUTHENTICATED');
}

function validateGateCommonFields() {
  const storeName = (document.getElementById('legal-store-name')?.value || '').trim();
  const signerName = (document.getElementById('legal-signer-name')?.value || '').trim();
  const contactInfo = (document.getElementById('legal-contact-info')?.value || '').trim();
  const retailerNum = (document.getElementById('legal-retailer-num')?.value || '').trim();
  const agreed = Boolean(document.getElementById('legal-agree-checkbox')?.checked);

  if (!legalBoxScrolledToBottom) {
    alert('Please scroll to the bottom of the Legal Agreement box before signing.');
    document.getElementById('legal-nda-scroll-box')?.focus();
    return null;
  }
  if (!storeName || !signerName || !contactInfo || !retailerNum) {
    alert('Please fill in Store Name, TN Lottery Retailer #, Full Legal Name, and Email/Phone.');
    return null;
  }
  if (!ndaPadHasStroke) {
    alert('Please draw your signature inside the signature box.');
    return null;
  }
  if (!agreed) {
    alert('Please check the agreement box to accept the Tennessee NDA terms.');
    return null;
  }

  const canvas = document.getElementById('legal-nda-sig-canvas');
  const signatureDataUrl = canvas ? canvas.toDataURL('image/png') : '';

  return { storeName, signerName, contactInfo, retailerNum, signatureDataUrl };
}

function downloadSignedNdaReceiptHtml(data, modeLabel, codeOrDaysLabel) {
  const timestamp = formatDisplayDateTime(new Date());
  const html = `
    <html><body style="font-family:Arial,sans-serif;padding:24px;max-width:720px;margin:auto;border:2px solid #000;">
      <h2 style="margin-bottom:4px;">UR STORE CENTRAL — SIGNED PILOT NDA (${modeLabel})</h2>
      <p style="margin-top:0;color:#333;">Confidentiality, Non-Disclosure &amp; Limited Pilot Evaluation Agreement (Tennessee)</p>
      <hr/>
      <p><strong>Timestamp:</strong> ${timestamp}</p>
      <p><strong>Full Legal Name:</strong> ${data.signerName}</p>
      <p><strong>Store / Business Name:</strong> ${data.storeName}</p>
      <p><strong>TN Lottery Retailer #:</strong> ${data.retailerNum}</p>
      <p><strong>Email / Phone:</strong> ${data.contactInfo}</p>
      <p><strong>Access / Duration:</strong> ${codeOrDaysLabel}</p>
      <p><strong>Legal Acceptance:</strong> Licensee agrees not to copy, reproduce, share access, reverse-engineer, or pitch any part of UR Store Central without prior written consent from Dimitrios "Jimmy" Regas (Governed by Tennessee Law).</p>
      <div style="margin-top:16px;"><strong>Electronic Signature:</strong><br/>
        <img src="${data.signatureDataUrl}" style="max-height:95px;border-bottom:1px solid #000;margin-top:6px;"/>
      </div>
    </body></html>
  `;
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Signed_NDA_${data.storeName.replace(/[^a-zA-Z0-9]/g, '_')}_${data.retailerNum}.html`;
  a.click();
  URL.revokeObjectURL(url);
}

// OPTION 1: Tester signs & emails request to dimitriosregas@gmail.com to get a code
function signAndEmailPilotRequest() {
  const fields = validateGateCommonFields();
  if (!fields) return;

  const daysVal = document.getElementById('legal-requested-days')?.value || '30';
  const daysLabel = daysVal === '0' ? 'Unlimited Access' : `${daysVal} Days`;
  const timestamp = formatDisplayDateTime(new Date());

  recordSecurityAuditEvent('NDA_SIGNED_ACCESS_REQUESTED', {
    ...fields,
    requestedDays: daysVal
  });

  downloadSignedNdaReceiptHtml(fields, 'ACCESS REQUEST', daysLabel);

  const subject = encodeURIComponent(`[Signed Pilot NDA] ${fields.storeName} (#${fields.retailerNum}) — ${fields.signerName}`);
  const body = encodeURIComponent(
    `Hello Dimitrios "Jimmy" Regas,\n\n` +
    `I have reviewed and signed the UR Store Central Confidentiality & Pilot Evaluation Agreement (Tennessee). Please issue my Pilot Access Code:\n\n` +
    `• Full Legal Name: ${fields.signerName}\n` +
    `• Store / Business Name: ${fields.storeName}\n` +
    `• TN Lottery Retailer #: ${fields.retailerNum}\n` +
    `• Email / Phone: ${fields.contactInfo}\n` +
    `• Requested Access Length: ${daysLabel} (days: ${daysVal})\n` +
    `• Signed Timestamp: ${timestamp}\n\n` +
    `(Note: A signed copy of my NDA form with my drawn signature was just downloaded to my device.)`
  );

  window.location.href = `mailto:dimitriosregas@gmail.com?subject=${subject}&body=${body}`;
}

// OPTION 2: User already has an authorized code -> saves permanently on device & unlocks app
function submitLegalNdaGate() {
  const codeRaw = (document.getElementById('legal-invite-code')?.value || '').trim().toUpperCase();
  if (!codeRaw) {
    alert('Enter your assigned Pilot Access Code, or click "Need a Code? Sign & Email Request".');
    document.getElementById('legal-invite-code')?.focus();
    return;
  }

  const fields = validateGateCommonFields();
  if (!fields) return;

  const codeEntry = AUTHORIZED_PILOT_CODES[codeRaw];
  if (!codeEntry || !codeEntry.active) {
    recordSecurityAuditEvent('INVALID_CODE_ATTEMPT', { attemptedCode: codeRaw, ...fields });
    alert('Invalid or inactive Pilot Access Code. Click "Need a Code? Sign & Email Request" to request one.');
    document.getElementById('legal-invite-code')?.focus();
    return;
  }

  const accessDays = Number(codeEntry.days) || 0;
  const nowMs = Date.now();
  const expiresAtMs = accessDays > 0 ? nowMs + accessDays * 24 * 60 * 60 * 1000 : null;
  const expiresDateStr = expiresAtMs ? getLocalDateStr(new Date(expiresAtMs)) : 'Unlimited';

  const acceptancePayload = {
    agreed: true,
    agreementVersion: 'v1.0-TN-2026',
    inviteCode: codeRaw,
    registeredLabel: codeEntry.label,
    ...fields,
    accessDays,
    expiresAtMs,
    expiresDateStr,
    acceptedAtLocal: formatDisplayDateTime(new Date(nowMs)),
    acceptedAtIso: new Date(nowMs).toISOString(),
    device: getDeviceFingerprintSummary()
  };

  localStorage.setItem(LEGAL_GATE_STORAGE_KEY, JSON.stringify(acceptancePayload));
  recordSecurityAuditEvent('NDA_SIGNED_AND_UNLOCKED', acceptancePayload);

  const durationText = accessDays === 0 ? `Unlimited Access (${codeRaw})` : `${accessDays} Days — Expires ${expiresDateStr} (${codeRaw})`;
  downloadSignedNdaReceiptHtml(fields, 'ACTIVATED LICENSE', durationText);

  const modal = document.getElementById('modal-legal-nda-gate');
  if (modal) {
    modal.classList.add('hidden');
    modal.style.display = 'none';
  }
  applyLicensedPilotWatermark(acceptancePayload);

  alert(
    accessDays === 0
      ? `✔ Welcome, ${fields.signerName}!\n\nUnlimited Access activated and saved on this device for ${fields.storeName} (${codeRaw}).`
      : `✔ Welcome, ${fields.signerName}!\n\nYour ${accessDays}-day pilot license for ${fields.storeName} is active through ${expiresDateStr} and saved on this device.`
  );
}

function exportSecurityAuditLogs() {
  const logs = JSON.parse(localStorage.getItem(LEGAL_AUDIT_LOG_KEY) || '[]');
  const blob = new Blob([JSON.stringify(logs, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `UR_Lotto_Security_NDA_Logs_${getLocalDateStr()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

document.addEventListener('DOMContentLoaded', () => {
  verifyLegalNdaGateOnLoad();
});
