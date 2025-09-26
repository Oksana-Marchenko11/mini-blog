import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

const PostsListPage = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
    <>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <h2>Список постів</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {posts.length === 0 && <p>Пости відсутні</p>}
        <ul
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "12px",
            padding: 0,
          }}
        >
          {posts.map((post) => (
            <li key={post._id}>
              <Card style={{ marginBottom: 12 }}>
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.content}</Card.Text>
                  <small>
                    Створено: {new Date(post.createdAt).toLocaleString()}
                  </small>
                  <br />
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(post._id)}
                    style={{ marginTop: 6 }}
                  >
                    Видалити
                  </Button>
                </Card.Body>
              </Card>
            </li>
          ))}
        </ul>
      </div>
      <Button
        onClick={() => navigate("/create-post")}
        className="btn btn-success"
        style={{ margin: 6 }}
      >
        Створити новий пост
      </Button>
    </>
  );
};

export default PostsListPage;
