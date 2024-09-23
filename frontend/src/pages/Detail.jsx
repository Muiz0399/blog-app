import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams(); // Get blog ID from the URL parameters
  const [blogs, setBlogs] = useState({}); // Store blog details
  const [comments, setComments] = useState([]); // Store comments
  const [newComment, setNewComment] = useState(""); // Handle new comment input
  const [loading, setLoading] = useState(false); // Handle loading state
  const [currentUser, setCurrentUser] = useState({}); // Store current user details

  // Fetch current user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4001/api/users/current`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setCurrentUser(data);
        console.log("Current User:", data); // Debugging log
      } catch (error) {
        console.log(error);
        toast.error("Failed to load user details");
      }
    };
    fetchUser();
  }, []);

  // Fetch Blog Details
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4001/api/blogs/single-blog/${id}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setBlogs(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
  }, [id]);

  // Fetch Comments for the blog
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4001/api/comments/blog/${id}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setComments(data); // Store comments with user data
        console.log("Comments Data:", data); // Debugging log
      } catch (error) {
        console.log(error);
      }
    };
    fetchComments();
  }, [id]);

  // Handle new comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return toast.error("Comment cannot be empty");

    setLoading(true);

    try {
      const { data } = await axios.post(
        `http://localhost:4001/api/comments/add`,
        {
          blogId: id,
          commentText: newComment, // Pass the comment text to the API
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Comment added successfully!");
      // Append the new comment with user info to the list
      setComments([...comments, { ...data.comment }]);
      setNewComment(""); // Clear the comment input field
    } catch (error) {
      console.log(error);
      toast.error("Failed to add comment");
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting a comment
  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(
        `http://localhost:4001/api/comments/delete/${commentId}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setComments(comments.filter((comment) => comment._id !== commentId));
      toast.success("Comment deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete comment");
    }
  };
  

  return (
    <div>
      <div>
        {blogs && (
          <section className="container mx-auto p-8">
            {/* Blog Category */}
            <div className="text-blue-500 uppercase text-xs font-bold mb-4">
              {blogs?.category}
            </div>

            {/* Blog Title */}
            <h1 className="text-4xl font-bold mb-6">{blogs?.title}</h1>

            {/* Blog Author */}
            <div className="flex items-center mb-6">
              <img
                src={blogs?.adminPhoto}
                alt="author_avatar"
                className="w-12 h-12 rounded-full mr-4"
              />
              <p className="text-lg font-semibold">{blogs?.adminName}</p>
            </div>

            {/* Blog Image and Description */}
            <div className="flex flex-col md:flex-row">
              {blogs?.blogImage && (
                <img
                  src={blogs?.blogImage?.url}
                  alt="mainblogsImg"
                  className="md:w-1/2 w-full h-[350px] mb-6 rounded-lg shadow-lg cursor-pointer border"
                />
              )}
              <div className="md:w-1/2 w-full md:pl-6">
                <p className="text-md mb-6">{blogs?.about}</p>
              </div>
            </div>

            {/* Comments Section */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Comments</h2>

              {/* Display Comments */}
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div
                    key={comment._id}
                    className="border-b py-4 flex justify-between"
                  >
                    <div>
                      <p className="font-semibold">{comment.commentText}</p>
                      <small className="text-gray-500">
                        By {comment.user?.name || "Anonymous"}
                      </small>
                    </div>
                    {/* Delete button for the comment owner or admin */}
                    {(comment.user?._id === currentUser._id ||
                      currentUser.role === "admin") && (
                      <button
                        onClick={() => handleDeleteComment(comment._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No comments yet. Be the first!</p>
              )}

              {/* Add New Comment */}
              <form onSubmit={handleCommentSubmit} className="mt-4">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Add a comment"
                  rows="4"
                />
                <button
                  type="submit"
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Comment"}
                </button>
              </form>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default Detail;
