import React, { useEffect, useState } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './Loading';
import { setOpenModalInputPassword } from 'app/roomSlice';

const PrivateRoomRoute = ({ component: Component, ...rest }) => {
	const { passwordRoom } = useSelector((state) => state.room);
	const [verify, setVerify] = useState(false);
	const [loadingVerify, setLoadingVerify] = useState(true);
	const dispatch = useDispatch();
	
	const location = useLocation();
	const { pathname } = location;
	const roomID = pathname.split('/').pop();
	
	useEffect(() => {
		setLoadingVerify(false);
		setVerify(true);
		// if (!passwordRoom) {
		// 	dispatch(setOpenModalInputPassword(true));
		// 	return;
		// }
		// roomApi.verifyRoom(roomID, passwordRoom).then((response) => {
			// setVerify(response);
			// setLoadingVerify(false);
		// });
	}, [passwordRoom])

  return (
    <>
      {loadingVerify ? (
        <Loading />
      ) : (
        <Route
          {...rest}
          render={(props) =>
            verify ? <Component {...props} /> : <Redirect to="/" />
          }
        />
      )}
    </>
  );
};

export default PrivateRoomRoute;
