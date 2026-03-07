document.addEventListener("DOMContentLoaded", function () {

    emailjs.init("_arHD8abI8wm6mA-V");

    const modal = document.getElementById("reservationModal");
    const btn = document.getElementById("reservationBtn");
    const close = document.querySelector(".close");

    btn.onclick = function () {
        modal.style.display = "block";
    };

    close.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    };

    document.getElementById("reservationForm").addEventListener("submit", function (e) {

        e.preventDefault();

        const params = {
            name: document.getElementById("name").value,
            contact: document.getElementById("contact").value,
            room: document.getElementById("room").value,
            message: document.getElementById("message").value
        };

        emailjs
            .send("service_ol70f4f", "template_zs5dg29", params)
            .then(function () {

                alert("Reservation Sent!");
                modal.style.display = "none";
                document.getElementById("reservationForm").reset();

            })
            .catch(function () {

                alert("Failed to send reservation");

            });

    });

});
