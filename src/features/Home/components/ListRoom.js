import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import TableCustom from 'components/TableCustom';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  table: {
    height: 'calc(100vh - 174.4px)',
    margin: '0px 25px',
  },
  buttons: {
    display: 'flex',
    margin: '10px 25px',
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
		renderCell: (param) => <span>{param.value.username}</span>,
		sortable: false,
		width: 230,
	},
	{
		field: 'XPlayer',
		headerName: 'X Player',
		headerAlign: 'center',
		cellClassName: 'custom-cell__center',
		renderCell: (param) => <span>{param.value.username}</span>,
		sortable: false,
		width: 230,
	},
	{
		field: 'OPlayer',
		headerName: 'O Player',
		headerAlign: 'center',
		cellClassName: 'custom-cell__center',
		renderCell: (param) => <span>{param.value.username}</span>,
		sortable: false,
		width: 230,
	},
	{
		field: 'status',
		headerName: 'Status',
		headerAlign: 'center',
		cellClassName: 'custom-cell__center',
		renderCell: (param) => (
			<span style={{ color: param.value === 'Playing' ? 'red' : 'green' }}>
				{param.value}
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
        >
          Quick Play
        </Button>
      </div>
    </div>
  );
}

export default React.memo(ListRoom);
