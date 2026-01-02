# VVV Luxe - Banner Images Guide

## Banner Carousel Images

The homepage features a premium image carousel showcasing your collections and offers. Banner images are located in `/public/images/banners/`.

### Current Banner Slots

1. **banner-1.jpg** - Affordable CVD Diamonds
2. **banner-2.jpg** - Custom & Personalized
3. **banner-3.jpg** - Natural Diamonds
4. **banner-4.jpg** - Rare Gemstones
5. **banner-5.jpg** - For Her Collection
6. **banner-6.jpg** - For Him Collection

### Image Specifications

- **Recommended Size**: 1920x720px (wider banner format)
- **Aspect Ratio**: 21:9 or 8:3 (wide banner)
- **Format**: JPG or WebP
- **File Size**: Under 300KB (optimize for web)
- **Color Scheme**: Dark/black backgrounds with gold accents work best

### Design Guidelines

1. **Composition**:
   - Leave bottom-left area clear for text overlay
   - Focus subject on right side or center
   - Avoid busy backgrounds that compete with text

2. **Lighting**:
   - Use dramatic lighting to emphasize jewelry
   - Dark/moody atmosphere aligns with luxury brand
   - Ensure sufficient contrast

3. **Style**:
   - Professional product photography
   - Lifestyle shots showing jewelry in use
   - Close-up detail shots of craftsmanship
   - Minimal, elegant compositions

### Adding/Editing Slides

To add, remove, or modify banner slides, edit `/lib/banners.ts`:

\`\`\`typescript
export const bannerSlides: BannerSlide[] = [
  {
    id: 'unique-id',
    imageSrc: '/images/banners/your-image.jpg',
    title: 'Banner Title',
    subtitle: 'Optional subtitle text',
    ctaLabel: 'Call to Action',
    ctaLink: '/destination-page',
  },
  // Add more slides...
];
\`\`\`

### Temporary Placeholders

Until real product images are added, placeholder gradient backgrounds are used. The carousel will function normally and display the text overlays and CTAs.

### Tips for Best Results

- Use high-quality jewelry photography
- Ensure images are properly lit and in focus
- Test on both desktop and mobile devices
- Keep file sizes optimized for fast loading
- Maintain consistent styling across all banners
