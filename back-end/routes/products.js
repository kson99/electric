const express = require("express");
const productsModel = require("../models/products");
const router = express.Router();
const { MongoClient } = require("mongodb");
const mongo = require("mongodb");
const storage = require("../firebase.setup")
const uuid = require('uuid-v4')

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

  let _images = [];
  const imagesId = Date.now();

  await Promise.all(
    images.map(async (img, index) => {
      if(img.includes("https")){
        _images.push(img);
      }
      else{
        try {
          let type = img.split("/")[1].split(";")[0];
          const buffer = Buffer.from(img.split(",")[1], "base64");

          await storage.file(`products/${imagesId}/${index}.${type}`).save(buffer);

          const [url] = await storage.file(`products/${imagesId}/${index}.${type}`).getSignedUrl({
            action: "read",
            expires: "03-01-2500"
          })

          _images.push(url);

        } catch (error) {
          console.log(error);
        }
      }
    })
  )

  const products = new productsModel({
    title,
    description,
    price,
    category,
    properties,
    images: _images,
    imagesId
  });

  if (userId === process.env.USER_UID) {
    try {
      await products.save();

      res.sendStatus(200);
    } catch (error) {
      console.log(error);
    }
  } else {
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
    imagesId,
    userId
  } = req.body;
  const query = { _id: new mongo.ObjectId(id) };

  if (userId === process.env.USER_UID) {
    let _images = []

    await Promise.all(
      images.map(async (img, index) => {
        if (img.includes('https')){
          _images.push(img)
        }
        else{
          try {
            let type = img.split("/")[1].split(";")[0];
          const buffer = Buffer.from(img.split(",")[1], "base64");

          await storage.file(`products/${imagesId}/${index}.${type}`).save(buffer);

          const [url] = await storage.file(`products/${imagesId}/${index}.${type}`).getSignedUrl({
            action: "read",
            expires: "03-01-2500"
          })

          _images.push(url);
          } catch (error) {
            console.log(error);
          }
        }
      })
    )

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
            images: _images,
            properties,
            updatedAt: Date.now()
          }
        });

      res.sendStatus(200);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.sendStatus(401);
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
  const { id, userId, imagesId } = req.body;
  const query = { _id: new mongo.ObjectId(id) };

  if (userId === process.env.USER_UID) {

    
    try {
      const [files] = await storage.getFiles({
        prefix: `products/${imagesId}`
      })

      const deletePromise = files.map(file => file.delete())
      await Promise.all(deletePromise);
      console.log('images deleted');
    } catch (error) {
      console.log(error);
    }

    try {
      await client
        .db("Electric-E-commerse")
        .collection("products")
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
