import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import './SearchBox.css';

function SearchBox({ onSearch }) {
    const [searchText, setSearchText] = useState('');

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
        onSearch(event.target.value);
    };

    return (
        <TextField
          label="Search Box"
          variant="outlined"
          value={searchText}
          onChange={handleSearchChange}
        />
      );
}

export default SearchBox;
