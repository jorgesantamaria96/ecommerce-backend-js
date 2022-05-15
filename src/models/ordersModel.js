const { Schema } = require("mongoose");

const OrdersSchema = new Schema({
  timestamp: {
    type: String,
    required: true,
  },
  products: {
    type: Array,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "generated",
  },
  address: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.ObjectId,
    ref: "users",
  },
});

module.exports = { OrdersSchema };
