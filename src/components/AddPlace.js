import React from 'react';
import SinglePlace from './SinglePlace';
import StarRatingComponent from 'react-star-rating-component';

export default class AddPlace extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rating: 3,
			isClicked: false,
			toggleBtn: true
		};
	}
	handleSubmit = e => {
		e.preventDefault();
		const newShop = {
			shopName: e.target.elements.name.value,
			description: e.target.elements.description.value,
			address: `${e.target.elements.address.value}, 
						${e.target.elements.postalCode.value}`,
						lat: Number(e.target.elements.latitude.value),
						long: Number(e.target.elements.longitude.value),
			averageRating: Number(e.target.elements.rating.value)
		};
		let addNewShop = new SinglePlace(newShop);
		addNewShop.reviews = [
			{
				author_name: e.target.elements.author.value,
				text: e.target.elements.comments.value,
				rating: Number(e.target.elements.rating.value)
			}
		];
		addNewShop.user_ratings_total = addNewShop.reviews.length;
		this.props.handleSubmitForm(addNewShop);
		let getForm = document.getElementsByName("add-shop-form");
		getForm[0].reset();
	};

	onStarClick = (value) => {
		this.setState({ rating: value });
	};

	handleBtnIcon() {
		this.setState(prevState => {
			return {
				isClicked: !prevState.isClicked
			};
		});
	}

	render() {
		return (
			<div>
				
				
				<div>
					<p>Click anywhere on the map to autofill position</p>
					<form
						onSubmit={e => this.handleSubmit(e)}
						name="add-shop-form"
						id="shop-form"
					>
						<div className="row">
							<div className="col-12 col-sm-6 mb-2">
								<input
									type="text"
									className="form-control"
									name="name"
									placeholder="Shop name"
									required
								/>
							</div>
							<div className="col-12 col-sm-6 mb-2">
								<input
									type="text"
									className="form-control"
									name="description"
									placeholder="Description"
									required
								/>
							</div>
							<div className="col-12 mb-2">
								<input
									type="text"
									className="form-control"
									name="address"
									placeholder="Address"
									defaultValue={this.props.newShopPosition.address}
									required
								/>
							</div>
							<div className="col-12 mb-2">
								<input
									type="text"
									className="form-control"
									name="postalCode"
									placeholder={"Postal code"}
									defaultValue={this.props.newShopPosition.postalCode}
									required
								/>
							</div>
							
							<div className="col-12 col-sm-6 mb-2">
								<input
									type="text"
									className="form-control"
									name="latitude"
									placeholder="Latitude"
									required
									defaultValue={
										this.props.newShopPosition.LatLngOnClick == null
											? ""
											: this.props.newShopPosition.LatLngOnClick.lat
									}
								/>
							</div>
							<div className="col-12 col-sm-6 mb-2">
								<input
									type="text"
									className="form-control"
									name="longitude"
									placeholder="Longitude"
									required
									defaultValue={
										this.props.newShopPosition.LatLngOnClick == null
											? ""
											: this.props.newShopPosition.LatLngOnClick.lng
									}
								/>
							</div>

							<div className="col-12 col-sm-6 mb-2">
								<input
									type="text"
									className="form-control"
									name="author"
									placeholder="Your name"
								/>
							</div>
							<div className="col-12 col-sm-6 mb-2">
								<input
									type="text"
									className="form-control"
									name="comments"
									placeholder="Comments"
								/>
							</div>
							<div className="col-12 text-center mb-2">
								<StarRatingComponent
									name="rating"
									starCount={5}
									value={this.state.rating}
									onStarClick={this.onStarClick}
								/>
							</div>
							<div className="col-12 text-center">
								<button className="btn btn-outline-dark">
									Add Place
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
}








