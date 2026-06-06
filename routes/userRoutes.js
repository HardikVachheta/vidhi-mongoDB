const express = require("express");
const {
  getUser,
  getUserbyId,
  loginUser,
  registerUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
// const authMiddleware = require("../../MySQL/middleware/auth.middleware");
// const roleCheck = require("../../MySQL/middleware/auth.middleware");

const { auth, roleCheck } = require("../middleware/auth.middleware");
const router = express.Router();

router.get("/get", getUser);
router.get("/get/:id", getUserbyId);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/update/:id", auth, updateUser);
router.delete("/delete/:id", auth, roleCheck(["Admin"]), deleteUser);

module.exports = router;
