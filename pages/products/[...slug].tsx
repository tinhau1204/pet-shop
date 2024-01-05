import { GetServerSidePropsContext } from "next";
import { Carousel } from "@mantine/carousel";
import { ActionIcon, Button, CopyButton, Group, Skeleton, Table, Text, Tooltip } from "@mantine/core";
import ChatIcon from "@my-images/Chat_Dots.svg";
import FacebookIcon from "@my-images/facebook.svg";
import TwitterIcon from "@my-images/twitter.svg";
import InstagramIcon from "@my-images/instagram.svg";
import YoutubeIcon from "@my-images/youtube.svg";
import ShareIcon from "@my-images/Share_Android.svg";
import Link from "next/link";
import GuaranteeIcon from "@my-images/gurantee.svg";
import HeathGIcon from "@my-images/healthG.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getAccessoriesById, getPetById } from "@/lib/api";
import { accessoriesData, petsData } from "@/lib/api/types";
import React, { useEffect } from "react";
import dayjs from "dayjs";
import CartIcon from "@my-images/Cart.svg";
import { useCartStore } from "@/lib/store/cart";
import { toast } from "react-toastify";
import recombeeClient from "../../lib/recombee";
import useStore from "@/lib/store";
import RecentViewedProducts from "@/components/shards/RecentViewedProducts";
import Guarantee from "@/components/shards/Guarantee";
const Cookies = require("js-cookie");

type PageProps = {
    [name: string]: any;
};

const socialMedia = [
    {
        icon: (
            <FacebookIcon className="text-black-light hover:text-black-medium" />
        ),
        link: "https://facebook.com",
    },
    {
        icon: (
            <TwitterIcon className="text-black-light hover:text-black-medium" />
        ),
        link: "https://twitter.com",
    },
    {
        icon: (
            <InstagramIcon className="text-black-light hover:text-black-medium" />
        ),
        link: "https://instagram.com",
    },
    {
        icon: (
            <YoutubeIcon className="text-black-light hover:text-black-medium" />
        ),
        link: "https://youtube.com",
    },
];

