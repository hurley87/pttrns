import React from 'react';
import ChallengesList from './Challenges';

const Welcome = React.createClass({
	render() {
		return (
			<div className='container loser'>
				<div className='text'>pttrns</div>
				<h1>Answer {this.props.question.winningThreshold} questions as fast as you can.</h1>
				<button className='submit' onClick={this.props.start}>Start</button>
				<ChallengesList />
			</div>
		)
	}
});

export default Welcome;