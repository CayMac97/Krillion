# Krillion (fan-made clone)

A static, backend-free re-creation of the daily rarity game **Krillion** — free, no ads, no paid plans.

Open `index.html` (or run `python3 -m http.server`) — no build step.

## Features
- **Daily dive** — 7 prompts/day (same for everyone, seeded by the ET date), 25 s each, six rarity tiers
  (Plankton 10 · Too Clever 15 · Schooler 30 · Rare 60 · Deep Cut 85 · One in a Krillion 100), max 700, depth = score × 10 m
- Streaks (midnight ET reset), 9 unlockable **dive buddies** (5/14/30/45/60/75/100/150-day streaks)
- **Unlimited** endless dives, **Archive** replays (no streak), **Themed packs** (Words & Language, Movies, Sports, Geography — 30 chapters each; Music "coming soon")
- **Puffer Party** — hot-seat multiplayer with bots, hidden 10–30 s shared fuse (resets to 8 s if < 8 s left)
- **My Krillion** stats/logbook, **Friends** (share-code leaderboard), **Settings** (colorblind, low power, corrections, …), **FAQ**
- Fuzzy answer matching with aliases ("answer corrections")

## Notes
All answer sets (`js/data*.js`) and artwork (`js/art.js`) are original starter content; progress is stored in `localStorage`.
