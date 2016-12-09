import React, { Component } from 'react';
import '../css/App.css';
import PaperBackground from './PaperBackground';
import IconsDescription from './IconsDescription'
import Banner from './Banner';

class App extends Component {
	render() {
		
		return (
			<div>
				<Banner />
				<IconsDescription/>				
				<PaperBackground />
				
			</div>
		);
	}
}

export default App;
