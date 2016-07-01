import { _ } from 'lodash';
import defaultState from '../defaultState';

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


// state where times runs out 
function timeRunsOut(state, submissions) {
	return {
		...state,
		timerOn: false,
		gameOver: true,
		seconds: state.totalTime,
		winner: isWinner(state),
		submissions: submissions
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
	return state.seconds <= state.penalty ? timeRunsOut(state, submissions) : wrongButContinue(state, submissions)
}


function wrongButContinue(state, submissions) {
	return {
		...state,
		guess: '',
		hint: true,
		hintMsg: showHintMsg(state), 
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

// TODO: add pttrn's hints for each possible question and find a way to refactor
function showHintMsg(state) {
	switch(state.operator) {
		case '+':
			for(var i = 1; i <= state.max; i++) {
				for(var n = 1; n <= i; n++) {
					if(state.num1 == i && state.num2 == n) {
						return i + n <= 10 ? countOn(i, n) : anchor10(i, n);
					}
				}
			}
		case '-':
			for(var i = 1; i <= state.max; i++) {
				for(var n = 1; n <= i; n++) {
					if(i > 10 && i - n < 9) {
						return subtractAnchor10(i, n);
					} else {
						if(state.num1 == i && state.num2 == n) {
							return i - n <= 3 ? countBack(i, n) : equivalentAddition(i, n);
						}
					}
				}
			}
		default:
			return "Opps, that wasn't the right answer. Try that one again.";
	}
}

function subtractAnchor10(num1, num2) {
	const diff = num1 - 10;
	const decomp = num2 - diff;
	const answer = num1 - num2;
	return 'Use Anchor10. Subtract ' + diff + ' from ' + num1 + ' to get to 10. Then subtract another ' + decomp + ' to get to ' + answer;
}

function equivalentAddition(num1, num2) {
	return 'What added to ' + num2 + ' gives you ' + num1 + '?';
}

function countBack(num1, num2) {
	return 'Use Count-Back. Say "' + countOnWords(countBackArr(num1, num2)) + '".'
}

function countBackArr(num1, num2) {
	let arr = [];
	for(var x = num1; x >= num2; x--) {
		arr.push(x);
	}
	return arr;
}

function countOn(num1, num2) {
	return 'Use Count-On. Start with ' + num1 + ' and say "' + countOnWords(countOnArr(num1 , num2)) + '".'
}

function anchor10(num1, num2) {
	const sum = num1 + num2;
	let remainder = 10 - num1;
	let decomp = num2 - remainder;
	return 'Use Anchor10. Start with ' + integerToWord(num1) + '. Recognize that ' + num2 + ' is ' + remainder + '+' + decomp + '.' +
		" So think of " + num1 + '+' + num2 + " as " + num1 + "+" + remainder + '+' + decomp + " = 10+" + decomp + " = " + sum;
}

function countOnWords(arr) {
	return arr.map( i => integerToWord(i)).join(', ');
}

function countOnArr(num1 , num2) {
	const sum = num1 + num2;
	let arr = [];
	for(var x = num1; x <= sum; x++) {
		arr.push(x);
	}
	return arr;
}

function integerToWord(num) {
	switch(num) {
		case 1:
			return 'one';
		case 2:
			return 'two';
		case 3: 
			return 'three';
		case 4:
			return 'four';
		case 5: 
			return 'five';
		case 6:
			return 'six';
		case 7:
			return 'seven';
		case 8:
			return 'eight';
		case 9:
			return 'nine';
		case 10:
			return 'ten';
		default:
			return 'zero';
	}
}

