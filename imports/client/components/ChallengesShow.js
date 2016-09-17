import React from 'react';
import {ReactMeteorData} from 'meteor/react-meteor-data';
import { Challenges } from '../../collections'
import { Link } from 'react-router';
import StartGame from './StartGame';
import Question from './Question';
import Winner from './Winner';
import Loser from './Loser';

const ChallengesShow = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
	    const challengeId = this.props.params.challengeId;
	    const userId = Meteor.userId();
		let data = {};
	    let handle = Meteor.subscribe('challenges.student', userId);
	    if(handle.ready()) {
	    	data.challenge = Challenges.find({ 'studentId' : userId }).fetch().filter( challenge => challenge._id == challengeId )[0];
	    }
	    return data;
	},
	start() {
		this.props.startGame();
		let interval = setInterval(() => {
			this.props.timer()
			if(this.props.question.gameOver) clearInterval(interval);
		}, 1000);
	},
	challengeComplete(ch){
		const challenge = this.data.challenge.challenge;
		console.log(challenge)
		const operator = this.questionType(challenge.operator);

		return (
			<div className='container loser'>
				<div className='text'>Reward: {ch.reward}</div>
				<h1>You answered {challenge.right} {operator} questions in {challenge.time} seconds.</h1>
				<div><a className='signupLink' href='/challenges'>Back</a></div>
			</div>
		)
	},
	questionType(operator) {
		let type = '';
		switch(operator) {
			case '+':
				type = 'addition';
				break;
			case '-':
				type = 'subtraction';
				break;
			case '/': 
				type = 'division';
				break;
			case 'x':
				type = 'multiplication';
				break;
			default:
				type = '';
		}
		return type;
	},
	notComplete(ch){
		const operator = this.questionType(ch.operator);
		return(
			<div className='container loser'>
				<div className='text'>Reward: {ch.reward}</div>
				<h1>Answer { ch.right } {operator} questions in { ch.time } seconds.</h1>
				<div>
					<button className='submit' onClick={this.start}>Accept Challenge</button>
				</div>
				<div><a className='signupLink' href='/challenges'>Back</a></div>
			</div>
		)
	},
	show(challenge) {
		let ch = challenge.challenge;
		const complete = challenge.complete;
		return complete ? this.challengeComplete(ch) : this.notComplete(ch)
	},
	showDetails(){
		const challenge = this.data.challenge;
		return (
			<div className='classList'>
				{challenge ? this.show(challenge) : null}
			</div>
		)
	},
	showGame() {
		return this.props.question.gameOver ? <Winner {...this.props}/> : <Question {...this.props} />
	},
	render() {
		return !this.props.question.startGame ? this.showDetails() : this.showGame();
	}
});

export default ChallengesShow;