import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import dotenv from "dotenv";
import uploadRoutes from "./routes/upload.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/upload", uploadRoutes);
mongoose
  .connect(process.env.DB_HOST)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Mini-blog app listening on port: ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
