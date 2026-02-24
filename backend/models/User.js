const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // ===== BASIC AUTH =====
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["jobseeker", "employer"], required: true },

    // ===== JOB SEEKER PROFILE =====
    bio: { type: String, trim: true },
    education: { type: String, trim: true },
    experience: { type: String, trim: true },
    resume: { type: String, trim: true },
    location: { type: String, trim: true },

    // ===== EMPLOYER PROFILE =====
    companyName: { type: String, trim: true },
    industry: { type: String, trim: true },
    companySize: { type: String, trim: true },
    website: { type: String, trim: true },
    description: { type: String, trim: true }, // unified name
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);