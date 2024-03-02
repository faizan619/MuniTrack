import mongoose, { Schema } from "mongoose";

const IssueSchema = new Schema({
  issue_image_url: {
    type: String,
    required: [true, "Please Upload a Photo!"],
  },
  issue_title: {
    type: String,
    required: [true, "Please Enter the issue!!"],
  },
  issue_describe: {
    type: String,
    required: [true, "Please Explain the issue!!"],
    minLength:[24,"Please briefly describe the Issue!!"]
  },
  issue_state: {
    type: String,
    enum: ["pending", "resolved"],
    default: "pending",
  },
  issue_location: {
    type: String,
    required: [true, "Your Location is required!!"],
  },
  issue_user_name: {
    type: String,
    required: true,
  },
  issue_user_email: {
    type: String,
    required: true,
  },
  issue_comment: {
    type: [String],
  },
});

export const Issue = mongoose.models.issue || mongoose.model("issue",IssueSchema)