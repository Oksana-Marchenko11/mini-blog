import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { Posts } from "../components/Posts";
import { EditPostModal } from "../components/EditPostModal";
import { ReadPostModal } from "../components/ReadPostModal";
import { fetchMyPosts, deleteMyPost, editMyPost } from "../services/postsApi";
import { NavLink } from "react-router-dom";

const MyPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [editingPost, setEditingPost] = useState(null);
  const [readingPost, setReadingPost] = useState(null);
  const { isLoggedIn } = useContext(AuthContext);

  const loadPosts = async () => {
    try {
      const data = await fetchMyPosts();
      setPosts(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteMyPost(id);
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = async (updatedPost) => {
    try {
      await editMyPost(updatedPost._id, {
        title: updatedPost.title,
        content: updatedPost.content,
      });

      setPosts((prev) =>
        prev.map((p) =>
          p._id === updatedPost._id
            ? { ...p, title: updatedPost.title, content: updatedPost.content }
            : p
        )
      );

      setEditingPost(null);
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <>
      {isLoggedIn ? (
        <div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Posts
            posts={posts}
            onDelete={handleDelete}
            onEdit={(post) => setEditingPost(post)}
            onRead={(post) => setReadingPost(post)}
            my="true"
          />
          {editingPost && (
            <EditPostModal
              show={!!editingPost}
              post={editingPost}
              onHide={() => setEditingPost(null)}
              onSave={handleEdit}
            />
          )}
          {readingPost && (
            <ReadPostModal
              show={!!readingPost}
              post={readingPost}
              onHide={() => setReadingPost(null)}
            />
          )}
        </div>
      ) : (
        <NavLink to="/login" className="btn btn-primary mt-4">
          Увійти, щоб переглянути свої пости
        </NavLink>
      )}
    </>
  );
};
export default MyPostsPage;
