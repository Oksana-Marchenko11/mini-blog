import { useState, useEffect } from "react";
import { Posts } from "../components/Posts";
import { EditPostModal } from "../components/EditPostModal";
import { fetchMyPosts, deleteMyPost, editMyPost } from "../api/posts";

const MyPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [editingPost, setEditingPost] = useState(null);

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
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Posts
        posts={posts}
        onDelete={handleDelete}
        onEdit={(post) => setEditingPost(post)}
      />

      {editingPost && (
        <EditPostModal
          show={!!editingPost}
          post={editingPost}
          onHide={() => setEditingPost(null)}
          onSave={handleEdit}
        />
      )}
    </div>
  );
};

export default MyPostsPage;
