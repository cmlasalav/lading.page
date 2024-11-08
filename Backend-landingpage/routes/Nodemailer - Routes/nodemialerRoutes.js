const express = require("express");
const transporter = require("../../config-mail/nodemailer.js");
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, phone, message } = req.body;
  try {
    await transporter.sendMail({
      from: email,
      to: "carloslasala08@gmail.com",
      subject: "Contacto desde la web",
      text: `Nombre: ${name}\nEmail: ${email}\nTelefono: ${phone}\nMensaje: ${message}`,
    });
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Email sent successfully" });
    console.log(error);
  }
});

module.exports = router;
