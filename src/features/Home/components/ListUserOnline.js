import React, { useEffect, useState } from 'react';
import {
	Box,
	Icon,
	IconButton,
	ListItem,
	ListItemAvatar,
	ListItemSecondaryAction,
	ListItemText,
	makeStyles,
	Typography,
} from '@material-ui/core';
import AvatarCustom from 'components/AvatarCustom';
import { useSelector } from 'react-redux';
import RankCustom from 'components/RankCustom';
import { getRankSymbol } from 'utils/rank';

const useStyles = makeStyles((theme) => ({
	name: {
		marginLeft: 5,
		overflow: 'hidden',
		maxWidth: 'calc(100% - 30px)',
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
	inviteContainer: {
		right: 5,
		'& .MuiIcon-root': {
			width: 'fit-content',
			fontSize: 15,
		},
	}
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
						rank = 1000,
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
							<Box display='flex' alignItems='center'>
								<RankCustom symbol={getRankSymbol(rank)} />
								<div className={classes.name}>
									<Typography variant="subtitle1">{username}</Typography>
								</div>
							</Box>
						</ListItemText>
						{currentUserInfo && currentUserInfo.id !== id && (
							<ListItemSecondaryAction className={classes.inviteContainer}>
								<IconButton className={
									listInvited[index]?.invited
										? classes.invited
										: classes.invite
								} onClick={() =>
									handleInvited(index, listInvited[index]?.invited)
								}>
									<Icon className={listInvited[index]?.invited ? 'fas fa-user-check' : 'fas fa-user-plus'} />
								</IconButton>
							</ListItemSecondaryAction>
						)}
					</ListItem>
				)
			)}
		</>
	);
}

export default ListUserOnline;
