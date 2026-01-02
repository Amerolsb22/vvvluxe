'use client';


export default function TopBanner() {
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '971561510897';
    const whatsappMessage = encodeURIComponent(
        "Hi VVV Luxe, I'd like to inquire about your jewelry."
    );
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    const bannerText = "UAE • Gold & Diamond Park • Custom & Personalized Jewelry • Affordable CVD Diamonds • WhatsApp +971 56 151 0897 • Worldwide Shipping";

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="banner-strip"
        >
            <div className="banner-content">
                <span className="banner-text">{bannerText}</span>
                <span className="banner-text" aria-hidden="true">{bannerText}</span>
                <span className="banner-text" aria-hidden="true">{bannerText}</span>
            </div>
        </a>
    );
}
