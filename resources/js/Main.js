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

const reduxSagaMiddleware = createReduxSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(
  reduxSagaMiddleware
));
reduxSagaMiddleware.run(rootSaga);
const browserHistory = createBrowserHistory();

export default class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Switch>
            {
              routes.map((route, i) =>
                <Route key={i} exact={route.exact || false} path={route.path} component={route.component} />
              )
            }
            <Route component={E404} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}