import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FloatingMenu from '../components/FloatingMenu';
import ChatHeads from '../components/ChatHeads';
import sessionActions from '../redux/reducers/session/actions';

class Profile extends React.Component {
  render () {
    return (
      <div className="profile-page">
        <FloatingMenu />
        <ChatHeads />
        <h1>Welcome to your profile, {this.props.sessionState.user.fullname}!</h1>
        <h1>Welcome to your profile, {this.props.sessionState.user.fullname}!</h1>
        <h1>Welcome to your profile, {this.props.sessionState.user.fullname}!</h1>
        <h1>Welcome to your profile, {this.props.sessionState.user.fullname}!</h1>
        <h1>Welcome to your profile, {this.props.sessionState.user.fullname}!</h1>
        <h1>Welcome to your profile, {this.props.sessionState.user.fullname}!</h1>
        <h1>Welcome to your profile, {this.props.sessionState.user.fullname}!</h1>
        <h1>Welcome to your profile, {this.props.sessionState.user.fullname}!</h1>
        <h1>Welcome to your profile, {this.props.sessionState.user.fullname}!</h1>
        <h1>Welcome to your profile, {this.props.sessionState.user.fullname}!</h1>
        <h1>Welcome to your profile, {this.props.sessionState.user.fullname}!</h1>
        <h1>Welcome to your profile, {this.props.sessionState.user.fullname}!</h1>
        <h1>Welcome to your profile, {this.props.sessionState.user.fullname}!</h1>
        <h1>Welcome to your profile, {this.props.sessionState.user.fullname}!</h1>
        <h1>Welcome to your profile, {this.props.sessionState.user.fullname}!</h1>
        <h1>Welcome to your profile, {this.props.sessionState.user.fullname}!</h1>
        <h1>Welcome to your profile, {this.props.sessionState.user.fullname}!</h1>
        <h1>Welcome to your profile, {this.props.sessionState.user.fullname}!</h1>
        <h1>Welcome to your profile, {this.props.sessionState.user.fullname}!</h1>
        <h1>Welcome to your profile, {this.props.sessionState.user.fullname}!</h1>
        <h1>Welcome to your profile, {this.props.sessionState.user.fullname}!</h1>
        <h1>Welcome to your profile, {this.props.sessionState.user.fullname}!</h1>
        <h1>Welcome to your profile, {this.props.sessionState.user.fullname}!</h1>
        <h1>Welcome to your profile, {this.props.sessionState.user.fullname}!</h1>
        <h1>Welcome to your profile, {this.props.sessionState.user.fullname}!</h1>
        <h1>Welcome to your profile, {this.props.sessionState.user.fullname}!</h1>
        <h1>Welcome to your profile, {this.props.sessionState.user.fullname}!</h1>
        <h1>Welcome to your profile, {this.props.sessionState.user.fullname}!</h1>
      </div>
    );
  }
}

Profile.propTypes = {
  sessionState: PropTypes.object.isRequired
};

export default connect(store => ({
  sessionState: { ...store.session }
}), {
  ...sessionActions
})(Profile);