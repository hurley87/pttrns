import React from 'react';
import { Link, Router, browserHistory } from 'react-router'
import { Form, ValidatedInput, RadioGroup, Radio } from 'react-bootstrap-validation';
import { Button } from 'react-bootstrap';
import { Accounts } from 'meteor/accounts-base';

const Login = React.createClass({
	_handleValidSubmit(values) {
		const username = values.name;
		const password = values.password;
		Meteor.loginWithPassword(username, password, function(err) {
	    	if(err) {
	    		console.log(err)
	    	} else {
	    		browserHistory.push('/game');
	    	}
        });
	},
	_handleInvalidSubmit(errors, values) {
	    console.log(errors)
	},
	login() {
		return (
          <Form
              onValidSubmit={this._handleValidSubmit}
              onInvalidSubmit={this._handleInvalidSubmit}>

              <ValidatedInput
                  type='text'
                  label='Name'
                  name='name'
                  validate='required,isLength:4:30'
                  errorHelp={{
                      required: 'Please enter a username',
                      isLength: 'Username must be at least 4 characters'
                  }}
              />

              <ValidatedInput
                  type='password'
                  name='password'
                  label='Password'
                  validate='required,isLength:6:30'
                  errorHelp={{
                      required: 'Please specify a password',
                      isLength: 'Password must be at least 6 characters'
                  }}
              />

              <Button
                type='submit'
                className='submit'
              >Login</Button>
          </Form>
		)
	},
	render() {
		return (
			<div className='container loser'>
				<div className='text'>pttrns</div>
				{ this.login() }
				<Link className='signupLink' to='/'>Sign Up</Link>
			</div>
		)
	}
});

export default Login;