const { Schema } = require("mongoose");

const CartsSchema = new Schema({
  products: {
    type: Array,
    ref: "products",
  },
  quantity: {
    type: Number,
    default: 1,
  },
  user: {
    type: String,
  },
  priceCart: {
    type: Number,
  },
  timestamp: {
    type: String,
    required: true,
  },
});

module.exports = { CartsSchema };
