import { call, put, select } from 'redux-saga/effects';
import axios from 'axios';
import { getLoginFields } from './selectors';
import sessionActions from '../../reducers/session/actions';
import loginActions from '../../reducers/login/actions';
import msgBoxActions from '../../reducers/messageBox/actions';
import redirectActions from '../../reducers/redirect/actions';

export default function* ({ payload }) {
  if (!payload.pending) {
    try {
      const loginFields = yield select(getLoginFields, [ 'submitError' ]);

      const { data } = yield call(axios.post, '/api/login', `
        query {
          loginUser (${loginFields}) {
            user_id,
            fullname,
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

      localStorage.setItem('token', data.data.loginUser.token);

      yield put(sessionActions.setSession({
        payload: {
          user: {
            user_id: data.data.loginUser.user_id,
            username: data.data.loginUser.username,
            sex: data.data.loginUser.sex,
            fullname: data.data.loginUser.fullname
          },
          checked: true
        }
      }));

      yield put(redirectActions.go({
        payload: {
          to: '/' + data.data.loginUser.username
        }
      }));

      yield put(loginActions.formSubmitted({
        payload: {
          success: true
        }
      }));
    } catch (e) {
      console.log(e);

      yield put(loginActions.formSubmitted());
      yield put(msgBoxActions.dialogue({
        payload: 'An unexpected error occured. Please try again.'
      }));
    }
  }
}