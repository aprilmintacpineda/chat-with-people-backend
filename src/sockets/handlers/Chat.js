import { generateUID } from '../../Utils';

class ChatSocketHandler {
  sendMessage = (payload, users) => {
    const message = {
      private_chat_id: generateUID(20),
      receiver_user_id: payload.user_id,
      sender_user_id: payload.userData.user_id,
      body: payload.message,
      created_at: Date.now()
    }

    if (users[payload.userData.user_id]) {
      users[payload.userData.user_id].emit('sendChatMessageSuccessful', {
        message,
        temp_id: payload.temp_id
      });
    }

    if (users[payload.user_id]) {
      users[payload.user_id].emit('receivedChatMessage', {
        message,
        user: payload.user
      });
    }
  }
}

export default new ChatSocketHandler;