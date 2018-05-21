import { call, put, cancel } from 'redux-saga/effects';
import axios from 'axios';
import searchActions from '../../reducers/search/actions';

export default function* ({ payload }) {
  try {
    if (!payload.value.length) yield cancel();

    const token = localStorage.getItem('token');

    const { data } = yield call(axios.post, '/api', `
      query {
        searchUsers (searchString: "${payload.value}") {
          user_id,
          username,
          fullname
        }
      }
    `, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    yield put(searchActions.showResults({
      payload: data.data.searchUsers
    }));
  } catch (e) {
    yield put(searchActions.searchError());
  }
}