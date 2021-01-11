import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	makeStyles,
	Button,
	TextField,
} from '@material-ui/core';
import { setPasswordRoom } from 'app/roomSlice';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenModalInputPassword } from 'app/roomSlice';
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
}) {
	const classes = useStyles();
	const [password, setPassword] = useState(null);
	const dispatch = useDispatch();
	const { openModalInputPassword, currentRoomID } = useSelector(state => state.room); 
	const history = useHistory();

	const toggleModalInputPassword = () => {
		dispatch(setOpenModalInputPassword(!openModalInputPassword));
	}

	const handleChange = (event) => {
		setPassword(event.target.value);
	}

	const handleSubmit = () => {
		if (!password) {
			showToast('error', 'Password is required');
			return;
		};
		dispatch(setPasswordRoom(password));
		toggleModalInputPassword();
		history.push(`/rooms/${currentRoomID}`);
	};

	const handleCancel = () => {
		toggleModalInputPassword();
		history.push('/');
	}

	return (
		<Dialog open={open} onClose={toggleModalInputPassword} className={classes.root}>
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
