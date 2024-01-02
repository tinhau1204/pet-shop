import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import CateContent from "./shards/CateContent";
import { Flex } from "@mantine/core";
import Filter from "@/components/shards/Filter";
import { useQuery } from "react-query";
import { getAccessories, getPet } from "@/lib/api";
import { accessoriesData, petsData } from "@/lib/api/types";
import Banner from "@/components/shards/Banner";
import BannerImage from "@my-images/banner/banner_3.png";

type PageProps = {
    [name: string]: any;
};

export default function Page(props: PageProps) {
    const router = useRouter();
    const [filter, setFilter] = React.useState<string[] | string>([]);
    const [filterData, setFilterData] = React.useState<
        petsData[] | accessoriesData[] | undefined
    >([]);

    const getPetQuery = useQuery({
        queryKey: ["pets"],
        queryFn: getPet,
        onSuccess: (data) => {},
        onError: (error) => {
            console.error('err', error);
        },
        refetchOnWindowFocus: false,
    });

    const getAccessoriesQuery = useQuery({
        queryKey: ["accessories"],
        queryFn: getAccessories,
        onSuccess: (data) => {},
        onError: (error) => {},
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (filter.length > 0) {
            function handleFilterData(data: petsData[] | accessoriesData[]) {
                if (props.slug === "pets") {
                    if (filter.length > 0) {
                        console.log("data before filter", data);
                        return data.filter((pet: any) => {
                            const typeName = pet.type.name.toLowerCase();
                            const isMale = pet.isMale;

                            const filterType = filter[0]?.toLowerCase() || null;
                            const filterGender =
                                filter[1]?.toLowerCase() || null;

                            const typeMatches = filterType
                                ? typeName.includes(filterType)
                                : true;
                            const genderMatches =
                                filterGender !== null
                                    ? isMale ===
                                      (filterGender === "male" ||
                                          filterGender === "female")
                                    : true;
                            // Apply the type filter first
                            if (
                                filterType &&
                                (filterType == "male" || filterType == "female")
                            ) {
                                // const filteredData = data.filter((pet: any) => {
                                //     const isMale = pet.isMale;
                                //     return filterGender === "male"
                                //         ? isMale
                                //         : !isMale;
                                // });
                                // return filteredData;
                                return isMale === (filterType === "male");
                            }
                            return typeMatches && genderMatches;
                        });
                    } else if (filter.length === 0) {
                        setFilterData(getPetQuery.data);
                    }
                } else if (props.slug === "accessories") {
                    if (filter.length > 0) {
                        return data.filter((accessory: any) => {
                            const typeName = accessory.type.name.toLowerCase();
                            const filterType =
                                Array.isArray(filter) &&
                                filter?.map((item: any) => item.toLowerCase());
                            return typeName.includes(filterType);
                        });
                    } else if (filter.length === 0) {
                        setFilterData(getAccessoriesQuery.data);
                    }
                }
            }

            setFilterData(
                handleFilterData(
                    props.slug === "pets"
                        ? getPetQuery.data
                        : getAccessoriesQuery.data,
                ),
            );
        } else {
            setFilterData(
                props.slug === "pets"
                    ? getPetQuery.data
                    : getAccessoriesQuery.data,
            );
        }
    }, [filter, getPetQuery.data, getAccessoriesQuery.data, props.slug]);
    return (
        <section id="categories" className="mb-4">
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
                {props.slug &&
                (getPetQuery.data || getAccessoriesQuery.data) ? (
                    <>
                        <Filter
                            slug={props?.slug}
                            onClickFilter={(item: string[]) => {
                                console.log("item", item);
                                setFilter([...item]);
                            }}
                        />
                        <CateContent data={filterData} slug={props.slug} />
                    </>
                ) : (
                    <div className="h-screen w-screen">
                        <h2 className=" mx-auto text-2xl font-bold">
                            loading...
                        </h2>
                    </div>
                )}
            </Flex>
        </section>
    );
}

// This gets called on every request
export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { params } = context;

    // Pass data to the page via props
    return { props: { page: "category", slug: params?.slug || "" } };
}
