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
} from "@mantine/core";
import { YearPickerInput } from "@mantine/dates";
import ArrownDown from "@my-images/arrowDown.svg";
import ArrowLeft from "@my-images/Arrow_Left_SM.svg";
import Link from "next/link";
import React, { MouseEventHandler } from "react";
import ArrowDownIcon from "@my-images/Caret_Down_MD.svg";
import { useCartStore } from "@/lib/store/cart";

function ProductInfo({
    src,
    name,
    color,
}: {
    src: string;
    name: string;
    color: string;
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
                <Text className="text-sm text-blue-medium font-bold max-w-[150px]">
                    {name}
                </Text>
                <Text className="text-xs text-black-light/50">{color}</Text>
            </Flex>
        </Flex>
    );
}

function ProductSize({ data }: { data?: string[] }) {
    return (
        <NativeSelect
            radius="xl"
            data={["S", "M", "L", "XL"]}
            classNames={{
                input: "border-black-light/20 text-blue-medium font-semibold",
            }}
            rightSection={<ArrownDown className="text-blue-medium font-bold" />}
            className="max-w-[6rem]"
        />
    );
}

export default function Cart() {
    const [payment, setPayment] = React.useState("Credit Card");
    const { cart } = useCartStore();

    console.log("cart", cart);

    const handlePaymentChange: MouseEventHandler<HTMLButtonElement> = (
        event,
    ) => {
        setPayment(
            event.currentTarget.textContent?.toString() || "Credit Card",
        );
    };
    const elements = [
        {
            src: "",
            name: "Product 1",
            color: "Brown",
            size: "S",
            quantity: 1,
            price: 15.49,
        },
        {
            src: "",
            name: "Product 1",
            color: "Brown",
            size: "S",
            quantity: 1,
            price: 15.49,
        },
        {
            src: "",
            name: "Product 1",
            color: "Brown",
            size: "S",
            quantity: 1,
            price: 15.49,
        },
    ];

    const rows = elements.map((element, index) => (
        <Table.Tr key={index}>
            <Table.Td>
                <ProductInfo
                    src={element.src}
                    name={element.name}
                    color={element.color}
                />
            </Table.Td>
            <Table.Td>
                <ProductSize />
            </Table.Td>
            <Table.Td>
                <TextInput
                    radius="xl"
                    className="max-w-[5rem] font-semibold"
                    defaultValue={1}
                    type="number"
                    classNames={{
                        input: "text-blue-medium",
                    }}
                />
            </Table.Td>
            <Table.Td className="text-center">
                <Text className="text-blue-medium font-semibold">
                    ${element.price}
                </Text>
            </Table.Td>
            <Table.Td className="max-w-[2rem]">
                <ActionIcon variant="transparent" radius="xl" size="md">
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
                                <Table.Th>Size</Table.Th>
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
                            className="border-blue-medium/70 text-blue-medium font-bold "
                        >
                            Continue Shopping
                        </Button>

                        <Stack className="w-64">
                            <div className="w-full flex flex-row items-center justify-between">
                                <Text className="text-blue-medium font-bold text-base">
                                    Subtotal:
                                </Text>
                                <Text className="text-blue-medium font-semibold text-base">
                                    $15.49
                                </Text>
                            </div>
                            <div className="w-full flex flex-row items-center justify-between">
                                <Text className="text-blue-medium font-bold text-base">
                                    Shipping:
                                </Text>
                                <Text className="text-blue-medium font-semibold text-base">
                                    $2.00
                                </Text>
                            </div>

                            <Divider className="border-blue-medium" size="sm" />
                            <div className="w-full flex flex-row items-center justify-between">
                                <Text className="text-blue-medium font-bold text-lg">
                                    Total:
                                </Text>
                                <Text className="text-blue-medium font-semibold text-xl">
                                    $17.49
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
                                    payment == "Credit Card"
                                        ? "text-primary border-primary"
                                        : "text-primary/40 border-primary/40"
                                }`}
                                variant="outline"
                                radius="xl"
                                onClick={handlePaymentChange}
                            >
                                Credit Card
                            </Button>
                            <Button
                                className={`w-full col-span-3  ${
                                    payment == "Mo Mo"
                                        ? "text-primary border-primary"
                                        : "text-primary/40 border-primary/40"
                                }`}
                                variant="outline"
                                radius="xl"
                                onClick={handlePaymentChange}
                            >
                                Mo Mo
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
                        {payment == "Credit Card" ? (
                            <CreditCardMethod />
                        ) : payment == "Mo Mo" ? (
                            <MoMoMethod />
                        ) : (
                            <PaypalMethod />
                        )}
                    </div>
                </Paper>
            </Grid.Col>
        </Grid>
    );
}

type CreditCard = {
    cardHolderName: String;
    cardNumber: Number;
    expirationDate?: Date | null;
    cvv: Number;
};

function CreditCardMethod() {
    const [value, setValue] = React.useState<CreditCard | undefined>({
        cardHolderName: "",
        cardNumber: 0,
        expirationDate: new Date(),
        cvv: 0,
    });

    const handleExpirationDateChange = (newDate: Date | null) => {
        setValue((prev) => ({ ...prev!, expirationDate: newDate }));
    };

    return (
        <form className="h-full flex flex-col justify-center w-full items-start gap-4">
            <div className="flex flex-row justify-center w-full items-center gap-3">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 36 36"
                >
                    <path
                        fill="#FFAC33"
                        d="M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4V9s0-4-4-4z"
                    />
                    <path fill="#292F33" d="M0 10h36v5H0z" />
                    <path fill="#F4F7F9" d="M4 19h28v6H4z" />
                    <path
                        fill="#8899A6"
                        d="M19 24c-1.703 0-2.341-1.21-2.469-1.801c-.547.041-1.08.303-1.805.764C13.961 23.449 13.094 24 12 24c-1.197 0-1.924-.675-2-2c-.003-.056.038-.188.021-.188c-1.858 0-3.202 1.761-3.215 1.779a.997.997 0 0 1-1.397.215a1 1 0 0 1-.215-1.398C5.271 22.303 7.11 20 10 20c1.937 0 2.048 1.375 2.078 1.888l.007.109c.486-.034.991-.354 1.57-.723c.961-.61 2.153-1.371 3.75-.962c.871.223 1.007 1.031 1.059 1.336c.013.076.032.19.049.226c.007 0 .146.091.577.13c.82.075 1.721-.279 2.675-.653c.988-.388 2.01-.788 3.111-.788c3.389 0 4.767 1.635 4.913 1.821a1 1 0 1 1-1.575 1.232c-.024-.027-.93-1.054-3.337-1.054c-.723 0-1.528.315-2.381.649c-1.009.396-2.434.789-3.496.789"
                    />
                </svg>
                <Text className="text-2xl font-bold text-primary">
                    Credit Card
                </Text>
            </div>

            <TextInput
                label="Cardholder Name"
                placeholder="Anton Juan"
                name="cardholderName"
                variant="unstyled"
                radius={0}
                size="lg"
                classNames={{
                    input: "border-0 border-b border-primary text-primary ",
                    label: "text-primary font-semibold text-sm mb-2",
                }}
                className="w-full"
            />

            <TextInput
                label="Card Number"
                placeholder="4433123456789876"
                name="cardNumber"
                variant="unstyled"
                type="number"
                radius={0}
                size="lg"
                classNames={{
                    input: "border-0 border-b border-primary text-primary ",
                    label: "text-primary font-semibold text-sm mb-2",
                }}
                className="w-full"
            />

            <div className="w-full flex flex-row justify-start items-center gap-4">
                <div className="w-full basis-full">
                    <Text className="text-primary font-semibold text-sm">
                        Expiration Date:
                    </Text>

                    <div className="w-full flex flex-row justify-start items-center gap-4">
                        <NativeSelect
                            placeholder="MM"
                            variant="unstyled"
                            rightSection={
                                <ArrowDownIcon className="text-primary font-bold" />
                            }
                            radius={0}
                            size="lg"
                            classNames={{
                                input: "border-0 border-b border-primary text-primary [&>*]:text-black-bold [&>*]:overflow-auto",
                                section: "justify-end",
                            }}
                            className="w-full lg:max-w-[5.5rem]"
                            data={[
                                "01",
                                "02",
                                "03",
                                "04",
                                "05",
                                "06",
                                "07",
                                "08",
                                "09",
                                "10",
                                "11",
                                "12",
                            ]}
                        />

                        <YearPickerInput
                            placeholder="YYYY"
                            variant="unstyled"
                            size="lg"
                            rightSection={
                                <ArrowDownIcon className="text-primary font-bold" />
                            }
                            radius={0}
                            classNames={{
                                input: "border-0 border-b border-primary text-primary [&>*]:text-black-bold [&>*]:overflow-auto",
                                section: "justify-end",
                            }}
                            className="w-full lg:max-w-[6.5rem]"
                            value={value?.expirationDate}
                            onChange={handleExpirationDateChange}
                        />
                    </div>
                </div>
                <div className="max-w-[5.5rem]">
                    <Text className="text-primary font-semibold text-sm">
                        CVV:
                    </Text>
                    <TextInput
                        placeholder="XXX"
                        name="cardNumber"
                        variant="unstyled"
                        type="number"
                        max="9999"
                        radius={0}
                        size="lg"
                        classNames={{
                            input: "border-0 border-b border-primary text-primary ",
                            label: "text-primary font-semibold text-sm mb-2",
                        }}
                        className="w-full"
                    />
                </div>
            </div>

            <Button
                radius="xl"
                className="text-bold text-xl w-full mt-4"
                size="lg"
            >
                Confirm and Pay $ 17.49
            </Button>
        </form>
    );
}

function MoMoMethod() {
    return <div>Momo</div>;
}

function PaypalMethod() {
    return <div>Paypal</div>;
}
