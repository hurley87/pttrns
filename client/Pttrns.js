import React from 'react';
import WelcomeContainer from '../imports/client/containers/Welcome';
import LoserContainer from '../imports/client/containers/Loser';
import WinnerContainer from '../imports/client/containers/Winner';
import QuestionContainer from '../imports/client/containers/Question';
import HintContainer from '../imports/client/containers/Hint'

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