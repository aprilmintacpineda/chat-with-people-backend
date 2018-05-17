import React from 'react';
import Login from '../../screens/Login';
import Register from '../../screens/Register';
import Wrappers from '../../components/Wrappers';

export default [
  {
    path: '/auth/login',
    component: props => (
      <Wrappers {...props}>
        <Login {...props} />
      </Wrappers>
    )
  },
  {
    path: '/auth/register',
    component: props => (
      <Wrappers {...props}>
        <Register {...props} />
      </Wrappers>
    )
  }
];