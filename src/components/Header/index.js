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
import { showToast } from "utils/showToast";

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
		"& #simple-tab-3": {
      color: "white",
    },
  },
}));

const tabs = [
  {
    label: "Home",
		url: "/",
		value: 0,
  },
  {
    label: "Overview",
		url: "/overview",
		value: 1,
  },
  {
    label: "History",
		url: "/history",
		value: 2,
	},
	{
    label: "Rank",
		url: "/rank",
		value: 3,
  },
];

function Header() {
  const classes = useStyles();

  const history = useHistory();
  const dispatch = useDispatch();
  const { token, currentUserInfo } = useSelector((state) => state.user);
  const { name } = currentUserInfo;
  const [value, setValue] = useState(0);
  const location = useLocation();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const newUrl = tabs[newValue].url;
    history.push(newUrl);
  };

  const handleLogout = () => {
    dispatch(removeToken());
		history.push("/login");
		showToast("success", "Logout successful")
  };

  useEffect(() => {
    const path = location.pathname;

    switch (path) {
      case "/":
        setValue(0);
        return;
      case "/overview":
        setValue(1);
        return;
      case "/history":
        setValue(2);
				return;
			case "/rank":
				setValue(3);
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
          {/* <Tab label={<Logo />} {...a11yProps(0)} />
          {!token && <Tab label="Login" {...a11yProps(1)} />}
          {!token && <Tab label="Register" {...a11yProps(2)} />} */}
					{tabs.map(({label, value}) => (
						<Tab label={label} {...a11yProps(value)}/>
					))}
        </Tabs>

        {token && (
          <div style={{ display: "flex" }}>
            <UserInfo fullName={name} />
            <UserDropdown onLogout={handleLogout} />
          </div>
        )}
      </AppBar>
    </div>
  );
}

export default Header;
