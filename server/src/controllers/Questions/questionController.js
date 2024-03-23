import Question, { validateQuestion } from "../../models/Question.js";
import { logInfo, logError } from "../../util/logging.js";
import validationErrorMessage from "../../util/validationErrorMessage.js";
import Answer from "../../models/Answer.js";
import User from "../../models/User.js";
import QuestionLikes from "../../models/QuestionLikes.js";

export const getQuestions = async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm;
    let questions;
    if (searchTerm) {
      questions = await Question.find({
        $or: [
          { question_title: { $regex: searchTerm, $options: "i" } },
          { question_content: { $regex: searchTerm, $options: "i" } },
          { module_ids: { $regex: searchTerm, $options: "i" } },
        ],
      });
    } else {
      questions = await Question.find({});
    }

    res.status(200).json({ success: true, questions: questions });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to get questions, try again later",
    });
  }
};

export const getQuestionById = async (req, res) => {
  try {
    const questionId = req.params.questionId;
    const question = await Question.findById(questionId).lean();

    if (!question) {
      return res.status(404).json({ success: false, msg: "Question not found" });
    }

    const answers = await Answer.find({ question_id: questionId }).lean();

    if (answers?.length > 0) {
      const userIds = answers.map((answer) => answer.user_id);
      // Referance : https://mongoosejs.com/docs/queries.html
      const userNames = await User.find({ _id: { $in: userIds } }).select("name _id");

      question.answers = answers?.map((x) => {
        const user = userNames.find((y) => y.id === x.user_id);
        x.author = user?.name ?? "Unactive user";
        return x;
      });
    }

    // Add answers as a property of question
    res.status(200).json({
      success: true,
      result: question,
    });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to get questions, try again later",
    });
  }
};

export const createQuestion = async (req, res) => {
  try {
    const { question } = req.body;
    logInfo("Request:", question);

    if (typeof question !== "object") {
      res.status(400).json({
        success: false,
        msg: `You need to provide a 'question' object. Received: ${JSON.stringify(question)}`,
      });

      return;
    }

    const errorList = validateQuestion(question, true);

    if (errorList.length > 0) {
      res.status(400).json({ success: false, msg: validationErrorMessage(errorList) });
    } else {
      const newQuestion = await Question.create(question);
      logInfo("Question created successfully:", newQuestion);

      res.status(201).json({ success: true, question: newQuestion });
    }
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to post question, try again later",
    });
  }
};

export const deleteQuestion = async (req, res) => {
  const questionId = req.params.questionId;

  try {
    await Question.deleteOne({ _id: questionId });
    res.status(200).json({ success: true, msg: "Question deleted successfully" });
  } catch (error) {
    res.status(501).json({ success: false, msg: "Can not delete question, try again!" });
  }
};

export const likeQuestion = async (req, res) => {
  const { questionId } = req.params;
  const { user_id } = req.body;

  const likeItem = { user_id, question_id: questionId };

  try {
    const existingQuestionLike = await QuestionLikes.findOne(likeItem);

    if (existingQuestionLike) {
      await QuestionLikes.deleteOne(likeItem);
      await Question.findByIdAndUpdate(questionId, {
        $inc: { like_counter: -1 },
      });
      res.status(200).json({ success: true, likeItem: null });
    } else {
      const newQuestionLike = new QuestionLikes(likeItem);
      await newQuestionLike.save();
      await Question.findByIdAndUpdate(questionId, {
        $inc: { like_counter: 1 },
      });

      res.status(200).json({ success: true, likeItem });
    }
  } catch (error) {
    res.status(501).json({ success: false, msg: "Something went wrong, try again!" });
  }
};
