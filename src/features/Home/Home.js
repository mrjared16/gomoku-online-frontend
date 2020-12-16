import { Button, Grid, makeStyles } from "@material-ui/core";
import axiosClient from "api/axiosClient";
import userApi from "api/userApi";
import { setUser } from "app/userSlice";
import ListUserStatus from "features/Home/components/ListUserStatus";
import Main from "features/Home/pages/Main";
import RoomPage from "features/Home/pages/RoomPage";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import socketIOClient from "socket.io-client";


const useStyles = makeStyles({
  root: {
    height: "calc(100vh - 48px)",
    "& .MuiGrid-container": {
      height: "100%",
      "& .MuiGrid-item": {
        maxHeight: "100%",
        overflow: "auto",
        "&::-webkit-scrollbar": {
          width: "0.3em",
        },
        "&::-webkit-scrollbar-track": {
          boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
          webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#d4a531",
        },
      },
    },
  },
});

function userDTOToProp({ id, username, name }) {
  return {
    id: id,
    online: true,
    fullName: name,
    photo: "",
    // time: null
  };
}

const handleOnlineUsersOnchangeEvent = {
  connected: (setState, user) => {
    setState((current = []) => {
      if (!!current.find(item => item.id = user.id))
        return current;
      return current.concat([{ ...userDTOToProp(user) }])
    });
  },
  disconnected: (setState, user) => {
    setState((current = []) => current.filter((e) => e.id !== user.id));
  },
};

function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [onlineUsers, setOnlineUsers] = useState([]);

  const { token } = useSelector((state) => state.user);

  const fetchUserData = async() => {
    const response = await userApi.fetch();
    dispatch(setUser(response));
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
        transports: ["websocket"],
        upgrade: false,
        query: { token },
      }
    );

    socketClient.on("userEventMsg", (response) => {
      const { user, event } = response;
      if (user === "anonymous") {
        return;
      }
      handleOnlineUsersOnchangeEvent[event](setOnlineUsers, user);
    });

    return () => {
      socketClient.close();
    };
  }, [token]);

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={9}>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/rooms/:id" component={RoomPage} />
          </Switch>
        </Grid>
        <Grid item xs={3} className={classes.listUserStatus}>
          <Button variant="outlined" onClick={() => fetchOnlineUsers()}>
            Load
          </Button>
          <ListUserStatus list={onlineUsers} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
