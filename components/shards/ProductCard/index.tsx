import {
    ActionIcon,
    AspectRatio,
    Box,
    Card,
    Group,
    Stack,
    Text,
} from "@mantine/core";
import mock from "./mock.json";
import Image from "next/image";
import { useRouter } from "next/router";
import CartIcon from "@my-images/Cart.svg";
import { petsData, accessoriesData } from "@/lib/api/types";
import { useCartStore } from "@/lib/store/cart";
import useStore from "@/lib/store";
import { toast } from "react-toastify";
const Cookies = require("js-cookie");

export type ProductCardProps = {
    data?: petsData | accessoriesData;
    classContainer?: string;
};

function ProductCard(props: ProductCardProps) {
    const { data, classContainer } = props;
    const router = useRouter();
    const store = useStore();
    const { add: handleAddToCart, cart } = useCartStore();

    function checkGene(gene: boolean) {
        if (gene) {
            return "Male";
        } else {
            return "Female";
        }
    }

    function formatPrice(price: string | number | undefined) {
        return price?.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
        });
    }

    function formatWeight(weight: number) {
        if (weight < 1000) {
            return `${weight}g`;
        } else if (weight >= 1000 && weight < 1000000) {
            return `${weight / 1000}kg`;
        }
    }

    function formatAge(birthday: string) {
        const birthDate = new Date(birthday);
        const currentDate = new Date();

        let age = currentDate.getFullYear() - birthDate.getFullYear();

        if (
            currentDate.getMonth() < birthDate.getMonth() ||
            (currentDate.getMonth() === birthDate.getMonth() &&
                currentDate.getDate() < birthDate.getDate())
        ) {
            age--;
        }

        return age;
    }

    function Age(age: string) {
        if (formatAge(age) < 1) {
            return "Newborn";
        } else {
            return `${formatAge(age)} years`;
        }
    }

    const handleActionClick = () => {
        const authorize = Cookies.get("user");
        if (authorize !== undefined) {
            handleAddToCart(
                (data as petsData).isMale !== undefined
                    ? (data as petsData)
                    : (data as accessoriesData),
            );
            // const cartData = cart.map((item) => {
            //     return {
            //         id: item.id,
            //         sku: item.sku,
            //         quantity: item.count,
            //     };
            // });
            // Cookies.set("cartUser", JSON.stringify(cartData));

            toast.success(`Đã thêm sản phẩm ${data?.name} vào giỏ hàng`, {
                autoClose: 2000,
                position: "bottom-right",
            });
        } else {
            toast.error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng", {
                autoClose: 2000,
                position: "bottom-right",
            });
            router.push("/auth/login");
        }
    };

    return (
        <Box
            className={`relative px-[10px] ${classContainer} max-w-[280px] w-full group z-10 `}
            // w={{
            //     base: "100%",
            //     xs: "50%",
            //     md: "33.33%",
            //     lg: "25%",
            //     xl: "25%",
            // }}
        >
            <ActionIcon
                size="lg"
                className="absolute z-20 right-0 top-0 bg-blue-bold group-hover:animate-bounce"
                onClick={() => handleActionClick()}
            >
                <CartIcon className="font-bold" />
            </ActionIcon>
            <Card
                shadow="0px 4px 28px -2px rgba(0, 0, 0, 0.08)"
                radius={12}
                className="w-full items-center p-2 group-hover:scale-[1.01] z-10"
            >
                <AspectRatio ratio={1} className="!w-full !max-w-[264px]">
                    <Image
                        alt="image"
                        src={`${data?.thumbnail_image}` || mock.pet.imageUrl}
                        fill
                        className="!object-contain !rounded-[12px]"
                        sizes="auto"
                    />
                </AspectRatio>
                <Stack
                    gap={"8px"}
                    className="px-[8px] pt-[8px] pb-[12px] w-full max-w-[264px]"
                >
                    {data?.name && (
                        <Text
                            fw={700}
                            fz={"16px"}
                            lineClamp={1}
                            className="max-w-[12.5rem] sm:max-w-fit hover:underline hover:cursor-pointer"
                            onClick={() => {
                                const productType =
                                    (data as petsData).type.parent.name ===
                                    "pet"
                                        ? "pet"
                                        : "accessory";
                                router.push(
                                    `/products/${productType}/${data.id}`,
                                );
                            }}
                        >
                            {data.name}
                        </Text>
                    )}
                    <Group fz={"12px"}>
                        {((data as petsData) || (data as accessoriesData)) && (
                            <Group gap={"6px"}>
                                <Text inherit>
                                    {(data as petsData)?.type?.name
                                        ? "Gene:"
                                        : "Product:"}
                                </Text>

                                <Text inherit c={"dimmed"} fw={700}>
                                    {checkGene(
                                        (data as petsData).isMale,
                                    ).toString() ||
                                        ((data as accessoriesData).type &&
                                            (data as accessoriesData).type
                                                .name)}
                                </Text>
                            </Group>
                        )}

                        {((data as petsData).birthday ||
                            (data as accessoriesData).weight) && (
                            <Group gap={"6px"}>
                                <Text inherit>
                                    {(data as petsData).age ? "Age:" : "Size:"}
                                </Text>
                                <Text inherit c={"dimmed"} fw={700}>
                                    {(data as petsData)?.birthday
                                        ? Age((data as petsData)?.birthday)
                                        : formatWeight(
                                              (data as accessoriesData)?.weight,
                                          )}
                                </Text>
                            </Group>
                        )}
                    </Group>
                    {((data as petsData) || (data as accessoriesData))
                        .price && (
                        <Text fw={700} fz={"14px"}>
                            {formatPrice(data?.price)}
                        </Text>
                    )}

                    {/* add this later */}
                    {/* {(data as AccessoryType).promotion ? (
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
                    ) : (
                        <Group
                            className="px-[10px] py-[6px] bg-white rounded-[8px]"
                            wrap="nowrap"
                        >
                            <Box className="w-[20px] h-[20px] relative"></Box>
                            <Text fw={700} fz={"14px"} lineClamp={2}>
                                {(data as AccessoryType).promotion}
                            </Text>
                        </Group>
                    )} */}
                </Stack>
            </Card>
        </Box>
    );
}

export default ProductCard;
