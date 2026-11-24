/* Krillion engine: tiers, matching, seeded prompts, storage, dates */
window.KR = (function () {
  const TIERS = {
    plankton: { id: 'plankton', name: 'Plankton', score: 10, emoji: '🫧', sq: '⚪', blurb: 'The answer everyone blurts out.', depth: .08 },
    tooclever: { id: 'tooclever', name: 'Too Clever', score: 15, emoji: '🤡', sq: '🟠', blurb: 'A famously “obscure” pick. Everyone reaches for it.', depth: .18 },
    schooler: { id: 'schooler', name: 'Schooler', score: 30, emoji: '🐟', sq: '🔵', blurb: 'Solid — swims with the school.', depth: .36 },
    rare: { id: 'rare', name: 'Rare', score: 60, emoji: '🦑', sq: '🔴', blurb: 'Genuinely uncommon. Nice pull.', depth: .6 },
    deepcut: { id: 'deepcut', name: 'Deep Cut', score: 85, emoji: '🏮', sq: '🟣', blurb: 'True obscurity. Few go this deep.', depth: .82 },
    krillion: { id: 'krillion', name: 'One in a Krillion', score: 100, emoji: '🌟', sq: '🟡', blurb: 'The designated gem. Trench floor.', depth: .97 }
  };
  const KEYMAP = { p: 'plankton', c: 'tooclever', s: 'schooler', r: 'rare', d: 'deepcut', k: 'krillion' };
  const BANDS = [
    { min: 0, tier: 'plankton', range: '0–150', verdict: 'Plankton. Plenty of ocean left down there.' },
    { min: 151, tier: 'schooler', range: '151–250', verdict: 'Schooler. Swimming with the school.' },
    { min: 251, tier: 'rare', range: '251–350', verdict: 'Rare. Below the thermocline. Nice.' },
    { min: 351, tier: 'deepcut', range: '351–449', verdict: 'Deep cut. Seriously deep dive.' },
    { min: 450, tier: 'krillion', range: '450+', verdict: 'One in a krillion. Trench dweller. Absurd.' }
  ];
  const bandFor = s => [...BANDS].reverse().find(b => s >= b.min) || BANDS[0];
  const MISS = '⬛', ROUNDS = 7, SECONDS = 25, MAX = 700;

  // depth backgrounds (metres → colour)
  const STOPS = [[0, '#1d5580'], [150, '#123a5e'], [350, '#0b1526'], [800, '#081020'], [1400, '#050a14'], [2600, '#03070f'], [5200, '#02050b']];
  const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const mix = (a, b, t) => '#' + a.map((v, i) => Math.round(v + (b[i] - v) * t).toString(16).padStart(2, '0')).join('');
  function colorAt(m) {
    for (let i = 1; i < STOPS.length; i++) {
      if (m <= STOPS[i][0]) { const [m0, c0] = STOPS[i - 1], [m1, c1] = STOPS[i]; return mix(hex(c0), hex(c1), (m - m0) / (m1 - m0)); }
    }
    return STOPS[STOPS.length - 1][1];
  }

  // text helpers
  const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’'`]/g, '').replace(/&/g, ' and ').replace(/[^a-z0-9+#@% ]+/g, ' ').replace(/\s+/g, ' ').trim();
  const strip = s => { s = norm(s).replace(/^(the|a|an) /, ''); return s; };
  const sing = s => s.replace(/(ies)$/, 'y').replace(/(es)$/, '').replace(/s$/, '');
  const SMALL = new Set(['a', 'an', 'the', 'of', 'and', 'in', 'on', 'at', 'to', 'for', 'vs', 'or', 'de', 'la', 'von', 'van']);
  const titleCase = s => s.replace(/(^|[\s(\-\/])([a-z0-9][^\s)\-\/]*)/g, (m, pre, w, off) => pre + (off > 0 && SMALL.has(w) ? w : w[0].toUpperCase() + w.slice(1)));
  function lev(a, b, max) {
    if (Math.abs(a.length - b.length) > max) return max + 1;
    const dp = Array.from({ length: a.length + 1 }, (_, i) => [i]);
    for (let j = 1; j <= b.length; j++) dp[0][j] = j;
    for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return dp[a.length][b.length];
  }

  // build search index per category (lazy)
  const byId = {};
  window.KR_DATA.forEach(c => { byId[c.id] = c; });
  function indexOf(cat) {
    if (cat._idx) return cat._idx;
    const exact = new Map(), list = [];
    const order = ['plankton', 'tooclever', 'schooler', 'rare', 'deepcut', 'krillion'];
    const tk = {}; Object.keys(KEYMAP).forEach(k => tk[KEYMAP[k]] = k);
    order.forEach(tier => {
      (cat.t[tk[tier]] || '').split(';').filter(Boolean).forEach(entry => {
        const rawAliases = entry.split('|');
        const aliases = rawAliases.map(strip).filter(Boolean);
        const canon = aliases[0], disp = titleCase(rawAliases[0].trim());
        aliases.forEach(al => {
          if (!exact.has(al)) { exact.set(al, { tier, canon, entry, disp }); list.push({ al, tier, canon, entry, disp }); }
          const s1 = sing(al); if (s1 && !exact.has(s1)) exact.set(s1, { tier, canon, entry, disp });
        });
      });
    });
    return (cat._idx = { exact, list });
  }
  // grade an answer → {tier, canon, corrected} | null
  function grade(cat, raw, fuzzy) {
    const q = strip(raw); if (!q) return null;
    const ix = indexOf(cat);
    let m = ix.exact.get(q) || ix.exact.get(sing(q)) || ix.exact.get(q + 's');
    if (m) return { tier: m.tier, canon: m.canon, corrected: false };
    if (fuzzy && q.length >= 4) {
      const max = q.length >= 9 ? 2 : 1;
      let best = null, bd = 99;
      for (const e of ix.list) {
        const d = lev(q, e.al, max);
        if (d <= max && (d < bd || (d === bd && TIERS[e.tier].score < TIERS[best.tier].score))) { best = e; bd = d; }
      }
      if (best) return { tier: best.tier, canon: best.canon, corrected: true };
    }
    return null;
  }
  // lookup → {kind:'exact'|'near', tier, canon} | null   (near = very close to a known answer: typo / alias)
  function lookup(cat, raw) {
    const q = strip(raw); if (!q) return null;
    const ix = indexOf(cat);
    const m = ix.exact.get(q) || ix.exact.get(sing(q)) || ix.exact.get(q + 's');
    if (m) return { kind: 'exact', tier: m.tier, canon: m.canon, disp: m.disp };
    if (q.length >= 4) {
      const max = q.length >= 9 ? 2 : 1;
      let best = null, bd = 99;
      for (const e of ix.list) {
        const d = lev(q, e.al, max);
        if (d <= max && (d < bd || (d === bd && TIERS[e.tier].score < TIERS[best.tier].score))) { best = e; bd = d; }
      }
      if (best) return { kind: 'near', tier: best.tier, canon: best.canon, disp: best.disp };
    }
    return null;
  }
  function allAnswers(cat) { return indexOf(cat).list; }
  function gemOf(cat) {
    const tk = (cat.t.k || '').split(';').filter(Boolean);
    return titleCase(((tk[0] || '').split('|')[0]).trim());
  }

  // seeded randomness
  function hash(str) { let h = 2166136261; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rng(seed) { let a = typeof seed === 'string' ? hash(seed) : seed; return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function pick(pool, n, seed) {
    const r = rng(seed), arr = [...pool];
    for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; }
    const out = arr.slice(0, n);
    while (out.length < n) out.push(arr[Math.floor(r() * arr.length)]);
    return out;
  }
  const poolOf = pack => window.KR_DATA.filter(c => c.pack === pack);
  const DAILY_OVERRIDE = { '2026-11-19': ['animal', 'fictionalplace', 'peeloff', 'director', 'permission', 'soccercountry', 'tvshow'] };
  const dailyCats = date => (DAILY_OVERRIDE[date] ? DAILY_OVERRIDE[date].map(i => byId[i]) : pick(window.KR_DATA, ROUNDS, 'daily-' + date));
  const packCats = (pack, n) => pick(poolOf(pack), ROUNDS, pack + '-chapter-' + n);
  const randomCats = () => pick(window.KR_DATA, ROUNDS, 'u-' + Math.random() + Date.now());

  // dates (America/New_York)
  const fmt = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit' });
  const hms = new Intl.DateTimeFormat('en-GB', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' });
  const todayET = () => fmt.format(new Date());
  const dayMs = 86400000;
  const EPOCH = Date.UTC(2026, 6, 16); // day #1 → 2026-07-16 (so 2026-11-19 is #127)
  const dateUtc = d => { const [y, m, dd] = d.split('-').map(Number); return Date.UTC(y, m - 1, dd); };
  const dayNumber = d => Math.round((dateUtc(d) - EPOCH) / dayMs) + 1;
  const dateFromNumber = n => new Date(EPOCH + (n - 1) * dayMs).toISOString().slice(0, 10);
  const yesterday = d => new Date(dateUtc(d) - dayMs).toISOString().slice(0, 10);
  function secondsToReset() { const [h, m, s] = hms.format(new Date()).split(':').map(Number); return 86400 - (h * 3600 + m * 60 + s); }
  const fmtCountdown = s => [Math.floor(s / 3600), Math.floor(s % 3600 / 60), s % 60].map(v => String(v).padStart(2, '0')).join(':');

  // storage
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
    del(k) { try { localStorage.removeItem(k); } catch (e) {} },
    keys() { try { return Object.keys(localStorage); } catch (e) { return []; } }
  };

  // settings
  const DEFAULTS = { colorblind: false, lowPower: false, clearRejected: false, corrections: true, shareLink: false, character: 'krill', name: '' };
  let settings = Object.assign({}, DEFAULTS, store.get('krillion-settings', {}));
  const saveSettings = () => store.set('krillion-settings', settings);

  // stats / streak
  const stats = () => store.get('krillion-stats', { streak: 0, best: 0, last: null, dives: 0, bestScore: 0, replays: 0, endless: 0 });
  function currentStreak() { const s = stats(); const t = todayET(); return (s.last === t || s.last === yesterday(t)) ? s.streak : 0; }
  function recordDaily(date, score) {
    const s = stats();
    if (s.last !== date) { s.streak = s.last === yesterday(date) ? s.streak + 1 : 1; s.last = date; s.dives++; }
    s.best = Math.max(s.best, s.streak); s.bestScore = Math.max(s.bestScore, score);
    store.set('krillion-stats', s); return s;
  }

  return { TIERS, BANDS, bandFor, MISS, ROUNDS, SECONDS, MAX, colorAt, norm, strip, titleCase, grade, lookup, allAnswers, gemOf, byId, hash, rng, pick, poolOf, dailyCats, packCats, randomCats,
    todayET, dayNumber, dateFromNumber, yesterday, secondsToReset, fmtCountdown, store, get settings() { return settings; }, saveSettings, stats, currentStreak, recordDaily };
})();
