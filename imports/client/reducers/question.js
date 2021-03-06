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
			const newState = pressKey(state, action)
			return newState

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
			switch(challenge.operator){
				case '+':
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
				break;

				case '-':
					return {
						...state,
						min: parseInt(challenge.min),
						max: parseInt(challenge.max),
						operator: challenge.operator,
						num1: 2,
						num2: 1,
						answer: '1',
						winningThreshold: parseInt(challenge.right),
						totalTime: parseInt(challenge.time),
						wrong: 0,
						seconds: parseInt(challenge.time),
						challengeId: action.challenge._id
					}
				break;

				case 'x':
					return {
						...state,
						min: parseInt(challenge.min),
						max: parseInt(challenge.max),
						operator: challenge.operator,
						num1: 2,
						num2: 1,
						answer: '2',
						winningThreshold: parseInt(challenge.right),
						totalTime: parseInt(challenge.time),
						wrong: 0,
						seconds: parseInt(challenge.time),
						challengeId: action.challenge._id
					}
				break;

				case '/':
					return {
						...state,
						min: parseInt(challenge.min),
						max: parseInt(challenge.max),
						operator: challenge.operator,
						num1: 2,
						num2: 1,
						answer: '2',
						winningThreshold: parseInt(challenge.right),
						totalTime: parseInt(challenge.time),
						wrong: 0,
						seconds: parseInt(challenge.time),
						challengeId: action.challenge._id
					}
				break;
				default:
					return {
						...state
					}
			}

		case "RESET_GAME":
			Meteor.call('insertAnswer', Object.assign({userId: Meteor.userId()}, state));
			return {
				...state,
				totalTime: state.totalTime,
				seconds: state.totalTime,
				timeTaken: 0,
				winner: false,
				penalty: 0,
				timerOn: false,
				gameOver: false,
				startGame: false,
				wrong: 0,
				submissions: [],
				operator: state.operator,
				right: 0
			}

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
	if(state.answer.length == guess.length) {
		guess = ''
	}
	return {
		...state,
		guess: guess,
		hint: true,
		wrong: state.wrong += 1,
		submissions: submissions,
		seconds: state.seconds -= state.penalty,
		borderColor: 'red'
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

	let num1 = _.random(state.min, state.max);
	let num2 = _.random(state.min, state.max);
	let answer = state.answer;

	while(answer == state.answer) {
		let num2 = _.random(state.min, state.max);
		let num1 = _.random(state.min, state.max);

		if(num2 > num1) {
			const larger = num2;
			const smaller = num1;
			num1 = larger;
			num2 = smaller;
		}

		switch(state.operator) {
			case '+':
				answer = num1 + num2
				return newAdditionQuestion(state, num1, num2, submissions)
			case '-':
				num1 >= num2 ? answer = num1 - num2 : answer = num2 - num1
				return newSubtractionQuestion(state, num1, num2, submissions);
			case 'x':
				answer = num1 * num2
				return newMultiplicationQuestion(state, num1, num2, submissions);
			case '/':
				num1 >= num2 ? answer = num1 / num2 : answer = num2 / num1
				return newDivisionQuestion(state, num1, num2, submissions)
			default:
				return state
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
		submissions: submissions,
		borderColor: '#fff'
	};
}

function newSubtractionQuestion(state, num1, num2, submissions) {
	if(num2 > num1) {
		num1 = num2
		num2 = num1
	}
	return {
		...state,
		num1: num1,
		num2: num2,
		answer: _.subtract(num1, num2).toString(),
		guess: '',
		right: state.right += 1,
		submissions: submissions,
		borderColor: '#fff'
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
		submissions: submissions,
		borderColor: '#fff'
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
		submissions: submissions,
		borderColor: '#fff'
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


