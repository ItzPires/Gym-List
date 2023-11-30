import React from 'react';
import Select from 'react-select';

function SelectBox(props) {
  const handleSelectChange = (selectedOption) => {
    if (props.onSelectChange) {
      props.onSelectChange(selectedOption);
    }
  };

  return (
    <div>
      <h1>{props.label}</h1>
      <Select
        className="basic-single"
        classNamePrefix="select"
        defaultValue={{ value: 'all', label: 'All', isFixed: true }}
        isDisabled={false}
        isLoading={false}
        isClearable={false}
        isRtl={false}
        isSearchable={false}
        name="color"
        options={props.options}
        onChange={handleSelectChange}
      />
    </div>
  );
}

export default SelectBox;
