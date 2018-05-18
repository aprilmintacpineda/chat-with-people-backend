import React from 'react';
import PropTypes from 'prop-types';

class Errors extends React.Component {
  render () {
    if (!this.props.errors) return null;

    return (
      <ul className="error-messages">
        { this.props.errors.map((error, i) => <li key={i}>{error}</li>) }
      </ul>
    );
  }
}

Errors.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string).isRequired
};

Errors.defaultProps = {
  errors: null
};

export default Errors;