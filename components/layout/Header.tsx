'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useCartStore } from '@/lib/cartStore';

const navigation = [
    { name: 'Home', shortName: 'Home', href: '/', fullName: 'Home' },
    { name: 'Shop', shortName: 'Shop', href: '/shop', fullName: 'Shop All' },
    { name: 'Design', shortName: 'Design', href: '/design', fullName: 'Design Your Own' },
    { name: 'Custom', shortName: 'Custom', href: '/custom', fullName: 'Custom & Personalized' },
    { name: 'Affordable', shortName: 'Affordable', href: '/collections/affordable-cvd', fullName: 'Affordable CVD' },
    { name: 'Natural', shortName: 'Natural', href: '/collections/natural-diamonds', fullName: 'Natural Diamonds' },
    { name: 'Gemstones', shortName: 'Gemstones', href: '/gemstones', fullName: 'Gemstones' },
    { name: 'Contact', shortName: 'Contact', href: '/contact', fullName: 'Contact Us' },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();
    const getTotalItems = useCartStore((state) => state.getTotalItems);
    const isHydrated = useCartStore((state) => state.isHydrated);

    // Handle hydration
    useEffect(() => {
        setMounted(true);
    }, []);

    const cartItemCount = mounted && isHydrated ? getTotalItems() : 0;

    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '971561510897';
    const whatsappMessage = encodeURIComponent(
        process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ||
        "Hello VVV Luxe, I'm interested in your custom jewelry collection."
    );
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    return (
        <>
            <header className="header-container">
                <nav className="header-nav">
                    <div className="header-grid">
                        {/* Left: Logo */}
                        <div className="header-logo-zone">
                            <Link href="/" className="-m-1.5 p-1.5 flex flex-col items-center">
                                <span className="sr-only">VVV Luxe Jewelry</span>
                                <div className="h-14 w-56 relative">
                                    <Image
                                        src="/brand/logo1.jpg"
                                        alt="VVV Luxe Jewelry"
                                        fill
                                        className="object-contain"
                                        priority
                                    />
                                </div>
                                <div className="brand-subtitle">
                                    Velvet. Vogue. Virtuoso.
                                </div>
                            </Link>
                        </div>

                        {/* Center: Navigation */}
                        <div className="header-nav-zone">
                            {navigation.map((item) => {
                                const active = isActive(item.href);
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`nav-link ${active ? 'nav-link-active' : ''}`}
                                        title={item.fullName}
                                    >
                                        {item.shortName}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Right: Actions */}
                        <div className="header-actions-zone">
                            {/* WhatsApp Icon */}
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="action-icon"
                                aria-label="Contact us on WhatsApp"
                                title="Chat on WhatsApp"
                            >
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                </svg>
                            </a>

                            <button
                                type="button"
                                onClick={() => setSearchOpen(!searchOpen)}
                                className="action-icon"
                                aria-label="Search"
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </button>

                            <a
                                href="https://instagram.com/vvvluxe"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="action-icon"
                                aria-label="Instagram @vvvluxe"
                            >
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </a>

                            <a
                                href="https://www.tiktok.com/@vvv.luxe"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="action-icon"
                                aria-label="TikTok @vvv.luxe"
                            >
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                                </svg>
                            </a>

                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="action-whatsapp"
                                aria-label="WhatsApp"
                            >
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                            </a>

                            <Link href="/cart" className="action-icon cart-icon-wrapper" aria-label="Cart">
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>
                                {cartItemCount > 0 && (
                                    <span className="cart-badge">
                                        {cartItemCount}
                                    </span>
                                )}
                            </Link>
                        </div>

                        {/* Mobile menu button */}
                        <div className="header-mobile-toggle">
                            <button
                                type="button"
                                className="action-icon"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                aria-label="Toggle menu"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Mobile menu */}
                    {mobileMenuOpen && (
                        <div className="mobile-menu">
                            <div className="mobile-menu-content">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="mobile-menu-link"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.fullName}
                                    </Link>
                                ))}
                                <div className="mobile-menu-actions">
                                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary text-center">
                                        WhatsApp Us
                                    </a>
                                    <Link href="/cart" className="btn-secondary text-center">
                                        View Cart
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Search overlay */}
                    {searchOpen && (
                        <div className="search-overlay">
                            <div className="max-w-3xl mx-auto">
                                <input
                                    type="search"
                                    placeholder="Search jewelry..."
                                    className="input-luxury"
                                    autoFocus
                                    onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
                                />
                            </div>
                        </div>
                    )}
                </nav>
            </header>
        </>
    );
}
