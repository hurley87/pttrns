import { Meteor } from 'meteor/meteor'

export default function userState(state=[], action) {
	switch(action.type) {
		case "SIGNUP_ERROR":
			return {
				error: true,
				errorMsg: action.error
			}

		case "@@router/LOCATION_CHANGE":
			return {
				error: false,
				errorMsg: ''
			}

		default: 
			return state;
	}
}