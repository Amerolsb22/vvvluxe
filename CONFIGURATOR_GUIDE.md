# VVV Luxe Configurator System

Complete guide to the visual jewelry configurator image system.

## 📁 Image Directory Structure

```
public/images/configurator/
├── bases/           ✅ Base jewelry structures
│   ├── ring.png
│   ├── bracelet.png
│   ├── necklace.png
│   ├── pendant.png
│   └── earring.png
│
├── ropes/           ✅ Silk rope colors
│   ├── rope-black.png
│   ├── rope-navy.png
│   ├── rope-burgundy.png
│   ├── rope-white.png
│   └── rope-gold.png
│
├── chains/          ✅ Metal chain styles
│   ├── chain-thin.png
│   ├── chain-medium.png
│   └── chain-thick.png
│
├── diamonds/        ✅ Diamond shapes (all sizes)
│   ├── round_{small,medium,large}.png
│   ├── princess_{small,medium,large}.png
│   ├── oval_{small,medium,large}.png
│   ├── pear_{small,medium,large}.png
│   ├── cushion_{small,medium,large}.png
│   ├── marquise_{small,medium,large}.png
│   └── heart_{small,medium,large}.png
│
├── gemstones/       ✅ Colored gemstones
│   ├── sapphire-blue.png
│   ├── sapphire-pink.png
│   ├── ruby-red.png
│   ├── emerald-green.png
│   ├── aquamarine.png
│   ├── morganite.png
│   ├── tanzanite.png
│   ├── amethyst.png
│   ├── citrine-madeira.png
│   ├── peridot.png
│   ├── topaz-imperial.png
│   ├── tourmaline-paraiba.png
│   ├── spinel-red.png
│   ├── alexandrite.png
│   └── tsavorite-garnet.png
│
├── metal/           (Empty - using CSS filters)
│
└── previews/        (Optional fallback images)
    ├── preview-ring.png
    ├── preview-bracelet.png
    └── preview-necklace.png
```

## 🎨 How It Works

### Visual Layering System

The configurator uses **absolute positioning** to stack images in layers:

1. **Layer 1: Base** (lowest z-index)
   - Ring, bracelet, necklace, or earring structure
   - Metal color applied via CSS filter

2. **Layer 2: Rope/Chain** (middle z-index)
   - Silk rope in selected color
   - Only visible if `ropeEnabled: true` in template

3. **Layer 3: Stones** (highest z-index)
   - Diamonds or gemstones
   - Scaled via CSS based on carat weight
   - Multiple stones positioned based on `slotId`

### Metal Colors (CSS Filters)

Instead of separate images, metal finishes use CSS filters on the base image:

```typescript
metalFilters = {
    '18K Yellow Gold': 'hue-rotate(30deg) saturate(1.8) brightness(1.1)',
    '18K White Gold': 'saturate(0) brightness(1.4)',
    '18K Rose Gold': 'hue-rotate(340deg) saturate(1.5) brightness(1.05)',
}
```

### Stone Size Scaling

Diamond/gemstone size is controlled via CSS `transform: scale()`:

```typescript
// Carat weight 0.15 → 0.50 = scale 0.5x → 2.0x
function getStoneScale(carat, minCarat, maxCarat) {
    const normalized = (carat - minCarat) / (maxCarat - minCarat);
    return 0.5 + (normalized * 1.5);
}
```

**No duplicate images needed!** One diamond image per shape, scaled dynamically.

## 📦 Key Files

### 1. `lib/configuratorAssets.ts`
Central configuration for all image paths and helpers.

```typescript
import { getBaseImage, getDiamondImage, getGemstoneImage, getRopeImage, getMetalFilter, getStoneScale } from '@/lib/configuratorAssets';

// Get base image for Ring
const ringImage = getBaseImage('Ring');
// → '/images/configurator/bases/ring.png'

// Get rope image for Black
const ropeImage = getRopeImage('Black');
// → '/images/configurator/ropes/rope-black.png'

// Get diamond image for Oval shape
const diamondImage = getDiamondImage('Oval');
// → '/images/configurator/diamonds/oval_medium.png'

// Get CSS filter for Rose Gold
const filter = getMetalFilter('18K Rose Gold');
// → 'hue-rotate(340deg) saturate(1.5) brightness(1.05)'

// Calculate scale for 0.35ct stone
const scale = getStoneScale(0.35, 0.15, 0.50);
// → 1.357 (scale multiplier)
```

### 2. `components/ConfiguratorPreview.tsx`
React component that renders the layered preview.

**Props:**
```typescript
{
    productType: 'Ring' | 'Necklace' | 'Bracelet' | 'Earrings';
    metal: '18K Yellow Gold' | '18K White Gold' | '18K Rose Gold';
    ropeColor?: 'Black' | 'Navy' | 'Burgundy' | 'White' | 'Gold';
    stones: ConfiguredStone[];
}
```

