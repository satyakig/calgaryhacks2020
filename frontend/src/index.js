import 'core-js/stable'; // Polyfill only stable `core-js` features - ES and web standards. See https://github.com/zloirock/core-js
import 'react-app-polyfill/ie11'; //  See https://github.com/facebook/create-react-app/tree/master/packages/react-app-polyfill
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './components/App/App';
import combinedReducer from './redux/combinedReducer';
import * as serviceWorker from './serviceWorker';

const isDev = process.env.NODE_ENV === 'development';

const reducer = combinedReducer;

const loggerMiddleware = createLogger({
  collapsed: (getState, action, logEntry) => {
    return logEntry && !logEntry.error;
  },
  predicate: () => {
    return isDev;
  },
  duration: true,
  timestamp: false,
  diff: true,
});

const store = createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware));

const render = (Component) => {
  // eslint-disable-next-line react/no-render-return-value
  return ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter basename="">
        <Component />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
  );
};

render(App);

if (isDev && module.hot) {
  module.hot.accept('./components/App/App', () => {
    const NextApp = require('./components/App/App').default;
    render(NextApp);
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
