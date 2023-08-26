const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  price: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
  },

  images: [{ type: String, required: true }],

  properties: {
    type: Object,
  },

  reviews: [
    {
      type: Object,
    },
  ],

  imagesId: {
    type: String,
    required: true
  },

  updatedAt: {
    type: Number,
  },
});

const Products = mongoose.model("Products", ProductsSchema);
module.exports = Products;
