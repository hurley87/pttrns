import React from 'react';

const Welcome = React.createClass({
	render() {
		return (
			<div className='container loser'>
				<div className='text'>pttrns</div>
				<h1>Answer {this.props.question.winningThreshold} as fast as you can.</h1>
				<button className='submit' onClick={this.props.start}>Start</button>
			</div>
		)
	}
});

export default Welcome;