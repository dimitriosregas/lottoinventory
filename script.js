/* ==========================================================================
   PROJECT LOTTO — CORE JAVASCRIPT LOGIC ENGINE (PART 1 OF 7)
   ========================================================================== */

const STORAGE_KEY_LOCATIONS = 'project_lotto_locations_v1';
const STORAGE_KEY_ACTIVE_LOC = 'project_lotto_active_loc_id_v1';
const STORAGE_KEY_MASTER_GAMES = 'project_lotto_master_games_v1';
const STORAGE_KEY_CASHIERS = 'project_lotto_cashiers_v1';

const DEFAULT_LOCATIONS = [
  { id: 'loc-regas-shell', name: 'Regas Shell', number: '101' },
  { id: 'loc-regas-exxon', name: 'Regas Exxon', number: '102' },
  { id: 'loc-regas-amaco', name: 'Regas Amaco', number: '103' },
  { id: 'loc-regas-xpress', name: 'Regas Xpress', number: '104' }
];

const DEFAULT_CASHIERS = ['Manager', 'John Doe', 'Jane Smith', 'Shift Lead'];

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
  { gameNum: '1762', name: "LUCKY 7'S", price: 1, count: 300 },
  { gameNum: '1802', name: '300X JUMBO', price: 30, count: 20 },
  { gameNum: '1825', name: '$2 JUMBO', price: 2, count: 150 },
  { gameNum: '1851', name: '$1 JR JUMBO', price: 1, count: 300 },
  { gameNum: '1853', name: 'LADY JUMBO', price: 3, count: 100 },
  { gameNum: '1856', name: '$3 CROSSWORD JUMBO', price: 3, count: 100 },
  { gameNum: '1891', name: 'GIGANTIC JUMBO', price: 30, count: 20 },
  { gameNum: '1909', name: '$25 JUMBO', price: 25, count: 24 },
  { gameNum: '1949', name: '$10 JUMBO', price: 10, count: 30 },
  { gameNum: '1964', name: 'MILL JUMBO', price: 20, count: 15 },
  { gameNum: '1996', name: 'GIANT JUMBO', price: 5, count: 60 }
];

let activeLocationId = 'loc-regas-shell';
let locations = [];
let storeProfile = { name: 'Regas Shell', number: '101', address: '', email: 'dimitriosregas@gmail.com', password: '' };
let boxes = [];
let masterGames = [];
let savedCashiers = [];
let isSetupLocked = false;
let currentDispenserView = 'grid';
let currentSignatureDataUrl = null;
let isDrawingSignature = false;
let sigCanvas = null;
let sigCtx = null;
let lastActiveViewName = 'grid';
let globalPrintFontSizePt = 11; // Default 11pt readable size
const STORAGE_KEY_PRINT_FONT_SIZE = 'project_lotto_print_font_size_v1';

function getDefaultRollCountForPrice(price) {
  const p = Number(price);
  if (!p || p <= 0) return 300;
  if (p === 1) return 300;
  if (p === 2) return 150;
  if (p === 3) return 100;
  if (p === 5) return 60;
  if (p === 10) return 30;
  if (p === 20) return 15;
  if (p === 25) return 24;
  if (p === 30) return 20;
  if (p === 50) return 18;
  return Math.max(1, Math.round(300 / p));
}

function createDefault40Boxes() {
  const bList = [];
  for (let i = 1; i <= 40; i++) {
    bList.push({
      boxNumber: String(i),
      gameNum: '',
      gameName: '',
      price: 0,
      rollCount: 60,
      startTicket: 0,
      endTicket: '',
      rollovers: [],
      needsNewGameEntry: false
    });
  }
  return bList;
}

function getStoreBoxesStorageKey(locId) { return `project_lotto_boxes_${locId}`; }
function getStoreProfileStorageKey(locId) { return `project_lotto_profile_${locId}`; }
function getStoreHistoryStorageKey(locId) { return `project_lotto_history_${locId}`; }
function getStoreSetupLockKey(locId) { return `project_lotto_setuplocked_${locId}`; }

function sanitizeMasterGamesList(arr) {
  if (!Array.isArray(arr)) return [];
  const map = new Map();
  arr.forEach(item => {
    const num = String(item.gameNum ?? item.number ?? '').trim();
    if (!num) return;
    const price = Number(item.price) || 1;
    const count = Number(item.count ?? item.rollCount) || getDefaultRollCountForPrice(price);
    const name = String(item.name || '').trim().toUpperCase() || `GAME #${num}`;
    map.set(num, { gameNum: num, name, price, count });
  });
  return Array.from(map.values()).sort((a, b) => Number(a.gameNum) - Number(b.gameNum));
}

function loadMasterGames() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_MASTER_GAMES);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const combined = [...DEFAULT_MASTER_GAMES];
        parsed.forEach(customGame => {
          const num = String(customGame.gameNum ?? '').trim();
          if (num && !combined.some(g => String(g.gameNum).trim() === num)) {
            combined.push(customGame);
          }
        });
        masterGames = sanitizeMasterGamesList(combined);
        saveGamesState();
        return;
      }
    }
  } catch (e) {}
  masterGames = sanitizeMasterGamesList(DEFAULT_MASTER_GAMES);
  saveGamesState();
}

function saveGamesState() {
  try { localStorage.setItem(STORAGE_KEY_MASTER_GAMES, JSON.stringify(masterGames)); } catch (e) {}
}

function loadCashiersList() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CASHIERS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        savedCashiers = parsed;
        return;
      }
    }
  } catch (e) {}
  savedCashiers = [...DEFAULT_CASHIERS];
  saveCashiersState();
}

function saveCashiersState() {
  try { localStorage.setItem(STORAGE_KEY_CASHIERS, JSON.stringify(savedCashiers)); } catch (e) {}
}

function loadLocationsRegistry() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LOCATIONS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        locations = parsed;
        return;
      }
    }
  } catch (e) {}
  locations = [...DEFAULT_LOCATIONS];
  saveLocationsRegistry();
}

function saveLocationsRegistry() {
  try { localStorage.setItem(STORAGE_KEY_LOCATIONS, JSON.stringify(locations)); } catch (e) {}
}

function initActiveLocation() {
  loadLocationsRegistry();
  loadCashiersList();
  const savedActive = localStorage.getItem(STORAGE_KEY_ACTIVE_LOC);
  if (savedActive && locations.some(l => l.id === savedActive)) {
    activeLocationId = savedActive;
  } else {
    activeLocationId = locations[0]?.id || 'loc-regas-shell';
  }
  loadActiveStoreData();
  populateLocationSwitcherDropdown();
}
/* ==========================================================================
   PROJECT LOTTO — CORE JAVASCRIPT LOGIC ENGINE (PART 2 OF 7)
   ========================================================================== */

function loadActiveStoreData() {
  const profKey = getStoreProfileStorageKey(activeLocationId);
  const lockKey = getStoreSetupLockKey(activeLocationId);
  try {
    isSetupLocked = localStorage.getItem(lockKey) === 'true';
  } catch (e) {
    isSetupLocked = false;
  }

  const activeLocObj = locations.find(l => l.id === activeLocationId);
  try {
    const pRaw = localStorage.getItem(profKey);
    if (pRaw) {
      storeProfile = JSON.parse(pRaw);
    } else if (activeLocObj) {
      storeProfile = { name: activeLocObj.name, number: activeLocObj.number, address: activeLocObj.address || '', email: 'dimitriosregas@gmail.com', password: '' };
    } else {
      storeProfile = { name: 'Regas Shell', number: '101', address: '', email: 'dimitriosregas@gmail.com', password: '' };
    }
  } catch (e) {
    storeProfile = { name: activeLocObj?.name || 'Regas Shell', number: activeLocObj?.number || '101', address: '', email: 'dimitriosregas@gmail.com', password: '' };
  }

  const adminName = document.getElementById('admin-store-name');
  const adminNum = document.getElementById('admin-store-number');
  const adminAddr = document.getElementById('admin-store-address');
  const adminEmail = document.getElementById('admin-store-email');
  const adminPass = document.getElementById('admin-store-pass');

  if (adminName) adminName.value = storeProfile.name || '';
  if (adminNum) adminNum.value = storeProfile.number || '';
  if (adminAddr) adminAddr.value = storeProfile.address || '';
  if (adminEmail) adminEmail.value = storeProfile.email || 'dimitriosregas@gmail.com';
  if (adminPass) adminPass.value = storeProfile.password || '';

  const boxKey = getStoreBoxesStorageKey(activeLocationId);
  try {
    const bRaw = localStorage.getItem(boxKey);
    if (bRaw) {
      const parsedBoxes = JSON.parse(bRaw);
      boxes = (Array.isArray(parsedBoxes) && parsedBoxes.length > 0) ? parsedBoxes : createDefault40Boxes();
    } else {
      boxes = createDefault40Boxes();
    }
  } catch (e) {
    boxes = createDefault40Boxes();
  }

  boxes.forEach(b => {
    if (b.gameNum) {
      const matched = masterGames.find(g => String(g.gameNum).trim() === String(b.gameNum).trim());
      if (matched) {
        b.gameName = matched.name;
        b.price = Number(matched.price);
        b.rollCount = Number(matched.count);
        b.needsNewGameEntry = false;
      } else {
        b.needsNewGameEntry = true;
      }
    } else {
      b.needsNewGameEntry = false;
    }
  });

  const subTitle = document.getElementById('header-store-subtitle');
  if (subTitle) subTitle.textContent = `${storeProfile.name} (#${storeProfile.number}) — Shift Audit Matrix`;
  const footStore = document.getElementById('footer-store-display');
  if (footStore) footStore.textContent = `Location: ${storeProfile.name} (#${storeProfile.number})`;

  const badgeElem = document.getElementById('admin-box-count-badge');
  if (badgeElem) badgeElem.textContent = String(boxes.length);

  if (typeof renderDispenserGrid === 'function') renderDispenserGrid();
  if (typeof renderAdminBoxLabelsGrid === 'function') renderAdminBoxLabelsGrid();
  if (typeof renderAdminCashiersTable === 'function') renderAdminCashiersTable();
}

function saveBoxesState() {
  try { localStorage.setItem(getStoreBoxesStorageKey(activeLocationId), JSON.stringify(boxes)); } catch (e) {}
}

function saveActiveStoreProfile() {
  const nameInp = document.getElementById('admin-store-name')?.value?.trim();
  const numInp = document.getElementById('admin-store-number')?.value?.trim();
  const addrInp = document.getElementById('admin-store-address')?.value?.trim() || '';
  const emailInp = document.getElementById('admin-store-email')?.value?.trim() || 'dimitriosregas@gmail.com';
  const passInp = document.getElementById('admin-store-pass')?.value?.trim() || '';

  if (!nameInp) {
    alert('Please enter a valid store location name.');
    return;
  }

  storeProfile.name = nameInp;
  storeProfile.number = numInp || '100';
  storeProfile.address = addrInp;
  storeProfile.email = emailInp;
  storeProfile.password = passInp;

  try { localStorage.setItem(getStoreProfileStorageKey(activeLocationId), JSON.stringify(storeProfile)); } catch (e) {}

  const locIdx = locations.findIndex(l => l.id === activeLocationId);
  if (locIdx >= 0) {
    locations[locIdx].name = storeProfile.name;
    locations[locIdx].number = storeProfile.number;
    locations[locIdx].address = storeProfile.address;
    locations[locIdx].email = storeProfile.email;
    saveLocationsRegistry();
  }

  populateLocationSwitcherDropdown();
  loadActiveStoreData();
  alert(`Store Profile Saved: ${storeProfile.name} (#${storeProfile.number})`);
}

function populateLocationSwitcherDropdown() {
  const select = document.getElementById('location-switcher-select');
  if (!select) return;
  select.innerHTML = locations.map(loc => `
    <option value="${loc.id}" ${loc.id === activeLocationId ? 'selected' : ''}>
      ${loc.name} (${loc.number})
    </option>
  `).join('');
}

function handleLocationSwitch(newLocId) {
  if (!newLocId || newLocId === activeLocationId) return;
  saveBoxesState();
  activeLocationId = newLocId;
  localStorage.setItem(STORAGE_KEY_ACTIVE_LOC, activeLocationId);
  loadActiveStoreData();
  renderDispenserGrid();
  recalculateReconciliationTotals();
}

// ==========================================================================
// CASHIER MANAGEMENT & AUTO-COMPLETE FUNCTIONS
// ==========================================================================
function renderAdminCashiersTable() {
  const tbody = document.getElementById('admin-cashiers-tbody');
  const countEl = document.getElementById('admin-cashiers-count');
  if (countEl) countEl.textContent = String(savedCashiers.length);
  if (!tbody) return;

  if (savedCashiers.length === 0) {
    tbody.innerHTML = `<tr><td colspan="2" class="p-4 text-center text-slate-400">No saved cashiers.</td></tr>`;
    return;
  }

  tbody.innerHTML = savedCashiers.map((name, idx) => `
    <tr class="hover:bg-slate-50 border-b border-slate-100">
      <td class="p-2.5 font-bold text-slate-800">${name}</td>
      <td class="p-2.5 text-center">
        <button type="button" onclick="deleteSavedCashier(${idx})" class="text-red-600 hover:text-red-800 font-bold text-[11px] px-2.5 py-1 rounded bg-red-50">Delete</button>
      </td>
    </tr>
  `).join('');
}

function addNewCashierManual() {
  const inp = document.getElementById('new-cashier-name-input');
  const name = inp?.value?.trim();
  if (!name) { alert('Please enter a cashier name.'); return; }
  if (savedCashiers.includes(name)) { alert('This cashier is already in the saved list.'); return; }

  savedCashiers.push(name);
  saveCashiersState();
  if (inp) inp.value = '';
  renderAdminCashiersTable();
  alert(`Cashier "${name}" added successfully!`);
}

function deleteSavedCashier(idx) {
  if (savedCashiers.length <= 1) { alert('You must keep at least one saved cashier.'); return; }
  savedCashiers.splice(idx, 1);
  saveCashiersState();
  renderAdminCashiersTable();
}

function handleCashierInputAutocomplete(inputId, datalistId) {
  const inp = document.getElementById(inputId);
  if (!inp) return;
  let datalist = document.getElementById(datalistId);
  if (!datalist) {
    datalist = document.createElement('datalist');
    datalist.id = datalistId;
    document.body.appendChild(datalist);
    inp.setAttribute('list', datalistId);
  }
  datalist.innerHTML = savedCashiers.map(c => `<option value="${c}">`).join('');
}
/* ==========================================================================
   PROJECT LOTTO — CORE JAVASCRIPT LOGIC ENGINE (PART 3 OF 7)
   ========================================================================== */

function jumpToNextBoxInput(currentIdx, inputType) {
  const nextIdx = currentIdx + 1;
  if (nextIdx >= boxes.length) return;

  const targetId = currentDispenserView === 'list'
    ? `list-input-${inputType}-${nextIdx}`
    : `input-${inputType}-${nextIdx}`;

  const nextInp = document.getElementById(targetId) || document.getElementById(`input-${inputType}-${nextIdx}`);
  if (nextInp) {
    nextInp.focus();
    setTimeout(() => nextInp.select(), 15);
  }
}

function handleGridEnter(event, currentIdx) {
  if (event.key === 'Enter' || event.keyCode === 13) {
    event.preventDefault();
    commitBoxEndTicket(currentIdx, event.target.value);
    jumpToNextBoxInput(currentIdx, 'endTicket');
  }
}

function handleStartKeydown(event, currentIdx) {
  if (event.key === 'Enter' || event.keyCode === 13) {
    event.preventDefault();
    jumpToNextBoxInput(currentIdx, 'startTicket');
  }
}

function handleGameNumKeydown(event, currentIdx) {
  if (event.key === 'Enter' || event.keyCode === 13) {
    event.preventDefault();
    jumpToNextBoxInput(currentIdx, 'gameNum');
  }
}

function rollNewPackInBox(idx) {
  const box = boxes[idx];
  if (!box || !box.gameNum) {
    alert('Please assign a game number to this box before recording a rollover.');
    return;
  }
  openRolloverDecisionModal(idx, '');
}

function openRolloverDecisionModal(idx, typedEndValue) {
  const box = boxes[idx];
  if (!box) return;

  document.getElementById('modal-roll-box-idx').value = idx;
  document.getElementById('modal-roll-pending-end').value = typedEndValue !== undefined ? typedEndValue : '';
  document.getElementById('modal-rollover-title').textContent = `Box ${box.boxNumber}: ${box.gameName || 'Game #' + box.gameNum}`;
  
  const msgElem = document.getElementById('modal-roll-step1-msg');
  if (typedEndValue !== '') {
    msgElem.innerHTML = `You entered ticket <strong>#${typedEndValue}</strong>, which is lower than the start ticket (<strong>#${box.startTicket}</strong>).<br><br>Did you finish the previous pack and start a new roll?`;
  } else {
    msgElem.innerHTML = `Do you want to finish the current pack in <strong>Box ${box.boxNumber}</strong> and load a new roll starting at #0?`;
  }

  document.getElementById('modal-roll-step-1').classList.remove('hidden');
  document.getElementById('modal-roll-step-2').classList.add('hidden');
  document.getElementById('modal-roll-newgame-section').classList.add('hidden');
  document.getElementById('modal-box-rollover').classList.remove('hidden');
}

