import Answers from '../imports/collections';
import {check} from 'meteor/check';

Meteor.methods({
	insertAnswer(answer) {
		check(answer, Object);
		const answers  = Answers.insert(answer);
		return answers;	
	}
})