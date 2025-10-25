import { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { Posts } from "../components/Posts";
import { fetchAllPosts } from "../api/posts";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  // const token = localStorage.getItem("token");

  const loadPosts = async () => {
    try {
      const data = await fetchAllPosts();
      console.log(data);
      setPosts(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container>
      <h1 className="display-4 mb-4 text-center">
        Ласкаво просимо до MiniBlog
      </h1>
      <p className="lead mb-4 text-center">
        Діліться своїми думками та ідеями з світом
      </p>
      <Button onClick={loadPosts}>Перегляд усіх постів</Button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Posts posts={posts} />
    </Container>
  );
};

export default HomePage;
