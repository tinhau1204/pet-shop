import { create } from "zustand";
import { IUser } from "../api/types";
import recombeeClient from "../../lib/recombee";

type Store = {
    authUser: IUser | null;
    requestLoading: boolean;
    cart: any;
    setAuthUser: (user: IUser | null) => void;
    setRequestLoading: (isLoading: boolean) => void;
    setCart: (cart: any) => void;
    setRecommid: (
        userId: string,
    ) => Promise<{ recommId: string; items: any[] }>;
};

const useStore = create<Store>((set) => ({
    authUser: null,
    cart: null,
    requestLoading: false,
    setAuthUser: (user) => set((state) => ({ ...state, authUser: user })),
    setRequestLoading: (isLoading) =>
        set((state) => ({ ...state, requestLoading: isLoading })),
    setCart: (cart) => set((state) => ({ ...state, cart: cart })),
    setRecommid: async (userId: string) => {
        return await recombeeClient.client
            .send(
                new recombeeClient.recombee_api.RecommendItemsToUser(
                    userId,
                    4,
                    {
                        // optional parameters:
                        scenario: "popular-products",
                        cascadeCreate: true,
                        returnProperties: true,
                        includedProperties: ["name", "type"],
                    },
                ),
            )
            .then(function (res) {
                // handle response
                console.log("res :>> ", res);
                console.log("recommId :>> ", res.recommId);
                return { recommId: res.recommId, items: res.recomms };
            });
    },
}));

export default useStore;
