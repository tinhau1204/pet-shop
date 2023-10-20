import { AspectRatio, Box, Card, Group, Stack, Text } from "@mantine/core";
import mock from "./mock.json";
import GiftImage from "@my-images/product/gift.png";
import Image from "next/image";

export type PetType = {
    imageUrl: string;
    name: string;
    gene: string;
    age: string;
    price: string;
};

export type AccessoryType = {
    imageUrl: string;
    name: string;
    type: string;
    size: string;
    price: string;
    promotion: string;
};

export type ProductCardProps = {
    data?: PetType | AccessoryType;
};

function ProductCard(props: ProductCardProps) {
    const { data = mock.accessory } = props;

    return (
        <Box
            className="px-[10px]"
            w={{
                base: "100%",
                xs: "50%",
                md: "33.33%",
                lg: "25%",
                xl: "25%",
            }}
        >
            <Card
                shadow="0px 4px 28px -2px rgba(0, 0, 0, 0.08)"
                radius={12}
                className="w-full items-center"
                padding={"8px"}
            >
                <AspectRatio ratio={1} className="!w-full !max-w-[264px]">
                    <Image
                        alt="image"
                        src={data.imageUrl}
                        fill
                        className="!object-contain !rounded-[12px]"
                        sizes="auto"
                    />
                </AspectRatio>
                <Stack
                    gap={"8px"}
                    className="px-[8px] pt-[8px] pb-[12px] w-full max-w-[264px]"
                >
                    {data.name && (
                        <Text fw={700} fz={"16px"} lineClamp={1}>
                            {data.name}
                        </Text>
                    )}
                    <Group fz={"12px"}>
                        {((data as PetType).gene ||
                            (data as AccessoryType).type) && (
                            <Group gap={"6px"}>
                                <Text inherit>
                                    {(data as PetType).gene
                                        ? "Gene:"
                                        : "Product:"}
                                </Text>
                                <Text inherit c={"dimmed"} fw={700}>
                                    {(data as PetType).gene ||
                                        (data as AccessoryType).type}
                                </Text>
                            </Group>
                        )}
                        {((data as PetType).age ||
                            (data as AccessoryType).size) && (
                            <Group gap={"6px"}>
                                <Text inherit>
                                    {(data as PetType).gene ? "Age:" : "Size:"}
                                </Text>
                                <Text inherit c={"dimmed"} fw={700}>
                                    {(data as PetType).age ||
                                        (data as AccessoryType).size}
                                </Text>
                            </Group>
                        )}
                    </Group>
                    {data.price && (
                        <Text fw={700} fz={"14px"}>
                            {data.price} VND
                        </Text>
                    )}
                    {(data as AccessoryType).promotion && (
                        <Group
                            className="px-[10px] py-[6px] bg-yellow-light rounded-[8px]"
                            wrap="nowrap"
                        >
                            <Box className="w-[20px] h-[20px] relative">
                                <Image
                                    alt="image"
                                    src={GiftImage.src}
                                    fill
                                    className="!object-contain !rounded-[12px]"
                                    sizes="auto"
                                />
                            </Box>
                            <Text fw={700} fz={"14px"} lineClamp={2}>
                                {(data as AccessoryType).promotion}
                            </Text>
                        </Group>
                    )}
                </Stack>
            </Card>
        </Box>
    );
}

export default ProductCard;
