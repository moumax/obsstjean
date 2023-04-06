const express = require("express");
const path = require("node:path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fs = require("node:fs");
// const auth = require("./middlewares/auth");
require("dotenv").config();

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:3001",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));

// serve REACT APP
const router = express.Router();
const authRouter = require("./routes/authRouter");
const eventsRouter = require("./routes/eventsRouter");
const usersRouter = require("./routes/usersRouter");

router.use("/auth", authRouter);
router.use("/events", eventsRouter);
router.use("/users", usersRouter);

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
