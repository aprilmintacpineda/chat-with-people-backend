import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import chatActions from '../../redux/reducers/chat/actions';

class ChatHeads extends React.Component {
  render () {
    return (
      <div className="chat-heads-wrapper">
        <p>Chat heads</p>
      </div>
    );
  }
}

ChatHeads.propTypes = {
  chatState: PropTypes.object.isRequired
};

export default connect(store => ({
  chatState: { ...store.chat }
}), {
  ...chatActions
})(ChatHeads);