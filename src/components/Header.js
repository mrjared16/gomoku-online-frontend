import {
  AppBar,
  IconButton,
  makeStyles,
  Tab,
  Tabs,
} from "@material-ui/core";
// import { removeToken } from "app/userSlice";
import React from "react";
// import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
// import { resetBoard } from "features/Board/boardSlice";
import { useState } from "react";
import { useEffect } from "react";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    // "& .MuiAppBar-positionStatic": {
		// 	backgroundColor: "white",
		// },
		"& .MuiTabs-indicator": {
			backgroundColor: "white",
		},
    "& #simple-tab-0": {
      color: "white",
    },
    "& #simple-tab-1": {
      color: "white",
		},
		"& #simple-tab-2": {
      color: "white",
		},
  },
}));

const tabs = [
  {
    label: "Home",
    url: "/",
  },
  {
    label: "Login",
    url: "/login",
	},
	{
    label: "Register",
    url: "/register",
  },
];

function Header() {
  const classes = useStyles();

  const history = useHistory();
  // const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const location = useLocation();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const newUrl = tabs[newValue].url;
    history.push(newUrl);
  };

  // const handleLogoutClick = () => {
  //   dispatch(removeToken());
  //   dispatch(resetBoard());
  //   history.push("/login");
  // };

  useEffect(() => {
		const path = location.pathname;
		
		switch(path) {
			case "/":
				setValue(0);
				return;
			case "/login":
				setValue(1);
				return;
			case "/register":
				setValue(2);
				return;
			default:
				setValue(0);
		}
  }, [location]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
					<Tab label="Home" {...a11yProps(0)} />
					<Tab label="Login" {...a11yProps(1)} />
					<Tab label="Register" {...a11yProps(2)} />
        </Tabs>
        {/* <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          // onClick={handleLogoutClick}
          color="inherit"
        >
          <PowerSettingsNewIcon />
        </IconButton> */}
      </AppBar>
    </div>
  );
}

export default Header;