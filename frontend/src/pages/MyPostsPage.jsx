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
      console.log(data);
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
      setPosts(posts.filter((p) => p._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = async (post) => {
    console.log(post);
    const newTitle = prompt("Новий заголовок:", post.title);
    const newContent = prompt("Новий текст:", post.content);
    if (newTitle && newContent) {
      await editMyPost(post._id, { title: newTitle, content: newContent });
      setPosts(
        posts.map((p) =>
          p._id === post._id
            ? { ...p, title: newTitle, content: newContent }
            : p
        )
      );
      console.log(posts);
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
