import Chat from './handlers/Chat';

export default [
  {
    event: 'sendChatMessage',
    handler: Chat.sendMessage
  }
];