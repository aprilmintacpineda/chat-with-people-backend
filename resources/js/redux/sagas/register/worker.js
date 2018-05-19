import { call, put, select } from 'redux-saga/effects';
import axios from 'axios';
import { getRegisterFields } from './selectors';
import registerActions from '../../reducers/register/actions';
import msgBoxActions from '../../reducers/messageBox/actions';
import redirectActions from '../../reducers/redirect/actions';

export default function* (action) {
  if (!action.payload.pending) {
    try {
      const registerFields = yield select(getRegisterFields);

      const { data } = yield call(axios.post, '/api/register', `
        mutation {
          registerUser (${registerFields}) {
            result
          }
        }
      `);

      if (data.errors) {
        yield put(registerActions.formSubmitted({
          payload: {
            fields: JSON.parse(data.errors)
          }
        }));
        return;
      }

      yield put(msgBoxActions.dialogue({
        payload: 'Your account has been created. Please confirm your email address by following the instructions we sent to your inbox.'
      }));

      yield put(redirectActions.go({
        payload: {
          to: '/auth/login'
        }
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