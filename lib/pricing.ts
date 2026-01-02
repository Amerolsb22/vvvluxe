import { PricingConfig } from '@/types';

export const pricingConfig: PricingConfig = {
    goldPricePerGram: {
        '18K White Gold': 68,
        '18K Yellow Gold': 65,
        '18K Rose Gold': 67,
    },
    stonePricePerCarat: {
        'CVD Diamond': 450,
        'Natural Diamond': 3500,
        'Gemstone': 800,
    },
    laborFee: {
        'Simple': 200,
        'Medium': 400,
        'Complex': 750,
    },
    markupPercentage: 35,
    leadTimeByComplexity: {
        'Simple': 7,
        'Medium': 14,
        'Complex': 21,
    },
};

export function calculatePrice(
    goldWeight: number,
    metalType: string,
    stones: Array<{ type: string; caratWeight: number }>,
    complexity: 'Simple' | 'Medium' | 'Complex'
) {
    const goldCost = goldWeight * (pricingConfig.goldPricePerGram[metalType as keyof typeof pricingConfig.goldPricePerGram] || 65);

    const stoneCost = stones.reduce((total, stone) => {
        const pricePerCarat = pricingConfig.stonePricePerCarat[stone.type as keyof typeof pricingConfig.stonePricePerCarat] || 500;
        return total + (stone.caratWeight * pricePerCarat);
    }, 0);

    const laborCost = pricingConfig.laborFee[complexity];
    const subtotal = goldCost + stoneCost + laborCost;
    const markup = subtotal * (pricingConfig.markupPercentage / 100);
    const total = Math.round(subtotal + markup);

    return {
        goldCost: Math.round(goldCost),
        stoneCost: Math.round(stoneCost),
        laborCost,
        subtotal: Math.round(subtotal),
        markup: Math.round(markup),
        total,
        leadTimeDays: pricingConfig.leadTimeByComplexity[complexity],
    };
}
