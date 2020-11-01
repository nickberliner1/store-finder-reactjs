import React from 'react';
import Place from './Place';
import SelectedPlace from "./SelectedPlace";
import AddPlace from "./AddPlace";
import StarRatings from 'react-star-ratings';
import Draggable from 'react-draggable';

import './main.css';

export default class PlaceList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			minRating: 1,
			maxRating: 5,
			addingPlace: false
		};
		this.onStarClick = this.onStarClick.bind(this);
	}

	onStarClick(value, name) {
		if (name === "minRating") {
			this.setState({ minRating: value });
		} else if ( name === "maxRating" ) {
			this.setState({ maxRating: value })
		}
		this.props.ratingsState(name, value);
	}

	render() {
		return (
			
			<div className="full-place-list">
				<Draggable handle=".drag-handle">
				<div className="place-list-container">
					<div className="drag-handle"><i class="fas fa-arrows-alt"></i></div>
						<div className="place-list-heading">
							<div className="heading">
								<h3 style={{textAlign: 'center'}}>Filter By Rating</h3>
								<br />
										<p>Minimum</p>
										<StarRatings
											name="minRating"
											starCount={5} 
											rating={this.state.minRating} 
											starRatedColor='#0014ab'
											starHoverColor='#2b44ff'
											starEmptyColor='#f59542'
											starDimension='25px'
											starSpacing='1px'
											changeRating={this.onStarClick}
										/>
										<hr />
										<p>Maximum</p>
										<StarRatings
											name="maxRating"
											starCount={5} 
											rating={this.state.maxRating} 
											starRatedColor='#0014ab'
											starHoverColor='#2b44ff'
											starEmptyColor='#f59542'
											starDimension='25px'
											starSpacing='1px'
											changeRating={this.onStarClick}
										/>
									
								<hr />
							</div>	

								
			<div style={{paddingTop: '10px', textAlign: 'center'}}>
						<button 
							style={{ justifyContent: 'center', marginBottom: '10px' }}
							className="btn btn-md btn-outline-dark"
							onClick={() => this.setState({ addingPlace: !this.state.addingPlace })}
						>
						{this.state.addingPlace ? "Cancel" : "Add Place"}
						</button>
							{this.state.addingPlace && 
							<AddPlace 
								handleSubmitForm={this.props.handleSubmitForm}
								newShopPosition={this.props.newShopPosition}
							/>
							}
					</div>
					

							
								
									
						</div>
						
                    <div className="list-group">
						<div id="shops-list">
							{this.props.shops
								.filter(shop =>
										shop.averageRating >= this.state.minRating &&
										shop.averageRating <= this.state.maxRating)
								.map(shop => (

									<Place
										key={shop.id}
										shop={shop}
										handleClick={this.props.handleClick}
									/>
								))}
						</div>
                    </div>
				</div>
			</Draggable>

			
				<div>
					<SelectedPlace
						key={this.props.shop.name}
						shop={this.props.shop}
						handleClose={this.props.handleClose}
						shopsListView={this.props.shopsListView}
						closeShopTargetView={this.props.closeShopTargetView}
						handleSubmitFormComment={this.props.handleSubmitFormComment}
						handleSubmitForm={this.props.handleSubmitForm}
					/>
				</div>
				
			</div>
			
		);
	}
}