/* Original SVG creatures (own artwork, not copied) */
window.ART = (function () {
  const eye = (x, y, c = '#fff', p = '#0a1426', r = 6) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/><circle cx="${x + 1.5}" cy="${y}" r="${r * .5}" fill="${p}"/>`;
  function krillBody(o) {
    const b = o.body, bl = o.belly || '#ffc2d6', e = o.eye || '#fff', pu = o.pupil || '#0a1426';
    let seg = '';
    for (let i = 0; i < 5; i++) seg += `<path d="M${46 + i * 14} ${30 + i * 2} q4 16 -2 30" stroke="${o.line || '#00000033'}" stroke-width="2" fill="none"/>`;
    return `<g>
      <path d="M12 52 C12 24 50 14 84 26 C104 34 112 52 98 62 C86 70 70 62 52 62 C30 64 12 66 12 52Z" fill="${b}"/>
      <path d="M22 60 C40 66 62 66 84 66 C94 66 100 62 98 62 C86 70 70 66 52 66 C34 68 22 66 22 60Z" fill="${bl}" opacity=".85"/>
      ${seg}
      <path d="M96 40 l18 -10 l-4 14 l14 4 l-18 8z" fill="${b}" opacity=".95"/>
      <path d="M22 44 q-14 -14 -10 -26" stroke="${b}" stroke-width="3" fill="none"/><path d="M26 40 q-10 -20 -2 -30" stroke="${b}" stroke-width="3" fill="none"/>
      ${[0, 1, 2, 3].map(i => `<path d="M${40 + i * 12} 66 q-3 10 -8 12" stroke="${bl}" stroke-width="3" fill="none"/>`).join('')}
      ${eye(26, 46, e, pu, 8)}
      ${o.decor || ''}
    </g>`;
  }
  function fish(c) { return `<g><path d="M16 50 C34 22 80 22 104 50 C80 78 34 78 16 50Z" fill="${c}"/><path d="M100 50 l24 -20 v40z" fill="${c}"/><path d="M52 30 q14 -14 26 0z" fill="${c}" opacity=".8"/>
    <path d="M44 34 q-6 16 0 32 M58 30 q-6 20 0 40 M72 32 q-5 18 0 36" stroke="#00000033" stroke-width="3" fill="none"/>${eye(34, 46, '#fff', '#0a1426', 7)}<path d="M20 56 q6 4 12 0" stroke="#00000066" stroke-width="2" fill="none"/></g>`; }
  function squid(c) { return `<g><path d="M60 8 C84 16 88 44 78 58 H42 C32 44 36 16 60 8Z" fill="${c}"/><path d="M34 40 l-14 6 l16 8z M86 40 l14 6 l-16 8z" fill="${c}" opacity=".85"/>
    ${[0, 1, 2, 3, 4].map(i => `<path d="M${44 + i * 8} 58 q${i % 2 ? 6 : -6} 10 0 20 q${i % 2 ? -6 : 6} 8 0 14" stroke="${c}" stroke-width="4" fill="none" stroke-linecap="round"/>`).join('')}
    ${eye(50, 44, '#fff', '#0a1426', 7)}${eye(70, 44, '#fff', '#0a1426', 7)}</g>`; }
  function angler(c) { return `<g><path d="M18 62 C18 34 52 30 78 40 C100 48 104 74 82 80 C60 88 18 90 18 62Z" fill="${c}"/>
    <path d="M26 66 q20 12 56 4" stroke="#0a1426" stroke-width="5" fill="none"/>${[0, 1, 2, 3, 4, 5].map(i => `<path d="M${32 + i * 8} ${68 + (i % 2) * 2} l3 -9 l3 9z" fill="#fff"/>`).join('')}
    <path d="M60 36 q-6 -26 20 -26" stroke="${c}" stroke-width="4" fill="none"/><circle cx="82" cy="12" r="8" fill="#ffe08a"/><circle cx="82" cy="12" r="14" fill="#ffe08a" opacity=".25"/>
    ${eye(44, 50, '#fff', '#0a1426', 7)}<path d="M96 60 l18 -10 v30z" fill="${c}"/></g>`; }
  const MASCOT = {
    krill: () => krillBody({ body: '#ff5d8f', belly: '#ffc2d6' }),
    schooler: () => fish('#4de3ff'),
    rare: () => squid('#ff5252'),
    deepcut: () => angler('#9d7bff'),
    'evil-krill': () => krillBody({ body: '#f2f4fa', belly: '#d9deea', eye: '#ff303b', pupil: '#300', decor: '<path d="M22 36 l-6 -14 l12 8z M36 30 l-2 -16 l10 12z" fill="#ff303b"/>' }),
    hackmanite: () => krillBody({ body: '#dfefee', belly: '#bfd9d8', line: '#7fb', decor: '<path d="M40 30 l16 -4 l10 14 l-18 8z M70 28 l16 6 l-8 14 l-14 -4z" fill="#ffffff66" stroke="#fff" stroke-width="1.5"/>' }),
    'fossil-krill': () => krillBody({ body: '#e8cfa4', belly: '#cdb283', line: '#8a6f3d', eye: '#2b2113', pupil: '#e8cfa4', decor: '<path d="M30 56 h60 M34 50 l56 0" stroke="#8a6f3d" stroke-width="2" stroke-dasharray="3 5"/>' }),
    'mantis-shrimp': () => krillBody({ body: '#ed9359', belly: '#f7c59f', line: '#333', decor: '<path d="M12 62 l-10 -6 l6 -8 l14 6z M16 68 l-12 2 l2 -10 l14 0z" fill="#38c6b8"/><path d="M50 22 v40 M70 24 v38 M90 32 v28" stroke="#2c2c2c" stroke-width="5" opacity=".55"/>' }),
    leviathan: () => krillBody({ body: '#2fa58a', belly: '#9ee0c9', eye: '#b4f542', pupil: '#0a1426', decor: '<path d="M44 20 l4 -12 l6 12z M62 20 l5 -14 l6 14z M80 24 l6 -12 l6 14z" fill="#b4f542"/>' })
  };
  function mascot(id, gold) {
    const f = MASCOT[id] || MASCOT.krill;
    const filt = gold ? '<filter id="g"><feColorMatrix type="matrix" values="1.2 .5 0 0 .15  .8 .6 0 0 .1  0 0 .1 0 0  0 0 0 1 0"/></filter>' : '';
    return `<svg viewBox="0 0 130 100" xmlns="http://www.w3.org/2000/svg" aria-label="${id}">${filt}<g ${gold ? 'filter="url(#g)"' : ''}>${f()}</g></svg>`;
  }
  function puffer(scale) {
    return `<svg viewBox="0 0 200 200" class="puffer"><g transform="translate(100 104) scale(${scale})">
      ${Array.from({ length: 14 }, (_, i) => { const a = i / 14 * Math.PI * 2; return `<path d="M${Math.cos(a) * 56} ${Math.sin(a) * 56} l${Math.cos(a) * 18} ${Math.sin(a) * 18}" stroke="#ffd166" stroke-width="5" stroke-linecap="round"/>`; }).join('')}
      <circle r="58" fill="#ffd166"/><ellipse cy="14" rx="40" ry="34" fill="#fff3c4"/><path d="M52 6 l34 -18 v44z" fill="#ff9f43"/>
      <circle cx="-20" cy="-14" r="13" fill="#fff"/><circle cx="-17" cy="-14" r="6.5" fill="#0a1426"/><circle cx="14" cy="-14" r="13" fill="#fff"/><circle cx="17" cy="-14" r="6.5" fill="#0a1426"/>
      <ellipse cx="-3" cy="24" rx="9" ry="6" fill="#ff5d8f"/></g></svg>`;
  }
  const BUDDIES = [
    { id: 'krill', name: 'The Krill', streak: 0, blub: 'blub!', color: '#ff5d8f', poke: 'roll', pokeMs: 950 },
    { id: 'schooler', name: 'Schooler', streak: 5, blub: 'glub!', color: '#4de3ff', poke: 'dart', pokeMs: 900 },
    { id: 'rare', name: 'Rare Squid', streak: 14, blub: 'blorp!', color: '#ff5252', poke: 'jet', pokeMs: 1050 },
    { id: 'deepcut', name: 'Deep Cut Angler', streak: 30, blub: 'chomp!', color: '#9d7bff', poke: 'chomp', pokeMs: 950 },
    { id: 'evil-krill', name: 'Evil Krill', streak: 45, blub: 'mwahaha!', color: '#ff303b', poke: 'roll', pokeMs: 950 },
    { id: 'hackmanite', name: 'Hackmanite', streak: 60, blub: 'glimmer!', color: '#dfefee', poke: 'roll', pokeMs: 950 },
    { id: 'fossil-krill', name: 'Fossil Krill', streak: 75, blub: 'rattle!', color: '#e8cfa4', poke: 'roll', pokeMs: 950 },
    { id: 'mantis-shrimp', name: 'Mantis Shrimp', streak: 100, blub: 'pow!', color: '#ed9359', poke: 'punch', pokeMs: 750 },
    { id: 'leviathan', name: 'Leviathan', streak: 150, blub: 'grrrblub!', color: '#b4f542', poke: 'roll', pokeMs: 950 }
  ];
  const TIER_ART = {
    plankton: () => krillBody({ body: '#8fa3c4', belly: '#c3d0e6' }),
    tooclever: () => krillBody({ body: '#ff9f43', belly: '#ffd2a0', decor: '<path d="M14 30 l10 -22 l10 22z" fill="#ff5d8f"/><circle cx="24" cy="8" r="3" fill="#ffd166"/>' }),
    schooler: () => fish('#4de3ff'), rare: () => squid('#ff5252'), deepcut: () => angler('#9d7bff'),
    krillion: () => krillBody({ body: '#ffd166', belly: '#fff0b8', decor: '<path d="M10 24 l6 -14 l8 10 l8 -12 l6 16z" fill="#ffb000" stroke="#7a5200" stroke-width="1.5"/>' })
  };
  function tier(id) { return `<svg viewBox="0 0 130 100" xmlns="http://www.w3.org/2000/svg" aria-label="${id}">${(TIER_ART[id] || TIER_ART.plankton)()}</svg>`; }
  return { mascot, puffer, BUDDIES, tier };
})();
