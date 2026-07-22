# Railway Deployment Configuration Guide

## Environment Variables Setup

### Railway Dashboard

1. Go to [railway.app/dashboard](https://railway.app/dashboard)
2. Click on your "mood-lexicon" project
3. Select the service
4. Go to **Variables** tab
5. Add the following environment variable:

```env
REACT_APP_QUOTES_API_KEY = your_api_key_from_api_ninjas
```

**Important**: Variable names starting with `REACT_APP_` are automatically embedded into the React build and available at runtime.

### Getting API Ninja Key

1. Sign up at [api-ninjas.com](https://api-ninjas.com)
2. Go to your API keys section
3. Copy your API key
4. Paste in Railway dashboard

## Quote Categories

The Quote component now supports these categories:

- inspirational
- life
- truth
- success
- faith
- love
- courage
- happiness

Quotes are selected based on the current mood:

- `calm` → peace quotes
- `peaceful` → peace quotes
- `energetic` → success quotes
- `uplifted` → happiness quotes
- `abundance` → success quotes

## Deployment Process

1. Push changes to GitHub `main` branch
2. GitHub Actions trigger Railway deployment
3. Railway builds: `npm run build`
4. Railway serves: `npm run serve` (Express server)
5. Static files + SPA routing handled by server.js

## Verify Deployment

- App should load at your Railway URL
- Check the Railway logs for any errors
- Verify quotes load with appropriate categories
- If quotes don't appear, check REACT_APP_QUOTES_API_KEY in Railway Variables

