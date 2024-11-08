const express = require("express");
const router = express.Router();
const Home = require("../../Models-db/Sections-Models/Home.js");

router.get("/", async (req, res) => {
  try {
    const home = await Home.find();
    res.json(home);
  } catch (error) {
    res.status(500).json({ error: "Error obtaining home information" });
  }
});

module.exports = router;
