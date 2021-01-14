import {
  Dialog,
  DialogActions,
  DialogContent,
  makeStyles,
  Button,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  DialogTitle,
  ListItemSecondaryAction,
  IconButton,
  Icon,
  Box,
} from '@material-ui/core';
import AvatarCustom from 'components/AvatarCustom';
import RankCustom from 'components/RankCustom';
import TypographyCustom from 'components/TypographyCustom';
import React from 'react';
import { useSelector } from 'react-redux';
import { userDTOToProp } from 'utils/mapResponseToProp';
import { getRankSymbol } from 'utils/rank';

const useStyles = makeStyles({
  root: {
    '& .MuiDialog-paper': {
      width: 300,
    },
  },
  name: {
    marginLeft: 5,
    maxWidth: 'calc(100% - 30px)',
  },
  containerAction: {
    right: 5,
  },
  nameContainer: {
    maxWidth: '100%',
  },
});

function ModalSpectator({
  open = false,
  toggle = () => {},
  list = [],
  hostID = null,
  onClick = () => {},
}) {
  const classes = useStyles();
  const { currentUserInfo } = useSelector((state) => state.user);

  return (
    <Dialog open={open} onClose={toggle} className={classes.root}>
      <DialogTitle>Spectators</DialogTitle>
      <DialogContent>
        <List>
          {list &&
            list.map((user, index) => {
              const mapUserInfo = userDTOToProp(user);
              const {
                id,
                online = false,
                username = '',
                photo = '',
                rank,
              } = mapUserInfo;
              return (
                <ListItem key={id} button onClick={() => onClick(id)}>
                  <ListItemAvatar>
                    <AvatarCustom photo={photo} online={true} />
                  </ListItemAvatar>
                  <ListItemText>
                    <Box
                      display="flex"
                      alignItems="center"
                      className={classes.nameContainer}
                    >
                      <RankCustom
                        symbol={getRankSymbol(rank)}
                        className={classes.rank}
                      />
                      <div className={classes.name}>
                        <TypographyCustom text={username} />
                      </div>
                    </Box>
                  </ListItemText>
                  <ListItemSecondaryAction className={classes.containerAction}>
                    {id === hostID && (
                      <IconButton>
                        <Icon
                          className="fas fa-chess-king"
                          style={{ color: 'yellow', fontSize: 20 }}
                        />
                      </IconButton>
                    )}
                    {currentUserInfo.id === hostID && id !== hostID && (
                      <IconButton>
                        <Icon
                          className="fas fa-times"
                          style={{ color: 'red', fontSize: 20 }}
                        />
                      </IconButton>
                    )}
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
        </List>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="secondary"
          onClick={toggle}
          size="small"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalSpectator;
