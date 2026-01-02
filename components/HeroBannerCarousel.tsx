'use client';

import { bannerSlides } from '@/lib/banners';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

export default function HeroBannerCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
    }, []);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    // Auto-rotate every 7 seconds
    useEffect(() => {
        if (!isAutoPlaying) return;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            setIsAutoPlaying(false);
            return;
        }

        const interval = setInterval(nextSlide, 7000);
        return () => clearInterval(interval);
    }, [currentSlide, isAutoPlaying, nextSlide]);

    const handleMouseEnter = () => setIsAutoPlaying(false);
    const handleMouseLeave = () => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!prefersReducedMotion) {
            setIsAutoPlaying(true);
        }
    };

    const slide = bannerSlides[currentSlide];

    return (
        <div
            className="hero-banner-carousel"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Slides Container */}
            <div className="banner-slides">
                {bannerSlides.map((s, index) => (
                    <div
                        key={s.id}
                        className={`banner-slide ${index === currentSlide ? 'active' : ''}`}
                    >
                        <div className="banner-image-wrapper">
                            <Image
                                src={s.imageSrc}
                                alt={s.title}
                                fill
                                className="banner-image"
                                sizes="100vw"
                                priority={index === 0}
                                onError={(e) => {
                                    // Fallback gradient if image fails to load
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                }}
                            />
                            {/* Gradient overlay for text readability */}
                            <div className="banner-overlay" />
                        </div>

                        {/* Text Overlay */}
                        <div className="banner-content">
                            <div className="banner-content-inner">
                                <h3 className="banner-title">{s.title}</h3>
                                {s.subtitle && <p className="banner-subtitle">{s.subtitle}</p>}
                                {s.ctaLabel && s.ctaLink && (
                                    <Link href={s.ctaLink} className="banner-cta">
                                        {s.ctaLabel}
                                        <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                        </svg>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="banner-arrow banner-arrow-left"
                aria-label="Previous slide"
            >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </button>

            <button
                onClick={nextSlide}
                className="banner-arrow banner-arrow-right"
                aria-label="Next slide"
            >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
            </button>

            {/* Dot Indicators */}
            <div className="banner-dots">
                {bannerSlides.map((s, index) => (
                    <button
                        key={s.id}
                        onClick={() => goToSlide(index)}
                        className={`banner-dot ${index === currentSlide ? 'active' : ''}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
