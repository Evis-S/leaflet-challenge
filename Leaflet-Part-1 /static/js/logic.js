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