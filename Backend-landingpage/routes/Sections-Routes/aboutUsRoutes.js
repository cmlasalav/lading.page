const express = require("express");
const router = express.Router();
const AboutUs = require("../../Models-db/Sections-Models/AboutUs.js");

router.get("/", async (req, res) => {
  try {
    const aboutUs = await AboutUs.find();
    res.json(aboutUs);
  } catch (error) {
    res.status(500).json({ error: "Error obtaining about us" });
  }
});

module.exports = router;
