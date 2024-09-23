import express from "express";
import {
  addComment,
  deleteComment,
  getCommentsForBlog,
} from "../controller/comment.controller.js";
import { isAuthenticated } from "../middleware/authUser.js";

const router = express.Router();

// Add Comment
router.post("/add", isAuthenticated, addComment);

// Delete Comment
router.delete('/delete/:commentId', isAuthenticated, deleteComment);

// Get Comments for a Blog
router.get("/blog/:blogId", getCommentsForBlog);

export default router;
