import React from 'react';
import logo from "assets/images/logo-navigation.png";

function Logo() {
	return (
		<div style={{ display: "flex", alignItems: "center" }}>
    <img
      src={logo}
      alt="logo"
      style={{ width: 25, height: 25, marginRight: 10 }}
    />
    <span>Home</span>
  </div>
	);
}

export default Logo;