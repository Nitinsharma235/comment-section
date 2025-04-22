import { useRef, useState } from 'react';
import './App.css';

// Helper function to generate unique IDs
function generateId() {
  return Date.now().toString() + Math.random().toString(36).substr(2, 5);
}

function Comment({ comment, path, onReply }) {
  const replyInputRef = useRef(null);
  const [showReplyInput, setShowReplyInput] = useState(false);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const handleReply = () => {
    const replyText = replyInputRef.current.value.trim();
    if (replyText) {
      const replyObject = {
        id: generateId(),  // Unique ID for the reply
        text: replyText,
        replies: [],
        timestamp: Date.now(),
        votes: 0,
      };
      onReply(path, replyObject);
      replyInputRef.current.value = '';
      setShowReplyInput(false);
    }
  };

  return (
    <div style={{ marginLeft: '20px', marginTop: '10px', background: '#eee', padding: '10px', borderRadius: '5px' }}>
      <div>{comment.text}</div>
      <div style={{ fontSize: '0.8rem', color: 'gray' }}>Posted on: {formatTime(comment.timestamp)}</div>

      <div style={{ marginTop: '5px' }}>
        <button onClick={() => onReply(path, { type: 'upvote' })}>Upvote</button>
        <span style={{ margin: '0 10px' }}>{comment.votes}</span>
        <button onClick={() => onReply(path, { type: 'downvote' })}>Downvote</button>
      </div>

      <button onClick={() => setShowReplyInput(!showReplyInput)} style={{ marginTop: '5px' }}>
        Reply
      </button>

      {showReplyInput && (
        <div style={{ marginTop: '5px' }}>
          <input type="text" placeholder="Reply here" ref={replyInputRef} />
          <button onClick={handleReply}>Post</button>
        </div>
      )}

      {comment.replies.map((reply) => (
        <Comment key={reply.id} comment={reply} path={[...path, reply.id]} onReply={onReply} />
      ))}
    </div>
  );
}

function App() {
  const inputRef = useRef(null);
  const [comments, setComments] = useState([]);
  const [sortOrder, setSortOrder] = useState('newest');

  const handleAddComment = () => {
    const text = inputRef.current.value.trim();
    if (text) {
      const newComment = {
        id: generateId(),  // Unique ID for the comment
        text,
        replies: [],
        timestamp: Date.now(),
        votes: 0,
      };
      setComments([...comments, newComment]);
      inputRef.current.value = '';
    }
  };

  // Helper function to add replies using the unique path
  const addReplyByPath = (commentList, path, newReply) => {
    if (path.length === 0) return commentList;

    return commentList.map((comment) => {
      if (comment.id !== path[0]) return comment;

      if (path.length === 1) {
        // Base case: target found
        if (newReply.type === 'upvote') {
          return { ...comment, votes: comment.votes + 1 };
        } else if (newReply.type === 'downvote') {
          return { ...comment, votes: comment.votes - 1 };
        } else {
          return { ...comment, replies: [...comment.replies, newReply] };
        }
      } else {
        // Recursively drill into replies
        return {
          ...comment,
          replies: addReplyByPath(comment.replies, path.slice(1), newReply),
        };
      }
    });
  };

  // Handle replying (upvote, downvote, or new reply)
  const handleReply = (path, reply) => {
    const updatedComments = addReplyByPath(comments, path, reply);
    setComments(updatedComments);
  };

  // Sorting function for comments (newest, oldest, top-voted)
  const sortComments = (comments) => {
    const sorted = [...comments];
    if (sortOrder === 'newest') {
      sorted.sort((a, b) => b.timestamp - a.timestamp);
    } else if (sortOrder === 'oldest') {
      sorted.sort((a, b) => a.timestamp - b.timestamp);
    } else if (sortOrder === 'top') {
      sorted.sort((a, b) => b.votes - a.votes);
    }
    return sorted;
  };

  return (
    <div style={{ padding: '40px' }}>
      <h2>Comment Section</h2>
      <input type="text" placeholder="Enter your comment" ref={inputRef} />
      <button onClick={handleAddComment} style={{ marginLeft: '10px' }}>
        Comment
      </button>

      <div style={{ marginTop: '20px' }}>
        Sort by: {' '}
        <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="top">Top Voted</option>
        </select>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h3>Comments:</h3>
        {sortComments(comments).map((comment) => (
          <Comment key={comment.id} comment={comment} path={[comment.id]} onReply={handleReply} />
        ))}
      </div>
    </div>
  );
}

export default App;
