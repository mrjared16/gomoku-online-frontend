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
		'& .MuiListItem-secondaryAction': {
			paddingRight: 16,
		},
	},
  name: {
    overflow: "hidden",
    "& h6": {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
});

function ListUserOnline({ list = [] }) {
	const classes = useStyles();

  return (
    <div className={classes.root}>
      <List>
        {list.map(
          ({ id, online = false, name = "", photo = "", time = "" }, index) => (
            <ListItem key={id} button>
              <ListItemAvatar>
								<AvatarCustom photo={photo} online={online} />
              </ListItemAvatar>
              <ListItemText>
                <div className={classes.name}>
                  <Typography variant="subtitle1">{name}</Typography>
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

export default ListUserOnline;
