import React from 'react';
import AuthButtons from './partials/AuthButtons';
import InputText from '../components/forms/InputText';
import Button from '../components/forms/Button';

export default class Register extends React.Component {
  render () {
    return (
      <div className="register">
        <AuthButtons />
        <div className="form">
          <div>
            <div className="field">
              <p>Your full name</p>
              <InputText
                placeholder="E.g. April Mintac Pineda"
              />
            </div>
            <div className="field">
              <p>Your desired username:</p>
              <InputText
                placeholder="E.g. aprilmintacpineda"
              />
            </div>
            <div className="field">
              <p>Your email:</p>
              <InputText
                placeholder="E.g. you_123@gmail.com"
              />
            </div>
            <div className="field">
              <p>Your desired password:</p>
              <InputText
                placeholder="E.g. ********"
              />
            </div>
            <div className="field">
              <p>Re-type password above:</p>
              <InputText
                placeholder="E.g. ********"
              />
            </div>
            <div className="field">
              <p>Re-type password above:</p>
              <InputText
                placeholder="E.g. ********"
              />
            </div>
            <div className="field">
              <Button
                text="Create account"
                onClick={() => console.log('clicked!')}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}