const express = require("express");
const EventsController = require("../controllers/eventsController");

const router = express.Router();

// Gestion events
router.get("/", EventsController.getEvents);
router.get("/:id", EventsController.getEventById);
router.post("/", EventsController.createEvent);
router.put("/:id", EventsController.updateEvent);
router.delete("/:id", EventsController.deleteEvent);

module.exports = router;
