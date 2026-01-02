'use client';

import Image from 'next/image';
import { useState } from 'react';

interface SafeImageProps {
    src: string;
    alt: string;
    fill?: boolean;
    width?: number;
    height?: number;
    className?: string;
    sizes?: string;
    priority?: boolean;
    quality?: number;
}

// Elegant SVG placeholder with VVV Luxe branding
const FALLBACK_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI4MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iODAwIiBmaWxsPSIjMEIwQjBCIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJzZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iI0M2QTQ1QSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPnZWdiBMdXhlPC90ZXh0Pjwvc3ZnPg==';

export default function SafeImage({
    src,
    alt,
    fill,
    width,
    height,
    className = '',
    sizes,
    priority = false,
    quality = 90,
}: SafeImageProps) {
    const [imageSrc, setImageSrc] = useState(src || FALLBACK_IMAGE);
    const [hasError, setHasError] = useState(false);

    return (
        <Image
            src={imageSrc}
            alt={alt}
            fill={fill}
            width={width}
            height={height}
            className={className}
            sizes={sizes}
            priority={priority}
            quality={quality}
            unoptimized={hasError || imageSrc.startsWith('data:')}
            onError={() => {
                if (!hasError) {
                    setImageSrc(FALLBACK_IMAGE);
                    setHasError(true);
                }
            }}
        />
    );
}
