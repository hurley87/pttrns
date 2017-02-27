import React from 'react';

const ProgressBar = React.createClass({
	render() {
		return (
			<div className={'progress ' + this.props.style }>
				<div className='bar' style={{'width': this.props.width + '%', 'transition': 'width 3s ease', 'background-color': this.props.divColor }}></div>
			</div> 
		)
	}
});

export default ProgressBar;