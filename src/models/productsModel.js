import { Schema } from 'mongoose';

export const ProductsSchema = new Schema({

  timestamp: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String, 
    required: true
  },
  category: {
    type: String, 
    required: true
  },
  thumbnail: {
    type: String, 
    required: true
  },
  price: {
    type: Number, 
    required: true
  },
  stock: {
    type: Number, 
    required: true
  },
});