function handleRolloverStep1Answer(isYes) {
  const idx = Number(document.getElementById('modal-roll-box-idx').value);
  if (isNaN(idx) || !boxes[idx]) { cancelRolloverModal(); return; }
  if (!isYes) { cancelRolloverModal(); renderDispenserGrid(); return; }
  document.getElementById('modal-roll-step-1').classList.add('hidden');
  document.getElementById('modal-roll-step-2').classList.remove('hidden');
}

function handleRolloverGameChoice(isSameGame) {
  const idx = Number(document.getElementById('modal-roll-box-idx').value);
  if (isNaN(idx) || !boxes[idx]) return;
  if (isSameGame) {
    finalizeRolloverAction(idx, boxes[idx].gameNum);
  } else {
    const sec = document.getElementById('modal-roll-newgame-section');
    sec.classList.remove('hidden');
    const inp = document.getElementById('modal-roll-newgame-input');
    inp.value = '';
    inp.focus();
  }
}

function applyRolloverWithNewGame() {
  const idx = Number(document.getElementById('modal-roll-box-idx').value);
  const newGameNum = document.getElementById('modal-roll-newgame-input').value.trim();
  if (!newGameNum) { alert('Please enter a Game Number.'); return; }
  finalizeRolloverAction(idx, newGameNum);
}

function finalizeRolloverAction(idx, finalGameNum) {
  const box = boxes[idx];
  const pendingEnd = document.getElementById('modal-roll-pending-end').value;
  const price = Number(box.price) || 0;
  const rollCount = Number(box.rollCount) || getDefaultRollCountForPrice(price);
  const maxTicket = Math.max(0, rollCount - 1);
  const start = Number(box.startTicket) || 0;
  
  const oldPackSold = (maxTicket >= start) ? ((maxTicket - start) + 1) : 0;
  const oldPackSales = oldPackSold * price;

  if (!Array.isArray(box.rollovers)) box.rollovers = [];
  box.rollovers.push({
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    date: new Date().toISOString().slice(0, 10),
    gameNum: box.gameNum,
    gameName: box.gameName,
    price: price,
    startTicket: start,
    finishedTicket: maxTicket,
    endTicket: maxTicket,
    ticketsSold: oldPackSold,
    salesAmount: oldPackSales
  });

  if (finalGameNum !== box.gameNum) {
    box.gameNum = finalGameNum;
    const matched = masterGames.find(g => String(g.gameNum).trim() === String(finalGameNum).trim());
    if (matched) {
      box.gameName = matched.name;
      box.price = Number(matched.price);
      box.rollCount = Number(matched.count);
      box.needsNewGameEntry = false;
    } else {
      box.gameName = '';
      box.price = 0;
      box.needsNewGameEntry = true;
    }
  }

  box.startTicket = 0;
  box.endTicket = pendingEnd !== '' ? Number(pendingEnd) : '';
  box.rollsReplaced = (Number(box.rollsReplaced) || 0) + 1;

  saveBoxesState();
  cancelRolloverModal();
  renderDispenserGrid();
  recalculateReconciliationTotals();
}

function undoLastRolloverInBox(idx) {
  const box = boxes[idx];
  if (!box || !Array.isArray(box.rollovers) || box.rollovers.length === 0) {
    alert('No rollovers to undo for this box.');
    return;
  }
  if (!confirm(`Are you sure you want to undo the last rollover for Box ${box.boxNumber}? This will restore the previous roll state.`)) return;

  const lastRo = box.rollovers.pop();
  box.gameNum = lastRo.gameNum;
  box.gameName = lastRo.gameName;
  box.price = lastRo.price;
  box.startTicket = lastRo.startTicket;
  box.endTicket = lastRo.finishedTicket;

  saveBoxesState();
  renderDispenserGrid();
  recalculateReconciliationTotals();
  alert('Rollover successfully undone and restored!');
}

function cancelRolloverModal() {
  document.getElementById('modal-box-rollover').classList.add('hidden');
}

function calculateBoxMetrics(box) {
  if (!box || !box.gameNum) {
    return { ticketsSold: 0, dollarSales: 0, status: 'empty', hasRollover: false, activeTicket: '-' };
  }

  const price = Number(box.price) || 0;
  const start = Number(box.startTicket) || 0;
  const endVal = box.endTicket;
  const rollovers = Array.isArray(box.rollovers) ? box.rollovers : [];
  const rollCount = Number(box.rollCount) || getDefaultRollCountForPrice(price);
  const maxTicketAllowed = Math.max(0, rollCount - 1);

  if (endVal === '' || endVal === undefined || endVal === null) {
    let roSoldOnly = 0;
    rollovers.forEach(ro => { roSoldOnly += Number(ro.ticketsSold) || 0; });
    return { ticketsSold: roSoldOnly, dollarSales: roSoldOnly * price, status: 'pending', hasRollover: rollovers.length > 0, activeTicket: start };
  }

  const end = Number(endVal);
  let ticketsSold = 0;

  if (rollovers.length > 0) {
    rollovers.forEach(ro => { ticketsSold += Number(ro.ticketsSold) || 0; });
    if (end >= start) { ticketsSold += (end - start); }
  } else {
    if (end >= start) { ticketsSold = end - start; }
    else { ticketsSold = 0; }
  }

  ticketsSold = Math.max(0, ticketsSold);
  const dollarSales = ticketsSold * price;

  let status = 'complete';
  if (rollovers.length > 0) status = 'rollover';
  else if (ticketsSold === 0 && end === start) status = 'pending';

  return { ticketsSold, dollarSales, status, hasRollover: rollovers.length > 0, activeTicket: end };
}
/* ==========================================================================
   PROJECT LOTTO — CORE JAVASCRIPT LOGIC ENGINE (PART 4 OF 7)
   ========================================================================== */

function updateBoxFieldDirect(idx, field, val) {
  if (!boxes[idx]) return;
  const cleanVal = String(val).trim();
  boxes[idx][field] = cleanVal === '' ? '' : (field === 'gameNum' ? cleanVal : val);

  if (field === 'gameNum') {
    const found = masterGames.find(g => String(g.gameNum).trim() === cleanVal || (cleanVal !== '' && Number(g.gameNum) === Number(cleanVal)));
    if (found) {
      boxes[idx].gameName = found.name;
      boxes[idx].price = Number(found.price) || 0;
      boxes[idx].rollCount = Number(found.count) || getDefaultRollCountForPrice(boxes[idx].price);
      boxes[idx].needsNewGameEntry = false;
    } else if (cleanVal !== '') {
      boxes[idx].gameName = '';
      boxes[idx].price = 0;
      boxes[idx].needsNewGameEntry = true;
    } else {
      boxes[idx].gameName = '';
      boxes[idx].price = 0;
      boxes[idx].rollCount = 60;
      boxes[idx].needsNewGameEntry = false;
    }
  } else if (field === 'startTicket') {
    boxes[idx].startTicket = cleanVal === '' ? 0 : Number(cleanVal);
  }

  saveBoxesState();
  updateBoxMetricsDisplay(idx);
  updateHeaderTotalsUI();
  recalculateReconciliationTotals();
}

function updateBoxEndTicketLive(idx, val) {
  if (!boxes[idx]) return;
  const box = boxes[idx];
  const clean = String(val).trim();

  if (clean === '') {
    box.endTicket = '';
    saveBoxesState();
    updateBoxMetricsDisplay(idx);
    updateHeaderTotalsUI();
    recalculateReconciliationTotals();
    return;
  }

  const endNum = Number(clean);
  const startNum = Number(box.startTicket) || 0;
  const rollCount = Number(box.rollCount) || getDefaultRollCountForPrice(box.price);
  const maxAllowed = Math.max(0, rollCount - 1);

  if (endNum > maxAllowed) {
    alert(`Invalid ticket number! Ticket cannot exceed the maximum roll limit (${maxAllowed}).`);
    box.endTicket = maxAllowed;
    const inp = document.getElementById(`input-endTicket-${idx}`) || document.getElementById(`list-input-endTicket-${idx}`);
    if (inp) inp.value = maxAllowed;
  } else {
    box.endTicket = endNum;
  }

  if (endNum >= startNum) {
    saveBoxesState();
    updateBoxMetricsDisplay(idx);
    updateHeaderTotalsUI();
    recalculateReconciliationTotals();
  }
}

function commitBoxEndTicket(idx, val) {
  if (!boxes[idx]) return;
  const box = boxes[idx];
  const clean = String(val).trim();

  if (clean === '') {
    box.endTicket = '';
    saveBoxesState();
    updateBoxMetricsDisplay(idx);
    updateHeaderTotalsUI();
    recalculateReconciliationTotals();
    return;
  }

  const endNum = Number(clean);
  const startNum = Number(box.startTicket) || 0;
  const rollCount = Number(box.rollCount) || getDefaultRollCountForPrice(box.price);
  const maxAllowed = Math.max(0, rollCount - 1);

  if (endNum > maxAllowed) {
    box.endTicket = maxAllowed;
  } else if (endNum === startNum) {
    box.endTicket = endNum;
  } else if (endNum < startNum) {
    box.endTicket = endNum;
    openRolloverDecisionModal(idx, endNum);
    return;
  } else {
    box.endTicket = endNum;
  }

  saveBoxesState();
  updateBoxMetricsDisplay(idx);
  updateHeaderTotalsUI();
  recalculateReconciliationTotals();
}

function updateBoxMetricsDisplay(idx) {
  const box = boxes[idx];
  if (!box) return;
  const metrics = calculateBoxMetrics(box);
  const hasGame = Boolean(box.gameNum);
  const rollovers = Array.isArray(box.rollovers) ? box.rollovers : [];

  const card = document.getElementById(`dispenser-card-${idx}`);
  const soldBadge = document.getElementById(`box-sold-badge-${idx}`);
  const salesBadge = document.getElementById(`box-sales-badge-${idx}`);
  const titleEl = document.getElementById(`box-title-${idx}`);
  const subEl = document.getElementById(`box-sub-${idx}`);
  const unknownWrap = document.getElementById(`box-unknown-wrap-${idx}`);

  if (soldBadge) soldBadge.textContent = `${metrics.ticketsSold} Sold`;
  if (salesBadge) salesBadge.textContent = `$${metrics.dollarSales.toFixed(2)}`;
  if (titleEl) titleEl.innerHTML = hasGame ? (box.gameName || 'Game #' + box.gameNum) : '<span class="text-slate-400 italic">Empty Box</span>';
  if (subEl) subEl.textContent = hasGame ? `$${box.price} • ${box.rollCount} tix/pk` : 'Assign game below';
  if (unknownWrap) {
    if (box.needsNewGameEntry) unknownWrap.classList.remove('hidden');
    else unknownWrap.classList.add('hidden');
  }

  if (card) {
    card.classList.remove('status-complete', 'status-rollover', 'status-pending', 'status-alert');
    if (metrics.status === 'complete') card.classList.add('status-complete');
    else if (metrics.status === 'rollover') card.classList.add('status-rollover');
    else card.classList.add('status-pending');
  }

  const listName = document.getElementById(`list-gamename-${idx}`);
  const listPrice = document.getElementById(`list-price-${idx}`);
  const listSold = document.getElementById(`list-sold-${idx}`);
  const listSales = document.getElementById(`list-sales-${idx}`);

  if (listName) {
    const roHistoryHtml = rollovers.map((ro, roIdx) =>
      `<div class="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 rounded px-1.5 py-0.5 mt-1 flex items-center justify-between">
        <span>Prev #${ro.gameNum} (${ro.gameName || 'Pack'}): #${ro.startTicket}→#${ro.finishedTicket} (${ro.ticketsSold} sold = $${Number(ro.salesAmount || 0).toFixed(2)})</span>
        <button type="button" onclick="undoLastRolloverInBox(${idx})" class="text-red-700 underline ml-2 hover:text-red-900">Undo Rollover</button>
      </div>`
    ).join('');
    listName.innerHTML = (hasGame ? `<strong>#${box.gameNum}</strong> ${box.gameName || ''}` : '<span class="text-slate-400 italic">Empty Box</span>') + roHistoryHtml;
  }
  if (listPrice) listPrice.textContent = hasGame && box.price ? '$' + box.price : '-';
  if (listSold) listSold.textContent = `${metrics.ticketsSold}${rollovers.length > 0 ? ' *' : ''}`;
  if (listSales) listSales.textContent = `$${metrics.dollarSales.toFixed(2)}`;
}

function toggleDispenserView() {
  currentDispenserView = currentDispenserView === 'grid' ? 'list' : 'grid';
  const btn = document.getElementById('dispenser-view-toggle-btn');
  if (btn) btn.textContent = currentDispenserView === 'grid' ? '📋 List View' : '🔲 Grid View';
  renderDispenserGrid();
}

