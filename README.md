# Dashboard

A single-file personal dashboard (live news, scores, messaging, streaming, learning, stocks, weather, tasks). Everything lives in **`index.html`** — HTML, CSS, and JavaScript. No build step.

## How deployment works

- The live site is served by **GitHub Pages from the `main` branch**.
- **To update the site: commit to `main` and push.** GitHub Pages rebuilds automatically (~1–2 minutes), then your changes are live.
- Live URL: https://wghtkbpxwx-a11y.github.io/Grok-model-/

That's the whole workflow. One branch (`main`), one file (`index.html`).

```bash
# make your edits to index.html, then:
git add index.html
git commit -m "describe your change"
git push origin main
# wait ~1-2 min, hard-refresh the live URL (Ctrl/Cmd+Shift+R)
```

## Notes

- There is no separate `gh-pages` or development branch — `main` is the single source of truth.
- If the live site looks stale after a push, give the Pages build a couple of minutes and do a hard refresh to bypass browser cache.
