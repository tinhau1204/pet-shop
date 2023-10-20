import { AspectRatio, Box, Button, Group, Stack } from "@mantine/core";
import MyText from "../MyText";
import Image from "next/image";

export type BrandProps = {
    heading?: string;
    data?: string[];
    button?: JSX.Element;
};

function Brand(props: BrandProps) {
    const {
        heading = "Proud to be part of Pet Sellers",
        data = [
            "http:/localhost:3000/images/brand/brand_1.png",
            "http:/localhost:3000/images/brand/brand_2.png",
            "http:/localhost:3000/images/brand/brand_3.png",
            "http:/localhost:3000/images/brand/brand_4.png",
            "http:/localhost:3000/images/brand/brand_5.png",
            "http:/localhost:3000/images/brand/brand_6.png",
            "http:/localhost:3000/images/brand/brand_7.png",
        ],
        button = (
            <Button
                className="!bg-[transparent] !text-black-bold !border-blue-bold !py-[14px] !px-[28px] !h-[44px]"
                radius={"57px"}
            >
                View all our sellers
            </Button>
        ),
    } = props;
    return (
        <Stack gap={"15px"}>
            <Group justify="space-between">
                <MyText type="body">{heading}</MyText>
                {button}
            </Group>
            <Group gap={0}>
                {data.slice(0, 7).map((item, index) => (
                    <Box
                        key={index}
                        className="px-[10px] cursor-pointer"
                        w={{
                            base: "50%",
                            xs: "33.33%",
                            lg: "25%",
                            xl: "14.28%",
                        }}
                    >
                        <AspectRatio ratio={2} w={"151px"} mx={"auto"}>
                            <Image
                                alt={item}
                                src={item}
                                fill
                                className="!object-contain"
                                sizes="auto"
                            />
                        </AspectRatio>
                    </Box>
                ))}
            </Group>
        </Stack>
    );
}

export default Brand;
