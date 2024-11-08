const mongoose = require("mongoose");
const Tags = require('./Tags.js')

const blogPostSchema = new mongoose.Schema({
  IdPost: {
    type: String,
    required: true,
    unique: true,
  },
  Titulo: {
    type: String,
    required: true,
  },
  Categoria: {
    type: String,
    required: true,
  },
  Autor: {
    type: String,
    required: true,
  },
  PostBody: [
    {
      contentType: {
        type: String,
        BodyType: ["text", "image"],
        required: true,
      },
      contentBody: {
        type: String,
        required: true,
      },
    },
  ],
  IdTags: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Tags
  }],
  PostDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  Active: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Blog.Post", blogPostSchema, "Blog.Post");
