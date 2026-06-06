const express = require("express");
const { auth } = require("../../MySQL/middleware/auth.middleware");
const {
  createTrip,
  getTrip,
  getTripById,
} = require("../controllers/tripController");
const router = express.Router();

router.post("/create", auth, createTrip);
router.get("/", auth, getTrip);
router.get("/get/:id", auth, getTripById);

module.exports = router;
