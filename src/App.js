import React from 'react';
import Map from "./components/Map";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import PlaceList from "./components/PlaceList";

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			shops: [],
			shop: {},
			shopsListView: true,
			newShopPosition: {
				LatLngOnClick: null,
				address: null,
				postalCode: null
			},

			minRating: 0,
			maxRating: 5
		};
	}

	handleSubmitForm = newShop => {
		this.setState(prevState => {
			return {
				shops: prevState.shops.concat(newShop)
			};
		});
	};

	handleClick = shop => {
		this.setState({
			shop: shop,
			shopsListView: false
		});
	};

	handleSubmitFormComment = (shop, newComment, rating) => {
		let updatedComment = shop.reviews.concat({
			author_name: newComment.author,
			rating: newComment.stars,
			text: newComment.comment
		});
		shop.reviews = updatedComment;
		shop.user_ratings_total++;
		shop.newAverageRating = shop.getAverageRating();
		this.setState({ shop });
	};

	getNewLatLng = (lat, lng, formatted_address) => {
		let LatLngOnClick = {
			lat,
			lng
		};
		let splitAdress = formatted_address.split(",");
		let address = splitAdress[0];
		let postalCode = splitAdress[1] + splitAdress[2];
		this.setState({
			newShopPosition: { LatLngOnClick, address, postalCode }
		});
	};

	closeShopTargetView = () => {
		let selectedMarker = document.querySelector(".targeted-marker");
		if (selectedMarker) {
			selectedMarker.className = "marker";
		}
		this.setState({
			shopsListView: true,
			newShopPosition: {
				LatLngOnClick: null,
				address: null,
				postalCode: null
			}
		});
	};

	apiLoadedCallback = shops => {
		this.setState({ shops });
	};

	ratingsState = (name, nextValue) => {
		this.setState({
			[name]: nextValue
		});
	};

	render() {
		return (
			<div style={{
				display: 'flex',
				justifyContent: 'flex-start',
				flexDirection: 'row',
				flexGrow: 0,
				flexBasis: 'auto',
				flexShrink: 1,
				flexWrap: 'nowrap',
				flex: '0 1 auto',
				alignItems: 'stretch',
				margin: '0',
				padding: '0',
				width: 'auto',
				height: 'auto',
				maxWidth: 'none'
			  }}>
				
				<div>
					<Map
						shops={this.state.shops}
						handleClick={this.handleClick}
						getNewLatLng={this.getNewLatLng}
						apiLoadedCallback={this.apiLoadedCallback}
						minRating={this.state.minRating}
						maxRating={this.state.maxRating}
					/>
				</div>

				<div>
						
						<PlaceList
							shops={this.state.shops}
							shop={this.state.shop}
							shopsListView={this.state.shopsListView}
							closeShopTargetView={this.closeShopTargetView}
							handleClick={this.handleClick}
							handleSubmitForm={this.handleSubmitForm}
							handleSubmitFormComment={this.handleSubmitFormComment}
							newShopPosition={this.state.newShopPosition}
							ratingsState={this.ratingsState}
						/>
				</div>

				


			</div>
		);
	}
}