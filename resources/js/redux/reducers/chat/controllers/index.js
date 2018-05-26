import actionTypes from '../actionTypes';
import { createChatHead, removeChatHead } from './chatHeads';
import { checkedMessages, editMessage, sendMessage } from './chatMessages';
import { toggleChatBody } from './chatBody';

export default {
  [actionTypes.createChatHead]: createChatHead,
  [actionTypes.removeChatHead]: removeChatHead,
  [actionTypes.checkedMessages]: checkedMessages,
  [actionTypes.toggleChatBody]: toggleChatBody,
  [actionTypes.editMessage]: editMessage,
  [actionTypes.sendMessage]: sendMessage
};