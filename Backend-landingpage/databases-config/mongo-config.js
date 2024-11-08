const mongoose = require("mongoose");

const connectMongoDB = () => {
  const MongoURL = process.env.MongoURL;
  mongoose
    .connect(MongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB", err);
    });
};

module.exports = { connectMongoDB };
