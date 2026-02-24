const express = require("express");
const router = express.Router();

const {
  applyToJob,
  getEmployerApplications,
  getMyApplications,
  updateApplicationStatus,
} = require("../controllers/applicationController");

const authMiddleware = require("../middleware/authMiddleware");

/* ========================= */
/* APPLY TO JOB */
/* ========================= */
router.post("/:jobId", authMiddleware, applyToJob);

/* ========================= */
/* EMPLOYER VIEW APPLICATIONS */
/* ========================= */
router.get("/employer", authMiddleware, getEmployerApplications);

/* ========================= */
/* JOB SEEKER VIEW OWN APPLICATIONS */
/* ========================= */
router.get("/my-applications", authMiddleware, getMyApplications);

/* ========================= */
/* EMPLOYER UPDATE APPLICATION STATUS */
/* ========================= */
router.put("/:id/status", authMiddleware, updateApplicationStatus);

module.exports = router;