import { AppBar, makeStyles, Tab, Tabs } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Logo from "components/Header/components/Logo";
import UserInfo from "components/Header/components/UserInfo";
import Dropdown from "components/Header/components/Dropdown";
import { removeToken } from "app/userSlice";
import { showToast } from "utils/showToast";
import { setRoomID } from 'app/roomSlice';

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
		"& #simple-tab-4": {
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
		label: "History",
		url: "/history",
		value: 1,
	},
	{
		label: "Rank",
		url: "/rank",
		value: 2,
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
	const { currentRoomID } = useSelector((state) => state.room);
	const [currentTabs, setCurrentTabs] = useState(tabs);

	const handleChange = (event, newValue) => {
		setValue(newValue);
		const newUrl = currentTabs[newValue].url;
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
			case "/history":
				setValue(1);
				return;
			case "/rank":
				setValue(2);
				return;
			case "":
			default:
				setValue(0);
		}

		if (path.match(/rooms/)) {
			const id = path.split('/').pop();
			dispatch(setRoomID(id));
			setValue(3);
		}
	}, [location]);

	useEffect(() => {
		if (currentRoomID) {
			setCurrentTabs([
				...tabs,
				{
					label: "Game",
					url: `/rooms/${currentRoomID}`,
					value: 3,
				},
			])
		} else {
			const newCurrentTabs = currentTabs.filter(tab => tab.label !== 'Game');
			setCurrentTabs(newCurrentTabs);
		}
	}, [currentRoomID])

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label="simple tabs example"
				>
					{currentTabs.map(({ label, value }, index) => {
						if (value === 0) {
							return <Tab key={index} label={<Logo />} {...a11yProps(value)} />
						} else {
							return <Tab key={index} label={label} {...a11yProps(value)} />
						}
					})}
				</Tabs>

				{token && (
					<div style={{ display: "flex" }}>
						{/* <UserInfo fullName={name} /> */}
						<Dropdown onLogout={handleLogout} />
					</div>
				)}
			</AppBar>
		</div>
	);
}

export default Header;
