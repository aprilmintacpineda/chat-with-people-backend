import { all } from 'redux-saga/effects';
import register from './register';
import login from './login';
import verifyEmail from './verifyEmail';
import session from './session';

export default function* () {
  yield all([
    register(),
    verifyEmail(),
    login(),
    session()
  ]);
}