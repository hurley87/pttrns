import React from 'react';
import { Link, Router, browserHistory } from 'react-router'
import { Form, ValidatedInput, RadioGroup, Radio } from 'react-bootstrap-validation';
import { Button} from 'react-bootstrap';
import { Accounts } from 'meteor/accounts-base';

const Signup = React.createClass({
	_handleValidSubmit(values) {
		const username = slugify(values.username, '_');
		const password = values.password;
    const signUpError = this.props.signUpError;
		Accounts.createUser({
        username,
        password
      }, function(err) {
    	if(err) {
    		signUpError(err.reason);
    	} else {
        Meteor.call('newUsername', username, function(err) {
          if(err) {
            signUpError(err.reason);
          } else {
            browserHistory.push('/game');
          }
        })
        
    	}
    });
	},
	_handleInvalidSubmit(errors, values) {
	    console.log(errors)
	},
	signup() {
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
                    validate='required,isLength:6:30'
                    errorHelp={{
                        required: 'Please specify a password',
                        isLength: 'Password must be at least 6 characters'
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

                <ValidatedInput
                    type='password'
                    name='password-confirm'
                    label='Confirm Password'
                    validate={(val, context) => 
                      val === context.password
                    }
                    errorHelp='Passwords do not match'
                />

                <Button type='submit' className='submit'>Sign Up</Button>
            </Form>
          </div>
		)
	},
	render() {
		return (
			<div className='container loser'>
				<div className='text'>pttrns</div>
				{ this.signup() }
				<Link className='signupLink' to='/login'>Login</Link>
			</div>
		)
	}
});

export default Signup;