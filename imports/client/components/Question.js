import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import ProgressBar from './ProgressBar';
import { _ } from 'lodash';

const Question = React.createClass({
	question() {
		const question = this.props.question;
		return <div style={{ 'fontSize': '1.2em'}} className='question'>{ question.num1 + " " + question.operator + " " + question.num2 } = { question.guess }</div>;
	},
	right() {
		return <div className='question'>{ this.props.question.right }</div>
	},
	wrong() {
		const question = this.props.question;
		return <div className='text'>lives remaining: { question.lives - question.wrong }</div>
	},
	keypad() {
		const keys = [];
		this.props.question.answerArray.map( i => { keys.push(this.key(i)); });

		return keys;
	},
	pressKey(i){
		this.props.pressKey(i)
	},
	key(i) {
		return <div className='button' key={i} onClick={this.pressKey.bind(this, i)}>{ i }</div>
	},
	render() {
		const question = this.props.question;
		const width = parseFloat(question.seconds / question.totalTime * 100);
		const width2 = 100 - parseFloat(this.props.question.right / this.props.question.winningThreshold * 100);
		console.log(width2)
		return (
			<CSSTransitionGroup transitionName="question" transitionAppear={true} transitionAppearTimeout={1000} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
				<ProgressBar width={width2} />
				<div className='wrapper'>
					{ this.question() }
					<div className='buttons'>
						{ this.keypad() }
					</div>
				</div>
				<ProgressBar width={width} />
			</CSSTransitionGroup>
		)
	}
});

function shuffle(array) {
  var i = 0
    , j = 0
    , temp = null

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }

  return array;
}

export default Question;