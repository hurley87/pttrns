import React from 'react';

const Winner = React.createClass({
	render() {
		return (
			<div className='container'>
				<div className='text'>You Win!</div>
				<button className='submit' onClick={this.props.resetGame.bind(this)}>start again</button>
			</div>
		)
	}
});

export default Winner;
