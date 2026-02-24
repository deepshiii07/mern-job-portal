const Application = require("../models/Application");
const Job = require("../models/Job");


/* ========================= */
/* APPLY TO JOB */
/* ========================= */
exports.applyToJob = async (req, res) => {
  try {
    const { coverLetter } = req.body;
    const jobId = req.params.jobId;

    // Check if job exists
    const jobExists = await Job.findById(jobId);
    if (!jobExists) {
      return res.status(404).json({ message: "Job not found" });
    }

    // ❗ Prevent applying to closed jobs
    if (jobExists.jobStatus === "closed") {
      return res.status(400).json({ message: "This job is closed" });
    }

    // Prevent duplicate applications
    const existing = await Application.findOne({
      job: jobId,
      applicant: req.user.id,
    });

    if (existing) {
      return res.status(400).json({ message: "Already applied to this job" });
    }

    const application = new Application({
      job: jobId,
      applicant: req.user.id,
      coverLetter,
    });

    await application.save();

    res.status(201).json({
      message: "Application submitted successfully",
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


/* ========================= */
/* EMPLOYER VIEW APPLICATIONS */
/* ========================= */
exports.getEmployerApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate({
        path: "job",
        match: { employer: req.user.id },
      })
      .populate("applicant", "name email");

    const filteredApplications = applications.filter(
      (app) => app.job !== null
    );

    res.status(200).json(filteredApplications);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


/* ========================= */
/* JOB SEEKER VIEW OWN APPLICATIONS */
/* ========================= */
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      applicant: req.user.id,
    }).populate("job");

    res.status(200).json(applications);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


/* ========================= */
/* EMPLOYER UPDATE APPLICATION STATUS */
/* ========================= */
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const application = await Application.findById(req.params.id)
      .populate("job");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Make sure only the employer who owns the job can update
    if (application.job.employer.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Keep your existing enum values
    application.status = status;
    await application.save();

    res.status(200).json({ message: "Application status updated" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};