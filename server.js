const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitness-tracker-db", { useNewUrlParser: true });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"))
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "./stats.html"))
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "./exercise.html"))
});



app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});