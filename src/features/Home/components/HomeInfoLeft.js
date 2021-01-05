import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Profile from './Profile';
import { Icon } from '@material-ui/core';
import { useSelector } from 'react-redux';
import ModalProfile from './ModalProfile';
import ListUserOnline from './ListUserOnline';
import Loading from 'components/Loading';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
		'& .MuiIcon-root': {
			width: 'fit-content',
		},
		"& span": {
			whiteSpace: "nowrap",
			overflow: "hidden",
			textOverflow: "ellipsis",
		},
	},
	userOnlineDropdown: {
		'& .MuiTypography-body1': {
			fontSize: '0.875rem',
		},
	},
}));

function HomeInfoLeft({ userInfo = {}, onlineUsers = [] }) {
	const classes = useStyles();
	const [openUserOnline, setOpenUserOnline] = React.useState(true);
	const { loadingUserInfo } = useSelector((state) => state.user);
	const [openModalProfile, setOpenModalProfile] = useState(false);

	const handleClickUserOnline = () => {
		setOpenUserOnline(!openUserOnline);
	};

	const toggleModalProfile = () => {
		if (loadingUserInfo) return;
		setOpenModalProfile(!openModalProfile);
	};

	return (
		<>
			<List
				component="nav"
				aria-labelledby="user-online-list-subheader"
				className={classes.root}
			>
				<ListItem button onClick={toggleModalProfile}>
					{loadingUserInfo ? (
						<Loading />
					) : (
							<Profile userInfo={userInfo} />
						)}
				</ListItem>
				<ListItem button onClick={handleClickUserOnline} className={classes.userOnlineDropdown}>
					<ListItemIcon>
						<Icon className="fas fa-users" style={{ fontSize: 18 }} />
					</ListItemIcon>
					<ListItemText primary="Users Online" />
					{openUserOnline ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={openUserOnline} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListUserOnline list={onlineUsers} />
					</List>
				</Collapse>
			</List>
			{!loadingUserInfo && <ModalProfile open={openModalProfile} toggle={toggleModalProfile} userInfo={userInfo} />}
		</>
	);
}

export default HomeInfoLeft;
