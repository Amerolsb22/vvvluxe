'use client';

import { getBaseImage, getDiamondImage, getGemstoneImage, getMetalFilter, getRopeImage, getStoneScale } from '@/lib/configuratorAssets';
import { ConfiguredStone, MetalType, ProductType, RopeColor } from '@/types';
import Image from 'next/image';
import { useState } from 'react';

interface ConfiguratorPreviewProps {
    productType: ProductType;
    metal: MetalType;
    ropeColor?: RopeColor;
    stones: ConfiguredStone[];
    className?: string;
}

export default function ConfiguratorPreview({
    productType,
    metal,
    ropeColor,
    stones,
    className = '',
}: ConfiguratorPreviewProps) {
    const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

    const handleImageError = (layer: string) => {
        setImageErrors(prev => new Set(prev).add(layer));
        if (process.env.NODE_ENV === 'development') {
            console.warn(`[ConfiguratorPreview] Failed to load image layer: ${layer}`);
        }
    };

    const baseImage = getBaseImage(productType);
    const ropeImage = ropeColor ? getRopeImage(ropeColor) : null;
    const metalFilter = getMetalFilter(metal);

    return (
        <div className={`relative aspect-square bg-luxury-warm-gray-50 rounded-lg overflow-hidden ${className}`}>
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-luxury-warm-gray-100 to-luxury-warm-gray-50" />

            {/* Layered Preview Container */}
            <div className="relative w-full h-full flex items-center justify-center p-8">
                {/* Layer 1: Base Structure */}
                {!imageErrors.has('base') && baseImage && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div 
                            className="w-3/4 h-3/4 relative"
                            style={{ filter: metalFilter }}
                        >
                            <Image
                                src={baseImage}
                                alt={`${productType} base`}
                                fill
                                className="object-contain"
                                onError={() => handleImageError('base')}
                                unoptimized
                            />
                        </div>
                    </div>
                )}

                {/* Layer 2: Rope/Chain (if applicable) */}
                {!imageErrors.has('rope') && ropeImage && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-3/4 h-3/4 relative">
                            <Image
                                src={ropeImage}
                                alt={`${ropeColor} rope`}
                                fill
                                className="object-contain"
                                onError={() => handleImageError('rope')}
                                unoptimized
                            />
                        </div>
                    </div>
                )}

                {/* Layer 3: Stones (positioned based on configuration) */}
                {stones.map((stone, idx) => {
                    const stoneImage = stone.type === 'Gemstone' 
                        ? getGemstoneImage(stone.gemstoneType || 'Sapphire')
                        : getDiamondImage(stone.shape);
                    
                    const scale = getStoneScale(stone.caratWeight);
                    const errorKey = `stone-${idx}`;

                    if (imageErrors.has(errorKey)) return null;

                    return (
                        <div 
                            key={`${stone.slotId}-${idx}`}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                            style={{
                                transform: `scale(${scale})`,
                                zIndex: 10 + idx,
                            }}
                        >
                            <div className="w-1/3 h-1/3 relative">
                                <Image
                                    src={stoneImage}
                                    alt={`${stone.shape} ${stone.type}`}
                                    fill
                                    className="object-contain drop-shadow-lg"
                                    onError={() => handleImageError(errorKey)}
                                    unoptimized
                                />
                            </div>
                        </div>
                    );
                })}

                {/* Fallback: If base image fails, show placeholder */}
                {imageErrors.has('base') && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-luxury-warm-gray-400">
                            <svg 
                                className="mx-auto h-24 w-24 mb-4" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={1} 
                                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" 
                                />
                            </svg>
                            <p className="font-serif text-sm">{productType} Preview</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Configuration Summary Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-luxury-black/80 to-transparent p-4">
                <div className="text-luxury-white text-xs space-y-1">
                    <div className="flex justify-between">
                        <span className="opacity-70">Metal:</span>
                        <span className="font-medium">{metal}</span>
                    </div>
                    {ropeColor && (
                        <div className="flex justify-between">
                            <span className="opacity-70">Rope:</span>
                            <span className="font-medium">{ropeColor}</span>
                        </div>
                    )}
                    {stones.length > 0 && (
                        <div className="flex justify-between">
                            <span className="opacity-70">Stones:</span>
                            <span className="font-medium">
                                {stones.reduce((sum, s) => sum + s.caratWeight, 0).toFixed(2)}ct total
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
