const Job = require("../models/Job");
const Application = require("../models/Application");

// CREATE JOB
exports.createJob = async (req, res) => {
  try {
    const { title, company, location, description, salary } = req.body;

    const newJob = new Job({
      title,
      company,
      location,
      description,
      salary,
      employer: req.user.id,
    });

    await newJob.save();

    res.status(201).json({ message: "Job created successfully", job: newJob });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// GET EMPLOYER APPLICATIONS (existing logic kept)
exports.getEmployerApplications = async (req, res) => {
  try {
    const jobs = await Job.find({ employer: req.user.id });

    const jobIds = jobs.map((job) => job._id);

    const applications = await Application.find({
      job: { $in: jobIds },
    })
      .populate("applicant", "name email")
      .populate("job", "title jobStatus");

    res.status(200).json(applications);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


// GET EMPLOYER JOBS
exports.getEmployerJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ employer: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// GET ALL JOBS (JobSeeker Dashboard)
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// DELETE JOB
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.employer.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await job.deleteOne();

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


/* ========================= */
/* UPDATE JOB STATUS (NEW)  */
/* ========================= */
exports.updateJobStatus = async (req, res) => {
  try {
    const { jobStatus } = req.body;

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Only employer who created job can update
    if (job.employer.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    job.jobStatus = jobStatus;
    await job.save();

    res.status(200).json({ message: "Job status updated" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};