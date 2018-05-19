import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthButtons from '../components/AuthButtons';
import InputText from '../components/forms/InputText';
import Button from '../components/forms/Button';
import BlockLoading from '../components/BlockLoading';
import loginActions from '../redux/reducers/login/actions';

class Login extends React.Component {
  render () {
    if (this.props.loginState.request.pending) return <BlockLoading />;

    return (
      <div className="register">
        <AuthButtons />
        <div className="form-wrapper">
          <div className="form-body">
            <div className="field">
              <p>Your email:</p>
              <InputText
                placeholder="E.g. you_123@gmail.com"
                value={this.props.loginState.email.value}
                errors={this.props.loginState.email.errors}
                onChange={email => this.props.editEmail({
                  payload: { email }
                })}
                validationRules="required|email"
                validationMessages={{
                  _$all: 'Please enter your email.'
                }}
                disabled={this.props.loginState.request.pending}
              />
            </div>
            <div className="field">
              <p>Your password:</p>
              <InputText
                placeholder="E.g. ********"
                secured={true}
                value={this.props.loginState.password.value}
                errors={this.props.loginState.password.errors}
                onChange={password => this.props.editPassword({
                  payload: { password }
                })}
                validationRules="required"
                validationMessages={{
                  required: 'Please enter your password.'
                }}
                disabled={this.props.loginState.request.pending}
              />
            </div>
            <div className="field">
              <Button
                text="Sign in"
                errors={this.props.loginState.submitError}
                onClick={() => this.props.formSubmit({
                  payload: {
                    pending: this.props.loginState.request.pending
                  }
                })}
                loading={this.props.loginState.request.pending}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginState: PropTypes.object.isRequired,
  editEmail: PropTypes.func.isRequired,
  editPassword: PropTypes.func.isRequired,
  formSubmit: PropTypes.func.isRequired,
  formSubmitted: PropTypes.func.isRequired
};

export default connect(store => ({
  loginState: { ...store.login }
}), {
  ...loginActions
})(Login);