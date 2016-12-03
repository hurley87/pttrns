import React from 'react';
import { Link, Router, browserHistory } from 'react-router'
import { Form, ValidatedInput, RadioGroup, Radio } from 'react-bootstrap-validation';
import { Button } from 'react-bootstrap';
import { Accounts } from 'meteor/accounts-base';

const Login = React.createClass({
	_handleValidSubmit(values) {
		const username = values.username;
		const password = values.password;
    const signUpError = this.props.signUpError;
		Meteor.loginWithPassword(username, password, function(err) {
	    	if(err) {
          signUpError(err.reason)
	    	} else {
	    		browserHistory.push('/game');
	    	}
        });
	},
	_handleInvalidSubmit(errors, values) {
	    console.log(errors)
	},
	login() {

    function getParameterByName(name, url) {
        if (!url) {
          url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    const username = getParameterByName('username')
		return (
        <div>
          { this.props.userState.error ? <p className='error'>{this.props.userState.errorMsg}</p> : null }
          <Form
              onValidSubmit={this._handleValidSubmit}
              onInvalidSubmit={this._handleInvalidSubmit}>

              <ValidatedInput
                  type='text'
                  label='Username'
                  name='username'
                  value={username}
                  validate='required,isLength:3:30'
                  errorHelp={{
                      required: 'Please specify a username',
                      isLength: 'Username must be at least 3 characters'
                  }}
              />

              <ValidatedInput
                  type='password'
                  name='password'
                  label='Password'
                  validate='required,isLength:3:30'
                  errorHelp={{
                      required: 'Please specify a password',
                      isLength: 'Password must be at least 3 characters'
                  }}
              />

              <Button
                type='submit'
                className='submit'
              >Login</Button>
          </Form>
        </div>
		)
	},
	render() {
		return (
			<div className='container loser'>
				<div className='text'>Login to your student account using the same password you used to sign up your parent account.</div>
				{ this.login() }
			</div>
		)
	}
});

export default Login;