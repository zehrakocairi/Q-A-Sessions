import express from "express";
import getUserQuestions from "../../controllers/User/getQuestions.js";

const userQuestionsRouter = express.Router();
userQuestionsRouter.get("/userId/:id", getUserQuestions);

export default userQuestionsRouter;
