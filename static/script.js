src="https://code.jquery.com/jquery-3.6.0.min.js"

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

document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetPosition = targetElement.getBoundingClientRect().top - 250;
                window.scrollBy(0, offsetPosition);
            }
        });
    });
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const tabPanes = document.querySelectorAll('.tab-pane');
            tabPanes.forEach(pane => pane.classList.remove('active'));
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    const images = document.querySelectorAll(".gallery img");
    let currentIndex = 0;
    let modal;

    function openModal(index) {
        currentIndex = index;
        modal = document.createElement("div");
        modal.classList.add("modal");
        modal.innerHTML = `
            <span class="close">&times;</span>
            <img src="${images[index].src}" class="modal-img">
            <button class="prev">&lt;</button>
            <button class="next">&gt;</button>
        `;
        document.body.appendChild(modal);
        document.body.classList.add("modal-open");


        document.querySelector(".close").addEventListener("click", closeModal);
        document.querySelector(".prev").addEventListener("click", () => navigate(-1));
        document.querySelector(".next").addEventListener("click", () => navigate(1));
        document.addEventListener("keydown", keyControls);
    }

    function closeModal() {
        modal.remove();
        document.body.classList.remove("modal-open");
        document.removeEventListener("keydown", keyControls);
    }

    function navigate(direction) {
        currentIndex += direction;
        if (currentIndex < 0) {
            currentIndex = images.length - 1;
        } else if (currentIndex >= images.length) {
            currentIndex = 0;
        }
        document.querySelector(".modal-img").src = images[currentIndex].src;
    }

    function keyControls(event) {
        if (event.key === "ArrowRight") {
            navigate(1);
        } else if (event.key === "ArrowLeft") {
            navigate(-1);
        } else if (event.key === "Escape") {
            closeModal();
        }
    }

    images.forEach((image, index) => {
        image.addEventListener("click", () => openModal(index));
    });

    const lat = 40.4406;
    const lon = -79.9959;
    fetch(`https://api.weather.gov/points/${lat},${lon}`)
        .then(response => response.json())
        .then(data => {
            const gridUrl = data.properties.forecast;
            return fetch(gridUrl);
        })
        .then(response => response.json())
        .then(data => {
            const weatherWidget = document.getElementById('weather-widget');
            
            if (data && data.properties && data.properties.periods) {
                const currentPeriod = data.properties.periods[0];
                
                weatherWidget.innerHTML = `
                    <div class="weather-info">
                        <h3>Pittsburgh, PA</h3>
                        <div class="temperature">${currentPeriod.temperature}°${currentPeriod.temperatureUnit}</div>
                        <div class="description">${currentPeriod.shortForecast}</div>
                        <div class="weather-icon">
                            <img src="${currentPeriod.icon}" alt="${currentPeriod.shortForecast}" width="100">
                        </div>
                        <div class="details">
                            <p>Wind: ${currentPeriod.windSpeed} ${currentPeriod.windDirection}</p>
                            <p>${currentPeriod.detailedForecast}</p>
                        </div>
                    </div>
                `;
            } else {
                weatherWidget.innerHTML = '<p>Weather information unavailable</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weather-widget').innerHTML = '<p>Unable to load weather information</p>';
        });
});
    


$(document).ready(function() {
    $(".mailing-form").submit(function(event) {
        event.preventDefault(); // Prevent default form submission

        let name = $("#name").val().trim();
        let email = $("#email").val().trim();
        let phone = $("#phone").val().trim();
        let sms = $("#sms").is(":checked");
        let zip = $("#zip").val().trim();
        let message = $("#message");

        // Check required fields
        if (name === "" || email === "") {
            message.text("Please fill out all required fields.").css("color", "red");
            return;
        }

        // Email validation
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            message.text("Please enter a valid email address.").css("color", "red");
            return;
        }

        // SMS requires phone number
        if (sms && phone === "") {
            message.text("Phone number is required for SMS notifications.").css("color", "red");
            return;
        }

        // Success message
        message.text("Form submitted successfully!").css("color", "green");

        // Reset form after 2 seconds
        setTimeout(() => {
            $(".mailing-form")[0].reset();
            message.text("");
        }, 2000);
    });
});
    
}