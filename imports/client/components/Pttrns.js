import React from 'react';
import WelcomeContainer from '../containers/Welcome';
import LoserContainer from '../containers/Loser';
import WinnerContainer from '../containers/Winner';
import QuestionContainer from '../containers/Question';
import HintContainer from '../containers/Hint'

const Pttrns = React.createClass({
	render() {
		return (
			<div>
				<WelcomeContainer {...this.props}  /> 
				<QuestionContainer {...this.props} /> 
				<HintContainer {...this.props} />
				<WinnerContainer {...this.props} /> 
				<LoserContainer {...this.props} /> 
			</div>
		);
	}
});

export default Pttrns;