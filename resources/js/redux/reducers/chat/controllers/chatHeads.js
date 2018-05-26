export function createChatHead (state, action) {
  let exists = false;
  let newChatHeads = state.chatHeads.map(chatHead => {
    if (chatHead.user.user_id == action.payload.user_id) {
      exists = true;
      return {
        ...chatHead,
        open: true
      };
    }

    return { ...chatHead };
  });

  if (exists) {
    return {
      ...state,
      chatHeads: [ ...newChatHeads ]
    };
  }

  return {
    ...state,
    chatHeads: [
      ...state.chatHeads,
      {
        user: { ...action.payload },
        chatMessages: null,
        open: true,
        message: '',
        request: {
          pending: true,
          error: false
        }
      }
    ]
  };
}

export function removeChatHead (state, action) {
  return {
    ...state,
    chatHeads: state.chatHeads.filter((chat, i) => i != action.payload)
  };
}