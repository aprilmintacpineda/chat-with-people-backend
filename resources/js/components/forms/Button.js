import React from 'react';
import PropTypes from 'prop-types';
import Errors from './Errors';

class Button extends React.Component {
  handleClick = changeEvent => {
    if (!this.props.loading) {
      this.props.onClick();
    }
  }

  render () {
    const errors = this.props.errors && this.props.errors.length? <Errors errors={this.props.errors} /> : null;

    return (
      <div className="">
        <input
          type="button"
          value={this.props.text}
          onClick={this.handleClick}
        />
        {errors}
      </div>
    );
  }
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

Button.defaultProps = {
  text: 'Button',
  errors: null,
  onClick: null,
  loading: false
};

export default Button;