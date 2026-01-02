# Quick Start Guide — VVV Luxe Development

**Get the site running in 5 minutes.**

---

## ⚡ Installation (30 seconds)

```bash
# Navigate to project
cd VVVLuxe1

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local
```

**Done!** No database setup needed (data is seeded in code).

---

## 🚀 Run Development Server (10 seconds)

```bash
npm run dev
```

Open: **<http://localhost:3000>**

---

## 🗺️ Site Navigation

| URL | Page | Status |
|-----|------|--------|
| `/` | Home | ✅ Complete |
| `/shop` | Collections Hub | ✅ Complete |
| `/collections/affordable-cvd` | CVD Rope Collection | ✅ Complete |
| `/collections/natural-diamonds` | Natural Diamonds | ✅ Complete |
| `/collections/bracelets` | All Bracelets | ✅ Complete |
| `/products/cvd-rope-bracelet-black` | Product Detail (example) | ✅ Complete |
| `/design` | **Design Configurator** | ✅ Complete |
| `/custom` | Custom & Personalized | ✅ Complete |
| `/gemstones` | Gemstones Catalog | ✅ Complete |
| `/contact` | Contact Form | ✅ Complete |
| `/about` | About VVV Luxe | ✅ Complete |
| `/admin-config` | Admin Panel | ✅ Complete |

---

## 🎯 Key Features to Test

### 1. Design Your Own Configurator (`/design`)

- **Step 1**: Choose jewelry type (bracelet/necklace/ring/earrings)
- **Step 2**: Select template (8 options)
- **Step 3**: Choose metal (18K white/yellow/rose gold)
- **Step 4**: Select rope color (if applicable)
- **Step 5**: Configure stones (type, shape, carat per slot)
- **Step 6**: Add engraving (optional)
- **Step 7**: Select size
- **Step 8**: Review summary + see pricing breakdown

**Features**:

- ✅ Real-time pricing updates in sidebar
- ✅ Saves to localStorage (click "Save This Design")
- ✅ Step validation (can't proceed without required fields)
- ✅ Conditional steps (rope step only shows if template supports rope)

### 2. Product Filtering (`/collections/[slug]`)

- Test filters: price range, metal type, stone type, product type, availability
- Test sorting: featured, newest, price (low/high)
- All filters work client-side (instant response)

### 3. WhatsApp Integration

- Header: WhatsApp button with prefilled "Hi VVV Luxe..."
- Product pages: "Contact on WhatsApp" with product details
- Gemstones: Per-gem inquiry buttons
- Custom page: "Discuss on WhatsApp" CTA
- All use `+971 56 151 0897` from env vars

### 4. Admin Config Panel (`/admin-config`)

- Password: `vvvluxe2024` (from `.env.local`)
- Edit gold prices, stone prices, labor fees, markup
- Click "Save Configuration" (saves to localStorage for now)

---

## 📝 Common Tasks

### Add a New Product

1. Open `/lib/data.ts`
2. Add to `products` array:

```typescript
{
  id: 'new-product',
  name: 'New Product Name',
  slug: 'new-product',
  description: 'Short description',
  longDescription: 'Detailed description',
  price: 3000,
  category: 'rings', // bracelets | necklaces | rings | earrings | pendants
  collection: 'natural-diamonds', // affordable-cvd | natural-diamonds | custom-personalized
  images: ['/images/products/new-product.jpg'],
  availability: 'Made-to-Order',
  featured: false,
  materials: {
    metal: '18K-white',
    goldWeight: 4.5,
    stoneType: 'natural',
    totalCaratWeight: 1.0,
  },
  specifications: {
    metalPurity: '18K (75%)',
    finish: 'High Polish',
    sizing: 'US 4-10',
    leadTime: '21-28 days',
    warranty: 'Lifetime warranty on craftsmanship',
  },
  seo: {
    metaTitle: 'New Product | VVV Luxe',
    metaDescription: 'SEO description',
    keywords: ['keyword1', 'keyword2'],
  },
}
```

1. Add images to `/public/images/products/`
2. Product auto-appears on collection pages

### Change Pricing Variables

**Option 1: UI (Recommended)**

- Go to `/admin-config`
- Login with password
- Edit values
- Click "Save Configuration"

**Option 2: Code**

- Open `/lib/pricing.ts`
- Edit `pricingConfig` object
- Changes apply immediately

### Add a New Design Template

1. Open `/lib/templates.ts`
2. Add to `designTemplates` array:

```typescript
{
  id: 'new-template',
  name: 'New Template Name',
  type: 'bracelet', // bracelet | necklace | ring | earrings
  basePrice: 1500,
  complexity: 'medium', // simple | medium | complex
  ropeEnabled: true, // Show rope step?
  stoneSlots: [
    {
      slotNumber: 1,
      allowedShapes: ['round', 'oval'], // round | oval | cushion | emerald | pear | marquise
      caratRange: { min: 0.5, max: 2.0 },
    },
  ],
  description: 'Template description',
  image: '/images/templates/new-template.jpg',
}
```

1. Template auto-appears in configurator (filtered by type)

---

## 🐛 Troubleshooting

### Images not showing?

- Check path: `/public/images/...` → access via `/images/...` (no `/public/`)
- Ensure images exist in `/public/images/` directory
- Check `next.config.js` for image domains (if using external CDN)

### Configurator pricing not updating?

- Open browser console (F12) and check for errors
- Verify `pricingConfig` in `/lib/pricing.ts` has valid numbers
- Check localStorage: clear with `localStorage.clear()` in console

### Admin panel password not working?

- Check `.env.local` has `NEXT_PUBLIC_ADMIN_PASSWORD=vvvluxe2024`
- Restart dev server after changing env vars: `npm run dev`

### WhatsApp links not working on mobile?

- Ensure number format: `971561510897` (no + or spaces)
- Test on actual mobile device (desktop may not have WhatsApp app)

### TypeScript errors?

- Run `npm run build` to see all errors
- Check imports match file structure
- Ensure all types are imported from `/types/index.ts`

---

## 🏗️ Build for Production

```bash
# Check for errors
npm run build

# Test production build locally
npm start

# Deploy to Vercel (recommended)
vercel deploy
```

**Before deploying:**

- [ ] Add all product images
- [ ] Generate favicons
- [ ] Update `.env.local` with production values
- [ ] Test checkout flow
- [ ] Set up domain (vvvluxe.com)

---

## 📚 Documentation Files

- **`README.md`** — Comprehensive setup guide, pricing rules, roadmap
- **`ASSETS.md`** — Logo usage, favicon generation, image structure
- **`PROJECT_STRUCTURE.md`** — Complete file tree, architecture, integration points
- **`QUICKSTART.md`** — This file (fast reference)

---

## 🎨 Design Philosophy Reminder

**Quiet Luxury Rules:**

- ❌ **NO** animations or parallax effects
- ❌ **NO** Framer Motion or GSAP
- ✅ **YES** to subtle hover states (underlines, color shifts)
- ✅ **YES** to instant UI feedback
- ✅ **YES** to calm, minimal, ultra-clean design

**Fonts:**

- Playfair Display (serif) → Headlines
- Inter (sans-serif) → Body text

**Colors:**

- Primary: Luxury Black (#0A0A0A)
- Accent: Luxury Gold (#D4AF37)
- Background: Luxury White (#FEFEFE)
- Grays: Warm Gray scale (50-900)

---

## 🤝 Need Help?

- Check browser console (F12) for errors
- Read full README: `/README.md`
- Review type definitions: `/types/index.ts`
- Explore data structure: `/lib/data.ts`

---

**VVV Luxe — Built for luxury. Coded for performance.**
