import React from "react";
import "./style/app.css";
import { connect } from "react-redux";
import { EggSettingsScreen } from "./egg-settings-screen";
import { StationarySettingsScreen } from "./stationary-settings-screen";
import { StationaryPresetsScreen } from "./stationary-presets-screen";
import { ResultsScreen } from "./results-screen";
import { SafeFrameScreen } from "./safe-frames-screen";
import { EggMainRNGPIDScreen } from "./egg-no-mmsc";
import { EventSettingsScreen } from "./event-settings-screen";
import { NavBarContainer } from "./nav-bar";
import { Header } from "./header";

const handleScreen = screenName => {
  switch (screenName) {
    case "main":
      return <EggSettingsScreen />;
    case "rngResults":
      return <ResultsScreen />;
    case "safeFrames":
      return <SafeFrameScreen />;
    case "mainRngEggPID":
      return <EggMainRNGPIDScreen />;
    case "stationary":
      return <StationarySettingsScreen />;
    case "event":
      return <EventSettingsScreen />;
    case "stationaryPresets":
      return <StationaryPresetsScreen />;
  }

  return <EggSettingsScreen />;
};

const App = ({ screenName }) => {
  return (
    <div>
      <Header />
      <NavBarContainer />
      <div className="App">{handleScreen(screenName)}</div>
    </div>
  );
};

export const AppContainer = connect(
  ({ screen }) => ({ screenName: screen.name }),
  {}
)(App);
