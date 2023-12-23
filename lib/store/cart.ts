import { create } from "zustand";
import { accessoriesData, petsData } from "../api/types";

interface CartItem extends petsData, accessoriesData {
    count: number;
    // type: petsData | accessoriesData;
}

export type CartStore = {
    cart: CartItem[];
    count: () => number;
    // type: (type: string) => CartItem[];
    add: (product: petsData | accessoriesData | undefined) => void;
    updateCartProduct: (sku: string, newQuantity: number) => void;
    remove: (idProduct: number, sku: string) => void;
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
        const { cart } = get();
        const updatedCart = updateCart(product, cart);
        set({ cart: updatedCart });
    },
    updateCartProduct: (sku: string, newQuantity: number) => {
        set((state) => ({
            cart: state.cart.map((product) =>
                product.sku === sku
                    ? { ...product, count: newQuantity }
                    : product,
            ),
        }));
    },
    remove: (idProduct: number, sku: string) => {
        const { cart } = get();
        const updateCart = removeCart(idProduct, sku, cart);
        set({ cart: updateCart });
    },
    removeAll: () => set({ cart: [] }),
}));

function updateCart(
    product: petsData | accessoriesData | undefined,
    cart: CartItem[],
): CartItem[] {
    const cartItem = { ...product, count: 1 } as CartItem;
    const productOnCart = cart.some(
        (item) =>
            item.id === (product?.id || 1) &&
            item.type?.parent?.name === (product?.type.parent.name || ""),
    );
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

function removeCart(
    idProduct: number,
    sku: string,
    cart: CartItem[],
): CartItem[] {
    return cart.filter((item) => !(item.id == idProduct && item.sku == sku));
}
