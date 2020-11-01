import React from 'react';
import { apiKey } from './Map';
import StarRatings from 'react-star-ratings';
import Draggable from 'react-draggable';

export default class SelectedPlace extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rating:
			this.props.shop.newAverageRating === 0
				? this.props.shop.averageRating
				: this.props.shop.newAverageRating,
			newRating: 0,
			addingReview: false,
			opened: false
		};

		this.modalToggle = this.modalToggle.bind(this);

	}

	modalToggle() {
		const { opened } = this.state;
		this.setState({
			opened: !opened,
		});
	}	
	
	onStarClick = (value) => {
		this.setState({ newRating: value });
	};
	
	handleSubmit = e => {
		e.preventDefault();
		
		let newStars = parseInt(e.target.elements.rating);
		
		newStars = newStars ? newStars : 0;
		
		const newComment = {
			author: e.target.elements.authorComment.value,
			stars: newStars,
			comment: e.target.elements.newComment.value
		};
		
		if (this.props.shop.place_id !== undefined) {
			this.props.shop.newRatingsToAdd.push(newStars);
		}

		this.props.handleSubmitFormComment(
			this.props.shop,
			newComment,
			newStars
			);
			
			this.setState({ rating: this.props.shop.newAverageRating });
			
			let getForm = document.getElementsByName("add-comment-form");
			getForm[0].reset();
		};
		
		
		render() {
			let { opened } = this.state;
			let { newRating } = this.state;
			
			return (
				
				<div className="selected-place-container">
					
				
				{ !this.props.shop.id ? null : 
				 	!opened && (
						<Draggable handle=".drag-handle">
						
						<div className="selected-place">
								
							<div className="drag-handle">
								<i className="fas fa-arrows-alt"></i>
							</div>
							<h3 style={{paddingLeft: '15px', paddingTop: '5px'}}>
								<i 
									className="fas fa-times"
									onClick={this.modalToggle}>
								</i>
							</h3>
				
						<div className="card-body">
							<div className="d-flex justify-content-start align-items-center">
								<h3 className="shop-name pr-3">
									{this.props.shop.name}
								</h3>
				
							</div>
				
							<div className="no-pointer">
								<StarRatings
									starCount={5} 
									rating={this.state.rating} 
									starRatedColor='#0014ab'
									starHoverColor='#2b44ff'
									starEmptyColor='#f59542'
									starDimension='25px'
									starSpacing='1px'
								/>
							</div>
								<address className="shop-adress">
									<p>{this.props.shop.address}</p>
									<p>{this.props.shop.phone}</p>
								</address>
				
					<div id="accordion">
						<div className="card">
							<img
							src={`https://maps.googleapis.com/maps/api/streetview?size=200x200&location=${this.props.shop.address}&fov=50&heading=235&pitch=0&key=${apiKey}`}
							alt="shop view"
							/>
						</div>
			
			
					<div style={{paddingTop: '15px', paddingBottom: '15px'}}>
							<button 
							style={{ justifyContent: 'center' }}
							className="btn btn-md btn-outline-dark"
							onClick={() => this.setState({ addingReview: !this.state.addingReview })}
							>
							{this.state.addingReview ? "Close" : "Add Review"}
							</button>
			
						{this.state.addingReview && 
				
							<div className="card-body">
				
								<div>
									<form
									onSubmit={e => this.handleSubmit(e)}
									name="add-comment-form"
									>
										<div className="form-group">
											<div className="row">
												<input
												className="col-12 mb-2"
												type="text"
												name="authorComment"
												placeholder="Your name"
												/>
												
												<textarea
												className="col-12 mb-2"
												name="newComment"
												id="newComment"
												placeholder="Write your comment here"
												required
												></textarea>
												<div className="col-12 mb-2">
												<div className="d-flex align-items-center">
												
												<StarRatings
													name="rating"
													starCount={5}
													rating={newRating}
													starRatedColor='#0014ab'
													starHoverColor='#2b44ff'
													starEmptyColor='#f59542'
													starDimension='20px'
													starSpacing='1px'
													changeRating={this.onStarClick}
												/>
											</div>
										</div>
										<div>
											<button 
												className="btn btn-sm btn-outline-dark"
											>
												Post
											</button>
										</div>
									</div>
								</div>
							</form>
						</div>
				
				</div>
			}
			</div>
			
			
			
			
			<h3>Reviews</h3>
			<small>
			{
				Math.round(this.props.shop.newAverageRating * 10) / 10 +
				"/5 " +
				"- " +
				this.props.shop.user_ratings_total +
				" total ratings"
			}
			</small>
			<hr />
			{this.props.shop.reviews &&
				this.props.shop.reviews.map((review, index) => {
					return (
						<div className="group-review" key={index}>
						<p>
						<i>{`Author: ${review.author_name}`}</i>
						<br />
						</p>
						<p>{review.rating || newRating}
						<i className="fas fa-star"></i>
						</p>
						<p>{review.text}</p>
						<hr />
						</div>
						);
					})}
					
					
					
					
					
					</div>
					</div>
					</div>
					
					</Draggable>
					//ending div that catches if no shop has been selected
				 )}
				</div>
				
				
				);
			}
		}