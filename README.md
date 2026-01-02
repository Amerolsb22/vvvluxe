# VVV Luxe — Luxury Jewelry E-Commerce Platform

**Quiet Luxury. Minimal Design. Functional Excellence.**

A production-ready Next.js 14 e-commerce platform for VVV Luxe jewelry brand, featuring a fully functional Design Your Own configurator, three curated product collections, and seamless WhatsApp integration.

---

## 🌟 Features

- **Design Your Own Jewelry** — Fully functional 8-step configurator with real-time pricing
- **Three Product Lines**:
  - Affordable CVD Silk Rope Collection (minimal gold, vibrant rope colors)
  - Natural Diamond Pieces (ethically sourced, certified)
  - Custom & Personalized Jewelry
- **Certified Gemstones Catalog** — Browse and inquire about loose gemstones
- **Dynamic Filtering & Sorting** — Advanced product listing with live filters
- **WhatsApp Integration** — Direct contact throughout the customer journey
- **Admin Config Panel** — Control pricing variables, gold rates, labor fees
- **Luxury Design System** — Playfair Display serif + Inter sans-serif, custom Tailwind theme
- **Zero Animations** — Instant UI feedback, subtle hover states only
- **SEO Optimized** — Metadata API, OpenGraph, Twitter Cards, structured for JSON-LD

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm/yarn/pnpm
- **Git** for version control

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/vvvluxe.git
cd vvvluxe

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

### Environment Variables

Edit `.env.local`:

```env
# Business Contact
NEXT_PUBLIC_WHATSAPP_NUMBER=971561510897

# Stripe Keys (get from https://dashboard.stripe.com/apikeys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key

# Stripe Webhook Secret (get from https://dashboard.stripe.com/webhooks)
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_signing_secret

# Resend API for contact form emails (get from https://resend.com/api-keys)
RESEND_API_KEY=re_your_resend_api_key

# Contact form email addresses
CONTACT_TO_EMAIL=info@vvvluxe.com
CONTACT_FROM_EMAIL=noreply@vvvluxe.com

# Admin Panel
NEXT_PUBLIC_ADMIN_PASSWORD=vvvluxe2024

# Site URL
NEXT_PUBLIC_SITE_URL=https://vvvluxe.com
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 🔧 Production Setup

### Favicon Assets

Before deploying, generate favicon assets from your logo:

```bash
# Install Sharp if not already installed
npm install sharp

# Generate all favicon sizes from logo
node scripts/generate-favicons.js
```

This creates the following files in `/public/`:

- `favicon.ico` (32×32 fallback, manually create multi-res .ico after)
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png` (180×180)
- `android-chrome-192x192.png`
- `android-chrome-512x512.png`
- `site.webmanifest` (PWA manifest)

