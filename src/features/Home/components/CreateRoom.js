import { Button } from "@material-ui/core";
import React from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";

function CreateRoom({ onSubmit = () => {} }) {
  return (
    <div>
      <Button
        color="primary"
        size="large"
				startIcon={<AddCircleIcon fontSize="large" />}
				onClick={onSubmit}
      >
        Create room
      </Button>
    </div>
  );
}

export default CreateRoom;
