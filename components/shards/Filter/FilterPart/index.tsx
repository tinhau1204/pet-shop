import React, { useEffect } from "react";
import { Button, Checkbox, Radio } from "@mantine/core";
import { set } from "react-hook-form";

export type FilterPartProps = {
    title?: string;
    items?:
        | {
              name: string | false;
              type: string;
              items: { label: string; value: string }[];
          }[]
        | undefined;
    selectedItems?: string[];
    onClick?: (item: string) => void;
    onClickCheckbox?: (item: string[]) => void;
    onClickRadiobox?: (item: string) => void;
    color?: string;
    type?: string;
};

export type FilterCheckBoxItemProps = {
    title: string | false;
    items?: { label: string; value: string; color?: string }[];
    onClick?: (item: string) => void;
};

export type FilterRadioItemProps = {
    name: string | false;
    type?: string;
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

export function FilterRadioBox({
    name,
    type,
    items,
    onClick,
}: FilterRadioItemProps) {
    const [value, setValue] = React.useState<string>("");
    return (
        <div className="mb-4 border-b pb-4 border-black-light/20">
            <p className="font-bold mb-2.5">{name}</p>
            <div className="flex flex-col gap-y-2">
                {items?.map((element, index) => (
                    <Radio.Group
                        key={index}
                        name={name.toString()}
                        value={value}
                        onChange={() => {
                            setValue(element.value);
                            onClick?.(element.value);
                            console.log("check value radio", element.value);
                        }}
                    >
                        <Radio
                            classNames={{
                                labelWrapper: "w-fit",
                                body: "items-center",
                            }}
                            label={element?.label}
                            value={element?.value}
                        />
                    </Radio.Group>
                ))}
            </div>
        </div>
    );
}

export default function FilterPart({
    items,
    onClickCheckbox,
    onClickRadiobox,
    onClick,
}: FilterPartProps) {
    const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
    const [value, setValue] = React.useState<string>("");

    const handleCheckboxChange = (value: string) => {
        setSelectedItems((prevSelectedItems) => {
            if (prevSelectedItems.includes(value)) {
                // If the item is already selected, remove it
                return prevSelectedItems.filter((item) => item !== value);
            } else {
                // If the item is not selected, add it
                return [...prevSelectedItems, value];
            }
        });
    };

    return (
        <form>
            {items?.map((item, index) => (
                <React.Fragment key={index}>
                    {item?.type == "checkbox" ? (
                        <>
                            <FilterCheckBox
                                title={item.name}
                                items={item.items}
                                onClick={handleCheckboxChange}
                            />
                        </>
                    ) : (
                        item?.type === "radio" && (
                            <FilterRadioBox
                                name={item.name}
                                items={item.items}
                                onClick={(item) => setValue(item)}
                            />
                        )
                    )}
                </React.Fragment>
            ))}
            <Button
                fullWidth
                variant="outline"
                onClick={() => {
                    if (selectedItems.length > 0) {
                        onClickCheckbox?.(selectedItems);
                    } else if (value) {
                        onClickRadiobox?.(value);
                    }
                }}
                radius="md"
            >
                Filter
            </Button>
        </form>
    );
}
