import React, { useEffect, useState } from 'react';
import { Route, Redirect, useParams, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loading from './Loading';

const PrivateRoomRoute = ({ component: Component, ...rest }) => {
	const { passwordRoom, roomIDCreated } = useSelector((state) => state.room);
	const [verify, setVerify] = useState(false);
	const [loadingVerify, setLoadingVerify] = useState(true);
	
	const location = useLocation();
	const { pathname } = location;
	const roomID = pathname.split('/').pop();
	const isHost = roomIDCreated === roomID;
	
	useEffect(() => {
		// roomApi.verifyRoom(roomID, passwordRoom).then((response) => {
			// setVerify(response);
			// setLoadingVerify(false);
			setTimeout(() => {
				setVerify(true);
				setLoadingVerify(false);
			}, 2000)
		// });
	}, [])

  return (
    <>
      {(!isHost && loadingVerify) ? (
        <Loading />
      ) : (
        <Route
          {...rest}
          render={(props) =>
            (isHost || verify) ? <Component {...props} /> : <Redirect to="/" />
          }
        />
      )}
    </>
  );
};

export default PrivateRoomRoute;
