import express from "express";
import {
  getAllPostsController,
  createPostController,
  getPostByIdController,
  deletePostByIdController,
} from "../controllers/posts.js";

const postRoutes = express.Router();

postRoutes.get("/", getAllPostsController);
postRoutes.post("/", createPostController);
postRoutes.get("/:id", getPostByIdController);
postRoutes.delete("/:id", deletePostByIdController);

export default postRoutes;
