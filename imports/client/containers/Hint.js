import React from 'react';
import ProgressBar from '../components/ProgressBar';
import Hint from '../components/Hint';

const HintContainer = React.createClass({
	render() {
		return this.props.question.hint && !this.props.question.gameOver ? <Hint {...this.props} /> : null
	}
});

export default HintContainer;