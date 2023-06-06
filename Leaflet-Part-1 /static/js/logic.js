//Define the earthquake url
let Url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//Display the map
let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
});
//Define the tile layer and add to map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Add the earthquake data to the map
d3.json(Url).then(function (data) {
    
    // console.log(data.features);
    function mapStyle(feature) {
        return {
            opacity: 1,
            fillOpacity: 0.75,
            fillColor: markerColor(feature.geometry.coordinates[2]),
            radius: markerRadius(feature.properties.mag),
            stroke: true,
            color: "black",
            weight: 0.5
        };
    }

    //Create a function to determine the color of the marker based on the depth of the earthquake
    function markerColor(depth) {
        return depth > 90 ? "#FF0000":
        depth > 70 ? "#FF7F50":
        depth > 50 ? "#FFC594":
        depth > 30 ? "#FFDF77":
        depth > 10 ? "#CEFF00":
        depth >-10 ?"#66FF66":
        "#FFFCD1";

    }

  //Create a function to determine the radius of the earthquake marker based on its magnitude

   function markerRadius(magnitude) {

    return magnitude * 5;
}
//Create a GeoJSON layer containing the features array on the earthquakeData object

    L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng);
        },

    //Set the style for each circleMarker using the mapStyle function
    style: mapStyle,
    
    //Run the onEachFeature function once for each piece of data in the array
    onEachFeature: function (feature, layer) {
    layer.bindPopup("Magnitude: " + feature.properties.mag + " <br>Location: " + feature.properties.place + "<br>Depth: " + feature.geometry.coordinates[2]);
    }
}).addTo(myMap);

//Create a legend
var legend = L.control({ position: "bottomright" });
legend.onAdd = function () {
    var div = L.DomUtil.create("div", "info legend");
     depth = [-10, 10, 30, 50, 70, 90];
  
    //Looping through
    for (var i = 0; i < depth.length; i++) {
        div.innerHTML +=
        '<i style="background:' + markerColor(depth[i] + 1) + '"></i> ' +
        depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
  }
    return div;
};
legend.addTo(myMap)
});