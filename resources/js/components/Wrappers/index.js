import React from 'react';
import MessageBox from './MessageBox';
import Redirect from './Redirect';
import PropTypes from 'prop-types';

class Wrappers extends React.Component {
  render () {
    return (
      <MessageBox>
        <Redirect history={this.props.history}>
          {this.props.children}
        </Redirect>
      </MessageBox>
    );
  }
}

Wrappers.propTypes = {
  history: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired
};

export default Wrappers;