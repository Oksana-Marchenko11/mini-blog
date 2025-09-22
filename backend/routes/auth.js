import express from "express";
import { loginController, registerController } from "../controllers/user.js";

const authRoutes = express.Router();

authRoutes.post("/login", loginController);
authRoutes.post("/register", registerController);

export default authRoutes;
