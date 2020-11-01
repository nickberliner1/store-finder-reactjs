import React, { Component } from "react";
import './main.css';

export default class Marker extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeMarker: "marker"
		};
		
		this.handleClick = this.handleClick.bind(this);
	}

	

	handleClick(e, shop) {
		let selectedMarker = document.querySelector(".targeted-marker");
		if (selectedMarker) {
			selectedMarker.className = "marker hvr-grow";
		}
		let element = e.target;
		element.classList.toggle("targeted-marker");
		if (shop.place_id) {
			this.handleDetailsRequest(shop);
		} else {
			this.props.handleClick(this.props.shop);
		}
	}

	handleDetailsRequest(shop) {
		let request = {
			placeId: shop.place_id,
			fields: [
				"name",
				"rating",
				"formatted_phone_number",
				"reviews",
				"user_ratings_total"
			]
		};

		const callback = (place, status) => {
			if (status === window.google.maps.places.PlacesServiceStatus.OK) {
				shop.reviews = place.reviews;
				shop.photos = place.photos;
				shop.phone = place.formatted_phone_number;
				shop.user_ratings_total = place.user_ratings_total;

				this.props.handleClick(this.props.shop);
			} else {
				console.log(`Error: ${status}`);
			}
		};
		const divElmt = document.createElement("div");
		const service = new window.google.maps.places.PlacesService(divElmt);
		service.getDetails(request, callback);
	}

	render() {
		return (
			<div
				className="marker hvr-grow"
				id={this.props.shop.id}
				onClick={e => this.handleClick(e, this.props.shop)}
				title={this.props.shop.name}
			>
				
			
			</div>
		);
	}
}