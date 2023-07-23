const mongoose = require("mongoose");

const PaygateQuerySchema = new mongoose.Schema({
  queryData: {
    type: Object,
  },
});

const PaygateQuery = mongoose.model("PaygateQuery", PaygateQuerySchema);
module.exports = PaygateQuery;
