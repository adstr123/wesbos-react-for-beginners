// load everything from react library (included in package.json) into the React variable
import React from 'react';
// load one method from the react-dom library, to enable rendering React to HTML (can also be used for apps etc.)
import { render } from 'react-dom'

// import the component from its file
import StorePicker from './components/StorePicker';

// make the component render to the specified mounting point
render(<StorePicker/>, document.getElementById("main"));