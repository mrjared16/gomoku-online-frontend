import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import React from "react";
import SearchIcon from "@material-ui/icons/Search";
function Search(props) {
  return (
    <FormControl variant="outlined" style={{width: '100%'}} size='small'>
      <InputLabel>Search</InputLabel>
      <OutlinedInput
        endAdornment={
          <InputAdornment position="end">
            <IconButton edge="end">
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
        labelWidth={50}
      />
    </FormControl>
  );
}

export default Search;
