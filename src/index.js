// load everything from react library (included in package.json) into the React variable
import React from 'react';
// load one method from the react-dom library, to enable rendering React to HTML (can also be used for apps etc.)
import { render } from 'react-dom'
// instruct Webpack to take everything inside the style.css file and add it to the page in a style tag
import './css/style.css'

// import the component from its file
import StorePicker from './components/StorePicker';
import App from './components/App';

// make the component render to the specified mounting point
//render(<StorePicker/>, document.getElementById("main"));
render(<App/>, document.getElementById("main"));
