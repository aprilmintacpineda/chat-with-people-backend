import React from 'react';
import { connect } from 'react-redux';
import MessageBox from './MessageBox';
import Redirect from './Redirect';
import PropTypes from 'prop-types';
import Session from './Session';
import sessionActions from '../../redux/reducers/session/actions';
import chatActions from '../../redux/reducers/chat/actions';

class Wrappers extends React.Component {
  componentDidMount () {
    this.chatSound = new Audio('/public/chat-sound.mp3');

    if (this.props.socket && !this.props.sessionState.socket) {
      this.props.setSocket({
        payload: this.props.socket
      });
    }
  }

  componentDidUpdate (prevProps) {
    if (!prevProps.sessionState.user && this.props.sessionState.user) this.userHasLoggedIn();
  }

  userHasLoggedIn = () => {
    const token = localStorage.getItem('token');
    this.props.sessionState.socket.emit('login', { token });

    this.props.sessionState.socket.on('receivedChatMessage', payload => {
      if (payload.user.user_id != this.props.sessionState.user.user_id) {
        this.props.receivedMessage({
          payload: { ...payload }
        });
        this.chatSound.volume = 1;
        this.chatSound.play();
      }
    });

    this.props.sessionState.socket.on('seenChatMessages', payload => {
      this.props.seenMessages({ payload });
    });
  }

  render () {
    return (
      <Session>
        <MessageBox>
          <Redirect history={this.props.history}>
            {this.props.children}
          </Redirect>
        </MessageBox>
      </Session>
    );
  }
}

Wrappers.propTypes = {
  history: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired
};

export default connect(store => ({
  sessionState: { ...store.session }
}), {
  ...sessionActions,
  ...chatActions
})(Wrappers);