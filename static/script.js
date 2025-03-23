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
                
                window.scrollBy(0, offsetPosition)
            }
        });
    });
});


function validateForm() {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const sms = document.getElementById("sms");
    const zip = document.getElementById("zip");
    const message = document.getElementById("message");
    const form = document.querySelector(".mailing-form");
    if (name.value === "" || email.value === "") {
        message.innerHTML = "Please fill out all required fields.";
        message.style.color = "red";
        return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
        message.innerHTML = "Please enter a valid email address.";
        message.style.color = "red";
        return false;
    }
    if (sms.checked && phone.value === "") {
        message.innerHTML = "Phone number is required for SMS notifications.";
        message.style.color = "red";
        return false;
    }
    message.innerHTML = "Form submitted successfully!";
    message.style.color = "green";
    setTimeout(() => {
        form.reset();
        message.innerHTML = "";
    }, 2000);
    
    return true;
}