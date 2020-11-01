let newestId = 0;

export default class SinglePlace {
	constructor(shop) {
		this.id = `shop_${SinglePlace.incrementId()}`;
		this.place_id = shop.place_id;
		this.name = shop.shopName;
		this.description = shop.description;
		this.address = shop.address;
		this.lat = shop.lat;
		this.long = shop.long;
		this.averageRating = shop.averageRating;
		this.user_ratings_total = shop.user_ratings_total;
		this.reviews = [
			{
				author_name: null,
				text: null,
				rating: null
			}
		];
		this.newRatingsToAdd = [];
		this.newAverageRating = this.getAverageRating();
	}

	static incrementId() {
		newestId++;
		return newestId;
	}

	getAverageRating = () => {
		if (this.place_id === undefined) {
			if (this.reviews.length <= 1) {
				return this.averageRating;
			} else {
				let total = 0;
				this.reviews.map(review => {
					total += review.rating;
				});
				let result = total / this.user_ratings_total;
				return result;
			}
		} else {
			if (this.newRatingsToAdd.length === 0) {
				return this.averageRating;
			} else {
				let total = 0;
				this.newRatingsToAdd.map(rating => {
					total += rating;
				});
				let result =
					(this.averageRating * this.user_ratings_total + total) /
					(this.user_ratings_total + this.newRatingsToAdd.length);
				this.averageRating = result;
				return result;
			}
		}
	};
}