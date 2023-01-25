import { useState } from "react";

const CommentPage = () => {
  const [comments, setComments] = useState([]);
  const [newComments, setNewComments] = useState([]);
  const [comment, setComment] = useState("");
  const fetchComments = async () => {
    const res = await fetch("/api/comments");
    const data = await res.json();
    setComments(data);
  };
  const submitComment = async () => {
    const res = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ comment }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
  };
  const deleteComment = async (commentId) => {
    const res = await fetch(`/api/comments/${commentId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    fetchComments();
  };
  return (
    <div>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={submitComment}>Submit Comment</button>
      <button onClick={fetchComments}>Load Comments</button>
      {comments.map((comment) => (
        <div key={comment.id}>
          {comment.id} {comment.text}
          <button onClick={() => deleteComment(comment.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default CommentPage;
