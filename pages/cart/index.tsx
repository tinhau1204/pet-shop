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
import ArrownDown from "@my-images/arrowDown.svg";
import ArrowLeft from "@my-images/Arrow_Left_SM.svg";

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
                    className="h-screen overflow-auto p-4 bg-blue-medium"
                    radius="md"
                >
                    <h2 className="text-3xl font-bold text-primary">
                        Payment Info
                    </h2>
                </Paper>
            </Grid.Col>
        </Grid>
    );
}
