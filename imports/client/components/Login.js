import React from 'react';
import { Link, Router, browserHistory } from 'react-router'
import { Col, Row, Grid, Input, ButtonInput, Navbar, MenuItem, Nav, NavItem, NavDropdown} from 'react-bootstrap';
import { Form, ValidatedInput } from 'react-bootstrap-validation';
import { Accounts } from 'meteor/accounts-base';
import AppNav from './Nav';

const Login = React.createClass({
	_handleValidSubmit(values) {
		const username = values.username;
		const password = values.password;
    const gameId = values.gameId;
    const challengeId = values.challengeId;
    const signUpError = this.props.signUpError;
		Meteor.loginWithPassword(username, password, function(err) {
	    	if(err) {
          signUpError(err.reason)
	    	} else {
          gameId ? browserHistory.push(`/challenges/${challengeId}`) : browserHistory.push('/game')
	    	}
        });
	},
	_handleInvalidSubmit(errors, values) {
	    console.log(errors)
	},
	login(username, gameId, challengeId) {
		return (
      <div>
        <Grid>
          <Row className='header'>
            <Col md={4} mdOffset={4}>
              <h2>Login</h2>
              <p>Login to {username ? username + "'s" : "your student's " } account using the same password you used to sign up your parent account.</p>
            </Col>
          </Row>
          <Row>
            <Col md={4} mdOffset={4}>
              { this.props.error ? <p className='alert alert-danger'>{this.props.error}</p> : null }
              <Form
                  onValidSubmit={this._handleValidSubmit}
                  onInvalidSubmit={this._handleInvalidSubmit}>

                  <ValidatedInput
                      type={username ? 'hidden' : 'text'}
                      label={ username ? '' : 'Username' }
                      name='username'
                      value={username}
                      validate='required,isLength:3:30'
                      errorHelp={{
                          required: 'Please specify a username',
                          isLength: 'Username must be at least 3 characters'
                      }}
                  />

                  <ValidatedInput
                      type='hidden'
                      name='gameId'
                      value={gameId}
                  />

                  <ValidatedInput
                      type='hidden'
                      name='challengeId'
                      value={challengeId}
                  />

                  <ValidatedInput
                      type={gameId ? 'hidden' : 'password'}
                      name='password'
                      value={ gameId }
                      label={ gameId ? '' : 'password' }
                  />

                  <input type="submit" className="button text-center" value="Login"/>
              </Form>
            </Col>
          </Row>
        </Grid>
      </div>
		)
	},
	render() {

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
    const gameId = getParameterByName('gameId')
    const challengeId = getParameterByName('challengeId')

		return (
			<div>
        <AppNav />
				{ this.login(username, gameId, challengeId) }
			</div>
		)
	}
});

export default Login;