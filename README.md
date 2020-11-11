# FindIt

This app was built with ReactJS and is meant to find your location and display all restaurants near you.
[Live demo](https://store-finder-reactjs.vercel.app).

### Features

* Map and location
    * The app will immediately ask for your location upon opening. I can promise that I'm not doing anything with your location (you can check the code to see for yourself).
    * If you click "Allow" it will show you your current location and the restaurants near you.
    * If you click "Don't Allow" then it will focus on Denver, Colorado (where I'm originally from).
    * If you drag the map and move around, the restaurants will update as well.

* Selected restaurant
    * Click on any restaurant to see the name, address, phone number, street view, and reviews.
    * You can add a review my clicking the `Add Review` button once a restaurant has been clicked on.
    * Your review will be shown at the bottom of the list and however many stars you selected will affect its current rating.
        * (Your review will not be actually save to the restaurant, if you refresh the page you review will disappear).
    * You can click on either the place list on the right hand side of the page or the individual marker on the map.
    * The restaurant window is draggable, so if you don't like it at the top-left you can move it.

* Place List
    * View all restaurants shown on the map currently
    * You can filter the places shown based on Maximum and Minimum star ratings.
    * Add your own place
        * I used the Google Geocoding API, so if you click on the `Add Place` button on the list of places, it will open an empty form.
        * Click anywhere on the map to autofill the address, latitude, and longitude fields on the form.
        * After adding your place, it will show up on the map, and can be filtered as well depending on its rating.
        * Again, it won't actually be saved (you don't actually own a restaurant on the corner of main street now), after refreshing the page it will disappear.
    * Just like the "Selected Place" view, the list of places is also draggable.

- Dark mode still in development -
