import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'sonner';
export const useCompareStore = create(persist((set, get) => ({
    items: [],
    isModalOpen: false,
    addToCompare: (product) => {
        const current = get().items;
        if (current.some((p) => p.id === product.id)) {
            return false;
        }
        if (current.length >= 4) {
            toast.error('Comparison limit reached', {
                description: 'You can compare up to 4 products simultaneously.',
            });
            return false;
        }
        set({ items: [...current, product] });
        toast.success(`Added ${product.name} to comparison`, {
            description: `${current.length + 1} of 4 slots filled.`,
        });
        return true;
    },
    removeFromCompare: (productId) => {
        set((state) => ({
            items: state.items.filter((p) => p.id !== productId),
        }));
    },
    toggleCompare: (product) => {
        const inList = get().items.some((p) => p.id === product.id);
        if (inList) {
            get().removeFromCompare(product.id);
        }
        else {
            get().addToCompare(product);
        }
    },
    isInCompare: (productId) => {
        return get().items.some((p) => p.id === productId);
    },
    clearCompare: () => set({ items: [], isModalOpen: false }),
    openCompareModal: () => set({ isModalOpen: true }),
    closeCompareModal: () => set({ isModalOpen: false }),
}), {
    name: 'goodfind-compare-storage',
    partialize: (state) => ({ items: state.items }),
}));
