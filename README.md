# Dashboard

A single-file personal dashboard (live news, scores, messaging, streaming, learning, stocks, weather, tasks). Everything lives in **`index.html`** — HTML, CSS, and JavaScript. No build step.

## 🚀 One-Click Deploy for Tesla Browser

To get **news, weather, and sports working in your Tesla**, click below:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/wghtkbpxwx-a11y/Grok-model-&project-name=grok-model&repository-name=Grok-model-)

**How it works:**
1. Click the button above
2. Sign in with GitHub (one-time)
3. Click "Deploy" 
4. Wait 1-2 minutes
5. Copy your Vercel URL (e.g., `https://grok-model-xyz.vercel.app`)
6. Use that URL in your Tesla browser
7. Done! News, weather, sports now load. ✓

The Vercel deployment includes backend API proxies so the Tesla browser can access external APIs.

---

## 📱 GitHub Pages (No Deployment)

Want to use the simple GitHub Pages version?
- **Live URL:** https://wghtkbpxwx-a11y.github.io/Grok-model-/
- **Setup:** Just start using it, no deployment needed
- **Limitation:** News, weather, sports won't load in Tesla browser (they show "Network unavailable")
- **Everything else works:** Tasks, bookmarks, notes, stocks, settings

---

## How deployment works

### GitHub Pages (Current)
- The live site is served by **GitHub Pages from the `main` branch**.
- **To update the site: commit to `main` and push.** GitHub Pages rebuilds automatically (~1–2 minutes), then your changes are live.

### Vercel (Optional - for Tesla)
- Deploy once with the button above
- Auto-deploys whenever you push to `main`
- Gets you full functionality in Tesla browser

```bash
# To update after deploying:
git add index.html
git commit -m "describe your change"
git push origin main
# Changes deploy to both GitHub Pages and Vercel automatically
```

## Notes

- Single source of truth: `main` branch
- No build step — everything is vanilla HTML/CSS/JavaScript
- Works offline-first with localStorage caching
- Responsive design works on all devices

