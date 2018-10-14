// load everything from react library (included in package.json) into the React variable
import React from 'react';

// create the component
class StorePicker extends React.Component {
	// every component needs this function
	// ES6 - same as writing function render()
	render() {
		return (
			// you can only ever return one parent element
			<form className="store-selector">
				<h2>Please Enter A Store</h2>
				<input type="text" required placeholder="Store Name"/>
				<button type="submit">Visit Store</button>
			</form>
		);

		// example w/out JSX...
		// return React.createElement('p', {className: 'Testing'}, 'I love you')
		// ... renders a p element with Testing class, with the content 'I love you'
	}
}

// allows us to include the component elsewhere
export default StorePicker;