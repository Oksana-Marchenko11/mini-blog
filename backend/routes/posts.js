import express from "express";
import {
  getAllUsersPostsController,
  createPostController,
  getPostByIdController,
  deletePostByIdController,
} from "../controllers/posts.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const postRoutes = express.Router();

postRoutes.get("/", authMiddleware, getAllUsersPostsController);
postRoutes.post("/", authMiddleware, createPostController);
postRoutes.get("/:id", authMiddleware, getPostByIdController);
postRoutes.delete("/:id", deletePostByIdController);

export default postRoutes;
