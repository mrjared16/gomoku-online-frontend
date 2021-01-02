import { Box, Icon, makeStyles, Typography } from '@material-ui/core';
import AvatarCustom from 'components/AvatarCustom';
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
  root: {
		height: '100%',
    '& h6': {
      fontWeight: 'normal',
    },
    '& .MuiIcon-root': {
      width: 'fit-content',
    },
  },
  name: {
    marginTop: 10,
	},
	loading: {
		height: '100%',
	}
});

function Profile({ userInfo = {} }) {
	const classes = useStyles();
	const { loadingUserInfo } = useSelector(state => state.user);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
			className={classes.root}
    >
      {loadingUserInfo ? (
				<Box display="flex" justifyContent="center" alignItems="center" className={classes.loading}>
					<CircularProgress color="secondary" size={30} />
				</Box>
      ) : (
        <>
          <AvatarCustom photo={userInfo.photo} size="extraLarge" />
          <Typography className={classes.name}>{userInfo.name}</Typography>
          <Box display="flex" flexDirection="column" width="100%" marginTop={3}>
            <Box display="flex">
              <Typography variant="subtitle2">Username:</Typography>
              <Typography variant="subtitle2" style={{ marginLeft: 10 }}>
                {userInfo.username}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" marginTop={1}>
              <Typography variant="subtitle2">Rank:</Typography>
              <Typography variant="subtitle2" style={{ marginLeft: 10 }}>
                Diamond
              </Typography>
              <Icon
                className="fas fa-gem"
                style={{ fontSize: 15, marginLeft: 10, color: '#13B0E2' }}
              />
            </Box>
            <Box display="flex" marginTop={1}>
              <Typography variant="subtitle2">Win Rate:</Typography>
              <Typography variant="subtitle2" style={{ marginLeft: 10 }}>
                90%
              </Typography>
            </Box>
            <Box display="flex" marginTop={1}>
              <Typography variant="subtitle2">Number of win games:</Typography>
              <Typography variant="subtitle2" style={{ marginLeft: 10 }}>
                900
              </Typography>
            </Box>
            <Box display="flex" marginTop={1}>
              <Typography variant="subtitle2">Number of games:</Typography>
              <Typography variant="subtitle2" style={{ marginLeft: 10 }}>
                1000
              </Typography>
            </Box>
            <Box display="flex" marginTop={1}>
              <Typography variant="subtitle2">Join date:</Typography>
              <Typography variant="subtitle2" style={{ marginLeft: 10 }}>
                02/01/2020
              </Typography>
            </Box>
          </Box>
				</>
      )}
    </Box>
  );
}

export default Profile;
