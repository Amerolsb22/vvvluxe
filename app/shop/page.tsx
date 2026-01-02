import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
    title: 'Shop Collections | VVV Luxe',
    description: 'Browse our curated collections of custom jewelry, affordable CVD diamonds, natural diamonds, and rare gemstones.',
};

const collections = [
    {
        name: 'For Her',
        href: '/collections/for-her',
        description: 'Elegant pieces designed for women. Rings, necklaces, bracelets, and earrings.',
        image: '/images/products/her-hoops-1.jpg',
    },
    {
        name: 'For Him',
        href: '/collections/for-him',
        description: 'Bold and refined jewelry for men. Bracelets, rings, pendants, and chains.',
        image: '/images/products/him-anchor-1.jpg',
    },
    {
        name: 'Affordable CVD Silk Rope',
        href: '/collections/affordable-cvd',
        description: 'Our signature collection: lab-grown diamonds on premium silk cord. Unique and accessible luxury.',
        image: '/images/products/rope-necklace-navy-1.jpg',
        featured: true,
    },
    {
        name: 'Natural Diamond Jewelry',
        href: '/collections/natural-diamonds',
        description: 'Certified natural diamonds. Engagement rings, luxury pieces, and timeless classics.',
        image: '/images/products/nat-solitaire-1.jpg',
    },
    {
        name: 'Gemstone Pieces',
        href: '/gemstones',
        description: 'Rare and certified loose gemstones. Sapphires, rubies, emeralds, and more.',
        image: '/images/products/rope-ring-emerald-1.jpg',
    },
    {
        name: 'Custom & Personalized',
        href: '/custom',
        description: 'Completely bespoke creations. Work directly with our artisans to bring your vision to life.',
        image: '/images/products/custom-name-1.jpg',
        featured: true,
    },
];

export default function ShopPage() {
    return (
        <>
            {/* Header */}
            <section className="bg-luxury-black text-luxury-white py-20">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <h1 className="font-serif text-h1 mb-6">Our Collections</h1>
                    <p className="text-xl text-luxury-warm-gray-300 max-w-3xl mx-auto">
                        Explore our curated selection of fine jewelry. Each collection represents our commitment to craftsmanship, quality, and unique design.
                    </p>
                </div>
            </section>

            {/* Collections Grid */}
            <section className="section-luxury bg-luxury-white">
                <div className="mx-auto max-w-9xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {collections.map((collection) => (
                            <Link
                                key={collection.name}
                                href={collection.href}
                                className="group card-luxury overflow-hidden"
                            >
                                <div className="relative h-80 overflow-hidden">
                                    <Image
                                        src={collection.image}
                                        alt={collection.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    {collection.featured && (
                                        <div className="absolute top-4 right-4 bg-luxury-gold px-3 py-1 text-xs font-medium tracking-wide">
                                            FEATURED
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/80 to-luxury-black/0 flex items-end p-8">
                                        <h2 className="font-serif text-h3 text-luxury-white">
                                            {collection.name}
                                        </h2>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <p className="text-luxury-warm-gray-600 leading-relaxed mb-4">
                                        {collection.description}
                                    </p>
                                    <span className="inline-flex items-center text-sm font-medium text-luxury-black group-hover:text-luxury-gold transition-colors">
                                        Explore Collection
                                        <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                        </svg>
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Design Your Own CTA */}
            <section className="section-luxury bg-luxury-warm-gray-100">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <h2 className="font-serif text-h2 mb-6">Can't Find What You're Looking For?</h2>
                    <p className="text-lg text-luxury-warm-gray-600 mb-8 max-w-2xl mx-auto">
                        Use our interactive configurator to design your perfect piece, or contact us for a fully custom creation.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/design" className="btn-primary">
                            Design Your Own Jewelry
                        </Link>
                        <Link href="/contact" className="btn-secondary">
                            Request Custom Quote
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
