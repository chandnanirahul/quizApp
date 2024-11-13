// models/quiz.js
const { Question } = require('./question');

module.exports.Quiz = function(id, title, questions) {
  this.id = id;
  this.title = title;
  this.questions = questions.map((q, index) => new Question(index + 1, q.text, q.options, q.correct_option));
};
