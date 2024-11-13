// test/quiz.test.js

const request = require('supertest');
const { expect } = require('chai');
const express = require('express');
const quizRoutes = require('../routes/quizRoutes');
const app = express();

app.use(express.json());
app.use('/api', quizRoutes); // Assuming your routes are in 'quizRoutes.js'

// Mock Data
let quizId;
let questionId;

describe('Quiz API', () => {
  it('should create a new quiz', async () => {
    const quiz = {
      title: "Sample Quiz",
      questions: [
        {
          text: "What is 2 + 2?",
          options: ["3", "4", "5", "6"],
          correct_option: 1
        },
        {
          text: "What is 5 + 3?",
          options: ["7", "8", "9", "10"],
          correct_option: 1
        }
      ]
    };

    const res = await request(app)
      .post('/api/quizzes')
      .send(quiz)
      .expect(201);

    expect(res.body.title).to.equal("Sample Quiz");
    expect(res.body.questions).to.have.lengthOf(2);

    quizId = res.body.id; // Save quizId for future tests
    questionId = res.body.questions[0].id; // Save questionId for answer testing
  });

  it('should get a quiz by ID', async () => {
    const res = await request(app)
      .get(`/api/quizzes/${quizId}`)
      .expect(200);

    expect(res.body.id).to.equal(quizId);
    expect(res.body.title).to.equal("Sample Quiz");
    expect(res.body.questions).to.have.lengthOf(2);
  });

  it('should submit an answer and get feedback', async () => {
    const answer = {
      selected_option: 1
    };

    const res = await request(app)
      .post(`/api/quizzes/${quizId}/questions/${questionId}/answers`)
      .send(answer)
      .expect(200);

    expect(res.body.is_correct).to.equal(true);
  });

  it('should get results for a quiz', async () => {
    const result = {
      quiz_id: quizId,
      user_id: 1,
      score: 1,
      answers: [
        {
          question_id: questionId,
          selected_option: 1,
          is_correct: true
        }
      ]
    };

    const res = await request(app)
      .get(`/api/quizzes/${quizId}/results`)
      .expect(200);

    expect(res.body.quiz_id).to.equal(quizId);
    expect(res.body.score).to.equal(1);
  });

  it('should return 404 for quiz not found', async () => {
    const res = await request(app)
      .get('/api/quizzes/9999')
      .expect(404);
  });
});
