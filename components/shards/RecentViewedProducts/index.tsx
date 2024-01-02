import {
    Card,
    Image,
    Text,
    Badge,
    Button,
    Group,
    Flex,
    Stack,
    Skeleton,
    Box,
} from "@mantine/core";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { getProductsByIds } from "@/lib/api";
import Link from "next/link";

export type RecentViewedProductsPropsType = {
    id: string;
    values: {
        name: string;
        type: "pet" | "accessory";
    };
}[];

function RecentViewedProducts({
    list,
}: {
    list: RecentViewedProductsPropsType;
}) {
    const Cookies = require("js-cookie");
    const getProductsQuery = useQuery({
        queryKey: "getProductsById",
        queryFn: async () => {
            return await getProductsByIds(
                (list || []).map((item) => ({
                    id: item.id,
                    type: item.values.type,
                })),
            );
        },
        onSuccess: () => {},
        onError: (error) => {
            console.error("error", error);
        },
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        enabled: false,
    });

    useEffect(() => {
        if (list?.length > 0) {
            getProductsQuery.refetch();
        }
    }, [list]);

    return (
        <Stack>
            {Cookies.get("user") && (
                <>
                    <Stack>
                        <Text className="font-medium text-base text-black-bold">
                            Whats new?
                        </Text>
                        <Text className="font-bold text-2xl text-blue-medium">
                            Your recently viewed products
                        </Text>
                    </Stack>
                    {getProductsQuery.isSuccess ? (
                        <Group className="flex-wrap gap-0">
                            {(getProductsQuery.data || []).map(
                                (item: any, index: number) => {
                                    const link = item.sku.includes("PET")
                                        ? `/products/pet/${item.id}`
                                        : `/products/accessory/${item.id}`;
                                    return (
                                        <ProductMiniCard
                                            name={item.name}
                                            description={item.description}
                                            thumbnail_image={
                                                item.thumbnail_image
                                            }
                                            link={link}
                                            key={index}
                                            className="w-[50%] sm:w-[25%] px-[15px]"
                                        />
                                    );
                                },
                            )}
                        </Group>
                    ) : (
                        <Skeleton
                            visible={getProductsQuery.isFetching}
                            className="h-[427px] bg-secondary"
                        ></Skeleton>
                    )}
                </>
            )}
        </Stack>
    );
}

function ProductMiniCard({
    name,
    thumbnail_image,
    description,
    className,
    link,
}: {
    name: string;
    thumbnail_image: string;
    description: string;
    className: string;
    link: string;
}) {
    return (
        <Box className={className}>
            <Card shadow="sm" radius="md" withBorder className="pt-0">
                <Link href={link}>
                    <Card.Section>
                        <Image
                            src={thumbnail_image}
                            className="aspect-square"
                            alt="Norway"
                        />
                    </Card.Section>

                    <Group
                        justify="space-between"
                        className="px-[15px] py-[15px]"
                    >
                        <Text
                            fw={500}
                            className="truncate ... text-[14px] sm:text-[16px]"
                        >
                            {name || "Norway Fjord Adventures"}
                        </Text>
                        <Text size="sm" c="dimmed" className="truncate ...">
                            {description}
                        </Text>
                    </Group>
                </Link>
            </Card>
        </Box>
    );
}

export default RecentViewedProducts;
