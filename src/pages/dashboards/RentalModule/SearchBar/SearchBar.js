import React, {useState, useEffect} from 'react';
import {styled} from '@mui/system';
import {InputBase, IconButton, MenuItem, Select} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import axios from 'axios';

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
  const contact_tenure = [
    {value: 'true', label: 'Active'},
    {value: 'false', label: 'Inactive'},
  ];
  const [selectedValue, setSelectedValue] = useState('');
  const [, setSelectedStatusValue] = useState('');

  const [types, setTypes] = useState([]);

  useEffect(() => {
    getRentalTypes();
  }, []);

  const getRentalTypes = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BASE_URL + '/rental/rental-types',
      );
      setTypes(response.data.data);
    } catch (error) {
      console.error('Error fetching rental types:', error);
    }
  };

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

  const handleDropdowntenureChange = (event) => {
    const selectedStatusValue = event.target.value;
    setSelectedStatusValue(selectedStatusValue);
    onSearch(selectedStatusValue);
  };

  return (
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <div>
        <Root>
          <IconButtonStyled>
            <SearchIcon />
          </IconButtonStyled>
          <Input placeholder='নাম/ফোন সার্চ' onChange={handleSearch} />
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
            ভাড়ার ধরণ সার্চ
          </MenuItem>
          {types.map((type) => (
            <MenuItem key={type.id} value={type.label}>
              {type.label}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div>
        <Select
          value={selectedValue}
          onChange={handleDropdowntenureChange}
          style={{marginLeft: '20px', width: '200px'}}
          displayEmpty
        >
          <MenuItem value='' disabled>
            ভাড়ার স্টেটাস
          </MenuItem>
          {contact_tenure.map((type) => (
            <MenuItem key={type.value} value={type.value}>
              {type.label}
            </MenuItem>
          ))}
        </Select>
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
