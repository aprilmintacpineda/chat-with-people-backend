import { takeEvery } from 'redux-saga/effects';
import actionTypes from '../../reducers/register/actionTypes';
import worker from './worker';

export default function* () {
  yield takeEvery(actionTypes.formSubmit, worker);
}