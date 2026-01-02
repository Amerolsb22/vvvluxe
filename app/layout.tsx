import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import ErrorBoundary from '@/components/ErrorBoundary'
import HydrationProvider from '@/components/HydrationProvider'
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    display: 'swap',
})

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})

export const metadata: Metadata = {
    title: {
        default: 'VVV Luxe | Custom Diamond Jewelry | Dubai',
        template: '%s | VVV Luxe'
    },
    description: 'Custom jewelry made for you. Personalized designs, affordable CVD diamond line, natural diamonds, and rare gemstones. Based in Dubai Gold & Diamond Park.',
    keywords: ['custom jewelry', 'diamond jewelry', 'CVD diamonds', 'lab-grown diamonds', 'natural diamonds', 'gemstones', 'Dubai jewelry', 'personalized jewelry', 'made to order'],
    authors: [{ name: 'VVV Luxe' }],
    creator: 'VVV Luxe',
    publisher: 'VVV Luxe',
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://vvvluxe.com'),
    icons: {
        icon: [
            { url: '/favicon/favicon.ico' },
            { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        ],
        apple: [
            { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        ],
        other: [
            { url: '/favicon/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
            { url: '/favicon/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
        ],
    },
    manifest: '/site.webmanifest',
    openGraph: {
        type: 'website',
        locale: 'en_AE',
        url: '/',
        siteName: 'VVV Luxe',
        title: 'VVV Luxe | Custom Diamond Jewelry | Dubai',
        description: 'Custom jewelry made for you. Personalized designs, affordable CVD diamond line, natural diamonds, and rare gemstones.',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'VVV Luxe Custom Jewelry',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'VVV Luxe | Custom Diamond Jewelry',
        description: 'Custom jewelry made for you. Personalized designs and affordable luxury.',
        images: ['/og-image.jpg'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: 'your-google-verification-code',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vvvluxe.com';

    const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'JewelryStore',
        name: 'VVV Luxe',
        description: 'Custom diamond jewelry and personalized designs in Dubai',
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        image: `${baseUrl}/og-image.jpg`,
        telephone: '+971561510897',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Gold & Diamond Park',
            addressLocality: 'Dubai',
            addressCountry: 'AE',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: 25.1193,
            longitude: 55.2006,
        },
        priceRange: 'AED 500 - AED 50000',
        sameAs: [
            'https://wa.me/971561510897',
        ],
    };

    return (
        <html lang="en" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
                />
                {process.env.NEXT_PUBLIC_VERCEL_ANALYTICS === 'true' && (
                    <script
                        defer
                        src="https://cdn.vercel-insights.com/v1/script.debug.js"
                    />
                )}
                {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
                    <>
                        <script
                            async
                            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
                        />
                        <script
                            dangerouslySetInnerHTML={{
                                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
                `,
                            }}
                        />
                    </>
                )}
            </head>
            <body suppressHydrationWarning>
                <HydrationProvider>
                    <ErrorBoundary>
                        <Header />
                        <main className="min-h-screen">
                            {children}
                        </main>
                        <Footer />
                    </ErrorBoundary>
                </HydrationProvider>
            </body>
        </html>
    )
}
