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

export function resetGame(challengeId) {
	return {
		type: "RESET_GAME",
		challengeId
	};
};

export function timer() {
	return {
		type: "TIMER"
	};
};

export function signUpError(error) {
	return {
		type: 'SIGNUP_ERROR',
		error
	}
}

export function updateQuestion(challenge) {
	return {
		type: 'UPDATE_QUESTION',
		challenge
	}
}


// submit game 
export function insertAnswer(answer) {
  return () => {
    Meteor.call('insertAnswer', answer);
  };
};
