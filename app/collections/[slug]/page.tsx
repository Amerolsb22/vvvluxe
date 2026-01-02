'use client';

import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/data';
import { Availability, MetalType, ProductType, StoneType } from '@/types';
import { useMemo, useState } from 'react';

interface CollectionPageProps {
    params: {
        slug: string;
    };
}

const collectionMap: Record<string, { title: string; description: string; filterKey: 'collection' | 'category' }> = {
    'for-her': {
        title: 'For Her',
        description: 'Elegant jewelry designed for women. From everyday pieces to statement luxury.',
        filterKey: 'category',
    },
    'for-him': {
        title: 'For Him',
        description: 'Bold and refined jewelry for men. Sophisticated designs crafted with precision.',
        filterKey: 'category',
    },
    'affordable-cvd': {
        title: 'Affordable CVD Silk Rope Collection',
        description: 'Our signature line: lab-grown diamonds on premium silk cord. Unique, sustainable, and accessible luxury.',
        filterKey: 'collection',
    },
    'natural-diamonds': {
        title: 'Natural Diamond Collection',
        description: 'Certified natural diamonds. Timeless elegance and investment-grade quality.',
        filterKey: 'collection',
    },
};

export default function CollectionPage({ params }: CollectionPageProps) {
    const collectionData = collectionMap[params.slug];

    const [filters, setFilters] = useState({
        priceRange: 'all' as 'all' | 'under-2000' | '2000-5000' | '5000-10000' | 'over-10000',
        metal: 'all' as 'all' | MetalType,
        stoneType: 'all' as 'all' | StoneType,
        productType: 'all' as 'all' | ProductType,
        availability: 'all' as 'all' | Availability,
    });

    const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');

    // Breadcrumb schema
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vvvluxe.com';

    const breadcrumbSchema = collectionData ? {
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
                name: collectionData.title,
                item: `${baseUrl}/collections/${params.slug}`,
            },
        ],
    } : null;

    // Filter products
    const filteredProducts = useMemo(() => {
        let filtered = products;

        // Apply collection/category filter
        if (collectionData) {
            if (collectionData.filterKey === 'collection') {
                filtered = filtered.filter(p => p.collection === collectionData.title);
            } else {
                const categoryValue = collectionData.title === 'For Her' ? 'For Her' : 'For Him';
                filtered = filtered.filter(p => p.category === categoryValue);
            }
        }

        // Price range
        if (filters.priceRange !== 'all') {
            filtered = filtered.filter(p => {
                if (filters.priceRange === 'under-2000') return p.price < 2000;
                if (filters.priceRange === '2000-5000') return p.price >= 2000 && p.price < 5000;
                if (filters.priceRange === '5000-10000') return p.price >= 5000 && p.price < 10000;
                if (filters.priceRange === 'over-10000') return p.price >= 10000;
                return true;
            });
        }

        // Metal type
        if (filters.metal !== 'all') {
            filtered = filtered.filter(p => p.materials.metal === filters.metal);
        }

        // Stone type
        if (filters.stoneType !== 'all') {
            filtered = filtered.filter(p =>
                p.materials.stones?.some(s => s.type === filters.stoneType)
            );
        }

        // Product type
        if (filters.productType !== 'all') {
            filtered = filtered.filter(p => p.type === filters.productType);
        }

        // Availability
        if (filters.availability !== 'all') {
            filtered = filtered.filter(p => p.specifications.availability === filters.availability);
        }

        // Sort
        if (sortBy === 'price-asc') {
            filtered = [...filtered].sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-desc') {
            filtered = [...filtered].sort((a, b) => b.price - a.price);
        } else if (sortBy === 'featured') {
            filtered = [...filtered].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        }

        return filtered;
    }, [filters, sortBy, collectionData]);

    if (!collectionData) {
        return <div>Collection not found</div>;
    }

    return (
        <>
            {breadcrumbSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
                />
            )}

            {/* Header */}
            <section className="bg-luxury-black text-luxury-white py-16">
                <div className="mx-auto max-w-9xl px-6 lg:px-8">
                    <h1 className="font-serif text-h1 mb-4">{collectionData.title}</h1>
                    <p className="text-lg text-luxury-warm-gray-300 max-w-3xl">
                        {collectionData.description}
                    </p>
                </div>
            </section>

            {/* Filters & Products */}
            <section className="section-luxury bg-luxury-white">
                <div className="mx-auto max-w-9xl px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-4 lg:gap-12">
                        {/* Filters Sidebar */}
                        <div className="mb-12 lg:mb-0">
                            <div className="sticky top-24">
                                <h2 className="font-serif text-h5 mb-6">Filters</h2>

                                {/* Price Range */}
                                <div className="mb-8">
                                    <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider">Price Range</h3>
                                    <div className="space-y-2">
                                        {[
                                            { value: 'all', label: 'All Prices' },
                                            { value: 'under-2000', label: 'Under AED 2,000' },
                                            { value: '2000-5000', label: 'AED 2,000 - 5,000' },
                                            { value: '5000-10000', label: 'AED 5,000 - 10,000' },
                                            { value: 'over-10000', label: 'Over AED 10,000' },
                                        ].map((option) => (
                                            <label key={option.value} className="flex items-center cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="priceRange"
                                                    value={option.value}
                                                    checked={filters.priceRange === option.value}
                                                    onChange={(e) => setFilters({ ...filters, priceRange: e.target.value as any })}
                                                    className="mr-2"
                                                />
                                                <span className="text-sm">{option.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Metal Type */}
                                <div className="mb-8">
                                    <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider">Metal Color</h3>
                                    <div className="space-y-2">
                                        {[
                                            { value: 'all', label: 'All Metals' },
                                            { value: '18K White Gold', label: 'White Gold' },
                                            { value: '18K Yellow Gold', label: 'Yellow Gold' },
                                            { value: '18K Rose Gold', label: 'Rose Gold' },
                                        ].map((option) => (
                                            <label key={option.value} className="flex items-center cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="metal"
                                                    value={option.value}
                                                    checked={filters.metal === option.value}
                                                    onChange={(e) => setFilters({ ...filters, metal: e.target.value as any })}
                                                    className="mr-2"
                                                />
                                                <span className="text-sm">{option.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Stone Type */}
                                <div className="mb-8">
                                    <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider">Stone Type</h3>
                                    <div className="space-y-2">
                                        {[
                                            { value: 'all', label: 'All Stones' },
                                            { value: 'CVD Diamond', label: 'CVD Diamond' },
                                            { value: 'Natural Diamond', label: 'Natural Diamond' },
                                            { value: 'Gemstone', label: 'Gemstone' },
                                        ].map((option) => (
                                            <label key={option.value} className="flex items-center cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="stoneType"
                                                    value={option.value}
                                                    checked={filters.stoneType === option.value}
                                                    onChange={(e) => setFilters({ ...filters, stoneType: e.target.value as any })}
                                                    className="mr-2"
                                                />
                                                <span className="text-sm">{option.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Product Type */}
                                <div className="mb-8">
                                    <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider">Product Type</h3>
                                    <div className="space-y-2">
                                        {[
                                            { value: 'all', label: 'All Types' },
                                            { value: 'Ring', label: 'Rings' },
                                            { value: 'Necklace', label: 'Necklaces' },
                                            { value: 'Bracelet', label: 'Bracelets' },
                                            { value: 'Earrings', label: 'Earrings' },
                                            { value: 'Pendant', label: 'Pendants' },
                                        ].map((option) => (
                                            <label key={option.value} className="flex items-center cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="productType"
                                                    value={option.value}
                                                    checked={filters.productType === option.value}
                                                    onChange={(e) => setFilters({ ...filters, productType: e.target.value as any })}
                                                    className="mr-2"
                                                />
                                                <span className="text-sm">{option.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Availability */}
                                <div className="mb-8">
                                    <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider">Availability</h3>
                                    <div className="space-y-2">
                                        {[
                                            { value: 'all', label: 'All' },
                                            { value: 'Made-to-Order', label: 'Made-to-Order' },
                                            { value: 'Ready to Ship', label: 'Ready to Ship' },
                                        ].map((option) => (
                                            <label key={option.value} className="flex items-center cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="availability"
                                                    value={option.value}
                                                    checked={filters.availability === option.value}
                                                    onChange={(e) => setFilters({ ...filters, availability: e.target.value as any })}
                                                    className="mr-2"
                                                />
                                                <span className="text-sm">{option.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={() => setFilters({
                                        priceRange: 'all',
                                        metal: 'all',
                                        stoneType: 'all',
                                        productType: 'all',
                                        availability: 'all',
                                    })}
                                    className="text-sm text-luxury-warm-gray-600 hover:text-luxury-black link-underline"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="lg:col-span-3">
                            {/* Sort & Results Count */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                                <p className="text-sm text-luxury-warm-gray-600">
                                    {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                                </p>
                                <div className="flex items-center gap-2">
                                    <label htmlFor="sort" className="text-sm font-medium">Sort by:</label>
                                    <select
                                        id="sort"
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value as any)}
                                        className="input-luxury text-sm py-2"
                                    >
                                        <option value="featured">Featured</option>
                                        <option value="newest">Newest</option>
                                        <option value="price-asc">Price: Low to High</option>
                                        <option value="price-desc">Price: High to Low</option>
                                    </select>
                                </div>
                            </div>

                            {/* Products */}
                            {filteredProducts.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {filteredProducts.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16">
                                    <p className="text-lg text-luxury-warm-gray-600 mb-4">
                                        No products match your filters.
                                    </p>
                                    <button
                                        onClick={() => setFilters({
                                            priceRange: 'all',
                                            metal: 'all',
                                            stoneType: 'all',
                                            productType: 'all',
                                            availability: 'all',
                                        })}
                                        className="btn-secondary"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
