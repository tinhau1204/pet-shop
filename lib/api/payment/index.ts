import client from "@/lib/axiosClient";

export type PaymentMomo = {
    checkout: {
        items: [
            {
                pet_id: string,
                quantity: number,
            }
        ]
    }
}

export async function paymentMomo(data: any) {
    return await client.post('/payment/checkout/momo', data).then((res) => res.data)
}