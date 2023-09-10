import React, {useState} from 'react';
import {styled} from '@mui/system';
import {InputBase, IconButton, MenuItem, Select} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';

const Root = styled('div')({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  borderRadius: 4,
  backgroundColor: '#f2f2f2',
  padding: '4px 8px',
});

const Input = styled(InputBase)({
  marginLeft: 8,
  flex: 1,
});

const IconButtonStyled = styled(IconButton)({
  padding: 8,
});

const SearchBar = ({onSearch}) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleSearch = (event) => {
    const query = event.target.value;
    onSearch(query);
  };

  const handleDropdownChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedValue(selectedValue);
    console.log(selectedValue);
    onSearch(selectedValue);
  };

  const types = [{value: 'true', label:"Running"}, {value: 'false', label:"Done"}];

  return (
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <div>
        <Root>
          <IconButtonStyled>
            <SearchIcon />
          </IconButtonStyled>
          <Input placeholder='প্রজেক্ট নাম সার্চ' onChange={handleSearch} />
        </Root>
      </div>
      <div>
        <Select
          value={selectedValue}
          onChange={handleDropdownChange}
          style={{marginLeft: '20px', width: '200px'}}
          displayEmpty
        >
          <MenuItem value='' disabled>
            প্রজেক্ট স্টেটাস খুজুন
          </MenuItem>
          {types.map((type) => (
            <MenuItem key={type.id} value={type.value}>
              {type.label}
            </MenuItem>
          ))}
        </Select>
      </div>
      {/* <div>
        <Select
          value={selectedValue}
          onChange={handleDropdownChange}
          style={{marginLeft: '20px', width: '200px'}}
          displayEmpty
        >
          <MenuItem value='' disabled>
            ভাড়ার স্টেটাস
          </MenuItem>
          {types.map((type) => (
            <MenuItem key={type.id} value={type.label}>
              {type.label}
            </MenuItem>
          ))}
        </Select>
      </div> */}
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
