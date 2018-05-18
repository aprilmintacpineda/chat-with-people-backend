import { all } from 'redux-saga/effects';
import register from './register';
import verifyEmail from './verifyEmail';

export default function* () {
  yield all([
    register(),
    verifyEmail()
  ]);
}