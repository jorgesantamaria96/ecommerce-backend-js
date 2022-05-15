const { Schema } = require("mongoose");

const UserSchema = new Schema({
  cart: {
    type: Schema.Types.ObjectId,
    ref: "carts",
  },
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    trim: true,
  },
  phone: {
    type: Number,
    trim: true,
    required: true,
  },
  avatar: {
    type: String,
    default: "batman.png",
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
  chat: {
    type: Schema.Types.ObjectId,
    ref: "chats",
  },
});

module.exports = { UserSchema };
