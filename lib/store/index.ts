import { create } from "zustand";
import { IUser } from "../api/types";

type Store = {
    authUser: IUser | null;
    requestLoading: boolean;
    cart: any;
    setAuthUser: (user: IUser | null) => void;
    setRequestLoading: (isLoading: boolean) => void;
    setCart: (cart: any) => void;
};

const useStore = create<Store>((set) => ({
    authUser: null,
    cart: null,
    requestLoading: false,
    setAuthUser: (user) => set((state) => ({ ...state, authUser: user })),
    setRequestLoading: (isLoading) =>
        set((state) => ({ ...state, requestLoading: isLoading })),
    setCart: (cart) => set((state) => ({ ...state, cart: cart })),
}));

export default useStore;
