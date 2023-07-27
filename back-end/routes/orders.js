const express = require("express");
const router = express.Router();
const ordersModel = require("../models/orders");

router.post("/upload", async (req, res) => {
  const { recipient, products, address, amount, contact } = req.body;
  const orders = new ordersModel({
    recipient,
    products,
    address,
    amount,
    contact,
    date: new Date().toISOString(),
  });

  try {
    await orders.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
