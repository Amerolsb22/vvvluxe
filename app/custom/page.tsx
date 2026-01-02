import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
    title: 'Custom & Personalized Jewelry | VVV Luxe',
    description: 'Completely bespoke jewelry creations. Work directly with our master artisans in Dubai to bring your unique vision to life.',
};

export default function CustomPage() {
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '971561510897';
    const whatsappMessage = 'Hi VVV Luxe, I would like to discuss a custom jewelry project.';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <div className="bg-luxury-white">
            {/* Hero */}
            <section className="relative h-[60vh] flex items-center justify-center bg-luxury-warm-gray-100">
                <div className="absolute inset-0 bg-gradient-to-b from-luxury-black/40 to-luxury-black/60 z-10" />
                <Image
                    src="/images/hero/custom-hero.jpg"
                    alt="Custom Jewelry"
                    fill
                    className="object-cover"
                    sizes="100vw"
                />
                <div className="relative z-20 text-center text-luxury-white px-6 max-w-4xl mx-auto">
                    <h1 className="font-serif text-display mb-6">Custom & Personalized</h1>
                    <p className="text-xl md:text-2xl text-luxury-warm-gray-100">
                        Your imagination. Our craftsmanship. Completely bespoke jewelry.
                    </p>
                </div>
            </section>

            {/* How Custom Works */}
            <section className="section-luxury">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-h2 mb-4">The Custom Process</h2>
                        <p className="text-lg text-luxury-warm-gray-600 max-w-3xl mx-auto">
                            From initial concept to final masterpiece, we guide you through every step
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-luxury-black text-luxury-white flex items-center justify-center font-serif text-2xl">
                                1
                            </div>
                            <h3 className="font-serif text-h5 mb-3">Initial Consultation</h3>
                            <p className="text-sm text-luxury-warm-gray-600 leading-relaxed">
                                Share your vision via WhatsApp, email, or in-person. Bring reference images, sketches, or simply describe your idea.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-luxury-black text-luxury-white flex items-center justify-center font-serif text-2xl">
                                2
                            </div>
                            <h3 className="font-serif text-h5 mb-3">Design & CAD</h3>
                            <p className="text-sm text-luxury-warm-gray-600 leading-relaxed">
                                Our designers create detailed 3D CAD renderings. Review from every angle, request revisions until perfect.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-luxury-black text-luxury-white flex items-center justify-center font-serif text-2xl">
                                3
                            </div>
                            <h3 className="font-serif text-h5 mb-3">Approval & Pricing</h3>
                            <p className="text-sm text-luxury-warm-gray-600 leading-relaxed">
                                Receive transparent pricing breakdown. Approve final design and materials before production begins.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-luxury-black text-luxury-white flex items-center justify-center font-serif text-2xl">
                                4
                            </div>
                            <h3 className="font-serif text-h5 mb-3">Handcrafting</h3>
                            <p className="text-sm text-luxury-warm-gray-600 leading-relaxed">
                                Master artisans bring your piece to life in our Dubai workshop. Typical timeline: 21-35 days.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* What We Can Create */}
            <section className="section-luxury bg-luxury-warm-gray-50">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-h2 mb-4">What We Can Create</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Name & Initial Jewelry',
                                description: 'Personalized necklaces, rings, bracelets with your name, initials, or meaningful words in various fonts and styles.',
                            },
                            {
                                title: 'Birthstone Pieces',
                                description: 'Family birthstone jewelry representing your loved ones. Mothers rings, bracelets, and pendants.',
                            },
                            {
                                title: 'Engraved Messages',
                                description: 'Hidden messages, coordinates, dates, or quotes engraved inside bands, on pendants, or bracelet bars.',
                            },
                            {
                                title: 'Photo Lockets',
                                description: 'Classic lockets customized with diamonds, gemstones, and your cherished photos.',
                            },
                            {
                                title: 'Reimagined Heirlooms',
                                description: 'Transform inherited jewelry into modern pieces while preserving sentimental stones.',
                            },
                            {
                                title: 'Completely Unique Designs',
                                description: 'Sketch it, dream it, describe it - we\'ll create it. No idea is too ambitious.',
                            },
                        ].map((item, idx) => (
                            <div key={idx} className="card-luxury p-8">
                                <h3 className="font-serif text-h5 mb-3">{item.title}</h3>
                                <p className="text-sm text-luxury-warm-gray-600 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Upload Reference Images Section */}
            <section className="section-luxury">
                <div className="mx-auto max-w-3xl px-6 lg:px-8">
                    <div className="card-luxury p-12 text-center">
                        <h2 className="font-serif text-h2 mb-4">Start Your Custom Project</h2>
                        <p className="text-luxury-warm-gray-600 mb-8">
                            Share your inspiration images, sketches, or existing pieces you'd like to recreate or modify.
                        </p>

                        <div className="border-2 border-dashed border-luxury-warm-gray-300 p-12 mb-6">
                            <svg className="w-16 h-16 mx-auto mb-4 text-luxury-warm-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                            <p className="text-sm text-luxury-warm-gray-600 mb-3">
                                Drag & drop images or click to browse
                            </p>
                            <p className="text-xs text-luxury-warm-gray-500">
                                JPG, PNG up to 10MB each (placeholder - implement file upload)
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/contact?service=custom" className="btn-primary">
                                Submit Custom Request
                            </Link>
                            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-gold">
                                Discuss on WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us for Custom */}
            <section className="section-luxury bg-luxury-black text-luxury-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div>
                            <h3 className="font-serif text-h4 mb-3">Master Artisans</h3>
                            <p className="text-luxury-warm-gray-300 leading-relaxed">
                                Decades of combined experience in fine jewelry craftsmanship based in Dubai's Gold & Diamond Park.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-serif text-h4 mb-3">Full Transparency</h3>
                            <p className="text-luxury-warm-gray-300 leading-relaxed">
                                No hidden costs. You approve every detail and price before we begin production.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-serif text-h4 mb-3">Unlimited Revisions</h3>
                            <p className="text-luxury-warm-gray-300 leading-relaxed">
                                We refine the design until it's exactly what you envisioned. Your satisfaction guaranteed.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
