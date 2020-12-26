import React, { useEffect, useState } from 'react';
import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms';
import moment from 'moment';
import BrushIcon from '@material-ui/icons/Brush';

function Timer({ value = 0 }) {
	const [timer, setTimer] = useState(value * 1000);

	useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((currentTimer) => currentTimer - 1000);
    }, 1000);

    return () => clearInterval(timerInterval);
	}, []);

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
			<BrushIcon style={{ color: 'blue' }} />
		</>
	);
}

export default Timer;