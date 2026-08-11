import './style.css';
import monthlyCat from './assets/pets/monthly-cat.png';
import calicoCat from './assets/pets/calico-cat.png';
import blueCat from './assets/pets/blue-cat.png';
import starCat from './assets/pets/star-cat.png';
import bigeyeCat from './assets/pets/bigeye-cat.png';
import creamCat from './assets/pets/cream-cat.png';

const STORAGE_KEY = 'moyu-wallet-settings-v1';
const THEME_KEY = 'moyu-wallet-skin-v1';
const QUEST_KEY = 'moyu-wallet-quests-v1';
const COPY_KEY = 'moyu-wallet-copy-v1';
const HALF_HOUR_MS = 30 * 60 * 1000;
const defaults = {
  salary: 10000,
  startTime: '08:00', endTime: '12:00',
  afternoonStartTime: '14:00', afternoonEndTime: '18:00',
  payday: 10, workdays: [1, 2, 3, 4, 5]
};
const skins = {
  monthly: { name: '月薪喵', personality: '打工打到捂脸', image: monthlyCat },
  calico: { name: '元气三花', personality: '今天也超有干劲', image: calicoCat },
  blue: { name: '蓝莓哭哭', personality: '委屈但工资照拿', image: blueCat },
  star: { name: '星星眼灰猫', personality: '眼里只有下班', image: starCat },
  bigeye: { name: '大眼豆豆', personality: '安静观察工资', image: bigeyeCat },
  cream: { name: '奶油团子', personality: '软乎乎等下班', image: creamCat }
};
const copyPacks = [
  { name: '月薪喵', kicker: '月薪喵陪你带薪长大', line1: '今天也在', line2: '一边摸鱼，一边', highlight: '发财', description: '别小看工位上的每一秒，月薪喵都帮你换成小钱钱啦。' },
  { name: '工位小金库', kicker: '今日份小钱钱正在派送', line1: '工位坐得住', line2: '钱包', highlight: '胖嘟嘟', description: '你负责稳稳坐住，小金库负责悄悄长大。' },
  { name: '薪薪乐园', kicker: '打工崽的快乐补给站', line1: '上班有点累', line2: '但钱钱', highlight: '很可爱', description: '再坚持一下，你的小钱钱正在排队到账。' },
  { name: '带薪小日子', kicker: '认真上班，偷偷生活', line1: '今天的努力', line2: '正在变成', highlight: '底气', description: '工作只是生活的一部分，但赚到的钱是真的呀。' },
  { name: '摸鱼发发站', kicker: '工位限定发财现场', line1: '摸一会儿鱼', line2: '涨一点', highlight: '钱', description: '看似安静坐着，其实钱包正在努力营业。' },
  { name: '钱钱来报到', kicker: '打工人的到账观察室', line1: '叮咚一下', line2: '今天又有', highlight: '钱啦', description: '每熬过一秒，都有一小笔工资向你跑来。' },
  { name: '工位发财局', kicker: '今天也来参加带薪活动', line1: '人还在工位', line2: '钱已经在', highlight: '路上', description: '保持呼吸，保持坐姿，发财进度正在自动加载。' },
  { name: '薪水冒泡屋', kicker: '捕捉每一颗工资泡泡', line1: '咕嘟咕嘟', line2: '小钱钱在', highlight: '冒泡', description: '今天赚到的每一分钱，都在认真回应你的辛苦。' },
  { name: '打工崽存钱罐', kicker: '上班是生活派来的金主', line1: '认真坐一天', line2: '存钱罐就', highlight: '重一点', description: '不必一下子变富，先把今天的小钱钱稳稳接住。' },
  { name: '带薪快乐所', kicker: '允许上班，也允许开心', line1: '工作慢慢做', line2: '快乐偷偷', highlight: '攒', description: '忙里偷一点可爱，顺便看看今天又赚了多少。' },
  { name: '小钱钱观察站', kicker: '工资增长实时播报中', line1: '盯住这一秒', line2: '钱包又', highlight: '长大了', description: '你的任务是好好生活，我们负责记录每一笔到账。' },
  { name: '工位攒钱罐', kicker: '坐着坐着就有收获', line1: '今天不白坐', line2: '每秒都有', highlight: '回响', description: '时间从工位路过，顺手给你的攒钱罐投了一枚硬币。' },
  { name: '今日到账啦', kicker: '打工人的小确幸播报', line1: '辛苦有回音', line2: '工资会', highlight: '到账', description: '今天所有看似普通的坚持，都在一点点兑换成底气。' },
  { name: '摸鱼增值所', kicker: '把工位时间变得更值钱', line1: '一边等下班', line2: '一边悄悄', highlight: '增值', description: '摸鱼可以，成长也可以，反正这一秒工资没有停。' },
  { name: '打工喵营业中', kicker: '今日工位可爱值满格', line1: '本喵在上班', line2: '钱包在', highlight: '营业', description: '请放心摸鱼，本喵会认真看守你的每一秒工资。' },
  { name: '薪情晴报', kicker: '今日薪情持续转好', line1: '天气不一定晴', line2: '薪情一定', highlight: '很好', description: '看看不断上涨的数字，今天也有一个小小的好消息。' }
];

