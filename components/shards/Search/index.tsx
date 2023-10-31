import {TextInput, TextInputProps, CloseButton} from '@mantine/core'
import SearchIcon from '@my-images/search.svg'
import React from 'react';

export type SearchProps = {
    placeholder?: string;
} & TextInputProps;


export default function Search({
    placeholder,

    ...inputProps
}: SearchProps) {
    const [value, setValue] = React.useState('');
    return (
        <TextInput 
            leftSection={<SearchIcon />}
            placeholder={placeholder || 'Search something here!'}
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
            leftSectionPointerEvents='all'
            rightSectionPointerEvents="all"
            rightSection={
                <CloseButton
                    aria-label="Clear input"
                    onClick={() => setValue('')}
                    style={{ display: value ? undefined : 'none' }}
                />
            }
            {...inputProps}
        />

    );
    
}