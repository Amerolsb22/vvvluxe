'use client';

import { getProductBySlug } from '@/lib/data';
import { useCartStore } from '@/lib/cartStore';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useState } from 'react';

interface ProductPageProps {
    params: {
        slug: string;
    };
}

export default function ProductPage({ params }: ProductPageProps) {
    const product = getProductBySlug(params.slug);

    if (!product) {
        notFound();
    }

    const [selectedSize, setSelectedSize] = useState(product.specifications.sizes?.[0] || '');
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);
    const addItem = useCartStore((state) => state.addItem);

    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '971561510897';
    const whatsappMessage = encodeURIComponent(
        `Hi VVV Luxe, I'm interested in ${product.name} (${product.id}). Can we discuss?`
    );
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-AE', {
            style: 'currency',
            currency: 'AED',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const handleAddToCart = () => {
        setIsAdding(true);
        const selectedOptions = selectedSize ? { size: selectedSize } : undefined;
        addItem(product, quantity, selectedOptions);
        setTimeout(() => setIsAdding(false), 1500);
    };

    // JSON-LD schemas
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vvvluxe.com';

    const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: product.images,
        brand: {
            '@type': 'Brand',
            name: 'VVV Luxe',
        },
        offers: {
            '@type': 'Offer',
            price: product.price,
            priceCurrency: 'AED',
            availability: product.specifications.availability === 'Ready to Ship'
                ? 'https://schema.org/InStock'
                : 'https://schema.org/PreOrder',
            url: `${baseUrl}/products/${params.slug}`,
        },
        material: product.materials.metal,
        category: product.collection,
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: baseUrl,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Shop',
                item: `${baseUrl}/shop`,
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: product.collection,
                item: `${baseUrl}/collections/${product.collection.toLowerCase().replace(/ /g, '-')}`,
            },
            {
                '@type': 'ListItem',
                position: 4,
                name: product.name,
                item: `${baseUrl}/products/${params.slug}`,
            },
        ],
    };

    return (
        <div className="bg-luxury-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            {/* Breadcrumb */}
            <div className="mx-auto max-w-9xl px-6 lg:px-8 py-6">
                <nav className="flex text-sm text-luxury-warm-gray-600">
                    <Link href="/" className="link-underline">Home</Link>
                    <span className="mx-2">/</span>
                    <Link href="/shop" className="link-underline">Shop</Link>
                    <span className="mx-2">/</span>
                    <Link href={`/collections/${product.collection.toLowerCase().replace(/ /g, '-')}`} className="link-underline">
                        {product.collection}
                    </Link>
                    <span className="mx-2">/</span>
                    <span className="text-luxury-black">{product.name}</span>
                </nav>
            </div>

            {/* Product Details */}
            <section className="mx-auto max-w-9xl px-6 lg:px-8 py-12">
                <div className="lg:grid lg:grid-cols-2 lg:gap-16">
                    {/* Images */}
                    <div>
                        <div className="relative aspect-square bg-luxury-warm-gray-100 mb-4">
                            <Image
                                src={product.images[selectedImage]}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                priority
                            />
                        </div>
                        {product.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`relative aspect-square bg-luxury-warm-gray-100 ${selectedImage === idx ? 'ring-2 ring-luxury-black' : ''
                                            }`}
                                    >
                                        <Image
                                            src={img}
                                            alt={`${product.name} view ${idx + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="25vw"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Details */}
                    <div>
                        <div className="mb-4">
                            <span className="text-sm text-luxury-warm-gray-500 uppercase tracking-wider">
                                {product.collection}
                            </span>
                        </div>

                        <h1 className="font-serif text-h2 mb-4">{product.name}</h1>

                        <div className="mb-6">
                            <p className="text-3xl font-medium">{formatPrice(product.price)}</p>
                        </div>

                        <p className="text-luxury-warm-gray-700 leading-relaxed mb-8">
                            {product.description}
                        </p>

                        {/* Materials & Specifications */}
                        <div className="border-t border-b border-luxury-warm-gray-200 py-6 mb-8 space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-luxury-warm-gray-600">Metal:</span>
                                <span className="font-medium">{product.materials.metal}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-luxury-warm-gray-600">Gold Weight:</span>
                                <span className="font-medium">{product.materials.metalWeight}g</span>
                            </div>
                            {product.materials.stones && product.materials.stones.length > 0 && (
                                <>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-luxury-warm-gray-600">Stone Type:</span>
                                        <span className="font-medium">{product.materials.stones[0].type}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-luxury-warm-gray-600">Total Carats:</span>
                                        <span className="font-medium">
                                            {product.materials.stones.reduce((sum, s) => sum + s.caratWeight * s.quantity, 0).toFixed(2)}ct
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-luxury-warm-gray-600">Shape:</span>
                                        <span className="font-medium">{product.materials.stones[0].shape}</span>
                                    </div>
                                    {product.materials.stones[0].clarity && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-luxury-warm-gray-600">Clarity:</span>
                                            <span className="font-medium">{product.materials.stones[0].clarity}</span>
                                        </div>
                                    )}
                                </>
                            )}
                            {product.materials.ropeColor && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-luxury-warm-gray-600">Rope Color:</span>
                                    <span className="font-medium">{product.materials.ropeColor}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-sm">
                                <span className="text-luxury-warm-gray-600">Lead Time:</span>
                                <span className="font-medium">{product.specifications.leadTimeDays} days</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-luxury-warm-gray-600">Availability:</span>
                                <span className="font-medium">{product.specifications.availability}</span>
                            </div>
                        </div>

                        {/* Size Selection */}
                        {product.specifications.sizes && product.specifications.sizes.length > 0 && (
                            <div className="mb-8">
                                <label className="block text-sm font-medium mb-3">Select Size</label>
                                <div className="flex flex-wrap gap-2">
                                    {product.specifications.sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`px-4 py-2 border ${selectedSize === size
                                                    ? 'border-luxury-black bg-luxury-black text-luxury-white'
                                                    : 'border-luxury-warm-gray-300 hover:border-luxury-black'
                                                } transition-colors text-sm`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* CTAs */}
                        <div className="space-y-4 mb-8">
                            {/* Quantity Selector */}
                            <div className="flex items-center gap-4 mb-4">
                                <label className="text-sm font-medium">Quantity:</label>
                                <div className="flex items-center border border-luxury-warm-gray-300">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-3 py-2 hover:bg-luxury-warm-gray-100"
                                    >
                                        -
                                    </button>
                                    <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(Math.min(10, quantity + 1))}
                                        className="px-3 py-2 hover:bg-luxury-warm-gray-100"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Add to Cart Button */}
                            <button
                                onClick={handleAddToCart}
                                disabled={isAdding}
                                className="btn-primary w-full text-center block"
                                style={{
                                    backgroundColor: isAdding ? 'var(--gold-bright)' : 'var(--gold)',
                                    color: 'var(--bg)',
                                    opacity: isAdding ? 0.8 : 1
                                }}
                            >
                                {isAdding ? 'ADDED TO CART ✓' : 'ADD TO CART'}
                            </button>

                            {/* Buy Now Button */}
                            <button
                                onClick={async () => {
                                    try {
                                        const response = await fetch('/api/checkout', {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({
                                                items: [{
                                                    productId: product.id,
                                                    name: product.name,
                                                    price: product.price,
                                                    quantity: 1,
                                                    image: product.images[0],
                                                    description: product.description,
                                                }],
                                            }),
                                        });
                                        const data = await response.json();
                                        if (data.success && data.url) {
                                            window.location.href = data.url;
                                        } else {
                                            alert('Checkout error. Please try again or contact us.');
                                        }
                                    } catch (error) {
                                        console.error('Checkout error:', error);
                                        alert('Checkout error. Please try again or contact us.');
                                    }
                                }}
                                className="btn-secondary w-full text-center block"
                            >
                                Buy Now (Direct Checkout)
                            </button>
                            {product.specifications.customizable && (
                                <Link href={`/design?productId=${product.id}`} className="btn-primary w-full text-center block">
                                    Customize This Design
                                </Link>
                            )}
                            <Link href={`/contact?productId=${product.id}&type=quote`} className="btn-secondary w-full text-center block">
                                Request Quote
                            </Link>
                            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary w-full text-center block">
                                WhatsApp Consultation
                            </a>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-3 gap-4 text-center text-xs text-luxury-warm-gray-600 pt-8 border-t">
                            <div>
                                <div className="font-medium text-luxury-black mb-1">Certified</div>
                                <div>Sourcing</div>
                            </div>
                            <div>
                                <div className="font-medium text-luxury-black mb-1">Made-to-Order</div>
                                <div>Quality</div>
                            </div>
                            <div>
                                <div className="font-medium text-luxury-black mb-1">Free</div>
                                <div>Consultation</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Additional Information Tabs */}
            <section className="mx-auto max-w-9xl px-6 lg:px-8 py-16 border-t border-luxury-warm-gray-200">
                <div className="max-w-4xl">
                    <div className="space-y-8">
                        <div>
                            <h2 className="font-serif text-h4 mb-4">Materials & Craft</h2>
                            <p className="text-luxury-warm-gray-700 leading-relaxed">
                                This piece is handcrafted in our Dubai workshop using {product.materials.metal} and
                                {product.materials.stones ? ` ${product.materials.stones[0].type}` : ' premium materials'}.
                                Each piece is made-to-order, ensuring exceptional quality and personalization.
                                {product.materials.ropeColor && ` The silk rope is carefully selected in ${product.materials.ropeColor} to complement the design.`}
                            </p>
                        </div>

                        <div>
                            <h2 className="font-serif text-h4 mb-4">Sizing Guide</h2>
                            <p className="text-luxury-warm-gray-700 leading-relaxed">
                                Not sure about your size? We offer complimentary sizing consultations. Contact us via WhatsApp
                                or visit our showroom at Gold & Diamond Park, Dubai. For rings, we recommend visiting for
                                professional sizing to ensure perfect fit.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-serif text-h4 mb-4">Shipping & Returns</h2>
                            <p className="text-luxury-warm-gray-700 leading-relaxed">
                                Free shipping within UAE. International shipping available. As each piece is made-to-order,
                                we work closely with you during the design phase to ensure complete satisfaction. Returns
                                accepted within 14 days for ready-to-ship items.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-serif text-h4 mb-4">Care Guide</h2>
                            <p className="text-luxury-warm-gray-700 leading-relaxed">
                                Store in provided jewelry box when not wearing. Clean gently with soft cloth. For diamond pieces,
                                professional cleaning recommended annually. Avoid contact with chemicals and remove before swimming
                                or exercising. {product.materials.ropeColor && 'Silk rope should be kept dry and stored flat.'}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
