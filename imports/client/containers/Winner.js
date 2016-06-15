import React from 'react';
import Winner from '../components/Winner';

const WinnerContainer = React.createClass({
	render() {
		return this.props.question.winner ? <Winner {...this.props} />  : null;
	}
});

export default WinnerContainer;
