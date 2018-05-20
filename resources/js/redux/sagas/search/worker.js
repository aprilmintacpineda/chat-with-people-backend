import { call, put, cancel, cancelled } from 'redux-saga/effects';
import axios from 'axios';
import searchActions from '../../reducers/search/actions';
import actionTypes from '../../reducers/search/actionTypes';

export default function* (action) {
  try {
    if (!action.payload.value.length) yield cancel();

    const token = localStorage.getItem('token');

    const { data } = yield call(axios.post, '/api', `
      query {
        searchUsers (searchString: "${action.payload.value}") {
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