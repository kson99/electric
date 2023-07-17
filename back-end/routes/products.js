const express = require("express");
const productsModel = require("../models/products");
const router = express.Router();
const { MongoClient } = require("mongodb");
const { doc, setDoc } = require("firebase/firestore");
const mongo = require("mongodb");
const db = require("../firebase.setup");

const client = new MongoClient(process.env.ATLAS_URI);

router.get("/", async (req, res) => {
  try {
    const data = await client
      .db("Electric-E-commerse")
      .collection("products")
      .find()
      .toArray();

    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

router.post("/upload", async (req, res) => {
  const { title, description, price, category, properties, images } = req.body;

  const products = new productsModel({
    title,
    description,
    price,
    category,
    properties,
    images,
  });

  try {
    const result = await products.save();

    res.sendStatus(200);

    console.log(result);
  } catch (error) {
    console.log(error);
  }
});

router.put("/update", async (req, res) => {
  const { id, title, description, price, category, properties, images } =
    req.body;
  const query = { _id: new mongo.ObjectId(id) };

  try {
    const result = await client
      .db("Electric-E-commerse")
      .collection("products")
      .updateOne(query, {
        $set: {
          title,
          description,
          price,
          category,
          images: images,
          properties,
          updatedAt: Date.now(),
        },
      });

    res.sendStatus(200);

    console.log(result);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/delete", async (req, res) => {
  const { id } = req.body;
  const query = { _id: new mongo.ObjectId(id) };

  try {
    const result = await client
      .db("Electric-E-commerse")
      .collection("products")
      .deleteOne(query);

    console.log(result);

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
