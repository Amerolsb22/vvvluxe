/**
 * WhatsApp Integration Utilities for VVV Luxe
 * Phase 1: All purchases handled via WhatsApp
 */

import { Product } from '@/types';
import { CartItem } from './cartStore';

const WHATSAPP_NUMBER = '971561510897';

/**
 * Generate WhatsApp URL for a single product inquiry
 */
export function generateProductWhatsAppLink(product: Product, currentUrl?: string): string {
    const message = `Hello VVV Luxe 👋

I'm interested in the following piece:

• Product: ${product.name}
• Category: ${product.category}
• Price: AED ${product.price.toLocaleString()}

${currentUrl ? `Link: ${currentUrl}` : ''}

Please assist me with availability and customization options.`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Generate WhatsApp URL for cart items
 */
export function generateCartWhatsAppLink(items: CartItem[]): string {
    const productList = items.map((item, index) => {
        const optionsText = item.selectedOptions 
            ? Object.entries(item.selectedOptions)
                .filter(([_, value]) => value)
                .map(([key, value]) => `  ${key}: ${value}`)
                .join('\n')
            : '';
        
        return `${index + 1}. ${item.product.name}
   Quantity: ${item.quantity}
   Price: AED ${(item.product.price * item.quantity).toLocaleString()}${optionsText ? '\n' + optionsText : ''}`;
    }).join('\n\n');

    const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    const message = `Hello VVV Luxe 👋

I would like to request the following items:

${productList}

Total Value: AED ${total.toLocaleString()}

Please confirm availability and provide payment instructions.`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Generate WhatsApp URL for custom design inquiry
 */
export function generateDesignWhatsAppLink(config: {
    metal?: string;
    base?: string;
    rope?: string;
    diamond?: string;
    gemstone?: string;
    size?: string;
    engraving?: string;
    estimatedPrice?: number;
}): string {
    const configLines = Object.entries(config)
        .filter(([key, value]) => value && key !== 'estimatedPrice')
        .map(([key, value]) => `• ${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`)
        .join('\n');

    const message = `Hello VVV Luxe 👋

I've created a custom design using your configurator:

${configLines}

${config.estimatedPrice ? `Estimated Price: AED ${config.estimatedPrice.toLocaleString()}` : ''}

Please provide a detailed quote and timeline for this piece.`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Generate WhatsApp URL for general custom inquiry
 */
export function generateCustomInquiryLink(message?: string): string {
    const defaultMessage = 'Hi VVV Luxe, I would like to discuss a custom jewelry project.';
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message || defaultMessage)}`;
}

/**
 * Get formatted WhatsApp number for display
 */
export function getWhatsAppNumber(): string {
    return '+971 56 151 0897';
}

/**
 * Get WhatsApp number without formatting
 */
export function getWhatsAppNumberRaw(): string {
    return WHATSAPP_NUMBER;
}
