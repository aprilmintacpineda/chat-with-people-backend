import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthButtons from '../components/AuthButtons';
import InputText from '../components/forms/InputText';
import Button from '../components/forms/Button';
import Select from '../components/forms/Select';
import BlockLoading from '../components/BlockLoading';
import registerActions from '../redux/reducers/register/actions';

class Register extends React.Component {
  componentDidMount () {
    if (this.props.match.params.confirm_token) {
      return this.props.verifyEmail({
        payload: {
          confirm_token: this.props.match.params.confirm_token
        }
      });
    }
  }

  render () {
    if (this.props.registerState.request.pending) return <BlockLoading />;

    return (
      <div className="register">
        <AuthButtons />
        <div className="form-wrapper">
          <div className="form-body">
            <div className="field">
              <p>Your full name</p>
              <InputText
                placeholder="E.g. April Mintac Pineda"
                value={this.props.registerState.fullname.value}
                errors={this.props.registerState.fullname.errors}
                onChange={fullname => this.props.editFullName({
                  payload: { fullname }
                })}
                validationRules="required|allowedChars:alphabets,spaces|between:2,70"
                validationMessages={{
                  _$all: 'Please enter your real full name.'
                }}
                disabled={this.props.registerState.request.pending}
              />
            </div>
            <div className="field">
              <p>Your sex</p>
              <Select
                options={[
                  '',
                  'Male',
                  'Female'
                ]}
                value={this.props.registerState.sex.value}
                errors={this.props.registerState.sex.errors}
                onChange={sex => this.props.editSex({
                  payload: { sex }
                })}
                validationRules="required|in:Male,Female"
                validationMessages={{
                  required: 'Please specify your sexual orientation.',
                  in: 'Please select a valid option from the menu.'
                }}
                disabled={this.props.registerState.request.pending}
              />
            </div>
            <div className="field">
              <p>Your desired username:</p>
              <InputText
                placeholder="E.g. aprilmintacpineda"
                value={this.props.registerState.username.value}
                errors={this.props.registerState.username.errors}
                onChange={username => this.props.editUsername({
                  payload: { username }
                })}
                validationRules="required|notRegex:/^(?![0-9_])[a-zA-Z0-9_]+(?<![_])$/|betweenLen:8,20"
                validationMessages={{
                  required: 'Please enter your desired username.',
                  betweenLen: 'Your username must be 8 to 20 characters long.',
                  notRegex: 'Your username must be composed of alphabets, numbers, and underscores. It must begin and end with an alphabet.'
                }}
                disabled={this.props.registerState.request.pending}
              />
            </div>
            <div className="field">
              <p>Your email:</p>
              <InputText
                placeholder="E.g. you_123@gmail.com"
                value={this.props.registerState.email.value}
                errors={this.props.registerState.email.errors}
                onChange={email => this.props.editEmail({
                  payload: { email }
                })}
                validationRules="required|email"
                validationMessages={{
                  _$all: 'Please enter your real email.'
                }}
                disabled={this.props.registerState.request.pending}
              />
            </div>
            <div className="field">
              <p>Your desired password:</p>
              <InputText
                placeholder="E.g. ********"
                secured={true}
                value={this.props.registerState.password.value}
                errors={this.props.registerState.password.errors}
                onChange={password => this.props.editPassword({
                  payload: { password }
                })}
                validationRules="required|minLen:8"
                validationMessages={{
                  required: 'Please enter your desired password.',
                  minLen: 'Your password is too short.'
                }}
                disabled={this.props.registerState.request.pending}
              />
            </div>
            <div className="field">
              <p>Re-type password above:</p>
              <InputText
                placeholder="E.g. ********"
                secured={true}
                value={this.props.registerState.repassword.value}
                errors={this.props.registerState.repassword.errors}
                onChange={repassword => this.props.editRepassword({
                  payload: { repassword }
                })}
                validationRules={`required|equals:${this.props.registerState.password.value}`}
                validationMessages={{
                  required: 'Please retype your password.',
                  equals: 'Your passwords do not match.'
                }}
                disabled={this.props.registerState.request.pending}
              />
            </div>
            <div className="field">
              <Button
                text="Create account"
                onClick={() => this.props.formSubmit({
                  payload: {
                    pending: this.props.registerState.request.pending
                  }
                })}
                loading={this.props.registerState.request.pending}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerState: PropTypes.object.isRequired,
  editFullName: PropTypes.func.isRequired,
  editSex: PropTypes.func.isRequired,
  editUsername: PropTypes.func.isRequired,
  editEmail: PropTypes.func.isRequired,
  editPassword: PropTypes.func.isRequired,
  editRepassword: PropTypes.func.isRequired,
  formSubmit: PropTypes.func.isRequired,
  verifyEmail: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

export default connect(store => ({
  registerState: { ...store.register }
}), {
  ...registerActions
})(Register);