const express = require("express");
const router = express.Router();
const CryptoJS = require("crypto-js");
var FormData = require("form-data");
const axios = require("axios");

const generateMD5 = (_data, secret = "secret") => {
  let array = [];
  Object.values(_data).map((value) => {
    array.push(value);
  });

  array.push(secret);
  const str = array.join("");

  return CryptoJS.MD5(str).toString();
};

router.post("/", async (req, res) => {
  const { amount } = req.body;

  const data = {
    PAYGATE_ID: "10011072130",
    REFERENCE: "pgtest_",
    AMOUNT: `${10000}`,
    CURRENCY: "ZAR",
    RETURN_URL: "https://b538-197-233-170-67.ngrok-free.app/check-out-status",
    TRANSACTION_DATE: `${new Date().toISOString()}`,
    LOCALE: "en-za",
    COUNTRY: "ZAF",
    EMAIL: "redgekson@gmail.com",
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

      console.log(fields);

      res.send(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

module.exports = router;
