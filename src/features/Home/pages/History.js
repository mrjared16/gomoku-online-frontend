import React, { useEffect, useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import TableCustom from 'components/TableCustom';
import moment from 'moment';
import { orderBy } from 'lodash';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setIdHistory, setIsWatchingHistory} from 'app/historySlice';
import gameHistoryApi from 'api/gameHistoryApi';

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
	tie: {
		color: 'grey',
	},
	sideXColumn: {
		backgroundColor: '#ef4f4f',
		color: 'white',
	},
	sideOColumn: {
		backgroundColor: '#83a95c',
		color: 'white',
	},
}));

function History() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();
	const [listGameHistory, setListGameHistory] = useState([]);
	const [loadingGameHistory, setLoadingGameHistory] = useState(true);

	useEffect(() => {
		gameHistoryApi.getListGameHistory().then((response) => {
			if (!response) return;
			const { games } = response;
			const sortList = orderBy(games, ['startAt'], ['desc']);
			const list = sortList.map((data, index) => ({
				...data,
				actionColumn: {
					gameId: data.id,
				},
				gameResultColumn: {
					playerSide: data.playerSide,
					gameResult: data.gameResult,
				},
				index,
			}));
			setListGameHistory(list);
			setLoadingGameHistory(false);
		})
	}, [])

	const renderResult = (gameResult, playerSide) => {
		if (gameResult == null || playerSide == null) return;
		if (gameResult === playerSide) {
			return <span className={classes.win}>Win</span>;
		}
		if (gameResult !== playerSide) {
			if (gameResult !== 2) {
				return <span className={classes.lose}>Lose</span>;
			} else {
				return <span className={classes.tie}>Tie</span>;
			}
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
		if (oldRank === newRank) {
			return (
				<span className={classes.tie}>{`${oldRank}`}</span>
			);
		}
	};

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
			field: 'playerSide',
			headerName: 'Side',
			headerAlign: 'center',
			cellClassName: (param) => param.value === 0 ? `custom-cell__center ${classes.sideXColumn}` : `custom-cell__center ${classes.sideOColumn}`,
			renderCell: (param) => <span>{param.value === 0 ? 'X' : 'O'}</span>,
			sortable: false,
			width: 120,
		},
		{
			field: 'gameResultColumn',
			headerName: 'Result',
			headerAlign: 'center',
			cellClassName: 'custom-cell__center',
			renderCell: (param) => <span>{renderResult(param.value?.gameResult, param.value?.playerSide)}</span>,
			width: 120,
		},
		{
			field: 'rankRecord',
			headerName: 'Elo',
			headerAlign: 'center',
			cellClassName: 'custom-cell__center',
			renderCell: (param) =>
				param.value && renderElo(param.value?.newRank, param.value?.oldRank),
			width: 120,
		},
		{
			field: 'duration',
			headerName: 'Duration',
			headerAlign: 'center',
			cellClassName: 'custom-cell__center',
			renderCell: (param) => <span>{param?.value && moment.unix(param.value).utc().format('HH:mm:ss')}</span>,
			width: 150,
		},
		{
			field: 'startAt',
			headerName: 'Date',
			headerAlign: 'center',
			cellClassName: 'custom-cell__center',
			renderCell: (param) => (
				<span>{moment(param.value).format('DD/MM/YYYY')}</span>
			),
			width: 150,
		},
		{
			field: 'actionColumn',
			headerName: 'Action',
			headerAlign: 'center',
			cellClassName: 'custom-cell__center',
			renderCell: (param) => (
				<Button
					variant="contained"
					className="caro-button"
					size="small"
					style={{backgroundColor: '#ffb26b'}}
					onClick={() => handleWatch(param.value?.gameId)}
				>
					Watch
				</Button>
			),
			width: 150,
		},
	];

	const handleWatch = (id) => {
		if (!id) return;
		dispatch(setIsWatchingHistory(true));
		dispatch(setIdHistory(id));
		history.push(`/watching-history/${id}`);
	};

	return (
		<>
			<div className={classes.root}>
				<div className={classes.table}>
					<TableCustom
						loading={loadingGameHistory}
						data={listGameHistory}
						columns={columns}
						selectable={false}
					/>
				</div>
			</div>
		</>
	);
}

export default React.memo(History);
