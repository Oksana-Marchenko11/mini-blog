import express from "express";
import {
  getAllUsersPostsController,
  getAllPostsController,
  createPostController,
  getPostByIdController,
  deletePostByIdController,
  updatePostByIdController,
} from "../controllers/posts.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const postRoutes = express.Router();

postRoutes.get("/all-posts", getAllPostsController);
postRoutes.get("/my-posts", authMiddleware, getAllUsersPostsController);
postRoutes.post("/my-posts", authMiddleware, createPostController);
postRoutes.get("/my-posts/:id", authMiddleware, getPostByIdController);
postRoutes.patch("/my-posts/:id", authMiddleware, updatePostByIdController);
postRoutes.delete("/my-posts/:id", authMiddleware, deletePostByIdController);

export default postRoutes;
