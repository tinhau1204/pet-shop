import { searchAccessories, searchPets } from "@/lib/api";
import { TextInput, TextInputProps, CloseButton, Box } from "@mantine/core";
import SearchIcon from "@my-images/search.svg";
import Link from "next/link";
import React, { useEffect } from "react";
import { useQuery } from "react-query";

export type SearchProps = {
    placeholder?: string;
} & TextInputProps;

export default function Search({
    placeholder,

    ...inputProps
}: SearchProps) {
    const [value, setValue] = React.useState("");
    const [openSearchableBox, setOpenSearchableBox] = React.useState(false);
    const {
        data: pets,
        refetch: refetchPets,
        isLoading: isLoadingPets,
    } = useQuery({
        queryKey: ["petsProduct"],
        queryFn: () =>
            searchPets({
                name: value,
            }),
        onSuccess: (data) => {},
        onError: (error) => {
            console.error(error);
        },
        enabled: false,
    });

    const {
        data: accessories,
        refetch: refetchAccessories,
        isLoading: isLoadingAccessories,
    } = useQuery({
        queryKey: ["accessoriesProduct"],
        queryFn: () => searchAccessories({ name: value }),
        onSuccess: (data) => {},
        onError: (error) => {
            console.error(error);
        },
        enabled: false,
    });

    useEffect(() => {
        const timeId = setTimeout(() => {
            refetchPets();
            refetchAccessories();
        }, 500);
        return () => clearTimeout(timeId);
    }, [value]);

    return (
        <Box className="relative">
            <TextInput
                leftSection={<SearchIcon />}
                placeholder={placeholder || "Search something here!"}
                value={value}
                onChange={(event) => {
                    setValue(event.currentTarget.value);
                    setOpenSearchableBox(true);
                }}
                leftSectionPointerEvents="all"
                rightSectionPointerEvents="all"
                rightSection={
                    <CloseButton
                        aria-label="Clear input"
                        onClick={() => setValue("")}
                        style={{ display: value ? undefined : "none" }}
                    />
                }
                {...inputProps}
            />
            {/* Searchable Box */}
            <Box
                className="flex flex-col gap-[10px] absolute z-50 bg-primary rounded-[10px] shadow-xl w-full"
                display={
                    openSearchableBox && (pets.length || accessories.length)
                        ? "flex"
                        : "none"
                }
            >
                {(
                    [
                        ...(pets ? JSON.parse(JSON.stringify(pets)) : []).map(
                            (item: any) => ({
                                id: item.id,
                                name: item.name,
                                type: "pet",
                            }),
                        ),
                        ...(accessories
                            ? JSON.parse(JSON.stringify(accessories))
                            : []
                        ).map((item: any) => ({
                            id: item.id,
                            name: item.name,
                            type: "accessory",
                        })),
                    ] || []
                ).map((item: any, index: any) => {
                    return (
                        <Link
                            href={`/products/${item?.type}/${item.id}`}
                            className="cursor-pointer hover:bg-secondary"
                            onClick={() => {
                                setValue("");
                                setOpenSearchableBox(false);
                            }}
                            key={index}
                        >
                            <Box className="truncate ... px-[10px] py-[5px]">
                                {item.name}
                            </Box>
                        </Link>
                    );
                })}
            </Box>
        </Box>
    );
}
