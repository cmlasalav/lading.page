const express = require("express");
const router = express.Router();
const Blog = require("../../Models-db/Blog-Models/BlogPostM.js");
const Comment = require("../../Models-db/Blog-Models/Comments.js");
const { auth, db } = require("../../databases-config/Firebase-config.js");

//Get All Post by UserId
router.get("/post/:token", async (req, res) => {
  const { token } = req.params;
  const decodedToken = await auth.verifyIdToken(token);
  const uid = decodedToken.uid;
  try {
    const post = await Blog.find({ Autor: uid });
    if (post.length === 0) {
      return res.status(404).json({ message: "No posts found", code: "!Post" });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: "Error obtaining post" });
  }
});

//Get All Comment by UserID
router.get("/comment/:token", async (req, res) => {
  const { token } = req.params;
  const decodedToken = await auth.verifyIdToken(token);
  const uid = decodedToken.uid;
  try {
    const comment = await Comment.find({ Autor: uid });
    if (comment.length === 0) {
      return res
        .status(404)
        .json({ message: "No comments found", code: "!Comment" });
    }
    res.status(200).json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error obtaining comment" });
  }
});

//Get One Post by UserID
router.get("/postID", async (req, res) => {
  const { token, id } = req.query;
  const decodedToken = await auth.verifyIdToken(token);
  const uid = decodedToken.uid;
  try {
    const post = await Blog.findOne({ Autor: uid, _id: id });
    if (post === null) {
      return res.status(404).json({ isAuthor: false, active: false });
    } else {
      const isAuthor = post.Autor === uid;
      return res.status(200).json({ isAuthor, active: post.Active });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error obtaining post" });
  }
});

router.put("/:uid", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const { Body } = req.body;
  if (!Body || !token) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const decodedToken = await auth.verifyIdToken(token);
  const uid = decodedToken.uid;

  try {
    const userRef = db.collection("user").doc(uid);
    const user = await userRef.get();
    if (!user.exists) {
      return res.status(404).json({ message: "User not found" });
    }
    await userRef.update(Body);
    const updates = {};
    if (Body.name) {
      updates.name = Body.name;
    }
    if (Object.keys(updates).length > 0) {
      await auth.updateUser(uid, updates);
    }
    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error updating user" });
  }
});

module.exports = router;
