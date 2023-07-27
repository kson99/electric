const express = require("express");
const router = express.Router();
const settingsModel = require("../models/settings");
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.ATLAS_URI);

router.get("/", async (req, res) => {
  try {
    const data = await client
      .db("Electric-E-commerse")
      .collection("settings")
      .find()
      .toArray();

    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

router.post("/upload", async (req, res) => {
  const { featured1, featured2, shipping } = req.body;

  const settings = new settingsModel({
    featured1,
    featured2,
    shipping,
  });

  try {
    await settings.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
