import React, { useEffect, useState } from 'react';
import moment from 'moment';

function Counting({ countingProp, setCountingProp = () => {} }) {
	const [counting, setCounting] = useState(countingProp);

	useEffect(() => {
		const countInterval = setInterval(() => {
			setCounting(currentCount => currentCount + 1);
		}, 1000)

		return () => clearInterval(countInterval);
	},[])

	return (
		<span>{moment.unix(counting).utc().format('mm:ss')}</span>
	);
}

export default Counting;