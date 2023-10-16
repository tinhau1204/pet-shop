import { Box, Button, Flex, Group, Image, Stack, Text } from "@mantine/core";
import BannerImage from "@my-images/banner.png";
import { StaticImageData } from "next/image";
import React from "react";
import MyText from "../MyText";
import PlayCircleSVG from "@my-images/play_circle.svg";

type BannerProps = {
    mainHeading?: string;
    subHeading?: string;
    description?: string;
    header?: JSX.Element;
    buttons?: JSX.Element[];
    image?: StaticImageData;
};

function Banner(props: BannerProps) {
    const {
        mainHeading = "One more friend",
        subHeading = "Thousands more fun!",
        description = "Having a pet means you have more joy, a new friend, a happy person who will always be with you to have fun. We have 200+ different pets that can meet your needs!",
        header,
        buttons = [
            <Button
                className="!bg-[transparent] !text-black-bold !border-blue-bold !py-[14px] !px-[28px] !h-[45px]"
                radius={"57px"}
                rightSection={<PlayCircleSVG />}
                key={1}
            >
                View Intro
            </Button>,
            <Button
                className="!bg-blue-bold !text-primary !border-blue-bold !py-[14px] !px-[28px] !h-[44px]"
                radius={"57px"}
                key={2}
            >
                Explore Now
            </Button>,
        ],
        image = BannerImage,
    } = props;

    return (
        <div className="bg-yellow-light relative w-[100vw] left-[50%] right-[50%] mr-[-50vw] ml-[-50vw] sm:aspect-[1440/695] pt-[32px] sm:pt-0 px-[16px] sm:px-0">
            <div className="base-container h-full">
                {header}
                <Flex
                    gap={{ base: "25px", sm: "0px" }}
                    className="h-full"
                    direction={{ base: "column", sm: "row" }}
                    align={{ base: "center", sm: "center" }}
                >
                    <Stack gap={"24px"} className="basis-[50%]">
                        <Box>
                            <Text fw={700} fz={{ base: "42px", lg: "60px" }}>
                                {mainHeading}
                            </Text>
                            <Text fw={700} fz={{ base: "26px", lg: "46px" }}>
                                {subHeading}
                            </Text>
                        </Box>
                        <MyText type="body">{description}</MyText>
                        <Group>
                            {buttons.map((item, index) => (
                                <Box key={index}>{item}</Box>
                            ))}
                        </Group>
                    </Stack>
                    <Box className="basis-[50%] h-full">
                        <Image
                            alt="image"
                            src={image.src}
                            w={"100%"}
                            h={"100%"}
                        />
                    </Box>
                </Flex>
            </div>
        </div>
    );
}

export default Banner;
