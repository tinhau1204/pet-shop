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
import { YearPickerInput } from "@mantine/dates";
import ArrownDown from "@my-images/arrowDown.svg";
import ArrowLeft from "@my-images/Arrow_Left_SM.svg";
import React, { ChangeEvent, MouseEventHandler, useEffect } from "react";
import ArrowDownIcon from "@my-images/Caret_Down_MD.svg";
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
        const newQuantity = parseInt(event.target.value, 10);

        const validQuantity = newQuantity <= element.stock_quantity;
        let message = `There ${element.stock_quantity > 1 ? "are" : "is"
            } only ${element.stock_quantity} product${element.stock_quantity > 1 ? "s" : ""
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
    };

    return (
        <TextInput
            radius="xl"
            className="max-w-[5rem] font-semibold"
            // defaultValue={quantity}
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
// function ProductSize({ data }: { data?: string[] }) {
//     return (
//         <NativeSelect
//             radius="xl"
//             data={["S", "M", "L", "XL"]}
//             classNames={{
//                 input: "border-black-light/20 text-blue-medium font-semibold",
//             }}
//             rightSection={<ArrownDown className="text-blue-medium font-bold" />}
//             className="max-w-[6rem]"
//         />
//     );
// }

export default function Cart() {
    const router = useRouter();
    const [payment, setPayment] = React.useState("");
    const { cart, updateCartProduct, remove } = useCartStore();
    const handlePaymentChange: MouseEventHandler<HTMLButtonElement> = (
        event,
    ) => {
        setPayment(
            event.currentTarget.textContent?.toString() || "",
        );
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
                        {element.price * element.count} VND
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
                                    {cart.reduce(
                                        (acc, cur) =>
                                            acc + cur.price * cur.count,
                                        0,
                                    )}{" "}
                                    VND
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
                                    {cart.reduce(
                                        (acc, cur) =>
                                            acc + cur.price * cur.count,
                                        0,
                                    )}{" "}
                                    VND
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
                            {/* <Button
                                className={`w-full col-span-3  ${payment == "Credit Card"
                                    ? "text-primary border-primary"
                                    : "text-primary/40 border-primary/40"
                                    }`}
                                variant="outline"
                                radius="xl"
                                onClick={handlePaymentChange}
                            >
                                Credit Card
                            </Button> */}
                            <Button
                                className={`w-full col-span-3  ${payment == "MoMo"
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
                                className={`w-full col-span-3  ${payment == "Paypal"
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

// type CreditCard = {
//     cardHolderName: String;
//     cardNumber: Number;
//     expirationDate?: Date | null;
//     cvv: Number;
// };

// function CreditCardMethod() {
//     const [value, setValue] = React.useState<CreditCard | undefined>({
//         cardHolderName: "",
//         cardNumber: 0,
//         expirationDate: new Date(),
//         cvv: 0,
//     });

//     const handleExpirationDateChange = (newDate: Date | null) => {
//         setValue((prev) => ({ ...prev!, expirationDate: newDate }));
//     };

// return (
//     <form className="h-full flex flex-col justify-center w-full items-start gap-4">
//         <div className="flex flex-row justify-center w-full items-center gap-3">
//             <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 36 36"
//             >
//                 <path
//                     fill="#FFAC33"
//                     d="M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4V9s0-4-4-4z"
//                 />
//                 <path fill="#292F33" d="M0 10h36v5H0z" />
//                 <path fill="#F4F7F9" d="M4 19h28v6H4z" />
//                 <path
//                     fill="#8899A6"
//                     d="M19 24c-1.703 0-2.341-1.21-2.469-1.801c-.547.041-1.08.303-1.805.764C13.961 23.449 13.094 24 12 24c-1.197 0-1.924-.675-2-2c-.003-.056.038-.188.021-.188c-1.858 0-3.202 1.761-3.215 1.779a.997.997 0 0 1-1.397.215a1 1 0 0 1-.215-1.398C5.271 22.303 7.11 20 10 20c1.937 0 2.048 1.375 2.078 1.888l.007.109c.486-.034.991-.354 1.57-.723c.961-.61 2.153-1.371 3.75-.962c.871.223 1.007 1.031 1.059 1.336c.013.076.032.19.049.226c.007 0 .146.091.577.13c.82.075 1.721-.279 2.675-.653c.988-.388 2.01-.788 3.111-.788c3.389 0 4.767 1.635 4.913 1.821a1 1 0 1 1-1.575 1.232c-.024-.027-.93-1.054-3.337-1.054c-.723 0-1.528.315-2.381.649c-1.009.396-2.434.789-3.496.789"
//                 />
//             </svg>
//             <Text className="text-2xl font-bold text-primary">
//                 Credit Card
//             </Text>
//         </div>

//         <TextInput
//             label="Cardholder Name"
//             placeholder="Anton Juan"
//             name="cardholderName"
//             variant="unstyled"
//             radius={0}
//             size="lg"
//             classNames={{
//                 input: "border-0 border-b border-primary text-primary ",
//                 label: "text-primary font-semibold text-sm mb-2",
//             }}
//             className="w-full"
//         />

//         <TextInput
//             label="Card Number"
//             placeholder="4433123456789876"
//             name="cardNumber"
//             variant="unstyled"
//             type="number"
//             radius={0}
//             size="lg"
//             classNames={{
//                 input: "border-0 border-b border-primary text-primary ",
//                 label: "text-primary font-semibold text-sm mb-2",
//             }}
//             className="w-full"
//         />

//         <div className="w-full flex flex-row justify-start items-center gap-4">
//             <div className="w-full basis-full">
//                 <Text className="text-primary font-semibold text-sm">
//                     Expiration Date:
//                 </Text>

//                 <div className="w-full flex flex-row justify-start items-center gap-4">
//                     <NativeSelect
//                         placeholder="MM"
//                         variant="unstyled"
//                         rightSection={
//                             <ArrowDownIcon className="text-primary font-bold" />
//                         }
//                         radius={0}
//                         size="lg"
//                         classNames={{
//                             input: "border-0 border-b border-primary text-primary [&>*]:text-black-bold [&>*]:overflow-auto",
//                             section: "justify-end",
//                         }}
//                         className="w-full lg:max-w-[5.5rem]"
//                         data={[
//                             "01",
//                             "02",
//                             "03",
//                             "04",
//                             "05",
//                             "06",
//                             "07",
//                             "08",
//                             "09",
//                             "10",
//                             "11",
//                             "12",
//                         ]}
//                     />

//                     <YearPickerInput
//                         placeholder="YYYY"
//                         variant="unstyled"
//                         size="lg"
//                         rightSection={
//                             <ArrowDownIcon className="text-primary font-bold" />
//                         }
//                         radius={0}
//                         classNames={{
//                             input: "border-0 border-b border-primary text-primary [&>*]:text-black-bold [&>*]:overflow-auto",
//                             section: "justify-end",
//                         }}
//                         className="w-full lg:max-w-[6.5rem]"
//                         value={value?.expirationDate}
//                         onChange={handleExpirationDateChange}
//                     />
//                 </div>
//             </div>
//             <div className="max-w-[5.5rem]">
//                 <Text className="text-primary font-semibold text-sm">
//                     CVV:
//                 </Text>
//                 <TextInput
//                     placeholder="XXX"
//                     name="cardNumber"
//                     variant="unstyled"
//                     type="number"
//                     max="9999"
//                     radius={0}
//                     size="lg"
//                     classNames={{
//                         input: "border-0 border-b border-primary text-primary ",
//                         label: "text-primary font-semibold text-sm mb-2",
//                     }}
//                     className="w-full"
//                 />
//             </div>
//         </div>

//         <Button
//             radius="xl"
//             className="text-bold text-xl w-full mt-4"
//             size="lg"
//         >
//             Confirm and Pay 17.49 VND
//         </Button>
//     </form>
// );

function MoMoMethod() {

    const { cart } = useCartStore();
    const [momoUrl, setMomoUrl] = React.useState("");

    const data = cart.map((item) => {
        return item.type.parent.name === "pet" ?
            {
                pet_id: item.id,
                quantity: item.count,
            } :
            {
                accessory_id: item.id,
                quantity: item.count,
            };
    });

    const dataMapping = {
        checkout: {
            items: [
                ...data
            ]
        }
    }

    const usePaymentMutation = useMutation({
        mutationKey: ["payment"],
        mutationFn: () => paymentMomo(dataMapping),
        onSuccess: (data: any) => {
            setMomoUrl(data.data)
        },
        onError: (error) => {
            toast.error("Payment failed", {
                position: "bottom-right",
                autoClose: 3000,
                closeOnClick: true,
            });
        }
    })

    useEffect(() => {
        if (momoUrl) window.open(momoUrl, "_self");
    }, [momoUrl])

    return (
        <Button className="rounded-lg w-full bg-pink-normal" size="xl"
            classNames={{
                inner: "justify-around w-full",
                label: "flex flex-row justify-center w-full gap-4"
            }}
            onClick={() => usePaymentMutation.mutate()}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 48 48"><circle cx="34.571" cy="13.429" r="7.929" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" /><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M5.5 21.357V9.466c0-1.985 1.851-3.964 3.965-3.964c2.119 0 3.965 1.978 3.965 3.964v11.891" /><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M13.429 9.465c0-1.985 1.85-3.964 3.964-3.964c2.119 0 3.965 1.978 3.965 3.964v11.891M5.5 42.5V30.608c0-1.985 1.85-3.965 3.964-3.965c2.119 0 3.965 1.979 3.965 3.965V42.5m0-11.892c0-1.985 1.85-3.965 3.964-3.965c2.119 0 3.965 1.979 3.965 3.965V42.5" /><circle cx="34.571" cy="34.571" r="7.929" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" /></svg>
            PAY WITH MOMO
        </Button>
    );
}

function PaypalMethod() {
    const clientId = "ATLuxXz6BMwtkXqYwxQCWv-FHEx3EigLmvQhfAOyhJZqtHDiys5hj5OW8IAKuK3B8yzcFg2vNB0MleMA"
    // const [totalAmount, setTotalAmount] = React.useState(0)


    const { cart } = useCartStore();

    const data = cart.map((item) => {
        return item.type.parent.name === "pet" ?
            {
                pet_id: item.id,
                quantity: item.count,
            } :
            {
                accessory_id: item.id,
                quantity: item.count,
            };
    });

    const dataMapping = {
        checkout: {
            items: [
                ...data
            ]
        }
    }

    const currentTotal = cart.reduce(
        (acc, cur) =>
            acc + cur.price * cur.count,
        0,
    )

    return (
        <div>
            <PayPalScriptProvider
                options={{
                    clientId: (process.env.NEXT_PUBLIC_CLIENT_ID as string),
                    components: "buttons",
                    currency: "USD",
                }}
            >
                <PaypalButton
                    cartData={dataMapping}
                    totalAmount={currentTotal.toString()}
                />
            </PayPalScriptProvider>
        </div>);
}
