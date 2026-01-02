import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

// Rate limiting store (in-memory, suitable for serverless)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 5;

// Validation schema
const contactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(100),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    subject: z.string().min(1, 'Subject is required').max(200),
    message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
    preferredContactMethod: z.enum(['email', 'phone', 'whatsapp']).optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

// Initialize Resend with fallback for build time
const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder_for_build');

// Rate limiting function
function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
    const now = Date.now();
    const record = rateLimitMap.get(ip);

    if (!record || now > record.resetTime) {
        // New window or expired window
        rateLimitMap.set(ip, {
            count: 1,
            resetTime: now + RATE_LIMIT_WINDOW_MS,
        });
        return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1 };
    }

    if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
        return { allowed: false, remaining: 0 };
    }

    record.count += 1;
    rateLimitMap.set(ip, record);
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - record.count };
}

// Clean up old entries periodically
setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of rateLimitMap.entries()) {
        if (now > record.resetTime) {
            rateLimitMap.delete(ip);
        }
    }
}, 60 * 1000); // Clean every minute

export async function POST(request: NextRequest) {
    try {
        // Get client IP for rate limiting
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
            request.headers.get('x-real-ip') ||
            'unknown';

        // Check rate limit
        const { allowed, remaining } = checkRateLimit(ip);
        if (!allowed) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Too many requests. Please try again in 15 minutes.'
                },
                {
                    status: 429,
                    headers: {
                        'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
                        'X-RateLimit-Remaining': '0',
                    }
                }
            );
        }

        // Parse and validate request body
        const body = await request.json();
        const validatedData: ContactFormData = contactSchema.parse(body);

        // Check required environment variables
        if (!process.env.RESEND_API_KEY) {
            console.error('RESEND_API_KEY is not configured');
            return NextResponse.json(
                { success: false, error: 'Email service not configured' },
                { status: 500 }
            );
        }

        const toEmail = process.env.CONTACT_TO_EMAIL || 'info@vvvluxe.com';
        const fromEmail = process.env.CONTACT_FROM_EMAIL || 'noreply@vvvluxe.com';

        // Send email via Resend
        const { data, error } = await resend.emails.send({
            from: `VVV Luxe Contact <${fromEmail}>`,
            to: [toEmail],
            reply_to: validatedData.email,
            subject: `Contact Form: ${validatedData.subject}`,
            html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #0A0A0A; color: #FEFEFE; padding: 20px; text-align: center; }
              .content { background: #fff; padding: 30px; border: 1px solid #E7E5E4; }
              .field { margin-bottom: 20px; }
              .label { font-weight: bold; color: #0A0A0A; margin-bottom: 5px; }
              .value { color: #44403C; }
              .footer { text-align: center; padding: 20px; color: #78716C; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">From:</div>
                  <div class="value">${validatedData.name}</div>
                </div>
                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value"><a href="mailto:${validatedData.email}">${validatedData.email}</a></div>
                </div>
                ${validatedData.phone ? `
                <div class="field">
                  <div class="label">Phone:</div>
                  <div class="value">${validatedData.phone}</div>
                </div>
                ` : ''}
                <div class="field">
                  <div class="label">Subject:</div>
                  <div class="value">${validatedData.subject}</div>
                </div>
                ${validatedData.preferredContactMethod ? `
                <div class="field">
                  <div class="label">Preferred Contact Method:</div>
                  <div class="value">${validatedData.preferredContactMethod}</div>
                </div>
                ` : ''}
                <div class="field">
                  <div class="label">Message:</div>
                  <div class="value" style="white-space: pre-wrap;">${validatedData.message}</div>
                </div>
              </div>
              <div class="footer">
                <p>VVV Luxe — Gold & Diamond Park, Dubai, UAE</p>
                <p>This email was sent from your website contact form.</p>
              </div>
            </div>
          </body>
        </html>
      `,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json(
                { success: false, error: 'Failed to send email. Please try again.' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Your message has been sent successfully!'
            },
            {
                status: 200,
                headers: {
                    'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
                    'X-RateLimit-Remaining': remaining.toString(),
                }
            }
        );

    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Invalid form data',
                    details: error.errors
                },
                { status: 400 }
            );
        }

        console.error('Contact form error:', error);
        return NextResponse.json(
            { success: false, error: 'An unexpected error occurred. Please try again.' },
            { status: 500 }
        );
    }
}
