import express from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/sign-up", registerUser);

router.post("/sign-in", loginUser);

export default router;
