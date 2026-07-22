# Security Setup Guide

## Environment Variables Management

### ✅ What's Protected

Your `.gitignore` already protects:
- `.env` — Main environment file (DO NOT USE)
- `.env.local` — Local development (safe, won't be committed)
- `.env.development.local` — Dev environment (safe)
- `.env.test.local` — Test environment (safe)
- `.env.production.local` — Production environment (safe)

### 🔒 Local Development Setup

Use `.env.local` for your local API key:

```
REACT_APP_QUOTES_API_KEY=your_api_key
```

This file:
- ✅ Is ignored by Git
- ✅ Won't be committed to GitHub
- ✅ Won't be exposed publicly
- ✅ Is used by `npm start` locally

### 🚀 Production Setup (Railway)

**Never use .env files in production!**

Instead, use Railway's secure Variables:

1. Go to [railway.app/dashboard](https://railway.app/dashboard)
2. Select your project → Service
3. **Variables** tab → Add:
   ```
   REACT_APP_QUOTES_API_KEY = your_api_key
   ```
4. Railway injects these at build time
5. Never stored in your repository

### 📋 File Structure

```
mood-lexicon/
├── .env              ❌ NEVER USE - tracked by Git (REMOVED)
├── .env.example      📝 Template only - safe to commit
├── .env.local        ✅ Local dev - ignored by Git
├── .gitignore        🔒 Protects sensitive files
└── ...
```

### 🔄 If Secrets Are Exposed Again

1. **Rotate the API key immediately** (you did this ✅)
2. **Remove from Git history**: `git rm --cached .env`
3. **Commit the removal**: `git commit -m "Remove .env from tracking"`
4. **Push to GitHub**: `git push`
5. **Update Railway variables** with new API key

### ⚠️ What NOT to do

- ❌ Never commit `.env` file
- ❌ Never hardcode API keys in source files
- ❌ Never share `.env.local` files
- ❌ Never use production secrets in development

### ✅ Best Practices

1. Always use `.env.local` for local development
2. Use `.env.example` as a template (no real values)
3. Set production variables in Railway dashboard
4. Rotate keys if accidentally exposed
5. Use `.gitignore` to prevent accidents
