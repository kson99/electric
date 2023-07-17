const express = require("express");
const router = express.Router();
const CryptoJS = require("crypto-js");
const axios = require("axios");

const generateMD5 = (obj, secret = "secret") => {
  let str = "";
  for (let val in obj) {
    str += obj[val];
  }

  str += secret;

  return CryptoJS.MD5(str).toString();
};

const data = {
  PAYGATE_ID: 10011072130,
  REFERENCE: "pgtest_123456789",
  AMOUNT: 1000,
  CURRENCY: "ZAR",
  RETURN_URL: "https://my.return.url/page",
  TRANSACTION_DATE: new Date().toISOString(),
  LOCALE: "en-za",
  COUNTRY: "ZAF",
  EMAIL: "redgekson@gmail.com",
};

const CHECKSUM = generateMD5(data);
data["CHECKSUM"] = CHECKSUM;

router.post("/", async (req, res) => {
  axios
    .post("https://secure.paygate.co.za/payweb3/initiate.trans", data)
    .then((response) => {
      //   console.log("success");
      console.log(data);
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
