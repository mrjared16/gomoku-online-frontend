import { AppBar, makeStyles, Tab, Tabs } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Logo from "components/Header/components/Logo";
import UserInfo from "components/Header/components/UserInfo";
import UserDropdown from "components/Header/components/UserDropdown";
import { removeToken } from "app/userSlice";
import { setNotification } from "app/notificationSlice";

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
    "& .MuiToolbar-root": {
      display: "flex",
      justifyContent: "space-between",
    },
    "& .MuiAppBar-positionStatic": {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
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
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);

  const [value, setValue] = useState(0);
  const location = useLocation();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const newUrl = tabs[newValue].url;
    history.push(newUrl);
  };

  const handleLogout = () => {
		dispatch(removeToken());
		dispatch(setNotification({
			type: "success",
			message: "Logout successful",
		}))
    history.push("/");
  };

  useEffect(() => {
    const path = location.pathname;

    switch (path) {
      case "/":
        setValue(0);
        return;
      case "/login":
        if (!token) setValue(1);
        return;
      case "/register":
        if (!token) setValue(2);
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
          <Tab label={<Logo />} {...a11yProps(0)} />
          {!token && <Tab label="Login" {...a11yProps(1)} />}
          {!token && <Tab label="Register" {...a11yProps(2)} />}
        </Tabs>

        {token && (
          <div style={{ display: "flex" }}>
            <UserInfo />
            <UserDropdown onLogout={handleLogout} />
          </div>
        )}
      </AppBar>
    </div>
  );
}

export default Header;