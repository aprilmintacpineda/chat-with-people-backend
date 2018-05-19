import React from 'react';
import Wrappers from '../../components/Wrappers';
import Home from '../../screens/Home';

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