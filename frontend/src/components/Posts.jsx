export const Posts = ({ posts, onDelete, onEdit }) => {
  return (
    <div>
      {posts.map((post) => (
        <div
          key={post._id}
          className="post-card"
          style={{
            marginBottom: "1rem",
            padding: "1rem",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <h3>{post.title}</h3>
          <p>{post.content}</p>

          {onEdit && (
            <button
              onClick={() => onEdit(post)}
              style={{ marginRight: "0.5rem" }}
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button onClick={() => onDelete(post._id)}>Delete</button>
          )}
        </div>
      ))}
    </div>
  );
};