function renderDispenserGrid() {
  const container = document.getElementById('dispenser-grid-container');
  if (!container) return;

  if (currentDispenserView === 'list') {
    const rowsHtml = boxes.map((box, idx) => {
      const m = calculateBoxMetrics(box);
      const hasGame = Boolean(box.gameNum);
      const rollovers = Array.isArray(box.rollovers) ? box.rollovers : [];
      const tabGame = 1000 + idx + 1;
      const tabStart = 2000 + idx + 1;
      const tabEnd = 3000 + idx + 1;

      const roHistoryHtml = rollovers.map(ro =>
        `<div class="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 rounded px-1.5 py-0.5 mt-1 flex items-center justify-between">
          <span>Prev #${ro.gameNum} (${ro.gameName || 'Pack'}): #${ro.startTicket}→#${ro.finishedTicket} (${ro.ticketsSold} sold = $${Number(ro.salesAmount || 0).toFixed(2)})</span>
          <button type="button" onclick="undoLastRolloverInBox(${idx})" class="text-red-700 underline ml-2 hover:text-red-900">Undo Rollover</button>
        </div>`
      ).join('');

      return `
        <tr style="border-bottom: 1px solid #e2e8f0; background: #fff;" class="hover:bg-slate-50 transition">
          <td style="padding: 6px 8px; text-align: center; background: #0f172a; font-family: monospace; font-weight: bold; color: #fff;">
            ${box.boxNumber || (idx + 1)}
          </td>
          <td style="padding: 6px 8px; text-align: center; font-family: monospace; font-weight: bold;">
            <input type="text" tabindex="${tabGame}" enterkeyhint="next" id="list-input-gameNum-${idx}" value="${box.gameNum || ''}" oninput="updateBoxFieldDirect(${idx}, 'gameNum', this.value)" onkeydown="handleGameNumKeydown(event, ${idx})" placeholder="Game#" class="w-16 text-center text-xs border border-slate-300 rounded px-1 py-0.5 font-mono lotto-input font-bold" />
          </td>
          <td id="list-gamename-${idx}" style="padding: 6px 8px; font-weight: 600;">
            <div>${hasGame ? `<strong>#${box.gameNum}</strong> ${box.gameName || ''}` + (box.needsNewGameEntry ? ` <button type="button" tabindex="-1" onclick="openQuickGameModal(${idx})" class="ml-1 text-[10px] font-extrabold underline text-blue-700">+ Register</button>` : '') : '<span class="text-slate-400 italic">Empty Box</span>'}</div>
            ${roHistoryHtml}
          </td>
          <td id="list-price-${idx}" style="padding: 6px 8px; text-align: center; font-weight: bold; color: #047857;">${hasGame && box.price ? '$' + box.price : '-'}</td>
          <td style="padding: 6px 8px; text-align: center; font-family: monospace;">
            <input type="number" tabindex="${tabStart}" enterkeyhint="next" id="list-input-startTicket-${idx}" value="${box.startTicket !== '' && box.startTicket !== undefined ? box.startTicket : 0}" oninput="updateBoxFieldDirect(${idx}, 'startTicket', this.value)" onkeydown="handleStartKeydown(event, ${idx})" class="w-16 text-center text-xs border border-slate-300 rounded px-1 py-0.5 font-mono lotto-input" />
          </td>
          <td style="padding: 6px 8px; text-align: center; font-family: monospace;">
            <input type="number" tabindex="${tabEnd}" enterkeyhint="next" id="list-input-endTicket-${idx}" value="${box.endTicket !== '' && box.endTicket !== undefined ? box.endTicket : ''}" oninput="updateBoxEndTicketLive(${idx}, this.value)" onchange="commitBoxEndTicket(${idx}, this.value)" onkeydown="handleGridEnter(event, ${idx})" placeholder="End#" class="w-16 text-center text-xs border border-slate-300 rounded px-1 py-0.5 font-mono font-bold lotto-input" />
          </td>
          <td id="list-sold-${idx}" style="padding: 6px 8px; text-align: center; font-weight: bold;">${m.ticketsSold}${rollovers.length > 0 ? ' *' : ''}</td>
          <td id="list-sales-${idx}" style="padding: 6px 8px; text-align: right; font-family: monospace; font-weight: 900; color: #047857;">$${m.dollarSales.toFixed(2)}</td>
          <td style="padding: 6px 8px; text-align: center;">
            <button type="button" tabindex="-1" onclick="rollNewPackInBox(${idx})" class="text-[10px] bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold px-2 py-1 rounded transition">Roll</button>
          </td>
        </tr>
      `;
    }).join('');

    container.innerHTML = `
      <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden col-span-full">
        <table class="w-full text-xs text-left border-collapse">
          <thead>
            <tr style="background: #f1f5f9; border-bottom: 2px solid #cbd5e1; text-transform: uppercase; font-size: 10px;">
              <th style="padding: 8px; text-align: center; width: 60px;">Box #</th>
              <th style="padding: 8px; text-align: center; width: 80px;">Game #</th>
              <th style="padding: 8px;">Game Name (Current & Rolled)</th>
              <th style="padding: 8px; text-align: center; width: 50px;">Price</th>
              <th style="padding: 8px; text-align: center; width: 80px;">Start</th>
              <th style="padding: 8px; text-align: center; width: 80px;">End</th>
              <th style="padding: 8px; text-align: center; width: 60px;">Sold</th>
              <th style="padding: 8px; text-align: right; width: 90px;">Sales $</th>
              <th style="padding: 8px; text-align: center; width: 60px;">Action</th>
            </tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
        </table>
      </div>
    `;
    updateHeaderTotalsUI();
    return;
  }

  let html = '';
  boxes.forEach((box, idx) => {
    const metrics = calculateBoxMetrics(box);
    const hasGame = Boolean(box.gameNum);
    const rollovers = Array.isArray(box.rollovers) ? box.rollovers : [];
    let statusClass = 'status-pending';
    if (metrics.status === 'complete') statusClass = 'status-complete';
    else if (metrics.status === 'rollover') statusClass = 'status-rollover';

    const tabGame = 1000 + idx + 1;
    const tabStart = 2000 + idx + 1;
    const tabEnd = 3000 + idx + 1;

    const roHistoryHtml = rollovers.map(ro =>
      `<div class="text-[10px] font-bold text-amber-900 bg-amber-50 border border-amber-300 rounded px-2 py-1 mb-1.5 flex items-center justify-between">
        <div>
          <div>Prev: #${ro.gameNum} ${ro.gameName || ''} ($${ro.price})</div>
          <div>Start #${ro.startTicket} → End #${ro.finishedTicket} • ${ro.ticketsSold} Sold ($${Number(ro.salesAmount || 0).toFixed(2)})</div>
        </div>
        <button type="button" onclick="undoLastRolloverInBox(${idx})" class="text-red-700 underline font-extrabold text-[10px] ml-2 hover:text-red-900">Undo</button>
      </div>`
    ).join('');

    html += `
      <div id="dispenser-card-${idx}" class="dispenser-card bg-white rounded-xl border border-slate-200 p-3 shadow-sm flex flex-col justify-between ${statusClass}">
        <div class="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
          <div class="flex items-center gap-2">
            <div class="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-900 text-white font-black text-xs font-mono" title="Slot / Box #">
              ${box.boxNumber || (idx + 1)}
            </div>
            <div class="leading-tight">
              <div id="box-title-${idx}" class="font-bold text-xs text-slate-800 truncate max-w-[140px]">${hasGame ? (box.gameName || 'Game #' + box.gameNum) : '<span class="text-slate-400 italic">Empty Box</span>'}</div>
              <div id="box-sub-${idx}" class="text-[10px] text-slate-500 font-medium">${hasGame ? `$${box.price} • ${box.rollCount} tix/pk` : 'Assign game below'}</div>
            </div>
          </div>
          <button type="button" tabindex="-1" onclick="rollNewPackInBox(${idx})" class="text-[11px] font-bold px-2 py-1 rounded transition border ${rollovers.length > 0 ? 'bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200' : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'}">
            ${rollovers.length > 0 ? `★ ${rollovers.length} Rollover` : 'Roll'}
          </button>
        </div>
        ${roHistoryHtml}
        <div class="space-y-2 mb-2">
          <div class="flex items-center gap-2">
            <label class="text-[10px] font-bold text-slate-500 uppercase w-12">Game #:</label>
            <input type="text" tabindex="${tabGame}" enterkeyhint="next" id="input-gameNum-${idx}" value="${box.gameNum || ''}" placeholder="e.g. 1005" oninput="updateBoxFieldDirect(${idx}, 'gameNum', this.value)" onkeydown="handleGameNumKeydown(event, ${idx})" class="flex-1 text-xs font-mono font-bold border border-slate-300 rounded px-2 py-1 lotto-input" />
          </div>
          <div id="box-unknown-wrap-${idx}" class="${box.needsNewGameEntry ? '' : 'hidden'} p-1.5 bg-red-50 border border-red-200 rounded text-[10px] text-red-700 flex items-center justify-between">
            <span>Unknown Game #</span>
            <button type="button" tabindex="-1" onclick="openQuickGameModal(${idx})" class="font-extrabold underline text-blue-700 hover:text-blue-900">+ Register</button>
          </div>
          <div class="grid grid-cols-2 gap-2 pt-1">
            <div>
              <label class="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">Start #</label>
              <input type="number" tabindex="${tabStart}" enterkeyhint="next" id="input-startTicket-${idx}" value="${box.startTicket !== undefined ? box.startTicket : 0}" oninput="updateBoxFieldDirect(${idx}, 'startTicket', this.value)" onkeydown="handleStartKeydown(event, ${idx})" placeholder="000" class="w-full text-center font-mono font-bold text-xs border border-slate-300 rounded p-1.5 lotto-input" />
            </div>
            <div>
              <label class="block text-[10px] font-bold text-blue-700 uppercase mb-0.5">End #</label>
              <input type="number" tabindex="${tabEnd}" enterkeyhint="next" id="input-endTicket-${idx}" value="${box.endTicket !== '' && box.endTicket !== undefined ? box.endTicket : ''}" oninput="updateBoxEndTicketLive(${idx}, this.value)" onchange="commitBoxEndTicket(${idx}, this.value)" onkeydown="handleGridEnter(event, ${idx})" placeholder="000" class="w-full text-center font-mono font-bold text-xs border-2 border-blue-400 rounded p-1.5 lotto-input" />
            </div>
          </div>
        </div>
        <div class="bg-slate-50 rounded-lg p-2 border border-slate-200 flex items-center justify-between text-xs mt-1">
          <span id="box-sold-badge-${idx}" class="font-mono font-bold text-slate-700">${metrics.ticketsSold} Sold</span>
          <span id="box-sales-badge-${idx}" class="font-mono font-black text-emerald-700">$${metrics.dollarSales.toFixed(2)}</span>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
  updateHeaderTotalsUI();
}

function updateHeaderTotalsUI() {
  let totalTickets = 0;
  let totalSales = 0;
  boxes.forEach(box => {
    const m = calculateBoxMetrics(box);
    totalTickets += m.ticketsSold;
    totalSales += m.dollarSales;
  });
  const tElem = document.getElementById('header-total-tickets');
  const sElem = document.getElementById('header-total-sales');
  if (tElem) tElem.textContent = totalTickets.toLocaleString();
  if (sElem) sElem.textContent = `$${totalSales.toFixed(2)}`;
}
/* ==========================================================================
   PROJECT LOTTO — CORE JAVASCRIPT LOGIC ENGINE (PART 5 OF 7)
   ========================================================================== */

function openWorksheetPrintChoiceModal() {
  const modal = document.getElementById('modal-print-worksheet-choice') || createPrintChoiceModalDOM();
  handleCashierInputAutocomplete('print-modal-cashier-input', 'cashier-datalist-print');
  const activeCashier = document.getElementById('rec-cashier-out')?.value || document.getElementById('grid-cashier-input')?.value || '';
  
  const cashierInp = document.getElementById('print-modal-cashier-input');
  if (cashierInp && !cashierInp.value) cashierInp.value = activeCashier;

  modal.classList.remove('hidden');
  setTimeout(() => initPrintModalSignaturePad(), 100);
}

function createPrintChoiceModalDOM() {
  let existing = document.getElementById('modal-print-worksheet-choice');
  if (existing) return existing;

  const div = document.createElement('div');
  div.id = 'modal-print-worksheet-choice';
  div.className = 'fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 hidden';
  div.innerHTML = `
    <div class="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden p-6 space-y-4 max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 class="font-black text-slate-900 text-base">🖨 Print Shift Worksheet & Attestation</h3>
        <button type="button" onclick="document.getElementById('modal-print-worksheet-choice').classList.add('hidden')" class="text-slate-400 hover:text-slate-600 font-bold">✕</button>
      </div>
      
      <div class="space-y-3 text-xs">
        <div>
          <label class="block font-bold text-slate-700 mb-1">Cashier Name:</label>
          <input type="text" id="print-modal-cashier-input" placeholder="Enter cashier name..." class="w-full border border-slate-300 rounded-lg p-2 font-bold text-xs" />
        </div>
        <div>
          <label class="block font-bold text-slate-700 mb-1">Shift:</label>
          <select id="print-modal-shift-select" class="w-full border border-slate-300 rounded-lg p-2 font-bold text-xs bg-white">
            <option value="Shift 1 (Morning)">Shift 1 (Morning)</option>
            <option value="Shift 2 (Evening)">Shift 2 (Evening)</option>
            <option value="Shift 3 (Night)">Shift 3 (Night)</option>
          </select>
        </div>

        <!-- Signature Canvas ABOVE Attestation -->
        <div class="space-y-1 pt-1">
          <div class="flex items-center justify-between">
            <label class="block font-bold text-slate-700">Cashier Signature (Sign below):</label>
            <button type="button" onclick="clearPrintModalSignature()" class="text-xs text-red-600 hover:underline font-bold">Clear Sign</button>
          </div>
          <div class="border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 p-1 flex justify-center">
            <canvas id="print-modal-sig-pad" width="400" height="100" class="w-full h-24 touch-none bg-white rounded-lg cursor-crosshair"></canvas>
          </div>
        </div>

        <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-700 leading-relaxed font-medium">
          ⚖ <strong>Legal Attestation:</strong> "I hereby certify that the ticket counts, game numbers, and shift totals recorded are true, complete, and accurate to the best of my knowledge."
        </div>
      </div>

      <div class="space-y-2 pt-2">
        <button type="button" onclick="executeUnifiedPrint('thermal')" class="w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-2.5 rounded-xl text-xs transition shadow-md">
          📜 Print 80mm Thermal Receipt
        </button>
        <button type="button" onclick="executeUnifiedPrint('legal')" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-2.5 rounded-xl text-xs transition shadow-md">
          📄 Print Full Legal Paper (8.5" x 11")
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(div);
  return div;
}

let printModalSigCanvas = null;
let printModalSigCtx = null;
let isDrawingPrintSig = false;
let printModalSigDataUrl = null;

function initPrintModalSignaturePad() {
  printModalSigCanvas = document.getElementById('print-modal-sig-pad');
  if (!printModalSigCanvas) return;
  printModalSigCtx = printModalSigCanvas.getContext('2d');
  printModalSigCtx.strokeStyle = '#0f172a';
  printModalSigCtx.lineWidth = 2.2;
  printModalSigCtx.lineCap = 'round';

  const getPos = (e) => {
    const rect = printModalSigCanvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (printModalSigCanvas.width / rect.width),
      y: (clientY - rect.top) * (printModalSigCanvas.height / rect.height)
    };
  };

  const startDraw = (e) => { e.preventDefault(); isDrawingPrintSig = true; const pos = getPos(e); printModalSigCtx.beginPath(); printModalSigCtx.moveTo(pos.x, pos.y); };
  const moveDraw = (e) => { if (!isDrawingPrintSig) return; e.preventDefault(); const pos = getPos(e); printModalSigCtx.lineTo(pos.x, pos.y); printModalSigCtx.stroke(); };
  const endDraw = () => { if (!isDrawingPrintSig) return; isDrawingPrintSig = false; printModalSigDataUrl = printModalSigCanvas.toDataURL('image/png'); };

  printModalSigCanvas.addEventListener('mousedown', startDraw);
  printModalSigCanvas.addEventListener('mousemove', moveDraw);
  window.addEventListener('mouseup', endDraw);
  printModalSigCanvas.addEventListener('touchstart', startDraw, { passive: false });
  printModalSigCanvas.addEventListener('touchmove', moveDraw, { passive: false });
  window.addEventListener('touchend', endDraw);
}

function clearPrintModalSignature() {
  if (!printModalSigCanvas || !printModalSigCtx) return;
  printModalSigCtx.clearRect(0, 0, printModalSigCanvas.width, printModalSigCanvas.height);
  printModalSigDataUrl = null;
}

function executeUnifiedPrint(formatChoice) {
  const cashierVal = document.getElementById('print-modal-cashier-input')?.value?.trim() || 'Unspecified';
  const shiftVal = document.getElementById('print-modal-shift-select')?.value || 'Shift 1 (Morning)';

  const recCashier = document.getElementById('rec-cashier-out');
  if (recCashier) recCashier.value = cashierVal;
  const gridCashier = document.getElementById('grid-cashier-input');
  if (gridCashier) gridCashier.value = cashierVal;
  const recShift = document.getElementById('rec-shift-type');
  if (recShift) recShift.value = shiftVal;
  if (printModalSigDataUrl) currentSignatureDataUrl = printModalSigDataUrl;

  document.getElementById('modal-print-worksheet-choice').classList.add('hidden');
  
  // 1. Generate Print directly via DOM container (Zero blank windows/tabs)
  if (formatChoice === 'thermal') {
    printThermalReceiptDirect();
  } else {
    printWorksheetDirect();
  }

  // 2. Silent Background Auto-Backup
  downloadFullTabletBackup(true);

  // 3. End-shift prompt
  setTimeout(() => {
    if (confirm('Worksheet printed and system backed up successfully in the background!\n\nWould you like to end the shift and start a new shift now?')) {
      advanceEndToStartForNewShift();
    } else {
      switchMainView(lastActiveViewName || 'grid');
    }
  }, 600);
}

function printThermalReceiptDirect() {
  const { jsPDF } = window.jspdf;
  if (!jsPDF) {
    alert('jsPDF library is still loading. Please try again in a moment.');
    return;
  }

  const totals = recalculateReconciliationTotals();
  const dateStr = document.getElementById('rec-report-date')?.value || new Date().toLocaleDateString();
  const shiftStr = document.getElementById('rec-shift-type')?.value || 'Shift 1';
  const cashierStr = document.getElementById('print-modal-cashier-input')?.value || document.getElementById('grid-cashier-input')?.value || 'Manager';
  const storeAddr = storeProfile.address || 'Sparta, TN 38583';

  // Count active boxes to calculate exact receipt length
  let activeItemsCount = 0;
  boxes.forEach(b => { if (b.gameNum) activeItemsCount++; });
  const dynamicHeightMm = Math.max(140, 90 + (activeItemsCount * 14) + (currentSignatureDataUrl ? 35 : 0));

  // Initialize jsPDF strictly for 3 1/8" (80mm) thermal roll width
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: [80, dynamicHeightMm]
  });

  const basePt = Number(globalPrintFontSizePt) || 13;
  let y = 6;
  const pageWidth = 80;
  const margin = 4;

  // Store Header (Matching your photo)
  doc.setFont('Courier', 'bold');
  doc.setFontSize(basePt + 3);
  doc.text(`${storeProfile.name}`, pageWidth / 2, y, { align: 'center' });
  y += 5;

  doc.setFontSize(basePt + 1);
  doc.text(`STORE #${storeProfile.number}`, pageWidth / 2, y, { align: 'center' });
  y += 4;

  if (storeAddr) {
    doc.setFontSize(basePt - 2);
    doc.text(storeAddr, pageWidth / 2, y, { align: 'center' });
    y += 4;
  }

  doc.setFontSize(basePt);
  doc.text('*** LOTTO COUNT WORKSHEET ***', pageWidth / 2, y, { align: 'center' });
  y += 6;

  // Metadata block
  doc.setFontSize(basePt - 1);
  doc.text(`DATE: ${dateStr}`, margin, y);
  y += 4;
  doc.text(`SHIFT: ${shiftStr}`, margin, y);
  y += 4;
  doc.text(`OUT: ${cashierStr}`, margin, y);
  y += 4;
  doc.text(`IN: -`, margin, y);
  y += 5;

  doc.setLineDash([0.5, 0.5], 0);
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;

  // Active Boxes (Exact 2-Line Format with dashed separator lines between each box)
  doc.setFontSize(basePt - 1);
  boxes.forEach((box) => {
    const m = calculateBoxMetrics(box);
    if (box.gameNum) {
      const gName = String(box.gameName || 'GAME #' + box.gameNum).toUpperCase();
      
      // Top Line: [BOX X] #GAME_NUM GAME_NAME     $PRICE
      doc.text(`[BOX ${box.boxNumber}] #${box.gameNum} ${gName}`, margin, y);
      doc.text(`$${box.price}`, pageWidth - margin, y, { align: 'right' });
      y += 4.5;

      // Bottom Line: Start:XX End:XX                 X Sold ($XX.00)
      const endDisplay = box.endTicket !== '' && box.endTicket !== undefined ? box.endTicket : '_____';
      const soldText = `${m.ticketsSold} Sold ($${m.dollarSales.toFixed(2)})`;
      doc.text(`Start:${box.startTicket !== '' ? box.startTicket : 0}  End:${endDisplay}`, margin, y);
      doc.text(soldText, pageWidth - margin, y, { align: 'right' });
      y += 4;

      // Dashed separator between boxes (matching your reference photo)
      doc.setFontSize(basePt - 3);
      doc.text('-----------------------------------------------------------------', pageWidth / 2, y, { align: 'center' });
      doc.setFontSize(basePt - 1);
      y += 5.5;
    }
  });

  doc.line(margin, y, pageWidth - margin, y);
  y += 5;

  // Totals & Variance Summary Block
  doc.setFont('Courier', 'bold');
  doc.setFontSize(basePt);
  
  const drawTotalLine = (label, val) => {
    doc.text(label, margin, y);
    doc.text(val, pageWidth - margin, y, { align: 'right' });
    y += 5;
  };

  drawTotalLine('TOTAL TICKETS SOLD:', String(totals.totalTickets || 0));
  drawTotalLine('SCRATCH SALES:', `$${totals.scratchSales.toFixed(2)}`);
  drawTotalLine('ONLINE SALES:', `$${totals.onlineSales.toFixed(2)}`);
  drawTotalLine('SCRATCH CASHED:', `-$${totals.scratchCashed.toFixed(2)}`);
  drawTotalLine('ONLINE CASHED:', `-$${totals.onlineCashed.toFixed(2)}`);
  
  y += 2;
  doc.line(margin, y, pageWidth - margin, y);
  y += 5;

  drawTotalLine('EXPECTED NET:', `$${totals.expectedNet.toFixed(2)}`);
  drawTotalLine('POS ACTUAL:', `$${totals.posActual.toFixed(2)}`);
  
  doc.setFontSize(basePt + 2);
  drawTotalLine('VARIANCE:', `$${totals.variance.toFixed(2)}`);
  y += 6;

  // Signature Block
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;
  doc.setFontSize(basePt);
  doc.text('CASHIER SIGNATURE', pageWidth / 2, y, { align: 'center' });
  y += 4;

  if (currentSignatureDataUrl) {
    try {
      doc.addImage(currentSignatureDataUrl, 'PNG', (pageWidth - 45) / 2, y, 45, 16);
      y += 19;
    } catch (e) {
      doc.text('___________________________', pageWidth / 2, y, { align: 'center' });
      y += 6;
    }
  } else {
    doc.text('___________________________', pageWidth / 2, y, { align: 'center' });
    y += 6;
  }

  doc.setFontSize(basePt - 2);
  doc.text(new Date().toLocaleString(), pageWidth / 2, y, { align: 'center' });

// Automatically save and download a permanent digital copy to your device with timestamp
  const pdfBlob = doc.output('blob');
  const pdfUrl = URL.createObjectURL(pdfBlob);
  
  const timestampStr = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 16);
  const downloadLink = document.createElement('a');
  downloadLink.href = pdfUrl;
  downloadLink.download = `LottoReceipt_${storeProfile.number}_${timestampStr}.pdf`;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  
  setTimeout(() => URL.revokeObjectURL(pdfUrl), 3000);
}

function renderMainGridCashierShiftBar() {
  let bar = document.getElementById('main-grid-cashier-shift-bar');
  if (!bar) {
    const container = document.getElementById('view-grid');
    if (!container) return;
    bar = document.createElement('div');
    bar.id = 'main-grid-cashier-shift-bar';
    bar.className = 'bg-white rounded-xl shadow-sm border border-slate-200 p-3 mb-4 flex flex-wrap items-center justify-between gap-3 text-xs';
    container.insertBefore(bar, container.firstChild);
  }

  const currentCashier = document.getElementById('rec-cashier-out')?.value || '';
  const currentShift = document.getElementById('rec-shift-type')?.value || 'Shift 1 (Morning)';

  bar.innerHTML = `
    <div class="flex items-center gap-3 flex-1 min-w-[280px]">
      <div class="flex items-center gap-1.5 flex-1">
        <label class="font-bold text-slate-600 uppercase text-[10px]">Cashier:</label>
        <input type="text" id="grid-cashier-input" value="${currentCashier}" placeholder="Select or type cashier..." oninput="syncMainGridCashier(this.value)" class="flex-1 border border-slate-300 rounded-lg px-2.5 py-1.5 font-bold text-xs bg-slate-50 focus:bg-white" />
      </div>
      <div class="flex items-center gap-1.5">
        <label class="font-bold text-slate-600 uppercase text-[10px]">Shift:</label>
        <select id="grid-shift-select" onchange="syncMainGridShift(this.value)" class="border border-slate-300 rounded-lg px-2.5 py-1.5 font-bold text-xs bg-white">
          <option value="Shift 1 (Morning)" ${currentShift.includes('Morning') || currentShift.includes('1') ? 'selected' : ''}>Shift 1 (Morning)</option>
          <option value="Shift 2 (Evening)" ${currentShift.includes('Evening') || currentShift.includes('2') ? 'selected' : ''}>Shift 2 (Evening)</option>
          <option value="Shift 3 (Night)" ${currentShift.includes('Night') || currentShift.includes('3') ? 'selected' : ''}>Shift 3 (Night)</option>
        </select>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <button type="button" onclick="openWorksheetPrintChoiceModal()" class="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-3 py-1.5 rounded-lg shadow-sm transition">
        🖨 Print Worksheet...
      </button>
    </div>
  `;
  handleCashierInputAutocomplete('grid-cashier-input', 'cashier-datalist-grid');
}

function syncMainGridCashier(val) {
  const rec = document.getElementById('rec-cashier-out');
  if (rec) rec.value = val;
  saveReconciliationDraft();
}

function syncMainGridShift(val) {
  const rec = document.getElementById('rec-shift-type');
  if (rec) {
    rec.value = val;
    handleShiftTypeChange(val);
  }
}

function openQuickGameModal(idx) {
  const box = boxes[idx];
  if (!box) return;
  document.getElementById('quick-game-box-idx').value = idx;
  document.getElementById('quick-game-num').value = box.gameNum;
  document.getElementById('quick-game-name').value = '';
  document.getElementById('quick-game-price').value = '5';
  document.getElementById('quick-game-count').value = '60';
  document.getElementById('modal-quick-game').classList.remove('hidden');
}

function closeQuickGameModal() {
  document.getElementById('modal-quick-game').classList.add('hidden');
}

function saveQuickRegisteredGame() {
  const idx = Number(document.getElementById('quick-game-box-idx').value);
  if (isNaN(idx) || !boxes[idx]) return;
  const gNum = document.getElementById('quick-game-num').value.trim();
  const gName = (document.getElementById('quick-game-name').value.trim() || `GAME #${gNum}`).toUpperCase();
  const price = Number(document.getElementById('quick-game-price').value) || 1;
  const count = Number(document.getElementById('quick-game-count').value) || getDefaultRollCountForPrice(price);

  const newEntry = { gameNum: gNum, name: gName, price, count };
  const existIdx = masterGames.findIndex(g => String(g.gameNum).trim() === gNum);
  if (existIdx >= 0) masterGames[existIdx] = newEntry;
  else masterGames.push(newEntry);

  masterGames = sanitizeMasterGamesList(masterGames);
  saveGamesState();

  boxes[idx].gameName = gName;
  boxes[idx].price = price;
  boxes[idx].rollCount = count;
  boxes[idx].needsNewGameEntry = false;
  saveBoxesState();

  closeQuickGameModal();
  renderAdminGamesTable();
  renderDispenserGrid();
  recalculateReconciliationTotals();
}

function openMultiStoreManagerModal() {
  renderMultiStoreModalList();
  document.getElementById('modal-multi-store').classList.remove('hidden');
}

function closeMultiStoreManagerModal() {
  document.getElementById('modal-multi-store').classList.add('hidden');
}

function renderMultiStoreModalList() {
  const tbody = document.getElementById('multi-store-list-tbody');
  if (!tbody) return;
  tbody.innerHTML = locations.map(loc => {
    const isCurrent = loc.id === activeLocationId;
    return `
      <tr class="${isCurrent ? 'bg-blue-50/70' : 'hover:bg-slate-50'}">
        <td class="p-2.5 space-y-0.5">
          <div class="font-extrabold text-slate-900">${loc.name} (#${loc.number})</div>
          <div class="text-[11px] text-slate-600">${loc.address || 'No address set'}</div>
        </td>
        <td class="p-2.5 text-center">
          ${isCurrent ? '<span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800">Active</span>' : '<span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600">Standby</span>'}
        </td>
        <td class="p-2.5 text-right space-x-1">
          ${!isCurrent ? `<button type="button" onclick="switchStoreFromModal('${loc.id}')" class="bg-blue-600 text-white text-[11px] px-2.5 py-1 rounded">Switch</button>` : ''}
          <button type="button" onclick="exportSpecificLocationBackup('${loc.id}')" class="bg-slate-700 text-white text-[11px] px-2.5 py-1 rounded">⬇ Store</button>
          <button type="button" onclick="deleteStoreLocation('${loc.id}')" class="bg-red-100 text-red-700 text-[11px] px-2 py-1 rounded">Delete</button>
        </td>
      </tr>
    `;
  }).join('');
}

function switchStoreFromModal(locId) {
  handleLocationSwitch(locId);
  populateLocationSwitcherDropdown();
  renderMultiStoreModalList();
}

function createNewStoreLocation() {
  const name = document.getElementById('new-location-name-input')?.value?.trim();
  const number = document.getElementById('new-location-num-input')?.value?.trim() || '100';
  const address = document.getElementById('new-location-address-input')?.value?.trim() || '';

  if (!name) { alert('Please enter a store name.'); return; }
  const cleanSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const newId = `loc-${cleanSlug}-${Date.now().toString().slice(-4)}`;
  locations.push({ id: newId, name, number, address, email: 'dimitriosregas@gmail.com' });
  saveLocationsRegistry();

  localStorage.setItem(getStoreProfileStorageKey(newId), JSON.stringify({ name, number, address, email: 'dimitriosregas@gmail.com' }));
  localStorage.setItem(getStoreBoxesStorageKey(newId), JSON.stringify(createDefault40Boxes()));
  localStorage.setItem(getStoreHistoryStorageKey(newId), JSON.stringify([]));

  handleLocationSwitch(newId);
  renderMultiStoreModalList();
  alert(`Created and switched to new store: ${name}`);
}

function deleteStoreLocation(locId) {
  if (locations.length <= 1) { alert('You must keep at least one store location.'); return; }
  if (!confirm('Are you sure you want to delete this store location?')) return;
  locations = locations.filter(l => l.id !== locId);
  saveLocationsRegistry();
  if (activeLocationId === locId) {
    activeLocationId = locations[0].id;
    localStorage.setItem(STORAGE_KEY_ACTIVE_LOC, activeLocationId);
    loadActiveStoreData();
  }
  renderMultiStoreModalList();
  populateLocationSwitcherDropdown();
}
/* ==========================================================================
   PROJECT LOTTO — CORE JAVASCRIPT LOGIC ENGINE (PART 6 OF 7)
   ========================================================================== */

function buildFullTabletBackupPayload() {
  saveBoxesState();
  saveReconciliationDraft();

  const allStoresData = {};
  locations.forEach(loc => {
    let locProfile = { name: loc.name, number: loc.number, address: loc.address || '', email: loc.email || 'dimitriosregas@gmail.com' };
    let locBoxes = [];
    let locHistory = [];
    let locDraft = null;
    try {
      const pRaw = localStorage.getItem(getStoreProfileStorageKey(loc.id));
      if (pRaw) locProfile = JSON.parse(pRaw);
    } catch (e) {}
    try {
      const bRaw = localStorage.getItem(getStoreBoxesStorageKey(loc.id));
      if (bRaw) locBoxes = JSON.parse(bRaw);
    } catch (e) {}
    try {
      const hRaw = localStorage.getItem(getStoreHistoryStorageKey(loc.id));
      if (hRaw) locHistory = JSON.parse(hRaw);
    } catch (e) {}
    try {
      const dRaw = localStorage.getItem(`project_lotto_recdraft_${loc.id}`);
      if (dRaw) locDraft = JSON.parse(dRaw);
    } catch (e) {}

    allStoresData[loc.id] = {
      profile: locProfile,
      boxes: locBoxes.length > 0 ? locBoxes : (loc.id === activeLocationId ? boxes : createDefault40Boxes()),
      historicalReports: locHistory,
      reconciliationDraft: locDraft
    };
  });

  return {
    backupVersion: '3.0-FULL-TABLET',
    exportedAt: new Date().toISOString(),
    targetEmail: 'dimitriosregas@gmail.com',
    activeLocationId,
    locations,
    masterGames: sanitizeMasterGamesList(masterGames),
    savedCashiers,
    storesData: allStoresData
  };
}

// Completely silent background backup (stored in local IndexedDB/localStorage rolling cache without popup prompts)
function executeSilentBackgroundBackup(slotLabel = 'MANUAL') {
  const payload = buildFullTabletBackupPayload();
  try {
    localStorage.setItem('project_lotto_latest_silent_snapshot', JSON.stringify(payload));
    localStorage.setItem('project_lotto_last_backup_timestamp', `${new Date().toLocaleString()} (${slotLabel})`);
  } catch (e) {}
  return payload;
}

function downloadFullTabletBackup(silent = true) {
  const payload = executeSilentBackgroundBackup(silent ? 'AUTO' : 'MANUAL');
  if (!silent) {
    const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 16);
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `ProjectLotto_Backup_${stamp}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }
  return payload;
}

function exportCurrentLocationBackup() {
  downloadFullTabletBackup(false);
}

function exportSpecificLocationBackup(locId) {
  const locObj = locations.find(l => l.id === locId) || { name: storeProfile.name, number: storeProfile.number };
  let locBoxes = [];
  let locHistory = [];
  try { locBoxes = JSON.parse(localStorage.getItem(getStoreBoxesStorageKey(locId)) || '[]'); } catch (e) {}
  try { locHistory = JSON.parse(localStorage.getItem(getStoreHistoryStorageKey(locId)) || '[]'); } catch (e) {}

  const payload = {
    backupVersion: '3.0-SINGLE-STORE',
    exportedAt: new Date().toISOString(),
    locationId: locId,
    storeProfile: { name: locObj.name, number: locObj.number, address: locObj.address || '' },
    boxes: locBoxes.length > 0 ? locBoxes : boxes,
    masterGames: sanitizeMasterGamesList(masterGames),
    savedCashiers,
    historicalReports: locHistory
  };

  const safeName = (locObj.name || 'store').replace(/[^a-zA-Z0-9_-]/g, '_');
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = `LottoBackup_${safeName}_${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

function importLocationBackupFile(event) {
  const file = event?.target?.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);

      if (Array.isArray(data.masterGames) && data.masterGames.length > 0) {
        masterGames = sanitizeMasterGamesList([...masterGames, ...data.masterGames]);
        saveGamesState();
      }
      if (Array.isArray(data.savedCashiers) && data.savedCashiers.length > 0) {
        savedCashiers = Array.from(new Set([...savedCashiers, ...data.savedCashiers]));
        saveCashiersState();
      }

      if (data.storesData && typeof data.storesData === 'object') {
        if (Array.isArray(data.locations) && data.locations.length > 0) {
          locations = data.locations;
          saveLocationsRegistry();
        }
        Object.keys(data.storesData).forEach(locId => {
          const st = data.storesData[locId];
          if (st.profile) localStorage.setItem(getStoreProfileStorageKey(locId), JSON.stringify(st.profile));
          if (Array.isArray(st.boxes)) localStorage.setItem(getStoreBoxesStorageKey(locId), JSON.stringify(st.boxes));
          if (Array.isArray(st.historicalReports)) localStorage.setItem(getStoreHistoryStorageKey(locId), JSON.stringify(st.historicalReports));
          if (st.reconciliationDraft) localStorage.setItem(`project_lotto_recdraft_${locId}`, JSON.stringify(st.reconciliationDraft));
        });
        if (data.activeLocationId && locations.some(l => l.id === data.activeLocationId)) {
          activeLocationId = data.activeLocationId;
          localStorage.setItem(STORAGE_KEY_ACTIVE_LOC, activeLocationId);
        }
      } else {
        if (Array.isArray(data.boxes)) {
          boxes = data.boxes;
          saveBoxesState();
        }
        if (data.storeProfile) {
          storeProfile = data.storeProfile;
          localStorage.setItem(getStoreProfileStorageKey(activeLocationId), JSON.stringify(storeProfile));
        }
        if (Array.isArray(data.historicalReports)) {
          saveLocationHistoricalReports(data.historicalReports, activeLocationId);
        }
      }

      populateLocationSwitcherDropdown();
      loadActiveStoreData();
      loadReconciliationDraft();
      renderDispenserGrid();
      renderAdminGamesTable();
      renderAdminCashiersTable();
      recalculateReconciliationTotals();
      alert('Full tablet backup restored successfully! All stores, boxes, games, cashiers, and reports are now loaded.');
    } catch (err) {
      alert('Failed to parse backup JSON file. Please verify it is a valid Project Lotto backup.');
    }
  };
  reader.readAsText(file);
}

function sendNightlyEmailBackupToOwner(isScheduled11PM = false) {
  const payload = executeSilentBackgroundBackup(isScheduled11PM ? '11PM' : 'EMAIL');
  const todayStr = new Date().toISOString().slice(0, 10);
  const targetEmail = 'dimitriosregas@gmail.com';

  let summaryLines = [
    `Project Lotto — Daily Full Tablet Backup (${todayStr})`,
    `Generated: ${new Date().toLocaleString()}`,
    `Active Store: ${storeProfile.name} (#${storeProfile.number})`,
    `Total Stores Included: ${locations.length}`,
    `Master Games Count: ${masterGames.length}`,
    `Saved Cashiers: ${savedCashiers.join(', ')}`,
    ``,
    `--- STORE SUMMARY ---`
  ];

  locations.forEach(loc => {
    const st = payload.storesData[loc.id];
    const repCount = st?.historicalReports?.length || 0;
    const activeBoxes = (st?.boxes || []).filter(b => b.gameNum).length;
    summaryLines.push(`• ${loc.name} (#${loc.number}): ${activeBoxes} active games | ${repCount} archived reports`);
  });

  const subject = encodeURIComponent(`Project Lotto Daily Backup - ${todayStr} (${storeProfile.name})`);
  const body = encodeURIComponent(summaryLines.join('\n'));

  localStorage.setItem('project_lotto_last_nightly_email_date', todayStr);
  window.open(`mailto:${targetEmail}?subject=${subject}&body=${body}`, '_blank');
}

// Twice-daily silent background backup scheduler (2:00 PM & 11:00 PM)
function startTwiceDailyBackupScheduler() {
  setInterval(() => {
    const now = new Date();
    const hour = now.getHours(); // 14 = 2:00 PM, 23 = 11:00 PM
    const todayStr = now.toISOString().slice(0, 10);

    const last2PM = localStorage.getItem('project_lotto_last_2pm_backup_date');
    if (hour === 14 && last2PM !== todayStr) {
      localStorage.setItem('project_lotto_last_2pm_backup_date', todayStr);
      executeSilentBackgroundBackup('2PM');
    }

    const last11PM = localStorage.getItem('project_lotto_last_11pm_backup_date');
    if (hour === 23 && last11PM !== todayStr) {
      localStorage.setItem('project_lotto_last_11pm_backup_date', todayStr);
      sendNightlyEmailBackupToOwner(true);
    }
  }, 30000);
}
/* ==========================================================================
   PROJECT LOTTO — CORE JAVASCRIPT LOGIC ENGINE (PART 7 OF 7)
   ========================================================================== */

function advanceEndToStartForNewShift() {
  boxes.forEach(b => {
    if (b.endTicket !== '' && b.endTicket !== undefined && b.endTicket !== null) {
      b.startTicket = Number(b.endTicket);
    }
    b.endTicket = '';
    b.rollovers = [];
  });
  saveBoxesState();
  renderDispenserGrid();
  recalculateReconciliationTotals();
  alert('Shift ended successfully! Start tickets updated to previous end tickets for the new shift.');
  switchMainView('grid');
}

function handleShiftTypeChange(val) {
  const badge = document.getElementById('header-shift-badge');
  if (badge) badge.textContent = val;
  saveReconciliationDraft();
}
function checkMidnightDateRollover() {
  const todayIso = new Date().toISOString().slice(0, 10);
  const dateInput = document.getElementById('rec-report-date');
  if (dateInput && dateInput.value && dateInput.value !== todayIso) {
    dateInput.value = todayIso;
    saveReconciliationDraft();
  }
}

function recalculateReconciliationTotals() {
  // Auto-check midnight rollover on calculation
  checkMidnightDateRollover();

  let scratchSales = 0;
  let totalTickets = 0;
  boxes.forEach(b => {
    const m = calculateBoxMetrics(b);
    scratchSales += m.dollarSales;
    totalTickets += m.ticketsSold;
  });

  // Multi-shift carryover calculations for Shifts 2 and 3
  const dailyTotalInput = Number(document.getElementById('rec-daily-scratch-total')?.value) || 0;
  const prevShiftsInput = Number(document.getElementById('rec-previous-shifts-sales')?.value) || 0;
  
  // If daily total is provided, calculate net sales for this shift less previous shifts
  const netScratchSales = dailyTotalInput > 0 ? Math.max(0, dailyTotalInput - prevShiftsInput) : scratchSales;

  const onlineSales = Number(document.getElementById('rec-online-sales')?.value) || 0;
  const scratchCashed = Number(document.getElementById('rec-scratch-cashed')?.value) || 0;
  const onlineCashed = Number(document.getElementById('rec-online-cashed')?.value) || 0;
  const posActual = Number(document.getElementById('rec-pos-actual')?.value) || 0;

  const expectedNet = (netScratchSales + onlineSales) - (scratchCashed + onlineCashed);
  const variance = posActual - expectedNet;

  const scEl = document.getElementById('rec-scratch-sales');
  const netShiftEl = document.getElementById('rec-net-shift-scratch');
  const expEl = document.getElementById('rec-expected-total');
  const varEl = document.getElementById('rec-variance-display');
  const accEl = document.getElementById('rec-accounted-total');

  if (scEl) scEl.textContent = `$${scratchSales.toFixed(2)}`;
  if (netShiftEl) netShiftEl.textContent = `$${netScratchSales.toFixed(2)}`;
  if (expEl) expEl.textContent = `$${expectedNet.toFixed(2)}`;
  if (accEl) accEl.textContent = `$${posActual.toFixed(2)}`;
  if (varEl) {
    const sign = variance > 0 ? '+' : '';
    varEl.textContent = `${sign}$${variance.toFixed(2)}`;
    varEl.className = Math.abs(variance) < 0.01 ? 'font-mono font-black text-lg text-emerald-600' : (variance < 0 ? 'font-mono font-black text-lg text-red-600' : 'font-mono font-black text-lg text-amber-600');
  }

  saveReconciliationDraft();
  return { scratchSales: netScratchSales, totalTickets, onlineSales, scratchCashed, onlineCashed, expectedNet, posActual, variance };
}
function saveReconciliationDraft() {
  const draft = {
    date: document.getElementById('rec-report-date')?.value || new Date().toISOString().slice(0, 10),
    shiftType: document.getElementById('rec-shift-type')?.value || 'Shift 1 (Morning)',
    cashierOut: document.getElementById('rec-cashier-out')?.value || '',
    cashierIn: document.getElementById('rec-cashier-in')?.value || '',
    onlineSales: document.getElementById('rec-online-sales')?.value || '',
    scratchCashed: document.getElementById('rec-scratch-cashed')?.value || '',
    onlineCashed: document.getElementById('rec-online-cashed')?.value || '',
    posActual: document.getElementById('rec-pos-actual')?.value || '',
    notes: document.getElementById('rec-shift-notes')?.value || ''
  };
  try { localStorage.setItem(`project_lotto_recdraft_${activeLocationId}`, JSON.stringify(draft)); } catch (e) {}
}

function loadReconciliationDraft() {
  const today = new Date().toISOString().slice(0, 10);
  try {
    const raw = localStorage.getItem(`project_lotto_recdraft_${activeLocationId}`);
    if (raw) {
      const d = JSON.parse(raw);
      document.getElementById('rec-report-date').value = d.date || today;
      document.getElementById('rec-shift-type').value = d.shiftType || 'Shift 1 (Morning)';
      document.getElementById('rec-cashier-out').value = d.cashierOut || '';
      document.getElementById('rec-cashier-in').value = d.cashierIn || '';
      document.getElementById('rec-online-sales').value = d.onlineSales || '';
      document.getElementById('rec-scratch-cashed').value = d.scratchCashed || '';
      document.getElementById('rec-online-cashed').value = d.onlineCashed || '';
      document.getElementById('rec-pos-actual').value = d.posActual || '';
      document.getElementById('rec-shift-notes').value = d.notes || '';
      const badge = document.getElementById('header-shift-badge');
      if (badge) badge.textContent = d.shiftType || 'Shift 1 (Morning)';
      return;
    }
  } catch (e) {}
  const dtInp = document.getElementById('rec-report-date');
  if (dtInp) dtInp.value = today;
}

function initSignaturePad() {
  sigCanvas = document.getElementById('signature-pad');
  if (!sigCanvas) return;
  sigCtx = sigCanvas.getContext('2d');
  sigCtx.strokeStyle = '#0f172a';
  sigCtx.lineWidth = 2.2;
  sigCtx.lineCap = 'round';

  const getPos = (e) => {
    const rect = sigCanvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (sigCanvas.width / rect.width),
      y: (clientY - rect.top) * (sigCanvas.height / rect.height)
    };
  };

  const startDraw = (e) => { e.preventDefault(); isDrawingSignature = true; const pos = getPos(e); sigCtx.beginPath(); sigCtx.moveTo(pos.x, pos.y); };
  const moveDraw = (e) => { if (!isDrawingSignature) return; e.preventDefault(); const pos = getPos(e); sigCtx.lineTo(pos.x, pos.y); sigCtx.stroke(); };
  const endDraw = () => { if (!isDrawingSignature) return; isDrawingSignature = false; currentSignatureDataUrl = sigCanvas.toDataURL('image/png'); };

  sigCanvas.addEventListener('mousedown', startDraw);
  sigCanvas.addEventListener('mousemove', moveDraw);
  window.addEventListener('mouseup', endDraw);
  sigCanvas.addEventListener('touchstart', startDraw, { passive: false });
  sigCanvas.addEventListener('touchmove', moveDraw, { passive: false });
  window.addEventListener('touchend', endDraw);
}

