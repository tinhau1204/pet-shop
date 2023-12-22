import { create } from "zustand";
import { accessoriesData, petsData } from "../api/types";

interface CartItem extends petsData, accessoriesData {
    count: number;
}

export type CartStore = {
    cart: CartItem[];
    count: () => number;
    add: (product: petsData | accessoriesData | undefined) => void;
    remove: (idProduct: number) => void;
    removeAll: () => void;
};

export const useCartStore = create<CartStore>((set, get) => ({
    cart: [],
    count: () => {
        const { cart } = get();
        if (cart.length) {
            return cart
                .map((item) => item.count)
                .reduce((prev, curr) => prev + curr);
        }
        return 0;
    },
    add: (product: petsData | accessoriesData | undefined) => {
        console.log("product :>> ", product)
        const { cart } = get();
        const updatedCart = updateCart(product, cart);
        set({ cart: updatedCart });
    },
    remove: (idProduct: number) => {
        const { cart } = get();
        const updateCart = removeCart(idProduct, cart);
        set({ cart: updateCart });
    },
    removeAll: () => set({ cart: [] }),
}));

function updateCart(
    product: petsData | accessoriesData | undefined,
    cart: CartItem[],
): CartItem[] {
    const cartItem = { ...product, count: 1 } as CartItem;
    const productOnCart = cart.map((item) => item.id).includes((product?.id || 1));
    if (!productOnCart) cart.push(cartItem);
    else {
        return cart.map((item) => {
            if (item.id === product?.id) {
                return { ...item, count: item.count + 1 } as CartItem;
            }
            return item;
        });
    }
    return cart;
}

function removeCart(idProduct: number, cart: CartItem[]): CartItem[] {
    return cart
        .map((item) => {
            if (item.id === idProduct)
                return { ...item, count: item.count - 1 };
            return item;
        })
        .filter((item) => {
            return item.count;
        });
}
