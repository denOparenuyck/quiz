'use strict';

const DATA = [
    {
        question: 'What is the name of this object?',
        questionImg: 'img/question-img-1.jpg',
        answers: [
            {
                id: '1',
                value: 'peel',
                correct: true,
            },
            {
                id: '2',
                value: 'skin',
                correct: false,
            },
            {
                id: '3',
                value: 'orange',
                correct: false,
            },
            {
                id: '4',
                value: 'fruit',
                correct: false,
            }
        ]
    },
    {
        question: 'What fruit is shown in the picture?',
        questionImg: 'img/question-img-2.jpg',
        answers: [
            {
                id: '5',
                value: 'guava',
                correct: false,
            },
            {
                id: '6',
                value: 'mango',
                correct: false,
            },
            {
                id: '7',
                value: 'papaya',
                correct: false,
            },
            {
                id: '8',
                value: 'persimmon',
                correct: true,
            }
        ]
    },
    {
        question: 'What fruit is shown in the picture?',
        questionImg: 'img/question-img-3.jpg',
        answers: [
            {
                id: '9',
                value: 'longan',
                correct: false,
            },
            {
                id: '10',
                value: 'lychee',
                correct: false,
            },
            {
                id: '11',
                value: 'sapodilla',
                correct: true,
            },
            {
                id: '12',
                value: 'jujube',
                correct: false,
            }
        ]
    },
    {
        question: 'What is the plant in the picture?',
        questionImg: 'img/question-img-4.jpg',
        answers: [
            {
                id: '13',
                value: 'chamomile tea',
                correct: false,
            },
            {
                id: '14',
                value: 'linden tea',
                correct: false,
            },
            {
                id: '15',
                value: 'verbena tea',
                correct: false,
            },
            {
                id: '16',
                value: 'oolong tea',
                correct: true,
            }
        ]
    }
]




let localResults = {};

const quiz = document.getElementById('quiz');
const questions = document.getElementById('questions');
const indicator = document.getElementById('indicator');
const answers = document.getElementById('answers');
const results = document.getElementById('results');
const btnNext = document.getElementById('btn-next');
const btnRestart = document.getElementById('btn-restart');
const quizBlock = document.getElementById('quiz__block'); 

const renderQuestions = (index) => {
    renderIndicator(index + 1);

    questions.dataset.currentStep = index;

    // Create answers
    answers.innerHTML = '';
    DATA[index].answers.forEach(answer => {
        answers.innerHTML += `
            <li class="quiz__block-answer"> 
                <label>
                    <input class="answer-input" type="radio" name="${index}" value="${answer.id}">
                    ${answer.value}
                </label>
            </li>
        `;
    });

    document.querySelectorAll('.quiz__block-answer').forEach(answer => {
        let radioButton = answer.querySelector('.answer-input');

        radioButton.addEventListener('change', () => {
            if (radioButton.checked) {
                document.querySelectorAll('.quiz__block-answer').forEach(item => {
                    item.classList.remove('active');
                });
                answer.classList.add('active');
            } else {
                answer.classList.remove('active');
            }
        });

    });

    // Create questions
    questions.innerHTML = `
        <div class="quiz__question">
            <div class="quiz__question-img">
                <img src="${DATA[index].questionImg}" alt="">
            </div>
            <div class="quiz__question-text">
                ${DATA[index].question}
            </div>
        </div>
    `;
};




const renderResults = () => {
    let content = '';

    const getClassName = (answers, qustionIndex) => {
        let className = '';

        if(!answers.correct && answers.id === localResults[qustionIndex]){
            className = 'answer--invalid';
        }else if(answers.correct){
            className = 'answer--valid';
        }

        return className;
    };

    const getAnswers = (qustionIndex) => DATA[qustionIndex].answers
        .map((answer) => `<li class="${getClassName(answer, qustionIndex)}">${answer.value}</li>`)
        .join('');

    DATA.forEach((question, index) => {
        content += `
            <div class="quiz__result">
                <div class="quiz__result-question">
                    ${question.question}
                </div>
                <div class="quiz__result-answers">
                    <ul>
                        ${getAnswers(index)}
                    </ul>
                </div>
            </div>
        `
    });
    results.innerHTML = content;
};

const renderIndicator = (currentStep) => {
    indicator.innerHTML = `${currentStep}/${DATA.length}`
};


quiz.addEventListener('change', (event) => {
    if (event.target.classList.contains('answer-input')) {
        localResults[event.target.name] = event.target.value;
        btnNext.disabled = false;
    }
});



quiz.addEventListener('click', (event) => {

    if (event.target.classList.contains('btn-next')) {
        const nextQuestionIndex = Number(questions.dataset.currentStep) + 1;

        if (DATA.length === nextQuestionIndex) {
            results.parentElement.classList.add('result--visible');
            quizBlock.classList.add('hide');
            renderResults();
        } else {
            renderQuestions(nextQuestionIndex)
        }

        btnNext.disabled = true;
    }

    if (event.target.classList.contains('btn-restart')) {
        localResults = {};
        results.innerHTML = '';
        results.parentElement.classList.remove('result--visible');
        quizBlock.classList.remove('hide');
        renderQuestions(0);
    }

});

renderQuestions(0);