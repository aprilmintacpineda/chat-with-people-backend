export function createChatHead (state, action) {
  let exists = false;
  let newChatHeads = state.chatHeads.map(chatHead => {
    if (chatHead.user.user_id != action.payload.user_id) return { ...chatHead };

    exists = true;
    return {
      ...chatHead,
      open: true
    };
  });

  if (exists) {
    return {
      ...state,
      chatHeads: [...newChatHeads]
    };
  }

  return {
    ...state,
    chatHeads: [
      ...state.chatHeads,
      {
        user: { ...action.payload.user },
        chatMessages: null,
        open: true,
        message: '',
        unseenChatMessagesCount: 0,
        typing: false,
        page: 1,
        request: {
          pending: true,
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

export function removeChatHead (state, action) {
  return {
    ...state,
    chatHeads: state.chatHeads.filter((chat, i) => i != action.payload)
  };
}

export function fetchOlderMessages (state, action) {
  return {
    ...state,
    chatHeads: state.chatHeads.map(chatHead => {
      if (chatHead.user.user_id != action.payload.user_id) return { ...chatHead };

      return {
        ...chatHead,
        request: {
          ...chatHead.request,
          olderMessages: {
            pending: true,
            error: false
          }
        }
      };
    })
  };
}

export function fetchedOlderMessages (state, action) {
  return {
    ...state,
    chatHeads: state.chatHeads.map(chatHead => {
      if (chatHead.user.user_id != action.payload.user_id) return { ...chatHead };

      return {
        ...chatHead,
        chatMessages: action.payload.chatMessages? [
          ...action.payload.chatMessages,
          ...chatHead.chatMessages
        ] : [...chatHead.chatMessages],
        page: action.payload.chatMessages? chatHead.page + 1 : chatHead.page,
        request: {
          ...chatHead.request,
          olderMessages: {
            pending: false,
            error: !action.payload.chatMessages
          }
        }
      };
    })
  };
}