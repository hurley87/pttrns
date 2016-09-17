  import {check} from 'meteor/check';
  import { Challenges } from '../imports/collections'

  Meteor.publish('challenges.student', function(studentId) {
    check(studentId, String);
    const challenges = Challenges.find({'studentId': studentId });
    return challenges;
  });