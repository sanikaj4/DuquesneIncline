document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('header nav ul li a');
    links.forEach(link => {
        link.addEventListener('click', function(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
        });
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