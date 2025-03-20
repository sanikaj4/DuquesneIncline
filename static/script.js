
function initMap() {
    var duquesneIncline = {lat: 40.4397, lng: -80.0175 };
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: duquesneIncline,
    });

    var marker = new google.maps.Marker({
        position: duquesneIncline,
        map: map,
        title: "The Duquesne Incline"
    });
}