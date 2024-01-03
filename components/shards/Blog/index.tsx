import { AspectRatio, Box, Card, Group, Stack, Text } from "@mantine/core";
import Image from "next/image";
import MyText from "../MyText";
import BlogImage from "@my-images/blog/blog_1.png";

export type BlogProps = {
    tags?: string[];
    imageUrl?: string;
    title?: string;
    description?: string;
};

function Blog(props: BlogProps) {
    const {
        tags = ["Pet knowledge", "Pet Care", "Pet Training"],
        imageUrl = BlogImage.src,
        title = "What is a Pomeranian? How to Identify Pomeranian Dogs",
        description = "The Pomeranian, also known as the Pomeranian (Pom dog), is always in the top of the cutest pets. Not only that, the small, lovely, smart, friendly, and skillful circus ",
    } = props;

    return (
        <Box
            className="px-[10px]"
            w={{
                base: "100%",
                xs: "50%",
                md: "33.33%",
            }}
        >
            <Card
                shadow="0px 4px 28px -2px rgba(0, 0, 0, 0.08)"
                radius={12}
                className="w-full items-center"
                padding={"8px"}
            >
                <AspectRatio ratio={3 / 2} className="!w-full">
                    <Image
                        alt="image"
                        src={imageUrl}
                        fill
                        className="!rounded-[12px]"
                        sizes="auto"
                    />
                    d{" "}
                </AspectRatio>
                <Stack gap={"10px"} className="px-[8px] py-[8px]">
                    <Group gap={"8px"}>
                        {tags.map((item, index) => (
                            <Box
                                key={index}
                                className="bg-blue-light px-[10px] rounded-[28px]"
                            >
                                <Text
                                    className="!text-primary"
                                    fw="700"
                                    fz={{ base: "12px" }}
                                >
                                    {item}
                                </Text>
                            </Box>
                        ))}
                    </Group>
                    <MyText type="body" styles={{ fw: 700 }}>
                        {title}
                    </MyText>
                    <MyText type="body" styles={{ lineClamp: 3 }}>
                        {description}
                    </MyText>
                </Stack>
            </Card>
        </Box>
    );
}

export default Blog;
