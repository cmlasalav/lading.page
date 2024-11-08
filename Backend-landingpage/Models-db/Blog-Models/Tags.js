const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  IdTag: {
    type: String,
    required: true,
  },
  Tags_ES: {
    type: String,
    required: true,
    unique: true,
  },
  Tags_EN: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Tag", tagSchema, "Post.Tags");
