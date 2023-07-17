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

const data = {
  PAYGATE_ID: 10011072130,
  REFERENCE: "pgtest_123456789",
  AMOUNT: 3299,
  CURRENCY: "ZAR",
  RETURN_URL: "https://my.return.url/page",
  TRANSACTION_DATE: new Date().toISOString().replace("T", " ").split(".")[0],
  LOCALE: "en-za",
  COUNTRY: "ZAF",
  EMAIL: "customer@paygate.co.za",
};

const CHECKSUM = generateMD5(data);
data["CHECKSUM"] = CHECKSUM;

router.post("/", async (req, res) => {
  await axios
    .post("https://secure.paygate.co.za/payweb3/initiate.trans", data, {
      Headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      auth: {
        username: 10011072130,
        password: "secret",
      },
    })
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
