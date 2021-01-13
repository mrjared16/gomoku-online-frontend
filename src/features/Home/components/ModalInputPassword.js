import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	makeStyles,
	Button,
	TextField,
} from '@material-ui/core';
import { removeRoomID, setPasswordRoom } from 'app/roomSlice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { showToast } from 'utils/showToast';

const useStyles = makeStyles({
	root: {
		'& .MuiDialog-paper': {
			width: 400,
		},
	},
});

function ModalInputPassword({
	open = false,
	toggle = () => {},
	onSubmit = () => {},
}) {
	const classes = useStyles();
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();
	const history = useHistory();

	const handleChange = (event) => {
		setPassword(event.target.value);
	}

	const handleSubmit = () => {
		if (!password) {
			showToast('error', 'Password is required');
			return;
		};
		onSubmit(password);
	};

	const handleCancel = () => {
		toggle();
		dispatch(removeRoomID());
		history.push('/');
	}

	return (
		<Dialog open={open} onClose={toggle} className={classes.root}>
			<DialogTitle>Enter Room Password</DialogTitle>
			<DialogContent>
					<TextField
						name="password"
						label="Password"
						variant="outlined"
						type="password"
						value={password}
						onChange={handleChange}
						size="small"
						fullWidth
						onKeyDown={(event) => {
							if (event.key === 'Enter') {
								handleSubmit();
								event.preventDefault();
							}
						}}
					/>
			</DialogContent>
			<DialogActions>
				<Button
					variant="contained"
					color="primary"
					onClick={handleSubmit}
					size="small"
				>
					Join
        </Button>
				<Button
					variant="contained"
					color="secondary"
					onClick={handleCancel}
					size="small"
				>
					Cancel
        </Button>
			</DialogActions>
		</Dialog>
	);
}

export default ModalInputPassword;
