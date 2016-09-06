import React from 'react';

const StartGame = React.createClass({
	render() {
		return (
			<div>
				<button className='submit' onClick={this.props.start}>Start</button>
			</div>
		)
	}
});

export default StartGame;