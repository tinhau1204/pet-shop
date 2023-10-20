import { Box, Button, Group, Stack } from "@mantine/core";
import MyText from "../MyText";
import mock from "./mock.json";
import ProductCard from "../ProductCard";
import ChevronRight from "@my-images/button/chevron_right.svg";

export type MyCarouselProps = {
    heading?: string;
    question?: string;
    data?: typeof mock;
    button?: JSX.Element;
};

function MyCarousel(props: MyCarouselProps) {
    const {
        question = "Whats new?",
        heading = "Take a look at some of our pets",
        data = mock,
        button = (
            <Button
                className="!bg-[transparent] !text-black-bold !border-blue-bold !py-[14px] !px-[28px] !h-[44px]"
                radius={"57px"}
                rightSection={<ChevronRight />}
            >
                View More
            </Button>
        ),
    } = props;

    return (
        <Stack>
            <Group justify="space-between" align="flex-end">
                <Box>
                    <MyText type="body">{question}</MyText>
                    <MyText type="heading" styles={{ fw: 700 }}>
                        {heading}
                    </MyText>
                </Box>
                <Box display={{ base: "none", sm: "block" }}>{button}</Box>
            </Group>
            <Group className="!gap-y-[20px] !gap-x-0 !mx-[-10px] !h-[fit-content]">
                {data.map((item, index) => (
                    <ProductCard data={item} key={index} />
                ))}
            </Group>
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
