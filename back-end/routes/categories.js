const express = require("express");
const categoriesModel = require("../models/categories");
const router = express.Router();
const { MongoClient } = require("mongodb");
const mongo = require("mongodb");

const client = new MongoClient(process.env.ATLAS_URI);

router.get("/", async (req, res) => {
  try {
    const data = await client
      .db("Electric-E-commerse")
      .collection("categories")
      .find()
      .toArray();

    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

router.post("/upload", async (req, res) => {
  const { name, parent, properties, userId } = req.body;
  const categories = new categoriesModel({ name, parent, properties });

  if (userId === process.env.USER_UID) {
    try {
      await categories.save();
      res.send(200);
    } catch (error) {
      console.log(err);
    }
  } else {
    res.sendStatus(401);
  }
});

router.put("/update", async (req, res) => {
  const { name, parent, properties, id, userId } = req.body;
  const query = { _id: new mongo.ObjectId(id) };

  if (userId === process.env.USER_UID) {
    try {
      await client
        .db("Electric-E-commerse")
        .collection("categories")
        .updateOne(query, { $set: { name, parent, properties } });

      res.sendStatus(200);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.sendStatus(401);
  }
});

router.delete("/delete", async (req, res) => {
  const { id, userId } = req.body;
  const query = { _id: new mongo.ObjectId(id) };

  if (userId === process.env.USER_UID) {
    try {
      await client
        .db("Electric-E-commerse")
        .collection("categories")
        .deleteOne(query);

      res.sendStatus(200);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
