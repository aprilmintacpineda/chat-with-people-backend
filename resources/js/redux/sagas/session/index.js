import { takeEvery } from 'redux-saga/effects';
import worker from './worker';
import actionTypes from '../../reducers/session/actionTypes';

export default function* () {
  yield takeEvery(actionTypes.getSession, worker);
}