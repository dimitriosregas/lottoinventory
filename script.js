/* ==========================================================================
   PROJECT LOTTO — CORE JAVASCRIPT LOGIC ENGINE (CLEAN RELOAD)
   ========================================================================== */

const STORAGE_KEY_LOCATIONS = 'project_lotto_locations_v1';
const STORAGE_KEY_ACTIVE_LOC = 'project_lotto_active_loc_id_v1';
const STORAGE_KEY_MASTER_GAMES = 'project_lotto_master_games_v1';
const WORKER_SYNC_URL = 'https://lottoinventory.dimitriosregas.workers.dev/games';
const ADMIN_NOTIFY_EMAIL = 'regas_shell@hotmail.com';

const DEFAULT_LOCATIONS = [
  { id: 'loc-regas-shell', name: 'Regas Shell', number: '101' },
  { id: 'loc-regas-exxon', name: 'Regas Exxon', number: '102' },
  { id: 'loc-regas-amaco', name: 'Regas Amaco', number: '103' },
  { id: 'loc-regas-xpress', name: 'Regas Xpress', number: '104' }
];

const DEFAULT_MASTER_GAMES = [
  { gameNum: '854', name: 'BINGO JUMBO', price: 3, count: 100 },
  { gameNum: '1001', name: 'JUMBO BUCKS', price: 1, count: 300 },
  { gameNum: '1002', name: 'DOUBLE JUMBO BUCKS', price: 2, count: 150 },
  { gameNum: '1003', name: 'BIG MONEY CASH', price: 3, count: 100 },
  { gameNum: '1005', name: 'JUMBO BUCKS CLASSIC', price: 5, count: 60 },
  { gameNum: '1010', name: 'MEGA BUCKS 10X', price: 10, count: 60 },
  { gameNum: '1020', name: 'MILLIONAIRE JUMBO BUCKS', price: 20, count: 30 },
  { gameNum: '1025', name: 'MAX MONEY MULTIPLIER', price: 25, count: 30 },
  { gameNum: '1030', name: 'DIAMOND SPECTACULAR', price: 30, count: 30 },
  { gameNum: '1050', name: '$1,000,000 CASH BONANZA', price: 50, count: 20 },
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
let storeProfile = { name: 'Regas Shell', number: '101' };
let boxes = [];
let masterGames = [];
let currentDispenserView = 'grid';
let currentSignatureDataUrl = null;
let isDrawingSignature = false;
let sigCanvas = null;
let sigCtx = null;

function getDefaultRollCountForPrice(price) {
  const p = Number(price);
  if (!p || p <= 0) return 300;
  if (p <= 20) return Math.round(300 / p);
  if (p === 25) return 24;
  if (p === 30) return 20;
  if (p === 50) return 18;
  return Math.round(300 / p);
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
  const savedActive = localStorage.getItem(STORAGE_KEY_ACTIVE_LOC);
  if (savedActive && locations.some(l => l.id === savedActive)) {
    activeLocationId = savedActive;
  } else {
    activeLocationId = locations[0]?.id || 'loc-regas-shell';
  }
  loadActiveStoreData();
  populateLocationSwitcherDropdown();
}

function loadActiveStoreData() {
  const profKey = getStoreProfileStorageKey(activeLocationId);
  const activeLocObj = locations.find(l => l.id === activeLocationId);
  try {
    const pRaw = localStorage.getItem(profKey);
    if (pRaw) {
      storeProfile = JSON.parse(pRaw);
    } else if (activeLocObj) {
      storeProfile = { name: activeLocObj.name, number: activeLocObj.number, address: activeLocObj.address || '', email: activeLocObj.email || '', password: activeLocObj.password || '' };
    } else {
      storeProfile = { name: 'Regas Shell', number: '101', address: '', email: '', password: '' };
    }
  } catch (e) {
    storeProfile = { name: activeLocObj?.name || 'Regas Shell', number: activeLocObj?.number || '101', address: '', email: '', password: '' };
  }

  const adminName = document.getElementById('admin-store-name');
  const adminNum = document.getElementById('admin-store-number');
  const adminAddr = document.getElementById('admin-store-address');
  const adminEmail = document.getElementById('admin-store-email');
  const adminPass = document.getElementById('admin-store-pass');

  if (adminName) adminName.value = storeProfile.name || '';
  if (adminNum) adminNum.value = storeProfile.number || '';
  if (adminAddr) adminAddr.value = storeProfile.address || '';
  if (adminEmail) adminEmail.value = storeProfile.email || '';
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
}

function saveBoxesState() {
  try { localStorage.setItem(getStoreBoxesStorageKey(activeLocationId), JSON.stringify(boxes)); } catch (e) {}
}

function saveActiveStoreProfile() {
  const nameInp = document.getElementById('admin-store-name')?.value?.trim();
  const numInp = document.getElementById('admin-store-number')?.value?.trim();
  const addrInp = document.getElementById('admin-store-address')?.value?.trim() || '';
  const emailInp = document.getElementById('admin-store-email')?.value?.trim() || '';
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
    locations[locIdx].password = storeProfile.password;
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
  if (typeof executeReportLookup === 'function') executeReportLookup();
}
function calculateBoxMetrics(box) {
  if (!box || !box.gameNum) {
    return { ticketsSold: 0, dollarSales: 0, status: 'empty', hasRollover: false, activeTicket: '-' };
  }

  const price = Number(box.price) || 0;
  const start = Number(box.startTicket) || 0;
  const endVal = box.endTicket;
  const rollovers = Array.isArray(box.rollovers) ? box.rollovers : [];

  if (endVal === '' || endVal === undefined || endVal === null) {
    return { ticketsSold: 0, dollarSales: 0, status: 'pending', hasRollover: rollovers.length > 0, activeTicket: start };
  }

  const end = Number(endVal);
  let ticketsSold = 0;

  if (rollovers.length > 0) {
    let currentStart = start;
    rollovers.forEach(ro => {
      const finishedAt = Number(ro.finishedTicket ?? ro.endTicket ?? 0);
      if (finishedAt >= currentStart) ticketsSold += (finishedAt - currentStart);
      else ticketsSold += Math.max(0, currentStart);
      currentStart = 0;
    });
    if (end >= currentStart) ticketsSold += (end - currentStart);
    else ticketsSold += Math.max(0, currentStart);
  } else {
    if (end >= start) ticketsSold = end - start;
    else ticketsSold = Math.max(0, start - end);
  }

  ticketsSold = Math.max(0, ticketsSold);
  const dollarSales = ticketsSold * price;

  let status = 'complete';
  if (rollovers.length > 0) status = 'rollover';
  else if (ticketsSold === 0 && end === start) status = 'pending';

  return { ticketsSold, dollarSales, status, hasRollover: rollovers.length > 0, activeTicket: end };
}

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
  box.endTicket = val === '' ? '' : Number(val);
  saveBoxesState();
  updateBoxMetricsDisplay(idx);
  updateHeaderTotalsUI();
  recalculateReconciliationTotals();
}

