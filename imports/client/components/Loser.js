import React from 'react';

const Loser = React.createClass({
	loser() {
		return (
			<div className='container'>
				<div className='text'>You Lose!</div> 
				<div className='wrapper'>
					<button className='button submit' onClick={this.props.resetGame.bind(this)}>start again</button>
				</div>
			</div>
		)
	},
	render() {
		return this.props.question.gameOver && !this.props.question.winner ? this.loser() : null;

	}
});

export default Loser;