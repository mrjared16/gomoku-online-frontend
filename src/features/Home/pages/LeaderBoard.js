import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TableCustom from 'components/TableCustom';
import RankCustom from 'components/RankCustom';
import { getRankSymbol } from 'utils/rank';
import TypographyCustom from 'components/TypographyCustom';
import userApi from 'api/userApi';
import { userDTOToProp } from 'utils/mapResponseToProp';
import ModalUserInfo from '../components/ModalUserInfo';
import leaderBoardApi from 'api/leaderBoardApi';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'var(--color-background)',
  },
  table: {
    height: 'calc(100vh - 98px)',
    padding: '25px 25px',
  },
  containerRank: {
    marginRight: 10,
  },
}));

function LeaderBoard() {
  const classes = useStyles();
  const [userInfoState, setUserInfoState] = useState(null);
  const [loadingUserInfo, setLoadingUserInfo] = useState(true);
  const [openModalUserInfo, setOpenModalUserInfo] = useState(false);
  const [leaderBoardData, setLeaderBoardData] = useState([]);
  const [loadingLeaderBoardData, setLoadingLeaderBoardData] = useState(true);

  const renderUsernameColumn = (username, rank) => {
    return (
      <>
        <div className={classes.containerRank}>
          <RankCustom symbol={getRankSymbol(rank)} />
        </div>
        <TypographyCustom text={username} />
      </>
    );
  };

  const columns = [
    {
      field: 'index',
      headerName: 'Rank',
      headerAlign: 'center',
      cellClassName: 'custom-cell__center',
      renderCell: (param) => <span>{param.value}</span>,
      width: 100,
    },
    {
      field: 'userInfo',
      headerName: 'Username',
      headerAlign: 'center',
      renderCell: (param) =>
        renderUsernameColumn(param.value.username, param.value.rank),
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

  const handleClickUser = ({ row }) => {
    setLoadingUserInfo(true);
    setUserInfoState(null);
    setOpenModalUserInfo(true);
    userApi.getUserInfoByID(row.id).then((response) => {
      const userInfoData = userDTOToProp(response.user);
      setUserInfoState(userInfoData);
      setLoadingUserInfo(false);
    });
  };

  const getLeaderBoardData = () => {
    setLoadingLeaderBoardData(true);
    leaderBoardApi.getListLeaderBoard().then((response) => {
      const {
        leaderboard: { users },
      } = response;
      const customList = users.map((data, index) => {
        const { user, rankIndex } = data;
        return {
          ...user,
          userInfo: {
            username: user.username,
            rank: user.gameProfile.rank,
          },
          index: rankIndex,
        };
      });
      setLeaderBoardData(customList);
      setLoadingLeaderBoardData(false);
    });
  };

  useEffect(() => {
    getLeaderBoardData();
  }, []);

  return (
    <>
      <div className={classes.root}>
        <div className={classes.table}>
          <TableCustom
            loading={loadingLeaderBoardData}
            data={leaderBoardData}
            columns={columns}
            onRowClick={handleClickUser}
          />
        </div>
      </div>
      <ModalUserInfo
        open={openModalUserInfo}
        toggle={() => setOpenModalUserInfo(!openModalUserInfo)}
        userInfo={userInfoState}
        loading={loadingUserInfo}
      />
    </>
  );
}

export default React.memo(LeaderBoard);
