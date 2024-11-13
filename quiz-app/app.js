const express = require('express');
const bodyParser = require('body-parser');
const quizRoutes = require('./routes/quizRoutes');

const app = express();
app.use(bodyParser.json());
app.use('/api', quizRoutes);

app.get('/', (req, res) => {
  res.send('Quiz API');
});

module.exports = app;
