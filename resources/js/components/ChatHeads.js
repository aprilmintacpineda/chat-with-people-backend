import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from './Icon';
import InputText from './forms/InputText';
import UnexpectedError from './UnexpectedError';
import { generateUID } from '../Utils';
import chatActions from '../redux/reducers/chat/actions';

class ChatHeads extends React.Component {
  sendMessage = (message, user_id) => {
    const token = localStorage.getItem('token');
    const temp_id = generateUID(20);

    this.props.sendMessage({
      payload: {
        message,
        temp_id,
        user_id
      }
    });

    this.props.sessionState.socket.emit('sendChatMessage', { message, user_id, token });
  }

  renderChatbody = chatHead => {
    if (chatHead.request.pending) {
      return (
        <div className="loading">
          <Icon name="loading" />
        </div>
      );
    }

    if (!chatHead.chatMessages && chatHead.request.error) {
      return (
        <div className="loading">
          <UnexpectedError
            onClick={() => this.props.checkMessages({
              payload: {
                user_id: chatHead.user.user_id
              }
            })}
          />
        </div>
      );
    }

    const messages = chatHead.chatMessages.length? chatHead.chatMessages.map((message, i) => {
      let seen_ago = null;
      let className = '';

      if (message.send_pending) {
        seen_ago = (
          <span>
            <Icon name="loading" /> Sending...
          </span>
        );

        className = 'pending ';
      }

      if (message.receiver_user_id == chatHead.user.user_id) {
        className += 'sent ';
      } else {
        className += 'received ';
      }

      return (
        <div className={className.trim()} key={message.private_chat_id}>
          <p className="message">{message.body}</p>
          <p className="seen-indicator">{seen_ago}</p>
        </div>
      );
    }) : <div className="loading"><p>There are no messages here.</p></div>;

    return (
      <div className="body-container">
        <div className="chat-messages">{messages}</div>
        <div className="input-message">
          <div className="input" title="Type your message here">
            <InputText
              placeholder="Enter : message. Shift + Enter : new line"
              value={chatHead.message}
              multiline={true}
              shouldBreakLine={event => event.shiftKey}
              onEnterKeyPress={() => this.sendMessage(chatHead.message, chatHead.user.user_id)}
              onChange={({ value }) => this.props.editMessage({
                payload: {
                  value,
                  user_id: chatHead.user.user_id
                }
              })}
            />
          </div>
          <a className="send" title="Click to send your message"><Icon name="send" /></a>
        </div>
      </div>
    );
  }

  renderChatHeads = () => {
    return this.props.chatState.chatHeads.map((chatHead, i) => {
      let chatBody = null;

      if (chatHead.open) {
        chatBody = (
          <div>
            <span className="indicator" />
            <div className="body">
              {this.renderChatbody(chatHead)}
            </div>
          </div>
        );
      }

      return (
        <div key={i} className="chat-head animate-grow">
          <div className="chat-head-container">
            <img
              onClick={() => this.props.toggleChatBody({ payload: i })}
              src="/public/images/me.jpg"
              title={chatHead.user.fullname}
            />
            <div
              className="close-btn"
              title="Close this chat head"
              onClick={() => this.props.removeChatHead({ payload: i })}
            >
              <Icon name="close" />
            </div>
          </div>
          {chatBody}
        </div>
      );
    });
  }

  render () {
    return (
      <div className="chat-heads-wrapper">
        {this.renderChatHeads()}
      </div>
    );
  }
}

ChatHeads.propTypes = {
  chatState: PropTypes.object.isRequired,
  sessionState: PropTypes.object.isRequired,
  checkMessages: PropTypes.func.isRequired,
  toggleChatBody: PropTypes.func.isRequired,
  removeChatHead: PropTypes.func.isRequired,
  editMessage: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired
};

export default connect(store => ({
  chatState: { ...store.chat },
  sessionState: { ...store.session }
}), {
  ...chatActions
})(ChatHeads);