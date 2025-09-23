import express from "express";
import {
  getAllPostsController,
  createPostController,
  getPostByIdController,
} from "../controllers/posts.js";

const postRoutes = express.Router();

postRoutes.get("/", getAllPostsController);
postRoutes.post("/", createPostController);
postRoutes.get("/:id", getPostByIdController);

export default postRoutes;
