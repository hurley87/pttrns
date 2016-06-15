import { _ } from 'lodash';
import defaultState from '../defaultState';
import showHintMsg from '../helpers/showHintMsg';

export default function question(state=defaultState, action) {
	switch(action.type) {
		case "START_GAME":
			return startGame(state);

		case "TIMER":
			return timer(state);

		case 'PRESS_KEY':
			return pressKey(state, action)

		case "CONTINUE_EVALUATION":
			return {
				...state,
				hint: false
			};

		case 'SHOW_HINT':
			return {
				...state,
				hint: true,
				hintMsg: showHintMsg(state)
			}

		case "RESET_GAME":
			return defaultState.question

		default: 
			return state;
	}
}

//////// 
// START_GAME
/////// 
function startGame(state) {
	return {
		...state,
		startGame: true,
		timerOn: true,
		guess: ''
	}	
}

//////// 
// TIMER
/////// 
function timer(state) {
	return state.seconds == 1 ? timeRunsOut(state) : countdown(state);	
}
// state where times runs out 
function timeRunsOut(state) {
	return {
		...state,
		timerOn: false,
		gameOver: true,
		seconds: state.totalTime,
		winner: isWinner(state)
	}
}

function countdown(state) {
	return {
		...state,
		seconds: state.seconds -= 1
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
	return guess === answer ? handleCorrect(state, submissions) : handleIncorrect(state, submissions)
}

// state where a user submits a reponse but not enough digits 
function inValidSubmission(state, guess) {
	return {
		...state,
		guess: guess
	};
}

function handleIncorrect(state, submissions) {
	return state.wrong < state.lives ? wrongButAlive(state) : noMoreLives(state);
}

//state where a user is wrong but can still play on - need a better name lol
function wrongButAlive(state) {
	return {
		...state,
		guess: '',
		hint: true,
		hintMsg: showHintMsg(state), 
		wrong: state.wrong += 1,
		submissions: submissions
	};
}

// state where game is over because a user runs out of lives
function noMoreLives(state) {
	return {
		...state,
		gameOver: true,
		seconds: state.totalTime,
		winner: false,
		submissions: submissions
	};
}

// TODO: refactor this
function handleCorrect(state, submissions) {

	let num1 = _.random(state.min, state.max);
	let num2 = _.random(state.min, state.max);

	// dont show the same question twice
	while(num1 == state.num1 && num2 == state.num2) {
		num1 = _.random(state.min, state.max);
		num2 = _.random(state.min, state.max);
	}

	// make sure num1 is greater then num2
	if(num2 > num1) {
		const larger = num2;
		const smaller = num1;
		num1 = larger;
		num2 = smaller;
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
	return {
		...state,
		num1: product,
		num2: num2,
		answer: num1,
		guess: '',
		right: state.right += 1,
		submissions: submissions
	};	
}

function isWinner(state) {
	return state.right >= state.winningThreshold;
}

