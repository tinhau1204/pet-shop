import { useEffect, useState } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

interface PaypalProps {
    cartData: any;
    totalAmount?: string;
    orderID: string;
}

//Paypal button
const PaypalButton = ({ cartData, totalAmount, orderID }: PaypalProps) => {
    const [{ options }, dispatch] = usePayPalScriptReducer();
    const [{ isPending }] = usePayPalScriptReducer();

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

    return (
        <>
            {/* {isPending ? <div className="spinner" /> : null} */}
            <PayPalButtons
                disabled={
                    totalAmount && parseInt(totalAmount) !== 0 ? false : true
                }
                createOrder={(data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: "USD",
                                        value: totalAmount || "1",
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
