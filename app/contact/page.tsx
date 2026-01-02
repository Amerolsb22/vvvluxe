'use client';

import { useState } from 'react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        preferredContact: 'email' as 'email' | 'whatsapp' | 'phone',
    });

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '971561510897';
    const whatsappUrl = `https://wa.me/${whatsappNumber}`;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone || undefined,
                    subject: formData.subject,
                    message: formData.message,
                    preferredContactMethod: formData.preferredContact,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send message');
            }

            setSubmitted(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-luxury-white">
            {/* Header */}
            <section className="bg-luxury-black text-luxury-white py-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <h1 className="font-serif text-h1 mb-4">Contact Us</h1>
                    <p className="text-lg text-luxury-warm-gray-300">
                        We're here to help bring your jewelry vision to life
                    </p>
                </div>
            </section>

            {/* Contact Methods */}
            <section className="section-luxury">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                        {/* WhatsApp */}
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="card-luxury p-8 text-center group hover:shadow-xl transition-shadow"
                        >
                            <div className="w-16 h-16 mx-auto mb-4 bg-luxury-gold rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                            </div>
                            <h3 className="font-serif text-h5 mb-2">WhatsApp</h3>
                            <p className="text-sm text-luxury-warm-gray-600 mb-3">
                                Instant response, share images
                            </p>
                            <span className="text-luxury-gold font-medium group-hover:underline">
                                +971 56 151 0897
                            </span>
                        </a>

                        {/* Email */}
                        <a
                            href="mailto:vvvluxe@outlook.com"
                            className="card-luxury p-8 text-center group hover:shadow-xl transition-shadow"
                        >
                            <div className="w-16 h-16 mx-auto mb-4 bg-luxury-gold rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                </svg>
                            </div>
                            <h3 className="font-serif text-h5 mb-2">Email</h3>
                            <p className="text-sm text-luxury-warm-gray-600 mb-3">
                                Send us your inquiry
                            </p>
                            <span className="text-luxury-gold font-medium group-hover:underline break-all">
                                vvvluxe@outlook.com
                            </span>
                        </a>

                        {/* Visit Showroom */}
                        <div className="card-luxury p-8 text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-luxury-warm-gray-200 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                </svg>
                            </div>
                            <h3 className="font-serif text-h5 mb-2">Visit Our Showroom</h3>
                            <p className="text-sm text-luxury-warm-gray-600 mb-3">
                                UAE – Gold & Diamond Park<br />
                                Dubai
                            </p>
                            <p className="text-sm text-luxury-warm-gray-500">
                                By appointment preferred
                            </p>
                        </div>

                        {/* Phone */}
                        <a
                            href={`tel:+${whatsappNumber}`}
                            className="card-luxury p-8 text-center group hover:shadow-xl transition-shadow"
                        >
                            <div className="w-16 h-16 mx-auto mb-4 bg-luxury-warm-gray-200 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                </svg>
                            </div>
                            <h3 className="font-serif text-h5 mb-2">Phone</h3>
                            <p className="text-sm text-luxury-warm-gray-600 mb-3">
                                Speak with our team
                            </p>
                            <span className="text-luxury-black font-medium group-hover:underline">
                                +971 56 151 0897
                            </span>
                        </a>
                    </div>

                    {/* Social Media Section */}
                    <div className="mb-16 card-luxury p-8 text-center">
                        <h3 className="font-serif text-h4 mb-4">Follow Our Journey</h3>
                        <p className="text-sm text-luxury-warm-gray-600 mb-6 max-w-lg mx-auto">
                            See our latest designs, customer stories, and behind-the-scenes craftsmanship
                        </p>
                        <div className="flex justify-center gap-6">
                            <a
                                href="https://instagram.com/vvvluxe"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center gap-2 group"
                            >
                                <div className="w-16 h-16 bg-luxury-warm-gray-100 group-hover:bg-luxury-gold rounded-full flex items-center justify-center transition-colors">
                                    <svg className="w-8 h-8 text-luxury-black" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                    </svg>
                                </div>
                                <span className="text-sm font-medium text-luxury-black group-hover:text-luxury-gold transition-colors">
                                    @vvvluxe
                                </span>
                            </a>
                            <a
                                href="https://www.tiktok.com/@vvv.luxe"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center gap-2 group"
                            >
                                <div className="w-16 h-16 bg-luxury-warm-gray-100 group-hover:bg-luxury-gold rounded-full flex items-center justify-center transition-colors">
                                    <svg className="w-8 h-8 text-luxury-black" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                                    </svg>
                                </div>
                                <span className="text-sm font-medium text-luxury-black group-hover:text-luxury-gold transition-colors">
                                    @vvv.luxe
                                </span>
                            </a>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="max-w-3xl mx-auto">
                        {!submitted ? (
                            <>
                                <h2 className="font-serif text-h2 mb-8 text-center">Send Us a Message</h2>

                                {error && (
                                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded">
                                        <p className="text-sm text-red-800">{error}</p>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                required
                                                minLength={2}
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="input-luxury"
                                                disabled={loading}
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium mb-2">
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="input-luxury"
                                                disabled={loading}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="input-luxury"
                                            placeholder="+971 XX XXX XXXX"
                                            disabled={loading}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium mb-2">
                                            Subject *
                                        </label>
                                        <select
                                            id="subject"
                                            required
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            className="input-luxury"
                                            disabled={loading}
                                        >
                                            <option value="">Select a subject...</option>
                                            <option value="consultation">Book a Consultation</option>
                                            <option value="quote">Request a Quote</option>
                                            <option value="custom">Custom Design Inquiry</option>
                                            <option value="product">Product Question</option>
                                            <option value="order">Order Status</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                                            Message *
                                        </label>
                                        <textarea
                                            id="message"
                                            required
                                            minLength={10}
                                            rows={6}
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="input-luxury"
                                            placeholder="Tell us about your jewelry needs..."
                                            disabled={loading}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-3">
                                            Preferred Contact Method *
                                        </label>
                                        <div className="flex gap-6">
                                            {[
                                                { value: 'email', label: 'Email' },
                                                { value: 'whatsapp', label: 'WhatsApp' },
                                                { value: 'phone', label: 'Phone Call' },
                                            ].map((option) => (
                                                <label key={option.value} className="flex items-center cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="preferredContact"
                                                        value={option.value}
                                                        checked={formData.preferredContact === option.value}
                                                        onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value as any })}
                                                        className="mr-2"
                                                        disabled={loading}
                                                    />
                                                    <span className="text-sm">{option.label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="text-center pt-4">
                                        <button
                                            type="submit"
                                            className="btn-primary"
                                            disabled={loading}
                                        >
                                            {loading ? 'Sending...' : 'Send Message'}
                                        </button>
                                    </div>
                                </form>
                            </>
                        ) : (
                            <div className="text-center py-16">
                                <div className="w-20 h-20 mx-auto mb-6 bg-luxury-gold rounded-full flex items-center justify-center">
                                    <svg className="w-10 h-10 text-luxury-black" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </div>
                                <h2 className="font-serif text-h2 mb-4">Thank You!</h2>
                                <p className="text-lg text-luxury-warm-gray-600 mb-8">
                                    We've received your message and will contact you within 24 hours via {formData.preferredContact}.
                                </p>
                                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-gold">
                                    Or Chat Now on WhatsApp
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Map Placeholder */}
            <section className="bg-luxury-warm-gray-100 py-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="aspect-[21/9] bg-luxury-warm-gray-300 flex items-center justify-center">
                        <p className="text-luxury-warm-gray-600">
                            [Google Maps Embed - Gold & Diamond Park, Dubai]
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
