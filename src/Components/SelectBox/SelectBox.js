import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function SelectBox(props) {
  const handleSelectChange = (selectedOption) => {
    if (props.onSelectChange) {
      props.onSelectChange(selectedOption);
    }
  };

  return (
    <Autocomplete
    options={props.options}
      getOptionLabel={(option) => option.label}
      onChange={(event, newValue) => {
        handleSelectChange(newValue);
      }}
      renderInput={(params) => <TextField {...params} label={props.label} />}
    />
  );
}

export default SelectBox;
