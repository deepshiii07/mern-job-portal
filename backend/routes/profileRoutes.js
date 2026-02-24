const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  getProfile,
  updateProfile,
  getProfileById
} = require("../controllers/profileController");

router.get("/", authMiddleware, getProfile);
router.put("/", authMiddleware, updateProfile);

// NEW: Employer fetch applicant profile
router.get("/:userId", authMiddleware, getProfileById);

module.exports = router;