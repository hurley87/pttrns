import React from 'react';

const Winner = React.createClass({
	wrong(submission, i) {
		return (
			<li className='wrong' key={i}>
				{submission.num1} {submission.operator} {submission.num2} = {submission.answer} <small>( guessed {submission.guess} )</small> 
			</li>
		)
	},
	render() {
		const question = this.props.question;
		const challengeId = this.props.question.challengeId;
		console.log(question)
		return (
			<div className='container loser'>
				<div className='text'>{question.right} right </div>
				<h1>Final time: {question.timeTaken + 1} seconds.</h1>
				{ question.wrong == 0 ? null : <div className='text'>{question.wrong} wrong</div> }
				<ul>
					{ 
						question.submissions.map( (submission, i) => {
							return submission.guess == submission.answer ? null : this.wrong(submission, i)
						})
					}
				</ul> 
				<button className='submit' onClick={this.props.resetGame.bind(this, challengeId)}>Back</button>
			</div>
		)
	}
});

export default Winner;
