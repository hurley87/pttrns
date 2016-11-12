import React from 'react';
import {ReactMeteorData} from 'meteor/react-meteor-data';
import { Challenges } from '../../collections'
import { Link } from 'react-router';
import Loading from './Loading'

const ChallengesList = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		var data = {}
	    var userId = Meteor.userId();
	    var handle = Meteor.subscribe('challenges.student', userId);
	    if(handle.ready()) {
	    	data.challenges = Challenges.find({ 'studentId' : userId }).fetch();
	    	data.challengesReady = handle.ready();
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
		return ( this.data.challengesReady ? 
			<div className='container loser'>
				{ newChallenges.length > 0 ? <div className='text'>New</div> : null}
				{ newChallenges ? this.showChallenges(newChallenges) : null }
				{ pastChallenges.length > 0 ? <div className='text'>Complete</div> : null}
				{ pastChallenges ? this.showChallenges(pastChallenges) : null }
			</div> : <Loading />
		)
	}
});

export default ChallengesList;