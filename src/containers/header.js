import './style/header.css';
import React from 'react';
import NavBarMenuSVG from './nav-bar-menu.svg';
import { connect } from 'react-redux';
import { setNavBarState } from '../store/dispatchers';

export const HeaderBar = ({ screenTitle, setNavBar }) => {
  const headerStyle = {
    overflow: 'hidden',
    backgroundColor: '#2E68B4',
    color: '#FFFFFF'
  };

  return (
    <div className="header" style={headerStyle}>
      <img src={NavBarMenuSVG} className="header-item" onClick={() => setNavBar(true)} />
      <a className="header-item">{screenTitle}</a>
    </div>
  );
};

export const Header = connect(
  ({ screen }) => ({ screenTitle: screen.title }),
  {
    setNavBar: setNavBarState
  }
)(HeaderBar);
