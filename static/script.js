function initMap() {
    var duquesneIncline = {lat: 40.4397, lng: -80.0175};
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

document.querySelectorAll(".collapsible").forEach(function(button) {
    button.addEventListener("click", function() {
        this.classList.toggle("active");
    });
});

$(document).ready(function() {
    $(".category-title").click(function() {
        $(this).toggleClass("active");
        $(this).next(".faq-content").toggleClass("active");
    });
});