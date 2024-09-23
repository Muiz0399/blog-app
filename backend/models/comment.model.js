import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  commentText: {
    type: String,
    required: true,
  },
  blogId: {
    type: mongoose.Schema.ObjectId,
    ref: "Blog",
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Comment = mongoose.model("Comment", commentSchema);
