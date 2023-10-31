import { Button, Container, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import FilterPart from "./FilterPart";
import FilterIcon from "@my-images/Filter.svg";
import React from "react";
export type FilterProps = {
    gender?: string;
    color?: string;
    price?: string;
    breed?: string;
};

const data = [
    {
        name: "Gender",
        type: "checkbox",
        items: [
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
        ],
    },
    {
        name: "Color",
        type: "checkbox",
        items: [
            { value: "red", label: "Red" },
            { value: "apricot", label: "Apricot" },
            { value: "black", label: "Black" },
            { value: "blackandwhite", label: "Black & White" },
            { value: "silver", label: "Silver" },
            { value: "tan", label: "Tan" },
        ],
    },
    {
        name: "Price",
        type: "value",
        items: [
            { value: "min", label: "Min" },
            { value: "max", label: "Max" },
        ],
    },
    {
        name: "Breed",
        type: "checkbox",
        items: [
            { value: "small", label: "Small" },
            { value: "medium", label: "Medium" },
            { value: "large", label: "Large" },
        ],
    },
];

export default function Filter({ gender, color, price, breed }: FilterProps) {
    const [isMobile, setIsMobile] = React.useState(false);
    const [opened, { open, close }] = useDisclosure();
    React.useEffect(() => {
        const intervalId = setInterval(() => {
            setIsMobile(window.matchMedia("(max-width: 768px)").matches);
        }, 200); // Adjust the interval time as needed

        // Clear the interval when the component unmounts
        return () => {
            clearInterval(intervalId);
        };
    }, []);

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
                        <FilterPart items={data} onClick={close} />
                    </Modal>
                ) : (
                    <FilterPart items={data} />
                )}
            </section>
        </>
    );
}
