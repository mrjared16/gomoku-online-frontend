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
} from '@material-ui/core';
import AvatarCustom from 'components/AvatarCustom';
import React from 'react';

const useStyles = makeStyles({
	root: {
		'& .MuiDialog-paper': {
			width: 300,
		},
	},
	name: {
		display: 'flex',
		'& span': {
			marginLeft: 10,
		},
	},
});

function ModalSpectator({
	open = false,
	toggle = () => { },
	list = [],
	hostID = null,
}) {
	const classes = useStyles();

	return (
		<Dialog open={open} onClose={toggle} className={classes.root}>
			<DialogTitle>Spectators</DialogTitle>
			<DialogContent>
				<List>
					{list &&
						list.map(({ id, online = false, name = '', photo = '' }, index) => (
							<ListItem key={id} button>
								<ListItemAvatar>
									<AvatarCustom photo={photo} online={true} />
								</ListItemAvatar>
								<ListItemText>
									<div className={classes.name}>
										<Typography variant="subtitle1">{name}</Typography>
										{id === hostID && (
											<Icon
												className="fas fa-chess-king"
												style={{ color: 'yellow', fontSize: 20 }}
											/>
										)}
									</div>
								</ListItemText>
								{id !== hostID && (
									<ListItemSecondaryAction>
										<IconButton>
											<Icon
												className="fas fa-times-circle"
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
					color="primary"
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
