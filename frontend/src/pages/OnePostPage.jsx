import { useState, useEffect } from "react";
import { Posts } from "../components/Posts";
import BlogEditor from "../components/BlogEditor";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { API_BASE } from "../config";
import { editMyPost } from "../services/postsApi";

const OnePostsPage = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");

  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const loadPost = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/posts/all-posts/${id}`);
        if (!res.ok) throw new Error("Не вдалося завантажити пост");
        const data = await res.json();
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
  if (!post) return null;

  const saveEdit = async () => {
    try {
      const updatedPost = await editMyPost(editing._id, {
        title: editedTitle,
        content: editedContent,
      });

      setPost(updatedPost);
      setEditing(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-4">
      {location.state?.my ? (
        <div>
          <Posts
            posts={[post]}
            onEdit={(p) => {
              setEditing(p);
              setEditedTitle(p.title);
              setEditedContent(p.content);
            }}
            onDelete={async (id) => {
              try {
                await fetch(`${API_BASE}/api/posts/${id}`, {
                  method: "DELETE",
                });
                setPost(null);
              } catch (err) {
                setError(err.message);
              }
            }}
            fullText={true}
            my={location.state.my}
          />

          {editing && (
            <div className="edit-section mt-3">
              <input
                type="text"
                className="form-control mb-2"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />

              <BlogEditor
                value={editedContent}
                onChange={(html) => setEditedContent(html)}
              />

              <div className="mt-2 d-flex gap-2">
                <button className="btn btn-success" onClick={saveEdit}>
                  Зберегти
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditing(null)}
                >
                  Скасувати
                </button>
              </div>

              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
          )}
        </div>
      ) : (
        <div>
          <Posts posts={[post]} fullText={true} />
        </div>
      )}
    </div>
  );
};

export default OnePostsPage;
