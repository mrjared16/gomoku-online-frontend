import React, { useEffect, useState } from 'react';
import {
	Button,
	ListItem,
	ListItemAvatar,
	ListItemSecondaryAction,
	ListItemText,
	makeStyles,
	Typography,
} from '@material-ui/core';
import AvatarCustom from 'components/AvatarCustom';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	name: {
		overflow: 'hidden',
		'& h6': {
			whiteSpace: 'nowrap',
			overflow: 'hidden',
			textOverflow: 'ellipsis',
		},
	},
	userOnline: {
		paddingLeft: theme.spacing(4),
	},
	invite: {
		color: 'green',
	},
	invited: {
		color: 'red',
	},
}));

function ListUserOnline({ list = [], onClickUser = () => { } }) {
	const classes = useStyles();
	const [listInvited, setListInvited] = useState({});
	const { currentUserInfo } = useSelector((state) => state.user);

	useEffect(() => {
		const initialList = list.map(({ id }) => ({
			id,
			invited: false,
		}));

		setListInvited(initialList);
	}, []);

	const handleInvited = (index, value) => {
		listInvited[index] = {
			...listInvited[index],
			invited: !value,
		};
		setListInvited([...listInvited]);
	};

	return (
		<>
			{list.map(
				(
					{
						id,
						online = false,
						name = '',
						photo = '',
						time = '',
						username = '',
					},
					index
				) => (
					<ListItem
						key={id}
						button
						className={classes.userOnline}
						onClick={() => onClickUser(id)}
					>
						<ListItemAvatar>
							<AvatarCustom photo={photo} online={online} />
						</ListItemAvatar>
						<ListItemText>
							<div className={classes.name}>
								<Typography variant="subtitle1">{username}</Typography>
							</div>
						</ListItemText>
						{currentUserInfo?.id !== id && (
							<ListItemSecondaryAction>
								<Button
									className={
										listInvited[index]?.invited
											? classes.invited
											: classes.invite
									}
									size="small"
									onClick={() =>
										handleInvited(index, listInvited[index]?.invited)
									}
								>
									{listInvited[index]?.invited ? 'invited' : 'invite'}
								</Button>
							</ListItemSecondaryAction>
						)}
					</ListItem>
				)
			)}
		</>
	);
}

export default ListUserOnline;
