import React, { useState } from 'react';
import { Button, CircularProgress, Icon, makeStyles } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import TableCustom from 'components/TableCustom';
import TypographyCustom from 'components/TypographyCustom';
import Counting from 'components/Counting';
import RankCustom from 'components/RankCustom';
import { getRankSymbol } from 'utils/rank';

const useStyles = makeStyles((theme) => ({
  root: {},
  table: {
    height: 'calc(100vh - 174.4px)',
    margin: '0px 10px',
  },
  buttons: {
    display: 'flex',
    margin: '10px 10px',
    '& button': {
      width: 150,
      marginRight: 10,
    },
  },
  closeQuickPlay: {
    color: 'red',
  },
  containerRank: {
    marginRight: 10,
  },
}));

function ListRoom({
  loading = true,
  list = [],
  onRoomSelected = () => {},
  onJoin = () => {},
  roomSelected = null,
  isFinding = false,
  onQuickPlay = () => {},
}) {
  const classes = useStyles();
  const [counting, setCounting] = useState(0);

  const customList = list.map((data, index) => ({
    ...data,
    index,
  }));

  const renderUsernameColumn = (username, rank) => {
    return (
      <>
        <div className={classes.containerRank}>
          {rank && <RankCustom symbol={getRankSymbol(rank)} />}
        </div>
        <TypographyCustom text={username} />
      </>
    );
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
      field: 'host',
      headerName: 'Host',
      headerAlign: 'center',
      cellClassName: 'custom-cell__center',
      renderCell: (param) =>
        renderUsernameColumn(
          param.value?.username,
          param.value?.gameProfile?.rank
        ),
      sortable: false,
      width: 230,
    },
    {
      field: 'XPlayer',
      headerName: 'X Player',
      headerAlign: 'center',
      cellClassName: 'custom-cell__center',
      renderCell: (param) =>
        renderUsernameColumn(
          param.value?.username,
          param.value?.gameProfile?.rank
        ),
      sortable: false,
      width: 230,
    },
    {
      field: 'OPlayer',
      headerName: 'O Player',
      headerAlign: 'center',
      cellClassName: 'custom-cell__center',
      renderCell: (param) =>
        renderUsernameColumn(
          param.value?.username,
          param.value?.gameProfile?.rank
        ),
      sortable: false,
      width: 230,
    },
    {
      field: 'gameID',
      headerName: 'Status',
      headerAlign: 'center',
      cellClassName: 'custom-cell__center',
      renderCell: (param) => (
        <span style={{ color: param.value ? 'red' : 'green' }}>
          {param.value ? 'Playing' : 'Waiting'}
        </span>
      ),
      width: 100,
    },
    {
      field: 'requirePass',
      headerName: 'Password',
      headerAlign: 'center',
      cellClassName: 'custom-cell__center',
      renderCell: (param) => (param.value ? <LockIcon fontSize="small" /> : ''),
      sortable: false,
      width: 100,
    },
  ];

  return (
    <div className={classes.root}>
      <div className={classes.table}>
        <TableCustom
          loading={loading}
          data={customList}
          columns={columns}
          onRowSelected={onRoomSelected}
        />
      </div>
      <div className={classes.buttons}>
        <Button
          variant="contained"
          color="primary"
          disabled={!roomSelected}
          onClick={onJoin}
          size="small"
        >
          Join
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: '#ffb26b' }}
          size="small"
          onClick={onQuickPlay}
          endIcon={
            isFinding && (
              <Icon
                className={`fas fa-window-close ${classes.closeQuickPlay}`}
              />
            )
          }
        >
          {!isFinding ? (
            'Quick Play'
          ) : (
            <>
              <span>Finding...</span>
              <Counting countingProp={counting} setCountingProp={setCounting} />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export default React.memo(ListRoom);
