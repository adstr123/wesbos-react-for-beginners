import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';

class App extends React.Component {
	// chapter 13
	constructor() {
		super();
		// initially there is no state
		// getInitialState
		this.state = {
			fishes: {},
			order: {}
		};
		this.addFish = this.addFish.bind(this);
		this.loadSamples = this.loadSamples.bind(this);
	}

	addFish(fish) {
		// update our state
		// copy current state using 'spread'
		// spreads expand an iterable e.g. array/String to occupy space where multiple arguments are expected
		const fishes = {...this.state.fishes};
		// take fish from argument (AddFishForm) and pass it in here to add new fish with 'random' timestamp ID
		const timestamp = Date.now();
		fishes[`fish-${timestamp}`] = fish;
		// set state
		this.setState({fishes: fishes});
		this.setState( {fishes} );	// in ES6
	}

	// chapter 14
	loadSamples() {
		this.setState({
			fishes: sampleFishes
		});
	}

	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market"/>
					<ul className="list-of-fishes">
						{/*
							Object.keys() returns a list of property keys for an object
							.map() part returns a fish component for each key
							key={key} assigns unique key for each fish
							details loads in properties for each fish into the individual Fish component props
						*/}
						{
							Object.keys(this.state.fishes).map(key => <Fish key={key} details={this.state.fishes[key]} />)
						}
					</ul>
				</div>
				<Order/>
				<Inventory addFish={this.addFish} loadSamples={this.loadSamples}/>
			</div>
		)
	}
}

export default App;