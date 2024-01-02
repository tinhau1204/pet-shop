import { create } from "zustand";
import { accessoriesData, petsData } from "../api/types";
const Cookies = require("js-cookie");

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

const cartUser = Cookies.get("cartUser"); 

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
        // if (cart.length < 1) {
        //     const updatedCart = 
        // }
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

        
        if (cartUser?.length > 0 && cartUser !== undefined) {
            const cartUserObj = JSON.parse(cartUser);
            const cartUserObjUpdated = cartUserObj.map((product: any) =>
                product.sku === sku
                    ? { ...product, quantity: newQuantity }
                    : product,
            );
            console.log('cartUserObj', cartUserObj);
            console.log('cartUserObjUpdated', cartUserObjUpdated);
            Cookies.set("cartUser", JSON.stringify(cartUserObjUpdated));

        }
    },
    remove: (idProduct: number, sku: string) => {
        const { cart } = get();
        const updateCart = removeCart(idProduct, sku, cart);
        set({ cart: updateCart });
    },
    removeAll: () => {
        Cookies.set("cartUser", JSON.stringify([]));
        set({ cart: [] });
    },
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
    // const cartData = cart.map((item) => {
    //     return {
    //         id: item.id,
    //         sku: item.sku,
    //         quantity: item.count,
    //     };
    // })
    // Cookies.set("cartUser", JSON.stringify(cartData));
    return cart;
}

function removeCart(
    idProduct: number,
    sku: string,
    cart: CartItem[],
): CartItem[] {
    const cartUserObj = JSON.parse(cartUser);
    const cartItemRemove = cartUserObj.filter((item: any) => !(item.id == idProduct && item.sku == sku));
    console.log('cartItemRemove check', cartItemRemove);
    Cookies.set("cartUser", JSON.stringify(cartItemRemove));
    return cart.filter((item) => !(item.id == idProduct && item.sku == sku));
}
