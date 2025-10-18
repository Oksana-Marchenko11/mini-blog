import express from "express";
import {
  getAllUsersPostsController,
  getAllPostsController,
  createPostController,
  getPostByIdController,
  deletePostByIdController,
} from "../controllers/posts.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const postRoutes = express.Router();

postRoutes.get("/all-posts", getAllPostsController);
postRoutes.get("/my-posts", authMiddleware, getAllUsersPostsController);
postRoutes.post("/my-posts", authMiddleware, createPostController);
postRoutes.get("/all-posts/:id", authMiddleware, getPostByIdController);
postRoutes.delete("/:id", authMiddleware, deletePostByIdController);

export default postRoutes;
