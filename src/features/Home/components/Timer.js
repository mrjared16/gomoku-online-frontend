import React, { useEffect, useState } from 'react';
import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms';
import moment from 'moment';

function Timer({ timerProp = 0, setTimerProp = () => {} }) {

	useEffect(() => {
		const	timerInterval = setInterval(() => {
			setTimerProp((currentTimer) => {
					if (currentTimer === 0) return 0;
					return currentTimer - 1;
				});
			}, 1000);
    return () => clearInterval(timerInterval);
	});

	return (
		<>
			<AccessAlarmsIcon style={{ color: 'red' }} />
			<span>
				{moment.unix(timerProp).format('mm:ss')}
			</span>
		</>
	);
}

export default Timer;