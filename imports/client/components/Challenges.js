import React from 'react';
import {ReactMeteorData} from 'meteor/react-meteor-data';
import { Challenges } from '../../collections'

const ChallengesList = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		var data = {}
	    var userId = Meteor.userId();
	    var handle = Meteor.subscribe('challenges.student', userId);
	    if(handle.ready()) {
	    	data.challenges = Challenges.find({ 'studentId' : userId }).fetch();
	    }
	    return data;
	},
	render() {
		console.log(this.data.challenges)
		const challenges = this.data.challenges;
		console.log(challenges)
		return (
			<div>
				{
					challenges.map( item => {
						return (
							<p>{ item.challenge.reward}</p>
						)
					})
				}
			</div>
		)
	}
});

export default ChallengesList;