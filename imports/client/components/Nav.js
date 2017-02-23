import React from 'react';
import { Col, Row, Grid, Input, ButtonInput, Navbar, MenuItem, Nav, NavItem, NavDropdown} from 'react-bootstrap';

const AppNav = React.createClass({
	logout(){
		Meteor.logout();
	},
	render() {
		return (
		  <Navbar>
		    <Navbar.Header>
		      <Navbar.Brand>
		        <a href="/">pttrns</a>
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