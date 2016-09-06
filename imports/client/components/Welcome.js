import React from 'react';
import ChallengesList from './Challenges';

const Welcome = React.createClass({
	startGame() {
		return (
			<div>
				<div className='text'>pttrns</div>
				<h1>Answer {this.props.question.winningThreshold} questions as fast as you can.</h1>
				<button className='submit' onClick={this.props.start}>Start</button>
			</div>
		)
	},
	render() {
		return (
			<div className='container loser'>
				<ChallengesList {...this.props} />
			</div>
		)
	}
});

export default Welcome;