const $ = (selector) => document.querySelector(selector);
const elements = {
  brandName: $('#brandName'), brandKicker: $('#brandKicker'), brandHeadline: $('#brandHeadline'), brandDescription: $('#brandDescription'), copyModeBadge: $('#copyModeBadge'),
  todayMoney: $('#todayMoney'), monthMoney: $('#monthMoney'), secondRate: $('#secondRate'),
  todayPercent: $('#todayPercent'), todayProgress: $('#todayProgress'), workStatus: $('#workStatus'),
  paydayCountdown: $('#paydayCountdown'), workedTime: $('#workedTime'), offworkCountdown: $('#offworkCountdown'),
  monthPercent: $('#monthPercent'), todayLabel: $('#todayLabel'), startTimeLabel: $('#startTimeLabel'),
  endTimeLabel: $('#endTimeLabel'), encourageText: $('#encourageText'), dialog: $('#settingsDialog'),
  form: $('#settingsForm'), formError: $('#formError'), salaryInput: $('#salaryInput'),
  startInput: $('#startInput'), endInput: $('#endInput'), afternoonStartInput: $('#afternoonStartInput'),
  afternoonEndInput: $('#afternoonEndInput'), paydayInput: $('#paydayInput'), fixedCopySelect: $('#fixedCopySelect'),
  skinDialog: $('#skinDialog'), skinName: $('#skinName'), speechName: $('#speechName'), petSpeech: $('#petSpeech'), petImage: $('#petImage'),
  questForm: $('#questForm'), questInput: $('#questInput'), questList: $('#questList'), questEmpty: $('#questEmpty'),
  questDone: $('#questDone'), questTotal: $('#questTotal'), questProgress: $('#questProgress')
};

let settings = loadSettings();
let activeSkin = localStorage.getItem(THEME_KEY) || 'monthly';
let quests = loadQuests();
let speechIndex = 0;
let latestStats = { earned: 0, workedHours: 0, isWorking: false };
let copyState = loadCopyState();

function dateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function currentCopySlot() {
  return Math.floor(Date.now() / HALF_HOUR_MS);
}

function loadCopyState() {
  try {
    const saved = JSON.parse(localStorage.getItem(COPY_KEY));
    if (Number.isInteger(saved?.slot) && Number.isInteger(saved?.index)) {
      return {
        slot: saved.slot,
        index: saved.index,
        mode: saved.mode === 'fixed' ? 'fixed' : 'random',
        fixedIndex: Number.isInteger(saved.fixedIndex) ? saved.fixedIndex : saved.index
      };
    }
  } catch (_) { /* 首次随机选择文案 */ }
  return { slot: -1, index: -1, mode: 'random', fixedIndex: 0 };
}

function chooseNextCopyIndex(previousIndex) {
  if (copyPacks.length < 2) return 0;
  let nextIndex = Math.floor(Math.random() * copyPacks.length);
  if (nextIndex === previousIndex) nextIndex = (nextIndex + 1) % copyPacks.length;
  return nextIndex;
}

