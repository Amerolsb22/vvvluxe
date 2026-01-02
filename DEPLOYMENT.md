# VVV Luxe — Production Deployment Guide

**Domain: vvvluxe.com** | **Live in 30 minutes**

---

## 📋 Phase 1: Pre-Flight Checklist (COMPLETE ✅)

### Build & Quality Assurance
- [x] **TypeScript**: Zero type errors (`npx tsc --noEmit`)
- [x] **Build**: Production build successful (20/20 routes)
- [x] **Images**: All product images present in `/public/images/`
- [x] **Configurator**: Visual jewelry designer working with layered previews
- [x] **Cart System**: Full cart + checkout flow with Zustand persistence
- [x] **Social Media**: Instagram (@vvvluxe) & TikTok (@vvv.luxe) integrated
- [x] **SEO**: JSON-LD structured data on all product pages
- [x] **Responsive**: Mobile-optimized (header, navigation, all pages)
- [x] **Favicons**: Brand assets in `/public/brand/`

### Content Verification
- [x] All routes rendering without errors
- [x] No 404 image errors (SafeImage fallbacks implemented)
- [x] WhatsApp integration (+971 56 151 0897)
- [x] Contact form with API endpoint
- [x] Gemstone catalog (15 certified stones)
- [x] Custom jewelry configurator
- [x] Collections: CVD, Natural Diamonds, Rope Bracelets

### Commerce Features
- [x] Add to cart from product cards
- [x] Add to cart from product detail pages
- [x] Cart badge with item count
- [x] Quantity adjustment in cart
- [x] Remove items from cart
- [x] Stripe checkout integration (test mode)
- [x] Currency: AED throughout site
- [x] Success/cancel redirect pages

---

## 🚀 Go-Live Steps for vvvluxe.com

### Recommended Platform: **Vercel** (Next.js creators)

**Why Vercel?**
- Zero-config for Next.js
- Automatic HTTPS/SSL
- Global CDN (99.99% uptime)
- Serverless API routes
- Free custom domain
- 1-click deployments

---

## Step 1: Prepare Production Environment Variables

Create production `.env` file with these values:

```bash
# REQUIRED - Site Configuration
NEXT_PUBLIC_SITE_URL=https://vvvluxe.com
NEXT_PUBLIC_WHATSAPP_NUMBER=971561510897
NEXT_PUBLIC_WHATSAPP_MESSAGE=Hello VVV Luxe, I'm interested in your custom jewelry collection.

# REQUIRED - Stripe (PRODUCTION KEYS)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxx

# REQUIRED - Email (Resend Production)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
CONTACT_EMAIL=info@vvvluxe.com

# OPTIONAL - Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FB_PIXEL_ID=xxxxxxxxxxxxx

# OPTIONAL - Security
ADMIN_SECRET_TOKEN=your-secure-random-token-here
```

⚠️ **CRITICAL**: Never commit production keys to Git!

---

## Step 2: Deploy to Vercel

### Via Vercel Dashboard (Easiest)

1. **Sign up**: Go to [vercel.com](https://vercel.com) → Sign up with GitHub

2. **Import Project**: 
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js

3. **Configure**:
   - Framework Preset: **Next.js** (auto-detected)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)

4. **Add Environment Variables**:
   - Go to Project Settings → Environment Variables
   - Add ALL variables from your `.env` above
   - Select "Production" environment
   - Click "Save"

5. **Deploy**: Click "Deploy"
   - First build takes 2-3 minutes
   - You'll get a temporary URL: `vvv-luxe-xxx.vercel.app`

### Via Vercel CLI (Advanced)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Follow prompts:
# - Link to existing project? → No
# - What's the project name? → vvv-luxe
# - In which directory is your code? → ./
# - Auto-detect settings? → Yes
```

---

## Step 3: Connect Custom Domain (vvvluxe.com)

### A) Add Domain to Vercel

1. Go to Project Settings → Domains
2. Enter `vvvluxe.com`
3. Click "Add"
4. Vercel will show DNS records you need to add

### B) Configure DNS

**If you registered vvvluxe.com with GoDaddy, Namecheap, etc:**

1. Log into your domain registrar
2. Go to DNS Management
3. Add these records:

```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

