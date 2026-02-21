// Smoothly move the glow and create trail particles
const particles = [];
let lastParticleTime = 0;

// create and append particles for all pointer movement (mouse/pen/touch)
document.addEventListener('pointermove', e => {
    const now = Date.now();
    if (now - lastParticleTime > 8) {
        createTrailParticle(e.clientX, e.clientY);
        lastParticleTime = now;
    }
});

// Create and animate trail particles
function createTrailParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'trail-particle';

    // Random size between 5-15px
    const size = Math.random() * 10 + 5;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';

    // Small random offset - stays closer to pointer
    const offsetX = (Math.random() - 0.5) * 10;
    const offsetY = (Math.random() - 0.5) * 10;
    particle.style.setProperty('--offset-x', offsetX + 'px');
    particle.style.setProperty('--offset-y', offsetY + 'px');

    document.body.appendChild(particle);

    // Remove particle after animation (0.5s to match the animation)
    setTimeout(() => particle.remove(), 500);
}

// Smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});