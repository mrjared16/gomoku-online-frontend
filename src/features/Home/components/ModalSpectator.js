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
} from '@material-ui/core';
import AvatarCustom from 'components/AvatarCustom';
import React from 'react';

const useStyles = makeStyles({
	root: {
		'& .MuiDialog-paper': {
			width: 250,
		},
	},
});

function ModalSpectator({
	open = false,
	toggle = () => { },
	list = [],
}) {
	const classes = useStyles();

	return (
		<Dialog open={open} onClose={toggle} className={classes.root}>
			<DialogTitle>Spectators</DialogTitle>
			<DialogContent>
				<List>
					{list && list.map(
						({ id, online = false, name = "", photo = "" }, index) => (
							<ListItem key={id} button>
								<ListItemAvatar>
									<AvatarCustom photo={photo} online={true} />
								</ListItemAvatar>
								<ListItemText>
									<div className={classes.name}>
										<Typography variant="subtitle1">{name}</Typography>
									</div>
								</ListItemText>
							</ListItem>
						)
					)}
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
