import React from 'react';
import Home from '../../screens/Home';
import Wrappers from '../../components/Wrappers';

const homeComponent = props => (
  <Wrappers {...props}>
    <Home {...props}/>
  </Wrappers>
);

export default [
  {
    path: '/',
    exact: true,
    component: homeComponent
  }
];