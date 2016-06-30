import React from 'react';

const Welcome = React.createClass({
	render() {
		return (
			<div className='container'>
				<div className='text'>
					Answer {this.props.question.winningThreshold} addition problems in {this.props.question.totalTime} seconds.
				</div> 
				<button className='submit' onClick={this.props.start}>Start</button>
			</div>
		)
	}
});

export default Welcome;