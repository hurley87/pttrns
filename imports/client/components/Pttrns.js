import React from 'react';
import Welcome from './Welcome';
import Loser from './Loser';
import Winner from './Winner';
import Question from './Question';
import Hint from './Hint'

const Pttrns = React.createClass({
	render() {
		return (
			<div>
				<Welcome {...this.props}  /> 
				<Question {...this.props} /> 
				<Hint {...this.props} />
				<Winner {...this.props} /> 
				<Loser {...this.props} /> 
			</div>
		);
	}
});

export default Pttrns;