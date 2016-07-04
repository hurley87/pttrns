import {combineReducers}  from 'redux';
import question from './question';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
	question,
	routing: routerReducer
})

export default rootReducer;