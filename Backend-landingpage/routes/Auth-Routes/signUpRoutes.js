const express = require("express");
const router = express.Router();
const {auth, db} = require("../../databases-config/Firebase-config.js");

router.post("/", async (req, res) => {
    const { email, password, name } = req.body;
  
    if (!email || !password || !name) {
      return res.status(400).send({
        //Error campos vacios
        errorInfo: {
          code: "auth/invalid-input",
          message: "Email, password, and name are required",
        },
      });
    }
  
    try {
      const userRecord = await auth.createUser({
        email,
        password,
        displayName: name,
      });
  
      await db.collection("user").doc(userRecord.uid).set({
        name,
        email,
        role: "user",
      });
  
      res.status(201).send("User created successfully");
    } catch (error) {
      console.error("Error creating new user:", error);
      //Errores de formato (Email and Password) segun FireBase
      if (error.code && error.code.startsWith("auth/")) {
        return res.status(400).send({
          errorInfo: {
            code: error.code,
            message: error.message,
          },
        });
      }
  
      res.status(500).send({
        errorInfo: {
          code: "internal-server-error",
          message: "Internal Server Error",
        },
      });
    }
  });

module.exports = router;