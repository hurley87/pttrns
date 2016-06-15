import React from 'react';

const Welcome = React.createClass({
	start() {
		this.props.startGame();
		let interval = setInterval(() => {
			this.props.timer()
			if(this.props.question.gameOver) clearInterval(interval);
		}, 1000);
	},
	welcome() {
		return (
			<div className='container'>
				<div className='text'>
					Answer {this.props.question.winningThreshold} addition problems in {this.props.question.totalTime} seconds.
				</div> 
				<div className='wrapper'>
					<button className='button submit' onClick={this.start}>Start</button>
				</div>
			</div>
		)
	},
	render() {
		return this.props.question.startGame ? null : this.welcome();
	}
});

export default Welcome;