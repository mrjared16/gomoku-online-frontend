import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';

const useStyles = makeStyles({
  table: {
    height: 'calc(100vh - 196px)',
    margin: '0px 25px',
	},
	buttons: {
		display: 'flex',
		margin: '10px 25px',
		'& button': {
			width: 120,
			marginRight: 10,
		}
	}
});

const columns = [
  { field: 'id', headerName: 'ID' },
  { field: 'host', headerName: 'Host' },
  { field: 'XPlayer', headerName: 'XPlayer' },
  { field: 'OPlayer', headerName: 'OPlayer' },
];

function ListRoom({ list = [], onRoomClick = (roomID) => {} }) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.table}>
        <DataGrid rows={list} columns={columns} />
      </div>
      <div className={classes.buttons}>
				<Button className="text-white" variant="contained" color="primary">
					Join
				</Button>
				<Button className="text-white" variant="contained" style={{backgroundColor: '#2D9CDB'}}>
					Quick Play
				</Button>
			</div>
    </>
  );
}

export default ListRoom;
