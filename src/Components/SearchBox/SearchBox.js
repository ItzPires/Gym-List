import React, { useState } from 'react';

function SearchBox({ onSearch }) {
    const [searchText, setSearchText] = useState('');

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
        onSearch(event.target.value);
    };

    return (
        <div className='SearchBox'>
            <input
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={handleSearchChange}
            />
        </div>
    );
}

export default SearchBox;
