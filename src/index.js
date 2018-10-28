import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import registerServiceWorker from './registerServiceWorker';
import { AppContainer } from './containers/app';
import { Provider } from 'react-redux';
import { store } from './store/store';

const Root = () => {
  return <Provider store={store}>
    <AppContainer />
  </Provider>;
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
