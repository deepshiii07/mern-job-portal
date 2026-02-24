const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // ===== BASIC AUTH =====
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["jobseeker", "employer"],
      required: true,
    },

    // ===== EMPLOYER PROFILE FIELDS =====
    companyName: {
      type: String,
      trim: true,
    },

    industry: {
      type: String,
      trim: true,
    },

    companySize: {
      type: String,
      trim: true,
    },

    website: {
      type: String,
      trim: true,
    },

    companyDescription: {
      type: String,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);