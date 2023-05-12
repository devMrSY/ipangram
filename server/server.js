const express = require("express");
const cors = require("cors");
const router = require("./routes/index.js");
const db = require("./db/index.js");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use("/api", router);

db();

app.listen(3000, () => console.log("Server started on port 3000"));
