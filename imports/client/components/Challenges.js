import React from 'react';
import { ReactMeteorData} from 'meteor/react-meteor-data';
import { Challenges } from '../../collections'
import { Link } from 'react-router';
import Loading from './Loading'
import { Col, Row, Grid, Input, ButtonInput, Navbar, MenuItem, Nav, NavItem, NavDropdown} from 'react-bootstrap';

const ChallengesList = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		var data = {}
	    var userId = Meteor.userId();
	    var handle = Meteor.subscribe('challenges.student', userId);
	    if(handle.ready()) {
	    	data.challenges = Challenges.find({ 'studentId' : userId }).fetch();
	    	data.challengesReady = handle.ready();
	    }
	    return data;
	},
	update(challenge){
		this.props.updateQuestion(challenge)
	},
	showChallenges(challenges) {
		return (
			<div>
				{
					challenges.map( challenge => {
						return (
							<div key={challenge._id}>
								<Link className='button text-center' onClick={this.update.bind(this, challenge)} to={`/challenges/${challenge._id}`}>{ challenge.challenge.reward }</Link>
							</div> 
						)
					})
				}
			</div>
		)
	},
	render() {
		const challenges = this.data.challenges;
		let newChallenges = [];
		let pastChallenges = [];
		if(challenges) {
			newChallenges = this.data.challenges.filter(challenge => challenge.pending == true)
			attemptedChallenges = this.data.challenges.filter(challenge => challenge.attempted == true)
			pastChallenges = this.data.challenges.filter(challenge => challenge.complete == true)
		}
		return ( this.data.challengesReady ? 
        <div>
		  <Navbar>
		    <Navbar.Header>
		      <Navbar.Brand>
		        <a href="/">pttrns</a>
		      </Navbar.Brand>
		      <Navbar.Toggle />
		    </Navbar.Header>
		    <Navbar.Collapse>
		      <Nav pullRight>
		      { Meteor.userId() ? <NavItem href="/logout">Logout</NavItem> : null }
		      </Nav>
		    </Navbar.Collapse>
		  </Navbar>
        <Grid>
          <Row>
            <Col md={4} mdOffset={4}>
				{ newChallenges == 0 && attemptedChallenges == 0 ? <div className='text'>No new challenges</div> : null}
				{ attemptedChallenges.length > 0 ? <div className='text'>Continue</div> : null}
				{ attemptedChallenges ? this.showChallenges(attemptedChallenges) : null }
				{ newChallenges.length > 0 ? <div className='text'>New</div> : null}
				{ newChallenges ? this.showChallenges(newChallenges) : null }
				{ pastChallenges.length > 0 ? <div className='text'>Complete</div> : null}
				{ pastChallenges ? this.showChallenges(pastChallenges) : null }
			</Col> 
		   </Row>
		</Grid></div> : <Loading />
		)
	}
});

export default ChallengesList;