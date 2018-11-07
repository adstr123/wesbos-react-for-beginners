import React from 'react';
import { formatPrice } from '../helpers';
// chapter 22
import CSSTransitionGroup from 'react-addons-css-transition-group';

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
				<span>
					{/* chapter 22 animating count, so wrap in CSSTransitionGroup */}
					<CSSTransitionGroup
						component="span"
						className="count"
						transitionName="count"
						transitionEnterTimeout={250}
						transitionLeaveTimeout={250}
						>
						{/* React is smart enough to know two spans are required when a value changes */}
						{/* but key required to identify which span is leaving, which is entering */}
						<span key={count}>{count}</span>
					</CSSTransitionGroup>
					lbs {fish.name} {removeButton}
				</span>
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

				{/* CSSTransition group replaces <ul> - chapter 22 */}
				<CSSTransitionGroup
					className="order"
					component="ul"
					transitionName="order"
					transitionEnterTimeout={500}
					transitionLeaveTimeout={500}
					>
					{/* outsource to another render function because there's a lot going on here */}
					{orderIds.map(this.renderOrder)}
					<li className="total">
						<strong>Total:</strong>
						{formatPrice(total)}
					</li>
				</CSSTransitionGroup>

			</div>
		)
	}
}

export default Order;