function renderCopyPack() {
  const pack = copyPacks[copyState.index] || copyPacks[0];
  elements.brandName.textContent = pack.name;
  elements.brandKicker.textContent = pack.kicker;
  elements.brandHeadline.innerHTML = `${pack.line1}<br />${pack.line2}<span>${pack.highlight}</span>`;
  elements.brandDescription.textContent = pack.description;
  elements.copyModeBadge.textContent = copyState.mode === 'fixed' ? '已固定' : '半小时随机';
  document.title = `${pack.name} · 打工也要数钱`;
}

function syncCopyRotation() {
  const slot = currentCopySlot();
  if (copyState.mode === 'fixed') {
    copyState.index = copyPacks[copyState.fixedIndex] ? copyState.fixedIndex : 0;
  } else if (copyState.slot !== slot || !copyPacks[copyState.index]) {
    copyState = { ...copyState, slot, index: chooseNextCopyIndex(copyState.index) };
    localStorage.setItem(COPY_KEY, JSON.stringify(copyState));
  }
  renderCopyPack();
}

function scheduleCopyRotation() {
  const delay = HALF_HOUR_MS - (Date.now() % HALF_HOUR_MS) + 50;
  setTimeout(() => {
    syncCopyRotation();
    scheduleCopyRotation();
  }, delay);
}

function loadSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && Number(saved.salary) >= 0 && Array.isArray(saved.workdays)) {
      if (!saved.afternoonStartTime && timeToMinutes(saved.endTime || '18:00') > 14 * 60) {
        return {
          ...defaults, ...saved,
          endTime: '12:00', afternoonStartTime: '14:00', afternoonEndTime: saved.endTime
        };
      }
      return { ...defaults, ...saved };
    }
  } catch (_) { /* 使用默认设置 */ }
  return { ...defaults };
}

function loadQuests() {
  try {
    const saved = JSON.parse(localStorage.getItem(QUEST_KEY));
    if (saved?.date === dateKey() && Array.isArray(saved.items)) return saved.items;
  } catch (_) { /* 今日从空清单开始 */ }
  return [];
}

function saveQuests() {
  localStorage.setItem(QUEST_KEY, JSON.stringify({ date: dateKey(), items: quests }));
}

function timeToMinutes(time) {
  const [hour, minute] = time.split(':').map(Number);
  return hour * 60 + minute;
}

function atTime(date, time) {
  const result = new Date(date);
  const [hour, minute] = time.split(':').map(Number);
  result.setHours(hour, minute, 0, 0);
  return result;
}

