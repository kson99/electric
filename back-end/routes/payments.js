const express = require("express");
const router = express.Router();
const CryptoJS = require("crypto-js");
// const { auth } = require("firebase-admin");

const generateMD5 = (formData, secret = "secret") => {
  //

  let array = [];
  for (let [name, value] of formData.entries()) {
    array.push(value);
  }

  array.push(secret);
  const str = array.join("");

  // console.log();

  // console.log(CryptoJS.MD5(str).toString());
  return CryptoJS.MD5(str).toString();
};

router.post("/", async (req, res) => {
  const { amount } = req.body;
  console.log(req.body);
  var formdata = new FormData();

  formdata.append("PAYGATE_ID", "10011072130");
  formdata.append("REFERENCE", "pgtest_");
  formdata.append("AMOUNT", `${amount * 100}`);
  formdata.append("CURRENCY", "ZAR");
  formdata.append("RETURN_URL", "http://localhost:5173/checkout-status");
  formdata.append("TRANSACTION_DATE", `${new Date().toISOString()}`);
  formdata.append("LOCALE", "en-za");
  formdata.append("COUNTRY", "ZAF");
  formdata.append("EMAIL", "redgekson@gmail.com");
  formdata.append("CHECKSUM", `${generateMD5(formdata)}`);

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  fetch("https://secure.paygate.co.za/payweb3/initiate.trans", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);

      res.send(result);
    })
    .catch((error) => console.log("error", error));
});

module.exports = router;
