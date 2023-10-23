import { NativeSelect, NativeSelectProps } from "@mantine/core";
import ArrowDownIcon from "@my-images/arrowDown.svg";
import ArrowUpIcon from '@my-images/arrowUp.svg';
import VNFlagIcon from "@my-images/vnflag.svg";
import React from "react";

export type DropdownDataProps = {value: string, icon: React.ReactNode}

export type DropdownProps = {
    leftSection?: React.ReactNode[];
    data: DropdownDataProps[];
    label?: React.ReactNode;
    error?: React.ReactNode;
    onChangeValue?: (value: string) => void ;
} & NativeSelectProps;

export default function Dropdown(
    {
        data,
        leftSection,
        label,
        error,
        onChangeValue,
        ...props
    }: DropdownProps) {

    const [value, setValue] = React.useState('');
    
    function handleSelectChange(event: any) {
        const selectedValue = event.target.value;
        setValue(selectedValue);
    };

    const selectedOption = data.find((option) => option.value === value)

    return (
        <NativeSelect
            label={label}
            error={error}
            leftSection={selectedOption ? selectedOption.icon : <VNFlagIcon />}
            onChange={(event) => {onChangeValue?.(event.currentTarget.value); handleSelectChange(event)}}
            rightSection={<ArrowDownIcon />}
            data={data.map((item) => (item.value))}
            {...props}
        />
    );
}