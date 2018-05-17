import { call, put, select } from 'redux-saga/effects';
import axios from 'axios';
import { getRegisterRequestState, getRegisterFields } from './selectors';

export default function* (payload) {
  const registerRequestState = yield select(getRegisterRequestState);

  if (!registerRequestState.pending) {
    try {
      const registerFields = yield select(getRegisterFields);

      console.log(`
      mutation {
        registerUser (${registerFields}) {
          user_id,
          username,
          fullname,
          sex
        }
      }
    `);

      const { data } = yield call(axios.post, '/api/login', `
        mutation {
          registerUser (${registerFields}) {
            user_id,
            username,
            fullname,
            sex
          }
        }
      `);
    } catch (e) {
      console.log(e);
    }
  }
}