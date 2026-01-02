import { gemstones } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
    title: 'Certified Loose Gemstones | VVV Luxe Dubai',
    description: 'Browse our collection of rare, certified loose gemstones. Sapphires, rubies, emeralds, and more. Perfect for custom jewelry projects.',
};

export default function GemstonesPage() {
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '971561510897';

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-AE', {
            style: 'currency',
            currency: 'AED',
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className="bg-luxury-white">
            {/* Header */}
            <section className="bg-luxury-black text-luxury-white py-20">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <h1 className="font-serif text-h1 mb-6">Certified Loose Gemstones</h1>
                    <p className="text-xl text-luxury-warm-gray-300 max-w-3xl mx-auto">
                        Rare, certified gemstones sourced globally. Perfect for custom creations or investment.
                    </p>
                </div>
            </section>

            {/* Gemstones Grid */}
            <section className="section-luxury">
                <div className="mx-auto max-w-9xl px-6 lg:px-8">
                    <div className="mb-12">
                        <p className="text-luxury-warm-gray-600 mb-4">
                            All gemstones are certified with detailed grading reports. Contact us for inquiries or to schedule a viewing.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {gemstones.map((gem) => {
                            const whatsappMsg = encodeURIComponent(`Hi VVV Luxe, I'm interested in ${gem.name} (${gem.id}). Can we discuss?`);
                            const gemWhatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;

                            return (
                                <div key={gem.id} className="card-luxury overflow-hidden">
                                    <div className="relative aspect-square bg-luxury-warm-gray-100">
                                        <Image
                                            src={gem.images[0]}
                                            alt={gem.name}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        />
                                        {gem.certified && (
                                            <div className="absolute top-4 right-4 bg-luxury-gold px-3 py-1 text-xs font-medium tracking-wide">
                                                CERTIFIED
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-6">
                                        <div className="mb-2">
                                            <span className="text-xs text-luxury-warm-gray-500 uppercase tracking-wider">
                                                {gem.type}
                                            </span>
                                        </div>

                                        <h3 className="font-serif text-lg mb-3">{gem.name}</h3>

                                        <dl className="space-y-2 text-sm mb-4">
                                            <div className="flex justify-between">
                                                <dt className="text-luxury-warm-gray-600">Shape:</dt>
                                                <dd className="font-medium">{gem.shape}</dd>
                                            </div>
                                            <div className="flex justify-between">
                                                <dt className="text-luxury-warm-gray-600">Carat:</dt>
                                                <dd className="font-medium">{gem.caratWeight}ct</dd>
                                            </div>
                                            <div className="flex justify-between">
                                                <dt className="text-luxury-warm-gray-600">Color:</dt>
                                                <dd className="font-medium">{gem.color}</dd>
                                            </div>
                                            <div className="flex justify-between">
                                                <dt className="text-luxury-warm-gray-600">Clarity:</dt>
                                                <dd className="font-medium">{gem.clarity}</dd>
                                            </div>
                                            <div className="flex justify-between">
                                                <dt className="text-luxury-warm-gray-600">Origin:</dt>
                                                <dd className="font-medium">{gem.origin}</dd>
                                            </div>
                                        </dl>

                                        <div className="pt-4 border-t border-luxury-warm-gray-200 mb-4">
                                            <p className="font-serif text-2xl mb-1">{formatPrice(gem.price)}</p>
                                            {gem.certificateNumber && (
                                                <p className="text-xs text-luxury-warm-gray-500">
                                                    Cert: {gem.certificateNumber}
                                                </p>
                                            )}
                                        </div>

                                        <a
                                            href={gemWhatsappUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-secondary text-sm w-full text-center block"
                                        >
                                            Inquire via WhatsApp
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Info Section */}
            <section className="section-luxury bg-luxury-warm-gray-50">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="font-serif text-h3 mb-4">Why Buy Loose Gemstones?</h2>
                            <div className="space-y-4 text-luxury-warm-gray-700">
                                <p>
                                    Purchasing loose gemstones gives you complete control over your jewelry design.
                                    Choose the exact stone that speaks to you, then work with our artisans to create
                                    a custom setting that showcases its beauty perfectly.
                                </p>
                                <p>
                                    All our gemstones come with certification from recognized laboratories (GIA, GRS, etc.),
                                    ensuring authenticity and providing detailed grading information.
                                </p>
                            </div>
                        </div>

                        <div>
                            <h2 className="font-serif text-h3 mb-4">Gemstone Services</h2>
                            <ul className="space-y-3 text-luxury-warm-gray-700">
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-luxury-gold mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Custom setting design and fabrication</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-luxury-gold mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Gemstone sourcing for specific requests</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-luxury-gold mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>In-person viewing at our Dubai showroom</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-luxury-gold mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Expert consultation on gemstone selection</span>
                                </li>
                            </ul>

                            <Link href="/contact" className="btn-primary mt-8 inline-block">
                                Schedule Gemstone Consultation
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
