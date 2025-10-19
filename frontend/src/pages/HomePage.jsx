import { useState } from "react";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
import "./HomePage.css";
import { Posts } from "../components/Posts";
import { API_BASE } from "../../config";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [showPosts, setShowPosts] = useState(false);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/posts/all-posts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error(`Помилка: ${response.status}`);
      const data = await response.json();
      console.log(data);
      setShowPosts(true);
      setPosts(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
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
      <Container>
        <h1 className="display-4 mb-4 text-center">
          Ласкаво просимо до MiniBlog
        </h1>
        <p className="lead mb-4 text-center">
          Діліться своїми думками та ідеями з світом
        </p>
        <div className="text-center mt-5">
          <Button className="btn btn_primary btn-lg" onClick={fetchPosts}>
            Переглянути всі пости
          </Button>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {showPosts && <Posts posts={posts} onDelete={handleDelete} />}
      </Container>
    </>
  );
};

export default HomePage;
