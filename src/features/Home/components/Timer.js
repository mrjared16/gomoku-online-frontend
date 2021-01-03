import React, { useEffect, useState } from 'react';
import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms';
import moment from 'moment';

function Timer({ value = 0, start = false }) {
	const [timer, setTimer] = useState(value * 1000);

	useEffect(() => {
		let timerInterval;
		if (start) {
			timerInterval = setInterval(() => {
				setTimer((currentTimer) => currentTimer - 1000);
			}, 1000);
		}
    return () => clearInterval(timerInterval);
	}, [start]);

	return (
		<>
			<AccessAlarmsIcon style={{ color: 'red' }} />
			<span>
				{(moment(timer).minute() < 10
					? '0' + moment(timer).minute()
					: moment(timer).minute()) +
					':' +
					(moment(timer).second() < 10
						? '0' + moment(timer).second()
						: moment(timer).second())}
			</span>
		</>
	);
}

export default Timer;