import React from 'react';

const Loser = React.createClass({
	render() {
		const submissions = this.props.question.submissions;
		console.log(submissions)
		return (
			<div className='container'>
				<div className='text'>You Lose!</div> 
				<button className='submit' onClick={this.props.resetGame.bind(this)}>start again</button>
			</div>
		)
	}
});

export default Loser;