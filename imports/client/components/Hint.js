import React from 'react';
import ProgressBar from './ProgressBar';

const Hint = React.createClass({
	render() {
		return (
			<div>
				<ProgressBar width={this.props.question.progressWidth} />
				<div className='container'>
					<div className='text'>{this.props.question.hintMsg}</div> 
					<div className='wrapper'>
						<button className='button submit' onClick={this.props.continueEvaluation.bind(this)}>continue</button>
					</div>
				</div>
			</div>
		)
	}
});

export default Hint;