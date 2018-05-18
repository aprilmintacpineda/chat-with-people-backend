import React from 'react';
import Login from '../../screens/Login';
import Register from '../../screens/Register';
import Wrappers from '../../components/Wrappers';

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
    path: '/auth/register',
    component: authRegisterComponent
  }
];