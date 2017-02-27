import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import ProgressBar from './ProgressBar';
import { _ } from 'lodash';
import { Col, Row, Grid, Input, ButtonInput} from 'react-bootstrap';


class Question extends React.Component{
	constructor(props) {
		super(props);
		console.log(props.question)
		this.state = {
		  student: false,
		  question: props.question,
		  borderColor: props.question.borderColor
		}
	}
	question() {
		const question = this.props.question;
		return <div style={{ 'fontSize': '2.2em'}} className='question'>{ question.num1 + " " + question.operator + " " + question.num2 } = { question.guess }</div>;
	}
	right() {
		return <div className='question'>{ this.props.question.right }</div>
	}
	wrong() {
		const question = this.props.question;
		return <div className='text'>lives remaining: { question.lives - question.wrong }</div>
	}
	keypad() {
		const keys = [];
		[1,2,3,4,5,6,7,8,9].map( i => { keys.push(this.key(i)); });

		return keys;
	}
	pressKey(i){
		this.props.pressKey(i)

	}
	key(i) {
		return <div className='gameButton' key={i} onClick={this.pressKey.bind(this, i)}>
				<div className='btn-inner'>
					{ i }
				</div>
			   </div>
	}
	render() {
		const question = this.props.question;
		const width = parseFloat(question.seconds / question.totalTime * 100);
		const width2 = 100 - parseFloat(this.props.question.right / this.props.question.winningThreshold * 100);
		const green = '#2ecc71';
		const red = '#e74c3c'

		let divColor = green;

		if(width < width2) {
			divColor = red;
		}
		return (
	      <div>
	        <Grid>
	          <Row>
	            <Col style={{ padding: '0px'}} md={4} mdOffset={4}>
					<ProgressBar divColor={divColor} width={width2} />
					<ProgressBar width={width} />
					<div style={{ border: '5px solid ' + question.borderColor }} className='wrapper'>
						{ this.question() }
						<div className='gameButtons'>
							{ this.keypad() }
							<div className='gameButton white'></div>
							<div className='gameButton' onClick={this.pressKey.bind(this, 0)}>
								<div className='btn-inner'>
								0
								</div>
							</div>
							<div className='gameButton white'></div>
						</div>
					</div>
	            </Col>
	          </Row>
	        </Grid>
	      </div>
		)
	}
}

function shuffle(array) {
  var i = 0
    , j = 0
    , temp = null

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }

  return array;
}

export default Question;