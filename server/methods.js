import {Answers, Usernames} from '../imports/collections';
import {check} from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
	insertAnswer(answer) {
		check(answer, Object);
		const answers  = Answers.insert(answer);
		return answers;	
	},
	createStudent(username, password) {
		check(username, String);
		check(password, String);

		Accounts.createUser({ username, password });
	},
	newUsername(name) {
		check(name, String);
		console.log(name)
		Usernames.insert({name});
	}
})