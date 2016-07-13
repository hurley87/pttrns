import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import ProgressBar from './ProgressBar';

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
		[7,8,9,4,5,6,1,2,3].map( i => { keys.push(this.key(i)); });
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
				<ProgressBar width={width} />
				<div className='wrapper'>
					{ this.question() }
					<div className='buttons'>
						{ this.keypad() }
						<div className='button' onClick={this.props.resetGame.bind(this)}><i className="fa fa-chevron-left"></i></div>
						<div className='button' onClick={this.pressKey.bind(this, 0)}>0</div>
						<div className='button' onClick={this.props.showHint.bind(this)}><i className="fa fa-question"></i></div>
					</div>
					<div className='question'>
						<span style={{ 'float' : 'left', 'color':'#56D0B3'}}>{this.props.question.timeTaken}</span>
						<span style={{ 'float' : 'right', 'color':'#56D0B3'}}>{ this.props.question.right }/{ this.props.question.winningThreshold }</span>
					</div>
				</div>
				
			</CSSTransitionGroup>
		)
	}
});

export default Question;