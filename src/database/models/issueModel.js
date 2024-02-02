import mongoose, { Schema } from "mongoose";

const issueSchema = new Schema({
  name: {
    type: String,
    required: [true, "You much enter your name!!"],
  },
  pictureUrl: {
    type: String,
    required: [true, "A Picture is Required to confirm the incident!!"],
  },
  location: {
    type: String,
    required: [true, "Location is required to Locate "],
  },
  reason: {
    type: String,
    required: [true, "Pleae choose the reason!!"],
  },
  content: {
    type: String,
    default: "I am Facing this Problem!!",
  },
  status: {
    type: String,
    enum: ["pending", "resolved"],
    default: "pending",
  },
});

export const IssueModel = mongoose.models.issues || mongoose.model("issues",issueSchema)
