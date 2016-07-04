import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import { _ } from 'lodash';
import defaultState from './defaultState'

// reuqire middleware 
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

// enable redux chrome extension
const enhancers = compose( window.devToolsExtension ? window.devToolsExtension() : f => f )

const Store = createStoreWithMiddleware(rootReducer, defaultState, enhancers);

export const history = syncHistoryWithStore(browserHistory, Store)

export default Store;