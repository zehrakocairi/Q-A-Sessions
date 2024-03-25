import express from "express";
import { getUserQuestions } from "../../controllers/User/userController.js";

const userQuestionsRouter = express.Router();

userQuestionsRouter.get("/userId/:id", getUserQuestions);

export default userQuestionsRouter;
