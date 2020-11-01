import React from "react";
import StarRatings from 'react-star-ratings';
import './main.css';

export default class Place extends React.Component {
	handleClick(shop) {
		let selectedMarker = document.querySelector(".targeted-marker");
		if (selectedMarker) {
			selectedMarker.className = "marker";
		}

		let selectedShop = document.getElementById(shop.id);
		selectedShop.classList.add("targeted-marker");

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
				shop.phone = place.formatted_phone_number;
				
				shop.user_ratings_total = place.user_ratings_total;


				this.props.handleClick(this.props.shop);
			} else {
				alert(`Error: ${status}`);
			}
		};
		const divElmt = document.createElement("div");
		const service = new window.google.maps.places.PlacesService(divElmt);

		service.getDetails(request, callback);
	}

	handleMouseOver(shop) {
		let selectedMarker = document.querySelector(".targeted-marker");
		if (selectedMarker) {
			selectedMarker.className = "marker hvr-grow";
		}
		let selectedShop = document.getElementById(shop);
		selectedShop.classList.add("targeted-marker");
	}

	handleMouseLeave() {
		let selectedMarker = document.querySelector(".targeted-marker");
		if (selectedMarker) {
			selectedMarker.className = "marker hvr-grow";
		}
	}

	render() {
		return (
			
			<div
				className="list-group-item"
				onClick={() => this.handleClick(this.props.shop)}
				onMouseOver={() => this.handleMouseOver(this.props.shop.id)}
				
			>
				<div>
					<div>
						<h3>{this.props.shop.name}</h3>
						<div>
							<StarRatings
								starCount={5} 
								rating={Number(this.props.shop.newAverageRating)} 
								starRatedColor='#0014ab'
								starHoverColor='#2b44ff'
								starEmptyColor='#f59542'
								starDimension='20px'
								starSpacing='1px'
							/>
							<p>{Math.round(this.props.shop.newAverageRating * 10) / 10 + " / 5"}</p>
						</div>
							<p>
								{this.props.shop.address}
							</p>						
					</div>
				</div>
			</div>
			
		);
	}
}