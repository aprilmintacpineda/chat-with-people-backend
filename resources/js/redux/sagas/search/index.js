import { takeLatest } from 'redux-saga/effects';
import actionTypes from '../../reducers/search/actionTypes';
import worker from './worker';

export default function* () {
  yield takeLatest(actionTypes.editSearchString, worker);
}