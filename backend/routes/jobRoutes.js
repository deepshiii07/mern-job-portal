const express = require("express");
const router = express.Router();

const {
  createJob,
  getEmployerJobs,
  deleteJob,
  getAllJobs,
  updateJobStatus
} = require("../controllers/jobcontroller");

const authMiddleware = require("../middleware/authMiddleware");

/* ========================= */
/* PUBLIC ROUTE (Job Seekers) */
/* ========================= */
router.get("/", getAllJobs);

/* ========================= */
/* EMPLOYER ROUTES */
/* ========================= */
router.post("/", authMiddleware, createJob);
router.get("/my-jobs", authMiddleware, getEmployerJobs);
router.delete("/:id", authMiddleware, deleteJob);

/* ========================= */
/* UPDATE JOB STATUS */
/* ========================= */
router.put("/:id/status", authMiddleware, updateJobStatus);

module.exports = router;