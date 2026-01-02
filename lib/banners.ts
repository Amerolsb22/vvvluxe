export interface BannerSlide {
    id: string;
    imageSrc: string;
    title: string;
    subtitle?: string;
    ctaLabel?: string;
    ctaLink?: string;
}

export const bannerSlides: BannerSlide[] = [
    {
        id: 'affordable-cvd',
        imageSrc: '/images/banners/banner-1.jpg',
        title: 'Affordable CVD Diamonds',
        subtitle: 'Luxury without compromise',
        ctaLabel: 'Explore Collection',
        ctaLink: '/collections/affordable-cvd',
    },
    {
        id: 'custom-personalized',
        imageSrc: '/images/banners/banner-2.jpg',
        title: 'Custom & Personalized',
        subtitle: 'Made uniquely for you',
        ctaLabel: 'Start Designing',
        ctaLink: '/custom',
    },
    {
        id: 'natural-diamonds',
        imageSrc: '/images/banners/banner-3.jpg',
        title: 'Natural Diamonds',
        subtitle: 'Certified and ethically sourced',
        ctaLabel: 'View Collection',
        ctaLink: '/collections/natural-diamonds',
    },
    {
        id: 'gemstones',
        imageSrc: '/images/banners/banner-4.jpg',
        title: 'Rare Gemstones',
        subtitle: 'Exceptional color and clarity',
        ctaLabel: 'Discover More',
        ctaLink: '/gemstones',
    },
    {
        id: 'for-her',
        imageSrc: '/images/banners/banner-5.jpg',
        title: 'For Her',
        subtitle: 'Elegant jewelry collections',
        ctaLabel: 'Shop Now',
        ctaLink: '/collections/for-her',
    },
    {
        id: 'for-him',
        imageSrc: '/images/banners/banner-6.jpg',
        title: 'For Him',
        subtitle: 'Sophisticated designs',
        ctaLabel: 'View Collection',
        ctaLink: '/collections/for-him',
    },
];
