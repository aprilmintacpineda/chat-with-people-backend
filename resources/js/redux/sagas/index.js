import { all } from 'redux-saga/effects';
import register from './register';

export default function* () {
  yield all([
    register()
  ]);
}