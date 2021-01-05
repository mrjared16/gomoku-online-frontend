import { Button, Grid, makeStyles } from '@material-ui/core';
import axiosClient from 'api/axiosClient';
import userApi from 'api/userApi';
import { setRoomID } from 'app/roomSlice';
import { setUser, setLoadingUserInfo } from 'app/userSlice';
import Header from 'components/Header';
import ListUserStatus from 'features/Home/components/ListUserOnline';
import Main from 'features/Home/pages/Main';
import RoomPage from 'features/Home/pages/RoomPage';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import Search from './components/Search';

const useStyles = makeStyles({
  root: {
    height: 'calc(100vh - 48px)',
  },
  listUserStatus: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '20px 10px 10px 0px',
  },
});

function userDTOToProp({ id, username, name }) {
  return {
    id: id,
    online: true,
    name,
		photo: '',
		username,
    // time: null
  };
}

const handleOnlineUsersOnchangeEvent = {
  connected: (setState, user) => {
    setState((current = []) => {
      if (!!current.find((item) => item.id == user.id)) return current;
      return current.concat([{ ...userDTOToProp(user) }]);
    });
  },
  disconnected: (setState, user) => {
    setState((current = []) => current.filter((e) => e.id !== user.id));
  },
};

function Home() {
  const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();

  const [onlineUsers, setOnlineUsers] = useState([]);

  const { token } = useSelector((state) => state.user);

  const fetchUserData = async () => {
    const response = await userApi.fetch();
    dispatch(setUser(response));
    dispatch(setLoadingUserInfo(false));
  };

  const fetchOnlineUsers = () => {
    axiosClient
      .get(`${process.env.REACT_APP_API_URL}/waitingRoom`)
      .then((response) => {
        const { users } = response;
        const userMap = users.map((user) => {
          const convertedUser = userDTOToProp(user);
          return convertedUser;
        });
        setOnlineUsers((list) => userMap);
      });
  };

  useEffect(() => {
    fetchOnlineUsers();
    fetchUserData();
  }, [token]);

  useEffect(() => {
    const socketClient = socketIOClient(
      `${process.env.REACT_APP_SOCKET_URL}/waitingRoom`,
      {
        transports: ['websocket'],
        upgrade: false,
        query: { token },
      }
    );

    socketClient.on('userEventMsg', (response) => {
      const { user, event } = response;
      if (user === 'anonymous') {
        return;
      }
      handleOnlineUsersOnchangeEvent[event](setOnlineUsers, user);
    });

    socketClient.on('reconnectEventMsg', (response) => {
			console.log('receive reconnectEventMsg: ', response);
			const { roomID } = response;
			dispatch(setRoomID(roomID));
			history.push(`rooms/${roomID}`);
    })

    return () => {
      socketClient.off('userEventMsg', () => {});
      socketClient.off('reconnectEventMsg', () => {});
      socketClient.close();
    };
  }, [token]);

  return (
    <>
      <Header />
      <div className={classes.root}>
        <Switch>
          <Route exact path="/" component={() => <Main onlineUsers={onlineUsers} />} />
          <Route exact path="/rooms/:id" component={RoomPage} />
        </Switch>
      </div>
    </>
  );
}

export default Home;