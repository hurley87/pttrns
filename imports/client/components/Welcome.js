import React from 'react';
import ChallengesList from './Challenges';
import { Col, Row, Grid, Input, ButtonInput} from 'react-bootstrap';

const Welcome = React.createClass({
	startGame() {
		return (
			<div>
				<div className='text'>pttrns</div>
				<h1>Answer {this.props.question.winningThreshold} questions as fast as you can.</h1>
				<button className='submit' onClick={this.props.start}>Start</button>
			</div>
		)
	},
	render() {
		return (
	      <div>
	        <Grid>
	          <Row className='header'>
	            <Col md={4} mdOffset={4}>
	              <h2>pttrns</h2>
	            </Col>
	          </Row>
	          <Row>
	            <Col md={4} mdOffset={4}>
			        <ChallengesList {...this.props} />
	            </Col>
	          </Row>
	        </Grid>
	      </div>
		)
	}
});

export default Welcome;