function clearSignaturePad() {
  if (!sigCanvas || !sigCtx) return;
  sigCtx.clearRect(0, 0, sigCanvas.width, sigCanvas.height);
  currentSignatureDataUrl = null;
}

function getLocationHistoricalReports(locId = activeLocationId) {
  try {
    const raw = localStorage.getItem(getStoreHistoryStorageKey(locId));
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {}
  return [];
}

function saveLocationHistoricalReports(reportsArr, locId = activeLocationId) {
  try { localStorage.setItem(getStoreHistoryStorageKey(locId), JSON.stringify(reportsArr)); } catch (e) {}
}

function finalizeAndSaveShiftReport() {
  const totals = recalculateReconciliationTotals();
  const normalizedDate = document.getElementById('rec-report-date')?.value || new Date().toISOString().slice(0, 10);
  const shiftVal = document.getElementById('rec-shift-type')?.value || 'Shift 1 (Morning)';
  const cashierOut = document.getElementById('rec-cashier-out')?.value?.trim() || 'Unspecified Cashier';
  const cashierIn = document.getElementById('rec-cashier-in')?.value?.trim() || '-';
  const notes = document.getElementById('rec-shift-notes')?.value?.trim() || '';

  // Auto-save new cashier name to savedCashiers list
  if (cashierOut && cashierOut !== 'Unspecified Cashier' && !savedCashiers.includes(cashierOut)) {
    savedCashiers.push(cashierOut);
    saveCashiersState();
    renderAdminCashiersTable();
  }

  // Assign strict sequence order: Morning = 1, Evening = 2, Night/Close = 3
  let shiftOrder = 1;
  if (shiftVal.includes('2') || shiftVal.toLowerCase().includes('evening')) shiftOrder = 2;
  else if (shiftVal.includes('3') || shiftVal.toLowerCase().includes('night') || shiftVal.toLowerCase().includes('close')) shiftOrder = 3;

  const reportRecord = {
    reportId: `rep_${activeLocationId}_${normalizedDate}_${shiftOrder}_${Date.now()}`,
    timestamp: new Date().toISOString(),
    locationId: activeLocationId,
    storeName: storeProfile.name,
    storeNumber: storeProfile.number,
    date: normalizedDate,
    monthKey: normalizedDate.slice(0, 7),
    shiftType: shiftVal,
    shiftSequence: shiftOrder,
    cashierOut,
    cashierIn,
    notes,
    totals,
    signatureDataUrl: currentSignatureDataUrl || null,
    boxesSnapshot: JSON.parse(JSON.stringify(boxes))
  };

  const history = getLocationHistoricalReports(activeLocationId);
  history.unshift(reportRecord);
  saveLocationHistoricalReports(history, activeLocationId);

   const CLOUDWORKER_SYNC_URL = "https://lottoinventory.dimitriosregas.workers.dev/sync";

async function syncActiveStoreToCloud() {
  const payload = buildFullTabletBackupPayload();
  try {
    await fetch(`${CLOUDWORKER_SYNC_URL}?storeId=${activeLocationId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    // Fails silently offline so local device storage takes over without interruption
  }
}
   
  const ind = document.getElementById('last-archived-indicator');
  if (ind) ind.textContent = `✔ Archived ${normalizedDate} (${shiftVal}) at ${new Date().toLocaleTimeString()}`;

  executeSilentBackgroundBackup('REPORT');
  alert(`Shift Report for ${storeProfile.name} archived and system backed up silently in the background!`);
}

function handleReportFilterModeChange(mode) {
  const dateCont = document.getElementById('filter-date-container');
  const monthCont = document.getElementById('filter-month-container');
  const shiftCont = document.getElementById('filter-shift-container');

  if (mode === 'monthly') {
    dateCont?.classList.add('hidden');
    monthCont?.classList.remove('hidden');
    shiftCont?.classList.add('hidden');
  } else if (mode === 'shift') {
    dateCont?.classList.remove('hidden');
    monthCont?.classList.add('hidden');
    shiftCont?.classList.remove('hidden');
  } else {
    dateCont?.classList.remove('hidden');
    monthCont?.classList.add('hidden');
    shiftCont?.classList.add('hidden');
  }
  executeReportLookup();
}

function executeReportLookup() {
  const mode = document.getElementById('report-filter-mode')?.value || 'daily';
  const filterDate = document.getElementById('report-filter-date')?.value || new Date().toISOString().slice(0, 10);
  const filterMonth = document.getElementById('report-filter-month')?.value || new Date().toISOString().slice(0, 7);
  const filterShift = document.getElementById('report-filter-shift-type')?.value || 'ALL';

  const allHistory = getLocationHistoricalReports(activeLocationId);
  let filtered = [];

  if (mode === 'monthly') {
    filtered = allHistory.filter(r => (r.monthKey || r.date?.slice(0, 7)) === filterMonth);
  } else if (mode === 'shift') {
    filtered = allHistory.filter(r => r.date === filterDate && (filterShift === 'ALL' || r.shiftType === filterShift));
  } else {
    filtered = allHistory.filter(r => r.date === filterDate);
  }

  // Sort filtered reports so Morning (Shift 1) always comes first
  filtered.sort((a, b) => (a.shiftSequence || 1) - (b.shiftSequence || 1));

  let sumScratch = 0, sumExpected = 0, sumVariance = 0;
  filtered.forEach(r => {
    sumScratch += Number(r.totals?.scratchSales) || 0;
    sumExpected += Number(r.totals?.expectedNet) || 0;
    sumVariance += Number(r.totals?.variance) || 0;
  });

  const cntEl = document.getElementById('rep-summary-shift-count');
  const scrEl = document.getElementById('rep-summary-scratch-sales');
  const expEl = document.getElementById('rep-summary-expected-revenue');
  const varEl = document.getElementById('rep-summary-variance');

  if (cntEl) cntEl.textContent = String(filtered.length);
  if (scrEl) scrEl.textContent = `$${sumScratch.toFixed(2)}`;
  if (expEl) expEl.textContent = `$${sumExpected.toFixed(2)}`;
  if (varEl) {
    const sign = sumVariance > 0 ? '+' : '';
    varEl.textContent = `${sign}$${sumVariance.toFixed(2)}`;
  }

  const tbody = document.getElementById('historical-reports-tbody');
  if (!tbody) return;

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="11" class="p-6 text-center text-slate-400">No archived shift reports found.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(r => {
    const t = r.totals || {};
    const v = Number(t.variance) || 0;
    const vColor = Math.abs(v) < 0.01 ? 'text-emerald-700' : (v < 0 ? 'text-red-600' : 'text-amber-600');
    return `
      <tr class="hover:bg-slate-50">
        <td class="p-2.5 text-center font-mono">${r.date}</td>
        <td class="p-2.5 font-bold text-slate-800">${r.shiftType}</td>
        <td class="p-2.5">${r.cashierOut || '-'}</td>
        <td class="p-2.5 text-center font-mono">${t.totalTickets || 0}</td>
        <td class="p-2.5 text-right font-mono font-bold">$${(Number(t.scratchSales) || 0).toFixed(2)}</td>
        <td class="p-2.5 text-right font-mono">$${(Number(t.onlineSales) || 0).toFixed(2)}</td>
        <td class="p-2.5 text-right font-mono font-bold text-blue-800">$${(Number(t.expectedNet) || 0).toFixed(2)}</td>
        <td class="p-2.5 text-right font-mono font-bold">$${(Number(t.posActual) || 0).toFixed(2)}</td>
        <td class="p-2.5 text-right font-mono font-extrabold ${vColor}">${v > 0 ? '+' : ''}$${v.toFixed(2)}</td>
        <td class="p-2.5 text-center">${r.signatureDataUrl ? '<span class="text-emerald-600 font-bold">✔ Signed</span>' : '<span class="text-slate-400">None</span>'}</td>
        <td class="p-2.5 text-center">
          <button type="button" onclick="printArchivedSingleReport('${r.reportId}')" class="bg-slate-800 text-white text-[10px] px-2 py-1 rounded">🖨 Print</button>
        </td>
      </tr>
    `;
  }).join('');
}

function exportHistoricalReportsJSON() {
  const history = getLocationHistoricalReports(activeLocationId);
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(history, null, 2));
  const a = document.createElement('a');
  a.setAttribute('href', dataStr);
  a.setAttribute('download', `HistoricalReports_${storeProfile.name.replace(/\s+/g, '_')}.json`);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function triggerMonthlyEmailDispatchManually() {
  sendNightlyEmailBackupToOwner(false);
}

function saveNewMasterGameManual() {
  const numInp = document.getElementById('new-game-num');
  const nameInp = document.getElementById('new-game-name');
  const priceInp = document.getElementById('new-game-price');
  const countInp = document.getElementById('new-game-count');

  const gNum = numInp?.value?.trim();
  const gName = nameInp?.value?.trim().toUpperCase();
  const price = Number(priceInp?.value) || 1;
  const count = Number(countInp?.value) || getDefaultRollCountForPrice(price);

  if (!gNum || !gName) { alert('Please enter both a Game Number and a Game Name.'); return; }
  const newEntry = { gameNum: gNum, name: gName, price, count };

  const idx = masterGames.findIndex(g => String(g.gameNum).trim() === gNum);
  if (idx >= 0) masterGames[idx] = newEntry;
  else masterGames.push(newEntry);
function sanitizeMasterGamesList(gamesArray) {
  if (!Array.isArray(gamesArray)) return [];
  const uniqueMap = new Map();
  
  // Iterate through and ensure each gameNum is strictly unique, merging duplicates safely
  gamesArray.forEach(g => {
    if (g && g.gameNum) {
      const cleanNum = String(g.gameNum).trim();
      uniqueMap.set(cleanNum, {
        gameNum: cleanNum,
        name: (g.name || `GAME #${cleanNum}`).toUpperCase(),
        price: Number(g.price) || 1,
        count: Number(g.count) || getDefaultRollCountForPrice(Number(g.price) || 1)
      });
    }
  });
  
  return Array.from(uniqueMap.values());
}
   
  masterGames = sanitizeMasterGamesList(masterGames);
  saveGamesState();

  if (numInp) numInp.value = '';
  if (nameInp) nameInp.value = '';
  if (priceInp) priceInp.value = '';
  if (countInp) countInp.value = '';

  loadActiveStoreData();
  renderAdminGamesTable();
  renderDispenserGrid();
  recalculateReconciliationTotals();
  alert(`Master Game #${gNum} saved successfully!`);
}

