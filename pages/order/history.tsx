import { Button, Paper, SimpleGrid, Text } from "@mantine/core";

import { GetServerSidePropsContext } from "next";
import { useMutation, useQuery } from "react-query";
import { OrderResponseType, searchOrderByUserId } from "@/lib/api/order";
import React, { useEffect } from "react";
import CardDetail from "./shards/CardDetail";
import { useRouter } from "next/router";
const Cookies = require("js-cookie");

export default function OrderHistory() {
    const router = useRouter();
    const [isRefetch, setIsRefetch] = React.useState<boolean>(false);
    const orderQuery = useQuery({
        queryKey: "orderQuery",
        queryFn: () =>
            searchOrderByUserId({
                search: {
                    user: {
                        id: parseInt(Cookies.get("user")),
                    },
                },
            }),
        onSuccess: (data) => {
            console.log("check data", data);
        },
        onError: (error) => {
            console.log("check error", error);
        },
    });

    useEffect(() => {
        if (isRefetch) {
            orderQuery.refetch();
            setIsRefetch(false);
        }
    }, [isRefetch, orderQuery]);

    useEffect(() => {
        setIsRefetch(true);
    }, []);

    return (
        <>
            {
                <SimpleGrid cols={2}>
                    {orderQuery.data && orderQuery.data.data.length > 0 ? (
                        orderQuery.data?.data.map(
                            (element: OrderResponseType) => (
                                <CardDetail key={element.id} id={element.id} />
                            ),
                        )
                    ) : orderQuery.isLoading ? (
                        <div>Loading...</div>
                    ) : (
                        <Paper
                            shadow="xs"
                            p="xl"
                            className="h-60 mx-auto col-span-full w-full flex-1 max-w-lg flex flex-col align-center justify-center text-center bg-[#192655]/90 gap-y-4"
                            radius="lg"
                        >
                            <Text
                                c="#E1AA74"
                                className="text-2xl text-blue-medium font-bold leading-10"
                            >
                                you haven&apos;t placed any orders yet
                            </Text>
                            <Text
                                c="#F3F0CA"
                                className="text-base font-semibold leading-6"
                            >
                                Wanna go to shopping now?
                            </Text>
                            <Button
                                size="md"
                                radius="xl"
                                className="mt-4 bg-[#3876BF] text-[#F3F0CA]"
                                onClick={() => router.push("/")}
                            >
                                Move to Shopping
                            </Button>
                        </Paper>
                    )}
                </SimpleGrid>
            }
        </>
    );
}
