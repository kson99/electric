const mongoose = require("mongoose");

const SettingsSchema = new mongoose.Schema({
  featured1: {
    type: String,
    required: true,
  },

  featured2: {
    type: String,
    required: true,
  },

  shipping: {
    type: Number,
    required: true,
  },
});

const Settings = new mongoose.model("Settings", SettingsSchema);
module.exports = Settings;
