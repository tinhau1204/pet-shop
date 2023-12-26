import { useEffect, useState } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useQuery } from "react-query";
import { paymentPaypal, returnPaymentPaypal } from "@/lib/api/payment";
import { useRouter } from "next/router";

interface PaypalProps {
    cartData: any;
    totalAmount?: string;
    orderID: string;
}

//Paypal button
const PaypalButton = ({ cartData, totalAmount, orderID }: PaypalProps) => {
    const [{ options }, dispatch] = usePayPalScriptReducer();
    const [{ isPending }] = usePayPalScriptReducer();
    const router = useRouter();
    const paypalCheckoutQuery = useQuery({
        queryKey: "paypalCheckout",
        queryFn: () =>
            returnPaymentPaypal({
                status: "completed",
                orderId: orderID,
            }),
        onSuccess: (data) => {
            // router.push(`/checkout/${data?.status}&&orderId=${data?.orerId}`)
        },
        onError: (error) => {},
    });

    // Add function to save order data to database
    const createOrderWithPaypal = async (values: any) => {
        const buyerName =
            values?.details?.payer?.name?.given_name +
            values?.details?.payer?.name?.surname;

        let order_info = {
            orderID: orderID,
            name: buyerName,
            totalAmount: totalAmount,
            checkout: cartData,
        };

        //Insert API here//

        console.log("Order created", order_info);
    };

    useEffect(() => {
        console.log("Inside paypal", totalAmount);
    }, [totalAmount]);

    return (
        <>
            {isPending ? (
                <div className="spinner border-4 border-solid border-opacity-10 border-blue-500 rounded-full animate-spin"></div>
            ) : null}
            {console.log("check isPending", isPending)}
            <PayPalButtons
                forceReRender={[totalAmount]}
                disabled={
                    totalAmount && parseInt(totalAmount) !== 0 ? false : true
                }
                createOrder={(data, actions) => {
                    console.log("data", cartData);
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: "USD",
                                        value: totalAmount || "10",
                                    },
                                },
                            ],
                        })
                        .then((orderId) => {
                            console.log("before approve", orderId);
                            return orderId;
                        });
                }}
                onApprove={async (data, actions) => {
                    const capturePromise = actions?.order?.capture();
                    console.log("capterPromise", await capturePromise);
                    console.log("onApprove");
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
                    console.log("Cancel", data);
                }}
                onError={(data) => {
                    console.log("Error", data);
                }}
            />
        </>
    );
};

export default PaypalButton;
