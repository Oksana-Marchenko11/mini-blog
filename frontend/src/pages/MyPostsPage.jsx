import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { Posts } from "../components/Posts";
import BlogEditor from "../components/BlogEditor";
import { fetchMyPosts, deleteMyPost, editMyPost } from "../services/postsApi";
import { NavLink } from "react-router-dom";

const MyPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [editedTitle, setEditedTitle] = useState("");
  const [error, setError] = useState("");
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

  const openEditModal = (post) => {
    setEditingPost(post);
    setEditedTitle(post.title);
    setEditedContent(post.content);
  };

  const handleDelete = async (id) => {
    try {
      await deleteMyPost(id);
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const saveEdit = async () => {
    try {
      await editMyPost(editingPost._id, {
        title: editedTitle,
        content: editedContent,
      });

      setPosts((prev) =>
        prev.map((p) =>
          p._id === editingPost._id
            ? { ...p, title: editedTitle, content: editedContent }
            : p,
        ),
      );

      setEditingPost(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          {error && <p style={{ color: "red" }}>{error}</p>}

          <Posts
            posts={posts}
            onDelete={handleDelete}
            onEdit={openEditModal}
            onRead={true}
            my={true}
          />
          {editingPost && (
            <div className="edit-section mt-3 p-3 border rounded bg-light">
              <input
                type="text"
                className="form-control mb-3"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                placeholder="Заголовок поста"
              />

              <BlogEditor
                value={editedContent}
                onChange={(html) => setEditedContent(html)}
              />

              <div className="mt-3 d-flex gap-2">
                <button className="btn btn-success" onClick={saveEdit}>
                  Зберегти
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditingPost(null)}
                >
                  Скасувати
                </button>
              </div>

              {error && <p className="text-danger mt-2">{error}</p>}
            </div>
          )}
        </>
      ) : (
        <NavLink to="/login" className="btn btn-primary mt-4">
          Увійти, щоб переглянути свої пости
        </NavLink>
      )}
    </>
  );
};

export default MyPostsPage;
