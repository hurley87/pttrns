import React from 'react';
import Loser from '../components/Loser';

const LoserContainer = React.createClass({
	render() {
		return this.props.question.gameOver && !this.props.question.winner ? <Loser {...this.props} /> : null;

	}
});

export default LoserContainer;