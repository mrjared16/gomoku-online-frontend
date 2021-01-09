import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import TableCustom from 'components/TableCustom';
import TypographyCustom from 'components/TypographyCustom';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  table: {
    height: 'calc(100vh - 174.4px)',
    margin: '0px 10px',
  },
  buttons: {
    display: 'flex',
    margin: '10px 10px',
    '& button': {
      width: 120,
      marginRight: 10,
    },
  },
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
		field: 'host',
		headerName: 'Host',
		headerAlign: 'center',
		cellClassName: 'custom-cell__center',
		renderCell: (param) => <TypographyCustom text={param.value.username} />,
		sortable: false,
		width: 230,
	},
	{
		field: 'XPlayer',
		headerName: 'X Player',
		headerAlign: 'center',
		cellClassName: 'custom-cell__center',
		renderCell: (param) => <TypographyCustom text={param.value.username} />,
		sortable: false,
		width: 230,
	},
	{
		field: 'OPlayer',
		headerName: 'O Player',
		headerAlign: 'center',
		cellClassName: 'custom-cell__center',
		renderCell: (param) => <TypographyCustom text={param.value.username} />,
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


function ListRoom({
	loading = true,
  list = [],
  onRoomSelected = () => {},
	onJoin = () => {},
	roomSelected = null,
	isMatching = false,
	onQuickPlay = () => {},
}) {
	const classes = useStyles();

	const customList = list.map((data, index) => (
		{
			...data,
			index,
		}
	));
	
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
        >
          {isMatching ? 'Matching...' : 'Quick Play'}
        </Button>
      </div>
    </div>
  );
}

export default React.memo(ListRoom);