**Note:** For a true multi-resolution `.ico` file, use an online tool like [favicon.io](https://favicon.io) or [RealFaviconGenerator](https://realfavicongenerator.net) to convert `favicon-32x32.png` into a proper `.ico` format.

### Testing Contact Form Locally

1. **Get Resend API Key**: Sign up at [resend.com](https://resend.com) and create an API key
2. **Add to `.env.local`**:

   ```env
   RESEND_API_KEY=re_your_actual_api_key
   CONTACT_TO_EMAIL=your_email@example.com
   CONTACT_FROM_EMAIL=noreply@yourdomain.com
   ```

3. **Test in dev**:

   ```bash
   npm run dev
   # Navigate to http://localhost:3000/contact
   # Fill out form and submit
   # Check your CONTACT_TO_EMAIL inbox
   ```

4. **Rate Limiting**: Contact form limits to 5 submissions per IP every 15 minutes to prevent spam

### Testing Stripe in Test Mode

1. **Get Stripe Test Keys**:
   - Go to [dashboard.stripe.com](https://dashboard.stripe.com)
   - Toggle to "Test mode" (top right)
   - Go to Developers → API keys
   - Copy `Publishable key` and `Secret key`

2. **Add to `.env.local`**:

   ```env
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   ```

3. **Test Checkout Flow**:

   ```bash
   npm run dev
   # Navigate to any product page
   # Click "Buy Now" button
   # Use test card: 4242 4242 4242 4242
   # Any future expiry date, any 3-digit CVC
   # Complete checkout
   ```

4. **Test Webhooks Locally**:

   ```bash
   # Install Stripe CLI: https://stripe.com/docs/stripe-cli
   stripe login
   
   # Forward webhooks to local endpoint
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   
   # Copy the webhook signing secret (whsec_...)
   # Add to .env.local:
   STRIPE_WEBHOOK_SECRET=whsec_...
   
   # Trigger test event
   stripe trigger checkout.session.completed
   ```

5. **In Production**:
   - Use live mode keys (`pk_live_...` and `sk_live_...`)
   - Create webhook endpoint in Stripe Dashboard pointing to `https://yourdomain.com/api/webhooks/stripe`
   - Listen for events: `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`, `charge.refunded`

### Required Environment Variables Checklist

Before deploying to Vercel/production:

- [ ] `NEXT_PUBLIC_WHATSAPP_NUMBER` — Your WhatsApp number (no +)
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — Stripe publishable key (live mode for production)
- [ ] `STRIPE_SECRET_KEY` — Stripe secret key (live mode for production)
- [ ] `STRIPE_WEBHOOK_SECRET` — Webhook signing secret from Stripe Dashboard
- [ ] `RESEND_API_KEY` — Resend API key for sending contact form emails
- [ ] `CONTACT_TO_EMAIL` — Email address to receive contact form submissions
- [ ] `CONTACT_FROM_EMAIL` — "From" email address (must be verified domain in Resend)
- [ ] `NEXT_PUBLIC_ADMIN_PASSWORD` — Change default password for admin panel
- [ ] `NEXT_PUBLIC_SITE_URL` — Production domain (e.g., `https://vvvluxe.com`)

### Deployment Checklist

- [ ] Run `node scripts/generate-favicons.js` to create favicon assets
- [ ] Verify all favicon files exist in `/public/`
- [ ] Test contact form in dev mode with real Resend API key
- [ ] Test Stripe checkout with test mode keys
- [ ] Test webhook delivery using Stripe CLI locally
- [ ] Set all environment variables in Vercel dashboard (Settings → Environment Variables)
- [ ] Deploy to Vercel: `vercel --prod` or push to main branch
- [ ] Configure webhook URL in Stripe Dashboard (live mode)
- [ ] Verify domain in Resend for `CONTACT_FROM_EMAIL` address
- [ ] Test production contact form submission
- [ ] Test production Stripe checkout with test card
- [ ] Monitor webhook events in Stripe Dashboard → Developers → Webhooks

---

## 📁 Project Structure

```
vvvluxe/
├── app/
│   ├── layout.tsx                  # Root layout with fonts & SEO
│   ├── page.tsx                    # Home page
│   ├── shop/page.tsx               # Collections hub
│   ├── collections/[slug]/page.tsx # Dynamic collection listing (with filters)
│   ├── products/[slug]/page.tsx    # Product detail page
│   ├── design/page.tsx             # Design Your Own configurator ✨
│   ├── custom/page.tsx             # Custom & personalized page
│   ├── gemstones/page.tsx          # Gemstones catalog
│   ├── contact/page.tsx            # Contact form
│   ├── admin-config/page.tsx       # Admin pricing config panel
│   └── globals.css                 # Tailwind + custom styles
├── components/
│   ├── layout/
│   │   ├── Header.tsx              # Sticky header with navigation
│   │   └── Footer.tsx              # Multi-column footer
│   └── ProductCard.tsx             # Reusable product card
├── lib/
│   ├── data.ts                     # Seed data: 30 products + 15 gemstones
│   ├── pricing.ts                  # Pricing engine & config
│   └── templates.ts                # 8 design templates for configurator
├── types/
│   └── index.ts                    # TypeScript interfaces
├── public/
│   └── images/                     # Product images (add your assets here)
├── tailwind.config.ts              # Custom luxury theme
├── next.config.js                  # Image optimization config
└── package.json
```

---

## 🖼️ Adding Product Images

### Directory Structure

Organize images in `/public/images/` by category:

```
public/images/
├── hero/
│   ├── hero-main.jpg
│   ├── custom-hero.jpg
│   └── ...
├── products/
│   ├── cvd-rope-bracelet-black.jpg
│   ├── natural-solitaire-ring.jpg
│   └── ...
├── gemstones/
│   ├── sapphire-blue-oval.jpg
│   └── ...
└── collections/
    ├── affordable-cvd.jpg
    ├── natural-diamonds.jpg
    └── ...
```

### Image Requirements

- **Format**: JPG or PNG
- **Resolution**:
  - Product images: 1200x1200px minimum
  - Hero images: 1920x1080px minimum
- **Optimization**: Use Sharp (automatically handled by Next.js)
- **Naming**: Lowercase, hyphens (e.g., `cvd-rope-bracelet-black.jpg`)

### Updating Image Paths

Edit `/lib/data.ts` and replace placeholder paths:

```typescript
{
  id: 'cvd-rope-bracelet-black',
  name: 'Silk Rope Bracelet',
  images: [
    '/images/products/cvd-rope-bracelet-black.jpg', // Update this path
    '/images/products/cvd-rope-bracelet-black-2.jpg',
  ],
  // ...
}
```

---

## 💎 Editing Products

All product data is in `/lib/data.ts`:

### Adding a New Product

```typescript
export const products: Product[] = [
  // Existing products...
  {
    id: 'new-product-slug',
    name: 'Product Name',
    slug: 'new-product-slug',
    description: 'Short description',
    longDescription: 'Detailed description for product page',
    price: 2500,
    category: 'rings', // 'bracelets' | 'necklaces' | 'rings' | 'earrings' | 'pendants'
    collection: 'affordable-cvd', // See collections in data.ts
    images: ['/images/products/new-product.jpg'],
    availability: 'Made-to-Order', // or 'In Stock'
    featured: false,
    materials: {
      metal: '18K-white',
      goldWeight: 3.5,
      stoneType: 'cvd',
      totalCaratWeight: 0.75,
    },
    specifications: {
      metalPurity: '18K (75%)',
      finish: 'High Polish',
      // ... other specs
    },
    seo: {
      metaTitle: 'SEO Title',
      metaDescription: 'SEO description',
      keywords: ['keyword1', 'keyword2'],
    },
  },
];
```

### Product Collections

Available collection slugs (must match routes):

- `affordable-cvd` → Affordable CVD Silk Rope
- `natural-diamonds` → Natural Diamonds
- `custom-personalized` → Custom & Personalized
- `gemstones` → Gemstones (loose pieces)
- `all` → All Products

---

## 💰 Pricing Configuration

### How Pricing Works

The pricing engine (`/lib/pricing.ts`) calculates product/design prices using:

**Formula:**

```
Total = (Gold Cost + Stone Cost + Labor Fee) × (1 + Markup %)
```

**Components:**

- **Gold Cost** = Gold weight (grams) × Price per gram (by metal type)
- **Stone Cost** = Total carat weight × Price per carat (by stone type)
- **Labor Fee** = Fixed fee based on complexity (Simple/Medium/Complex)
- **Markup** = Profit margin percentage

### Editing Pricing Variables

**Option 1: Via Admin Panel** (Recommended)

1. Navigate to `/admin-config`
2. Enter admin password (from `.env.local`)
3. Update values in the UI
4. Click "Save Configuration"

**Option 2: Directly in Code**

Edit `/lib/pricing.ts`:

```typescript
export const pricingConfig = {
  goldPricePerGram: {
    '18K-white': 65,   // AED per gram
    '18K-yellow': 68,
    '18K-rose': 67,
  },
  stonePricePerCarat: {
    cvd: 450,          // CVD diamond (AED/carat)
    natural: 3500,     // Natural diamond
    gemstone: 800,     // Average gemstone
  },
  laborFees: {
    simple: 200,       // Rope bracelets, basic items
    medium: 400,       // Rings, pendants
    complex: 750,      // Custom, intricate designs
  },
  markupPercentage: 0.35,  // 35% profit margin
  baseLeadTimeDays: 21,
};
```

### Lead Time Calculation

Lead time is calculated in `calculatePrice()`:

- **Base**: 21 days
- **+7 days** for Complex items
- **+14 days** for Engraving

---

## 🎨 Design System

### Typography

- **Serif (Headlines)**: Playfair Display
- **Sans (Body)**: Inter
- Loaded via `next/font/google` in `app/layout.tsx`

### Colors

Defined in `tailwind.config.ts`:

```typescript
colors: {
  'luxury-black': '#0A0A0A',
  'luxury-white': '#FEFEFE',
  'luxury-gold': '#D4AF37',
  'luxury-warm-gray': {
    50: '#FAFAF9',
    100: '#F5F5F4',
    200: '#E7E5E4',
    300: '#D6D3D1',
    // ...
  },
}
```

### Custom Components

Pre-built utility classes in `globals.css`:

- **Buttons**: `.btn-primary`, `.btn-secondary`, `.btn-gold`
- **Inputs**: `.input-luxury`
- **Cards**: `.card-luxury`
- **Sections**: `.section-luxury` (padding/margin)

---

## 🛠️ Configurator Details

### How the Configurator Works

**Location**: `/app/design/page.tsx`

**8-Step Wizard:**

1. **Type Selection** — Choose jewelry type (bracelet, necklace, ring, earrings)
2. **Template** — Select from 8 pre-designed templates (filters by type)
3. **Metal** — Choose 18K white/yellow/rose gold
4. **Rope** — Select rope color (if template supports it)
5. **Stones** — Configure each stone slot (type, shape, carat)
6. **Engraving** — Add custom text (optional)
7. **Size** — Select ring/bracelet size
8. **Summary** — Review configuration with pricing breakdown

**Features:**

- **Real-time Pricing** — Updates in sidebar on every change
- **Step Validation** — Prevents advancing with incomplete data
- **LocalStorage Persistence** — Saves designs to browser
- **Template Logic** — Stone slot validation (min/max carat, allowed shapes)

### Editing Templates

Templates are in `/lib/templates.ts`:

```typescript
export const designTemplates: DesignTemplate[] = [
  {
    id: 'rope-bracelet-1',
    name: 'Classic Rope Bracelet',
    type: 'bracelet',
    basePrice: 1200,
    complexity: 'simple',
    ropeEnabled: true,          // Show rope step
    stoneSlots: [
      {
        slotNumber: 1,
        allowedShapes: ['round', 'oval'],
        caratRange: { min: 0.5, max: 2.0 },
      },
    ],
    // ...
  },
];
```

**To Add a New Template:**

1. Add object to `designTemplates` array
2. Set `type`, `complexity`, `ropeEnabled`
3. Define `stoneSlots` with validation rules
4. Template will auto-appear in configurator

---

## 🔧 Roadmap

### Phase 1 (Current - MVP)

✅ Core e-commerce pages  
✅ Functional 2D configurator  
✅ WhatsApp integration  
✅ Admin pricing panel  
✅ SEO foundations  

### Phase 2 (3-6 months)

- **3D Configurator** — Interactive 3D preview using Three.js/Babylon.js
- **User Accounts** — Save designs, order history, wishlists
- **Live Inventory** — Real-time stock tracking
- **Payment Gateway** — Full Stripe Checkout integration
- **Email Automation** — Order confirmations, shipping updates

### Phase 3 (6-12 months)

- **Manufacturing Integration** — Direct connection to workshop (order tracking)
- **CRM System** — Customer relationship management
- **AR Try-On** — Mobile AR for bracelets/rings (WebXR)
- **Multi-language** — Arabic + English support
- **Admin Dashboard** — Full product/order management

---

## 📞 Support & Contact

**VVV Luxe Jewelry**  
Gold & Diamond Park, Dubai, UAE  
WhatsApp: [+971 56 151 0897](https://wa.me/971561510897)  
Website: [vvvluxe.com](https://vvvluxe.com)

---

## 🔒 Security Notes

- **Environment Variables**: Never commit `.env.local` to Git
- **Admin Password**: Change default password in production
- **Stripe Keys**: Use test keys for development, live keys for production
- **HTTPS**: Always use HTTPS in production for payment security

---

## 📄 License

Proprietary software for VVV Luxe brand. All rights reserved.

---

**Built with Next.js 14 · TypeScript · TailwindCSS · Sharp · Stripe**  
_Quiet luxury. Zero animations. Pure functionality._
