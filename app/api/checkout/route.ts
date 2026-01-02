/**
 * PHASE 1: Stripe checkout is DISABLED
 * All purchases are handled via WhatsApp
 * This route returns a message directing users to WhatsApp
 */

import { NextRequest, NextResponse } from 'next/server';

// STRIPE IMPORTS DISABLED FOR PHASE 1
// import Stripe from 'stripe';
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//     apiVersion: '2023-10-16',
// });

export async function POST(request: NextRequest) {
    // PHASE 1: Online payments disabled
    return NextResponse.json(
        { 
            success: false, 
            error: 'Online checkout is not available. Please use WhatsApp to complete your order.',
            phase: 1,
            whatsappNumber: '+971 56 151 0897'
        },
        { status: 503 } // Service Unavailable
    );
}
