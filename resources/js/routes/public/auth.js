import React from 'react';
import Wrappers from '../../components/Wrappers';
import NotLoggedIn from '../../components/NotLoggedIn';
import Login from '../../screens/Login';
import Register from '../../screens/Register';

const authLoginComponent = props => (
  <Wrappers {...props}>
    <NotLoggedIn>
      <Login {...props} />
    </NotLoggedIn>
  </Wrappers>
);

const authRegisterComponent = props => (
  <Wrappers {...props}>
    <NotLoggedIn>
      <Register {...props} />
    </NotLoggedIn>
  </Wrappers>
);

export default [
  {
    path: '/auth/login',
    component: authLoginComponent
  },
  {
    path: '/auth/register/:confirm_token?',
    component: authRegisterComponent
  }
];