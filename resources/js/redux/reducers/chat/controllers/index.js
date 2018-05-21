import actionTypes from '../actionTypes';
import { createChatHead, removeChatHead, checkedMessages } from './chatHead';

export default {
  [actionTypes.createChatHead]: createChatHead,
  [actionTypes.removeChatHead]: removeChatHead,
  [actionTypes.checkedMessages]: checkedMessages
};