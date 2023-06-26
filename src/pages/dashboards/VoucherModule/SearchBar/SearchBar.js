import React from 'react';
import { styled } from '@mui/system';
import { InputBase, IconButton } from '@mui/material';
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

const SearchBar = ({ onSearch }) => {
  const handleSearch = (event) => {
    const query = event.target.value;
    onSearch(query);
  };

  return (
    <Root>
      <IconButtonStyled>
        <SearchIcon />
      </IconButtonStyled>
      <Input
        placeholder="Search"
        onChange={handleSearch}
      />
    </Root>
  );
};

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
  };

export default SearchBar;
