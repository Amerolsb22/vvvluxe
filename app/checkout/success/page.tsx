/**
 * PHASE 1: This page should not be accessible (no Stripe checkout)
 * Redirects users to homepage with message
 */

'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutSuccessPage() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to home after 3 seconds
        const timer = setTimeout(() => {
            router.push('/');
        }, 3000);
        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: 'var(--bg)' }}>
            <div className="max-w-2xl w-full text-center">
                <div className="w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--gold)' }}>
                    <svg className="w-12 h-12" style={{ color: 'var(--bg)' }} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </div>

                <h1 className="font-serif text-h2 mb-4" style={{ color: 'var(--fg)' }}>Phase 1: WhatsApp Orders Only</h1>
                <p className="text-lg mb-8" style={{ color: 'var(--fg-muted)' }}>
                    Online payments are not available yet. All orders are processed via WhatsApp for personalized service.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/" className="btn-gold">
                        Return Home
                    </Link>
                    <a 
                        href="https://wa.me/971561510897?text=Hello%20VVV%20Luxe%2C%20I%27d%20like%20to%20place%20an%20order" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary"
                    >
                        Contact via WhatsApp
                    </a>
                </div>

                <p className="mt-8 text-sm" style={{ color: 'var(--fg-soft)' }}>
                    Redirecting to homepage in 3 seconds...
                </p>
            </div>
        </div>
    );
}
