AOS.init();

function toggleMenu() {
    const nav = document.getElementById("navLinks");
    nav.classList.toggle("show");
}

function navigateToHelp() {
    window.location.href = 'help.html';
}

const typingText = document.getElementById("typing-text");
const phrases = [
    "Secure. Simple. Smart.",
    "Helping students stay connected.",
    "Never lose a thing again."
];
let i = 0, j = 0, current = '', isDeleting = false;

function type() {
    if (i < phrases.length) {
        if (!isDeleting && j <= phrases[i].length) {
            current = phrases[i].substring(0, j++);
        } else if (isDeleting && j >= 0) {
            current = phrases[i].substring(0, j--);
        }
        typingText.innerHTML = current;
        if (j === phrases[i].length) isDeleting = true;
        if (j === 0 && isDeleting) {
            isDeleting = false;
            i = (i + 1) % phrases.length;
        }
    }
    setTimeout(type, isDeleting ? 60 : 120);
}
type();

// Particle animation
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particles = [];
for (let i = 0; i < 100; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 3 + 1,
        dx: Math.random() - 0.5,
        dy: Math.random() - 0.5
    });
}
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bubble-color');
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();
