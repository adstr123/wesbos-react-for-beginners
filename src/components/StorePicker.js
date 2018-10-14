// load everything from react library (included in package.json) into the React variable
import React from 'react';

// create the component
class StorePicker extends React.Component {
	// every component needs this function
	// ES6 - same as writing function render()
	render() {
		return <p>Hello</p>
	}
}

// allows us to include the component elsewhere
export default StorePicker;