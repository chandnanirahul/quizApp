// models/result.js
module.exports.Result = function(quiz_id, user_id, score, answers) {
    this.quiz_id = quiz_id;
    this.user_id = user_id;
    this.score = score;
    this.answers = answers;
  };
  