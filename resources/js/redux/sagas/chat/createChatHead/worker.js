import { put, call } from 'redux-saga/effects';
import axios from 'axios';
import chatActions from '../../../reducers/chat/actions';

export default function* ({ payload }) {
  try {
    const token = localStorage.getItem('token');

    const { data } = yield call(axios.post, '/api', `
      query {
        getMessages (user_id: "${payload.user.user_id}") {
          private_chat_id
          receiver_user_id
          sender_user_id
          body
          created_at
          seen_at
        }
      }
    `, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    yield put(chatActions.checkedMessages({
      payload: {
        user_id: payload.user.user_id,
        chatMessages: [...data.data.getMessages]
      }
    }));
  } catch (e) {
    yield put(chatActions.checkedMessages({
      payload: {
        user_id: payload.user.user_id
      }
    }));
  }
}