import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import ProgressBar from './ProgressBar';
import { _ } from 'lodash';

class Question extends React.Component{
	constructor(props) {
		super(props);

		this.state = {
		  student: false,
		  question: props.question,
		  borderColor: props.question.borderColor
		}
	}
	question() {
		const question = this.props.question;
		return <div style={{ 'fontSize': '1.2em'}} className='question'>{ question.num1 + " " + question.operator + " " + question.num2 } = { question.guess }</div>;
	}
	right() {
		return <div className='question'>{ this.props.question.right }</div>
	}
	wrong() {
		const question = this.props.question;
		return <div className='text'>lives remaining: { question.lives - question.wrong }</div>
	}
	keypad() {
		const keys = [];
		[7,8,9,4,5,6,1,2,3].map( i => { keys.push(this.key(i)); });

		return keys;
	}
	pressKey(i){
		this.props.pressKey(i)
		console.log('clear')
		console.log(this.state.question, 'awesome')

	}
	key(i) {
		return <div className='button' key={i} onClick={this.pressKey.bind(this, i)}>
				<div className='btn-inner'>
					{ i }
				</div>
			   </div>
	}
	render() {
		const question = this.props.question;
		console.log(question)
		const width = parseFloat(question.seconds / question.totalTime * 100);
		const width2 = 100 - parseFloat(this.props.question.right / this.props.question.winningThreshold * 100);
		return (
			<CSSTransitionGroup transitionName="question" transitionAppear={true} transitionAppearTimeout={1000} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
				<ProgressBar width={width2} />
				<ProgressBar width={width} />
				<div style={{ border: '5px solid ' + question.borderColor }} className='wrapper'>
					{ this.question() }
					<div className='buttons'>
						{ this.keypad() }
						<div className='button white'></div>
						<div className='button' onClick={this.pressKey.bind(this, 0)}>
							<div className='btn-inner'>
							0
							</div>
						</div>
						<div className='button white'></div>
					</div>
				</div>
			</CSSTransitionGroup>
		)
	}
}

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