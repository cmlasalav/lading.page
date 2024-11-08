const express = require("express");
const router = express.Router();
const { auth, db } = require("../../databases-config/Firebase-config.js");

router.post("/", async (req, res) => {
  const { token, name } = req.body;
  if (!token || !name) {
    return res.status(400).send({
      //Error: campos vacíos
      errorInfo: {
        code: "auth/invalid-input",
        message: "Email and name are required",
      },
    });
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    const { uid, email, displayName } = decodedToken;

    const userRef = db.collection("user").doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      await userRef.set({
        name: displayName || name,
        email: email || "No Email",
        role: "user",
      });
    }

    res.status(200).send({ message: "User authenticated", uid });
  } catch (error) {
    console.error("Error creating new user:", error);
    res.status(500).send({
      errorInfo: {
        code: "server/error",
        message: "There was a problem creating the user",
      },
    });
  }
});

module.exports = router;
