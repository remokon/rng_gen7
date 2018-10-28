import './style/nav-bar.css';
import React from 'react';
import { connect } from 'react-redux';
import { changeScreen, setNavBarState } from '../store/dispatchers';

export const NavBar = ({
  isNavBarOpen,
  setScreen,
  setNavBar,
}) => {
  const containerStyle = {
    boxShadow: 'none',
    width: isNavBarOpen ? '100%' : '0px',
  };
  const navBarStyle = {
    width: isNavBarOpen ? '240px' : '0px',
  };
  const navHeaderStyle = {
    backgroundColor: '#0277BD',
  };
  const setNav = toggle => setNavBar(toggle);

  return (
    <div className="nav-bar-container" style={containerStyle} onClick={() => setNav(false)}>
      <div className="nav-bar-container" style={navBarStyle}>
        <div className="nav-bar" style={{ ...navBarStyle, width: '240px' }}>
          <div className="nav-bar-header" style={navHeaderStyle}>
            Gen 7 RNG
          </div>
          <a onClick={() => setScreen({ name: 'main', title: 'Egg RNG' })}>Egg RNG</a>
          <a onClick={() => setScreen({ name: 'safeFrames', title: 'Timeline Safe Frame' })}>Timeline Safe Frame</a>
          <a onClick={() => setScreen({ name: 'mainRngEggPID', title: 'No MM/SC Egg PID' })}>No MM/SC Egg PID</a>
          <a onClick={() => setScreen({ name: 'stationary', title: 'Stationary RNG' })}>Stationary RNG</a>
          <a onClick={() => setScreen({ name: 'event', title: 'Event RNG' })}>Event RNG</a>
          <a onClick={() => setScreen({ name: 'stationaryPresets', title: 'Stationary Presets' })}>Stationary Presets</a>
        </div>
      </div>
    </div>
  );
};

export const NavBarContainer = connect(
  ({ isNavBarOpen }) => ({ isNavBarOpen }),
  {
    setScreen: changeScreen,
    setNavBar: setNavBarState
  }
)(NavBar);
