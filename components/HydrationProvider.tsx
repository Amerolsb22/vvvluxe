'use client';

import { useEffect } from 'react';
import { useCartStore } from '@/lib/cartStore';

export default function HydrationProvider({ children }: { children: React.ReactNode }) {
    const setHydrated = useCartStore((state) => state.setHydrated);

    useEffect(() => {
        setHydrated();
    }, [setHydrated]);

    return <>{children}</>;
}
