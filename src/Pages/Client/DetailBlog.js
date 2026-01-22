import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogDetailBySlug } from "../../Actions/BlogDetailActions";
import { Link, useParams } from "react-router-dom";
import { fetchBlog, fetchBlogWithoutPagi } from "../../Actions/BlogActions";
import unidecode from "unidecode";
import { useNavigate } from "react-router-dom";
import Spinner from "../../Components/Client/Spinner";
import {
  addCommentBlog,
  fetchCommentBlog,
  deleteCommentBlog,
  updateCommentBlog,
} from "../../Actions/CommentBlogActions";
import DialogConfirm from "../../Components/Dialog/Dialog";
import { jwtDecode as jwt_decode } from "jwt-decode";
import { SuccessAlert } from "../../Components/Alert/Alert"; // Import SuccessAlert
import normalAvatar from "../../Assets/Client/Images/default-avatar.png";
import DialogEditComment from "../../Components/Dialog/DialogEditComment";

const DetailBlog = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blogDetailState = useSelector((state) => state.blog_detail);
  const blogState = useSelector((state) => state.blog);

  const [open, setOpen] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [selectedID, setSelectedID] = useState(null);

  const [editingContent, setEditingContent] = useState(""); // Define setEditingContent
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); // Trạng thái mở Dialog sửa
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // Trạng thái mở Dialog xóa

  // Hàm mở Dialog xóa
  const handleClickOpen = (type, id, content) => {
    setSelectedID(id);

    if (type === "edit") {
      setEditingContent(content); // Set nội dung cần sửa vào state
      setIsEditDialogOpen(true); // Mở Dialog sửa
      setIsDeleteDialogOpen(false); // Đảm bảo Dialog xóa không mở
    } else if (type === "delete") {
      setIsDeleteDialogOpen(true); // Mở Dialog xóa
      setIsEditDialogOpen(false); // Đảm bảo Dialog sửa không mở
    }
  };
  // Hàm mở Dialog sửa
  // const handleClickOpenEditComment = (id, content) => {
  //   setSelectedID(id);
  //   setEditingContent(content); // Set nội dung cần sửa vào state
  //   setIsEditDialogOpen(true); // Mở Dialog sửa
  //   setIsDeleteDialogOpen(false); // Đảm bảo Dialog xóa không mở
  // };
  // Hàm đóng các Dialog
  const handleClose = () => {
    setIsDeleteDialogOpen(false); // Đóng Dialog xóa
    setIsEditDialogOpen(false); // Đóng Dialog sửa
    setSelectedID(null); // Reset selectedID
  };

  const commentState = useSelector((state) => state.comment_blog);

  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [newComment, setNewComment] = useState({
    content: "",
    blog_id: "",
    user_id: "",
  });
  const [filteredComments, setFilteredComments] = useState([]);
  const [errors, setErrors] = useState({});
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const decodedToken = jwt_decode(accessToken);
      const userIdFromToken = decodedToken.id;
      setUserId(userIdFromToken);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    dispatch(fetchBlogDetailBySlug(slug));
    dispatch(fetchCommentBlog());
  }, [dispatch, slug]);

  useEffect(() => {
    dispatch(fetchBlogWithoutPagi());
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      setNewComment((prevComment) => ({
        ...prevComment,
        user_id: userId,
      }));
    }
  }, [userId]);

  useEffect(() => {
    if (blogDetailState.blogDetail) {
      setNewComment((prevComment) => ({
        ...prevComment,
        blog_id: blogDetailState.blogDetail.id,
      }));
    }
  }, [blogDetailState.blogDetail]);

  useEffect(() => {
    const comments = commentState.commentBlog.filter(
      (comment) => comment.blog_id === blogDetailState.blogDetail?.id
    );
    setFilteredComments(comments);
  }, [commentState.commentBlog, blogDetailState.blogDetail]);

  const handleBlogClick = (slug) => {
    navigate(`/blog-detail/${slug}.html`);
  };

  const formatMessageTimestamp = (timestamp) => {
    const now = new Date();
    const timeDifference = now - new Date(timestamp);
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));

    const formatCustom = (date) => {
      const pad = (num) => num.toString().padStart(2, "0");
      const day = pad(date.getDate());
      const month = pad(date.getMonth() + 1);
      const year = date.getFullYear();
      const hours = pad(date.getHours());
      const minutes = pad(date.getMinutes());

      return `${day}-${month}-${year} ${hours}:${minutes}`;
    };

    if (minutesDifference < 1) {
      return "Just now";
    } else if (minutesDifference < 60) {
      return `${minutesDifference} minutes ago`;
    } else if (timeDifference < 24 * 60 * 60 * 1000) {
      const hoursDifference = Math.floor(minutesDifference / 60);
      return `${hoursDifference} hours ago`;
    } else {
      return formatCustom(new Date(timestamp));
    }
  };

  const relatedPosts = useMemo(() => {
    if (Array.isArray(blogState.blog)) {
      return blogState.blog
        .filter((blog) => blog.id !== blogDetailState.blogDetail?.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
    }
    return [];
  }, [blogState.blog, blogDetailState.blogDetail]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    if (!newComment.content.trim()) {
      setErrors({ content: "Comment content cannot be empty!" });
      return;
    }

    const commentData = {
      blog_id: newComment.blog_id,
      user_id: newComment.user_id,
      content: newComment.content,
    };

    dispatch(addCommentBlog(commentData))
      .then(() => {
        dispatch(fetchCommentBlog("", 1, 10));
        setNewComment((prev) => ({ ...prev, content: "" }));
        setShowSuccessAlert(true);
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
      });
  };

  const handleDeleteComment = async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      alert("You need to log in to perform this action!");
      return;
    }

    if (selectedID) {
      try {
        await dispatch(deleteCommentBlog(selectedID));
        handleClose();
        setShowSuccessAlert(true);
        setOpenSuccess(true);
      } catch (error) {
        console.error("Error delete:", error);
      }
    }
  };

  const handleEditComment = async () => {
    if (selectedID && editingContent) {
      await dispatch(
        updateCommentBlog(selectedID, { content: editingContent })
      );
      setShowSuccessAlert(true);
      setIsEditDialogOpen(false);
      setEditingContent("");
      setSelectedID(null);
    }
  };

  return (
    <div>
      {/* Blog Detail UI */}
      <div className="container-fluid p-0 py-5 bg-dark hero-header mb-5">
        <div className="container text-center my-5 pt-5 pb-4">
          <h1 className="display-3 text-white mb-3 animated slideInDown">
            Blog Details
          </h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center text-uppercase">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/blog">Articles & Tips</Link>
              </li>
              <li
                className="breadcrumb-item text-white active"
                aria-current="page"
              >
                Article Details
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {blogDetailState.loading ? (
        <Spinner />
      ) : blogDetailState.error ? (
        <div>Error: {blogDetailState.error}</div>
      ) : blogDetailState.blogDetail ? (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-9">
              <div className="mb-5">
                <h1 className="display-4 mb-4">
                  {blogDetailState.blogDetail.title}
                </h1>
                <p className="text-muted" style={{ fontSize: "18px", fontWeight: "bold" }}>
                  Published on{" "}
                  {new Date(
                    blogDetailState.blogDetail.created_at
                  ).toLocaleDateString("en-GB")}{" "}
                  - Author: {blogDetailState.blogDetail.author}
                </p>
              </div>

              <div className="mb-4 text-center">
                <img
                  src={blogDetailState.blogDetail.poster}
                  className="img-fluid"
                  alt={blogDetailState.blogDetail.title}
                />
              </div>

              <div
                className="mb-5 blog-content"
                dangerouslySetInnerHTML={{
                  __html: blogDetailState.blogDetail.content,
                }}
              />
            </div>
          </div>

          <SuccessAlert
            open={showSuccessAlert}
            onClose={() => setShowSuccessAlert(false)}
            message="Operation completed successfully!"
          />

          {/* Comments Section */}
          <div className="container mt-5">
            <h3 className="text-center mb-4">Comments</h3>

            <div className="comment-card card bg-light border-0 shadow-sm p-3 mb-5 rounded">
              <div className="card-body">
                <div className="mb-4">
                  {commentState.loading ? (
                    <Spinner />
                  ) : filteredComments.length > 0 ? (
                    filteredComments.map((comment, index) => (
                      <div className="media mb-4 p-3 bg-white rounded border" key={index}>
                        <div className="media-body">
                          <h6 className="mt-0 d-flex align-items-center">
                            <img
                              src={
                                comment.avatar &&
                                comment.avatar.startsWith("http")
                                  ? comment.avatar
                                  : normalAvatar
                              }
                              alt={comment.fullname || "Default Avatar"}
                              className="comment-avatar"
                            />
                            <span className="text-primary font-weight-bold">
                              {comment.fullname}
                            </span>
                          </h6>

                          <p className="mb-1">{comment.content}</p>

                          <div className="d-flex justify-content-between align-items-center">
                            <small className="text-muted">
                              {formatMessageTimestamp(comment.created_at)}
                            </small>

                            {userId === comment.user_id && (
                              <div className="comment-actions">
                                <button
                                  className="btn text-muted btn-link btn-sm p-0"
                                  onClick={() =>
                                    handleClickOpen(
                                      "edit",
                                      comment.id,
                                      comment.content
                                    )
                                  }
                                >
                                  Edit
                                </button>

                                <button
                                  className="btn text-muted btn-link btn-sm p-0"
                                  onClick={() =>
                                    handleClickOpen("delete", comment.id)
                                  }
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="alert alert-info">No comments yet!</div>
                  )}
                </div>

                {isLoggedIn ? (
                  <form onSubmit={handleCommentSubmit}>
                    <textarea
                      className={`form-control ${
                        errors.content ? "is-invalid" : ""
                      }`}
                      rows="3"
                      placeholder="Write a comment..."
                      value={newComment.content}
                      onChange={(e) =>
                        setNewComment({ ...newComment, content: e.target.value })
                      }
                    />
                    {errors.content && (
                      <div className="invalid-feedback">{errors.content}</div>
                    )}
                    <button type="submit" className="btn btn-primary mt-3">
                      Submit Comment
                    </button>
                  </form>
                ) : (
                  <div className="alert alert-warning">
                    You must <Link to="/login">log in</Link> to comment.
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="container mt-5">
            <h3 className="text-center mb-4">You May Also Like</h3>
            <div className="row">
              {relatedPosts.map((post) => (
                <div className="col-lg-4 mb-4" key={post.id}>
                  <div
                    className="card border-0 shadow-sm"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleBlogClick(post.slug)}
                  >
                    <img className="card-img-top" src={post.poster} alt={post.title} />
                    <div className="card-body">
                      <h5 className="card-title">{post.title}</h5>
                      <p className="card-text text-muted">{post.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p>Blog not found!</p>
      )}

      <DialogEditComment
        open={isEditDialogOpen}
        content={editingContent}
        onChange={(e) => setEditingContent(e.target.value)}
        onClose={handleClose}
        onSave={handleEditComment}
      />

      <DialogConfirm
        open={isDeleteDialogOpen}
        onClose={handleClose}
        onConfirm={handleDeleteComment}
        message="Are you sure you want to delete this comment?"
      />
    </div>
  );
};

export default DetailBlog;
