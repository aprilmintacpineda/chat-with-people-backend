import React from 'react';
import { connect } from 'react-redux';
import MessageBox from './MessageBox';
import Redirect from './Redirect';
import PropTypes from 'prop-types';
import Session from './Session';
import sessionActions from '../../redux/reducers/session/actions';

class Wrappers extends React.Component {
  componentDidMount () {
    if (this.props.socket && !this.props.sessionState.socket) {
      this.props.setSocket({
        payload: this.props.socket
      });
    }
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
  ...sessionActions
})(Wrappers);