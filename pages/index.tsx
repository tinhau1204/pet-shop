import Banner from "@/components/shards/Banner";
import MyCarousel from "@/components/shards/MyCarousel";
import { Box } from "@mantine/core";
import { NextPage } from "next";

type PageProps = {
    [name: string]: any;
};

export default function Page(props: PageProps) {
    // Render data...
    return (
        <div className="">
            <p className="font-bold">Page: {props.page}</p>
            <Banner />
            <MyCarousel />
        </div>
    );
}

// This gets called on every request
export async function getServerSideProps() {
    // Pass data to the page via props
    return { props: { page: "homepage" } };
}
