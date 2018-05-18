import React from 'react';
import PropTypes from 'prop-types';
import Errors from './Errors';

class Button extends React.Component {
  handleClick = () => {
    if (!this.props.loading) {
      this.props.onClick();
    }
  }

  render () {
    const errors = this.props.errors && this.props.errors.length? <Errors errors={this.props.errors} /> : null;

    return (
      <div className="input-button">
        <input
          className={this.props.type}
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
  type: PropTypes.string,
  errors: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

Button.defaultProps = {
  type: 'primary',
  text: 'Button',
  errors: null,
  onClick: null,
  loading: false
};

export default Button;