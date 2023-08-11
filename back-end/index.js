const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.ATLAS_URI, {
      dbName: "Electric-E-commerse",
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const productsRoute = require("./routes/products");
const categoriesRoute = require("./routes/categories");
const paymentsRoute = require("./routes/payments");
const ordersRoute = require("./routes/orders");
const settingsRoute = require("./routes/settings");

const app = express();

app.use(cors());
// app.use(express.json());
app.use(bodyParser.json({ limit: "500kb" }));

app.use("/products", productsRoute);
app.use("/categories", categoriesRoute);
app.use("/payments", paymentsRoute);
app.use("/orders", ordersRoute);
app.use("/settings", settingsRoute);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Express server listening on port: ${PORT}`);
  });
});
