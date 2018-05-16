import { takeEvery } from 'redux-saga/effects';
import actionTypes from '../../reducers/testReducer/actionTypes';
import worker from './worker';

export default function* () {
  yield takeEvery(actionTypes.testAction, worker);
}