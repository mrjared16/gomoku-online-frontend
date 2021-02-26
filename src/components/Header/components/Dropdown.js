import {
  Icon,
  IconButton,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
  withStyles,
} from '@material-ui/core';
import React from 'react';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:hover': {
      // backgroundColor: theme.palette.primary.main,
      backgroundColor: 'var(--color-table-row-hover)',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        // color: theme.palette.common.white,
        color: 'var(--color-text)',
      },
    },
  },
}))(MenuItem);

const useStyles = makeStyles({
  root: {
    '& .MuiPaper-root': {
      width: 172,
      backgroundColor: 'var(--color-background-modal)',
      border: '1px solid var(--color-background-modal)',
    },
    '& span': {
      color: 'var(--color-text)',
    },
  },
});

function Dropdown({
  onLogout = () => {},
  onSwitchTheme = () => {},
  darkMode = false,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-controls="customized-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ marginLeft: 10 }}
      >
        <ArrowDropDownCircleIcon />
      </IconButton>

      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.root}
      >
        <StyledMenuItem onClick={onSwitchTheme}>
          {darkMode ? (
            <>
              <ListItemIcon>
                <Icon className="fas fa-sun" fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Light Mode" />{' '}
            </>
          ) : (
            <>
              <ListItemIcon>
                <Icon className="fas fa-moon" fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Dark Mode" />{' '}
            </>
          )}
        </StyledMenuItem>
        <StyledMenuItem onClick={onLogout}>
          <ListItemIcon>
            <ExitToAppIcon
              fontSize="small"
              style={{ color: 'var(--color-text)' }}
            />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </StyledMenuItem>
      </StyledMenu>
    </>
  );
}

export default Dropdown;
