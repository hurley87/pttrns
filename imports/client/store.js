import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import { _ } from 'lodash';
import defaultState from './defaultState'

// reuqire middleware 
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

// enable redux chrome extension
const enhancers = compose( window.devToolsExtension ? window.devToolsExtension() : f => f )

const Store = createStoreWithMiddleware(rootReducer, defaultState, enhancers);

export default Store;