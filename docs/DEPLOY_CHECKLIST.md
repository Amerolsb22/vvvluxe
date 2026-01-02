# VVV Luxe - Railway Deployment Checklist

## Pre-Deployment Verification

### 1. Build & Compilation ✓
- [ ] `npm install` completes without errors
- [ ] `npm run build` compiles successfully
- [ ] No TypeScript errors
- [ ] No ESLint blocking errors
- [ ] Standalone output generated in `.next/standalone/`
- [ ] Static assets in `.next/static/`

### 2. Routes & Pages ✓
- [ ] Home page (`/`) loads correctly
- [ ] Shop page (`/shop`) displays all collections with images
- [ ] Product pages (`/products/[slug]`) load
- [ ] Collection pages (`/collections/[slug]`) load
- [ ] Contact page (`/contact`) displays all contact methods
- [ ] Design page (`/design`) configurator works
- [ ] Custom page (`/custom`) loads
- [ ] Gemstones page (`/gemstones`) loads
- [ ] Cart page (`/cart`) functions properly
- [ ] Checkout flows (`/checkout/success`, `/checkout/cancel`)
- [ ] About page (`/about`)
- [ ] Admin config page (`/admin-config`)

### 3. Images & Assets ✓
- [ ] Logo displays in header (`/brand/logo1.jpg`)
- [ ] Favicon appears in browser tab
- [ ] All product images load (`/images/products/*.jpg`)
- [ ] Banner images present (if any)
- [ ] No 404 errors for images in browser console
- [ ] All collection cards show images on Shop page
- [ ] Social media icons render (Instagram, TikTok, WhatsApp)

### 4. Functionality ✓
- [ ] Navigation works across all pages
- [ ] Mobile menu opens/closes correctly
- [ ] Cart functionality:
  - [ ] Add to cart works
  - [ ] Cart count updates
  - [ ] Cart badge displays correct count
  - [ ] No hydration errors
- [ ] Contact form submits (if enabled)
- [ ] WhatsApp link opens correctly
- [ ] Instagram link works: https://instagram.com/vvvluxe
- [ ] TikTok link works: https://www.tiktok.com/@vvv.luxe
- [ ] Email link works: mailto:vvvluxe@outlook.com
- [ ] Stripe checkout integration (test mode)
- [ ] Product configurator (Design page)

### 5. SEO & Meta ✓
- [ ] Page titles are descriptive and unique
- [ ] Meta descriptions present on all pages
- [ ] OpenGraph tags configured
- [ ] Canonical URLs set
- [ ] Sitemap accessible (`/sitemap.xml`)
- [ ] Robots.txt accessible (`/robots.txt`)
- [ ] Structured data (if applicable)

### 6. Performance & Optimization ✓
- [ ] Images use Next.js Image component
- [ ] Lazy loading enabled
- [ ] Static pages pre-rendered
- [ ] Cache headers configured for assets
- [ ] No unnecessary console logs in production
- [ ] Bundle size reasonable

### 7. Security Headers ✓
- [ ] CSP (Content Security Policy) configured
- [ ] X-Frame-Options set
- [ ] X-Content-Type-Options set
- [ ] Referrer-Policy set
- [ ] HTTPS enforced (Railway handles this)

### 8. Environment Variables 🔧

Required ENV vars for Railway:

```env
# Production URL
NEXT_PUBLIC_SITE_URL=https://your-app.railway.app

# Stripe (get from Stripe Dashboard)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Resend Email API (get from Resend Dashboard)
RESEND_API_KEY=re_...

# Contact Info (already hardcoded but can override)
NEXT_PUBLIC_WHATSAPP_NUMBER=971561510897
NEXT_PUBLIC_WHATSAPP_MESSAGE=Hello VVV Luxe, I'm interested in your custom jewelry collection.

# Node Environment (Railway sets this automatically)
NODE_ENV=production
```

### 9. Docker Testing (Local) 🐳

Before deploying to Railway, test Docker build locally:

```bash
# Build the Docker image
docker build -t vvvluxe:latest .

# Run the container
docker run -p 3000:3000 --env-file .env.local vvvluxe:latest

# Test in browser
# Navigate to http://localhost:3000

# Stop container
docker ps
docker stop <container_id>
```

### 10. Lighthouse Audit (Quick Check) 📊

Run Lighthouse in Chrome DevTools on key pages:

- [ ] Home page scores: Performance >80, Accessibility >90, SEO >90
- [ ] Shop page scores similar
- [ ] Mobile performance acceptable
- [ ] No critical accessibility issues

### 11. Browser Testing ✓
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### 12. Railway-Specific Checks 🚂

Before deploying:
- [ ] Railway CLI installed (`npm i -g @railway/cli`)
- [ ] Logged in (`railway login`)
- [ ] Project created (`railway init`)
- [ ] Environment variables set in Railway dashboard
- [ ] Domain configured (if custom domain)
- [ ] Dockerfile present in repo root
- [ ] `.dockerignore` excludes unnecessary files

Deploy command:
```bash
railway up
```

Or use Railway dashboard to deploy from local directory.

### 13. Post-Deployment Verification 🚀

After deploying to Railway:
- [ ] Site loads at Railway URL
- [ ] All routes accessible
- [ ] Images load correctly
- [ ] Forms work (contact, checkout)
- [ ] Stripe webhooks configured with Railway URL
- [ ] Email sending works (Resend)
- [ ] Check Railway logs for errors
- [ ] Monitor Railway metrics

### 14. Rollback Plan 🔄

If deployment fails:
- Railway keeps previous deployments
- Can rollback via Railway dashboard
- Or redeploy previous Docker image
- Check logs: `railway logs`

---

## Quick Start Commands

```bash
# Local development
npm run dev

# Production build test
npm run build
npm run start

# Docker build and run
docker build -t vvvluxe .
docker run -p 3000:3000 vvvluxe

# Railway deploy
railway login
railway link
railway up
```

## Support Contacts

- **Railway Docs**: https://docs.railway.app
- **Next.js Docs**: https://nextjs.org/docs
- **Stripe Docs**: https://stripe.com/docs

---

**Last Updated**: January 2026  
**Version**: 1.0.0  
**Deployment Target**: Railway (Docker)
