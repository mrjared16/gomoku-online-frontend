import { AppBar, makeStyles, Tab, Tabs } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Logo from 'components/Header/components/Logo';
import Dropdown from 'components/Header/components/Dropdown';
import { removeToken } from 'app/userSlice';
import { showToast } from 'utils/showToast';
import { setIsHost, setRoomID } from 'app/roomSlice';
import { setIdHistory, setIsWatchingHistory } from 'app/historySlice';
import { uniqBy } from 'lodash';
import UserInfo from './components/UserInfo';
import { userDTOToProp } from 'utils/mapResponseToProp';
import { setDarkMode } from 'app/darkModeSlice';
import SunButton from 'components/SunButton';
import MoonButton from 'components/MoonButton';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // backgroundColor: theme.palette.background.paper,
    '& .MuiAppBar-colorPrimary': {
      backgroundColor: 'var(--color-background-header)',
    },
    '& .MuiToolbar-root': {
      display: 'flex',
      justifyContent: 'space-between',
    },
    '& .MuiAppBar-positionStatic': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    '& .MuiTabs-indicator': {
      backgroundColor: 'var(--color-indicator-header)',
    },
    '& .fullName': {
      color: 'var(--color-text)',
    },
    '& .MuiAvatar-fallback': {
      color: 'var(--color-background-avatar)',
    },
    '& .Mui-selected': {
      backgroundColor: 'transparent !important',
    },
    '& #simple-tab-0': {
      color: 'white',
    },
    '& #simple-tab-1': {
      color: 'white',
    },
    '& #simple-tab-2': {
      color: 'white',
    },
    '& #simple-tab-3': {
      color: 'white',
    },
    '& #simple-tab-4': {
      color: 'white',
    },
  },
}));

const tabs = [
  {
    label: 'Home',
    url: '/',
    value: 0,
    disabled: false,
  },
  {
    label: 'History',
    url: '/history',
    value: 1,
    disabled: false,
  },
  {
    label: 'Rank',
    url: '/rank',
    value: 2,
    disabled: false,
  },
];

function Header({ onLogOut = () => {} }) {
  const classes = useStyles();

  const history = useHistory();
  const dispatch = useDispatch();
  const { token, currentUserInfo } = useSelector((state) => state.user);
  const [value, setValue] = useState(0);
  const location = useLocation();
  const { currentRoomID } = useSelector((state) => state.room);
  const { isWatchingHistory, historyID } = useSelector(
    (state) => state.history
  );
  const [currentTabs, setCurrentTabs] = useState(tabs);
  const { darkMode } = useSelector((state) => state.darkMode);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const newUrl = currentTabs[newValue]?.url || '';
    history.push(newUrl);
  };

  const handleLogout = () => {
    onLogOut();
    dispatch(removeToken());
    history.push('/login');
    showToast('success', 'Logout successful');
  };

  const getTabValue = (label) => {
    const tab = currentTabs.filter((tab) => tab.label === label);
    if (tab.length === 0) {
      return currentTabs.length;
    } else {
      return tab[0].value;
    }
  };

  useEffect(() => {
    const path = location.pathname;

    switch (path) {
      case '/':
        setValue(0);
        return;
      case '/history':
        setValue(1);
        return;
      case '/rank':
        setValue(2);
        return;
      default:
        setValue(0);
    }

    if (path.match(/rooms/)) {
      const id = path.split('/').pop();
      dispatch(setRoomID(id));
      setValue(getTabValue('Room'));
    }

    if (path.match(/watching-history/)) {
      const id = path.split('/').pop();
      dispatch(setIdHistory(id));
      dispatch(setIsWatchingHistory(true));
      setValue(getTabValue('Watching History'));
    }
  }, [location]);

  useEffect(() => {
    if (currentRoomID) {
      const newTabs = uniqBy(
        [
          ...currentTabs,
          {
            label: 'Room',
            url: `/rooms/${currentRoomID}`,
            value: getTabValue('Room'),
            disabled: false,
          },
        ],
        'label'
      );
      setCurrentTabs(newTabs);
    } else {
      const tabs = currentTabs.filter((tab) => tab.label !== 'Room');
      const newTabs = uniqBy(tabs, 'label');
      setCurrentTabs(newTabs);
      dispatch(setIsHost(false));
    }
  }, [currentRoomID]);

  useEffect(() => {
    if (isWatchingHistory) {
      const tabs = currentTabs.map((tab) => {
        tab.disabled = true;
        return tab;
      });
      const newTabs = uniqBy(
        [
          ...tabs,
          {
            label: 'Watching History',
            url: `/watching-history/${historyID}`,
            value: getTabValue('Watching History'),
            disabled: false,
          },
        ],
        'label'
      );
      setCurrentTabs(newTabs);
    } else {
      let tabs = currentTabs.filter((tab) => tab.label !== 'Watching History');
      tabs = tabs.map((tab) => {
        tab.disabled = false;
        return tab;
      });
      const newTabs = uniqBy(tabs, 'label');
      setCurrentTabs(newTabs);
    }
  }, [isWatchingHistory]);

  const renderUserInfo = () => {
    const mapUserInfo = userDTOToProp(currentUserInfo);
    const { username, photo } = mapUserInfo;

    return <UserInfo name={username} photo={photo} />;
  };

  const handleSwitchTheme = () => {
    dispatch(setDarkMode(!darkMode));
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          {currentTabs.map(({ label, value, disabled }, index) => {
            if (value === 0) {
              return (
                <Tab
                  key={index}
                  label={<Logo />}
                  {...a11yProps(value)}
                  disabled={disabled}
                />
              );
            } else {
              return (
                <Tab
                  key={index}
                  label={label}
                  {...a11yProps(value)}
                  disabled={disabled}
                />
              );
            }
          })}
        </Tabs>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ marginRight: 10 }}>
            {darkMode ? (
              <SunButton onClick={handleSwitchTheme} />
            ) : (
              <MoonButton onClick={handleSwitchTheme} />
            )}
          </div>
          {token && (
            <>
              {currentUserInfo && renderUserInfo()}
              <Dropdown
                onLogout={handleLogout}
                onSwitchTheme={handleSwitchTheme}
                darkMode={darkMode}
              />
            </>
          )}
        </div>
      </AppBar>
    </div>
  );
}

export default Header;
