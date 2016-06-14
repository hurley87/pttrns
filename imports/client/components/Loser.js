import React from 'react';

const Loser = React.createClass({
	render() {
		return (
			<div className='container'>
				<div className='text'>You Lose!</div> 
				<div className='wrapper'>
					<button className='button submit' onClick={this.props.resetGame.bind(this)}>start again</button>
				</div>
			</div>
		)
	}
});

export default Loser;