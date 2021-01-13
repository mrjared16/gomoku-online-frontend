import roomApi from 'api/roomApi';
import { removeRoomID } from 'app/roomSlice';
import ModalInputPassword from 'features/Home/components/ModalInputPassword';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, useHistory, useLocation } from 'react-router-dom';
import { showToast } from 'utils/showToast';
import Loading from './Loading';

const PrivateRoomRoute = ({ component: Component, ...rest }) => {
	const [verify, setVerify] = useState(false);
	const [loadingVerify, setLoadingVerify] = useState(true);
	const [openModalPassword, setOpenModalPassword] = useState(false);
	const history = useHistory();
	const [passwordRoom, setPasswordRoom] = useState(null);
	const [triggerSubmit, setTriggerSubmit] = useState(0);
	const dispatch = useDispatch();
	
	const location = useLocation();
	const { pathname } = location;
	const roomID = pathname.split('/').pop();
	
	useEffect(() => {
		setLoadingVerify(true);
		roomApi.verifyRoom(roomID, passwordRoom).then((response) => {
			setVerify(true);
			setLoadingVerify(false);
		}).catch((err) => {
			const { statusCode, message } = err.response?.data;
			if (statusCode === 403) {
				setOpenModalPassword(true);
				if (passwordRoom) {
					showToast('error', message);
				}
			} else if (statusCode === 404) {
				showToast('error', message);
				dispatch(removeRoomID());
				history.push('/');
			}
			setVerify(false);
			setLoadingVerify(false);
		})
	}, [triggerSubmit])

	const handleSubmitPassword = (password) => {
		setTriggerSubmit((prev) => prev + 1);
		setPasswordRoom(() => password);
	}

  return (
    <>
      {loadingVerify ? (
        <Loading />
      ) : (
        <Route
          {...rest}
					render={(props) => verify && <Component {...props} />}
        />
      )}
			{!loadingVerify && !verify && <ModalInputPassword open={true} toggle={() => setOpenModalPassword(!openModalPassword)} onSubmit={handleSubmitPassword} />}
    </>
  );
};

export default PrivateRoomRoute;
