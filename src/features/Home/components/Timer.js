import React, { useEffect, useState } from 'react';
import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms';
import moment from 'moment';

function Timer({ timerProp = 0, setTimerProp = () => {} }) {
	const [timer, setTimer] = useState(timerProp);

	useEffect(() => {
		const	timerInterval = setInterval(() => {
				setTimer((currentTimer) => {
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
				{moment.unix(timer).format('mm:ss')}
			</span>
		</>
	);
}

export default Timer;