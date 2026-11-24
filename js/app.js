(function () {
  const { TIERS, store } = KR;
  const $ = (s, r = document) => r.querySelector(s);
  const app = $('#app');
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmtNum = n => n.toLocaleString('en-US');
  let cleanups = [];
  const onLeave = f => cleanups.push(f);
  function toast(msg) { const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; document.body.appendChild(t); setTimeout(() => t.remove(), 1800); }
  async function copy(text) { try { await navigator.clipboard.writeText(text); toast('copied!'); } catch (e) { prompt('Copy this:', text); } }

  /* ---------- settings / chrome ---------- */
  function applySettings() {
    const s = KR.settings;
    document.documentElement.classList.toggle('colorblind', s.colorblind);
    document.documentElement.classList.toggle('lowpower', s.lowPower);
  }
  function setDepth(m) {
    const c = KR.colorAt(m), c2 = KR.colorAt(m + 250);
    document.documentElement.style.setProperty('--bg-top', c);
    document.documentElement.style.setProperty('--bg-bottom', c2);
  }
  function bubbles() {
    const b = $('#bubbles'); b.innerHTML = '';
    for (let i = 0; i < 18; i++) {
      const e = document.createElement('i'), s = 6 + Math.random() * 18;
      e.style.cssText = `left:${Math.random() * 100}%;width:${s}px;height:${s}px;animation-duration:${8 + Math.random() * 12}s;animation-delay:${-Math.random() * 16}s`;
      b.appendChild(e);
    }
  }
  const drawer = $('#drawer');
  $('#menuBtn').onclick = () => drawer.classList.add('open');
  $('#closeBtn').onclick = $('.scrim', drawer).onclick = () => drawer.classList.remove('open');
  drawer.addEventListener('click', e => { if (e.target.closest('a')) drawer.classList.remove('open'); });

  /* ---------- router ---------- */
  const routes = [];
  const route = (re, fn) => routes.push([re, fn]);
  function go() {
    cleanups.forEach(f => { try { f(); } catch (e) {} }); cleanups = [];
    window.scrollTo(0, 0); setDepth(0);
    const path = location.hash.replace(/^#/, '') || '/';
    for (const [re, fn] of routes) { const m = path.match(re); if (m) { fn(m); return; } }
    app.innerHTML = '<div class="center mt2"><h2>lost at sea</h2><p class="sub">nothing down here.</p><p class="mt"><a class="btn" href="#/">surface</a></p></div>';
  }
  window.addEventListener('hashchange', go);

  const krillHero = () => `<div class="hero-krill float">${ART.mascot(KR.settings.character)}</div>`;
  const backLink = (href = '#/', t = '← today’s dive') => `<p class="mt2"><a class="ghost" href="${href}">${t}</a></p>`;

  /* ---------- the game ---------- */
  /* ---------- the dive (stage) ---------- */
  // opts: {title, cats, onDone(result), meta, links, tagline, subline, accent, autoBegin}
  function playDive(opts) {
    const cats = opts.cats, ANSWER_MS = KR.SECONDS * 1000, PREVIEW_MS = 3000;
    const ui = { submit: 'DIVE', begin: '▼ BEGIN DESCENT ▼', descend: 'DESCEND ▼', surface: 'SURFACE ▲', previewPrefix: 'descending · the clock starts in', promptWord: 'PROMPT', hint: '&#9660; rarer answers sink deeper &#9660;', unit: 'm', sinkVerb: 'sink', reject: t => `"${t}": no echo. try again` };
    app.innerHTML = '<div id="stage"></div>';
    const stage = Stage.create($('#stage'), { ui, accent: opts.accent, tagline: opts.tagline, subline: opts.subline, character: KR.settings.character, lowPower: KR.settings.lowPower });
    onLeave(() => stage.destroy());
    const input = stage.input;
    let round = 0, total = 0, phase = 'intro', busy = false, raf = 0, previewT = 0, endAt = 0, lastShown = -1;
    const results = [];
    const disp = c => KR.titleCase(c); // fallback
    const howto = ['7 prompts a day. same for everyone.', `${KR.SECONDS} seconds to name one thing.`, 'rare answers score big. obvious ones float.', 'the pick that feels clever? the school thought of it too.', `every point sinks you 10 metres. ${KR.MAX} is the trench.`, 'wrong answer? just try again. a close typo gets a suggestion.'];
    const links = (opts.links || []).map(l => `<a href="${l.href}">${l.label}</a>`).join('');
    stage.intro(`<details class="ds-howto"><summary>how to play</summary><ul>${howto.map(x => `<li>${x}</li>`).join('')}</ul></details>
      <button class="ds-begin-btn" id="beginBtn" type="button">${ui.begin}</button>
      <div class="ds-intro-meta"><span>${esc(opts.meta || '')}</span><div class="row" style="gap:8px">${links}</div></div>`);
    stage.setDots(KR.ROUNDS, -1);
    const begin = () => { stage.sfx.event('begin'); stage.leaveIntro(); startRound(0); };
    $('#beginBtn').onclick = begin;
    if (opts.autoBegin) setTimeout(begin, 60);

    function startRound(i) {
      round = i; phase = 'preview'; busy = false; input.value = ''; lastShown = -1;
      stage.descendToRound(i, cats[i].text, 2200);
      const t0 = performance.now();
      const tick = () => {
        const left = Math.max(0, PREVIEW_MS - (performance.now() - t0)), n = Math.ceil(left / 1000);
        if (n !== lastShown) { lastShown = n; stage.showPill(`${ui.previewPrefix} <b>${n}</b>`); }
        if (left <= 0) { stage.showPill(null); startAnswering(); return; }
        previewT = requestAnimationFrame(tick);
      };
      tick();
    }
    function startAnswering() {
      phase = 'answering'; stage.startAnswering(); endAt = performance.now() + ANSWER_MS; stage.setTime(ANSWER_MS, ANSWER_MS); stage.setHot(false);
      setTimeout(() => input.focus(), 350);
      const loop = () => {
        if (phase !== 'answering') return;
        const left = Math.max(0, endAt - performance.now());
        stage.setTime(left, ANSWER_MS); stage.setUrgency(1 - left / ANSWER_MS); stage.setHot(left <= 5000);
        if (left <= 0) { expire(); return; }
        raf = requestAnimationFrame(loop);
      };
      loop();
    }
    function expire() {
      if (phase !== 'answering') return;
      const raw = input.value.trim();
      if (raw) evaluate(raw, true); else finishRound({ tier: null, raw: '', canon: null });
    }
    function evaluate(raw, timeout) {
      if (busy) return;
      const cat = cats[round], lk = KR.lookup(cat, raw);
      stage.hideReject(); stage.hideCorrection();
      if (lk && lk.kind === 'exact') return finishRound({ tier: lk.tier, raw, canon: lk.canon, disp: lk.disp });
      if (lk && lk.kind === 'near') {
        if (!timeout && KR.settings.corrections) { // suggestion: put the fix into the box, ask to confirm
          input.value = lk.disp; stage.showCorrection(raw, lk.disp); stage.rejectFx(); input.focus(); input.setSelectionRange(input.value.length, input.value.length); return;
        }
        return finishRound({ tier: lk.tier, raw, canon: lk.canon, disp: lk.disp, corrected: true });
      }
      if (timeout) return finishRound({ tier: null, raw, canon: null });
      // just an error — the round goes on
      stage.showReject(ui.reject(raw)); stage.rejectFx(); if (KR.settings.clearRejected) input.value = '';
      input.classList.remove('shake'); input.focus();
    }
    function finishRound(r) {
      if (busy) return; busy = true; phase = 'plunge'; cancelAnimationFrame(raf);
      const T = r.tier ? TIERS[r.tier] : null, score = T ? T.score : 0;
      total += score; results.push({ tier: r.tier, score, raw: r.raw, canon: r.canon, disp: r.disp, corrected: !!r.corrected, cat: cats[round].id });
      stage.submitFx();
      const sub = T ? T.blurb : (r.raw ? 'never made it onto the reef.' : 'the clock beat you to it.');
      input.blur();
      stage.plunge({ tier: r.tier, score, answerText: r.disp || r.raw, raw: r.raw, sub, newScore: total, round }, () => {
        phase = 'landed';
        const last = round === KR.ROUNDS - 1;
        stage.showNext(last ? ui.surface : ui.descend, () => { if (phase !== 'landed') return; phase = 'leaving'; stage.hideNext(); if (last) surface(); else startRound(round + 1); });
      });
    }
    function surface() { stage.finale(() => { stage.destroy(); opts.onDone({ score: total, results }); }); }

    stage.dock.addEventListener('submit', e => { e.preventDefault(); const raw = input.value.trim(); if (phase === 'answering' && raw) evaluate(raw, false); });
    input.addEventListener('input', () => { if (phase !== 'answering') return; stage.hideReject(); stage.hideCorrection(); stage.typeFx(); });
    const onKey = e => { if (e.key === 'Enter' && phase === 'landed' && !e.repeat && document.activeElement !== input) { e.preventDefault(); stage.nextBtn.click(); } };
    document.addEventListener('keydown', onKey);
    onLeave(() => { document.removeEventListener('keydown', onKey); cancelAnimationFrame(raf); cancelAnimationFrame(previewT); });
  }

  function shareText(title, score, results, extra) {
    const band = KR.bandFor(score);
    const grid = results.map(r => r.tier ? TIERS[r.tier].sq : KR.MISS).join('');
    let t = `Krillion ${title} · ${score}/${KR.MAX} ${TIERS[band.tier].emoji}\n${grid}\n▼ ${fmtNum(score * 10)} m`;
    if (extra) t += '\n' + extra;
    if (KR.settings.shareLink) t += '\n' + location.origin + location.pathname;
    return t;
  }
  function finalView(o) {
    const band = KR.bandFor(o.score), tc = `var(--tier-${band.tier})`;
    setDepth(o.score * 10);
    const text = shareText(o.title, o.score, o.results);
    const rows = o.results.map((r, i) => `<div class="r"><span>${i + 1}. ${esc((t => t.length > 44 ? t.slice(0, 43) + '…' : t)(KR.byId[r.cat].text.replace(/^Name (a |an |the )?/i, '')))}</span><b class="${r.tier ? 't-' + r.tier : 't-miss'}">${r.raw ? esc(r.disp || (r.canon ? KR.titleCase(r.canon) : r.raw)) : '—'} · ${r.score}</b></div>`).join('');
    app.innerHTML = `<div class="final center mt" style="--tc:${tc}">
      <div class="kicker">${esc(o.title)} complete</div>
      <div class="score">${o.score}</div>
      <div class="sub">of ${KR.MAX} · ${fmtNum(o.score * 10)} metres down</div>
      <div class="verdict" style="color:${tc}">${TIERS[band.tier].emoji} ${band.verdict}</div>
      <div class="grid">${o.results.map(r => r.tier ? TIERS[r.tier].sq : KR.MISS).join('')}</div>
      <div class="row" style="justify-content:center"><button class="btn" id="shareBtn">Share result</button>${o.extraBtns || ''}</div>
      ${o.note ? `<p class="sub mt">${o.note}</p>` : ''}
    </div>
    <div class="panel rows mt2">${rows}</div>
    ${o.footer || ''}`;
    $('#shareBtn').onclick = () => copy(text);
  }

  /* ---------- daily ---------- */
  route(/^\/$/, () => {
    const date = KR.todayET(), n = KR.dayNumber(date), done = store.get('krillion-daily-' + date, null);
    if (done) return dailyDone(date, n, done);
    const streak = KR.currentStreak();
    playDive({
      title: 'dive #' + n, cats: KR.dailyCats(date), meta: `dive #${n} · streak ${streak}`,
      links: [{ href: '#/archive', label: 'ARCHIVE ⟲' }, { href: '#/packs', label: 'THEMED PACKS' }, { href: '#/unlimited', label: 'UNLIMITED ∞' }],
      onDone: r => {
        const rec = { score: r.score, results: r.results.map(x => ({ tier: x.tier, score: x.score, raw: x.raw, canon: x.canon, disp: x.disp, cat: x.cat })) };
        store.set('krillion-daily-' + date, rec);
        const st = KR.recordDaily(date, r.score);
        const nb = ART.BUDDIES.filter(b => b.streak && b.streak === st.streak);
        dailyDone(date, n, rec, nb.length ? `🎉 new dive buddy unlocked: <b>${nb[0].name}</b>! equip it in Settings.` : '');
      }
    });
  });
  function dailyDone(date, n, rec, note) {
    const st = KR.stats();
    finalView({
      title: 'dive #' + n, score: rec.score, results: rec.results, note,
      footer: `<div class="panel center"><div class="kicker">next dive in</div><div class="countdown" id="cd">--:--:--</div>
        <p class="sub">streak ${KR.currentStreak()} · best ${st.best}</p>
        <div class="row mt" style="justify-content:center"><a class="btn small" href="#/unlimited">Unlimited ∞</a><a class="btn small" href="#/packs">Themed packs</a><a class="btn small" href="#/archive">Archive ⟲</a><a class="btn small pink" href="#/party">Puffer Party</a></div></div>`
    });
    const cd = $('#cd'); const t = () => { cd.textContent = KR.fmtCountdown(KR.secondsToReset()); if (KR.secondsToReset() >= 86399) setTimeout(go, 1200); };
    t(); const iv = setInterval(t, 1000); onLeave(() => clearInterval(iv));
  }

  /* ---------- unlimited ---------- */
  route(/^\/unlimited(\/classic)?$/, () => {
    const start = auto => playDive({
      title: 'endless dive', cats: KR.randomCats(), autoBegin: auto, meta: 'the endless dive · no limits', tagline: 'the endless dive.', subline: 'no limits. no streaks. fresh prompts every dive.',
      links: [{ href: '#/', label: 'TODAY’S DIVE' }, { href: '#/packs', label: 'THEMED PACKS' }],
      onDone: r => {
        const s = KR.stats(); s.endless = (s.endless || 0) + 1; store.set('krillion-stats', s);
        const k = store.get('krillion-unlimited', { done: 0, best: 0 }); k.done++; k.best = Math.max(k.best, r.score); store.set('krillion-unlimited', k);
        finalView({ title: 'endless dive', score: r.score, results: r.results, extraBtns: '<button class="btn pink" id="again">NEXT DIVE ∞ ↓</button>', footer: backLink('#/', '← daily dive') });
        $('#again').onclick = () => start(true);
      }
    });
    start(false);
  });

  /* ---------- archive ---------- */
  route(/^\/archive(?:\/(\d{4}-\d{2}-\d{2}))?$/, m => {
    const today = KR.todayET();
    if (m[1]) {
      const date = m[1], n = KR.dayNumber(date);
      if (date >= today || n < 1) { location.hash = '#/archive'; return; }
      return playDive({
        title: 'replay #' + n, cats: KR.dailyCats(date), meta: `replay #${n} · ${date}`, tagline: 'archive replay.', subline: 'replays don’t extend your streak.',
        links: [{ href: '#/archive', label: 'ARCHIVE ⟲' }, { href: '#/', label: 'TODAY’S DIVE' }],
        onDone: r => {
          const key = 'krillion-archive-' + date, prev = store.get(key, null);
          if (!prev || r.score > prev.score) store.set(key, { score: r.score, results: r.results.map(x => ({ tier: x.tier, score: x.score })) });
          const s = KR.stats(); s.replays = (s.replays || 0) + 1; store.set('krillion-stats', s);
          finalView({ title: 'replay #' + n, score: r.score, results: r.results, note: 'archive replays don’t extend your streak.', footer: backLink('#/archive', '← archive') });
        }
      });
    }
    const last = KR.dayNumber(today) - 1;
    const limit = +(sessionStorage.getItem('kr-arch') || 40);
    let items = '';
    for (let i = last; i >= Math.max(1, last - limit + 1); i--) {
      const d = KR.dateFromNumber(i), daily = store.get('krillion-daily-' + d, null), arch = store.get('krillion-archive-' + d, null), rec = daily || arch;
      items += `<a class="item" href="#/archive/${d}"><span>#${i} <span class="sub">${d}</span></span><b class="${rec ? 't-' + KR.bandFor(rec.score).tier : 'sub'}">${rec ? rec.score + ' ' + (daily ? '✓' : '⟲') : 'dive →'}</b></a>`;
    }
    app.innerHTML = `<div class="mt"><div class="kicker">every aired daily, resurfaceable</div><h1>archive ⟲</h1><p class="sub">Missed a day? Replay any past dive. Replays don’t extend your streak.</p></div>
      <div class="panel list">${items || '<p class="sub">no past dives yet — come back tomorrow.</p>'}</div>
      ${last > limit ? '<p class="center"><button class="btn small" id="more">load more</button></p>' : ''}${backLink()}`;
    const mb = $('#more'); if (mb) mb.onclick = () => { sessionStorage.setItem('kr-arch', limit + 40); go(); };
  });

  /* ---------- themed packs ---------- */
  const PACKS = [
    { id: 'lexicon', ico: '📓', name: 'Words & Language (English)', kicker: '', desc: '30 chapters · fill the notebook, word by word', cta: 'OPEN THE NOTEBOOK →', c: '#ffd166', unit: 'chapter', bg: 'notebook' },
    { id: 'movies', ico: '🎬', name: 'AT THE MOVIES', kicker: 'NOW SHOWING', desc: '30 pictures · a night drive down the boulevard', cta: 'TAKE THE DRIVE →', c: '#ff5d8f', unit: 'picture' },
    { id: 'sports', ico: '🏟️', name: 'SPORTS', kicker: 'GAME ON', desc: '30 games · run the gauntlet, court to podium', cta: 'TAKE THE TUNNEL ↓', c: '#ff9f43', unit: 'game' },
    { id: 'geography', ico: '🧭', name: 'GEOGRAPHY', kicker: 'PASSPORT READY', desc: '30 expeditions · around the world in seven answers', cta: 'SET OUT →', c: '#4de3ff', unit: 'expedition' }
  ];
  route(/^\/packs$/, () => {
    const cards = PACKS.map(p => {
      const prog = store.get('krillion-pack-' + p.id, {}), n = Object.keys(prog).length;
      return `<a class="card" href="#/pack/${p.id}" style="--cc:${p.c}"><div class="ico">${p.ico}</div><div><div class="k">${p.kicker || (n ? n + ' / 30 DONE' : 'BEGIN')}</div><div class="n">${esc(p.name)}</div><div class="d">${p.desc}</div></div><div class="go">${p.cta}${n && p.kicker ? `<div class="sub">${n} ${p.unit}${n === 1 ? '' : 's'} logged</div>` : ''}</div></a>`;
    }).join('');
    app.innerHTML = `<div class="mt"><div class="kicker">themed packs · beyond the daily dive</div><h1>packs</h1><p class="sub"><span class="beta">FREE · BETA</span> Answers & scoring may have issues.</p></div>
      <div class="cards">${cards}
      <div class="card soon" style="--cc:#9d7bff"><div class="ico">🎵</div><div><div class="k">COMING SOON</div><div class="n">MUSIC</div><div class="d">from the charts to the deep cuts</div></div><div class="go">more packs are being charted…</div></div></div>
      <div class="panel mt2"><div class="kicker">the logbook</div><div class="n" style="font-size:30px">your unlocks, kept</div><p class="sub">Every aired daily, resurfaceable.</p><p class="mt"><a class="btn small" href="#/archive">Archive ⟲</a></p></div>${backLink('#/', '← today’s dive')}`;
  });
  route(/^\/pack\/(\w+)$/, m => {
    const p = PACKS.find(x => x.id === m[1]); if (!p) { location.hash = '#/packs'; return; }
    const prog = store.get('krillion-pack-' + p.id, {});
    const tiles = Array.from({ length: 30 }, (_, i) => {
      const n = i + 1, r = prog[n], t = r ? KR.bandFor(r.score).tier : '';
      return `<a class="ch ${r ? 'done' : ''}" href="#/pack/${p.id}/${n}" style="--cc:${p.c};${r ? `--tc:var(--tier-${t})` : ''}"><div class="no">${n}</div><div class="st">${r ? r.score + ' pts' : p.unit}</div></a>`;
    }).join('');
    const done = Object.keys(prog).length;
    app.innerHTML = `<div class="mt"><div class="kicker" style="color:${p.c}">${p.kicker || 'themed pack'}</div><h1>${p.ico} ${esc(p.name)}</h1><p class="sub">${p.desc}</p>
      <p class="sub"><b style="color:${p.c};font-weight:400">${done}/30</b> ${p.unit}s completed · replay any ${p.unit} to beat your best.</p></div><div class="chapters">${tiles}</div>${backLink('#/packs', '← all packs')}`;
  });
  route(/^\/pack\/(\w+)\/(\d+)$/, m => {
    const p = PACKS.find(x => x.id === m[1]), n = +m[2]; if (!p || n < 1 || n > 30) { location.hash = '#/packs'; return; }
    playDive({
      title: p.unit + ' ' + n, cats: KR.packCats(p.id, n), accent: p.c, meta: `${p.unit} ${n} of 30`, tagline: p.name.toLowerCase(), subline: p.desc,
      links: [{ href: '#/pack/' + p.id, label: 'ALL ' + p.unit.toUpperCase() + 'S' }, { href: '#/packs', label: 'THEMED PACKS' }],
      onDone: r => {
        const prog = store.get('krillion-pack-' + p.id, {});
        if (!prog[n] || r.score > prog[n].score) prog[n] = { score: r.score, tiers: r.results.map(x => x.tier) };
        store.set('krillion-pack-' + p.id, prog);
        finalView({ title: p.name.toLowerCase() + ' · ' + p.unit + ' ' + n, score: r.score, results: r.results,
          extraBtns: n < 30 ? `<a class="btn pink" href="#/pack/${p.id}/${n + 1}">Next ${p.unit} →</a>` : '', footer: backLink('#/pack/' + p.id, '← ' + p.name.toLowerCase()) });
      }
    });
  });

  /* ---------- my krillion ---------- */
  route(/^\/account$/, () => {
    const st = KR.stats(), cur = KR.currentStreak();
    const dailies = KR.store.keys().filter(k => k.startsWith('krillion-daily-')).length;
    const reps = KR.store.keys().filter(k => k.startsWith('krillion-archive-')).length;
    const un = store.get('krillion-unlimited', { done: 0 });
    const cnt = id => Object.keys(store.get('krillion-pack-' + id, {})).length;
    const unlocked = b => st.best >= b.streak;
    app.innerHTML = `<div class="mt"><div class="kicker">your diver’s logbook</div><h1>My Krillion</h1><p class="sub">Your dives. One history. This device.</p></div>
      <div class="stat-grid mt">
        <div class="stat"><div class="v">${cur}</div><div class="l">CURRENT STREAK</div></div><div class="stat"><div class="v">${st.best}</div><div class="l">BEST STREAK</div></div>
        <div class="stat"><div class="v">${st.dives}</div><div class="l">DAILY DIVES</div></div><div class="stat"><div class="v">${st.bestScore || '—'}</div><div class="l">BEST DAILY SCORE</div></div></div>
      <p class="sub mt">Streaks count consecutive daily dives, with each new day starting at midnight ET. Archive replays don’t extend your streak.</p>
      <h2 class="mt2">Completed dives</h2>
      <div class="panel rows">
        <div class="r"><a href="#/archive">Daily & archive logbook →</a><b>${dailies} daily · ${reps} replays</b></div>
        <div class="r"><a href="#/unlimited">THE ENDLESS DIVE →</a><b>${un.done || 0} completed</b></div>
        ${PACKS.map(p => `<div class="r"><a href="#/pack/${p.id}">${esc(p.name)} →</a><b>${cnt(p.id)} completed</b></div>`).join('')}</div>
      <h2 class="mt2">Earned dive buddies</h2>
      <div class="buddies mt">${ART.BUDDIES.map(b => `<div class="buddy ${unlocked(b) ? '' : 'locked'} ${KR.settings.character === b.id ? 'sel' : ''}">${ART.mascot(b.id, false)}${esc(b.name)}<small>${b.streak ? b.streak + '-day streak' : 'Earned'}</small></div>`).join('')}</div>
      <p class="sub mt">Equip a buddy in <a href="#/settings" style="color:var(--cyan)">Settings</a>.</p>${backLink()}`;
  });

  /* ---------- friends (local) ---------- */
  const enc = o => btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/=+$/, '');
  const dec = s => { try { return JSON.parse(decodeURIComponent(escape(atob(s.trim())))); } catch (e) { return null; } };
  route(/^\/friends$/, () => {
    const date = KR.todayET(), me = store.get('krillion-daily-' + date, null);
    const friends = store.get('krillion-friends', []);
    const myName = KR.settings.name || 'me';
    const code = me ? enc({ n: myName, d: date, s: me.score, t: me.results.map(r => r.tier ? r.tier[0] : '-').join('') }) : '';
    const board = [...(me ? [{ n: myName + ' (you)', s: me.score, d: date, me: true }] : []), ...friends.filter(f => f.d === date)].sort((a, b) => b.s - a.s);
    app.innerHTML = `<div class="mt"><div class="kicker">better with company</div><h1>Friends</h1><p class="sub">No account needed: swap share codes after you finish today’s dive and compare scores.</p></div>
      <div class="panel"><div class="kicker">your name</div><div class="row mt"><input class="txt" id="nm" maxlength="16" placeholder="diver name" value="${esc(KR.settings.name)}" style="flex:1"><button class="btn small" id="svn">save</button></div></div>
      <div class="panel"><div class="kicker">your code for today</div>${me ? `<div class="row mt"><input class="txt" readonly value="${code}" style="flex:1" id="mycode"><button class="btn small" id="cpc">copy</button></div>` : '<p class="sub mt">finish today’s dive to get a code.</p>'}</div>
      <div class="panel"><div class="kicker">add a friend’s code</div><div class="row mt"><input class="txt" id="fc" placeholder="paste code" style="flex:1"><button class="btn small" id="addf">add</button></div></div>
      <h2 class="mt2">Today’s leaderboard</h2><div class="panel rows">${board.length ? board.map((b, i) => `<div class="r"><span>${i + 1}. ${esc(b.n)}</span><b class="t-${KR.bandFor(b.s).tier}">${b.s}</b></div>`).join('') : '<p class="sub">no scores yet today.</p>'}</div>
      ${friends.length ? `<h2 class="mt2">Friends (${friends.length})</h2><div class="panel rows">${friends.map((f, i) => `<div class="r"><span>${esc(f.n)} <span class="sub">${f.d}</span></span><b>${f.s} <a href="#" data-rm="${i}" style="color:var(--pink)">✕</a></b></div>`).join('')}</div>` : ''}${backLink()}`;
    $('#svn').onclick = () => { KR.settings.name = $('#nm').value.trim().slice(0, 16); KR.saveSettings(); toast('saved'); go(); };
    if (me) $('#cpc').onclick = () => copy($('#mycode').value);
    $('#addf').onclick = () => {
      const o = dec($('#fc').value); if (!o || !o.n || typeof o.s !== 'number') { toast('invalid code'); return; }
      const f = store.get('krillion-friends', []); const i = f.findIndex(x => x.n === o.n);
      const rec = { n: String(o.n).slice(0, 16), s: Math.max(0, Math.min(700, o.s | 0)), d: String(o.d).slice(0, 10) };
      if (i >= 0) f[i] = rec; else f.push(rec); store.set('krillion-friends', f); go();
    };
    app.querySelectorAll('[data-rm]').forEach(a => a.onclick = e => { e.preventDefault(); const f = store.get('krillion-friends', []); f.splice(+a.dataset.rm, 1); store.set('krillion-friends', f); go(); });
  });

  /* ---------- settings ---------- */
  route(/^\/settings$/, () => {
    const s = KR.settings, st = KR.stats();
    const tog = (k, t, d) => `<div class="toggle"><div>${t}<small>${d}</small></div><button class="sw ${s[k] ? 'on' : ''}" data-k="${k}" role="switch" aria-checked="${s[k]}"></button></div>`;
    app.innerHTML = `<div class="mt"><div class="kicker">tweak the dive</div><h1>Settings</h1></div>
      <div class="panel">${tog('colorblind', 'High-contrast / colorblind mode', 'Brighter, more distinct tier colours.')}
      ${tog('lowPower', 'Low power mode', 'Turns off bubbles and animations.')}
      ${tog('clearRejected', 'Clear rejected entry', 'Empty the box when an answer isn’t found.')}
      ${tog('corrections', 'Preview answer corrections', 'A close typo shows a suggestion you confirm. Off: close matches count automatically.')}
      ${tog('shareLink', 'Add link to share text', 'Append the site link when sharing results.')}</div>
      <h2 class="mt2">Dive buddy</h2><div class="buddies mt">${ART.BUDDIES.map(b => { const un = st.best >= b.streak; return `<button class="buddy ${un ? '' : 'locked'} ${s.character === b.id ? 'sel' : ''}" data-b="${b.id}" ${un ? '' : 'disabled'}>${ART.mascot(b.id)}${esc(b.name)}<small>${b.streak ? b.streak + '-day streak' : 'Earned'}</small></button>`; }).join('')}</div>
      <h2 class="mt2">Data</h2><div class="panel"><p class="sub">Everything is saved only in this browser.</p><p class="mt"><button class="btn small pink" id="reset">Reset all progress</button></p></div>${backLink()}`;
    app.querySelectorAll('.sw').forEach(b => b.onclick = () => { s[b.dataset.k] = !s[b.dataset.k]; KR.saveSettings(); applySettings(); go(); });
    app.querySelectorAll('[data-b]').forEach(b => b.onclick = () => { s.character = b.dataset.b; KR.saveSettings(); go(); });
    $('#reset').onclick = () => { if (confirm('Delete all Krillion progress on this device?')) { KR.store.keys().filter(k => k.startsWith('krillion-')).forEach(k => KR.store.del(k)); location.reload(); } };
  });

  /* ---------- faq ---------- */
  route(/^\/faq$/, () => {
    const Q = [
      ['what is krillion?', 'A daily guessing game about rarity. Seven prompts a day, 25 seconds each. Name something that fits — the rarer your answer, the deeper you dive and the more you score. Max score is 700 (the trench).'],
      ['how does scoring work?', 'Every valid answer lands in a tier: Plankton 10 · Too Clever 15 · Schooler 30 · Rare 60 · Deep Cut 85 · One in a Krillion 100. Every point sinks you 10 metres. 0–150 plankton, 151–250 schooler, 251–350 rare, 351–449 deep cut, 450+ one in a krillion.'],
      ['what is “too clever”?', 'The go-to “obscure” pick that isn’t actually that obscure.'],
      ['why is the krillion sometimes less rare than some deep cuts?', 'Past a certain depth, rarity gets hard to disambiguate, so the gem is also picked for fun factor: the answer that’s most satisfying to land on.'],
      ['why was my answer not listed?', 'The answer sets in this build are hand-assembled starter sets, so a fair answer can be missing. Misses simply score 0.'],
      ['why is autocorrect so generous?', 'Some answers have aliases, and autocorrect checks those too, so being a letter or two off one can turn your guess into something you weren’t expecting. You can turn corrections off in Settings.'],
      ['how does the Puffer Party timer work?', 'The fuse is hidden and random, between 10 and 30 seconds. It’s shared across the room and keeps counting as the puffer is passed. If you pass with 20 seconds left, the next player inherits 20. If fewer than 8 seconds are left, it resets to 8. After a pop, a new random fuse starts.'],
      ['when does the day reset?', 'Every new day starts at midnight Eastern Time. Archive replays don’t extend your streak.'],
      ['are there ads or paid plans?', 'No. Everything — daily, unlimited, archive, themed packs, Puffer Party — is free.'],
      ['where is my progress saved?', 'In this browser only (localStorage). Clearing site data resets it.']
    ];
    app.innerHTML = `<div class="mt"><div class="kicker">krillion</div><h1>FAQ</h1></div><div class="mt">${Q.map(([q, a]) => `<details class="faq"><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div>${backLink('#/', '← back to the dive')}`;
  });

  /* ---------- puffer party (local hot-seat + bots) ---------- */
  route(/^\/party$/, () => {
    const saved = store.get('krillion-party-cfg', { names: ['You', ''], bots: 2, lives: 2 });
    app.innerHTML = `<div class="center mt"><div class="logo" style="font-size:44px">${'KRILLION'.split('').join(' ')}</div>${ART.puffer(1)}<h1>PUFFER PARTY</h1>
      <p class="kicker mt">pass the puffer · don’t let it pop on you</p>
      <p class="sub mt">Name an answer to the prompt and pass the puffer before it pops. Play with friends on this device, or add bots. Last one floating wins.</p></div>
      <div class="panel"><div class="kicker">players (up to 4 humans)</div>${[0, 1, 2, 3].map(i => `<input class="txt mt" data-n="${i}" maxlength="12" placeholder="player ${i + 1} name${i > 1 ? ' (optional)' : ''}" value="${esc(saved.names[i] || '')}">`).join('')}
        <div class="row mt"><label>bots <select class="txt" id="bots" style="width:auto">${[0, 1, 2, 3, 4, 5].map(n => `<option ${n === saved.bots ? 'selected' : ''}>${n}</option>`).join('')}</select></label>
        <label>lives <select class="txt" id="lives" style="width:auto">${[1, 2, 3, 4, 5].map(n => `<option ${n === saved.lives ? 'selected' : ''}>${n}</option>`).join('')}</select></label></div>
        <p class="center mt2"><button class="btn begin pink" id="go">Start party</button></p></div>${backLink()}`;
    $('#go').onclick = () => {
      const names = [...app.querySelectorAll('[data-n]')].map(i => i.value.trim());
      const humans = names.filter(Boolean), bots = +$('#bots').value, lives = +$('#lives').value;
      if (humans.length + bots < 2) { toast('need at least 2 players'); return; }
      store.set('krillion-party-cfg', { names, bots, lives });
      const botNames = ['Plankton Pete', 'Squidward Jr', 'Reef Rita', 'Captain Krill', 'Anchovy Al', 'Brine Betty'];
      party(humans.map(n => ({ name: n, bot: false })).concat(Array.from({ length: bots }, (_, i) => ({ name: botNames[i], bot: true }))), lives);
    };
  });
  function party(list, lives) {
    const players = list.map(p => ({ ...p, lives }));
    let turn = 0, cat, used, fuse, last, timer, botTimer, over = false, seenCats = [];
    const alive = () => players.filter(p => p.lives > 0);
    const nextAlive = i => { let j = i; do { j = (j + 1) % players.length; } while (players[j].lives <= 0); return j; };
    function newRound() {
      let c; do { c = window.KR_DATA[Math.floor(Math.random() * window.KR_DATA.length)]; } while (seenCats.includes(c.id) && seenCats.length < 30);
      seenCats.push(c.id); cat = c; used = new Set(); fuse = 10 + Math.random() * 20; last = performance.now(); render(); botMaybe();
    }
    function remaining() { return fuse - (performance.now() - last) / 1000; }
    function render(msg) {
      const p = players[turn], r = Math.max(0, remaining());
      const scale = 0.7 + 0.45 * (1 - r / 30);
      app.innerHTML = `<div class="center mt"><div class="kicker">${over ? 'game over' : 'pass the puffer'}</div>
        <div class="players">${players.map((q, i) => `<div class="pl ${i === turn && !over ? 'turn' : ''} ${q.lives <= 0 ? 'out' : ''}">${esc(q.name)}${q.bot ? ' 🤖' : ''}<div class="lv">${'♥'.repeat(Math.max(0, q.lives)) || '✕'}</div></div>`).join('')}</div>
        <div id="pf" class="${over ? '' : 'wobble'}" style="animation-duration:${Math.max(.15, r / 20)}s">${ART.puffer(scale)}</div>
        <div class="prompt" style="min-height:0;margin:6px 0">${esc(cat.text)}</div>
        ${over ? `<h2>🏆 ${esc(alive()[0].name)} wins!</h2><p class="mt"><button class="btn" id="again">Play again</button> <a class="btn pink" href="#/party">Setup</a></p>` :
        p.bot ? `<p class="sub">${esc(p.name)} is thinking…</p>` : `<form class="ans" id="f"><input id="inp" maxlength="60" placeholder="${esc(p.name)}: your answer…" autocomplete="off" autofocus><button class="btn" type="submit">Pass</button></form>`}
        <div class="hint" id="hint">${msg || ''}</div>
        <div class="used">${[...used].map(u => `<span>${esc(u)}</span>`).join('')}</div></div>`;
      if (over) { $('#again').onclick = () => party(list, lives); return; }
      if (!p.bot) { const inp = $('#inp'); inp.focus(); $('#f').onsubmit = e => { e.preventDefault(); attempt(inp.value, inp); }; }
      clearInterval(timer);
      timer = setInterval(() => { if (remaining() <= 0) pop(); }, 100);
    }
    function attempt(raw, inp) {
      const g = KR.grade(cat, raw, KR.settings.corrections);
      if (!g) { inp.classList.add('shake'); setTimeout(() => inp.classList.remove('shake'), 300); $('#hint').textContent = 'not on the reef — try another.'; if (KR.settings.clearRejected) inp.value = ''; return; }
      if (used.has(g.canon)) { inp.classList.add('shake'); $('#hint').textContent = 'already used!'; return; }
      pass(g.canon);
    }
    function pass(canon) {
      used.add(canon);
      let rem = remaining(); if (rem < 8) rem = 8;
      fuse = rem; last = performance.now(); turn = nextAlive(turn); render(); botMaybe();
    }
    function botMaybe() {
      clearTimeout(botTimer);
      const p = players[turn]; if (!p.bot || over) return;
      botTimer = setTimeout(() => {
        const avail = KR.allAnswers(cat).filter(a => !used.has(a.canon) && !['krillion', 'deepcut'].includes(a.tier));
        if (!avail.length || Math.random() < 0.08) return; // bot freezes → may pop
        const a = avail[Math.floor(Math.random() * avail.length)]; if (!over && players[turn] === p) pass(a.canon);
      }, 1200 + Math.random() * 4800);
    }
    function pop() {
      clearInterval(timer); clearTimeout(botTimer);
      const p = players[turn]; p.lives--;
      $('#pf').innerHTML = '<div class="pops" style="font-size:120px;text-align:center">💥</div>';
      setTimeout(() => {
        if (alive().length <= 1) { over = true; render(); return; }
        turn = p.lives > 0 ? turn : nextAlive(turn); newRound();
      }, 1100);
    }
    onLeave(() => { clearInterval(timer); clearTimeout(botTimer); over = true; });
    newRound();
  }

  /* ---------- boot ---------- */
  applySettings(); bubbles(); go();
})();
