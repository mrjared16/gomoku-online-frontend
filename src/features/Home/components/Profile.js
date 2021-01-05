import { ListItemIcon, ListItemSecondaryAction, ListItemText, makeStyles } from '@material-ui/core';
import AvatarCustom from 'components/AvatarCustom';
import RankCustom from 'components/RankCustom';
import React from 'react';
import { getTitleRank } from 'utils/rank';

const useStyles = makeStyles({
	containerRank: {
		position: 'unset',
		transform: 'none',
	},
})

function Profile({ userInfo = {} }) {
	const classes = useStyles();

	return (
		<>
			<ListItemIcon>
				<AvatarCustom photo={userInfo.photo} size="large" />
			</ListItemIcon>
			<ListItemText primary={userInfo.username} />
			<ListItemSecondaryAction className={classes.containerRank}>
				<RankCustom title={getTitleRank(userInfo.rank)} width={35} height={35} />
			</ListItemSecondaryAction>
		</>
	);
}

export default Profile;
