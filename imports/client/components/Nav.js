import React from 'react';
import { Col, Row, Grid, Input, ButtonInput, Navbar, MenuItem, Nav, NavItem, NavDropdown} from 'react-bootstrap';
import { browserHistory } from 'react-router';

const AppNav = React.createClass({
	logout(){
		Meteor.logout(function(err){
			console.log(err)
			browserHistory.push('/');
		});
		
	},
	render() {
		return (
		  <Navbar>
		    <Navbar.Header>
		      <Navbar.Brand>
		        { Meteor.userId() && window.location.pathname != '/' ? <a href="/challenges">pttrns</a> : <a href="/">pttrns</a> }
		      </Navbar.Brand>
		      <Navbar.Toggle />
		    </Navbar.Header>
		    <Navbar.Collapse>
		      <Nav pullRight>
		      { Meteor.userId() ? <NavItem onClick={this.logout} href="/">Logout</NavItem> : null }
		      </Nav>
		    </Navbar.Collapse>
		  </Navbar>
		)
	}
});

export default AppNav;