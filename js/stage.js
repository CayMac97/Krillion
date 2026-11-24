/* Krillion dive stage — full-screen descent scene (camera, world, HUD, dock, plunge FX).
   Own implementation modelled on the observed behaviour of the original game. */
window.Stage = (function () {
  const TIER_IDS = ['plankton', 'tooclever', 'schooler', 'rare', 'deepcut', 'krillion'];
  const TCOL = { plankton: '#8fa3c4', tooclever: '#ff9f43', schooler: '#4de3ff', rare: '#ff5252', deepcut: '#9d7bff', krillion: '#ffd166' };
  const AMBIENT = [
    [60, 'light begins to fade', 'L'], [200, 'most sunlight stops here', 'R'], [332, 'deepest scuba dive ever &mdash; 332m', 'R'],
    [385, 'sperm whales hunt below here', 'L'], [535, 'emperor penguins dive this deep', 'R'], [660, 'pressure: 67x the surface', 'L'],
    [800, 'siphonophore drift zone', 'R'], [1040, 'THE MIDNIGHT ZONE', 'L', 1], [1240, 'anglerfish territory', 'R'],
    [1550, 'sperm whales duel giant squid here', 'L'], [1850, 'giant squid territory', 'R'], [2150, 'colossal squid eyes: football-sized', 'L'],
    [2500, 'the water is 2&deg;C and utterly black', 'R'], [3000, 'THE ABYSSAL ZONE', 'L', 1], [3800, 'the Titanic rests here &mdash; 3,800m', 'R'],
    [4400, 'cusk eels patrol the plain', 'L'], [4900, 'the abyssal plain stretches out', 'R'], [5500, 'deeper than most submarines survive', 'L'],
    [6000, 'THE HADAL ZONE', 'R', 1], [6500, 'named for Hades. fitting.', 'L'], [7000, 'the trench floor &mdash; a perfect dive ends here', 'R', 1]
  ];
  const OFF = 700, WORLD_H = 15600;
  const ease = { io: x => (x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2), out: x => 1 - Math.pow(1 - x, 3), snap: x => { const c = 1.7; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); } };
  const rnd = (a, b) => a + Math.random() * (b - a);
  const lerp = (a, b, t) => a + (b - a) * t;

  /* ---------------- sfx (tiny WebAudio synth) ---------------- */
  const sfx = (function () {
    let ac = null, muted = false;
    try { muted = localStorage.getItem('krillion-muted') === '1'; } catch (e) {}
    function ctx() { if (!ac) { try { ac = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} } if (ac && ac.state === 'suspended') ac.resume(); return ac; }
    function tone(freq, dur, type, vol, when, slide) {
      const a = ctx(); if (!a || muted) return;
      const t0 = a.currentTime + (when || 0), o = a.createOscillator(), g = a.createGain();
      o.type = type || 'square'; o.frequency.setValueAtTime(freq, t0);
      if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(30, slide), t0 + dur);
      g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime((vol || .05), t0 + .01); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      o.connect(g); g.connect(a.destination); o.start(t0); o.stop(t0 + dur + .02);
    }
    const E = {
      begin() { tone(220, .5, 'sawtooth', .05, 0, 70); tone(330, .35, 'square', .03, .05, 110); },
      submit() { tone(520, .07, 'square', .04); tone(780, .08, 'square', .04, .06); },
      reject() { tone(160, .18, 'sawtooth', .06, 0, 90); tone(120, .2, 'sawtooth', .05, .1, 70); },
      sink() { tone(300, 1.4, 'triangle', .05, 0, 70); },
      tierline() { tone(880, .07, 'square', .03); },
      land_small() { tone(200, .15, 'square', .05, 0, 120); },
      land_big() { tone(180, .1, 'square', .06); tone(360, .25, 'triangle', .06, .08); tone(540, .3, 'triangle', .04, .16); },
      krillion() { [523, 659, 784, 1046, 1319].forEach((f, i) => tone(f, .35, 'square', .05, i * .1)); },
      miss() { tone(130, .5, 'sawtooth', .05, 0, 50); },
      tick() { tone(1200, .03, 'square', .025); },
      surface() { tone(220, 1.6, 'triangle', .05, 0, 660); },
      click() { tone(700, .04, 'square', .03); },
      blub() { tone(300, .15, 'sine', .08, 0, 700); tone(380, .12, 'sine', .06, .08, 800); }
    };
    return { event(n) { if (E[n]) { try { E[n](); } catch (e) {} } }, get muted() { return muted; }, toggle() { muted = !muted; try { localStorage.setItem('krillion-muted', muted ? '1' : '0'); } catch (e) {} if (!muted) E.click(); return muted; } };
  })();

  function create(host, cfg) {
    const ui = cfg.ui, lowPower = !!cfg.lowPower;
    const U = () => host.clientWidth || innerWidth, H = () => host.clientHeight || innerHeight;
    let u = U(), h = H();
    host.className = 'ds-root';
    host.dataset.phase = 'intro';
    host.dataset.world = 'ocean';
    if (lowPower) host.dataset.lowPower = '';
    host.style.setProperty('--ds-accent', cfg.accent || '#4de3ff');
    host.innerHTML = `
      <div class="ds-stage">
        <canvas class="ds-sea"></canvas>
        <div class="ds-world">
          <div class="ds-surface"><div class="ds-title"></div><div class="ds-tagline"></div><div class="ds-subline"></div></div>
          <div class="ds-floor"></div>
        </div>
        <canvas class="ds-fore"></canvas>
        <div class="ds-dim"></div><div class="ds-vignette"></div><div class="ds-edge"></div><div class="ds-flash"></div>
        <div class="ds-hud">
          <div class="ds-pod ds-px"><div class="label">DEPTH</div><div class="ds-depth-num">0m</div></div>
          <div class="ds-hud-mid"><div class="ds-dots"></div><div class="ds-prompt-count">SURFACE</div></div>
          <div class="ds-pod ds-px ds-score-pod"><div class="label">SCORE</div><div class="ds-score-num">0</div></div>
        </div>
        <div class="ds-mascot" title="a friend"><span class="ds-mascot-sprite"></span><span class="ds-blub">blub!</span></div>
        <div class="ds-correction"></div>
        <div class="ds-reject-wrap"></div>
        <div class="ds-preview-pill ds-px" hidden></div>
        <form class="ds-dock" autocomplete="off">
          <div class="ds-dock-inner">
            <div class="ds-sonar-wrap"><div class="ds-sonar-scope"><div class="ds-sweep"></div></div><div class="ds-time-digits">25</div></div>
            <div class="ds-input-col">
              <input class="ds-input" placeholder="type one answer…" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" enterkeyhint="send" maxlength="120" aria-label="Your answer">
              <div class="ds-fuse"><div class="ds-fuse-fill"></div></div>
            </div>
            <button class="ds-go" type="submit">${ui.submit}</button>
          </div>
        </form>
        <div class="ds-nextwrap" hidden><button class="ds-begin-btn ds-next" type="button"></button></div>
        <div class="ds-intro" hidden><div class="ds-intro-inner"></div></div>
        <div class="ds-crt"></div>
        <button class="ds-mute" type="button" aria-label="toggle sound"></button>
      </div>`;
    const $ = s => host.querySelector(s);
    const stageEl = $('.ds-stage'), sea = $('.ds-sea'), fore = $('.ds-fore'), world = $('.ds-world');
    const sctx = sea.getContext('2d'), fctx = fore.getContext('2d');
    const dim = $('.ds-dim'), edge = $('.ds-edge'), flashEl = $('.ds-flash'), crt = $('.ds-crt');
    const mascot = $('.ds-mascot'), sprite = $('.ds-mascot-sprite'), blub = $('.ds-blub');
    const depthNum = $('.ds-depth-num'), scoreNum = $('.ds-score-num'), dots = $('.ds-dots'), pcount = $('.ds-prompt-count');
    const dock = $('.ds-dock'), input = $('.ds-input'), digits = $('.ds-time-digits'), fuseFill = $('.ds-fuse-fill');
    const corrEl = $('.ds-correction'), rejectWrap = $('.ds-reject-wrap'), pill = $('.ds-preview-pill');
    const nextWrap = $('.ds-nextwrap'), nextBtn = $('.ds-next'), introEl = $('.ds-intro'), introInner = $('.ds-intro-inner');
    const muteBtn = $('.ds-mute');

    // ---- state ----
    let ep = -45;          // camera depth (m at screen centre)
    let eP = 0;            // depth of current landed position (m)
    let shownDepth = 0;    // number in HUD (m)
    let phase = 'intro', destroyed = false;
    let gold = false, chip = null, card = null, lines = null, landed = null, perch = null, lanternOn = false;
    let eL = 0, eC = 0; // chip depth / wobble
    let plunging = false, descending = false;
    const tweens = [], timeouts = [];
    const bubblesL = [], bursts = [], sparks = [];
    let snow = [];
    const LC = () => (u < 700 ? 175 : 210), C = () => (h / 2 - LC()) / 2;
    const ey = d => h / 2 + 2 * (d - ep), Y = d => 2 * d + OFF, cx = () => u / 2 - (u < 700 ? 24 : 0);
    const ed = y => ep + (y - h / 2) / 2; // screen y → depth

    const setT = (fn, ms) => { const id = setTimeout(() => { if (!destroyed) fn(); }, ms); timeouts.push(id); return id; };
    function tween(ms, easing, fn, done) { tweens.push({ t: 0, ms, easing: easing || ease.io, fn, done }); }

    // ---- title letters ----
    $('.ds-title').innerHTML = 'KRILLION'.split('').map((c, i) => `<span style="animation-delay:${(.18 * i).toFixed(2)}s">${c}</span>`).join('');
    $('.ds-tagline').textContent = cfg.tagline || 'one in a krillion.';
    $('.ds-subline').textContent = cfg.subline || 'seven prompts a day. rare answers sink you deeper.';
    // ---- ambient labels / floor ----
    AMBIENT.forEach(([d, text, side, major]) => {
      const a = document.createElement('div'); a.className = 'ds-amb ' + side + (major ? ' major' : '');
      a.style.top = Y(d) + 'px'; a.innerHTML = `<span class="dash">&mdash;</span> ${text}`; world.appendChild(a);
    });
    const floor = $('.ds-floor'); floor.style.top = Y(7000) + 'px';
    floor.innerHTML = '<svg viewBox="0 0 800 300" preserveAspectRatio="none"><path d="M0 120 C80 60 140 150 220 110 C300 70 360 140 440 100 C520 60 600 150 700 90 C740 70 780 100 800 110 V300 H0Z" fill="#06101c"/><path d="M0 170 C100 140 200 200 320 160 C440 120 560 200 680 150 C740 130 780 160 800 170 V300 H0Z" fill="#040a13"/><g fill="#0c2236">' +
      Array.from({ length: 22 }, (_, i) => `<path d="M${30 + i * 36} 150 q-6 -${30 + (i * 7) % 30} 0 -${44 + (i * 11) % 30} q6 ${20 + (i * 5) % 14} 0 ${44 + (i * 11) % 30}z" opacity=".7"/>`).join('') + '</g></svg>';

    // ---- mascot ----
    let mCharacter = cfg.character || 'krill';
    function setMascot(id) { mCharacter = id; sprite.innerHTML = ART.mascot(id, gold); const b = ART.BUDDIES.find(x => x.id === id) || ART.BUDDIES[0]; blub.textContent = b.blub; mascot.style.setProperty('--dsm-color', b.color || '#ff5d8f'); }
    setMascot(mCharacter);
    let mx = u * .72, my = h * .4, mr = 6, mTarget = null;
    mascot.addEventListener('click', () => {
      const b = ART.BUDDIES.find(x => x.id === mCharacter) || ART.BUDDIES[0];
      const svg = sprite.firstElementChild; if (!svg) return;
      const cls = 'poke-' + (b.poke || 'roll'); svg.classList.remove(cls); void svg.getBoundingClientRect(); svg.classList.add(cls);
      setTimeout(() => svg.classList.remove(cls), b.pokeMs || 950);
      blub.classList.remove('show'); void blub.offsetWidth; blub.classList.add('show'); sfx.event('blub');
    });
    function mState(s) { mTarget = s; }
    function mascotFx(cls, ms) { const svg = sprite.firstElementChild; if (!svg) return; svg.classList.add('fx-' + cls); if (ms) setT(() => svg.classList.remove('fx-' + cls), ms); }
    function setGold(on) { gold = on; setMascot(mCharacter); mascot.classList.toggle('gold', on); }

    // ---- HUD ----
    function setDots(n, cur) { dots.innerHTML = Array.from({ length: n }, (_, i) => `<i class="${cur === i ? 'cur' : ''}"></i>`).join(''); }
    function markDot(i, tier) { const e = dots.children[i]; if (e) { e.className = 'done'; e.style.background = tier ? TCOL[tier] : '#3d4f6e'; e.style.boxShadow = '0 0 0 2px #060d1a,0 0 8px ' + (tier ? TCOL[tier] : '#3d4f6e'); } }
    function curDot(i) { const e = dots.children[i]; if (e) { e.className = 'cur'; e.style.background = ''; e.style.boxShadow = ''; } }
    function setDepthNum(m, crank) { shownDepth = m; depthNum.textContent = Math.round(m).toLocaleString('en-US') + 'm'; if (crank) { depthNum.classList.remove('crank'); void depthNum.offsetWidth; depthNum.classList.add('crank'); } }
    function setScoreNum(n, slam) { scoreNum.textContent = n; if (slam) { scoreNum.classList.remove('slam'); void scoreNum.offsetWidth; scoreNum.classList.add('slam'); } }

    // ---- fx helpers ----
    function shake() { stageEl.classList.remove('ds-shake'); void stageEl.offsetWidth; stageEl.classList.add('ds-shake'); }
    function zap() { crt.classList.remove('zap'); void crt.offsetWidth; crt.classList.add('zap'); }
    function flash(color, times, ms) {
      let n = 0; const go = () => {
        flashEl.style.transition = 'none'; flashEl.style.background = color; flashEl.style.opacity = '.42';
        requestAnimationFrame(() => requestAnimationFrame(() => { flashEl.style.transition = `opacity ${ms}ms ease-out`; flashEl.style.opacity = '0'; }));
        if (++n < times) setT(go, ms * 2.1);
      }; go();
    }
    function spotlight(x, y, r) { const l = r || 66; dim.style.background = `radial-gradient(circle at ${x}px ${y}px, transparent ${l}px, rgba(2,4,10,.72) ${l + 90}px, rgba(2,4,10,.96) ${l + 260}px)`; dim.classList.add('on'); lanternOn = true; }
    const bubble = (x, y, r) => { if (!lowPower) bubblesL.push({ x, d: ed(y), r: r || 2 + Math.random() * 3, life: 1.4 + Math.random() * .8, t: 0, wob: Math.random() * 6 }); };
    const burst = (x, y, color, count, speed) => { if (lowPower) count = Math.ceil(count / 3); for (let i = 0; i < count; i++) { const a = Math.PI * 2 * i / count + Math.random() * .3; bursts.push({ x, d: ed(y), vx: Math.cos(a) * 200 * (speed || .7) * rnd(.6, 1), vd: Math.sin(a) * 100 * (speed || .7) * rnd(.6, 1), r: rnd(2, 4), life: rnd(.5, .9), t: 0, color }); } };
    const sparkle = (x, y, n) => { for (let i = 0; i < n; i++) sparks.push({ x: x + rnd(-14, 14), d: ed(y + rnd(-10, 10)), vx: rnd(-40, 40), vd: rnd(-30, 8), r: rnd(1.4, 3), life: rnd(.6, 1.1), t: 0, color: Math.random() < .5 ? '#ffd166' : '#ffe9a8' }); };
    function ring(x, y, color) { const r = document.createElement('div'); r.className = 'ds-ring'; r.style.cssText = `left:${x}px;top:${y}px;border-color:${color}`; stageEl.appendChild(r); setTimeout(() => r.remove(), 900); }

    // ---- canvases ----
    const DPR = Math.min(2, window.devicePixelRatio || 1);
    function resize() {
      u = U(); h = H();
      [sea, fore].forEach(c => { c.width = u * DPR; c.height = h * DPR; c.style.width = u + 'px'; c.style.height = h + 'px'; });
      sctx.setTransform(DPR, 0, 0, DPR, 0, 0); fctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      if (!snow.length) snow = Array.from({ length: lowPower ? 20 : 90 }, () => ({ x: Math.random(), d: Math.random() * 400, r: rnd(.8, 2.4), sp: rnd(1, 4), ph: Math.random() * 6, a: rnd(.15, .55) }));
    }
    resize();
    const onResize = () => { resize(); };
    addEventListener('resize', onResize);

    const hexRGB = hx => [1, 3, 5].map(i => parseInt(hx.slice(i, i + 2), 16));
    const mixc = (a, b, t) => 'rgb(' + a.map((v, i) => Math.round(lerp(v, b[i], t))).join(',') + ')';
    function drawSea(t) {
      const y0 = ey(0), W = u, Hh = h;
      sctx.clearRect(0, 0, W, Hh);
      if (y0 > 0) { // sky
        const g = sctx.createLinearGradient(0, 0, 0, y0); g.addColorStop(0, '#6bb8de'); g.addColorStop(1, '#d8f0ff');
        sctx.fillStyle = g; sctx.fillRect(0, 0, W, Math.min(Hh, y0 + 1));
        // soft clouds
        sctx.fillStyle = 'rgba(255,255,255,.55)';
        for (let i = 0; i < 4; i++) { const cxp = ((i * 260 + t * 6 * (1 + i * .2)) % (W + 260)) - 130, cy = y0 - 120 - i * 38; sctx.beginPath(); sctx.ellipse(cxp, cy, 90, 18, 0, 0, 7); sctx.ellipse(cxp + 40, cy - 12, 56, 16, 0, 0, 7); sctx.fill(); }
      }
      const top = Math.max(0, y0), g2 = sctx.createLinearGradient(0, top, 0, Hh);
      const steps = 10;
      for (let k = 0; k <= steps; k++) { const y = lerp(top, Hh, k / steps), d = Math.max(0, ed(y)); g2.addColorStop(k / steps, KR.colorAt(d)); }
      sctx.fillStyle = g2; sctx.fillRect(0, top, W, Hh - top);
      if (y0 > -400 && y0 < Hh + 50) {
        // surface wave + band
        sctx.fillStyle = 'rgba(180,235,255,.35)'; sctx.beginPath(); sctx.moveTo(0, y0);
        for (let x = 0; x <= W; x += 12) sctx.lineTo(x, y0 + Math.sin(x * .025 + t * 1.6) * 3 + Math.sin(x * .06 - t * 2.3) * 1.5);
        sctx.lineTo(W, y0 + 10); sctx.lineTo(0, y0 + 10); sctx.fill();
        sctx.strokeStyle = 'rgba(255,255,255,.7)'; sctx.lineWidth = 2; sctx.beginPath();
        for (let x = 0; x <= W; x += 12) { const yy = y0 + Math.sin(x * .025 + t * 1.6) * 3 + Math.sin(x * .06 - t * 2.3) * 1.5; x ? sctx.lineTo(x, yy) : sctx.moveTo(x, yy); }
        sctx.stroke();
        // light rays
        if (!lowPower) {
          for (let i = 0; i < 6; i++) {
            const bx = ((i * .19 + .05) * W + Math.sin(t * .25 + i) * 40), len = 800, a = Math.max(0, .16 - (Math.max(0, -y0) / 2) / 900) * (.7 + .3 * Math.sin(t * .6 + i * 2));
            const gr = sctx.createLinearGradient(0, y0, 0, y0 + len); gr.addColorStop(0, `rgba(190,240,255,${a})`); gr.addColorStop(1, 'rgba(190,240,255,0)');
            sctx.fillStyle = gr; sctx.beginPath(); sctx.moveTo(bx - 20, y0); sctx.lineTo(bx + 20, y0); sctx.lineTo(bx + 120 + i * 20, y0 + len); sctx.lineTo(bx - 60 + i * 20, y0 + len); sctx.fill();
          }
        }
      }
      // marine snow (only below the surface)
      const win = h / 2 + 20, lo = ep - win / 2, hi = ep + win / 2;
      for (const s of snow) {
        if (!lowPower) s.d += s.sp * .03;
        while (s.d < lo) s.d += win; while (s.d > hi) s.d -= win;
        const y = ey(s.d); if (y < Math.max(y0, 0)) continue;
        const x = (s.x * W + Math.sin(t * .5 + s.ph) * 12 + W) % W;
        sctx.fillStyle = `rgba(200,225,255,${s.a})`; sctx.fillRect(x, y, s.r, s.r);
      }
    }
    function drawFore(t, dt) {
      fctx.clearRect(0, 0, u, h);
      // bubbles
      for (let i = bubblesL.length - 1; i >= 0; i--) {
        const b = bubblesL[i]; b.t += dt; if (b.t > b.life) { bubblesL.splice(i, 1); continue; }
        b.d -= 14 * dt; const y = ey(b.d), x = b.x + 3 * Math.sin(3 * b.t + b.wob);
        fctx.strokeStyle = `rgba(200,235,255,${Math.min(.7, .5 * (1 - b.t / b.life) * 2)})`; fctx.lineWidth = 1.2; fctx.beginPath(); fctx.arc(x, y, b.r, 0, 7); fctx.stroke();
      }
      for (let i = bursts.length - 1; i >= 0; i--) {
        const p = bursts[i]; p.t += dt; if (p.t > p.life) { bursts.splice(i, 1); continue; }
        p.vx *= 1 - 2.4 * dt; p.vd *= 1 - 2.4 * dt; p.x += p.vx * dt; p.d += p.vd * dt;
        fctx.globalAlpha = 1 - p.t / p.life; fctx.fillStyle = p.color; fctx.fillRect(p.x - p.r / 2, ey(p.d) - p.r / 2, p.r, p.r);
      }
      for (let i = sparks.length - 1; i >= 0; i--) {
        const p = sparks[i]; p.t += dt; if (p.t > p.life) { sparks.splice(i, 1); continue; }
        p.x += p.vx * dt; p.d += p.vd * dt; p.vx *= 1 - 2 * dt; p.vd *= 1 - 2 * dt;
        fctx.globalAlpha = 1 - p.t / p.life; fctx.fillStyle = p.color; fctx.fillRect(p.x - p.r / 2, ey(p.d) - p.r / 2, p.r, p.r);
      }
      fctx.globalAlpha = 1;
      // ruler
      const e = ep - h / 4, tt = ep + h / 4, rx = u - 14;
      fctx.strokeStyle = 'rgba(125,147,184,.55)'; fctx.lineWidth = 2; fctx.font = '13px VT323, monospace'; fctx.textAlign = 'right';
      const l0 = Math.max(0, ey(0));
      if (l0 < h) { fctx.beginPath(); fctx.moveTo(rx, l0); fctx.lineTo(rx, h); fctx.stroke(); }
      const my2 = ey(hasScore ? eP : -100);
      for (let l = Math.max(0, 10 * Math.floor(e / 10)); l <= tt; l += 10) {
        const y = ey(l); if (y < -4 || y > h + 4) continue;
        const len = l % 100 === 0 ? 16 : l % 50 === 0 ? 10 : 5;
        fctx.beginPath(); fctx.moveTo(rx - len, y); fctx.lineTo(rx, y); fctx.stroke();
        if (l % 100 === 0 && !(hasScore && Math.abs(y - my2) < 14)) { fctx.fillStyle = 'rgba(125,147,184,.95)'; fctx.fillText(l === 0 ? '0' + ui.unit : '-' + l.toLocaleString() + ui.unit, rx - len - 5, y + 4); }
      }
      if (my2 > -20 && my2 < h + 20 && hasScore) {
        fctx.fillStyle = '#ff5d8f'; fctx.beginPath(); fctx.moveTo(rx + 4, my2); fctx.lineTo(rx + 12, my2 - 5); fctx.lineTo(rx + 12, my2 + 5); fctx.closePath(); fctx.fill();
        fctx.strokeStyle = 'rgba(255,93,143,.85)'; fctx.beginPath(); fctx.moveTo(rx - 20, my2); fctx.lineTo(rx + 4, my2); fctx.stroke();
        fctx.font = '12px VT323, monospace'; fctx.fillText('YOU', rx - 24, my2 + 4);
      }
    }
    let hasScore = false;

    // ---- main loop ----
    let last = performance.now(), T0 = last, lastTf = '';
    function frame(now) {
      if (destroyed) return;
      const dt = Math.min(.05, (now - last) / 1000), t = (now - T0) / 1000; last = now;
      for (let i = tweens.length - 1; i >= 0; i--) {
        const tw = tweens[i]; tw.t += dt * 1000; const k = Math.min(1, tw.t / tw.ms);
        tw.fn(tw.easing(k)); if (k >= 1) { tweens.splice(i, 1); tw.done && tw.done(); }
      }
      const tf = `translate3d(0,${h / 2 - OFF - 2 * ep}px,0)`; if (tf !== lastTf) { world.style.transform = tf; lastTf = tf; }
      drawSea(t); drawFore(t, dt);
      // mascot follow
      let tgt;
      if (perch) tgt = { x: perch.x, y: ey(perch.d) - 92, rot: 0 };
      else if (plunging) tgt = { x: Math.min(cx() + 95, u - 44), y: ey(eL) - 14, rot: 24 };
      else if (phase === 'intro') tgt = { x: .72 * u, y: ey(0) + 105, rot: 0 };
      else if (phase === 'landed') tgt = { x: .16 * u, y: .28 * h, rot: -8 };
      else if (phase === 'finale') tgt = { x: .82 * u, y: .16 * h, rot: -6 };
      else if (phase === 'round' || phase === 'descend' || phase === 'answering') tgt = { x: 48, y: h - 168, rot: 0 };
      else tgt = { x: .72 * u, y: .4 * h, rot: 6 };
      const k2 = 1 - Math.exp((plunging ? -4.6 : -2.6) * dt);
      mx += (tgt.x - mx) * k2; my += (tgt.y - my) * k2; mr += (tgt.rot - mr) * k2;
      const bob = Math.sin(1.7 * t) * 6, half = mascot.offsetWidth / 2;
      mascot.style.transform = `translate3d(${mx - half}px,${my - half + bob}px,0) rotate(${mr + Math.sin(1.1 * t) * 4}deg)`;
      if (!lowPower && Math.random() < dt / 2.2) bubble(mx + 20, my + bob - 8, 1.5 + 2 * Math.random());
      if (gold && !lowPower && Math.random() < dt * 1.8) sparkle(mx, my + bob, 1);
      // chip wobble position
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);

    /* ============ phases ============ */
    function setPhase(p) { phase = p; host.dataset.phase = p === 'round' || p === 'descend' ? 'preview' : p; }
    function intro(introHtml) {
      setPhase('intro'); document.body.classList.add('in-stage', 'stage-intro'); $('.ds-surface').classList.remove('gone');
      ep = -45; eP = 0; hasScore = false; setDepthNum(0); setScoreNum(0); pcount.textContent = 'SURFACE'; setDots(7, -1);
      const s = $('.ds-surface'); s.style.top = (Y(0) - (u < 700 ? 300 : 340)) + 'px';
      introInner.innerHTML = introHtml; introEl.hidden = false;
    }
    function leaveIntro() { introEl.hidden = true; document.body.classList.remove('stage-intro'); $('.ds-surface').classList.add('gone'); }

    function makeCard(round, text, depth, delay) {
      const a = document.createElement('div'); a.className = 'ds-card ds-px'; a.style.top = Y(depth) + 'px'; if (delay) a.style.animationDelay = delay + 's';
      a.innerHTML = `<div class="rnd">${ui.promptWord} ${round + 1} OF 7</div><div class="prompt"></div><div class="hint">${ui.hint}</div>`;
      a.querySelector('.prompt').textContent = text; world.appendChild(a); return a;
    }
    function clearReveal() { world.classList.remove('ds-reveal'); if (lines) { lines.forEach(l => l.el.remove()); lines = null; } }
    function descendToRound(round, text, dur) {
      setPhase('descend'); descending = true; clearReveal(); dim.classList.remove('on'); lanternOn = false;
      if (perch) { perch = null; mascot.classList.remove('perched'); }
      if (landed) { const l = landed; l.style.transition = 'opacity .6s'; l.style.opacity = '0'; setTimeout(() => l.remove(), 650); landed = null; }
      nextWrap.hidden = true; pcount.textContent = `PROMPT ${round + 1}/7`; curDot(round);
      card = makeCard(round, text, eP, .45);
      const from = ep; tween(dur || 2200, ease.io, k => { ep = lerp(from, eP + C(), k); }, () => { descending = false; setPhase('round'); });
      zap();
    }
    function restoreTo(depth, score, round, text, tiers) { // not used for resume yet
      eP = depth; ep = eP + C();
    }
    function startAnswering() { setPhase('answering'); dock.classList.add('up'); }
    function stopAnswering() { dock.classList.remove('up'); dock.classList.remove('hot'); edge.classList.remove('danger'); host.style.setProperty('--ds-urgency', '0'); }
    function setUrgency(t) {
      host.style.setProperty('--ds-urgency', t.toFixed(3)); const danger = t > .8; edge.classList.toggle('danger', danger);
      if (danger && t < 1) { const s = Math.ceil((1 - t) * 15); if (s !== setUrgency.last) { setUrgency.last = s; sfx.event('tick'); } } else setUrgency.last = -1;
    }
    function setHot(on) { dock.classList.toggle('hot', on); digits.classList.toggle('hot', on); $('.ds-sweep').classList.toggle('hot', on); }
    function setTime(ms, total) { digits.textContent = Math.max(0, Math.ceil(ms / 1000)); fuseFill.style.transform = `scaleX(${Math.max(0, ms / total)})`; }

    function showPill(html) { if (html == null) { pill.hidden = true; return; } pill.innerHTML = html; pill.hidden = false; }
    function showCorrection(from, to) {
      const e = s => String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
      corrEl.innerHTML = `<div class="ds-preview-pill ds-px ds-correction-panel" role="status"><span class="ds-correction-change"><span>“${e(from)}”</span><span class="ds-correction-arrow"> → </span><b>“${e(to)}”</b></span><span class="ds-correction-hint">submit again to confirm · or edit</span></div>`;
    }
    function hideCorrection() { corrEl.innerHTML = ''; }
    let rejN = 0;
    function showReject(msg) { rejectWrap.innerHTML = `<div class="ds-reject ds-reject-shake" aria-live="polite" data-n="${++rejN}"></div>`; rejectWrap.firstChild.textContent = msg; }
    function hideReject() { rejectWrap.innerHTML = ''; }
    function typeFx() { const r = input.getBoundingClientRect(), hr = host.getBoundingClientRect(); const x = r.left - hr.left + 14 + Math.min(11 * input.value.length, r.width - 28); bubble(x + rnd(-3, 3), r.top - hr.top + rnd(4, 12), 1 + 2 * Math.random()); }
    function submitFx() { sfx.event('submit'); zap(); const r = input.getBoundingClientRect(), hr = host.getBoundingClientRect(); for (let i = 0; i < 12; i++) bubble(r.left - hr.left + rnd(0, r.width), r.top - hr.top + rnd(0, r.height), 2 + 3 * Math.random()); edge.classList.remove('danger'); }
    function rejectFx() { sfx.event('reject'); zap(); bubble(cx() + rnd(-40, 40), h - 120); bubble(cx() + rnd(-40, 40), h - 130); }

    /* ---- plunge (answer accepted / missed) ---- */
    function ejLanded(res, depth) {
      if (res.tier && lines) lines.forEach(l => { if (l.tier === res.tier) { l.el.style.transition = 'opacity .5s'; l.el.style.opacity = '0'; } });
      const el = document.createElement('div'); el.className = 'ds-landed' + (res.tier ? '' : ' miss'); el.style.top = Y(depth) + 'px';
      el.style.setProperty('--tc', res.tier ? `var(--tier-${res.tier})` : 'var(--tier-miss)');
      el.innerHTML = (res.tier ? `<div class="icon">${ART.tier(res.tier)}</div>` : '') + `<div class="tname">${res.tier ? KR.TIERS[res.tier].name.toUpperCase() : 'NOTHING LANDED'}</div><div class="tans"></div><div class="tpts"><b>+${res.score} PTS</b>${res.score > 0 ? ` &middot; ${ui.sinkVerb} ${(10 * res.score).toLocaleString()}${ui.unit}` : ''}</div><div class="tsub"></div>`;
      el.querySelector('.tans').textContent = res.answerText ? `“${res.answerText}”` : '—';
      el.querySelector('.tsub').textContent = res.sub || ''; world.appendChild(el); return el;
    }
    function swarm(totalMs) {
      const n = u < 700 ? 8 : 11;
      for (let i = 0; i < n; i++) {
        const el = document.createElement('div'); el.className = 'ds-swarm-fish ds-swarm-ticket';
        stageEl.appendChild(el);
        const L = i % 2 === 0, x0 = L ? -70 : u + 70, x1 = L ? u + 70 : -70, y0 = .42 * h + rnd(-130, 130), delay = 110 * i, dur = rnd(1300, 2000);
        el.animate([{ transform: `translate(${x0}px,${y0}px) scaleX(${L ? 1 : -1})` }, { transform: `translate(${(x0 + x1) / 2}px,${.42 * h + rnd(-30, 30)}px) scaleX(${L ? 1 : -1}) rotate(${rnd(-14, 14)}deg)`, offset: .5 }, { transform: `translate(${x1}px,${y0 + rnd(-60, 60)}px) scaleX(${L ? 1 : -1})` }], { duration: dur, delay, easing: 'cubic-bezier(.45,.05,.55,.95)', fill: 'both' });
        setTimeout(() => el.remove(), Math.min(delay + dur + 100, totalMs + 1400));
      }
    }
    function plunge(res, done) {
      // res: {tier|null, score, answerText, sub, newScore, round}
      setPhase('plunge'); plunging = true; stopAnswering(); hideCorrection(); hideReject(); showPill(null);
      const r = eP, tier = res.tier, target = tier ? r + 10 * res.score : r + 40;
      world.classList.add('ds-reveal');
      if (tier) {
        lines = []; TIER_IDS.forEach((id, i) => {
          const d = r + 10 * KR.TIERS[id].score, el = document.createElement('div'); el.className = 'ds-tierline'; el.style.top = Y(d) + 'px'; el.style.setProperty('--tc', `var(--tier-${id})`);
          el.innerHTML = `<div class="tag"><span class="ico">${ART.tier(id)}</span>${KR.TIERS[id].name.toUpperCase()} &middot; ${KR.TIERS[id].score}</div>`;
          el.style.opacity = '0'; world.appendChild(el); requestAnimationFrame(() => { el.style.transition = `opacity .55s ease-out ${90 * i}ms`; el.style.opacity = '1'; });
          lines.push({ d, el, tier: id, passed: false });
        });
      }
      if (card) { const c = card; burst(cx(), ey(r + 60), '#4de3ff', 12, .6); c.classList.add('gone'); setTimeout(() => c.remove(), 650); card = null; }
      chip = document.createElement('div'); chip.className = 'ds-chip'; chip.style.setProperty('--cc', tier ? `var(--tier-${tier})` : 'var(--tier-miss-lit)');
      chip.textContent = `“${res.answerText || res.raw || '…'}”`; world.appendChild(chip); chip.style.top = Y(0) + 'px';
      const start = r + 90, dur = tier ? Math.min(4200, 1100 + 3.2 * 10 * res.score) : 900; eL = start; sfx.event(tier ? 'sink' : 'miss');
      const gk = tier || 'miss';
      if (!tier) { shake(); zap(); flash('rgba(61,79,110,.5)', 1, 260); mascotFx('sad', dur + 800); }
      else if (gk === 'plankton') mascotFx('sad', dur + 800);
      else if (gk === 'tooclever') { flash('rgba(255,159,67,.7)', 3, 130); shake(); mascotFx('faint', 2400); swarm(dur); }
      else if (gk === 'rare') { flash('rgba(255,82,82,.4)', 1, 220); sparkle(cx(), ey(start), 10); }
      else if (gk === 'deepcut') spotlight(cx(), ey(start));
      else if (gk === 'krillion') { flash('rgba(255,209,102,.45)', 1, 180); chip.classList.add('gold'); }
      const ease2 = gk === 'plankton' ? ease.out : ease.io;
      tween(dur, ease2, k => {
        eL = lerp(start, target, k);
        let rot = 0, wob = 0;
        if (gk === 'plankton') { wob = 36 * Math.sin(7 * k) * (1 - .25 * k); rot = .55 * wob; }
        else if (gk === 'tooclever') { wob = 7 * Math.sin(42 * k) + rnd(-2, 2); rot = rnd(-3, 3); }
        else if (gk === 'krillion') { wob = Math.sin(24 * k) * (1 - k) * 26; rot = .5 * wob; }
        else { wob = Math.sin(16 * k) * (1 - k) * 14; rot = .4 * wob; }
        eC = wob; chip.style.transform = `translate3d(calc(-50% + ${wob}px),${2 * eL}px,0) rotate(${rot}deg)`;
        ep = eL + 30;
        if (gk !== 'krillion' || true) setDepthNum(lerp(r * 1, target, k) - 0, false);
        const px = cx() + wob, py = ey(eL);
        if (gk === 'plankton') { if (Math.random() < .25) bubble(px + rnd(-30, 30), py); }
        else if (gk === 'rare') { if (Math.random() < .09) sparkle(px + rnd(-20, 20), py - 10, 3); }
        else if (gk === 'krillion') { if (Math.random() < .5) bubble(px + rnd(-30, 30), py, 1.5 + 2 * Math.random()); sparkle(px, py, Math.random() < .5 ? 1 : 0); }
        else if (gk === 'deepcut') { spotlight(px, py); if (Math.random() < .3) bubble(px + rnd(-20, 20), py, 1 + 2 * Math.random()); }
        else if (Math.random() < .6) bubble(px + rnd(-34, 34), py + rnd(-8, 4), 1.5 + 2.5 * Math.random());
        if (lines) lines.forEach(l => { if (!l.passed && eL > l.d - 4) { l.passed = true; l.el.classList.add('passed'); sfx.event('tierline'); if (l.tier !== tier) burst(cx(), ey(l.d), TCOL[l.tier], 7, .5); } });
      }, () => landing(res, target, done));
    }
    function landing(res, target, done) {
      plunging = false; if (chip) { chip.remove(); chip = null; }
      const tier = res.tier; setPhase('landed');
      sfx.event(tier === 'krillion' ? 'krillion' : (!tier || tier === 'plankton' || tier === 'tooclever') ? 'land_small' : 'land_big');
      const el = ejLanded(res, target); landed = el; eP = target; hasScore = true; ep = target + 30;
      const x = cx(), y = ey(target), col = tier ? TCOL[tier] : '#3d4f6e';
      setDepthNum(target, true); setScoreNum(res.newScore, true); markDot(res.round, tier);
      if (!tier) { burst(x, y, col, 6, .3); }
      else if (tier === 'plankton') burst(x, y, col, 8, .4);
      else if (tier === 'tooclever') { flash('rgba(255,159,67,.6)', 2, 130); shake(); burst(x, y, col, 18, .7); }
      else if (tier === 'schooler') burst(x, y, col, 22, .8);
      else if (tier === 'rare') { sparkle(x, y, 22); burst(x, y, col, 26, .9); shake(); flash('rgba(255,82,82,.45)', 1, 240); }
      else if (tier === 'deepcut') { spotlight(x, y, 200); burst(x, y, col, 18, .7); setT(() => { dim.classList.remove('on'); lanternOn = false; }, 2300); }
      else if (tier === 'krillion') {
        perch = { x, d: target }; mascot.classList.add('perched'); el.classList.add('perched'); flash('rgba(255,209,102,.35)', 1, 220); mascotFx('celebrate', 1250);
        setT(() => { setGold(true); ring(x, y, '#ffd166'); sparkle(x, y, 30); }, 1000);
        setT(() => { perch = null; mascot.classList.remove('perched'); el.classList.remove('perched'); }, 1900);
      }
      clearReveal2(); done && done();
    }
    function clearReveal2() { world.classList.remove('ds-reveal'); if (lines) { const L = lines; setTimeout(() => L.forEach(l => l.el.remove()), 700); lines.forEach(l => { l.el.style.transition = 'opacity .5s'; l.el.style.opacity = '0'; }); lines = null; } }

    function showNext(label, fn) { nextBtn.textContent = label; nextBtn.onclick = fn; nextWrap.hidden = false; nextBtn.focus(); }
    function hideNext() { nextWrap.hidden = true; }

    function finale(done) {
      setPhase('finale'); hideNext(); clearReveal(); $('.ds-surface').classList.remove('gone'); dim.classList.remove('on'); sfx.event('surface');
      pcount.textContent = 'SURFACE';
      if (landed) { const l = landed; l.style.transition = 'opacity .6s'; l.style.opacity = '0'; setTimeout(() => l.remove(), 650); landed = null; }
      const from = ep, ms = lowPower ? 1200 : Math.min(9000, Math.max(2500, 3 * Math.max(0, from)));
      let skipped = false, finished = false;
      const fin = () => { if (finished) return; finished = true; host.removeEventListener('click', skip); done && done(); };
      const skip = () => { if (skipped) return; skipped = true; tweens.length = 0; ep = -45; setT(fin, 200); };
      setT(() => host.addEventListener('click', skip), 700);
      tween(ms, ease.out, k => { ep = lerp(from, -45, k); }, () => setT(fin, 700));
    }

    muteBtn.textContent = sfx.muted ? '🔇' : '🔊';
    muteBtn.onclick = e => { e.stopPropagation(); muteBtn.textContent = sfx.toggle() ? '🔇' : '🔊'; };
    host.addEventListener('pointerdown', () => { if (!sfx.muted) { /* unlock audio on first gesture */ } }, { once: true });

    function destroy() {
      destroyed = true; removeEventListener('resize', onResize); timeouts.forEach(clearTimeout); tweens.length = 0;
      document.body.classList.remove('in-stage', 'stage-intro'); host.innerHTML = ''; host.className = ''; host.removeAttribute('data-phase'); host.removeAttribute('style');
    }

    return {
      el: host, dock, input, nextBtn, ui, intro, leaveIntro, descendToRound, startAnswering, stopAnswering, plunge, finale, showNext, hideNext,
      setUrgency, setHot, setTime, showPill, showCorrection, hideCorrection, showReject, hideReject, typeFx, submitFx, rejectFx,
      setDots, setScoreNum, setDepthNum, setMascot, setGold, introInner, destroy, getPhase: () => phase,
      get depth() { return eP; }, sfx
    };
  }
  return { create, sfx };
})();
