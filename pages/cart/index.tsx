import {
    ActionIcon,
    Avatar,
    Button,
    CloseIcon,
    Divider,
    Flex,
    Grid,
    NativeSelect,
    Paper,
    Stack,
    Table,
    Text,
    TextInput,
    TextInputProps,
} from "@mantine/core";
import ArrowLeft from "@my-images/Arrow_Left_SM.svg";
import React, { ChangeEvent, MouseEventHandler, useEffect } from "react";
import { useCartStore } from "@/lib/store/cart";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import { paymentMomo } from "@/lib/api/payment";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PaypalButton from "@/components/shards/Payments/PaypalButton";
const Cookies = require("js-cookie");
import Link from "next/link";

function ProductInfo({
    src,
    name,
    sku,
    id,
    slug,
}: {
    src: string;
    name: string;
    sku: string;
    id: number;
    slug: string;
}) {
    return (
        <Flex
            direction="row"
            justify="flex-start"
            align="center"
            className="w-full gap-4"
        >
            <Avatar src={`${src}`} variant="filled" radius="md" size="lg" />
            <Flex
                direction="column"
                justify="flex-start"
                align="flex-start"
                className="w-full gap-0.5"
            >
                <Link
                    className="text-sm text-blue-medium font-bold max-w-[150px] hover:underline"
                    href={`/products/${slug}/${id}`}
                >
                    {name}
                </Link>
                <Text className="text-xs text-black-light">{sku}</Text>
            </Flex>
        </Flex>
    );
}

function QuantityField({
    element,
    updateQuantity,
}: {
    element: any;
    updateQuantity: (sku: string, newQuantity: number) => void;
}) {
    const [quantity, setQuantity] = React.useState<number>(element?.count);

    const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log("check event", event.target.value);
        if (event.target.value !== "") {
            const newQuantity = parseInt(event.target.value, 10);

            const validQuantity = newQuantity <= element.stock_quantity;
            let message = `There ${
                element.stock_quantity > 1 ? "are" : "is"
            } only ${element.stock_quantity} product${
                element.stock_quantity > 1 ? "s" : ""
            } left`;
            if (!validQuantity) {
                setQuantity(element.stock_quantity);
                const sku = element.sku;
                toast.warn(message, {
                    position: "bottom-right",
                    autoClose: 3000,
                    closeOnClick: true,
                });
                updateQuantity(sku, element.stock_quantity);
            } else {
                setQuantity(newQuantity);
                const sku = element.sku;
                updateQuantity(sku, newQuantity);
            }
        } else {
            setQuantity(1);
            const sku = element.sku;
            updateQuantity(sku, 1);
        }
    };

    return (
        <TextInput
            radius="xl"
            className="max-w-[5rem] font-semibold"
            value={quantity.toString() || String(1)}
            type="number"
            max={element.stock_quantity}
            min={1}
            onChange={handleQuantityChange}
            classNames={{
                input: "text-blue-medium",
            }}
        />
    );
}

