import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/types';

export interface CartItem {
    product: Product;
    quantity: number;
    selectedOptions?: {
        size?: string;
        ropeColor?: string;
        metal?: string;
        engraving?: string;
        [key: string]: string | undefined;
    };
}

interface CartStore {
    items: CartItem[];
    isHydrated: boolean;
    setHydrated: () => void;
    addItem: (product: Product, quantity?: number, selectedOptions?: CartItem['selectedOptions']) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            isHydrated: false,

            setHydrated: () => {
                set({ isHydrated: true });
            },

            addItem: (product, quantity = 1, selectedOptions) => {
                set((state) => {
                    const existingItem = state.items.find(
                        (item) => item.product.id === product.id
                    );

                    if (existingItem) {
                        return {
                            items: state.items.map((item) =>
                                item.product.id === product.id
                                    ? { ...item, quantity: item.quantity + quantity }
                                    : item
                            ),
                        };
                    }

                    return {
                        items: [...state.items, { product, quantity, selectedOptions }],
                    };
                });
            },

            removeItem: (productId) => {
                set((state) => ({
                    items: state.items.filter((item) => item.product.id !== productId),
                }));
            },

            updateQuantity: (productId, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(productId);
                    return;
                }

                set((state) => ({
                    items: state.items.map((item) =>
                        item.product.id === productId ? { ...item, quantity } : item
                    ),
                }));
            },

            clearCart: () => {
                set({ items: [] });
            },

            getTotalItems: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0);
            },

            getTotalPrice: () => {
                return get().items.reduce(
                    (total, item) => total + item.product.price * item.quantity,
                    0
                );
            },
        }),
        {
            name: 'vvv-luxe-cart',
            storage: createJSONStorage(() => {
                // Check if we're on the client side
                if (typeof window !== 'undefined') {
                    return localStorage;
                }
                // Return a dummy storage for SSR
                return {
                    getItem: () => null,
                    setItem: () => { },
                    removeItem: () => { },
                };
            }),
            onRehydrateStorage: () => (state) => {
                state?.setHydrated();
            },
        }
    )
);
