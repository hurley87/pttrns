import React from 'react';
import ProgressBarContainer from '../containers/ProgressBar';

const Hint = React.createClass({
	render() {
		return (
			<div>
				<ProgressBarContainer question={this.props.question} />
				<div className='container'>
					<div className='text'>{this.props.question.hintMsg}</div> 
					<div className='wrapper'>
						<button className='submit' onClick={this.props.continueEvaluation.bind(this)}>continue</button>
					</div>
				</div>
			</div>
		)
	}
});

export default Hint;