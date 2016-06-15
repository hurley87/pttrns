import { _ } from 'lodash';
import defaultState from '../defaultState';

export default function question(state=defaultState, action) {
	switch(action.type) {
		case "START_GAME":
			return {
				...state,
				startGame: true,
				timerOn: true,
				guess: ''
			}

		case "TIMER":
			return state.seconds == 1 ? timeRunsOut(state) : countdown(state);

		//TODO: refactor this logic 
		case 'PRESS_KEY':
			const guess = state.guess + action.num;
			const answer = state.answer;
			// first see if user gets the 
			if(answer.length == guess.length) {
				// submit their result (right or wrong) to state
				const newSubmissionsCollection = state.submissions.concat([{
					operator: state.operator,
					num1: state.num1,
					num2: state.num2,
					answer: answer,
					guess: guess
				}]) 

				// user gets the question right, assign two random variables to 
				if(guess === answer) {
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

					return evaluateQuestion(state, num1, num2, newSubmissionsCollection);

				// user gets the question wrong 
				} else {
					//user has 3 or less questions wrong they can continue
					if(state.wrong < state.lives) {
						return {
							...state,
							guess: '',
							hint: true,
							hintMsg: showHintMsg(state), 
							wrong: state.wrong += 1,
							submissions: newSubmissionsCollection
						};
					} else {
						// game over if user gets more then 3 wrong!
						return {
							...state,
							gameOver: true,
							seconds: state.totalTime,
							winner: isWinner(state),
							submissions: newSubmissionsCollection
						};
					}
				}
			} else {
				return {
					...state,
					guess: guess
				};
			}

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

function evaluateQuestion(state, num1, num2, newSubmissionsCollection) {
	switch(state.operator) {
		case '+':
			return {
				...state,
				num1: num1,
				num2: num2,
				answer: _.add(num1, num2).toString(),
				guess: '',
				right: state.right += 1,
				submissions: newSubmissionsCollection
			};
		case '-':
			return {
				...state,
				num1: num1,
				num2: num2,
				answer: _.subtract(num1, num2).toString(),
				guess: '',
				right: state.right += 1,
				submissions: newSubmissionsCollection
			};
		case 'x':
			return {
				...state,
				num1: num1,
				num2: num2,
				answer: _.multiply(num1, num2).toString(),
				guess: '',
				right: state.right += 1,
				submissions: newSubmissionsCollection
			};
		case '/':
			const product = _.multiply(num1, num2).toString();
			return {
				...state,
				num1: product,
				num2: num2,
				answer: num1,
				guess: '',
				right: state.right += 1,
				submissions: newSubmissionsCollection
			};
		default:
			return state
	}
}

function isWinner(state) {
	return state.right >= state.winningThreshold;
}


// TODO: add pttrn's hints for each possible question and find a way to refactor
function showHintMsg(state) {
	switch(state.operator) {
		case '+':
			for(var i = 1; i <= 9; i++) {
				for(var n = 1; n <= i; n++) {
					if(state.num1 == i && state.num2 == n) {
						return i + n <= 10 ? countOn(i, n) : anchor10(i, n);
					}
				}
			}
		default:
			return "Opps, that wasn't the right answer. Try that one again."
	}
}

function countOn(i, n) {
	return 'Use Count-On. Start with ' + i + ' and say "' + countOnWords(countOnArr(i , n)) + '".'
}

function anchor10(i, n) {
	const sum = i + n;
	let remainder = 10 - i;
	let decomp = n - remainder;
	return 'Use Anchor10. Start with ' + integerToWord(i) + '. Recognize that ' + n + ' is ' + remainder + '+' + decomp + '.' +
		" So think of " + i + '+' + n + " as " + i + "+" + remainder + '+' + decomp + " = 10+" + decomp + " = " + sum;
}

function countOnWords(arr) {
	return arr.map( i => integerToWord(i)).join(', ');
}

function countOnArr(i , n) {
	const sum = i + n;
	let arr = [];
	for(var x = i; x <= sum; x++) {
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

