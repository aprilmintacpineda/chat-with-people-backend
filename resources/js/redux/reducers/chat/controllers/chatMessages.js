export function checkedMessages (state, action) {
  return {
    ...state,
    chatHeads: state.chatHeads.map(chatHead => {
      if (chatHead.user.user_id == action.payload.user_id) {
        return {
          ...chatHead,
          chatMessages: action.payload.chatMessages? [ ...action.payload.chatMessages ] : null,
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