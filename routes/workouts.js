const express = require("express");
const router = express.Router();
const workoutsController = require("../controllers/Workouts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, workoutsController.getWorkout);

router.post("/createWorkout", workoutsController.createWorkout);

router.put("/likeWorkout/:id", workoutsController.likeWorkout);

router.delete("/deleteWorkout/:id", workoutsController.deleteWorkout);

module.exports = router;
