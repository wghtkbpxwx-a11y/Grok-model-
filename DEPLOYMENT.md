# Deployment Guide

## For Tesla Browser Support

The dashboard has backend API proxy functions to handle API calls that the Tesla browser blocks. To enable full functionality (news, weather, sports) in the Tesla browser, deploy to **Vercel** (which supports serverless functions).

### Quick Start - Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com)** and sign in with GitHub
2. **Click "Add New..." → "Project"**
3. **Select this repository** (`wghtkbpxwx-a11y/Grok-model-`)
4. **Click "Deploy"** - Vercel will auto-detect the `vercel.json` configuration
5. **Wait for deployment** (usually 1-2 minutes)
6. **Copy your deployment URL** (e.g., `https://grok-model-xyz.vercel.app`)

### Update Tesla Browser Dashboard URL

Once deployed to Vercel, update the Tesla browser to use your new Vercel URL instead of the GitHub Pages URL.

The dashboard will automatically detect it's on Vercel and proxy all API calls through the backend functions.

### What This Does

- **Weather API** → Proxied through `/api/weather`
- **RSS/News Feeds** → Proxied through `/api/feeds`
- **Stocks** → Already works (uses Yahoo Finance direct)

### Alternative: Keep GitHub Pages + No News/Weather

If you prefer to keep using GitHub Pages:
- News, weather, and sports will show "Network unavailable" in the Tesla browser
- Other features (tasks, bookmarks, notes, stocks, settings) will continue to work
- Access from a regular browser for news/weather

---

## Troubleshooting

**Deployment failed?**
- Make sure `api/weather.js` and `api/feeds.js` exist
- Check that `vercel.json` is in the root directory
- Try redeploying from Vercel dashboard

**APIs still not loading?**
- Clear the browser cache (Ctrl+Shift+Del in Tesla browser settings)
- Wait 5 minutes for caches to clear
- Refresh the page

**Still seeing "Loading..."?**
- Check Vercel deployment logs for errors
- Make sure the deployment status is "Ready" (not "Building")
