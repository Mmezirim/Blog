const express = require('express');
const bodyParser = require('body-parser')
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const quizQuestions = require('./questions.json')

app.get('/', (req, res) => {
    res.render('index', { quizQuestions });
});

app.post('/submit', (req, res) => {
    let score = 0;
    for (let i = 0; i < quizQuestions.length; i++) {
        const selectedOption = req.body[`option-${i}`];
        if (selectedOption == quizQuestions[i].correctAnswer) {
            score++;
        }
    }
    res.render('results', { score, totalQuestions: quizQuestions.length });
});
const port = 8080;
app.listen(port, () => {
    console.log('Server is running on port 8080');
});