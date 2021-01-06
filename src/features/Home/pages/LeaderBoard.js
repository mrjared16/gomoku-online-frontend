import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TableCustom from 'components/TableCustom';
import RankCustom from 'components/RankCustom';
import { getTitleRank } from 'utils/rank';
import TypographyCustom from 'components/TypographyCustom';
import userApi from 'api/userApi';
import { userDTOToProp } from 'utils/mapResponseToProp';
import ModalUserInfo from '../components/ModalUserInfo';

const useStyles = makeStyles((theme) => ({
	root: {
	},
	table: {
		height: 'calc(100vh - 98px)',
		padding: '25px 25px',
	},
	containerRank: {
		marginRight: 10,
	}
}));

function LeaderBoard({
	loading = true,
	list = [],
}) {
	const classes = useStyles();
	const [userInfoState, setUserInfoState] = useState(null);
	const [loadingUserInfo, setLoadingUserInfo] = useState(true);
	const [openModalUserInfo, setOpenModalUserInfo] = useState(false);
	
	const renderUsernameColumn = (username, rank) => {
		const title = getTitleRank(rank);
	
		return (
			<>
				<div className={classes.containerRank}>
					<RankCustom title={title} />
				</div>
				<TypographyCustom text={username} />
			</>
		)
	}
	
	const columns = [
		{
			field: 'index',
			headerName: 'Rank',
			headerAlign: 'center',
			cellClassName: 'custom-cell__center',
			renderCell: (param) => <span>{param.value + 1}</span>,
			width: 100,
		},
		{
			field: 'userInfo',
			headerName: 'Username',
			headerAlign: 'center',
			renderCell: (param) => renderUsernameColumn(param.value.username, param.value.rank),
			sortable: false,
			width: 300,
		},
		{
			field: 'gameProfile',
			headerName: 'Elo',
			headerAlign: 'center',
			cellClassName: 'custom-cell__center',
			renderCell: (param) => <span>{param.value.rank}</span>,
			width: 100,
		},
	];

	const customList = list.map((data, index) => (
		{
			...data,
			userInfo: {
				username: data.username,
				rank: data.gameProfile.rank,
			},
			index,
		}
	));

	const handleClickUser = ({ row }) => {
		setLoadingUserInfo(true);
		setOpenModalUserInfo(true);
		userApi.getUserInfoByID(row.id).then((response) => {
			const userInfoData = userDTOToProp(response.user);
			setUserInfoState(userInfoData);
			setLoadingUserInfo(false);
		})
	};

	return (
		<>
			<div className={classes.root}>
				<div className={classes.table}>
					<TableCustom
						loading={loading}
						data={customList}
						columns={columns}
						onRowClick={handleClickUser}
					/>
				</div>
			</div>
			<ModalUserInfo open={openModalUserInfo} toggle={() => setOpenModalUserInfo(!openModalUserInfo)} userInfo={userInfoState} loading={loadingUserInfo} />
		</>
	);
}

export default React.memo(LeaderBoard);
