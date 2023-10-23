import React from "react";
import { Checkbox, } from "@mantine/core";

export type FilterPartProps = {
    title?: string;
    items?: {name: string, type: string, items:{label: string, value: string}[]}[];
    selectedItems?: string[];
    onClick?: (item: string) => void;
    color?: string;
    type?: string;

}

export type FilterCheckBoxItemProps = { title: string; items?: { label: string, value: string }[]; onClick?: (item: string) => void; }

export type FilterValueItemProps = { title: string; items?: { label: string, value: string }[]; onClick?: (item: string) => void; }

export function FilterCheckBox({
    title,
    items,
    onClick,
}: FilterCheckBoxItemProps) {

   
    return (
        <form className="mb-4 border-b pb-4 border-black-light/20">

            <p className="font-bold mb-2.5">{title}</p>
            <div className="flex flex-col gap-y-2">
                {items?.map((element, index) => (
                    <React.Fragment key={index}>
                        <Checkbox
                            classNames={{
                                labelWrapper: "w-fit"
                            }}
                            label={
                                <span className="flex flex-row items-center gap-2">
                                    {title == "Color" ? (
                                        <>
                                            <div className="w-[15px] h-[15px] rounded-full bg-red-normal"></div>
                                            {element.label}
                                        </>
                                    ) :
                                        (
                                            <>
                                                {element.label}
                                            </>
                                        )
                                    }
                                </span>

                            }
                            onChange={() => {
                                onClick?.(element.value)
                            }}
                        />

                    </React.Fragment>
                ))}
            </div>
        </form>
    );
}

export function FilterValue({
    title,
}: FilterValueItemProps) {

    return (
        <>
            <p className="font-bold mb-2.5">{title}</p>


        </>
    )
}


export default function FilterPart(
    {
        items,
        title

    }: FilterPartProps
) {

    return (

        <>
            <p className="font-bold mb-2.5">{title}</p>
            {
                items?.map((item, index) => (
                    <React.Fragment key={index}>
                        {
                            item.type == "checkbox" ? (
                                <>

                                    <FilterCheckBox
                                        title={item.name}
                                        items={item.items}
                                    />
                                </>
                            ) : (item.type === "value" && (
                                <FilterValue 
                                    title={item.name}
                                />
                            ))
                        }

                    </React.Fragment>
                ))
            }

        </>
    );
}