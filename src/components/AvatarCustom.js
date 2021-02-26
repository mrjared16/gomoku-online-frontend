import { Avatar, Badge, makeStyles, withStyles } from '@material-ui/core';
import React from 'react';

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700 !important',
    // boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    boxShadow: `0 0 0 2px var(--color-background)`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  large: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  extraLarge: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

function AvatarCustom({ online = false, photo = '', size = 'small' }) {
  const classes = useStyles();

  return (
    <>
      {online ? (
        <StyledBadge
          overlap="circle"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          variant="dot"
        >
          <Avatar alt="avatar" src={photo} className={classes[size]} />
        </StyledBadge>
      ) : (
        <Avatar alt="avatar" src={photo} className={classes[size]} />
      )}
    </>
  );
}

export default AvatarCustom;
