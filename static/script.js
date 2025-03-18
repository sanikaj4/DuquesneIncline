
document.addEventListener('click', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.style.display = 'none';
    });
});
function initMap() {
    var duquesneIncline = { lat: 40.4397, lng: -80.0175 }; // Duquesne Incline coordinates
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