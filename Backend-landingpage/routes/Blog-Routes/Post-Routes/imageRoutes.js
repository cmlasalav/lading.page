const express = require("express");
const axios = require("axios");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const { bucket } = require("../../../databases-config/Firebase-config.js");

router.get("/", async (req, res) => {
  const { url } = req.query;
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      res.json({ valid: true });
    } else {
      res.json({ valid: false });
    }
  } catch (error) {
    res.json({ valid: false });
  }
});

router.get("/Bucket.Images/:imagesId", async (req, res) => {
  const { imagesId } = req.params;
  try {
    const [files] = await bucket.getFiles({ prefix: imagesId });
    const ServicesImg = files.map(async (file) => {
      await file.makePublic();
      return `https://storage.googleapis.com/${bucket.name}/${file.name}`;
    });

    const imagesURL = await Promise.all(ServicesImg);
    res.status(200).json({ Images: imagesURL });
  } catch (error) {
    res.status(500).json({ message: "Error fetching images." });
  }
});

router.post(
  "/Bucket.Images/:imagesId",
  upload.array("images"),
  async (req, res) => {
    const { imagesId } = req.params;
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded." });
    }

    const uploadPromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const blob = bucket.file(`${imagesId}/${file.originalname}`);
        const blobStream = blob.createWriteStream({
          metadata: {
            contentType: file.mimetype,
          },
        });

        blobStream.on("error", (error) => {
          console.error(error);
          reject(new Error("Error uploading file."));
        });

        blobStream.on("finish", async () => {
          await blob.makePublic();
          const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
          resolve({ publicUrl });
        });

        blobStream.end(file.buffer);
      });
    });

    try {
      const results = await Promise.all(uploadPromises);
      return res.status(200).json(results);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error uploading files." });
    }
  }
);

module.exports = router;
