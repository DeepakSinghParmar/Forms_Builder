const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./config/config.env" });
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// routers
const formRouter = require("./routes/formRouter");

app.use("/api", formRouter);

module.exports = app;
