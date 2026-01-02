'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

interface HeroSlide {
    id: string;
    imageSrc: string;
    headline: string;
    subtitle?: string;
    buttons: Array<{
        label: string;
        href: string;
        variant: 'gold' | 'secondary';
    }>;
}

const heroSlides: HeroSlide[] = [
    {
        id: 'custom',
        imageSrc: '/images/banners/banner1.png',
        headline: 'Custom Jewelry.\nMade for You.',
        subtitle: 'Personalized designs • Affordable CVD diamond line • Natural diamonds • Rare gemstones',
        buttons: [
            { label: 'Design Your Own', href: '/design', variant: 'gold' },
            { label: 'Book Consultation', href: '/contact', variant: 'secondary' },
        ],
    },
    {
        id: 'cvd',
        imageSrc: '/images/banners/banner2.png',
        headline: 'Affordable CVD Jewelry',
        subtitle: 'Modern luxury with silk rope and minimal gold',
        buttons: [
            { label: 'Explore Collection', href: '/affordable', variant: 'gold' },
        ],
    },
    {
        id: 'natural',
        imageSrc: '/images/banners/banner3.png',
        headline: 'Natural Diamonds',
        subtitle: 'Timeless brilliance and certified stones',
        buttons: [
            { label: 'View Collection', href: '/natural', variant: 'gold' },
        ],
    },
    {
        id: 'gemstones',
        imageSrc: '/images/banners/banner4.png',
        headline: 'Gemstones',
        subtitle: 'Emeralds, sapphires, rubies & rare stones',
        buttons: [
            { label: 'Discover Gems', href: '/gemstones', variant: 'gold' },
        ],
    },
    {
        id: 'featured',
        imageSrc: '/images/banners/banner5.png',
        headline: 'New & Featured Pieces',
        subtitle: 'Discover the latest designs and special selections',
        buttons: [
            { label: 'Explore Shop', href: '/shop', variant: 'gold' },
        ],
    },
];

export default function HeroCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    }, []);

    const goToSlide = useCallback((index: number) => {
        setCurrentSlide(index);
    }, []);

    // Auto-rotate
    useEffect(() => {
        if (!isAutoPlaying) return;

        // Check for reduced motion preference
        if (typeof window !== 'undefined') {
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReducedMotion) {
                setIsAutoPlaying(false);
                return;
            }
        }

        const interval = setInterval(nextSlide, 8000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, nextSlide]);

    const handleMouseEnter = () => setIsAutoPlaying(false);
    const handleMouseLeave = () => {
        if (typeof window !== 'undefined') {
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (!prefersReducedMotion) {
                setIsAutoPlaying(true);
            }
        }
    };

    return (
        <section
            className="hero-carousel"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="hero-carousel-container">
                {heroSlides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
                    >
                        {/* Background Image */}
                        <div className="hero-image-wrapper">
                            <Image
                                src={slide.imageSrc}
                                alt={slide.headline}
                                fill
                                className="hero-image"
                                priority={index === 0}
                                sizes="100vw"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                }}
                            />
                            {/* Dark overlay gradient */}
                            <div className="hero-overlay" />
                        </div>

                        {/* Content Overlay */}
                        <div className="hero-content">
                            <div className="hero-content-inner">
                                <h1 className="hero-headline">
                                    {slide.headline.split('\n').map((line, i) => (
                                        <span key={i}>
                                            {line}
                                            {i < slide.headline.split('\n').length - 1 && <br />}
                                        </span>
                                    ))}
                                </h1>

                                {slide.subtitle && (
                                    <p className="hero-subtitle">
                                        {slide.subtitle}
                                    </p>
                                )}

                                <div className="hero-buttons">
                                    {slide.buttons.map((button) => (
                                        <Link
                                            key={button.label}
                                            href={button.href}
                                            className={button.variant === 'gold' ? 'btn-gold' : 'btn-secondary'}
                                        >
                                            {button.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="hero-arrow hero-arrow-left"
                aria-label="Previous slide"
            >
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button
                onClick={nextSlide}
                className="hero-arrow hero-arrow-right"
                aria-label="Next slide"
            >
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Dot Indicators */}
            <div className="hero-dots">
                {heroSlides.map((slide, index) => (
                    <button
                        key={slide.id}
                        onClick={() => goToSlide(index)}
                        className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
