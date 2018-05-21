import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

class UnexpectedError extends React.Component {
  render () {
    return (
      <div className="unexpected-error">
        <p>An unexpected error occured. Please make sure that you are connected to the internet.</p>
        <a onClick={this.props.onClick}><Icon name="reload"/> Try again</a>
      </div>
    );
  }
}

UnexpectedError.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default UnexpectedError;