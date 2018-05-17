import React from 'react';
import MessageBox from './MessageBox';
import Redirect from './Redirect';

export default class Wrappers extends React.Component {
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