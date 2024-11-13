const express = require('express');
const router = express.Router();
const {
  createQuiz,
  getQuiz,
  submitAnswer,
  getResults
} = require('../controllers/quizController');

// Define API routes
router.post('/quizzes', createQuiz); // Create a new quiz
router.get('/quizzes/:quizId', getQuiz); // Get a quiz by ID
router.post('/quizzes/:quizId/questions/:questionId/answers', submitAnswer); // Submit an answer for a question
router.get('/quizzes/:quizId/results', getResults); // Get quiz results

module.exports = router;
