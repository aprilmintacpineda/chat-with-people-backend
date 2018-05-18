import React from 'react';
import Wrappers from '../../components/Wrappers';
import Login from '../../screens/Login';
import Register from '../../screens/Register';

const authLoginComponent = props => (
  <Wrappers {...props}>
    <Login {...props} />
  </Wrappers>
);

const authRegisterComponent = props => (
  <Wrappers {...props}>
    <Register {...props} />
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