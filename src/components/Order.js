import React from 'react';
import { formatPrice } from '../helpers';

class Order extends React.Component {
	constructor() {
		super();
		this.renderOrder = this.renderOrder.bind(this);
	}

	renderOrder(key) {
		const fish = this.props.fishes[key];
		const count = this.props.order[key];
		const removeButton = <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>

		if (!fish || fish.status === "unavailable") {
			// two name options: if fish exists in inventory but has stock 0, or if fish is totally removed from inventory management system
			return <li key={key}>Sorry, {fish ? fish.name : 'fish'} is no longer available!>{removeButton}</li>
		}

		return (
			<li key={key}>
				<span>{count}lbs {fish.name} {removeButton}</span>
				<span className="price">{formatPrice(count * fish.price)}</span>
			</li>
		)
	}

	render() {
		// array of all the order keys (passed down as a prop)
		const orderIds = Object.keys(this.props.order);
		// total for the order - reduce executes defined function on each array el, outputting single value
		const total = orderIds.reduce((prevTotal, key) => {
			const fish = this.props.fishes[key];
			const count = this.props.order[key];
			const isAvailable = fish && fish.status === "available";
			// || 0 for if a fish is in the order, then becomes unavailable (last fish)
			if (isAvailable) {
				return prevTotal + (count * fish.price || 0)
			}
			return prevTotal;
		}, 0);
		// starting reduce value of 0

		return (
			<div className="order-wrap">
				<h2>Your Order</h2>
				<ul className="order">
					{/* outsource to another render function because there's a lot going on here */}
					{orderIds.map(this.renderOrder)}
					<li className="total">
						<strong>Total:</strong>
						{formatPrice(total)}
					</li>
				</ul>
			</div>
		)
	}
}

export default Order;