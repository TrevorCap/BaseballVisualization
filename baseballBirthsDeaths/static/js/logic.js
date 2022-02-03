d3.json("/birthYear", function(error, playerData) {
    if (error) return console.warn(error);
  
    console.log(playerData);
  
    // log a list of player last names to test
    var names = playerData.map(data => data.nameLast);
    // console.log("nameLast", names);
  
    //Cast each hours value in tvData as a number using the unary + operator
    playerData.forEach(function(data) {
      data.latitude = +data.BLat;
      data.longitude = +data.BLng;
    //console.log("Latitude:", data.latitude, "Longitude:", data.longitude);
      //console.log("Longitude", data.longitude);
    });
    // console.log(playerData);

var myMap = L.map("map", {
    //Center coordinates are for Cooperstown NY, home of the Baseball Hall of Fame
    //center: [42.7006, -74.9243], changed these for initial positioning in map.
    // center: [.9631, 19.0208],
    center: [.9631, 19.0208],
    zoom: 2.48,
    .addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));
    });
  
//   // Adding tile layer to the map
//   L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "mapbox.streets",
//     accessToken: API_KEY
//   }).addTo(myMap);
 
 L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
     attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
     tileSize: 512,
     maxZoom: 18,
     zoomOffset: -1,
     id: 'mapbox/streets-v11',
     accessToken: 'API_KEY'
 }).addTo(myMap); 
    
     
 
 
  

  
    var markers = L.markerClusterGroup();
  
    // Loop through data to add markers
    for (var i = 0; i < playerData.length; i++) {
      // console.log("latitude", playerData[i][3]);
      // console.log("longitude", playerData[i][4]);
         // Add a new marker to the cluster group and bind a pop-up
        markers.addLayer(L.marker([playerData[i][3], playerData[i][4]])
        //This is where we ADD what info we want displayed plus html tags to style info
          .bindPopup("<h7>" + "Player: " + "<h8>" + playerData[i][1] + " " +
          playerData[i][2] + "</h8>" + "</h7><hr>" + "<h7>" + "Birth Place: " + 
          "</h7>" + "<h8>" + playerData[i][7] + ", " + playerData[i][5] +
          "<img  style='max-width:75px' src=" + playerData[i][8] + " ></img></h8><hr>" + 
          "<h7>" + "Birth Year: " + "<h8>" + playerData[i][0] + "</h8></p>"));
      }
  
    
  
    // Add our marker cluster layer to the map
    myMap.addLayer(markers);
});
// Birthplace: "United States Denver"
// birthCity: "Denver"
// birthCountry: "United States"
// birthYear: "1981.0"
// city_name: "Denver"
// continent_code: ""
// country_iso_code: "US"
// country_name: "United States"
// deathCity: ""
// deathCountry: ""
// deathYear: ""
// geoname_id: "4463523.0"
// latitude: 35.4837
// longitude: -80.9898
// nameFirst: "David"
// nameLast: "Aardsma"
// playerID: "aardsda01"
// registered_country_geoname_id: "6252001.0"

//1. load csv into sqlite database
//2. retrieve data (creating routes in order to do this)
//3. execute routes in javascript
