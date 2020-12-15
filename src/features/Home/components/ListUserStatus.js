import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import AvatarCustom from "components/AvatarCustom";

const useStyles = makeStyles({
	root: {
		padding: "20px 0px",
	},
  fullName: {
    overflow: "hidden",
    "& h6": {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
});

function ListUserStatus({ list = [] }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List>
        {list.map(
          ({ online = false, fullName = "", photo = "", time = "" }, index) => (
            <ListItem key={index} button>
              <ListItemAvatar>
                <AvatarCustom online={online} photo={photo} />
              </ListItemAvatar>
              <ListItemText>
                <div className={classes.fullName}>
                  <Typography variant="subtitle1">{fullName}</Typography>
                </div>
              </ListItemText>
              <ListItemSecondaryAction>
                <div className={classes.time}>
                  <Typography className="text-grey" variant="subtitle2">
                    {time}
                  </Typography>
                </div>
              </ListItemSecondaryAction>
            </ListItem>
          )
        )}
      </List>
    </div>
  );
}

export default ListUserStatus;
