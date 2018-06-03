import actionTypes from '../actionTypes';
import {
  createChatHead,
  removeChatHead,
  fetchOlderMessages,
  fetchedOlderMessages
} from './chatHeads';
import {
  checkMessages,
  checkedMessages,
  editMessage,
  sendMessage,
  sendMessageSuccessful,
  sendMessageFailed,
  receivedMessage,
  seenMessages,
  openedMessages
} from './chatMessages';
import { toggleChatBody, otherUserIsTyping } from './chatBody';

export default {
  [actionTypes.createChatHead]: createChatHead,
  [actionTypes.removeChatHead]: removeChatHead,
  [actionTypes.checkMessages]: checkMessages,
  [actionTypes.checkedMessages]: checkedMessages,
  [actionTypes.toggleChatBody]: toggleChatBody,
  [actionTypes.editMessage]: editMessage,
  [actionTypes.sendMessage]: sendMessage,
  [actionTypes.sendMessageSuccessful]: sendMessageSuccessful,
  [actionTypes.sendMessageFailed]: sendMessageFailed,
  [actionTypes.receivedMessage]: receivedMessage,
  [actionTypes.seenMessages]: seenMessages,
  [actionTypes.openedMessages]: openedMessages,
  [actionTypes.fetchOlderMessages]: fetchOlderMessages,
  [actionTypes.fetchedOlderMessages]: fetchedOlderMessages,
  [actionTypes.otherUserIsTyping]: otherUserIsTyping
};