import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import TableCustom from 'components/TableCustom';
import RankCustom from 'components/RankCustom';
import { getTitleRank } from 'utils/rank';
import TypographyCustom from 'components/TypographyCustom';
import moment from 'moment';
import { range } from 'lodash';
import { useDispatch } from 'react-redux';
import { setRoomID } from 'app/roomSlice';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	root: {},
	table: {
		height: 'calc(100vh - 98px)',
		padding: '25px 25px',
	},
	containerRank: {
		marginRight: 10,
	},
	win: {
		color: 'green',
	},
	lose: {
		color: 'red',
	},
}));

function History() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();

	const renderUsernameColumn = (username, rank) => {
		const title = getTitleRank(rank);

		return (
			<>
				<div className={classes.containerRank}>
					<RankCustom title={title} />
				</div>
				<TypographyCustom text={username} />
			</>
		);
	};

	const renderResult = (res) => {
		if (res === 'Win') {
			return <span className={classes.win}>{res}</span>;
		}
		if (res === 'Lose') {
			return <span className={classes.lose}>{res}</span>;
		}
	};

	const renderElo = (newRank, oldRank) => {
		if (newRank > oldRank) {
			return (
				<span className={classes.win}>{`${newRank} (+${newRank - oldRank
					})`}</span>
			);
		}
		if (oldRank > newRank) {
			return (
				<span className={classes.lose}>{`${oldRank} (-${oldRank - newRank
					})`}</span>
			);
		}
	};

	const list = range(0, 20, 1).map((index) => ({
		id: index,
		XPlayer: {
			username: 'test1',
			rank: index % 2 === 0 ? 2000 : 1500,
		},
		OPlayer: {
			username: 'test2',
			rank: index % 2 === 0 ? 1500 : 2000,
		},
		result: index % 2 === 0 ? 'Win' : 'Lose',
		gameProfile: {
			newRank: index % 2 === 0 ? 2000 : 1500,
			oldRank: index % 2 === 0 ? 1500 : 2000,
		},
		date: 123123123,
	}));

	const columns = [
		{
			field: 'index',
			headerName: 'ID',
			headerAlign: 'center',
			cellClassName: 'custom-cell__center',
			renderCell: (param) => <span>{param.value + 1}</span>,
			width: 70,
		},
		{
			field: 'XPlayer',
			headerName: 'X Player',
			headerAlign: 'center',
			cellClassName: 'custom-cell__center',
			renderCell: (param) =>
				renderUsernameColumn(param.value?.username, param.value?.rank),
			sortable: false,
			width: 300,
		},
		{
			field: 'OPlayer',
			headerName: 'O Player',
			headerAlign: 'center',
			cellClassName: 'custom-cell__center',
			renderCell: (param) =>
				renderUsernameColumn(param.value?.username, param.value?.rank),
			sortable: false,
			width: 300,
		},
		{
			field: 'result',
			headerName: 'Result',
			headerAlign: 'center',
			cellClassName: 'custom-cell__center',
			renderCell: (param) => renderResult(param.value),
			width: 120,
		},
		{
			field: 'gameProfile',
			headerName: 'Elo',
			headerAlign: 'center',
			cellClassName: 'custom-cell__center',
			renderCell: (param) =>
				renderElo(param.value?.newRank, param.value?.oldRank),
			width: 120,
		},
		{
			field: 'date',
			headerName: 'Date',
			headerAlign: 'center',
			cellClassName: 'custom-cell__center',
			renderCell: (param) => (
				<span>{moment(param.value).format('DD/MM/YYYY')}</span>
			),
			width: 150,
		},
		{
			field: 'id',
			headerName: 'Action',
			headerAlign: 'center',
			cellClassName: 'custom-cell__center',
			renderCell: (param) => (
				<Button
					variant="contained"
					className="caro-button"
					size="small"
					style={{backgroundColor: '#ffb26b'}}
					onClick={() => handleWatch(param.value)}
				>
					Watch
				</Button>
			),
			width: 150,
		},
	];

	const customList = list.map((data, index) => ({
		...data,
		index,
	}));

	const handleWatch = (id) => {
		dispatch(setRoomID(id));
		history.push(`/rooms/${id}`);
	}

	return (
		<>
			<div className={classes.root}>
				<div className={classes.table}>
					<TableCustom
						// loading={loading}
						data={customList}
						columns={columns}
						selectable={false}
					/>
				</div>
			</div>
		</>
	);
}

export default React.memo(History);
