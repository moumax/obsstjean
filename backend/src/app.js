const express = require("express");
const path = require("node:path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fs = require("node:fs");
require("dotenv").config();

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));

// serve REACT APP
const router = express.Router();
const eventsRouter = require("./routes/eventsRouter");

router.use("/events", eventsRouter);

// API routes
app.use("/api", router);

const reactIndexFile = path.join(
  __dirname,
  "..",
  "..",
  "frontend",
  "dist",
  "index.html"
);

if (fs.existsSync(reactIndexFile)) {
  // serve REACT resources

  app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));

  // redirect all requests to the REACT index file

  app.get("*", (req, res) => {
    res.sendFile(reactIndexFile);
  });
}

module.exports = app;
