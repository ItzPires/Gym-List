import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import './SearchBox.css';

function SearchBox({ onSearch, searchTextInit }) {
    const [searchText, setSearchText] = useState(searchTextInit || '');

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
        onSearch(event.target.value);
    };

    return (
        <TextField
          label="Search Box"
          variant="outlined"
          className="SearchBar"
          value={searchText}
          onChange={handleSearchChange}
        />
      );
}

export default SearchBox;
