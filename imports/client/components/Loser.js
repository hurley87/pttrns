import React from 'react';

const Loser = React.createClass({
	right(submission, i) {
		return (
			<div className='right' key={i}>
				{submission.num1} {submission.operator} {submission.num2} = {submission.guess}
			</div>
		)
	},
	wrong(submission, i) {
		return (
			<li className='wrong' key={i}>
				{submission.num1} {submission.operator} {submission.num2} = {submission.answer} <small>( guessed {submission.guess} )</small> 
			</li>
		)
	},
	render() {
		const question = this.props.question;
		const submissions = question.submissions || [];
		return (
			<div className='container loser'>
				<div className='text'>Almost!</div>
				<h1>{question.right} right <br/> {question.wrong} wrong </h1>
				{ question.wrong > 0 ? <div className='text'>Review</div> : null }
				<ul>
					{ 
						submissions.map( (submission, i) => {
							return submission.guess == submission.answer ? null : this.wrong(submission, i)
						})
					}
				</ul> 
				<button className='submit' onClick={this.props.resetGame.bind(this)}>start again</button>
			</div>
		)
	}
});

export default Loser;