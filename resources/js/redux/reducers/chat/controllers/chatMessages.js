export function checkedMessages (state, action) {
  return {
    ...state,
    chatHeads: state.chatHeads.map(chatHead => {
      if (chatHead.user.user_id == action.payload.user_id) {
        return {
          ...chatHead,
          chatMessages: action.payload.chatMessages
          ? [ ...action.payload.chatMessages ]
          : null,
          request: {
            pending: false,
            error: !action.payload.chatMessages? true : false
          }
        };
      }

      return { ...chatHead };
    })
  };
}

export function editMessage (state, action) {
  return {
    ...state,
    chatHeads: state.chatHeads.map(chatHead => {
      if (chatHead.user.user_id == action.payload.user_id) {
        return {
          ...chatHead,
          message: action.payload.value
        };
      }

      return { ...chatHead };
    })
  }
}

export function sendMessage (state, action) {
  return {
    ...state,
    chatHeads: state.chatHeads.map(chatHead => {
      if (chatHead.user.user_id == action.payload.user_id) {
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
      }

      return { ...chatHead };
    })
  }
}