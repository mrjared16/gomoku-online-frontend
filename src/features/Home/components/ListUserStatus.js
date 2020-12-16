import React, { useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Typography,
  withStyles,
} from "@material-ui/core";

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

const useStyles = makeStyles({
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
    <div>
      <List>
        {list.map(
          ({ id, online = false, fullName = "", photo = "", time = "" }, index) => (
            <ListItem key={id} button>
              <ListItemAvatar>
                {online ? (
                  <StyledBadge
                    overlap="circle"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    variant="dot"
                  >
                    <Avatar alt={fullName} src={photo} />
                  </StyledBadge>
                ) : (
                  <Avatar alt={fullName} src={photo} />
                )}
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