function handleGridEnter(event, currentIdx) {
  if (event.key === 'Enter') {
    event.preventDefault();
    const nextIdx = currentIdx + 1;
    if (nextIdx < boxes.length) {
      const nextInp = document.getElementById(`input-endTicket-${nextIdx}`);
      if (nextInp) { nextInp.focus(); nextInp.select(); }
    }
  }
}

function updateBoxMetricsDisplay(idx) {
  const box = boxes[idx];
  if (!box) return;
  const metrics = calculateBoxMetrics(box);
  const hasGame = Boolean(box.gameNum);
  const roCount = Array.isArray(box.rollovers) ? box.rollovers.length : 0;

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
    listName.innerHTML = hasGame
      ? (box.gameName || `Game #${box.gameNum}`) + (box.needsNewGameEntry ? ` <button type="button" onclick="openQuickGameModal(${idx})" class="ml-1 text-[10px] font-extrabold underline text-blue-700">+ Register</button>` : '')
      : '<span class="text-slate-400 italic">Empty Box</span>';
  }
  if (listPrice) listPrice.textContent = hasGame && box.price ? '$' + box.price : '-';
  if (listSold) listSold.textContent = `${metrics.ticketsSold}${roCount > 0 ? ' *' : ''}`;
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
      const roCount = Array.isArray(box.rollovers) ? box.rollovers.length : 0;
      return `
        <tr style="border-bottom: 1px solid #e2e8f0; background: #fff;" class="hover:bg-slate-50 transition">
          <td style="padding: 6px 8px; text-align: center; background: #0f172a;">
            <input type="text" value="${box.boxNumber || (idx + 1)}" oninput="updateBoxLabelDirect(${idx}, this.value)" title="Edit Box #" class="w-12 text-center text-xs font-mono font-black rounded px-1 py-0.5 lotto-input" />
          </td>
          <td style="padding: 6px 8px; text-align: center; font-family: monospace; font-weight: bold;">
            <input type="text" id="list-input-gameNum-${idx}" value="${box.gameNum || ''}" oninput="updateBoxFieldDirect(${idx}, 'gameNum', this.value)" placeholder="Game#" class="w-16 text-center text-xs border border-slate-300 rounded px-1 py-0.5 font-mono lotto-input" />
          </td>
          <td id="list-gamename-${idx}" style="padding: 6px 8px; font-weight: 600;">
            ${hasGame ? (box.gameName || 'Game #' + box.gameNum) + (box.needsNewGameEntry ? ` <button type="button" onclick="openQuickGameModal(${idx})" class="ml-1 text-[10px] font-extrabold underline text-blue-700">+ Register</button>` : '') : '<span class="text-slate-400 italic">Empty Box</span>'}
          </td>
          <td id="list-price-${idx}" style="padding: 6px 8px; text-align: center; font-weight: bold; color: #047857;">${hasGame && box.price ? '$' + box.price : '-'}</td>
          <td style="padding: 6px 8px; text-align: center; font-family: monospace;">
            <input type="number" id="list-input-startTicket-${idx}" value="${box.startTicket !== '' && box.startTicket !== undefined ? box.startTicket : 0}" oninput="updateBoxFieldDirect(${idx}, 'startTicket', this.value)" class="w-16 text-center text-xs border border-slate-300 rounded px-1 py-0.5 font-mono lotto-input" />
          </td>
          <td style="padding: 6px 8px; text-align: center; font-family: monospace;">
            <input type="number" id="input-endTicket-${idx}" value="${box.endTicket !== '' && box.endTicket !== undefined ? box.endTicket : ''}" oninput="updateBoxEndTicketLive(${idx}, this.value)" onkeydown="handleGridEnter(event, ${idx})" placeholder="End#" class="w-16 text-center text-xs border border-slate-300 rounded px-1 py-0.5 font-mono font-bold lotto-input" />
          </td>
          <td id="list-sold-${idx}" style="padding: 6px 8px; text-align: center; font-weight: bold;">${m.ticketsSold}${roCount > 0 ? ' *' : ''}</td>
          <td id="list-sales-${idx}" style="padding: 6px 8px; text-align: right; font-family: monospace; font-weight: 900; color: #047857;">$${m.dollarSales.toFixed(2)}</td>
          <td style="padding: 6px 8px; text-align: center;">
            <button type="button" onclick="rollNewPackInBox(${idx})" class="text-[10px] bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold px-2 py-1 rounded transition">Roll</button>
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
              <th style="padding: 8px;">Game Name</th>
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

    html += `
      <div id="dispenser-card-${idx}" class="dispenser-card bg-white rounded-xl border border-slate-200 p-3 shadow-sm flex flex-col justify-between ${statusClass}">
        <div class="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
          <div class="flex items-center gap-2">
            <input type="text" value="${box.boxNumber || (idx + 1)}" oninput="updateBoxLabelDirect(${idx}, this.value)" title="Edit Box #" class="w-10 h-7 text-center rounded-lg font-black text-xs font-mono lotto-input" />
            <div class="leading-tight">
              <div id="box-title-${idx}" class="font-bold text-xs text-slate-800 truncate max-w-[140px]">${hasGame ? (box.gameName || 'Game #' + box.gameNum) : '<span class="text-slate-400 italic">Empty Box</span>'}</div>
              <div id="box-sub-${idx}" class="text-[10px] text-slate-500 font-medium">${hasGame ? `$${box.price} • ${box.rollCount} tix/pk` : 'Assign game below'}</div>
            </div>
          </div>
          <button type="button" onclick="rollNewPackInBox(${idx})" class="text-[11px] font-bold px-2 py-1 rounded transition border ${rollovers.length > 0 ? 'bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200' : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'}">
            ${rollovers.length > 0 ? `★ ${rollovers.length} Rollover` : 'Roll'}
          </button>
        </div>
        <div class="space-y-2 mb-2">
          <div class="flex items-center gap-2">
            <label class="text-[10px] font-bold text-slate-500 uppercase w-12">Game #:</label>
            <input type="text" id="input-gameNum-${idx}" value="${box.gameNum || ''}" placeholder="e.g. 1005" oninput="updateBoxFieldDirect(${idx}, 'gameNum', this.value)" class="flex-1 text-xs font-mono font-bold border border-slate-300 rounded px-2 py-1 lotto-input" />
          </div>
          <div id="box-unknown-wrap-${idx}" class="${box.needsNewGameEntry ? '' : 'hidden'} p-1.5 bg-red-50 border border-red-200 rounded text-[10px] text-red-700 flex items-center justify-between">
            <span>Unknown Game #</span>
            <button type="button" onclick="openQuickGameModal(${idx})" class="font-extrabold underline text-blue-700 hover:text-blue-900">+ Register</button>
          </div>
          <div class="grid grid-cols-2 gap-2 pt-1">
            <div>
              <label class="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">Start #</label>
              <input type="number" id="input-startTicket-${idx}" value="${box.startTicket !== undefined ? box.startTicket : 0}" oninput="updateBoxFieldDirect(${idx}, 'startTicket', this.value)" placeholder="000" class="w-full text-center font-mono font-bold text-xs border border-slate-300 rounded p-1.5 lotto-input" />
            </div>
            <div>
              <label class="block text-[10px] font-bold text-blue-700 uppercase mb-0.5">End #</label>
              <input type="number" id="input-endTicket-${idx}" value="${box.endTicket !== '' && box.endTicket !== undefined ? box.endTicket : ''}" oninput="updateBoxEndTicketLive(${idx}, this.value)" onkeydown="handleGridEnter(event, ${idx})" placeholder="000" class="w-full text-center font-mono font-bold text-xs border-2 border-blue-400 rounded p-1.5 lotto-input" />
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
    msgElem.innerHTML = `You typed ticket <strong>#${typedEndValue}</strong>, which is lower than the start ticket (<strong>#${box.startTicket}</strong>).<br><br>Did you finish the previous pack and start a new roll?`;
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
  const oldPackSold = Math.max(0, maxTicket - start);
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

