const express = require("express");

const router = express.Router();

const EventsController = require("./controllers/eventsController");
// const UsersController = require("./controllers/usersController");

// Gestion events
router.get("/events", EventsController.getAllEvents);
router.post("/events", EventsController.createEvent);
router.put("/events/:id", EventsController.updateEvent);
router.delete("/events/:id", EventsController.deleteEvent);

// Gestion users
// router.get("/users", UsersController.getAll);
// test

module.exports = router;
