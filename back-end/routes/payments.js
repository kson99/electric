const express = require("express");
const router = express.Router();
const CryptoJS = require("crypto-js");
const axios = require("axios");
const { auth } = require("firebase-admin");

const generateMD5 = (obj, secret = "secret") => {
  let str = Object.values(obj).join("") + secret;

  console.log(str);

  return CryptoJS.MD5(str).toString();
};

router.post("/", async (req, res) => {
  let data = {
    PAYGATE_ID: 10011072130,
    REFERENCE: "pgtest_",
    AMOUNT: 1000,
    CURRENCY: "ZAR",
    RETURN_URL: "https://my.return.url/page",
    TRANSACTION_DATE: "2020-01-01 12:00:00",
    LOCALE: "en-za",
    COUNTRY: "ZAF",
    EMAIL: "customer@paygate.co.za",
    CHECKSUM: "70d374e4b18222ba814e30c4661c16eb",
  };

  await axios
    .post("https://secure.paygate.co.za/payweb3/initiate.trans", { ...data })
    .then((resp) => {
      res.send(resp.data);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
