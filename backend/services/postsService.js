import { Post } from "../models/posts.js";

export async function createPost({ title, content, author }) {
  const post = new Post({ title, content, author });
  await post.save();
  return post;
}
export async function getAllPosts() {
  const posts = await Post.find();
  return posts;
}

export async function getPostById(postId) {
  const onePost = await Post.findById(postId);
  return onePost;
}

export async function deleteById(postId) {
  const deletedPost = await Post.deleteOne({ _id: postId });
  return deletedPost;
}
