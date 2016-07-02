import React from 'react';

const Welcome = React.createClass({
	render() {
		return (
			<div className='container loser'>
				<div className='text'>pttrns</div>
				<h1>Answer {this.props.question.winningThreshold} addition problems in {this.props.question.totalTime} seconds</h1>
				<button className='submit' onClick={this.props.start}>Start</button>
			</div>
		)
	}
});

export default Welcome;