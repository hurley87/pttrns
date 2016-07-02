import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import ProgressBarContainer from '../containers/ProgressBar';

const Question = React.createClass({
	question() {
		const question = this.props.question;
		return <div className='question'>{ question.num1 + " " + question.operator + " " + question.num2 }</div>;
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
	key(i) {
		return <div className='button' key={i} onClick={this.props.pressKey.bind(this, i)}>{ i }</div>
	},
	render() {
		return (
			<CSSTransitionGroup transitionName="question" transitionAppear={true} transitionAppearTimeout={1000} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
				<ProgressBarContainer question={this.props.question} />
				<div className='wrapper'>

					{ this.question() }
					<div className='buttons'>
						{ this.keypad() }
						<div className='button' onClick={this.props.resetGame.bind(this)}><i className="fa fa-chevron-left"></i></div>
						<div className='button' onClick={this.props.pressKey.bind(this, 0)}>0</div>
						<div className='button' onClick={this.props.showHint.bind(this)}><i className="fa fa-question"></i></div>
					</div>
					<div>
						{ this.right() }
					</div>
				</div>
			</CSSTransitionGroup>
		)
	}
});

export default Question;