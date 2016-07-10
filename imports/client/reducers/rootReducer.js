import {combineReducers}  from 'redux';
import question from './question';
import userState from './user';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
	question,
	userState,
	routing: routerReducer
})

export default rootReducer;