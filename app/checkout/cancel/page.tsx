/**
 * PHASE 1: This page should not be accessible (no Stripe checkout)
 * Redirects users to cart/shop
 */

import Link from 'next/link';

export default function CheckoutCancelPage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: 'var(--bg)' }}>
            <div className="max-w-2xl w-full text-center">
                <div className="w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--border)' }}>
                    <svg className="w-12 h-12" style={{ color: 'var(--fg-muted)' }} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </div>

                <h1 className="font-serif text-h2 mb-4" style={{ color: 'var(--fg)' }}>Online Checkout Not Available</h1>
                <p className="text-lg mb-8" style={{ color: 'var(--fg-muted)' }}>
                    We're currently processing all orders via WhatsApp for personalized service.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/cart" className="btn-gold">
                        View Cart
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
                    Your cart items are saved. Complete your order via WhatsApp for the best experience.
                </p>
            </div>
        </div>
    );
}
