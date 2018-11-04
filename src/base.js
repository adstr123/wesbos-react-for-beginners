import Rebase from 're-base';

// connect to FB db
const base = Rebase.createClass({
	apiKey: "AIzaSyABo9XvyBIFxOsV6mNOUNVWnpnxoBMrAXk",
    authDomain: "catch-of-the-day-wb.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-wb.firebaseio.com",
});

export default base;