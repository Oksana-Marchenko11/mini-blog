import {
  createPost,
  getAllUsersPosts,
  getPostById,
  deleteById,
} from "../services/postsService.js";

export async function createPostController(req, res) {
  try {
    const author = req.user._id;
    const { title, content } = req.body;
    const post = await createPost({ title, content, author });
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function getAllUsersPostsController(req, res) {
  try {
    const userId = req.user._id;
    const posts = await getAllUsersPosts(userId);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getPostByIdController(req, res) {
  try {
    const { id } = req.params;
    const post = await getPostById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
export async function deletePostByIdController(req, res) {
  try {
    const { id } = req.params;
    const result = await deleteById(id);
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
