import React  from 'react';
import { render }  from 'react-dom';
import { Provider } from 'react-redux';
import Store, { history } from '../imports/client/store';
import Pttrns from './Pttrns';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../imports/client/actions/actionCreators';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// view components
import Signup from '../imports/client/components/Signup';
import Login from '../imports/client/components/Login';

function mapStateToProps(state) {
  return state;
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const PttrnsApp = connect(mapStateToProps, mapDispachToProps)(Pttrns);

const router = (
  <Provider store={Store}>
    <Router history={history}>
      <Route path='/' component={Signup}></Route>
      <Route path='/game' component={PttrnsApp}></Route>  
      <Route path='/login' component={Login}></Route>
    </Router>
  </Provider>

)

Meteor.startup(()=> {
  render(
    router,
    document.getElementById('app')
  );
});