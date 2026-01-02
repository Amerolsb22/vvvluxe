import { DesignTemplate } from '@/types';

export const designTemplates: DesignTemplate[] = [
    // ROPE BRACELET TEMPLATES
    {
        id: 'temp-rope-bracelet-001',
        name: 'Single Diamond Rope Bracelet',
        type: 'Bracelet',
        description: 'Classic silk rope bracelet with center diamond setting',
        previewImage: '/images/templates/rope-bracelet-single.svg',
        baseGoldWeight: 1.5,
        ropeEnabled: true,
        complexity: 'Simple',
        stoneSlots: [
            {
                id: 'center',
                position: 'center',
                allowedShapes: ['Round', 'Princess', 'Oval'],
                minCarat: 0.15,
                maxCarat: 0.50,
            },
        ],
    },
    {
        id: 'temp-rope-bracelet-002',
        name: 'Dual Diamond Rope Bracelet',
        type: 'Bracelet',
        description: 'Two diamonds on silk rope for layered elegance',
        previewImage: '/images/templates/rope-bracelet-dual.svg',
        baseGoldWeight: 1.4,
        ropeEnabled: true,
        complexity: 'Medium',
        stoneSlots: [
            {
                id: 'stone-1',
                position: 'left',
                allowedShapes: ['Round', 'Princess'],
                minCarat: 0.12,
                maxCarat: 0.30,
            },
            {
                id: 'stone-2',
                position: 'right',
                allowedShapes: ['Round', 'Princess'],
                minCarat: 0.12,
                maxCarat: 0.30,
            },
        ],
    },

    // ROPE NECKLACE TEMPLATES
    {
        id: 'temp-rope-necklace-001',
        name: 'Simple Pendant Rope Necklace',
        type: 'Necklace',
        description: 'Minimalist pendant on silk cord',
        previewImage: '/images/templates/rope-necklace-simple.svg',
        baseGoldWeight: 1.8,
        ropeEnabled: true,
        complexity: 'Simple',
        stoneSlots: [
            {
                id: 'pendant',
                position: 'center-pendant',
                allowedShapes: ['Round', 'Princess', 'Pear', 'Marquise'],
                minCarat: 0.25,
                maxCarat: 0.75,
            },
        ],
    },
    {
        id: 'temp-rope-necklace-002',
        name: 'Halo Pendant Rope Necklace',
        type: 'Necklace',
        description: 'Center stone with halo accent on silk cord',
        previewImage: '/images/templates/rope-necklace-halo.svg',
        baseGoldWeight: 2.5,
        ropeEnabled: true,
        complexity: 'Medium',
        stoneSlots: [
            {
                id: 'center',
                position: 'pendant-center',
                allowedShapes: ['Round', 'Oval', 'Cushion'],
                minCarat: 0.30,
                maxCarat: 1.0,
            },
            {
                id: 'halo',
                position: 'halo-accent',
                allowedShapes: ['Round'],
                minCarat: 0.20,
                maxCarat: 0.40,
            },
        ],
    },

    // TRADITIONAL RING TEMPLATES
    {
        id: 'temp-ring-001',
        name: 'Classic Solitaire Ring',
        type: 'Ring',
        description: 'Timeless solitaire engagement ring',
        previewImage: '/images/templates/ring-solitaire.svg',
        baseGoldWeight: 3.5,
        ropeEnabled: false,
        complexity: 'Simple',
        stoneSlots: [
            {
                id: 'center',
                position: 'center',
                allowedShapes: ['Round', 'Princess', 'Oval', 'Emerald', 'Pear', 'Marquise'],
                minCarat: 0.50,
                maxCarat: 3.0,
            },
        ],
    },
    {
        id: 'temp-ring-002',
        name: 'Three Stone Ring',
        type: 'Ring',
        description: 'Past, present, future - three stone design',
        previewImage: '/images/templates/ring-three-stone.svg',
        baseGoldWeight: 4.0,
        ropeEnabled: false,
        complexity: 'Medium',
        stoneSlots: [
            {
                id: 'center',
                position: 'center',
                allowedShapes: ['Round', 'Oval', 'Emerald', 'Cushion'],
                minCarat: 0.75,
                maxCarat: 2.5,
            },
            {
                id: 'side-left',
                position: 'side-left',
                allowedShapes: ['Round', 'Pear', 'Marquise'],
                minCarat: 0.25,
                maxCarat: 0.75,
            },
            {
                id: 'side-right',
                position: 'side-right',
                allowedShapes: ['Round', 'Pear', 'Marquise'],
                minCarat: 0.25,
                maxCarat: 0.75,
            },
        ],
    },
    {
        id: 'temp-ring-003',
        name: 'Halo Engagement Ring',
        type: 'Ring',
        description: 'Center stone surrounded by diamond halo',
        previewImage: '/images/templates/ring-halo.svg',
        baseGoldWeight: 4.5,
        ropeEnabled: false,
        complexity: 'Complex',
        stoneSlots: [
            {
                id: 'center',
                position: 'center',
                allowedShapes: ['Round', 'Oval', 'Cushion', 'Princess'],
                minCarat: 0.50,
                maxCarat: 2.0,
            },
            {
                id: 'halo',
                position: 'halo-surround',
                allowedShapes: ['Round'],
                minCarat: 0.30,
                maxCarat: 0.60,
            },
        ],
    },

    // EARRINGS TEMPLATES
    {
        id: 'temp-earrings-001',
        name: 'Diamond Stud Earrings',
        type: 'Earrings',
        description: 'Classic diamond studs (pair)',
        previewImage: '/images/templates/earrings-studs.svg',
        baseGoldWeight: 1.5,
        ropeEnabled: false,
        complexity: 'Simple',
        stoneSlots: [
            {
                id: 'pair',
                position: 'studs',
                allowedShapes: ['Round', 'Princess'],
                minCarat: 0.20,
                maxCarat: 1.0,
            },
        ],
    },
    {
        id: 'temp-earrings-002',
        name: 'Drop Earrings',
        type: 'Earrings',
        description: 'Elegant drop earrings with pear or oval stones',
        previewImage: '/images/templates/earrings-drop.svg',
        baseGoldWeight: 2.5,
        ropeEnabled: false,
        complexity: 'Medium',
        stoneSlots: [
            {
                id: 'drops',
                position: 'drop',
                allowedShapes: ['Pear', 'Oval', 'Marquise'],
                minCarat: 0.50,
                maxCarat: 2.0,
            },
        ],
    },
];

export function getTemplateById(id: string): DesignTemplate | undefined {
    return designTemplates.find(t => t.id === id);
}

export function getTemplatesByType(type: string): DesignTemplate[] {
    return designTemplates.filter(t => t.type === type);
}
