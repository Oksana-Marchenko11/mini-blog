import { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { Posts } from "../components/Posts";
import { fetchAllPosts } from "../api/posts";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

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
      <div className="d-flex gap-3 justify-content-center flex-wrap">
        <Link to="/register" className="btn btn-primary btn-lg">
          Приєднатися
        </Link>
        <Link to="/login" className="btn btn-outline-primary btn-lg">
          Увійти
        </Link>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Posts posts={posts} />
      <div className="card shadow-sm mt-4">
        <div className="card-body p-4">
          <h2 className="text-center mb-4">Можливості MiniBlog</h2>

          <div className="row g-4">
            <div className="col-md-4 text-center">
              <h3 className="text-primary mb-3">✍️ Пишіть</h3>
              <p className="text-muted">
                Створюйте та публікуйте свої пости легко та швидко
              </p>
            </div>

            <div className="col-md-4 text-center">
              <h3 className="text-primary mb-3">👥 Діліться</h3>
              <p className="text-muted">
                Поширюйте свої ідеї та знаходьте однодумців
              </p>
            </div>
            <div className="col-md-4 text-center">
              <h3 className="text-primary mb-3">🔒 Безпека</h3>
              <p className="text-muted">
                Ваші дані захищені надійною системою аутентифікації
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-5">
        <Button className="btn btn-primary btn-lg" onClick={loadPosts}>
          Перегляд усіх постів
        </Button>
      </div>
    </Container>
  );
};

export default HomePage;
