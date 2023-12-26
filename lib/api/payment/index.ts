import client from "@/lib/axiosClient";

export type PaymentMomoType = {
    checkout: {
        items: [
            {
                pet_id: string;
                quantity: number;
            },
        ];
    };
};

export type returnPaymentPaypalType = {
    status: string;
    orderId: string;
};

export async function paymentMomo(data: any) {
    return await client
        .post("/payment/checkout/momo", data)
        .then((res) => res.data);
}

export async function paymentPaypal(data: any) {
    return await client
        .post("/payment/checkout/paypal", data)
        .then((res) => res.data);
}

export async function returnPaymentPaypal(data: returnPaymentPaypalType) {
    return await client
        .post("/payment/return/paypal", data)
        .then((res) => res.data);
}
