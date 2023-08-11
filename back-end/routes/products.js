const express = require("express");
const productsModel = require("../models/products");
const router = express.Router();
const { MongoClient } = require("mongodb");
const mongo = require("mongodb");

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
  const {
    title,
    description,
    price,
    category,
    properties,
    images,
    userId
  } = req.body;

  const products = new productsModel({
    title,
    description,
    price,
    category,
    properties,
    images
  });

  if (userId.toString() === process.env.USER_UID) {
    try {
      await products.save();

      res.sendStatus(200);
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("Invalid user");
    console.log("userId: ", userId);
    console.log("userUID: ", process.env.USER_UID);
    res.sendStatus(401);
  }
});

router.put("/update", async (req, res) => {
  const {
    id,
    title,
    description,
    price,
    category,
    properties,
    images,
    userId
  } = req.body;
  const query = { _id: new mongo.ObjectId(id) };

  if (userId === process.env.USER_UID) {
    try {
      await client
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
            updatedAt: Date.now()
          }
        });

      res.sendStatus(200);
    } catch (error) {
      console.log(error);
    }
  }
});

router.put("/review", async (req, res) => {
  const { id, reviews } = req.body;
  const query = { _id: new mongo.ObjectId(id) };

  try {
    await client
      .db("Electric-E-commerse")
      .collection("products")
      .updateOne(query, {
        $set: {
          reviews: reviews
        }
      });

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/delete", async (req, res) => {
  const { id, userId } = req.body;
  const query = { _id: new mongo.ObjectId(id) };

  if (userId === process.env.USER_UID) {
    try {
      await client
        .db("Electric-E-commerse")
        .collection("products")
        .deleteOne(query);

      res.sendStatus(200);
    } catch (error) {
      console.log(error);
    }
  }
});

module.exports = router;
