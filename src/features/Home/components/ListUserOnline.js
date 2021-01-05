import React from "react";
import {
	ListItem,
	ListItemAvatar,
	ListItemSecondaryAction,
	ListItemText,
	makeStyles,
	Typography,
} from "@material-ui/core";
import AvatarCustom from "components/AvatarCustom";

const useStyles = makeStyles((theme) => ({
	name: {
		overflow: "hidden",
		"& h6": {
			whiteSpace: "nowrap",
			overflow: "hidden",
			textOverflow: "ellipsis",
		},
	},
	userOnline: {
		paddingLeft: theme.spacing(4),
	},
}));

function ListUserOnline({ list = [] }) {
	const classes = useStyles();

	return (
		<>
			{list.map(({ id, online = false, name = "", photo = "", time = "", username = "" }, index) => (
				<ListItem key={id} button className={classes.userOnline}>
					<ListItemAvatar>
						<AvatarCustom photo={photo} online={online} />
					</ListItemAvatar>
					<ListItemText>
						<div className={classes.name}>
							<Typography variant="subtitle1">{username}</Typography>
						</div>
					</ListItemText>
					<ListItemSecondaryAction>
						<div className={classes.time}>
							<Typography className="text-grey" variant="subtitle2">
								{time}
							</Typography>
						</div>
					</ListItemSecondaryAction>
				</ListItem>
			))}
		</>
	);
}

export default ListUserOnline;
