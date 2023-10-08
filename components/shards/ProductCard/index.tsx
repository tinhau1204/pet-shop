import { Card, Group, Image, Stack, Text } from "@mantine/core";
import mock from "./mock.json";
import PetImage from "@my-images/pet.png";
import Accessory from "@my-images/accessory.png";
import GiftImage from "@my-images/gift.png";
import FallbackImage from "@my-images/fallback.png";

export type PetType = {
    image: string;
    name: string;
    gene: string;
    age: string;
    price: string;
};

export type AccessoryType = {
    image: string;
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
    const { data = mock.pet } = props;

    return (
        <Card
            shadow="0px 4px 28px -2px rgba(0, 0, 0, 0.08)"
            radius={12}
            className="w-[fit-content]"
            padding={"8px"}
        >
            <div className="aspect-square w-[264px]">
                <Image
                    radius={"12px"}
                    src={data.image || PetImage.src}
                    h={264}
                    fallbackSrc={FallbackImage.src}
                />
            </div>
            <Stack
                gap={"8px"}
                className="px-[8px] pt-[8px] pb-[12px] w-[264px]"
            >
                {data.name && (
                    <Text fw={700} fz={"16px"} lineClamp={2}>
                        {data.name}
                    </Text>
                )}
                <Group fz={"12px"}>
                    {((data as PetType).gene ||
                        (data as AccessoryType).type) && (
                        <Group gap={"6px"}>
                            <Text inherit>
                                {(data as PetType).gene ? "Gene:" : "Product:"}
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
                        <Image src={GiftImage.src} h={"20px"} w={"20px"} />
                        <Text fw={700} fz={"14px"} lineClamp={2}>
                            {(data as AccessoryType).promotion}
                        </Text>
                    </Group>
                )}
            </Stack>
        </Card>
    );
}

export default ProductCard;
