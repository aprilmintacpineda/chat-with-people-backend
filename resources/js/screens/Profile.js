import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import sessionActions from '../redux/reducers/session/actions';

class Profile extends React.Component {
  render () {
    return (
      <h1>Welcome to your profile, {this.props.sessionState.user.fullname}!</h1>
    );
  }
}

Profile.propTypes = {
  sessionState: PropTypes.object.isRequired,
  setSession: PropTypes.func.isRequired,
  clearSession: PropTypes.func.isRequired,
  getSession: PropTypes.func.isRequired
};

export default connect(store => ({
  sessionState: { ...store.session }
}), {
  ...sessionActions
})(Profile);