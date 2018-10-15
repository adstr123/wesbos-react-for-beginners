// load everything from react library (included in package.json) into the React variable
import React from 'react';
// load one method from the react-dom library, to enable rendering React to HTML (can also be used for apps etc.)
import { render } from 'react-dom'
import { BrowserRouter, Match, Miss} from 'react-router';

// instruct Webpack to take everything inside the style.css file and add it to the page in a style tag
import './css/style.css'

// import the component from its file
import StorePicker from './components/StorePicker';
import App from './components/App';
import NotFound from './components/NotFound';

// make a Router component
const Root = () => {
	return (
		<BrowserRouter>
			{ /* Match can't be direct child of BrowserRouter */ }
			<div>
				<Match exactly pattern="/" component={StorePicker} />
				<Match exactly pattern="/store/:storeId" component={App} />
				<Miss component={NotFound} />
			</div>
		</BrowserRouter>
	)
}

// make the component render to the specified mounting point
//render(<StorePicker/>, document.getElementById("main"));
render(<Root/>, document.getElementById("main"));
