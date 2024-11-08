const express = require("express");
const router = express.Router();
const Testimonials = require("../../Models-db/Sections-Models/Testimonials.js");
const { auth } = require("../../databases-config/Firebase-config.js");

router.get("/", async (req, res) => {
  try {
    const testimonials = await Testimonials.find();
    res.status(201).json(testimonials);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error obtaining testimonials" });
  }
});

router.post("/", async (req, res) => {
  try {
    const testimonial = new Testimonials(req.body);
    //Token
    const decodedToken = await auth.verifyIdToken(testimonial.User);
    const uid = decodedToken.uid;
    testimonial.User = uid;
    await testimonial.save();
    res.status(201).json(testimonial);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating testimonial" });
  }
});

router.delete("/:testimonialId", async (req, res) => {
  const { testimonialId } = req.params;
  try {
    await Testimonials.findByIdAndDelete(testimonialId);
    res.status(201).json({ message: "Testimonial deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting testimonial" });
  }
});

module.exports = router;
