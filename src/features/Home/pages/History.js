import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import TableCustom from 'components/TableCustom';
import RankCustom from 'components/RankCustom';
import { getTitleRank } from 'utils/rank';
import TypographyCustom from 'components/TypographyCustom';
import moment from 'moment';
import { range } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setIdHistory, setMoveHistory, setIsWatchingHistory, setWinnerID, setWinLine, setXPlayer, setOPlayer } from 'app/historySlice';

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
	const { currentUserInfo } = useSelector(state => state.user);

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
		//win (res = 0)
		//lose (res = 1)
		if (res === 0) {
			return <span className={classes.win}>Win</span>;
		}
		if (res === 1) {
			return <span className={classes.lose}>Lose</span>;
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
		winnerID: index % 2 === 0 ? currentUserInfo?.id : index,
		rankRecord: {
			newRank: index % 2 === 0 ? 2000 : 1500,
			oldRank: index % 2 === 0 ? 1500 : 2000,
		},
		startAt: '2021-01-08T17:56:38.800Z',
		duration: 3720,
		gameState: {
			move: range(0, 20, 1).map(index => ({
				id: index,
				position: index,
				time: '2021-01-08T17:56:38.800Z',
				value: index % 2 === 0 ? 0 : 1,
			})),
			// turn
		},
		statusFinishGame: {
			gameResult: 0,
			line: '1-2-3-4-5',
		}
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
			field: 'winnerID',
			headerName: 'Result',
			headerAlign: 'center',
			cellClassName: 'custom-cell__center',
			renderCell: (param) => <span>{renderResult(param.value === currentUserInfo?.id ? 0 : 1)}</span>,
			width: 120,
		},
		{
			field: 'rankRecord',
			headerName: 'Elo',
			headerAlign: 'center',
			cellClassName: 'custom-cell__center',
			renderCell: (param) =>
				renderElo(param.value?.newRank, param.value?.oldRank),
			width: 120,
		},
		{
			field: 'duration',
			headerName: 'Duration',
			headerAlign: 'center',
			cellClassName: 'custom-cell__center',
			renderCell: (param) => <span>{param?.value && moment(param.value).format('HH:mm:ss')}</span>,
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
			field: 'gameState',
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
		gameState: {
			...data.gameState,
			id: data.id,
		},
		index,
	}));

	const handleWatch = (gameState) => {
		if (!gameState) return;
		dispatch(setIsWatchingHistory(true));
		dispatch(setIdHistory(gameState?.id));
		history.push(`/watching-history/${gameState?.id}`);
	};

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
