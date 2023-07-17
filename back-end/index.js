const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

dotenv.config();

mongoose.connect(process.env.ATLAS_URI, {
  dbName: "Electric-E-commerse",
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const productsRoute = require("./routes/products");
const categoriesRoute = require("./routes/categories");
const payments = require("./routes/payments");

const app = express();

app.use(cors());
// app.use(express.json());
app.use(bodyParser.json({ limit: "500kb" }));

app.use("/products", productsRoute);
app.use("/categories", categoriesRoute);
app.use("/payments", payments);

app.listen(PORT, () => {
  console.log(`Express server listening on port: ${PORT}`);
});
