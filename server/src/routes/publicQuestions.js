import express from "express";
import { getQuestionById, getQuestions } from "../controllers/Questions/questionController.js";

const publicQuestionsRouter = express.Router();

publicQuestionsRouter.get("/", getQuestions);
publicQuestionsRouter.get("/:questionId", getQuestionById);

export default publicQuestionsRouter;
