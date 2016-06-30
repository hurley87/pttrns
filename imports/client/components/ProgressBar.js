import React from 'react';

const ProgressBar = React.createClass({
	render() {
		return (
			<div className='progress'>
				<div className='bar' style={{'width': this.props.width + '%', 'transition': 'width 2s ease' }}></div>
			</div> 
		)
	}
});

export default ProgressBar;