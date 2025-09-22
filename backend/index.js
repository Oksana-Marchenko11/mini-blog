import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
// import postRoutes from "./routes/posts.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.DB_HOST)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Mini-blog app listening on port: ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1); // закриває всі запущені фонові процеси
  });
