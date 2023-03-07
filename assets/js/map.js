
function initMap(){
    var  map = new google.maps.Map(document.getElementById('map'), {
        zoom: 3,
        center: {
            lat: 46.619261,
            lng: -33.13476
        }
    });

    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    var locations = [ 
        {lat: 40.785091, lng: -73.968285},
        {lat: 41.785091, lng: -75.968285},
        {lat: 42.785091, lng: -79.968285}
    ]

    var markers = locations.map(function(location, i){
        return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
        })
    })

    var markerCluster = new MarkerClusterer (map, markers,
    {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'})
}
