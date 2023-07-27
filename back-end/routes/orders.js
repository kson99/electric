const express = require("express");
const router = express.Router();
const ordersModel = require("../models/orders");
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.ATLAS_URI);

router.get("/", async (req, res) => {
  try {
    const data = await client
      .db("Electric-E-commerse")
      .collection("orders")
      .find()
      .toArray();

    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

router.post("/upload", async (req, res) => {
  const { recipient, products, address, amount, contact } = req.body;
  console.log(req.body);

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
