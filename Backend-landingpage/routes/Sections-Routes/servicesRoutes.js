const express = require("express");
const router = express.Router();
const Services = require("../../Models-db/Sections-Models/Services.js");

router.get("/", async (req, res) => {
  try {
    const services = await Services.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: "Error obtaining services" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newService = new Services(req.body);
    await newService.save();
    res.status(201).json(newService);
  } catch (err) {
    res.status(500).json({ error: "Error creating new service" });
  }
});

module.exports = router;
