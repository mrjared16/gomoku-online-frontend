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
    <FormControl variant="outlined" style={{width: 200}}>
      <InputLabel htmlFor="outlined-adornment-search">Enter ID</InputLabel>
      <OutlinedInput
				id="outlined-adornment-search"
				type="number"
        endAdornment={
          <InputAdornment position="end">
            <IconButton edge="end">
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
        labelWidth={70}
      />
    </FormControl>
  );
}

export default Search;
