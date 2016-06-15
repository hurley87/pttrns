
// starting game variables - choose wisely
const min = 1;
const max = 10;
const num1 = 1;
const num2 = 1;
const answer = '1';
const totalTime = 30;
const winningThreshold = 15;
const startingLives = 2;
const startingOperator = '/';

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
		hintMsg: '',
		submissions: [],
		right: 0,
		wrong: 0,
		gameOver: false,
		lives: startingLives,
		level: 1,
		timerOn: false,
		seconds: totalTime,
		totalTime: totalTime,
		winningThreshold: winningThreshold,
		winner: false
	}
}

export default defaultState;