const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// Load the quiz data
const questions = require('./questions.json');

// Define the quiz routes
app.get('/', (req, res) => {
  res.render('index', { questions });
});

app.post('/submit', (req, res) => {
  const answers = req.body;
  let score = 0;

  // Calculate the score
  questions.forEach((question, index) => {
    if (answers[question.id] === questions[index].correct) {
      score++;
    }
  });

  // Render the result page
  res.render('result', { score, questions });
});

