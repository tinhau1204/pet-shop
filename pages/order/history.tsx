import { SimpleGrid } from "@mantine/core";
import {
    Card,
    Image,
    Text,
    Badge,
    Button,
    Group,
    Stack,
    Accordion,
} from "@mantine/core";

import PaypalIcon from "@my-images/icon/paypal.svg";
import MomoIcon from "@my-images/icon/momo.svg";
import { GetServerSidePropsContext } from "next";

const testData = [
    {
        id: "1112ua10a82hso",
        itemList: [
            {
                pid: 1,
                name: "Golden retriever",
                image: "",
                quantity: 1,
                price: "2.000.000 VND",
            },
            {
                pid: 2,
                name: "Golden retriever",
                image: "",
                quantity: 1,
                price: "2.000.000 VND",
            },
            {
                pid: 3,
                name: "Golden retriever",
                image: "",
                quantity: 1,
                price: "2.000.000 VND",
            },
            {
                pid: 4,
                name: "Golden retriever",
                image: "",
                quantity: 1,
                price: "2.000.000 VND",
            },
            {
                pid: 5,
                name: "Golden retriever",
                image: "",
                quantity: 1,
                price: "2.000.000 VND",
            },
            {
                pid: 6,
                name: "Golden retriever",
                image: "",
                quantity: 1,
                price: "2.000.000 VND",
            },
        ],
        status: "paid",
        payment: "momo",
        createdAt: "2023-12-21T12:55:27.443+00:00",
        total: "12.000.000 VND",
    },
    {
        id: "1212ua10a82hso",
        itemList: [
            {
                pid: 1,
                name: "Golden retriever",
                image: "",
                quantity: 1,
                price: "2.000.000 VND",
            },
            {
                pid: 2,
                name: "Golden retriever",
                image: "",
                quantity: 1,
                price: "2.000.000 VND",
            },
            {
                pid: 3,
                name: "Golden retriever",
                image: "",
                quantity: 1,
                price: "2.000.000 VND",
            },
        ],
        status: "paid",
        payment: "paypal",
        createdAt: "2023-12-21T12:55:27.443+00:00",
        total: "6.000.000 VND",
    },
    {
        id: "1512ua10a82hso",
        itemList: [
            {
                pid: 1,
                name: "Golden retriever",
                image: "",
                quantity: 1,
                price: "2.000.000 VND",
            },
            {
                pid: 2,
                name: "Golden retriever",
                image: "",
                quantity: 1,
                price: "2.000.000 VND",
            },
            {
                pid: 3,
                name: "Golden retriever",
                image: "",
                quantity: 1,
                price: "2.000.000 VND",
            },
        ],
        status: "paid",
        payment: "momo",
        createdAt: "2023-12-21T12:55:27.443+00:00",
        total: "6.000.000 VND",
    },
    {
        id: "1912ua10a82hso",
        itemList: [
            {
                pid: 1,
                name: "Golden retriever",
                image: "",
                quantity: 1,
                price: "2.000.000 VND",
            },
            {
                pid: 2,
                name: "Golden retriever",
                image: "",
                quantity: 1,
                price: "2.000.000 VND",
            },
            {
                pid: 3,
                name: "Golden retriever",
                image: "",
                quantity: 1,
                price: "2.000.000 VND",
            },
        ],
        status: "paid",
        payment: "paypal",
        createdAt: "2023-12-21T12:55:27.443+00:00",
        total: "6.000.000 VND",
    },
];

export default function orderHistory() {


    return (
        <SimpleGrid cols={2}>
            {testData.map((element, index) => (
                <Card
                    key={index}
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    mah={280}
                    withBorder
                >
                    <Card.Section mt={1} ml={1}>
                        <Group justify="space-between" mt={1} mb="xs">
                            <Stack align="flex-start" gap={0}>
                                <Text fw={500}>Order #{element?.id}</Text>
                                <Group gap="md">
                                    <Text size="sm" c="dimmed" fw={500}>
                                        {
                                            element?.createdAt
                                        }
                                    </Text>
                                    <Badge color="green" size="lg" radius="sm">
                                        {element?.status}
                                    </Badge>
                                    <Badge
                                        w="fit-content"
                                        h="fit-content"
                                        variant="outline"
                                        color={
                                            element.payment == "momo"
                                                ? "pink"
                                                : "blue"
                                        }
                                        radius="sm"
                                    >
                                        {element.payment == "momo" ? (
                                            <MomoIcon />
                                        ) : (
                                            <PaypalIcon />
                                        )}
                                    </Badge>
                                </Group>
                            </Stack>

                            <Group mr="lg">
                                <Text size="xl" fw={700} c="#003459">
                                    {element?.total}
                                </Text>
                            </Group>
                        </Group>
                    </Card.Section>

                    <Accordion variant="separated" defaultValue="Apples">
                        {element?.itemList?.map((element, index) => (
                            <Accordion.Item
                                key={index}
                                value={element.pid.toString()}
                            >
                                <Accordion.Control>
                                    <Group justify="space-between">
                                        <Group>
                                            <Image
                                                maw="50px"
                                                mah="50px"
                                                radius={200}
                                                src="/images/product/pet.png"
                                                alt="picture"
                                            />
                                            <Stack justify="flex-start" gap={0}>
                                                <Text fw={600}>
                                                    {element.name}
                                                </Text>
                                                <Group justify="space-between">
                                                    <Text
                                                        c="dimmed"
                                                        size="sm"
                                                        fw={500}
                                                    >
                                                        x{element.quantity}
                                                    </Text>
                                                    <Text
                                                        c="dimmed"
                                                        size="sm"
                                                        fw={500}
                                                    >
                                                        {element.price}
                                                    </Text>
                                                </Group>
                                            </Stack>
                                        </Group>
                                    </Group>
                                </Accordion.Control>
                                <Accordion.Panel></Accordion.Panel>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                </Card>
            ))}
        </SimpleGrid>
    );
}
