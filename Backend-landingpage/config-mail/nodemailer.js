const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // or 'STARTTLS'
  auth: {
    user: process.env.Email_User,
    pass: process.env.Email_Pass,
  },
});

const verifyTransporter = async () => {
  try {
    await transporter.verify();
    console.log("Connected to Nodemailer");
  } catch (error) {
    console.log("Something went wrong", error);
  }
};

verifyTransporter();
module.exports = transporter;
