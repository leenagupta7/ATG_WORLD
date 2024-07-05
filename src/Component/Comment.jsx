import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const Comment = ({ blogId }) => {
  const [text, setText] = useState('');
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const token = localStorage.getItem('usertoken');
  const Baseurl = import.meta.env.VITE_API_BASE_URL;
  const fetchComments = async () => {
    try {
      const response = await axios.get(`${Baseurl}/getComments/${blogId}`);
      setComments(response.data);
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${Baseurl}/addComment`,
        { blogId, text },
        {
          headers: {
            usertoken: token,
          },
        }
      );
      setText('');
      fetchComments();
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="">
      <form className="max-w-100 flex items-center justify-center mb-4" onSubmit={handleCommentSubmit}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment"
          required
          className="w-full p-2 border rounded mr-2"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
      </form>
      <div>
        {comments.slice(0, showMore ? comments.length : 2).map((comment) => (
          <div key={comment._id} className="p-2 border-b">
            <p><strong>{comment.userId.name}</strong>: {comment.text}</p>
            <p className="text-gray-500 text-sm">{new Date(comment.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
      {comments.length > 2 && (
        <div className="mt-4 flex items-center justify-center">
          <button
            onClick={() => setShowMore(!showMore)}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            {showMore ? 'Show Less' : 'Show More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Comment;
