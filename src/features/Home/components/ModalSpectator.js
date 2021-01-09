import {
	Dialog,
	DialogActions,
	DialogContent,
	makeStyles,
	Button,
	Typography,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	DialogTitle,
	ListItemSecondaryAction,
	IconButton,
	Icon,
	Box,
} from '@material-ui/core';
import AvatarCustom from 'components/AvatarCustom';
import RankCustom from 'components/RankCustom';
import TypographyCustom from 'components/TypographyCustom';
import React from 'react';
import { useSelector } from 'react-redux';
import { getRankSymbol } from 'utils/rank';

const useStyles = makeStyles({
	root: {
		'& .MuiDialog-paper': {
			width: 300,
		},
	},
	name: {
		marginRight: 5,
	},
	rank: {
		marginRight: 10,
	}
});

function ModalSpectator({
	open = false,
	toggle = () => { },
	list = [],
	hostID = null,
	onClick = () => { },
}) {
	const classes = useStyles();
	const { currentUserInfo } = useSelector((state) => state.user);

	return (
		<Dialog open={open} onClose={toggle} className={classes.root}>
			<DialogTitle>Spectators</DialogTitle>
			<DialogContent>
				<List>
					{list &&
						list.map(({ id, online = false, name = '', photo = '', rank }, index) => (
							<ListItem key={id} button onClick={() => onClick(id)}>
								<ListItemAvatar>
									<AvatarCustom photo={photo} online={true} />
								</ListItemAvatar>
								<ListItemText>
									<Box display='flex' alignItems='center'>
										<div className={classes.name}>
											<TypographyCustom text={name} />
										</div>
										<RankCustom symbol={getRankSymbol(rank)} className={classes.rank} />
										{id === hostID && (
											<Icon
												className="fas fa-chess-king"
												style={{ color: 'yellow', fontSize: 20 }}
											/>
										)}
									</Box>
								</ListItemText>
								{currentUserInfo.id === hostID && id !== hostID && (
									<ListItemSecondaryAction>
										<IconButton>
											<Icon
												className="fas fa-times"
												style={{ color: 'red', fontSize: 20 }}
											/>
										</IconButton>
									</ListItemSecondaryAction>
								)}
							</ListItem>
						))}
				</List>
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

export default ModalSpectator;
