import { useEffect, useState } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useMutation, useQuery } from "react-query";
import { paymentPaypal, returnPaymentPaypal } from "@/lib/api/payment";
import { useRouter } from "next/router";
import { Loader } from "@mantine/core";
import { toast } from "react-toastify";
import { useCartStore } from "@/lib/store/cart";
const Cookies = require("js-cookie");

interface PaypalProps {
    cartData: any;
    totalAmount?: string;
}

//Paypal button
const PaypalButton = ({ cartData, totalAmount }: PaypalProps) => {
    const [{ options }, dispatch] = usePayPalScriptReducer();
    const [{ isPending }] = usePayPalScriptReducer();
    const [orderId, setOrderId] = useState<string>("");
    const router = useRouter();
    const { removeAll } = useCartStore();

    const paypalCheckoutMutation = useMutation({
        mutationKey: "paypalCheckout",
        mutationFn: () =>
            paymentPaypal({
                checkout: cartData.checkout,
            }),
        onSuccess: (data) => {
            setOrderId(data.data?.orderId);
        },
        onError: (error) => {},
    });
    const paypalReturnMutation = useMutation({
        mutationKey: ["paypalReturn"],
        mutationFn: () =>
            returnPaymentPaypal({
                status: "COMPLETED",
                orderId: orderId,
            }),
        onSuccess: (data) => {
            router.push(
                `/checkout/${data?.data?.status}?orderId=${data?.data?.orderId}`,
            );
            removeAll();
            Cookies.set("cartUser", []);
        },
        onError: (error) => {
            console.log("error", error);
        },
    });

    // Add function to save order data to database
    const createOrderWithPaypal = async (values: any) => {
        const buyerName =
            values?.details?.payer?.name?.given_name +
            values?.details?.payer?.name?.surname;

        let order_info = {
            orderID: orderId,
            name: buyerName,
            totalAmount:
                totalAmount &&
                (parseFloat(totalAmount) / 24000).toFixed(2).toString(),
            checkout: cartData.checkout,
        };

        //Insert API here//
        console.log("Order created", order_info);
        paypalReturnMutation.mutate();
    };

    useEffect(() => {
        console.log(
            "Inside paypal",
            totalAmount && (parseInt(totalAmount) / 24000).toFixed(2),
        );
    }, [totalAmount]);

    return (
        <>
            {isPending ? (
                <Loader color="cyan" type="dots" className="text-center" />
            ) : null}
            <PayPalButtons
                forceReRender={[totalAmount]}
                disabled={
                    totalAmount && parseInt(totalAmount) !== 0 ? false : true
                }
                createOrder={(data, actions) => {
                    paypalCheckoutMutation.mutate();
                    // console.log("totalAmount", (totalAmount && ((parseInt(totalAmount) / 24000).toFixed(2)).toString()))
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: "USD",
                                        value:
                                            (totalAmount &&
                                                (
                                                    parseFloat(totalAmount) /
                                                    24000
                                                )
                                                    .toFixed(2)
                                                    .toString()) ||
                                            "10",
                                    },
                                },
                            ],
                        })
                        .then((orderId) => {
                            return orderId;
                        });
                }}
                onApprove={async (data, actions) => {
                    const capturePromise = actions?.order?.capture();
                    if (capturePromise) {
                        try {
                            const details = await capturePromise;
                            if (data) {
                                createOrderWithPaypal({
                                    details,
                                });
                            }
                        } catch (error) {
                            // Handle any errors that might occur during capture
                            console.error(error);
                        }
                    }
                }}
                onCancel={(data) => {
                    toast.warn("Payment cancelled try again", {
                        position: "bottom-right",
                        autoClose: 2000,
                    });
                }}
                onError={(data) => {
                    console.log("Error", data);
                }}
            />
        </>
    );
};

export default PaypalButton;
