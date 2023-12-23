import { Button, Container, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import FilterPart from "./FilterPart";
import FilterIcon from "@my-images/Filter.svg";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getAccessoriesType, getPetType } from "@/lib/api";
import { petTypesData, accessoriesTypesData, petsData } from "@/lib/api/types";
import { useRouter } from "next/router";
export type FilterProps = {
    slug?: string;
    onClickFilter?: (item: string[]) => void;
};

type FilterObject = {
    name: string | false;
    type: string;
    items: { label: string; value: string }[];
} | undefined;


export default function Filter({ slug, onClickFilter }: FilterProps) {
    const [isMobile, setIsMobile] = React.useState(false);
    const [opened, { open, close }] = useDisclosure();
    const [petFilter, setPetFilter] = useState<FilterObject[]>([])
    const [accessoriesFilter, setAccessoriesFilter] = useState<FilterObject[]>([])
    const [filter, setFilter] = useState<string[] | string>([]);
    const router = useRouter();

    const cateRootFilter = [
        {
            name: "Category",
            type: "radio",
            items: [
                { value: "pets", label: "Pets" },
                { value: "accessories", label: "Accessories" },
            ]
        }
    ]

    const transformNameData = (data: accessoriesTypesData[] | petTypesData[]) => {
        return {
            name: ((data[0] as petTypesData).pets !== undefined) ? "Seeds" : "Supplies",
            type: 'checkbox',
            items: data.map((item: any) => ({
                value: item.name?.toLowerCase(),
                label: item.name,
            }))
        }
    }

    const transformGenderData = (data: petTypesData[]) => {
        if (Array.isArray(data) && data.length > 0 && 'pets' in data[0]) {
            return {
                name: 'Gender',
                type: 'checkbox',
                items: [
                    { value: 'male', label: 'Male' },
                    { value: 'female', label: "Female" }
                ]
            }
        } else {
            return undefined;
        }
    }

    const handleFilter = (slug: string) => {
        if (slug === 'pets') {
            return petFilter
        } else if (slug === 'accessories') {
            return accessoriesFilter
        } else {
            return cateRootFilter
        }
    }

    const transformOriginData = (data: petTypesData[] | accessoriesTypesData[]) => {
        let itemsOrigin: { value: string; label: string }[] = [];
        const uniqueOrigin = new Set<string>();
        if (Array.isArray(data) && data.length > 0) {
            if ((data as accessoriesTypesData[])[0]?.accessories) {
                itemsOrigin = (data as accessoriesTypesData[]).flatMap((item: accessoriesTypesData) =>
                    item.accessories
                        ? item.accessories.map((access: any) => ({
                            value: access.origin?.toLowerCase(),
                            label: access.origin,
                        }))
                        : []
                );
            } else if ((data as petTypesData[])[0]?.pets) {
                itemsOrigin = (data as petTypesData[]).flatMap((item: petTypesData) =>
                    item.pets
                        ? item.pets.map((pet: any) => ({
                            value: pet.origin?.toLowerCase(),
                            label: pet.origin,
                        }))
                        : []
                );
            }
        }
        const filterOrigin = itemsOrigin.filter((item) => {
            if (!uniqueOrigin.has(item.value)) {
                uniqueOrigin.add(item.value);

            }
            return uniqueOrigin
        })

        return {
            name: ((data[0] as petTypesData) && (data[0] as petTypesData))?.pets?.[0]?.origin !== undefined && "Origin" ||
                (data[0] as accessoriesTypesData)?.accessories?.[0]?.origin !== undefined && "Origin",
            type: 'checkbox',
            items: filterOrigin,
        }
    }
    const transformAllFilter = (data: any) => {
        const nameData = transformNameData(data)
        const genderData = transformGenderData(data)
        // const origin = transformOriginData(data)
        return data = [
            nameData,
            genderData,
            // origin
        ]
    }

    const filterPetsQuery = useQuery({
        queryKey: "filterPets",
        queryFn: () => getPetType(),
        onSuccess: (data: petTypesData[]) => {
            const dataPet = transformAllFilter(data)
            setPetFilter(dataPet)
        },
        onError: (error) => {
            console.error('error', error)
        },
        refetchOnWindowFocus: false,
        refetchOnMount: true,
    })

    const filterAccessoriesQuery = useQuery({
        queryKey: "filterAccessories",
        queryFn: () => getAccessoriesType(),
        onSuccess: (data: accessoriesTypesData[]) => {
            const dataAccess = transformAllFilter(data)
            setAccessoriesFilter(dataAccess)
        },
        onError: (error) => {
            console.error('error', error)
        },
        refetchOnWindowFocus: false,
        refetchOnMount: true,
    })

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            setIsMobile(window.matchMedia("(max-width: 768px)").matches);
        }, 200); // Adjust the interval time as needed
        // Clear the interval when the component unmounts
       
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    React.useEffect(() => {
        filterPetsQuery
        filterAccessoriesQuery
    },[filterPetsQuery, filterAccessoriesQuery])

    function handleRadioFilter(item: string) {
        setFilter(item)
        if (item === 'pets') {
            router.push('/categories/pets')
            filterPetsQuery.refetch()
        } else if (item === 'accessories') {
            router.push('/categories/accessories')
            filterAccessoriesQuery.refetch()
        }
    }

    function handleCheckboxFilter(item: string[]){
        setFilter([...item])
        onClickFilter?.([...item])
    }

    return (
        <>
            <section
                id="filter"
                className="relative h-full md:min-w-[200px] lg:min-w-[280px] mt-8"
            >
                {!isMobile ? (
                    <p className="text-blue-medium font-bold text-2xl">
                        Filter
                    </p>
                ) : (
                    <Button
                        variant="transparent"
                        className="text-blue-medium font-bold text-lg absolute top-0 right-4"
                        leftSection={isMobile && <FilterIcon />}
                        disabled={!isMobile}
                        onClick={open}
                    >
                        Filter
                    </Button>
                )}

                {isMobile ? (
                    <Modal
                        title="Filter"
                        opened={opened}
                        onClose={close}
                        size="xs"
                        classNames={{
                            title: "text-blue-medium font-bold text-lg",
                        }}
                    >
                        <FilterPart items={handleFilter(slug as string)} onClickCheckbox={(item: string[]) => {
                            handleCheckboxFilter([...item])
                            close()
                        }} />
                    </Modal>
                ) : (
                    <FilterPart
                        items={handleFilter(slug as string)}
                        onClickCheckbox={(item: string[]) => handleCheckboxFilter([...item])}
                        onClickRadiobox={(item: string) => handleRadioFilter(item)}
                    />
                )}
            </section>
        </>
    );
}

