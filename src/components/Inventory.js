import React from 'react';
import AddFishForm from './AddFishForm'
import base from '../base';

class Inventory extends React.Component {
	constructor() {
		super()
		this.renderInventory = this.renderInventory.bind(this);
		this.renderLogin = this.renderLogin.bind(this);
		this.authenticate = this.authenticate.bind(this);
		this.logout = this.logout.bind(this);
		this.authHandler = this.authHandler.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			uid: null,
			owner: null
		}
	}

	componentDidMount() {
		// on load Firebase immediately tries to authenticate. This listens for auth event
		base.onAuth((user) => {
			// if already logged in, handle auth automatically
			if (user) {
				this.authHandler(null, { user });
			}
		});
	}

	handleChange(e, key) {
		const fish = this.props.fishes[key];
		// take a copy of the fish, update it with new data
		const updatedFish = {...fish, [e.target.name]: e.target.value}
		//debug console.log(e.target.name, e.target.value);
		//debug console.log(updatedFish);
		// still not updating the rendered inventory, so need to take updated fish and pass it in - updateFish in App.js
		this.props.updateFish(key, updatedFish);
	}

	// chapter 24 authentication
	authenticate(provider) {
		// DEBUG console.log(provider);
		// DEBUG console.log(base);
		// pass the provider, then state the callback function that will immediately run upon successful/unsuccessful login
		base.authWithOAuthPopup(provider, this.authHandler);
	}

	logout() {
		base.unauth();
		this.setState({ uid: null });
	}

	authHandler(err, authData) {
		// DEBUG console.log(authData);
		// store auth data in state to show the correct store for the user
		if (err) {
			console.error(err);
			return;
		}
		// else connect to Firebase, grab the store info, and on receipt check if user actually owns this store
		const storeRef = base.database().ref(this.props.storeId)
		// query Firebase once for store data
		storeRef.once('value', (snapshot) => {
			const data = snapshot.val() || {};

			// claim if no existing owner
			if (!data.owner) {
				storeRef.set({
					owner: authData.user.uid
				});
			}

			this.setState({
				uid: authData.user.uid,
				owner: data.owner || authData.user.uid
			});
		});
	}

	renderLogin() {
		return (
			<nav className="login">
				<h2>Inventory</h2>
				<p>Sign in to manage your store's inventory</p>
				<button className="github" onClick={() => this.authenticate('github')}>Log in with GitHub</button>
				<button className="facebook" onClick={() => this.authenticate('facebook')}>Log in with Facebook</button>
				<button className="google" onClick={() => this.authenticate('google')}>Log in with Google</button>
			</nav>
		)
	}

	// chapter 20 show inventory, live state editing
	renderInventory(key) {
		// need info for the fish in question to live update state
		const fish = this.props.fishes[key];
		return (
			<div className="fish-edit" key={key}>
				{/* if you put state in an input, must also provide instruction on how to update that state (onChange) - maintain synchro */}
				<input type="text" name="name" value={fish.name} placeholder="Fish Name"
					onChange={(e) => this.handleChange(e, key)}/>
				<input type="text" name="price" value={fish.price} placeholder="Fish Price"
					onChange={(e) => this.handleChange(e, key)}/>
				<select type="text" name="status" value={fish.status} placeholder="Fish Status"
					onChange={(e) => this.handleChange(e, key)}>
					<option value="available">Fresh!</option>
					<option value="unavailable">Sold Out!</option>
				</select>
				<textarea type="text" name="desc" value={fish.desc} placeholder="Fish Desc"
					onChange={(e) => this.handleChange(e, key)}></textarea>
				<input type="text" name="image" value={fish.image} placeholder="Fish Image"
					onChange={(e) => this.handleChange(e, key)}/>
				<button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
			</div>
		)
	}

	render() {
		const logout = <button onClick={this.logout}>Log Out!</button>;
		// chapter 24 what to render if user isn't logged in at all
		if (!this.state.uid) {
			return <div>{this.renderLogin()}</div>
		}

		// what to render if the logged in user is the owner of the store
		if(this.state.uid !== this.state.owner) {
			return (
				<div>
					<p>Sorry, you aren';'t the owner of this store!</p>
					{logout}
				</div>
			)
		}

		return (
			<div>
				<h2>Inventory</h2>
				{logout}
				{Object.keys(this.props.fishes).map(this.renderInventory)}
				<AddFishForm addFish={this.props.addFish}/>
				<button onClick={this.props.loadSamples}>Load Sample Fishes</button>
			</div>
		)
	}
}

Inventory.propTypes = {
	fishes: React.PropTypes.object.isRequired,
	updateFish: React.PropTypes.func.isRequired,
	removeFish: React.PropTypes.func.isRequired,
	addFish: React.PropTypes.func.isRequired,
	loadSamples: React.PropTypes.func.isRequired,
	storeId: React.PropTypes.string.isRequired
}

export default Inventory;