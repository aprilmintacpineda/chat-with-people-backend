import React from 'react';
import { connect } from 'react-redux';
import MessageBox from './MessageBox';
import Redirect from './Redirect';
import PropTypes from 'prop-types';
import Session from './Session';
import sessionActions from '../../redux/reducers/session/actions';
import chatActions from '../../redux/reducers/chat/actions';

class Wrappers extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      shownDisconnectedNotification: false,
      shownReconnectedNotification: false,
      registeredSocketListeners: false
    };
  }

  componentDidMount () {
    new Audio('/public/chat-sound.mp3');

    if (this.props.socket && !this.props.sessionState.socket) {
      this.props.setSocket({
        payload: this.props.socket
      });
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.sessionState.socket) {
      if (!prevProps.sessionState.user && this.props.sessionState.user) this.userHasLoggedIn();

      if (!this.state.registeredSocketListeners) {
        this.setState({
          ...this.state,
          registeredSocketListeners: true
        }, () => {
          this.props.sessionState.socket.on('loggedIn', () => {
            if (!this.props.sessionState.socket.hasListeners('receivedChatMessage')) {
              this.props.sessionState.socket.on('receivedChatMessage', payload => {
                if (payload.user.user_id != this.props.sessionState.user.user_id) {
                  this.props.receivedMessage({
                    payload: { ...payload }
                  });
                  let chatSound = new Audio('/public/chat-sound.mp3');
                  chatSound.volume = 1;
                  chatSound.play();
                }
              });
            }

            if (!this.props.sessionState.socket.hasListeners('seenChatMessages')) {
              this.props.sessionState.socket.on('seenChatMessages', payload => {
                this.props.seenMessages({ payload });
              });
            }
          });

          this.props.sessionState.socket.on('disconnect', () => {
            if (!this.state.shownDisconnectedNotification) {
              this.setState({
                ...this.state,
                shownDisconnectedNotification: true,
                shownReconnectedNotification: false
              }, () => this.notifyUser('You have been disconnected.', 'Realtime chat and notifications won\'t work. Please check your internet connection.'));
            }
          });

          this.props.sessionState.socket.on('reconnect', () => {
            if (!this.state.shownReconnectedNotification) {
              this.setState({
                ...this.state,
                shownDisconnectedNotification: false
              }, () => {
                this.userHasLoggedIn();
                this.notifyUser('You have been reconnected.', 'Realtime chat and notifications are back.');
              });
            }
          });
        });
      }
    }
  }

  notifyUser = (title, body) => {
    if ('Notification' in window) {
      if (Notification.permission == 'granted') {
        this.createNotification(title, body);
      } else if (Notification.permission != 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission == 'granted') this.createNotification(title, body);
        });
      }
    }
  }

  createNotification = (title, body) => {
    new Notification(title, {
      icon: '/public/favicon/favicon-96x96.png',
      body
    });
  }

  userHasLoggedIn = () => {
    const token = localStorage.getItem('token');
    this.props.sessionState.socket.emit('login', { token });
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