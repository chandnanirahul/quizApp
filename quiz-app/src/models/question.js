// models/question.js
module.exports.Question = function(id, text, options, correct_option) {
    this.id = id;
    this.text = text;
    this.options = options;
    this.correct_option = correct_option;
  };
  