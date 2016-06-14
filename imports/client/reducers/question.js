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
			if(state.answer.length == guess.length) {
				// submit their result (right or wrong) to state
				state.submissions.push({
					operator: state.operator,
					num1: state.num1,
					num2: state.num2,
					answer: answer,
					guess: guess
				});
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

					return evaluateQuestion(state, num1, num2);

				// user gets the question wrong 
				} else {
					//user has 3 or less questions wrong they can continue
					if(state.wrong < state.lives) {
						return {
							...state,
							guess: '',
							hint: true,
							hintMsg: showHintMsg(state), 
							wrong: state.wrong += 1
						};
					} else {
						// game over if user gets more then 3 wrong!
						return {
							...state,
							gameOver: true,
							seconds: state.totalTime,
							winner: isWinner(state)
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
		winner: isWinner(state),
		progressWidth: 100
	}
}

function countdown(state) {
	return {
		...state,
		seconds: state.seconds -= 1,
		progressWidth: parseFloat(state.seconds / state.totalTime * 100)
	}
}

function evaluateQuestion(state, num1, num2) {
	switch(state.operator) {
		case '+':
			return {
				...state,
				num1: num1,
				num2: num2,
				answer: _.add(num1, num2).toString(),
				guess: '',
				right: state.right += 1
			};
		case '-':
			return {
				...state,
				num1: num1,
				num2: num2,
				answer: _.subtract(num1, num2).toString(),
				guess: '',
				right: state.right += 1
			};
		case 'x':
			return {
				...state,
				num1: num1,
				num2: num2,
				answer: _.multiply(num1, num2).toString(),
				guess: '',
				right: state.right += 1
			};
		case '/':
			const product = _.multiply(num1, num2).toString();
			return {
				...state,
				num1: product,
				num2: num2,
				answer: num1,
				guess: '',
				right: state.right += 1
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
			if(state.num1 == 1 && state.num2 == 1) {
				return 'Use Count-On.  Say "one, two".';
			} else if(state.num1 == 2 && state.num2 == 1) {
				return 'Use Count-On.  Start with the larger number 2 and say "two, three".';
			} else if(state.num1 == 2 && state.num2 == 2) {
				return 'Use Count-On.  Start with the larger number 2 and say "two, three, four".';
			} else if(state.num1 == 3 && state.num2 == 1) {
				return 'Use Count-On.  Start with the larger number 3 and say "three, four".';
			} else if(state.num1 == 3 && state.num2 == 2) {
				return 'Use Count-On.  Start with the larger number 3 and say "three, four, five".';
			} else if(state.num1 == 3 && state.num2 == 3) {
				return 'Use Count-On.  Start with the first 3 and say "three, four, five, six".'
			} else if(state.num1 == 4 && state.num2 == 1) {
				return 'Use Count-On.  Start with the larger number 4 and say "four, five".';
			} else if(state.num1 == 4 && state.num2 == 2) {
				return 'Use Count-On.  Start with the larger number 4 and say "four, five, six".';
			} else if(state.num1 == 4 && state.num2 == 3) {
				return 'Use Count-On.  Start with the larger number 4 and say "four, five, six, seven".';
			} else if(state.num1 == 4 && state.num2 == 4) {
				return 'Use Count-On.  Start with one of the 4s and say "four, five, six, seven, eight".';
			} else if(state.num1 == 5 && state.num2 == 1) {
				return 'Use Count-On.  Start with the 5 and say "five, six".';
			} else if(state.num1 == 5 && state.num2 == 2) {
				return 'Use Count-On.  Start with the 5 and say "five, six, seven".';
			} else if(state.num1 == 5 && state.num2 == 3) {
				return 'Use Count-On.  Start with the 5 and say "five, six, seven, eight".';
			} else if(state.num1 == 5 && state.num2 == 4) {
				return 'Use Count-On.  Start with the 5 and say "five, six, seven, eight, nine".';
			} else if(state.num1 == 5 && state.num2 == 5) {
				return 'Use Count-On.  Start with the first 5 and say "five, six, seven, eight, nine, ten".';
			} else if(state.num1 == 6 && state.num2 == 1) {
				return 'Use Count-On.  Start with the 6 and say "six, seven".';
			} else if(state.num1 == 6 && state.num2 == 2) {
				return 'Use Count-On.  Start with the 6 and say "six, seven, eight".';
			} else if(state.num1 == 6 && state.num2 == 3) {
				return 'Use Count-On.  Start with the 6 and say "six, seven, eight, nine".';
			} else if(state.num1 == 6 && state.num2 == 4) {
				return 'Use Count-On.  Start with the 6 and say "six, seven, eight, nine, ten".';
			} else if(state.num1 == 6 && state.num2 == 5) {
				return 'Use Anchor10.  Start with the 6.  Recognize that 5 is 4 + 1.  So think of 6+5 as 6+4+1 = 10+1 = 11';
			} else if(state.num1 == 6 && state.num2 == 6) {
				return 'Use Anchor10.  Start with the 6.  Recognize that 6 is 4 + 2.  So think of 6+6 as 6+4+2 = 10+2 = 12';
			} else if(state.num1 == 7 && state.num2 == 1) {
				return 'Use Count-On.  Say "seven, eight".  The answer is 8.';
			} else if(state.num1 == 7 && state.num2 == 2) {
				return 'Use Count-On.  Start with the larger number, 7, and then extend the count by the smaller number, 2.  In this case, say "seven, eight, nine" and the answer is 9.  ';
			} else if(state.num1 == 7 && state.num2 == 3) {
				return 'Use Count-On.  Start with the larger number, 7, and then extend the count by the smaller number, 3.  In this case, say "seven, eight, nine, ten" and the answer is 10.  ';
			} else if(state.num1 == 7 && state.num2 == 4) {
				return 'Use Anchor10.  Start with the 7.  Recognize that 4 is 3+1.  So think of 7+4 as 7+3+1 = 10+1 = 11';
			} else if(state.num1 == 7 && state.num2 == 5) {
				return 'Use Anchor10.  Start with the 7.  Recognize that 5 is 3+2.  So think of 7+5 as 7+3+2 = 10+2 = 12';
			} else if(state.num1 == 7 && state.num2 == 6) {
				return 'Use Anchor10.  Start with the 7.  Recognize that 6 is 3+3.  So think of 7+6 as 7+3+3 = 10+3 = 13';
			} else if(state.num1 == 7 && state.num2 == 7) {
				return 'Use Anchor10.  Start with the 7.  Recognize that the other 7 is 3+4.  So think of 7+7 as 7+3+4 = 10+4 = 14';
			} else if(state.num1 == 8 && state.num2 == 1) {
				return 'Use Count-On.  Say "eight, nine".  The answer is 9.';
			} else if(state.num1 == 8 && state.num2 == 2) {
				return 'Use Count-On.  Start with the larger number, 8, and then extend the count by the smaller number, 2.  In this case, say "eight, nine, ten" and the answer is 10.  ';
			} else if(state.num1 == 8 && state.num2 == 3) {
				return 'Use Count-On.  Start with the larger number, 8, and then extend the count by the smaller number, 3.  In this case, say "nine, ten, eleven" and the answer is 11.  ';
			} else if(state.num1 == 8 && state.num2 == 4) {
				return 'Use Anchor10.  Start with the 8.  Recognize that 4 is 2+2.  So think of 8+4 as 8+2+2 = 10+2 = 12';
			} else if(state.num1 == 8 && state.num2 == 5) {
				return 'Use Anchor10.  Start with the 8.  Recognize that 5 is 2+3.  So think of 8+5 as 8+2+3 = 10+3 = 13';
			} else if(state.num1 == 8 && state.num2 == 6) {
				return 'Use Anchor10.  Start with the 8.  Recognize that 6 is 2+4.  So think of 8+6 as 8+2+4 = 10+4 = 14';
			} else if(state.num1 == 8 && state.num2 == 7) {
				return 'Use Anchor10.  Start with the 8.  Recognize that 7 is 2+5.  So think of 8+7 as 8+2+5 = 10+5 = 15';
			} else if(state.num1 == 8 && state.num2 == 8) {
				return 'Use Anchor10.  Start with one of the 8s.  Recognize that the other 8 is 2+6.  So think of 8+8 as 8+2+6 = 10+6 = 16';
			} else if(state.num1 == 9 && state.num2 == 1) {
				return 'Use Count-On.  Start with the 9 and say "nine, ten".  The answer is 10.';
			} else if(state.num1 == 9 && state.num2 == 2) {
				return 'Use Count-On.  Start with the 9 and say "nine, ten, eleven".  The answer is 11.';
			} else if(state.num1 == 9 && state.num2 == 3) {
				return 'Use Count-On.  Start with the 9 and say "nine, ten, eleven, twelve".  The answer is 12.';
			} else if(state.num1 == 9 && state.num2 == 4) {
				return 'Use Anchor10.  Start with the 9.  Recognize that 4 is 1+3.  So think of 9+4 as 9+1+3 = 10+3 = 13';
			} else if(state.num1 == 9 && state.num2 == 5) {
				return 'Use Anchor10.  Start with the 9.  Recognize that 5 is 1+4.  So think of 9+5 as 9+1+4 = 10+4 = 14';
			} else if(state.num1 == 9 && state.num2 == 6) {
				return 'Use Anchor10.  Start with the 9.  Recognize that 6 is 1+5.  So think of 9+6 as 9+1+5 = 10+5 = 15';
			} else if(state.num1 == 9 && state.num2 == 7) {
				return 'Use Anchor10.  Start with the 9.  Recognize that 7 is 1+6.  So think of 9+7 as 9+1+6 = 10+6 = 16';
			} else if(state.num1 == 9 && state.num2 == 8) {
				return 'Use Anchor10.  Start with the 9.  Recognize that 8 is 1+7.  So think of 9+8 as 9+1+7 = 10+7 = 17';
			} else if(state.num1 == 9 && state.num2 == 9) {
				return 'Use Anchor10.  Start with one of the 9s.  Recognize that the other 9 is 1+8.  So think of 9+9 as 9+1+8 = 10+8 = 18';
			} else {
				return "Opps, that wasn't the right answer. Try that one again.";
			}
		default:
			return "Opps, that wasn't the right answer. Try that one again."
	}
}

