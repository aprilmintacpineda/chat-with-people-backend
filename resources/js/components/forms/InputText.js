import React from 'react';
import PropTypes from 'prop-types';
import validator from 'smart-input-validator';
import Errors from './Errors';

class InputText extends React.Component {
  handleChange = changeEvent => {
    if (!this.props.disabled) {
      let errors = [];

      if (this.props.validationRules) {
        errors = validator({
          value: changeEvent.target.value
        }, {
          value: this.props.validationRules
        }, {
          value: { ...this.props.validationMessages }
        });
      }

      this.props.onChange({
        value: changeEvent.target.value,
        errors
      });
    }
  }

  render () {
    const errors = this.props.errors && this.props.errors.length? <Errors errors={this.props.errors} /> : null;

    return (
      <div className="input-text">
        <input
          placeholder={this.props.placeholder}
          type={this.props.secured? 'password' : 'text'}
          value={this.props.value}
          onChange={this.handleChange}
        />
        {errors}
      </div>
    );
  }
}

InputText.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
  secured: PropTypes.bool,
  validationRules: PropTypes.string,
  validationMessages: PropTypes.objectOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

InputText.defaultProps = {
  placeholder: '...',
  value: '',
  onChange: null,
  errors: null,
  secured: false,
  validationRules: null,
  validationMessages: {},
  disabled: false
};

export default InputText;