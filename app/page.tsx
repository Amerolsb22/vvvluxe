'use client';

import HeroCarousel from '@/components/HeroCarousel';
import ProductCard from '@/components/ProductCard';
import SafeImage from '@/components/SafeImage';
import { getFeaturedProducts } from '@/lib/data';
import Link from 'next/link';

export default function Home() {
    const featuredProducts = getFeaturedProducts();
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '971561510897';
    const whatsappUrl = `https://wa.me/${whatsappNumber}`;

    return (
        <>
            {/* Hero Carousel */}
            <HeroCarousel />

            {/* Three CTA Cards */}
            <section className="section-luxury bg-base">
                <div className="mx-auto max-w-9xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Design Your Own */}
                        <Link href="/design" className="group card-luxury p-12 text-center">
                            <div className="mb-6 flex justify-center">
                                <div className="w-20 h-20 flex items-center justify-center card-icon-circle">
                                    <svg className="w-10 h-10 text-fg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="font-serif text-h4 mb-4 text-fg">Design Your Own</h3>
                            <p className="leading-relaxed text-fg-muted">
                                Create a one-of-a-kind piece with our interactive configurator. Choose your metal, stones, and personalization.
                            </p>
                        </Link>

                        {/* Custom Consultation */}
                        <Link href="/custom" className="group card-luxury p-12 text-center">
                            <div className="mb-6 flex justify-center">
                                <div className="w-20 h-20 flex items-center justify-center card-icon-circle">
                                    <svg className="w-10 h-10 text-fg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="font-serif text-h4 mb-4 text-fg">Custom Consultation</h3>
                            <p className="leading-relaxed text-fg-muted">
                                Work directly with our artisans. Bring your vision to life with complete customization and expert guidance.
                            </p>
                        </Link>

                        {/* Affordable CVD */}
                        <Link href="/collections/affordable-cvd" className="group card-luxury p-12 text-center">
                            <div className="mb-6 flex justify-center">
                                <div className="w-20 h-20 flex items-center justify-center card-icon-circle">
                                    <svg className="w-10 h-10 text-fg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="font-serif text-h4 mb-4 text-fg">Affordable Silk Rope CVD</h3>
                            <p className="leading-relaxed text-fg-muted">
                                Premium lab-grown diamonds on silk rope. Unique, sustainable, and accessible luxury for everyday wear.
                            </p>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="section-luxury bg-elevated">
                <div className="mx-auto max-w-9xl px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-h2 mb-4 text-fg">Featured Collection</h2>
                        <p className="text-lg max-w-2xl mx-auto text-fg-muted">
                            Handpicked pieces that showcase our craftsmanship and design excellence
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.slice(0, 4).map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Link href="/shop" className="btn-primary">
                            View All Collections
                        </Link>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="section-luxury" style={{ backgroundColor: 'var(--bg)' }}>
                <div className="mx-auto max-w-9xl px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-h2 mb-4" style={{ color: 'var(--fg)' }}>How Custom Works</h2>
                        <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--fg-muted)' }}>
                            From concept to creation, we guide you through every step
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                        <div className="text-center">
                            <div className="mb-6 flex justify-center">
                                <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-serif font-semibold" style={{
                                    backgroundColor: 'var(--gold)',
                                    color: 'var(--bg)'
                                }}>
                                    1
                                </div>
                            </div>
                            <h3 className="font-serif text-h4 mb-3" style={{ color: 'var(--fg)' }}>Consultation</h3>
                            <p className="leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                                Share your vision via WhatsApp, in-person, or our online configurator. We discuss design, materials, and budget.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="mb-6 flex justify-center">
                                <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-serif font-semibold" style={{
                                    backgroundColor: 'var(--gold)',
                                    color: 'var(--bg)'
                                }}>
                                    2
                                </div>
                            </div>
                            <h3 className="font-serif text-h4 mb-3" style={{ color: 'var(--fg)' }}>Design & Approval</h3>
                            <p className="leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                                We create detailed renderings and provide transparent pricing. You approve every detail before production begins.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="mb-6 flex justify-center">
                                <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-serif font-semibold" style={{
                                    backgroundColor: 'var(--gold)',
                                    color: 'var(--bg)'
                                }}>
                                    3
                                </div>
                            </div>
                            <h3 className="font-serif text-h4 mb-3" style={{ color: 'var(--fg)' }}>Crafting & Delivery</h3>
                            <p className="leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                                Our artisans handcraft your piece with precision. Typical lead time: 7-21 days depending on complexity.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Collections Grid */}
            <section className="section-luxury" style={{ backgroundColor: 'var(--bg-elevated)' }}>
                <div className="mx-auto max-w-9xl px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-h2 mb-4" style={{ color: 'var(--fg)' }}>Explore Collections</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Link href="/collections/for-her" className="group relative h-80 overflow-hidden">
                            <SafeImage
                                src="/images/products/her-hoops-1.jpg"
                                alt="For Her"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/0 flex items-end p-8">
                                <h3 className="font-serif text-h3" style={{ color: 'var(--fg)' }}>For Her</h3>
                            </div>
                        </Link>

                        <Link href="/collections/for-him" className="group relative h-80 overflow-hidden">
                            <SafeImage
                                src="/images/products/him-anchor-1.jpg"
                                alt="For Him"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/0 flex items-end p-8">
                                <h3 className="font-serif text-h3" style={{ color: 'var(--fg)' }}>For Him</h3>
                            </div>
                        </Link>

                        <Link href="/collections/affordable-cvd" className="group relative h-80 overflow-hidden">
                            <SafeImage
                                src="/images/products/rope-necklace-navy-1.jpg"
                                alt="Affordable CVD Silk Rope"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/0 flex items-end p-8">
                                <h3 className="font-serif text-h3" style={{ color: 'var(--fg)' }}>Affordable CVD</h3>
                            </div>
                        </Link>

                        <Link href="/collections/natural-diamonds" className="group relative h-80 overflow-hidden">
                            <SafeImage
                                src="/images/products/nat-solitaire-1.jpg"
                                alt="Natural Diamonds"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/0 flex items-end p-8">
                                <h3 className="font-serif text-h3" style={{ color: 'var(--fg)' }}>Natural Diamonds</h3>
                            </div>
                        </Link>

                        <Link href="/gemstones" className="group relative h-80 overflow-hidden">
                            <SafeImage
                                src="/images/products/rope-ring-emerald-1.jpg"
                                alt="Gemstones"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/0 flex items-end p-8">
                                <h3 className="font-serif text-h3" style={{ color: 'var(--fg)' }}>Gemstones</h3>
                            </div>
                        </Link>

                        <Link href="/custom" className="group relative h-80 overflow-hidden">
                            <SafeImage
                                src="/images/products/custom-name-1.jpg"
                                alt="Custom & Personalized"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/0 flex items-end p-8">
                                <h3 className="font-serif text-h3" style={{ color: 'var(--fg)' }}>Custom & Personalized</h3>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Trust Block */}
            <section className="section-luxury" style={{ backgroundColor: 'var(--bg)' }}>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div>
                            <h3 className="font-serif text-h4 mb-3" style={{ color: 'var(--fg)' }}>Certified Sourcing</h3>
                            <p className="leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                                All diamonds and gemstones are ethically sourced with full certification and transparency.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-serif text-h4 mb-3" style={{ color: 'var(--fg)' }}>Lab-Grown Options</h3>
                            <p className="leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                                Sustainable CVD diamonds with identical quality to natural stones at accessible prices.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-serif text-h4 mb-3" style={{ color: 'var(--fg)' }}>Made-to-Order</h3>
                            <p className="leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                                Each piece is crafted specifically for you by skilled artisans in our Dubai workshop.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Strip */}
            <section className="py-12" style={{ backgroundColor: 'var(--gold)' }}>
                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <h3 className="font-serif text-h3 mb-6" style={{ color: 'var(--bg)' }}>Ready to Create Your Unique Piece?</h3>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                            Contact via WhatsApp
                        </a>
                        <Link href="/contact" className="btn-secondary" style={{ borderColor: 'var(--bg)', color: 'var(--bg)' }}>
                            Book Consultation
                        </Link>
                    </div>
                    <p className="mt-6 text-sm" style={{ color: 'rgba(7,7,7,0.8)' }}>
                        UAE – Gold & Diamond Park, Dubai • +971 56 151 0897
                    </p>
                </div>
            </section>
        </>
    );
}
