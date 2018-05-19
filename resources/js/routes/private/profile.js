import React from 'react';
import Wrappers from '../../components/Wrappers';
import LoggedIn from '../../components/LoggedIn';
import Profile from '../../screens/Profile';

const profileComponent = props => (
  <Wrappers {...props}>
    <LoggedIn>
      <Profile {...props}/>
    </LoggedIn>
  </Wrappers>
);

export default [
  {
    path: '/:username',
    exact: true,
    component: profileComponent
  }
];