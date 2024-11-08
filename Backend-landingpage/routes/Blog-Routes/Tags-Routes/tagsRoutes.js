const express = require("express");
const router = express.Router();
const Tag = require("../../../Models-db/Blog-Models/Tags.js");

router.get("/", async (req, res) => {
  try {
    const tags = await Tag.find();
    res.json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error obtaining tags" });
  }
});
//Get id Tags
router.post("/byIds", async (req, res) => {
  const { ids } = req.body;
  try {
    const tags = await Tag.find({ _id: { $in: ids } });
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).send("Error obtaining the tag.");
  }
});

//Post Tags
router.post("/", async (req, res) => {
  const { Tags } = req.body;

  //Para colocar en mayuscula las palabras
  const normalizedTag =
    Tags.charAt(0).toUpperCase() + Tags.slice(1).toLowerCase();

  try {
    let tag = await Tag.findOne({ Tags: normalizedTag });
    if (tag) {
      return res.status(400).json({ error: "Tag already exist" });
    }

    tag = new Tag({
      IdTag: Math.random().toString().substring(2, 9),
      Tags: normalizedTag,
    });

    await tag.save();
    res.status(201).json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating new Tag" });
  }
});

module.exports = router;
