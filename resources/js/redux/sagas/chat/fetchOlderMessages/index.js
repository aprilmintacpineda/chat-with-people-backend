import { takeEvery } from 'redux-saga/effects';
import actionTypes from '../../../reducers/chat/actionTypes';
import worker from './worker';

export default function* () {
  yield takeEvery(actionTypes.fetchOlderMessages, worker);
}