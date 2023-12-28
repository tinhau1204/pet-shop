import { Card, Image, Text, Badge, Button, Group, Flex } from "@mantine/core";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { getProductsByIds } from "@/lib/api";

export type RecombeeRecommendProductsPropsType = {
    id: string;
    values: {
        name: string;
        type: "pet" | "accessory";
    };
}[];

function RecombeeRecommendProducts({
    list,
}: {
    list: RecombeeRecommendProductsPropsType;
}) {
    const getProductsQuery = useQuery({
        queryKey: "getProductsById",
        queryFn: async () => {
            return await getProductsByIds(
                (list || []).map((item) => parseInt(item.id)),
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
        <Flex>
            {(getProductsQuery.data || []).map((item: any, index: number) => (
                <ProductMiniCard name={item.name} key={index} />
            ))}
        </Flex>
    );
}

function ProductMiniCard({ name }: { name: string }) {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                <Image
                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                    height={160}
                    alt="Norway"
                />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{name || "Norway Fjord Adventures"}</Text>
                <Badge color="pink">On Sale</Badge>
            </Group>

            <Text size="sm" c="dimmed">
                With Fjord Tours you can explore more of the magical fjord
                landscapes with tours and activities on and around the fjords of
                Norway
            </Text>

            <Button color="blue" fullWidth mt="md" radius="md">
                Book classic tour now
            </Button>
        </Card>
    );
}

export default RecombeeRecommendProducts;
