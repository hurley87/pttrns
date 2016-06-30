import React from 'react';
import Welcome from '../components/Welcome';

const WelcomeContainer = React.createClass({
	start() {
		this.props.startGame();
		let interval = setInterval(() => {
			this.props.timer()
			if(this.props.question.gameOver) clearInterval(interval);
		}, 1000);
	},
	render() {
		return !this.props.question.startGame && !this.props.question.gameOver ? <Welcome {...this.props} start={this.start} />  : null;
	}
});

export default WelcomeContainer;