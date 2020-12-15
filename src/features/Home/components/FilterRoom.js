import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import React from "react";

function FilterRoom(props) {
  return (
    <div style={{ marginRight: 25 }}>
      <FormControl variant="outlined">
        <Select value={10}>
          <MenuItem value={10}>Show room is available</MenuItem>
          <MenuItem value={20}>Show room is full</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default FilterRoom;
