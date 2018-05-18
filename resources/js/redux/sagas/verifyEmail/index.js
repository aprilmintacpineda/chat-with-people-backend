import { takeEvery } from 'redux-saga/effects';
import worker from './worker';
import actionTypes from '../../reducers/register/actionTypes';

export default function* () {
  yield takeEvery(actionTypes.verifyEmail, worker);
}