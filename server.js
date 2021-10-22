const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const apiRoutes = require("./apiRoutes")

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.use(apiRoutes)

// connect to mongodb database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitness-tracker-db",
  {
    useNewUrlParser: true,
    useFindAndModify: false
  }
);

// home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"))
});

// stats page route
app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "public/stats.html"))
});

// exercise page route
app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "public/exercise.html"))
});


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});