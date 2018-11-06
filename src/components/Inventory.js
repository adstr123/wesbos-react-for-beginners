import React from 'react';
import AddFishForm from './AddFishForm'

class Inventory extends React.Component {
	constructor() {
		super()
		this.renderInventory = this.renderInventory.bind(this);
		this.handleChange = this.handleChange.bind(this);
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
			</div>
		)
	}

	render() {
		return (
			<div>
				<h2>Inventory</h2>
				{Object.keys(this.props.fishes).map(this.renderInventory)}
				<AddFishForm addFish={this.props.addFish}/>
				<button onClick={this.props.loadSamples}>Load Sample Fishes</button>
			</div>
		)
	}
}

export default Inventory;