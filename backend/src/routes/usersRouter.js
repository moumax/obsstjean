const express = require("express");
const UsersController = require("../controllers/usersController");

const router = express.Router();

// Gestion events
router.get("/", UsersController.getUsers);
router.get("/:id", UsersController.getUserById);
router.post("/", UsersController.createUser);
router.put("/:id", UsersController.updateUser);
router.delete("/:id", UsersController.deleteUser);

module.exports = router;
