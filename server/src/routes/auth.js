import express from "express";
import { signUp, logIn, logOut } from "../controllers/Authentication/authController.js";

const authRouter = express.Router();

authRouter.post("/sign-up", signUp);
authRouter.post("/log-in", logIn);
authRouter.post("/log-out", logOut);

export default authRouter;
