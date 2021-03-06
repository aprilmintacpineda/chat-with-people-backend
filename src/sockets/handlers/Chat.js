import { generateUID } from '../../Utils';
import { sequelize } from '../../models';

class ChatSocketHandler {
  sendMessage = (payload, users) => {
    const message = {
      private_chat_id: generateUID(20),
      receiver_user_id: payload.user_id,
      sender_user_id: payload.userData.user_id,
      body: payload.message,
      created_at: Date.now()
    };

    return sequelize.query(`
      insert into private_chat (private_chat_id, receiver_user_id, sender_user_id, body, created_at)
      values (:private_chat_id, :receiver_user_id, :sender_user_id, :body, :created_at)
    `, {
      replacements: { ...message },
      type: sequelize.QueryTypes.INSERT
    })
    .then(() => {
      if (users[payload.userData.user_id]) {
        users[payload.userData.user_id].emit('sendChatMessageSuccessful', {
          message,
          temp_id: payload.temp_id,
          user_id: payload.user_id
        });
      }

      if (users[payload.user_id]) {
        users[payload.user_id].emit('receivedChatMessage', {
          message,
          user: payload.user
        });
      }
    });
  }

  seenMessages = (payload, users) => {
    const seen_at = Date.now();

    return sequelize.query(`
      update private_chat set seen_at = :seen_at where seen_at is null and receiver_user_id = :receiver_user_id and sender_user_id = :sender_user_id
    `, {
      replacements: {
        seen_at,
        receiver_user_id: payload.userData.user_id,
        sender_user_id: payload.user_id
      },
      type: sequelize.QueryTypes.UPDATE
    })
    .then(() => {
      if (users[payload.user_id]) {
        users[payload.user_id].emit('seenChatMessages', {
          seen_at,
          user_id: payload.userData.user_id
        });
      }
    });
  }

  iAmTyping = (payload, users) => {
    if (users[payload.user_id] && payload.user_id != payload.userData.user_id) {
      users[payload.user_id].emit('otherUserIsTyping', {
        user_id: payload.userData.user_id,
        typing: payload.typing
      });
    }
  }
}

export default new ChatSocketHandler;