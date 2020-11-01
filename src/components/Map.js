import React from 'react'
import GoogleMapReact from 'google-map-react';
import mapStyles from './mapStyles';
import Marker from './Marker';
import SinglePlace from './SinglePlace';
import UserLocation from './UserLocation';
import './main.css';

export const apiKey = process.env.REACT_APP_API_KEY;

const mapContainerStyle = {
    width: '100vw',
    height: '100vh'
};

const options = {
    width: '100vw',
    height: '100vh',
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true
};

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: {
                lat: 39.7523,
                lng: -104.9903
            },
            newPlace: {},

            showInfoWindow: false

        };
    };

    componentDidMount() {
        this.getLocation();
    };

    getLocation() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                    location: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                }
            );
        })
    };

    getNewCenter(map) {
        let getCenter = map.getCenter();
        let lat = getCenter.lat();
        let lng = getCenter.lng();
        let newCenter = { lat, lng };

        return newCenter;
    }

    onMapClick = event => {

        let lat = event.lat;
        let lng = event.lng;

        let geocoder = new window.google.maps.Geocoder();
        let latLng = { lat, lng };

        geocoder.geocode({ location: latLng }, (results, status) => {
            if ( status === "OK" ) {
                this.props.getNewLatLng(lat, lng, results[0].formatted_address);
            } else {
                alert("This ain't working bro");
            }
            
        })
        console.log(latLng);
    }

    
    apiLoaded = async (map, maps, location) => {
		map.addListener("idle", async () => {
			let newLocation = this.getNewCenter(map);
			let results = await this.getNearbyShops(maps, newLocation);
			this.props.apiLoadedCallback(results);
		});
        let results = await this.getNearbyShops(maps, location);
        
        this.props.apiLoadedCallback(results);
		
	};
    

    
    getNearbyShops(maps, location) {
		return new Promise((resolve, reject) => {
			const divElmt = document.createElement("div");
			const service = new maps.places.PlacesService(divElmt);
			const request = {
				location: new maps.LatLng(location.lat, location.lng),
				radius: "2200",
				type: "restaurant"
			};
			service.nearbySearch(request, (results, status) => {
				let shops = [];
				if (status === window.google.maps.places.PlacesServiceStatus.OK) {
					for (let result of results) {
						let shop = new SinglePlace({
							place_id: result.place_id,
							shopName: result.name,
							description: result.types[0],
							address: result.vicinity,
							lat: result.geometry.location.lat(),
							long: result.geometry.location.lng(),
							averageRating: result.rating,
							newAverageRating: null,
							user_ratings_total: result.user_ratings_total
						});
						shops.push(shop);
					}
					resolve(shops);
				} else {
					reject(`Error status ${status}`);
				}
			});
		});
	}
    



    render() {
        return (
            <div className="map-container">

                    <GoogleMapReact
                        bootstrapURLKeys={{
                            key: `${apiKey}`,
                            libraries: 'places'
                        }}
                        mapContainerStyle={mapContainerStyle}
                        options={options}
                        center={this.state.location}
                        zoom={15}
                        onClick={this.onMapClick}
                        resetBoundsOnResize={true}
                        yesIWantToUseGoogleMapApiInternals
					    onGoogleApiLoaded={({ map, maps }) => {
						this.apiLoaded(map, maps, this.state.location);
					}}
                    >


                    {this.props.shops
                        .filter(shop => 
                                shop.newAverageRating >= this.props.minRating &&
                                shop.newAverageRating <= this.props.maxRating)
                        
                        .map(shop => (
                            <Marker
                                key={shop.id}
                                lat={shop.lat}
                                lng={shop.long}
                                shop={shop}
                                handleClick={this.props.handleClick}  
                            />
                    ))}

                        
                            <UserLocation 
                                lat={this.state.location.lat}
                                lng={this.state.location.lng}
                            />
                    </GoogleMapReact>
            </div>
        );
    };

}