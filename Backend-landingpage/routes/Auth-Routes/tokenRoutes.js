const express = require("express");
const router = express.Router();
const { auth, db } = require("../../databases-config/Firebase-config.js");

//Get User by Token
router.post("/", async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).send({
      errorInfo: { code: "auth/invalid-input", message: "Token is required" },
    });
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    const uid = decodedToken.uid;
    //User Name
    const userRef = db.collection("user").doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).send({
        errorInfo: { code: "auth/user-not-found", message: "User not found" },
      });
    }
    //Frontend
    const userData = userDoc.data();

    res.status(200).send({ message: "User authenticated", userData });
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).send({
      errorInfo: { code: "auth/invalid-token", message: "Invalid token" },
    });
  }
});

//Get User by Uid
router.get("/:uid", async (req, res) => {
  const { uid } = req.params;
  try {
    const userRef = db.collection("user").doc(uid);
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      return res.status(404).send({
        errorInfo: { code: "auth/user-not-found", message: "User not found" },
      });
    }
    //Frontend
    const userData = userDoc.data();
    const userName = userData.name
    res.status(200).send({ message: "User found", userName });
  } catch (error) {
    console.error("Error getting user by uid:", error);
    res.status(500).send({
      errorInfo: {
        code: "auth/internal-server-error",
        message: "Internal server error",
      },
    });
  }
});

module.exports = router;