function isWorkday(date) { return settings.workdays.includes(date.getDay()); }
function clamp(value, min, max) { return Math.min(max, Math.max(min, value)); }
function money(value) { return value.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
function daysInMonth(year, month) { return new Date(year, month + 1, 0).getDate(); }

function safePayday(year, month) {
  return new Date(year, month, Math.min(settings.payday, daysInMonth(year, month)), 0, 0, 0, 0);
}

function getPayCycle(now) {
  let nextPayday = safePayday(now.getFullYear(), now.getMonth());
  if (now >= nextPayday) nextPayday = safePayday(now.getFullYear(), now.getMonth() + 1);
  const previousPayday = safePayday(nextPayday.getFullYear(), nextPayday.getMonth() - 1);
  return { start: previousPayday, end: nextPayday };
}

function getDailySessions(date) {
  return [
    { start: atTime(date, settings.startTime), end: atTime(date, settings.endTime) },
    { start: atTime(date, settings.afternoonStartTime), end: atTime(date, settings.afternoonEndTime) }
  ].filter((session) => session.end > session.start);
}

function getWorkIntervals(cycle) {
  const intervals = [];
  const cursor = new Date(cycle.start);
  cursor.setHours(0, 0, 0, 0);
  while (cursor < cycle.end) {
    if (isWorkday(cursor)) {
      getDailySessions(cursor).forEach(({ start, end }) => {
        if (end > cycle.start && start < cycle.end) {
          intervals.push({ start: new Date(Math.max(start, cycle.start)), end: new Date(Math.min(end, cycle.end)) });
        }
      });
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return intervals;
}

function getProgress(now, intervals) {
  const totalMs = intervals.reduce((sum, item) => sum + (item.end - item.start), 0);
  const earnedMs = intervals.reduce((sum, item) => sum + clamp(now - item.start, 0, item.end - item.start), 0);
  return { totalMs, earnedMs };
}

function getTodayProgress(now) {
  const sessions = getDailySessions(now);
  const totalMs = sessions.reduce((sum, session) => sum + (session.end - session.start), 0);
  const earnedMs = isWorkday(now)
    ? sessions.reduce((sum, session) => sum + clamp(now - session.start, 0, session.end - session.start), 0)
    : 0;
  return {
    sessions, totalMs, earnedMs,
    start: sessions[0]?.start,
    end: sessions.at(-1)?.end,
    isWorking: isWorkday(now) && sessions.some((session) => now >= session.start && now < session.end),
    isBreak: isWorkday(now) && sessions.some((session, index) => index > 0 && now >= sessions[index - 1].end && now < session.start)
  };
}

function formatDuration(ms, compact = false) {
  const totalMinutes = Math.max(0, Math.ceil(ms / 60000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return compact ? `${hours}时 ${minutes}分` : `${hours} 小时 ${minutes} 分`;
}

function getSpeechOptions() {
  const completed = quests.filter((quest) => quest.done).length;
  const hours = latestStats.workedHours;
  const earned = latestStats.earned;
  const options = [];

  if (hours >= 7.5) options.push(`今天摸鱼 ${hours.toFixed(1)}h，赚大发了！`);
  if (completed > 0) options.push(`私活完成 ${completed} 件，工资也没少拿，双赢！`);
  if (earned >= 100) options.push(`今天已经悄悄赚了 ¥${money(earned)}，漂亮！`);
  if (latestStats.isWorking) options.push('表面认真上班，实际稳稳变富～');

  const skinLines = {
    monthly: ['打工打到捂脸，工资还是要看！', '今天也在带薪流泪，问题不大。', '摸鱼不摆烂，悄悄攒答案。'],
    calico: ['今天元气满格，小钱钱冲呀！', '干劲可以少一点，工资不能少。', '完成一件小事，也值得庆祝！'],
    blue: ['虽然有点委屈，但钱钱正在安慰我。', '眼泪是暂时的，下班是真的。', '今天也要善待努力的自己。'],
    star: ['我的眼里只有下班和到账！', '再坚持一下，好事正在靠近。', '今天的你也闪闪发光。'],
    bigeye: ['让我看看工资涨到哪里了……', '安静观察，认真摸鱼。', '别急，一秒一秒都会到账。'],
    cream: ['软乎乎地上班，稳稳当当地赚钱。', '累了就歇一下，节奏最重要。', '今天也要给自己一点甜。']
  };
  return [...options, ...skinLines[activeSkin]];
}

function updateSpeech(force = false) {
  const lines = getSpeechOptions();
  if (force) speechIndex = 0;
  elements.petSpeech.textContent = lines[speechIndex % lines.length];
  elements.encourageText.textContent = lines[(speechIndex + 1) % lines.length];
}

function update() {
  const now = new Date();
  const cycle = getPayCycle(now);
  const intervals = getWorkIntervals(cycle);
  const cycleProgress = getProgress(now, intervals);
  const today = getTodayProgress(now);
  const ratePerMs = cycleProgress.totalMs ? settings.salary / cycleProgress.totalMs : 0;
  const todayEarned = today.earnedMs * ratePerMs;
  const cycleEarned = cycleProgress.earnedMs * ratePerMs;
  const todayRatio = today.totalMs ? today.earnedMs / today.totalMs : 0;
  const cycleRatio = cycleProgress.totalMs ? cycleProgress.earnedMs / cycleProgress.totalMs : 0;

  latestStats = {
    earned: todayEarned,
    workedHours: today.earnedMs / 3600000,
    isWorking: today.isWorking
  };

  elements.todayMoney.textContent = money(todayEarned);
  elements.monthMoney.textContent = `¥${money(cycleEarned)}`;
  elements.secondRate.textContent = `¥${(ratePerMs * 1000).toFixed(4)}`;
  elements.todayPercent.textContent = `${Math.round(todayRatio * 100)}%`;
  elements.todayProgress.style.width = `${todayRatio * 100}%`;
  elements.monthPercent.textContent = `${Math.round(cycleRatio * 100)}%`;
  elements.workedTime.textContent = formatDuration(today.earnedMs);
  elements.startTimeLabel.textContent = `${settings.startTime} 开工`;
  elements.endTimeLabel.textContent = `${settings.afternoonEndTime} 收工`;
  elements.todayLabel.textContent = new Intl.DateTimeFormat('zh-CN', { month: 'long', day: 'numeric', weekday: 'short' }).format(now);

  const dayMs = 86400000;
  elements.paydayCountdown.textContent = `${Math.max(0, Math.ceil((cycle.end - now) / dayMs))} 天`;

  if (!isWorkday(now)) {
    elements.workStatus.textContent = '今天休息，快乐摸鱼';
    elements.offworkCountdown.textContent = '今天不上班';
  } else if (now < today.start) {
    elements.workStatus.textContent = '还没上班，先充充电';
    elements.offworkCountdown.textContent = formatDuration(today.end - now, true);
  } else if (now >= today.end) {
    elements.workStatus.textContent = '今日任务完成，辛苦啦';
    elements.offworkCountdown.textContent = '已经下班啦';
  } else if (today.isBreak) {
    elements.workStatus.textContent = '午休充电中，暂不计薪';
    elements.offworkCountdown.textContent = formatDuration(today.end - now, true);
  } else {
    elements.workStatus.textContent = '工资正在蹦蹦跳跳地增长';
    elements.offworkCountdown.textContent = formatDuration(today.end - now, true);
  }
}

function applySkin(skin, persist = true) {
  activeSkin = skins[skin] ? skin : 'monthly';
  document.body.dataset.skin = activeSkin;
  elements.skinName.textContent = skins[activeSkin].name;
  elements.speechName.textContent = `${skins[activeSkin].name}说`;
  elements.petImage.src = skins[activeSkin].image;
  elements.petImage.alt = `${skins[activeSkin].name}宠物形象`;
  document.querySelectorAll('.skin-option').forEach((button) => {
    const selected = button.dataset.skin === activeSkin;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  if (persist) localStorage.setItem(THEME_KEY, activeSkin);
  updateSpeech(true);
}

function renderQuests() {
  const completed = quests.filter((quest) => quest.done).length;
  elements.questDone.textContent = completed;
  elements.questTotal.textContent = quests.length;
  elements.questProgress.style.width = `${quests.length ? completed / quests.length * 100 : 0}%`;
  elements.questEmpty.hidden = quests.length > 0;
  elements.questList.innerHTML = quests.map((quest) => `
    <li class="${quest.done ? 'done' : ''}" data-id="${quest.id}">
      <button class="quest-check" type="button" aria-label="${quest.done ? '标记为未完成' : '标记为完成'}"><span>✓</span></button>
      <p>${escapeHtml(quest.text)}</p>
      <button class="quest-delete" type="button" aria-label="删除这项私活">×</button>
    </li>`).join('');
}

function escapeHtml(text) {
  const node = document.createElement('span');
  node.textContent = text;
  return node.innerHTML;
}

function setupCopyThemeOptions() {
  elements.fixedCopySelect.innerHTML = copyPacks
    .map((pack, index) => `<option value="${index}">${pack.name} · ${pack.kicker}</option>`)
    .join('');
}

function updateCopyModeControls() {
  const fixed = document.querySelector('input[name="copyMode"]:checked')?.value === 'fixed';
  elements.fixedCopySelect.disabled = !fixed;
  elements.fixedCopySelect.closest('.fixed-copy-picker').classList.toggle('disabled', !fixed);
}

function populateForm() {
  elements.salaryInput.value = settings.salary;
  elements.startInput.value = settings.startTime;
  elements.endInput.value = settings.endTime;
  elements.afternoonStartInput.value = settings.afternoonStartTime;
  elements.afternoonEndInput.value = settings.afternoonEndTime;
  elements.paydayInput.value = settings.payday;
  const modeInput = document.querySelector(`input[name="copyMode"][value="${copyState.mode}"]`);
  if (modeInput) modeInput.checked = true;
  elements.fixedCopySelect.value = String(copyState.fixedIndex ?? copyState.index ?? 0);
  updateCopyModeControls();
  document.querySelectorAll('#workdayPills input').forEach((input) => { input.checked = settings.workdays.includes(Number(input.value)); });
}

$('#openSkins').addEventListener('click', () => elements.skinDialog.showModal());
$('#closeSkins').addEventListener('click', () => elements.skinDialog.close());
elements.skinDialog.addEventListener('click', (event) => { if (event.target === elements.skinDialog) elements.skinDialog.close(); });
document.querySelectorAll('.skin-option').forEach((button) => button.addEventListener('click', () => {
  applySkin(button.dataset.skin);
  elements.skinDialog.close();
}));

$('#openSettings').addEventListener('click', () => { populateForm(); elements.formError.textContent = ''; elements.dialog.showModal(); });
$('#closeSettings').addEventListener('click', () => elements.dialog.close());
elements.dialog.addEventListener('click', (event) => { if (event.target === elements.dialog) elements.dialog.close(); });
document.querySelectorAll('input[name="copyMode"]').forEach((input) => input.addEventListener('change', updateCopyModeControls));

elements.form.addEventListener('submit', (event) => {
  event.preventDefault();
  const workdays = [...document.querySelectorAll('#workdayPills input:checked')].map((input) => Number(input.value));
  const startTime = elements.startInput.value;
  const endTime = elements.endInput.value;
  const afternoonStartTime = elements.afternoonStartInput.value;
  const afternoonEndTime = elements.afternoonEndInput.value;
  if (timeToMinutes(endTime) <= timeToMinutes(startTime)) {
    elements.formError.textContent = '上午下班时间要晚于上班时间哦～';
    return;
  }
  if (timeToMinutes(afternoonEndTime) <= timeToMinutes(afternoonStartTime)) {
    elements.formError.textContent = '下午下班时间要晚于上班时间哦～';
    return;
  }
  if (timeToMinutes(afternoonStartTime) < timeToMinutes(endTime)) {
    elements.formError.textContent = '下午上班时间不能早于上午下班时间哦～';
    return;
  }
  if (!workdays.length) {
    elements.formError.textContent = '至少选择一个工作日哦～';
    return;
  }
  settings = {
    salary: Number(elements.salaryInput.value), startTime, endTime, afternoonStartTime, afternoonEndTime,
    payday: clamp(Number(elements.paydayInput.value), 1, 31), workdays
  };
  const copyMode = document.querySelector('input[name="copyMode"]:checked')?.value === 'fixed' ? 'fixed' : 'random';
  const fixedIndex = Number(elements.fixedCopySelect.value) || 0;
  copyState = {
    ...copyState,
    mode: copyMode,
    fixedIndex,
    index: copyMode === 'fixed' ? fixedIndex : copyState.index,
    slot: copyMode === 'random' && copyState.mode === 'fixed' ? -1 : copyState.slot
  };
  localStorage.setItem(COPY_KEY, JSON.stringify(copyState));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  elements.dialog.close();
  syncCopyRotation();
  update();
  updateSpeech(true);
});

elements.questForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = elements.questInput.value.trim();
  if (!text) return;
  quests.unshift({ id: `${Date.now()}-${Math.random().toString(16).slice(2)}`, text, done: false });
  elements.questInput.value = '';
  saveQuests();
  renderQuests();
  updateSpeech(true);
});

elements.questList.addEventListener('click', (event) => {
  const item = event.target.closest('li');
  if (!item) return;
  const quest = quests.find((entry) => entry.id === item.dataset.id);
  if (event.target.closest('.quest-check') && quest) quest.done = !quest.done;
  if (event.target.closest('.quest-delete')) quests = quests.filter((entry) => entry.id !== item.dataset.id);
  saveQuests();
  renderQuests();
  updateSpeech(true);
});

setupCopyThemeOptions();
syncCopyRotation();
scheduleCopyRotation();
applySkin(activeSkin, false);
populateForm();
renderQuests();
update();
updateSpeech(true);
setInterval(update, 250);
setInterval(() => { speechIndex += 1; updateSpeech(); }, 9000);
