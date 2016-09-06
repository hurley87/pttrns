import {combineReducers}  from 'redux';
import question from './question';
import userState from './user';
import challenge from './challenge';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
	question,
	userState,
	challenge,
	routing: routerReducer
})

export default rootReducer;