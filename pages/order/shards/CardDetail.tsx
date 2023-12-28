import React from "react";
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
import { useQuery } from "react-query";
import { searchOrderDetailByOrderId } from "@/lib/api/order";
import dayjs from "dayjs";

export type CardDetailProps = {
    id: number;
}

export default function CardDetail({ id }: CardDetailProps) {

    const orderDetailQuery = useQuery({
        queryKey: ["orderDetail", id],
        queryFn: () => searchOrderDetailByOrderId(
            {
                search: {
                    order: {
                        id: id
                    }
                }
            }
        ),
        onSuccess: (data) => {
            console.log("check data", data);
        },
        onError: (error) => {
            console.log("check error", error);
        },
        enabled: !!id,
    });

    function formatPrice(price: string | number | undefined) {
        return price?.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
        });
    }



    return (

        < Card
            shadow="sm"
            padding="lg"
            radius="md"
            mah={280}
            withBorder
        >
            {
                (orderDetailQuery.data) ? (
                    <>
                        <Card.Section mt={1} ml={1}>
                            <Group justify="space-between" mt={1} mb="xs">
                                <Stack align="flex-start" gap={0}>
                                    <Text fw={500}><span className="font-bold text-blue-medium">Order: </span>{orderDetailQuery.data?.data.order.code}</Text>
                                    <Group gap="md">
                                        <Text size="sm" c="dimmed" fw={500}>
                                            Date:
                                            {" " +
                                                dayjs(orderDetailQuery.data?.data.order.created_at).format("DD/MM/YYYY")
                                            }
                                        </Text>
                                        <Badge color={`${orderDetailQuery.data?.data.order?.order_status === "COMPLETED" ? "green" : "yellow"}`} size="lg" radius="sm">
                                            {orderDetailQuery.data?.data.order?.order_status}
                                        </Badge>
                                        <Badge
                                            w="fit-content"
                                            h="fit-content"
                                            variant="outline"
                                            color={
                                                orderDetailQuery.data?.data.order?.payment == "momo"
                                                    ? "pink"
                                                    : "blue"
                                            }
                                            radius="sm"
                                        >
                                            {orderDetailQuery.data?.data.order?.payment == "momo" ? (
                                                <MomoIcon />
                                            ) : (
                                                <PaypalIcon />
                                            )}
                                        </Badge>
                                    </Group>
                                </Stack>

                                <Group mr="lg">
                                    <Text size="xl" fw={700} c="#003459">
                                        {formatPrice(orderDetailQuery.data?.data.order?.total)}
                                    </Text>
                                </Group>
                            </Group>
                        </Card.Section>

                        <Accordion variant="separated" defaultValue="Apples" className="overflow-y-scroll">
                            {orderDetailQuery.data?.data.items.map((element: any) => (
                                <Accordion.Item
                                    key={element.id}
                                    value={element.id.toString()}
                                >
                                    <Accordion.Control>
                                        <Group justify="space-between">
                                            <Group>
                                                <Image
                                                    maw="50px"
                                                    mah="50px"
                                                    radius="xl"
                                                    src={element?.pet?.thumbnail_image}
                                                    alt="picture"
                                                />
                                                <Stack justify="flex-start" gap={0}>
                                                    <Text fw={600}>
                                                        {element?.pet?.name}
                                                    </Text>
                                                    <Group justify="space-between">
                                                        <Text
                                                            c="dimmed"
                                                            size="sm"
                                                            fw={500}
                                                        >
                                                            x{element?.quantity}
                                                        </Text>
                                                        <Text
                                                            c="dimmed"
                                                            size="sm"
                                                            fw={500}
                                                        >
                                                            {formatPrice(element?.price)}
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
                    </>
                ) : (

                    <div>loading</div>
                )

            }
        </Card >



    )
}