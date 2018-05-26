import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import routes from './routes';
import E404 from './screens/errors/E404';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers';
import createReduxSagaMiddleware from 'redux-saga';
import rootSaga from './redux/sagas';
import axios from 'axios';
import SocketIO from 'socket.io-client';

axios.interceptors.request.use(config => {
  return {
    ...config,
    headers: {
      ...config.headers,
      'Content-Type': 'application/graphql'
    }
  };
});

const reduxSagaMiddleware = createReduxSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(
  reduxSagaMiddleware
));
reduxSagaMiddleware.run(rootSaga);
const browserHistory = createBrowserHistory();
const io = SocketIO('http://localhost:3000');

export default class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Switch>
            {
              routes.map((route, i) =>
                <Route
                  key={i}
                  exact={route.exact || false}
                  path={route.path}
                  component={props => route.component({
                    ...props,
                    socket: io
                  })}
                />
              )
            }
            <Route component={E404} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}