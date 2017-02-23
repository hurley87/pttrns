import React from 'react';
import { Col, Row, Grid, Input, ButtonInput} from 'react-bootstrap';

const Winner = React.createClass({
	wrong(submission, i) {
		return (
			<li className='wrong' key={i}>
				{submission.num1} {submission.operator} {submission.num2} = {submission.answer} <small>( guessed {submission.guess} )</small> 
			</li>
		)
	},
	render() {
		const question = this.props.question;
		const challengeId = this.props.question.challengeId;
		return (
	      <div>
	        <Grid>
	          <Row className='header'>
	            <Col md={4} mdOffset={4}>
	              <h2>{question.timeTaken + 1} seconds </h2>
	              <p>{question.right} right - { question.wrong == 0 ? null : question.wrong + " wrong "}</p>
	            </Col>
	          </Row>
	          <Row>
	            <Col md={4} mdOffset={4}>
					<ul>
						{ 
							question.submissions.map( (submission, i) => {
								return submission.guess == submission.answer ? null : this.wrong(submission, i)
							})
						}
					</ul> 
			        <button className='button' onClick={this.props.resetGame.bind(this, challengeId)}>Back</button>
	            </Col>
	          </Row>
	        </Grid>
	      </div>
		)
	}
});

export default Winner;
