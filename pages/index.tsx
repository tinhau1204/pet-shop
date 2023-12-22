import Banner from "@/components/shards/Banner";
import Blog from "@/components/shards/Blog";
import Brand from "@/components/shards/Brand";
import MyCarousel from "@/components/shards/MyCarousel";
// import useCookie from "@/lib/hooks/useCookie/useCookie";
import useStore from "@/lib/store";
import { Group, Stack } from "@mantine/core";
import { useEffect } from "react";
import { useQuery } from "react-query";
const Cookies = require("js-cookie");

type PageProps = {
    [name: string]: any;
};

export default function Page(props: PageProps) {

    return (
        <Stack gap={"60px"}>
            <Banner />
            <MyCarousel />
            <Banner
                mainHeading="One more friend"
                subHeading="Thousands more fun!"
                description="Having a pet means you have more joy, a new friend, a happy person who will always be with you to have fun. We have 200+ different pets that can meet your needs"
                imageUrl="http:/localhost:3000/images/banner/banner_2.png"
            />
            <MyCarousel
                question="Hard to choose right products for your pets?"
                heading="Our Products"
                carouselType="accessories"
            />
            <Brand />

            <Group gap="0">
                <Blog />
                <Blog />
                <Blog />
            </Group>
        </Stack>
    );
}

// This gets called on every request
export async function getServerSideProps() {
    // Pass data to the page via props
    return { props: { page: "homepage" } };
}
