# Quiz App API

## Overview

This is a simple RESTful API for managing quizzes, questions, answers, and results. The application allows users to create quizzes, retrieve quiz data, submit answers, and view quiz results.

## Features

- **Create a Quiz**: Define a quiz with a title and a set of multiple-choice questions.
- **Get Quiz**: Fetch the details of a quiz, including the questions (without revealing the correct answers).
- **Submit Answer**: Submit answers to questions and receive immediate feedback on correctness.
- **Get Results**: Retrieve the quiz results, including score and a summary of correct/incorrect answers.

## API Endpoints

- **POST /api/quizzes**
  - Create a new quiz.
  - **Request Body**:
    ```json
    {
      "title": "Sample Quiz",
      "questions": [
        {
          "text": "What is 2 + 2?",
          "options": ["3", "4", "5", "6"],
          "correct_option": 1
        }
      ]
    }
    ```
  - **Response**:
    ```json
    {
      "id": 1,
      "title": "Sample Quiz",
      "questions": [
        {
          "id": 1,
          "text": "What is 2 + 2?",
          "options": ["3", "4", "5", "6"],
          "correct_option": 1
        }
      ]
    }
    ```

- **GET /api/quizzes/:quizId**
  - Retrieve the quiz by ID without revealing the correct answers.
  - **Response**:
    ```json
    {
      "id": 1,
      "title": "Sample Quiz",
      "questions": [
        {
          "id": 1,
          "text": "What is 2 + 2?",
          "options": ["3", "4", "5", "6"]
        }
      ]
    }
    ```

- **POST /api/quizzes/:quizId/questions/:questionId/answers**
  - Submit an answer to a specific question in a quiz.
  - **Request Body**:
    ```json
    {
      "selected_option": 1
    }
    ```
  - **Response**:
    ```json
    {
      "is_correct": true,
      "correct_answer": "4"
    }
    ```

- **GET /api/quizzes/:quizId/results**
  - Get the user's results for a specific quiz.
  - **Response**:
    ```json
    {
      "quiz_id": 1,
      "user_id": 1,
      "score": 1,
      "answers": [
        {
          "question_id": 1,
          "selected_option": 1,
          "is_correct": true
        }
      ]
    }
    ```

## Setup Instructions

### Prerequisites
- **Node.js** (>=16.0.0)
- **npm** (Node package manager)

