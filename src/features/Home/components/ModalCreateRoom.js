import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	InputLabel,
	makeStyles,
	MenuItem,
	Select,
	Switch,
	Button,
	TextField,
} from '@material-ui/core';
import React, { useState } from 'react';

const useStyles = makeStyles({
	root: {
		'& .MuiDialog-paper': {
			width: 400,
		},
	},
	switchContainer: {
		display: 'flex',
		alignItems: 'center',
		marginBottom: 15,
	},
	sizeBoard: {
		marginBottom: 20,
	},
	timer: {
		marginBottom: 20,
	},
});

function ModalCreateRoom({
	open = false,
	toggle = () => { },
	onSubmit = () => { },
}) {
	const classes = useStyles();
	const [isPrivate, setIsPrivate] = useState(false);
	const [sizeBoard, setSizeBoard] = useState(20);
	const [timer, setTimer] = useState(60);

	const handleChangePrivateSwitch = () => {
		setIsPrivate(!isPrivate);
	};

	const handleChangeSizeBoard = (event) => {
		setSizeBoard(event.target.value);
	};

	const handleChangeTimer = (event) => {
		setTimer(event.target.value);
	};

	const handleSubmit = () => {
		onSubmit();
		toggle();
	};

	return (
		<Dialog open={open} onClose={toggle} className={classes.root}>
			<DialogTitle>CREATE ROOM</DialogTitle>
			<DialogContent>
				<div className={classes.switchContainer}>
					<Switch
						checked={isPrivate}
						onChange={handleChangePrivateSwitch}
						color="primary"
					/>
					{isPrivate ? 'Private room' : 'Public room'}
				</div>
				<FormControl
					variant="outlined"
					fullWidth
					className={classes.sizeBoard}
					size="small"
				>
					<InputLabel>Select size board</InputLabel>
					<Select
						value={sizeBoard}
						onChange={handleChangeSizeBoard}
						label="Select size board"
					>
						<MenuItem value={20}>20x20</MenuItem>
						{/* <MenuItem value={30}>30x30</MenuItem>
						<MenuItem value={40}>40x40</MenuItem>
						<MenuItem value={50}>50x50</MenuItem> */}
					</Select>
				</FormControl>
				<FormControl variant="outlined" fullWidth size="small" className={classes.timer}>
					<InputLabel>Select timer</InputLabel>
					<Select
						value={timer}
						onChange={handleChangeTimer}
						label="Select timer"
					>
						<MenuItem value={60}>1:00</MenuItem>
						{/* <MenuItem value={90}>1:30</MenuItem>
						<MenuItem value={120}>2:00</MenuItem>
						<MenuItem value={150}>2:30</MenuItem> */}
					</Select>
				</FormControl>
				{isPrivate && (
					<TextField
						name="password"
						label="Password"
						variant="outlined"
						type="password"
						// value={values.password}
						// onChange={handleChange}
						// onBlur={handleBlur}
						// error={Boolean(errors.password) && touched.password}
						// helperText={touched.password && errors.password}
						size="small"
						fullWidth
					/>
				)}
			</DialogContent>
			<DialogActions>
				<Button
					variant="contained"
					color="primary"
					onClick={handleSubmit}
					size="small"
				>
					Create
        </Button>
				<Button
					variant="contained"
					color="secondary"
					onClick={toggle}
					size="small"
				>
					Cancel
        </Button>
			</DialogActions>
		</Dialog>
	);
}

export default ModalCreateRoom;
