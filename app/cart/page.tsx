'use client';

import { useCartStore } from '@/lib/cartStore';
import { generateCartWhatsAppLink } from '@/lib/whatsapp';
import Link from 'next/link';
import SafeImage from '@/components/SafeImage';

export default function CartPage() {
    const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();
    const total = getTotalPrice();

    const handleWhatsAppCheckout = () => {
        if (items.length === 0) return;
        const whatsappUrl = generateCartWhatsAppLink(items);
        window.open(whatsappUrl, '_blank');
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg)' }}>
                <div className="text-center px-6 max-w-md">
                    <h1 className="font-serif text-h2 mb-4" style={{ color: 'var(--fg)' }}>Your Cart is Empty</h1>
                    <p className="mb-8" style={{ color: 'var(--fg-muted)' }}>
                        Discover our collections and add pieces to your cart.
                    </p>
                    <Link href="/shop" className="btn-gold">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-16" style={{ backgroundColor: 'var(--bg)' }}>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <h1 className="font-serif text-h2 mb-12" style={{ color: 'var(--fg)' }}>Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        {items.map((item) => (
                            <div key={item.product.id} className="card-luxury p-6">
                                <div className="flex gap-6">
                                    <div className="relative w-24 h-24 flex-shrink-0">
                                        <SafeImage
                                            src={item.product.images[0]}
                                            alt={item.product.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="font-serif text-h4 mb-2" style={{ color: 'var(--fg)' }}>
                                            {item.product.name}
                                        </h3>
                                        <p className="text-sm mb-3" style={{ color: 'var(--fg-muted)' }}>
                                            AED {item.product.price.toLocaleString()} each
                                        </p>

                                        {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                                            <div className="text-sm mb-3" style={{ color: 'var(--fg-muted)' }}>
                                                {Object.entries(item.selectedOptions).map(([key, value]) => (
                                                    value && <div key={key}>{key}: {value}</div>
                                                ))}
                                            </div>
                                        )}

                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                    className="w-8 h-8 flex items-center justify-center border"
                                                    style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
                                                >
                                                    −
                                                </button>
                                                <span className="w-12 text-center" style={{ color: 'var(--fg)' }}>{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                    className="w-8 h-8 flex items-center justify-center border"
                                                    style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeItem(item.product.id)}
                                                className="text-sm underline"
                                                style={{ color: 'var(--fg-muted)' }}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <p className="font-serif text-h4" style={{ color: 'var(--gold)' }}>
                                            AED {(item.product.price * item.quantity).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="card-luxury p-8 sticky top-24">
                            <h2 className="font-serif text-h3 mb-6" style={{ color: 'var(--fg)' }}>Order Summary</h2>

                            <div className="space-y-4 mb-6 pb-6" style={{ borderBottom: '1px solid var(--border)' }}>
                                <div className="flex justify-between">
                                    <span style={{ color: 'var(--fg-muted)' }}>Subtotal</span>
                                    <span style={{ color: 'var(--fg)' }}>AED {total.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span style={{ color: 'var(--fg-muted)' }}>Items</span>
                                    <span style={{ color: 'var(--fg)' }}>{items.length} piece(s)</span>
                                </div>
                            </div>

                            <div className="flex justify-between mb-8">
                                <span className="font-serif text-h4" style={{ color: 'var(--fg)' }}>Total Value</span>
                                <span className="font-serif text-h4" style={{ color: 'var(--gold)' }}>
                                    AED {total.toLocaleString()}
                                </span>
                            </div>

                            <button
                                onClick={handleWhatsAppCheckout}
                                className="btn-gold w-full mb-4 flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                </svg>
                                Request via WhatsApp
                            </button>

                            <Link href="/shop" className="btn-secondary w-full block text-center">
                                Continue Shopping
                            </Link>

                            <p className="text-xs mt-6 text-center" style={{ color: 'var(--fg-soft)' }}>
                                📱 Payment and delivery details will be confirmed via WhatsApp
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
