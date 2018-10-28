import React from 'react';
import { connect } from 'react-redux';
import NavBarMenuSVG from '../img/nav-bar-menu.svg';
import { setNavBarState } from '../store/dispatchers';

export const HeaderBar = ({ screenTitle, setNavBar }) => {
  return (
    <div className="header">
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
