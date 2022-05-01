var grey_background = L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', 
    {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'API_KEY'
}).addTo(map);


var map = L.map("map", {
    centre: [40.7, -94.5],
    zoom:3

});

grey_background.addTo(map);

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {

    function circleStyle(feature) {
        return {
            opacity:1,
            fillOpacity: 1,
            fillcolor:color(feature.geometry.cooridinates[2]),
            color:"#000000",
            radius:size(feature.properties.mag),
            stroke:0.5
        }

    };

    function color(depth)  {
        if (depth >90) {
            return "#ea2c2c";
        }
        else if (depth >70) {
            return "#ea822c";
        }
        else if (depth >50) {
            return "#ee9c00";
        }
        else if (depth >30) {
            return "#eecc00";
        }
        else if (depth >10) {
            return "#d4ee00";
        }
        else {
            return "#98ee00"
        }

    }

    function size (magnitude) {
        if (magnitude === 0) {
            return 1;
        }
        return magnitude * 3

    } 
    L.geoJson(data, {
        pointToLayer: function (feature, latlang) {
            return L.circleMarker(latlang)
        },
        style:circleStyle

    }).addTo(map);

});
