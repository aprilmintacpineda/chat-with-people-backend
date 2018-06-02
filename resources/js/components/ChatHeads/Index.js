import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TimeAgoJS from 'timeago.js';
import Icon from '../Icon';
import InputText from '../forms/InputText';
import UnexpectedError from '../UnexpectedError';
import { generateUID } from '../../Utils';
import ChatBody from './ChatBody';
import chatActions from '../../redux/reducers/chat/actions';

class ChatHeads extends React.Component {
  constructor (props) {
    super(props);

    this.chatInputFields = {};
    this.chatBodies = {};
  }

  componentDidMount () {
    this.watchSocketEvents();
  }

  componentDidUpdate (prevProps, nextProps) {
    this.props.chatState.chatHeads.forEach((chatHead, i) => {
      if (chatHead.shouldCheckMessages && !chatHead.request.pending) {
        this.props.checkMessages({
          payload: {
            user: { ...chatHead.user }
          }
        });
      }

      if (chatHead.open
        && (!prevProps.chatState.chatHeads[i] || !prevProps.chatState.chatHeads[i].open)) {
        this.seenMessage(chatHead);
      }
    });
  }

  watchSocketEvents = () => {
    if (!this.props.sessionState.socket) return;

    this.props.sessionState.socket.on('sendChatMessageSuccessful', payload => this.props.sendMessageSuccessful({
      payload
    }));

    this.props.sessionState.socket.on('otherUserIsTyping', payload => this.props.otherUserIsTyping({
      payload
    }));
  }

  iAmTyping = (chatHead, typing) => {
    this.props.sessionState.socket.emit('iAmTyping', {
      user_id: chatHead.user.user_id,
      typing,
      token: localStorage.getItem('token')
    });
  }

  seenMessage = chatHead => {
    this.props.sessionState.socket.emit('seenChatMessages', {
      user_id: chatHead.user.user_id,
      token: localStorage.getItem('token')
    });

    this.props.openedMessages({
      payload: {
        user_id: chatHead.user.user_id
      }
    });
  }

  sendMessage = (chatHead) => {
    this.chatBodies[chatHead.user.user_id].scrollChatBodyToBottom();

    this.iAmTyping(chatHead, false);

    const temp_id = generateUID(20);

    this.props.sendMessage({
      payload: {
        message: chatHead.message,
        user_id: chatHead.user.user_id,
        temp_id
      }
    });

    this.props.sessionState.socket.emit('sendChatMessage', {
      message: chatHead.message,
      user_id: chatHead.user.user_id,
      token: localStorage.getItem('token'),
      user: { ...this.props.sessionState.user },
      temp_id
    });
  }

  renderChatbody = chatHead => {
    if (chatHead.request.pending
      && (!chatHead.chatMessages || !chatHead.chatMessages.length)) {
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
                user: { ...chatHead.user }
              }
            })}
          />
        </div>
      );
    }

    const messages = chatHead.chatMessages && chatHead.chatMessages.length? chatHead.chatMessages.map((message, i) => {
      let seen_ago = null;
      let className = '';
      const timeAgo = TimeAgoJS();
      let timeLapsed = timeAgo.format(
        new Date(parseInt(message.created_at))
      );

      if (message.receiver_user_id == chatHead.user.user_id) {
        className += 'sent ';

        if (message.send_pending) {
          className += 'pending ';
          seen_ago = (
            <span>
              <Icon name="loading" /> Sending...
            </span>
          );
        } else if (!message.seen_at) {
          seen_ago = `${timeLapsed}`;
        } else {
          timeLapsed = timeAgo.format(
            new Date(parseInt(message.seen_at))
          );
          seen_ago = (
            <span>
              <Icon name="check-circled" /> Seen: {timeLapsed}
            </span>
          );
        }
      } else {
        className += 'received ';
        seen_ago = `${timeLapsed}`;
      }

      return (
        <div className={className.trim()} key={message.private_chat_id}>
          <div className="message-body">
            <p className="message">{message.body}</p>
          </div>
          <p className="seen-indicator">{seen_ago}</p>
        </div>
      );
    }) : <div className="loading"><p>There are no messages here.</p></div>;

    if (chatHead.chatMessages.length && chatHead.request.pending) {
      messages.push(
        <div key="loading-old-messages" className="loading-old-messages">
          <Icon name="loading" /> Loading older messages...
        </div>
      );
    }

    return (
      <div className="body-container" onClick={() => this.chatInputFields[chatHead.user.user_id].focus()}>
        <ChatBody
          ref={o => this.chatBodies[chatHead.user.user_id] = o}
          messages={messages}
          typing={chatHead.typing}
          onScroll={() => this.chatInputFields[chatHead.user.user_id].focus()}
          username={chatHead.user.username}
        />
        <div className="input-message">
          <div className="input" title="Type your message here">
            <InputText
              ref={o => this.chatInputFields[chatHead.user.user_id] = o}
              callOnFocusIfFocused={true}
              onFocus={() => this.seenMessage(chatHead)}
              placeholder="Enter : message. Shift + Enter : new line"
              value={chatHead.message}
              multiline={true}
              shouldBreakLine={event => event.shiftKey}
              onEnterKeyPress={() => {
                this.sendMessage(chatHead);
              }}
              onChange={({ value }) => {
                this.props.editMessage({
                  payload: {
                    value,
                    user_id: chatHead.user.user_id
                  }
                });

                this.iAmTyping(chatHead, value.length > 0);
              }}
            />
          </div>
          <a onClick={() => this.sendMessage(chatHead)} className="send" title="Click to send your message"><Icon name="send" /></a>
        </div>
      </div>
    );
  }

  renderChatHeads = () => {
    return this.props.chatState.chatHeads.map((chatHead, i) => {
      let chatBody = null;
      if (chatHead.open) {
        chatBody = (
          <div className="chat-head-wrapper">
            <span className="chat-body-arrow-down" />;
            <div className="body">
              {this.renderChatbody(chatHead)}
            </div>
          </div>
        );
      }

      let unseenChatMessagesCount = null;
      if (chatHead.unseenChatMessagesCount) {
        unseenChatMessagesCount = (
          <div className="unseen-chat-messages-count">
            {chatHead.unseenChatMessagesCount}
          </div>
        );
      }

      return (
        <div key={i} className="chat-head animate-grow">
          <div className="chat-head-container">
            <img
              onClick={() => this.props.toggleChatBody({ payload: i })}
              src="https://image.freepik.com/free-icon/male-user-shadow_318-34042.png"
              title={chatHead.user.fullname}
            />
            <div
              className="close-btn"
              title="Close this chat head"
              onClick={() => this.props.removeChatHead({ payload: i })}
            >
              <Icon name="close" />
            </div>
            {unseenChatMessagesCount}
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