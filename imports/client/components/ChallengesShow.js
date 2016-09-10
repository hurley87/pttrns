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
	show(challenge) {
		let ch = challenge.challenge;
		return (
			<div className='loser'>
				<h1>{ch.reward}</h1>
				<h1>{ ch.complete ? <span>Done</span> : <span>Not done</span> }</h1>
				<h1> max: { ch.max }</h1>
				<h1> min: { ch.min }</h1>
				<h1> operator: { ch.operator }</h1>
				<h1> right: { ch.right }</h1>
				<h1> time: { ch.time }</h1>
				<h1> wrong: { ch.wrong }</h1>
				<div>
					<button className='submit' onClick={this.start}>Start</button>
				</div>
			</div>
		)
	},
	showDetails(){
		const challenge = this.data.challenge;
		return (
			<div className='classList'>
				{challenge ? this.show(challenge) : null}
				<Link to={`/challenges`}>Back</Link>
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