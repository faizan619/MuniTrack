import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    name:String,
    email:String,
    selectedEmoji:String,
    message:String
});
export const Feedback = mongoose.models.feedbacks || mongoose.model("feedbacks",feedbackSchema)