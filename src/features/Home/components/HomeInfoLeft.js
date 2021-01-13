import React, { useEffect, useState } from 'react';
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
import ModalUserInfo from './ModalUserInfo';
import ListUserOnline from './ListUserOnline';
import Loading from 'components/Loading';
import { userDTOToProp } from 'utils/mapResponseToProp';
import userApi from 'api/userApi';

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

function HomeInfoLeft({ onlineUsers = [] }) {
	const classes = useStyles();
	const [openUserOnline, setOpenUserOnline] = React.useState(true);
	const [openModalUserInfo, setOpenModalUserInfo] = useState(false);
	const [userInfoState, setUserInfoState] = useState(null);
	const [loadingUserInfo, setLoadingUserInfo] = useState(true);
	const { loadingProfile, currentUserInfo } = useSelector(state => state.user);
	const profileData = userDTOToProp(currentUserInfo);

	const handleClickDropDownUserOnline = () => {
		setOpenUserOnline(!openUserOnline);
	};

	const handleClickProfile = () => {
		if (loadingProfile) return;
		setLoadingUserInfo(false);
		setOpenModalUserInfo(true);
		setUserInfoState(profileData);
	};

	const handleClickUser = (id) => {
		setUserInfoState(null);
		setLoadingUserInfo(true);
		setOpenModalUserInfo(true);
		userApi.getUserInfoByID(id).then((response) => {
			const userInfoData = userDTOToProp(response.user);
			setUserInfoState(userInfoData);
			setLoadingUserInfo(false);
		})
	}

	return (
		<>
			<List
				component="nav"
				aria-labelledby="user-online-list-subheader"
				className={classes.root}
			>
				<ListItem button onClick={handleClickProfile}>
					{loadingProfile ? (
						<Loading />
					) : (
							<Profile dataProp={profileData} />
						)}
				</ListItem>
				<ListItem button onClick={handleClickDropDownUserOnline} className={classes.userOnlineDropdown}>
					<ListItemIcon>
						<Icon className="fas fa-users" style={{ fontSize: 18 }} />
					</ListItemIcon>
					<ListItemText primary={`Users Online (${onlineUsers.length})`} />
					{openUserOnline ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={openUserOnline} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListUserOnline list={onlineUsers} onClickUser={handleClickUser} />
					</List>
				</Collapse>
			</List>
			<ModalUserInfo open={openModalUserInfo} toggle={() => setOpenModalUserInfo(!openModalUserInfo)} userInfo={userInfoState} loading={loadingUserInfo} />
		</>
	);
}

export default HomeInfoLeft;
