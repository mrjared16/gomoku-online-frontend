import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	makeStyles,
	Typography,
} from '@material-ui/core';
import AvatarCustom from 'components/AvatarCustom';
import React from 'react';
import RankCustom from 'components/RankCustom';
import { getTitleRank } from 'utils/rank';
import TypographyCustom from 'components/TypographyCustom';

const useStyles = makeStyles({
	root: {
		'& .MuiDialog-paper': {
			width: 300,
		},
	},
	container: {
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
	containerRank: {
		display: 'flex',
		alignItems: 'center',
		marginRight: 5,
	},
});

function ModalProfile({ open = false, toggle = () => { }, userInfo = {} }) {
	const classes = useStyles();

	return (
		<Dialog open={open} onClose={toggle} className={classes.root}>
			<DialogContent>
				<Box
					display="flex"
					flexDirection="column"
					alignItems="center"
					className={classes.container}
				>
					<AvatarCustom photo={userInfo.photo} size="extraLarge" />
					<TypographyCustom className={classes.name} text={userInfo.name} />
					<Box display="flex" flexDirection="column" width="100%" marginTop={3}>
						<Box display="flex">
							<Typography variant="subtitle2">Username:</Typography>
							<TypographyCustom text={userInfo.username}variant="subtitle2" />
						</Box>
						<Box display="flex" alignItems="center" marginTop={1}>
							<Typography variant="subtitle2">Rank:</Typography>
							<div className={classes.containerRank}>
								<RankCustom title={getTitleRank(userInfo.rank)} />
							</div>
							<span>{userInfo.rank}</span>
						</Box>
						<Box display="flex" marginTop={1}>
							<Typography variant="subtitle2">Win Rate:</Typography>
							<TypographyCustom text={userInfo.winRate == null ? '' : userInfo.winRate + '%'}variant="subtitle2" />
						</Box>
						<Box display="flex" marginTop={1}>
							<Typography variant="subtitle2">Number of win games:</Typography>
							<TypographyCustom text={userInfo.numberOfWonMatches}variant="subtitle2" />
						</Box>
						<Box display="flex" marginTop={1}>
							<Typography variant="subtitle2">Number of games:</Typography>
							<TypographyCustom text={userInfo.numberOfMatches}variant="subtitle2" />
						</Box>
						<Box display="flex" marginTop={1}>
							<Typography variant="subtitle2">Join date:</Typography>
							<TypographyCustom text="02/01/2020" variant="subtitle2" />
						</Box>
					</Box>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button
					variant="contained"
					color="secondary"
					onClick={toggle}
					size="small"
				>
					Close
        </Button>
			</DialogActions>
		</Dialog>
	);
}

export default ModalProfile;