export default function Page(props: PageProps) {
    const store = useStore();
    const router = useRouter();
    const [petTable, setPetTable] = React.useState<any>([]);
    const [accessTable, setAccessTable] = React.useState<any>([]);
    const { add: handleAddToCart, cart } = useCartStore();
    const [recentViewProducts, setRecentViewProducts] = React.useState<any>([]);

    const { slug } = router.query;

    const petDetailQuery = useQuery({
        queryKey: ["petProduct", slug?.[0]],
        cacheTime: 0,
        queryFn: () => getPetById(parseInt(slug?.[1] as string)),
        onSuccess: (data) => {
            const result = convertData(data.data, petMapping);
            setPetTable(result);
        },
        onError: (error) => {
            console.error(error);
        },
        enabled: false,
        refetchOnWindowFocus: false,
    });

    const accessoriesQuery = useQuery({
        queryKey: ["accessoriesProduct", slug?.[0]],
        queryFn: () => getAccessoriesById(parseInt(slug?.[1] as string)),
        cacheTime: 0,
        onSuccess: (data) => {
            const result = convertData(data.data, accessMapping);
            setAccessTable(result);
        },
        onError: (error) => {
            console.error(error);
        },
        enabled: false,
        refetchOnWindowFocus: false,
    });

    const handleSendInteraction = async (itemId: string) => {
        const userId = Cookies.get("user");
        if (!!userId) {
            // Get recently viewed products for user
            const { recommId, items } = await store.getProductByRecombee(
                userId,
                "recently-viewed",
            );

            setRecentViewProducts(items);
            recombeeClient.client
                .send(
                    new recombeeClient.recombee_api.AddDetailView(
                        userId,
                        itemId,
                        {
                            // optional parameters:
                            duration: 0,
                            cascadeCreate: true,
                            recommId,
                        },
                    ),
                )
                .then(function (res) {
                    console.log("res :>> ", res);
                });
        }
    };
    useEffect(() => {
        if (slug?.[0] === "pet") {
            petDetailQuery.refetch();
        } else if (slug?.[0] === "accessory") {
            accessoriesQuery.refetch();
        }
    }, [slug]);

    useEffect(() => {
        if (slug?.[0] === "pet" && petDetailQuery.isSuccess) {
            handleSendInteraction(petDetailQuery.data?.data?.sku);
        } else if (slug?.[0] === "accessory" && accessoriesQuery.isSuccess) {
            handleSendInteraction(accessoriesQuery.data?.data?.sku);
        }
    }, [petDetailQuery.isSuccess, accessoriesQuery.isSuccess]);

    const guarantee = [
        { icon: <HeathGIcon />, title: "100% health guarantee for pets" },
        {
            icon: <GuaranteeIcon />,
            title: "100% guarantee of pet identification",
        },
    ];

    function formatPrice(price: string | number | undefined) {
        return price?.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
        });
    }

    const petMapping = {
        sku: "SKU",
        isMale: "Gender",
        age: "Age",
        stock_quantity: "Stock",
        color: "Color",
        weight: "Weight",
        birthday: "Birthday",
        origin: "Origin",
        // Add more mappings as needed
    };

    const accessMapping = {
        sku: "SKU",
        origin: "Origin",
        stock_quantity: "Stock",
        weight: "Weight",
        type: "Type",
        description: "Description",
        // Add more mappings as needed
    };

    // const rows = element.map((element: any) => (
    //     <Table.Tr key={element.title}>
    //         <Table.Td className="text-black-normal">{element.title}</Table.Td>
    //         <Table.Td className="text-black-normal">{element.content}</Table.Td>
    //     </Table.Tr>
    // ));

    const convertData = (data: any, mapping: any) => {
        const convertedData = [];
        if (slug?.[0] === "pet") {
            for (const key in mapping) {
                if (data.hasOwnProperty(key)) {
                    let value = data[key];

                    // Additional formatting based on key
                    if (key === "isMale") {
                        value = value ? "Male" : "Female";
                    } else if (key === "age") {
                        value = `${value} months`;
                    } else if (key === "weight") {
                        if (value < 1000) {
                            value = `${value} g`;
                        } else {
                            value = `${value / 1000} kg`;
                        }
                    } else if (key === "birthday") {
                        value = dayjs(value).format("DD/MM/YYYY");
                    }

                    convertedData.push({
                        title: mapping[key],
                        content: `: ${value}`,
                    });
                }
            }
        } else if (slug?.[0] === "accessory") {
            for (const key in mapping) {
                if (data.hasOwnProperty(key)) {
                    let value = data[key];
                    if (key === "weight") {
                        if (value < 1000) {
                            value = `${value} g`;
                        } else {
                            value = `${value / 1000} kg`;
                        }
                    } else if (key === "type") {
                        value = value.name;
                    }

                    convertedData.push({
                        title: mapping[key],
                        content: `: ${value}`,
                    });
                }
            }
        }

        return convertedData;
    };

    const handleActionClick = (data: any) => {
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

    // Render data...
    return (
        <>
            {petDetailQuery.isLoading ? (
                <div>Loading...</div>
            ) : petDetailQuery.isError ? (
                <div>Error: {(petDetailQuery as any).error}</div>
            ) : (
                <>
                    <div className="flex flex-row items-start justify-center min-h-fit border border-black-light/50 px-5 py-[22px] gap-8 rounded-xl  bg-black-light/5 mb-5">
                        <div className="left w-full h-full">
                            {!petDetailQuery.data?.data?.description_images &&
                                !accessoriesQuery.data?.data?.description_images ? (
                                <Skeleton height={476} width="100%" />
                            ) : (
                                <Carousel
                                    withIndicators
                                    height={476}
                                    controlSize={40}
                                    classNames={{
                                        control: "bg-primary/30",
                                    }}
                                    loop
                                >
                                    {petDetailQuery.data &&
                                        petDetailQuery.data?.data?.description_images.map(
                                            (image: string, index: any) => (
                                                <Carousel.Slide key={index}>
                                                    <Image
                                                        src={image}
                                                        alt={"image"}
                                                        className="w-full h-full  object-contain object-center rounded-xl"
                                                        width={500}
                                                        height={100}
                                                    />
                                                </Carousel.Slide>
                                            ),
                                        )}
                                    {accessoriesQuery.data &&
                                        accessoriesQuery.data?.data?.description_images.map(
                                            (image: string, index: any) => {
                                                return (
                                                    <Carousel.Slide key={index}>
                                                        <Image
                                                            src={image}
                                                            alt={"image"}
                                                            className="w-full h-full  object-contain object-center rounded-xl"
                                                            width={500}
                                                            height={100}
                                                        />
                                                    </Carousel.Slide>
                                                );
                                            },
                                        )}
                                </Carousel>
                            )}

                            {/* <div className="bg-yellow-light flex flex-row items-center justify-around px-3 py-2 my-4 rounded-xl    ">
                                {guarantee.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-row items-center justify-between gap-2"
                                    >
                                        {item.icon}
                                        <Text className="text-blue-medium font-bold text-sm">
                                            {item.title}
                                        </Text>
                                    </div>
                                ))}
                            </div> */}

                            <div className="px-2.5 py-4 flex flex-row gap-5 items-center">  
                                <CopyButton value={`https://pet-shop-tinhau1204.vercel.app/${router.asPath}`} timeout={2000}  >
                                    {({ copied, copy }) => (
                                        <Tooltip label={copied ? 'Copied' : 'Copy Link'} withArrow position="right">
                                            <ActionIcon
                                                color={copied ? 'teal' : 'gray'}
                                                variant="subtle"
                                                onClick={copy}>
                                                {copied ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                        <g fill="none" fill-rule="evenodd">
                                                            <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                                                            <path fill="currentColor" d="M21.546 5.111a1.5 1.5 0 0 1 0 2.121L10.303 18.475a1.6 1.6 0 0 1-2.263 0L2.454 12.89a1.5 1.5 0 1 1 2.121-2.121l4.596 4.596L19.424 5.111a1.5 1.5 0 0 1 2.122 0" />
                                                        </g>
                                                    </svg>
                                                ) : (
                                                    <ShareIcon className="w-5 h-5" />
                                                )}
                                            </ActionIcon>
                                        </Tooltip>
                                    )}
                                </CopyButton>

                                <div className="flex flex-row items-center justify-center gap-4">
                                    {socialMedia.map((link, index) => {
                                        return (
                                            <Link
                                                href={link.link}
                                                key={index}
                                                target="_blank"
                                            >
                                                {link.icon}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        {/* infor */}
                        <div className="right w-full h-full">
                            <Text className="text-black-light text-sm">
                                SKU{" "}
                                {slug?.[0] === "pet"
                                    ? petDetailQuery.data?.data?.sku
                                    : accessoriesQuery.data?.data?.sku}
                            </Text>
                            <Text className="text-black-bold text-2xl font-bold mt-0.5">
                                {slug?.[0] === "pet"
                                    ? petDetailQuery.data?.data?.name
                                    : accessoriesQuery.data?.data?.name}
                            </Text>
                            <Text className="text-blue-medium text-xl font-bold mt-1.5">
                                {formatPrice(
                                    slug?.[0] === "pet"
                                        ? petDetailQuery.data?.data?.price
                                        : accessoriesQuery.data?.data?.price,
                                )}
                            </Text>

                            <Group gap="lg" className="my-4">
                                <Button
                                    px={28}
                                    py={8}
                                    variant="filled"
                                    className="bg-blue-medium rounded-full"
                                    onClick={() => console.log("click")}
                                    disabled
                                >
                                    Contact Us
                                </Button>
                                <Button
                                    px={28}
                                    py={8}
                                    variant="outline"
                                    className="text-blue-medium border-blue-medium rounded-full"
                                    leftSection={
                                        <ChatIcon className="w-6 h-6" />
                                    }
                                    onClick={() => console.log("click")}
                                    disabled
                                >
                                    Chat with Monito
                                </Button>
                            </Group>
                            <Table>
                                <Table.Tbody>
                                    {slug?.[0] === "pet" &&
                                        (petDetailQuery.data &&
                                            petTable.length > 0 ? (
                                            petTable?.map((element: any) => (
                                                <Table.Tr key={element.title}>
                                                    <Table.Td className="text-black-normal">
                                                        {element.title}
                                                    </Table.Td>
                                                    <Table.Td className="text-black-normal">
                                                        {element.content}
                                                    </Table.Td>
                                                </Table.Tr>
                                            ))
                                        ) : (
                                            <Table.Tr>
                                                <Table.Td>Loading...</Table.Td>
                                            </Table.Tr>
                                        ))}
                                    {slug?.[0] === "accessory" &&
                                        (accessoriesQuery.data &&
                                            accessTable.length > 0 ? (
                                            accessTable?.map((element: any) => (
                                                <Table.Tr key={element.title}>
                                                    <Table.Td className="text-black-normal">
                                                        {element.title}
                                                    </Table.Td>
                                                    <Table.Td className="text-black-normal">
                                                        {element.content}
                                                    </Table.Td>
                                                </Table.Tr>
                                            ))
                                        ) : (
                                            <Table.Tr>
                                                <Table.Td>Loading...</Table.Td>
                                            </Table.Tr>
                                        ))}
                                </Table.Tbody>
                            </Table>
                            <div className="w-full flex flex-row justify-center">
                                <Button
                                    size="lg"
                                    leftSection={<CartIcon />}
                                    radius="md"
                                    className="bg-blue-bold mt-10 w-[20rem]"
                                    onClick={() =>
                                        handleActionClick(
                                            slug?.[0] === "pet"
                                                ? petDetailQuery.data?.data
                                                : accessoriesQuery.data?.data,
                                        )
                                    }
                                >
                                    Add to Cart
                                </Button>
                            </div>
                        </div>
                    </div>
                    {/* Guarantee */}
                    {
                        petDetailQuery.data?.data && petDetailQuery.data?.data?.type.parent.name === "pet" && (
                            <Guarantee />
                        )
                    }

                    <RecentViewedProducts list={recentViewProducts} />
                </>
            )}
        </>
    );
}

// This gets called on every request
export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { params } = context;

    // Pass data to the page via props
    return { props: { page: "product", slug: params?.slug || "" } };
}
