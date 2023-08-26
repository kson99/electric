const express = require("express");
const router = express.Router();
const CryptoJS = require("crypto-js");
var FormData = require("form-data");
const axios = require("axios");
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.ATLAS_URI);

const generateMD5 = (_data, secret = "secret") => {
  let array = [];
  Object.values(_data).map((value) => {
    array.push(value);
  });

  array.push(secret);
  const str = array.join("");

  return CryptoJS.MD5(str).toString();
};

const getAmount = async (data) => {
  let amount = 0;
  let shipping = 0;

  const products = await client
    .db("Electric-E-commerse")
    .collection("products")
    .find()
    .toArray();

  const settings = await client
    .db("Electric-E-commerse")
    .collection("settings")
    .find()
    .toArray();

  shipping = settings[0].shipping * 1;

  Object.keys(data).forEach((key) => {
    products.map((product) => {
      if (product._id.toString() === key) {
        amount += product.price * 1 * (data[key].quantity * 1);
      }
    });
  });

  amount += shipping;

  return amount * 100;
};

router.post("/", async (req, res) => {
  const payData = req.body;

  const data = {
    PAYGATE_ID: "10011072130",
    REFERENCE: "pgtest_",
    AMOUNT: `${await getAmount(payData)}`,
    CURRENCY: "ZAR",
    RETURN_URL: "https://electric-nam.000webhostapp.com/check-out-status",
    TRANSACTION_DATE: `${new Date().toISOString()}`,
    LOCALE: "en-za",
    COUNTRY: "ZAF",
    EMAIL: `${payData.email}`,
  };
  data["CHECKSUM"] = `${generateMD5(data)}`;

  const formdata = new FormData();

  Object.keys(data).forEach((key) => {
    formdata.append(`${key}`, `${data[key]}`);
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://secure.paygate.co.za/payweb3/initiate.trans",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      ...formdata.getHeaders(),
    },
    data: formdata,
  };

  axios
    .request(config)
    .then((response) => {
      let fields = {};
      let resArray = response.data.split("&");

      resArray.forEach((field) => {
        let [key, value] = field.split("=");
        fields[key] = value;
      });

      res.send(fields);
    })
    .catch((err) => {
      console.log(err);
      // res.send(err);
    });
});

router.post("/status", async (req, res) => {
  const data = req.body;

  const formdata = new FormData();

  Object.keys(data).forEach((key) => {
    formdata.append(`${key}`, `${data[key]}`);
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://secure.paygate.co.za/payweb3/query.trans",
    headers: {
      ...formdata.getHeaders(),
    },
    data: formdata,
  };

  axios
    .request(config)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.log("Error occured: ", err);
    });
});

module.exports = router;
