import authApi from 'api/authApi';
import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { showToast } from 'utils/showToast';

function ActivateUser() {
	const location = useLocation();
	const token = location.pathname.split('/').pop();
	const history = useHistory();

	useEffect(() => {
		authApi.activateUser(token).then(response => {
			showToast('success', response.message);
			history.push("/login");
		}).catch(err => {
			showToast("error", err.response.data.message);
			history.push("/login");
		})
	}, [])

  return <></>;
}

export default ActivateUser;
