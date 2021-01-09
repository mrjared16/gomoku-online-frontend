import { ListItemIcon, ListItemSecondaryAction, ListItemText, makeStyles } from '@material-ui/core';
import AvatarCustom from 'components/AvatarCustom';
import RankCustom from 'components/RankCustom';
import React from 'react';
import { getRankSymbol } from 'utils/rank';

const useStyles = makeStyles({
	containerRank: {
		position: 'unset',
		transform: 'none',
	},
})

function Profile({ dataProp = {} }) {
	const classes = useStyles();

	return (
		<>
			<ListItemIcon>
				<AvatarCustom photo={dataProp?.photo} size="large" />
			</ListItemIcon>
			<ListItemText primary={dataProp?.username} />
			<ListItemSecondaryAction className={classes.containerRank}>
				<RankCustom symbol={getRankSymbol(dataProp?.rank)} width={35} height={35} />
			</ListItemSecondaryAction>
		</>
	);
}

export default Profile;
