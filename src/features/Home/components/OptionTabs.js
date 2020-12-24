import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ChatIcon from '@material-ui/icons/Chat';
import EventNoteIcon from '@material-ui/icons/EventNote';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 500,
  },
});

export default function IconLabelTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
	};
	
	const renderTab = () => {
		switch(value) {
			case 0:
				return <span>Chat</span>
			case 1:
				return <span>Turn History</span>
			case 2:
				return <span>Spectator</span>
			default:
				return <span>Chat</span>
		}
	}

  return (
    <>
			<Paper square className={classes.root}>
				<Tabs
					value={value}
					onChange={handleChange}
					variant="fullWidth"
					indicatorColor="primary"
					textColor="primary"
					aria-label="icon label tabs example"
				>
					<Tab icon={<ChatIcon />} label="Chat" />
					<Tab icon={<EventNoteIcon />} label="Turn History" />
					<Tab icon={<PeopleAltIcon />} label="Spectator" />
				</Tabs>
				{renderTab()}
			</Paper>
		</>
  );
}
