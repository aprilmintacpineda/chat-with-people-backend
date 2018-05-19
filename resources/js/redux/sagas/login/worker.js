import { call, put, select } from 'redux-saga/effects';
import axios from 'axios';
import { getLoginFields, getLoginRequestState } from './selectors';
import loginActions from '../../reducers/login/actions';
import msgBoxActions from '../../reducers/messageBox/actions';
import redirectActions from '../../reducers/redirect/actions';

export default function* (action) {
  if (!action.payload.pending) {
    try {
      const loginFields = yield select(getLoginFields, [ 'submitError' ]);

      const { data } = yield call(axios.post, '/api/login', `
        query {
          loginUser (${loginFields}) {
            fullname,
            user_id,
            username,
            sex,
            token
          }
        }
      `);

      if (data.errors) {
        yield put(loginActions.formSubmitted({
          payload: {
            fields: JSON.parse(data.errors[0])
          }
        }));
        return;
      }

      console.log('response', data);

      // yield put(redirectActions.go({
      //   payload: {
      //     to: '/auth/login'
      //   }
      // }));

      // yield put(msgBoxActions.dialogue({
      //   payload: 'Your account has been created. Please confirm your email address by following the instructions we sent to your inbox.'
      // }));

      // yield put(loginActions.formSubmitted({
      //   payload: {
      //     success: true
      //   }
      // }));
    } catch (e) {
      yield put(loginActions.formSubmitted());
      yield put(msgBoxActions.dialogue({
        payload: 'An unexpected error occured. Please try again.'
      }));
    }
  }
}