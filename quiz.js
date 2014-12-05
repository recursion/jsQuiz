/******************************************************
 *              JAVASCRIPT QUIZ
 * written by: recursion
 *
 * A simple javascript Quiz application.
 * It will display a series of questions and answers
 * and keep track of the users score.
 * The goal of this quiz is to better learn javascript
 * as well as HTML and DOM usage.
 * ****************************************************/
/* Global Variables */
var score = 0;
var currentQuestion = 0;  /* Index of the current question in qAndA Array */

/* Setup some Quiz Questions and answers */
// This is an array of objects which contain a Question, an array of possible answers
// and an "Answer" which is the index of the possibleAnswers array 
// that contains the correct answer
var qAndA = [{
    question:'What is the javascript keyword for setting an integer variable?', 
    possibleAnswers: ['var', 'let', 'int', 'none of the above'], 
    answer: 0
  },
  {
    question:'What is the proper way to assign a value to the (already created) variable x?', 
    possibleAnswers: ['x+++', 'x=3', '3+=x', 'none of the above'], 
    answer: 1
  },
  {
    question:'What is hoisting?', 
    possibleAnswers: ['Lifting variables out of undefined.', 'Lifting variables to the top of functions', 'Lifting function statements to the top of the script', 'none of the above'], 
    answer: 2
  },
];

// Assign variables to some commonly used document nodes
var questionHeading = document.getElementById('question');
var answer1Label = document.getElementById('answer1Label');
var answer2Label = document.getElementById('answer2Label');
var answer3Label = document.getElementById('answer3Label');
var answer4Label = document.getElementById('answer4Label');
var quizNode = document.getElementById('quiz');

// reveal the score to the user.
function revealScore(){
  showResult('Quiz complete.\nYour score is: ' + score);

}

// Hide the form and show the result
function showResult(resultText){
  // Grab any html node/elements we need
  var result = document.createElement('h3');
  result.id = 'result';

  // Set result node text to the result
  result.textContent = resultText;

  // Hide the form element    
  quizNode.style.visibility='hidden';
  // Insert the result before the form element
  document.getElementById('container').insertBefore(result, document.getElementById('quiz'));
}

// Hide the result node and unhide the form node.
function transitionQuestions(){
  var resultNode = document.getElementById('result');
  document.getElementById('container').removeChild(resultNode);
  quizNode.style.visibility='visible';
}

// Set the current form to the question at qAndAIndex
function populateForm(qAndAIndex){
  if(qAndAIndex === 'undefined' || qAndAIndex > qAndA.length){
    return;
  }
  // Set the Question Text
  questionHeading.textContent = qAndA[qAndAIndex].question;

  // Set the Question Possible answers
  answer1Label.textContent = qAndA[qAndAIndex].possibleAnswers[0];
  answer2Label.textContent = qAndA[qAndAIndex].possibleAnswers[1];
  answer3Label.textContent = qAndA[qAndAIndex].possibleAnswers[2];
  answer4Label.textContent = qAndA[qAndAIndex].possibleAnswers[3];
}
// Respond to the nextQuestion button being pushed.
function nextQuestion(){
  if(currentQuestion === qAndA.length){
    return;
  }
  // Setup variables
  var resultText; 
  var selectedAnswer;
  var answerSelected;

  // Setup a correctAnswer variable that I can use through out the function
  var correctAnswer = qAndA[currentQuestion].possibleAnswers[qAndA[currentQuestion].answer];

  // Create an array of our radio inputs
  var radioAnswers = [
                      document.getElementById('answer1'),
                      document.getElementById('answer2'),
                      document.getElementById('answer3'),
                      document.getElementById('answer4')
                    ];

  // Verify that some answer was selected
  for(var i = 0; i < radioAnswers.length; i++){
  // iterate through each radio button and 
  // check to see if one is selected
  // if there is not then answerSelected stays false 
    if(radioAnswers[i].checked){
      answerSelected = i;
      break;
    }
  }
  // If no answer was selected alert the user and return from this function
  if(typeof answerSelected === 'undefined'){
    alert('You did not select an answer!');
    return;

  // An answer was selected
  } else {
    // Instantiate a selectedAnswer variable since we know we have one
    selectedAnswer = qAndA[currentQuestion].possibleAnswers[answerSelected];
    resultText = '';

    // Check the answer and inform the user
    if( selectedAnswer === correctAnswer){
      // Correct answer
      resultText = 'Correct!';
      score++;
    } else {
      // Incorrect answer
      resultText = selectedAnswer + ' is incorrect.\nThe correct answer is: ' + correctAnswer;
      score--;
    }
    // reset the radio boxes
    radioAnswers[currentQuestion].checked = false;

    showResult(resultText);

    // make sure we have more questions
    if(qAndA.length > ++currentQuestion){
      // Load up the next question.
      populateForm(currentQuestion);

      // set a short timer to delete the result and unhide the form
      window.setTimeout(transitionQuestions, 1000);
    } else {
      // no more questions show the final result to the user.
      revealScore();
    }
  }
}

// Do initial form population
populateForm(currentQuestion);

console.log('Done loading javascript.');

