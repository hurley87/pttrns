import {Answers, Usernames, Challenges } from '../imports/collections';
import {check} from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
	insertAnswer(answer) {
		check(answer, Object);
		const answers  = Answers.insert(answer);
		if(answer.winner) {
			Challenges.update(answer.challengeId, {
		      $set: { complete: true },
		    });
		}
		return answers;	
	},
	setChallengeComplete(answer){
		check(answer, Object);
	},
	createStudent(username, password) {
		check(username, String);
		check(password, String);

		Accounts.createUser({ username, password });
	},
	newUsername(name) {
		check(name, String);
		Usernames.insert({name});
	}
})