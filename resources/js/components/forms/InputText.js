import React from 'react';
import PropTypes from 'prop-types';
import Errors from './Errors';

class InputText extends React.Component {
  handleChange = changeEvent => {
    console.log(changeEvent.target.value);
  }

  render () {
    const errors = this.props.errors && this.props.errors.length? <Errors errors={this.props.errors} /> : null;

    return (
      <div className="">
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
  value: PropTypes.string,
  errors: PropTypes.arrayOf(PropTypes.string),
  secured: PropTypes.bool,
  validationRules: PropTypes.string,
  validationMessages: PropTypes.objectOf(PropTypes.string)
};

InputText.defaultProps = {
  placeholder: '...',
  value: '',
  errors: null,
  secured: false,
  validationRules: null,
  validationMessages: null
};

export default InputText;