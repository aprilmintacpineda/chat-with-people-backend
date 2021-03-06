import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import UnexpectedError from '../UnexpectedError';

class ChatBody extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      hasScrolled: false
    };
  }

  componentDidMount () {
    this.scrollChatBodyToBottom();
  }

  componentDidUpdate (prevProps, prevState) {
    if (!prevState.hasScrolled) {
      this.scrollChatBodyToBottom();
    }
  }

  scrollChatBodyToBottom = () => {
    this.chatBody.scrollTo(0, this.chatBody.scrollHeight);
  }

  render () {
    let typing = null;
    if (this.props.typing) {
      typing = (
        <div className="is-typing">
          <p>{this.props.chatHead.user.username} is typing...</p>
        </div>
      );
    }

    let fetchingOlderMessages = null;
    if (this.props.chatHead.request.olderMessages.pending) {
      fetchingOlderMessages = (
        <div className="loading-old-messages">
          <Icon name="loading" />
        </div>
      );
    } else if (this.props.chatHead.request.olderMessages.error) {
      fetchingOlderMessages = (
        <div className="loading-old-messages">
          <UnexpectedError
            onClick={() => this.props.fetchOlderMessages({
              payload: {
                user_id: this.props.chatHead.user.user_id,
                page: this.props.chatHead.page
              }
            })}
          />
        </div>
      );
    }

    return (
      <div
        className="chat-messages-container"
        onScroll={() => {
          if (this.chatBody.scrollTop == 0) {
            this.props.fetchOlderMessages({
              payload: {
                user_id: this.props.chatHead.user.user_id,
                page: this.props.chatHead.page
              }
            });
          }

          if (this.chatBody.scrollHeight - this.chatBody.scrollTop == this.chatBody.clientHeight) {
            this.setState({
              hasScrolled: false
            });
          } else {
            this.setState({
              hasScrolled: true
            });
          }

          this.props.onScroll();
        }}
        ref={o => this.chatBody = o}
      >
        {fetchingOlderMessages}
        {this.props.messages}
        {typing}
      </div>
    );
  }
}

ChatBody.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.element).isRequired,
  typing: PropTypes.bool,
  onScroll: PropTypes.func.isRequired,
  chatHead: PropTypes.object.isRequired,
  fetchOlderMessages: PropTypes.func.isRequired
};

ChatBody.defaultProps = {
  typing: false
};

export default ChatBody;