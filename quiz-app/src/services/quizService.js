// Service methods for Quiz-related operations

let quizzes = [];
let results = [];

const createQuizService = (quiz) => {
  quizzes.push(quiz);
  return quiz;
};

const getQuizByIdService = (id) => {
  return quizzes.find((quiz) => quiz.id === id);
};

const getResultsByQuizId = (quizId) => {
  return results.filter((result) => result.quiz_id === quizId);
};

module.exports = {
  createQuizService,
  getQuizByIdService,
  getResultsByQuizId
};