function deleteMasterGame(gNum) {
  if (!confirm(`Delete Game #${gNum} from Master Catalog?`)) return;
  masterGames = masterGames.filter(g => String(g.gameNum).trim() !== String(gNum).trim());
  saveGamesState();
  renderAdminGamesTable();
}

function renderAdminGamesTable(filterQuery = '') {
  const tbody = document.getElementById('admin-games-tbody');
  const countEl = document.getElementById('admin-games-count');
  if (countEl) countEl.textContent = String(masterGames.length);
  if (!tbody) return;

  const q = filterQuery.trim().toLowerCase();
  const list = q ? masterGames.filter(g => String(g.gameNum).toLowerCase().includes(q) || String(g.name).toLowerCase().includes(q)) : masterGames;

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="p-4 text-center text-slate-400">No matching games found.</td></tr>`;
    return;
  }

  tbody.innerHTML = list.map(g => `
    <tr class="hover:bg-slate-50">
      <td class="p-2 text-center font-mono font-bold text-blue-800">${g.gameNum}</td>
      <td class="p-2 font-bold text-slate-800">${g.name}</td>
      <td class="p-2 text-center font-mono font-bold text-emerald-700">$${g.price}</td>
      <td class="p-2 text-center font-mono text-slate-600">${g.count}</td>
      <td class="p-2 text-center">
        <button type="button" onclick="deleteMasterGame('${g.gameNum}')" class="text-red-600 hover:text-red-800 font-bold text-[11px] px-2 py-0.5 rounded bg-red-50">Delete</button>
      </td>
    </tr>
  `).join('');
}

function addBoxSlot() {
  const nextNum = boxes.length + 1;
  boxes.push({ boxNumber: String(nextNum), gameNum: '', gameName: '', price: 0, rollCount: 60, startTicket: 0, endTicket: '', rollovers: [], needsNewGameEntry: false });
  saveBoxesState();
  const badgeElem = document.getElementById('admin-box-count-badge');
  if (badgeElem) badgeElem.textContent = String(boxes.length);
  renderDispenserGrid();
  renderAdminBoxLabelsGrid();
  updateHeaderTotalsUI();
}

function removeBoxSlot() {
  if (boxes.length <= 1) { alert('You must keep at least 1 box slot active.'); return; }
  boxes.pop();
  saveBoxesState();
  const badgeElem = document.getElementById('admin-box-count-badge');
  if (badgeElem) badgeElem.textContent = String(boxes.length);
  renderDispenserGrid();
  renderAdminBoxLabelsGrid();
  updateHeaderTotalsUI();
}

function renderAdminBoxLabelsGrid() {
  const container = document.getElementById('admin-box-labels-grid');
  if (!container) return;
  let html = '';
  boxes.forEach((box, idx) => {
    const hasGame = Boolean(box.gameNum);
    const gameLabel = hasGame ? (box.gameName || 'Game #' + box.gameNum) : 'Empty Slot';
    html += `
      <div class="border border-slate-200 rounded-lg p-2 bg-slate-50 flex flex-col justify-between text-xs">
        <div class="flex items-center justify-between text-[10px] text-slate-500 font-bold mb-1">
          <span>Index #${idx + 1}</span>
          <span class="text-emerald-700 font-mono">${hasGame && box.price ? '$' + box.price : ''}</span>
        </div>
        <div class="mb-1.5">
          <input type="text" id="admin-box-label-inp-${idx}" value="${box.boxNumber || (idx + 1)}" oninput="updateBoxLabelDirect(${idx}, this.value)" onkeydown="handleBoxLabelKeydown(event, ${idx})" class="w-full text-center font-mono font-black text-xs border rounded py-1 px-1.5 bg-white lotto-input" />
        </div>
        <div class="text-[10px] text-slate-600 truncate font-medium">${gameLabel}</div>
      </div>
    `;
  });
  container.innerHTML = html;
}

function handleBoxLabelKeydown(event, currentIdx) {
  if (event.key === 'Enter') {
    event.preventDefault();
    const nextIdx = currentIdx + 1;
    const nextInp = document.getElementById(`admin-box-label-inp-${nextIdx}`);
    if (nextInp) {
      nextInp.focus();
      nextInp.select();
    }
  }
}

function updateBoxLabelDirect(idx, val) {
  if (!boxes[idx]) return;
  boxes[idx].boxNumber = val === '' ? String(idx + 1) : String(val).trim();
  saveBoxesState();
}

function setBoxLabelsSequential(mode) {
  boxes.forEach((box, idx) => {
    if (mode === 'numbers') box.boxNumber = String(idx + 1);
    else if (mode === 'letters') box.boxNumber = idx < 26 ? String.fromCharCode(65 + idx) : 'A' + String.fromCharCode(65 + (idx - 26));
  });
  saveBoxesState();
  renderAdminBoxLabelsGrid();
  renderDispenserGrid();
}

function switchMainView(viewName) {
  lastActiveViewName = viewName;
  const views = ['grid', 'reconcile', 'reports', 'admin'];
  views.forEach(v => {
    const sec = document.getElementById(`view-${v}`);
    const btn = document.getElementById(`nav-btn-${v}`);
    if (sec) {
      if (v === viewName) sec.classList.remove('hidden');
      else sec.classList.add('hidden');
    }
    if (btn) {
      btn.className = v === viewName ? 'bg-blue-600 text-white font-bold text-xs px-3 py-1.5 rounded shadow-sm transition' : 'bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold text-xs px-3 py-1.5 rounded shadow-sm transition';
    }
  });
  if (viewName === 'grid') {
    renderDispenserGrid();
    renderMainGridCashierShiftBar();
  } else if (viewName === 'reconcile') {
    recalculateReconciliationTotals();
    handleCashierInputAutocomplete('rec-cashier-out', 'cashier-datalist-rec-out');
    handleCashierInputAutocomplete('rec-cashier-in', 'cashier-datalist-rec-in');
  } else if (viewName === 'reports') {
    executeReportLookup();
  } else if (viewName === 'admin') {
    renderAdminGamesTable();
    renderAdminBoxLabelsGrid();
    renderAdminCashiersTable();
  }
}
function jumpToReconciliation() {
  if (typeof switchMainView === 'function') {
    switchMainView('reconcile');
  } else {
    // Fallback if needed
    document.getElementById('view-grid').classList.add('hidden');
    document.getElementById('view-reconcile').classList.remove('hidden');
    if (typeof recalculateReconciliationTotals === 'function') {
      recalculateReconciliationTotals();
    }
  }
}

// --------------------------------------------------------------------------
// DIRECT CSS PRINT ENGINE (LETTER SIZE 8.5" x 11" — STRICT 1-PAGE FIT)
// --------------------------------------------------------------------------
function buildMatrixPrintHTML(repData, isFinalReport = false) {
  const bList = Array.isArray(repData.boxesSnapshot) ? repData.boxesSnapshot : boxes;
  const t = repData.totals || {};
  const variance = Number(t.variance) || 0;
  let gtTickets = 0;
  let gtSales = 0;

  const rowsHtml = bList.map(box => {
    const m = calculateBoxMetrics(box);
    gtTickets += m.ticketsSold;
    gtSales += m.dollarSales;
    const hasGame = Boolean(box.gameNum);
    const roCount = Array.isArray(box.rollovers) ? box.rollovers.length : 0;
    return `
      <tr style="border-bottom: 1px solid #cbd5e1; font-size: 7.5px;">
        <td style="padding: 1.5px 3px; text-align: center; font-weight: 900; background: #0f172a; color: #fff;">${box.boxNumber}</td>
        <td style="padding: 1.5px 3px; text-align: center; font-family: monospace; font-weight: bold;">${box.gameNum || '-'}</td>
        <td style="padding: 1.5px 3px; font-weight: 600;">${hasGame ? (box.gameName || 'Game #' + box.gameNum) : '<span style="color:#94a3b8;">Empty</span>'}</td>
        <td style="padding: 1.5px 3px; text-align: center; font-weight: bold; color: #047857;">${hasGame && box.price ? '$' + box.price : '-'}</td>
        <td style="padding: 1.5px 3px; text-align: center; font-family: monospace;">${box.startTicket !== '' ? box.startTicket : '-'}</td>
        <td style="padding: 1.5px 3px; text-align: center; font-family: monospace; font-weight: bold;">${box.endTicket !== '' && box.endTicket !== undefined ? box.endTicket : '-'}</td>
        <td style="padding: 1.5px 3px; text-align: center; font-weight: bold;">${m.ticketsSold}${roCount > 0 ? ' *' : ''}</td>
        <td style="padding: 1.5px 3px; text-align: right; font-family: monospace; font-weight: 900; color: #047857;">$${m.dollarSales.toFixed(2)}</td>
      </tr>
    `;
  }).join('');

  const sigImgHtml = repData.signatureDataUrl ? `<img src="${repData.signatureDataUrl}" style="max-height: 24px; max-width: 140px; object-fit: contain;" alt="Signature" />` : `<span style="color: #94a3b8; font-size: 7.5px;">______________________________</span>`;

  return `
    <style>
      @page {
        size: letter portrait;
        margin: 0.15in 0.2in;
      }
      @media print {
        html, body {
          margin: 0 !important;
          padding: 0 !important;
          height: 100% !important;
          background: #fff !important;
          color: #000 !important;
          overflow: hidden !important;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        body > header, body > main, body > div.fixed, #app-shell, .no-print {
          display: none !important;
        }
        #print-container {
          display: block !important;
          width: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        .one-page-print-sheet {
          width: 100% !important;
          max-height: 10.4in !important;
          overflow: hidden !important;
          page-break-inside: avoid !important;
          page-break-after: avoid !important;
          page-break-before: avoid !important;
          transform: scale(0.97);
          transform-origin: top left;
        }
      }
    </style>
    <div class="one-page-print-sheet" style="font-family: Arial, sans-serif; color: #000; font-size: 7.5px; line-height: 1.05;">
      <div style="display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2px solid #000; padding-bottom: 2px; margin-bottom: 2px;">
        <div>
          <div style="font-size: 11px; font-weight: 900; text-transform: uppercase;">
            ${repData.storeName || storeProfile.name} (#${repData.storeNumber || storeProfile.number}) — Shift Lotto Count Worksheet
          </div>
          ${storeProfile.address ? `<div style="font-size: 7px; color: #334155;">${storeProfile.address}</div>` : ''}
          <div style="font-size: 7.5px; color: #334155; margin-top: 1px;">Date: <strong>${repData.date}</strong> &nbsp;|&nbsp; Shift: <strong>${repData.shiftType}</strong></div>
        </div>
        <div style="text-align: right; font-size: 7px; font-weight: bold;">WORKSHEET</div>
      </div>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 3px;">
        <thead>
          <tr style="background: #e2e8f0; border-bottom: 1.5px solid #000; font-size: 7px; text-transform: uppercase;">
            <th style="padding: 2.5px; text-align: center; width: 30px;">Box</th>
            <th style="padding: 2.5px; text-align: center; width: 50px;">Game #</th>
            <th style="padding: 2.5px; text-align: left;">Game Name</th>
            <th style="padding: 2.5px; text-align: center; width: 32px;">Price</th>
            <th style="padding: 2.5px; text-align: center; width: 45px;">Start</th>
            <th style="padding: 2.5px; text-align: center; width: 45px;">End</th>
            <th style="padding: 2.5px; text-align: center; width: 32px;">Sold</th>
            <th style="padding: 2.5px; text-align: right; width: 60px;">Sales $</th>
          </tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
      </table>
      <div style="border: 1.5px solid #000; padding: 3px 5px; background: #f8fafc;">
        <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 2px; border-bottom: 1px solid #94a3b8; padding-bottom: 2px; margin-bottom: 2px; text-align: center; font-size: 7px;">
          <div><span>Total Sold:</span><div style="font-family:monospace; font-weight:900; font-size:8.5px;">${gtTickets} tix</div></div>
          <div><span>Scratch Sales:</span><div style="font-family:monospace; font-weight:900; font-size:8.5px; color:#047857;">$${gtSales.toFixed(2)}</div></div>
          <div><span>Online Sales:</span><div style="font-family:monospace; font-weight:900; font-size:8.5px;">$${(Number(t.onlineSales) || 0).toFixed(2)}</div></div>
          <div><span>Expected Net:</span><div style="font-family:monospace; font-weight:900; font-size:8.5px;">$${(Number(t.expectedNet) || 0).toFixed(2)}</div></div>
          <div><span>POS Actual:</span><div style="font-family:monospace; font-weight:900; font-size:8.5px;">$${(Number(t.posActual) || 0).toFixed(2)}</div></div>
          <div><span>Variance:</span><div style="font-family:monospace; font-weight:900; font-size:8.5px;">${variance > 0 ? '+' : ''}$${variance.toFixed(2)}</div></div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: flex-end; gap: 6px;">
          <div style="flex: 1.2;">
            <div style="display: flex; gap: 8px; font-size: 7px; margin-bottom: 2px;">
              <div><strong>Outgoing Cashier:</strong> ${repData.cashierOut || '&nbsp;'}</div>
              <div><strong>Incoming Cashier:</strong> ${repData.cashierIn || '&nbsp;'}</div>
            </div>
            <!-- Signature ABOVE Attestation -->
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 1px;">
              <div style="height: 22px; min-width: 120px; display: flex; align-items: center; border-bottom: 1px solid #000;">${sigImgHtml}</div>
              <span style="font-size: 6px; font-weight: bold; text-transform: uppercase;">Cashier Signature</span>
            </div>
            <div style="font-size: 6.5px; color: #1e293b; font-style: italic; line-height: 1.05;">
              "I hereby certify that the ticket counts, game numbers, and shift totals recorded above are true, complete, and accurate to the best of my knowledge."
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function printWorksheet() {
  // Auto-detect midnight date rollover if tablet stayed open overnight
  const todayIso = new Date().toISOString().slice(0, 10);
  const dateInput = document.getElementById('rec-report-date');
  if (dateInput && dateInput.value !== todayIso) {
    dateInput.value = todayIso;
    saveReconciliationDraft();
  }
  openWorksheetPrintChoiceModal();
}

function printWorksheetDirect() {
  let printContainer = document.getElementById('print-container');
  if (!printContainer) {
    printContainer = document.createElement('div');
    printContainer.id = 'print-container';
    document.body.appendChild(printContainer);
  }
  printContainer.innerHTML = buildMatrixPrintHTML({
    storeName: storeProfile.name,
    storeNumber: storeProfile.number,
    date: document.getElementById('rec-report-date')?.value || new Date().toISOString().slice(0, 10),
    shiftType: document.getElementById('rec-shift-type')?.value || 'Shift 1 (Morning)',
    cashierOut: document.getElementById('rec-cashier-out')?.value?.trim() || document.getElementById('grid-cashier-input')?.value?.trim() || 'Unspecified',
    cashierIn: document.getElementById('rec-cashier-in')?.value?.trim() || '-',
    totals: recalculateReconciliationTotals(),
    signatureDataUrl: currentSignatureDataUrl,
    boxesSnapshot: boxes
  }, false);
  window.print();
}

function printFinalReport() {
  printWorksheet();
}

function printArchivedSingleReport(reportId) {
  const history = getLocationHistoricalReports(activeLocationId);
  const found = history.find(r => r.reportId === reportId);
  if (!found) return;
  let printContainer = document.getElementById('print-container');
  if (!printContainer) {
    printContainer = document.createElement('div');
    printContainer.id = 'print-container';
    document.body.appendChild(printContainer);
  }
  printContainer.innerHTML = buildMatrixPrintHTML(found, true);
  window.print();
}

function printFilteredReportSummary() { window.print(); }

window.addEventListener('DOMContentLoaded', () => {
  loadMasterGames();
  initActiveLocation();
  
  const todayIso = new Date().toISOString().slice(0, 10);
  const monthIso = todayIso.slice(0, 7);
  
  if (document.getElementById('report-filter-date')) document.getElementById('report-filter-date').value = todayIso;
  if (document.getElementById('report-filter-month')) document.getElementById('report-filter-month').value = monthIso;

  loadActiveStoreData();
  renderDispenserGrid();
  renderMainGridCashierShiftBar();
  renderAdminGamesTable();
  renderAdminBoxLabelsGrid();
  renderAdminCashiersTable();
  loadReconciliationDraft();
  recalculateReconciliationTotals();
  initSignaturePad();
  executeReportLookup();
  startTwiceDailyBackupScheduler();
});
/* ==========================================================================
   SCREEN WAKE LOCK (KEEP SCREEN ON) & MISSING HELPER FUNCTIONS
   ========================================================================== */

const STORAGE_KEY_WAKELOCK_MINS = 'project_lotto_wakelock_mins_v1';
let screenWakeLockSentinel = null;
let screenWakeLockTimeoutId = null;
let screenWakeLockMinutes = 10; // Default 10 mins

function initScreenKeepAwakeSystem() {
  try {
    const savedMins = localStorage.getItem(STORAGE_KEY_WAKELOCK_MINS);
    if (savedMins !== null) {
      screenWakeLockMinutes = Number(savedMins);
    }
  } catch (e) {}

  injectHeaderWakeLockControl();
  syncWakeLockSelectUI();

  const activityEvents = ['pointerdown', 'keydown', 'touchstart'];
  let lastActivityReset = 0;

  activityEvents.forEach(evt => {
    window.addEventListener(evt, () => {
      const now = Date.now();
      if (now - lastActivityReset > 5000 && screenWakeLockMinutes > 0) {
        lastActivityReset = now;
        requestScreenWakeLock();
      }
    }, { passive: true });
  });

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      releaseScreenWakeLock(false);
    } else if (
      document.visibilityState === 'visible' &&
      screenWakeLockMinutes > 0
    ) {
      requestScreenWakeLock();
    }
  });

  window.addEventListener('pagehide', () => releaseScreenWakeLock(false));
  window.addEventListener('beforeunload', () => releaseScreenWakeLock(false));

  if (screenWakeLockMinutes > 0) {
    requestScreenWakeLock();
  }
}

