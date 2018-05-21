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
        request: {
          pending: true,
          error: false
        }
      }
    ]
  };
}

export function removeChatHead (state, action) {
  return state.filter((chat, i) => i != action.payload);
}

export function checkedMessages (state, action) {
  return {
    ...state,
    chatHeads: state.chatHeads.map(chatHead => {
      if (chatHead.user.user_id == action.payload.user_id) {
        return {
          ...chatHead,
          chatMessages: [ ...action.payload.chatMessages ],
          request: {
            pending: false,
            error: false
          }
        };
      }

      return { ...chatHead };
    })
  };
}