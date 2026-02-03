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

// Background Music Control
const musicBtn = document.getElementById('music-btn');
const audio = document.getElementById('bg-music');
let isPlaying = false;
const fadeDuration = 2000; // 2 seconds

audio.volume = 0; // Start muted for fade-in

function fadeIn() {
    let vol = 0;
    const interval = 50; // ms
    const step = 1 / (fadeDuration / interval);

    const fade = setInterval(() => {
        if (vol < 1) {
            vol += step;
            if (vol > 1) vol = 1;
            audio.volume = vol;
        } else {
            clearInterval(fade);
        }
    }, interval);
}

function fadeOut(callback) {
    let vol = audio.volume;
    const interval = 50; // ms
    const step = vol / (fadeDuration / interval); // Scale based on current volume

    const fade = setInterval(() => {
        if (vol > 0) {
            vol -= step;
            if (vol < 0) vol = 0;
            audio.volume = vol;
        } else {
            clearInterval(fade);
            if (callback) callback();
        }
    }, interval);
}

musicBtn.addEventListener('click', () => {
    if (isPlaying) {
        // Fade out then pause
        fadeOut(() => {
            audio.pause();
            musicBtn.classList.remove('playing');
        });
    } else {
        // Play then fade in
        audio.play().then(() => {
            musicBtn.classList.add('playing');
            fadeIn();
        }).catch(err => {
            console.log("Audio play failed:", err);
            alert("Please interact with the document first to play audio.");
        });
    }
    isPlaying = !isPlaying;
});

// Video Canvas Rendering (Fix for Safari Flash)
const video = document.getElementById('hero-video');
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Initial call

function drawVideo() {
    if (video.paused || video.ended) {
        // Keep drawing a bit to catch up or hold frame
        requestAnimationFrame(drawVideo);
        return;
    }

    // Simulate object-fit: cover
    const videoRatio = video.videoWidth / video.videoHeight;
    const canvasRatio = canvas.width / canvas.height;

    let drawWidth, drawHeight, startX, startY;

    if (canvasRatio > videoRatio) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / videoRatio;
        startX = 0;
        startY = (canvas.height - drawHeight) / 2;
    } else {
        drawWidth = canvas.height * videoRatio;
        drawHeight = canvas.height;
        startX = (canvas.width - drawWidth) / 2;
        startY = 0;
    }

    ctx.drawImage(video, startX, startY, drawWidth, drawHeight);
    requestAnimationFrame(drawVideo);
}

// Start drawing when video starts playing
video.addEventListener('play', () => {
    drawVideo();
});

// Also start loop immediately in case it's autoplaying
drawVideo();