function injectHeaderWakeLockControl() {
  const headerBar = document.querySelector('header .max-w-7xl');
  if (!headerBar || document.getElementById('header-wakelock-select')) return;

  const firstGroup = headerBar.children[0];
  if (!firstGroup) return;

  const wrap = document.createElement('div');
  wrap.className =
    'flex items-center bg-slate-800 border border-slate-600 ' +
    'rounded-lg px-2 py-1 gap-1.5';

  wrap.innerHTML = `
    <span id="header-wakelock-dot"
      class="w-2 h-2 rounded-full bg-amber-400"
      title="Screen Wake Lock Status"></span>
    <span class="text-[11px] font-bold text-slate-300 uppercase">
      Screen:
    </span>
    <select
      id="header-wakelock-select"
      onchange="setScreenKeepAwakeMinutes(this.value)"
      class="bg-slate-900 text-emerald-300 font-bold text-xs rounded px-1.5 py-1 border border-slate-700"
    >
      <option value="0">Normal</option>
      <option value="5">5 Min</option>
      <option value="10">10 Min</option>
      <option value="15">15 Min</option>
      <option value="30">30 Min</option>
    </select>
  `;
  firstGroup.appendChild(wrap);
}

function setScreenKeepAwakeMinutes(minsVal) {
  screenWakeLockMinutes = Math.max(0, Number(minsVal) || 0);
  try {
    localStorage.setItem(
      STORAGE_KEY_WAKELOCK_MINS,
      String(screenWakeLockMinutes)
    );
  } catch (e) {}

  syncWakeLockSelectUI();

  if (screenWakeLockMinutes > 0) {
    requestScreenWakeLock();
  } else {
    releaseScreenWakeLock(true);
  }
}

