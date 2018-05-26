class ChatSocketHandler {
  sendMessage = (payload, users) => {
    console.log(payload, users);
  }
}

export default new ChatSocketHandler;