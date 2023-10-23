import {Container, Text} from "@mantine/core"
import { FilterCheckBox } from "./FilterPart";
import FilterPart from "./FilterPart";
export type FilterProps = {
    gender?: string;
    color?: string;
    price?: string;
    breed?: string;
}

const data = [
    {
        name: 'Gender',
        type: 'checkbox',
        items: [
            {value: 'male', label: 'Male'},
            {value: 'female', label: "Female"}
        ]
    },
    {
        name: 'Color',
        type: 'checkbox',
        items: [
            {value: 'red', label: 'Red'},
            {value: 'apricot', label: 'Apricot'},
            {value: 'black', label: 'Black'},
            {value: 'blackandwhite', label: 'Black & White'},
            {value: 'silver', label: 'Silver'},
            {value: 'tan', label: 'Tan'}
        ]
    },
    {
        name: 'Price',
        type: 'value',
        items: [
            {value: 'min', label: "Min"},
            {value: 'max', label: "Max"}
        ]
    },
    {
        name: 'Breed',
        type: 'checkbox',
        items: [
            {value: 'small', label: 'Small'},
            {value: 'medium', label: 'Medium'},
            {value: 'large', label: 'Large'},
        ]
    },
]

export default function Filter(
    {
        gender,
        color,
        price,
        breed,
    }: FilterProps
) {

    return (
        <section id="filter" className="h-full max-w-xs mt-8">
            <Text fw={700} className="text-blue-medium text-2xl">Filter</Text>
            <FilterPart 
                items={data}
            />
        </section>
    )
}