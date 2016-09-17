import { _ } from 'lodash';
import defaultState from '../defaultState';
import { Meteor } from 'meteor/meteor'

export default function question(state=defaultState, action) {
	switch(action.type) {
		case "START_GAME":
			return {
				...state,
				startGame: true,
				timerOn: true,
				guess: '',
				seconds: state.totalTime
			}	

		case "TIMER":
			return state.seconds == 1 ? timeRunsOut(state, state.submissions) : countdown(state);	

		case 'PRESS_KEY':
			return pressKey(state, action)

		case "CONTINUE_EVALUATION":
			return {
				...state,
				hint: false,
				guess: ''
			};

		case 'SHOW_HINT':
			return {
				...state,
				hint: true,
				seconds: state.seconds -= state.penalty
			}

		case "UPDATE_QUESTION":
			let challenge = action.challenge.challenge
			return {
				...state,
				min: parseInt(challenge.min),
				max: parseInt(challenge.max),
				operator: challenge.operator,
				winningThreshold: parseInt(challenge.right),
				totalTime: parseInt(challenge.time),
				wrong: 0,
				seconds: parseInt(challenge.time),
				challengeId: action.challenge._id
			}

		case "RESET_GAME":
			Meteor.call('insertAnswer', Object.assign({userId: Meteor.userId()}, state));
			return defaultState.question

		default: 
			return state;
	}
}


// state where times runs out 
function timeRunsOut(state, submissions) {
	return {
		...state,
		timerOn: false,
		gameOver: true,
		startGame: false,
		seconds: state.totalTime,
		winner: isWinner(state),
		submissions: submissions
	}
}

function countdown(state) {
	return {
		...state,
		seconds: state.seconds -= 1,
		timeTaken: state.timeTaken += 1
	}
}

//////// 
// PRESS_KEY
/////// 
function pressKey(state, action) {
	const guess = state.guess + action.num;
	const answer = state.answer;

	// submission is valid if the answer to the question and their guess have the same number of digits
	return answer.length == guess.length ? validSubmission(state, guess, answer) : inValidSubmission(state, guess);
}

function validSubmission(state, guess, answer) {
	// submit their result (right or wrong) to state
	const submissions = state.submissions.concat([{
		operator: state.operator,
		num1: state.num1,
		num2: state.num2,
		answer: answer,
		guess: guess
	}]) 

	// user gets the question right, assign two random variables to 
	return guess === answer ? handleCorrect(state, submissions) : handleIncorrect(state, submissions, guess)
}

// state where a user submits a reponse but not enough digits 
function inValidSubmission(state, guess) {
	return {
		...state,
		guess: guess
	};
}

function handleIncorrect(state, submissions, guess) {
	return state.seconds <= state.penalty ? timeRunsOut(state, submissions) : wrongButContinue(state, submissions, guess)
}


function wrongButContinue(state, submissions, guess) {
	console.log(state)
	if(state.answer.length == guess.length) {
		guess = ''
	}
	return {
		...state,
		guess: guess,
		hint: true,
		wrong: state.wrong += 1,
		submissions: submissions,
		seconds: state.seconds -= state.penalty

	};
}

// state where game is over because time runs out
function timeRunsOut(state, submissions) {
	return {
		...state,
		gameOver: true,
		seconds: state.totalTime,
		winner: isWinner(state),
		submissions: submissions
	};
}

// TODO: refactor this
function handleCorrect(state, submissions) {

	if(state.right == state.winningThreshold - 1) {
		return {
			...state,
			gameOver: true,
			submissions: submissions,
			winner: true,
			right: state.right + 1,
			finalTime: state.timeTaken
		}
	}

	const upper = state.max + _.random(0, 5);
	let num1 = _.random(state.min, upper);
	let num2 = _.random(state.min, upper);

	while(num1 == state.answer || num2 == state.answer || num1 == num2) {
			num2 = _.random(state.min, upper);
			num1 = _.random(state.min, upper);

		// make sure num1 is greater then num2
		if(num2 > num1) {
			const larger = num2;
			const smaller = num1;
			num1 = larger;
			num2 = smaller;

			// dont show the same question twice
			while(num2 == state.num1 && num1 == state.num2) {
				num1 = _.random(state.min, state.max);
				num2 = _.random(state.min, state.max);
			}
		}
	}

	switch(state.operator) {
		case '+':
			return newAdditionQuestion(state, num1, num2, submissions);
		case '-':
			return newSubtractionQuestion(state, num1, num2, submissions);
		case 'x':
			return newMultiplicationQuestion(state, num1, num2, submissions);
		case '/':
			return newDivisionQuestion(state, num1, num2, submissions)
		default:
			return state
	}
}

function newAdditionQuestion(state, num1, num2, submissions) {
	const answer = _.add(num1, num2).toString()
	return {
		...state,
		num1: num1,
		num2: num2,
		answer: _.add(num1, num2).toString(),
		guess: '',
		right: state.right += 1,
		submissions: submissions
	};
}

function newSubtractionQuestion(state, num1, num2, submissions) {
	return {
		...state,
		num1: num1,
		num2: num2,
		answer: _.subtract(num1, num2).toString(),
		guess: '',
		right: state.right += 1,
		submissions: submissions
	};	
}

function newMultiplicationQuestion(state, num1, num2, submissions) {
	return {
		...state,
		num1: num1,
		num2: num2,
		answer: _.multiply(num1, num2).toString(),
		guess: '',
		right: state.right += 1,
		submissions: submissions
	};	
}

function newDivisionQuestion(state, num1, num2, submissions) {
	const product = _.multiply(num1, num2).toString();
	const answer = num1.toString();
	return {
		...state,
		num1: product,
		num2: num2,
		answer: answer,
		guess: '',
		right: state.right += 1,
		submissions: submissions
	};	
}

function isWinner(state) {
	return state.right >= state.winningThreshold;
}

function shuffle(array) {
  var i = 0
    , j = 0
    , temp = null

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }

  return array;
}


