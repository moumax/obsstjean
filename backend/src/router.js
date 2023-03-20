const express = require("express");

const router = express.Router();

const EventsController = require("./controllers/eventsController");
const UsersController = require("./controllers/usersController");

router.get("/events", EventsController.getAll);
router.post("/events", EventsController.createOne);
router.delete("/events/:id", EventsController.deleteOne);

router.get("/users", UsersController.getAll);

module.exports = router;
