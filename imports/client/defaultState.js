
// starting game variables - choose wisely
const min = 1;
const max = 9;
const num1 = 1;
const num2 = 2;
const answer = '3';
const totalTime = 60;
const winningThreshold = 42;
const startingOperator = '+';
const startingPenalty = 0;

//set default state of game
const defaultState = {
	question: {
		startGame: false,
		operator: startingOperator,
		min: min,
		max: max,
		num1: num1,
		num2: num2,
		answer: answer,
		answerArray: [num1, num2, answer],
		guess: '',
		hint: false,
		submissions: [],
		right: 0,
		wrong: 0,
		gameOver: false,
		level: 1,
		timerOn: false,
		seconds: totalTime,
		totalTime: totalTime,
		timeTaken: 0,
		winningThreshold: winningThreshold,
		winner: false,
		penalty: startingPenalty,
		borderColor: '#fff'

	},
	userState: {
		error: false,
		errorMsg: ''
	},
	challenge: {
		index: true,
		show: false
	}
}

export default defaultState;