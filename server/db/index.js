const mongoose = require("mongoose");

const db = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/Ipangram", { useNewUrlParser: true })
    .catch((e) => {
      console.error("Connection error", e.message);
    });
};

module.exports = db;
