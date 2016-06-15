import React from 'react';

const Welcome = React.createClass({
	render() {
		return (
			<div className='container'>
				<div className='text'>
					Answer {this.props.question.winningThreshold} addition problems in {this.props.question.totalTime} seconds.
				</div> 
				<div className='wrapper'>
					<button className='button submit' onClick={this.props.start.bind(this)}>Start</button>
				</div>
			</div>
		)
	}
});

export default Welcome;