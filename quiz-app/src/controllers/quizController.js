const { Quiz } = require('../models/quiz');
const { Question } = require('../models/question');
const { Answer } = require('../models/answer');
const { Result } = require('../models/result');

let quizzes = [];
let results = [];

const createQuiz = (req, res) => {
  const { title, questions } = req.body;

  if (!title || !questions || questions.length === 0) {
    return res.status(400).json({ message: 'Title and questions are required.' });
  }

  const newQuiz = new Quiz(
    quizzes.length + 1,
    title,
    questions.map((q, index) => new Question(index + 1, q.text, q.options, q.correct_option))
  );
  
  quizzes.push(newQuiz);
  res.status(201).json(newQuiz);
};

const getQuiz = (req, res) => {
  const { quizId } = req.params;
  const quiz = quizzes.find((q) => q.id === parseInt(quizId));

  if (!quiz) {
    return res.status(404).json({ message: 'Quiz not found.' });
  }

  // Remove correct answer from the question
  const questions = quiz.questions.map(({ correct_option, ...question }) => question);
  res.status(200).json({ id: quiz.id, title: quiz.title, questions });
};

const submitAnswer = (req, res) => {
  const { quizId, questionId } = req.params;
  const { selected_option } = req.body;

  const quiz = quizzes.find((q) => q.id === parseInt(quizId));
  if (!quiz) return res.status(404).json({ message: 'Quiz not found.' });

  const question = quiz.questions.find((q) => q.id === parseInt(questionId));
  if (!question) return res.status(404).json({ message: 'Question not found.' });

  const isCorrect = question.correct_option === selected_option;
  const answer = new Answer(question.id, selected_option, isCorrect);

  let userResult = results.find((r) => r.quiz_id === quiz.id && r.user_id === 1); // Assume user_id = 1
  if (!userResult) {
    userResult = new Result(quiz.id, 1, 0, []);
    results.push(userResult);
  }

  userResult.answers.push(answer);
  if (isCorrect) userResult.score++;

  res.status(200).json({
    is_correct: isCorrect,
    correct_answer: question.options[question.correct_option],
  });
};

const getResults = (req, res) => {
  const { quizId } = req.params;
  const userResult = results.find((r) => r.quiz_id === parseInt(quizId) && r.user_id === 1);

  if (!userResult) {
    return res.status(404).json({ message: 'No results found for this quiz.' });
  }

  res.status(200).json(userResult);
};

module.exports = {
  createQuiz,
  getQuiz,
  submitAnswer,
  getResults,
};
