import { useEffect, useState } from "react";
import { Posts } from "../components/Posts";
import { API_BASE } from "../../config";

const MyPostsPage = () => {
  const [myPosts, setmyPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/posts/my-posts`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        console.log("TOKEN:", localStorage.getItem("token"));
        if (!response.ok) throw new Error(`Помилка: ${response.status}`);
        const data = await response.json();
        console.log(data);
        setmyPosts(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Мої пости</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Posts posts={myPosts} />
    </div>
  );
};

export default MyPostsPage;
