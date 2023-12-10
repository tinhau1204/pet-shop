import Dropdown from "@/components/shards/Dropdown";
import {
    Text,
    Button,
    Flex,
    Group,
    SimpleGrid,
    Pagination,
} from "@mantine/core";
import mock from "./mock.json";
import ProductCard from "@/components/shards/ProductCard";
import { PetType, AccessoryType } from "@/components/shards/ProductCard";
import ArrowLeftIcon from "@my-images/Arrow_Left_SM.svg";
import ArrowRightIcon from "@my-images/Arrow_Right_SM.svg";
import { usePagination } from "@mantine/hooks";
export type CateContentProps = {
    data?: typeof mock;
};

export default function CateContent({ data = mock }: CateContentProps) {
    const pagination = usePagination({ total: 28, initialPage: 1 });

    return (
        <section id="cate-content" className="w-full h-full mt-8 ">
            <Flex
                justify={{ base: "start", sm: "space-between" }}
                align={{ base: "start", sm: "center" }}
                direction={{ base: "column-reverse", sm: "row" }}
                gap={{ base: "25px" }}
                className="h-fit px-2 mb-3"
            >
                <div className="flex flex-row items-center gap-3">
                    <Text fw={700} className="text-blue-medium text-2xl">
                        Small Cat
                    </Text>
                    <Text className="text-black-normal text-sm mt-1">
                        52 puppies
                    </Text>
                </div>

                <Dropdown
                    data={[
                        { value: "default", label: "Default" },
                        { value: "newest", label: "Newest" },
                        { value: "price", label: "Price" },
                        { value: "name", label: "Name" },
                    ]}
                    leftSection={
                        <span className="min-w-fit ml-1 sm:ml-3 text-black-normal text-sm">
                            Sort by:{" "}
                        </span>
                    }
                    classNames={{
                        section: "w-fit px-2 py-1 text-center align-middle",
                        input: "pl-16 sm:ml-2 text-black-normal text-base  font-semibold",
                    }}
                    radius="xl"
                    className="w-fit"
                    size="md"
                />
            </Flex>

            <SimpleGrid
                className="gap-x-3 sm:gap-x-5 gap-y-[1.625rem] w-auto sm:w-full px-2 place-items-stretch"
                cols={{ base: 2, xs: 3, sm: 3, lg: 4 }}
            >
                {data.map((item, index) => (
                    <ProductCard
                        data={item}
                        key={index}
                        classContainer=" w-fit h-full !px-0"
                    />
                ))}
            </SimpleGrid>

            <Flex justify="center" className="mt-10">
                <Pagination
                    total={28}
                    nextIcon={ArrowRightIcon}
                    previousIcon={ArrowLeftIcon}
                    size="lg"
                    color="#003459"
                    fw={700}
                    classNames={{
                        control: "border-0",
                    }}
                />
            </Flex>
        </section>
    );
}
