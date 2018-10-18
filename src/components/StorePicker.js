// load everything from react library (included in package.json) into the React variable
import React from 'react';
// import from named export rather than default
import { getFunName } from '../helpers';

// create the component
class StorePicker extends React.Component {
	// bind this to this StorePicker for custom functions
	constructor() {
		// run parent first i.e. React.Component
		super();
		this.goToStore = this.goToStore.bind(this);
	}

	goToStore(event) {
		// regular JS event
		// don't want the default form submission behaviour (reload page) to occur
		event.preventDefault();
		console.log('You changed the URL');

		// grab the text from the input
		const storeId = this.storeInput.value;
		console.log(`Going to ${storeId}`);
		// transition from / to /store/:storeId
		this.context.router.transitionTo(`/store/${storeId}`);
	}

	// every component needs this function
	// ES6 - same as writing function render()
	render() {
		return (
			// you can only ever return one parent element
			<form className="store-selector" onSubmit={this.goToStore}>
			{/*
			can also do binding like this:
			<form className="store-selector" onSubmit={(e) => this.goToStore()}>
			but this binds a new function to each instance of the component on the page, resulting in duplication
			*/}
				<h2>Please Enter A Store</h2>
				<input type="text" required placeholder="Store Name" defaultValue={getFunName()}
					ref={(input) => {this.storeInput = input}}/>
				<button type="submit">Visit Store</button>
			</form>
		);

		// example w/out JSX...
		// return React.createElement('p', {className: 'Testing'}, 'I love you')
		// ... renders a p element with Testing class, with the content 'I love you'
	}
}

// tell React that StorePicker expects the Router to be available, for URL transitioning
StorePicker.contextTypes = {
	router: React.PropTypes.object
}

// allows us to include the component elsewhere
export default StorePicker;