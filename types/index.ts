// Product Types
export type MetalType = '18K White Gold' | '18K Yellow Gold' | '18K Rose Gold';
export type StoneType = 'CVD Diamond' | 'Natural Diamond' | 'Gemstone';
export type RopeColor = 'Black' | 'Navy' | 'Burgundy' | 'Emerald' | 'White' | 'Gold';
export type ProductCategory = 'For Her' | 'For Him' | 'Unisex';
export type ProductType = 'Ring' | 'Necklace' | 'Bracelet' | 'Earrings' | 'Pendant';
export type Availability = 'Made-to-Order' | 'Ready to Ship';

export interface Product {
    id: string;
    name: string;
    slug: string;
    category: ProductCategory;
    type: ProductType;
    collection: string;
    price: number;
    images: string[];
    description: string;
    materials: {
        metal: MetalType;
        metalWeight: number; // grams
        stones?: StoneDetails[];
        ropeColor?: RopeColor;
        ropeMaterial?: string;
    };
    specifications: {
        leadTimeDays: number;
        availability: Availability;
        sizes?: string[];
        customizable: boolean;
    };
    seo: {
        title: string;
        description: string;
        keywords: string[];
    };
    featured?: boolean;
    tags: string[];
}

export interface StoneDetails {
    type: StoneType;
    shape: 'Round' | 'Princess' | 'Marquise' | 'Emerald' | 'Oval' | 'Pear';
    caratWeight: number;
    quantity: number;
    placement?: string;
    color?: string; // For gemstones
    clarity?: string; // For diamonds
}

export interface Gemstone {
    id: string;
    name: string;
    slug: string;
    type: string; // Sapphire, Ruby, Emerald, etc.
    shape: string;
    caratWeight: number;
    color: string;
    clarity: string;
    origin: string;
    price: number;
    images: string[];
    certified: boolean;
    certificateNumber?: string;
    description: string;
}

// Configurator Types
export interface DesignConfiguration {
    id: string;
    createdAt: Date;
    type: ProductType;
    template: DesignTemplate;
    metal: MetalType;
    ropeColor?: RopeColor;
    stones: ConfiguredStone[];
    engraving?: string;
    size: string;
    pricing: PricingBreakdown;
}

export interface DesignTemplate {
    id: string;
    name: string;
    type: ProductType;
    description: string;
    previewImage: string;
    baseGoldWeight: number; // grams
    ropeEnabled: boolean;
    stoneSlots: StoneSlot[];
    complexity: 'Simple' | 'Medium' | 'Complex';
}

export interface StoneSlot {
    id: string;
    position: string; // 'center', 'side-1', 'halo', etc.
    allowedShapes: string[];
    minCarat: number;
    maxCarat: number;
}

export interface ConfiguredStone {
    slotId: string;
    type: StoneType;
    shape: string;
    caratWeight: number;
    gemstoneType?: string; // For Gemstone type, specify which gemstone (Emerald, Ruby, etc.)
}

export interface PricingBreakdown {
    goldCost: number;
    stoneCost: number;
    laborCost: number;
    subtotal: number;
    markup: number;
    total: number;
    leadTimeDays: number;
}

// Pricing Engine Configuration
export interface PricingConfig {
    goldPricePerGram: {
        '18K White Gold': number;
        '18K Yellow Gold': number;
        '18K Rose Gold': number;
    };
    stonePricePerCarat: {
        'CVD Diamond': number;
        'Natural Diamond': number;
        'Gemstone': number;
    };
    laborFee: {
        'Simple': number;
        'Medium': number;
        'Complex': number;
    };
    markupPercentage: number;
    leadTimeByComplexity: {
        'Simple': number;
        'Medium': number;
        'Complex': number;
    };
}

// Cart & Checkout
export interface CartItem {
    id: string;
    product?: Product;
    customDesign?: DesignConfiguration;
    quantity: number;
    selectedSize?: string;
    customization?: string;
}

export interface Cart {
    items: CartItem[];
    total: number;
}

// Contact & Quote Request
export interface QuoteRequest {
    type: 'product' | 'custom' | 'design';
    productId?: string;
    designConfiguration?: DesignConfiguration;
    customerInfo: {
        name: string;
        email: string;
        phone: string;
        message: string;
    };
    referenceImages?: string[];
}

export interface ContactMessage {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    preferredContact: 'email' | 'whatsapp' | 'phone';
}
