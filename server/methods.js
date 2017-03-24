import {Answers, Usernames, Challenges } from '../imports/collections';
import {check} from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';
import { Email } from 'meteor/email';

Meteor.methods({
	insertAnswer(answer) {
		check(answer, Object);
		const challenge = Challenges.findOne(answer.challengeId);
		const parentId = challenge.parentId;
		answer["parentId"] = parentId;

		const parent = Meteor.users.find({ _id: parentId }).fetch()[0]
		const parentEmail = parent.emails[0].address;
		const name = challenge.challenge.reward;
		const answers  = Answers.insert(answer);

		Challenges.update(answer.challengeId, { $set: { pending: false, attempted: true } });
		if(answer.winner) {
			Challenges.update(answer.challengeId, { $set: { complete: true, attempted: false } });
		}

		this.unblock();

        Email.send({
          to: parentEmail,
          from: 'dhurls99@gmail.com',
          subject: name + ' is compelte!',
          html: `<div>this is a test</div><div><a href="https://app.pttrns.ca/challenges/${challenge._id}">See results</a></div>`
        });

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