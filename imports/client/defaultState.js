
// starting game variables - choose wisely
const min = 1;
const max = 9;
const num1 = 1;
const num2 = 1;
const answer = '2';
const totalTime = 1600;
const winningThreshold = 40;
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
		penalty: startingPenalty
	}
}

export default defaultState;