import React from 'react';
import Home from '../../screens/Home';
import Wrappers from '../../components/Wrappers';

export default [
  {
    path: '/',
    exact: true,
    component: props => (
      <Wrappers {...props}>
        <Home {...props}/>
      </Wrappers>
    )
  }
];