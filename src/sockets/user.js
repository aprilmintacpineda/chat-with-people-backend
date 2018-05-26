import User from './handlers/User';

export default [
  {
    event: 'login',
    handler: User.login
  }
];