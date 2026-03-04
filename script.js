document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll(".fade-in");

    // Fade-in animation
    function reveal() {
        elements.forEach(el => {
            const top = el.getBoundingClientRect().top;
            if (top < window.innerHeight - 100) el.classList.add("visible");
        });
    }
    window.addEventListener("scroll", reveal);
    reveal();

    // Reservation Modal
    const modal = document.getElementById("reservationModal");
    const btn = document.getElementById("reservationBtn");
    const span = modal.querySelector(".close");
    btn.onclick = () => modal.style.display = "block";
    span.onclick = () => modal.style.display = "none";
    window.onclick = (e) => { if(e.target == modal) modal.style.display = "none"; };

    // Initialize EmailJS with your public key
    emailjs.init("_arHD8abI8wm6mA-V");

    // Form submission
    document.getElementById("reservationForm").addEventListener("submit", function(e){
        e.preventDefault();

        const templateParams = {
            name: document.getElementById("name").value,
            contact: document.getElementById("contact").value,
            room: document.getElementById("room").value,
            message: document.getElementById("message").value,
            to_email: "undefeated.mamamoo@gmail.com" // your Gmail to receive reservations
        };

        emailjs.send('service_ol70f4f', 'template_zs5dg29', templateParams)
        .then(function() {
            alert('Reservation Sent!');
            modal.style.display = "none";
            document.getElementById("reservationForm").reset();
        }, function() {
            alert('Failed to send. Please try again.');
        });
    });

    // Lightbox Gallery
    const lightboxImages = document.querySelectorAll('.lightbox');
    const overlay = document.getElementById('lightboxOverlay');
    const lbImg = overlay.querySelector('.lb-img');
    const lbClose = overlay.querySelector('.lb-close');
    const lbPrev = overlay.querySelector('.lb-prev');
    const lbNext = overlay.querySelector('.lb-next');

    let currentIndex = 0;
    let imgs = Array.from(lightboxImages);

    function showImage(index){
        lbImg.src = imgs[index].href;
        currentIndex = index;
        overlay.style.display = 'flex';
    }

    imgs.forEach((imgLink, i) => {
        imgLink.addEventListener('click', e => {
            e.preventDefault();
            showImage(i);
        });
    });

    lbClose.addEventListener('click', () => overlay.style.display = 'none');
    lbPrev.addEventListener('click', () => showImage((currentIndex - 1 + imgs.length) % imgs.length));
    lbNext.addEventListener('click', () => showImage((currentIndex + 1) % imgs.length));
    overlay.addEventListener('click', e => { if(e.target == overlay) overlay.style.display = 'none'; });
});