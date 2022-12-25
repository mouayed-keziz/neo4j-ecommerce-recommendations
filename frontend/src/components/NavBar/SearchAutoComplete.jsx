import { Autocomplete } from '@mantine/core';
import { IconSearch } from '@tabler/icons';
import { useState } from 'react';

const SearchAutoComplete = ({ className }) => {

    // all element in this array will be shown in the autocomplete
    // no duplicates allowed (it will break the autocomplete component)
    // add setSuggestions to the useState statement

    const [suggestions] = useState(["mouayed", "moncef", "amine", "hamoutene", "bouchenacha", "keziz"]);
    return (
        <Autocomplete placeholder="Placeholder" className={className} icon={<IconSearch />} data={suggestions} />
    );
};

export default SearchAutoComplete;