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