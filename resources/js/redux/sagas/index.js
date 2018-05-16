import { all } from 'redux-saga/effects';
import testSaga from './testSaga';

export default function* () {
  yield all([
    testSaga()
  ]);
}