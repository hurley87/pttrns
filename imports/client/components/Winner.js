import React from 'react';

const Winner = React.createClass({
	winner() {
		return (
			<div className='container'>
				<div className='text'>You Win!</div>
				<div className='wrapper'>
					<button className='button submit' onClick={this.props.resetGame.bind(this)}>start again</button>
				</div> 
			</div>
		)
	},
	render() {
		return this.props.question.winner ? this.winner() : null;
	}
});

export default Winner;
