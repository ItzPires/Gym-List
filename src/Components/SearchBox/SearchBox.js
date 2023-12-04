import React, { useState } from 'react';
import './SearchBox.css';

function SearchBox({ onSearch }) {
    const [searchText, setSearchText] = useState('');

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
        onSearch(event.target.value);
    };

    return (
        <input
            className="SearchBar"
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={handleSearchChange}
        />
    );
}

export default SearchBox;