export default function Cart() {
    const router = useRouter();
    const [payment, setPayment] = React.useState("");
    const { cart, updateCartProduct, remove } = useCartStore();
    const handlePaymentChange: MouseEventHandler<HTMLButtonElement> = (
        event,
    ) => {
        setPayment(event.currentTarget.textContent?.toString() || "");
    };

    const rows =
        cart &&
        cart.map((element, index) => (
            <Table.Tr key={index}>
                <Table.Td>
                    <ProductInfo
                        src={element.thumbnail_image || ""}
                        name={element.name}
                        sku={element.sku}
                        id={element.id}
                        slug={element.type.parent.name}
                    />
                </Table.Td>
                <Table.Td>
                    <QuantityField
                        key={element.sku}
                        element={element}
                        updateQuantity={updateCartProduct}
                    />
                </Table.Td>
                <Table.Td className="text-center">
                    <Text className="text-blue-medium font-semibold">
                        {formatPrice(element.price * element.count)}
                    </Text>
                </Table.Td>
                <Table.Td className="max-w-[2rem]">
                    <ActionIcon
                        variant="transparent"
                        radius="xl"
                        size="md"
                        onClick={() => {
                            remove(element.id, element.sku);
                        }}
                    >
                        <CloseIcon className="text-black-light font-extrabold" />
                    </ActionIcon>
                </Table.Td>
            </Table.Tr>
        ));

    function formatPrice(price: string | number | undefined) {
        return price?.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
        });
    }

    return (
        <Grid>
            <Grid.Col span={{ base: 12, md: 8 }}>
                <Paper
                    className={`h-fit overflow-auto w-full p-8 border border-black-light/10`}
                    radius="md"
                    shadow="xl"
                >
                    <h2 className="text-3xl font-bold text-blue-medium">
                        Shopping Cart
                    </h2>

                    <Table
                        classNames={{
                            th: "border-b-2 border-blue-medium",
                            tr: "border-b-2 border-blue-medium ",
                            tbody: "last:border-b-2 border-blue-medium",
                        }}
                        className="mt-4"
                        verticalSpacing="md"
                        highlightOnHover
                    >
                        <Table.Thead className="text-blue-medium text-base font-normal">
                            <Table.Tr>
                                <Table.Th>Product</Table.Th>
                                {/* <Table.Th>Size</Table.Th> */}
                                <Table.Th>Quantity</Table.Th>
                                <Table.Th className="text-center">
                                    Total price
                                </Table.Th>
                                <Table.Th></Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{rows}</Table.Tbody>
                    </Table>

                    <Flex
                        direction="row"
                        justify="space-between"
                        align="center"
                        className="w-full gap-4 mt-8"
                    >
                        <Button
                            variant="outline"
                            size="lg"
                            radius="xl"
                            leftSection={
                                <ArrowLeft className="text-blue-medium font-bold" />
                            }
                            className="border-blue-medium/70 text-blue-medium font-bold"
                            onClick={() => router.push("/")}
                        >
                            Continue Shopping
                        </Button>

                        <Stack className="w-64">
                            <div className="w-full flex flex-row items-center justify-between">
                                <Text className="text-blue-medium font-bold text-base">
                                    Subtotal:
                                </Text>
                                <Text className="text-blue-medium font-semibold text-base">
                                    {formatPrice(
                                        cart.reduce(
                                            (acc, cur) =>
                                                acc + cur.price * cur.count,
                                            0,
                                        ),
                                    )}
                                </Text>
                            </div>
                            <div className="w-full flex flex-row items-center justify-between">
                                <Text className="text-blue-medium font-bold text-base">
                                    Shipping:
                                </Text>
                                <Text className="text-blue-medium font-semibold text-base">
                                    Free
                                </Text>
                            </div>

                            <Divider className="border-blue-medium" size="sm" />
                            <div className="w-full flex flex-row items-center justify-between">
                                <Text className="text-blue-medium font-bold text-lg">
                                    Total:
                                </Text>
                                <Text className="text-blue-medium font-semibold text-xl">
                                    {formatPrice(
                                        cart.reduce(
                                            (acc, cur) =>
                                                acc + cur.price * cur.count,
                                            0,
                                        ),
                                    )}
                                </Text>
                            </div>
                        </Stack>
                    </Flex>
                </Paper>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
                <Paper
                    className="h-fit overflow-auto py-4 pl-12 pr-8 bg-blue-medium"
                    radius="md"
                >
                    <Link
                        href="#"
                        className="w-full flex flex-row items-center justify-start mb-2"
                    >
                        <ActionIcon
                            variant="transparent"
                            radius="xl"
                            size="md"
                            className="mr-2 -ml-2 text-primary"
                        >
                            <ArrowLeft />
                        </ActionIcon>
                        <Text className="text-primary font-bold text-sm">
                            Back to Cart
                        </Text>
                    </Link>
                    <h2 className="text-3xl font-bold text-primary">
                        Payment Info
                    </h2>

                    <div className="w-full mt-8 border-b border-primary pb-4">
                        <Text className="text-primary text-base font-bold">
                            Payment method
                        </Text>

                        <div className="grid grid-cols-6 justify-around place-items-center gap-y-2 gap-x-6 mt-4">
                            <Button
                                className={`w-full col-span-3  ${
                                    payment == "MoMo"
                                        ? "text-primary border-primary"
                                        : "text-primary/40 border-primary/40"
                                }`}
                                variant="outline"
                                radius="xl"
                                onClick={handlePaymentChange}
                            >
                                MoMo
                            </Button>
                            <Button
                                className={`w-full col-span-3  ${
                                    payment == "Paypal"
                                        ? "text-primary border-primary"
                                        : "text-primary/40 border-primary/40"
                                }`}
                                variant="outline"
                                radius="xl"
                                onClick={handlePaymentChange}
                            >
                                Paypal
                            </Button>
                        </div>
                    </div>

                    <div className="w-full mt-8 pb-4">
                        {payment == "MoMo" ? (
                            <MoMoMethod />
                        ) : payment == "Paypal" ? (
                            <PaypalMethod />
                        ) : (
                            <></>
                        )}
                    </div>
                </Paper>
            </Grid.Col>
        </Grid>
    );
}

