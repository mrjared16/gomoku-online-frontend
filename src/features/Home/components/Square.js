import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 22,
    width: 22,
    border: '1px solid #ff7b54',
    cursor: 'pointer',
    userSelect: 'none',
    '& span': {
      fontSize: 25,
    },
  },
});

function Square({ value = -1, onClick = () => {}, highlight = false }) {
  const classes = useStyles();

  const renderValue = () => {
    switch (value) {
      case 0:
        return <span style={{ color: 'red' }}>X</span>;
      case 1:
        return <span style={{ color: 'green' }}>O</span>;
      default:
        return '';
    }
  };

  return (
    <div
      className={classes.root}
      onClick={onClick}
      style={{
        backgroundColor: highlight ? '#ffb26b' : 'var(--color-background)',
      }}
    >
      {renderValue()}
    </div>
  );
}

export default Square;
