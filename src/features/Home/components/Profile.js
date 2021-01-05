import { Box, makeStyles, Typography } from '@material-ui/core';
import AvatarCustom from 'components/AvatarCustom';
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSelector } from 'react-redux';
import RankCustom from 'components/RankCustom';
import { getTitleRank } from 'utils/rank';

const useStyles = makeStyles({
	root: {
		height: '100%',
		'& h6': {
			fontWeight: 'normal',
			marginRight: 10,
		},
		'& .MuiIcon-root': {
			width: 'fit-content',
		},
	},
	name: {
		marginTop: 10,
	},
	loading: {
		height: '100%',
	},
	containerRank: {
		display: 'flex',
		alignItems: 'center',
		height: 25,
		width: 30,
		marginRight: 5,
	},
});

function Profile({ userInfo = {} }) {
	const classes = useStyles();
	const { loadingUserInfo } = useSelector(state => state.user);

	return (
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			className={classes.root}
		>
			{loadingUserInfo ? (
				<Box display="flex" justifyContent="center" alignItems="center" className={classes.loading}>
					<CircularProgress color="secondary" size={30} />
				</Box>
			) : (
					<>
						<AvatarCustom photo={userInfo.photo} size="extraLarge" />
						<Typography className={classes.name}>{userInfo.name}</Typography>
						<Box display="flex" flexDirection="column" width="100%" marginTop={3}>
							<Box display="flex">
								<Typography variant="subtitle2">Username:</Typography>
								<Typography variant="subtitle2">
									{userInfo.username}
								</Typography>
							</Box>
							<Box display="flex" alignItems="center" marginTop={1}>
								<Typography variant="subtitle2">Rank:</Typography>
								{/* {formatRank(userInfo.rank)} */}
								<div className={classes.containerRank}>
									<RankCustom title={getTitleRank(userInfo.rank)} />
								</div>
								<span>{userInfo.rank}</span>
							</Box>
							<Box display="flex" marginTop={1}>
								<Typography variant="subtitle2">Win Rate:</Typography>
								<Typography variant="subtitle2">
									{userInfo.winRate == null ? '' : userInfo.winRate + '%'}
              </Typography>
							</Box>
							<Box display="flex" marginTop={1}>
								<Typography variant="subtitle2">Number of win games:</Typography>
								<Typography variant="subtitle2">
									{userInfo.numberOfWonMatches}
								</Typography>
							</Box>
							<Box display="flex" marginTop={1}>
								<Typography variant="subtitle2">Number of games:</Typography>
								<Typography variant="subtitle2">
									{userInfo.numberOfMatches}
								</Typography>
							</Box>
							<Box display="flex" marginTop={1}>
								<Typography variant="subtitle2">Join date:</Typography>
								<Typography variant="subtitle2">
									02/01/2020
              </Typography>
							</Box>
						</Box>
					</>
				)}
		</Box>
	);
}

export default Profile;
