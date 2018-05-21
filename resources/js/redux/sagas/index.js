import { all } from 'redux-saga/effects';
import register from './register';
import login from './login';
import search from './search';
import verifyEmail from './verifyEmail';
import getSession from './session/getSession';
import createChatHead from './chat/createChatHead';

export default function* () {
  yield all([
    register(),
    verifyEmail(),
    login(),
    getSession(),
    search(),
    createChatHead()
  ]);
}