const mongoose = require("mongoose");

const CategoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  parent: {
    type: String,
  },

  properties: [{ type: Object }],
});

const Categories = mongoose.model("Categories", CategoriesSchema);
module.exports = Categories;
