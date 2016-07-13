import React from 'react';
import ProgressBar from './ProgressBar';

const Hint = React.createClass({
	render() {
		const question = this.props.question;
		const width = parseFloat(question.seconds / question.totalTime * 100);
		const width2 = 100 - parseFloat(this.props.question.right / this.props.question.winningThreshold * 100);
		return (
			<div>
				<ProgressBar width={width2} />
				<ProgressBar width={width} />
				<div className='container loser'>
					{ question.guess != "" ? <div className='text'>You guessed { question.guess } :(</div> : null }
					<h1>{question.num1} {question.operator} {question.num2} = {question.answer }</h1> 
					<button className='submit' onClick={this.props.continueEvaluation.bind(this)}>continue</button>
				</div>
			</div>
		)
	}
});

export default Hint;