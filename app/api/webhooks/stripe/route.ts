/**
 * PHASE 1: Stripe webhooks are DISABLED
 * All purchases are handled via WhatsApp
 */

import { NextRequest, NextResponse } from 'next/server';

// STRIPE IMPORTS DISABLED FOR PHASE 1
// import Stripe from 'stripe';
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//     apiVersion: '2023-10-16',
// });
// const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
    // PHASE 1: Webhooks disabled
    return NextResponse.json(
        { error: 'Stripe webhooks are not active in Phase 1' },
        { status: 503 }
    );
}

/* ORIGINAL WEBHOOK CODE - DISABLED FOR PHASE 1
export async function POST_DISABLED(request: NextRequest) {
    try {
        const body = await request.text();
        const signature = request.headers.get('stripe-signature');

        if (!signature) {
            return NextResponse.json(
                { error: 'Missing stripe-signature header' },
                { status: 400 }
            );
        }

        if (!webhookSecret) {
            console.error('STRIPE_WEBHOOK_SECRET is not configured');
            return NextResponse.json(
                { error: 'Webhook secret not configured' },
                { status: 500 }
            );
        }

        // Verify webhook signature
        let event: Stripe.Event;
        try {
            event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
        } catch (err) {
            console.error('Webhook signature verification failed:', err);
            return NextResponse.json(
                { error: 'Invalid signature' },
                { status: 400 }
            );
        }

        // Handle the event
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object as Stripe.Checkout.Session;

                // TODO: Implement order creation logic
                // 1. Extract session data (customer email, amount, line items)
                // 2. Create order record in database
                // 3. Send confirmation email to customer
                // 4. Notify admin/workshop
                // 5. Update inventory (if applicable)

                console.log('✅ Checkout session completed:', {
                    sessionId: session.id,
                    customerEmail: session.customer_email,
                    amountTotal: session.amount_total,
                    currency: session.currency,
                    paymentStatus: session.payment_status,
                });

                // Example: Retrieve line items for the order
                const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
                console.log('Order items:', lineItems.data);

                break;
            }

            case 'payment_intent.succeeded': {
                const paymentIntent = event.data.object as Stripe.PaymentIntent;

                // TODO: Handle successful payment
                // 1. Update order status to 'paid'
                // 2. Trigger fulfillment process

                console.log('✅ Payment succeeded:', {
                    paymentIntentId: paymentIntent.id,
                    amount: paymentIntent.amount,
                    currency: paymentIntent.currency,
                });

                break;
            }

            case 'payment_intent.payment_failed': {
                const paymentIntent = event.data.object as Stripe.PaymentIntent;

                // TODO: Handle failed payment
                // 1. Update order status to 'payment_failed'
                // 2. Send notification to customer
                // 3. Log for admin review

                console.error('❌ Payment failed:', {
                    paymentIntentId: paymentIntent.id,
                    error: paymentIntent.last_payment_error?.message,
                });

                break;
            }

            case 'charge.refunded': {
                const charge = event.data.object as Stripe.Charge;

                // TODO: Handle refund
                // 1. Update order status to 'refunded'
                // 2. Send refund confirmation email
                // 3. Update inventory

                console.log('🔄 Charge refunded:', {
                    chargeId: charge.id,
                    amount: charge.amount_refunded,
                    refunded: charge.refunded,
                });

                break;
            }

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        return NextResponse.json({ received: true });

    } catch (error) {
        console.error('Webhook handler error:', error);
        return NextResponse.json(
            { error: 'Webhook handler failed' },
            { status: 500 }
        );
    }
}
*/