**Features:**
- Automatic image error handling with fallbacks
- Development console warnings for missing images
- SVG placeholder if base image fails
- Configuration summary overlay

### 3. `app/design/page.tsx`
Main configurator UI with step-by-step wizard.

**Steps:**
1. Choose Type (Ring, Bracelet, Necklace, Earrings)
2. Select Template
3. Choose Metal (Yellow/White/Rose Gold)
4. Pick Rope Color (if applicable)
5. Add Stones (type, shape, carat, gemstone selection)
6. Add Engraving (optional)
7. Select Size
8. View Summary & Request Quote

## 🚀 Usage Example

```tsx
import ConfiguratorPreview from '@/components/ConfiguratorPreview';

<ConfiguratorPreview
    productType="Bracelet"
    metal="18K Rose Gold"
    ropeColor="Navy"
    stones={[
        {
            slotId: 'center',
            type: 'Gemstone',
            shape: 'Round',
            caratWeight: 0.25,
            gemstoneType: 'Sapphire'
        }
    ]}
/>
```

## 🛡️ Fallback Safety

### Image Error Handling
1. **Per-layer tracking**: Each image layer has its own error state
2. **Development warnings**: Console warnings only in dev mode
3. **SVG placeholder**: Fallback icon if base image fails
4. **No crashes**: Page continues to function even with missing images

### Implementation
```typescript
const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

const handleImageError = (layer: string) => {
    setImageErrors(prev => new Set(prev).add(layer));
    if (process.env.NODE_ENV === 'development') {
        console.warn(`[ConfiguratorPreview] Failed to load: ${layer}`);
    }
};
```

## 📋 Checklist for New Images

When adding new configurator images:

- [ ] Use PNG format with transparency
- [ ] Follow naming convention: `{type}-{variant}.png`
- [ ] Place in correct subfolder
- [ ] Update `lib/configuratorAssets.ts` if adding new types
- [ ] Test in configurator preview
- [ ] Verify on both light and dark backgrounds
- [ ] Check image loads without 404 errors

## 🎯 Optimization Guidelines

### DO:
✅ Use CSS `transform: scale()` for diamond sizes  
✅ Use CSS filters for metal colors  
✅ Reuse base images across variations  
✅ Implement lazy loading for large collections  
✅ Use PNG with alpha transparency  

### DON'T:
❌ Create separate images for each carat size  
❌ Duplicate images for metal colors  
❌ Use external image URLs  
❌ Add animations (keep it clean and luxury)  
❌ Hardcode image paths in components  

## 🔍 Testing Checklist

Visit `/design` and verify:

- [ ] Base jewelry structure loads (ring, bracelet, necklace)
- [ ] Metal selection changes color filter visually
- [ ] Rope color selection shows correct rope image
- [ ] Stone type dropdown works (CVD/Natural Diamond/Gemstone)
- [ ] Gemstone type selection appears for Gemstone type
- [ ] Diamond shape changes stone image
- [ ] Carat weight slider scales stone visually
- [ ] Multiple stones layer correctly
- [ ] Preview updates in real-time
- [ ] No 404 errors in browser console
- [ ] Fallback placeholder shows if image missing
- [ ] Page doesn't crash with missing images

## 🌐 Routes Using Configurator

| Route | Usage |
|-------|-------|
| `/design` | Main step-by-step configurator UI |
| `/shop` | Browse pre-configured products |
| `/collections/*` | Collection-specific items |
| `/products/[slug]` | Individual product detail pages |

## 📝 Type Definitions

```typescript
// types/index.ts

export interface ConfiguredStone {
    slotId: string;
    type: 'CVD Diamond' | 'Natural Diamond' | 'Gemstone';
    shape: string;
    caratWeight: number;
    gemstoneType?: string; // For Gemstone type only
}

export type MetalType = '18K White Gold' | '18K Yellow Gold' | '18K Rose Gold';
export type RopeColor = 'Black' | 'Navy' | 'Burgundy' | 'White' | 'Gold';
export type ProductType = 'Ring' | 'Necklace' | 'Bracelet' | 'Earrings' | 'Pendant';
```

## 🎨 Design Principles

1. **Luxury First**: Clean, minimal, high-end aesthetic
2. **Performance**: Reuse images, CSS transforms over duplication
3. **Reliability**: Graceful fallbacks, no crashes
4. **Accessibility**: Clear labels, semantic HTML
5. **Real-time**: Live preview updates as user configures

## 📞 Support

For questions or issues with the configurator system, check:
1. Browser console for image load errors
2. `lib/configuratorAssets.ts` for path configuration
3. `components/ConfiguratorPreview.tsx` for rendering logic
4. Network tab to verify image requests

---

**Last Updated**: January 2, 2026  
**Build Status**: ✅ All 20 routes compiled successfully  
**Dev Server**: `http://localhost:3000`  
**Test Route**: `http://localhost:3000/design`
