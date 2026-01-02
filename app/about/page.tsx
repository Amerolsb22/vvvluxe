export default function AboutPage() {
    return (
        <div className="bg-luxury-white">
            {/* Hero */}
            <section className="bg-luxury-black text-luxury-white py-20">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <h1 className="font-serif text-h1 mb-6">About VVV Luxe</h1>
                    <p className="text-xl text-luxury-warm-gray-300 max-w-3xl mx-auto">
                        Quiet luxury. Honest craftsmanship. Dubai heritage.
                    </p>
                </div>
            </section>

            {/* Story */}
            <section className="section-luxury">
                <div className="mx-auto max-w-4xl px-6 lg:px-8">
                    <div className="prose prose-lg max-w-none">
                        <p className="text-luxury-warm-gray-700 leading-relaxed mb-6">
                            VVV Luxe was born from a simple belief: luxury jewelry should be accessible,
                            transparent, and deeply personal. Founded in Dubai's renowned Gold & Diamond Park,
                            we blend traditional goldsmithing expertise with modern innovation.
                        </p>
                        <p className="text-luxury-warm-gray-700 leading-relaxed mb-6">
                            Our three product lines reflect this philosophy: the <strong>Affordable CVD Silk Rope Collection</strong> makes
                            diamond jewelry attainable for everyday luxury; our <strong>Natural Diamond Pieces</strong> showcase ethically
                            sourced stones in timeless designs; and our <strong>Custom & Personalized Service</strong> brings your
                            unique visions to life.
                        </p>
                        <p className="text-luxury-warm-gray-700 leading-relaxed">
                            We believe in quiet luxury—no flashy branding, no excessive packaging. Just exceptional
                            materials, honest pricing, and craftsmanship you can see and feel.
                        </p>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section-luxury bg-luxury-warm-gray-50">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h2 className="font-serif text-h2 text-center mb-16">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-luxury-gold flex items-center justify-center">
                                <svg className="w-8 h-8 text-luxury-black" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </div>
                            <h3 className="font-serif text-h4 mb-3">Transparency</h3>
                            <p className="text-luxury-warm-gray-600">
                                Full pricing breakdowns. No hidden costs. You know exactly what you're paying for.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-luxury-gold flex items-center justify-center">
                                <svg className="w-8 h-8 text-luxury-black" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>
                            </div>
                            <h3 className="font-serif text-h4 mb-3">Craftsmanship</h3>
                            <p className="text-luxury-warm-gray-600">
                                Master artisans with decades of experience. Every piece handmade in Dubai.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-luxury-gold flex items-center justify-center">
                                <svg className="w-8 h-8 text-luxury-black" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                                </svg>
                            </div>
                            <h3 className="font-serif text-h4 mb-3">Sustainability</h3>
                            <p className="text-luxury-warm-gray-600">
                                Ethically sourced materials. Lab-grown diamonds for affordable luxury without compromise.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Location */}
            <section className="section-luxury">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="font-serif text-h2 mb-6">Visit Our Showroom</h2>
                            <p className="text-luxury-warm-gray-700 mb-6 leading-relaxed">
                                Located in Dubai's prestigious Gold & Diamond Park, our showroom showcases
                                our full collection. Book an appointment to discuss custom projects, view
                                loose gemstones, or simply explore.
                            </p>
                            <div className="space-y-4 mb-8">
                                <div className="flex items-start">
                                    <svg className="w-6 h-6 text-luxury-gold mr-3 mt-1" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                    </svg>
                                    <div>
                                        <p className="font-medium">Gold & Diamond Park</p>
                                        <p className="text-sm text-luxury-warm-gray-600">Dubai, United Arab Emirates</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <svg className="w-6 h-6 text-luxury-gold mr-3 mt-1" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                    </svg>
                                    <div>
                                        <p className="font-medium">+971 56 151 0897</p>
                                        <p className="text-sm text-luxury-warm-gray-600">WhatsApp & Calls</p>
                                    </div>
                                </div>
                            </div>
                            <a href={`https://wa.me/971561510897?text=${encodeURIComponent("Hi VVV Luxe, I'd like to schedule a showroom visit.")}`} target="_blank" rel="noopener noreferrer" className="btn-primary inline-block">
                                Book Appointment
                            </a>
                        </div>

                        <div className="h-96 bg-luxury-warm-gray-200 rounded">
                            {/* TODO: Replace with actual map embed (Google Maps iframe) */}
                            <div className="h-full flex items-center justify-center text-luxury-warm-gray-500">
                                <div className="text-center">
                                    <svg className="w-16 h-16 mx-auto mb-2" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                    </svg>
                                    <p>Map Placeholder</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
