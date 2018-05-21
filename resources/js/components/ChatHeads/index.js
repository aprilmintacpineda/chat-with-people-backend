import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import UnexpectedError from '../UnexpectedError';
import chatActions from '../../redux/reducers/chat/actions';

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

    return <p>Body of chat head</p>;
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