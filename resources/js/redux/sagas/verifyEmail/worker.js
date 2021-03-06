import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import registerActions from '../../reducers/register/actions';
import msgBoxActions from '../../reducers/messageBox/actions';
import redirectActions from '../../reducers/redirect/actions';

export default function* ({ payload }) {
  if (!payload.pending) {
    try {
      const { data } = yield call(axios.post, '/api/register', `
        mutation {
          verifyEmail (confirm_token: "${payload.confirm_token}") {
            result
          }
        }
      `);

      if (data.errors) throw new Error;

      yield put(redirectActions.go({
        payload: {
          to: '/auth/login'
        }
      }));

      yield put(msgBoxActions.dialogue({
        payload: 'Thank you for verifying your email address. You may now login with your account.'
      }));

      yield put(registerActions.formSubmitted({
        payload: {
          success: true
        }
      }));
    } catch (e) {
      yield put(registerActions.formSubmitted());
      yield put(msgBoxActions.dialogue({
        payload: 'An unexpected error occured. Please try again.'
      }));
    }
  }
}