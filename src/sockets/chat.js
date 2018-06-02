import Chat from './handlers/Chat';

export default [
  {
    event: 'sendChatMessage',
    handler: Chat.sendMessage
  },
  {
    event: 'seenChatMessages',
    handler: Chat.seenMessages
  },
  {
    event: 'iAmTyping',
    handler: Chat.iAmTyping
  }
];