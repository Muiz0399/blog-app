import { Comment } from "../models/comment.model.js";
import { Blog } from "../models/blog.model.js";

// Add Comment
export const addComment = async (req, res) => {
  try {
    const { blogId, commentText } = req.body;

    if (!commentText.trim()) {
      return res.status(400).json({ error: "Comment cannot be empty" });
    }

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    const comment = await Comment.create({
      commentText,
      blogId,
      user: req.user._id,
    });

    const populatedComment = await comment.populate("user", "name");

    res.status(201).json({
      success: true,
      comment: populatedComment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Comment
export const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    // Assuming you are using mongoose for database operations
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment" });
  }
};


// Get Comments for a Blog
export const getCommentsForBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const comments = await Comment.find({ blogId }).populate("user", "name");
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