function cancelRolloverModal() {
  document.getElementById('modal-box-rollover').classList.add('hidden');
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
function recalculateReconciliationTotals() {
  let scratchSales = 0;
  let totalTickets = 0;
  boxes.forEach(b => {
    const m = calculateBoxMetrics(b);
    scratchSales += m.dollarSales;
    totalTickets += m.ticketsSold;
  });

  const onlineSales = Number(document.getElementById('rec-online-sales')?.value) || 0;
  const scratchCashed = Number(document.getElementById('rec-scratch-cashed')?.value) || 0;
  const onlineCashed = Number(document.getElementById('rec-online-cashed')?.value) || 0;
  const posActual = Number(document.getElementById('rec-pos-actual')?.value) || 0;

  const expectedNet = (scratchSales + onlineSales) - (scratchCashed + onlineCashed);
  const variance = posActual - expectedNet;

  const scEl = document.getElementById('rec-scratch-sales');
  const expEl = document.getElementById('rec-expected-total');
  const varEl = document.getElementById('rec-variance-display');
  const accEl = document.getElementById('rec-accounted-total');

  if (scEl) scEl.textContent = `$${scratchSales.toFixed(2)}`;
  if (expEl) expEl.textContent = `$${expectedNet.toFixed(2)}`;
  if (accEl) accEl.textContent = `$${posActual.toFixed(2)}`;

  if (varEl) {
    const sign = variance > 0 ? '+' : '';
    varEl.textContent = `${sign}$${variance.toFixed(2)}`;
    varEl.className = Math.abs(variance) < 0.01 ? 'font-mono font-black text-lg text-emerald-600' : (variance < 0 ? 'font-mono font-black text-lg text-red-600' : 'font-mono font-black text-lg text-amber-600');
  }

  saveReconciliationDraft();
  return { scratchSales, totalTickets, onlineSales, scratchCashed, onlineCashed, expectedNet, posActual, variance };
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
  const reportDate = document.getElementById('rec-report-date')?.value || new Date().toISOString().slice(0, 10);
  const shiftType = document.getElementById('rec-shift-type')?.value || 'Shift 1 (Morning)';
  const cashierOut = document.getElementById('rec-cashier-out')?.value?.trim() || 'Unspecified Cashier';
  const cashierIn = document.getElementById('rec-cashier-in')?.value?.trim() || '-';
  const notes = document.getElementById('rec-shift-notes')?.value?.trim() || '';

  const reportRecord = {
    reportId: `rep_${activeLocationId}_${reportDate}_${Date.now()}`,
    timestamp: new Date().toISOString(),
    locationId: activeLocationId,
    storeName: storeProfile.name,
    storeNumber: storeProfile.number,
    date: reportDate,
    monthKey: reportDate.slice(0, 7),
    shiftType,
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

  const ind = document.getElementById('last-archived-indicator');
  if (ind) ind.textContent = `✔ Archived ${reportDate} (${shiftType}) at ${new Date().toLocaleTimeString()}`;

  exportCurrentLocationBackup();
  alert(`Shift Report for ${storeProfile.name} archived successfully!`);
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
  const now = new Date();
  const targetMonth = document.getElementById('report-filter-month')?.value || now.toISOString().slice(0, 7);
  const allStoresArchive = locations.map(loc => ({
    location: loc,
    reports: getLocationHistoricalReports(loc.id).filter(r => (r.monthKey || r.date?.slice(0, 7)) === targetMonth)
  }));
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(allStoresArchive, null, 2));
  const a = document.createElement('a');
  a.setAttribute('href', dataStr);
  a.setAttribute('download', `MonthlyLottoArchive_${targetMonth}.json`);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
function saveNewMasterGameManual() {
  const numInp = document.getElementById('new-game-num');
  const nameInp = document.getElementById('new-game-name');
  const priceInp = document.getElementById('new-game-price');

  const gNum = numInp?.value?.trim();
  const gName = nameInp?.value?.trim().toUpperCase();
  const price = Number(priceInp?.value) || 1;

  if (!gNum || !gName) { alert('Please enter both a Game Number and a Game Name.'); return; }
  const count = getDefaultRollCountForPrice(price);
  const newEntry = { gameNum: gNum, name: gName, price, count };

  const idx = masterGames.findIndex(g => String(g.gameNum).trim() === gNum);
  if (idx >= 0) masterGames[idx] = newEntry;
  else masterGames.push(newEntry);

  masterGames = sanitizeMasterGamesList(masterGames);
  saveGamesState();

  if (numInp) numInp.value = '';
  if (nameInp) nameInp.value = '';
  if (priceInp) priceInp.value = '';

  renderAdminGamesTable();
  renderDispenserGrid();
  recalculateReconciliationTotals();
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
          <span>Slot #${idx + 1}</span>
          <span class="text-emerald-700 font-mono">${hasGame && box.price ? '$' + box.price : ''}</span>
        </div>
        <div class="mb-1.5">
          <input type="text" id="admin-box-label-inp-${idx}" value="${box.boxNumber || (idx + 1)}" oninput="updateBoxLabelDirect(${idx}, this.value)" class="w-full text-center font-mono font-black text-xs border rounded py-1 px-1.5 bg-white lotto-input" />
        </div>
        <div class="text-[10px] text-slate-600 truncate font-medium">${gameLabel}</div>
      </div>
    `;
  });
  container.innerHTML = html;
}

function updateBoxLabelDirect(idx, val) {
  if (!boxes[idx]) return;
  boxes[idx].boxNumber = val === '' ? String(idx + 1) : String(val).trim();
  saveBoxesState();
  const adminInp = document.getElementById(`admin-box-label-inp-${idx}`);
  if (adminInp && document.activeElement !== adminInp) {
    adminInp.value = boxes[idx].boxNumber;
  }
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
  if (viewName === 'grid') renderDispenserGrid();
  else if (viewName === 'reconcile') recalculateReconciliationTotals();
  else if (viewName === 'reports') executeReportLookup();
  else if (viewName === 'admin') { renderAdminGamesTable(); renderAdminBoxLabelsGrid(); }
}

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
      <tr style="border-bottom: 1px solid #cbd5e1; font-size: 8px;">
        <td style="padding: 2px 4px; text-align: center; font-weight: 900; background: #0f172a; color: #fff;">${box.boxNumber}</td>
        <td style="padding: 2px 4px; text-align: center; font-family: monospace; font-weight: bold;">${box.gameNum || '-'}</td>
        <td style="padding: 2px 4px; font-weight: 600;">${hasGame ? (box.gameName || 'Game #' + box.gameNum) : '<span style="color:#94a3b8;">Empty</span>'}</td>
        <td style="padding: 2px 4px; text-align: center; font-weight: bold; color: #047857;">${hasGame && box.price ? '$' + box.price : '-'}</td>
        <td style="padding: 2px 4px; text-align: center; font-family: monospace;">${box.startTicket !== '' ? box.startTicket : '-'}</td>
        <td style="padding: 2px 4px; text-align: center; font-family: monospace; font-weight: bold;">${box.endTicket !== '' && box.endTicket !== undefined ? box.endTicket : '-'}</td>
        <td style="padding: 2px 4px; text-align: center; font-weight: bold;">${m.ticketsSold}${roCount > 0 ? ' *' : ''}</td>
        <td style="padding: 2px 4px; text-align: right; font-family: monospace; font-weight: 900; color: #047857;">$${m.dollarSales.toFixed(2)}</td>
      </tr>
    `;
  }).join('');

  const sigImgHtml = repData.signatureDataUrl ? `<img src="${repData.signatureDataUrl}" style="max-height: 22px; max-width: 130px; object-fit: contain;" alt="Signature" />` : `<span style="color: #94a3b8; font-size: 7.5px;">______________________________</span>`;

  return `
    <style>
      @page { size: letter portrait; margin: 0.18in 0.22in; }
      @media print {
        html, body { margin: 0 !important; padding: 0 !important; height: 100% !important; background: #fff !important; color: #000 !important; overflow: hidden !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        body > header, body > main, body > div.fixed, #app-shell, .no-print { display: none !important; }
        #print-container { display: block !important; width: 100% !important; }
        .one-page-print-sheet { width: 100%; max-height: 10.45in; page-break-inside: avoid !important; }
      }
    </style>
    <div class="one-page-print-sheet" style="font-family: Arial, sans-serif; color: #000; font-size: 8px; line-height: 1.1;">
      <div style="display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2px solid #000; padding-bottom: 2px; margin-bottom: 3px;">
        <div>
          <div style="font-size: 12px; font-weight: 900; text-transform: uppercase;">
            ${repData.storeName || storeProfile.name} (#${repData.storeNumber || storeProfile.number}) — ${isFinalReport ? 'Shift Lottery Audit' : 'Shift Count Worksheet'}
          </div>
          <div style="font-size: 8px; color: #334155; margin-top: 1px;">Date: <strong>${repData.date}</strong>  |  Shift: <strong>${repData.shiftType}</strong></div>
        </div>
        <div style="text-align: right; font-size: 7.5px; font-weight: bold;">AUDIT REPORT</div>
      </div>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 4px;">
        <thead>
          <tr style="background: #e2e8f0; border-bottom: 1.5px solid #000; font-size: 7.5px; text-transform: uppercase;">
            <th style="padding: 3px; text-align: center; width: 32px;">Box</th>
            <th style="padding: 3px; text-align: center; width: 55px;">Game #</th>
            <th style="padding: 3px; text-align: left;">Game Name</th>
            <th style="padding: 3px; text-align: center; width: 35px;">Price</th>
            <th style="padding: 3px; text-align: center; width: 50px;">Start</th>
            <th style="padding: 3px; text-align: center; width: 50px;">End</th>
            <th style="padding: 3px; text-align: center; width: 35px;">Sold</th>
            <th style="padding: 3px; text-align: right; width: 65px;">Sales $</th>
          </tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
      </table>
      <div style="border: 1.5px solid #000; padding: 3px 5px; background: #f8fafc;">
        <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 2px; border-bottom: 1px solid #94a3b8; padding-bottom: 2px; margin-bottom: 2px; text-align: center; font-size: 7.5px;">
          <div><span>Total Sold:</span><div style="font-family:monospace; font-weight:900; font-size:9px;">${gtTickets} tix</div></div>
          <div><span>Scratch Sales:</span><div style="font-family:monospace; font-weight:900; font-size:9px; color:#047857;">$${gtSales.toFixed(2)}</div></div>
          <div><span>Online Sales:</span><div style="font-family:monospace; font-weight:900; font-size:9px;">$${(Number(t.onlineSales) || 0).toFixed(2)}</div></div>
          <div><span>Expected Net:</span><div style="font-family:monospace; font-weight:900; font-size:9px;">$${(Number(t.expectedNet) || 0).toFixed(2)}</div></div>
          <div><span>POS Actual:</span><div style="font-family:monospace; font-weight:900; font-size:9px;">$${(Number(t.posActual) || 0).toFixed(2)}</div></div>
          <div><span>Variance:</span><div style="font-family:monospace; font-weight:900; font-size:9px;">${variance > 0 ? '+' : ''}$${variance.toFixed(2)}</div></div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 6px;">
          <div style="flex: 1.2;">
            <div style="display: flex; gap: 10px; font-size: 7.5px;">
              <div><strong>Outgoing:</strong> ${repData.cashierOut || ' '}</div>
              <div><strong>Incoming:</strong> ${repData.cashierIn || ' '}</div>
            </div>
          </div>
          <div style="width: 140px; text-align: center; border-left: 1px solid #94a3b8; padding-left: 4px;">
            <div style="height: 24px; display: flex; align-items: center; justify-content: center;">${sigImgHtml}</div>
            <div style="font-size: 6.5px; font-weight: bold; text-transform: uppercase; border-top: 1px solid #000;">Cashier Signature</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function printWorksheet() {
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
    cashierOut: document.getElementById('rec-cashier-out')?.value?.trim() || '____________________',
    cashierIn: '____________________',
    totals: recalculateReconciliationTotals(),
    signatureDataUrl: null,
    boxesSnapshot: boxes
  }, false);
  window.print();
}

function printFinalReport() {
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
    cashierOut: document.getElementById('rec-cashier-out')?.value?.trim() || '____________________',
    cashierIn: document.getElementById('rec-cashier-in')?.value?.trim() || '____________________',
    totals: recalculateReconciliationTotals(),
    signatureDataUrl: currentSignatureDataUrl,
    boxesSnapshot: boxes
  }, true);
  window.print();
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

function printFilteredReportSummary() {
  window.print();
}

window.addEventListener('DOMContentLoaded', () => {
  loadMasterGames();
  initActiveLocation();
  const todayIso = new Date().toISOString().slice(0, 10);
  const monthIso = todayIso.slice(0, 7);
  if (document.getElementById('report-filter-date')) document.getElementById('report-filter-date').value = todayIso;
  if (document.getElementById('report-filter-month')) document.getElementById('report-filter-month').value = monthIso;

  renderDispenserGrid();
  renderAdminGamesTable();
  renderAdminBoxLabelsGrid();
  loadReconciliationDraft();
  recalculateReconciliationTotals();
  initSignaturePad();
  executeReportLookup();
});
