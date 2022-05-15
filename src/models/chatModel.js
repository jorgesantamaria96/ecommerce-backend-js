const { Schema } = require("mongoose");

const ChatsSchema = new Schema({
  timestamp: {
    type: String,
    required: true,
  },
  messages: {
    type: Array,
    required: true,
    default: [],
  },
});

module.exports = { ChatsSchema };
