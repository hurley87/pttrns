import React from 'react';
import {ReactMeteorData} from 'meteor/react-meteor-data';
import { Challenges } from '../../collections'
import { Link } from 'react-router';

const ChallengesList = React.createClass({
	mixins: [ReactMeteorData],
	getInitialState() {
		return {
			loading: true
		}
	},
	getMeteorData() {
		var data = {}
	    var userId = Meteor.userId();
	    var handle = Meteor.subscribe('challenges.student', userId);
	    if(handle.ready()) {
	    	data.challenges = Challenges.find({ 'studentId' : userId }).fetch();
	    }
	    return data;
	},
	update(challenge){
		this.props.updateQuestion(challenge)
	},
	showChallenges(challenges) {
		return (
			<div>
				{
					challenges.map( challenge => {
						return (
							<div key={challenge._id}>
								<Link className='playGame' onClick={this.update.bind(this, challenge)} to={`/challenges/${challenge._id}`}>{ challenge.challenge.reward }</Link>
							</div> 
						)
					})
				}
			</div>
		)
	},
	render() {
		const challenges = this.data.challenges;
		let newChallenges = [];
		let pastChallenges = [];
		if(challenges) {
			newChallenges = this.data.challenges.filter(challenge => challenge.complete == false)
			pastChallenges = this.data.challenges.filter(challenge => challenge.complete == true)
		}
		console.log(pastChallenges.length > 0)
		return (
			<div className='container loser'>
				{ newChallenges ? <div className='text'>New</div> : null}
				{ newChallenges ? this.showChallenges(newChallenges) : null }
				{ pastChallenges ? <div className='text'>Complete</div> : null}
				{ pastChallenges ? this.showChallenges(pastChallenges) : null }
			</div>
		)
	}
});

export default ChallengesList;