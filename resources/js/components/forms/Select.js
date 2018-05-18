import React from 'react';
import PropTypes from 'prop-types';
import validator from 'smart-input-validator';
import Errors from './Errors';

class Select extends React.Component {
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
      <div className="input-select">
        <select onChange={this.handleChange} value={this.props.value}>
          {
            this.props.options.map((opt, i) =>
              <option key={i}>{opt}</option>
            )
          }
        </select>
        {errors}
      </div>
    );
  }
}

Select.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  validationRules: PropTypes.string,
  validationMessages: PropTypes.objectOf(PropTypes.string),
  errors: PropTypes.arrayOf(PropTypes.string),
  options: PropTypes.arrayOf(PropTypes.string)
};

Select.defaultProps = {
  value: '',
  onChange: null,
  disabled: false,
  validationRules: null,
  validationMessages: {},
  errors: null,
  options: []
};

export default Select;