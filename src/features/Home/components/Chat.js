import {
	Box, FormControl, Icon, IconButton, InputAdornment, makeStyles, OutlinedInput, Typography
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';

const useStyles = makeStyles({
	root: {
		height: 550,
		border: '4px solid #ff7b54',
		borderRadius: 5,
		width: 300,
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
		height: 50,
		padding: '10px 10px 0px 10px',
	},
	username: {
		fontWeight: 'bold',
	},
	text: {
		marginLeft: 5,
	}
})

const initialValues = {
	text: '',
};

const validationMessageSchema = Yup.object().shape({
	text: Yup.string().trim().required(),
});

function Chat({ list = [], onSubmit = () => {} }) {
	const classes = useStyles();
	const { isWatchingHistory } = useSelector(state => state.history);

	const renderMessage = (message) => {
		const { username, text } = message;
		return (
			<Box display='flex' alignItems='center' marginBottom={1}>
				<span className={classes.username}>{`${username}:`}</span>
				<span className={classes.text}>{text}</span>
			</Box>
		)
	}

	return (
		<div className={classes.root}>
			<Box display="flex" justifyContent="center" className={classes.containerTitle} >
				<Typography variant="subtitle1" className={classes.title}>Chat</Typography>
			</Box>
			<div className={classes.body}>
				{list.map(message => renderMessage(message))}
			</div>
			<div className={classes.footer}>
				<Formik initialValues={initialValues} validationSchema={validationMessageSchema} onSubmit={onSubmit}>
					{({ values, handleSubmit, handleChange, handleBlur }) => (
						<Form>
							<FormControl variant="outlined" size="small">
								<OutlinedInput
									value={values.text}
									onChange={handleChange}
									name="text"
									placeholder="Aaa..."
									autoComplete="off"
									disabled={isWatchingHistory}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												onClick={handleSubmit}
												edge="end"
												disabled={isWatchingHistory}
											>
												<Icon className="fas fa-paper-plane" style={{color: '#939b62'}} />
                			</IconButton>
										</InputAdornment>
									}
								/>
							</FormControl>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}

export default Chat;