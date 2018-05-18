import React from 'react';
import PropTypes from 'prop-types';

class Errors extends React.Component {
  render () {
    if (!this.props.errors) return null;

    return (
      <div className="error-messages">
        { this.props.errors.map((error, i) => <p key={i}>{error}</p>) }
      </div>
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