import React from 'react';
import ProgressBar from '../components/ProgressBar';

const ProgressBarContainer = React.createClass({
	render() {
		return <ProgressBar width={parseFloat(this.props.question.seconds / this.props.question.totalTime * 100)} />
	}
});

export default ProgressBarContainer;