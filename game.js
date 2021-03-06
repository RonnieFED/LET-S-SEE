const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarfull = document.querySelector('#progressBarfull');

let currentQuestion = {}
const question = document.querySelector('#question');
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = {}

 let questions = [
     {
     question: 'What is 2 + 2?',
     Choice1: '6',
     Choice2: '4',
     answer: 2,
     },
     {
     question: 'What color is the sky?',
     Choice1: 'Blue',
     Choice2: 'Red',
     answer: 2,
     },
    {
    question: 'What goes up when the rain comes down?',
    Choice1: 'Smoke',
    Choice2: 'Umbrella',
    answer: 2,
    },
    {
    question: 'What runs but never walks?',
    Choice1: 'River',
    Choice2: 'Cats',
    answer: 1,
    }
 ]

 const SCORE_POINTS = 100
 const MAX_QUESTIONS = 4

 startGame = () => {
     questionCounter = -1
     score = 0
     availableQuestions = [...questions]
     getNewQuestion()
 }

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score)
    return window.location.assign('/end.html')
    }

 questionCounter++
 progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
 progressBarfull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

 const questionIndex = Math.floor(Math.random() * availableQuestions.length)
 currentQuestion = availableQuestions[questionIndex]
 question.innerText = currentQuestion.question

 choices.forEach(choice =>{
     const number = choice.dataset['number']
     console.log(number)
     choice.innerText = currentQuestion['Choice' + number]
 })
 availableQuestions.splice(questionIndex, 1)
 acceptingAnswers = true
}
choices.forEach(choice =>
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        // dataset('number')
        const selectedAnswer = selectedChoice.value

        let classToApply = selectedAnswer ==currentQuestion.answer ? 'correct' : 'incorrect'
        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }
        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        },1000
        )
     } )
    )
incrementScore = num => {
    score =>num
    scoreText.innertext = score
}
startGame()
