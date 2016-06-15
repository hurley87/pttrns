import React  from 'react';
import { render }  from 'react-dom';
import { Provider } from 'react-redux';
import Store from '../imports/client/store';
import Pttrns from './Pttrns';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../imports/client/actions/actionCreators';

function mapStateToProps(state) {
  return state;
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const PttrnsApp = connect(mapStateToProps, mapDispachToProps)(Pttrns);

function App() {
  return (
    <div className="pttrns-container">
      <Provider store={Store}>
        <PttrnsApp />
      </Provider>
    </div>
  );
}

Meteor.startup(()=> {
  render(
    <App />,
    document.getElementById('app')
  );
});