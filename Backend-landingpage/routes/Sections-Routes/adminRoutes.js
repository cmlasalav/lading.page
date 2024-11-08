const express = require("express");
const router = express.Router();
const Blog = require("../../Models-db/Blog-Models/BlogPostM");
const Comments = require("../../Models-db/Blog-Models/Comments");
const { auth } = require("../../databases-config/Firebase-config.js");

router.get("/Blog/:token", async (req, res) => {
  const { token } = req.params;
  const decodedToken = await auth.verifyIdToken(token);
  const uid = decodedToken.uid;
  try {
    const blog = await Blog.find({ Autor: { $ne: uid } });
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/Comments/:token", async (req, res) => {
  const { token } = req.params;
  const decodedToken = await auth.verifyIdToken(token);
  const uid = decodedToken.uid;
  try {
    const comments = await Comments.find({ Autor: { $ne: uid } });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;
