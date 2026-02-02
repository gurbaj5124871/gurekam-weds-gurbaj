// Set the wedding date (Feb 8, 2026 09:00:00)
const weddingDate = new Date('February 8, 2026 09:00:00').getTime();

// Countdown Timer Logic
const timerInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
        clearInterval(timerInterval);
        document.querySelector('.countdown-container').innerHTML = "<h3>We are Married!</h3>";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const elDays = document.getElementById('days');
    const elHours = document.getElementById('hours');
    const elMinutes = document.getElementById('minutes');
    const elSeconds = document.getElementById('seconds');

    if (elDays) elDays.innerText = days < 10 ? '0' + days : days;
    if (elHours) elHours.innerText = hours < 10 ? '0' + hours : hours;
    if (elMinutes) elMinutes.innerText = minutes < 10 ? '0' + minutes : minutes;
    if (elSeconds) elSeconds.innerText = seconds < 10 ? '0' + seconds : seconds;
}, 1000);


// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

document.querySelectorAll('.hover-reveal').forEach(el => {
    observer.observe(el);
});

// Mobile Menu Toggle (Basic)
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.right = '0';
            navLinks.style.background = 'white';
            navLinks.style.width = '100%';
            navLinks.style.padding = '1rem';
            navLinks.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
        }
    });
}
