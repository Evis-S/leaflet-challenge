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

//
d3.json(Url).then(function (data) {
    // console.log(data.features);
function markerStyle(feature) {
        return {
            opacity: 1,
            fillOpacity: 0.75,
            fillColor: markerColor(feature.geometry.coordinates[2]),
            radius: markerRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5
        };
    }
    
    function markerColor(depth) {
        depth > 90  ? "red":
        depth > 70  ? "orangered" :
        depth > 50  ? "orange" :
        depth > 30  ? "yellow" :
        depth > 10   ? "greenyellow" :
           "greenlight" ;
   }
   function markerRadius(mag) {
    return magnitude * 5;
}
//Create a GeoJSON layer containing the features array on the earthquakeData object

L.geoJSON(data, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng);
    },
    
    //Run the onEachFeature function once for each piece of data in the array
    onEachFeature: function (feature, layer) {
    layer.bindPopup("Magnitude: " + feature.properties.mag + " <br>Location: " + feature.properties.place);
    }
}).addTo(myMap);
//Create a legend
let legend = L.control({ position: "bottomright" });
legend.onAdd = function () {
    let div = L.DomUtil.create("div", "info legend");
    let depth = [-10, 10, 30, 50, 70, 90];
    let colors = [greenyellow, green, greenlight, yellow, orange, orangered, red];
    //Looping through
    for (var i = 0; i < depth.length; i++) {
        div.innerHTML +=
            "<i style='background: " + colors[i] + "'></i> " + depth [i] +  (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
  }
    return div;
};
legend.addTo(myMap);
});