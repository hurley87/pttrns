import React from 'react';
import { Link } from 'react-router'

const Signup = React.createClass({
	render() {
		return (
			<div className='container loser'>
				<div className='text'>pttrns</div>
				<Link to='/game'>Play the game</Link>
			</div>
		)
	}
});

export default Signup;