function syncWakeLockSelectUI() {
  const headerSel = document.getElementById('header-wakelock-select');
  if (headerSel) headerSel.value = String(screenWakeLockMinutes);
  const adminSel = document.getElementById('admin-wakelock-select');
  if (adminSel) adminSel.value = String(screenWakeLockMinutes);
}

async function requestScreenWakeLock() {
  if (screenWakeLockTimeoutId) {
    clearTimeout(screenWakeLockTimeoutId);
    screenWakeLockTimeoutId = null;
  }

  if (screenWakeLockMinutes <= 0) {
    releaseScreenWakeLock(true);
    return;
  }

  screenWakeLockTimeoutId = setTimeout(() => {
    releaseScreenWakeLock(false);
  }, screenWakeLockMinutes * 60 * 1000);

  if (!('wakeLock' in navigator)) {
    updateWakeLockIndicatorUI(false, 'Browser Unsupported');
    return;
  }

  try {
    if (!screenWakeLockSentinel || screenWakeLockSentinel.released) {
      screenWakeLockSentinel = await navigator.wakeLock.request('screen');
      screenWakeLockSentinel.addEventListener('release', () => {
        updateWakeLockIndicatorUI(false);
      });
    }
    updateWakeLockIndicatorUI(true);
  } catch (err) {
    updateWakeLockIndicatorUI(false);
  }
}

async function releaseScreenWakeLock(clearTimer = true) {
  if (clearTimer && screenWakeLockTimeoutId) {
    clearTimeout(screenWakeLockTimeoutId);
    screenWakeLockTimeoutId = null;
  }
  if (screenWakeLockSentinel) {
    try {
      await screenWakeLockSentinel.release();
    } catch (e) {}
    screenWakeLockSentinel = null;
  }
  updateWakeLockIndicatorUI(false);
}

function updateWakeLockIndicatorUI(isActive, customText = '') {
  const dot = document.getElementById('header-wakelock-dot');
  if (dot) {
    dot.className = isActive
      ? 'w-2 h-2 rounded-full bg-emerald-400 animate-pulse'
      : 'w-2 h-2 rounded-full bg-slate-500';
  }
  const adminBadge = document.getElementById('admin-wakelock-status');
  if (adminBadge) {
    adminBadge.textContent =
      customText ||
      (isActive ? `Active (${screenWakeLockMinutes}m Timer)` : 'Normal Sleep');
    adminBadge.className = isActive
      ? 'text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800'
      : 'text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600';
  }
}

function savePrintFontSizeSetting(val) {
  const parsed = Math.min(36, Math.max(8, Number(val) || 13));
  globalPrintFontSizePt = parsed;
  try {
    localStorage.setItem(STORAGE_KEY_PRINT_FONT_SIZE, String(parsed));
  } catch (e) {}
}

function loadPrintFontSizeSetting() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_PRINT_FONT_SIZE);
    if (saved) {
      globalPrintFontSizePt = Math.min(36, Math.max(8, Number(saved) || 13));
    }
  } catch (e) {}
  const inp = document.getElementById('admin-print-fontsize-input');
  if (inp) inp.value = String(globalPrintFontSizePt);
}

function autoFillNewGameRollCount() {
  const priceInp = document.getElementById('new-game-price');
  const countInp = document.getElementById('new-game-count');
  if (priceInp && countInp && priceInp.value) {
    countInp.value = getDefaultRollCountForPrice(Number(priceInp.value));
  }
}

function autoFillQuickGameRollCount() {
  const priceInp = document.getElementById('quick-game-price');
  const countInp = document.getElementById('quick-game-count');
  if (priceInp && countInp && priceInp.value) {
    countInp.value = getDefaultRollCountForPrice(Number(priceInp.value));
  }
}

