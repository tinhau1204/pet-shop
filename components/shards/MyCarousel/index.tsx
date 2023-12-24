import { Box, Button, Flex, Grid, Group, Stack } from "@mantine/core";
import MyText from "../MyText";
import mock from "./mock.json";
import ProductCard from "../ProductCard";
import ChevronRight from "@my-images/button/chevron_right.svg";
import { useQuery } from "react-query";
import { getAccessories, getPet } from "@/lib/api/product";
import { accessoriesData, petsData } from "@/lib/api/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export type MyCarouselProps = {
    heading?: string;
    question?: string;
    carouselType?: "pets" | "accessories";
    data?: typeof mock;
    button?: JSX.Element;
    onClick?: (type: string) => void;
};

function MyCarousel(props: MyCarouselProps) {
    const [pets, setPets] = useState<petsData[] | []>([]);
    const [accessories, setAccessories] = useState<accessoriesData[] | []>([]);
    const router = useRouter();
    const getPetsQuery = useQuery({
        queryKey: "getPet",
        queryFn: () => getPet(),
        onSuccess: (data: petsData[]) => {
            setPets(data);
        },
        onError: (err) => {
            console.error("error ", err);
        },
        refetchOnWindowFocus: false,
    });

    const getAccessoriesQuery = useQuery({
        queryKey: "getAccessories",
        queryFn: () => getAccessories(),
        onSuccess: (data: accessoriesData[]) => {
            setAccessories(data);
        },
        onError: (err) => {
            console.error("error ", err);
        },
        refetchOnWindowFocus: false,
    });

    const {
        question = "Whats new?",
        heading = "Take a look at some of our pets",
        carouselType = "pets",
        button = (
            <Button
                className="!bg-[transparent] !text-black-bold !border-blue-bold !py-[14px] !px-[28px] !h-[48px]"
                radius={"57px"}
                rightSection={<ChevronRight />}
                onClick={() => {
                    props.onClick && props.onClick(carouselType);
                    router.push(`/categories/${carouselType}`);
                }}
            >
                View More
            </Button>
        ),
    } = props;

    return (
        <Stack>
            <Group justify="space-between" align="flex-end">
                <Box>
                    <MyText className="text-blue-bold" type="body">
                        {question}
                    </MyText>
                    <MyText
                        className="text-blue-bold"
                        type="heading"
                        styles={{ fw: 700 }}
                    >
                        {heading}
                    </MyText>
                </Box>
                <Box display={{ base: "none", sm: "block" }}>{button}</Box>
            </Group>
            <Grid>
                {carouselType == "pets" && getPetsQuery.data
                    ? getPetsQuery?.data?.map((item) => (
                          <Grid.Col
                              span={{ base: 6, xs: 6, sm: 4, md: 3 }}
                              key={item.id}
                          >
                              <ProductCard data={item} />
                          </Grid.Col>
                      ))
                    : getAccessoriesQuery?.data?.map((item) => (
                          <Grid.Col
                              span={{ base: 6, xs: 6, sm: 4, md: 3 }}
                              key={item.id}
                          >
                              <ProductCard data={item} />
                          </Grid.Col>
                      ))}
            </Grid>

            {/* <Flex 
                className="!gap-y-[20px] !mx-[-10px] !h-[fit-content] md:max-w-screen-md xl:max-w-screen-xl"
                direction={{base:"column" , md:"row"}}
                justify={{base:"start" , md: "between"}}
                gap="0"    
            >
                {data.map((item, index) => (
                    <ProductCard data={item} key={index} />
                ))}
            </Flex> */}
            <Box display={{ base: "block", sm: "none" }}>
                <Button
                    className="!bg-[transparent] !text-black-bold !border-blue-bold !py-[14px] !px-[28px] !h-[44px] !w-full"
                    radius={"57px"}
                    rightSection={<ChevronRight />}
                >
                    View More
                </Button>
            </Box>
        </Stack>
    );
}

export default MyCarousel;
