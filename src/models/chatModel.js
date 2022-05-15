import { Schema } from 'mongoose';

export const ChatsSchema = new Schema({
  timestamp: {
    type: String,
    required: true
  },
  messages: {
    type: Array,
    required: true,
    default: []
  }
})