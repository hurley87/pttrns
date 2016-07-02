import React from 'react';
import ProgressBarContainer from '../containers/ProgressBar';

const Hint = React.createClass({
	render() {
		const question = this.props.question;
		return (
			<div>
				<ProgressBarContainer question={question} />
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