function MoMoMethod() {
    const { cart } = useCartStore();
    const [momoUrl, setMomoUrl] = React.useState("");

    const data = cart.map((item) => {
        return item.type.parent.name === "pet"
            ? {
                  pet_id: item.id,
                  quantity: item.count,
              }
            : {
                  accessory_id: item.id,
                  quantity: item.count,
              };
    });

    const dataMapping = {
        checkout: {
            items: [...data],
        },
    };

    const usePaymentMutation = useMutation({
        mutationKey: ["payment"],
        mutationFn: () => paymentMomo(dataMapping),
        onSuccess: (data: any) => {
            setMomoUrl(data.data);
        },
        onError: (error) => {
            toast.error("Payment failed", {
                position: "bottom-right",
                autoClose: 3000,
                closeOnClick: true,
            });
        },
    });

    useEffect(() => {
        if (momoUrl) window.open(momoUrl, "_self");
    }, [momoUrl]);

    return (
        <Button
            className="rounded-lg w-full bg-pink-normal"
            size="xl"
            classNames={{
                inner: "justify-around w-full",
                label: "flex flex-row justify-center w-full gap-4",
            }}
            onClick={() => usePaymentMutation.mutate()}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 48 48"
            >
                <circle
                    cx="34.571"
                    cy="13.429"
                    r="7.929"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.5 21.357V9.466c0-1.985 1.851-3.964 3.965-3.964c2.119 0 3.965 1.978 3.965 3.964v11.891"
                />
                <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.429 9.465c0-1.985 1.85-3.964 3.964-3.964c2.119 0 3.965 1.978 3.965 3.964v11.891M5.5 42.5V30.608c0-1.985 1.85-3.965 3.964-3.965c2.119 0 3.965 1.979 3.965 3.965V42.5m0-11.892c0-1.985 1.85-3.965 3.964-3.965c2.119 0 3.965 1.979 3.965 3.965V42.5"
                />
                <circle
                    cx="34.571"
                    cy="34.571"
                    r="7.929"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
            PAY WITH MOMO
        </Button>
    );
}

function PaypalMethod() {
    const { cart } = useCartStore();

    const data = cart.map((item) => {
        return item.type.parent.name === "pet"
            ? {
                  pet_id: item.id,
                  quantity: item.count,
              }
            : {
                  accessory_id: item.id,
                  quantity: item.count,
              };
    });

    const dataMapping = {
        checkout: {
            items: [...data],
        },
    };

    const currentTotal = cart.reduce(
        (acc, cur) => acc + cur.price * cur.count,
        0,
    );

    return (
        <div>
            <PayPalScriptProvider
                options={{
                    clientId: process.env.NEXT_PUBLIC_CLIENT_ID as string,
                    components: "buttons",
                    currency: "USD",
                }}
            >
                <PaypalButton
                    cartData={dataMapping}
                    totalAmount={currentTotal.toString()}
                />
            </PayPalScriptProvider>
        </div>
    );
}
