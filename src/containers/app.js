// import { SafeFrameScreen } from './safe-frames-screen';
// import { EggMainRNGPIDScreen } from './egg-no-mmsc';
// import { EventSettingsScreen } from './event-settings-screen';
// import { NavBarContainer } from './nav-bar';
// import { Header } from './header';
import { Layout, Menu } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import EggSettingsScreen from './egg-settings-screen';
// import { StationarySettingsScreen } from './stationary-settings-screen';
// import { StationaryPresetsScreen } from './stationary-presets-screen';
import { ResultsScreen } from './results-screen';
const { Header, Content, Footer } = Layout;

const handleScreen = screenName => {
  switch (screenName) {
    case 'main':
      return <EggSettingsScreen />;
    case 'rngResults':
      return <ResultsScreen />;
  }
  return <EggSettingsScreen />;
};

class App extends Component {
  render() {
    return (
      <Layout className="layout">
        <Header>
          <div className="logo">7rng</div>
          <Menu mode="horizontal" defaultSelectedKeys={['1']} style={{ lineHeight: '64px' }}>
            <Menu.Item key="1"> Egg RNG</Menu.Item>
            <Menu.Item key="2">Lorem ipsum</Menu.Item>
            <Menu.Item key="3">Lorem ipsum</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 24px' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: '100vh' }}>
            <div className="App">{handleScreen(this.props.screenName)}</div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>ロトム Co. ©2018</Footer>
      </Layout>
    );
  }
}

export const AppContainer = connect(
  ({ screen }) => ({ screenName: screen.name }),
  {}
)(App);