function exportMasterGamesUniversal() {
  const payload = {
    exportedAt: new Date().toISOString(),
    gamesCount: masterGames.length,
    masterGames: sanitizeMasterGamesList(masterGames)
  };
  const blob = new Blob(
    [JSON.stringify(payload, null, 2)],
    { type: 'application/json' }
  );
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const dt = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `ProjectLotto_MasterGames_${dt}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

function importMasterGamesUniversal(event) {
  const file = event?.target?.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const parsed = JSON.parse(e.target.result);
      const incoming = Array.isArray(parsed)
        ? parsed
        : (Array.isArray(parsed.masterGames) ? parsed.masterGames : []);
      if (incoming.length === 0) {
        alert('No valid games found in the selected JSON file.');
        return;
      }
      masterGames = sanitizeMasterGamesList([...masterGames, ...incoming]);
      saveGamesState();
      loadActiveStoreData();
      renderAdminGamesTable();
      renderDispenserGrid();
      recalculateReconciliationTotals();
      alert(`Merged ${incoming.length} games into Master Catalog!`);
    } catch (err) {
      alert('Invalid JSON file. Could not import games.');
    }
  };
  reader.readAsText(file);
}

window.addEventListener('DOMContentLoaded', () => {
  loadPrintFontSizeSetting();
  initScreenKeepAwakeSystem();
});
/* ==========================================================================
   UNIVERSAL PRINT MODAL ENGINE (80MM THERMAL & LEGAL FOR ALL VIEWS)
   ========================================================================== */

let activePrintContextMode = 'current'; // 'current' | 'archived' | 'summary'
let activeArchivedReportToPrint = null;

function openWorksheetPrintChoiceModal(mode = 'current', archivedRep = null) {
  activePrintContextMode = mode;
  activeArchivedReportToPrint = archivedRep;

  const modal =
    document.getElementById('modal-print-worksheet-choice') ||
    createPrintChoiceModalDOM();

  handleCashierInputAutocomplete(
    'print-modal-cashier-input',
    'cashier-datalist-print'
  );

  const cashierInp = document.getElementById('print-modal-cashier-input');
  const shiftSel = document.getElementById('print-modal-shift-select');

  if (mode === 'archived' && archivedRep) {
    if (cashierInp) cashierInp.value = archivedRep.cashierOut || 'Manager';
    if (shiftSel && archivedRep.shiftType) {
      shiftSel.value = archivedRep.shiftType;
    }
  } else {
    const activeCashier =
      document.getElementById('rec-cashier-out')?.value ||
      document.getElementById('grid-cashier-input')?.value ||
      '';
    if (cashierInp && !cashierInp.value) cashierInp.value = activeCashier;
    const activeShift = document.getElementById('rec-shift-type')?.value;
    if (shiftSel && activeShift) shiftSel.value = activeShift;
  }

  modal.classList.remove('hidden');
  setTimeout(() => initPrintModalSignaturePad(), 100);
}

function printArchivedSingleReport(reportId) {
  const history = getLocationHistoricalReports(activeLocationId);
  const found = history.find(r => r.reportId === reportId);
  if (!found) {
    alert('Archived report not found.');
    return;
  }
  openWorksheetPrintChoiceModal('archived', found);
}

function printFilteredReportSummary() {
  openWorksheetPrintChoiceModal('summary', null);
}

function executeUnifiedPrint(formatChoice) {
  const cashierVal =
    document.getElementById('print-modal-cashier-input')?.value?.trim() ||
    'Unspecified';
  const shiftVal =
    document.getElementById('print-modal-shift-select')?.value ||
    'Shift 1 (Morning)';

  document
    .getElementById('modal-print-worksheet-choice')
    .classList.add('hidden');

  if (activePrintContextMode === 'archived' && activeArchivedReportToPrint) {
    const repCopy = JSON.parse(JSON.stringify(activeArchivedReportToPrint));
    if (cashierVal && cashierVal !== 'Unspecified') {
      repCopy.cashierOut = cashierVal;
    }
    if (printModalSigDataUrl) {
      repCopy.signatureDataUrl = printModalSigDataUrl;
    }
    if (formatChoice === 'thermal') {
      printThermalReceiptFromData(repCopy, false);
    } else {
      let printContainer = document.getElementById('print-container');
      if (!printContainer) {
        printContainer = document.createElement('div');
        printContainer.id = 'print-container';
        document.body.appendChild(printContainer);
      }
      printContainer.innerHTML = buildMatrixPrintHTML(repCopy, true);
      window.print();
    }
    return;
  }

  if (activePrintContextMode === 'summary') {
    if (formatChoice === 'thermal') {
      printFilteredSummaryThermal(cashierVal);
    } else {
      printFilteredSummaryLegal(cashierVal);
    }
    return;
  }

  // Default: Current Active Shift Worksheet / Final Report
  const recCashier = document.getElementById('rec-cashier-out');
  if (recCashier) recCashier.value = cashierVal;
  const gridCashier = document.getElementById('grid-cashier-input');
  if (gridCashier) gridCashier.value = cashierVal;
  const recShift = document.getElementById('rec-shift-type');
  if (recShift) recShift.value = shiftVal;
  if (printModalSigDataUrl) currentSignatureDataUrl = printModalSigDataUrl;

  const currentRepData = {
    storeName: storeProfile.name,
    storeNumber: storeProfile.number,
    date:
      document.getElementById('rec-report-date')?.value ||
      new Date().toISOString().slice(0, 10),
    shiftType: shiftVal,
    cashierOut: cashierVal,
    cashierIn:
      document.getElementById('rec-cashier-in')?.value?.trim() || '-',
    totals: recalculateReconciliationTotals(),
    signatureDataUrl: currentSignatureDataUrl,
    boxesSnapshot: boxes
  };

  if (formatChoice === 'thermal') {
    printThermalReceiptFromData(currentRepData, true);
  } else {
    printWorksheetDirect();
  }

  downloadFullTabletBackup(true);

  setTimeout(() => {
    if (
      confirm(
        'Worksheet printed and system backed up in the background!\n\n' +
          'Would you like to end the shift and start a new shift now?'
      )
    ) {
      advanceEndToStartForNewShift();
    } else {
      switchMainView(lastActiveViewName || 'grid');
    }
  }, 600);
}

function build80mmThermalHTML(repData) {
  const bList = Array.isArray(repData.boxesSnapshot)
    ? repData.boxesSnapshot
    : boxes;
  const totals = repData.totals || recalculateReconciliationTotals();
  const basePt = Number(globalPrintFontSizePt) || 11;
  const storeAddr = storeProfile.address || 'Sparta, TN 38583';

  let itemsHtml = '';
  bList.forEach(box => {
    if (box.gameNum) {
      const m = calculateBoxMetrics(box);
      const gName = String(
        box.gameName || 'GAME #' + box.gameNum
      ).toUpperCase();
      const endDisp =
        box.endTicket !== '' && box.endTicket !== undefined
          ? box.endTicket
          : '____';
      const startDisp =
        box.startTicket !== '' && box.startTicket !== undefined
          ? box.startTicket
          : 0;

      itemsHtml += `
        <div style="border-bottom: 1px dashed #000; padding: 3px 0;">
          <div style="display:flex; justify-content:space-between; font-weight:bold;">
            <span>[BOX ${box.boxNumber}] #${box.gameNum} ${gName}</span>
            <span>$${box.price}</span>
          </div>
          <div style="display:flex; justify-content:space-between;">
            <span>Start:${startDisp}  End:${endDisp}</span>
            <span style="font-weight:bold;">
              ${m.ticketsSold} Sold ($${m.dollarSales.toFixed(2)})
            </span>
          </div>
        </div>
      `;
    }
  });

  const sigHtml = repData.signatureDataUrl
    ? `<img src="${repData.signatureDataUrl}" style="max-height:42px; max-width:180px; margin:4px auto; display:block;" />`
    : `<div style="margin:14px 0 4px; border-bottom:1px solid #000;"></div>`;

  return `
    <style>
      @page {
        size: 80mm auto;
        margin: 2mm;
      }
      @media print {
        html, body {
          width: 76mm !important;
          margin: 0 !important;
          padding: 0 !important;
          background: #fff !important;
          color: #000 !important;
        }
        #app-shell, .no-print { display: none !important; }
        #print-container {
          display: block !important;
          width: 76mm !important;
        }
      }
    </style>
    <div style="width:74mm; font-family:'Courier New', monospace; font-size:${basePt}pt; line-height:1.25; color:#000;">
      <div style="text-align:center; border-bottom:2px solid #000; padding-bottom:4px; margin-bottom:4px;">
        <div style="font-size:${basePt + 2}pt; font-weight:900;">
          ${repData.storeName || storeProfile.name}
        </div>
        <div style="font-weight:bold;">
          STORE #${repData.storeNumber || storeProfile.number}
        </div>
        <div style="font-size:${basePt - 2}pt;">${storeAddr}</div>
        <div style="font-weight:bold; margin-top:2px;">
          *** LOTTO COUNT WORKSHEET ***
        </div>
      </div>

      <div style="border-bottom:1px dashed #000; padding-bottom:4px; margin-bottom:4px; font-weight:bold;">
        <div>DATE: ${repData.date}</div>
        <div>SHIFT: ${repData.shiftType}</div>
        <div>OUT: ${repData.cashierOut || '-'}</div>
        <div>IN: ${repData.cashierIn || '-'}</div>
      </div>

      <div>${itemsHtml}</div>

      <div style="border-top:2px solid #000; border-bottom:2px solid #000; padding:4px 0; margin:6px 0; font-weight:bold;">
        <div style="display:flex; justify-content:space-between;">
          <span>TOTAL TICKETS SOLD:</span>
          <span>${totals.totalTickets || 0}</span>
        </div>
        <div style="display:flex; justify-content:space-between;">
          <span>SCRATCH SALES:</span>
          <span>$${Number(totals.scratchSales || 0).toFixed(2)}</span>
        </div>
        <div style="display:flex; justify-content:space-between;">
          <span>ONLINE SALES:</span>
          <span>$${Number(totals.onlineSales || 0).toFixed(2)}</span>
        </div>
        <div style="display:flex; justify-content:space-between;">
          <span>SCRATCH CASHED:</span>
          <span>-$${Number(totals.scratchCashed || 0).toFixed(2)}</span>
        </div>
        <div style="display:flex; justify-content:space-between;">
          <span>ONLINE CASHED:</span>
          <span>-$${Number(totals.onlineCashed || 0).toFixed(2)}</span>
        </div>
        <div style="border-top:1px dashed #000; margin-top:3px; padding-top:3px; display:flex; justify-content:space-between;">
          <span>EXPECTED NET:</span>
          <span>$${Number(totals.expectedNet || 0).toFixed(2)}</span>
        </div>
        <div style="display:flex; justify-content:space-between;">
          <span>POS ACTUAL:</span>
          <span>$${Number(totals.posActual || 0).toFixed(2)}</span>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:${basePt + 1}pt; font-weight:900;">
          <span>VARIANCE:</span>
          <span>$${Number(totals.variance || 0).toFixed(2)}</span>
        </div>
      </div>

      <div style="text-align:center; padding-top:4px;">
        <div style="font-weight:bold;">CASHIER SIGNATURE</div>
        ${sigHtml}
        <div style="font-size:${basePt - 3}pt; margin-top:4px;">
          "I certify that the ticket counts and shift totals recorded are true and accurate."
        </div>
        <div style="font-size:${basePt - 3}pt; margin-top:4px;">
          ${new Date().toLocaleString()}
        </div>
      </div>
    </div>
  `;
}

function printThermalReceiptFromData(repData, alsoSavePdf = false) {
  let printContainer = document.getElementById('print-container');
  if (!printContainer) {
    printContainer = document.createElement('div');
    printContainer.id = 'print-container';
    document.body.appendChild(printContainer);
  }
  printContainer.innerHTML = build80mmThermalHTML(repData);
  window.print();

  if (alsoSavePdf && window.jspdf) {
    try {
      printThermalReceiptDirect();
    } catch (e) {}
  }
}

function getCurrentlyFilteredReportsForPrint() {
  const mode = document.getElementById('report-filter-mode')?.value || 'daily';
  const filterDate =
    document.getElementById('report-filter-date')?.value ||
    new Date().toISOString().slice(0, 10);
  const filterMonth =
    document.getElementById('report-filter-month')?.value ||
    new Date().toISOString().slice(0, 7);
  const filterShift =
    document.getElementById('report-filter-shift-type')?.value || 'ALL';

  const allHistory = getLocationHistoricalReports(activeLocationId);
  let filtered = [];
  if (mode === 'monthly') {
    filtered = allHistory.filter(
      r => (r.monthKey || r.date?.slice(0, 7)) === filterMonth
    );
  } else if (mode === 'shift') {
    filtered = allHistory.filter(
      r =>
        r.date === filterDate &&
        (filterShift === 'ALL' || r.shiftType === filterShift)
    );
  } else {
    filtered = allHistory.filter(r => r.date === filterDate);
  }
  filtered.sort((a, b) => (a.shiftSequence || 1) - (b.shiftSequence || 1));
  return { filtered, mode, filterDate, filterMonth };
}

function printFilteredSummaryThermal(cashierName) {
  const { filtered, mode, filterDate, filterMonth } =
    getCurrentlyFilteredReportsForPrint();
  const basePt = Number(globalPrintFontSizePt) || 11;
  const periodLabel = mode === 'monthly' ? filterMonth : filterDate;

  let sumTickets = 0,
    sumScratch = 0,
    sumOnline = 0,
    sumExp = 0,
    sumPos = 0,
    sumVar = 0;

  const rowsHtml = filtered
    .map(r => {
      const t = r.totals || {};
      sumTickets += Number(t.totalTickets) || 0;
      sumScratch += Number(t.scratchSales) || 0;
      sumOnline += Number(t.onlineSales) || 0;
      sumExp += Number(t.expectedNet) || 0;
      sumPos += Number(t.posActual) || 0;
      sumVar += Number(t.variance) || 0;

      return `
        <div style="border-bottom:1px dashed #000; padding:3px 0;">
          <div style="font-weight:bold;">${r.date} — ${r.shiftType}</div>
          <div>Cashier: ${r.cashierOut || '-'} | Tix: ${t.totalTickets || 0}</div>
          <div style="display:flex; justify-content:space-between;">
            <span>Scratch: $${Number(t.scratchSales || 0).toFixed(2)}</span>
            <span>Var: $${Number(t.variance || 0).toFixed(2)}</span>
          </div>
        </div>
      `;
    })
    .join('');

  let printContainer = document.getElementById('print-container');
  if (!printContainer) {
    printContainer = document.createElement('div');
    printContainer.id = 'print-container';
    document.body.appendChild(printContainer);
  }

  printContainer.innerHTML = `
    <style>
      @page { size: 80mm auto; margin: 2mm; }
      @media print {
        html, body { width: 76mm !important; margin: 0 !important; padding: 0 !important; }
        #app-shell, .no-print { display: none !important; }
        #print-container { display: block !important; width: 76mm !important; }
      }
    </style>
    <div style="width:74mm; font-family:'Courier New', monospace; font-size:${basePt}pt; color:#000;">
      <div style="text-align:center; border-bottom:2px solid #000; padding-bottom:4px; margin-bottom:4px;">
        <div style="font-weight:900;">${storeProfile.name} (#${storeProfile.number})</div>
        <div style="font-weight:bold;">*** HISTORICAL AUDIT SUMMARY ***</div>
        <div>Period: ${periodLabel} (${filtered.length} Shifts)</div>
      </div>
      ${rowsHtml || '<div>No shift records found.</div>'}
      <div style="border-top:2px solid #000; margin-top:6px; padding-top:4px; font-weight:bold;">
        <div style="display:flex; justify-content:space-between;"><span>TOTAL TICKETS:</span><span>${sumTickets}</span></div>
        <div style="display:flex; justify-content:space-between;"><span>SCRATCH SALES:</span><span>$${sumScratch.toFixed(2)}</span></div>
        <div style="display:flex; justify-content:space-between;"><span>ONLINE SALES:</span><span>$${sumOnline.toFixed(2)}</span></div>
        <div style="display:flex; justify-content:space-between;"><span>EXPECTED NET:</span><span>$${sumExp.toFixed(2)}</span></div>
        <div style="display:flex; justify-content:space-between;"><span>POS ACTUAL:</span><span>$${sumPos.toFixed(2)}</span></div>
        <div style="display:flex; justify-content:space-between;"><span>NET VARIANCE:</span><span>$${sumVar.toFixed(2)}</span></div>
      </div>
      <div style="text-align:center; margin-top:8px; font-size:${basePt - 2}pt;">
        Printed by ${cashierName} • ${new Date().toLocaleString()}
      </div>
    </div>
  `;
  window.print();
}

function printFilteredSummaryLegal(cashierName) {
  const { filtered, mode, filterDate, filterMonth } =
    getCurrentlyFilteredReportsForPrint();
  const periodLabel = mode === 'monthly' ? filterMonth : filterDate;

  let sumTickets = 0,
    sumScratch = 0,
    sumOnline = 0,
    sumExp = 0,
    sumPos = 0,
    sumVar = 0;

  const rowsHtml = filtered
    .map(r => {
      const t = r.totals || {};
      sumTickets += Number(t.totalTickets) || 0;
      sumScratch += Number(t.scratchSales) || 0;
      sumOnline += Number(t.onlineSales) || 0;
      sumExp += Number(t.expectedNet) || 0;
      sumPos += Number(t.posActual) || 0;
      sumVar += Number(t.variance) || 0;

      return `
        <tr style="border-bottom:1px solid #cbd5e1; font-size:9px;">
          <td style="padding:4px; text-align:center;">${r.date}</td>
          <td style="padding:4px; font-weight:bold;">${r.shiftType}</td>
          <td style="padding:4px;">${r.cashierOut || '-'}</td>
          <td style="padding:4px; text-align:center;">${t.totalTickets || 0}</td>
          <td style="padding:4px; text-align:right;">$${Number(t.scratchSales || 0).toFixed(2)}</td>
          <td style="padding:4px; text-align:right;">$${Number(t.onlineSales || 0).toFixed(2)}</td>
          <td style="padding:4px; text-align:right;">$${Number(t.expectedNet || 0).toFixed(2)}</td>
          <td style="padding:4px; text-align:right;">$${Number(t.posActual || 0).toFixed(2)}</td>
          <td style="padding:4px; text-align:right; font-weight:bold;">$${Number(t.variance || 0).toFixed(2)}</td>
        </tr>
      `;
    })
    .join('');

  let printContainer = document.getElementById('print-container');
  if (!printContainer) {
    printContainer = document.createElement('div');
    printContainer.id = 'print-container';
    document.body.appendChild(printContainer);
  }

  printContainer.innerHTML = `
    <style>
      @page { size: letter portrait; margin: 0.25in; }
      @media print {
        #app-shell, .no-print { display: none !important; }
        #print-container { display: block !important; width: 100% !important; }
      }
    </style>
    <div style="font-family:Arial, sans-serif; color:#000;">
      <h2 style="margin:0 0 4px; font-size:14px; text-transform:uppercase;">
        ${storeProfile.name} (#${storeProfile.number}) — Historical Shift Audit Summary (${periodLabel})
      </h2>
      <table style="width:100%; border-collapse:collapse; margin-top:8px;">
        <thead>
          <tr style="background:#e2e8f0; border-bottom:2px solid #000; font-size:9px; text-transform:uppercase;">
            <th style="padding:4px;">Date</th>
            <th style="padding:4px; text-align:left;">Shift</th>
            <th style="padding:4px; text-align:left;">Cashier</th>
            <th style="padding:4px;">Tickets</th>
            <th style="padding:4px; text-align:right;">Scratch $</th>
            <th style="padding:4px; text-align:right;">Online $</th>
            <th style="padding:4px; text-align:right;">Expected Net</th>
            <th style="padding:4px; text-align:right;">POS Actual</th>
            <th style="padding:4px; text-align:right;">Variance</th>
          </tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
        <tfoot>
          <tr style="border-top:2px solid #000; font-weight:bold; font-size:10px; background:#f8fafc;">
            <td colspan="3" style="padding:5px;">TOTALS (${filtered.length} Shifts)</td>
            <td style="padding:5px; text-align:center;">${sumTickets}</td>
            <td style="padding:5px; text-align:right;">$${sumScratch.toFixed(2)}</td>
            <td style="padding:5px; text-align:right;">$${sumOnline.toFixed(2)}</td>
            <td style="padding:5px; text-align:right;">$${sumExp.toFixed(2)}</td>
            <td style="padding:5px; text-align:right;">$${sumPos.toFixed(2)}</td>
            <td style="padding:5px; text-align:right;">$${sumVar.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  `;
  window.print();
}
/* ==========================================================================
   SECURE BOX EDIT LOCK & 5-MINUTE TIMEOUT SYSTEM
   ========================================================================== */

let isBoxEditUnlocked = false;
let boxEditUnlockTimer = null;
let boxEditCurrentCashier = '';

function requestBoxEditUnlock(targetInputElem, callbackOnSuccess) {
  if (isBoxEditUnlocked) {
    resetBoxEditTimeout();
    if (typeof callbackOnSuccess === 'function') callbackOnSuccess();
    return;
  }

  const cashierName = prompt('🔒 Sensitive Setting Locked\n\nEnter Cashier Name to unlock Box#, Game#, and Start# edits for 5 minutes:');
  if (!cashierName || !cashierName.trim()) {
    if (targetInputElem) targetInputElem.blur();
    return;
  }

  boxEditCurrentCashier = cashierName.trim();
  isBoxEditUnlocked = true;
  startBoxEditTimeout();

  alert(`✔ Unlocked successfully for ${boxEditCurrentCashier}. You have 5 minutes to make changes.`);
  if (typeof callbackOnSuccess === 'function') callbackOnSuccess();
}

function startBoxEditTimeout() {
  if (boxEditUnlockTimer) clearTimeout(boxEditUnlockTimer);
  
  // 5 Minutes timeout (5 * 60 * 1000 ms)
  boxEditUnlockTimer = setTimeout(() => {
    isBoxEditUnlocked = false;
    
    const needMore = confirm(`⏱ Edit session expired after 5 minutes of inactivity for ${boxEditCurrentCashier}.\n\nDo you need more time to edit these settings?`);
    if (needMore) {
      isBoxEditUnlocked = true;
      startBoxEditTimeout();
    } else {
      boxEditCurrentCashier = '';
      alert('🔒 Box settings are now securely locked again.');
    }
  }, 300000); 
}

function resetBoxEditTimeout() {
  if (isBoxEditUnlocked) {
    startBoxEditTimeout(); // Refresh the 5-minute timer on activity
  }
}
/* ==========================================================================
   HIGH-RESOLUTION SCRATCH-OFF LOTTO APP ICON GENERATOR
   ========================================================================== */
function generateProLottoAppIcon() {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // 1. Rounded Royal Blue Background (#1e3a8a)
    ctx.fillStyle = '#1e3a8a';
    ctx.beginPath();
    ctx.roundRect(0, 0, 512, 512, 96);
    ctx.fill();

    // 2. Inner Golden Border
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 12;
    ctx.stroke();

    // 3. Top Title Text: "UR LOTTO" & "AUDIT"
    ctx.fillStyle = '#fef08a';
    ctx.font = '900 54px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('UR LOTTO', 256, 110);
    ctx.fillText('AUDIT', 256, 175);

    // 4. Render Scratch-Off Ticket Graphic Illustration
    ctx.save();
    ctx.translate(256, 320);
    ctx.rotate(-0.12);

    // Ticket Base (Gold/Bronze foil card)
    ctx.fillStyle = '#d97706';
    ctx.beginPath();
    ctx.roundRect(-160, -90, 320, 180, 20);
    ctx.fill();
    ctx.strokeStyle = '#fde68a';
    ctx.lineWidth = 6;
    ctx.stroke();

    // Silver Scratch Panel Box
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(-135, -45, 270, 115);

    // Winning Scratch Area ("WIN!")
    ctx.fillStyle = '#b91c1c';
    ctx.font = '900 48px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('WIN!', 0, 32);

    // Scratch off foil texture lines across the top
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 4;
    for (let i = -120; i < 120; i += 16) {
      ctx.beginPath();
      ctx.moveTo(i, -45);
      ctx.lineTo(i + 35, -15);
      ctx.stroke();
    }

    ctx.restore();

    // Convert canvas to permanent PNG Data URL
    const iconDataUrl = canvas.toDataURL('image/png');

    // Inject into document header links
    document.querySelectorAll("link[rel*='icon']").forEach(link => {
      link.type = 'image/png';
      link.href = iconDataUrl;
    });
    const touchIcon = document.getElementById('app-touch-icon');
    if (touchIcon) touchIcon.href = iconDataUrl;
  } catch (e) {
    console.error('Icon generator error:', e);
  }
}

// Automatically trigger icon generation on load
window.addEventListener('DOMContentLoaded', () => {
  generateProLottoAppIcon();
});
