import React from 'react';

const Winner = React.createClass({
	render() {
		return (
			<div className='container loser'>
				<div className='text'>You Win!</div>
				<h1>New levels coming soon.</h1>
				<button className='submit' onClick={this.props.resetGame.bind(this)}>start again</button>
			</div>
		)
	}
});

export default Winner;
