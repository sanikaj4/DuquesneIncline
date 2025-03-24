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
        document.querySelector(".close").addEventListener("click", closeModal);
        document.querySelector(".prev").addEventListener("click", () => navigate(-1));
        document.querySelector(".next").addEventListener("click", () => navigate(1));
        document.addEventListener("keydown", keyControls);
    }
    function closeModal() {
        modal.remove();
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