import {
  createPost,
  getAllUsersPosts,
  getAllPosts,
  getPostById,
  deleteById,
  editMyPost,
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
  console.log("✅ getAllUsersPostsController called");
  console.log("req.user:", req.user);
  try {
    console.log("aaa");
    const userId = req.user._id;
    console.log(userId);
    const posts = await getAllUsersPosts(userId);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getAllPostsController(req, res) {
  try {
    const posts = await getAllPosts();
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
    if (!result) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json({ message: "Post deleted successfully!!!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updatePostByIdController(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body; // title і/або content

    const post = await getPostById(id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    console.log("1:", req.user._id.toString());
    console.log("2:", post.author.toString());

    if (post.author._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Not authorized" });
    }

    const updatedPost = await editMyPost(id, updates);
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
