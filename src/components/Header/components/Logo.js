import React from 'react';
import logoLight from 'assets/images/logo-navigation.png';
import logoDark from 'assets/images/logo.png';
import { useSelector } from 'react-redux';

function Logo() {
  const { darkMode } = useSelector((state) => state.darkMode);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img
        src={darkMode ? logoDark : logoLight}
        alt="logo"
        style={{ width: 25, height: 25, marginRight: 10 }}
      />
      <span>Home</span>
    </div>
  );
}

export default Logo;
