import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import msgBoxActions from '../../redux/reducers/messageBox/actions';
import Button from '../forms/Button';

class MessageBox extends React.Component {
  componentDidUpdate () {
    if (this.props.msgBoxState.message) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }

  render () {
    let messageBox = null;

    if (this.props.msgBoxState.message) {
      switch (this.props.msgBoxState.type) {
        case 'dialogue':
          messageBox = (
            <div key={1} className="message-box-wrapper">
              <div className="overlay animate-shoot-down">
                <p>{this.props.msgBoxState.message}</p>
                <div className="buttons">
                  <Button
                    text="OK"
                    onClick={this.props.flushMessage}
                  />
                </div>
              </div>
            </div>
          );
        break;
      }
    }

    return (
      <div>
        {messageBox}
        {this.props.children}
      </div>
    );
  }
}

MessageBox.propTypes = {
  msgBoxState: PropTypes.object.isRequired,
  flushMessage: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  dialogue: PropTypes.func.isRequired
};

export default connect(store => ({
  msgBoxState: { ...store.messageBox }
}), {
  ...msgBoxActions
})(MessageBox);