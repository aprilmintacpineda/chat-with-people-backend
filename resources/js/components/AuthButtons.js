import React from 'react';
import { Link } from 'react-router-dom';

export default class AuthButton extends React.Component {
  render () {
    return (
      <div className="d-flex auth-buttons">
        <Link to="/auth/login">Sign in</Link>
        <Link to="/auth/register">Create Account</Link>
      </div>
    );
  }
}