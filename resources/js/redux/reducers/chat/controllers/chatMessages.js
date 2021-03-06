export function checkMessages (state, action) {
  return {
    ...state,
    chatHeads: state.chatHeads.map(chatHead => {
      if (chatHead.user.user_id != action.payload.user.user_id) return { ...chatHead };

      return {
        ...chatHead,
        request: {
          ...chatHead.request,
          pending: true,
          error: false
        }
      };
    })
  };
}

export function checkedMessages (state, action) {
  return {
    ...state,
    chatHeads: state.chatHeads.map(chatHead => {
      if (chatHead.user.user_id != action.payload.user_id) return { ...chatHead };

      return {
        ...chatHead,
        chatMessages: action.payload.chatMessages
        ? [...action.payload.chatMessages]
        : null,
        shouldCheckMessages: false,
        request: {
          ...chatHead.request,
          pending: false,
          error: !action.payload.chatMessages? true : false
        }
      };
    })
  };
}

export function editMessage (state, action) {
  return {
    ...state,
    chatHeads: state.chatHeads.map(chatHead => {
      if (chatHead.user.user_id != action.payload.user_id) return { ...chatHead };

      return {
        ...chatHead,
        message: action.payload.value
      };
    })
  };
}

export function receivedMessage (state, action) {
  let exists = false;
  let newState = {
    ...state,
    chatHeads: state.chatHeads.map(chatHead => {
      let unseenChatMessagesCount = 0;

      chatHead.chatMessages.forEach(chatMessage => {
        if (!chatMessage.seen_at) unseenChatMessagesCount++;
      });

      if (chatHead.user.user_id != action.payload.user.user_id) {
        return {
          ...chatHead,
          unseenChatMessagesCount
        };
      }

      exists = true;
      return {
        ...chatHead,
        unseenChatMessagesCount: chatHead.unseenChatMessagesCount + 1,
        message: '',
        chatMessages: [
          ...chatHead.chatMessages,
          { ...action.payload.message }
        ]
      };
    })
  };

  if (!exists) {
    newState = {
      ...state,
      chatHeads: [
        ...state.chatHeads,
        {
          user: { ...action.payload.user },
          chatMessages: [
            { ...action.payload.message }
          ],
          shouldCheckMessages: true,
          unseenChatMessagesCount: 1,
          message: '',
          request: {
            pending: false,
            error: false,
            olderMessages: {
              pending: false,
              error: false
            }
          }
        }
      ]
    };
  }

  return newState;
}

export function sendMessage (state, action) {
  return {
    ...state,
    chatHeads: state.chatHeads.map(chatHead => {
      if (chatHead.user.user_id != action.payload.user_id) return { ...chatHead };

      return {
        ...chatHead,
        message: '',
        chatMessages: [
          ...chatHead.chatMessages,
          {
            private_chat_id: action.payload.temp_id,
            receiver_user_id: action.payload.user_id,
            body: action.payload.message,
            created_at: Date.now(),
            send_pending: true,
            send_failed: false
          }
        ]
      };
    })
  };
}

export function sendMessageSuccessful (state, action) {
  return {
    ...state,
    chatHeads: state.chatHeads.map(chatHead => {
      if (chatHead.user.user_id != action.payload.user_id) return { ...chatHead };

      return {
        ...chatHead,
        message: '',
        chatMessages: chatHead.chatMessages.map(chatMessage => {
          if (chatMessage.private_chat_id != action.payload.temp_id) return { ...chatMessage };

          return {
            ...action.payload.message,
            send_pending: false,
            send_failed: false
          };
        })
      };
    })
  };
}

export function sendMessageFailed (state, action) {
  console.log('you have not handled the sendMessageFailed yet!');

  return {
    ...state,
    chatHeads: state.chatHeads.map(chatHead => {
      if (chatHead.user.user_id == action.payload.user_id) return { ...chatHead };

      return {
        ...chatHead,
        message: '',
        chatMessages: chatHead.chatMessages.map(chatMessage => {
          if (chatMessage.private_chat_id != action.payload.temp_id) return { ...chatMessage };

          return {
            ...chatMessage,
            send_pending: false,
            send_failed: true
          };
        })
      };
    })
  };
}

export function openedMessages (state, action) {
  return {
    ...state,
    chatHeads: state.chatHeads.map(chatHead => {
      if (chatHead.user.user_id != action.payload.user_id) return { ...chatHead };

      return {
        ...chatHead,
        unseenChatMessagesCount: 0
      };
    })
  };
}

export function seenMessages (state, action) {
  return {
    ...state,
    chatHeads: state.chatHeads.map(chatHead => {
      if (chatHead.user.user_id != action.payload.user_id || !chatHead.chatMessages) {
        return { ...chatHead };
      }

      return {
        ...chatHead,
        unseenChatMessagesCount: 0,
        message: '',
        chatMessages: chatHead.chatMessages.map(chatMessage => {
          if (chatMessage.seen_at) return { ...chatMessage };

          return {
            ...chatMessage,
            seen_at: action.payload.seen_at
          };
        })
      };
    })
  };
}