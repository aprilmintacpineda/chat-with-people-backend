import actionTypes from '../actionTypes';
import { createChatHead, removeChatHead } from './chatHeads';
import {
  checkedMessages,
  editMessage,
  sendMessage,
  sendMessageSuccessful,
  sendMessageFailed,
  receivedMessage
} from './chatMessages';
import { toggleChatBody } from './chatBody';

export default {
  [actionTypes.createChatHead]: createChatHead,
  [actionTypes.removeChatHead]: removeChatHead,
  [actionTypes.checkedMessages]: checkedMessages,
  [actionTypes.toggleChatBody]: toggleChatBody,
  [actionTypes.editMessage]: editMessage,
  [actionTypes.sendMessage]: sendMessage,
  [actionTypes.sendMessageSuccessful]: sendMessageSuccessful,
  [actionTypes.sendMessageFailed]: sendMessageFailed,
  [actionTypes.receivedMessage]: receivedMessage
};