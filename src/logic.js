d3.csv("../data/final.csv", function(error, playerData) {
    if (error) return console.warn(error);
  
    console.log(playerData);
  
    // log a list of names
    var names = playerData.map(data => data.nameLast);
    console.log("nameLast", names);
  
    // Cast each hours value in tvData as a number using the unary + operator
    playerData.forEach(function(data) {
      data.latitude = +data.latitude;
      data.longitude = +data.longitude;
    //console.log("Latitude:", data.latitude, "Longitude:", data.longitude);
      //console.log("Longitude", data.longitude);
    });


var myMap = L.map("map", {
    center: [37.77,-122.41],
    zoom: 11
    });
  
  // Adding tile layer to the map
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap);
 
  
 
 
  

  
    var markers = L.markerClusterGroup();
  
    // Loop through data
    for (var i = 0; i < playerData.length; i++) {
  
      // Set the data latlng property to a variable
      
  
      // Check for latlng property
      
  
        // Add a new marker to the cluster group and bind a pop-up
        markers.addLayer(L.marker([playerData[i]["latitude"], playerData[i]["longitude"]])
          //This is where we ADD what info we want displayed plus html tags to style info!
            .bindPopup("<h3>" + playerData[i].city_name + "</h3><hr><p>" +
            playerData[i].birthYear + "</p>"));
      }
  
    
  
    // Add our marker cluster layer to the map
    myMap.addLayer(markers);
});
