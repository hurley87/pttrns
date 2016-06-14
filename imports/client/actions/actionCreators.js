export function startGame() {
	return {
		type: 'START_GAME'
	}
}

export function pressKey(num) {
	return {
		type: 'PRESS_KEY',
		num
	};
};

export function showHint() {
	return {
		type: 'SHOW_HINT'
	};
};

export function continueEvaluation() {
	return {
		type: 'CONTINUE_EVALUATION'
	};
};

export function resetGame() {
	return {
		type: "RESET_GAME"
	};
};

export function timer() {
	return {
		type: "TIMER"
	};
};


// submit game 
export function insertAnswer(answer) {
  return () => {
    Meteor.call('insertAnswer', answer);
  };
};
