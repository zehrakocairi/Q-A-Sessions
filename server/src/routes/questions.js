import express from "express";
import { createQuestion, deleteQuestion, likeQuestion } from "../controllers/Questions/questionController.js";

const questionsRouter = express.Router();

questionsRouter.post("/create", createQuestion);
questionsRouter.delete("/:questionId/delete", deleteQuestion);
questionsRouter.post("/:questionId/like", likeQuestion);
export default questionsRouter;
