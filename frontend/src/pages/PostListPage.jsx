import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Row, Col, Container } from "react-bootstrap";

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
    <Container>
      <Row className="align-items-center mb-4">
        <Col>
          <h2>Список постів</h2>
        </Col>
        <Col className="text-end">
          <Button onClick={() => navigate("/create-post")} variant="success">
            Створити новий пост
          </Button>
        </Col>
      </Row>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {posts.length === 0 && <p>Пости відсутні</p>}
      <Row xs={1} md={2} lg={3} className="g-4">
        {posts.map((post) => (
          <Col key={post._id}>
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
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PostsListPage;
