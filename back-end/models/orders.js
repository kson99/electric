const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema({
  recipient: {
    type: String,
    required: true,
  },

  address: {
    type: Object,
    required: true,
  },

  products: [
    {
      type: Object,
      required: true,
    },
  ],

  amount: { type: Number, required: true },

  date: { type: String, required: true },

  contact: {
    type: Object,
    required: true,
  },
});

const Orders = mongoose.model("Orders", OrdersSchema);

module.exports = Orders;
