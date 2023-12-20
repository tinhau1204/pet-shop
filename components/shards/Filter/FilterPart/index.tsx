import React from "react";
import { Button, Checkbox } from "@mantine/core";

export type FilterPartProps = {
    title?: string;
    items?: {
        name: string;
        type: string;
        items: { label: string; value: string }[];
    }[];
    selectedItems?: string[];
    onClick?: () => void;
    color?: string;
    type?: string;
};

export type FilterCheckBoxItemProps = {
    title: string;
    items?: { label: string; value: string; color?: string }[];
    onClick?: (item: string) => void;
};

export type FilterValueItemProps = {
    title: string;
    items?: { label: string; value: string }[];
    onClick?: (item: string) => void;
};

export function FilterCheckBox({
    title,
    items,
    onClick,
}: FilterCheckBoxItemProps) {
    return (
        <div className="mb-4 border-b pb-4 border-black-light/20">
            <p className="font-bold mb-2.5">{title}</p>
            <div className="flex flex-col gap-y-2">
                {items?.map((element, index) => (
                    <React.Fragment key={index}>
                        <Checkbox
                            classNames={{
                                labelWrapper: "w-fit",
                                body: "items-center",
                            }}
                            label={
                                <span className="flex flex-row items-center gap-2">
                                    {title == "Color" ? (
                                        <>
                                            <div
                                                className={`min-w-[15px] h-[15px] rounded-full ${element.color} border border-black-light/20`}
                                            ></div>
                                            {element.label}
                                        </>
                                    ) : (
                                        <>{element.label}</>
                                    )}
                                </span>
                            }
                            onChange={() => {
                                onClick?.(element.value);
                            }}
                        />
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

export function FilterValue({ title }: FilterValueItemProps) {
    return (
        <>
            <p className="font-bold mb-2.5">{title}</p>
        </>
    );
}

export default function FilterPart({ items, onClick }: FilterPartProps) {
    return (
        <form>
            {items?.map((item, index) => (
                <React.Fragment key={index}>
                    {item.type == "checkbox" ? (
                        <>
                            <FilterCheckBox
                                title={item.name}
                                items={item.items}
                            />
                        </>
                    ) : (
                        item.type === "value" && (
                            <FilterValue title={item.name} />
                        )
                    )}
                </React.Fragment>
            ))}
            <Button fullWidth variant="outline" onClick={onClick} radius="md">
                Filter
            </Button>
        </form>
    );
}
