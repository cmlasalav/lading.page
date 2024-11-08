const express = require("express");
const router = express.Router();
const { auth } = require("../../../databases-config/Firebase-config.js");
const Comment = require("../../../Models-db/Blog-Models/Comments.js");

//Comment by Post
router.get("/:postId", async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await Comment.find({ IdPost: postId });
    if (comments.length === 0) {
      return res.status(404).json({ message: "No comments in this post" });
    }
    res.status(200).json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error obtaining comments" });
  }
});
//Create comments
router.post("/", async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    //Token
    const decodedToken = await auth.verifyIdToken(newComment.Autor);
    const uid = decodedToken.uid;
    newComment.Autor = uid;
    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    console.error(err);
  }
});

//
router.get("/userComment/:commentId", async (req, res) => {
  const { commentId } = req.params;
  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error obtaining comment" });
  }
});

//Edit comments
router.put("/:commentId", async (req, res) => {
  const { commentId } = req.params;
  const { Body } = req.body;
  if (!Body) {
    return res.status(400).json({ error: "Missing required field" });
  }
  try {
    const comment = await Comment.findByIdAndUpdate(
      commentId,
      { Body },
      { new: true }
    );
    res.status(200).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating comment" });
  }
});

//Eliminar comentarios
router.delete("/:commentId", async (req, res) => {
  const { commentId } = req.params;
  try {
    await Comment.findByIdAndDelete(commentId);
    res.status(200).json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting comment" });
  }
});

module.exports = router;
