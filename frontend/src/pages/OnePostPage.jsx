import { useState, useEffect } from "react";
import { Posts } from "../components/Posts";
import { useParams } from "react-router-dom";
import { API_BASE } from "../config";

const OnePostsPage = () => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const loadPost = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/posts/all-posts/${id}`);
        if (!res.ok) throw new Error("Помилка завантаження посту");
        const data = await res.json();
        console.log(data);
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <Posts posts={[post]} my="true" />
    </div>
  );
};

export default OnePostsPage;
