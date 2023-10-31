import Banner from "@/components/shards/Banner";
import BannerImage from "@my-images/banner/banner_3.png";
type PageProps = {
    [name: string]: any;
};
import CateContent from "./shards/CateContent";
import Filter from "@/components/shards/Filter";
import FilterPart from "@/components/shards/Filter/FilterPart";
import { Flex } from "@mantine/core";

export default function Page(props: PageProps) {
    // Render data...
    return (
        <section id="categories" className="mb-4">
            {/* <p className="font-bold">Page: {props.page}</p> */}
            <Banner
                imageUrl={BannerImage.src}
                imagePosition="sm:mt-12"
                elementReverse={true}
            />
            <Flex
                gap={{ base: "0", sm: "20px" }}
                justify={{ base: "flex-end", sm: "flex-start" }}
                align={{ base: "start", sm: "start" }}
                direction={{ base: "row-reverse", sm: "row" }}
            >
                <Filter />
                <CateContent />
            </Flex>
        </section>
    );
}

// This gets called on every request
export async function getServerSideProps() {
    // Pass data to the page via props
    return { props: { page: "category" } };
}
