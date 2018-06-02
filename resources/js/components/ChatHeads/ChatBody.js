import React from 'react';
import PropTypes from 'prop-types';

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
          <p>{this.props.username} is typing...</p>
        </div>
      );
    }

    return (
      <div
        className="chat-messages-container"
        onScroll={() => {
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
  username: PropTypes.string.isRequired
};

ChatBody.defaultProps = {
  typing: false
};

export default ChatBody;