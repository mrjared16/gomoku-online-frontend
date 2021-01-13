import {
	Box,
	FormControl,
	Icon,
	IconButton,
	InputAdornment,
	makeStyles,
	OutlinedInput,
	Popover,
	Typography,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import moment from 'moment';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css'
const useStyles = makeStyles({
	root: {
		height: 550,
		border: '4px solid #ff7b54',
		borderRadius: 5,
		width: 350,
		marginRight: 30,
		display: 'flex',
		flexDirection: 'column',
	},
	containerTitle: {
		backgroundColor: '#ff7b54',
		padding: 5,
	},
	title: {
		// color: 'white',
	},
	body: {
		flex: 1,
		padding: 10,
		overflow: 'auto',
	},
	footer: {
		minHeight: 40,
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 10,
	},
	username: {
		fontWeight: 'bold',
		fontSize: '0.875rem',
		maxWidth: 100,
		overflow: 'hidden',
		whiteSpace: "nowrap",
		textOverflow: "ellipsis",
	},
	content: {
		marginLeft: 5,
		fontSize: '0.875rem',
		wordBreak: 'break-all',
		maxWidth: 210,
	},
	time: {
		marginLeft: 5,
		fontSize: '0.875rem',
	},
	highlight: {
		color: '#ffb26b',
	}
});

const initialValues = {
	content: '',
};

const validationMessageSchema = Yup.object().shape({
	content: Yup.string().trim().required(),
});

function Chat({ list = [], onSubmit = () => { } }) {
	const classes = useStyles();
	const { isWatchingHistory } = useSelector((state) => state.history);
	const { currentUserInfo } = useSelector(state => state.user);
	const [showEmoji, setShowEmoji] = useState(null);

	const isHighLight = (sender) => {
		let result = false;
		if (!currentUserInfo) return result;
		const { id } = currentUserInfo;
		if (sender?.id === id) {
			result = true;
		}
		return result;
	}

	const renderMessage = (message) => {
		const { user, content, createdAt } = message;
		const { username } = user;
		return (
			<Box display="flex" marginBottom={1}>
				<span className={`${classes.username} ${isHighLight(user) && classes.highlight}`}>{username}</span>
				<span className={classes.time}>{`[${moment(createdAt).format(
					'HH:mm:ss'
				)}]:`}</span>
				<span className={classes.content}>{content}</span>
			</Box>
		);
	};

	const handleClickEmoji = (event) => {
		setShowEmoji(event.currentTarget);
	};

	const handleCloseEmoji = () => {
		setShowEmoji(null);
	};

	return (
		<div className={classes.root}>
			<Box
				display="flex"
				justifyContent="center"
				className={classes.containerTitle}
			>
				<Typography variant="subtitle1" className={classes.title}>
					Chat
        </Typography>
			</Box>
			<div className={classes.body}>
				{list.map((message) => renderMessage(message))}
			</div>
			{!isWatchingHistory && (
				<div className={classes.footer} id="input-message">
					<Formik
						initialValues={initialValues}
						validationSchema={validationMessageSchema}
						onSubmit={onSubmit}
					>
						{({ values, handleSubmit, handleChange, handleBlur, setFieldValue }) => {
							const handleSelectEmoji = (emoji) => {
								setFieldValue(
									"content",
									values.content + emoji.native
								);
							};

							return (
								<Form>
									<FormControl variant="outlined" size="small" fullWidth>
										<OutlinedInput
											value={values.content}
											onChange={handleChange}
											name="content"
											placeholder="Aaa..."
											autoComplete="off"
											multiline
											onKeyDown={(event) => {
												if (event.key === 'Enter' && !event.shiftKey) {
													const inputMessage = document.getElementById(
														'input-message'
													);
													inputMessage.getElementsByTagName(
														'textarea'
													)[0].style.height = 'auto';
													handleSubmit(values);
													event.preventDefault();
												}
											}}
											endAdornment={
												<InputAdornment position="end">
													<IconButton onClick={handleSubmit} edge="end">
														<Icon
															className="fas fa-paper-plane"
															style={{ color: '#939b62' }}
														/>
													</IconButton>
												</InputAdornment>
											}
											startAdornment={
												<InputAdornment position="start">
													<IconButton onClick={handleClickEmoji} edge="start">
														<Icon
															className="fas fa-smile"
															style={{ color: '#939b62' }}
														/>
													</IconButton>
													<Popover
														open={Boolean(showEmoji)}
														anchorEl={showEmoji}
														anchorOrigin={{
															vertical: "top",
															horizontal: "center",
														}}
														transformOrigin={{
															vertical: "bottom",
															horizontal: "center",
														}}
														onClose={handleCloseEmoji}
													>
														<Picker
															set="twitter"
															title="Pick your emoji"
															emoji="point_up"
															onSelect={handleSelectEmoji}
														/>
													</Popover>
												</InputAdornment>
											}
										/>
									</FormControl>
								</Form>
							)
						}}
					</Formik>
				</div>
			)}
		</div>
	);
}

export default Chat;
