# VVV Luxe Assets Guide

## Logo Files

The project uses two logo variants located in `/public/brand/`:

- **logo1.png** — Primary logo (full wordmark)
- **logo2.png** — Secondary logo (icon/mark only)

---

## Usage

### Header Logo

Currently using text-based branding in `components/layout/Header.tsx`.

To use image logo instead, replace:

```tsx
<span className="font-serif text-xl tracking-wider">VVV LUXE</span>
```

With:

```tsx
<Image
  src="/brand/logo1.png"
  alt="VVV Luxe"
  width={150}
  height={40}
  priority
/>
```

### Footer Logo

Similarly in `components/layout/Footer.tsx`, replace text with:

```tsx
<Image
  src="/brand/logo2.png"
  alt="VVV Luxe"
  width={80}
  height={80}
/>
```

---

## Favicon Generation

### Using logo2.png (recommended)

1. **Online Tool** (easiest):
   - Go to [favicon.io](https://favicon.io/favicon-converter/)
   - Upload `/public/brand/logo2.png`
   - Download generated favicon package
   - Extract to `/public/`

2. **Manual (Photoshop/GIMP)**:
   - Open `logo2.png`
   - Resize to 512x512px (square, transparent background)
   - Export as:
     - `favicon.ico` (16x16, 32x32, 48x48 multi-resolution)
     - `apple-touch-icon.png` (180x180)
     - `favicon-32x32.png`
     - `favicon-16x16.png`
   - Place all in `/public/`

3. **Update `app/layout.tsx`** (add to `<head>` via metadata):

```tsx
export const metadata: Metadata = {
  // ... existing metadata
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};
```

---

## Required Favicon Files

Place in `/public/`:

```
public/
├── favicon.ico            # Multi-resolution ICO (16, 32, 48px)
├── favicon-16x16.png      # For browser tabs
├── favicon-32x32.png      # For browser tabs (retina)
├── apple-touch-icon.png   # iOS home screen (180x180)
└── android-chrome-192x192.png  # Android (192x192)
```

---

## Image Placeholder Structure

For adding actual product images, create this structure in `/public/images/`:

```
public/images/
├── hero/
│   ├── hero-main.jpg           # Homepage hero (1920x1080)
│   ├── custom-hero.jpg         # Custom page hero
│   └── collections-hero.jpg
├── products/
│   ├── cvd-rope-bracelet-black.jpg
│   ├── cvd-rope-bracelet-red.jpg
│   ├── natural-solitaire-ring.jpg
│   └── ... (30 products × 2-3 images each)
├── gemstones/
│   ├── sapphire-blue-oval.jpg
│   ├── ruby-red-cushion.jpg
│   └── ... (15 gemstones × 1-2 images each)
└── collections/
    ├── affordable-cvd.jpg      # Collection thumbnails (800x800)
    ├── natural-diamonds.jpg
    ├── custom-personalized.jpg
    └── ...
```

---

## Image Optimization Tips

1. **Format**: Use JPG for photos, PNG for logos/icons with transparency
2. **Compression**:
   - Run images through [TinyPNG](https://tinypng.com/) before uploading
   - Or use Sharp (already configured in Next.js)
3. **Naming**: Lowercase, hyphens, descriptive (`cvd-rope-bracelet-black.jpg`)
4. **Sizes**:
   - Product images: 1200x1200px minimum (square)
   - Hero images: 1920x1080px (16:9)
   - Collection thumbnails: 800x800px

Next.js will automatically optimize and serve WebP/AVIF formats when using `next/image`.

---

## Current Logo Status

✅ Logos located in `/public/brand/`  
⚠️ Currently using text-based branding in components  
❌ Favicons not yet generated  

**Next Steps:**

1. Generate favicons from `logo2.png`
2. Update Header/Footer to use image logos (optional)
3. Add metadata icons in `app/layout.tsx`
