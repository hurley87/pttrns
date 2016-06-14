import React from 'react';
import Welcome from './Welcome';
import Loser from './Loser';
import Winner from './Winner';
import Question from './Question';
import Hint from './Hint'

const Pttrns = React.createClass({
	start() {
		this.props.startGame();
		let interval = setInterval(() => {
			this.props.timer()
			if(this.props.question.gameOver) clearInterval(interval);
		}, 1000);
	},
	game() {
		return this.props.question.gameOver ? this.gameOver() : this.gameOn();
	},
	gameOn() {
		return this.props.question.hint ? <Hint {...this.props} /> : <Question {...this.props} /> 
	},
	gameOver() {
		return this.props.question.winner ? <Winner resetGame={this.props.resetGame} /> : <Loser resetGame={this.props.resetGame} /> 
	},
	render() {
		return this.props.question.startGame ? this.game() : <Welcome start={this.start} question={this.props.question} /> 
	}
});

export default Pttrns;