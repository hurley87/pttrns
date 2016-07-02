import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import ProgressBar from '../components/ProgressBar';
import Question from '../components/Question';

const QuestionContainer = React.createClass({
	render() {
		return this.props.question.startGame && !this.props.question.gameOver && !this.props.question.hint ? <Question ClickSound={new Audio('/click.mp3')} {...this.props} />  : null;
	}
});

export default QuestionContainer;