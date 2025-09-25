import { useEffect, useState } from "react";

const PostsListPage = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/posts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error(`Помилка: ${response.status}`);
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(`Помилка: ${response.status}`);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <h2>Список постів</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {posts.length === 0 && <p>Пости відсутні</p>}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {posts.map((post) => (
          <li
            key={post._id}
            style={{ border: "1px solid #ccc", padding: 12, marginBottom: 12 }}
          >
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <small>Створено: {new Date(post.createdAt).toLocaleString()}</small>
            <br />
            <button
              onClick={() => handleDelete(post._id)}
              style={{ marginTop: 6, color: "red" }}
            >
              Видалити
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsListPage;
