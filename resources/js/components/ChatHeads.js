import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from './Icon';
import InputText from './forms/InputText';
import UnexpectedError from './UnexpectedError';
import chatActions from '../redux/reducers/chat/actions';

class ChatHeads extends React.Component {
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
      const seen_ago = 'Seen: 15 minutes ago';

      if (message.receiver_user_id == chatHead.user.user_id) {
        return (
          <div className="sent" key={message.private_chat_id}>
            <p className="message">{message.body}</p>
            <p className="seen-indicator">{seen_ago}</p>
          </div>
        );
      }

      return (
        <div className="received" key={message.private_chat_id}>
          <p className="message">{message.body}</p>
          <p className="seen-indicator">{seen_ago}</p>
        </div>
      );
    }) : <div className="loading"><p>There are no messages here.</p></div>;

    return (
      <div className="body-container">
        <div className="chat-messages">{messages}</div>
        <div className="input-message">
          <div className="input">
            <InputText
              placeholder="Your message..."
              value=""
              onChange={({ value }) => console.log(value)}
            />
          </div>
          <a className="send"><Icon name="send" /></a>
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
              src="https://avatars1.githubusercontent.com/u/21032419?s=400&u=a2b67668181c7fd4220bc2be2f74e2e9cfd8a721&v=4"
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
  checkMessages: PropTypes.func.isRequired,
  toggleChatBody: PropTypes.func.isRequired,
  removeChatHead: PropTypes.func.isRequired
};

export default connect(store => ({
  chatState: { ...store.chat }
}), {
  ...chatActions
})(ChatHeads);