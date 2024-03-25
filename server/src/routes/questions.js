import express from "express";
import { createQuestion, deleteQuestion, likeQuestion, getUserQuestions, getQuestionById, getQuestions } from "../controllers/Questions/questionController.js";

const questionsRouter = express.Router();

questionsRouter.get("/userQuestions/userId/:id", getUserQuestions);
questionsRouter.post("/create", createQuestion);
questionsRouter.delete("/:questionId/delete", deleteQuestion);
questionsRouter.post("/:questionId/like", likeQuestion);

const publicQuestionsRouter = express.Router();

publicQuestionsRouter.get("/", getQuestions);
publicQuestionsRouter.get("/:questionId", getQuestionById);

export { questionsRouter, publicQuestionsRouter };
