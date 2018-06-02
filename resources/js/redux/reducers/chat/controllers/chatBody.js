export function toggleChatBody (state, action) {
  return {
    ...state,
    chatHeads: state.chatHeads.map((chatHead, i) => {
      if (i != action.payload) return { ...chatHead };

      return {
        ...chatHead,
        open: !chatHead.open
      };
    })
  };
}

export function otherUserIsTyping (state, action) {
  return {
    ...state,
    chatHeads: state.chatHeads.map(chatHead => {
      if (chatHead.user.user_id != action.payload.user_id) return { ...chatHead };

      return {
        ...chatHead,
        typing: action.payload.typing
      };
    })
  };
}