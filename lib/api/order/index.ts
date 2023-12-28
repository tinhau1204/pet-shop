import client from "@/lib/axiosClient";

export type SearchOrderByUserIdType = {
    search: {
        user: {
            id: number;
        };
    };
};

export type SearchOrderDetailByOrderId = {
    search: {
        order: {
            id: number;
        };
    };
};

export type OrderUser = {
    address: string;
    avatar_url: string;
    created_at: string;
    deleted_at: string | null;
    email: string;
    facebook_id: string;
    gender: string;
    google_id: string;
    id: number;
    is_admin: boolean;
    is_locked: boolean;
    is_verified: boolean;
    name: string;
    password: string;
    phone: string;
    state: string;
    updated_at: string;
    username: string;
    verification_token: string;
    verified_at: string | null;
};

export type OrderResponseType = {
    code: string;
    created_at: string;
    deleted_at: string | null;
    id: number;
    order_status: "COMPLETED" | "CANCELED" | "PENDING";
    payment: string;
    total: number;
    state: string;
    updated_at: string;
    user_id: number;
    user: OrderUser;
};

export async function searchOrderByUserId(data: SearchOrderByUserIdType) {
    return await client.post("/order/search", data).then((res) => res.data);
}

export async function searchOrderDetailByOrderId(
    data: SearchOrderDetailByOrderId,
) {
    return await client
        .post("/order-detail/search/order", data)
        .then((res) => res.data);
}
