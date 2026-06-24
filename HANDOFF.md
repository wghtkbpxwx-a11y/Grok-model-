# Dashboard — Handoff & Roadmap

A single-file personal/Tesla dashboard. Everything is in **`index.html`** (HTML + CSS + JS, no build step).

## Architecture
- One file: `index.html` (~1500 lines). No framework, no bundler.
- State persists in `localStorage` (separate keys: `dash_settings_v1`, `bookmarks_v1`, `tasks_v1`, `stocks_watchlist_v1`, `quick_links_v1`, `notes_v4`, `dock_order_v1`, plus `wx_*`/`stk_*`/`n_*` fetch caches).
- Data via public APIs: Open-Meteo (weather), Yahoo Finance (stocks), RSS2JSON (news/sports feeds). All routed through `fetchCached(url, key, ttlMin)` (localStorage TTL cache + concurrent-request de-dupe).

## Deployment (IMPORTANT — avoids the black-screen trap)
- GitHub Pages serves the **`main` branch only**. There is no separate `gh-pages` deploy.
- Workflow: edit `index.html` → `git commit` → `git push origin main` → live in ~1–2 min.
- Live URL: https://wghtkbpxwx-a11y.github.io/Grok-model-/
- After a push, the GitHub "pages build and deployment" Action runs (~3–7 min incl. CDN). Hard-refresh (Cmd/Ctrl+Shift+R) to bypass browser cache.

## Gotchas learned the hard way
1. **Pages serves `main`.** A truncated stub once sat on `main` and caused a fully black site while fixes went to the wrong branch. Always verify the LIVE url, not just local.
2. **Testing with jsdom: stub `fetch`.** jsdom has no `fetch`, so top-level `fetchCached()` calls throw `ReferenceError` and silently halt the rest of the script — making later code look broken when it's fine. Always inject a `fetch` stub via `beforeParse` so the whole script runs. `node --check` only catches syntax, not runtime/visual bugs.
3. **Dock submenu must live OUTSIDE `#dock`.** `#dock` has `overflow-x:auto` (clips both axes) plus `transform`+`backdrop-filter` (captures `position:fixed` children). The submenu and the external-link modal are siblings of `#dock` for this reason.
4. **Single-window browsers (Tesla) ignore `target="_blank"`** — there are no tabs, so external links navigated away. Fixed with an in-app sandboxed `#ext-modal` overlay (sandbox omits `allow-top-navigation` so framed sites can't hijack the page).

## Product decisions (carry forward)
- **Keep** the calculator (enlarged, not removed).
- **Keep** the Fantasy Leagues links.
- **Keep** the Tesla T + "TESLA" wordmark as-is.
- **Skip** Comet's command/search-bar idea — over-engineering for a driving dashboard.

## Done
- Live site working; navigation modal (links never lose the dashboard); Auto theme (instant local-time resolve + weather refine); clean line-icon set + Tesla logo lockup; `saveLS()` helper + deduped fetches + debug logs removed.
- **Tier 1 UX:** bigger tap targets (dock, news pills, stock controls, calculator keys), clean 2-line headline clamp, clickable weather widget, default XEQT.TO stock, removed stray utility copy.

## Remaining roadmap (prioritized)
**Tier 2 — visual redesign** (the "minimal / darker / larger / calmer / card-based" brief):
- Recompose header hierarchy (brand left; time/weather right; stocks as a compact chip row).
- Card-ify each section: consistent padding/radius/whitespace/vertical rhythm.
- Typography pass: fewer text styles, larger sizes, all-caps only for tiny labels.
- Restrained palette: charcoal bg, off-white text, muted dividers, ONE accent color.
- Pill/icon buttons for actions ("Save Note", "Add"); subtle separators between modules.

**Tier 3 — structural:**
- Restructure the Live screen into glanceable "dashboard essentials": weather+time, top stocks, today's top 3 scores, quick links; demote news to a secondary card/tab.
- Sports: replace the wall-of-text feed with a compact scores section grouped by sport.
- Fantasy Leagues: wire to real Sleeper/Yahoo standings/matchups, or simplify (keep the links).

## Verification recipe
```bash
# syntax
awk '/<script>/{f=1;next}/<\/script>/{f=0}f' index.html > /tmp/f.js && node --check /tmp/f.js
# runtime/behavior: load in jsdom with a fetch stub (see test scripts used in the build session)
```
