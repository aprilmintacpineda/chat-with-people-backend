import React from 'react';
import Wrappers from '../../components/Wrappers';
import Home from '../../screens/Home';
import NotLoggedIn from '../../components/NotLoggedIn';

const homeComponent = props => (
  <Wrappers {...props}>
    <NotLoggedIn>
      <Home {...props}/>
    </NotLoggedIn>
  </Wrappers>
);

export default [
  {
    path: '/',
    exact: true,
    component: homeComponent
  }
];