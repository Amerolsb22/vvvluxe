// Configurator Image Assets Configuration
// All paths relative to /public

export const configuratorAssets = {
    // Base jewelry types
    bases: {
        ring: '/images/configurator/bases/ring.png',
        bracelet: '/images/configurator/bases/bracelet.png',
        necklace: '/images/configurator/bases/necklace.png',
        pendant: '/images/configurator/bases/pendant.png',
        earring: '/images/configurator/bases/earring.png',
    },

    // Metal finishes (currently empty - will use CSS filters/colors)
    metal: {
        '18K Yellow Gold': null, // Apply gold color filter
        '18K White Gold': null,  // Apply silver color filter
        '18K Rose Gold': null,   // Apply rose color filter
    },

    // Rope/cord colors
    ropes: {
        Black: '/images/configurator/ropes/rope-black.png',
        Navy: '/images/configurator/ropes/rope-navy.png',
        Burgundy: '/images/configurator/ropes/rope-burgundy.png',
        White: '/images/configurator/ropes/rope-white.png',
        Gold: '/images/configurator/ropes/rope-gold.png',
        Emerald: '/images/configurator/ropes/rope-black.png', // Fallback to black
    },

    // Chain styles
    chains: {
        thin: '/images/configurator/chains/chain-thin.png',
        medium: '/images/configurator/chains/chain-medium.png',
        thick: '/images/configurator/chains/chain-thick.png',
    },

    // Diamond shapes (use CSS scale for sizes)
    diamonds: {
        Round: '/images/configurator/diamonds/round_medium.png',
        Princess: '/images/configurator/diamonds/princess_medium.png',
        Oval: '/images/configurator/diamonds/oval_medium.png',
        Emerald: '/images/configurator/diamonds/cushion_medium.png',
        Pear: '/images/configurator/diamonds/pear_medium.png',
        Marquise: '/images/configurator/diamonds/marquise_medium.png',
        Heart: '/images/configurator/diamonds/heart_medium.png',
        Cushion: '/images/configurator/diamonds/cushion_medium.png',
    },

    // Gemstone types
    gemstones: {
        Emerald: '/images/configurator/gemstones/emerald-green.png',
        Ruby: '/images/configurator/gemstones/ruby-red.png',
        Sapphire: '/images/configurator/gemstones/sapphire-blue.png',
        'Pink Sapphire': '/images/configurator/gemstones/sapphire-pink.png',
        Morganite: '/images/configurator/gemstones/morganite.png',
        Aquamarine: '/images/configurator/gemstones/aquamarine.png',
        Tanzanite: '/images/configurator/gemstones/tanzanite.png',
        Amethyst: '/images/configurator/gemstones/amethyst.png',
        Citrine: '/images/configurator/gemstones/citrine-madeira.png',
        Peridot: '/images/configurator/gemstones/peridot.png',
        Topaz: '/images/configurator/gemstones/topaz-imperial.png',
        Tourmaline: '/images/configurator/gemstones/tourmaline-paraiba.png',
        Spinel: '/images/configurator/gemstones/spinel-red.png',
        Alexandrite: '/images/configurator/gemstones/alexandrite.png',
        Garnet: '/images/configurator/gemstones/tsavorite-garnet.png',
    },

    // Fallback preview images
    previews: {
        ring: '/images/configurator/previews/preview-ring.png',
        bracelet: '/images/configurator/previews/preview-bracelet.png',
        necklace: '/images/configurator/previews/preview-necklace.png',
    },
};

// Helper to get base image by product type
export function getBaseImage(type: string): string {
    const key = type.toLowerCase() as keyof typeof configuratorAssets.bases;
    return configuratorAssets.bases[key] || configuratorAssets.bases.ring;
}

// Helper to get rope image by color
export function getRopeImage(color: string): string | null {
    return configuratorAssets.ropes[color as keyof typeof configuratorAssets.ropes] || null;
}

// Helper to get diamond image by shape
export function getDiamondImage(shape: string): string {
    return configuratorAssets.diamonds[shape as keyof typeof configuratorAssets.diamonds] 
        || configuratorAssets.diamonds.Round;
}

// Helper to get gemstone image by type
export function getGemstoneImage(type: string): string {
    return configuratorAssets.gemstones[type as keyof typeof configuratorAssets.gemstones]
        || configuratorAssets.gemstones.Sapphire; // Default fallback
}

// Calculate CSS scale based on carat weight
export function getStoneScale(carat: number, minCarat: number = 0.15, maxCarat: number = 3.0): number {
    const normalized = (carat - minCarat) / (maxCarat - minCarat);
    return 0.5 + (normalized * 1.5); // Scale from 0.5x to 2x
}

// Metal color filters
export const metalFilters = {
    '18K Yellow Gold': 'hue-rotate(30deg) saturate(1.8) brightness(1.1)',
    '18K White Gold': 'saturate(0) brightness(1.4)',
    '18K Rose Gold': 'hue-rotate(340deg) saturate(1.5) brightness(1.05)',
};

// Get metal filter CSS
export function getMetalFilter(metal: string): string {
    return metalFilters[metal as keyof typeof metalFilters] || '';
}
