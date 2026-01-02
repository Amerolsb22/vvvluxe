'use client';

import { pricingConfig } from '@/lib/pricing';
import { useState } from 'react';

export default function AdminConfigPage() {
    const [password, setPassword] = useState('');
    const [authenticated, setAuthenticated] = useState(false);
    const [config, setConfig] = useState(pricingConfig);
    const [saved, setSaved] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'vvvluxe2024';

        if (password === adminPassword) {
            setAuthenticated(true);
        } else {
            alert('Incorrect password');
        }
    };

    const handleSave = () => {
        // TODO: Implement actual config persistence (database or file)
        // console.log('Saving config:', config);
        localStorage.setItem('vvvluxe_pricing_config', JSON.stringify(config));
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    if (!authenticated) {
        return (
            <div className="min-h-screen bg-luxury-black flex items-center justify-center px-6">
                <div className="card-luxury max-w-md w-full p-12">
                    <h1 className="font-serif text-h2 mb-8 text-center">Admin Access</h1>
                    <form onSubmit={handleLogin}>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter admin password"
                            className="input-luxury mb-6"
                            required
                        />
                        <button type="submit" className="btn-primary w-full">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-luxury-warm-gray-50 min-h-screen py-12">
            <div className="mx-auto max-w-5xl px-6">
                <div className="mb-8">
                    <h1 className="font-serif text-h1 mb-2">Admin Configuration</h1>
                    <p className="text-luxury-warm-gray-600">
                        Manage pricing variables and system settings
                    </p>
                </div>

                {/* Gold Prices */}
                <div className="card-luxury p-8 mb-6">
                    <h2 className="font-serif text-h3 mb-6">Gold Prices (AED per gram)</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">18K White Gold</label>
                            <input
                                type="number"
                                value={config.goldPricePerGram['18K White Gold']}
                                onChange={(e) =>
                                    setConfig({
                                        ...config,
                                        goldPricePerGram: {
                                            ...config.goldPricePerGram,
                                            '18K White Gold': parseFloat(e.target.value),
                                        },
                                    })
                                }
                                className="input-luxury"
                                step="0.01"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">18K Yellow Gold</label>
                            <input
                                type="number"
                                value={config.goldPricePerGram['18K Yellow Gold']}
                                onChange={(e) =>
                                    setConfig({
                                        ...config,
                                        goldPricePerGram: {
                                            ...config.goldPricePerGram,
                                            '18K Yellow Gold': parseFloat(e.target.value),
                                        },
                                    })
                                }
                                className="input-luxury"
                                step="0.01"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">18K Rose Gold</label>
                            <input
                                type="number"
                                value={config.goldPricePerGram['18K Rose Gold']}
                                onChange={(e) =>
                                    setConfig({
                                        ...config,
                                        goldPricePerGram: {
                                            ...config.goldPricePerGram,
                                            '18K Rose Gold': parseFloat(e.target.value),
                                        },
                                    })
                                }
                                className="input-luxury"
                                step="0.01"
                            />
                        </div>
                    </div>
                </div>

                {/* Stone Prices */}
                <div className="card-luxury p-8 mb-6">
                    <h2 className="font-serif text-h3 mb-6">Stone Prices (AED per carat)</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">CVD Diamond</label>
                            <input
                                type="number"
                                value={config.stonePricePerCarat['CVD Diamond']}
                                onChange={(e) =>
                                    setConfig({
                                        ...config,
                                        stonePricePerCarat: {
                                            ...config.stonePricePerCarat,
                                            'CVD Diamond': parseFloat(e.target.value),
                                        },
                                    })
                                }
                                className="input-luxury"
                                step="0.01"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Natural Diamond</label>
                            <input
                                type="number"
                                value={config.stonePricePerCarat['Natural Diamond']}
                                onChange={(e) =>
                                    setConfig({
                                        ...config,
                                        stonePricePerCarat: {
                                            ...config.stonePricePerCarat,
                                            'Natural Diamond': parseFloat(e.target.value),
                                        },
                                    })
                                }
                                className="input-luxury"
                                step="0.01"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Gemstone (avg)</label>
                            <input
                                type="number"
                                value={config.stonePricePerCarat['Gemstone']}
                                onChange={(e) =>
                                    setConfig({
                                        ...config,
                                        stonePricePerCarat: {
                                            ...config.stonePricePerCarat,
                                            'Gemstone': parseFloat(e.target.value),
                                        },
                                    })
                                }
                                className="input-luxury"
                                step="0.01"
                            />
                        </div>
                    </div>
                </div>

                {/* Labor Fees */}
                <div className="card-luxury p-8 mb-6">
                    <h2 className="font-serif text-h3 mb-6">Labor Fees (AED)</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Simple (Rope/Basic)</label>
                            <input
                                type="number"
                                value={config.laborFee['Simple']}
                                onChange={(e) =>
                                    setConfig({
                                        ...config,
                                        laborFee: {
                                            ...config.laborFee,
                                            'Simple': parseFloat(e.target.value),
                                        },
                                    })
                                }
                                className="input-luxury"
                                step="0.01"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Medium (Rings/Pendants)</label>
                            <input
                                type="number"
                                value={config.laborFee['Medium']}
                                onChange={(e) =>
                                    setConfig({
                                        ...config,
                                        laborFee: {
                                            ...config.laborFee,
                                            'Medium': parseFloat(e.target.value),
                                        },
                                    })
                                }
                                className="input-luxury"
                                step="0.01"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Complex (Custom/Intricate)</label>
                            <input
                                type="number"
                                value={config.laborFee['Complex']}
                                onChange={(e) =>
                                    setConfig({
                                        ...config,
                                        laborFee: {
                                            ...config.laborFee,
                                            'Complex': parseFloat(e.target.value),
                                        },
                                    })
                                }
                                className="input-luxury"
                                step="0.01"
                            />
                        </div>
                    </div>
                </div>

                {/* Markup & Lead Times */}
                <div className="card-luxury p-8 mb-6">
                    <h2 className="font-serif text-h3 mb-6">Markup & Lead Times</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Markup Percentage (%)</label>
                            <input
                                type="number"
                                value={config.markupPercentage}
                                onChange={(e) =>
                                    setConfig({
                                        ...config,
                                        markupPercentage: parseFloat(e.target.value),
                                    })
                                }
                                className="input-luxury"
                                step="1"
                                min="0"
                                max="100"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Lead Time - Simple (days)</label>
                            <input
                                type="number"
                                value={config.leadTimeByComplexity['Simple']}
                                onChange={(e) =>
                                    setConfig({
                                        ...config,
                                        leadTimeByComplexity: {
                                            ...config.leadTimeByComplexity,
                                            'Simple': parseInt(e.target.value),
                                        },
                                    })
                                }
                                className="input-luxury"
                                step="1"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Lead Time - Medium (days)</label>
                            <input
                                type="number"
                                value={config.leadTimeByComplexity['Medium']}
                                onChange={(e) =>
                                    setConfig({
                                        ...config,
                                        leadTimeByComplexity: {
                                            ...config.leadTimeByComplexity,
                                            'Medium': parseInt(e.target.value),
                                        },
                                    })
                                }
                                className="input-luxury"
                                step="1"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Lead Time - Complex (days)</label>
                            <input
                                type="number"
                                value={config.leadTimeByComplexity['Complex']}
                                onChange={(e) =>
                                    setConfig({
                                        ...config,
                                        leadTimeByComplexity: {
                                            ...config.leadTimeByComplexity,
                                            'Complex': parseInt(e.target.value),
                                        },
                                    })
                                }
                                className="input-luxury"
                                step="1"
                            />
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex gap-4">
                    <button onClick={handleSave} className="btn-primary">
                        {saved ? '✓ Saved' : 'Save Configuration'}
                    </button>
                    <button
                        onClick={() => {
                            setAuthenticated(false);
                            setPassword('');
                        }}
                        className="btn-secondary"
                    >
                        Logout
                    </button>
                </div>

                <div className="mt-8 p-6 bg-luxury-warm-gray-200 rounded">
                    <p className="text-sm text-luxury-warm-gray-700">
                        <strong>Note:</strong> This is a frontend-only demo. In production, configuration
                        should be persisted to a database or environment variables and protected with proper
                        authentication middleware.
                    </p>
                </div>
            </div>
        </div>
    );
}