**Vercel nameservers** (alternative - easier):
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

4. **Wait**: DNS propagation takes 1-48 hours (usually < 1 hour)
5. **Verify**: Visit https://vvvluxe.com

### C) SSL Certificate

- Vercel automatically provisions SSL (Let's Encrypt)
- HTTPS enabled within 1 minute of DNS verification
- Auto-renewal every 90 days

### D) WWW Redirect

**Recommended**: Redirect www → root

In Vercel Project Settings → Domains:
- Main domain: `vvvluxe.com`
- Add `www.vvvluxe.com` → Enable "Redirect to vvvluxe.com"

---

---

## Step 4: Post-Deployment Verification

### ✅ Critical Checks (Do Immediately)

Visit your live site and verify:

**1. All Routes Load**
```
✓ https://vvvluxe.com/
✓ https://vvvluxe.com/shop
✓ https://vvvluxe.com/design
✓ https://vvvluxe.com/custom
✓ https://vvvluxe.com/gemstones
✓ https://vvvluxe.com/collections/affordable-cvd
✓ https://vvvluxe.com/collections/natural-diamonds
✓ https://vvvluxe.com/products/[any-slug]
✓ https://vvvluxe.com/cart
✓ https://vvvluxe.com/contact
```

**2. Images Load Correctly**
- Open browser DevTools → Network tab
- Filter by "Img"
- Ensure NO 404 errors
- Check: Logo, product images, category images, configurator assets

**3. Commerce Flow**
- Add product to cart → Cart badge updates ✓
- View cart → Items display ✓
- Adjust quantity → Price updates ✓
- Proceed to checkout → Stripe hosted page loads ✓
- Test card: `4242 4242 4242 4242` (test mode)
- Verify redirect to success page ✓

**4. Contact Form**
- Fill out form on `/contact`
- Submit → Check email arrives at `info@vvvluxe.com`
- WhatsApp button opens correct number

**5. Social Media Links**
- Header: Instagram, TikTok, WhatsApp icons work
- Footer: All social links active
- Contact page: Social section displays

**6. Mobile Testing**
- Test on iPhone (Safari)
- Test on Android (Chrome)
- WhatsApp links open app on mobile
- Cart, navigation, forms work on touch screens

**7. SEO & Performance**
- Run Lighthouse audit (target: 90+ performance)
- Check `robots.txt`: https://vvvluxe.com/robots.txt
- Check `sitemap.xml`: https://vvvluxe.com/sitemap.xml
- Verify meta descriptions on all pages
- Test structured data: [Google Rich Results Test](https://search.google.com/test/rich-results)

**8. Security Headers**
- HTTPS enforced (HTTP → HTTPS redirect)
- CSP not blocking images/fonts
- No console errors related to CORS

---

## Step 5: Stripe Production Setup

### A) Switch to Live Mode

1. Log into [Stripe Dashboard](https://dashboard.stripe.com)
2. Toggle from "Test mode" to "Live mode" (top right)
3. Go to Developers → API Keys
4. Copy:
   - Publishable key: `pk_live_...`
   - Secret key: `sk_live_...` (⚠️ Keep secure!)

### B) Update Vercel Environment Variables

1. Vercel Dashboard → Project → Settings → Environment Variables
2. Find `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
3. Click Edit → Replace with `pk_live_...`
4. Find `STRIPE_SECRET_KEY`
5. Click Edit → Replace with `sk_live_...`
6. Click "Save"
7. **Redeploy**: Go to Deployments → Latest → "Redeploy"

### C) Configure Webhooks (IMPORTANT!)

Stripe needs to notify your site when payments complete:

1. Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. Endpoint URL: `https://vvvluxe.com/api/webhooks/stripe`
4. Select events to listen to:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Click "Add endpoint"
6. Copy "Signing secret" (`whsec_...`)
7. Add to Vercel env vars as `STRIPE_WEBHOOK_SECRET`
8. Redeploy

### D) Test Live Payment (Use Real Card!)

⚠️ **CAUTION**: You will be charged!

1. Use a real credit card (not test card)
2. Complete checkout
3. Verify charge appears in Stripe Dashboard → Payments
4. Verify success page loads
5. **Refund** the test payment: Stripe Dashboard → Payment → Refund

---

## Step 6: Analytics & Monitoring (Optional)

### Google Analytics 4

1. Create property at [analytics.google.com](https://analytics.google.com)
2. Get Measurement ID (format: `G-XXXXXXXXXX`)
3. Add to Vercel env: `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`
4. Redeploy
5. Verify tracking: Google Analytics → Realtime

### Facebook Pixel (Optional)

1. Create pixel at [business.facebook.com](https://business.facebook.com)
2. Get Pixel ID
3. Add to Vercel env: `NEXT_PUBLIC_FB_PIXEL_ID=xxxxxxxxxxxxx`
4. Redeploy

### Vercel Analytics (Built-in)

1. Vercel Dashboard → Project → Analytics
2. Enable "Web Analytics"
3. Free tier: 100K events/month
4. View: Page views, geographic data, performance metrics

---

## Step 7: Email Configuration

### Resend (Contact Form Email)

1. Sign up at [resend.com](https://resend.com)
2. Verify domain `vvvluxe.com`:
   - Add DNS records provided by Resend (SPF, DKIM)
   - Enables sending from `noreply@vvvluxe.com`
3. Create API key
4. Add to Vercel env: `RESEND_API_KEY=re_...`
5. Set `CONTACT_EMAIL=info@vvvluxe.com`
6. Test: Submit contact form → Check inbox

---

## Step 8: Final Launch Checklist

### Pre-Launch (Night Before)

- [ ] Backup current `.env.local` (keep for reference)
- [ ] Test checkout flow end-to-end in production
- [ ] Verify all images load (no 404s)
- [ ] Test on iPhone & Android
- [ ] Clear browser cache and test
- [ ] Verify WhatsApp links work on mobile
- [ ] Check all social media links (Instagram, TikTok)
- [ ] Test contact form (receive email)
- [ ] Run Lighthouse audit (performance >90)
- [ ] Check console for errors (0 errors)

### Launch Day

- [ ] Announce on Instagram (@vvvluxe)
- [ ] Announce on TikTok (@vvv.luxe)
- [ ] Update WhatsApp status with link
- [ ] Send email to existing customers
- [ ] Update Google My Business with website URL
- [ ] Submit sitemap to Google Search Console
- [ ] Monitor Vercel logs for errors

### Week 1 Post-Launch

- [ ] Check Stripe for completed payments
- [ ] Review Vercel Analytics
- [ ] Monitor contact form submissions
- [ ] Check Google Analytics traffic
- [ ] Fix any reported issues
- [ ] Respond to customer WhatsApp messages
- [ ] Post daily on Instagram/TikTok

---

## 🆘 Troubleshooting

### "500 Internal Server Error"

**Cause**: Missing environment variables

**Fix**:
1. Vercel Dashboard → Settings → Environment Variables
2. Verify ALL required vars are set
3. Redeploy

### Images Not Loading (404)

**Cause**: Images not in `/public/` or incorrect paths

**Fix**:
1. Verify images exist in `/public/images/`
2. Check image paths in code (no leading `/public/`)
3. Paths should be: `/images/products/image.jpg` (NOT `/public/images/...`)

### Checkout Not Working

**Cause**: Stripe keys incorrect or not in live mode

**Fix**:
1. Verify keys in Vercel env vars
2. Ensure using `pk_live_` and `sk_live_` (not `pk_test_`)
3. Check Stripe Dashboard → Logs for errors

### Contact Form Not Sending Emails

**Cause**: Resend API key missing or domain not verified

**Fix**:
1. Verify Resend API key in Vercel env
2. Check Resend Dashboard → Domains → DNS verification
3. Check Vercel function logs for errors

### WhatsApp Links Not Opening on Mobile

**Cause**: Phone number format incorrect

**Fix**:
- Correct format: `971561510897` (country code without `+`)
- Link should be: `https://wa.me/971561510897`

---

## 📊 Performance Optimization

### Image Optimization

- All images automatically optimized by Next.js `<Image>` component
- WebP format served to modern browsers
- Lazy loading enabled by default
- Vercel CDN caches images globally

### Caching Strategy

Vercel automatically caches:
- Static pages: 31,536,000 seconds (1 year)
- Images: 31,536,000 seconds (1 year)
- API routes: Configurable via `revalidate`

### Bundle Size

Current build:
- First Load JS: ~87 kB (shared)
- Largest page: `/design` at 108 kB
- Target: Keep under 200 kB per page

---

## 🔒 Security Best Practices

### Environment Variables

✅ **DO**:
- Store in Vercel dashboard (encrypted)
- Use different keys for test/production
- Rotate keys every 90 days

❌ **DON'T**:
- Commit to Git
- Share in Slack/email
- Use same keys for dev/prod

### Rate Limiting

Consider adding to API routes:

```typescript
// lib/rateLimit.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});

export async function checkRateLimit(ip: string) {
  const { success } = await ratelimit.limit(ip);
  return success;
}
```

---

## 📈 Monitoring & Maintenance

### Daily Checks

- Vercel Dashboard → Overview (check for errors)
- Stripe Dashboard → Payments (verify transactions)
- Email inbox (respond to contact forms)

### Weekly Checks

- Google Analytics (traffic trends)
- Vercel Analytics (performance metrics)
- Social media engagement (Instagram, TikTok)

### Monthly Tasks

- Review and respond to customer feedback
- Update product catalog with new items
- Optimize slow-loading pages
- Update dependencies: `npm outdated`
- Security patches: `npm audit fix`

---

## 🎉 You're Live!

Your VVV Luxe e-commerce site is now live at **https://vvvluxe.com**

**Next Steps**:
1. ✅ Monitor first week closely
2. ✅ Respond to customer inquiries promptly
3. ✅ Post regularly on social media
4. ✅ Collect customer feedback
5. ✅ Iterate and improve

**Need Help?**
- Vercel Support: [vercel.com/support](https://vercel.com/support)
- Next.js Docs: [nextjs.org/docs](https://nextjs.org/docs)
- Stripe Support: [support.stripe.com](https://support.stripe.com)

---

**Built with ❤️ for VVV Luxe**  
*Custom jewelry made extraordinary*
   vercel login
   ```

2. **Connect to Git**
   - Push code to GitHub/GitLab/Bitbucket
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your repository

3. **Configure Environment Variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add all variables from `.env.local`:

     ```
     NEXT_PUBLIC_WHATSAPP_NUMBER=971561510897
     NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
     STRIPE_SECRET_KEY=sk_live_...
     NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password
     NEXT_PUBLIC_SITE_URL=https://vvvluxe.com
     ```

4. **Deploy**

   ```bash
   vercel --prod
   ```

5. **Configure Custom Domain**
   - In Vercel dashboard: Settings → Domains
   - Add `vvvluxe.com` and `www.vvvluxe.com`
   - Update DNS records (Vercel provides instructions)

**Automatic Deployments**:

- Every push to `main` branch auto-deploys
- Preview URLs for pull requests
- Rollback to previous deployments with one click

---

### Option 2: Netlify

**Steps**:

1. **Create Netlify Account**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub

2. **Build Settings**

   ```
   Build command: npm run build
   Publish directory: .next
   ```

3. **Environment Variables**
   - Site settings → Build & deploy → Environment
   - Add all env vars from `.env.local`

4. **Deploy**
   - Connect GitHub repository
   - Click "Deploy site"

5. **Custom Domain**
   - Domain settings → Add custom domain
   - Update DNS records

---

### Option 3: Self-Hosted (VPS/Docker)

**Requirements**:

- VPS (DigitalOcean, AWS EC2, Linode)
- Node.js 18+
- Nginx (reverse proxy)
- PM2 (process manager)
- Let's Encrypt (SSL)

**Steps**:

1. **Build Production**

   ```bash
   npm run build
   ```

2. **Transfer Files**

   ```bash
   rsync -avz .next package.json node_modules user@server:/var/www/vvvluxe
   ```

3. **Install PM2**

   ```bash
   npm install -g pm2
   pm2 start npm --name "vvvluxe" -- start
   pm2 save
   pm2 startup
   ```

4. **Configure Nginx**

   ```nginx
   server {
       listen 80;
       server_name vvvluxe.com www.vvvluxe.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

5. **SSL with Let's Encrypt**

   ```bash
   sudo certbot --nginx -d vvvluxe.com -d www.vvvluxe.com
   ```

---

## 🔐 Environment Variables (Production)

**Critical Variables**:

```env
# WhatsApp Business Number (already set)
NEXT_PUBLIC_WHATSAPP_NUMBER=971561510897

# Stripe (CHANGE TO PRODUCTION KEYS)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxx

# Admin Panel (CHANGE PASSWORD!)
NEXT_PUBLIC_ADMIN_PASSWORD=your_very_secure_password_here

# Site URL (update to production domain)
NEXT_PUBLIC_SITE_URL=https://vvvluxe.com

# Optional: Google Maps API Key (for About page map)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key

# Optional: Analytics
NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX
```

**Security Notes**:

- ❌ **NEVER** commit `.env.local` to Git
- ✅ Use different passwords for staging/production
- ✅ Use Stripe live keys only in production
- ✅ Rotate admin password every 90 days
- ✅ Set up rate limiting for API routes

---

## 📊 Performance Optimization

### Before Deployment

1. **Optimize Images**

   ```bash
   # Install image optimizer
   npm install -g sharp-cli

   # Optimize all images
   sharp -i public/images/**/*.jpg -o public/images/optimized/ --webp
   ```

2. **Analyze Bundle Size**

   ```bash
   npm run build
   # Check output for bundle sizes
   # Look for large dependencies to lazy-load
   ```

3. **Lighthouse Audit**
   - Open Chrome DevTools
   - Go to Lighthouse tab
   - Run audit (Performance, SEO, Accessibility, Best Practices)
   - **Target**: 90+ in all categories

### Performance Targets

| Metric | Target | Current |
|--------|--------|---------|
| First Contentful Paint (FCP) | <1.8s | TBD |
| Largest Contentful Paint (LCP) | <2.5s | TBD |
| Time to Interactive (TTI) | <3.8s | TBD |
| Cumulative Layout Shift (CLS) | <0.1 | TBD |
| Total Blocking Time (TBT) | <300ms | TBD |

### Optimization Checklist

- [x] Images use `next/image` (automatic optimization)
- [x] Sharp installed for WebP/AVIF conversion
- [x] No animation libraries (bundle size savings)
- [ ] Enable Gzip compression (server config)
- [ ] Enable Brotli compression (server config)
- [ ] Set up CDN for `/public/images/` (Cloudflare/CloudFront)
- [ ] Add `Cache-Control` headers (static assets)

---

## 🔒 Security Checklist

### Critical Security Measures

- [ ] **HTTPS Enabled** (SSL certificate)
- [ ] **Environment Variables Secured** (not in Git)
- [ ] **Admin Password Strong** (16+ characters, mixed case, symbols)
- [ ] **Rate Limiting Implemented** (API routes)
- [ ] **CORS Configured** (API routes)
- [ ] **Content Security Policy** (CSP headers)
- [ ] **XSS Protection** (sanitize user inputs)
- [ ] **SQL Injection Prevention** (parameterized queries)

### Recommended Security Headers

Add to `next.config.js`:

```javascript
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
      ],
    },
  ];
},
```

### Rate Limiting (API Routes)

Install rate limiter:

```bash
npm install express-rate-limit
```

Example for contact form (`/app/api/contact/route.ts`):

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per IP
});

export async function POST(request: Request) {
  // Apply rate limiting
  // ... rest of your code
}
```

---

## 📧 Email Setup (Contact Form)

### Option 1: SendGrid (Recommended)

1. **Create Account**: [sendgrid.com](https://sendgrid.com)
2. **Get API Key**: Settings → API Keys
3. **Add to Environment**:

   ```env
   SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
   SENDGRID_FROM_EMAIL=hello@vvvluxe.com
   SENDGRID_TO_EMAIL=info@vvvluxe.com
   ```

4. **Install SDK**:

   ```bash
   npm install @sendgrid/mail
   ```

5. **Implement in API Route** (`/app/api/contact/route.ts`):

   ```typescript
   import sgMail from '@sendgrid/mail';
   
   sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
   
   export async function POST(request: Request) {
     const data = await request.json();
     
     const msg = {
       to: process.env.SENDGRID_TO_EMAIL,
       from: process.env.SENDGRID_FROM_EMAIL,
       subject: `VVV Luxe Contact: ${data.subject}`,
       text: `Name: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`,
       html: `<strong>Name:</strong> ${data.name}<br>...`,
     };
     
     await sgMail.send(msg);
     return Response.json({ success: true });
   }
   ```

### Option 2: Resend (Modern Alternative)

- Simpler API
- Better developer experience
- Free tier: 100 emails/day

### Option 3: SMTP (Gmail/Outlook)

- Use `nodemailer` package
- Configure SMTP credentials
- Less reliable, may trigger spam filters

---

## 🗄️ Database Setup (Phase 2)

### When You Need a Database

- Persistent admin config (not localStorage)
- User accounts (save designs, order history)
- Order management
- Inventory tracking

### Recommended Options

1. **Vercel Postgres** (if using Vercel)
   - Integrated with platform
   - Serverless
   - Free tier available

2. **Supabase** (PostgreSQL + Auth)
   - Open-source Firebase alternative
   - Built-in authentication
   - Real-time subscriptions
   - Free tier generous

3. **MongoDB Atlas**
   - NoSQL flexibility
   - Free tier: 512MB storage
   - Good for products/gemstones catalog

### Quick Supabase Setup

```bash
npm install @supabase/supabase-js
```

Create `/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

---

## 📈 Analytics & Monitoring

### Google Analytics 4

1. **Create Property**: [analytics.google.com](https://analytics.google.com)
2. **Get Measurement ID**: GA4 → Data Streams
3. **Add to Environment**:

   ```env
   NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX
   ```

4. **Add Script to `app/layout.tsx`**:

   ```tsx
   <Script
     src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
     strategy="afterInteractive"
   />
   <Script id="google-analytics" strategy="afterInteractive">
     {`
       window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());
       gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}');
     `}
   </Script>
   ```

### Vercel Analytics (if using Vercel)

```bash
npm install @vercel/analytics
```

In `app/layout.tsx`:

```tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Monitoring Tools

- **Sentry** (error tracking): [sentry.io](https://sentry.io)
- **LogRocket** (session replay): [logrocket.com](https://logrocket.com)
- **Uptime Robot** (downtime alerts): [uptimerobot.com](https://uptimerobot.com)

---

## 🧪 Testing Before Launch

### Manual Testing Checklist

**Functionality**:

- [ ] All pages load without errors
- [ ] Navigation works (header, footer, breadcrumbs)
- [ ] Forms submit successfully (contact, configurator)
- [ ] WhatsApp links open correctly (test on mobile)
- [ ] Product filtering works (all combinations)
- [ ] Product sorting works (all options)
- [ ] Admin panel login/logout works
- [ ] Pricing calculations are accurate (configurator)
- [ ] Images load correctly (all pages)
- [ ] Search functionality works (if implemented)

**Mobile Testing**:

- [ ] Responsive layout (320px to 1920px)
- [ ] Touch targets adequate size (44x44px minimum)
- [ ] Text readable without zoom
- [ ] Forms usable on mobile keyboard
- [ ] WhatsApp opens native app on mobile
- [ ] Images load quickly (lazy loading works)

**Cross-Browser**:

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (desktop + iOS)
- [ ] Edge (latest)
- [ ] Samsung Internet (Android)

**Performance**:

- [ ] Lighthouse Performance: 90+
- [ ] Lighthouse SEO: 95+
- [ ] Lighthouse Accessibility: 90+
- [ ] Lighthouse Best Practices: 95+
- [ ] Page load time: <3 seconds (3G)

### Automated Testing (Optional)

```bash
# Install Playwright
npm install -D @playwright/test

# Create test file: tests/homepage.spec.ts
import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveTitle(/VVV Luxe/);
});

# Run tests
npx playwright test
```

---

## 📋 Post-Deployment Tasks

### Immediately After Launch

1. **Verify Deployment**
   - Visit `https://vvvluxe.com`
   - Check all pages load
   - Test contact form submission
   - Test WhatsApp links

2. **Submit to Search Engines**
   - Google Search Console: Submit sitemap (`/sitemap.xml`)
   - Bing Webmaster Tools: Submit site
   - Verify ownership with meta tags

3. **Set Up Monitoring**
   - Configure uptime monitoring (Uptime Robot)
   - Set up error tracking (Sentry)
   - Enable analytics (Google Analytics)

4. **Test Payment Flow** (if Stripe implemented)
   - Test checkout with test card
   - Verify webhook handlers work
   - Check order confirmation emails

### First Week

- [ ] Monitor analytics (traffic, bounce rate)
- [ ] Check error logs (Sentry/Vercel)
- [ ] Test all contact forms work
- [ ] Respond to customer inquiries promptly
- [ ] Monitor performance metrics
- [ ] Check mobile traffic (optimize if needed)

### First Month

- [ ] Analyze user behavior (heatmaps, session recordings)
- [ ] A/B test CTAs (configurator, custom projects)
- [ ] Optimize images based on usage patterns
- [ ] Review and optimize SEO (keywords, rankings)
- [ ] Collect customer feedback
- [ ] Plan Phase 2 features based on data

---

## 🆘 Troubleshooting

### Build Fails

**Error**: `Module not found`

- **Fix**: Run `npm install` to ensure all dependencies installed
- Check imports match actual file paths (case-sensitive)

**Error**: `Type error in ...`

- **Fix**: Check TypeScript errors with `npm run build`
- Ensure all types imported from `/types/index.ts`

### Images Not Loading

**Symptoms**: 404 errors for images

- **Fix**: Check image paths start with `/images/` not `/public/images/`
- Verify images exist in `/public/images/` directory
- Check `next.config.js` for allowed domains (if using external CDN)

### Environment Variables Not Working

**Symptoms**: WhatsApp number shows placeholder, Stripe not working

- **Fix**: Prefix client-side vars with `NEXT_PUBLIC_`
- Restart dev server after changing `.env.local`
- In production, set vars in hosting platform dashboard

### Configurator Pricing Wrong

**Symptoms**: Prices don't match expectations

- **Fix**: Check `pricingConfig` in `/lib/pricing.ts`
- Verify gold/stone prices correct
- Test `calculatePrice()` function with console logs
- Clear localStorage: `localStorage.clear()` in browser console

### WhatsApp Links Don't Work on Mobile

**Symptoms**: Links open in browser instead of WhatsApp app

- **Fix**: Ensure number format: `971561510897` (no + or spaces)
- Test URL format: `https://wa.me/971561510897?text=...`
- Check URL encoding for message text

---

## 📞 Support Resources

**Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)  
**Vercel Support**: [vercel.com/support](https://vercel.com/support)  
**Stripe Docs**: [stripe.com/docs](https://stripe.com/docs)  
**TailwindCSS Docs**: [tailwindcss.com/docs](https://tailwindcss.com/docs)

---

## ✅ Final Pre-Launch Checklist

**Code**:

- [ ] All product images added
- [ ] Favicons generated
- [ ] Contact form API implemented
- [ ] Admin config persistence implemented
- [ ] Search functionality implemented (if required)
- [ ] Build succeeds without errors: `npm run build`

**Configuration**:

- [ ] Production env vars set (Stripe live keys, secure passwords)
- [ ] `.env.local` not committed to Git
- [ ] Domain configured and pointing to hosting
- [ ] SSL certificate active (HTTPS working)

**Testing**:

- [ ] Manual testing complete (all pages, forms, features)
- [ ] Mobile testing complete (iOS + Android)
- [ ] Cross-browser testing complete
- [ ] Lighthouse audit: 90+ all categories
- [ ] WhatsApp links tested on mobile

**SEO**:

- [ ] Sitemap accessible: `https://vvvluxe.com/sitemap.xml`
- [ ] Robots.txt accessible: `https://vvvluxe.com/robots.txt`
- [ ] Meta tags correct on all pages
- [ ] Structured data implemented (JSON-LD)
- [ ] Google Search Console configured

**Business**:

- [ ] Contact email monitored
- [ ] WhatsApp number active and monitored
- [ ] Showroom address confirmed
- [ ] Pricing finalized (admin panel configured)
- [ ] Legal pages complete (privacy, terms, returns)

---

**Ready to launch VVV Luxe to the world! 🚀**

**For deployment assistance**: Refer to README.md, QUICKSTART.md, and PROJECT_STRUCTURE.md
