const express = require("express");
const router = express.Router();
const Blog = require("../../../Models-db/Blog-Models/BlogPostM.js");
const { auth } = require("../../../databases-config/Firebase-config.js");

router.get("/", async (req, res) => {
  try {
    const posts = await Blog.find({ Active: true });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error obtaining posts" });
  }
});
//Get ID
router.get("/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const post = await Blog.findById(_id);
    if (!post) {
      return res.status(404).json({ error: "Post unavailable" });
    }
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error obtaining post" });
  }
});

//Edit Post
router.put("/:_id", async (req, res) => {
  const { _id } = req.params;
  const { Body } = req.body;
  if (
    !Body.Titulo ||
    !Body.PostBody ||
    !Body.Categoria ||
    Body.Active === undefined ||
    !Body.IdTags
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const post = await Blog.findByIdAndUpdate(
      _id,
      {
        Titulo: Body.Titulo,
        PostBody: Body.PostBody,
        Categoria: Body.Categoria,
        Active: Body.Active,
        IdTags: Body.IdTags,
      },
      { new: true }
    );
    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating post" });
  }
});

//Post Post
router.post("/", async (req, res) => {
  try {
    const newPost = new Blog(req.body);
    //Token
    const decodedToken = await auth.verifyIdToken(newPost.Autor);
    const uid = decodedToken.uid;
    newPost.Autor = uid;
    await newPost.save();
    res.status(200).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error to create new post" });
  }
});

//Eliminar post
router.delete("/:postId", async (req, res) => {
  const postId = req.params.postId;
  try {
    await Blog.findByIdAndDelete(postId);
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error to eliminating the post" });
  }
});

module.exports = router;
