import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import sessionActions from '../../../reducers/session/actions';

export default function* ({ payload }) {
  if (!payload.pending) {
    try {
      const { data } = yield call(axios.post, '/api', `
        query {
          getSession (token: "${payload.token}") {
            user_id,
            fullname,
            username,
            sex,
            token
          }
        }
      `, {
        headers: {
          Authorization: `Bearer ${payload.token}`
        }
      });

      if (data.errors) throw new Error;

      localStorage.setItem('token', data.data.getSession.token);

      yield put(sessionActions.setSession({
        payload: {
          user: {
            user_id: data.data.getSession.user_id,
            username: data.data.getSession.username,
            sex: data.data.getSession.sex,
            fullname: data.data.getSession.fullname
          },
          checked: true
        }
      }));

      yield put(sessionActions.clearRequest());
    } catch (e) {
      localStorage.clear();

      yield put(sessionActions.setSession({
        payload: {
          checked: true
        }
      }));
      yield put(sessionActions.clearRequest());
    }
  }
}